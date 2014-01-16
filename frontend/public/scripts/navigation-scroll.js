define(function() {

    var pastTime = new Date();
    var slowTime = null;
    var pastY = 0;
    var speedLimit = 1;
    var waitForSlow = 500;

    var slowClassToAdd = "slow-scroll";
    var fastClassToAdd = "fast-scroll";

    var body = document.body;
    var slow = false
    var switchToSlow = false;

    var autoShowElements = [];

    function scroll(e) {

        var presentTime = new Date();
        var presentY = document.documentElement.scrollTop;

        var deltaY = presentY - pastY;
        var deltaTime = presentTime.getTime() - pastTime.getTime();
        var speed = deltaY / deltaTime;

        var currentClasses = document.body.getAttribute("class");

        if (!currentClasses) {
            currentClasses = "";
        }

        if (speed < 0 && slow || presentY < 50) {
            if (currentClasses.indexOf(fastClassToAdd) == -1) {
                currentClasses = currentClasses.replace(slowClassToAdd, "").replace(/\s\s/g, "");
                currentClasses = currentClasses.replace(/(^\s+|\s+$)/, "");
                document.body.setAttribute('class', currentClasses);
            }
            slow = false;
            slowTime = null;
        }
        else if (speed >= 0 && !slow) {
            if (!slowTime) {
                slowTime = new Date();
            }
            if (!switchToSlow && presentTime.getTime() - slowTime.getTime() > waitForSlow) {
                switchToSlow = true;
            }
        }

        if (switchToSlow) {
            switchToSlow = false;
            slow = true;
            currentClasses = currentClasses.replace(fastClassToAdd, "").replace(/\s\s/g, "");
            currentClasses += " " + slowClassToAdd;
            currentClasses = currentClasses.replace(/(^\s+|\s+$)/, "");
            document.body.setAttribute('class', currentClasses);
        }

        pastTime = presentTime;
        pastY = presentY;


    }

    function init(options) {

        options = options || {};
        speedLimit = options.speedLimit || speedLimit;

        slowClassToAdd = options.slowClassToAdd || slowClassToAdd;
        fastClassToAdd = options.fastClassToAdd || fastClassToAdd;

        waitForSlow = options.waitForSlow || waitForSlow;

        autoShowElements = options.autoShowElements || autoShowElements;

        for(var i = 0, ii = autoShowElements.length; i < ii; i++){

            var element = autoShowElements[i];
            element.addEventListener('mouseenter', function() {

                var currentClasses = document.body.getAttribute("class");
                if (!currentClasses) {
                    currentClasses = "";
                }
                currentClasses = currentClasses.replace(slowClassToAdd, "").replace(/\s\s/g, "");
                currentClasses = currentClasses.replace(/(^\s+|\s+$)/, "");
                document.body.setAttribute('class', currentClasses);

                slow = false;
                slowTime = null;

            }, false);

        }

        window.addEventListener("scroll", scroll, false);

    }

    return {
        init: init
    };

});

