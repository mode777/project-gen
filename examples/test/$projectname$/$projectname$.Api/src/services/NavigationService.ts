import { IViewLoader } from "./../common/index";
import { CrudSource } from "./../data/index";

export interface IRouteNavigateEvent {
    view: kendo.View;
    parameters: any;
}

export interface INavigationServiceOptions {
    defaultView?: string;
    errorView?: string;
}

export class NavigationService extends kendo.Observable {

    private _router: kendo.Router;
    private _loader: IViewLoader;
    private _defaultView: string;
    private _errorView: string;
    private viewCache: { [key: string]: kendo.View } = {};

    constructor(router: kendo.Router, viewLocator: IViewLoader, options: INavigationServiceOptions) {
        super();
        this._router = router;
        this._loader = viewLocator;
        this._defaultView = options.defaultView || "Home";
        this._errorView = options.errorView || "Error";
        super.init();

        kendo.ui.RouterLink.registerRouter(router);
        this.registerRoutes();
    }

    protected registerRoutes() {
        
        this._router.route("/:view", (viewName: string, para: any) => {
            this.showAsync(viewName, para, "navigate");
        });

        this._router.route("/", (para: any) => {
            this.changeURL("/" + this._defaultView.toLowerCase());
            this.showAsync(this._defaultView, para, "navigate");
        });
    };     

    protected async showAsync(viewName: string, para: any, eventName: string) {
        try {
            let view: kendo.View = await this.getViewCached(viewName, para);

            this.trigger(eventName, {
                view: view,
                parameters: para
            });
        }
        catch (err) {            
            console.log(err);
            this.notFound();
        }
    }

    startRouting() {
        this._router.start();
    }

    getUrlForView(view: string) {
        return window.location.origin + "/" + this.getPathForView(view);
    }

    getPathForView(view: string) {
        let router = (<any>this._router);

        if (router.pushState) {
            if (router.root) {
                return router.root;
            }
            return view;
        }
        else {
            return "#/" + view;
        }
    }

    redirectToView(view: string) {
        window.location.replace(this.getUrlForView(view));
    }

    navigate(route: string, silent?: boolean) {
        this._router.navigate(route, silent);
    }

    replace(route: string, silent?: boolean) {
        this._router.replace(route, silent);
    }

    changeURL(route: string) {
        this._router.navigate(route, true);
    }

    notFound() {
        this.errorPage("404 Not Found", "The ressource you requested was not found.");
    }

    forbidden() {
        this.errorPage("403 Forbidden", "You are not authorized to view this ressource.");
    }

    unauthorized() {
        this.errorPage("401 Unauthorized", "You are not authenticated with this application.");
    }

    async errorPage(title: string, description: string) {
        let view: kendo.View = await this.getViewCached(this._errorView);
        this.trigger("navigate", {
            view: view,
            parameters: { title: title }
        });
    }

    private async getViewCached(name: string, para?: any) {
        let identifier = name.toLowerCase();

        if (para && para.id && !para.keepName) {
            identifier += "/" + para.id;
        }

        if (!this.viewCache[identifier])
            this.viewCache[identifier] = await this._loader.loadViewAsync(name);

        return this.viewCache[identifier];
    }

    private async getViewNotCached(name: string, para?: any) {
        let identifier = name.toLowerCase();

        if (para && para.id && !para.keepName) {
            identifier += "/" + para.id;
        }

        return await this._loader.loadViewAsync(name);
    }

    // protected handleViewAuthorization(view: kendo.View): boolean {
    //     let event = new AuthorizeEvent()

    //     view.trigger("authorize", event);

    //     if (event.isNotAuthenticated()) {
    //         this.unauthorized();
    //         return false;
    //     }

    //     if (event.isUnauthorized()) {
    //         this.forbidden();
    //         return false;
    //     }

    //     return true;
    // }
}