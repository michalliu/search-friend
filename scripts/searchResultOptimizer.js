/*global document,console,chrome,Sizzle*/
function modifyLink() {
	document.body.removeEventListener('DOMSubtreeModified', modifyLink);
	var i=0,
		l,
		md,
		mda = 'onmousedown',
		links = Sizzle('.g .r a');
	var cl;
	if (links.length >= 0) {
		for(;i < links.length;i++) {
			l = links[i],
			md = l.getAttribute(mda);
			if (md) {
				l.removeAttribute(mda);
			} else {
				cl = document.createElement("a");
				cl.href=l.getAttribute("href");
				cl.setAttribute("target","_blank");
				cl.innerHTML=l.innerHTML;
				l.parentNode.insertBefore(cl,l);
				l.parentNode.removeChild(l);
			}
		}
	}
	document.body.addEventListener('DOMSubtreeModified', modifyLink);
}
document.body.addEventListener('DOMSubtreeModified', modifyLink);
