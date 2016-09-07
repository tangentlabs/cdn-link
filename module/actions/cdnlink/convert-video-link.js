//function traverse(self, config, path, document){
//	
//}
window.absolute_paths = [];
window.paths_in_process = [];
function resolved(path){
	remove(path);
	window.absolute_paths.push(path);
	if (paths_in_process.length == 0){
		done();
	}
}

function done(){
	var li = [];
	for (var i = 0; i < window.absolute_paths.length; i++){
		var segments = [];
		var path = window.absolute_paths[i];
		for (var j = 0; j < path.length; j++){
			segments.push("<a href='"+path[j]['_doc']+"' target='_blank'>"+path[j]['title']+"</a>");
		}
		li.push('<li>'+segments.join(' / ')+'</li>');
	}
	var crumbs = '<ul>'+li.join()+'</ul>';
	console.log(crumbs)
}

function remove(path){
	var index = window.paths_in_process.indexOf(path);
	window.paths_in_process.splice( index, 1 );
}

function traverse(project, branch, config,  path){
	return function(){
		//json, not chained
		var document = path.slice(-1).pop();
		var promises = [];
		branch.readNode(document['_doc']).traverse(config).then(function() {
			console.log(JSON.stringify(this));
			console.log(JSON.stringify(this._nodes));
			var nodes = get_relevant_nodes(document, path, this._nodes);
			
			for (var i = 0; i < nodes.length; i++){
    			var newpath = path.slice();
    			newpath.push(nodes[i]);
    			window.paths_in_process.push(newpath);
    			promises.push(traverse(project, branch, config, newpath));
			}
			if (nodes.length == 0){
				resolved(path);
			} else {
				remove(path);
			}
			
			this.subchain().then(promises);
		});
	}
}

function get_relevant_nodes(document, path, nodes){
	var res_nodes = [];

	for (var node_id in nodes) {
		var skip = false;
	
	    // skip loop if the property is from prototype
	    if (!nodes.hasOwnProperty(node_id)) continue;
	    var node = nodes[node_id];
	    node['id'] = node_id;
	    console.log(document['_doc']+" == "+node['_doc']);
		if (document['_doc'] == node['_doc']){
			continue;
		}
		for (var j = 0; j < path.length; j++){
			if (path[j]['_doc'] ==  node['_doc']){
				skip = true;
			}
		}
		res_nodes.push(node);
	}
	return res_nodes;
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
        	window.absolute_paths = [];
        	window.paths_in_process = [];
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
            Chain().then(traverse(project, branch, config, path));
            callback();
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
