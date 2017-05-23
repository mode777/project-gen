import { IFile } from './interfaces';
import { Configuration } from './Configuration';
export declare abstract class FileBase implements IFile {
    private _config;
    private _discard;
    private _outputName;
    protected _input: string;
    constructor(path: string, config: Configuration);
    readonly outputName: string;
    readonly inputName: string;
    abstract process(): any;
    protected _replacePathTokens(path: string): string;
    private _createOutputName();
}
