"use strict";
module.exports = {SIMMode, SIMModetoName, SIMCharToMode, SIMModeToChar, NoteStatus};
// SIM Modes
const SIMMode = {
    ZERO:0,//Приложение только открыто
    COMP:1,//Написание новой заметки
    SEARCH:2,//Поиск
    SYNC:3,//Синхронизация с каналом
    EDIT:4,//Режим редактирование
    CMD:5
}
const SIMModetoName = {
    0: "ZERO",//Приложение только открыто
    1: "COMP",//Написание новой заметки
    2: "SEARCH",//Поиск
    3: "SYNC",//Синхронизация с каналом
    4: "EDIT",//Режим редактирование
    5:"CMD"
}
const SIMCharToMode = {
    "0":SIMMode.ZERO,
    ".":SIMMode.COMP,
    "?":SIMMode.SEARCH,
    "@":SIMMode.SYNC,
    "!":SIMMode.EDIT,
    ">":SIMMode.CMD
}
const SIMModeToChar = {
    0:"0",
    1:".",
    2:"?",
    3:"@",
    4:"!",
    5:">"
}

// Note Status
const NoteStatus = {
    NONEXIST:0,
    EXIST:1,
    DELETED:2,
    HIDDEN:3
}