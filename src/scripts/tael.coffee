# tael.js
# Copyright (c) 2015 Carter Hinsley
# MIT License
error = require './error.coffee'
ref = require 'refjs'

tiles = [
    new ref
        type: 'container'
        content:
            dom:
                ($ '.tael-container')
                .attr 'id', 'tael-node-0'
        child: undefined
]

newTile = (tiles, parent_id) ->
    # Add a new tile to the `tiles` array.
    pushTile = (parent) ->
        # Push a new tile to the `tiles` array and return its index.
        index = (
            tiles.push new ref
                type: 'leaf'
                content:
                    dom:
                        ($ '<div>')
                        .addClass 'tael-node-leaf'
                        .text 'foo'
                        .appendTo parent.tile.value.content.dom
                    data: null
        ) - 1
        tiles[index].value.content.dom.attr 'id', 'tael-node-'+index
        index
    
    addLeafToContainer = (parent) ->
        # Create only one tile and add it as the child of the supplied parent.
        # As the container tile is the top-level tile, it has only a single
        # child tile.
        parent.tile.value.child = pushTile parent
    
    addLeavesToLeaf = (parent) ->
        # Create two tiles; convert the 'leaf' tile into a 'branch' tile
        # before inserting the two new 'leaf' tiles into the newly-classified
        # 'branch' tile.
        emptyInnerHtml = (jquery_element) ->
            return jquery_element.html ''

        parent.tile.value =
            type: 'branch'
            content:
                dom:
                    emptyInnerHtml(
                        parent.tile.value.content.dom
                        .attr 'class', 'tael-node-branch'
                    )
            children:
                left: pushTile parent
                right: pushTile parent
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

module.exports = ->
    newTile tiles, 0
    newTile tiles, 1

