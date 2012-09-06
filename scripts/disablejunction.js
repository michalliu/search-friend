document.body.addEventListener("DOMSubtreeModified",function (e) {

    var i=0,

        l,

        md,

        mda = "onmousedown",

        links = Sizzle(".g .r a");

    if (links.length >= 0) {

        for(;i < links.length;i++) {

            l = links[i],

            md = l.getAttribute(mda);

            if (md) l.removeAttribute(mda);

        }

    }

});

