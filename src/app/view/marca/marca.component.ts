import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { Marca } from 'src/app/shared/models/Marca.model';

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
        }
    ];

    @ViewChild('tabelaMarca') tabelaMarca: DynamicTableComponent;

    colunasTabelaMarca: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '15%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '60%', align: 'center' },
        { header: 'Ativo', field: 'indicadorAtivo', width: '15%', align: 'center', boolField: true},
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (Marca) => this.prepararEdicao(Marca), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (Marca) => this.prepararExclusao(Marca), tooltip: "Excluir" }
    ];

    constructor() {

    }

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

    }

    prepararEdicao(marca: Marca): void {
        this.estaCadastrandoOuEditando = true;
        this.filtroCodigoMarca = marca.codigo;
        this.filtroNomeMarca = marca.nome;
        this.filtroIndicadorMarcaAtiva = marca.indicadorAtivo;
    }

    prepararExclusao(marca: Marca): void {

    }

    exportar(): void {

    }

}
