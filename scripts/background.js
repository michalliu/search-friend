/*global chrome,document,console,localStorage*/
// This function creates a new anchor element and uses location
// properties (inherent) to get the desired URL data. Some String
// operations are used (to normalize results across browsers).
 
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })()
     };
}

function generateSafeGoogleSearchURL(q) {
    return 'https://www.google.com.hk/search?q=' + q;
}

chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
      var handledErrors = ['net::ERR_CONNECTION_RESET', 'net::ERR_EMPTY_RESPONSE'];
      var q, tabid;
      var automaticRedirectTipsShown = localStorage.getItem('automaticRedirectTipsShown');
      if (handledErrors.indexOf(details.error) !== -1) {
          q = decodeURIComponent(parseURL(details.url).params.q);
          tabid = details.tabId;
          chrome.tabs.update(tabid,{url: generateSafeGoogleSearchURL(q)}, function () {
              if (!automaticRedirectTipsShown) {
                  try {
                      chrome.tabs.executeScript(tabid, { file: '/scripts/showtip.js'});
                  } catch (ex) {}
              }
          });
      }
  },
  {urls: ['<all_urls>'],types:['main_frame']});

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var data;
    if (request.method === 'getLocalStorage') {
        data = localStorage.getItem(request.key);
    } else if(request.method === 'setLocalStorage') {
        localStorage.setItem(request.key,request.data);
    }
    sendResponse({data: data});
});
