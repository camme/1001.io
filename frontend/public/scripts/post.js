
define([
    'fontlist', 
    'csslist',
    "measurement",
    "smartcss!../styles/highlightjs/default.css",
    "smartcss!../styles/highlightjs/zenburn.css",
    "trunk"

],function(ignore, igonre,  measurement, ignore, ignore, trunk) {

    require(['smartcss!../styles/loaded.css'], function() {

        // init trunk menu
        trunk.init();
        measurement.loaded();

    });

});

// @sourceURL=subpage.js
