"use strict";
module.exports = Validator;
//Another cool name for class - Calbitter/Calbiter (aka CallbackEmitter)
class Validator extends Emitter
{
    constructor(pCore){
        super(pCore);
    }
    Validate(pValue, pCallback, pArgs){{"debug";this.ThrowNotImplemented("Validate");}}
    Try(pValue, pCallback, pArgs){{"debug";this.ThrowNotImplemented("Try");}}//Alias for Valildate
}