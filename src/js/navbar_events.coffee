# UMDJS/returnExports pattern
((root, factory) -> (
    if typeof define is 'function' and define.amd
        # AMD.
        define([], factory)
    else if typeof module is 'object' and module.exports
        # Node.
        module.exports = factory()
    else
        # Browser globals (root is window).
        root.returnExports = factory()
))(this, -> -> ($ document).ready -> (
    ($ '#nav-view-fullscreen').click -> (
        toggleFullscreen(($ 'body')[0])
    )
))
