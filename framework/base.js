"use strict";
class Base
{
    constructor(pCore){
        if(pCore)
            Object.assign(this, pCore);
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
}