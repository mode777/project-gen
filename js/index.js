"use strict";
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
    let input = (options.in ? path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) : process.cwd());
    let output = (options.out ? path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) : path.join(process.cwd(), "out"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNyRCxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLG1EQUFnRDtBQUNoRCxpREFBOEM7QUFJOUMsSUFBSSxJQUFJLEdBQUc7SUFDUCxJQUFJLFFBQVEsR0FBRyxJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxJQUFJLHNCQUFzQixDQUFDO1FBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPO0lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hCLElBQUksS0FBSyxHQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxP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