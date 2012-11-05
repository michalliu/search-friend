/*global document*/
var appbar = document.getElementById('appbar');
var tips = document.createElement('div');
tips.style.cssText='margin:17px auto 0px;width:500px;color:#B94A48;background-color:#F2DEDE;margin-top:17px;padding:8px 35px 8px 14px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);border:1px solid #FBEED5;border-color:#EED3D7;font-size:14px;line-height:20px;border-radius:4px;';
tips.innerHTML = '您刚才的搜索请求遭到了中国国家防火墙的阻止，谷歌搜索助手已自动帮你使用谷歌加密搜索服务。此提示只会出现一次。<a href="#" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">我知道了</a>';
appbar.parentNode.insertBefore(tips,appbar);
