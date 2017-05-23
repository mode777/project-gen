import { Configuration } from './Configuration';
import * as glob from 'glob';
import { IFile } from './interfaces';

export class FileProcessor {

    private _config: Configuration;
    private _files: IFile[]

    constructor(config: Configuration){
        this._config = config;
    }

    public collect() {

    }

    private _collectFiles(){
        let collection = {};
        this._config.include.forEach(pattern =>
            glob.sync(pattern).forEach(file => collection[file] = true));
        
        

    }  

}