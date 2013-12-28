define(function(require) {

    function loaded() {

        // measure load times
        var now = new Date();
        var delta = now.getTime() - ozzo.i.getTime();
        ozzo.delta = delta;
        ozzo.end = now;
        if (localStorage && localStorage.log == "true") {
            console.log("Load time: %s", delta);
        }

    }

    return {
        loaded: loaded
    }

});
