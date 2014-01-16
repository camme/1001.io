
define([
    'fontlist', 
    'csslist',
    "measurement",
    "smartcss!../styles/highlightjs/default.css",
    "smartcss!../styles/highlightjs/zenburn.css",
    "trunk",
    "navigation-scroll"

],function(ignore, igonre,  measurement, ignore, ignore, trunk, navigationScroll) {

    require(['smartcss!../styles/loaded.css'], function() {

        // init trunk menu
        trunk.init();
        measurement.loaded();

        // adds a class to the body when we scroll fast
        navigationScroll.init({
            autoShowElements: document.querySelectorAll("nav, .main-top")
        });

    });

});

// @sourceURL=subpage.js
