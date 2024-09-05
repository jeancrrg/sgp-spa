import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Categoria } from 'src/app/shared/models/cadastro/Categoria.model';
import { Departamento } from 'src/app/shared/models/cadastro/Departamento.model';
import { Marca } from 'src/app/shared/models/cadastro/Marca.model';
import { StatusProduto } from 'src/app/shared/models/cadastro/StatusProduto.model';
import { TipoProduto } from 'src/app/shared/models/cadastro/TipoProduto.model';

@Component({
    selector: 'app-detalhe-produto',
    templateUrl: './detalhe-produto.component.html',
    styleUrl: './detalhe-produto.component.scss',
})
export class DetalheProdutoComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];

    codigo: number;
    nome: string;
    codigoBarraEAN: number;
    status: StatusProduto;
    listaStatus: SelectItem[] = [];
    tipoProduto: TipoProduto;
    listaTiposProduto: SelectItem[] = [];
    preco: number;
    estoque: number;
    marca: Marca;
    listaMarcas: SelectItem[] = [];
    departamento: Departamento;
    listaDepartamentos: SelectItem[] = [];
    categoria: Categoria;
    listaCategorias: SelectItem[] = [];

    descricaoDetalhadaProduto: string;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Produto' });
        this.itemsBreadCrumb.push({ label: 'Detalhe' });
    }

    voltarResumoProduto(): void {
        this.router.navigateByUrl('produto/resumo');
    }

    limparFiltros(): void {

    }

    salvar(): void {

    }

}
