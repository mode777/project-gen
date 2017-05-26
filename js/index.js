"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNyRCxxQ0FBcUM7QUFNckMseUNBQTRDO0FBRTVDLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTztJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFBO0FBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRSxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksY0FBYyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0FBQ2hFLENBQUMsQ0FBQTtBQUVELE9BQU87S0FDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFckIsT0FBTztLQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDZixLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsV0FBVyxDQUFDLHdCQUF3QixDQUFDO0tBQ3JDLE1BQU0sQ0FBQyxlQUFJLENBQUMsQ0FBQztBQUVsQixPQUFPO0tBQ0YsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0tBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixXQUFXLENBQUMsb0NBQW9DLENBQUM7S0FDakQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO0tBQzdDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsQ0FBQztLQUNwRCxNQUFNLENBQUMsdUJBQXVCLEVBQUUsOEJBQThCLENBQUM7S0FDL0QsTUFBTSxDQUFDLGFBQWEsRUFBRSxxQ0FBcUMsQ0FBQztLQUM1RCxNQUFNLENBQUMsNEJBQTRCLEVBQUUscUVBQXFFLEVBQ3ZHLENBQUMsR0FBVyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RCxNQUFNLENBQUMsbUJBQVEsQ0FBQyxDQUFDO0FBRXRCLE9BQU87S0FDRixPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLFdBQVcsQ0FBQyw0Q0FBNEMsQ0FBQztLQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEIsT0FBTztLQUNGLE9BQU8sQ0FBQyxlQUFlLENBQUM7S0FDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsQ0FBQztLQUN0RCxXQUFXLENBQUMsb0NBQW9DLENBQUM7S0FDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXJCLE9BQU87S0FDRixPQUFPLENBQUMsd0JBQXdCLENBQUM7S0FDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLFdBQVcsQ0FBQyx1Q0FBdUMsQ0FBQztLQUNwRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFNUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDIn0=