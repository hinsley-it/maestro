$(document).ready(function () {
    $('#nav-view-fullscreen')[0].addEventListener('click', function () {
        toggleFullscreen($('body')[0]);
    });
});