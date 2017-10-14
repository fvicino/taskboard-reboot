// Add a standard method of inheritance to the function prototype
var _inheritProtos = [];

Function.prototype.inherits = function (parent) {
    var Me = this;
    if (typeof _inheritProtos == 'undefined') _inheritProtos = [];
    if (parent) {
        var parentInst = null;
        //check if an instance of the parent exists
        $.each(_inheritProtos, function (i, obj) {
            //if there is an instance of parent than use that as the proto
            if (obj instanceof parent) {
                parentInst = obj;
            }
        });

        if (!parentInst) {
            //no existing instance so make a new instance
            parentInst = new parent();
            //add this instance to the list
            _inheritProtos.push(parentInst);
        }

        Me.prototype = parentInst
    }
};

//add a namespace for the services
var taskboard = {};

