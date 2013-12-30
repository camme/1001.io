/*global module:false*/


var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

module.exports = function(grunt) {


    function createStylusList(sourcePaths) {
        var fileMappings = {};
        sourcePaths.map(function(file) {
            if (file.indexOf(".styl")) {
                var css = file.replace(".styl", ".css");
                fileMappings[css] = file;
            }
        });
        return fileMappings;
    }

    // get all stylus files
    var stylusPaths = grunt.file.expand([
        'frontend/public/**/*.styl'
    ]);

    var stylusFileList = createStylusList(stylusPaths);

    // Project configuration.
    grunt.initConfig({

        pkg: '<json:package.json>',

        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */'
        },

        requirejs: {
            compile: {
                options: {
                    appDir: "./frontend/public/scripts",
                    baseUrl: "./",
                    optimize: "uglify2",
                    mainConfigFile: "./frontend/public/scripts/require-config.js",
                    findNestedDependencies: true,
                    dir: "./frontend/public/scripts-production",
                    paths: {
                    },
                    modules: [
                        { name: "bootstrap-main" },
                        { name: "bootstrap-post" }
                        //{ name: "bootstrap-list" }
                    ],
                    smartcss: {
                        urlArgs: function() {
                            return "ver=77";
                        }
                    }
                }
            }
        },

        stylus: {
            compile: {
                options: {
                    'include css': true,
                    'inline': true
                },
                files: stylusFileList
            }
        },

        exec: {
            stamp: {
                cmd: function () {
                    var versionCommand = "git show -s --format=%h";
                    exec(versionCommand, function (err, stdout, stderr) {
                        var versionHash = stdout.toString().replace(/[\n\r]/g, '');
                        var countCommand = "git rev-list HEAD --count";
                        exec(countCommand, function (err, stdout, stderr) {
                            var count = stdout.toString().replace(/[\n\r]/g, '');
                            var version = count + "-" + versionHash;
                            fs.writeFileSync("frontend/version.txt", version, "utf8");
                            fs.writeFileSync("wordpress/version.txt", version, "utf8");
                            //grunt.log.ok("Version", version);
                        });
                    });
                    return "";
                }
            }
        }

    });

    grunt.registerTask('rootprojectinstall', 'Install the node dependencies for the root project', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install', {cwd: '.'}, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            console.log("Installed");
            cb();
        });
    });

    grunt.registerTask('nodefrontinstall', 'Install the node frontdependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install', {cwd: './frontend'}, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            console.log("Installed");
            cb();
        });
    });

    grunt.registerTask('start', 'Start the node front server', function() {

        var done = this.async();
        var front = require('./frontend/index');
        front.init(function() {
            console.log("");
            console.log("Node front server started");
        });

    });


    grunt.loadTasks("grunttasks");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('build', function(inputTarget) {
        var inputTarget = inputTarget || 'development';

        var target = "";
        if (inputTarget == "production") {
            target = "production";
        } else if (inputTarget == "development") {
            target = "development";
        } else if (inputTarget == "local") {
            target = "local";
        } else {
            grunt.log.error("Config settings is not accepeted, use production or development");
            return false;
        }

        var targetTasks = ['setconfig'];
        //var tasks = ['rootprojectinstall', 'nodefrontinstall', 'stylus', 'exec:stamp', 'requirejs', 'test-first-package', 'test-response-time'];
        var tasks = ['rootprojectinstall', 'nodefrontinstall', 'stylus', 'exec:stamp', 'requirejs']; //, 'test-first-package', 'test-response-time'];
        targetTasks = targetTasks.map(function(task) {
            return task + ":" + target;
        });
        tasks = targetTasks.concat(tasks);
        grunt.task.run.apply(grunt.task, tasks);
    });

};
