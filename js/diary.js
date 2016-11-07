"use strict";
class Diary extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.selectionMask = [];
        this.fullViewIndex = null;
        this.noteList = null;
        this.diaryActionBar = null;
        this.tagHashHeap = {};
        this.caseSensitiveFilter = false;
    }
    AttachTo(pView){
        pView.ctrl = this;
        this.view = pView;
        let eventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers("#diaryDeleteBtn", eventName, [this.DiaryDeleteBtnClick]);
        this.noteList = this.view.querySelector("#noteList");
        this.diaryActionBar = this.view.querySelector("#diaryActionBar");
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
    Add(pNoteInfo){
        let theNote = new Note(pNoteInfo);
        theNote.On("swipeUp", this.Delegate("InEventNoteSwipeUp"));
        theNote.On("swipeDown", this.Delegate("InEventNoteSwipeDown"));
        theNote.On("swipeLeft", this.Delegate("InEventNoteSwipeLeft"));
        theNote.On("swipeRight", this.Delegate("InEventNoteSwipeRight"));
        theNote.On("tap", this.Delegate("InEventNoteTap"));
        //Для ускорения последующего поиска по тэгам добовляем каждый тэг в хештаблицу
        for(let tagName of pNoteInfo.tags)
            this.tagHashHeap[tagName] = true;
        this.view.querySelector("#noteList").appendChild(theNote.Render());
    }
    Search(pQueryString){
        if(pQueryString === "")
        {
            for(let note of this.noteList.children)
                note.ctrl.Show();
        }
        else
        {
            // let fullTextFilter = "";
            let tagsFilter = [];
            let queryParts = pQueryString.split("#");
            if(pQueryString[0] === "#")
            {
                //Простой запрос 1 - поиск осуществляется только по тэгам
                if(pQueryString === "#")
                {
                    // this.Filter(null, null);
                }
                else
                {
                    for(let tagName of queryParts)
                        if(tagName !== "" && this.tagHashHeap[tagName.trim()])
                            tagsFilter.push(tagName.trim());
                    this.Filter(null, tagsFilter);
                }
            }
            else
            {
                if(queryParts.length >=2)
                {
                    //Сложный запрос - поиск будет осуществляться как по тексту так и по тэгам
                    // if(this.tagHashHeap[tagName.trim()])
                    //     tagsFilter.push(tagName.trim());
                    // this.Filter(queryParts[0].trim().toLowerCase(), tagsFilter);
                    alert("Не реализовано");
                }
                else
                {
                    //Простой запрос 2 - поиск будет осуществлятся по тексту
                    this.Filter(queryParts[0].trim().toLowerCase(), null);
                }
            }
        }
    }
    Filter(pFullTextFilter, pTagsFilter){
        if(pFullTextFilter === null && pTagsFilter === null)
        {
            for(let note of this.noteList.children)
                    if(note.ctrl.status !== NoteStatus.DELETED)
                    {
                        note.ctrl.Show();
                        note.ctrl.status = NoteStatus.EXIST;
                    }
        }
        else
        {
            if(pTagsFilter && pFullTextFilter)
            {
                //Фильтр по тэгам и тексту
                for(let note of this.noteList.children)
                        if(note.ctrl.status !== NoteStatus.DELETED)
                            for(let tagName of note.ctrl.tags)
                                for(let tagFilterName of pTagsFilter)
                                    if(tagFilterName === tagName)
                                        if(note.ctrl.title.toLowerCase().indexOf(pFullTextFilter) === -1 && note.ctrl.desc.toLowerCase().indexOf(pFullTextFilter) === -1)
                                        {
                                            note.ctrl.Hide();
                                            note.ctrl.status = NoteStatus.HIDDEN;
                                        }
                                        else
                                        {
                                            note.ctrl.Show();
                                            note.ctrl.status = NoteStatus.EXIST;
                                        }
            }
            else
            {
                if(pTagsFilter)
                {
                    //Фильтр по тэгам
                    if(pTagsFilter.length === 0)
                    {
                        for(let note of this.noteList.children)
                            if(note.ctrl.status !== NoteStatus.DELETED)
                            {
                                note.ctrl.Hide();
                                note.ctrl.status = NoteStatus.HIDDEN;
                            }

                    }
                    else
                    {
                        jumpToNextNote:for(let note of this.noteList.children)
                            if(note.ctrl.status !== NoteStatus.DELETED)
                                for(let tagName of note.ctrl.tags)
                                    for(let tagFilterName of pTagsFilter)
                                        if(tagFilterName === tagName)
                                        {
                                            note.ctrl.Show();
                                            note.ctrl.status = NoteStatus.EXIST;
                                            continue jumpToNextNote;
                                        }
                                        // else
                                        // {
                                        //     note.ctrl.Hide();
                                        //     note.ctrl.status = NoteStatus.HIDDEN;
                                        // }
                    }
                }
                else
                {
                    //Фильтр по тексту
                    for(let note of this.noteList.children)
                        if(note.ctrl.status !== NoteStatus.DELETED)
                            if((note.ctrl.title.toLowerCase().indexOf(pFullTextFilter) === -1) && (note.ctrl.desc.toLowerCase().indexOf(pFullTextFilter) === -1))
                            {
                                note.ctrl.Hide();
                                note.ctrl.status = NoteStatus.HIDDEN;
                            }
                            else
                            {
                                note.ctrl.Show();
                                note.ctrl.status = NoteStatus.EXIST;
                            }
                }
            }
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