import { NotificacaoService } from 'src/app/core/service/notificacao.service';
import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root',
})
export class ExcelService {

    constructor(
        private loaderService: LoadingService,
        private notificacaoService: NotificacaoService
    ) {}

    public async exportarArquivoExcel(json: any[], nomeArquivo: string) {
        if (!ValidationUtils.isNotUndefinedAndNotNull(json) || json.length <= 0) {
            this.notificacaoService.informacao('Nenhum registro para ser exportado!');
            return;
        }

        this.loaderService.start();

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        await this.salvarArquivoExcel(excelBuffer, nomeArquivo);
        this.loaderService.stop();
    }

    private async salvarArquivoExcel(buffer: any, fileName: string) {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            //fileName + new Date().toString() + EXCEL_EXTENSION
            fileName + EXCEL_EXTENSION
        );
    }
}
