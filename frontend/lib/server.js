var Crawler = require("simplecrawler");
var frnt = require('frnt');
var fs = require("fs");
var path = require("path");
var http = require("http");
var express = require('express');
var app = express();
var config = require("../config-manager");
var server = require('http').createServer(app);

var filter = require('./filter');

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
        filter: filter.filter,
        process: filter.process
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

            var crawlerUrl = config.publicUrl.replace("http://", "");
            var crawler = new Crawler(crawlerUrl, "/"); //, config.server.port);
            console.log(config.publicUrl, "/", config.server.port);

            crawler.on("crawlstart", function() {
                console.log("Crawling> Start");
            }).on("complete", function() {
                console.log("Crawling> Completed!");
                console.log("");
            }).on("queueadd", function(item) {
                console.log("Added", item.url);
            });
 
            /*
            crawler.on("crawlstart", function() {
                console.log("START");
            }).on("fetchstart", function(item, options) {
                console.log("Fetch start", item);
            }).on("complete", function() {
                console.log("Crawling> Completed!");
                console.log("");
            }).on("queueadd", function(item) {
                console.log("Added", item);
            }).on("fetchdataerror", function(item) {
                console.log("Data Error", item);
            }).on("fetcherror", function(item) {
                console.log("Error", item);
            }).on("fetchcomplete",function(queueItem, responseBuffer, response) {
                console.log("I just received %s (%d bytes)",queueItem.url,responseBuffer.length);
                console.log("It was a resource of type %s",response.headers['content-type']);
                console.log(responseBuffer.toString());
            });
            */

            crawler.start();

        }

    });

}

exports.init = init;

exports.close = function(done) {
    server.close(done);
}



