import { Configuration } from './Configuration';
import * as glob from 'glob';
import { IFile } from './interfaces';
import { BinaryFile } from './BinaryFile';
import * as path from 'path';

export class Generator {

    private _config: Configuration;
    private _files: IFile[] = [];

    constructor(config: Configuration){
        this._config = config;
    }

    public collect(){
        let collection = {};
        this._config.include.forEach(pattern =>
            glob.sync(path.join(this._config.inputDir, pattern))
                .forEach(file => collection[file] = true));
        
        this._files = Object.keys(collection)
            .map(file => {
                return new BinaryFile(file, this._config); 
            });

        return this;
    }

    public process(){
        this._files.forEach(file => {
            console.info(file.outputName);
            file.process();
        });

        return this;
    }


}