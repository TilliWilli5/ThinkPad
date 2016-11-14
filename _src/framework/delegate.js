"use strict";
class Delegate extends Base
{
    constructor(pCore){
        super(pCore);
    }
    Delegate(pMethodName){
        // return this[pMethodName].bind(this);
        let theDelegate = this[pMethodName].bind(this);
        {
            "debug";
            let that = ((pThis)=>{return pThis})(this);
            let theDebugDelegate = function DelegateWithDebug(pArgs){
                Delegate.WriteDebugInfo(that, pMethodName);
                theDelegate(pArgs);
            }
            return theDebugDelegate;
        }
        return theDelegate;
    }
}
{
    "debug";
    Delegate.WriteDebugInfo = function(pWho, pMethod){console.debug(`%c\t\u27A5${pWho.constructor.name}(${pMethod})`, "color:ForestGreen;font-size:1em;");}
}