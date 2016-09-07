//function traverse(self, config, path, document){
//	
//}
var absolute_paths = [];
var paths_in_process = [];
function resolved(path){
	remove(path);
	absolute_paths.push(path);
	if (paths_in_process.length == 0){
		done();
	}
}

function done(){
	var li = [];
	for (var i = 0; i < absolute_paths.length; i++){
		var segments = [];
		var path = absolute_paths[i];
		for (var j = 0; j < path.length; j++){
			segments.push("<a href='"+path['id']+"' target='_blank'>"+path['title']+"</a>");
		}
		li.append('<li>'+segments.join(' / ')+'</li>');
	}
	var crumbs = '<ul>'+li.join()+'</ul>';
	console.log(crumbs)
}

function remove(path){
	var index = paths_in_process.paths_in_process.indexOf(path);
	paths_in_process.splice( index, 1 );
}

function traverse(config,  path){
	return function(){
		var document = path.slice(-1).pop();
		var promises = []
		Chain(document).traverse(config).then(function() {
			var nodes = get_relevant_nodes(document, path, this._nodes);
			
			for (var i = 0; i < nodes.length; i++){
    			var newpath = path.slice();
    			newpath.push(node);
    			paths_in_process.push(newpath);
    			promises.push(traverse(config, newpath));
			}
			if (nodes.length == 0){
				resolved(path);
			} else {
				remove(path);
			}
			
			self.subchain().then(promises);
		}
	}
}

function get_relevant_nodes(document, path, nodes){
	var nodes = [];

	for (var i = 0; i < nodes.length; i++){
		var skip = false;
		var node = nodes[i];
		if (document['id'] == node['id']){
			continue;
		}
		for (var j = 0; j < path.length; j++){
			if (path[j]['id'] ==  node['id']){
				skip = true;
			}
		}
		nodes.push(node);
	}
	return nodes;
}

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
            var config = {
                        	"associations": {
                               "a:linked": "INCOMING"
                            },
                            "depth": 1
                         };
            
            console.log(JSON.stringify(document));
            console.log("-------");
            var path = [document];
            //traverse(config, path);
//            
//            
//            Chain().then(function(){
//        		console.log("1");
//        		this.subchain().then(function(){
//        			console.log("2");
//            		this.subchain().then(function(){
//            			for(var i = 0; i < 1000; i++){
//            				$('body');
//            			}
//            			console.log("3");
//            		});
//            		console.log("4");
//            	})
//        	})
//        	console.log("out");
            
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
