fs = require 'fullscreenjs'

module.exports = ->
    ($ '#nav-view-fullscreen').click ->
        fs.toggleFullscreen (($ 'body')[0])
