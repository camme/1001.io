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
    }

    processFunction(data, next);

}


function aggregateProjectInfo(data, next) {

    console.log("Its a project!");

    next(null, data);

}

