var xhr = {
  create: function(method, url) {
    var xhr;
    if ('withCredentials' in xhr) {
      xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== undefined) {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  },
  req: function(params) {
    var xhr = this.create(params.method, params.url);
    if(!xhr) return;
    if(params.onStart){
      xhr.onloadstart = onStart();
    }
    xhr.onload = onComplete(response);
    xhr.onerror = function(event){
      console.log(event)
    }
  }
};
