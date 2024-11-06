import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

    listaProdutos: Product[] = [];
    sortOrder: number = 0;
    sortField: string = '';

    listaMenuItens: MenuItem[] = [];

    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {
        this.productService.getProducts().then(data => this.listaProdutos = data);

        this.listaMenuItens = [
            {
                label: 'Categorias',
                icon: 'pi pi-fw pi-list',
                items: [
                    {
                        label: 'Acessórios',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Anéis de prata',
                                icon: 'pi pi-fw pi-plus'
                            }
                        ]
                    },
                    {
                        label: 'Anéis',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Anéis de prata',
                                icon: 'pi pi-fw pi-plus'
                            }
                        ]
                    },
                    {
                        label: 'Brincos',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Brincos de prata',
                                icon: 'pi pi-fw pi-plus'
                            }
                        ]
                    },
                    {
                        label: 'Colares',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Colares com pedra',
                                icon: 'pi pi-fw pi-plus'
                            },
                            {
                                label: 'Colares de prata',
                                icon: 'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label: 'Pulseiras',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Pulseiras femininas',
                                icon: 'pi pi-fw pi-plus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Meus Pedidos',
                icon: 'pi pi-fw pi-shopping-bag',
            },
            {
                label: 'Minha Conta',
                icon: 'pi pi-fw pi-book',
            }
        ]
    }

    adicionarAoCarrinho(): void {

    }


}
