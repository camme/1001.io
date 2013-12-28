var path = require("path");
var fs = require("fs");

exports.server = {
    port: 8877
};

exports.wp = {
    url: "http://new.24hr.se:81",
    siteUrl: "http://new.24hr.se",
    root: path.join(__dirname, "../wordpress/")
};

exports.cache = {
    maxAge: 1000 * 60 * 60 // 1 hour
};


var version = fs.readFileSync(path.join(__dirname, "version.txt"));

exports.version = function() {
    return version;
};

exports.views = path.join(__dirname, "./views");


exports.publicUrl = "http://new.24hr.se";


exports.environment = "production";

exports.useHtmlCache = false;
exports.useWpCache = false;

