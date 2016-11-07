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
    $.simCtrl.On("noteCreated", $.diaryCtrl.Delegate("Add"));


    //Последняя строка
    return $;
})();