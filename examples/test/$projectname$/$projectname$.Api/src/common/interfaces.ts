export interface IViewLoader {
    loadViewAsync(view: string): Promise<kendo.View>;
}

export interface ITemplateLoader {
    loadTemplateAsync(template: string): Promise<string>;
} 

export interface ICssLoader {
    loadCss(css: string);
}

export interface ViewLoaderOptions {
    basePath?: string,
    suffix?: string,
    cssLoader?: ICssLoader,
    templateLoader?: ITemplateLoader  
}