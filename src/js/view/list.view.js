define([
    'backbone',
    'collection/todo.collection',
    'view/todo.view',
    'text!tpl/stats.html',
    'common'
], function (Backbone, TodoCollection, TodoView, statsTemplate, Common) {
    'use strict';
    return Backbone.View.extend({
        initialize: function () {
            this.input = $('#new-todo');
            this.todoList = $('#todo-list');

            //this.listenTo(TodoCollection, 'add', this.addTodo);
            //this.listenTo(TodoCollection, 'reset', this.addAll);

            TodoCollection.on('add', this.addTodo, this);
            TodoCollection.on('reset', this.addAll, this);

            TodoCollection.fetch({
                reset: true
            });
        },
        el: '#todoapp',
        //$el: $('#todoapp'),
        template: _.template(statsTemplate),
        render: function () {

        },
        events: {
            'keypress #new-todo': 'createOnEnter'
        },
        createOnEnter: function (e) {
            if (e.which !== Common.ENTER_KEY || !this.input.val().trim()) {
                return;
            }

            TodoCollection.create({
                title: this.input.val().trim(),
                order: TodoCollection.nextOrder(),
                completed: false
            });
            this.input.val('');

            /*
            TodoCollection.create({
                title: this.$input.val().trim(),
                order: TodoCollection.nextOrder(),
                completed: false
            });
            */
        },
        addTodo: function (model, index) {
            var view = new TodoView({
                'model': model
            });
            var el = view.render().el;
            this.todoList.append(el);
        },
        addAll: function(collection) {
            this.todoList.empty();
            TodoCollection.each(this.addTodo, this);
            //_.each(TodoCollection.models, this.addTodo, this);
        }
    });
});