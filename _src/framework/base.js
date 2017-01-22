"use strict";
module.exports = Base;
class Base
{
    constructor(pCore){
        if(pCore)
            Object.assign(this, pCore);
    }
    PreSerialize(){
        {"debug";this.ThrowNotImplemented("PreSerialize");}
    }
    Serialize(){
        return JSON.stringify(this);
    }
    Deserialize(pSource){
        Object.assign(this, JSON.parse(pSource));
    }
    ClassName(){
        return this.constructor.name;
    }
    SuperClass(){
        return super.constructor;
    }
    ThrowNotImplemented(pMethodName = ""){
        "debug";
        throw `Not implemented: ${this.constructor.name}${pMethodName?"."+pMethodName:""}`;
    }
}