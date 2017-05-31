"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZ2VuZXJhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFFN0Isa0RBQStDO0FBQy9DLG9EQUFpRDtBQUNqRCw0Q0FBeUM7QUFFekMsa0JBQXlCLElBQVksRUFBRSxPQUFZO0lBQy9DLE1BQU0sS0FBSyxHQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNySSxNQUFNLE1BQU0sR0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1SixNQUFNLE9BQU8sR0FBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBRTFELE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QyxNQUFNLGdCQUFnQixHQUFHLE9BQU87U0FDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkMsTUFBTSxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDL0IsYUFBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDakMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDMUIsYUFBYSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztJQUVuRCxJQUFJLHFCQUFTLENBQUMsYUFBYSxDQUFDO1NBQ3ZCLE9BQU8sRUFBRTtTQUNULE9BQU8sRUFBRSxDQUFDO0lBRWYsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksbUJBQW1CLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDNUQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25CLENBQUM7QUF0QkQsNEJBc0JDIn0=