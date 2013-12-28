var path = require("path");

exports.server = {
    port: 8081
};

exports.wp = {
    url: "http://local.24hr.se:81",
    siteUrl: "http://local.24hr.se",
    root: path.join(__dirname, "../wordpress/")
};

exports.cache = {
    maxAge: 1000 * 60 * 5 // 5 min
};

exports.version = function() {
    return Math.random().toString().replace("0.", "");
}

exports.views = path.join(__dirname, "./views");


exports.publicUrl = "http://local.24hr.se";

exports.environment = "development";



