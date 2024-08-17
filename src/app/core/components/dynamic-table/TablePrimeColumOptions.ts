export class TablePrimeColumOptions {
    field?: string = '';
    header?: string = '';
    subField?: string;
    width?: string;
    align?: string;
    sortField?: string;
    dateField?: boolean = false;
    datePipe?: string;
    currencyField?: boolean = false;
    buttonField?: boolean = false;
    iconButton?: string;
    command?: (data) => void;
    separator?: string;
    concatenateField?: string;
    headerTooltip?: string;
    tooltip?: string;
    boolField?: boolean = false;
    isUserInRule?: string;
    ellipsis?: boolean;
    disabled?: (data) => void;
    getThStyle?: (data) => void;
    getTdStyle?: (data) => void;
    getSpanStyle?: (data) => void;
    thStyle?: any;
    tdStyle?: any;
    spanStyle?: any;
}
