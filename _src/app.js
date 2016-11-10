var app = (()=>{
    //Результирующий экспорт
    let $ = {};

    // SIM stuff
    $.sim = document.getElementById("sim");
    $.modeIcon = document.getElementById("modeIcon");
    $.titleLabel = document.getElementById("titleLabel");
    $.titleInput = document.getElementById("titleInput");
    $.descBar = document.getElementById("descBar");
    $.descLabel = document.getElementById("descLabel");
    $.tagBar = document.getElementById("tagBar");
    $.tagLabel = document.getElementById("tagLabel");
    $.titleUnderline = document.getElementById("titleUnderline");
    $.descUnderline = document.getElementById("descUnderline");

    $.simCtrl = new SIM();
    $.simCtrl.AttachTo($.sim);
    new Prelabel().AttachTo($.titleLabel);
    new ModeIcon().AttachTo($.modeIcon);
    $.titleInput.focus();
    new Bar({animDuration:0.4}).AttachTo($.descBar);
    new Prelabel({animDuration:1.0}).AttachTo($.descLabel);
    new Bar({animDuration:0.4}).AttachTo($.tagBar);
    new Prelabel({animDuration:1.0}).AttachTo($.tagLabel);

    new Underline().AttachTo($.titleUnderline);
    new Underline().AttachTo($.descUnderline);

    // Diary stuff
    $.diary = document.querySelector("#diary");
    $.diaryCtrl = new Diary();
    $.diaryCtrl.AttachTo($.diary);
    $.actionBar = document.querySelector("#diaryActionBar");
    new ActionBar().AttachTo($.actionBar);

    //Настраиваем связь между компонентами
    $.simCtrl.On("modeChanged", $.diaryCtrl.Delegate("OnModeChanged"));
    $.simCtrl.On("noteCreated", $.diaryCtrl.Delegate("OnNoteCreated"));
    $.simCtrl.On("search", $.diaryCtrl.Delegate("OnSearch"));
    $.simCtrl.On("editSubmitted", $.diaryCtrl.Delegate("OnEditSubmitted"));
    $.simCtrl.On("editRejected", $.diaryCtrl.Delegate("OnEditRejected"));
    //Забиваем стартовыми нотсами этот бренный мир
    $.diaryCtrl.AddNote({title:"Note1",desc:"Description here",tags:["tag1", "tag2", "tag3", "note"], status:1});
    $.diaryCtrl.AddNote({title:"Idea 2",desc:"This is the Great idea description",tags:["idea", "great", "cool", "awesome", "good", "ok", "nice"], status:1});
    $.diaryCtrl.AddNote({title:"Thought 3",desc:"Its very deep thought",tags:["thought", "deep", "56"], status:1});
    $.diaryCtrl.AddNote({title:"Poker Trick",desc:"Never tilt",tags:["poker", "tactic", "tilt", "general strategy"], status:1});
    $.diaryCtrl.On("noteEdited", $.simCtrl.Delegate("OnNoteEdited"));

    //Последняя строка
    return $;
})();