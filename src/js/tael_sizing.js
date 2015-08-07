function resizeTaelContainer() {
    $('.tael-container').css('bottom', 16);
}

$(document).ready(function () {
    var header_bbox = $('.header')[0].getBoundingClientRect();
    $('.tael-container').css('top', header_bbox.bottom + 8);
    resizeTaelContainer();
    $(window).resize(resizeTaelContainer);
});
