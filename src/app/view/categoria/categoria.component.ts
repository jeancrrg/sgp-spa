import { TabelaDinamicaService } from './../../core/service/tabela-dinamica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { Categoria } from 'src/app/shared/models/cadastro/Categoria.model';
import { Departamento } from 'src/app/shared/models/cadastro/Departamento.model';
import { ConfirmacaoDialogDTO } from 'src/app/shared/models/dto/ConfirmacaoDialogDTO.model';
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
        { header: 'Código', field: 'codigo', width: '10%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '15%', align: 'center' },
        { header: 'Cód. Departamento', field: 'departamento.codigo', width: '10%', align: 'center'},
        { header: 'Departamento', field: 'departamento.nome', width: '15%', align: 'center'},
        { header: 'Ativo', field: 'indicadorAtivo', width: '10%', align: 'center', boolField: true},
        { header: 'Data Cadastro', field: 'dataCadastro', dateField: true, datePipe: 'dd/MM/yyyy HH:mm', width: '15%', align: 'center' },
        { header: 'Última Alteração', field: 'dataUltimaAlteracao', dateField: true, datePipe: 'dd/MM/yyyy HH:mm', width: '15%', align: 'center' },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (categoria) =>
            this.habilitarEdicao(categoria), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (categoria) =>
            this.abrirDialogConfirmacaoInativacao(categoria), tooltip: "Inativar" }
    ];

    constructor(
        private confirmationService: ConfirmationService,
        private notificacaoService: NotificacaoService,
        private excelService: ExcelService,
        private departamentoService: DepartamentoService,
        private categoriaService: CategoriaService,
        private tabelaDinamicaService: TabelaDinamicaService
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
                for (let obj of response) {
                    this.listaDepartamentos.push({
                        label: `${obj.codigo} - ${obj.nome}`,
                        value: obj
                    });
                }
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
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
					this.notificacaoService.informacao('Nenhuma categoria encontrada!', undefined, false, 10);
				}
                this.listaCategorias = [...this.listaCategorias];
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
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
        this.filtroDepartamento = categoria.departamento;
        this.listaCategorias = [];
    }

    desabilitarCadastroEdicao(): void {
        this.estaCadastrando = false;
        this.estaEditando = false;
        this.limparFiltros();
    }

    salvar(): void {
        if (!ValidationUtils.stringNotEmpty(this.filtroNomeCategoria)) {
            this.notificacaoService.aviso('Nome da categoria não encontrado! Informe o nome!', undefined, false, 10);
            return;
        }
        if (!ValidationUtils.isNotUndefinedAndNotNull(this.filtroDepartamento)) {
            this.notificacaoService.aviso('Departamento não encontrado! Informe o departamento!', undefined, false, 10);
            return;
        }

        let categoria: Categoria = new Categoria();
        categoria.codigo = this.estaEditando ? this.filtroCodigoCategoria : undefined;
        categoria.nome = this.filtroNomeCategoria;
        categoria.indicadorAtivo = this.filtroIndicadorCategoriaAtivo;
        categoria.departamento = this.filtroDepartamento;

        if (this.estaCadastrando) {
            this.cadastrarcategoria(categoria);
        } else {
            this.atualizarcategoria(categoria);
        }
    }

    cadastrarcategoria(categoria: Categoria): void {
        this.categoriaService.cadastrar(categoria, true).pipe(
            tap((response) => {
                let categoriaSalvo = response;
                this.listaCategorias.push(categoriaSalvo);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificacaoService.sucesso('Categoria cadastrada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
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
                this.notificacaoService.sucesso('Categoria atualizada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    exportarExcel(): void {
        const listaDadoscategorias: any[] = this.tabelaDinamicaService.montarListaDadosExportacao(this.colunasTabelaCategoria, this.listaCategorias)
        this.excelService.exportarArquivoExcel(listaDadoscategorias, 'relatorio_categorias');
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
            this.notificacaoService.aviso('Não é possível inativar pois essa categoria já está inativa!', undefined, false, 10);
            return;
        }
        this.categoriaService.inativar(categoria.codigo, true).pipe(
            tap(() => {
                this.pesquisar();
                this.notificacaoService.sucesso('Categoria inativada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

}
