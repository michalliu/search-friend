q = /&q=([^&]*)/i.exec(location.search)

if (q && q.length > 1) {

	location.replace("https://www.google.com/search?hl=zh-CN&q=" + q[1]);

}