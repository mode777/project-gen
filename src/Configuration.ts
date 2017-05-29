import { IModule } from './interfaces';
import * as underscore from 'underscore';
import * as dot from "dot";

const defaultTemplateSettings = {
    evaluate: "\\$\\$([\\s\\S]+?)\\$\\$",
    interpolate: "\\$\\$=([\\s\\S]+?)\\$\\$",
    encode: "\\$\\$!([\\s\\S]+?)\\$\\$",
    use: "\\{\\{#([\\s\\S]+?)\\}\\}",
    define: "\\$\\$##\\s*([\w\\.$]+)\\s*(\\:|=)([\\s\\S]+?)#\\$\\$",
    conditional: "\\$\\$\\?(\\?)?\\s*([\\s\\S]*?)\\s*\\$\\$",
    iterate: "\\$\\$~\\s*(?:\\$\\$|([\\s\\S]+?)\\s*\\:\\s*([\\w$]+)\\s*(?:\\:\\s*([\\w$]+))?\\s*\\$\\$)",
    varname: "it",
    strip: false,
    append: true,
    selfcontained: false
}

export class Configuration {

    private _include: string[];
    private _exclude: string[];
    private _settings: any;
    private _input: string;
    private _output: string;
    private _tokens: any;
    private _templates: string[];
    private _clear: boolean;

    constructor(modules: IModule[]){
        let merged = <IModule>underscore.extend({ 
                settings: {}, 
                include: [], 
                exclude: [], 
                tokens: {},
                templates: [],
                templateSettings: {},
            }, { 
                templateSettings: defaultTemplateSettings 
            }, ...modules);
        
        this._exclude = merged.exclude;
        this._include = merged.include;
        this._settings = merged.settings;
        this._tokens = merged.tokens;
        this._templates = merged.templates
            .map(ext => ext.toLowerCase());

        this._readTemplateSettings(merged.templateSettings);
    }

    public get name() { return this.tokens.projectname; }
    public set name(value: string) { this.tokens.projectname = value; }

    public get inputDir() { return this._input; }
    public set inputDir(value: string) { this._input = value; }

    public get outputDir() { return this._output; }
    public set outputDir(value: string) { this._output = value }

    public get clearOutput() { return this._clear; }
    public set clearOutput(value: boolean) { this._clear = value; }

    public get include() { return this._include; }
    public get exclude() { return this._exclude; }
    public get settings() { return this._settings; }
    public get tokens() { return this._tokens; }
    public get templateSettings() { return dot.templateSettings; }
    public get templates() { return this._templates; }

    private _readTemplateSettings(config: any) {
        const settings = dot.templateSettings;
        const setDotRegex = (name: string) => settings[name] = config[name] != undefined 
            ? new RegExp(config[name], "g") 
            : settings[name];
        const setDotOption = (name: string) => settings[name] = config[name] != undefined 
            ? config[name]
            : settings[name];

        setDotRegex("evaluate");
        setDotRegex("interpolate");
        setDotRegex("encode");
        setDotRegex("use");
        setDotRegex("define");
        setDotRegex("conditional");
        setDotRegex("iterate");

        setDotOption("varname");
        setDotOption("strip");
        setDotOption("append");
        setDotOption("selfcontained");      
    }


}