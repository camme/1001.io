var fs = require('fs');
var path = require('path');
var marked = require('marked');
var moment = require('moment');
var config = require("../config-manager");
var hljs = require("highlight.js");

marked.setOptions({
    highlight: function (code, lang) {
        lang = lang || "javascript";
        return hljs.highlight(lang, code).value;
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
            html = 'style="background-image: url(' + images[0].image + ');"';
        }
        return html;
    },

    renderFirstImage: function(images) {
        var html = "";
        if (images && images.length > 0) {
            html = '<img src="' + images[0].image + '" alt="" />';
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

    age: function() {
        var now = moment();
        var then = moment([1974, 3, 11]);
        return now.diff(then, 'years') 
    },

    version: function() {
        return fs.readFileSync(path.join(__dirname, "..", "version.txt"));
    },

    dump: function(data){
        return JSON.stringify(data, null, "");
    },

    scriptsFolder: function() {
        return config.environment == "production" ? "/scripts-production" : "/scripts";
    },

    analytics: function() {
        var script = "<script>";
        script += "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
        script += "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
        script += "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
        script += "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
        script += "ga('create', '" + config.analytics + "', '1001.io');";
        script += "ga('send', 'pageview');";
        script += "</script>";
        return config.environment == "production" ? script : "";
    }

};

function isSvgImage(url){

    if(url.indexOf(".svg") == (url.length - 4)){
        return true;
    }

    return false
}


