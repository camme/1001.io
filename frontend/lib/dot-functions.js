var fs = require('fs');
var path = require('path');
var marked = require('marked');
var config = require("../config-manager");
var hljs = require("highlight.js");

marked.setOptions({
    highlight: function (code, lang) {
        return hljs.highlightAuto(code).value;
    }
});

module.exports = {

    load: function(file) {
        return fs.readFileSync(config.views + "/" + file);
    },

    markdown: function(content) {
        var markdownContent = "";
        if (content) {
            markdownContent = marked(content);
        }
        return markdownContent;
    },

    renderFirstImageAsBackground: function(images) {
        var html = "";
        if (images && images.length > 0) {
            html = 'style="background: url(' + images[0].image + ') no-repeat center center"';
        }
        return html;
    },

    image: function(url, alt, style){

        if(isSvgImage(url)){

            // create path on disk
            var svgpath = path.join( config.wp.root, filter(url));

            var cleansvg = "";
            if (fs.existsSync(svgpath)) {
                var svg = fs.readFileSync(svgpath, "utf8");
                cleansvg = svg.replace(/(<\?xml.*\?>|<!.*>)/g, "");
            } else {
                cleansvg = "[svg file not found: '" + svgpath + "']";
            }
            return cleansvg;
        }

        var img = '<img src="' + url + '" alt="' + alt + '" />';

        return img;

    },

    dump: function(data){
        return JSON.stringify(data, null, "");
    }

};
