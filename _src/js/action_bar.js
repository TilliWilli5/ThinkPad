"use strict";
var BaseCtrl = require("./framework/base_ctrl.js");
module.exports = ActionBar;
class ActionBar extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.animDuration = 0.3;
    }
    Show(){
        if(this.isHidden)
        {
            this.view.style.animation = `yScaleUpDiary ${this.animDuration}s forwards`;
            this.isHidden = false;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.style.animation = `yScaleDownDiary ${this.animDuration}s reverse forwards`;
            this.isHidden = true;
        }
    }
}