import { Widgets, IReadableFieldOptions, EventHandlerOptions } from "./../common/Widgets";

export interface ExtendedGridColumn extends kendo.ui.GridColumn {
    hiddenInEditor?: boolean;
    dropdownEditor?: {
        source: kendo.data.DataSource,
        valueField?: string,
        textField?: string,
        modelTextField?: string,
        customOptions?: kendo.ui.DropDownListOptions,
        eventHandlerOptions?: EventHandlerOptions[],
        defaultValue?: {
            minIndex?: boolean,
            maxIndex?: boolean,
            index?: number,
        },
        optionLabelEnable?: boolean,
    }
    autoCompleteEditor?: {
        source: kendo.data.DataSource,
        textField?: string
        valueField?: string,
        modelValueField?: string,
        minLength?: number
    }
    comboBoxEditor?: {
        source: kendo.data.DataSource,
        textField?: string
        valueField?: string,
        modelTextField?: string,
        minLength?: number,
        customOptions?: kendo.ui.ComboBoxOptions,
    }
    multiselectEditor?: {
        source: kendo.data.DataSource,
        textField?: string
        valueField?: string,
        customOptions?: kendo.ui.MultiSelectOptions,
        eventHandlerOptions?: EventHandlerOptions[],
    }
    textAreaEditor?: {
        rows?: number,
        columns?: number,
        resizeable?: string,
        myOptions?: any,
    }
    formattedEditor?: {
        formatString: string,
        min?: number,
        max?: number,
        customOptions?: kendo.ui.NumericTextBoxOptions,
    }
    readOnlyEditor?: {
        fields?: IReadableFieldOptions[],
        editOptions?: kendo.ui.NumericTextBoxOptions,
        myOptions?: any,
    }
    mobileSwitchEditor?: {
        customOptions?: kendo.mobile.ui.SwitchOptions,
    }
    filter?: {
        source: kendo.data.DataSource,
        textField: string,
        valueField: string,
    }
} 

export interface ExtendedGridOptions extends kendo.ui.GridOptions {
    columns?: ExtendedGridColumn[];
    sortField?: string;
    sortDir?: string;
}

