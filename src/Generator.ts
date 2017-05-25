import { Configuration } from './Configuration';
import * as glob from 'glob';
import { IFile } from './interfaces';
import { BinaryFile } from './BinaryFile';
import * as path from 'path';
import * as fs from 'fs';
import { TemplateFile } from "./TemplateFile";

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
                .filter(file => !fs.lstatSync(file).isDirectory())
                .forEach(file => collection[file] = true));
        
        this._files = Object.keys(collection)
            .map(file => this._isTemplateExtension(file)
                ? new TemplateFile(file, this._config)
                : new BinaryFile(file, this._config));

        return this;
    }

    public process(){
        this._files.forEach(file => {
            console.info(file.outputName);
            file.process();
        });

        return this;
    }

    private _isTemplateExtension(file: string){
        return this._config.templates.indexOf(path.extname(file).toLocaleLowerCase()) >= 0;
    }


}