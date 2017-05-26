"use strict";
const path = require("path");
const ModuleLoader_1 = require("../ModuleLoader");
const Configuration_1 = require("../Configuration");
const Generator_1 = require("../Generator");
function generate(name, options) {
    const input = (options.in ? path.isAbsolute(options.in) ? options.in : path.join(process.cwd(), options.in) : process.cwd());
    const output = (options.out ? path.isAbsolute(options.out) ? options.out : path.join(process.cwd(), options.out) : path.join(process.cwd(), "out"));
    const modules = (options.modules || ["default"]);
    const loader = new ModuleLoader_1.ModuleLoader(input);
    const requestedModules = modules
        .map(m => loader.getModule(m));
    const configuration = new Configuration_1.Configuration(requestedModules);
    configuration.inputDir = input;
    configuration.outputDir = output;
    configuration.name = name;
    configuration.clearOutput = options.clear || false;
    new Generator_1.Generator(configuration)
        .collect()
        .process();
    console.info(`Project "${name}" generated in "${output}".`);
    process.exit();
}
exports.generate = generate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2VuZXJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2QjtBQUU3QixrREFBK0M7QUFDL0Msb0RBQWlEO0FBQ2pELDRDQUF5QztBQUV6QyxrQkFBeUIsSUFBWSxFQUFFLE9BQVk7SUFDL0MsTUFBTSxLQUFLLEdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JJLE1BQU0sTUFBTSxHQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVKLE1BQU0sT0FBTyxHQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFFMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXZDLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTztTQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuQyxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxhQUFhLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMvQixhQUFhLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMxQixhQUFhLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0lBRW5ELElBQUkscUJBQVMsQ0FBQyxhQUFhLENBQUM7U0FDdkIsT0FBTyxFQUFFO1NBQ1QsT0FBTyxFQUFFLENBQUM7SUFFZixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxtQkFBbUIsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQXRCRCw0QkFzQkMifQ==