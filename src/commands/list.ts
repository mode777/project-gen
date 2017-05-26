import { ModuleLoader } from '../ModuleLoader';

export function list() {
    const template = new ModuleLoader(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        const desc = m.description || "-- no description --";
        console.info(`${m.name}\t\t${desc}`);
    });
}