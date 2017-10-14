/// <reference path="../../lib/jquery/dist/jquery.js" />
/// <reference path="../Services/namespace.js" />

//define a simple local storage objects
taskboard.storage = new function storage () {
    this.set = function (key, obj) {
        var tb = JSON.stringify(obj);
        window.localStorage.setItem(key, tb);
    }
    this.get = function (key) {
        var tb = window.localStorage.getItem(key);
        if (tb) {
            return JSON.parse(tb);
        }
        return null;
    }
} ();