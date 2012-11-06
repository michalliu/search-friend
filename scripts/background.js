/*global chrome,document,console,localStorage*/

function toSSL(url) {
	return url.replace(/^http:/,'https:');
}

chrome.webRequest.onErrorOccurred.addListener(
    function(details) {
        var blockingErrors = ['net::ERR_CONNECTION_RESET', 'net::ERR_EMPTY_RESPONSE','net::ERR_SOCKET_NOT_CONNECTED'];
        var tabid,url;
		console.log(details);
        if (blockingErrors.indexOf(details.error) !== -1) {
            // We were blocked
            tabid = details.tabId;
			url = details.url;
            chrome.tabs.update(tabid,{url: toSSL(url)});
        }
    },
    {
		urls: ['<all_urls>'],
		types:['main_frame']
	});
