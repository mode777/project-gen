"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const underscore = require("underscore");
const dot = require("dot");
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
};
class Configuration {
    constructor(modules) {
        this._include = [];
        this._exclude = [];
        this._settings = {};
        this._templates = [];
        let merged = underscore.extend({
            settings: {},
            include: [],
            exclude: [],
            tokens: {},
            templates: [],
            templateSettings: {},
        }, {
            templateSettings: defaultTemplateSettings
        }, ...modules);
        modules.forEach(m => {
            this._exclude = this._exclude.concat(m.exclude || []);
            this._include = this._include.concat(m.include || []);
            this._templates = this._templates.concat(m.templates || []);
        });
        this._settings = underscore.extend(this._settings, ...modules.map(m => m.settings || {}));
        this._tokens = merged.tokens;
        this._templates = this._templates
            .map(ext => ext.toLowerCase());
        this._readTemplateSettings(merged.templateSettings);
    }
    get name() { return this.tokens.projectname; }
    set name(value) { this.tokens.projectname = value; }
    get inputDir() { return this._input; }
    set inputDir(value) { this._input = value; }
    get outputDir() { return this._output; }
    set outputDir(value) { this._output = value; }
    get clearOutput() { return this._clear; }
    set clearOutput(value) { this._clear = value; }
    get include() { return this._include; }
    get exclude() { return this._exclude; }
    get settings() { return this._settings; }
    get tokens() { return this._tokens; }
    get templateSettings() { return dot.templateSettings; }
    get templates() { return this._templates; }
    _readTemplateSettings(config) {
        const settings = dot.templateSettings;
        const setDotRegex = (name) => settings[name] = config[name] != undefined
            ? new RegExp(config[name], "g")
            : settings[name];
        const setDotOption = (name) => settings[name] = config[name] != undefined
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
exports.Configuration = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQXlDO0FBQ3pDLDJCQUEyQjtBQUUzQixNQUFNLHVCQUF1QixHQUFHO0lBQzVCLFFBQVEsRUFBRSwwQkFBMEI7SUFDcEMsV0FBVyxFQUFFLDJCQUEyQjtJQUN4QyxNQUFNLEVBQUUsMkJBQTJCO0lBQ25DLEdBQUcsRUFBRSwyQkFBMkI7SUFDaEMsTUFBTSxFQUFFLHVEQUF1RDtJQUMvRCxXQUFXLEVBQUUsMkNBQTJDO0lBQ3hELE9BQU8sRUFBRSwyRkFBMkY7SUFDcEcsT0FBTyxFQUFFLElBQUk7SUFDYixLQUFLLEVBQUUsS0FBSztJQUNaLE1BQU0sRUFBRSxJQUFJO0lBQ1osYUFBYSxFQUFFLEtBQUs7Q0FDdkIsQ0FBQTtBQUVEO0lBV0ksWUFBWSxPQUFrQjtRQVR0QixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUlwQixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBSTlCLElBQUksTUFBTSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDaEMsUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7WUFDVixTQUFTLEVBQUUsRUFBRTtZQUNiLGdCQUFnQixFQUFFLEVBQUU7U0FDdkIsRUFBRTtZQUNDLGdCQUFnQixFQUFFLHVCQUF1QjtTQUM1QyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFFbkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RE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