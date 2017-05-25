"use strict";
const glob = require("glob");
const BinaryFile_1 = require("./BinaryFile");
const path = require("path");
const fs = require("fs");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkJBQTZCO0FBRTdCLDZDQUEwQztBQUMxQyw2QkFBNkI7QUFDN0IseUJBQXlCO0FBRXpCO0lBS0ksWUFBWSxNQUFxQjtRQUZ6QixXQUFNLEdBQVksRUFBRSxDQUFDO1FBR3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMvQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqRCxPQUFPLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDaEMsR0FBRyxDQUFDLElBQUk7WUFDTCxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FHSjtBQWxDRCw4QkFrQ0MifQ==