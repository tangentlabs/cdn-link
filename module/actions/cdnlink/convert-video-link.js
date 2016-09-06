//function traverse(self, config, path, document){
//	
//}
//function get_relevant_nodes(document, path, nodes){
//	var nodes = [];
//
//	for (var i = 0; i < nodes.length; i++){
//		var skip = false;
//		var node = nodes[i];
//		if (document['id'] == node['id']){
//			continue;
//		}
//		for (var j = 0; j < path.length; j++){
//			if (path[j]['id'] ==  node['id']){
//				skip = true;
//			}
//		}
//		nodes.push(node);
//	}
//	return nodes;
//}

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
        
        traverse: function(self, config, path, document){
        	
//        	Chain(document).traverse(config).then(function() {
//        		var nodes = [];
//        		var self = this;
//        		var functions = [];
//        		var nodes = get_relevant_nodes(document, path, this._nodes);
//        		for (var i = 0; i < nodes.length; i++){
//        			var newpath = path.slice();
//        			newpath.push(node);
//        			functions.push(function() {
//        				
//        			});
//        		}
//        		this.
//        		
////        			var newpath = path.slice();
////        			newpath.push(node);
////        			functions.push(function(){
////        				
////        			})
//        		
//                console.log(JSON.stringify(this));
//                callback();
//            });
        },

        executeAction: function(actionContext, config, callback) {

            var self = this;
            console.log('execute');
            var project = actionContext.observable("project").get();
            var branch = actionContext.observable("branch").get();
            var document = actionContext.observable("document").get();
            var config = {
                        	"associations": {
                               "a:linked": "INCOMING"
                            },
                            "depth": 1
                         };
            
//            console.log(JSON.stringify(document));
            console.log("-------");
            
            Chain().then(function(){
        		console.log("1");
        		this.subchain().then(function(){
        			console.log("2");
            		this.subchain().then(function(){
            			for(var i = 0; i < 1000; i++){
            				$('body');
            			}
            			console.log("3");
            		});
            		console.log("4");
            	})
        	})
        	console.log("out");
            
//            Chain(document).traverse(config).then(function() {
//                console.log(JSON.stringify(this));
//                callback();
//            });
//            var traversal = document.traverse({}).done(function(){
//            	console.log("done");
//            });
//            document.traverse({}).run();
//            document.traverse({}).done(function(){
//            	console.log("done");
//            }).run();
//            console.log("-------");
            
//            console.log(JSON.stringify(node.traverse(config)));
//            console.log(JSON.stringify(node.outgoingAssociations(null, null)));
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
