import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

class Notificacao {
    severity: string;
    summary: string;
    detail: string;
    key: string;
    closable: boolean = true;
    life: number = 600000;
}

const SEGUNDOS_EXIBICAO_PADRAO = 3 * 1000;

@Injectable({
    providedIn: 'root',
})
export class NotificacaoService {
    constructor(public messageService: MessageService) {}

    informacao(
        mensagem: string,
        limparAnteriores?: boolean,
        titulo?: string,
        codigoNotificacao?: string,
        segundosExibicao?: number
    ) {
        if (limparAnteriores) {
            this.messageService.clear();
        }
        let obj = new Notificacao();
        obj.severity = 'info';
        obj.detail = mensagem;
        obj.summary = titulo ? titulo : 'Informação';
        obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
        obj.life =
            segundosExibicao && segundosExibicao > 0
                ? segundosExibicao * 1000
                : SEGUNDOS_EXIBICAO_PADRAO;
        this.messageService.add(obj);
    }

    aviso(
        mensagem: string,
        titulo?: string,
        limparAnteriores?: boolean,
        codigoNotificacao?: string,
        segundosExibicao?: number
    ) {
        if (limparAnteriores) {
            this.messageService.clear();
        }
        let obj = new Notificacao();
        obj.severity = 'warn';
        obj.detail = mensagem;
        obj.summary = titulo ? titulo : 'Aviso';
        obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
        obj.life =
            segundosExibicao && segundosExibicao > 0
                ? segundosExibicao * 1000
                : SEGUNDOS_EXIBICAO_PADRAO;
        this.messageService.add(obj);
    }

    erro(
        mensagem: string,
        titulo?: string,
        limparAnteriores?: boolean,
        codigoNotificacao?: string,
        segundosExibicao?: number
    ) {
        if (limparAnteriores) {
            this.messageService.clear();
        }
        let obj = new Notificacao();
        obj.severity = 'error';
        obj.detail = mensagem;
        obj.summary = titulo ? titulo : 'Erro';
        obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
        obj.life =
            segundosExibicao && segundosExibicao > 0
                ? segundosExibicao * 1000
                : SEGUNDOS_EXIBICAO_PADRAO;
        this.messageService.add(obj);
    }

    sucesso(
        mensagem: string,
        titulo?: string,
        limparAnteriores?: boolean,
        codigoNotificacao?: string,
        segundosExibicao?: number
    ) {
        if (limparAnteriores) {
            this.messageService.clear();
        }
        let obj = new Notificacao();
        obj.severity = 'success';
        obj.detail = mensagem;
        obj.summary = titulo ? titulo : 'Sucesso';
        obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
        obj.life =
            segundosExibicao && segundosExibicao > 0
                ? segundosExibicao * 1000
                : SEGUNDOS_EXIBICAO_PADRAO;
        this.messageService.add(obj);
    }

    clear(codigoNotificacao?: string) {
        this.messageService.clear(codigoNotificacao);
    }
}
