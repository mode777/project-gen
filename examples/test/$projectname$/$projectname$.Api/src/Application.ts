import routerOptions from "config/router.config";
import routeServiceOptions from "config/routeService.config";
import viewLoaderOptions from "config/viewLoader.config";
import { AmdViewLoader, AmdCssLoader, AmdTemplateLoader } from './common/index';
import { NavigationService } from 'services/NavigationService';

export class Application{

    private static _singleton: Application = new Application();

    public static get current() {
        return Application._singleton;
    }  

    private _navService: NavigationService;

    private constructor() {
        
    }

    public get navigationService() {
        return this._navService;
    }

    async run() {
        let router = new kendo.Router(routerOptions);
        let loader = new AmdViewLoader(viewLoaderOptions);
        this._navService = new NavigationService(router, loader, routeServiceOptions);
    }

}
