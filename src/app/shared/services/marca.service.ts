import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";
import { Marca } from "../models/cadastro/Marca.model";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MarcaService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, indicadorAtivo: boolean, loader: boolean): Observable<Marca[]> {
        let params = new HttpParams();
        if (ValidationUtils.isNotUndefinedAndNotNull(codigo)) {
            params = params.append('codigo', codigo + '');
        }
        if (ValidationUtils.stringNotEmpty(nome)) {
            params = params.append('nome', nome + '');
        }
        if (ValidationUtils.isNotUndefinedAndNotNull(indicadorAtivo)) {
            params = params.append('indicadorAtivo', indicadorAtivo + '');
        }
        return this.requisicaoHttpService.Get<Marca[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'marcas', {params: params}, loader, false, false);
    }

    salvar(marca: Marca, loader: boolean): Observable<Marca> {
        return this.requisicaoHttpService.Post<Marca>(this.configuracaoAuxiliarService.getContextoSistema() + 'marcas', marca, {}, loader, false, false);
    }

    atualizar(marca: Marca, loader: boolean): Observable<Marca> {
        return this.requisicaoHttpService.Put<Marca>(this.configuracaoAuxiliarService.getContextoSistema() + 'marcas', marca, {}, loader, false, false);
    }

    inativar(codigo: number, loader: boolean): Observable<void> {
        return this.requisicaoHttpService.Delete<void>(this.configuracaoAuxiliarService.getContextoSistema() + 'marcas/' + codigo, {}, loader, false, false);
    }

}
