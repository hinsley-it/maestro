requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: ''
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
        fullscreen: 'lib/fullscreen',
        jquery: 'http://code.jquery.com/jquery-1.11.3.min',
        less: 'http://cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min'
    },
    shims: {
        bootstrap: {
            exports: "Bootstrap"
        }
    }
});

requirejs(['navbar_events'], function (navbar_events) {});
requirejs(['less'], function (less) {
    
});