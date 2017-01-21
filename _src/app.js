import "./js_external/uuid.js";
import "./framework/util.js";
import "./framework/enumeration.js";
import "./framework/base.js";
import "./framework/delegate.js";
import "./framework/emitter.js";
import "./framework/base_ctrl.js";
import "./framework/application.js";
var app = (()=>{
    //Результирующий экспорт
    let $ = {};

    // SIM stuff
    let sim = document.getElementById("sim");
    let modeIcon = document.getElementById("modeIcon");
    let titleLabel = document.getElementById("titleLabel");
    let titleInput = document.getElementById("titleInput");
    let descBar = document.getElementById("descBar");
    let descLabel = document.getElementById("descLabel");
    let tagBar = document.getElementById("tagBar");
    let tagLabel = document.getElementById("tagLabel");
    let titleUnderline = document.getElementById("titleUnderline");
    let descUnderline = document.getElementById("descUnderline");

    let simCtrl = new SIM();
    simCtrl.AttachTo(sim);
    new Prelabel().AttachTo(titleLabel);
    new ModeIcon().AttachTo(modeIcon);
    titleInput.focus();
    new Bar({animDuration:0.4}).AttachTo(descBar);
    new Prelabel({animDuration:1.0}).AttachTo(descLabel);
    new Bar({animDuration:0.4}).AttachTo(tagBar);
    new Prelabel({animDuration:1.0}).AttachTo(tagLabel);

    new Underline().AttachTo(titleUnderline);
    new Underline().AttachTo(descUnderline);

    // Diary stuff
    let diary = document.querySelector("#diary");
    let diaryCtrl = new Diary();
    diaryCtrl.AttachTo(diary);
    let actionBar = document.querySelector("#diaryActionBar");
    new ActionBar().AttachTo(actionBar);

    //Настраиваем связь между компонентами
    simCtrl.On("modeChanged", diaryCtrl.Delegate("OnModeChanged"));
    simCtrl.On("noteCreated", diaryCtrl.Delegate("OnNoteCreated"));
    simCtrl.On("search", diaryCtrl.Delegate("OnSearch"));
    simCtrl.On("editSubmitted", diaryCtrl.Delegate("OnEditSubmitted"));
    simCtrl.On("editRejected", diaryCtrl.Delegate("OnEditRejected"));
    diaryCtrl.On("noteEdited", simCtrl.Delegate("OnNoteEdited"));
    //Application stuff
    let storage = new LocalStorage();
    diaryCtrl.On("noteAdded", storage.Delegate("OnNoteAdded"));
    diaryCtrl.On("noteDeleted", storage.Delegate("OnNoteDeleted"));
    diaryCtrl.On("afterEditSubmitted", storage.Delegate("OnAfterEditSubmitted"));
        //Забиваем стартовыми нотсами этот бренный мир
        // diaryCtrl.AddNote({title:"Note1",desc:"Description here",tags:["tag1", "tag2", "tag3", "note"], status:1, id:1});
        // diaryCtrl.AddNote({title:"Idea 2",desc:"This is the Great idea description",tags:["idea", "great", "cool", "awesome", "good", "ok", "nice"], status:1, id:2});
        // diaryCtrl.AddNote({title:"Thought 3",desc:"Its very deep thought",tags:["thought", "deep", "56"], status:1, id:3});
        // diaryCtrl.AddNote({title:"Poker Trick",desc:"Never tilt",tags:["poker", "tactic", "tilt", "general strategy"], status:1, id:4});
    storage.On("diaryLoaded", diaryCtrl.Delegate("OnDiaryLoaded"));
    storage.LoadDiary();
    //CMD
    let cmd = new CMD();
    simCtrl.On("executeCommand", cmd.Delegate("OnExecuteCommand"));
    cmd.On("fileLoaded", diaryCtrl.Delegate("OnDiaryLoaded"));
    //Последняя строка
    $.sim = simCtrl;
    $.diary = diaryCtrl;
    return $;
})();