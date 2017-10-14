/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="ClassExtensions.js" />
/// <reference path="Base.js" />

function HtmlElement() {
    this.Context = null;
    this.elementhtml = null;
    this.Object = null;
    this.Identifier = null;
    this.Move = function () { };
    this.Visibility = function () { };
    this.onDraw = null;
    var Me = this;

    this.Destroy = function () { 
        //Not implemented
    };

    this.Draw = function () {

        //remove exisitng instance
        this.Destroy(this.Identifier);

        //add the element
        var el = $(this.Context).append(this.elementhtml);
        this.Object = $('#' + this.Identifier);

        //fire event for children
        if (this.onDraw) { this.onDraw(); }

    };

}
HtmlElement.inherits(base);