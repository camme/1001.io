var registry = require('npm-stats');

exports.filter = function(content) {
    var re = /http:\\\/\\\/local.1001.io(.*?)\\\//gm;
    content = content.replace(re, "/");
    return content;
}

exports.process = function(data, next) {

    var template = data.type;

    var processFunction = function(data, next) { next(null, data); };

    switch (template) {
        case "project": processFunction = aggregateProjectInfo; break;
        case "index": processFunction = startPage; break;
    }

    processFunction(data, next);

}


function aggregateProjectInfo(data, next) {
    next(null, data);
}

function startPage(data, next) {

    for(var i = 0, ii = data.projects.length; i < ii; i++){
        var project = data.projects[i];
        for(var j = 0, jj = project.links.length; j < jj; j++){
            var link = project.links[j];
            if (link.link_type == "npm" && link.link.indexOf("/") > -1) {
                project.npm = {
                    name: link.link.substring(link.link.lastIndexOf("/")).replace(/\//g, "")
                };
                //var downloads = registry.module(project.npm.name).downloads(function() {
                    //console.log(arguments);                                                           
                //});
            }
        }
    }

    next(null, data);

}


