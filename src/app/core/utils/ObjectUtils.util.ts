export default class ObjectUtils {

    static clone<T>(object: T) {
        return Object.assign({}, object);
    }

    static propertyValue(object: any, propertyName: string) {
        if (!object || object == null || object == undefined || object == 'null' || object == 'undefined') {
            return undefined;
        }
        if (propertyName.trim() == '' || propertyName.trim().length == 0) {
            return undefined;
        }
        let arrayProperties: string[] = [];
        if (propertyName) {
            propertyName = propertyName.concat('.');
            arrayProperties = propertyName.split('.');
        }
        let value = Object.assign({}, object);
        for (let i = 0; i < arrayProperties.length; i++) {
            const propertyTemp: string = arrayProperties[i];
            if (propertyTemp && propertyTemp.trim().length > 0) {
                value = value[arrayProperties[i]];
                if (value == undefined || value == null) {
                    return undefined;
                }
            }
        }
        return value;
    }

}
