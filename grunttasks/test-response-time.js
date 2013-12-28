var fs = require("fs");
var phantom = require("phantom");
var path = require("path");
var exec = require("child_process").exec;

module.exports = function(grunt) {

    grunt.registerTask('test-response-time', 'Test how much it takes to render the page', function() {

        var config = require("../node/config-manager");

        var done = this.async();

        var front = require('../node/index');

        var url = config.publicUrl;

        front.init({crawl: false}, function() {

            phantom.create(function(ph) {
                ph.createPage(function(page) {

                    page.open(url, function (status) {

                        var checkAmount = 0;

                        function checkTime() {

                            checkAmount++;

                            if (checkAmount < 1000) {

                                var result = page.evaluate(function() {
                                    var found = window.tf && window.tf.end;
                                    return { found: found, data: window.tf };
                                }, function(result) {

                                    if (result.found) {

                                        console.log("Time for site to be completly rendered: %s sec", result.data.delta);

                                        ph.exit();
                                        front.close(function() {
                                            done();
                                        });
                                    }
                                    else {
                                        setTimeout(checkTime, 10);
                                    }

                                });

                            }
                            else {
                                ph.exit();
                                front.close(function() {
                                    console.log("STOPPPED");
                                    done();
                                });
                            }

                        }

                        checkTime();

                    });
                });
            });

        });

    });

}
