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


        var links = document.querySelectorAll(".main-list .post, .main-list .project");
        for(var i = 0, ii = links.length; i < ii; i++){
            var link = links[i];
            link.addEventListener("click", function() {
                var url = this.getAttribute("data-url");
                location.href = url;
            }, false);
            //link.addEventListener("touchstart", function() {
                //var url = this.getAttribute("data-url");
                //location.href = url;
            //}, false);
        }

    });

});

// @sourceURL=main.js
