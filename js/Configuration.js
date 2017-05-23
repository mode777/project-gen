"use strict";
const underscore = require("underscore");
class Configuration {
    constructor(name, inputDir, outDir, modules) {
        let merged = underscore.extend({ settings: {}, include: [], exclude: [] }, ...modules);
        this._exclude = merged.exclude;
        this._include = merged.include;
        this._settings = merged.settings;
        this._input = inputDir;
        this._output = outDir;
        merged.settings.projectname = name;
    }
    get include() { return this._include; }
    get exclude() { return this._exclude; }
    get settings() { return this._settings; }
    get inputDir() { return this._input; }
    get outputDir() { return this._output; }
}
exports.Configuration = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBeUM7QUFFekM7SUFRSSxZQUFZLElBQVksRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxPQUFrQjtRQUMxRSxJQUFJLE1BQU0sR0FBWSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRWhHLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWpDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBVyxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFXLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsSUFBVyxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdDLElBQVcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUNsRDtBQTFCRCxzQ0EwQkMifQ==