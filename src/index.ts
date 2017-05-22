
const VERSION = require('./../package.json').version;
import * as program from 'commander';

program
  .version(VERSION)

program
    .command('generate <out-dir>')
    .alias('g')
    .description('generate template in <out-dir>')
    .option("-m, --modules [modules...]", "a comma separated list of modules to include (defaults to 'main')", (str: string) =>str.split(',') )
    .action(function(out_dir, opt){
        console.log(opt.modules);
        console.log(`Generate to dir ${out_dir} with ${opt.modules.length}`);
    });

program
  .command('list')
  .alias('l')
  .description('list available modules')
  .action(function(){
    console.log("listing..");
  });

program.parse(process.argv);