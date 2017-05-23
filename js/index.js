"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VERSION = require("./../package.json").version;
const program = require("commander");
const path = require("path");
const Configuration_1 = require("./Configuration");
const ModuleLoader_1 = require("./ModuleLoader");
let list = () => {
    let template = new ModuleLoader_1.ModuleLoader(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        let desc = m.description || "-- no description --";
        console.info(`${m.name}\t\t${desc}`);
    });
};
let generate = (name, options) => {
    console.log(options.out);
    let input = (path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) || process.cwd());
    let output = (path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) || path.join(process.cwd(), "out"));
    let modules = (options.modules || ["default"]);
    let template = new ModuleLoader_1.ModuleLoader(input);
    let requestedModules = modules
        .map(m => template.getModule(m));
    let configuration = new Configuration_1.Configuration(name, input, output, requestedModules);
    console.log(configuration);
};
let init = (options) => {
    console.log("initialize template");
};
let modules = (name, options) => {
    console.log("add module " + name);
};
program
    .version(VERSION);
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
    .option("-m, --modules <modules...>", "a pipe separated list of modules to include (defaults to 'default')", (str) => str.split(",").map(s => s.trim()))
    .action(generate);
program
    .command("init")
    .alias("i")
    .option("-p, --project", "project name")
    .description("initialize a template in current directory")
    .action(list);
program
    .command("module <name>")
    .alias("m")
    .option("-d, --description", "the modules description")
    .description("adds a module to current directory")
    .action(list);
program.parse(process.argv);
process.exit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDckQscUNBQXFDO0FBQ3JDLDZCQUE2QjtBQUM3QixtREFBZ0Q7QUFDaEQsaURBQThDO0FBSTlDLElBQUksSUFBSSxHQUFHO0lBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxzQkFBc0IsQ0FBQztRQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN4QixJQUFJLEtBQUssR0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUs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