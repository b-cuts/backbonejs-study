define([
    'backbone',
    'view/app.view',
    'collection/todo.collection',
    'common'
], function (Backbone, AppView, TodoCollection, Common) {
    'use strict';
    return Backbone.Router.extend({
        routes: {
            '': 'home',
            '*filter': 'setFilter'
        },
        home: function() {
            new AppView().render();;
        },
        setFilter: function (param) {
            Common.TodoFilter = param || '';
            TodoCollection.trigger('filter');
        }
    });
});
