"use strict";
class Emitter extends Delegate
{
    constructor(pCore){
        super(pCore);
    }
    On(pEventName, pNewHandler){
        let events = Emitter.heap.get(this);
        if(events)
        {
            if(events[pEventName])
            {
                events[pEventName].push(pNewHandler);
            }
            else
            {
                events[pEventName] = [];
                events[pEventName].push(pNewHandler);
            }
        }
        else
        {
            let events = {};
            events[pEventName] = [pNewHandler];
            Emitter.heap.set(this, events);
        }
        return this;
    }
    Once(){

    }
    Remove(){

    }
    Emit(pEventName, pArgs){
        let events = Emitter.heap.get(this);
        if(events)
        {
            let handlers = events[pEventName];
            if(handlers)
                for(let theHandler of handlers)
                    // theHandler(pArgs);
                    theHandler.call(this, pArgs);
        }
    }
}
Emitter.heap = new WeakMap();