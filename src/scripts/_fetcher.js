var Fetcher = function (options) {
  var o = options;
  this.watch = this.getElementsToWatch(o.watch);
  this.container = this.getContainer(o.container);
  this.title = document.getElementsByTagName('title')[0];
  // content
  this.targetURL = null;
  this.targetTitle = null;
  this.targetContent = null;
  this.targetContentParsed = null;
  // history
  this.state = {
    path: null,
    time: null
  };
  // handler
  this.before = o.before || null;
  this.after = o.after || null;
  // initialize
  this.initialize();
};

Fetcher.prototype.getElementsToWatch = function (string) {
  var s = (string !== undefined) ? string : 'a';
  return document.querySelectorAll(s);
};

Fetcher.prototype.getContainer = function (string) {
  var s = (string !== undefined) ? string : 'body';
  return document.querySelector(s);
};

Fetcher.prototype.getTargetURL = function (element) {
  return element.getAttribute('href');
};

Fetcher.prototype.parseContent = function (content) {
  var html = document.createElement('html');
  html.innerHTML = content;
  return html;
};

Fetcher.prototype.historyHandler = function (url) {
  var _this = this;
  this.state.path = url;
  this.state.time = new Date().getTime();
  history.pushState(_this.state, null, _this.state.path);
};

Fetcher.prototype.update = function (content) {
  var _this = this;
  this.targetTitle = content.getElementsByTagName('title')[0];
  this.container.innerHTML = content.querySelector('.fetcher--container').innerHTML;
  this.title.innerHTML = this.targetTitle.innerHTML;
  this.historyHandler(_this.targetURL);
};

Fetcher.prototype.fetch = function (url) {
  var _this = this;
  fetch(url).then(function (response) {
    return response.text();
  }).then(function (body) {
    _this.targetContent = body;
    _this.targetContentParsed = _this.parseContent(_this.targetContent);
    _this.update(_this.targetContentParsed);
    if(_this.after){
      _this.after();
    }
  });
};

Fetcher.prototype.bindEvent = function (arr) {
  var i;
  var l = arr.length;
  var _this = this;
  for (i = 0; i < l; i++) {
    arr[i].addEventListener('click', function (event) {
      event.preventDefault();
      _this.targetURL = _this.getTargetURL(this);
      if (_this.targetURL !== window.location.pathname.split('/')[1]) {
        if (_this.before !== undefined) {
          _this.before(function () {
            _this.fetch(_this.targetURL);
          });
        } else {
          _this.fetch(_this.targetURL);
        }
      }
    });
  }
  window.addEventListener('popstate', function (event) {
    if (event.state) {
      _this.targetURL = event.state.path;
    } else {
      _this.targetURL = '/';
    }
    if (_this.before !== undefined) {
      _this.before(function () {
        _this.fetch(_this.targetURL);
      });
    } else {
      _this.fetch(_this.targetURL);
    }
  });
};

Fetcher.prototype.initialize = function () {
  this.bindEvent(this.watch);
};
