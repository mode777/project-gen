const VERSION = require("./../package.json").version;
import * as program from "commander";
import * as path from "path";
import { Configuration } from "./Configuration";
import { ModuleLoader } from "./ModuleLoader";
import { IModule } from "./interfaces";
import { Generator } from './Generator';
import { list, generate } from "./commands";

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
    .option("-c, --clear", "clear output directory if not empty")
    .option("-m, --modules <modules...>", "a pipe separated list of modules to include (defaults to 'default')", 
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