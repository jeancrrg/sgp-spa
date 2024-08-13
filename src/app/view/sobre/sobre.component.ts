import { Component, OnInit } from '@angular/core';

declare var require: any;
var package_json = require('package.json');

@Component({
    selector: 'app-sobre',
    templateUrl: './sobre.component.html',
    styleUrl: './sobre.component.scss',
})
export class SobreComponent implements OnInit {

    nomeSistema: string = package_json.name;
    versaoSistema: string = package_json.version;

    constructor() {}

    ngOnInit(): void {}

}
