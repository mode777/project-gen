

export interface EventHandlerOptions {
    evName: string;
    handler(e: any): void;
}

export class Widgets {

    constructor() {
        throw "Widgets is a static class."
    }

    private static _createInput(container, options, elementName: string = "input") {
        var inputElement = $(`<${elementName}/>`);

        if (options) {
            // Variablenbezeichner des zu bindenden Wertes im Viewmodel (bei der Verwendung im Kendo Grid)
            if (options.field) {
                inputElement.attr("Name", options.field);
            }
            // Variablenbezeichner des zu bindenden Wertes im Viewmodel (Bei eigenem Binding)
            if (options.manualbind === true && options.field) {
                inputElement.attr("data-bind", "value: " + options.field);
            }
            if (options.manualbind === true && options.model) {
                kendo.bind(inputElement, options.model);
            }
        }

        inputElement.appendTo(container);
        return inputElement;
    }

    // valueField: value of Source, textField: text of source, objectTextField: textfield of grid dataitem (in model)
    public static createDropdownEditor(source: kendo.data.DataSource, myOptions?: kendo.ui.DropDownListOptions, eventHandlerOptions?: EventHandlerOptions[], valueField: string = "id", textField: string = "name", modelTextField?: string, defaultValue?: any, optionLabelEnable: boolean = true) {
        return function (container, options) {
            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            var model = newOptions.model;

            if (optionLabelEnable === true) {
                newOptions = $.extend(true, {
                    optionLabel: "-- Bitte wählen --"
                }, options);
            }

            var defaults: kendo.ui.DropDownListOptions = {
                dataTextField: textField,
                dataValueField: valueField,
                dataSource: source,
                select: function (e) {
                    // set additional text-field of grid dataitem
                    if (model && textField && modelTextField) {
                        if (e.item) {
                            let index = e.item.index();
                            if (this.options.optionLabel) {
                                index++;
                            }
                            model.set(modelTextField, this.dataItem(index).get(textField));
                        }
                    }
                },
                dataBound: function (e) {
                    console.log(e);
                    console.log(model);
                    if (defaultValue) {
                        var modelValue = model.get(newOptions.field);
                        var modelId = model.get("id");
                        if ((modelValue == null || modelValue <= 0) &&
                            (!modelId || modelId && (modelId == null || modelId <= 0))) {
                            let index = 0;
                            if (defaultValue.minIndex) {
                                index = 0;
                            }
                            else if (defaultValue.maxIndex) {
                                index = this.dataSource.data().length - 1;
                            }
                            else if (defaultValue.index) {
                                index = defaultValue.index;
                            }

                            if (!optionLabelEnable || optionLabelEnable && index > 0) {
                                model.set(newOptions.field, this.dataItem(index).get(valueField));
                                if (model && textField && modelTextField) {
                                    model.set(modelTextField, this.dataItem(index).get(textField));
                                }
                            }
                        }
                    }
                }
            };

            let dropDownListOptions = $.extend(true, defaults, newOptions);

            input.kendoDropDownList(dropDownListOptions);

            var widget = input.data("kendoDropDownList");

            $(eventHandlerOptions).each((i, option: any) => {
                widget.bind(option.evName, option.handler)
            });
        }
    }

    // textField: text of source, valueField: id of source, modelIdField: id of grid dataitem in model
    public static createAutoCompleteEditor(source: kendo.data.DataSource, myOptions?: any, textField: string = "name", valueField: string = "id", modelValueField: string = "id", minimumLength: number = 1) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            var model = newOptions.model;

            var defaults: kendo.ui.AutoCompleteOptions = {
                autoWidth: true,
                dataTextField: textField,
                minLength: minimumLength,
                dataSource: source,
                select: function (e) {
                    // set id-field of grid dataitem
                    if (model && valueField && modelValueField) {
                        model.set(modelValueField, this.dataItem(e.item.index()).get(valueField));
                    }
                }
            };

            let autoCompleteOptions = $.extend(true, defaults, newOptions);

