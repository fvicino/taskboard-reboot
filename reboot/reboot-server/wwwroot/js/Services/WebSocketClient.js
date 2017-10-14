/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Base/ClassExtensions.js" />
/// <reference path="../Base/Base.js" />

var noSupportMessage = "Your browser does not support WebSockets. Try Firefox, Chrome or Safari.";

function WebSocketClient(address) {
    var serverAddress = address, websocket = null, Me = this;
    this.alias = null;
    
    this.messageBoard = null;

    this.connect = function () {

        var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);

        if (support == null) {
            alert(noSupportMessage);
            this.consoleWrite("* " + noSupportMessage + "<br/>");
            return;
        }

        // create a new websocket and connect
        websocket = new window[support](serverAddress);

        // when data is comming from the server, this method is called
        websocket.onmessage = function (evt) {
            //if (Me.onMessage) { Me.onMessage(evt); }
            Me.eventBroker.publish('onmessage', evt);
            if (Me.messageBoard) { Me.consoleWrite(evt.data, true); }
        };

        // when the connection is established, this method is called
        websocket.onopen = function () {
            Me.consoleWrite('* Connection open<br/>');
        };

        // when the connection is closed, this method is called
        websocket.onclose = function () {
            Me.consoleWrite('* Connection closed<br/>');
        }
    }

    this.consoleWrite = function (msg, prepend) {
        if (this.messageBoard) {
            if (prepend) {
                $(this.messageBoard).prepend(msg + "<br />");
            }
            else {
                $(this.messageBoard).append(msg + "<br />");
            }
            this.messageBoard.scrollTop = this.messageBoard[0].scrollHeight;
        }
    }

    this.initConsole = function (rootElement) {
        //add the console elements
        $(document).ready(function () {
            $('#' + rootElement).append('<div id="console" style=" float: right; display: none; "><table width="250px"  ><tr><td><input type="text" id="messageBox" style="height: 24px; border: 1px solid gray; position: relative; width: 100%" /></td></tr><tr><td ><div id="messageBoard" style="height: 450px"> </div></td></tr></table></div>');
            Me.messageBoard = $('#messageBoard');
        });
    }

    this.send = function (msg) {
        websocket.send(msg);
        Me.consoleWrite(msg, true);
    }
    this.eventBroker.subscribe('send', this.send);

    this.sendMessage = function () {
        if (Me.messageBoard) {
            var messageBox = document.getElementById('messageBox');
            var msg = Me.alias ? Me.alias + ': ' + messageBox.value : messageBox.value;
            Me.consoleWrite(msg, true);
            Me.send(msg);
            messageBox.value = "";
        }
    }
}
WebSocketClient.inherits(base);

var webSocketClient = new WebSocketClient('ws://localhost:5000/ws?Name=fred');
webSocketClient.initConsole('main');
webSocketClient.connect();