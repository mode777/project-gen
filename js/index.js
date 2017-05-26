"use strict";
const VERSION = require("./../package.json").version;
const program = require("commander");
const path = require("path");
const Configuration_1 = require("./Configuration");
const ModuleLoader_1 = require("./ModuleLoader");
const Generator_1 = require("./Generator");
const list = () => {
    const template = new ModuleLoader_1.ModuleLoader(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        const desc = m.description || "-- no description --";
        console.info(`${m.name}\t\t${desc}`);
    });
};
const generate = (name, options) => {
    const input = (options.in ? path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) : process.cwd());
    const output = (options.out ? path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) : path.join(process.cwd(), "out"));
    const modules = (options.modules || ["default"]);
    const loader = new ModuleLoader_1.ModuleLoader(input);
    const requestedModules = modules
        .map(m => loader.getModule(m));
    const configuration = new Configuration_1.Configuration(name, input, output, requestedModules);
    new Generator_1.Generator(configuration)
        .collect()
        .process();
    console.info(`Project "${name}" generated in "${output}".`);
};
const init = (options) => {
    console.log("initialize template");
};
let modules = (name, options) => {
    console.log("add module " + name);
};
let register = (name, path) => {
    console.log(`Register template '${name}' on path '${path}'`);
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
    .option("-t, --template <name>", "a registered template to use")
    .option("-m, --modules <modules...>", "a pipe separated list of modules to include (defaults to 'default')", (str) => str.split("|").map(s => s.trim()))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNyRCxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLG1EQUFnRDtBQUNoRCxpREFBOEM7QUFFOUMsMkNBQXdDO0FBR3hDLE1BQU0sSUFBSSxHQUFHO0lBQ1QsTUFBTSxRQUFRLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxzQkFBc0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTztJQUMzQixNQUFNLEtBQUssR0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckksTUFB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