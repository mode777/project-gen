"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQXlDO0FBRXpDO0lBUUksWUFBWSxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsT0FBa0I7UUFDMUUsSUFBSSxNQUFNLEdBQVksVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUV0QixNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDOUMsSUFBVyxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hELElBQVcsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFXLFNBQVMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDbEQ7QUExQkQsc0NBMEJDIn0=