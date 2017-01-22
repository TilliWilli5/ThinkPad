"use strict";
var BaseCtrl = require("./base_ctrl.js");
class AdvCtrl extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
    }
    Render(pView){
        let theView = null;
        if(pView)
            theView = pView
        else
            if(this.nodeName)
                theView = document.createElement(this.nodeName);
            else
                theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        if(this.html)
            Object.assign(theView, this.html);
        return theView;
    }
    //Inner Methods
    //Inner Handlers
    //Delegates
    //Events
}
module.exports = AdvCtrl;