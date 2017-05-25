export interface IModule {
    name?: string,
    description?: string;
    include?: string[];
    exclude?: string[];
    settings?: any;
    tokens?: any;
    templates?: string[];
}

export interface IFile {
    process();
}