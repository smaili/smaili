window.cube=function(u){function v(){var f=a.createElement("div").style,b=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],d=!1;for(p in b)if(void 0!==f[b[p]]){d=!0;break}if(d&&"webkitPerspective"in a.documentElement.style){var b=a.createElement("style"),c=a.createElement("div"),e;b.textContent="@media (transform-3d),(-webkit-transform-3d),(-moz-transform-3d),(-o-transform-3d),(-ms-transform-3d),(-khtml-transform-3d),(modernizr){#modernizr{height:3px}}";
(a.head||a.getElementsByTagName("head")[0]).appendChild(b);c.id="modernizr";a.documentElement.appendChild(c);e=3===c.offsetHeight;b.parentNode.removeChild(b);c.parentNode.removeChild(c);e||(d=!1)}b="transitionProperty WebkitTransitionProperty MozTransitionProperty OTransitionProperty msTransitionProperty KhtmlTransitionProperty".split(" ");c=!1;for(t in b)if(void 0!==f[b[t]]){c=!0;break}if(d&&c)for(t in d=["transform","WebkitTransform","MozTransform","OTransform","msTransform"],d)void 0!==f[d[t]]&&
(k=d[t])}function n(a){switch(a){case 1:e=-90;g=0;break;case 2:g=e=0;break;case 3:e=0;g=-90;break;case 4:e=0;g=-180;break;case 5:e=0;g=90;break;case 6:e=90,g=-180}}function q(){h.style[k]="rotateX("+e+"deg) rotateY("+g+"deg)"}var k,l=u||2,e,g,a=document,h=a.getElementById("mycube"),m=a.getElementById("map").childNodes,r=function(f){if(a.getElementsByClassName)return a.getElementsByClassName(f);if(a.querySelectorAll)return a.querySelectorAll("."+f);var b=[];f=RegExp("(^| )"+f+"( |$)");for(var d=a.getElementsByTagName("*"),
c=0;c<d.length;c++)f.test(d[c].className)&&b.push(d[c]);return b}("face-link"),s=a.getElementById("placeholder"),w=a.getElementById("no_css3");(function(){v();if(k){for(var a=0;a<r.length;a++)r[a].onclick=function(b){b.preventDefault();b=this.attributes;for(var a=!1,c=0;c<b.length;c++)if("data-face"==b[c].name){a=b[c].value;break}b=parseInt(a);if(b!=l){n(b);q();for(a=0;a<m.length;a++)a==b-1?(c=m[a],c.className+=" active"):(c=m[a],c.className=c.className.replace(/(\s|^)active(\s|$)/));l=b}};n(l);q();
s.parentNode.removeChild(s);h.style.display="block";h.className+=" transition"}else w.style.display="block"})()};
