import { MarcaService } from './../../shared/services/marca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { ConfirmacaoDialogDTO } from 'src/app/shared/models/ConfirmacaoDialogDTO.model';
import { Marca } from 'src/app/shared/models/Marca.model';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrl: './marca.component.scss',
})
export class MarcaComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    filtroCodigoMarca: number;
    filtroNomeMarca: string;
    filtroIndicadorMarcaAtiva: boolean = true;
    estaCadastrando: boolean = false;
    estaEditando: boolean = false;
    listaMarcas: Marca[] = [];

    @ViewChild('tabelaMarca') tabelaMarca: DynamicTableComponent;

    colunasTabelaMarca: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '10%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '60%', align: 'center' },
        { header: 'Ativo', field: 'indicadorAtivo', width: '10%', align: 'center', boolField: true},
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (Marca) =>
            this.habilitarEdicao(Marca), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (Marca) =>
            this.abrirDialogConfirmacaoInativacao(Marca), tooltip: "Inativar" }
    ];

    constructor(
        private confirmationService: ConfirmationService,
        private notificaoService: NotificacaoService,
        private excelService: ExcelService,
        private marcaService: MarcaService
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Marca' });
        this.pesquisar();
    }

    pesquisar(): void {
        this.listaMarcas = [];
        this.marcaService.buscar(this.filtroCodigoMarca, this.filtroNomeMarca, this.filtroIndicadorMarcaAtiva, true).pipe(
            tap((response) => {
                this.listaMarcas = [...response];
				if (!ValidationUtils.isNotUndefinedAndNotNull(this.listaMarcas) || this.listaMarcas.length == 0) {
					this.notificaoService.informacao('Nenhuma marca encontrada!', undefined, false, 10);
				}
                this.listaMarcas = [...this.listaMarcas];
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    limparFiltros(): void {
        this.filtroCodigoMarca = undefined;
        this.filtroNomeMarca = undefined;
    }

    habilitarCadastro(): void {
        this.estaCadastrando = true;
        this.estaEditando = false;
        this.limparFiltros();
        this.listaMarcas = [];
        this.filtroIndicadorMarcaAtiva = true;
    }

    habilitarEdicao(marca: Marca): void {
        this.estaEditando = true;
        this.estaCadastrando = false;
        this.filtroCodigoMarca = marca.codigo;
        this.filtroNomeMarca = marca.nome;
        this.filtroIndicadorMarcaAtiva = marca.indicadorAtivo;
        this.listaMarcas = [];
    }

    desabilitarCadastroEdicao(): void {
        this.estaCadastrando = false;
        this.estaEditando = false;
        this.limparFiltros();
    }

    salvar(): void {
        if (!ValidationUtils.stringNotEmpty(this.filtroNomeMarca)) {
            this.notificaoService.aviso('Nome da marca não encontrado! Informe o nome!', undefined, false, 10);
            return;
        }

        let marca: Marca = new Marca();
        marca.codigo = this.estaEditando ? this.filtroCodigoMarca : undefined;
        marca.nome = this.filtroNomeMarca;
        marca.indicadorAtivo = this.filtroIndicadorMarcaAtiva;

        if (this.estaCadastrando) {
            this.cadastrarMarca(marca);
        } else {
            this.atualizarMarca(marca);
        }
    }

    cadastrarMarca(marca: Marca): void {
        this.marcaService.salvar(marca, true).pipe(
            tap((response) => {
                let marcaSalva = response;
                this.listaMarcas.push(marcaSalva);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificaoService.sucesso('Marca ' + marcaSalva.nome + ' cadastrada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    atualizarMarca(marca: Marca): void {
        this.marcaService.atualizar(marca, true).pipe(
            tap((response) => {
                let marcaSalva = response;
                this.listaMarcas.push(marcaSalva);
                this.limparFiltros();
                this.estaCadastrando = false;
                this.estaEditando = false;
                this.pesquisar();
                this.notificaoService.sucesso('Marca ' + marcaSalva.nome + ' atualizada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    exportar(): void {
        const listaDadosMarcas: any[] = this.atribuirDadosExportacao(this.colunasTabelaMarca, this.listaMarcas)
        this.excelService.exportarArquivoExcel(listaDadosMarcas, 'relatorio_marcas');
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

    abrirDialogConfirmacaoInativacao(marca: Marca): void {
        let dtoConfirmacao = new ConfirmacaoDialogDTO();
        dtoConfirmacao.key = 'dialogConfirmacaoInativacao';
        dtoConfirmacao.message = 'Deseja realmente inativar essa marca?';
        dtoConfirmacao.accept = () => {
            this.inativar(marca);
        }
		this.confirmationService.confirm(dtoConfirmacao);
    }

    inativar(marca: Marca): void {
        if (!marca.indicadorAtivo) {
            this.notificaoService.aviso('Não é possível inativar pois essa marca já está inativa!', undefined, false, 10);
            return;
        }
        this.marcaService.inativar(marca.codigo, true).pipe(
            tap(() => {
                this.pesquisar();
                this.notificaoService.sucesso('Marca ' + marca.nome + ' inativada com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

}
