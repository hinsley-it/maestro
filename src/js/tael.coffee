# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License
error = require './error.coffee'

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
        # Modify the parent tile and append one or two new tile(s) to the
        # `tiles` array.
        when 'container'
            # Create only one tile; 'container' is the top-level tile.
            parent.child = do pushTile
        when 'leaf'
            # Create two tiles; converts the 'leaf' tile into a 'branch' tile
            # before inserting the two new 'leaf' tiles into the 
            # newly-classified 'branch' tile.
            parent =
                type: 'branch'
                children:
                    left: do pushTile
                    right: do pushTile
                layout:
                    split: 'horizontal'
                    divider_location: 1
        when 'branch'
            error.throw "Branch tiles cannot spawn new children post-creation."

newTile tiles[0]

module.exports = ->
    ($ document).ready ->
        ($ '.tael-container')
        .append(
            ($ '<div>')
            .addClass 'tael-node-leaf'
            .text 'Hello, world!'
        )
