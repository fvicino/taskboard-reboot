/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Services/Storage.js" />
/// <reference path="../Services/WebSocketClient.js" />
/// <reference path="../Services/EventBroker.js" />

//Base class 
function base() {
    var Me = this;
    
    //add a reference to the eventbroker
    this.eventBroker = taskboard.eventBroker;

    // add a reference to the storage object
    this.storage = taskboard.storage; 

    //used to randomise to make the taskboard look realistic
    this.rand = function (min, max) {
        var rnd = Math.floor(Math.random() * max);
        if (rnd < min) { rnd += min; }
        return rnd;
    }
}