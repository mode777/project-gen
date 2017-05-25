import * as dot from "dot";

export interface IModule {
    name?: string,
    description?: string;
    include?: string[];
    exclude?: string[];
    settings?: any;
    tokens?: any;
    templates?: string[];
    templateSettings?: any;
}

export interface IFile {
    outputName: string;
    process();
}