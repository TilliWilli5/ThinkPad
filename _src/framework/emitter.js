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
    Once(){{"debug";this.ThrowNotImplemented("Once");}}
    Remove(){{"debug";this.ThrowNotImplemented("Remove");}}
    Emit(pEventName, pArgs){
        {
            "debug";
            console.groupCollapsed(`%c\u26AB${this.constructor.name}[${pEventName}]`, "color:DodgerBlue;font-size:1em;");
        }
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
        {
            "debug";
            console.groupEnd(`%c\u26AB${this.constructor.name}[${pEventName}]`);
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
    Try(pEventName, pCallback, pArgs){
        let _result = {
            successful:true,
            trapped:false,
            results:[]
        };
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
        if(interrupt)
        {
            _result.successful = false;
            _result.trapped = true;
            setTimeout(pCallback, 0, _result);
            return this;//Прерывание цепочки вызовов - делегатов не будет
        }
        let delegateEvents = Emitter.delegateHeap.get(this);
        if(delegateEvents)
        {
            let delegates = delegateEvents[pEventName];
            let stage = 0;
            if(delegates)
                for(let theDelegate of delegates)
                {
                    ++stage;
                    let innerResult = theDelegate.call(this, pArgs);
                    if(innerResult)
                    {
                        if(typeof innerResult == "boolean")
                            innerResult = {};
                        innerResult.stage = stage;
                        _result.results.push(innerResult);
                    }
                }
            _result.stageCount = stage;
            if(_result.results.length != 0)
            {
                _result.successful = false;
                console.time("Try");
                setTimeout(pCallback, 0, _result);
                return this;
            }
        }
        setTimeout(pCallback, 0, _result);
        return this;
    }
    AsyncEmit(pEventName, pArgs){{"debug";this.ThrowNotImplemented("AsyncEmit");}}
    Untrap(pEventName, pTrap){{"debug";this.ThrowNotImplemented("Untrap");}}
}
Emitter.delegateHeap = new WeakMap();
Emitter.trapHeap = new WeakMap();