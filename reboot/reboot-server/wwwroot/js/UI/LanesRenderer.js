/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Base/ClassExtensions.js" />
/// <reference path="../Base/Base.js" />
/// <reference path="../Renderers/BaseRenderer.js" />
/// <reference path="../Base/UIFactory.js" />

/// <reference path="../Views/TaskBoard/Index.cshtml" />



function byLanesRenderer() {
    var Me = this;
    this.title = 'lanes';
    this.render = function (rootElement, modelData) {

        var project = "", Title = currentTaskBoard.TITLE;
        var y = Me.CEILING, x = 5;

        $.each(modelData, function (index, i) {

            if (y + Me.NOTEWIDTH + Me.RANDOMMAX > Me.MAXSCREENHIEGHT) {
                x = x + Me.NOTEWIDTH + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                y = Me.CEILING + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
            }
            else {
                y = y + Me.NOTEWIDTH + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
            }

            var tr = Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);

            //prep values for use in html
            i.left = x.toString() + "px";
            i.top = y.toString() + "px";
            i.transform = tr > Me.RANDOMMAX - 5 ? Me.TRANSFORMRIGHT : "";
            i.transform = tr < Me.RANDOMMIN + 5 ? Me.TRANSFORMLEFT : i.transform;

            //set the state on the current Taskboard
            currentTaskBoard.setState(i);

            //add the task to the board
            i.UIElement = Me.UIFactory.CreateTask($('#' + rootElement), i);
            i.UIElement.Draw();

        });

        return true;
    }

}
byLanesRenderer.inherits(baseRenderer);

//register the renderer
//todo
ViewStyles.register(byLanesRenderer);