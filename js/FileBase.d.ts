import { IFile } from './interfaces';
import { Configuration } from './Configuration';
export declare abstract class FileBase implements IFile {
    private _config;
    private _discard;
    private _outputName;
    private _input;
    constructor(path: string, config: Configuration);
    protected readonly config: Configuration;
    readonly outputName: string;
    readonly inputName: string;
    abstract process(): any;
    protected _replacePathTokens(path: string): string;
    private _createOutputName();
}
