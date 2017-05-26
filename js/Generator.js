"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsZ0NBQWdDO0FBSWhDLGlEQUE4QztBQUM5Qyw2Q0FBMEM7QUFFMUM7SUFLSSxZQUFZLE1BQXFCO1FBRnpCLFdBQU0sR0FBWSxFQUFFLENBQUM7UUFHekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQy9DLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pELE9BQU8sQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNoQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Y0FDdEMsSUFBSSwyQkFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2NBQ3BDLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFOUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNWLHdDQUF3QztRQUN4QyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsb0JBQW9CO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLG9CQUFvQixDQUFDLElBQVk7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7Q0FHSjtBQTVDRCw4QkE0Q0MifQ==