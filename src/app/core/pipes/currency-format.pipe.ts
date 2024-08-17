import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
​
@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
​
    transform(value: number, currencyCode: string = ' ', symbolDisplay: boolean = false, digits?: string): string {
        if (value == null || value == undefined) {
            return '';
        }
        let currencyPipe: CurrencyPipe = new CurrencyPipe('pt-BR');
        if (currencyCode == null || currencyCode == undefined) {
            currencyCode = 'BRL'
        }
        let newValue: string = currencyPipe.transform(value, currencyCode, symbolDisplay ? 'symbol' : undefined, digits);
        /* if(value < 0){
            newValue = '(' + newValue.replace('- ','').trim() + ')'
        } */
        if (!symbolDisplay) {
            newValue = newValue.replace('R$','').trim();
        }
        return newValue;
    }
​
}