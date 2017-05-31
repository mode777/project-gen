"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VERSION = require("./../package.json").version;
const program = require("commander");
const commands_1 = require("./commands");
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
    .action(commands_1.list);
program
    .command("generate <name>")
    .alias("g")
    .description("generate a project from a template")
    .option("-o, --out <dir>", "output directory")
    .option("-i, --in <dir>", "input template directory")
    .option("-t, --template <name>", "a registered template to use")
    .option("-c, --clear", "clear output directory if not empty")
    .option("-m, --modules <modules...>", "a pipe separated list of modules to include (defaults to 'default')", (str) => str.split("|").map(s => s.trim()))
    .action(commands_1.generate);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDckQscUNBQXFDO0FBTXJDLHlDQUE0QztBQUU1QyxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU87SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQUVELElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUUsSUFBSSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFBO0FBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLGNBQWMsSUFBSSxHQUFHLENBQUMsQ0FBQTtBQUNoRSxDQUFDLENBQUE7QUFFRCxPQUFPO0tBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXJCLE9BQU87S0FDRixPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQztLQUNyQyxNQUFNLENBQUMsZUFBSSxDQUFDLENBQUM7QUFFbEIsT0FBTztLQUNGLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztLQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsV0FBVyxDQUFDLG9DQUFvQyxDQUFDO0tBQ2pELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztLQUM3QyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUM7S0FDcEQsTUFBTSxDQUFDLHVCQUF1QixFQUFFLDhCQUE4QixDQUFDO0tBQy9ELE1BQU0sQ0FBQyxhQUFhLEVBQUUscUNBQXFDLENBQUM7S0FDNUQsTUFBTSxDQUFDLDRCQUE0QixFQUFFLHFFQUFxRSxFQUN2RyxDQUFDLEdBQVcsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdEQsTUFBTSxDQUFDLG1CQUFRLENBQUMsQ0FBQztBQUV0QixPQUFPO0tBQ0YsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUNmLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixXQUFXLENBQUMsNENBQTRDLENBQUM7S0FDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWxCLE9BQU87S0FDRixPQUFPLENBQUMsZUFBZSxDQUFDO0tBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixNQUFNLENBQUMsbUJBQW1CLEVBQUUseUJBQXlCLENBQUM7S0FDdEQsV0FBVyxDQUFDLG9DQUFvQyxDQUFDO0tBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVyQixPQUFPO0tBQ0YsT0FBTyxDQUFDLHdCQUF3QixDQUFDO0tBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixXQUFXLENBQUMsdUNBQXVDLENBQUM7S0FDcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXJCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTVCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyJ9