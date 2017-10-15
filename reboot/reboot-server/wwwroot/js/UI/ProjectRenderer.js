/// <reference path="../Base/ClassExtensions.js" />
/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Base/Base.js" />
/// <reference path="../Renderers/BaseRenderer.js" />

/// <reference path="../Views/TaskBoard/Index.cshtml" />

function byProjectRenderer() {
    var Me = this
    this.title = 'projects';
    this.render = function (rootElement, modelData) {

        var project = "", Title = currentTaskBoard.TITLE;
        var y = currentTaskBoard.CEILING, x = 20;

        currentTaskBoard.IgnoreViewState = false;
        modelData.sort(this.sortFunction('assignedToDisplay'));
        modelData.sort(this.sortFunction('project'));

        $.each(modelData, function (index, i) {
            var noteState = {};
            if (i.project != project) {

                if (project != "") {
                    x = x + Me.NOTEWIDTH + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX) + Me.PROJECTGAP;
                    y = Me.CEILING;
                }

                $('#' + rootElement).append('<div class="project-header" style="top: ' + y + 'px; left: ' + x + 'px; height:' + currentTaskBoard.HEADERHEIGHT + '" >' + i.project + '</div>');

                y = Me.CEILING + Me.HEADERHEIGHT + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                project = i.project;

            }
            else {
                if (y + Me.NOTEWIDTH + Me.RANDOMMAX > Me.MAXSCREENHIEGHT) {
                    x = x + Me.NOTEWIDTH + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                    y = Me.CEILING + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                }
                else {
                    y = y + Me.NOTEWIDTH + Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                }
            }

            currentTaskBoard.IgnoreViewState=true;
            if (currentTaskBoard.IgnoreViewState) {

                var tr = Me.rand(Me.RANDOMMIN, Me.RANDOMMAX);
                //prep values for use in html
                i.left = x.toString() + "px";
                i.top = y.toString() + "px";
                i.transform = tr > Me.RANDOMMAX - 5 ? Me.TRANSFORMRIGHT : "";
                i.transform = tr < Me.RANDOMMIN + 5 ? Me.TRANSFORMLEFT : noteState.transform;
                currentTaskBoard.setState(i);

            }

            //add the task to the board
            i.UIElement = Me.UIFactory.CreateTask($('#' + rootElement), i);
            i.UIElement.Draw();
        });

        return true;
    }

}
byProjectRenderer.inherits(baseRenderer);

//register the renderer
ViewStyles.register(byProjectRenderer);
