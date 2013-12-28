/** @license
 * RequireJS plugin for loading web fonts using the WebFont Loader
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 */

define(["propertyParser"],function(t){function o(o){for(var n,i={},r=o.split("|"),a=r.length;a--;)n=e.exec(r[a]),i[n[1]]=t.parseProperties(n[2]);return i}var e=/^([^,]+),([^\|]+)\|?/;return{load:function(t,e,n,i){if(i.isBuild)n(null);else{var r=o(t);r.active=n,r.inactive=function(){n(!1)},e([("https:"===document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"],function(){WebFont.load(r)})}}}});