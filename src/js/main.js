require([
	'backbone',
    'router'
], function (Backbone, Router) {
    $(function () {
        "use strict";
        new Router();   
        Backbone.history.start();  
    });
});
    