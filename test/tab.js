var assert = require("assert")
  , zdom = require('../index');

describe('Tabs', function(){

  var tab;

  beforeEach(function () {
    tab = new zdom.tab();
  })

  describe('#navigate()', function(){
    it('should load zepto when no library is set', function(done){
      tab
        .navigate('http://google.com')
        .then(function (window) {
          assert(window.Zepto)
          done();
        })
        .fail(function (err) {
          done(err);
        });
    })

    it('should load zepto when zepto is set', function(done){
      tab
        .set('library', 'zepto')
        .navigate('http://google.com')
        .then(function (window) {
          assert(window.Zepto)
          done();
        })
        .fail(function (err) {
          done(err);
        });
    })

    it('should load jquery when jquery is set', function(done){
      tab
        .set('library', 'jquery')
        .navigate('http://google.com')
        .then(function (window) {
          assert(window.jQuery)
          done();
        })
        .fail(function (err) {
          done(err);
        });
    })

  })
})