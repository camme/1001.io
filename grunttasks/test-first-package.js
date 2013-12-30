var fs = require("fs");
var path = require("path");
var http = require("http");


module.exports = function(grunt) {

    grunt.registerTask('test-first-package', 'Test the first package and ensure its under 1400 bytes', function() {

        var config = require("../frontend/config-manager");

        var done = this.async();

        var front = require('../frontend/index');

        var url = config.publicUrl;

        front.init({crawl: false}, function() {

            var options = {
                hostname: url.replace("http://", "").replace("/"),
                port: 80,
                path: '/',
                method: 'GET'
            };

            var firstChunk = true;
            var firstMessageLength = 0;
            var failed = false;
            var startTime = new Date();

            var req = http.request(options, function(res) {
                var headersString = "";
                for (var key in res.headers) {
                    headersString += key + ":" + res.headers[key] + "\r\n";
                }
                res.on('data', function (chunk) {
                    if (firstChunk) {

                        firstChunk = false;

                        var size = chunk.length + headersString.length;

                        console.log("Size of first package (headers and body): %s bytes", size);

                        if (size> 1400) {

                            grunt.log.error("First package to big! You need to cut %s bytes.", size - 1400);
                            console.log("");
                            grunt.log.error("Headers:");
                            grunt.log.error("--------");
                            grunt.log.error(headersString);
                            console.log("");
                            grunt.log.error("Body:");
                            grunt.log.error("-----");
                            grunt.log.error(chunk);
                            failed = true;

                            //throw new TypeError('First package too big');

                        } else {
                            grunt.log.ok("First package under 1400 bytes. Cool!");
                            grunt.log.ok("It took %s milliseconds to get the first package", (new Date()).getTime() - startTime.getTime());
                        }
                  
                    }
                });
                res.on("end", function() {
                    grunt.log.ok("It took %s milliseconds to get the complete body", (new Date()).getTime() - startTime.getTime());
                    front.close(function() {
                        done(!failed);
                    });
                });
            });

            req.on('error', function(e) {
                if (firstChunk) {
                    console.log('Problem with request: ' + e.message);
                }
            });

            // write data to request body
            req.write('data\n');
            req.end();

        });

    });

}
