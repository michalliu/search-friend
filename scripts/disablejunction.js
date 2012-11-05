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

function showJunctionTips() {
    var appbar = document.getElementById('appbar');
    var tips = document.createElement('div');
    tips.style.cssText='margin:17px auto 0px;width:500px;color:#468847;background-color:#DFF0D8;margin-top:17px;padding:8px 35px 8px 14px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);border:1px solid #FBEED5;border-color:#D6E9C6;font-size:14px;line-height:20px;border-radius:4px;';
    tips.innerHTML = '谷歌搜索助手使您可以直连搜索结果中的网址，避免使用谷歌服务器的跳转服务，以加快网页的打开速度和避免发生意外。此提示只会出现一次。<a href="#" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">我知道了</a>';
    appbar.parentNode.insertBefore(tips,appbar);
}

function showBlockTips() {
    var appbar = document.getElementById('appbar');
    var tips = document.createElement('div');
    tips.style.cssText='margin:17px auto 0px;width:500px;color:#B94A48;background-color:#F2DEDE;margin-top:17px;padding:8px 35px 8px 14px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);border:1px solid #FBEED5;border-color:#EED3D7;font-size:14px;line-height:20px;border-radius:4px;';
    tips.innerHTML = '您刚才的搜索请求遭到了中国国家防火墙的阻止，谷歌搜索助手已自动帮你使用谷歌加密搜索服务。此提示只会出现一次。<a href="#" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">我知道了</a>';
    appbar.parentNode.insertBefore(tips,appbar);
}

var junction = 'disableJunctionTipsShown';
var redirect = 'automaticRedirectTipsShown';

chrome.extension.sendRequest({method: 'getLocalStorage', key: junction}, function (response) {
    var value = response.data;
    if (!value) {
        showJunctionTips();
        chrome.extension.sendRequest({method: 'setLocalStorage', key: junction, data: 1});
    }
});

chrome.extension.sendRequest({method: 'getLocalStorage', key: redirect}, function (response) {
    var value = response.data;
    if (!value) {
        showBlockTips();
        chrome.extension.sendRequest({method: 'setLocalStorage', key: redirect, data: 1});
    }
});
