const SIMMode = {
    ZERO:0,//Приложение только открыто
    COMP:1,//Написание новой заметки
    SEARCH:2,//Поиск
    SYNC:3,//Синхронизация с каналом
}
const SIMModetoName = {
    0: "ZERO",//Приложение только открыто
    1: "COMP",//Написание новой заметки
    2: "SEARCH",//Поиск
    3: "SYNC",//Синхронизация с каналом
}
const SIMCharToMode = {
    "":SIMMode.ZERO,
    ".":SIMMode.COMP,
    "?":SIMMode.SEARCH,
    "@":SIMMode.SYNC
}
const SIMModeToChar = {
    0:"",
    1:".",
    2:"?",
    3:"@"
}