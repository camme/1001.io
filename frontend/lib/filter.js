exports.filter = function(content) {
    var re = /:81/g;
    content = content.replace(re, "");

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
                project.npm = link.link.substring(link.link.lastIndexOf("/")).replace(/\//g, "");
            }
        }
    }

    next(null, data);

}


