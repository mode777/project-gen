import { IModule } from './interfaces';
import * as underscore from 'underscore';

export class Configuration {

    include: string[];
    exclude: string[];
    userData: any;

    constructor(modules: IModule[]){
        underscore.extend(this, ...modules)
    }
}