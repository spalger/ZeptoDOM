
var Q         = require('q');
var jsdom     = require("jsdom");
var fs        = require('fs');
var path      = require('path');
var zeptoSrc  = fs.readFileSync(path.resolve(__dirname, "./zepto.js")).toString();

function Tab () {

}

Tab.prototype.navigate = function(url) {
  var defr = Q.defer();
  console.log('navigating to '+url);
  jsdom.env({
    html: url,
    src: [zeptoSrc],
    done: function (errors, window) {
      if (errors) defr.reject(errors);
      else defr.resolve(window.Zepto, window);
    }
  });
  return defr.promise;
}

module.exports = Tab;
