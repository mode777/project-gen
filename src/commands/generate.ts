import * as path from 'path';

import { ModuleLoader } from '../ModuleLoader';
import { Configuration } from '../Configuration';
import { Generator } from '../Generator';

export function generate(name: string, options: any) {
    const input = <string>(options.in ? path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) : process.cwd());
    const output = <string>(options.out ? path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) : path.join(process.cwd(), "out"));
    const modules = <string[]>(options.modules || ["default"]) 
    
    const loader = new ModuleLoader(input);   
    
    const requestedModules = modules
        .map(m => loader.getModule(m));

    const configuration = new Configuration(requestedModules);
    configuration.inputDir = input;
    configuration.outputDir = output;
    configuration.name = name;
    configuration.clearOutput = options.clear || false;

    new Generator(configuration)
        .collect()
        .process();

    console.info(`Project "${name}" generated in "${output}".`);
    process.exit();
}