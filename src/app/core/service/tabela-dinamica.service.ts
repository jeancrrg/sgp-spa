import { Injectable } from '@angular/core';
import { TablePrimeColumOptions } from '../components/dynamic-table/TablePrimeColumOptions';
import { ValidationUtils } from '../utils/ValidationUtils.util';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class TabelaDinamicaService {

    constructor(
        private datePipe: DatePipe
    ) {}

    montarListaDadosExportacao(colunas: TablePrimeColumOptions[], dados: any[]): any[] {
		return dados.map(dado => {
			const linha = {};

			colunas.forEach(coluna => {
				let valor = this.buscarDado(dado, coluna.field);

				if (ValidationUtils.isNotUndefinedAndNotNull(valor)) {
					if (coluna.currencyField) {
                        valor = this.formatarCampoMoeda(valor);
                    }
                    if (coluna.boolField) {
						valor = valor ? 'SIM' : 'NÃO';
					}
                    if (coluna.dateField) {
                        valor = this.datePipe.transform(valor, 'dd/MM/yyyy HH:mm');
                    }
				} else {
					valor = '';
				}
				linha[coluna.header] = valor;
			});

			return linha;
		});
	}

    buscarDado(obj: any, caminho: string): any {
        if (ValidationUtils.isNotUndefinedAndNotNull(caminho)) {
            return caminho.split('.').reduce((acumulador, parte) => acumulador && acumulador[parte], obj);
        } else {
            return undefined;
        }
    }

    formatarCampoMoeda(valor: any): string {
        return `R$ ${valor.toFixed(2)}`;
    }

}
