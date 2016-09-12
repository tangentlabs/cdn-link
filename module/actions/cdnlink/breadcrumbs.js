//function traverse(self, config, path, document){
//	
//}
window.absolute_paths = [];
window.paths_in_process = [];
window.branch = null;
window.project = null;
function resolved(path){
	remove(path);
	window.absolute_paths.push(path);
	console.log("resolved a path");
	console.log("unresolved: "+window.paths_in_process.length);
	if (window.paths_in_process.length == 0){
		done();
	}
}

function remove(path){
	var index = window.paths_in_process.indexOf(path);
	window.paths_in_process.splice( index, 1 );
}

function done(){
	var UI = require("ui");
	var li = [];
	var paths = window.absolute_paths;
	var title;
	for (var i = 0; i < paths.length; i++){
		var segments = [];
		var path = paths[i];
		path = path.reverse();
		for (var j = 0; j < path.length; j++){
			if ('title' in path[j]){
				title = path[j]['title'];
			} else {
				title = '[No Title]';
			}
			
			segments.push("<a href='/#/projects/" + window.project.getId() + "/wid/" + window.branch.getId() + "/documents/" +path[j]['_doc']+"' target='_blank'>"+title+"</a>");
		}
		li.push('<li>'+segments.join(' / ')+'</li>');
	}
	var crumbs = '<p>This element exists in the following.</p><ul>'+li.join(' ')+'</ul>';
	UI.showPopupModal({
        "title": "This element is used in the following paths",
        "body": crumbs
    }, function(modalDiv) {
        // TODO: add any post-render logic here to manipulate the modal div
    });
}



function traverse(project, branch, config,  path){
	return function(){
		//json, not chained
		var document = path.slice(-1).pop();
		
		branch.readNode(document['_doc']).traverse(config).then(function() {
			var promises = [];
			console.log("traversing "+document['title']);
			var nodes = get_relevant_nodes(document, path, this._nodes);
			
			for (var i = 0; i < nodes.length; i++){
    			var newpath = path.slice();
    			console.log(nodes[i]);
    			newpath.push(nodes[i]);
    			window.paths_in_process.push(newpath);
    			console.log("scheduleing to traverse "+nodes[i]['title']);
    			this.subchain().then(traverse(project, branch, config, newpath));
			}
			if (nodes.length == 0){
				resolved(path);
			} else {
				remove(path);
			}
//			for (var i = 0; i < nodes.length ; i++){
//				this.subchain().then(promises);
//			}
			
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
			console.log("this node");
			continue;
		}
		for (var j = 0; j < path.length; j++){
			if (path[j]['_doc'] ==  node['_doc']){
				console.log("in path");
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

    return UI.registerAction("breadcrumbs", UI.AbstractUIAction.extend({

        defaultConfiguration: function() {
            var config = this.base();

            config.title = "Conversion Finished";
            config.iconClass = "fa fa-plus";
            return config;
        },

        prepareAction: function(actionContext, config, callback) {
            actionContext.currentPath = actionContext.observable("path").get();
            callback();
        },

        executeAction: function(actionContext, config, callback) {
        	window.absolute_paths = [];
        	window.paths_in_process = [];
            var self = this;
            window.project = actionContext.observable("project").get();
            window.branch = actionContext.observable("branch").get();
            var document = actionContext.observable("document").get();
            var config = {
                        	"associations": {
                               "a:linked": "INCOMING"
                            },
                            "depth": 1
                         };
            
            var path = [document];
            Chain().then(traverse(project, branch, config, path));
            callback();
            
        }

    }));
});
