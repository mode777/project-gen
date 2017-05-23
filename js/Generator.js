"use strict";
const glob = require("glob");
const BinaryFile_1 = require("./BinaryFile");
const path = require("path");
class Generator {
    constructor(config) {
        this._files = [];
        this._config = config;
    }
    collect() {
        let collection = {};
        this._config.include.forEach(pattern => glob.sync(path.join(this._config.inputDir, pattern))
            .forEach(file => collection[file] = true));
        this._files = Object.keys(collection)
            .map(file => {
            return new BinaryFile_1.BinaryFile(file, this._config);
        });
        return this;
    }
    process() {
        this._files.forEach(file => {
            console.info(file.outputName);
            file.process();
        });
        return this;
    }
}
exports.Generator = Generator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkJBQTZCO0FBRTdCLDZDQUEwQztBQUMxQyw2QkFBNkI7QUFFN0I7SUFLSSxZQUFZLE1BQXFCO1FBRnpCLFdBQU0sR0FBWSxFQUFFLENBQUM7UUFHekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQy9DLE9BQU8sQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNoQyxHQUFHLENBQUMsSUFBSTtZQUNMLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUdKO0FBakNELDhCQWlDQyJ9