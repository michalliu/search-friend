/*global window,chrome,document,console,localStorage,console*/

// https://developer.chrome.com/extensions/notifications
// https://developer.chrome.com/extensions/webRequest

var NOTIFICATION_TYPE={
	BLOCKED: "block"
};

function resolveProblemFor(url){
	var ret=url.replace(/(https?):\/\/(.*?)\/(.*)/,"http://203.208.46.200/$3");
	return ret;
}

function showNotification(title, message, buttons, notificationId) {
	title = title || "谷歌搜索助手提示";
	if(chrome.notifications) {
		var opt = {
			type: "basic",
			title: title,
			message: message,
			iconUrl: "",
			buttons: buttons
		};
		chrome.notifications.create(notificationId, opt, function(){});
	} else if(window.webkitNotifications) {
		var notification = window.webkitNotifications.createNotification(
			'',  // icon url - can be relative
			title || '',  // notification title
			message || ''  // notification body text
		);
		notification.show();
	}
}

function isBlockNotificationDisabled() {
	return localStorage.getItem('disableBlockNotification') == 1;
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
	var tabid = details.tabId;
	var url = details.url;
	if(isBlockNotificationDisabled()){
		chrome.tabs.update(tabid,{url: resolveProblemFor(url)});
	}
},{
		urls: ['<all_urls>'],
		types:['main_frame']
});

chrome.webRequest.onErrorOccurred.addListener(
	function(details) {
		var blockingErrors = ['net::ERR_CONNECTION_RESET',
	'net::ERR_EMPTY_RESPONSE',
	"net::ERR_ABORTED",
	'net::ERR_SOCKET_NOT_CONNECTED',
	'net::ERR_CONNECTION_TIMED_OUT'];
		var tabid,url;
		if (blockingErrors.indexOf(details.error) !== -1) {
			// We were blocked
			tabid = details.tabId;
			url = details.url;
			chrome.tabs.update(tabid,{url: resolveProblemFor(url)});
			if (!isBlockNotificationDisabled()) {
				showNotification(null,'您刚才使用谷歌服务时发生异常, 助手已尽力帮你解决。如仍不能访问，请使用代理软件或vpn访问。',[{
					"title": "点击此处以后不再出现此提示，并且以后自动解决此类问题"
				}],NOTIFICATION_TYPE.BLOCKED+Math.random());
			}
		}
	},
	{
		urls: ['<all_urls>'],
		types:['main_frame']
	});

chrome.notifications.onButtonClicked.addListener(function (nId, bIndex){
	if (nId && nId.indexOf(NOTIFICATION_TYPE.BLOCKED === 0)) {
		if (bIndex === 0) { // 禁用提示
			localStorage.setItem('disableBlockNotification',1);
		}
	}
});
