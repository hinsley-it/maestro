# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License
error = require './error.coffee'
ref = require 'refjs'

tiles = [
    new ref
        type: 'container'
        child: undefined
        content:
            dom:
                ($ '.tael-container')
                .attr 'id', 'tael-node-0'
]

newTile = (tiles, parent_id, orientation) ->
    # Add a new tile to the `tiles` array.
    setTileClass = (tile, side) ->
        # Set the class of a tile which is represented as a `ref`.
        tile.value.content.dom.attr 'class', 'tael-node-leaf-' + side

    setTileId = (tile, index) ->
        # Set the ID of a tile which is represented as a `ref`.
        tile.value.content.dom.attr 'id', 'tael-node-' + index

    pushTile = (parent) ->
        # Push a new tile to the `tiles` array and return its index. Not safe
        # to use without some sort of wrapper, because no ID or class is
        # attached to the created tile in the DOM.
        (
            tiles.push new ref
                type: 'leaf'
                content:
                    dom:
                        ($ '<div>')
                        .text 'Hello, world! I am a leaf node.'
                        .appendTo parent.tile.value.content.dom
                    data: null
        ) - 1

    createTile = (parent, orientation, tile_left_node) ->
        # Append a new tile to the `tiles` array and return its index.
        # `tile_left_side` should be a boolean.
        index = pushTile parent
        tile = tiles[index]
        tile_side =
            switch orientation
                when 'horizontal'
                    if tile_left_node then 'top'
                    else 'bottom'
                when 'vertical'
                    if tile_left_node then 'left'
                    else 'right'
                when 'siblingless'
                    'clear'

        setTileClass tile, tile_side
        setTileId tile, index
        index
    
    addLeafToContainer = (parent) ->
        # Create only one tile and add it as the child of the supplied parent.
        # As the container tile is the top-level tile, it has only a single
        # child tile.
        parent.tile.value.child = createTile parent, 'siblingless', true
    
    addLeavesToLeaf = (parent, orientation) ->
        # Create two tiles; convert the 'leaf' tile into a 'branch' tile
        # before inserting the two new 'leaf' tiles into the newly-classified
        # 'branch' tile.
        emptyInnerHtml = (jquery_element) ->
            jquery_element.html ''

        emptyInnerHtml parent.tile.value.content.dom

        parent.tile.value =
            type: 'branch'
            children:
                left: createTile parent, orientation, true
                right: createTile parent, orientation, false
            content:
                dom:
                    parent.tile.value.content.dom
                    .attr 'class', 'tael-node-branch-siblingless'
            layout:
                split: orientation
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
            addLeavesToLeaf parent, orientation
        when 'branch'
            error.throw "Branch tiles cannot spawn new children post-creation."

module.exports = ->
    new_tiles = [
        [0, 'siblingless'],
        [1, 'horizontal'],
        [3, 'vertical']
    ]

    for tile in new_tiles
        newTile tiles, tile[0], tile[1]

