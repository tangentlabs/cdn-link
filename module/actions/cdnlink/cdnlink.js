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
            var project = actionContext.observable("project").get();
            var branch = actionContext.observable("branch").get();
            var document = actionContext.observable("document").get();
            console.log(document);

            UI.showPopupModal({
                "title": config.title,
                "body": "<p>Your CDN link for production is: <a href=\"https://d1iyvc6w63ago2.cloudfront.net/crop/force/644/430/935cd0f14e6423d06b86/SB_322x215px_LOB_PUBS1.jpg\">https://d1iyvc6w63ago2.cloudfront.net/crop/force/644/430/935cd0f14e6423d06b86/SB_322x215px_LOB_PUBS1.jpg</a></p><p>Your link for stage is <a href=\"https://d1iyvc6w63ago2.cloudfront.net/crop/force/644/430/935cd0f14e6423d06b86/SB_322x215px_LOB_PUBS1.jpg\">https://d1iyvc6w63ago2.cloudfront.net/crop/force/644/430/935cd0f14e6423d06b86/SB_322x215px_LOB_PUBS1.jpg</a>(this will change with branches...)"
            }, function(modalDiv) {
                // TODO: add any post-render logic here to manipulate the modal div
            });
        }

    }));
});
