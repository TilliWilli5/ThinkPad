class CMD extends Emitter
{
    constructor(pCore){
        super(pCore);
        this.Trap("saveFile", this.SaveFile);
        this.Trap("loadFile", this.LoadFile);
    }
    OnExecuteCommand(pCommand){
        switch(pCommand)
        {
            case "sf": this.Emit("saveFile");break;
            case "lf": this.Emit("loadFile");break;
            case "sdb": this.Emit("saveDB");break;
            case "ldb": this.Emit("loadDB");break;
            default: this.Emit("donothing");{"debug";alert(`There is no [${pCommand}] command.`);};break;
        }
    }
    SaveFile(pObject){
        pObject = document.getElementById("diary").ctrl;//Ужаснейшее решение - нужен рефактор
        let tempLink = document.createElement("a");
        tempLink.download = ("thinkpad_" + util.Time())/*.split(".")[0]*/ + ".txt";
        var auxString = pObject.Serialize();
        tempLink.href = "data:text/plain;charset=utf-8," + encodeURI(auxString);
        tempLink.style.display = "none";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
    LoadFile(){
        //return JSON.parse(window.localStorage.getItem("state"));
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
        let self = this;
        fileInput.onchange = function()
        {
            var reader = new FileReader();
            reader.onload = function()
            {
                //console.log(this.result);
                // CApplication.theApplication.RestoreState(JSON.parse(this.result));
                self.Emit("fileLoaded", JSON.parse(this.result));
                document.body.removeChild(fileInput);
                //Все что ниже - ужасное решение, потом переписать
                // diaryCtrl = document.getElementById("diary").ctrl;
                // diaryCtrl
            }
            reader.readAsText(fileInput.files[0]);
        }
        // window.f = fileInput;
        document.body.appendChild(fileInput);
        fileInput.click();
    }
}