define([
    'backbone.localStorage',
    'model/todo.model'
], function (Localstorage, TodoModel) {
    'use strict';
    var TodoCollection = Backbone.Collection.extend({
    //return Backbone.Collection.extend({
        model: TodoModel,
        localStorage: new Localstorage('todos-backbone'),
        completed: function () {
            return this.where({ completed: true });
        },
        remaining: function () {
            return this.where({ completed: false });
        },
        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        comparator: 'order'
    });
    return new TodoCollection();
});