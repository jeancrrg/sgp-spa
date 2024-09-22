import { Injectable } from "@angular/core";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";
import { StatusProduto } from "../models/cadastro/StatusProduto.model";

@Injectable({
    providedIn: 'root',
})
export class StatusProdutoService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, descricao: string, loader: boolean): Observable<StatusProduto[]> {
        let parametros = new HttpParams();
        if (ValidationUtils.isNotEmpty(codigo)) {
            parametros = parametros.append('codigo', codigo + '');
        }
        if (ValidationUtils.isNotEmpty(descricao)) {
            parametros = parametros.append('descricao', descricao);
        }
        return this.requisicaoHttpService.Get<StatusProduto[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'status-produto', {params: parametros}, loader, false, false);
    }

}
