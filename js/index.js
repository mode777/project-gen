"use strict";
const VERSION = require('./../package.json').version;
const program = require("commander");
program
    .version(VERSION);
program
    .command('generate <out-dir>')
    .alias('g')
    .description('generate template in <out-dir>')
    .option("-m, --modules [modules...]", "a comma separated list of modules to include (defaults to 'main')", (str) => str.split(','))
    .action(function (out_dir, opt) {
    console.log(opt.modules);
    console.log(`Generate to dir ${out_dir} with ${opt.modules.length}`);
});
program
    .command('list')
    .alias('l')
    .description('list available modules')
    .action(function () {
    console.log("listing..");
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNyRCxxQ0FBcUM7QUFFckMsT0FBTztLQUNKLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUVuQixPQUFPO0tBQ0YsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0tBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixXQUFXLENBQUMsZ0NBQWdDLENBQUM7S0FDN0MsTUFBTSxDQUFDLDRCQUE0QixFQUFFLG1FQUFtRSxFQUFFLENBQUMsR0FBVyxLQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUU7S0FDMUksTUFBTSxDQUFDLFVBQVMsT0FBTyxFQUFFLEdBQUc7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsT0FBTyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUN6RSxDQUFDLENBQUMsQ0FBQztBQUVQLE9BQU87S0FDSixPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNWLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQztLQUNyQyxNQUFNLENBQUM7SUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUwsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==