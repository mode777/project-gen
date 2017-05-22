"use strict";
const VERSION = require('./../package.json').version;
const program = require("commander");
const Configuration_1 = require("./Configuration");
const Template_1 = require("./Template");
program
    .version(VERSION);
program
    .command('list')
    .alias('l')
    .description('list available modules')
    .action(function () {
    let template = new Template_1.Template(process.cwd());
    console.info("Listing available modules");
    console.info(Array(80).join("-"));
    template.getModules().forEach(m => {
        console.info(`${m.name}\t\t${m.description || '-- no description --'}`);
    });
});
program
    .command('generate <out-dir>')
    .alias('g')
    .description('generate template in <out-dir>')
    .option("-m, --modules [modules...]", "a pipe separated list of modules to include (defaults to 'default')", (str) => str.split(',').map(s => s.trim()))
    .action(function (out_dir, opt) {
    let template = new Template_1.Template(process.cwd());
    let requestedModules = (opt.modules || ["default"])
        .map(m => template.getModule(m));
    let configuration = new Configuration_1.Configuration(requestedModules);
    console.log(configuration);
});
program.parse(process.argv);
process.exit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNyRCxxQ0FBcUM7QUFDckMsbURBQWdEO0FBQ2hELHlDQUFzQztBQUd0QyxPQUFPO0tBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXJCLE9BQU87S0FDRixPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQztLQUNyQyxNQUFNLENBQUM7SUFDSixJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsV0FBVyxJQUFJLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRVAsT0FBTztLQUNGLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QixLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO0tBQzdDLE1BQU0sQ0FDSCw0QkFBNEIsRUFDNUIscUVBQXFFLEVBQ3JFLENBQUMsR0FBVyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RCxNQUFNLENBQUMsVUFBUyxPQUFPLEVBQUUsR0FBRztJQUN6QixJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0MsSUFBSSxnQkFBZ0IsR0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBRTtTQUMxRCxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxJQUFJLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRVAsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFNUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDIn0=