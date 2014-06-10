/*global document,console,chrome,Sizzle*/
function modifyLink() {
	document.body.removeEventListener('DOMSubtreeModified', modifyLink);
	var i=0,
		l,href,
		links = Sizzle('#irc_mil'); // Image Search Iframe
	var cl;
	if (links.length >= 0) {
		for(;i < links.length;i++) {
			l = links[i];
			href=l.getAttribute("href");
			if (!href) {
				continue;
			}
			cl = document.createElement("a");
			cl.href=href;
			cl.className=l.className;
			cl.setAttribute("target","_blank");
			cl.innerHTML=l.innerHTML;
			l.parentNode.insertBefore(cl,l);
			l.parentNode.removeChild(l);
		}
	}
	document.body.addEventListener('DOMSubtreeModified', modifyLink);
}
document.body.addEventListener('DOMSubtreeModified', modifyLink);
