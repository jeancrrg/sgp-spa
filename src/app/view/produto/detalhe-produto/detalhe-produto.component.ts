import { MarcaService } from './../../../shared/services/marca.service';
import { TipoProdutoService } from './../../../shared/services/tipoProduto.service';
import { NotificacaoService } from './../../../core/service/notificacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { Produto } from 'src/app/shared/models/cadastro/Produto.model';
import { DepartamentoService } from 'src/app/shared/services/departamento.service';
import { StatusProdutoService } from 'src/app/shared/services/statusProduto.service';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
    selector: 'app-detalhe-produto',
    templateUrl: './detalhe-produto.component.html',
    styleUrl: './detalhe-produto.component.scss',
})
export class DetalheProdutoComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    readonly KEY_PRODUTO = "produto";
    isEditando: boolean;

    produto: Produto = new Produto();
    listaStatusProduto: SelectItem[] = [];
    listaTiposProduto: SelectItem[] = [];
    listaMarcas: SelectItem[] = [];
    listaDepartamentos: SelectItem[] = [];
    listaCategorias: SelectItem[] = [];

    constructor(
        private router: Router,
        private notificacaoService: NotificacaoService,
        private statusProdutoService: StatusProdutoService,
        private tipoProdutoService: TipoProdutoService,
        private marcaService: MarcaService,
        private departamentoService: DepartamentoService,
        private categoriaService: CategoriaService
    ) { }

    async ngOnInit(): Promise<void> {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Produto' });
        this.itemsBreadCrumb.push({ label: 'Detalhe' });

        this.isEditando = false;
        await this.carregarCamposDropdown();

        const produtoRecuperado: Produto = this.recuperarProdutoNoLocalStorage();
        localStorage.removeItem(this.KEY_PRODUTO);
        if (ValidationUtils.isNotUndefinedAndNotNull(produtoRecuperado)) {
            this.produto = produtoRecuperado;
            this.isEditando = true;
        }
    }

    async carregarCamposDropdown(): Promise<void> {
        return new Promise<void>(async resolve => {
            await this.carregarCampoStatusProduto();
            await this.carregarCampoTipoProduto();
            await this.carregarCampoMarca();
            await this.carregarCampoDepartamento();
            await this.carregarCampoCategoria();

            resolve();
        });
    }

    async carregarCampoStatusProduto(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaStatusProduto = [];
            this.statusProdutoService.buscar(undefined, undefined, true).pipe(
                tap((response) => {
                    let indice = 0;

                    for (let obj of response) {
                        this.listaStatusProduto.push({
                            label: `${obj.descricao}`,
                            value: obj
                        });
                        indice++;
                    }
                }),
                catchError((error) => {
                    this.notificacaoService.erro(error.error, undefined, false, 10);
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    async carregarCampoTipoProduto(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaTiposProduto = [];
            this.tipoProdutoService.buscar(undefined, undefined, true).pipe(
                tap((response) => {
                    let indice = 0;

                    for (let obj of response) {
                        this.listaTiposProduto.push({
                            label: `${obj.descricao}`,
                            value: obj
                        });
                        indice++;
                    }
                }),
                catchError((error) => {
                    this.notificacaoService.erro(error.error, undefined, false, 10);
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    async carregarCampoMarca(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaMarcas = [];
            this.marcaService.buscar(undefined, undefined, true, true).pipe(
                tap((response) => {
                    let indice = 0;

                    for (let obj of response) {
                        this.listaMarcas.push({
                            label: `${obj.codigo} - ${obj.nome}`,
                            value: obj
                        });
                        indice++;
                    }
                }),
                catchError((error) => {
                    this.notificacaoService.erro(error.error, undefined, false, 10);
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    async carregarCampoDepartamento(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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
                    this.notificacaoService.erro(error.error, undefined, false, 10);
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    async carregarCampoCategoria(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaCategorias = [];
            this.categoriaService.buscar(undefined, undefined, true, undefined, true).pipe(
                tap((response) => {
                    let indice = 0;

                    for (let obj of response) {
                        this.listaCategorias.push({
                            label: `${obj.codigo} - ${obj.nome}`,
                            value: obj
                        });
                        indice++;
                    }
                }),
                catchError((error) => {
                    this.notificacaoService.erro(error.error, undefined, false, 10);
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    recuperarProdutoNoLocalStorage() {
        let produto = localStorage.getItem(this.KEY_PRODUTO);
        if (produto) {
            return JSON.parse(localStorage.getItem(this.KEY_PRODUTO));
        }
        return produto;
    }

    voltarResumoProduto(): void {
        this.router.navigateByUrl('produto');
    }

    limparFiltros(): void {
        this.produto = new Produto();
    }

    async salvar(): Promise<void> {
        const filtrosValido = await this.validarCamposObrigatorios();
        if (filtrosValido) {


        }
    }

    async validarCamposObrigatorios(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto)) {
                this.notificacaoService.aviso('Nenhum dado do produto encontrado! Informe os dados!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.stringNotEmpty(this.produto.nome)) {
                this.notificacaoService.aviso('Nome do produto não encontrado! Informe o nome!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.stringNotEmpty(this.produto.codigoBarrasEAN)) {
                this.notificacaoService.aviso('Código de barras EAN do produto não encontrado! Informe o código de barras EAN!', undefined, false, 10);
                return resolve(false);
            }
            if (this.produto.codigoBarrasEAN.length < 13) {
                this.notificacaoService.aviso('Código de barras EAN inválido! Informe um código de barras EAN com 13 dígitos!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.statusProduto) || !ValidationUtils.isNotUndefinedAndNotNull(this.produto.statusProduto.codigo)) {
                this.notificacaoService.aviso('Status do produto não encontrado! Informe o status!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.tipoProduto) || !ValidationUtils.isNotUndefinedAndNotNull(this.produto.tipoProduto.codigo)) {
                this.notificacaoService.aviso('Tipo do produto não encontrado! Informe o tipo!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.preco)) {
                this.notificacaoService.aviso('Preço do produto não encontrado! Informe o preço!', undefined, false, 10);
                return resolve(false);
            }
            if (this.produto.preco == 0) {
                this.notificacaoService.aviso('Preço do produto inválido! Informe um preço maior que zero!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.quantidadeEstoque)) {
                this.notificacaoService.aviso('Quantidade de estoque do produto não encontrado! Informe a quantidade de estoque!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.marca) || !ValidationUtils.isNotUndefinedAndNotNull(this.produto.marca.codigo)) {
                this.notificacaoService.aviso('Marca do produto não encontrada! Informe a marca!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.departamento) || !ValidationUtils.isNotUndefinedAndNotNull(this.produto.departamento.codigo)) {
                this.notificacaoService.aviso('Departamento do produto não encontrado! Informe o departamento!', undefined, false, 10);
                return resolve(false);
            }
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.categoria) || !ValidationUtils.isNotUndefinedAndNotNull(this.produto.categoria.codigo)) {
                this.notificacaoService.aviso('Categoria do produto não encontrada! Informe a categoria!', undefined, false, 10);
                return resolve(false);
            }

            return resolve(true);
        });
    }

}
