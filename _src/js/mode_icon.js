"use strict";
var BaseCtrl = require("./framework/base_ctrl.js");
class ModeIcon extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
    }
    Show(pMode){
        if(this.isHidden)
        {
            this.view.innerHTML = SIMModeToChar[pMode];
            this.view.style.animation = "scaleUp 0.25s forwards";
            this.isHidden = false;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.style.animation = "scaleDown 0.25s reverse forwards";
            this.isHidden = true;
        }
    }
    ChangeMode(pMode){
        this.Hide();
        this.Show(pMode);
    }
}
module.exports = ModeIcon;