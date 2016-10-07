requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        'jquery': 'jquery/dist/jquery.min',
        'jquery.cookie': '../js/cometd/jquery.cookie'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'jquery.cookie' : {
            deps: [
                'jquery'
            ]
        }
    }
});
requirejs(["../js/main"]);
