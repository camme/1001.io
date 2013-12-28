
define([
    'fontlist', 
    'csslist',
    "measurement",
    "navigation-scroll"
],function(ignore, igonre, measurement, navigationScroll) {

    require(['smartcss!../styles/loaded.css'], function() {

        // init trunk menu
        //trunk.init();
        measurement.loaded();

        // adds a class to the body when we scroll fast
        navigationScroll.init({
            autoShowElements: document.querySelectorAll("nav, .main-top")
        });

    });

});

// @sourceURL=main.js
