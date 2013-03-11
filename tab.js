"use strict";

var Q         = require('q');
var jsdom     = require("jsdom");
var fs        = require('fs');
var path      = require('path');
var srcCache  = {};

function Tab () {

  this.set('library', 'zepto');

}

Tab.prototype = {
  libSrc: null
};

Tab.prototype.set = function (option, value) {
  var action = 'setOpt '+option;
  this[action] && this[action].call(this, value);
  return this;
}

Tab.prototype['setOpt library'] = function (lib) {
  switch(lib) {
    case 'jquery':
    case 'zepto':
      this.libSrc = srcCache[lib] || (srcCache[lib] = fs.readFileSync(path.resolve(__dirname, './libs/'+lib+'.js')).toString());
      break;
    default:
      this.libSrc = null;
      this.lib = lib;
      break;
  }
};

Tab.prototype['setOpt follow redirects'] = function () {
  throw new Error('not implemented');
};

Tab.prototype['setOpt user agent'] = function () {
  throw new Error('not implemented');
};


Tab.prototype.navigate = function(url) {
  var defr = Q.defer();
  jsdom.env({
    html: url,
    scripts: this.lib || [],
    src: this.libSrc || [],
    done: function (errors, window) {
      if (errors) defr.reject(errors);
      else if (!window) defr.reject(new Error('Unable to create window'));
      else defr.resolve(window);
    }
  });
  return defr.promise;
}

module.exports = Tab;
