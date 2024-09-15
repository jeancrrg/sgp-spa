import { Injectable } from "@angular/core";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { TipoProduto } from "../models/cadastro/TipoProduto.model";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";

@Injectable({
    providedIn: 'root',
})
export class TipoProdutoService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, descricao: string, loader: boolean): Observable<TipoProduto[]> {
        let params = new HttpParams();
        if (ValidationUtils.isNotUndefinedAndNotNull(codigo)) {
            params = params.append('codigo', codigo + '');
        }
        if (ValidationUtils.stringNotEmpty(descricao)) {
            params = params.append('descricao', descricao);
        }
        return this.requisicaoHttpService.Get<TipoProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'tipos-produto', {params: params}, loader, false, false);
    }

}
