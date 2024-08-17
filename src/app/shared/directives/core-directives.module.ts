import { NumbersOnlyDirective } from './numbers-only.directive';
import { UppercaseInputDirective } from './uppercase.directive';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        UppercaseInputDirective,
        NumbersOnlyDirective,
    ],
    exports: [
        UppercaseInputDirective,
        NumbersOnlyDirective,
    ]
})
export class CoreDirectivesModule { }
