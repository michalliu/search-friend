/*global chrome,document,console,localStorage,webkitNotifications*/

function toSSL(url) {
	return url.replace(/^http:/,'https:');
}

function showNotification(title, message) {
    var notification = webkitNotifications.createNotification(
      '',  // icon url - can be relative
      title || '',  // notification title
      message || ''  // notification body text
    );
    notification.show();
}

chrome.webRequest.onErrorOccurred.addListener(
    function(details) {
        var blockingErrors = ['net::ERR_CONNECTION_RESET', 'net::ERR_EMPTY_RESPONSE','net::ERR_SOCKET_NOT_CONNECTED'];
        var tabid,url;
		var notificationDisabled;
        if (blockingErrors.indexOf(details.error) !== -1) {
            // We were blocked
            tabid = details.tabId;
			url = details.url;
			notificationDisabled = localStorage.getItem('disableNotification');
            chrome.tabs.update(tabid,{url: toSSL(url)});
			if (!notificationDisabled) {
				showNotification(null,'您刚才使用的谷歌服务可能遭到了中国国家防火墙的阻止, 助手已帮你自动转向相应的加密通道。如仍不能访问，请使用代理软件或vpn访问。');
				localStorage.setItem('disableNotification',1);
			}
        }
    },
    {
		urls: ['<all_urls>'],
		types:['main_frame']
	});
