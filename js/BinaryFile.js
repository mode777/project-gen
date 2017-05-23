"use strict";
const FileBase_1 = require("./FileBase");
const fs_extra_1 = require("fs-extra");
const path = require("path");
class BinaryFile extends FileBase_1.FileBase {
    process() {
        let targetPath;
        fs_extra_1.mkdirpSync(path.dirname(this.outputName));
        fs_extra_1.copySync(this.inputName, this.outputName);
    }
}
exports.BinaryFile = BinaryFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmluYXJ5RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CaW5hcnlGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx5Q0FBc0M7QUFDdEMsdUNBQWdEO0FBQ2hELDZCQUE2QjtBQUU3QixnQkFBd0IsU0FBUSxtQkFBUTtJQUU3QixPQUFPO1FBQ1YsSUFBSSxVQUFrQixDQUFDO1FBRXZCLHFCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMxQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FFSjtBQVRELGdDQVNDIn0=