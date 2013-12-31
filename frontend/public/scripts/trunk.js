define(function(require) {

    function init() {

        var items = document.querySelectorAll('.slide-right, .slide-left');

        var content = document.querySelector('.content');

        var open = function() {
            for(var i = 0, ii = items.length; i < ii; i++){
                var currentClasses = items[i].getAttribute("class");
                currentClasses = currentClasses.replace(/close/g, "");
                currentClasses = currentClasses.replace(/open/g, "");
                currentClasses += " open"; 
                items[i].setAttribute("class", currentClasses);
            }
        }

        var close = function() { 
            for(var i = 0, ii = items.length; i < ii; i++){
                var currentClasses = items[i].getAttribute("class");
                currentClasses = currentClasses.replace(/close/g, "");
                currentClasses = currentClasses.replace(/open/g, "");
                currentClasses += " close"; 
                items[i].setAttribute("class", currentClasses);
            }
        }

        function doToggle(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation()
            }
            if (content.getAttribute("class").indexOf('open') > -1) {
                close();
            } else {
                open();
            }
        }

        var toggle = document.querySelector("#nav-toggle");
        if (toggle) {
            toggle.addEventListener("touchstart", doToggle);
            toggle.addEventListener("click", doToggle);
        }

        window.doToggle = doToggle;

        //content.click(function(){
        //if (content.hasClass('open')) {$(close)}
        //});

    }

    return {
        init: init
    };


});


// @sourceURL=trunk.js
