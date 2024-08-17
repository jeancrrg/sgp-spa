import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtSimNaoPipe } from './pxt-sim-nao.pipe';
import { PxtDefaultPipe } from './pxt-default.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PxtSimNaoPipe,
        PxtDefaultPipe,
        SafeHtmlPipe,
        CurrencyFormatPipe,
    ],
    exports: [
        PxtSimNaoPipe,
        PxtDefaultPipe,
        SafeHtmlPipe,
        CurrencyFormatPipe,
    ]
})
export class CorePipesModule { }
