import { Modals, template } from "common/index";
import { NavigationService, IRouteNavigateEvent } from "services/NavigationService";
import { Application } from "Application";

const VIEW_CONTAINER: string = "content";

class LayoutViewModel extends kendo.data.ObservableObject {
    
    constructor() {
        super();

        this.init(this);
    }
}

@template("layout.html")
export class MainLayout extends kendo.Layout {
    _viewModel: LayoutViewModel;
    _navService: NavigationService;

    private _viewContainer: string;

    constructor(template: string) {
        let model = new LayoutViewModel();

        super(template, {
            model: model
        });

        this._viewModel = model;
        this._viewContainer = VIEW_CONTAINER;
        this._navService = Application.current.navigationService;

        this.bind("init", () => this.onInit());

        this._viewModel.bind("info", (e) => Modals.showMessage(e));
        this._navService.bind("navigate", (e: IRouteNavigateEvent) => this.showView(e.view, e.parameters));
    }

    onInit() {
        this._navService.startRouting();
    }

    showView(view: kendo.View, para: any) {
        this.showIn("#" + this._viewContainer, view);
        view.trigger("navigate", para);        
    }
}
