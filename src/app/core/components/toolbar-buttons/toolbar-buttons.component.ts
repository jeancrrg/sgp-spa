import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar-buttons',
    templateUrl: './toolbar-buttons.component.html',
    styleUrl: './toolbar-buttons.component.scss',
})
export class ToolbarButtonsComponent implements OnInit {

    @Input()
    stickyMode: boolean = false;

    constructor() {

    }

    ngOnInit(): void {

    }
}
