
define([
    'fontlist', 
    'csslist',
    "measurement",
    "smartcss!../styles/highlightjs/default.css",
    "smartcss!../styles/highlightjs/zenburn.css",
    "trunk",
    "navigation-scroll",
    "nunt"

],function(ignore, igonre,  measurement, ignore, ignore, trunk, navigationScroll, nunt) {

    require(['smartcss!../styles/loaded.css'], function() {

        // init trunk menu
        trunk.init();

        // adds a class to the body when we scroll fast
        navigationScroll.init({
            autoShowElements: document.querySelectorAll("nav, .main-top")
        });

        window.ozzo = window.ozzo || {}; 
        var extraModules = window.ozzo.extraModules = window.ozzo.extraModules || [];
 
        if (extraModules.length > 0) {
            require(extraModules, function() {
                // tell the world that we are done
                nunt.send("ready");
                measurement.loaded();
            });
        } else {
            // tell the world that we are done
            nunt.send("ready");
            measurement.loaded();
        }
            
    });

});

// @sourceURL=subpage.js
