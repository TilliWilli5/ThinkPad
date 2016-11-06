"use strict";
class Delegate extends Base
{
    constructor(){
        super();
    }
    Delegate(pMethodName){
        return this[pMethodName].bind(this);
    }
}