const VERSION = require("./../package.json").version;
import * as program from "commander";
import * as path from "path";
import { Configuration } from "./Configuration";
import { ModuleLoader } from "./ModuleLoader";
import { IModule } from "./interfaces";


let list = () => {
    let template = new ModuleLoader(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        let desc = m.description || "-- no description --";
        console.info(`${m.name}\t\t${desc}`);
    });
}

let generate = (name, options) => {
    console.log(options.out)
    let input = <string>(path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) || process.cwd());
    let output = <string>(path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) || path.join(process.cwd(), "out"));
    let modules = <string[]>(options.modules || ["default"]) 
    
    let template = new ModuleLoader(input);   
    
    let requestedModules = modules
        .map(m => template.getModule(m));

    let configuration = new Configuration(name, input, output, requestedModules);
    console.log(configuration);
}

let init = (options) => {
    console.log("initialize template");
}

let modules = (name, options) => {
    console.log("add module "+ name);
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
    .option(
        "-m, --modules <modules...>", 
        "a pipe separated list of modules to include (defaults to 'default')", 
        (str: string) => str.split(",").map(s => s.trim()))
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

program.parse(process.argv);

process.exit();