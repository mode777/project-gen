"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL01vZHVsZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFJN0I7SUFLSSxZQUFZLElBQVk7UUFGaEIsYUFBUSxHQUE4QixFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFMUIsU0FBUyxDQUFDLElBQVksRUFBRSxNQUFlO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxTQUFTLENBQUMsSUFBWTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sVUFBVTtRQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sS0FBSztRQUNULElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUMvRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLE1BQU0sR0FBWSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUo7QUFsQ0Qsb0NBa0NDIn0=