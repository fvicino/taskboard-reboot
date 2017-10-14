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
        el.Identifier = task.ID;

        if (task.State == "Active") {
            if (task.RemainingTime.toString() == "") {
                task.colour = "stickynotenotstarted";
            }
            else {
                task.colour = "stickynote";
            }
        } else {
            task.colour = "stickynotecomplete";
        }

        el.elementhtml = "<div id=" + task.ID + " class='" + task.colour + " " + task.transform + "' style='top: " + task.top + "; left: " + task.left + "' ";

        el.elementhtml += "<p id='notetitle'>" + task.Title + "</p> ";
        el.elementhtml += "<a href='" + task.EditURL + "' target='_blank' >edit</a> ";
        el.elementhtml += "<div id='name'>" + task.AssignedTo + "</div> ";
        el.elementhtml += "<div id='h1'>" + task.OriginalEstimate + "</div> ";
        el.elementhtml += "<div id='remaining' >" + task.RemainingTime + "</div> ";

        if (task.RemainingHoursHistory) {
            if (task.RemainingHoursHistory.Count > 1) {
                el.elementhtml += "<div id='h4'>" + task.RemainingHoursHistory[1] + "</div>";
            }

            if (task.RemainingHoursHistory.Count > 2) {
                el.elementhtml += "<div id='h3'>" + task.RemainingHoursHistory[2] + "</div>";
            }

            if (task.RemainingHoursHistory.Count > 3) {
                el.elementhtml += "<div id='h2'>" + task.RemainingHoursHistory[3] + "</div>";
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


