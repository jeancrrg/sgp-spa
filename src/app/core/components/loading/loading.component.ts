import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {

    @Input() loading?: boolean = false;
    @Input() mensagem: string = "Aguarde...";

    constructor() {

    }

    ngOnInit(): void {

    }

}
