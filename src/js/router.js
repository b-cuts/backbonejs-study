define([
    'backbone',
    'view/list.view',
    'collection/todo.collection',
    'common'
], function (Backbone, AppView, TodoCollection, Common) {
    'use strict';
    return Backbone.Router.extend({
        routes: {            
            '': 'default',
            '*filter': 'setFilter'
        },
        default: function() {
            new AppView().render();
        },
        setFilter: function (param) {
            console.log(param);

            //Common.TodoFilter = param || '';
            //TodoCollection.trigger('filter');
        }
    });
});