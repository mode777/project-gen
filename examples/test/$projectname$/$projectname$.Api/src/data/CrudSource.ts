import { DataSource, Modals } from "./../common/index";
import { ReadableSource, ExtendedDataSourceOptions } from "./ReadableSource";

export class CrudSource<T extends kendo.data.Model> extends ReadableSource<T>{
    constructor(model: typeof kendo.data.Model, options: ExtendedDataSourceOptions = {}, controller: string = (<any>model).name || model.toString().match(/function\s*?([^\(\s]+)/i)[1]) {
        // model match is for IE Browsers before Version 12

        let defaults: ExtendedDataSourceOptions = {
            transport: {
                create: {
                    type: "POST",
                    url: `api/${controller}`,
                    contentType: "application/json"
                },
                update: {
                    type: "PUT",
                    url: `api/${controller}`,
                    contentType: "application/json"
                },
                destroy: {
                    type: "DELETE",
                    url: `api/${controller}`,
                    contentType: "application/json"
                },
                parameterMap: function (data, type) {
                    if (type != "read") {
                        return kendo.stringify(data);
                    }
                    else {
                        return data;
                    }
                }
            },
        }

        let newOptions = $.extend(true, defaults, options);
        

        super(model, newOptions, controller);
    }
}