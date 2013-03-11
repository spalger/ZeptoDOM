# ZeptoDOM

ZeptoDOM or zdom is a simple Node.js module for accessing the contents of pages using
[Zepto 1.0](https://github.com/madrobby/zepto/) or
[jQuery 1.9.1](https://github.com/jquery/jquery/).

Currently zdom simply wraps jsdom. It was developed to as a piece of a crawler
I'm working on and is designed to have a small features set.

## usage:

```JavaScript
var zdom = require('zdom');

var tab = new zdom.tab();

tab
  .set('library', 'jquery') // the default is 'zepto', anything should be a [jsdom scripts arg](https://github.com/tmpvar/jsdom#how-it-works)
  // TODO .set('follow redirects', true)
  // TODO .set('user agent', 'chrome')
  .navigate('http://google.com') // returns a q promise
  .then(function ($, window) {
    tab
      .navigate($('.result').get(0).href)
      .then(function(){
        //down the rabbit hole you go
      })
  })
  .fail(function (error) {
    console.log('fall back, fall back!');
  });

```