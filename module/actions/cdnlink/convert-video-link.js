define(function(require, exports, module) {
    var UI = require("ui");
    var ContentHelpers = require("content-helpers");
    var http = require('http');
    var fs = require('fs');

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
            document.attach("comment", "text/plain", "Do attachments work?")
            console.log(branch);
            console.log(document._doc);

            UI.showPopupModal({
                "title": config.title,
                "body": "Built!"
            }, function(modalDiv) {
                // TODO: add any post-render logic here to manipulate the modal div
            });
        }

    }));
});


define(function(require, exports, module) {

    var UI = require("ui");
    var ContentHelpers = require("content-helpers");


    return UI.registerAction("convert-video-link", UI.AbstractUIAction.extend({

        defaultConfiguration: function() {

            var config = this.base();

            config.title = "Convert a video";
            config.iconClass = "fa fa-plus";
            return config;
        },

        prepareAction: function(actionContext, config, callback) {

            actionContext.currentPath = actionContext.observable("path").get();

            callback();
        },

        executeAction: function(actionContext, config, callback) {

            var self = this;
            
            


//            var download = function(url, dest, cb) {
//	              var file = fs.createWriteStream(dest);
//	              var request = http.get(url, function(response) {
//		                response.pipe(file);
//		                file.on('finish', function() {
//		                	file.close(cb);  // close() is async, call cb after close completes.
//		                });
//	              }).on('error', function(err) { // Handle errors
//		                fs.unlink(dest); // Delete the file async. (But we don't check the result)
//		                if (cb) cb(err.message);
//	              });
//            };

//            UI.showModal({
//                "title": config.title,
//                "content": "This is the content for the model",
//                "buttons": [{
//                    "id": "close",
//                    "title": "Close",
//                    "handler": function(e) {
//                    }
//                }],
//                "cancel": true
//            }, function(modalDiv) {
//                // TODO: add any post-render logic here to manipulate the modal div
//            });
        }

    }));
});
