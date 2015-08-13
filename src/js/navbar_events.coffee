fs = require './lib/fullscreen.js'

module.exports = ->
    ($ document).ready ->
        ($ '#nav-view-fullscreen').click ->
            fs.toggleFullscreen (($ 'body')[0])
