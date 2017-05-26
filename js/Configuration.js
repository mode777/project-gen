"use strict";
const underscore = require("underscore");
const dot = require("dot");
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
};
class Configuration {
    constructor(modules) {
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
        this._exclude = merged.exclude;
        this._include = merged.include;
        this._settings = merged.settings;
        this._tokens = merged.tokens;
        this._templates = merged.templates
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBeUM7QUFDekMsMkJBQTJCO0FBRTNCLE1BQU0sdUJBQXVCLEdBQUc7SUFDNUIsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLE1BQU0sRUFBRSwyQkFBMkI7SUFDbkMsR0FBRyxFQUFFLDJCQUEyQjtJQUNoQyxNQUFNLEVBQUUsdURBQXVEO0lBQy9ELFdBQVcsRUFBRSwyQ0FBMkM7SUFDeEQsT0FBTyxFQUFFLDJGQUEyRjtJQUNwRyxPQUFPLEVBQUUsSUFBSTtJQUNiLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLElBQUk7SUFDWixhQUFhLEVBQUUsS0FBSztDQUN2QixDQUFBO0FBRUQ7SUFXSSxZQUFZLE9BQWtCO1FBQzFCLElBQUksTUFBTSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDaEMsUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7WUFDVixTQUFTLEVBQUUsRUFBRTtZQUNiLGdCQUFnQixFQUFFLEVBQUU7U0FDdkIsRUFBRTtZQUNDLGdCQUFnQixFQUFFLHVCQUF1QjtTQUM1QyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFFbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVM7YUFDN0Is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