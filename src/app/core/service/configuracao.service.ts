import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class ConfiguracaoService {

    config: any;

    constructor(private injector: Injector) {}

    load(url: string) {
        const injectHttp = this.injector.get(HttpClient);
        return new Promise<void>((resolve) => {
            injectHttp
                .get(url)
                .pipe(map((res) => res))
                .subscribe((config) => {
                    this.config = config;
                    resolve();
                });
        });
    }

    getConfiguration(key: string, value: string, endWithBar: boolean = true) {
        if (!key) {
            const urlWithElement = this.config[value];
            return endWithBar ? this.verifyUrl(urlWithElement) : urlWithElement;
        } else {
            const urlWithDataList = this.config[key][value];
            return endWithBar
                ? this.verifyUrl(urlWithDataList)
                : urlWithDataList;
        }
    }

    private verifyUrl(value: string) {
        if (value && !value.endsWith('/')) {
            // se url termina com '/'
            value = value + '/';
        }
        return value;
    }
}
