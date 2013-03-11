

var tests = [];

tests.push(function (tab, done) {
  /**
   * standard navigate
   */
  tab
    .navigate('http://google.com')
    .then(function (window) {
      done(window.jQuery ? new Error('it seems that jquery was still included...') : undefined);
    })
    .fail(function (err) {
      done(err);
    });

});

tests.push(function (tab, done) {
  /**
   * use the actual jquery library
   */
  tab
    .set('library', 'jquery')
    .navigate('http://google.com')
    .then(function (window) {
      done(window.jQuery ? undefined : new Error('jQuery is not available on the window'));
    })
    .fail(function (err) {
      done(err);
    });

});

tests.push(function (tab, done) {
  /**
   * using a url
   */
  tab
    .set('library', 'http://code.jquery.com/jquery-1.9.1.min.js')
    .navigate('http://google.com')
    .then(function (window) {
      try {
        done(window.jQuery ? undefined : new Error('jQuery is not available on the window'));
      } catch(excep) {
        done(excep);
      }
    })
    .fail(function (err) {
      done(err);
    });

});


var Tab = require('./tab');
var i = 1;
require('async').forEachSeries(tests,
function (test, done) {
  console.log('running test '+i)
  var tab = new Tab();
  try {
    test(tab, done);
  } catch (err) {
    done(err);
  }
  i++;
},
function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('PASSED');
  }
});