"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const fsx = require("fs-extra");
const TemplateFile_1 = require("./TemplateFile");
const BinaryFile_1 = require("./BinaryFile");
class Generator {
    constructor(config) {
        this._files = [];
        this._config = config;
    }
    collect() {
        let collection = {};
        this._config.include.forEach(pattern => glob.sync(path.join(this._config.inputDir, pattern))
            .filter(file => !fs.lstatSync(file).isDirectory())
            .forEach(file => collection[file] = true));
        this._files = Object.keys(collection)
            .map(file => this._isTemplateExtension(file)
            ? new TemplateFile_1.TemplateFile(file, this._config)
            : new BinaryFile_1.BinaryFile(file, this._config));
        return this;
    }
    process() {
        // create output dir if it doesn't exist
        fsx.mkdirpSync(this._config.outputDir);
        // clear output dir.
        if (this._config.clearOutput)
            fsx.emptyDirSync(this._config.outputDir);
        this._files.forEach(file => {
            console.info(file.outputName);
            file.process();
        });
        return this;
    }
    _isTemplateExtension(file) {
        return this._config.templates.indexOf(path.extname(file).toLowerCase()) >= 0;
    }
}
exports.Generator = Generator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLGdDQUFnQztBQUloQyxpREFBOEM7QUFDOUMsNkNBQTBDO0FBRTFDO0lBS0ksWUFBWSxNQUFxQjtRQUZ6QixXQUFNLEdBQVksRUFBRSxDQUFDO1FBR3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMvQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqRCxPQUFPLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDaEMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2NBQ3RDLElBQUksMkJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztjQUNwQyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDVix3Q0FBd0M7UUFDeEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLG9CQUFvQjtRQUNwQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUN4QixHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxJQUFZO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBR0o7QUE1Q0QsOEJBNENDIn0=