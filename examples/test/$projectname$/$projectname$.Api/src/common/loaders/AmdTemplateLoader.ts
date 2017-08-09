import { ITemplateLoader } from "./../interfaces";

declare let require: (args: string[], callback: (val: any) => void, errorCallback?: (error: any) => void) => void;

export class AmdTemplateLoader implements ITemplateLoader {
    
    constructor(private _basePath: string = "$html/"){
    
    }

    loadTemplateAsync(template: string) {
        return new Promise<string>((resolve, reject) => {
            require(["text!" + this._basePath + template],
                (t) => resolve(t),
                (e) => reject(e));
        });
    }
}