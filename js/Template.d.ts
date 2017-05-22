import { IModule } from './interfaces';
export declare class Template {
    private _root;
    private _modules;
    constructor(root: string);
    readonly root: string;
    setModule(name: string, module: IModule): void;
    getModule(name: string): IModule;
    getModules(): IModule[];
    private _load();
}
