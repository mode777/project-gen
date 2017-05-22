export interface IModule {
    name: string,
    descripton: string;
    include: string[];
    exclude: string[];
    userData: any;
}