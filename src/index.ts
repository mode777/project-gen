const VERSION = require('./../package.json').version;
import * as program from 'commander';
import { Configuration } from './Configuration';
import { Template } from './Template';
import { IModule } from './interfaces';

program
    .version(VERSION)

program
    .command('list')
    .alias('l')
    .description('list available modules')
    .action(function(){
        let template = new Template(process.cwd());
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
    .option(
        "-m, --modules [modules...]", 
        "a pipe separated list of modules to include (defaults to 'default')", 
        (str: string) => str.split(',').map(s => s.trim()))
    .action(function(out_dir, opt){
        let template = new Template(process.cwd());    
        let requestedModules = (<string[]>(opt.modules || ["default"]))
            .map(m => template.getModule(m));
        let configuration = new Configuration(requestedModules);
        console.log(configuration);
    });

program.parse(process.argv);

process.exit();