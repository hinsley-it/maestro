# Tael is a JavaScript-based tiling panel system

## Overview
Maestro's windowing system, Tael is composed of tiling widgets, which are panels
exposing various customizable tools for content creation.

## Data Structures
Widgets are represented in an array of JSON objects, each containing a field
denoting its type: either a 'branch' or a 'leaf' of a faux-binary-tree
structure.

- Branches contain a field named 'children', which contains the indices of two
  other elements in the array.
- Leaves are terminals in the faux-binary-tree; they appear to the user as
  widgets.
