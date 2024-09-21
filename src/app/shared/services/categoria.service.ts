import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfiguracaoAuxiliarService } from "src/app/core/service/configuracao.auxiliar.service";
import { RequisicaoHttpService } from "src/app/core/service/requisicaoHttp.service";
import { Categoria } from "../models/cadastro/Categoria.model";
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
        let parametros = new HttpParams();
        if (ValidationUtils.stringNotEmpty(codigo)) {
            parametros = parametros.append('codigo', codigo + '');
        }
        if (ValidationUtils.stringNotEmpty(nome)) {
            parametros = parametros.append('nome', nome);
        }
        if (ValidationUtils.stringNotEmpty(indicadorAtivo)) {
            parametros = parametros.append('indicadorAtivo', indicadorAtivo + '');
        }
        if (ValidationUtils.stringNotEmpty(codigoDepartamento)) {
            parametros = parametros.append('codigoDepartamento', codigoDepartamento + '');
        }
        return this.requisicaoHttpService.Get<Categoria[]>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', {params: parametros}, loader, false, false);
    }

    cadastrar(categoria: Categoria, loader: boolean): Observable<Categoria> {
        return this.requisicaoHttpService.Post<Categoria>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', categoria, {}, loader, false, false);
    }

    atualizar(categoria: Categoria, loader: boolean): Observable<Categoria> {
        return this.requisicaoHttpService.Put<Categoria>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias', categoria, {}, loader, false, false);
    }

    inativar(codigo: number, loader: boolean): Observable<void> {
        return this.requisicaoHttpService.Delete<void>(this.configuracaoAuxiliarService.getContextoSistema() + 'categorias/' + codigo, {}, loader, false, false);
    }

}
