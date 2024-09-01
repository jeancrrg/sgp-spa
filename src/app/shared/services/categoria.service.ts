import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { Categoria } from "../models/Categoria.model";
import { ValidationUtils } from "src/app/core/utils/ValidationUtils.util";

@Injectable({
    providedIn: 'root',
})
export class CategoriaService {

    constructor(
        private requisicaoHttpService: RequisicaoHttpService,
        private configuracaoAuxiliarService: ConfiguracaoAuxiliarService
    ) { }

    buscar(codigo: number, nome: string, indicadorAtivo: boolean, codigoDepartamento: number, loader: boolean): Observable<Categoria[]> {
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
        if (ValidationUtils.isNotUndefinedAndNotNull(codigoDepartamento)) {
            params = params.append('codigoDepartamento', codigoDepartamento + '');
        }
        return this.requisicaoHttpService.Get<Categoria[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', {params: params}, loader, false, false);
    }

    salvar(categoria: Categoria, loader: boolean): Observable<Categoria> {
        return this.requisicaoHttpService.Post<Categoria>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', categoria, {}, loader, false, false);
    }

    atualizar(categoria: Categoria, loader: boolean): Observable<Categoria> {
        return this.requisicaoHttpService.Put<Categoria>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', categoria, {}, loader, false, false);
    }

    inativar(codigo: number, loader: boolean): Observable<void> {
        return this.requisicaoHttpService.Delete<void>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias/' + codigo, {}, loader, false, false);
    }

}
