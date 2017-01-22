"use strict";
module.exports = Tag;
class Tag
{
    constructor(pValue){
        this.value = pValue;
        this.view = null;
    }
    Render(){
        let theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        theView.className = "tag";
            let theLabel = document.createElement("span");
            theLabel.innerHTML = this.value;
            theLabel.className = "tagLabel";
        theView.appendChild(theLabel);
            let theButton = document.createElement("button");
            theButton.type = "button";
            theButton.className = "tagClose";
            //Создаем обработчик нажатия в зависимости от desktop/mobile версии приложения
            let eventName = document.body.ontouchstart?"touchstart":"click";
            theButton.addEventListener(eventName, function(pEvent){
                pEvent.target.parentNode.ctrl.Hide();
            });
        theView.addEventListener(eventName, function(pEvent){
            this.ctrl.Hide();
        });
        return theView;
    }
    Show(){
        this.view.style.display = "initial";
    }
    Hide(){
        this.view.style.animation = "tagHide 0.4s reverse forwards";
        this.view.addEventListener("animationend", function(){
            this.parentNode.removeChild(this);
        }, false, true);
    }
}