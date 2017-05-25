import { IFile } from './interfaces';
import { Configuration } from './Configuration';
import * as path from 'path';
import * as file from 'fs';

export abstract class FileBase implements IFile {

    private _config: Configuration;
    private _discard: boolean;
    private _outputName: string;

    protected _input: string;

    constructor(path: string, config: Configuration){
        this._config = config;
        this._input = path;

        this._createOutputName();
    }

    public get outputName() { return this._outputName; }
    public get inputName() { return this._input; }

    public abstract process();

    protected _replacePathTokens(path: string){
        const tokens = this._config.tokens;
        Object.keys(tokens)
            .forEach(token => path = path.replace(new RegExp("\\$"+token+"\\$",'g'), tokens[token]));
        return path;
    }

    private _createOutputName(){
        const relativePath = path.relative(this._config.inputDir, this._input);
        this._outputName = this._replacePathTokens(path.join(this._config.outputDir, relativePath));
    }


}