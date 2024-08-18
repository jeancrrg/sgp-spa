import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
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

    estaCadastrandoOuEditando: boolean = false;
    mostrarMensagemNomeMarcaObrigatoria: boolean = false;

    listaMarcas: Marca[] = [
        {
            codigo: 1,
            nome: 'Nike',
            indicadorAtivo: true
        },
        {
            codigo: 2,
            nome: 'Adidas',
            indicadorAtivo: false
        },
        {
            codigo: 3,
            nome: 'Vans',
            indicadorAtivo: true
        },
        {
            codigo: 4,
            nome: 'Mizuno',
            indicadorAtivo: false
        },
        {
            codigo: 5,
            nome: 'Puma',
            indicadorAtivo: true
        },
        {
            codigo: 6,
            nome: 'New Balance',
            indicadorAtivo: true
        }
    ];

    @ViewChild('tabelaMarca') tabelaMarca: DynamicTableComponent;

    colunasTabelaMarca: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '10%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '60%', align: 'center' },
        { header: 'Ativo', field: 'indicadorAtivo', width: '10%', align: 'center', boolField: true},
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (Marca) => this.prepararEdicao(Marca), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: () => this.abrirDialogConfirmacaoExclusao(), tooltip: "Excluir" }
    ];

    constructor(
        private confirmationService: ConfirmationService,
        private excelService: ExcelService
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Marca' });
    }

    pesquisar(): void {
        alert('Código: ' + this.filtroCodigoMarca + ' - Nome: ' + this.filtroNomeMarca + ' - Ativo: ' + this.filtroIndicadorMarcaAtiva);
    }

    limparFiltros(): void {
        this.filtroCodigoMarca = undefined;
        this.filtroNomeMarca = undefined;
    }

    habilitarCadastro(): void {
        this.estaCadastrandoOuEditando = true;
        this.limparFiltros();
        this.listaMarcas = [];
        this.filtroIndicadorMarcaAtiva = true;
    }

    desabilitarCadastro(): void {
        this.estaCadastrandoOuEditando = false;
        this.limparFiltros();
    }

    salvar(): void {
        if (!ValidationUtils.stringNotEmpty(this.filtroNomeMarca)) {
            this.mostrarMensagemNomeMarcaObrigatoria = true;
        }
    }

    prepararEdicao(marca: Marca): void {
        this.estaCadastrandoOuEditando = true;
        this.filtroCodigoMarca = marca.codigo;
        this.filtroNomeMarca = marca.nome;
        this.filtroIndicadorMarcaAtiva = marca.indicadorAtivo;
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

    abrirDialogConfirmacaoExclusao(): void {
        let dtoConfirmacao = new ConfirmacaoDialogDTO();
        dtoConfirmacao.key = 'dialogConfirmacaoExclusao';
        dtoConfirmacao.message = 'Deseja realmente excluir essa marca?';
        dtoConfirmacao.accept = () => {
            alert('Ação confirmada!');
        }
		this.confirmationService.confirm(dtoConfirmacao);
    }

}
