/*****
 * fullscreen.js
 * Copyright (c) 2015 Carter Hinsley
 * MIT License
 *****/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window).
        root.returnExports = factory();
  }
}(this, function () {
    exports = {};

    /**
     * Attempt to activate fullscreen mode. If the provided element exposes the
     * fullscreen interface, return `true`, `false` otherwise.
     **/
    exports.activateFullscreen = function (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
            return true;
        }
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            return true;
        }
        if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            return true;
        }
        if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
            return true;
        }
        return false;
    };

    /**
     * Deactivate fullscreen mode. Pretty simple.
     **/
    exports.deactivateFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            return true;
        }
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            return true;
        }
        if (document.msExitFullscreen) {
            document.msExitFullscreen();
            return true;
        }
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            return true;
        }
        return false;
    };

    /**
     * Register an event handler which is to be activated when fullscreen mode is
     * toggled on or off.
     **/
    exports.fullscreenChange = function (callback) {
        var registerCallback = function (event_title) {
            document.addEventListener(event_title, callback);
        };
        registerCallback('fullscreenchange');
        registerCallback('mozfullscreenchange');
        registerCallback('MSFullscreenChange');
        registerCallback('webkitfullscreenchange');
    };

    /**
     * If fullscreen mode is active, return the element which is being displayed
     * in fullscreen view. Otherwise, return `null`.
     **/
    exports.fullscreenElement = function () {
        return document.fullscreenElement    ||
               document.mozFullScreenElement ||
               document.msFullscreenElement  ||
               document.webkitFullscreenElement;
    };

    /**
     * Return `true` if fullscreen mode is active, `false` otherwise.
     **/
    exports.fullscreenActive = function () {
        return Boolean(exports.fullscreenElement());
    };

    /**
     * Attempts to toggle fullscreen mode.
     **/
    exports.toggleFullscreen = function (element) {
        if (exports.fullscreenActive()) {
            exports.deactivateFullscreen();
        } else {
            exports.activateFullscreen(element);
        }
    };

    /**
     * Return `true` if fullscreen mode is supported by the current browser,
     * `false` otherwise.
     **/
    exports.fullscreenEnabled = function () {
        return document.fullscreenEnabled    ||
               document.mozFullScreenEnabled ||
               document.msFullscreenEnabled  ||
               document.webkitFullscreenEnabled;
    };

    /**
     * Register an event handler which is to be activated when fullscreen mode
     * triggers an error.
     **/
    exports.fullscreenError = function (callback) {
        var registerCallback = function (event_title) {
            document.addEventListener(event_title, callback);
        };
        registerCallback('fullscreenerror');
        registerCallback('mozfullscreenerror');
        registerCallback('MSFullscreenError');
        registerCallback('webkitfullscreenerror');
    };

    return exports;
}));
