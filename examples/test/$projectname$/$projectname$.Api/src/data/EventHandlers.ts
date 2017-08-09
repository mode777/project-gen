export class EventHandlers {
    constructor() {
        throw "Modals is a static class."
    }

    static addNewItem(e) {
        var el = $(document).find($(e.currentTarget));

        var inputEl = $("#" + el.attr("data-input-id"));

        if (inputEl.length !== 1) {
            inputEl = $('[name="' + el.attr("data-input-name") + '"]');
        }

        var inputType = el.attr("data-type");

        var text = el.attr("data-input-text")
        var widget = inputEl.data(inputType);
        var dataSource = widget.dataSource;

        var tmpObj = {};
        // won't trigger change, because it is not a kendo.data.Model -> won't add a new item to the widget
        tmpObj[widget.options.dataTextField] = text;

        var obj: kendo.data.Model = new kendo.data.Model(tmpObj);

        dataSource.add(obj);

        if (inputType == "kendoMultiSelect") {
            dataSource.one("requestEnd", (args) => {
                if (args.type === "create") {
                    var newValue = args.response.content.id;

                    dataSource.one("sync", (e) => {
                        widget.value(widget.value().concat([newValue]));
                        widget.trigger("change");
                    });
                }
                else {
                    dataSource.cancelChanges();
                }
            });
        }
        else {
            dataSource.one("requestEnd", (args) => {
                if (args.type !== "create") {
                    dataSource.cancelChanges();
                }
                widget.close();
            });
        }

        dataSource.sync();
    }
}