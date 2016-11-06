var app = (function(){
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

    new SIM().AttachTo($.sim);
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
    new Diary().AttachTo($.diary);
    $.actionBar = document.querySelector("#diaryActionBar");
    new ActionBar().AttachTo($.actionBar);
    //Создаем записи заготовки чтобы было с чем работать
    let n1 = {title:"Note 1", desc:"Description 1", tags:["Tag1", "Tag2", "Tag3"]};
    let n2 = {title:"Thought 2", desc:"Description 2", tags:["Tag4", "Tag5", "Tag6"]};
    let n3 = {title:"Idea 3", desc:"Description 3", tags:["Tag7", "Tag8", "Tag9"]};
    $.diary.ctrl.Add(n1);
    $.diary.ctrl.Add(n2);
    $.diary.ctrl.Add(n3);
    // for(var iX=0;iX<100;++iX)
    // {
    //     $.diary.ctrl.Add({title:"Не тилтить в покере", desc:"Ахуенно тупо", tags:["poker", "strategy", "profit"]})
    // }
    //Последняя строка
    return $;
})();