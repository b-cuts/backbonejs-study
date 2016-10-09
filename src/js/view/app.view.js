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
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$todoList = this.$('#todo-list');

            this.listenTo(TodoCollection, 'add', this.addOne);
            this.listenTo(TodoCollection, 'reset', this.addAll);
            this.listenTo(TodoCollection, 'change:completed', this.filterOne);
            this.listenTo(TodoCollection, 'filter', this.filterAll);
            this.listenTo(TodoCollection, 'all', _.debounce(this.render, 0));

            TodoCollection.fetch({ reset: true });
            //TodoCollection.fetch();
        },
        el: '#todoapp',
        //$el: $('#todoapp'),
        template: _.template(statsTemplate),
        render: function () {
            var completed = TodoCollection.completed().length;
            var remaining = TodoCollection.remaining().length;

            if (TodoCollection.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.template({
                    completed: completed,
                    remaining: remaining
                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (Common.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete'
        },
        addOne: function (todo) {
            var view = new TodoView({ model: todo });
            this.$todoList.append(view.render().el);
        },
        addAll: function () {
            this.$todoList.empty();
            TodoCollection.each(this.addOne, this);
        },
        filterOne: function (todo) {
            todo.trigger('visible');
        },
        filterAll: function () {
            TodoCollection.each(this.filterOne, this);
        },
        createOnEnter: function (e) {
            if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
                return;
            }
            TodoCollection.create({
                title: this.$input.val().trim(),
                order: TodoCollection.nextOrder(),
                completed: false
            });
            this.$input.val('');
        },
        clearCompleted: function () {
            _.invoke(TodoCollection.completed(), 'destroy');
            return false;
        },
        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            TodoCollection.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        }
    });
});