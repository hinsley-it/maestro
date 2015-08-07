function resizeTaelContainer() {
    var
        header_bbox = $('.header')[0].getBoundingClientRect(),
        tael_container = $('.tael-container');
    tael_container.css('top', header_bbox.bottom);
    tael_container.css('bottom', 16);
}

$(document).ready(function () {
    resizeTaelContainer();
    $(window).resize(resizeTaelContainer);
});
