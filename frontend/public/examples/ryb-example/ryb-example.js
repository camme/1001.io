(function() {

    require(['nunt', '/examples/ryb-example/ryb-color-mixer.js'], function(nunt, rybColorMixer) {
     
       var container = document.getElementById("ryb-all-colours");

       var red ="ff0000"; 
       var yellow = "00ff00"; 
       var blue = "0000ff"; 

       var orange = rybColorMixer.mix(red, yellow);
       var violet = rybColorMixer.mix(blue, red);
       var green = rybColorMixer.mix(blue, yellow);

       var redOrange = rybColorMixer.mix(red, orange);
       var orangeYellow = rybColorMixer.mix(orange, yellow);
       var yellowGreen = rybColorMixer.mix(yellow, green);
       var greenBlue = rybColorMixer.mix(green, blue);
       var blueViolet = rybColorMixer.mix(blue, violet);
       var violetRed = rybColorMixer.mix(violet, red);

       addColour(container, red);
       addColour(container, redOrange);
       addColour(container, orange);
       addColour(container, orangeYellow);
       addColour(container, yellow);
       addColour(container, yellowGreen);
       addColour(container, green);
       addColour(container, greenBlue);
       addColour(container, blue);
       addColour(container, blueViolet);
       addColour(container, violet);
       addColour(container, violetRed);

       function addColour(parent, colour) {
           var rgb = rybColorMixer.rybToRgb(colour, {hex: true});
           var div = document.createElement("div");
           div.className = "colour-box";
           var colourDiv = document.createElement("div");
           colourDiv.className = "colour";
           colourDiv.style.backgroundColor = "#" + rgb;
           colourDiv.innerHTML = "ryb: #" + colour + "<br/>rgb: #" + rgb;
           div.appendChild(colourDiv);
           parent.appendChild(div);
       }

    });


})();