export class GridBase extends kendo.ui.Grid {
    constructor(element: JQuery, source: kendo.data.DataSource | any[], columns: ExtendedGridColumn[] = undefined, options: ExtendedGridOptions = {}) {

        // Create dropdown editors
        if (columns)
            options.columns = columns;

        options.columns.forEach(c => {
            let filterSourceOptions = $.extend(true, {}, (<any>source).options, <kendo.data.DataSourceOptions>{
                serverAggregates: false,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false,
                pageSize: 999999,
                transport: {
                    read: {
                        url: "api/" + (<any>source)._controller + "/ReadFilterValues"
                    },
                    parameterMap: function (data, type) {
                        (<any>data).columnName = c.field;
                        if (type != "read") {
                            return kendo.stringify(data);
                        }
                        else {
                            return data;
                        }
                    }
                },
                requestEnd: function (e) { }
            });

            let filterDatasource = new kendo.data.DataSource(filterSourceOptions);

            c.filterable = c.filterable || {
                multi: true,
                search: true,
                checkAll: false,
                itemTemplate: function (e) {
                    let textTemplate = "#= data." + e.field + " #";
                    let valueTemplate = "#= data." + e.field + " #";
                    let nameTemplate = e.field;
                    if (e.field !== "all" && c.template) {
                        textTemplate = <string>c.template;
                    }

                    return "<li><label><input type='checkbox' name='" + nameTemplate + "' value='" + valueTemplate + "'/> <span>" + textTemplate + "</span></label></li>";
                },
                dataSource: filterDatasource
            };

            if (c.dropdownEditor) {
                c.editor = Widgets.createDropdownEditor(c.dropdownEditor.source, c.dropdownEditor.customOptions, c.dropdownEditor.eventHandlerOptions, c.dropdownEditor.valueField, c.dropdownEditor.textField, c.dropdownEditor.modelTextField, c.dropdownEditor.defaultValue, c.dropdownEditor.optionLabelEnable);
            }
            else if (c.autoCompleteEditor) {
                c.editor = Widgets.createAutoCompleteEditor(c.autoCompleteEditor.source, {}, c.autoCompleteEditor.textField, c.autoCompleteEditor.valueField, c.autoCompleteEditor.modelValueField, c.autoCompleteEditor.minLength);
            }
            else if (c.comboBoxEditor) {
                c.editor = Widgets.createComboBoxEditor(c.comboBoxEditor.source, c.comboBoxEditor.customOptions, c.comboBoxEditor.textField, c.comboBoxEditor.valueField, c.comboBoxEditor.modelTextField, c.comboBoxEditor.minLength);
            }
            else if (c.multiselectEditor) {
                c.editor = Widgets.createMultiselectEditor(c.multiselectEditor.source, c.multiselectEditor.customOptions, c.multiselectEditor.eventHandlerOptions, c.multiselectEditor.valueField, c.multiselectEditor.textField);
                c.filterable = {
                    multi: false,
                    search: false,
                    checkAll: false,
                    ui: (element) => {
                        Widgets.createMultiselectFilter(c.filter ? c.filter.source : c.multiselectEditor.source, source, c.field, c.filter ? c.filter.valueField : c.multiselectEditor.valueField, c.filter ? c.filter.textField : c.multiselectEditor.textField)(element);
                    }
                };
            }
            else if (c.formattedEditor) {
                c.editor = Widgets.createNumericTextBoxEditor($.extend(true, { format: c.formattedEditor.formatString, min: c.formattedEditor.min, max: c.formattedEditor.max }, c.formattedEditor.customOptions));
            }
            else if (c.readOnlyEditor) {
                c.editor = Widgets.createReadOnlyEditor(c.readOnlyEditor.myOptions, c.readOnlyEditor.editOptions, c.readOnlyEditor.fields);
            }
            else if (c.mobileSwitchEditor) {
                c.editor = Widgets.createMobileSwitchEditor(c.mobileSwitchEditor.customOptions);
            }
            else if (c.textAreaEditor) {
                c.editor = Widgets.createTextAreaEditor(c.textAreaEditor.myOptions, c.textAreaEditor.rows, c.textAreaEditor.columns, c.textAreaEditor.resizeable);
            }

            let fieldInfo = (<kendo.data.DataSource>source).options.schema.model.fields[c.field];
            if (fieldInfo && fieldInfo.type === "date") {
                c.filterable = {
                    multi: false,
                    search: false,
                    checkAll: false,
                    ui: (element) => {
                        Widgets.createDatePickerFilter(source, c.field)(element);
                    }
                };
            }
        });

        let defaults: kendo.ui.GridOptions = {
            dataSource: source,
            height: 0,
            selectable: true,
            sortable: true,
            filterable: {
                extra: false,
                operators: {
                    string: {
                        contains: "beinhaltet"
                    },
                    date: {
                        eq: "gleich ist"
                    },
                    number: {
                        eq: "gleich ist"
                    },
                    object: {
                        eq: "beinhaltet"
                    }
                }
            },
            resizable: true,
            editable: {
                confirmation: false,
                mode: "popup",
            },
            pageable: true,
            edit: function (e) {
                var windowEl = e.container.data("kendoWindow");
                if (windowEl) {
                    if (e.model.isNew()) {
                        windowEl.title("Neu");
                        $(e.container).find(".k-grid-update").contents().last()[0].textContent = "Erstellen";
                    }
                    else {
                        windowEl.title("Bearbeiten");
                    }
                }
            },
            filterMenuInit: (e) => {
                let widget: any = e.container.find(".k-multiselect, .k-datepicker").first();
                if (widget.length) {
                    console.log(widget);
                    e.container.find(".k-dropdown[title='Operator']").remove();
                    e.container.find(".k-filter-help-text").remove();

                    e.container.width(210);
                    e.container.find("button[type='submit']").bind("click", function (e) {
                        e.preventDefault();
                        let newFilter = $.extend(true, {}, (<any>source)._myFilter);
                        (<any>source).filter(newFilter);
                    });

                    e.container.find("button[type='reset']").bind("click", function (e) {
                        widget.trigger("resetFilter");
                    });
                }
            }
        }

        let newOptions = <ExtendedGridOptions>$.extend(true, {}, defaults, options);

        if (typeof (options.editable) === "string") {
            newOptions.editable = defaults.editable;
            (<any>newOptions.editable).mode = options.editable;
        }

        if (options.sortable !== false) {
            newOptions.sortField = newOptions.sortField || newOptions.columns[0].field;
            newOptions.sortDir = newOptions.sortDir || "asc";

            (<kendo.data.DataSource>source).sort({
                field: newOptions.sortField,
                dir: newOptions.sortDir
            });
        }

        super(element[0], newOptions);
        
        this.bind("edit", function (e) {
            let grid = (<GridBase>this);
            grid._hideFields(e);
        });
    }
    
    private _hideFields(e) {
        var cols = this.options.columns;
        for (var i = 0; i < cols.length; i++) {
            var col = <ExtendedGridColumn>cols[i];
            if (col.hiddenInEditor) {
                var label = $(e.container).find("label[for='" + col.field + "']");
                label.parent().next().hide();
                label.parent().hide();
            }
        }
    }
}