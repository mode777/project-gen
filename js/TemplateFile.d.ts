import { FileBase } from './FileBase';
export declare class TemplateFile extends FileBase {
    private _fileContent;
    private _cancel;
    private _guids;
    process(): void;
    private _createTemplateData();
    private _readFile();
    private _replaceContentTokens();
    private _guid();
    private _guidFor(name);
}
