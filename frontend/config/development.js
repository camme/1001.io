var fs = require("fs");
var path = require("path");

exports.server = {
    port: 8181
};

exports.wp = {
    url: "http://local.1001.io:81",
    siteUrl: "http://local.1001.io",
    root: path.join(__dirname, "../wordpress/")
};

exports.cache = {
    maxAge: 1000 * 60 * 5 // 5 min
};

var version = fs.readFileSync(path.join(__dirname, "version.txt"));

exports.version = function() {
    return version + "-" + Math.random().toString().replace("0.", "").substring(0,6);
}

exports.views = path.join(__dirname, "./views");


exports.publicUrl = "http://local.1001.io";

exports.environment = "development";

exports.useHtmlCache = false;
exports.useWpCache = false;
