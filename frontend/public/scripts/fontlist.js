
// Dont know why I have to add this to make it load quicker
WebFontConfig = {
  custom: {
    families: ['ozzo'],
    urls: ['/media/fonts/ozzo.css']
  }
};

define([
    "font!google,families:[Raleway:400]"
    //"font!custom,families:[ozzo],urls:[/media/fonts/ozzo.css]"
], function() {
    return {};
});

// @sourceURL=font.js

