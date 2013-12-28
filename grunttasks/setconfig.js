var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

module.exports = function(grunt) {
    grunt.registerTask('setconfig', 'Turn on the correct config', function(target) {

        var exec = require('child_process').exec;

        var fileName = target;

        var cb = this.async();
        exec('cp ' + fileName + '.js ../config.js', {cwd: './frontend/config'}, function(err, stdout, stderr) {
            if (err) {
                grunt.log.error("Failed to copy config for node front");
            }
            console.log(stderr);
            console.log("Config file for node front is set for", fileName);

            // WORDPRESS
            exec('cp ' + fileName + '.php ../wp-config.php', {cwd: './wordpress/config'}, function(err, stdout, stderr) {
                if (err) {
                    grunt.log.error("Failed to copy config for wordpress");
                }
                console.log(stderr);
                console.log("Config file for wordpress is set for", fileName);
                cb();
            });

        });

    });

};
