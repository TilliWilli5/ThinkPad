"use strict";
var Emitter = require("./framework/emitter.js");
// var localforage = require("exports-loader?localforage!./js_external/localforage.min.js");
var localforage = require("localforage");
class LocalStorage extends Emitter
{
    // constructor(pCore){
    //     super(pCore);
    // }
    OnNoteAdded(pNote){
        localforage.setItem(`note:${pNote.id}`, pNote.PreSerialize()).catch((pReason)=>{console.error(pReason)});
    }
    OnNoteDeleted(pNoteID){
        // {"debug";this.ThrowNotImplemented("OnNoteDeleted");}
        localforage.removeItem(`note:${pNoteID}`);
    }
    OnAfterEditSubmitted(pNote){
        localforage.setItem(`note:${pNote.ctrl.id}`, pNote.ctrl.PreSerialize()).catch((pReason)=>{console.error(pReason)});
    }
    LoadDiary(){
        let diary = [];
        let that = this;
        localforage.iterate((pValue, pKey)=>{
            if(pKey.substr(0,5) === "note:")
                diary.push(pValue);
        }).then(()=>{that.Emit("diaryLoaded", diary)});
        {"debug";console.log("Diary loaded");}
        // this.Emit("diaryLoaded")
    }
}
module.exports = LocalStorage;