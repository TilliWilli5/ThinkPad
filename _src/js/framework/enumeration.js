"use strict";
module.exports = Enumeration;
class Enumeration
{
    constructor(pCore)
    {
        Object.assign(this, pCore);
    }
    Stringify(pEnviroment) {
        for (let key in this)
            if (this[key] === pEnviroment)
                return key;
    }
}