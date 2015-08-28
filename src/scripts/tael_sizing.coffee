resizeTaelContainer = ->
    header_bbox    = do ($ '.header')[0].getBoundingClientRect
    tael_container = $ '.tael-container'

    tael_container.css 'top',    header_bbox.bottom
    tael_container.css 'bottom', 16

module.exports = ->
    ($ document).ready ->
        do resizeTaelContainer
        ($ window).resize resizeTaelContainer
