import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pxtDefault',
})
export class PxtDefaultPipe implements PipeTransform {
    transform(value: any, defaultValue: string): any {
        return ValidationUtils.isNotUndefinedAndNotNull(value)
            ? value
            : defaultValue;
    }
}
