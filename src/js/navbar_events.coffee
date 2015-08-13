module.exports = -> ($ document).ready -> (
    ($ '#nav-view-fullscreen').click -> (
        toggleFullscreen (($ 'body')[0])
    )
)