            input.kendoAutoComplete(autoCompleteOptions);
        }
    }

    // textField: text of source, valueField: id of source, modelIdField: id of grid dataitem in model
    public static createComboBoxEditor(source: kendo.data.DataSource, myOptions?: any, textField: string = "name", valueField: string = "id", modelTextField: string = undefined, minimumLength: number = 1) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            var model = newOptions.model;

            var defaults: kendo.ui.ComboBoxOptions = {
                dataTextField: textField,
                dataValueField: valueField,
                minLength: minimumLength,
                dataSource: source,
                select: function (e) {
                    // set id-field of grid dataitem
                    if (model && valueField && modelTextField) {
                        let text = ''
                        if (e.item) {
                            text = this.dataItem(e.item.index()).get(textField);
                        }
                        model.set(modelTextField, text);
                    }
                }
            };

            let comboBoxOptions = $.extend(true, defaults, newOptions);

            input.kendoComboBox(comboBoxOptions);
        }
    }

    // valueField: value of Source, textField: text of source, objectTextField: textfield of grid dataitem (in model)
    public static createMultiselectEditor(source: kendo.data.DataSource, myOptions?: any, eventHandlerOptions?: EventHandlerOptions[], valueField: string = "id", textField: string = "name") {
        return function (container, options) {
            let newOptions = $.extend(true, options, myOptions);

            var select = Widgets._createInput(container, newOptions, "select");

            var defaults: kendo.ui.MultiSelectOptions = {
                dataTextField: textField,
                dataValueField: valueField,
                dataSource: source,
                valuePrimitive: true
            };

            let multiselectOptions = $.extend(true, newOptions, defaults);

            select.kendoMultiSelect(multiselectOptions);

            if (newOptions.width) {
                select.data("kendoMultiSelect").list.width(newOptions.width);
            }

            var widget = select.data("kendoMultiSelect");

            $(eventHandlerOptions).each((i, option: any) => {
                widget.bind(option.evName, option.handler)
            });
        }
    }

    public static createMultiselectFilter(source: any, gridSource: any, modelValueField: string, valueField: string = "id", textField: string = "name", myOptions?: any, eventHandlerOptions?: EventHandlerOptions[]) {
        return function (element: JQuery) {
            element.removeAttr("data-bind");
            
            var defaults: kendo.ui.MultiSelectOptions = {
                dataTextField: textField,
                dataValueField: valueField,
                dataSource: source,
                valuePrimitive: true,
                change: function (e: any) {
                    this.trigger("resetFilter");
                    let filter = $.extend(true, {}, (<any>gridSource).filter() || { logic: "and", filters: [] });

                    let values = this.value();

                    if (gridSource.options.serverFiltering === true) {
                        $.each(values, function (i, val) {
                            filter.filters.push({
                                field: modelValueField,
                                operator: "contains",
                                value: val
                            });
                        });
                    }
                    else {
                        $.each(values, function (i, val) {
                            filter.filters.push({
                                field: modelValueField,
                                operator: function (items) {
                                    if (items && items.indexOf(val) >= 0) {
                                        return true;
                                    }
                                    return false;
                                }
                            });
                        });
                    }

                    (<any>gridSource)._myFilter = $.extend(true, {}, filter);
                }
            };

            let multiselectOptions = $.extend(true, myOptions, defaults);
            element.kendoMultiSelect(multiselectOptions);
            
            if (multiselectOptions.width) {
                element.data("kendoMultiSelect").list.width(multiselectOptions.width);
            }

            var widget = element.data("kendoMultiSelect");

            (<any>widget).bind("resetFilter", function ()
            {
                let filter = (<any>gridSource).filter();
                if (filter) {
                    filter.filters = $.grep(filter.filters, (item: any, i) => {
                        return item.field !== modelValueField
                    });
                }
            });

            $(eventHandlerOptions).each((i, option: any) => {
                widget.bind(option.evName, option.handler)
            });
        }
    }


    public static createTextAreaEditor(myOptions?: any, rows?: number, columns?: number, resizeable?: string) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var widget = $("<span/>");

            var input = Widgets._createInput(widget, newOptions, "textarea");

            if (newOptions.rows || rows) {
                input.attr("rows", rows || newOptions.rows);
            }

            if (newOptions.col || columns) {
                input.attr("cols", columns || newOptions.cols);
            }

            if (newOptions.resize || resizeable) {
                input.css("resize", resizeable || newOptions.resize);
            }

            input.attr("type", "text");
            input.addClass("k-textbox");
            widget.appendTo(container);
        }
    }

    public static createTextEditor(myOptions?) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var widget = $("<span/>");
            widget.addClass("k-header");
            var wrap = $("<span/>");

            var input = Widgets._createInput(wrap, newOptions);

            input.attr("type", "text");
            input.addClass("k-textbox");

            wrap.appendTo(widget);
            widget.appendTo(container);
        }
    }

    public static createDatePickerEditor(myOptions?) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            input.kendoDatePicker(newOptions);
        }
    }

    public static createDatePickerFilter(gridSource: any, modelValueField: string, myOptions?: any, eventHandlerOptions?: EventHandlerOptions[]) {
        return function (element: JQuery) {
            element.removeAttr("data-bind");

            var defaults: kendo.ui.DatePickerOptions = {
                change: function (e: any) {
                    this.trigger("resetFilter");
                    let filter = $.extend(true, {}, (<any>gridSource).filter() || { logic: "and", filters: [] });

                    let val: Date = this.value();
                    if (gridSource.options.serverFiltering === true) {
                        filter.filters.push({
                            field: modelValueField,
                            operator: "eq",
                            value: val.toDateString()
                        });
                    }
                    else {
                        filter.filters.push({
                            field: modelValueField,
                            operator: function (item: Date) {
                                if (val && item && val.getTime() === item.getTime()) {
                                    return true;
                                }
                                return false;
                            }
                        });
                    }
                    (<any>gridSource)._myFilter = $.extend(true, {}, filter);
                }
            };


            let datepickerOptions = $.extend(true, myOptions, defaults);
            element.kendoDatePicker(datepickerOptions);
            
            var widget = element.data("kendoDatePicker");

            (<any>widget).bind("resetFilter", function () {
                let filter = (<any>gridSource).filter();
                if (filter) {
                    filter.filters = $.grep(filter.filters, (item: any, i) => {
                        return item.field !== modelValueField
                    });
                }
            });

            $(eventHandlerOptions).each((i, option: any) => {
                widget.bind(option.evName, option.handler)
            });
        }
    }


    public static createNumericTextBoxEditor(myOptions?) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            input.kendoNumericTextBox(newOptions);
        }
    }

    public static createMobileSwitchEditor(myOptions?) {
        return function (container, options) {

            let newOptions = $.extend(true, options, myOptions);

            var input = Widgets._createInput(container, newOptions);

            input.kendoMobileSwitch(newOptions);
        }
    }

    public static createReadOnlyEditor(myOptions?, editOptions?: kendo.ui.NumericTextBoxOptions, fields?: IReadableFieldOptions[]) {
        return function (container, options) {
            let newOptions = $.extend(true, options, myOptions);

            if (fields) {
                let found = false;
                for (var index = 0; index < fields.length && !found; index++) {
                    let fieldOptions = fields[index];

                    let model = newOptions.model;
                    if (model.get(fieldOptions.name) === fieldOptions.value) {
                        let span = $("<span/>");
                        span.attr("role", "gridCell");
                        span.attr("data-bind", "text: " + newOptions.field);
                        if (newOptions.format) {
                            span.attr("data-format", newOptions.format.split(':')[1].split('}')[0]);
                        }

                        span.appendTo(container);
                        found = true;
                    }
                }

                if (!found) {
                    if (typeof (newOptions.model.get(newOptions.field)) === "number") {
                        let newOptions = $.extend(true, options, editOptions);
                        Widgets.createNumericTextBoxEditor(newOptions)(container, newOptions);
                    }
                    // hier durch andere Datentypen erweitern
                }
            }
            else {
                let span = $("<span/>");
                span.attr("role", "gridCell");
                span.attr("data-bind", "text: " + newOptions.field);
                if (newOptions.format) {
                    let format = newOptions.format;
                    if (newOptions.format.indexOf(':') != -1) {
                        format = newOptions.format.split(':')[1].split('}')[0];
                    }
                    span.attr("data-format", format);
                }

                if (typeof (newOptions.model.get(newOptions.field)) === "number") {
                    container.addClass("ra");
                }

                span.appendTo(container);
            }
        }
    }
}

export interface IReadableFieldOptions {
    name: string,
    value: any
}