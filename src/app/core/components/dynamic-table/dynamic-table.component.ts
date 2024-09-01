import {Component, OnInit, Input, ViewChild, Output, EventEmitter, TemplateRef} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import ObjectUtils from '../../utils/ObjectUtils.util';
import { ValidationUtils } from '../../utils/ValidationUtils.util';
import { TablePrimeColumOptions } from './TablePrimeColumOptions';

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent implements OnInit {

    @Input() columns: TablePrimeColumOptions[];
    @Input() value: any[] = [];
    @Input() paginator: boolean = true;
    @Input() responsive: boolean = true;
    @Input() rowsPerPage: boolean = true;
    @Input() rowsPerPageOptions: number[];
    @Input() paginatorPosition: string = 'bottom';
    @Input() dataKey: string;
    @Input() rows: number = 5;
    @Input() labelGlobalFilter: string = 'Pesquise aqui...';
    @Input() globalFilterFields: string[];
    @Input() caption: string;
    @Input() lazy: boolean = false;
    @Input() totalRecords: number;
    @Input() emptyMessage: string = 'Nenhum registro encontrado';
    @Input() selectionMode: string;
    @Input() pTemplateHeader: TemplateRef<any>;

    selectionList: any[];
    @Output() selectionChange = new EventEmitter();
    @Input() highligthRow: boolean = true;
    @Output() onPaginationSortChange: EventEmitter<LazyLoadEvent> =
        new EventEmitter<LazyLoadEvent>();
    @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('tabela') tabela: Table;

    constructor() {}

    @Input()
    get selection() {
        return this.selectionList;
    }

    set selection(_selection) {
        this.selectionList = _selection;
        this.selectionChange.emit(this.selectionList);
    }

    ngOnInit() {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.updateRowsPerPageOptions();
        }, 1000);
    }

    isCellPhoneResolution() {
        return window.innerWidth <= 640;
    }

    print(e) {
        console.log(e);
    }

    loadLazy(event: LazyLoadEvent) {
        this.onPaginationSortChange.emit(event);
    }

    updateRowsPerPageOptions() {
        if (this.rowsPerPage) {
            this.rowsPerPageOptions = this.rowsPerPageOptions
                ? this.rowsPerPageOptions
                : [5, 10, 20, 50, 100];
            if (
                this.value &&
                !this.rowsPerPageOptions.includes(this.value.length)
            ) {
                this.rowsPerPageOptions.push(this.value.length);
            }
            this.rowsPerPageOptions.sort((a, b) =>
                a < b ? -1 : a > b ? 1 : 0
            );
        }
    }

    onRowSelectChange(data: any) {
        this.onRowSelect.emit(data.data);
    }

    onRowUnselectChange(data: any) {
        this.onRowUnselect.emit(data.data);
    }

    reset() {
        this.tabela.reset();
    }

    teste(field: any) {
        return field;
    }

    fieldRowData(rowData: any, field: string) {
        return ObjectUtils.propertyValue(rowData, field);
        let arrayField: string[] = [];
        if (field) {
            field = field.concat('.');
            arrayField = field.split('.');
        }
        let value = Object.assign({}, rowData);
        for (let i = 0; i < arrayField.length; i++) {
            const fieldTemp: string = arrayField[i];
            if (fieldTemp && fieldTemp.trim().length > 0) {
                value = value[arrayField[i]];
                if (!value) {
                    return undefined;
                }
            }
        }
        return value;
    }

    stringNotEmpty(value) {
        return ValidationUtils.stringNotEmpty(value);
    }
}
