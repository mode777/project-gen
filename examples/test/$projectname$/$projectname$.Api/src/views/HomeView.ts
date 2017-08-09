import { Modals, template, css } from "./../common/index";

class HomeViewModel extends kendo.data.ObservableObject {
    title = "$projectname$";
    
    constructor() {
        super();
        this.init(this);
    }
}

@template("home.html")
@css("home.css")
export default class HomeView extends kendo.View {

    private _viewModel: HomeViewModel;

    constructor(template: string) {
        let model = new HomeViewModel();
        super(template, {
            model: model,
        });

        let viewIscall = kendo.observable({
            click: function (e) {
                e.preventDefault();
            }
        });
        kendo.bind($("a"), viewIscall);
       // this.bind("init",() => this.onInit());
        this._viewModel = model;
    }
    onInit() {
        Modals.showMessage("Welcome to Kendo Typescript");
    }
}