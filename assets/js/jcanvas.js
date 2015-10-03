/*
 jCanvas v13.01.23
 Copyright 2013 Caleb Evans
 Released under the MIT license
*/
(function(d,Y,ca,Q,da,n,y,f,x){function D(){}function E(c){c?A(ea,c):E.prefs=ea=D.prototype=A({},V);return this}function C(c){return c&&c.getContext?c.getContext("2d"):f}function I(c,a){c.fillStyle=a.fillStyle;c.strokeStyle=a.strokeStyle;c.lineWidth=a.strokeWidth;a.rounded?(c.lineCap="round",c.lineJoin="round"):(c.lineCap=a.strokeCap,c.lineJoin=a.strokeJoin,c.miterLimit=a.miterLimit);c.shadowOffsetX=a.shadowX;c.shadowOffsetY=a.shadowY;c.shadowBlur=a.shadowBlur;c.shadowColor=a.shadowColor;c.globalAlpha=
a.opacity;c.globalCompositeOperation=a.compositing;a.imageSmoothing&&(c.webkitimageSmoothingEnabled=c.webkitimageSmoothingEnabled=a.imageSmoothing)}function L(c,a,b){b.closed&&a.closePath();a.fill();"transparent"!==b.fillStyle&&(a.shadowColor="transparent");0!==b.strokeWidth&&a.stroke();b.closed||a.closePath();b._transformed&&a.restore();b.mask&&(b.autosave&&(a.save(),c=M(c),c.transforms.mask=n,c.savedTransforms=A({},c.transforms)),a.clip())}function fa(c,a,b){a._toRad=a.inDegrees?B/180:1;c.translate(a.x,
a.y);c.rotate(a.rotate*a._toRad);c.translate(-a.x,-a.y);b.rotate+=a.rotate*a._toRad}function ga(c,a,b){1!==a.scale&&(a.scaleX=a.scaleY=a.scale);c.translate(a.x,a.y);c.scale(a.scaleX,a.scaleY);c.translate(-a.x,-a.y);b.scaleX*=a.scaleX;b.scaleY*=a.scaleY}function ha(c,a,b){a.translate&&(a.translateX=a.translateY=a.translate);c.translate(a.translateX,a.translateY);b.translateX+=a.translateX;b.translateY+=a.translateY}function J(c,a,b,g){a._toRad=a.inDegrees?B/180:1;a._transformed=n;c.save();g===x&&(g=
b);!a.fromCenter&&!a._centered&&(a.x+=b/2,a.y+=g/2,a._centered=n);a.rotate&&fa(c,a,{});(1!==a.scale||1!==a.scaleX||1!==a.scaleY)&&ga(c,a,{});(a.translate||a.translateX||a.translateY)&&ha(c,a,{})}function M(c){var a;G.canvas===c&&G._data?a=G._data:(a=d.data(c,"jCanvas"),a||(a={layers:[],intersects:[],drag:{},event:{},transforms:{rotate:0,scaleX:1,scaleY:1,translateX:0,translateY:0,mask:y},animating:y,animated:f},a.savedTransforms=A({},a.transforms),d.data(c,"jCanvas",a)),G.canvas=c,G._data=a);return a}
function ia(c,a,b){b&&b.visible&&(b.method===d.fn.draw?b.fn.call(c[0],a):b.method&&b.method.call(c,b))}function H(c,a,b,g){var j,e={},v,F;a._args=b;a.canvas=c;if(a.layer&&!a._layer){j=d(c);b=j.getLayers();a.method=!a.method&&a.type?d.fn[ja[a.type]]:d.fn[a.method]||g;F=M(c);e=A(new D,a);for(v in E.events)E.events.hasOwnProperty(v)&&e[v]&&(v=Z(v),E.events[v](j,F),e._event=n);if(e.draggable||e.cursor){e._event=n;c=["mousedown","mousemove","mouseup"];for(a=0;a<c.length;a+=1)v=Z(c[a]),E.events[v](j,F);
F.mouseout||(j.bind("mouseout.jCanvas",function(){F.drag={};j.drawLayers()}),F.mouseout=n)}e.layer=n;e._layer=n;e.index===x&&(e.index=b.length);b.splice(e.index,0,e)}return e}function ka(c){var a;for(a=0;a<O.length;a+=1)c[O[a]]=c["_"+O[a]]}function la(c,a){var b;for(b=0;b<O.length;b+=1)c["_"+O[b]]=c[O[b]],$[O[b]]=1,a&&delete c[O[b]]}function ma(c){var a,b,g=[],j=1;c.match(/^#?\w+$/i)&&("transparent"===c&&(c="rgba(0,0,0,0)"),b=Y.head,a=b.style.color,b.style.color=c,c=d.css(b,"color"),b.style.color=
a);c.match(/^rgb/i)&&(g=c.match(/\d+/gi),c.match(/%/gi)&&(j=2.55),g[0]*=j,g[1]*=j,g[2]*=j,g[3]=g[3]!==x?da(g[3]):1);return g}function ra(c){var a=3,b;"object"!==typeof c.start&&(c.start=ma(c.start),c.end=ma(c.end));c.now=[];if(1!==c.start[3]||1!==c.end[3])a=4;for(b=0;b<a;b+=1)c.now[b]=c.start[b]+(c.end[b]-c.start[b])*c.pos,3>b&&(c.now[b]=S(c.now[b]));1!==c.start[3]||1!==c.end[3]?c.now="rgba("+c.now.join(",")+")":(c.now.slice(0,3),c.now="rgb("+c.now.join(",")+")");c.elem.nodeName?c.elem.style[c.prop]=
c.now:c.elem[c.prop]=c.now}function Z(c){"ontouchstart"in window&&aa[c]&&(c=aa[c]);return c}function N(c){E.events[c]=function(a,b){c=Z(c);var g="mouseover"===c||"mouseout"===c?"mousemove":c,j=b.event;b[g]||(a.bind(g+".jCanvas",function(b){j.x=b.offsetX;j.y=b.offsetY;j.type=g;j.event=b;console.log("FIRE");a.drawLayers(n);b.preventDefault()}),b[g]=n)}}function K(c,a,b){var g,j,e,v;b=b._args;b._event&&(c=M(c),g=c.event,a=a.isPointInPath(g.x,g.y),j=c.transforms,b.eventX=b.mouseX=g.x,b.eventY=b.mouseY=
g.y,b.event=g.event,v=c.transforms.rotate,g=b.eventX,e=b.eventY,b._eventX=g*R(-v)-e*T(-v),b._eventY=e*R(-v)+g*T(-v),b._eventX/=j.scaleX,b._eventY/=j.scaleY,!a&&(b._hovered&&!b._fired)&&(b._mousedout=n),a&&c.intersects.push(b))}function na(c){"function"===typeof c&&(c={method:d.fn.draw,fn:c});return c}function W(c,a,b,g,j){a.save();a.beginPath();a.rect(g[0],j[0],g[1]-g[0],j[1]-j[0]);a.clip();J(a,b,0);a.beginPath()}function X(c,a,b){b._event&&K(c,a,b);a.restore();L(c,a,b)}function oa(c,a){a.font?c.font=
a.font:(isNaN(Number(a.fontSize))||(a.fontSize+="px"),c.font=a.fontStyle+" "+a.fontSize+" "+a.fontFamily)}function pa(c,a,b,g,j){var e=/\b(\d*\.?\d*)\w\w\b/gi,v;if(G.text===g.text&&G.font===g.font&&G.fontStyle===g.fontStyle&&G.fontSize===g.fontSize&&G.fontFamily===g.fontFamily&&G.maxWidth===g.maxWidth&&G.lineHeight===g.lineHeight)g.width=G.width,g.height=G.height;else if(!a){g.width=b.measureText(j[0]).width;for(a=1;a<j.length;a+=1)v=b.measureText(j[a]).width,v>g.width&&(g.width=v);b=c.style.fontSize;
if(g.font){if(a=g.font.match(e))c.style.fontSize=g.font.match(e)[0]}else c.style.fontSize=g.fontSize;g.height=da(d.css(c,"fontSize"))*j.length*g.lineHeight;c.style.fontSize=b}}var V,ea,A=d.extend,S=Q.round,B=Q.PI,T=Q.sin,R=Q.cos,sa=d.event.fix,aa,ba,ja,G={},O,$;d.fn.jCanvas=E;E.events={};V={align:"center",autosave:n,baseline:"middle",bringToFront:y,ccw:y,closed:y,compositing:"source-over",cornerRadius:0,cropFromCenter:n,disableDrag:y,disableEvents:y,domain:f,draggable:y,data:{},each:f,end:360,fillStyle:"transparent",
font:"",fontStyle:"normal",fontSize:"12pt",fontFamily:"sans-serif",fromCenter:n,fn:f,graph:"y",height:f,imageSmoothing:n,inDegrees:n,lineHeight:1,load:f,mask:y,maxWidth:f,miterLimit:10,opacity:1,projection:0,r1:f,r2:f,radius:0,range:f,repeat:"repeat",rotate:0,rounded:y,scale:1,scaleX:1,scaleY:1,shadowBlur:0,shadowColor:"transparent",shadowX:0,shadowY:0,sHeight:f,sides:3,source:"",start:0,strokeCap:"butt",strokeJoin:"miter",strokeStyle:"transparent",strokeWidth:1,sWidth:f,sx:f,sy:f,text:"",translate:0,
translateX:0,translateY:0,type:f,visible:n,width:f,x:0,y:0};E();E.extend=function(c){E.defaults=A(V,c.props);E();c.name&&(d.fn[c.name]=function b(g){var j,e,v,d=A(new D,g);for(e=0;e<this.length;e+=1)if(j=this[e],v=C(j))g=H(j,d,g,b),I(v,d),c.fn.call(j,v,d);return this});return d.fn[c.name]};d.fn.getLayers=function(){var c=this[0];return!c||!c.getContext?[]:M(c).layers};d.fn.getLayer=function(c){var a=this.getLayers(),b=d.type(c),g,j;if(c&&c.layer)g=c;else if("number"===b)0>c&&(c=a.length+c),g=a[c];
else for(j=0;j<a.length;j+=1)if(a[j].index=j,a[j].name===c||"regexp"===b&&a[j].name.match(c)){g=a[j];break}return g};d.fn.setLayer=function(c,a){var b,g;for(b=0;b<this.length;b+=1)(g=d(this[b]).getLayer(c))&&A(g,a);return this};d.fn.moveLayer=function(c,a){var b,g,j;for(g=0;g<this.length;g+=1)if(b=d(this[g]),j=b.getLayers(),b=b.getLayer(c))j.splice(b.index,1),j.splice(a,0,b),0>a&&(a=j.length+a),b.index=a;return this};d.fn.removeLayer=function(c){var a,b,g;for(b=0;b<this.length;b+=1)a=d(this[b]),g=
a.getLayers(),(a=a.getLayer(c))&&g.splice(a.index,1);return this};d.fn.removeLayers=function(){var c,a;for(c=0;c<this.length;c+=1)a=d(this[c]).getLayers(),a.length=0;return this};d.fn.getLayerGroup=function(c){var a=this.getLayers(),b=d.type(c),g=[],j;if("array"===b)return c;for(j=0;j<a.length;j+=1)a[j].index=j,(a[j].group===c||"regexp"===b&&a[j].group.match(c))&&g.push(a[j]);return g};d.fn.setLayerGroup=function(c,a){var b,g,j;for(g=0;g<this.length;g+=1){b=d(this[g]);b=b.getLayerGroup(c);for(j=0;j<
b.length;j+=1)A(b[j],a)}return this};d.fn.removeLayerGroup=function(c){var a,b,g=d.type(c),j;if(c!==x)for(b=0;b<this.length;b+=1){a=d(this[b]);a=a.getLayers();for(j=0;j<a.length;j+=1)if(a[j].index=j,a[j].group===c||"regexp"===g&&a[j].group.match(c))a.splice(j,1),j-=1}return this};d.fn.drawLayer=function(c){var a,b,g,j;for(a=0;a<this.length;a+=1)g=d(this[a]),b=C(this[a]),j=g.getLayer(c),ia(g,b,j);return this};d.fn.drawLayers=function(c){var a,b,g,j,e,v,F,s,w;for(b=0;b<this.length;b+=1)if(a=d(this[b]),
g=C(this[b])){F=M(this[b]);a.clearCanvas();j=F.layers;for(v=0;v<j.length;v+=1)e=j[v],e.index=v,c&&(e._fired=y),e._event=!e.disableEvents,ia(a,g,e),e._mousedout&&(e._mousedout=y,e._fired=n,e._hovered=y,e.mouseout&&e.mouseout.call(this[b],e),e.cursor&&e._cursor&&a.css({cursor:e._cursor}));e=F.intersects[F.intersects.length-1]||{};g=F.event;v=g.type;e[v]||ba[v]&&(v=ba[v]);w=e[v];s=F.drag;if(e._event){if((e.mouseover||e.mouseout||e.cursor)&&!e._hovered&&!e._fired)e._fired=n,e._hovered=n,e.mouseover&&
e.mouseover.call(this[b],e),e.cursor&&(e._cursor=a.css("cursor"),a.css({cursor:e.cursor}));w&&!e._fired&&(e._fired=n,w.call(this[b],e),g.type=f);if(e.draggable&&!e.disableDrag&&("mousedown"===v||"touchstart"===v))e.bringToFront&&(j.splice(e.index,1),e.index=j.push(e)),s.layer=e,s.dragging=n,s.startX=e.startX=e.x,s.startY=e.startY=e.y,s.endX=e.endX=e._eventX,s.endY=e.endY=e._eventY,e.dragstart&&e.dragstart.call(this[b],e)}if(s.layer){if(s.dragging&&("mouseup"===v||"touchend"===v))s.layer.dragstop&&
s.layer.dragstop.call(this[b],s.layer),F.drag={};if(s.dragging&&("mousemove"===v||"touchmove"===v))s.layer.x=s.layer._eventX-(s.endX-s.startX),s.layer.y=s.layer._eventY-(s.endY-s.startY),s.layer.drag&&s.layer.drag.call(this[b],s.layer)}F.intersects=[]}return this};d.fn.addLayer=function(c){var a,b;c=na(c);var g=A(new D,c);for(a=0;a<this.length;a+=1)if(b=C(this[a]))g.layer=n,c=H(this[a],g,c);return this};O=["width","height","opacity","lineHeight"];$={};d.fn.animateLayer=function(){function c(a,b,c){return function(){ka(c);
(!b.animating||b.animated===c)&&a.drawLayers();e[4]&&e[4].call(a[0],c);c._animating=y;b.animating=y;b.animated=f}}function a(a,b,c){return function(g,j){ka(c);!c._animating&&!b.animating&&(c._animating=n,b.animating=n,b.animated=c);(!b.animating||b.animated===c)&&a.drawLayers();e[5]&&e[5].call(a[0],g,j,c)}}var b,g,j,e=[].slice.call(arguments,0),v;"object"===typeof e[0]&&!e[0].layer&&e.unshift(0);"object"===typeof e[2]?(e.splice(2,0,e[2].duration||f),e.splice(3,0,e[3].easing||f),e.splice(4,0,e[4].complete||
f),e.splice(5,0,e[5].step||f)):(e[2]===x?(e.splice(2,0,f),e.splice(3,0,f),e.splice(4,0,f)):"function"===typeof e[2]&&(e.splice(2,0,f),e.splice(3,0,f)),e[3]===x?(e[3]=f,e.splice(4,0,f)):"function"===typeof e[3]&&e.splice(3,0,f));e[1]=A({},e[1]);la(e[1],n);for(g=0;g<this.length;g+=1)if(b=d(this[g]),j=C(this[g]))if(j=M(this[g]),(v=b.getLayer(e[0]))&&v.method!==d.fn.draw)la(v),v.style=$,d(v).animate(e[1],{duration:e[2],easing:d.easing[e[3]]?e[3]:f,complete:c(b,j,v),step:a(b,j,v)});return this};d.fn.animateLayerGroup=
function(c){var a,b,g=[].slice.call(arguments,0),j,e;for(b=0;b<this.length;b+=1){a=d(this[b]);j=a.getLayerGroup(c);for(e=0;e<j.length;e+=1)a.animateLayer.apply(a,[j[e]].concat(g.slice(1)))}};d.fn.delayLayer=function(c,a){var b,g;a=a||0;for(b=0;b<this.length;b+=1)g=d(this[b]).getLayer(c),d(g).delay(a);return this};d.fn.delayLayerGroup=function(c,a){var b,g,j,e;a=a||0;for(g=0;g<this.length;g+=1){b=d(this[g]);j=b.getLayerGroup(c);for(e=0;e<j.length;e+=1)b.delayLayer.call(b,j[e],a)}};d.fn.stopLayer=function(c,
a){var b,g;for(b=0;b<this.length;b+=1)g=d(this[b]).getLayer(c),d(g).stop(a);return this};d.fn.stopLayerGroup=function(c,a){var b,g,j,e;for(g=0;g<this.length;g+=1){b=d(this[g]);j=b.getLayerGroup(c);for(e=0;e<j.length;e+=1)b.stopLayer.call(b,j[e],a)}};var qa="color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor fillStyle outlineColor strokeStyle shadowColor".split(" "),U;for(U=0;U<qa.length;U+=1)d.fx.step[qa[U]]=ra;aa={mousedown:"touchstart",mouseup:"touchend",
mousemove:"touchmove"};ba={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"};N("click");N("dblclick");N("mousedown");N("mouseup");N("mousemove");N("mouseover");N("mouseout");N("touchstart");N("touchmove");N("touchend");d.event.fix=function(c){var a,b;c=sa.call(d.event,c);if(a=c.originalEvent)if(b=a.changedTouches,c.pageX!==x&&c.offsetX===x){if(a=d(c.target).offset())c.offsetX=c.pageX-a.left,c.offsetY=c.pageY-a.top}else if(b&&(a=d(a.target).offset()))c.offsetX=b[0].pageX-a.left,c.offsetY=
b[0].pageY-a.top;return c};ja={arc:"drawArc",bezier:"drawBezier",circle:"drawArc",ellipse:"drawEllipse","function":"draw",image:"drawImage",line:"drawLine",polygon:"drawPolygon",quadratic:"drawQuadratic",rectangle:"drawRect",text:"drawText",vector:"drawVector"};d.fn.draw=function a(b){var g,j;b=na(b);var e=A(new D,b);for(g=0;g<this.length;g+=1)if((j=C(this[g]))&&e.fn)b=H(this[g],e,b,a),e.visible&&e.fn.call(this[g],j);return this};d.fn.clearCanvas=function(a){var b,g=A(new D,a);for(a=0;a<this.length;a+=
1)if(b=C(this[a]))b.setTransform(1,0,0,1,0,0),!g.x||!g.y||!g.width||!g.height?b.clearRect(0,0,this[a].width,this[a].height):b.clearRect(g.x-g.width/2,g.y-g.height/2,g.width,g.height),b.restore();return this};d.fn.saveCanvas=function(){var a,b,g;for(a=0;a<this.length;a+=1)if(b=C(this[a]))g=M(this[a]),b.save(),g.savedTransforms=A({},g.transforms);return this};d.fn.restoreCanvas=function(){var a,b,g;for(a=0;a<this.length;a+=1)if(b=C(this[a]))g=M(this[a]),b.restore(),g.transforms=A({},g.savedTransforms);
return this};d.fn.restoreCanvasOnRedraw=function(a){var b={layer:n,fn:function(){d(this).restoreCanvas()}};A(b,a);return this.draw(b)};d.fn.translateCanvas=function(a){var b,g=A(new D,a),j;for(a=0;a<this.length;a+=1)if(b=C(this[a]))j=M(this[a]),g.autosave&&b.save(),ha(b,g,j.transforms);return this};d.fn.scaleCanvas=function(a){var b,g=A(new D,a),j;for(a=0;a<this.length;a+=1)if(b=C(this[a]))j=M(this[a]),g.autosave&&b.save(),ga(b,g,j.transforms);return this};d.fn.rotateCanvas=function(a){var b,g=A(new D,
a),j;for(a=0;a<this.length;a+=1)if(b=C(this[a]))j=M(this[a]),g.autosave&&b.save(),fa(b,g,j.transforms);return this};d.fn.drawRect=function b(g){var j,e,d=A(new D,g),f,s,w,z,t;for(j=0;j<this.length;j+=1)if(e=C(this[j]))g=H(this[j],d,g,b),d.visible&&(I(e,d),J(e,d,d.width,d.height),e.beginPath(),f=d.x-d.width/2,s=d.y-d.height/2,(t=d.cornerRadius)?(d.closed=n,w=d.x+d.width/2,z=d.y+d.height/2,0>w-f-2*t&&(t=(w-f)/2),0>z-s-2*t&&(t=(z-s)/2),e.moveTo(f+t,s),e.lineTo(w-t,s),e.arc(w-t,s+t,t,3*B/2,2*B,y),e.lineTo(w,
z-t),e.arc(w-t,z-t,t,0,B/2,y),e.lineTo(f+t,z),e.arc(f+t,z-t,t,B/2,B,y),e.lineTo(f,s+t),e.arc(f+t,s+t,t,B,3*B/2,y)):e.rect(f,s,d.width,d.height),d._event&&K(this[j],e,d),L(this[j],e,d));return this};d.fn.drawArc=function g(j){var e,d,f=A(new D,j);j=j||{};!f.inDegrees&&360===f.end&&(j.end=f.end=2*B);for(e=0;e<this.length;e+=1)if(d=C(this[e]))j=H(this[e],f,j,g),f.visible&&(I(d,f),J(d,f,2*f.radius),d.beginPath(),d.arc(f.x,f.y,f.radius,f.start*f._toRad-B/2,f.end*f._toRad-B/2,f.ccw),f._event&&K(this[e],
d,f),L(this[e],d,f));return this};d.fn.drawEllipse=function j(e){var d,f,s=A(new D,e),w=4*s.width/3,z=s.height;s.closed=n;for(d=0;d<this.length;d+=1)if(f=C(this[d]))e=H(this[d],s,e,j),s.visible&&(I(f,s),J(f,s,s.width,s.height),f.beginPath(),f.moveTo(s.x,s.y-z/2),f.bezierCurveTo(s.x-w/2,s.y-z/2,s.x-w/2,s.y+z/2,s.x,s.y+z/2),f.bezierCurveTo(s.x+w/2,s.y+z/2,s.x+w/2,s.y-z/2,s.x,s.y-z/2),s._event&&K(this[d],f,s),L(this[d],f,s));return this};d.fn.drawPolygon=function e(d){var f,s,w=A(new D,d),z=2*B/w.sides,
t=B/w.sides,p=t+B/2,q=w.radius*R(z/2),k,l,r;w.closed=n;for(f=0;f<this.length;f+=1)if(s=C(this[f]))if(d=H(this[f],w,d,e),w.visible){I(s,w);J(s,w,2*w.radius);s.beginPath();for(r=0;r<w.sides;r+=1)k=w.x+S(w.radius*R(p)),l=w.y+S(w.radius*T(p)),s.lineTo(k,l),w.projection&&(k=w.x+S((q+q*w.projection)*R(p+t)),l=w.y+S((q+q*w.projection)*T(p+t)),s.lineTo(k,l)),p+=z;w._event&&K(this[f],s,w);L(this[f],s,w)}return this};d.fn.drawLine=function v(d){var f,w,z=A(new D,d),t,p,q;for(f=0;f<this.length;f+=1)if(w=C(this[f]))if(d=
H(this[f],z,d,v),z.visible){I(w,z);J(w,z,0);t=1;for(w.beginPath();n;)if(p=z["x"+t],q=z["y"+t],p!==x&&q!==x)w.lineTo(p+z.x,q+z.y),t+=1;else break;z._event&&K(this[f],w,z);L(this[f],w,z)}return this};d.fn.drawQuadratic=d.fn.drawQuad=function F(d){var f,z,t=A(new D,d),p,q,k,l,r;for(f=0;f<this.length;f+=1)if(z=C(this[f]))if(d=H(this[f],t,d,F),t.visible){I(z,t);J(z,t,0);p=2;z.beginPath();for(z.moveTo(t.x1+t.x,t.y1+t.y);n;)if(q=t["x"+p],k=t["y"+p],l=t["cx"+(p-1)],r=t["cy"+(p-1)],q!==x&&k!==x&&l!==x&&r!==
x)z.quadraticCurveTo(l+t.x,r+t.y,q+t.x,k+t.y),p+=1;else break;t._event&&K(this[f],z,t);L(this[f],z,t)}return this};d.fn.drawBezier=function s(d){var f,t,p=A(new D,d),q,k,l,r,u,m,h,P;for(f=0;f<this.length;f+=1)if(t=C(this[f]))if(d=H(this[f],p,d,s),p.visible){I(t,p);J(t,p,0);q=2;k=1;t.beginPath();for(t.moveTo(p.x1+p.x,p.y1+p.y);n;)if(l=p["x"+q],r=p["y"+q],u=p["cx"+k],m=p["cy"+k],h=p["cx"+(k+1)],P=p["cy"+(k+1)],l!==x&&r!==x&&u!==x&&m!==x&&h!==x&&P!==x)t.bezierCurveTo(u+p.x,m+p.y,h+p.x,P+p.y,l+p.x,r+
p.y),q+=1,k+=2;else break;p._event&&K(this[f],t,p);L(this[f],t,p)}return this};d.fn.drawVector=function w(f){var d,p,q=A(new D,f),k,l,r,u,m;for(d=0;d<this.length;d+=1)if(p=C(this[d]))if(f=H(this[d],q,f,w),q.visible){I(p,q);J(p,q,0);k=1;p.beginPath();u=q.x;m=q.y;for(p.moveTo(q.x,q.y);n;)if(l=q["a"+k],r=q["l"+k],l!==x&&r!==x)l=l*q._toRad-B/2,u+=r*Q.cos(l),m+=r*Q.sin(l),p.lineTo(u,m),k+=1;else break;q._event&&K(this[d],p,q);L(this[d],p,q)}return this};d.fn.drawGraph=function z(d){var p,q,k=A(new D,d),
l,r,u,m,h;for(p=0;p<this.length;p+=1)if((q=C(this[p]))&&k.fn)if(d=H(this[p],k,d,z),k.visible){I(q,k);l=k.graph;r=k.domain;u=k.range;m=this[p].width;h=this[p].height;r===f&&(r=[f,f]);r[0]===f&&(r[0]=0);r[1]===f&&(r[1]=m);u===f&&(u=[f,f]);u[0]===f&&(u[0]=0);u[1]===f&&(u[1]=h);W(p,q,k,r,u);if("y"===l)for(l=r[0]-k.x;l<=r[1]-k.x;l+=1)h=k.fn(l,k),h===f?(X(this[p],q,k),W(p,q,k,r,u)):q.lineTo(l+k.x,h+k.y);else if("x"===l)for(h=u[0]-k.y;h<=u[1]-k.y;h+=1)l=k.fn(h,k),l===f?(X(this[p],q,k),W(p,q,k,r,u)):q.lineTo(l+
k.x,h+k.y);else if("r"===l)for(m=0;m<2*B;m+=B/180)h=k.fn(m,k),l=h*R(m),h*=T(m),l===f||h===f?(X(this[p],q,k),W(q,k,r,u)):q.lineTo(l+k.x,h+k.y);X(this[p],q,k)}};d.fn.drawText=function t(p){var q,k,l=A(new D,p),r,u,m,h;for(q=0;q<this.length;q+=1)if(d(this[q]),k=C(this[q]))if(p=H(this[q],l,p,t),l.visible){I(k,l);k.textBaseline=l.baseline;k.textAlign=l.align;oa(k,l);if(!q&&l.maxWidth!==f){r=k;u=l.text;h=l.maxWidth;var P=u.split(" "),n=void 0,x=[],y="";if(r.measureText(u).width<h||1===P.length)x=[u];else{for(n=
0;n<P.length;n+=1)r.measureText(y+P[n]).width>h&&(""!==y&&x.push(y),y=""),y+=P[n],n!==P.length-1&&(y+=" ");x.push(y)}r=x;r=r.join("\n").replace(/( (\n))|( $)/gi,"$2").split("\n")}else q||(r=String(l.text).split("\n"));pa(this[q],q,k,l,r);J(k,l,l.width,l.height);q||(m=l.x,"left"===l.align?m-=l.width/2:"right"===l.align&&(m+=l.width/2));for(u=0;u<r.length;u+=1)k.shadowColor=l.shadowColor,h=l.y+u*l.height/r.length-(r.length-1)*l.height/r.length/2,k.fillText(r[u],m,h),"transparent"!==l.fillStyle&&(k.shadowColor=
"transparent"),k.strokeText(r[u],m,h);l._event?(k.beginPath(),k.rect(l.x-l.width/2,l.y-l.height/2,l.width,l.height),k.restore(),K(this[q],k,l),k.closePath()):k.restore()}G=l;return this};d.fn.measureText=function(d){var f;f=d!==x&&("object"!==typeof d||d.layer)?this.getLayer(d):A(new D,d);if((d=C(this[0]))&&f.text!==x)oa(d,f),pa(this[0],0,d,f,f.text.split("\n"));return f};d.fn.drawImage=function p(d){function k(p,k,m){return function(){0===k&&(y=n.width/n.height,h.width===f&&h.sWidth===f&&(d.width=
h.width=h.sWidth=n.width),h.height===f&&h.sHeight===f&&(d.height=h.height=h.sHeight=n.height),h.width===f&&h.sWidth!==f&&(h.width=h.sWidth),h.height===f&&h.sHeight!==f&&(h.height=h.sHeight),h.sWidth===f&&h.width!==f&&(d.sWidth=h.sWidth=n.width),h.sHeight===f&&h.height!==f&&(d.sHeight=h.sHeight=n.height),h.sx===f&&(h.sx=h.cropFromCenter?n.width/2:0),h.sy===f&&(h.sy=h.cropFromCenter?n.height/2:0),h.cropFromCenter||(h.sx+=h.sWidth/2,h.sy+=h.sHeight/2),h.sx+h.sWidth/2>n.width&&(h.sx=n.width-h.sWidth/
2),0>h.sx-h.sWidth/2&&(h.sx=h.sWidth/2),0>h.sy-h.sHeight/2&&(h.sy=h.sHeight/2),h.sy+h.sHeight/2>n.height&&(h.sy=n.height-h.sHeight/2),h.width!==f&&h.height===f?d.height=h.height=h.width/y:h.width===f&&h.height!==f?d.width=h.width=h.height*y:h.width===f&&h.height===f&&(d.width=h.width=n.width,d.height=h.height=n.height));J(m,h,h.width,h.height);m.drawImage(n,h.sx-h.sWidth/2,h.sy-h.sHeight/2,h.sWidth,h.sHeight,h.x-h.width/2,h.y-h.height/2,h.width,h.height);m.fillStyle="transparent";m.beginPath();m.rect(h.x-
h.width/2,h.y-h.height/2,h.width,h.height);h._event&&K(l[k],m,h);L(l[k],m,h);h.load&&h.load.call(p,d)}}var l=this,r,u,m,h=A(new D,d),n,x,y;r=h.source;x=r.getContext;r.src||x?n=r:r&&(n=new ca,n.src=r);for(u=0;u<l.length;u+=1)if(r=l[u],m=C(l[u]))d=H(l[u],h,d,p),h.visible&&(I(m,h),n&&(n.complete||x?k(r,u,m)():(n.onload=k(r,u,m),n.src=n.src)));return l};d.fn.createPattern=d.fn.pattern=function(d){function q(){m=l.createPattern(u,r.repeat);r.load&&r.load.call(k[0],m)}var k=this,l,r=A(new D,d),u,m,h;(l=
C(k[0]))?(h=r.source,"function"===typeof h?(u=Y.createElement("canvas"),u.width=r.width,u.height=r.height,d=C(u),h.call(u,d),q()):(d=h.getContext,h.src||d?u=h:(u=new ca,u.src=h),u.complete||d?q():(u.onload=q,u.src=u.src))):m=f;return m};d.fn.createGradient=d.fn.gradient=function(d){var q;d=A(new D,d);var k=[],l,r,u,m,h,n,y;if(q=C(this[0])){d.x1=d.x1||0;d.y1=d.y1||0;d.x2=d.x2||0;d.y2=d.y2||0;q=d.r1!==f||d.r2!==f?q.createRadialGradient(d.x1,d.y1,d.r1,d.x2,d.y2,d.r2):q.createLinearGradient(d.x1,d.y1,
d.x2,d.y2);for(m=1;d["c"+m]!==x;m+=1)d["s"+m]!==x?k.push(d["s"+m]):k.push(f);l=k.length;k[0]===f&&(k[0]=0);k[l-1]===f&&(k[l-1]=1);for(m=0;m<l;m+=1){if(k[m]!==f){n=1;y=0;r=k[m];for(h=m+1;h<l;h+=1)if(k[h]!==f){u=k[h];break}else n+=1;r>u&&(k[h]=k[m])}else k[m]===f&&(y+=1,k[m]=r+y*((u-r)/n));q.addColorStop(k[m],d["c"+(m+1)])}}else q=f;return q};d.fn.setPixels=function q(d){var f,r,n,m=A(new D,d),h={},y,x,B,E;for(r=0;r<this.length;r+=1)if(f=this[r],n=C(f)){d=H(f,m,d,q);J(n,m,m.width,m.height);if(!m.x||
!m.y||!m.width||!m.height)m.width=f.width,m.height=f.height,m.x=m.width/2,m.y=m.height/2;y=n.getImageData(m.x-m.width/2,m.y-m.height/2,m.width,m.height);x=y.data;E=x.length;h=[];if(m.each)for(B=0;B<E;B+=4)h.r=x[B],h.g=x[B+1],h.b=x[B+2],h.a=x[B+3],m.each.call(f,h),x[B]=h.r,x[B+1]=h.g,x[B+2]=h.b,x[B+3]=h.a;n.putImageData(y,m.x-m.width/2,m.y-m.height/2);n.restore()}return this};d.fn.getCanvasImage=function(d,k){var l=this[0];k===x&&(k=1);return l&&l.toDataURL?l.toDataURL("image/"+d,k):f};d.support.canvas=
Y.createElement("canvas").getContext!==x;E.defaults=V;E.detectEvents=K;E.closePath=L;d.jCanvas=E})(jQuery,document,Image,Math,parseFloat,!0,!1,null);
