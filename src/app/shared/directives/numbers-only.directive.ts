import {Directive, ElementRef, HostListener, Input, OnChanges} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

    @Input() maxValue: number;
    @Input() minValue: number;
    @Input() pad: number;

    constructor(private el: ElementRef, public model: NgModel) {}

    setModelValue(value){
        this.model.viewToModelUpdate(value);
        this.model.valueAccessor.writeValue(value);
    }

    checkIfValueIsHigher(pad = false) {
        let value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
        if (this.maxValue && Number(value) > this.maxValue) {
            value = this.maxValue;
        }
        if (this.minValue && Number(value) < this.minValue) {
            value = this.minValue;
        }
        if (pad && this.pad && Number(value) < 10) {
            value = value.toString().padStart(this.pad,'0');
        }
        this.el.nativeElement.value = value;
        this.setModelValue(value);
    }

    @HostListener('keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57) ){
            event.stopImmediatePropagation();
            event.preventDefault();
            this.checkIfValueIsHigher();
            return false;
        }
        return true;
    }

    @HostListener('blur', ['$event'])
    blurEvent(event: KeyboardEvent) {
        this.checkIfValueIsHigher(true);
    }


}
