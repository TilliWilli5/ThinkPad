"use strict";
//Another cool name for class - Calbitter/Calbiter (aka CallbackEmitter)
class Validator extends Emitter
{
    constructor(pCore){
        super(pCore);
    }
    Validate(pValue, pCallback, pArgs){throw "Not implemented";}
    Try(pValue, pCallback, pArgs){throw "Not implemented";}//Alias for Valildate
}