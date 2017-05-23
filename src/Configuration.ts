import { IModule } from './interfaces';
import * as underscore from 'underscore';

export class Configuration {

    private _include: string[];
    private _exclude: string[];
    private _settings: any;
    private _input: string;
    private _output: string;

    constructor(name: string, inputDir: string, outDir: string, modules: IModule[]){
        let merged = <IModule>underscore.extend({ settings: {}, include: [], exclude: [] }, ...modules);
        
        this._exclude = merged.exclude;
        this._include = merged.include;
        this._settings = merged.settings;
        
        this._input = inputDir;
        this._output = outDir;

        merged.settings.projectname = name;
    }

    public get include() { return this._include; }
    public get exclude() { return this._exclude; }
    public get settings() { return this._settings; }
    public get inputDir() { return this._input; }
    public get outputDir() { return this._output; }
}