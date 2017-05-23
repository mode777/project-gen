"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
class Template {
    constructor(root) {
        this._modules = {};
        this._root = root;
        this._load();
    }
    get root() { return this._root; }
    setModule(name, module) {
        this._modules[name] = module;
    }
    getModule(name) {
        return this._modules[name];
    }
    getModules() {
        return Object.keys(this._modules).map(key => this._modules[key]);
    }
    _load() {
        let files = glob.sync(path.join(this._root, "*.project.json"));
        files.forEach(f => {
            let name = path.basename(f).split(".")[0];
            let module = require(f);
            module.name = name;
            this._modules[name] = module;
        });
    }
}
exports.Template = Template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBSTdCO0lBS0ksWUFBWSxJQUFZO1FBRmhCLGFBQVEsR0FBOEIsRUFBRSxDQUFDO1FBRzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRTFCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsTUFBZTtRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU0sU0FBUyxDQUFDLElBQVk7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLFVBQVU7UUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVPLEtBQUs7UUFDVCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDL0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxNQUFNLEdBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKO0FBbENELDRCQWtDQyJ9