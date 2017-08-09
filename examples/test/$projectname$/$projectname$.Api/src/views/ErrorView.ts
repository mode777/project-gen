import { template, css } from "../common/index";

class ErrorViewModel extends kendo.data.ObservableObject {

    title = "";
    description = "";

    constructor() {
        super();
        this.init(this);
    }
}

@template("error.html")
@css("error.css")
export default class ErrorView extends kendo.View {

    private _viewModel: ErrorViewModel;

    constructor(template: string) {
        let model = new ErrorViewModel();
        super(template, {
            model: model,
        });
        this.bind("navigate", (para) => this.onNavigate(para));

        this._viewModel = model;
    }

    onNavigate(para) {
        this._viewModel.set("title", para.title);
        this._viewModel.set("description", para.description);
    }

}