const VERSION = require("./../package.json").version;
import * as program from "commander";
import * as path from "path";
import { Configuration } from "./Configuration";
import { ModuleLoader } from "./ModuleLoader";
import { IModule } from "./interfaces";
import { Generator } from './Generator';


const list = () => {
    const template = new ModuleLoader(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        const desc = m.description || "-- no description --";
        console.info(`${m.name}\t\t${desc}`);
    });
}

const generate = (name, options) => {
    const input = <string>(options.in ? path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) : process.cwd());
    const output = <string>(options.out ? path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) : path.join(process.cwd(), "out"));
    const modules = <string[]>(options.modules || ["default"]) 
    
    const loader = new ModuleLoader(input);   
    
    const requestedModules = modules
        .map(m => loader.getModule(m));

    const configuration = new Configuration(
        name, input, output, requestedModules);
    
    new Generator(configuration)
        .collect()
        .process();

    console.info(`Project "${name}" generated in "${output}".`);
}

const init = (options) => {
    console.log("initialize template");
}

let modules = (name, options) => {
    console.log("add module "+ name);
}

let register = (name, path) => {
    console.log(`Register template '${name}' on path '${path}'`)
}

program
    .version(VERSION)

program
    .command("list")
    .alias("l")
    .description("list available modules")
    .action(list);

program
    .command("generate <name>")
    .alias("g")
    .description("generate a project from a template")
    .option("-o, --out <dir>", "output directory")
    .option("-i, --in <dir>", "input template directory")
    .option("-t, --template <name>", "a registered template to use")
    .option(
        "-m, --modules <modules...>", 
        "a pipe separated list of modules to include (defaults to 'default')", 
        (str: string) => str.split("|").map(s => s.trim()))
    .action(generate);

program
    .command("init")
    .alias("i")
    .description("initialize a template in current directory")
    .action(init);

program
    .command("module <name>")
    .alias("m")
    .option("-d, --description", "the modules description")
    .description("adds a module to current directory")
    .action(modules);

program
    .command("register <name> <path>")
    .alias("r")
    .description("register a template in a certain path")
    .action(modules);

program.parse(process.argv);

process.exit();