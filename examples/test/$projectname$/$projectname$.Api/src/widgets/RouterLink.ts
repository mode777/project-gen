// This is a global module.
// Require via "/// <amd-dependency path="widgets/RouterLink" />"
// then call: "kendo.ui.RouterLink.registerRouter(yourRouter);"

namespace kendo.ui {
    export interface RouterLinkOptions {
        activeClass?: string;
        defaultRoute?: boolean;
    }

    let _defaults: RouterLinkOptions = {
        activeClass: "active",
        defaultRoute: false,
    }

    export class RouterLink extends kendo.ui.Widget {

        private static _router: Router;
        public static registerRouter(router: Router) {
            RouterLink._router = router;
        }

        private _clickHandler: (e) => void;
        private _changeHandler: (e) => void;
        private _linkElement: JQuery;
        private _link: string;

        constructor(element: Element, options?: RouterLinkOptions) {
            super(element, options);
            super.init(element, options);

            this._link = this._getLink();

            this._changeHandler = (e) => setTimeout(() => this.update(), 1);
            this._clickHandler = (e) => this.click(e);

            RouterLink._router.bind("change", this._changeHandler);
            this._linkElement.on("click", this._clickHandler);

            this.update();
        }

        public update() {
            this.element.removeClass(this.options.activeClass);

            let url = this._getUrl().toLowerCase();

            if (this.options.defaultRoute && this._isDefault(url)) {
                this.element.addClass(this.options.activeClass);
                return
            }

            if (url.split('?')[0] == this._link.split('?')[0].toLowerCase()) {
                this.element.addClass(this.options.activeClass);
                return;
            }
        }

        public click(e) {
            e.preventDefault();
            RouterLink._router.navigate(this._linkElement.attr("href"), false);
        }

        public destroy() {
            RouterLink._router.unbind("change", this._changeHandler);
            this._linkElement.off("click", this._clickHandler);
            super.destroy();
        }

        private _isDefault(url: string) {
            return url == "" || url == "/";
        }

        private _getUrl() {
            let router = (<any>RouterLink._router);

            if (router.pushState) {
                var pathname = window.location.pathname;
                if (router.root) {
                    let index = pathname.indexOf(router.root);
                    return pathname.substring(index + router.root.length);
                }
                else {
                    return pathname;
                }
            }
            else {
                let hash = window.location.hash;
                if (hash.length > 0)
                    return hash.substring(1);
                else
                    return hash;
            }
        }

        private _getLink() {
            let link = this.element.attr("href");
            if (!this._link) {
                this._linkElement = this.element
                    .find("[href]");
                link = this._linkElement.attr("href");
            }
            else {
                this._linkElement = this.element;
            }

            if (link && link.charAt(0) == "#") {
                link = link.substring(1);
            }
            return link || "";
        }

    }

    //Kendo widget boilerplate
    RouterLink.fn = RouterLink.prototype;
    RouterLink.fn.options = $.extend({ name: "RouterLink" }, _defaults, kendo.ui.Widget.fn.options);
    kendo.ui.plugin(RouterLink);
}

interface JQuery {
    kendoRouterLink(options?: kendo.ui.RouterLinkOptions): JQuery;
}

