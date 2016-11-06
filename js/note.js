class Note extends BaseCtrl
{
    constructor(pTitle, pDesc, pTags){
        super();
        this.view = null;
        this.isHidden = true;
        this.isFolded = true;
        this.title = pTitle;
        this.desc = pDesc;
        this.tags = pTags;
    }
    Render(){
        let theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        theView.className = "note";
        //Assigning handlers
        // let eventName = document.body.ontouchstart?"touchstart":"click";
        // this.AssignHandlers(".noteTitle", eventName, [this.NoteBodyClickHandler]);
        let hammerManager = new Hammer.Manager(this.view, {
            recognizers:[
                [Hammer.Swipe, {direction:Hammer.DIRECTION_ALL}],
                [Hammer.Tap]
            ]
        });
        hammerManager.on("swipe", function(pEvent){
            // console.log(pEvent);
            let note = util.FindParent(pEvent.target, ".note", true);
            switch(pEvent.direction)
            {
                case Hammer.DIRECTION_UP:note.ctrl.Emit("swipeUp", note);break;
                case Hammer.DIRECTION_DOWN:note.ctrl.Emit("swipeDown", note);break;
                case Hammer.DIRECTION_LEFT:note.ctrl.Emit("swipeLeft", note);break;
                case Hammer.DIRECTION_RIGHT:note.ctrl.Emit("swipeRight", note);break;
            }
        });
        hammerManager.on("tap", function(pEvent){
            // console.log(pEvent);
            let note = util.FindParent(pEvent.target, ".note", true);
            note.ctrl.Emit("tap", note);
        });
            let theHandle = document.createElement("div");
            theHandle.className = "noteHandle";
        theView.appendChild(theHandle);
            let theBody = document.createElement("div");
            theBody.className = "noteBody";
                let theTitle = document.createElement("div");
                theTitle.className = "noteTitle";
                theTitle.innerHTML = this.title;
                let theDesc = document.createElement("div");
                theDesc.className = "noteDesc";
                theDesc.innerHTML = this.desc;
                let theTagField = document.createElement("div");
                theTagField.className = "noteTagField";
                theTagField.innerHTML = this.tags;
            theBody.appendChild(theTitle);
            theBody.appendChild(theDesc);
            theBody.appendChild(theTagField);
        theView.appendChild(theBody);
        return theView;
    }
    //Inner Methods
    Expand(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleDownDiary" || desc.style.animationName === "")
        {
            desc.style.display = "initial";
            tagField.style.display = "initial";
            desc.style.animation = "yScaleUpDiary 0.3s forwards";
            tagField.style.animation = "yScaleUpDiary 0.3s forwards ease-out";
            this.view.querySelector(".noteBody").classList.add("noteBodyFullView");
        }
    }
    Fold(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleUpDiary")
        {
            desc.style.animation = "yScaleDownDiary 0.3s reverse forwards";
            tagField.style.animation = "yScaleDownDiary 0.3s reverse forwards ease-out";
            this.view.querySelector(".noteBody").classList.remove("noteBodyFullView");
        }
    }
    Toogle(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleDownDiary" || desc.style.animationName === "")
        {
            desc.style.display = "initial";
            tagField.style.display = "initial";
            desc.style.animation = "yScaleUpDiary 0.3s forwards";
            tagField.style.animation = "yScaleUpDiary 0.3s forwards ease-out";
            this.view.querySelector(".noteBody").classList.add("noteBodyFullView");
        }
        else
        {
            desc.style.animation = "yScaleDownDiary 0.3s reverse forwards";
            tagField.style.animation = "yScaleDownDiary 0.3s reverse forwards ease-out";
            this.view.querySelector(".noteBody").classList.remove("noteBodyFullView");
        }
    }
    //Inner Handlers
    NoteBodyClickHandler(pEvent){
        util.FindParent(pEvent.target, ".note").ctrl.Expand();
    }
    //Delegates
    //Events
}