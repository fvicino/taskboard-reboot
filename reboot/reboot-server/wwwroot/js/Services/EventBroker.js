/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Services/namespace.js" />

//singlton eventbroker
taskboard.eventBroker = new function EventBroker() {

    var events = {};

    this.register = function (EventName, eventArgs) {

        if (events[EventName] === undefined) {
            events[EventName] = { args: eventArgs, subscribers: null }
        }
    }

    this.newEventArgs = function (EventName) {

        if (events[EventName] === undefined) {
            eventdoesnotexist();
        }
        return new events[EventName].args();
    }

    this.subscribe = function (EventName, handler) {

        if (events[EventName] === undefined) {
            eventdoesnotexist();
        }
        if (events[EventName].subscribers === null) {
            events[EventName].subscribers = [handler];
        }
        else {
            events[EventName].subscribers.push(handler);
        }
    }

    this.unsubscribe = function (EventName, handler) {

        if (events[EventName] === undefined) {
            eventdoesnotexist();
        }
        if (events[EventName].subscribers !== null) {
            var i = 0;
            var subs = events[EventName].subscribers;
            while (i < subs.length) {
                if (subs[i] === handler) {
                    subs.splice(i, 1);
                    break;
                }
                i++;
            }
        }
    }

    this.publish = function (EventName, eventArgs) {

        if (events[EventName] === undefined) {
            eventdoesnotexist();
        }

        if (events[EventName].subscribers) {
            $.each(events[EventName].subscribers, function (index, handler) {
                if (handler !== undefined) {
                    handler(eventArgs);
                }
            });
        }

    }
} ();

//register app wide events in advance
taskboard.eventBroker.register('mousedown', null);
taskboard.eventBroker.register('mousemove', null);
taskboard.eventBroker.register('mousestart', null);
taskboard.eventBroker.register('ondragstart', null);
taskboard.eventBroker.register('ondragmove', null);
taskboard.eventBroker.register('ondragstop', null);
taskboard.eventBroker.register('onmessage', null);
taskboard.eventBroker.register('send', null);
taskboard.eventBroker.register('refreshtasks', null);
taskboard.eventBroker.register('keydown', null);



//function eventdoesnotexist() { alert('event does not exist'); }

//var eventBroker = new EventBroker();

//function TestArgs() {
//    this.ID = 1;
//    this.Value = 56;
//}

//function testHandler(args) {
//    console.debug('ok' + args.ID);
//}
//function testHandler2(args) {
//    console.debug('abd' + args.ID);
//}

//eventBroker.register('test', TestArgs);
//eventBroker.subscribe('test', testHandler);
//eventBroker.subscribe('test', testHandler2);
//var arg = eventBroker.newEventArgs('test');
//arg.ID = 800;
//eventBroker.publish('test', arg);