/// <reference path="../Base/ClassExtensions.js" />
/// <reference path="../Services/Base.js" />
/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../UI/UIFactory.js" />

/// <reference path="../../../Views/Home/Index.cshtml" />

var SEPARATOR = ' ';

function TaskBoard() {
    var Me = this;
    Me.webSocketClient = taskboard.webSocketClient;
    this.StateUrl = '';
    this.TITLE = "TaskBoard";
    this.StateObject = null;
    this.IgnoreViewState = false;
    this.ViewStyle = 'projects';
    this.setState = function (noteState) {
        $.each(this.StateObject, function (i, obj) {
            if (obj.id == noteState.id) {
                obj.left = noteState.left;
                obj.top = noteState.top;
                obj.transform = noteState.transform;
            }
        });
    }

    //rendering
    this.renderTaskBoardStyle = function (rootElement, viewStyle) {
        Me.ViewStyle = viewStyle;
        if (ViewStyles[viewStyle]) {

            //function to initialise the state and assign it
            var func = function (state) {

                currentTaskBoard.StateObject = state;

//TODO change this, create state from uielements when saving
//retrieve state from storage to render the board then dispose state object.
//keep uielements in memory for board state management

                //draw the task board based on the selection
                var bool = ViewStyles[viewStyle].render(rootElement, currentTaskBoard.StateObject);
                if (bool) {
                    Me.storage.set(viewStyle, currentTaskBoard.StateObject);
                }
            }

            //try and get state form local storage otherwise ask the server
            var so = Me.storage.get(viewStyle);
            if (so) {
                func(so);
            }
            else {
                $.ajax({
                    type: "GET",
                    url: this.StateUrl,
                    success: func
                });
            }
        }
    }

    //dragdrop stuff -- TODO subscribe to these events!!
    this.onDragStart = function (id) {
        var msg = 'LOCK' + SEPARATOR + id;
        Me.eventBroker.publish('send', msg);
    };
    this.eventBroker.subscribe('ondragstart', this.onDragStart);

    this.onDragStop = function (dragObject) {
        var msg = 'MOVE' + SEPARATOR + dragObject.attr('id') + SEPARATOR + dragObject.position().left + SEPARATOR + dragObject.position().top;
        Me.eventBroker.publish('send', msg);
        Me.storage.set(Me.ViewStyle, Me.StateObject);
    };
    this.eventBroker.subscribe('ondragstop', this.onDragStop);

    //socket stuff -- TODO subscribe to these events!!
    this.onMessage = function messageCommand(evt) {
        var command = evt.data.split(SEPARATOR);
        if (command[0] == 'MOVE') { moveCommand(command); }
        else if (command[0] == 'LOCK') { lockCommand(command); }
        else if (command[0] == 'UNLOCK') { unlockCommand(command); }
        else if (command[0] == 'ALIAS') { setAlias(command); }
    };
    this.eventBroker.subscribe('onmessage', this.onMessage);

    function unlockCommand(command) {
//TODO change this to use UIElement methods
        var itm = document.getElementById(command[1]);
        $(itm).css({ opacity: 1 });
        itm.locked = false;
    }
    function lockCommand(command) {

//TODO change this to use UIElement methods

        var itm = document.getElementById(command[1]);
        $(itm).css({ opacity: 0.5 });
        itm.locked = true;
    }
    function moveCommand(command) {
//TODO change this to use UIElement methods
        var itm = document.getElementById(command[1]);
        $(itm).css({ "left": itm.style.left, "top": itm.style.top, "opacity": 0.5 }).animate({ "left": command[2], "top": command[3], "opacity": 1 }, 300);
        itm.locked = false;
    }
    function setAlias(command) {
        if (command[1]) Me.webSocketClient.alias = command[1];
    }

}
TaskBoard.inherits(base);
