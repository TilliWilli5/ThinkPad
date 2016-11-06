class Prelabel extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        // this.view = null;
        // this.isHidden = true;
        this.animDuration = 0.6;
        // if(pCore)
        //     Object.assign(this, pCore);
    }
    // AttachTo(pShelter)
    // {
    //     this.view = pShelter;
    //     pShelter.ctrl = this;
    // }
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