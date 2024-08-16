import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrl: './marca.component.scss',
})
export class MarcaComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    codigoMarca: number;

    constructor() {

    }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Marca' });
    }

    pesquisar(): void {

    }

    limparFiltros(): void {

    }

    cadastrar(): void {

    }

    exportar(): void {

    }

}
