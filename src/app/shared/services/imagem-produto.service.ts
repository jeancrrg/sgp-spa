import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { ImagemProduto } from "../models/cadastro/ImagemProduto.model";
import { HttpParams } from "@angular/common/http";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";

@Injectable({
    providedIn: 'root',
})
export class ImagemProdutoService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, codigoProduto: number, loader: boolean): Observable<ImagemProduto[]> {
        let params = new HttpParams();
        if (ValidationUtils.isNotUndefinedAndNotNull(codigo)) {
            params = params.append('codigo', codigo + '');
        }
        if (ValidationUtils.stringNotEmpty(nome)) {
            params = params.append('nome', nome);
        }
        if (ValidationUtils.isNotUndefinedAndNotNull(codigoProduto)) {
            params = params.append('codigoProduto', codigoProduto + '');
        }
        return this.requisicaoHttpService.Get<ImagemProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'imagens-produto', {params: params}, loader, false, false);
    }

    cadastrar(listaImagensProduto: ImagemProduto[], loader: boolean): Observable<ImagemProduto[]> {
        return this.requisicaoHttpService.Post<ImagemProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'imagens-produto', listaImagensProduto, {}, loader, false, false);
    }

}
