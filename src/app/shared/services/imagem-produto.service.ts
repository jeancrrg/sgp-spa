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
        let parametros = new HttpParams();
        if (ValidationUtils.stringNotEmpty(codigo)) {
            parametros = parametros.append('codigo', codigo + '');
        }
        if (ValidationUtils.stringNotEmpty(nome)) {
            parametros = parametros.append('nome', nome);
        }
        if (ValidationUtils.stringNotEmpty(codigoProduto)) {
            parametros = parametros.append('codigoProduto', codigoProduto + '');
        }
        return this.requisicaoHttpService.Get<ImagemProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'imagens-produto', {params: parametros}, loader, false, false);
    }

    cadastrar(listaImagensProduto: ImagemProduto[], loader: boolean): Observable<ImagemProduto[]> {
        return this.requisicaoHttpService.Post<ImagemProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'imagens-produto', listaImagensProduto, {}, loader, false, false);
    }

    baixarImagem(codigoProduto: number, nomeImagemServidor: string, loader: true): Observable<Blob> {
        let parametros = new HttpParams();
        parametros = parametros.append('codigoProduto', codigoProduto + '');
        parametros = parametros.append('nomeImagemServidor', nomeImagemServidor);

        return this.requisicaoHttpService.Get<Blob>(this.configuracaoAuxiliarService.getContextoSistema() + 'imagens-produto/download',
            {params: parametros, responseType: 'blob' as 'json'}, loader, false, false);
    }

}
