import { IViewLoader, ViewLoaderOptions } from "./../interfaces";
import { AmdCssLoader } from "./AmdCssLoader";
import { AmdTemplateLoader } from "./AmdTemplateLoader";

declare let require: (args: string[], callback: (val: any) => void, errorCallback?: (error: any) => void) => void;

let defaults: ViewLoaderOptions = {
    basePath: "views/",
    cssLoader: new AmdCssLoader(),
    templateLoader: new AmdTemplateLoader(),
    suffix: "View"
}

export class AmdViewLoader implements IViewLoader {

    private _options: ViewLoaderOptions;

    constructor(options: ViewLoaderOptions = {}) {
        this._options = $.extend({}, defaults, options);
    }

    async loadViewAsync(name: string) {
        return new Promise<kendo.View>((resolve, reject) => {
            require([this._options.basePath + name + this._options.suffix],
                async (t) => {
                    t = t.default;
                    let template = "";

                    if (t.template)
                        template = await this._options.templateLoader.loadTemplateAsync(t.template)

                    if (t.css)
                        this._options.cssLoader.loadCss(t.css);

                    let view = new t(template);

                    resolve(view)
                },
                (e) => reject(e));
        });
    }
}