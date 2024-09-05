export class ConfirmacaoDialogDTO {
    key: string;
    header: string = 'Confirmação';
    message: string = 'Deseja realmente prosseguir com esta ação?';
    icon: string = 'pi pi-exclamation-triangle';
    acceptLabel: string = 'SIM';
    acceptVisible: boolean = true;
    rejectLabel: string = 'NÃO';
    rejectVisible: boolean = true;
    accept?: Function;
    reject?: Function;
}
