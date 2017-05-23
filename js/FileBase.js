"use strict";
const path = require("path");
class FileBase {
    constructor(path, config) {
        this._config = config;
        this._input = path;
        this._createOutputName();
    }
    get outputName() { return this._outputName; }
    get inputName() { return this._input; }
    _replacePathTokens(path) {
        const tokens = this._config.tokens;
        Object.keys(tokens)
            .forEach(token => path = path.replace(new RegExp("$$" + token + "$$", 'g'), tokens[token]));
        return path;
    }
    _createOutputName() {
        const relativePath = path.relative(this._config.inputDir, this._input);
        this._outputName = this._replacePathTokens(path.join(this._config.outputDir, relativePath));
    }
}
exports.FileBase = FileBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRmlsZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDZCQUE2QjtBQUc3QjtJQVFJLFlBQVksSUFBWSxFQUFFLE1BQXFCO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFVBQVUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsSUFBVyxTQUFTLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBSXBDLGtCQUFrQixDQUFDLElBQVk7UUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDZCxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksR0FBQyxLQUFLLEdBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0NBR0o7QUFqQ0QsNEJBaUNDIn0=