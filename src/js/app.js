requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        'jquery': 'jquery/dist/jquery.min',
        //'jquery.cookie': '../js/cometd/jquery.cookie'
        'underscore': 'underscore/underscore-min',
        'backbone': 'backbone/backbone-min',
        'backbone.localStorage': 'backbone.localStorage/backbone.localStorage-min',
        'text': 'text/text',
        'router': '../js/router',
        'model': '../js/model',
        'collection': '../js/collection',
        'view': '../js/view',
        'tpl': '../tpl',
        'common': '../js/common'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: [
                'jquery', 'underscore'
            ]
        },
        'backbone.localStorage': {
            exports: 'LocalStorage',
            deps: [
                'backbone'
            ]
        }
    }
});
requirejs(["../js/main"]);
