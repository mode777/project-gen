export interface IModule {
    name?: string;
    description?: string;
    include?: string[];
    exclude?: string[];
    settings?: any;
}
