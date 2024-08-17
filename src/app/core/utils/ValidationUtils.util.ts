import ObjectUtils from "./ObjectUtils.util";

export abstract class ValidationUtils {

    public static REGEX_ONLY_NUMBER = /^\d+$/;

    public static isOnlyNumber(str: string): boolean {
        return ValidationUtils.REGEX_ONLY_NUMBER.test(str);
    }

    public static isNotUndefinedAndNotNull(obj: any): boolean {
        return obj !== undefined && obj !== null && obj != 'null';
    }

    private static objectEmpty(obj: any): boolean {
        return obj == null || obj == undefined || obj == 'null' || obj == 'undefined';
    }

    private static arrayEmpty(obj: any[]): boolean {
        return obj.length == 0;
    }

    static isDate(obj: any): boolean {
        return obj instanceof Date;
    }

    public static stringNotEmpty(obj): boolean {
        return this.isNotUndefinedAndNotNull(obj) && obj != '' && obj;
    }

    public static stringEmpty(obj): boolean {
        return !this.stringNotEmpty(obj);
    }

    public static isString(value: any) {
        return value instanceof String || typeof value == 'string';
    }

    public static isArray(obj: any) : boolean {
        return Array.isArray(obj);
    }

    public static isValidCpf(cpf: string): boolean {
        if (!this.stringNotEmpty(cpf)) return false;

        var soma = 0, resto;
        if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222"
            || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555"
            || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888"
            || cpf == "99999999999") {

            return false;
        }

        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    static isNotEmpty(obj, props?: string[]): boolean {
        return !this.isEmpty(obj, props);
    }

    static isEmpty(obj: any, props?: string[]): boolean {
        if (this.objectEmpty(obj))
            return true;
        if (this.isString(obj))
            return this.stringEmpty(obj + '');
        if (this.isArray(obj))
            return this.arrayEmpty(obj);

        if (props && props.length > 0) {
            for (let prop of props) {
                const valueOfProp = ObjectUtils.propertyValue(obj, prop);
                if (this.objectEmpty(valueOfProp))
                    return true;
                if (this.isString(valueOfProp) && this.stringEmpty(valueOfProp))
                    return true;
                if (this.isArray(valueOfProp) && this.arrayEmpty(valueOfProp))
                    return true;
            }
        }

        //else if not empty
        return false;
    }

}
