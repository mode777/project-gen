import { IModule } from './interfaces';
import * as underscore from 'underscore';
import * as dot from "dot";

const defaultTemplateSettings = {
    evaulate: "\\$\\$([\\s\\S]+?)\\$\\$",
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

    constructor(name: string, inputDir: string, outDir: string, modules: IModule[]){
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
        this._templates = merged.templates.map(ext => ext.toLocaleLowerCase());

        this._input = inputDir;
        this._output = outDir;

        merged.tokens.projectname = name;
        this._parseTemplateSettings(merged.templateSettings);
    }

    public get include() { return this._include; }
    public get exclude() { return this._exclude; }
    public get settings() { return this._settings; }
    public get inputDir() { return this._input; }
    public get outputDir() { return this._output; }
    public get tokens() { return this._tokens; }
    public get templateSettings() { return dot.templateSettings; }
    public get templates() { return this._templates; }

    private _parseTemplateSettings(config: any) {
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