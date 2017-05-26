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
    constructor(name, inputDir, outDir, modules) {
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
        this._input = inputDir;
        this._output = outDir;
        merged.tokens.projectname = name;
        this._readTemplateSettings(merged.templateSettings);
    }
    get include() { return this._include; }
    get exclude() { return this._exclude; }
    get settings() { return this._settings; }
    get inputDir() { return this._input; }
    get outputDir() { return this._output; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBeUM7QUFDekMsMkJBQTJCO0FBRTNCLE1BQU0sdUJBQXVCLEdBQUc7SUFDNUIsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLE1BQU0sRUFBRSwyQkFBMkI7SUFDbkMsR0FBRyxFQUFFLDJCQUEyQjtJQUNoQyxNQUFNLEVBQUUsdURBQXVEO0lBQy9ELFdBQVcsRUFBRSwyQ0FBMkM7SUFDeEQsT0FBTyxFQUFFLDJGQUEyRjtJQUNwRyxPQUFPLEVBQUUsSUFBSTtJQUNiLEtBQUssRUFBRSxLQUFLO0lBQ1osTUFBTSxFQUFFLElBQUk7SUFDWixhQUFhLEVBQUUsS0FBSztDQUN2QixDQUFBO0FBRUQ7SUFVSSxZQUFZLElBQVksRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxPQUFrQjtRQUMxRSxJQUFJLE1BQU0sR0FBWSxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsU0FBUyxFQUFFLEVBQUU7WUFDYixnQkFBZ0IsRUFBRSxFQUFFO1NBQ3ZCLEVBQUU7WUFDQyxnQkFBZ0IsRUFBRSx1QkFBdUI7U0FDNUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMs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