// List kendo extensions here
/// <amd-dependency path="widgets/RouterLink" />
import { AmdViewLoader, AmdCssLoader, AmdTemplateLoader } from './common/index';
import { MainLayout } from './views/MainLayout';
import { Application } from "Application";

const APP_CONTAINER = "body";

(async function main() {
    kendo.culture("de-DE");
    // run app.
    Application.current.run();
    // manually load first layout
    let template = await new AmdTemplateLoader().loadTemplateAsync(MainLayout["template"]);
    let mainLayout = new MainLayout(template);
    mainLayout.render($(APP_CONTAINER));
})();

