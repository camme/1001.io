var path = require("path");
var fs = require("fs");

exports.server = {
    port: 8877
};

exports.wp = {
    url: "http://www.1001.io:81",
    siteUrl: "http://www.1001.io",
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


exports.publicUrl = "http://www.1001.io";


exports.environment = "production";
exports.analytics = "UA-21488834-5";

exports.useHtmlCache = false;
exports.useWpCache = false;

