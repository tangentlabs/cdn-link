define(function(require, exports, module) {
	console.log('registerring');
    var UI = require("ui");
    var ContentHelpers = require("content-helpers");

    return UI.registerAction("cdnlink", UI.AbstractUIAction.extend({

        defaultConfiguration: function() {
        	console.log('default');

            var config = this.base();

            config.title = "Show the CDN link for this asset v2";
            config.iconClass = "fa fa-plus";
            return config;
        },

        prepareAction: function(actionContext, config, callback) {
        	console.log('prepare');

            actionContext.currentPath = actionContext.observable("path").get();

            callback();
        },

        executeAction: function(actionContext, config, callback) {

            var self = this;
            console.log('execute');
            alert('asdasdas');

            UI.showPopupModal({
                "title": config.title,
                "body": "This is the content for the model"
            }, function(modalDiv) {
                // TODO: add any post-render logic here to manipulate the modal div
            });
        }

    }));
});
