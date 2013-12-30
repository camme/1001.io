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
            var re = new RegExp(config.wp.url, "g");
            var re = /:81/g;

            console.log(re);
            console.log(content);
            content = content.replace(re, "");
            console.log("result", content);
            return content;
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

            var crawler = new Crawler(config.publicUrl, "/", config.server.port);
            console.log(config.publicUrl, "/", config.server.port);

            crawler.on("fetchcomplete",function(queueItem){
                console.log("Crawling> Completed caching resource:", queueItem);
            }).on("complete", function() {
                console.log("Crawling> Completed!");
                console.log("");
            }).on("queueadd", function(item) {
                console.log("Added", item);
            }).on("fetcherror", function(item) {
                console.log("Error", item);
            }).on("fetchcomplete",function(queueItem, responseBuffer, response) {
                console.log("I just received %s (%d bytes)",queueItem.url,responseBuffer.length);
                console.log("It was a resource of type %s",response.headers['content-type']);
            });

            crawler.start();

        }

    });

}

exports.init = init;

exports.close = function(done) {
    server.close(done);
}



