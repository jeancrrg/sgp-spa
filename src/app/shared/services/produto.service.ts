import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { Produto } from "../models/cadastro/Produto.model";
import { HttpParams } from "@angular/common/http";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";

@Injectable({
    providedIn: 'root',
})
export class ProdutoService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, codigoTipoProduto: number, codigoStatusProduto: number, indicadorSemEstoque: boolean, loader: boolean): Observable<Produto[]> {
        let parametros = new HttpParams();
        if (ValidationUtils.isNotEmpty(codigo)) {
            parametros = parametros.append('codigo', codigo + '');
        }
        if (ValidationUtils.isNotEmpty(nome)) {
            parametros = parametros.append('nome', nome);
        }
        if (ValidationUtils.isNotEmpty(codigoTipoProduto)) {
            parametros = parametros.append('codigoTipoProduto', codigoTipoProduto + '');
        }
        if (ValidationUtils.isNotEmpty(codigoStatusProduto)) {
            parametros = parametros.append('codigoStatusProduto', codigoStatusProduto + '');
        }
        if (ValidationUtils.isNotEmpty(indicadorSemEstoque)) {
            parametros = parametros.append('indicadorSemEstoque', indicadorSemEstoque + '');
        }
        return this.requisicaoHttpService.Get<Produto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'produtos', {params: parametros}, loader, false, false);
    }

    cadastrar(produto: Produto, loader: boolean): Observable<Produto> {
        return this.requisicaoHttpService.Post<Produto>(this.configuracaoAuxiliarService.getContextoSistema() + 'produtos', produto, {}, loader, false, false);
    }

    atualizar(produto: Produto, loader: boolean): Observable<Produto> {
        return this.requisicaoHttpService.Put<Produto>(this.configuracaoAuxiliarService.getContextoSistema() + 'produtos', produto, {}, loader, false, false);
    }

    inativar(codigo: number, loader: boolean): Observable<void> {
        return this.requisicaoHttpService.Delete<void>(this.configuracaoAuxiliarService.getContextoSistema() + 'produtos/' + codigo, {}, loader, false, false);
    }

}
