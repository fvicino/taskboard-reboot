/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Base/ClassExtensions.js" />
/// <reference path="../Services/Base.js" />
/// <reference path="UIElement.js" />

// class inherited from HtmlElement providing dragdrop capability
function DragableElement() {
    this.locked = false;
    var dragStarted = false, Me = this;
    this.mouseOffset = null;

    this.onDraw = function () {
        var Target = $('#' + this.Identifier);
        Target.mousedown(this.mouseDown);
        Target.mouseup(this.mouseUp);
    }

    this.mouseCoords = function (ev) {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    this.getMouseOffset = function ( ev) {
        ev = ev || window.event;
        var docPos = this.getPosition(document.getElementById(Me.Identifier));
        var mousePos = this.mouseCoords(ev);
        return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y };
    }

    this.getPosition = function (e) {
        var left = 0;
        var top = 0;

        while (e.offsetParent) {
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }

        left += e.offsetLeft;
        top += e.offsetTop;
        return { x: left, y: top };
    }

    this.drag = function (ev) {

            if (dragStarted == false) {
                Me.eventBroker.publish('ondragstart', Me.Identifier);
                dragStarted = true;
            }

            var mousePos = Me.mouseCoords(ev);
            $(Me.Object).css('position', 'absolute');
            Me.Object.css('top', (mousePos.y - Me.mouseOffset.y) + 'px' );
            Me.Object.css('left', (mousePos.x - Me.mouseOffset.x) + 'px');

            Me.eventBroker.publish('ondragmove', Me.Identifier);
    }

    this.mouseUp = function () {
        Me.eventBroker.unsubscribe('mousemove', Me.drag);
        if (dragStarted) {
            dragStarted = false;
            Me.eventBroker.publish('ondragstop', Me.Object);
        }

    }

    this.mouseDown = function (ev) {
        if (Me.locked) return;
        Me.mouseOffset = Me.getMouseOffset(ev);
        Me.eventBroker.subscribe('mousemove', Me.drag);
        return false;
    }


}
DragableElement.inherits(HtmlElement);