/**
 * Basic parser for URL properties
 * @author Miller Medeiros
 * @version 0.1.0 (2011/12/06)
 * MIT license
 */

define([],function(){function e(e){for(var n,s={};n=t.exec(e);)s[n[1]]=r(n[2]||n[3]);return s}function r(e){return n.test(e)?e=e.replace(n,"$1").split(","):"null"===e?e=null:"false"===e?e=!1:"true"===e?e=!0:""===e||"''"===e||'""'===e?e="":isNaN(e)||(e=+e),e}var t=/([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g,n=/^\[([^\]]+)\]$/;return{parseProperties:e,typecastVal:r}});