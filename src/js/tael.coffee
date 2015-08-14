# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License

module.exports = ->
    ($ document).ready ->
        ($ '.tael-container')
        .append(
            ($ '<div>')
            .addClass 'tael-node-leaf'
            .text 'Hello, world!'
        )
