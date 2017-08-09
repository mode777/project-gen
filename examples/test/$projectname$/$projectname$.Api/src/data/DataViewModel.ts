import { CrudSource } from "./CrudSource";

export class DataViewModel extends kendo.data.ObservableObject {

    constructor(public source: kendo.data.DataSource) {
        super();
        this.init(this);
    }

    create() {
        this.trigger("create");
    }

    update() {
        this.trigger("update");
    }

    destroy() {
        this.trigger("destroy");
    }
}