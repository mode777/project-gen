import { GridBase, ExtendedGridOptions } from "./GridBase";
import { DataViewModel } from "./DataViewModel";
import { Modals } from "./../common/index";

const DEFAULT_SELECTOR = ".grid";

export interface GridViewGridOptions extends ExtendedGridOptions {
    selector?: string,
    dblClickEdit?: boolean
}

export interface ExtendedViewOptions<T extends kendo.data.ObservableObject> extends kendo.ViewOptions {
    model: T,
    gridOptions?: GridViewGridOptions[],
    title?: string
}

export class GridView<T extends DataViewModel> extends kendo.View {

    public model: T;
    public grids: { [key: string]: GridBase };

    protected _options: ExtendedViewOptions<T>; 
    protected _template: string;

    constructor(template: string, options?: ExtendedViewOptions<T>) {
        super(template, options);

        this._template = template;
        this._options = options;

        this.bind("init", this._initView);
    }

    public setOptions(options: ExtendedViewOptions<T>) {
        let newOptions = $.extend(true, {}, this._options, options);
        this._options = newOptions;
    }

    private _initView() {
        super.init(this._template, this._options);
        this.model = this._options.model;
        this.model.set("title", this._options.title);
        this.grids = {};

        for (var i = 0; i < this._options.gridOptions.length; i++) {
            if (!this._options.gridOptions[i].dataSource) {
                this._options.gridOptions[i].dataSource = this.model.source;
            }

            let gridOptions = $.extend(true, {}, {
            }, this._options.gridOptions[i]);
            this._options.gridOptions[i] = gridOptions;

            let grid = new GridBase(this.element.find(gridOptions.selector || DEFAULT_SELECTOR), gridOptions.dataSource, undefined, gridOptions);
            
            let triggerEl = <any>grid;
            if (gridOptions.dataSource === this.model.source) {
                triggerEl = this.model;
            }


            triggerEl.bind("create", () => grid.addRow());

            if ((<any>grid).options.editable.mode === "popup") {
                triggerEl.bind("update", () => {
                    let sel = this._getSelected(grid);
                    if (sel.length == 0) {
                        Modals.showMessage("Bitte erst einen Datensatz auswählen");
                    }
                    else
                        grid.editRow(sel)
                });
                triggerEl.bind("destroy", () => {
                    let sel = this._getSelected(grid);
                    if (sel.length == 0) {
                        Modals.showMessage("Bitte erst einen Datensatz auswählen");
                    }
                    else
                        Modals.showDialog("Möchten Sie diesen Datensatz wirklich löschen?", () => grid.removeRow(sel));
                });
            }
            else {
                triggerEl.bind("update", (e) => {
                    let sel = $(e.currentTarget).closest("tr");
                    if (sel.hasClass("k-grid-edit-row") === false) {
                        grid.editRow(sel);
                    }
                });
                triggerEl.bind("destroy", (e) => {
                    let sel = $(e.currentTarget).closest("tr");
                    Modals.showDialog("Möchten Sie diesen Datensatz wirklich löschen?", () => grid.removeRow(sel));
                });
            }

            this.grids[gridOptions.selector || DEFAULT_SELECTOR] = grid;

            if (gridOptions.editable !== false && gridOptions.dblClickEdit !== false) {
                $(grid.element).find('tbody[role="rowgroup"]').on("dblclick", "tr", function (e) {
                    triggerEl.trigger("update", e);
                });
            }
        }

    }

    private _getSelected(grid) {
        let sel = grid.select();
        if (sel.length == 0) {
            Modals.showMessage("Bitte erst einen Datensatz auswählen");
            return null;
        }
        return sel;
    }
}