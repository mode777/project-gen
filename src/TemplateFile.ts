import * as fs from 'fs';
import * as dot from 'dot';
import * as path from 'path';
import { mkdirpSync, copySync } from 'fs-extra';

import { FileBase } from './FileBase';

export class TemplateFile extends FileBase {

    private _fileContent: string;
    private _cancel = false;
    private _guids = {};

    public process() {
        this._readFile();
        this._fileContent = dot.template(this._fileContent)(this._createTemplateData())
        this._replaceContentTokens();

        mkdirpSync(path.dirname(this.outputName));
        fs.writeFileSync(this.outputName, this._fileContent);
    }

    private _createTemplateData(){
        return {
            tokens: this.config.tokens,
            settings: this.config.settings,
            cancel: () => this._cancel = true,
            guid: this._guid,
            guidFor: (name) => this._guidFor(name)
        }
    }

    private _readFile(){
        this._fileContent = fs.readFileSync(this.inputName, "utf8")
    }

    private _replaceContentTokens(){
        const tokens = this.config.tokens;
        Object.keys(tokens)
            .forEach(token => this._fileContent = this._fileContent.replace(new RegExp("\\$"+token+"\\$",'g'), tokens[token]));
    }

    private _guid(){
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    }

    private _guidFor(name: string){
        if(!this._guids[name])
            this._guids[name] = this._guid();
        
        return this._guids[name];
    }



}