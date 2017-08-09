export interface ModalResult {
    success: boolean;
}

export interface InputResult extends ModalResult {
    value: string;
}

export interface IMessageOptions {
    okText?: string;
    cancelText?: string;
    messageText?: string;
    title?: string;
    width?: number;
}

export interface IDialogOptions extends IMessageOptions {
    confirmText?: string;
    declineText?: string;
}

export interface IInputOptions extends IMessageOptions {
    value?: string;
}

export class Modals {

    constructor() {
        throw "Modals is a static class."
    }

    private static msgBoxTmpl = `
        <div data-role="window"
            data-width="300"
            data-modal="true"
            data-visible="false"
            data-actions="">
            <div style="margin:15px;" 
                data-bind="text: messageText">
            </div>
            <div>
                <button class="btn btn-primary pull-right"                  
                        data-bind="text: okText, click: _confirm">
                </button>
            </div>
        </div>`;

    private static dialogBoxTmpl = `
        <div data-role="window"
            data-width="300"
            data-modal="true"
            data-visible="false"
            data-actions="">
            <div style="margin:15px;"
                data-bind="text: messageText">
            </div>
            <div>
                <button class="btn btn-default pull-right"
                        data-bind="text: declineText, click: _decline"></button>
                <button class="btn btn-primary pull-right"
                        style="margin-right:10px;"
                        data-bind="text: confirmText, click: _confirm"></button>
            </div>
        </div>`;

    private static inptBoxTmpl = `
        <div data-role="window"
            data-width="300"
            data-modal="true"
            data-visible="false"
            data-actions="">
            <div style="margin:10px;">
                <div data-bind="text: messageText" style="margin-bottom:10px;"></div>
                <input data-role="textinput" type="text" class="k-textbox" style="width:100%;" data-bind="value: value"/>
            </div>
            <div>
                <button style="margin-right:10px;"
                        class="btn btn-primary pull-right"
                        data-bind="text: okText, click: _confirm">
                </button>
                <button style="margin-right:10px;"
                        class="btn btn-default pull-right"
                        data-bind="text: cancelText, click: _close">
                </button>
            </div>
        </div>`;

    private static messageDefaults = {
        okText: "OK",
        cancelText: "Abbrechen",
        messageText: "message",
        title: "Meldung",
        width: 400,
        _confirm: function () {
            if (this.confirm)
                this.confirm();
            this._close();
        },
        _close: function () {
            this.widget.close();
            var el = this.widget.element;
            var widget = this.widget;
            setTimeout(function () {
                widget.destroy();
                $(el).remove();
            }, 500);
        }
    }

    private static dialogDefaults = $.extend({}, Modals.messageDefaults, {
        confirmText: "Ja",
        declineText: "Nein",
        title: "Achtung!",
        _decline: function () {
            if (this.decline)
                this.decline();
            this._close();
        }
    })

    private static inputDefaults = $.extend({}, Modals.messageDefaults, {
        title: "Eingabe",
        value: "",
        _confirm: function () {
            if (this.confirm)
                this.confirm(this.get("value"));
            this._close();
        }
    })

    public static showMessage(options: IMessageOptions | string, callback?: (args: any) => void) {
        Modals._showModal(Modals.msgBoxTmpl, Modals.messageDefaults, options, callback);
    }

    public static showMessageAsync(options: IMessageOptions | string) : PromiseLike<any> {
        var def = $.Deferred();
        Modals.showMessage(options, () => def.resolve());
        return def;
    }

    public static showDialog(options: IDialogOptions | string, callbackConfirm?: (args: any) => void, callbackDecline?: (args: any) => void) {
        Modals._showModal(Modals.dialogBoxTmpl, Modals.dialogDefaults, options, callbackConfirm, callbackDecline);
    }

    public static showDialogAsync(options: IDialogOptions | string): PromiseLike<ModalResult> {
        var def = $.Deferred<ModalResult>();
        Modals.showDialog(options, () => def.resolve({ success: true }));
        return def;
    }

    public static showInput(options: IInputOptions | string, callback?: (args: any) => void) {
        this._showModal(Modals.inptBoxTmpl, Modals.inputDefaults, options, callback);
    }

    private static _makeWindow(selector: string, template: string, viewModel: kendo.data.ObservableObject): kendo.ui.Window {
        let win = $(selector).append(template).children().last();
        kendo.bind(win, viewModel);
        return <kendo.ui.Window>win.data("kendoWindow");
    }

    private static _showModal(template: string, defaults: any, OptionsOrText: Object | string, callbackConfirm?: (args: any) => void, callbackDecline?: (args: any) => void) {
        let viewModel: kendo.data.ObservableObject;

        if (typeof (OptionsOrText) == "string")
            viewModel = kendo.observable($.extend({}, defaults, { messageText: <string>OptionsOrText }));
        else
            viewModel = kendo.observable($.extend({}, defaults, OptionsOrText));

        if (callbackConfirm)
            viewModel.set("confirm", callbackConfirm);

        if (callbackDecline)
            viewModel.set("decline", callbackDecline);


        var widget = this._makeWindow("body", template, viewModel);
        (<any>viewModel).widget = widget;

        widget.setOptions({
            width: viewModel.get("width"),
            title: viewModel.get("title")
        });
        widget.center();
        widget.open();
    }
}