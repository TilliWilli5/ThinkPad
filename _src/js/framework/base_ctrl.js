"use strict";
var Emitter = require("./emitter.js");
class BaseCtrl extends Emitter
{
    constructor(pCore){
        super(pCore);
        this.view = null;
        this.isHidden = true;
    }
    AttachTo(pView){
        pView.ctrl = this;
        this.view = pView;
    }
    Visualize(){
        // this.view.parentNode.replaceChild(this.Render(), this.view);
        this.Render(this.view);
    }
    Render(pView){
        let theView = pView || document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        return theView;
    }
    AssignHandlers(pSelector = "", pEventName, pHandlerArray){
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
        for(let iX=0; iX<pHandlerArray.length; ++iX)
        {
            this.view.addEventListener(pEventName, function(pEvent){
                if(pEvent.target[anchor] === pSelector)
                    pHandlerArray[iX].call(this.ctrl, pEvent);
            });
        }
    }
    //Inner Methods
    Show(){
        if(this.isHidden)
        {
            this.view.style.display = "initial";
            this.isHidden = false;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.style.display = "none";
            this.isHidden = true;
        }
    }
    //Inner Handlers
    //Delegates
    //Events
}
module.exports = BaseCtrl;