define([
    'backbone',
    'collection/todo.collection',
    'view/item.view',
    'text!tpl/stats.html',
    'common'
], function (Backbone, TodoCollection, TodoView, statsTemplate, Common) {
    'use strict';
    return Backbone.View.extend({
        //collection: new TodoCollection(),
        collection: TodoCollection,
        initialize: function () {
            this.input = this.$('#new-todo');
            this.todoList = this.$('#todo-list');

            //this.listenTo(TodoCollection, 'add', this.addTodo);
            //this.listenTo(TodoCollection, 'reset', this.addAll);

            //TodoCollection.on('add', this.addTodo, this);
            //TodoCollection.on('reset', this.addAll, this);

            this.collection.on('add', this.addTodo, this);
            this.collection.on('reset', this.addAll, this);
            /*
            TodoCollection.fetch({
                reset: true
            });
            */
            this.collection.fetch({
                reset: true
            })
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
            /*
            TodoCollection.create({
                title: this.input.val().trim(),
                order: TodoCollection.nextOrder(),
                completed: false
            });
            */
            this.collection.create({
                title: this.input.val().trim(),
                order: this.collection.nextOrder(),
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
            //_.each(TodoCollection.models, this.addTodo, this);
            //TodoCollection.each(this.addTodo, this);
            this.collection.each(this.addTodo, this);
        }
    });
});