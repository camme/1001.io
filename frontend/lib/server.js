var Crawler = require("simplecrawler");
var frnt = require('frnt');
var fs = require("fs");
var path = require("path");
var http = require("http");
var express = require('express');
var app = express();
var config = require("../config-manager");
var server = require('http').createServer(app);


var doT = require('express-dot');

// add globals
var dotFunctions = require('./dot-functions');
doT.setGlobals(dotFunctions);

function init(options, next) {

    if (typeof options == "function") {
        next = options;
    }

    options = options || {};


    // Define where the public files are
    app.use(express.static(path.join(__dirname, '../public')));

    app.use(app.router);

    app.use(frnt.init({
        proxyUrl: config.wp.url,
        firstPackage: "first1400",
        filter: function(content) {
            return content.replace(/:81/g, "");
        }
    }));

    // define rendering engine
    app.set('views', path.join(__dirname, "../views"));
    app.set('view options', { layout: false });
    app.set('view engine', 'html' );
    app.engine('html', doT.__express );

    server.listen(config.server.port, function() {

        if (typeof next == "function") {
            next();
        }

        if (options.crawl !== false) { //&& config.useHtmlCache && config.useWpCache) {

            console.log("");
            console.log("Crawling through site to cache responses");
            console.log("----------------------------------------");
            Crawler.crawl(config.publicUrl).on("fetchcomplete",function(queueItem){
                console.log("Crawling> Completed caching resource:", queueItem.url);
            }).on("complete", function() {
                console.log("Crawling> Completed!");
                console.log("");
            });

        }

    });

}

exports.init = init;

exports.close = function(done) {
    server.close(done);
}



