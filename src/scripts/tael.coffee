# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License
error = require './error.coffee'
ref = require 'refjs'

tiles = [
    new ref
        type: 'container'
        child: undefined
]

newTile = (tiles, parent_id) ->
    # Add a new tile to the `tiles` array.
    pushTile = ->
        # Push a new tile to the `tiles` array and return its index.
        (
            tiles.push new ref
                type: 'leaf'
                content:
                    # To be added to
                    dom: null
                    data: 'foo'
        ) - 1
    
    addLeafToContainer = (parent) ->
        # Create only one tile and add it as the child of the supplied parent.
        # As the container tile is the top-level tile, it has only a single
        # child tile.
        parent.tile.value.child = do pushTile
    
    addLeavesToLeaf = (parent) ->
        # Create two tiles; convert the 'leaf' tile into a 'branch' tile
        # before inserting the two new 'leaf' tiles into the newly-classified
        # 'branch' tile.
        parent.tile.value =
            type: 'branch'
            children:
                left: do pushTile
                right: do pushTile
            layout:
                split: 'horizontal'
                divider_location: 0.5
    
    parent =
        id: parent_id
        tile: tiles[parent_id]
    
    switch parent.tile.value.type
        # Modify the parent tile and append one or two new tile(s) to the
        # `tiles` array.
        when 'container'
            addLeafToContainer parent
        when 'leaf'
            addLeavesToLeaf parent
        when 'branch'
            error.throw "Branch tiles cannot spawn new children post-creation."

newTile tiles, 0

module.exports = ->
    ($ document).ready ->
        ($ '.tael-container')
        .append(
            ($ '<div>')
            .addClass 'tael-node-leaf'
            .text tiles[1].value.content.data
        )
