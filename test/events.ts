import * as events from 'events';

const emitter: events.EventEmitter = new events.EventEmitter();
const event: string | symbol = '';
const listener: (...args: any[]) => void = () => {};
const any: any = 1;

{
    let result: events.EventEmitter;

    result = emitter.addListener(event, listener);
    result = emitter.on(event, listener);
    result = emitter.once(event, listener);
    result = emitter.prependListener(event, listener);
    result = emitter.prependOnceListener(event, listener);
    result = emitter.removeListener(event, listener);
    result = emitter.off(event, listener);
    result = emitter.removeAllListeners();
    result = emitter.removeAllListeners(event);
    result = emitter.setMaxListeners(42);
}

{
    let result: number;

    result = events.EventEmitter.defaultMaxListeners;
    result = events.EventEmitter.listenerCount(emitter, event); // deprecated

    const promise: Promise<any[]> = events.once(new events.EventEmitter(), 'error');

    result = emitter.getMaxListeners();
    result = emitter.listenerCount(event);
}

{
    let result: Promise<number[]>;

    result = events.once(emitter, event);

    emitter.emit(event, 42);
}

{
    let result: Function[];

    result = emitter.listeners(event);
}

{
    let result: boolean;

    result = emitter.emit(event);
    result = emitter.emit(event, any);
    result = emitter.emit(event, any, any);
    result = emitter.emit(event, any, any, any);
}

{
    let result: Array<string | symbol>;

    result = emitter.eventNames();
}

{
    class Networker extends events.EventEmitter {
        constructor() {
            super();

            this.emit("mingling");
        }
    }
}

{
    events.once({
        addEventListener(name: string, listener: (res: number) => void, opts: { once: boolean }) {
            setTimeout(() => listener(123), 100);
        }
    }, 'name');
}

async function test() {
    for await (const e of events.on(new events.EventEmitter(), 'test')) {
        console.log(e);
    }
}

{
    emitter.on(events.errorMonitor, listener);
    emitter.on(events.EventEmitter.errorMonitor, listener);
}

{
    function handler1(event: Event) {
        console.log(event.type);
    }

    async function handler2(event: Event) {
        console.log(event.type);
    }

    const handler3 = {
        handleEvent(event: Event) {
            console.log(event.type);
        }
    };

    const handler4 = {
        async handleEvent(event: Event) {
            console.log(event.type);
        }
    };

    const target = new EventTarget();

    target.addEventListener('foo', handler1);
    target.addEventListener('foo', handler2);
    target.addEventListener('foo', handler3);
    target.addEventListener('foo', handler4, { once: true });
}
