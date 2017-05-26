import { IFile } from './interfaces';
import { FileBase } from './FileBase';
import { copySync, mkdirpSync } from "fs-extra";
import * as path from 'path';

export class BinaryFile extends FileBase {

    public process() {               
        mkdirpSync(path.dirname(this.outputName));
        copySync(this.inputName, this.outputName);
    }

}