# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License

tiles = [
    type: 'container'
]

newTile = (parent) ->
    # Add a new tile to the `tiles` array.
    pushTile = ->
        # Push a new tile to the `tiles` array and return its index.
        (
            tiles.push
                type: 'leaf'
        ) - 1
    switch parent.type
        when 'container'
            parent.child = do pushTile
        when 'leaf'
            parent =
                type: 'branch'
                children:
                    left: do pushTile
                    right: do pushTile
                layout:
                    split: 'horizontal'
                    divider_location: 1
        when 'branch'
            throw "Branch tiles cannot spawn new children post-creation."

newTile(tiles[0])

module.exports = ->
    ($ document).ready ->
        ($ '.tael-container')
        .append(
            ($ '<div>')
            .addClass 'tael-node-leaf'
            .text 'Hello, world!'
        )
