import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";
import { Marca } from "../models/Marca.model";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";

@Injectable({
    providedIn: 'root',
})
export class MarcaService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, indicadorAtivo: boolean, loader: boolean) {
        let params = new HttpParams();
        if (ValidationUtils.isNotUndefinedAndNotNull(codigo)) {
            params = params.append('codigo', codigo + '');
        }
        if (ValidationUtils.isNotUndefinedAndNotNull(nome)) {
            params = params.append('nome', nome + '');
        }
        if (ValidationUtils.isNotUndefinedAndNotNull(indicadorAtivo)) {
            params = params.append('indicadorAtivo', indicadorAtivo + '');
        }
        console.log('Params: ', params);
        return this.requisicaoHttpService.Get<Marca[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'marcas', {params: params}, loader, false, false);
    }


}
