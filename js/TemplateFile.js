"use strict";
const fs = require("fs");
const dot = require("dot");
const path = require("path");
const fs_extra_1 = require("fs-extra");
const FileBase_1 = require("./FileBase");
class TemplateFile extends FileBase_1.FileBase {
    constructor() {
        super(...arguments);
        this._cancel = false;
        this._guids = {};
    }
    process() {
        this._readFile();
        this._fileContent = dot.template(this._fileContent)(this._createTemplateData());
        this._replaceContentTokens();
        fs_extra_1.mkdirpSync(path.dirname(this.outputName));
        fs.writeFileSync(this.outputName, this._fileContent);
    }
    _createTemplateData() {
        return {
            tokens: this.config.tokens,
            settings: this.config.settings,
            cancel: () => this._cancel = true,
            guid: this._guid,
            guidFor: (name) => this._guidFor(name)
        };
    }
    _readFile() {
        this._fileContent = fs.readFileSync(this.inputName, "utf8");
    }
    _replaceContentTokens() {
        const tokens = this.config.tokens;
        Object.keys(tokens)
            .forEach(token => this._fileContent = this._fileContent.replace(new RegExp("\\$" + token + "\\$", 'g'), tokens[token]));
    }
    _guid() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    }
    _guidFor(name) {
        if (!this._guids[name])
            this._guids[name] = this._guid();
        return this._guids[name];
    }
}
exports.TemplateFile = TemplateFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVtcGxhdGVGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RlbXBsYXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUMzQiw2QkFBNkI7QUFDN0IsdUNBQWdEO0FBRWhELHlDQUFzQztBQUV0QyxrQkFBMEIsU0FBUSxtQkFBUTtJQUExQzs7UUFHWSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxFQUFFLENBQUM7SUErQ3hCLENBQUM7SUE3Q1UsT0FBTztRQUNWLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFDL0UsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IscUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLG1CQUFtQjtRQUN2QixNQUFNLENBQUM7WUFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDOUIsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJO1lBQ2pDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztZQUNoQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDekMsQ0FBQTtJQUNMLENBQUM7SUFFTyxTQUFTO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNkLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUMsS0FBSyxHQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFFTyxLQUFLO1FBQ1QsTUFBTSxDQUFDLENBQUMsc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDdEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFZO1FBQ3pCLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBSUo7QUFuREQsb0NBbURDIn0=