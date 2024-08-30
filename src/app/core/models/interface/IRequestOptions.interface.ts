import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: any;
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
    body?: any;
}
