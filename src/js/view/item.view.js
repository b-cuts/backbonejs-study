define([
    'backbone',
    'text!tpl/todos.html',
    'common'
], function (Backbone, Tpl, Common) {
    'use strict';

    //var TodoView = Backbone.View.extend({
    return Backbone.View.extend({
        initialize: function () {
            /**
             * if model has been destroyed, this view will be remove from the DOM.
             */
            this.model.on('destroy', this.remove, this);
            //this.listenTo(this.model, 'destroy', this.remove);
            /**
             * if model has been changed, this view will be re-render.
             */
            this.model.on('change', this.render, this);
        },
        tagName: 'li',
        template: _.template(Tpl),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));

            /**
             * 
             */
            this.input = this.$('.edit');
            
            this.input.attr('type', 'hidden');
            return this;
        },
        events: {
            'click .destroy': 'clear',
            'dblclick label': 'edit',
            'keypress .edit': 'updateOnEnter',
        },
        clear: function () {
            this.model.destroy();
        },
        edit: function(e) {
            this.$el.addClass('editing');
            this.input.attr('type', 'text');
            this.input.focus();
        },
        updateOnEnter: function (e) {
            if (e.keyCode === Common.ENTER_KEY) {
                this.close();
            }
        },
        close: function () {
            var value = this.input.val();
            var trimmedValue = value.trim();

            if (trimmedValue) {
                this.model.save({ title: trimmedValue });

                if (value !== trimmedValue) {
                    this.model.trigger('change');
                }
            } else {
                this.clear();
            }

            this.$el.removeClass('editing');
        }
    });
    //return TodoView;
});