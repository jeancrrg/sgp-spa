import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent implements OnInit {

    @Input()
    listaMenuItens: MenuItem[] = [];

    constructor() {}

    ngOnInit() {

    }

}
