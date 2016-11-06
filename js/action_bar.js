"use strict";
class ActionBar extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        // this.view = null;
        // this.isHidden = true;
        this.animDuration = 0.3;
        // if(pCore)
        //     Object.assign(this, pCore);
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