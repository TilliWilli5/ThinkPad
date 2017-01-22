var ActionBar = require("./js/action_bar.js");
var Bar = require("./js/bar.js");
var CMD = require("./js/cmd.js");
var Diary = require("./js/diary.js");
var ModeIcon = require("./js/mode_icon.js");
var Note = require("./js/note.js");
var Prelabel = require("./js/prelabel.js");
var SIM = require("./js/sim.js");
var LocalStorage = require("./js/storage.js");
var Tag = require("./js/tag.js");
var Underline = require("./js/underline");

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