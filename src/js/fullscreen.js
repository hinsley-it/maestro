/*****
 * fullscreen.js
 * Copyright (c) 2015 Carter Hinsley
 * MIT License
 *****/

/**
 * Attempt to activate fullscreen mode. If the provided element exposes the
 * fullscreen interface, return `true`, `false` otherwise.
 **/
function activateFullscreen(element) {
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
}

/**
 * Deactivate fullscreen mode. Pretty simple.
 **/
function deactivateFullscreen() {
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
}

/**
 * Register an event handler which is to be activated when fullscreen mode is
 * toggled on or off.
 **/
function fullscreenChange(callback) {
    var registerCallback = function (event_title) {
        document.addEventListener(event_title, callback);
    };
    registerCallback('fullscreenchange');
    registerCallback('mozfullscreenchange');
    registerCallback('MSFullscreenChange');
    registerCallback('webkitfullscreenchange');
}

/**
 * If fullscreen mode is active, return the element which is being displayed
 * in fullscreen view. Otherwise, return `null`.
 **/
function fullscreenElement() {
    return document.fullscreenElement    ||
           document.mozFullScreenElement ||
           document.msFullscreenElement  ||
           document.webkitFullscreenElement;
}

/**
 * Return `true` if fullscreen mode is active, `false` otherwise.
 **/
function fullscreenActive() {
    return Boolean(fullscreenElement());
}

/**
 * Return `true` if fullscreen mode is supported by the current browser,
 * `false` otherwise.
 **/
function fullscreenEnabled() {
    return document.fullscreenEnabled    ||
           document.mozFullScreenEnabled ||
           document.msFullscreenEnabled  ||
           document.webkitFullscreenEnabled;
}

/**
 * Register an event handler which is to be activated when fullscreen mode
 * triggers an error.
 **/
function fullscreenError(callback) {
    var registerCallback = function (event_title) {
        document.addEventListener(event_title, callback);
    };
    registerCallback('fullscreenerror');
    registerCallback('mozfullscreenerror');
    registerCallback('MSFullscreenError');
    registerCallback('webkitfullscreenerror');
}
