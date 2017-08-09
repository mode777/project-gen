import { DataSource, Modals } from "./../common/index";

export interface ExtendedDataSourceOptions extends kendo.data.DataSourceOptions {
    loadall?: boolean;
}

export class ReadableSource<T extends kendo.data.Model> extends DataSource<T>{

    protected _model: typeof kendo.data.Model;
    protected _controller: string;
    protected _lastRequestType: string;

    constructor(model: typeof kendo.data.Model, options: ExtendedDataSourceOptions = {}, controller: string = (<any>model).name || model.toString().match(/function\s*?([^\(\s]+)/i)[1]) {
        let pagesize = 50;
        if (options.loadall === true) {
            pagesize = 999999;
        }

        let defaults: ExtendedDataSourceOptions = {
            transport: {
                read: {
                    type: "GET",
                    url: `api/${controller}`
                }
            },
            schema: {
                model: model,
                data: "content",
                total: "content.length",
            },
            pageSize: pagesize,
            error: (e) => {                
                var err = <any>(e.xhr ? e.xhr : e);
                if (err.responseText) {
                    var json = null;

                    try {
                        json = JSON.parse(err.responseText);
                        console.log(JSON.stringify(json.content || json.Message));
                        Modals.showMessage(json.error || json.Message);
                    }
                    catch (err) {
                        Modals.showMessage("Error: An error occured (" + err.statusCode + ")");
                    }

                    if (this._lastRequestType == "destroy") {
                        this.cancelChanges();
                    }
                }
                else
                    Modals.showMessage("Error: No connection to server.");
            },
            requestStart: (e) => {
                this._lastRequestType = e.type;
            }
        }

        let newOptions = $.extend(true, defaults, options);

        super(newOptions, model);

        this._model = model;
        this._controller = controller;
    }

    public async loadSingleAsync(id: string): Promise<T> {
        let raw = await $.get(`api/${this._controller}/${id}`);
        let model = new this._model(raw.content);
        return <T>model;
    }

}