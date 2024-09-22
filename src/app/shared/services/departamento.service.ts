import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { Observable } from "rxjs";
import { Departamento } from "../models/cadastro/Departamento.model";

@Injectable({
    providedIn: 'root',
})
export class DepartamentoService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, indicadorAtivo: boolean, loader: boolean): Observable<Departamento[]> {
        let parametros = new HttpParams();
        if (ValidationUtils.isNotEmpty(codigo)) {
            parametros = parametros.append('codigo', codigo + '');
        }
        if (ValidationUtils.isNotEmpty(nome)) {
            parametros = parametros.append('nome', nome);
        }
        if (ValidationUtils.isNotEmpty(indicadorAtivo)) {
            parametros = parametros.append('indicadorAtivo', indicadorAtivo + '');
        }
        return this.requisicaoHttpService.Get<Departamento[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'departamentos', {params: parametros}, loader, false, false);
    }

    cadastrar(departamento: Departamento, loader: boolean): Observable<Departamento> {
        return this.requisicaoHttpService.Post<Departamento>(this.configuracaoAuxiliarService.getContextoSistema() + 'departamentos', departamento, {}, loader, false, false);
    }

    atualizar(departamento: Departamento, loader: boolean): Observable<Departamento> {
        return this.requisicaoHttpService.Put<Departamento>(this.configuracaoAuxiliarService.getContextoSistema() + 'departamentos', departamento, {}, loader, false, false);
    }

    inativar(codigo: number, loader: boolean): Observable<void> {
        return this.requisicaoHttpService.Delete<void>(this.configuracaoAuxiliarService.getContextoSistema() + 'departamentos/' + codigo, {}, loader, false, false);
    }

}
