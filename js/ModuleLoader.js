"use strict";
const glob = require("glob");
const path = require("path");
class ModuleLoader {
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
exports.ModuleLoader = ModuleLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZHVsZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUk3QjtJQUtJLFlBQVksSUFBWTtRQUZoQixhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUc3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUxQixTQUFTLENBQUMsSUFBWSxFQUFFLE1BQWU7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxVQUFVO1FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTyxLQUFLO1FBQ1QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQy9ELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNYLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksTUFBTSxHQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQWxDRCxvQ0FrQ0MifQ==