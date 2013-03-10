
var Q         = require('q');
var jsdom     = require("jsdom");
var fs        = require('fs');
var zeptoSrc  = fs.readFileSync("./zepto.js").toString();

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
      else defr.resolve(window);
    }
  });
  return defr.promise;
}

module.exports = Tab;
