import { IModule } from './interfaces';
import * as dot from "dot";
export declare class Configuration {
    private _include;
    private _exclude;
    private _settings;
    private _input;
    private _output;
    private _tokens;
    private _templates;
    constructor(name: string, inputDir: string, outDir: string, modules: IModule[]);
    readonly include: string[];
    readonly exclude: string[];
    readonly settings: any;
    readonly inputDir: string;
    readonly outputDir: string;
    readonly tokens: any;
    readonly templateSettings: dot.TemplateSettings;
    readonly templates: string[];
    private _readTemplateSettings(config);
}
