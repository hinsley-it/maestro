fs = require 'fullscreenjs'

module.exports = ->
    ($ document).ready ->
        ($ '#nav-view-fullscreen').click ->
            fs.toggleFullscreen (($ 'body')[0])
