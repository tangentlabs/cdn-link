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
            console.log(branch);
            console.log(document._doc);

            UI.showPopupModal({
                "title": config.title,
                "body": "<h3>Your CDN link for production is</h3><p><a href=\"https://d1iyvc6w63ago2.cloudfront.net/asset/"+document._doc+"/"+document.title+"\">https://d1iyvc6w63ago2.cloudfront.net/asset/"+document._doc+"/"+document.title+"</a></p><h3>Your link for stage is</h3<p><a href=\"https://sky-cloud-cdn-qa.tangentlabs.co.uk/"+branch._doc+"/asset/"+document._doc+"/"+document.title+"\">https://sky-cloud-cdn-qa.tangentlabs.co.uk/"+branch._doc+"/asset/"+document._doc+"/"+document.title+"</a><br />(this will change with branches...)</p>"
            }, function(modalDiv) {
                // TODO: add any post-render logic here to manipulate the modal div
            });
        }

    }));
});
