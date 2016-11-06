"use strict";
var util = {};
util.enviroment = {
    ZERO: 0,
    NODEJS: 1,
    FIREFOX: 2,
    CHROME: 3,
    SAFARI: 4,

    Stringify: function(pEnviroment){
        for(let key in this)
            if(this[key] === pEnviroment)
                return key;
    }
}
util.DefineEnviroment = function(){
    // Firefox/	    Mozilla/5.0 (Windows NT 6.3; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0
    // Chrome/		Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36
    // Version/		Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A
    if(window)
    {
        if(window.navigator.userAgent.indexOf("Firefox/") !== -1)
            return UtilEnviroment.FIREFOX;
        if(window.navigator.userAgent.indexOf("Chrome/") !== -1)
            return UtilEnviroment.CHROME;
        if(window.navigator.userAgent.indexOf("Version/") !== -1)
            return UtilEnviroment.SAFARI;
    }
    else
    {
        return UtilEnviroment.NODEJS;
    }
}
util.FindParent = function(pStartElement, pSelector = "", pInclusive = false){
    let anchor = "id";
    if(pSelector[0] === ".")
    {
        anchor = "className";
        pSelector = pSelector.slice(1);
    }
    if(pSelector[0] === "#")
    {
        anchor = "id";
        pSelector = pSelector.slice(1);
    }
    if(pInclusive && pStartElement[anchor] === pSelector)
        return pStartElement;
    function FindRecursively(pCurrentElement){
        if(pCurrentElement.parentNode === null)
            return null;
        if(pCurrentElement.parentNode[anchor] === pSelector)
            return pCurrentElement.parentNode;
        else
            return FindRecursively(pCurrentElement.parentNode);
    };
    return FindRecursively(pStartElement);
}