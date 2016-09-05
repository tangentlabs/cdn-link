define(function(require, exports, module) {
    var UI = require("ui");
    var ContentHelpers = require("content-helpers");
//    var http = require('http');
//    var fs = require('fs');
    var $ = require("jquery");

    return UI.registerAction("convert-video-link", UI.AbstractUIAction.extend({

        defaultConfiguration: function() {
        	console.log('default');

            var config = this.base();

            config.title = "Conversion Finished";
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
            var node = actionContext.observable("node").get();
            var config = {
                        	"associations": {
                               "a:linked": "OUTGOING"
                            },
                            "depth": 1
                         };
            
            console.log(document.traverse(config));
            
            console.log(JSON.stringify(node.traverse(config)));
            console.log(JSON.stringify(node.outgoingAssociations(null, null)));
//            Chain(document).attach("comment", "text/plain", "Do attachments work?").then(function(){
//            	UI.showPopupModal({
//                    "title": config.title,
//                    "body": "Built!"
//                }, function(modalDiv) {
//                    // TODO: add any post-render logic here to manipulate the modal div
//                });
//            });
            //console.log(attachment);

            
        }

    }));
});
