import { saveAs } from 'file-saver';
import { ImagemProdutoService } from './../../../shared/services/imagem-produto.service';
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
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { FileUpload } from 'primeng/fileupload';
import { ImagemProduto } from 'src/app/shared/models/cadastro/ImagemProduto.model';
import { ConverterUtils } from 'src/app/core/utils/ConverterUtils.util';
import { Departamento } from 'src/app/shared/models/cadastro/Departamento.model';
import { Categoria } from 'src/app/shared/models/cadastro/Categoria.model';

@Component({
    selector: 'app-detalhe-produto',
    templateUrl: './detalhe-produto.component.html',
    styleUrl: './detalhe-produto.component.scss',
})
export class DetalheProdutoComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    readonly KEY_PRODUTO = "produto";
    isEditando: boolean = false;
    desabilitarCampos: boolean = false;

    produto: Produto = new Produto();
    listaStatusProduto: SelectItem[] = [];
    listaTiposProduto: SelectItem[] = [];
    listaMarcas: SelectItem[] = [];
    listaDepartamentos: SelectItem[] = [];
    listaCategorias: SelectItem[] = [];

    imagens: any[] = [];
    listaImagensProduto: ImagemProduto[] = [];
    mostrarDialogUploadImagem: boolean = false;
    mostrarImagemExpandida: boolean = false;

    optionsGaleriaImages: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    colunasTabelaInformacaoImagens: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '15%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '25%', align: 'center' },
        { header: 'Nome Imagem Servidor', field: 'nomeImagemServidor', width: '25%', align: 'center' },
        { header: 'Tamanho', field: 'tamanhoImagemConvertido', width: '15%', align: 'center'},
        { header: '', width: '10%', align: 'center', buttonField: true, iconButton: "pi pi-download", command: (Imagem) =>
            this.baixarImagem(Imagem), tooltip: "Baixar Imagem" },
        { header: '', width: '10%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (Imagem) =>
            this.excluirImagem(Imagem), tooltip: "Excluir Imagem" }
    ];

    constructor(
        private router: Router,
        private notificacaoService: NotificacaoService,
        private statusProdutoService: StatusProdutoService,
        private tipoProdutoService: TipoProdutoService,
        private marcaService: MarcaService,
        private departamentoService: DepartamentoService,
        private categoriaService: CategoriaService,
        private produtoService: ProdutoService,
        private imagemProdutoService: ImagemProdutoService
    ) { }

    async ngOnInit(): Promise<void> {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Produto' });
        this.itemsBreadCrumb.push({ label: 'Detalhe' });

        await this.carregarCamposDropdown();

        const produtoRecuperado: Produto = this.recuperarProdutoNoLocalStorage();
        if (ValidationUtils.isNotUndefinedAndNotNull(produtoRecuperado)) {
            this.isEditando = true;
            this.produto = produtoRecuperado;
            this.listaCategorias = this.listaCategorias.filter(categoria => categoria.label ==  `${this.produto.categoria.codigo} - ${this.produto.categoria.nome}`);
            await this.carregarInformacoesImagensProduto(this.produto.codigo);
            this.carregarImagens();
        } else {
            this.listaCategorias = [];
            this.produto.categoria = undefined;
        }
    }

    ngOnDestroy(): void {
        localStorage.removeItem(this.KEY_PRODUTO);
    }

    async carregarCamposDropdown(): Promise<void> {
        return new Promise<void>(async resolve => {
            await this.carregarCampoStatusProduto();
            await this.carregarCampoTipoProduto();
            await this.carregarCampoMarca(undefined, undefined, true);
            await this.carregarCampoDepartamento(undefined, undefined, true);
            await this.carregarCampoCategoria(undefined, undefined, true, undefined);
            resolve();
        });
    }

    async carregarCampoStatusProduto(codigo?: number, descricao?: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaStatusProduto = [];
            this.statusProdutoService.buscar(codigo, descricao, true).pipe(
                tap((response) => {
                    for (let obj of response) {
                        this.listaStatusProduto.push({
                            label: `${obj.descricao}`,
                            value: obj
                        });
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

    async carregarCampoTipoProduto(codigo?: number, descricao?: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaTiposProduto = [];
            this.tipoProdutoService.buscar(codigo, descricao, true).pipe(
                tap((response) => {
                    for (let obj of response) {
                        this.listaTiposProduto.push({
                            label: `${obj.descricao}`,
                            value: obj
                        });
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

    async carregarCampoMarca(codigo: number, nome: string, indicadorAtivo: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaMarcas = [];
            this.marcaService.buscar(codigo, nome, indicadorAtivo, true).pipe(
                tap((response) => {
                    for (let obj of response) {
                        this.listaMarcas.push({
                            label: `${obj.codigo} - ${obj.nome}`,
                            value: obj
                        });
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

    async carregarCampoDepartamento(codigo: number, nome: string, indicadorAtivo: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaDepartamentos = [];
            this.departamentoService.buscar(codigo, nome, indicadorAtivo, true).pipe(
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
                    reject(error);
                    return of();
                })
            ).subscribe({
                next: () => resolve(),
                error: (erro) => reject(erro)
            });
        });
    }

    async carregarCampoCategoria(codigo: number, nome: string, indicadorAtivo: boolean, codigoDepartamento: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaCategorias = [];
            this.categoriaService.buscar(codigo, nome, indicadorAtivo, codigoDepartamento, true).pipe(
                tap((response) => {
                    for (let obj of response) {
                        this.listaCategorias.push({
                            label: `${obj.codigo} - ${obj.nome}`,
                            value: obj
                        });
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

    onDepartamentoChange(departamento: SelectItem): void {
        this.listaCategorias = [];
        this.produto.categoria = undefined;
        let departamentoSelecionado: Departamento = departamento.value;
        if (ValidationUtils.isNotEmpty(departamentoSelecionado)) {
            this.carregarCampoCategoria(undefined, undefined, true, departamentoSelecionado.codigo);
        }
    }

    recuperarProdutoNoLocalStorage() {
        let produto = localStorage.getItem(this.KEY_PRODUTO);
        if (produto) {
            return JSON.parse(localStorage.getItem(this.KEY_PRODUTO));
        }
        return produto;
    }

    async carregarInformacoesImagensProduto(codigoProduto: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.listaImagensProduto = [];
            this.imagemProdutoService.buscar(undefined, undefined, codigoProduto, true).pipe(
                tap((response) => {
                    this.listaImagensProduto = [...response];
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

    carregarImagens(): void {
        this.imagens = [];
        if (ValidationUtils.isNotEmpty(this.listaImagensProduto) && this.listaImagensProduto.length >= 0) {
            this.imagens = this.listaImagensProduto.map(imagem => ({
                itemImageSrc: imagem.urlImagem,
                thumbnailImageSrc: imagem.urlImagem,
                previewImageSrc: true,
                alt: imagem.nome
            }));
        }
    }

    voltarResumoProduto(): void {
        localStorage.removeItem(this.KEY_PRODUTO);
        this.router.navigateByUrl('produto');
    }

    limparFiltros(): void {
        this.produto = new Produto();
    }

    async salvar(): Promise<void> {
        const filtrosValido = await this.validarCamposObrigatorios();
        if (filtrosValido) {
            if (this.isEditando) {
                this.atualizarProduto();
            } else {
                this.cadastrarProduto();
            }
        }
    }

    async validarCamposObrigatorios(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto)) {
                this.notificacaoService.aviso('Nenhum dado do produto encontrado! Informe os dados!', undefined, false, 10);
                return resolve(false);
            }

            const listaCamposObrigatorios: any[] = [
                { valor: this.produto.nome, mensagem: 'Nome do produto não encontrado! Informe o nome!' },
                { valor: this.produto.codigoBarrasEAN, mensagem: 'Código de barras EAN do produto não encontrado! Informe o código de barras EAN!' },
                { valor: this.produto.statusProduto?.codigo, mensagem: 'Status do produto não encontrado! Informe o status!' },
                { valor: this.produto.tipoProduto?.codigo, mensagem: 'Tipo do produto não encontrado! Informe o tipo!' },
                { valor: this.produto.preco, mensagem: 'Preço do produto não encontrado! Informe o preço!' },
                { valor: this.produto.quantidadeEstoque, mensagem: 'Quantidade de estoque do produto não encontrada! Informe a quantidade de estoque!' },
                { valor: this.produto.marca?.codigo, mensagem: 'Marca do produto não encontrada! Informe a marca!' },
                { valor: this.produto.departamento?.codigo, mensagem: 'Departamento do produto não encontrado! Informe o departamento!' },
                { valor: this.produto.categoria?.codigo, mensagem: 'Categoria do produto não encontrada! Informe a categoria!' }
            ];

            for (const campo of listaCamposObrigatorios) {
                if (ValidationUtils.isEmpty(campo.valor)) {
                    this.notificacaoService.aviso(campo.mensagem, undefined, false, 10);
                    return resolve(false);
                }
            }

            if (this.produto.codigoBarrasEAN.length < 13) {
                this.notificacaoService.aviso('Código de barras EAN inválido! Informe um código de barras EAN com 13 dígitos!', undefined, false, 10);
                return resolve(false);
            }
            if (this.produto.preco <= 0) {
                this.notificacaoService.aviso('Preço do produto inválido! Informe um preço maior que zero!', undefined, false, 10);
                return resolve(false);
            }

            resolve(true);
        });
    }

    atualizarProduto(): void {
        if (!ValidationUtils.isNotUndefinedAndNotNull(this.produto.codigo)) {
            this.notificacaoService.aviso('Código do produto não encontrado para atualizar!', undefined, false, 10);
            return;
        }

        this.produtoService.atualizar(this.produto, true).pipe(
            tap((response) => {
                this.produto = response;
                this.notificacaoService.sucesso('Produto atualizado com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    cadastrarProduto(): void {
        this.produtoService.cadastrar(this.produto, true).pipe(
            tap((response) => {
                this.produto = response;
                this.notificacaoService.sucesso('Produto cadastrado com sucesso!', undefined, false, 10);
                this.desabilitarCampos = true;
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    abrirDialogUploadImagem(): void {
        this.mostrarDialogUploadImagem = true;
    }

    async uploadImagem(listaArquivos: FileUpload, fileUpload: FileUpload): Promise<void> {
        let produtoValido: boolean = await this.validarCamposObrigatorios();
        if (produtoValido) {
            let listaImagensProdutoUpload: ImagemProduto[] = await this.processarImagensProduto(listaArquivos);
            await this.cadastrarImagensProduto(listaImagensProdutoUpload);
            this.carregarImagens();
            this.mostrarDialogUploadImagem = false;
        }
        fileUpload.clear();
    }

    async processarImagensProduto(listaArquivos: FileUpload): Promise<ImagemProduto[]> {
        let listaImagensProdutoUpload: ImagemProduto[] = [];
        for (let arquivo of listaArquivos.files) {
            let arquivoBase64: string = await ConverterUtils.converterArquivoEmBase64(arquivo);
            const tipoExtensaoImagem = this.obterExtensaoArquivo(arquivo.name);
            listaImagensProdutoUpload.push(this.montarObjetoImagemProduto(arquivo.name, arquivo.size, tipoExtensaoImagem, arquivoBase64));
        };
        return listaImagensProdutoUpload;
    }

    obterExtensaoArquivo(nomeArquivo: string): string {
        const partes = nomeArquivo.split('.');
        if (partes.length > 1) {
            return `.${partes.pop()?.toLowerCase()}`;
        } else {
            throw new Error('O arquivo não possui uma extensão válida!');
        }
    }

    montarObjetoImagemProduto(nomeImagem: string, tamanhoArquivo: number, tipoExtensaoImagem: string, arquivoBase64: string): ImagemProduto {
        let imagemProduto: ImagemProduto = new ImagemProduto();
        imagemProduto.nome = nomeImagem;
        imagemProduto.tamanhoImagemBytes = tamanhoArquivo;
        imagemProduto.codigoProduto = this.produto.codigo;
        imagemProduto.tipoExtensaoImagem = tipoExtensaoImagem;
        imagemProduto.arquivoBase64 = arquivoBase64;
        return imagemProduto;
    }

    async cadastrarImagensProduto(listaImagensProdutoUpload: ImagemProduto[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.imagemProdutoService.cadastrar(listaImagensProdutoUpload, true).pipe(
                tap((response) => {
                    this.listaImagensProduto = [...this.listaImagensProduto, ...response];
                    this.notificacaoService.sucesso('Upload das imagens realizado com sucesso!', undefined, false, 10);
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

    expandirImagem(): void {
        this.mostrarImagemExpandida = true;
    }

    baixarImagem(imagemSelecionada: ImagemProduto): void {
        if (ValidationUtils.isEmpty(imagemSelecionada)) {
            this.notificacaoService.aviso('Imagem não encontrada para baixar!', undefined, false, 10);
            return;
        }
        this.imagemProdutoService.baixarImagem(imagemSelecionada.codigoProduto, imagemSelecionada.nomeImagemServidor, true).pipe(
            tap((response) => {
                saveAs(new File([response], imagemSelecionada.nomeImagemServidor, { type: response.type }));
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    excluirImagem(imagemSelecionada: ImagemProduto): void {
        if (ValidationUtils.isEmpty(imagemSelecionada)) {
            this.notificacaoService.aviso('Imagem não encontrada para excluir!', undefined, false, 10);
            return;
        }
        this.imagemProdutoService.excluirImagem(imagemSelecionada.codigoProduto, imagemSelecionada.codigo, imagemSelecionada.nomeImagemServidor, true).pipe(
            tap((response) => {
                this.listaImagensProduto = this.listaImagensProduto.filter(imagem => imagem.codigo != imagemSelecionada.codigo);
                this.carregarImagens();
                this.notificacaoService.sucesso('Imagem: ' + imagemSelecionada.codigo + ' excluída com sucesso!', undefined, false, 10);
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

}
