"use strict";
var Emitter = require("./framework/emitter.js");
class CMD extends Emitter
{
    constructor(pCore){
        super(pCore);
        this.Trap("saveFile", this.SaveFile);
        this.Trap("loadFile", this.LoadFile);
    }
    OnExecuteCommand(pCommand){
        switch(pCommand)
        {
            case "sf": this.Emit("saveFile");break;
            case "lf": this.Emit("loadFile");break;
            case "sdb": this.Emit("saveDB");break;
            case "ldb": this.Emit("loadDB");break;
            default: this.Emit("donothing");{"debug";alert(`There is no [${pCommand}] command.`);};break;
        }
    }
    SaveFile(pObject){
        pObject = document.getElementById("diary").ctrl;//Ужаснейшее решение - нужен рефактор
        let tempLink = document.createElement("a");
        tempLink.download = ("thinkpad_" + util.Time())/*.split(".")[0]*/ + ".txt";
        var auxString = pObject.Serialize();
        tempLink.href = "data:text/plain;charset=utf-8," + encodeURI(auxString);
        tempLink.style.display = "none";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
    LoadFile(){
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        let self = this;
        fileInput.onchange = function()
        {
            var reader = new FileReader();
            reader.onload = function()
            {
                self.Emit("fileLoaded", JSON.parse(this.result));
                document.body.removeChild(fileInput);
            }
            reader.readAsText(fileInput.files[0]);
        }
        document.body.appendChild(fileInput);
        fileInput.click();
    }
}
module.exports = CMD;