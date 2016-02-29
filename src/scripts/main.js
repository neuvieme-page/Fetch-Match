(function () {
  'use strict';
  var fetcher;
  window.onload = function () {
    fetcher = new Fetcher({
      watch: '.fetcher--link',
      container: '.fetcher--container',
      before: function (done) {
        done();
      },
      after: function () {}
    });
  };
})();
