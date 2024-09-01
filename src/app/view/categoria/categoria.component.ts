import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { Categoria } from 'src/app/shared/models/Categoria.model';
import { ConfirmacaoDialogDTO } from 'src/app/shared/models/ConfirmacaoDialogDTO.model';
import { Departamento } from 'src/app/shared/models/Departamento.model';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { DepartamentoService } from 'src/app/shared/services/departamento.service';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrl: './categoria.component.scss',
})
export class CategoriaComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    filtroCodigoCategoria: number;
    filtroNomeCategoria: string;
    filtroIndicadorCategoriaAtivo: boolean = true;
    filtroDepartamento: Departamento;
    listaDepartamentos: SelectItem[] = [];
    estaCadastrando: boolean = false;
    estaEditando: boolean = false;
    listaCategorias: Categoria[] = [];

    @ViewChild('tabelaCategoria') tabelaCategoria: DynamicTableComponent;

    colunasTabelaCategoria: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '15%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '25%', align: 'center' },
        { header: 'Cód. Departamento', field: 'departamento.codigo', width: '15%', align: 'center'},
        { header: 'Departamento', field: 'departamento.nome', width: '25%', align: 'center'},
        { header: 'Ativo', field: 'indicadorAtivo', width: '10%', align: 'center', boolField: true},
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (categoria) =>
            this.habilitarEdicao(categoria), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (categoria) =>
            this.abrirDialogConfirmacaoInativacao(categoria), tooltip: "Inativar" }
    ];

    constructor(
        private confirmationService: ConfirmationService,
        private notificaoService: NotificacaoService,
        private excelService: ExcelService,
        private departamentoService: DepartamentoService,
        private categoriaService: CategoriaService
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Categoria' });
        this.carregarFiltroDepartamento();
        this.pesquisar();
    }

    carregarFiltroDepartamento(): void {
        this.listaDepartamentos = [];
        this.departamentoService.buscar(undefined, undefined, true, true).pipe(
            tap((response) => {
                let indice = 0;

                for (let obj of response) {
                    this.listaDepartamentos.push({
                        label: `${obj.codigo} - ${obj.nome}`,
                        value: obj
                    });
                    indice++;
                }
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    pesquisar(): void {
        this.listaCategorias = [];
        let codigoDepartamento = undefined;
        if (ValidationUtils.isNotUndefinedAndNotNull(this.filtroDepartamento)) {
            codigoDepartamento = this.filtroDepartamento.codigo;
        }
        this.categoriaService.buscar(this.filtroCodigoCategoria, this.filtroNomeCategoria, this.filtroIndicadorCategoriaAtivo, codigoDepartamento, true).pipe(
            tap((response) => {
                this.listaCategorias = [...response];
				if (!ValidationUtils.isNotUndefinedAndNotNull(this.listaCategorias) || this.listaCategorias.length == 0) {
					this.notificaoService.informacao('Nenhuma categoria encontrada!', undefined, false, 10);
				}
                this.listaCategorias = [...this.listaCategorias];
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    limparFiltros(): void {
        this.filtroCodigoCategoria = undefined;
        this.filtroNomeCategoria = undefined;
        this.filtroDepartamento = undefined;
    }

    habilitarCadastro(): void {
        this.estaCadastrando = true;
        this.estaEditando = false;
        this.limparFiltros();
        this.listaCategorias = [];
        this.filtroIndicadorCategoriaAtivo = true;
    }

    habilitarEdicao(categoria: Categoria): void {
        this.estaEditando = true;
        this.estaCadastrando = false;
        this.filtroCodigoCategoria = categoria.codigo;
        this.filtroNomeCategoria = categoria.nome;
        this.filtroIndicadorCategoriaAtivo = categoria.indicadorAtivo;
        this.listaCategorias = [];
    }

    desabilitarCadastroEdicao(): void {
        this.estaCadastrando = false;
        this.estaEditando = false;
        this.limparFiltros();
    }

    salvar(): void {
        if (!ValidationUtils.stringNotEmpty(this.filtroNomeCategoria)) {
            this.notificaoService.aviso('Nome da categoria não encontrado! Informe o nome!', undefined, false, 10);
            return;
        }

        let categoria: Categoria = new Categoria();
        categoria.codigo = this.estaEditando ? this.filtroCodigoCategoria : undefined;
        categoria.nome = this.filtroNomeCategoria;
        categoria.indicadorAtivo = this.filtroIndicadorCategoriaAtivo;

        if (this.estaCadastrando) {
            this.cadastrarcategoria(categoria);
        } else {
            this.atualizarcategoria(categoria);
        }
    }

    cadastrarcategoria(categoria: Categoria): void {
        this.categoriaService.salvar(categoria, true).pipe(
            tap((response) => {
                let categoriaSalvo = response;
                this.listaCategorias.push(categoriaSalvo);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificaoService.sucesso('Categoria ' + categoriaSalvo.nome + ' cadastrada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    atualizarcategoria(categoria: Categoria): void {
        this.categoriaService.atualizar(categoria, true).pipe(
            tap((response) => {
                let categoriaSalvo = response;
                this.listaCategorias.push(categoriaSalvo);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificaoService.sucesso('Categoria ' + categoriaSalvo.nome + ' atualizada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    exportar(): void {
        const listaDadoscategorias: any[] = this.atribuirDadosExportacao(this.colunasTabelaCategoria, this.listaCategorias)
        this.excelService.exportarArquivoExcel(listaDadoscategorias, 'relatorio_categorias');
    }

    atribuirDadosExportacao(colunas: TablePrimeColumOptions[], dados: any[]): any[] {
		return dados.map(dado => {
			const linha = {};

			colunas.forEach(coluna => {
				let valor = dado[coluna.field];
				if (valor !== undefined) {
					if (coluna.boolField) {
						valor = valor ? 'SIM' : 'NÃO';
					}
				} else {
					valor = '';
				}
				linha[coluna.header] = valor;
			});

			return linha;
		});
	}

    abrirDialogConfirmacaoInativacao(categoria: Categoria): void {
        let dtoConfirmacao = new ConfirmacaoDialogDTO();
        dtoConfirmacao.key = 'dialogConfirmacaoInativacao';
        dtoConfirmacao.message = 'Deseja realmente inativar essa categoria?';
        dtoConfirmacao.accept = () => {
            this.inativar(categoria);
        }
		this.confirmationService.confirm(dtoConfirmacao);
    }

    inativar(categoria: Categoria): void {
        if (!categoria.indicadorAtivo) {
            this.notificaoService.aviso('Não é possível inativar pois essa categoria já está inativa!', undefined, false, 10);
            return;
        }
        this.categoriaService.inativar(categoria.codigo, true).pipe(
            tap(() => {
                this.pesquisar();
                this.notificaoService.sucesso('Categoria ' + categoria.nome + ' inativada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

}
