"use strict";
class Delegate extends Base
{
    constructor(pCore){
        super(pCore);
    }
    Delegate(pMethodName){
        return this[pMethodName].bind(this);
    }
}