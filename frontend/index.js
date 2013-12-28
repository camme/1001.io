var server = require("./lib/server");

if (process.argv.length > 1 && process.argv[1] == __filename) {
    server.init({});
}

module.exports = server;
