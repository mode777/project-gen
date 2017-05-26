"use strict";
const path = require("path");
class FileBase {
    constructor(path, config) {
        this._config = config;
        this._input = path;
        this._createOutputName();
    }
    get config() { return this._config; }
    get outputName() { return this._outputName; }
    get inputName() { return this._input; }
    _replacePathTokens(path) {
        const tokens = this._config.tokens;
        Object.keys(tokens)
            .forEach(token => path = path.replace(new RegExp("\\$" + token + "\\$", 'g'), tokens[token]));
        return path;
    }
    _createOutputName() {
        const relativePath = path.relative(this._config.inputDir, this._input);
        this._outputName = this._replacePathTokens(path.join(this._config.outputDir, relativePath));
    }
}
exports.FileBase = FileBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRmlsZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDZCQUE2QjtBQUc3QjtJQU9JLFlBQVksSUFBWSxFQUFFLE1BQXFCO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFjLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFL0MsSUFBVyxVQUFVLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQVcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUlwQyxrQkFBa0IsQ0FBQyxJQUFZO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2QsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUMsS0FBSyxHQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztDQUdKO0FBbENELDRCQWtDQyJ9