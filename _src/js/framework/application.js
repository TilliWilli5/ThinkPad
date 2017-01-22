"use strict";
var Emitter = require("./emitter.js");
const AppStorage = new Enumeration({
    ZERO:0,
    LOCAL:1,
    FILE:2,
    DB:3,
});
class Application extends Emitter
{
    constructor(pCore)
    {
        super(pCore);
    }
    SaveState(pStorage){

    }
    LoadState(pStorage){

    }
    SerializeState(){

    }
    DeserializeState(){

    }
    //RegisterStatefulComponent - кый будет сериализироваться впоследствии. т.е. имеет значение в состоянии программы
    RegisterComponent(pComponent){

    }
    UnregisterComponent(pComponent){
        
    }
}
module.exports = Application;