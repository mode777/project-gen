import * as glob from 'glob';
import * as path from 'path';
import * as file from 'fs';
import { IModule } from './interfaces';

export class ModuleLoader {   

    private _root: string;
    private _modules: {[key: string]: IModule } = {};

    constructor(root: string){
        this._root = root;
        this._load();
    }

    get root() { return this._root; }

    public setModule(name: string, module: IModule){
        this._modules[name] = module;
    }

    public getModule(name: string){
        return this._modules[name];
    }

    public getModules() {
        return Object.keys(this._modules).map(key => this._modules[key]);
    }

    private _load(){
        let files = glob.sync(path.join(this._root, "*.project.json"));
        files.forEach(f => {
            let name = path.basename(f).split(".")[0];
            let module = <IModule>require(f);
            module.name = name;
            this._modules[name] = module; 
        }); 
    }   

}