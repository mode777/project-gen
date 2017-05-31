"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRmlsZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw2QkFBNkI7QUFHN0I7SUFPSSxZQUFZLElBQVksRUFBRSxNQUFxQjtRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBYyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRS9DLElBQVcsVUFBVSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNwRCxJQUFXLFNBQVMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFJcEMsa0JBQWtCLENBQUMsSUFBWTtRQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNkLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFDLEtBQUssR0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Q0FHSjtBQWxDRCw0QkFrQ0MifQ==