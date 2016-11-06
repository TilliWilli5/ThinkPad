"use strict";
class Diary extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        // this.view = null;
        this.selectionMask = [];
        this.fullViewIndex = null;
    }
    AttachTo(pShelter){
        pShelter.ctrl = this;
        this.view = pShelter;
        let eventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers("#diaryDeleteBtn", eventName, [this.DiaryDeleteBtnClick]);
    }
    //Inner Methods
    NoteIndex(pNote){
        let noteList = util.FindParent(pNote, "#noteList", true);
        return Array.prototype.indexOf.call(noteList.children, pNote);
    }
    HasSelection(){
        for(let status of this.selectionMask)
            if(status)
                return true;
        return false;
    }
    Add(pNote){
        let theNote = new Note(pNote.title, pNote.desc, "#" + pNote.tags.join(" #"));
        theNote.On("swipeUp", this.Delegate("InEventNoteSwipeUp"));
        theNote.On("swipeDown", this.Delegate("InEventNoteSwipeDown"));
        theNote.On("swipeLeft", this.Delegate("InEventNoteSwipeLeft"));
        theNote.On("swipeRight", this.Delegate("InEventNoteSwipeRight"));
        theNote.On("tap", this.Delegate("InEventNoteTap"));
        this.view.querySelector("#noteList").appendChild(theNote.Render());
    }
    //Inner Handlers
    DiaryDeleteBtnClick(pEvent){
        let notes = this.view.querySelector("#noteList").children;
        //Идем с конца чтобы можно было безболезненно вырезать удаленный элементы из селекшена
        for(let iX=notes.length-1;iX>=0;--iX)
            if(this.selectionMask[iX])
            {
                notes[iX].parentNode.removeChild(notes[iX]);
                //Тут же вырезаем из селекшена
                this.selectionMask.splice(iX);
            }
        this.view.querySelector("#diaryActionBar").ctrl.Hide();
    }
    //Delegates
    InEventNoteSwipeUp(pNote){
        //Если запись открыта то закрыть иначе отправить на редактирование
        if(this.NoteIndex(pNote) === this.fullViewIndex)
        {
            pNote.ctrl.Fold();
            this.fullViewIndex = null;
        }
        else
        {
            this.OutEventNoteEdited(pNote);
        }
    }
    InEventNoteSwipeDown(pNote){
        let noteIndex = this.NoteIndex(pNote)
        //Проверяем если запись уже открыта то ничего не делаем
        if( noteIndex === this.fullViewIndex)
        {

        }
        else
        {
            //Скрываем все (по идее должен быть только один) открытые записи
            var notes = this.view.querySelector("#noteList").children;
            for(var note of notes)
                if(note !== pNote)
                    note.ctrl.Fold();
            pNote.ctrl.Toogle();
            this.fullViewIndex = noteIndex;
        }
    }
    InEventNoteSwipeLeft(pNote){
        // console.log(pNote);
    }
    InEventNoteSwipeRight(pNote){
        console.log(pNote);
        // this.OutEventNoteSelected(pNote);
    }
    InEventNoteTap(pNote){
        //Проверяем уже выделена запись или нет
        if(this.selectionMask[this.NoteIndex(pNote)])
        {
            pNote.querySelector(".noteHandle").style.display = "none";//Эту строчку можно выполнить в контроллере Note
            this.selectionMask[this.NoteIndex(pNote)] = false;
            if(this.HasSelection() === false)
                this.view.querySelector("#diaryActionBar").ctrl.Hide();
        }
        else
        {
            pNote.querySelector(".noteHandle").style.display = "initial";//Эту строчку можно выполнить в контроллере Note
            this.view.querySelector("#diaryActionBar").ctrl.Show();
            this.selectionMask[this.NoteIndex(pNote)] = true;
        }
    }
    //Events
    OutEventNoteEdited(pNote){
        let noteIndex = this.NoteIndex(pNote);
        let title = pNote.querySelector(".noteTitle").innerText;
        let desc = pNote.querySelector(".noteDesc").innerText;
        let tagField = pNote.querySelector(".noteTagField").innerText.split("#").splice(1);
        let noteInfo = {title, desc, tagField, noteIndex};
        this.Emit("noteEdited", noteInfo);
    }
}