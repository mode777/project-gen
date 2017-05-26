import { IModule } from './interfaces';
export declare class Configuration {
    private _include;
    private _exclude;
    private _settings;
    private _input;
    private _output;
    private _tokens;
    private _templates;
    private _clear;
    constructor(modules: IModule[]);
    name: string;
    inputDir: string;
    outputDir: string;
    clearOutput: boolean;
    readonly include: string[];
    readonly exclude: string[];
    readonly settings: any;
    readonly tokens: any;
    readonly templateSettings: any;
    readonly templates: string[];
    private _readTemplateSettings(config);
}
