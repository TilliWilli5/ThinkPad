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
        this.caseSensitiveSearch = false;
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
    Add(pNoteSource){
        let theNote = new Note(pNoteSource);
        theNote.On("swipeUp", this.Delegate("InEventNoteSwipeUp"));
        theNote.On("swipeDown", this.Delegate("InEventNoteSwipeDown"));
        theNote.On("swipeLeft", this.Delegate("InEventNoteSwipeLeft"));
        theNote.On("swipeRight", this.Delegate("InEventNoteSwipeRight"));
        theNote.On("tap", this.Delegate("InEventNoteTap"));
        //Для ускорения последующего поиска по тэгам добовляем каждый тэг в хештаблицу
        for(let tagName of pNoteSource.tags)
            this.tagHashHeap[tagName] = true;
        this.view.querySelector("#noteList").appendChild(theNote.Render());
    }
    HideAllNotes(){
        for(let note of this.noteList.children)
            note.ctrl.Hide();
    }
    ShowAllNotes(){
        // for(let note of this.noteList.children)
        //     note.ctrl.Show();
        for(let note of this.noteList.children)
            if(note.ctrl.status !== NoteStatus.DELETED)
            {
                note.ctrl.Show();
                note.ctrl.status = NoteStatus.EXIST;
            }
    }
    PrepareSearch(pQuery){
        let fullTextSearch = null;
        let tagMask = null;
        let _result = ()=>{return {fullTextSearch, tagMask};};
        if(pQuery === "")//QueryType1
            return _result();
        let queryParts = pQuery.split("#");
        if(pQuery[0] === "#")//Поиск осуществляется только по тэгам
        {
            //Еще не успели ввести тело тэга - необходимо скрыть все записи. Возможно даже раньше как только мы входим в режим поиска (SIM)
            if(pQuery === "#")//QueryType1
                return _result();
            else//QueryType2
            {
                tagMask = [];
                for(let tagName of queryParts)
                {
                    tagName = tagName.trim();
                    if(!this.caseSensitiveSearch)
                        tagName = tagName.toLowerCase();
                    //Отсеиваем тэги кых нет в хаштаблице и пустые тэги. Тэги не попавшие в хеш таблицу точно не пресутствуют не в одной из записей - нет необходимости в их дальнейшем процессинге
                    //if(tagName && this.tagHashHeap[tagName])
                    if(tagName)
                        tagMask.push(tagName);
                }
            }
        }
        else
        {
            if(queryParts.length === 1)//QueryType3 - поиск будет осуществлятся по тексту
            {
                fullTextSearch = queryParts[0].trim();
                    if(!this.caseSensitiveSearch)
                        fullTextSearch = fullTextSearch.toLowerCase();
            }
            else//QueryType4 - поиск будет осуществляться как по тексту так и по тэгам
            {
                fullTextSearch = queryParts[0].trim();
                    if(!this.caseSensitiveSearch)
                        fullTextSearch = fullTextSearch.toLowerCase();
                tagMask = [];
                //Начинаем с индекса 1 потому что 0 индекс это fullTextSearch
                for(let iX=1;iX<queryParts.length;++iX)
                {
                    let tagName = queryParts[iX].trim();
                    if(!this.caseSensitiveSearch)
                        tagName = tagName.toLowerCase();
                    //Отсеиваем тэги кых нет в хаштаблице и пустые тэги. Тэги не попавшие в хеш таблицу точно не пресутствуют не в одной из записей - нет необходимости в их дальнейшем процессинге
                    if(tagName)
                        tagMask.push(tagName);
                }
            }
        }
        return _result();
    }
    Filter(pFullTextFilter, pTagMask){
        if(pFullTextFilter === null && pTagMask === null)//QueryType1
        {
            ;//do nothing
        }
        else
        {
            if(pTagMask && pFullTextFilter)
            {
                //Фильтр по тэгам и тексту
                for(let note of this.noteList.children)
                        if(note.ctrl.status !== NoteStatus.DELETED)
                            for(let tagName of note.ctrl.tags)
                                for(let tagFilterName of pTagMask)
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
                if(pTagMask)//QueryType2 - поиск по тегам
                {
                    if(pTagMask.length === 0)
                    {
                        //Do nothing
                    }
                    else
                    {
                        for(let note of this.noteList.children)
                        {
                            if(note.ctrl.status === NoteStatus.DELETED)
                                continue;
                            let maskPassed = false;
                            let maskTagCounter = 0;
                            for(let noteTag of note.ctrl.tags)
                            {
                                for(let maskTag of pTagMask)
                                    if(maskTag === noteTag)
                                        ++maskTagCounter;
                            }
                            if(maskTagCounter === pTagMask.length)
                                maskPassed = true;
                            if(maskPassed)
                                note.ctrl.Show();
                            else
                                note.ctrl.Hide();
                        }
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
    OnNoteCreated(pNoteSource){
        this.Add(pNoteSource);
    }
    OnSearch(pQuery){
        let searchInfo = this.PrepareSearch(pQuery);
        this.Filter(searchInfo.fullTextSearch, searchInfo.tagMask);
    }
    OnModeChanged(pMode){
        switch(pMode)
        {
            // case SIMMode.SEARCH: this.HideAllNotes();break;
            case SIMMode.ZERO: this.ShowAllNotes();break;
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