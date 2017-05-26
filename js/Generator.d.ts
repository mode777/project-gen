import { Configuration } from './Configuration';
export declare class Generator {
    private _config;
    private _files;
    constructor(config: Configuration);
    collect(): this;
    process(): this;
    private _isTemplateExtension(file);
}
