"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (this._cancel)
            return;
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
            return v.toString(16).toUpperCase();
        }));
    }
    _guidFor(name) {
        if (!this._guids[name])
            this._guids[name] = this._guid();
        return this._guids[name];
    }
}
exports.TemplateFile = TemplateFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVtcGxhdGVGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RlbXBsYXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF5QjtBQUN6QiwyQkFBMkI7QUFDM0IsNkJBQTZCO0FBQzdCLHVDQUFnRDtBQUVoRCx5Q0FBc0M7QUFFdEMsa0JBQTBCLFNBQVEsbUJBQVE7SUFBMUM7O1FBR1ksWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsRUFBRSxDQUFDO0lBa0R4QixDQUFDO0lBaERVLE9BQU87UUFDVixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixNQUFNLENBQUM7UUFFWCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixxQkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sbUJBQW1CO1FBQ3ZCLE1BQU0sQ0FBQztZQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUM5QixNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUk7WUFDakMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztTQUN6QyxDQUFBO0lBQ0wsQ0FBQztJQUVPLFNBQVM7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRU8scUJBQXFCO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2QsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssR0FBQyxLQUFLLEdBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0gsQ0FBQztJQUVPLEtBQUs7UUFDVCxNQUFNLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQztZQUN0RSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRU8sUUFBUSxDQUFDLElBQVk7UUFDekIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FJSjtBQXRERCxvQ0FzREMifQ==