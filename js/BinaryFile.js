"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileBase_1 = require("./FileBase");
const fs_extra_1 = require("fs-extra");
const path = require("path");
class BinaryFile extends FileBase_1.FileBase {
    process() {
        fs_extra_1.mkdirpSync(path.dirname(this.outputName));
        fs_extra_1.copySync(this.inputName, this.outputName);
    }
}
exports.BinaryFile = BinaryFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmluYXJ5RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CaW5hcnlGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQXNDO0FBQ3RDLHVDQUFnRDtBQUNoRCw2QkFBNkI7QUFFN0IsZ0JBQXdCLFNBQVEsbUJBQVE7SUFFN0IsT0FBTztRQUNWLHFCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMxQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FFSjtBQVBELGdDQU9DIn0=