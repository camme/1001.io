var fs = require("fs");
var path = require("path");
var http = require("http");
var urlToTest = "new.24hr.se";

module.exports = function(grunt) {

    grunt.registerTask('test-server-response', 'Test the live servers response time', function() {

        console.log("");
        grunt.log.ok("Testing %s", urlToTest);
        console.log("");

        var done = this.async();

        var options = {
            hostname: urlToTest,
            port: 80,
            path: '/',
            method: 'GET'
        };

        var firstChunk = true;
        var firstMessageLength = 0;
        var failed = false;
        var startTime = new Date();
        var body = "";

        var req = http.request(options, function(res) {

            var headersString = "";
            for (var key in res.headers) {
                headersString += key + ":" + res.headers[key] + "\r\n";
            }

            res.on('data', function (chunk) {

                body += chunk.toString();

                if (firstChunk) {

                    firstChunk = false;

                    var size = chunk.length + headersString.length;

                    console.log("Size of first package (headers and body): %s bytes", size);

                    if (size> 1400) {

                        console.error("First package to big! You need to cut %s bytes.", size - 1400);
                        console.log("");
                        console.error("Headers:");
                        console.error("--------");
                        console.error(headersString);
                        console.error("Body:");
                        console.error("-----");
                        console.error(chunk.toString());
                        failed = true;

                    } else {
                        grunt.log.ok("First package under 1400 bytes. Cool!");
                    }
                    console.log("");
                    grunt.log.ok("It took %s milliseconds to get the first package", (new Date()).getTime() - startTime.getTime());

                }

            });

            res.on("end", function() {

                grunt.log.ok("It took %s milliseconds to get the complete body", (new Date()).getTime() - startTime.getTime());
                done();

            });

        });

        req.on('error', function(e) {
                console.log('Problem with request: ' + e.message);
                grunt.log.error(e);
        });

        // write data to request body
        req.end();

    });


}
