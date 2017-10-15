/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Services/EventBroker.js" />
/// <reference path="Base.js" />
/// <reference path="UIElement.js" />
/// <reference path="DragableElement.js" />

taskboard.UIFactory = new function HTMLElementFactory() {

    //returns UIElement
    this.CreateTask = function (context, task) {

        var el = new DragableElement();
        el.Context = context;
        el.Identifier = task.id;

        if (task.state == "Active") {
            if (task.remainingTime.toString() == "") {
                task.colour = "stickynotenotstarted";
            }
            else {
                task.colour = "stickynote";
            }
        } else {
            task.colour = "stickynotecomplete";
        }

        el.elementhtml = "<div id=" + task.id + " class='" + task.colour + " " + task.transform + "' style='top: " + task.top + "; left: " + task.left + "' >";

        el.elementhtml += "<p id='notetitle'>" + task.title + "</p> ";
        //el.elementhtml += "<a href='" + task.editUrl + "' target='_blank' >edit</a> ";
        el.elementhtml += "<div id='name'>" + task.assignedToDisplay + "</div> ";
        el.elementhtml += "<div id='h1'>" + task.originalEstimate + "</div> ";
        el.elementhtml += "<div id='remaining' >" + task.remainingTime + "</div> ";

        if (task.remainingHoursHistory) {
            if (task.remainingHoursHistory.Count > 1) {
                el.elementhtml += "<div id='h4'>" + task.remainingHoursHistory[1] + "</div>";
            }

            if (task.remainingHoursHistory.Count > 2) {
                el.elementhtml += "<div id='h3'>" + task.remainingHoursHistory[2] + "</div>";
            }

            if (task.remainingHoursHistory.Count > 3) {
                el.elementhtml += "<div id='h2'>" + task.remainingHoursHistory[3] + "</div>";
            }
        }
        el.elementhtml += "</div>";


        return el;
    };

} ();

//register Reneders
var ViewStyles = {
    register : function (renderer) {
        var r = new renderer()
        r.UIFactory = taskboard.UIFactory;
        this[r.title] = r;
    }
}


