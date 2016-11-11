"use strict";
class Emitter extends Delegate
{
    constructor(pCore){
        super(pCore);
    }
    On(pEventName, pDelegate){
        let events = Emitter.delegateHeap.get(this);
        if(events)
        {
            if(events[pEventName])
            {
                events[pEventName].push(pDelegate);
            }
            else
            {
                events[pEventName] = [];
                events[pEventName].push(pDelegate);
            }
        }
        else
        {
            events = {};
            events[pEventName] = [pDelegate];
            Emitter.delegateHeap.set(this, events);
        }
        return this;
    }
    Once(){throw "Not implemented";}
    Remove(){throw "Not implemented";}
    Emit(pEventName, pArgs){
        let interrupt = false;
        let trapEvents = Emitter.trapHeap.get(this);
        if(trapEvents)
        {
            let traps = trapEvents[pEventName];
            if(traps)
                for(let theTrap of traps)
                    if(theTrap.call(this, pArgs))
                        interrupt = true;
        }
        if(interrupt) return this;//Прерывание цепочки вызовов - делегатов не будет
        let delegateEvents = Emitter.delegateHeap.get(this);
        if(delegateEvents)
        {
            let delegates = delegateEvents[pEventName];
            if(delegates)
                for(let theDelegate of delegates)
                    theDelegate.call(this, pArgs);
        }
        return this;
    }
    Trap(pEventName, pTrap){
        let events = Emitter.trapHeap.get(this);
        if(events)
        {
            if(events[pEventName])
            {
                events[pEventName].push(pTrap);
            }
            else
            {
                events[pEventName] = [];
                events[pEventName].push(pTrap);
            }
        }
        else
        {
            events = {};
            events[pEventName] = [pTrap];
            Emitter.trapHeap.set(this, events);
        }
        return this;
    }
    Untrap(pEventName, pTrap){throw "Not implemented";}
}
Emitter.delegateHeap = new WeakMap();
Emitter.trapHeap = new WeakMap();