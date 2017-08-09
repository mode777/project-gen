import { ICssLoader } from "./../interfaces";

declare let require: (args: string[], callback: (val: any) => void, errorCallback?: (error: any) => void) => void;

export class AmdCssLoader implements ICssLoader {

    constructor(private _basePath: string = "$css/") {

    }

    loadCss(template: string) {
        require(["css!" + this._basePath + template], null);
    }
}