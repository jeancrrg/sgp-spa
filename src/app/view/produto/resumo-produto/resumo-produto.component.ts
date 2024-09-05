import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { TipoProdutoService } from '../../../shared/services/tipoProduto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { DynamicTableComponent } from 'src/app/core/components/dynamic-table/dynamic-table.component';
import { TablePrimeColumOptions } from 'src/app/core/components/dynamic-table/TablePrimeColumOptions';
import { Produto } from 'src/app/shared/models/cadastro/Produto.model';
import { StatusProduto } from 'src/app/shared/models/cadastro/StatusProduto.model';
import { TipoProduto } from 'src/app/shared/models/cadastro/TipoProduto.model';
import { StatusProdutoService } from 'src/app/shared/services/statusProduto.service';

@Component({
    selector: 'app-resumo-produto',
    templateUrl: './resumo-produto.component.html',
    styleUrl: './resumo-produto.component.scss',
})
export class ResumoProdutoComponent implements OnInit {

    itemsBreadCrumb: MenuItem[] = [];
    filtroCodigoProduto: number;
    filtroNomeProduto: string;
    filtroTipoProduto: TipoProduto;
    listaTiposProdutos: SelectItem[] = [];
    filtroStatusProduto: StatusProduto;
    listaStatusProdutos: SelectItem[] = [];
    filtroIndicadorSemEstoque: boolean = false;
    listaProdutos: Produto[] = [];

    @ViewChild('tabelaProduto') tabelaProduto: DynamicTableComponent;

    colunasTabelaProduto: TablePrimeColumOptions[] = [
        { header: 'Código', field: 'codigo', width: '10%', align: 'center' },
        { header: 'Nome', field: 'nome', width: '25%', align: 'center' },
        { header: 'Preço', field: 'preco', width: '10%', align: 'center'},
        { header: 'Tipo', field: 'departamento.nome', width: '10%', align: 'center'},
        { header: 'Estoque', field: 'quantidadeEstoque', width: '10%', align: 'center'},
        { header: 'Status', field: 'codigoStatus', width: '10%', align: 'center'},
        { header: 'Última Alteração', field: 'dataUltimaAlteracao', dateField: true, datePipe: 'dd/MM/yyyy HH:mm', width: '15%', align: 'center' },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-pencil", command: (categoria) =>
            this.abrirDetalhesProduto(), tooltip: "Editar" },
        { header: '', width: '5%', align: 'center', buttonField: true, iconButton: "pi pi-times", command: (categoria) =>
            this.inativarProduto(), tooltip: "Inativar" }
    ];

    constructor(
        private router: Router,
        private notificacaoService: NotificacaoService,
        private tipoProdutoService: TipoProdutoService,
        private statusProdutoService: StatusProdutoService
    ) { }

    ngOnInit(): void {
        this.itemsBreadCrumb.push({ icon: 'pi pi-home', routerLink: ['/']});
        this.itemsBreadCrumb.push({ label: 'Cadastro'});
        this.itemsBreadCrumb.push({ label: 'Produto' });
        this.itemsBreadCrumb.push({ label: 'Resumo' });

        this.carregarFiltros();
    }

    carregarFiltros(): void {
        this.carregarFiltroTipoProduto();
        this.carregarFiltroStatusProduto();
    }

    carregarFiltroTipoProduto(): void {
        this.listaTiposProdutos = [];
        this.tipoProdutoService.buscar(undefined, undefined, true).pipe(
            tap((response) => {
                let indice = 0;

                for (let obj of response) {
                    this.listaTiposProdutos.push({
                        label: `${obj.descricao}`,
                        value: obj
                    });
                    indice++;
                }
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    carregarFiltroStatusProduto(): void {
        this.listaStatusProdutos = [];
        this.statusProdutoService.buscar(undefined, undefined, true).pipe(
            tap((response) => {
                let indice = 0;

                for (let obj of response) {
                    this.listaStatusProdutos.push({
                        label: `${obj.descricao}`,
                        value: obj
                    });
                    indice++;
                }
            }),
            catchError((error) => {
                this.notificacaoService.erro(error.error, undefined, false, 10);
                return of();
            })
        ).subscribe();
    }

    pesquisar(): void {

    }

    limparFiltros(): void {

    }

    abrirDetalhesProduto(): void {
        this.router.navigateByUrl('produto/detalhe');
    }

    exportarExcel(): void {

    }

    inativarProduto(): void {

    }

}
