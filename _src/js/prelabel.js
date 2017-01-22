"use strict";
var BaseCtrl = require("./framework/base_ctrl.js");
class Prelabel extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.animDuration = 0.6;
    }
    Show(){
        if(this.isHidden)
        {
            this.view.style.animation = `xScaleUp ${this.animDuration}s forwards`;
            this.isHidden = false;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.style.animation = `xScaleDown ${this.animDuration}s reverse forwards`;
            this.isHidden = true;
        }
    }
}
module.exports = Prelabel;