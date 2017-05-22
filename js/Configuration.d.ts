import { IModule } from './interfaces';
export declare class Configuration {
    include: string[];
    exclude: string[];
    userData: any;
    constructor(modules: IModule[]);
}
