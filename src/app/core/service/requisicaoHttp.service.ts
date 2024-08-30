import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import { NotificacaoService } from './notificacao.service';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '../models/interface/IRequestOptions.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequisicaoHttpErro } from '../models/RequisicaoHttpErro.model';
import { ConfiguracaoAuxiliarService } from './configuracao.auxiliar.service';

export function requisicaoServiceCreator(httpClient: HttpClient, pxtNotificacaoService: NotificacaoService,
        configuracaoAuxiliarService: ConfiguracaoAuxiliarService, confirmationService: ConfirmationService,loadingService: LoadingService) {
    return new RequisicaoHttpService(httpClient, pxtNotificacaoService, configuracaoAuxiliarService, confirmationService, loadingService);
}

@Injectable()
export class RequisicaoHttpService {
    constructor(
        public http: HttpClient,
        public notificacao: NotificacaoService,
        public configuracaoAuxiliarService: ConfiguracaoAuxiliarService,
        public confirmationService: ConfirmationService,
        public loadingService: LoadingService
    ) {}

    private buildUrl(endPoint: string) {
        return endPoint.startsWith('http')
            ? endPoint
            : this.configuracaoAuxiliarService.getUrlBackendAtual() + endPoint;
    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public Get<T>(endPoint: string, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true) {
        return this.handleRequest(this.http.get<T>(this.buildUrl(endPoint), this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} body body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public Post<T>(endPoint: string, body: Object, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
        return this.handleRequest(this.http.post<T>(this.buildUrl(endPoint), body, this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} body body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public Put<T>(endPoint: string, body: Object, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
        return this.handleRequest(this.http.put<T>(this.buildUrl(endPoint), body, this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public Delete<T>(endPoint: string, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
        return this.handleRequest(this.http.delete<T>(this.buildUrl(endPoint), this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
    }

    handleRequest<T>(method: Observable<T>, loader?: boolean, handlerError: boolean = true) {
        if (loader) {
            this.loadingService.start();
        }
        return method.pipe(
            tap(
                (data) => {
                    if (loader) {
                        this.loadingService.done();
                    }
                    data;
                },
                (error) => {
                    this.loadingService.done();
                    if (handlerError) {
                        this.onCatchError(error);
                    }
                    return error;
                }
            )
        );
    }

    buildOptions(options: IRequestOptions, removeDefaultHeaders: boolean): IRequestOptions {
        return {...options,
            headers: removeDefaultHeaders
                ? options.headers
                : this.buildDefaultHeaders(),
        };
    }

    public buildDefaultHeaders(): HttpHeaders {
        const token = localStorage.getItem(environment.chaveToken);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Cache-Control', 'no-store');
        headers = headers.set('Pragma', 'no-cache');
        headers = headers.set('Cache-Control', 'no-cache');
        headers = headers.set('Access-Control-Allow-Origin', '*');
        headers = headers.set('Access-Control-Allow-Credentials', 'true');
        headers = headers.set(
            'Access-Control-Allow-Methods',
            'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS'
        );
        headers = headers.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, Accept'
        );

        headers = headers.set('Authorization', 'Bearer ' + token);

        return headers;
    }

    onCatchError(error: RequisicaoHttpErro) {
        let mensagem = error.error;
        try {
            mensagem =
                error != undefined &&
                error.error != undefined &&
                (<any>error.error).message != undefined
                    ? (<any>error.error).message
                    : error.error;
        } catch (error) {
            mensagem = error.error;
        }
        let accpetLogin = () => {
            localStorage.clear();
            window.location.href = this.configuracaoAuxiliarService.getUrlFrontendAutenticacao()  + '?sistema=' + this.configuracaoAuxiliarService.getContextoFrontendApp();
        };
        switch (error.status) {
            case 400:
                this.confirmationService.confirm({header: 'Atenção', message: mensagem, icon: 'ui-icon-cancel', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE});
                break;
            case 401:
                this.confirmationService.confirm({header: 'Atenção', message:'Sua sessão expirou. Você será direcionado para a tela de login.', acceptLabel: 'Ok', rejectVisible: false,
                    key:environment.KEY_DIALOG_HTTP_SERVICE, accept: accpetLogin});
                break;
            case 403:
                this.confirmationService.confirm({header: 'Não tem permissão a essa Informação', message: mensagem, icon: 'ui-icon-block', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE, accept: accpetLogin});
                break;
            case 404:
                this.confirmationService.confirm({header: 'Não existe a Informação', message: mensagem, icon: 'ui-icon-warning', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE});
                break;
            case 500:
                this.confirmationService.confirm({header: 'Erro', message: mensagem, icon: 'ui-icon-cancel', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE});
                break;
            case 502:
                this.confirmationService.confirm({header: 'Servidor fora do Ar', message: mensagem, icon: 'ui-icon-cancel', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE,});
                break;
            case 503:
                this.confirmationService.confirm({header: 'Servidor fora do Ar', message: mensagem, icon: 'ui-icon-cancel', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE,});
                break;
            default:
                let message = 'Ocorreu um erro não identificado ao realizar uma ou mais ações. Favor contactar o suporte.';
                this.confirmationService.confirm({header: 'Erro', message: message, icon: 'ui-icon-cancel', acceptLabel: 'Ok', rejectVisible: false,
                    key: environment.KEY_DIALOG_HTTP_SERVICE});
                break;
        }
    }
}
