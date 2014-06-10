/*global document,console,chrome,Sizzle*/
function modifyLink() {
	document.body.removeEventListener('DOMSubtreeModified', modifyLink);
	var i=0,
		l,href,
		md,
		mda = 'onmousedown',
		links = Sizzle('.g .r a'); // webpage search
	var cl;
	if (links.length >= 0) {
		for(;i < links.length;i++) {
			l = links[i],
			md = l.getAttribute(mda);
			if (md) {
				l.removeAttribute(mda);
			} else {
				cl = document.createElement("a");
				cl.className=l.className;
				cl.href=l.getAttribute("href");
				cl.setAttribute("target","_blank");
				cl.innerHTML=l.innerHTML;
				l.parentNode.insertBefore(cl,l);
				l.parentNode.removeChild(l);
			}
		}
	}

	// image search
	links = Sizzle(".irc_vpl.irc_but"). // Visit Page Button
		concat(Sizzle(".irc_fsl.irc_but")).
		concat(Sizzle(".irc_mutc .irc_mutl")); // Visit Image Button

	if(links.length >= 0) {
		for (i=0;i<links.length;i++){
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
