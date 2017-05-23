import { IModule } from './interfaces';
export declare class Configuration {
    private _include;
    private _exclude;
    private _settings;
    private _input;
    private _output;
    constructor(name: string, inputDir: string, outDir: string, modules: IModule[]);
    readonly include: string[];
    readonly exclude: string[];
    readonly settings: any;
    readonly inputDir: string;
    readonly outputDir: string;
}
