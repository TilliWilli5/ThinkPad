class Storage extends Delegate
{
    // constructor(pCore){
    //     super(pCore);
    // }
    OnNoteAdded(pNote){
        localforage.setItem(`note:${pNote.id}`, pNote.Serialize()).catch((pReason)=>{console.error(pReason)});
    }
    OnNoteDeleted(pNoteID){
        {"debug";this.ThrowNotImplemented("OnNoteDeleted");}
        // localforage.removeItem(`note:${pNoteID}`);
    }
}