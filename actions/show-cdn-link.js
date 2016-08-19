define(function(require, exports, module) {

    var UI = require("ui");
    var ContentHelpers = require("content-helpers");

    return UI.registerAction("show-cdn-link", UI.AbstractUIAction.extend({

        defaultConfiguration: function() {

            var config = this.base();

            config.title = "Show the CDN link for this asset";
            config.iconClass = "fa fa-plus";
            return config;
        },

        prepareAction: function(actionContext, config, callback) {

            actionContext.currentPath = actionContext.observable("path").get();

            callback();
        },

        executeAction: function(actionContext, config, callback) {

            var self = this;

            UI.showModal({
                "title": config.title,
                "text": 
                "buttons": [{
                    "id": "close",
                    "title": "Close",
                    "handler": function(e) {
                    }
                }],
                "cancel": true
            }, function(modalDiv) {
                // TODO: add any post-render logic here to manipulate the modal div
            });
        }

    }));
});
