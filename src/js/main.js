require([
	'backbone',
    'view/app.view',
    'router'
], function (Backbone, AppView, Router) {
    $(function () {
        "use strict";
        new Router();   
        Backbone.history.start();  
        //new AppView();
    });
});
    