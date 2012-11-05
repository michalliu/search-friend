/*global document,console,chrome,Sizzle*/
document.body.addEventListener('DOMSubtreeModified',function () {

    var i=0,

        l,

        md,

        mda = 'onmousedown',

        links = Sizzle('.g .r a');

    if (links.length >= 0) {

        for(;i < links.length;i++) {

            l = links[i],

            md = l.getAttribute(mda);

            if (md) l.removeAttribute(mda);

        }

    }

});

function showTips() {
    var appbar = document.getElementById('appbar');
    var tips = document.createElement('div');
    tips.style.cssText='margin:17px auto 0px;width:500px;color:#468847;background-color:#DFF0D8;margin-top:17px;padding:8px 35px 8px 14px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);border:1px solid #FBEED5;border-color:#D6E9C6;font-size:14px;line-height:20px;border-radius:4px;';
    tips.innerHTML = '谷歌搜索助手使您可以直连搜索结果中的网址，避免使用谷歌服务器的跳转服务，以加快网页的打开速度和避免发生意外。此提示只会出现一次。<a href="#" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">我知道了</a>';
    appbar.parentNode.insertBefore(tips,appbar);
}

var key = 'disableJunctionTipsShown';

chrome.extension.sendRequest({method: 'getLocalStorage', key: key}, function (response) {
	console.log(response);
    var value = response.data;
    if (!value) {
        showTips();
        chrome.extension.sendRequest({method: 'setLocalStorage', key: key, data: 1});
    }
});

