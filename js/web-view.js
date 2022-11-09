var e,t;e=this,t=function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?e(Object(i),!0).forEach((function(e){r(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=function(e){return"string"==typeof e?document.querySelector(e):e()},a=function(e,t){var n="string"==typeof e?document.createElement(e):e;for(var r in t){var i=t[r];if("inside"===r)i.append(n);else if("dest"===r)u(i[0]).insertAdjacentElement(i[1],n);else if("around"===r){var o=i;o.parentNode.insertBefore(n,o),n.append(o),null!=o.getAttribute("autofocus")&&o.focus()}else r in n?n[r]=i:n.setAttribute(r,i)}return n},c=function(e,t){return e=String(e).toLowerCase(),t?e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").normalize("NFC"):e},l=function(e,n){return a("mark",t({innerHTML:e},"string"==typeof n&&{class:n})).outerHTML},f=function(e,t){t.input.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:t.feedback,cancelable:!0}))},p=function(e,t,n){var r=n||{},i=r.mode,o=r.diacritics,s=r.highlight,u=c(t,o);if(t=String(t),e=c(e,o),"loose"===i){var a=(e=e.replace(/ /g,"")).length,f=0,p=Array.from(t).map((function(t,n){return f<a&&u[n]===e[f]&&(t=s?l(t,s):t,f++),t})).join("");if(f===a)return p}else{var d=u.indexOf(e);if(~d)return e=t.substring(d,d+e.length),d=s?t.replace(e,l(e,s)):t}},d=function(e,t){return new Promise((function(n,r){var i;return(i=e.data).cache&&i.store?n():new Promise((function(e,n){return"function"==typeof i.src?i.src(t).then(e,n):e(i.src)})).then((function(t){try{return e.feedback=i.store=t,f("response",e),n()}catch(e){return r(e)}}),r)}))},h=function(e,t){var n=t.data,r=t.searchEngine,i=[];n.store.forEach((function(s,u){var a=function(n){var o=n?s[n]:s,u="function"==typeof r?r(e,o):p(e,o,{mode:r,diacritics:t.diacritics,highlight:t.resultItem.highlight});if(u){var a={match:u,value:s};n&&(a.key=n),i.push(a)}};if(n.keys){var c,l=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){a=!0,s=e},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw s}}}}(n.keys);try{for(l.s();!(c=l.n()).done;)a(c.value)}catch(e){l.e(e)}finally{l.f()}}else a()})),n.filter&&(i=n.filter(i));var s=i.slice(0,t.resultsList.maxResults);t.feedback={query:e,matches:i,results:s},f("results",t)},m="aria-expanded",b="aria-activedescendant",y="aria-selected",v=function(e,n){e.feedback.selection=t({index:n},e.feedback.results[n])},g=function(e){e.isOpen||((e.wrapper||e.input).setAttribute(m,!0),e.list.removeAttribute("hidden"),e.isOpen=!0,f("open",e))},w=function(e){e.isOpen&&((e.wrapper||e.input).setAttribute(m,!1),e.input.setAttribute(b,""),e.list.setAttribute("hidden",""),e.isOpen=!1,f("close",e))},O=function(e,t){var n=t.resultItem,r=t.list.getElementsByTagName(n.tag),o=!!n.selected&&n.selected.split(" ");if(t.isOpen&&r.length){var s,u,a=t.cursor;e>=r.length&&(e=0),e<0&&(e=r.length-1),t.cursor=e,a>-1&&(r[a].removeAttribute(y),o&&(u=r[a].classList).remove.apply(u,i(o))),r[e].setAttribute(y,!0),o&&(s=r[e].classList).add.apply(s,i(o)),t.input.setAttribute(b,r[t.cursor].id),t.list.scrollTop=r[e].offsetTop-t.list.clientHeight+r[e].clientHeight+5,t.feedback.cursor=t.cursor,v(t,e),f("navigate",t)}},A=function(e){O(e.cursor+1,e)},k=function(e){O(e.cursor-1,e)},L=function(e,t,n){(n=n>=0?n:e.cursor)<0||(e.feedback.event=t,v(e,n),f("selection",e),w(e))};function j(e,n){var r=this;return new Promise((function(i,o){var s,u;return s=n||((u=e.input)instanceof HTMLInputElement||u instanceof HTMLTextAreaElement?u.value:u.innerHTML),function(e,t,n){return t?t(e):e.length>=n}(s=e.query?e.query(s):s,e.trigger,e.threshold)?d(e,s).then((function(n){try{return e.feedback instanceof Error?i():(h(s,e),e.resultsList&&function(e){var n=e.resultsList,r=e.list,i=e.resultItem,o=e.feedback,s=o.matches,u=o.results;if(e.cursor=-1,r.innerHTML="",s.length||n.noResults){var c=new DocumentFragment;u.forEach((function(e,n){var r=a(i.tag,t({id:"".concat(i.id,"_").concat(n),role:"option",innerHTML:e.match,inside:c},i.class&&{class:i.class}));i.element&&i.element(r,e)})),r.append(c),n.element&&n.element(r,o),g(e)}else w(e)}(e),c.call(r))}catch(e){return o(e)}}),o):(w(e),c.call(r));function c(){return i()}}))}var S=function(e,t){for(var n in e)for(var r in e[n])t(n,r)},T=function(e){var n,r,i,o=e.events,s=(n=function(){return j(e)},r=e.debounce,function(){clearTimeout(i),i=setTimeout((function(){return n()}),r)}),u=e.events=t({input:t({},o&&o.input)},e.resultsList&&{list:o?t({},o.list):{}}),a={input:{input:function(){s()},keydown:function(t){!function(e,t){switch(e.keyCode){case 40:case 38:e.preventDefault(),40===e.keyCode?A(t):k(t);break;case 13:t.submit||e.preventDefault(),t.cursor>=0&&L(t,e);break;case 9:t.resultsList.tabSelect&&t.cursor>=0&&L(t,e);break;case 27:t.input.value="",w(t)}}(t,e)},blur:function(){w(e)}},list:{mousedown:function(e){e.preventDefault()},click:function(t){!function(e,t){var n=t.resultItem.tag.toUpperCase(),r=Array.from(t.list.querySelectorAll(n)),i=e.target.closest(n);i&&i.nodeName===n&&L(t,e,r.indexOf(i))}(t,e)}}};S(a,(function(t,n){(e.resultsList||"input"===n)&&(u[t][n]||(u[t][n]=a[t][n]))})),S(u,(function(t,n){e[t].addEventListener(n,u[t][n])}))};function E(e){var n=this;return new Promise((function(r,i){var o,s,u;if(o=e.placeHolder,u={role:"combobox","aria-owns":(s=e.resultsList).id,"aria-haspopup":!0,"aria-expanded":!1},a(e.input,t(t({"aria-controls":s.id,"aria-autocomplete":"both"},o&&{placeholder:o}),!e.wrapper&&t({},u))),e.wrapper&&(e.wrapper=a("div",t({around:e.input,class:e.name+"_wrapper"},u))),s&&(e.list=a(s.tag,t({dest:[s.destination,s.position],id:s.id,role:"listbox",hidden:"hidden"},s.class&&{class:s.class}))),T(e),e.data.cache)return d(e).then((function(e){try{return c.call(n)}catch(e){return i(e)}}),i);function c(){return f("init",e),r()}return c.call(n)}))}function x(e){var t=e.prototype;t.init=function(){E(this)},t.start=function(e){j(this,e)},t.unInit=function(){if(this.wrapper){var e=this.wrapper.parentNode;e.insertBefore(this.input,this.wrapper),e.removeChild(this.wrapper)}var t;S((t=this).events,(function(e,n){t[e].removeEventListener(n,t.events[e][n])}))},t.open=function(){g(this)},t.close=function(){w(this)},t.goTo=function(e){O(e,this)},t.next=function(){A(this)},t.previous=function(){k(this)},t.select=function(e){L(this,null,e)},t.search=function(e,t,n){return p(e,t,n)}}return function e(t){this.options=t,this.id=e.instances=(e.instances||0)+1,this.name="autoComplete",this.wrapper=1,this.threshold=1,this.debounce=0,this.resultsList={position:"afterend",tag:"ul",maxResults:5},this.resultItem={tag:"li"},function(e){var t=e.name,r=e.options,i=e.resultsList,o=e.resultItem;for(var s in r)if("object"===n(r[s]))for(var a in e[s]||(e[s]={}),r[s])e[s][a]=r[s][a];else e[s]=r[s];e.selector=e.selector||"#"+t,i.destination=i.destination||e.selector,i.id=i.id||t+"_list_"+e.id,o.id=o.id||t+"_result",e.input=u(e.selector)}(this),x.call(this,e),E(this)}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).autoComplete=t();

/*!
 * pace.js v1.2.4
 * https://github.com/CodeByZach/pace/
 * Licensed MIT © HubSpot, Inc.
 */
!function(){function o(t,e){return function(){return t.apply(e,arguments)}}var u,c,i,s,n,y,t,l,v,r,a,p,e,h,w,b,f,g,d,m,k,S,q,L,x,P,T,R,j,O,E,M,A,C,N,_,F,U,W,X,D,H,I,z,G,B,J=[].slice,K={}.hasOwnProperty,Q=function(t,e){for(var n in e)K.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},V=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};function Y(){}for(g={className:"",catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},P=function(){var t;return null!=(t="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?t:+new Date},R=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,f=window.cancelAnimationFrame||window.mozCancelAnimationFrame,p=function(t,e,n){if("function"==typeof t.addEventListener)return t.addEventListener(e,n,!1);var r;"function"!=typeof t["on"+e]||"object"!=typeof t["on"+e].eventListeners?(r=new s,"function"==typeof t["on"+e]&&r.on(e,t["on"+e]),t["on"+e]=function(t){return r.trigger(e,t)},t["on"+e].eventListeners=r):r=t["on"+e].eventListeners,r.on(e,n)},null==R&&(R=function(t){return setTimeout(t,50)},f=function(t){return clearTimeout(t)}),O=function(e){var n=P(),r=function(){var t=P()-n;return 33<=t?(n=P(),e(t,function(){return R(r)})):setTimeout(r,33-t)};return r()},j=function(){var t=arguments[0],e=arguments[1],n=3<=arguments.length?J.call(arguments,2):[];return"function"==typeof t[e]?t[e].apply(t,n):t[e]},d=function(){for(var t,e,n,r=arguments[0],s=2<=arguments.length?J.call(arguments,1):[],o=0,i=s.length;o<i;o++)if(e=s[o])for(t in e)K.call(e,t)&&(n=e[t],null!=r[t]&&"object"==typeof r[t]&&null!=n&&"object"==typeof n?d(r[t],n):r[t]=n);return r},h=function(t){for(var e,n,r=e=0,s=0,o=t.length;s<o;s++)n=t[s],r+=Math.abs(n),e++;return r/e},k=function(t,e){var n,r;if(null==t&&(t="options"),null==e&&(e=!0),r=document.querySelector("[data-pace-"+t+"]")){if(n=r.getAttribute("data-pace-"+t),!e)return n;try{return JSON.parse(n)}catch(t){return"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",t):void 0}}},Y.prototype.on=function(t,e,n,r){var s;return null==r&&(r=!1),null==this.bindings&&(this.bindings={}),null==(s=this.bindings)[t]&&(s[t]=[]),this.bindings[t].push({handler:e,ctx:n,once:r})},Y.prototype.once=function(t,e,n){return this.on(t,e,n,!0)},Y.prototype.off=function(t,e){var n,r,s;if(null!=(null!=(r=this.bindings)?r[t]:void 0)){if(null==e)return delete this.bindings[t];for(n=0,s=[];n<this.bindings[t].length;)this.bindings[t][n].handler===e?s.push(this.bindings[t].splice(n,1)):s.push(n++);return s}},Y.prototype.trigger=function(){var t,e,n,r,s,o,i=arguments[0],a=2<=arguments.length?J.call(arguments,1):[];if(null!=(r=this.bindings)&&r[i]){for(n=0,o=[];n<this.bindings[i].length;)e=(s=this.bindings[i][n]).handler,t=s.ctx,s=s.once,e.apply(null!=t?t:this,a),s?o.push(this.bindings[i].splice(n,1)):o.push(n++);return o}},B=Y,y=window.Pace||{},window.Pace=y,d(y,B.prototype),T=y.options=d({},g,window.paceOptions,k()),X=0,H=(z=["ajax","document","eventLag","elements"]).length;X<H;X++)!0===T[C=z[X]]&&(T[C]=g[C]);function Z(){return Z.__super__.constructor.apply(this,arguments)}function $(){this.progress=0}function tt(){this.bindings={}}function et(){var e,o=this;et.__super__.constructor.apply(this,arguments),e=function(r){var s=r.open;return r.open=function(t,e,n){return A(t)&&o.trigger("request",{type:t,url:e,request:r}),s.apply(r,arguments)}},window.XMLHttpRequest=function(t){t=new W(t);return e(t),t};try{m(window.XMLHttpRequest,W)}catch(t){}if(null!=U){window.XDomainRequest=function(){var t=new U;return e(t),t};try{m(window.XDomainRequest,U)}catch(t){}}if(null!=F&&T.ajax.trackWebSockets){window.WebSocket=function(t,e){var n=null!=e?new F(t,e):new F(t);return A("socket")&&o.trigger("request",{type:"socket",url:t,protocols:e,request:n}),n};try{m(window.WebSocket,F)}catch(t){}}}function nt(){this.complete=o(this.complete,this);var t=this;this.elements=[],S().on("request",function(){return t.watch.apply(t,arguments)})}function rt(t){var e,n,r,s;for(null==t&&(t={}),this.complete=o(this.complete,this),this.elements=[],null==t.selectors&&(t.selectors=[]),n=0,r=(s=t.selectors).length;n<r;n++)e=s[n],this.elements.push(new i(e,this.complete))}function st(t,e){this.selector=t,this.completeCallback=e,this.progress=0,this.check()}function ot(){var t,e,n=this;this.progress=null!=(e=this.states[document.readyState])?e:100,t=document.onreadystatechange,document.onreadystatechange=function(){return null!=n.states[document.readyState]&&(n.progress=n.states[document.readyState]),"function"==typeof t?t.apply(null,arguments):void 0}}function it(t){this.source=t,this.last=this.sinceLastUpdate=0,this.rate=T.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=j(this.source,"progress"))}B=Error,Q(Z,B),n=Z,$.prototype.getElement=function(){var t;if(null==this.el){if(!(t=document.querySelector(T.target)))throw new n;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/(pace-done )|/,"pace-running ");var e=""!==T.className?" "+T.className:"";this.el.innerHTML='<div class="pace-progress'+e+'">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=t.firstChild?t.insertBefore(this.el,t.firstChild):t.appendChild(this.el)}return this.el},$.prototype.finish=function(){var t=this.getElement();return t.className=t.className.replace("pace-active","pace-inactive"),document.body.className=document.body.className.replace("pace-running ","pace-done ")},$.prototype.update=function(t){return this.progress=t,y.trigger("progress",t),this.render()},$.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(t){n=t}return this.el=void 0},$.prototype.render=function(){var t,e,n,r,s,o,i;if(null==document.querySelector(T.target))return!1;for(t=this.getElement(),r="translate3d("+this.progress+"%, 0, 0)",s=0,o=(i=["webkitTransform","msTransform","transform"]).length;s<o;s++)e=i[s],t.children[0].style[e]=r;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(t.children[0].setAttribute("data-progress-text",(0|this.progress)+"%"),100<=this.progress?n="99":(n=this.progress<10?"0":"",n+=0|this.progress),t.children[0].setAttribute("data-progress",""+n)),y.trigger("change",this.progress),this.lastRenderedProgress=this.progress},$.prototype.done=function(){return 100<=this.progress},c=$,tt.prototype.trigger=function(t,e){var n,r,s,o,i;if(null!=this.bindings[t]){for(i=[],r=0,s=(o=this.bindings[t]).length;r<s;r++)n=o[r],i.push(n.call(this,e));return i}},tt.prototype.on=function(t,e){var n;return null==(n=this.bindings)[t]&&(n[t]=[]),this.bindings[t].push(e)},s=tt,W=window.XMLHttpRequest,U=window.XDomainRequest,F=window.WebSocket,m=function(t,e){var n,r=[];for(n in e.prototype)try{null==t[n]&&"function"!=typeof e[n]?"function"==typeof Object.defineProperty?r.push(Object.defineProperty(t,n,{get:function(t){return function(){return e.prototype[t]}}(n),configurable:!0,enumerable:!0})):r.push(t[n]=e.prototype[n]):r.push(void 0)}catch(t){0}return r},L=[],y.ignore=function(){var t=arguments[0],e=2<=arguments.length?J.call(arguments,1):[];return L.unshift("ignore"),e=t.apply(null,e),L.shift(),e},y.track=function(){var t=arguments[0],e=2<=arguments.length?J.call(arguments,1):[];return L.unshift("track"),e=t.apply(null,e),L.shift(),e},A=function(t){if(null==t&&(t="GET"),"track"===L[0])return"force";if(!L.length&&T.ajax){if("socket"===t&&T.ajax.trackWebSockets)return!0;if(t=t.toUpperCase(),0<=V.call(T.ajax.trackMethods,t))return!0}return!1},Q(et,s),t=et,D=null,M=function(t){for(var e,n=T.ajax.ignoreURLs,r=0,s=n.length;r<s;r++)if("string"==typeof(e=n[r])){if(-1!==t.indexOf(e))return!0}else if(e.test(t))return!0;return!1},(S=function(){return D=null==D?new t:D})().on("request",function(t){var o,i=t.type,a=t.request,e=t.url;if(!M(e))return y.running||!1===T.restartOnRequestAfter&&"force"!==A(i)?void 0:(o=arguments,"boolean"==typeof(e=T.restartOnRequestAfter||0)&&(e=0),setTimeout(function(){var t,e,n,r,s="socket"===i?a.readyState<1:0<(s=a.readyState)&&s<4;if(s){for(y.restart(),r=[],t=0,e=(n=y.sources).length;t<e;t++){if((C=n[t])instanceof u){C.watch.apply(C,o);break}r.push(void 0)}return r}},e))}),nt.prototype.watch=function(t){var e=t.type,n=t.request,t=t.url;if(!M(t))return n=new("socket"===e?r:a)(n,this.complete),this.elements.push(n)},nt.prototype.complete=function(e){return this.elements=this.elements.filter(function(t){return t!==e})},u=nt,a=function(e,n){var t,r,s,o,i=this;if(this.progress=0,null!=window.ProgressEvent)for(p(e,"progress",function(t){return t.lengthComputable?i.progress=100*t.loaded/t.total:i.progress=i.progress+(100-i.progress)/2}),t=0,r=(o=["load","abort","timeout","error"]).length;t<r;t++)p(e,o[t],function(){return n(i),i.progress=100});else s=e.onreadystatechange,e.onreadystatechange=function(){var t;return 0===(t=e.readyState)||4===t?(n(i),i.progress=100):3===e.readyState&&(i.progress=50),"function"==typeof s?s.apply(null,arguments):void 0}},r=function(t,e){for(var n,r=this,s=this.progress=0,o=(n=["error","open"]).length;s<o;s++)p(t,n[s],function(){return e(r),r.progress=100})},rt.prototype.complete=function(e){return this.elements=this.elements.filter(function(t){return t!==e})},k=rt,st.prototype.check=function(){var t=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return t.check()},T.elements.checkInterval)},st.prototype.done=function(){return this.completeCallback(this),this.completeCallback=null,this.progress=100},i=st,ot.prototype.states={loading:0,interactive:50,complete:100},B=ot,Q=function(){var e,n,r,s,o,i=this;this.progress=0,o=[],s=0,r=P(),n=setInterval(function(){var t=P()-r-50;return r=P(),o.push(t),o.length>T.eventLag.sampleCount&&o.shift(),e=h(o),++s>=T.eventLag.minSamples&&e<T.eventLag.lagThreshold?(i.progress=100,clearInterval(n)):i.progress=3/(e+3)*100},50)},it.prototype.tick=function(t,e){return 100<=(e=null==e?j(this.source,"progress"):e)&&(this.done=!0),e===this.last?this.sinceLastUpdate+=t:(this.sinceLastUpdate&&(this.rate=(e-this.last)/this.sinceLastUpdate),this.catchup=(e-this.progress)/T.catchupTime,this.sinceLastUpdate=0,this.last=e),e>this.progress&&(this.progress+=this.catchup*t),e=1-Math.pow(this.progress/100,T.easeFactor),this.progress+=e*this.rate*t,this.progress=Math.min(this.lastProgress+T.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},v=it,b=e=_=w=E=N=null,y.running=!1,q=function(){if(T.restartOnPushState)return y.restart()},null!=window.history.pushState&&(I=window.history.pushState,window.history.pushState=function(){return q(),I.apply(window.history,arguments)}),null!=window.history.replaceState&&(G=window.history.replaceState,window.history.replaceState=function(){return q(),G.apply(window.history,arguments)}),l={ajax:u,elements:k,document:B,eventLag:Q},(x=function(){var t,e,n,r,s,o,i,a;for(y.sources=N=[],e=0,r=(o=["ajax","elements","document","eventLag"]).length;e<r;e++)!1!==T[t=o[e]]&&N.push(new l[t](T[t]));for(n=0,s=(a=null!=(i=T.extraSources)?i:[]).length;n<s;n++)C=a[n],N.push(new C(T));return y.bar=w=new c,E=[],_=new v})(),y.stop=function(){return y.trigger("stop"),y.running=!1,w.destroy(),b=!0,null!=e&&("function"==typeof f&&f(e),e=null),x()},y.restart=function(){return y.trigger("restart"),y.stop(),y.start()},y.go=function(){var m;return y.running=!0,w.render(),m=P(),b=!1,e=O(function(t,e){w.progress;for(var n,r,s,o,i,a,u,c,l,p,h=a=0,f=!0,g=u=0,d=N.length;u<d;g=++u)for(C=N[g],i=null!=E[g]?E[g]:E[g]=[],s=c=0,l=(r=null!=(p=C.elements)?p:[C]).length;c<l;s=++c)o=r[s],f&=(o=null!=i[s]?i[s]:i[s]=new v(o)).done,o.done||(h++,a+=o.tick(t));return n=a/h,w.update(_.tick(t,n)),w.done()||f||b?(w.update(100),y.trigger("done"),setTimeout(function(){return w.finish(),y.running=!1,y.trigger("hide")},Math.max(T.ghostTime,Math.max(T.minTime-(P()-m),0)))):e()})},y.start=function(t){d(T,t),y.running=!0;try{w.render()}catch(t){n=t}return document.querySelector(".pace")?(y.trigger("start"),y.go()):setTimeout(y.start,50)},"function"==typeof define&&define.amd?define(function(){return y}):"object"==typeof exports?module.exports=y:T.startOnPageLoad&&y.start()}.call(this);
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.JSZipUtils=e():"undefined"!=typeof global?global.JSZipUtils=e():"undefined"!=typeof self&&(self.JSZipUtils=e())}(function(){return function o(i,f,u){function s(n,e){if(!f[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(a)return a(n,!0);throw new Error("Cannot find module '"+n+"'")}var r=f[n]={exports:{}};i[n][0].call(r.exports,function(e){var t=i[n][1][e];return s(t||e)},r,r.exports,o,i,f,u)}return f[n].exports}for(var a="function"==typeof require&&require,e=0;e<u.length;e++)s(u[e]);return s}({1:[function(e,t,n){"use strict";var u={};function r(){try{return new window.XMLHttpRequest}catch(e){}}u._getBinaryFromXHR=function(e){return e.response||e.responseText};var s="undefined"!=typeof window&&window.ActiveXObject?function(){return r()||function(){try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}()}:r;u.getBinaryContent=function(t,n){var e,r,o,i;"function"==typeof(n=n||{})?(i=n,n={}):"function"==typeof n.callback&&(i=n.callback),i||"undefined"==typeof Promise?(r=function(e){i(null,e)},o=function(e){i(e,null)}):e=new Promise(function(e,t){r=e,o=t});try{var f=s();f.open("GET",t,!0),"responseType"in f&&(f.responseType="arraybuffer"),f.overrideMimeType&&f.overrideMimeType("text/plain; charset=x-user-defined"),f.onreadystatechange=function(e){if(4===f.readyState)if(200===f.status||0===f.status)try{r(u._getBinaryFromXHR(f))}catch(e){o(new Error(e))}else o(new Error("Ajax error for "+t+" : "+this.status+" "+this.statusText))},n.progress&&(f.onprogress=function(e){n.progress({path:t,originalEvent:e,percent:e.loaded/e.total*100,loaded:e.loaded,total:e.total})}),f.send()}catch(e){o(new Error(e),null)}return e},t.exports=u},{}]},{},[1])(1)});
/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.0",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),j=function(e,t){return e===t&&(l=!0),0},D={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&D.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(j),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(j).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var D,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,D=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function we(){return!0}function Te(){return!1}function Ce(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ee(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ee(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Te;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Se(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,we)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click",we),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Se(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?we:Te,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Te,isPropagationStopped:Te,isImmediatePropagationStopped:Te,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=we,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=we,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=we,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Se(this,e,Ce),!1},trigger:function(){return Se(this,e),!0},_default:function(){return!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return Ee(this,e,t,n,r)},one:function(e,t,n,r){return Ee(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Te),this.each(function(){S.event.remove(this,e,n,t)})}});var ke=/<script|<style|<link/i,Ae=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function He(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Ae.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),He(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),De)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,qe),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(Ne,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Le(o[r],a[r]);else Le(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Re=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Me=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ie=new RegExp(ne.join("|"),"i");function We(e,t,n){var r,i,o,a,s=e.style;return(n=n||Re(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Pe.test(a)&&Ie.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function Fe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var Be=["Webkit","Moz","ms"],$e=E.createElement("div").style,_e={};function ze(e){var t=S.cssProps[e]||_e[e];return t||(e in $e?e:_e[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Be.length;while(n--)if((e=Be[n]+t)in $e)return e}(e)||e)}var Ue=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ve={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"};function Ye(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Qe(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Je(e,t,n){var r=Re(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=We(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Qe(e,t,n||(i?"border":"content"),o,r,a)+"px"}function Ke(e,t,n,r,i){return new Ke.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=We(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Xe.test(t),l=e.style;if(u||(t=ze(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Xe.test(t)||(t=ze(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=We(e,t,r)),"normal"===i&&t in Ge&&(i=Ge[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ue.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Je(e,u,n):Me(e,Ve,function(){return Je(e,u,n)})},set:function(e,t,n){var r,i=Re(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Qe(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Qe(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Ye(0,t,s)}}}),S.cssHooks.marginLeft=Fe(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(We(e,"marginLeft"))||e.getBoundingClientRect().left-Me(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Ye)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Re(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=Ke).prototype={constructor:Ke,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=Ke.propHooks[this.prop];return e&&e.get?e.get(this):Ke.propHooks._default.get(this)},run:function(e){var t,n=Ke.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ke.propHooks._default.set(this),this}}).init.prototype=Ke.prototype,(Ke.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[ze(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=Ke.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=Ke.prototype.init,S.fx.step={};var Ze,et,tt,nt,rt=/^(?:toggle|show|hide)$/,it=/queueHooks$/;function ot(){et&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(ot):C.setTimeout(ot,S.fx.interval),S.fx.tick())}function at(){return C.setTimeout(function(){Ze=void 0}),Ze=Date.now()}function st(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ut(e,t,n){for(var r,i=(lt.tweeners[t]||[]).concat(lt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function lt(o,e,t){var n,a,r=0,i=lt.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=Ze||at(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:Ze||at(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=lt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ut,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(lt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],lt.tweeners[n]=lt.tweeners[n]||[],lt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],rt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ut(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?lt.prefilters.unshift(e):lt.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=lt(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&it.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(st(r,!0),e,t,n)}}),S.each({slideDown:st("show"),slideUp:st("hide"),slideToggle:st("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(Ze=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),Ze=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){et||(et=!0,ot())},S.fx.stop=function(){et=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},tt=E.createElement("input"),nt=E.createElement("select").appendChild(E.createElement("option")),tt.type="checkbox",y.checkOn=""!==tt.value,y.optSelected=nt.selected,(tt=E.createElement("input")).value="t",tt.type="radio",y.radioValue="t"===tt.value;var ct,ft=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?ct:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ct={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=ft[t]||S.find.attr;ft[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=ft[o],ft[o]=r,r=null!=a(e,t,n)?o:null,ft[o]=i),r}});var pt=/^(?:input|select|textarea|button)$/i,dt=/^(?:a|area)$/i;function ht(e){return(e.match(P)||[]).join(" ")}function gt(e){return e.getAttribute&&e.getAttribute("class")||""}function vt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):pt.test(e.nodeName)||dt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,gt(this)))});if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,gt(this)))});if(!arguments.length)return this.attr("class","");if((e=vt(t)).length)while(n=this[u++])if(i=gt(n),r=1===n.nodeType&&" "+ht(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=ht(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,gt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=vt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=gt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+ht(gt(n))+" ").indexOf(t))return!0;return!1}});var yt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(yt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:ht(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var mt=/^(?:focusinfocus|focusoutblur)$/,xt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!mt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,mt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,xt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,xt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var bt=C.location,wt={guid:Date.now()},Tt=/\?/;S.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||S.error("Invalid XML: "+(n?S.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Ct=/\[\]$/,Et=/\r?\n/g,St=/^(?:submit|button|image|reset|file)$/i,kt=/^(?:input|select|textarea|keygen)/i;function At(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||Ct.test(n)?i(n,t):At(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)At(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)At(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&kt.test(this.nodeName)&&!St.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(Et,"\r\n")}}):{name:t.name,value:n.replace(Et,"\r\n")}}).get()}});var Nt=/%20/g,jt=/#.*$/,Dt=/([?&])_=[^&]*/,qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Lt=/^(?:GET|HEAD)$/,Ht=/^\/\//,Ot={},Pt={},Rt="*/".concat("*"),Mt=E.createElement("a");function It(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Wt(t,i,o,a){var s={},u=t===Pt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Ft(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Mt.href=bt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:bt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Rt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ft(Ft(e,S.ajaxSettings),t):Ft(S.ajaxSettings,e)},ajaxPrefilter:It(Ot),ajaxTransport:It(Pt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=qt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||bt.href)+"").replace(Ht,bt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Mt.protocol+"//"+Mt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Wt(Ot,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Lt.test(v.type),f=v.url.replace(jt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Nt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Tt.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Dt,"$1"),o=(Tt.test(f)?"&":"?")+"_="+wt.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+Rt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Wt(Pt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&S.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Bt={0:200,1223:204},$t=S.ajaxSettings.xhr();y.cors=!!$t&&"withCredentials"in $t,y.ajax=$t=!!$t,S.ajaxTransport(function(i){var o,a;if(y.cors||$t&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Bt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var _t,zt=[],Ut=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=zt.pop()||S.expando+"_"+wt.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Ut.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ut.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Ut,"$1"+r):!1!==e.jsonp&&(e.url+=(Tt.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,zt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((_t=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===_t.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=ht(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=Fe(y.pixelPosition,function(e,t){if(t)return t=We(e,n),Pe.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Xt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Xt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Vt=C.jQuery,Gt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Gt),e&&C.jQuery===S&&(C.jQuery=Vt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});

(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
(function(self){'use strict';
function r(a, b) {
  return "undefined" !== typeof a ? a : b;
}
function v(a) {
  const b = Array(a);
  for (let c = 0; c < a; c++) {
    b[c] = w();
  }
  return b;
}
function w() {
  return Object.create(null);
}
function aa(a, b) {
  return b.length - a.length;
}
function x(a) {
  return "string" === typeof a;
}
function z(a) {
  return "object" === typeof a;
}
function D(a) {
  return "function" === typeof a;
}
;function ba(a, b, c, d) {
  if (a && (b && (a = E(a, b)), this.matcher && (a = E(a, this.matcher)), this.stemmer && 1 < a.length && (a = E(a, this.stemmer)), d && 1 < a.length && (a = F(a)), c || "" === c)) {
    a = a.split(c);
    if (this.filter) {
      b = this.filter;
      c = a.length;
      d = [];
      for (let e = 0, f = 0; e < c; e++) {
        const g = a[e];
        g && !b[g] && (d[f++] = g);
      }
      a = d;
    }
    return a;
  }
  return a;
}
const ca = /[\p{Z}\p{S}\p{P}\p{C}]+/u, da = /[\u0300-\u036f]/g;
function ea(a, b) {
  const c = Object.keys(a), d = c.length, e = [];
  let f = "", g = 0;
  for (let h = 0, k, m; h < d; h++) {
    k = c[h], (m = a[k]) ? (e[g++] = G(b ? "(?!\\b)" + k + "(\\b|_)" : k), e[g++] = m) : f += (f ? "|" : "") + k;
  }
  f && (e[g++] = G(b ? "(?!\\b)(" + f + ")(\\b|_)" : "(" + f + ")"), e[g] = "");
  return e;
}
function E(a, b) {
  for (let c = 0, d = b.length; c < d && (a = a.replace(b[c], b[c + 1]), a); c += 2) {
  }
  return a;
}
function G(a) {
  return new RegExp(a, "g");
}
function F(a) {
  let b = "", c = "";
  for (let d = 0, e = a.length, f; d < e; d++) {
    (f = a[d]) !== c && (b += c = f);
  }
  return b;
}
;var ha = {encode:fa, rtl:!1, tokenize:""};
function fa(a) {
  return ba.call(this, ("" + a).toLowerCase(), !1, ca, !1);
}
;const ia = {}, I = {};
function ja(a) {
  J(a, "add");
  J(a, "append");
  J(a, "search");
  J(a, "update");
  J(a, "remove");
}
function J(a, b) {
  a[b + "Async"] = function() {
    const c = this, d = arguments;
    var e = d[d.length - 1];
    let f;
    D(e) && (f = e, delete d[d.length - 1]);
    e = new Promise(function(g) {
      setTimeout(function() {
        c.async = !0;
        const h = c[b].apply(c, d);
        c.async = !1;
        g(h);
      });
    });
    return f ? (e.then(f), this) : e;
  };
}
;function ka(a, b, c, d) {
  const e = a.length;
  let f = [], g, h, k = 0;
  d && (d = []);
  for (let m = e - 1; 0 <= m; m--) {
    const p = a[m], u = p.length, q = w();
    let n = !g;
    for (let l = 0; l < u; l++) {
      const t = p[l], y = t.length;
      if (y) {
        for (let C = 0, B, A; C < y; C++) {
          if (A = t[C], g) {
            if (g[A]) {
              if (!m) {
                if (c) {
                  c--;
                } else {
                  if (f[k++] = A, k === b) {
                    return f;
                  }
                }
              }
              if (m || d) {
                q[A] = 1;
              }
              n = !0;
            }
            if (d && (B = (h[A] || 0) + 1, h[A] = B, B < e)) {
              const H = d[B - 2] || (d[B - 2] = []);
              H[H.length] = A;
            }
          } else {
            q[A] = 1;
          }
        }
      }
    }
    if (d) {
      g || (h = q);
    } else if (!n) {
      return [];
    }
    g = q;
  }
  if (d) {
    for (let m = d.length - 1, p, u; 0 <= m; m--) {
      p = d[m];
      u = p.length;
      for (let q = 0, n; q < u; q++) {
        if (n = p[q], !g[n]) {
          if (c) {
            c--;
          } else {
            if (f[k++] = n, k === b) {
              return f;
            }
          }
          g[n] = 1;
        }
      }
    }
  }
  return f;
}
function la(a, b) {
  const c = w(), d = w(), e = [];
  for (let f = 0; f < a.length; f++) {
    c[a[f]] = 1;
  }
  for (let f = 0, g; f < b.length; f++) {
    g = b[f];
    for (let h = 0, k; h < g.length; h++) {
      k = g[h], c[k] && !d[k] && (d[k] = 1, e[e.length] = k);
    }
  }
  return e;
}
;function K(a) {
  this.limit = !0 !== a && a;
  this.cache = w();
  this.queue = [];
}
function ma(a, b, c) {
  z(a) && (a = a.query);
  let d = this.cache.get(a);
  d || (d = this.search(a, b, c), this.cache.set(a, d));
  return d;
}
K.prototype.set = function(a, b) {
  if (!this.cache[a]) {
    var c = this.queue.length;
    c === this.limit ? delete this.cache[this.queue[c - 1]] : c++;
    for (--c; 0 < c; c--) {
      this.queue[c] = this.queue[c - 1];
    }
    this.queue[0] = a;
  }
  this.cache[a] = b;
};
K.prototype.get = function(a) {
  const b = this.cache[a];
  if (this.limit && b && (a = this.queue.indexOf(a))) {
    const c = this.queue[a - 1];
    this.queue[a - 1] = this.queue[a];
    this.queue[a] = c;
  }
  return b;
};
K.prototype.del = function(a) {
  for (let b = 0, c, d; b < this.queue.length; b++) {
    d = this.queue[b], c = this.cache[d], c.includes(a) && (this.queue.splice(b--, 1), delete this.cache[d]);
  }
};
const na = {memory:{charset:"latin:extra", resolution:3, minlength:4, fastupdate:!1}, performance:{resolution:3, minlength:3, optimize:!1, context:{depth:2, resolution:1}}, match:{charset:"latin:extra", tokenize:"reverse",}, score:{charset:"latin:advanced", resolution:20, minlength:3, context:{depth:3, resolution:9,}}, "default":{},};
function pa(a, b, c, d, e, f, g) {
  setTimeout(function() {
    const h = a(c ? c + "." + d : d, JSON.stringify(g));
    h && h.then ? h.then(function() {
      b.export(a, b, c, e, f + 1);
    }) : b.export(a, b, c, e, f + 1);
  });
}
;function L(a, b) {
  if (!(this instanceof L)) {
    return new L(a);
  }
  var c;
  if (a) {
    if (x(a)) {
      na[a] || console.warn("Preset not found: " + a), a = na[a];
    } else {
      if (c = a.preset) {
        c[c] || console.warn("Preset not found: " + c), a = Object.assign({}, c[c], a);
      }
    }
    c = a.charset;
    var d = a.lang;
    x(c) && (-1 === c.indexOf(":") && (c += ":default"), c = I[c]);
    x(d) && (d = ia[d]);
  } else {
    a = {};
  }
  let e, f, g = a.context || {};
  this.encode = a.encode || c && c.encode || fa;
  this.register = b || w();
  this.resolution = e = a.resolution || 9;
  this.tokenize = b = c && c.tokenize || a.tokenize || "strict";
  this.depth = "strict" === b && g.depth;
  this.bidirectional = r(g.bidirectional, !0);
  this.optimize = f = r(a.optimize, !0);
  this.fastupdate = r(a.fastupdate, !0);
  this.minlength = a.minlength || 1;
  this.boost = a.boost;
  this.map = f ? v(e) : w();
  this.resolution_ctx = e = g.resolution || 1;
  this.ctx = f ? v(e) : w();
  this.rtl = c && c.rtl || a.rtl;
  this.matcher = (b = a.matcher || d && d.matcher) && ea(b, !1);
  this.stemmer = (b = a.stemmer || d && d.stemmer) && ea(b, !0);
  if (c = b = a.filter || d && d.filter) {
    c = b;
    d = w();
    for (let h = 0, k = c.length; h < k; h++) {
      d[c[h]] = 1;
    }
    c = d;
  }
  this.filter = c;
  this.cache = (b = a.cache) && new K(b);
}
L.prototype.append = function(a, b) {
  return this.add(a, b, !0);
};
L.prototype.add = function(a, b, c, d) {
  if (b && (a || 0 === a)) {
    if (!d && !c && this.register[a]) {
      return this.update(a, b);
    }
    b = this.encode("" + b);
    if (d = b.length) {
      const m = w(), p = w(), u = this.depth, q = this.resolution;
      for (let n = 0; n < d; n++) {
        let l = b[this.rtl ? d - 1 - n : n];
        var e = l.length;
        if (l && e >= this.minlength && (u || !p[l])) {
          var f = M(q, d, n), g = "";
          switch(this.tokenize) {
            case "full":
              if (2 < e) {
                for (f = 0; f < e; f++) {
                  for (var h = e; h > f; h--) {
                    if (h - f >= this.minlength) {
                      var k = M(q, d, n, e, f);
                      g = l.substring(f, h);
                      this.push_index(p, g, k, a, c);
                    }
                  }
                }
                break;
              }
            case "reverse":
              if (1 < e) {
                for (h = e - 1; 0 < h; h--) {
                  g = l[h] + g, g.length >= this.minlength && (k = M(q, d, n, e, h), this.push_index(p, g, k, a, c));
                }
                g = "";
              }
            case "forward":
              if (1 < e) {
                for (h = 0; h < e; h++) {
                  g += l[h], g.length >= this.minlength && this.push_index(p, g, f, a, c);
                }
                break;
              }
            default:
              if (this.boost && (f = Math.min(f / this.boost(b, l, n) | 0, q - 1)), this.push_index(p, l, f, a, c), u && 1 < d && n < d - 1) {
                for (e = w(), g = this.resolution_ctx, f = l, h = Math.min(u + 1, d - n), e[f] = 1, k = 1; k < h; k++) {
                  if ((l = b[this.rtl ? d - 1 - n - k : n + k]) && l.length >= this.minlength && !e[l]) {
                    e[l] = 1;
                    const t = M(g + (d / 2 > g ? 0 : 1), d, n, h - 1, k - 1), y = this.bidirectional && l > f;
                    this.push_index(m, y ? f : l, t, a, c, y ? l : f);
                  }
                }
              }
          }
        }
      }
      this.fastupdate || (this.register[a] = 1);
    }
  }
  return this;
};
function M(a, b, c, d, e) {
  return c && 1 < a ? b + (d || 0) <= a ? c + (e || 0) : (a - 1) / (b + (d || 0)) * (c + (e || 0)) + 1 | 0 : 0;
}
L.prototype.push_index = function(a, b, c, d, e, f) {
  let g = f ? this.ctx : this.map;
  if (!a[b] || f && !a[b][f]) {
    this.optimize && (g = g[c]), f ? (a = a[b] || (a[b] = w()), a[f] = 1, g = g[f] || (g[f] = w())) : a[b] = 1, g = g[b] || (g[b] = []), this.optimize || (g = g[c] || (g[c] = [])), e && g.includes(d) || (g[g.length] = d, this.fastupdate && (a = this.register[d] || (this.register[d] = []), a[a.length] = g));
  }
};
L.prototype.search = function(a, b, c) {
  c || (!b && z(a) ? (c = a, a = c.query) : z(b) && (c = b));
  let d = [], e;
  let f, g = 0;
  if (c) {
    a = c.query || a;
    b = c.limit;
    g = c.offset || 0;
    var h = c.context;
    f = c.suggest;
  }
  if (a && (a = this.encode("" + a), e = a.length, 1 < e)) {
    c = w();
    var k = [];
    for (let p = 0, u = 0, q; p < e; p++) {
      if ((q = a[p]) && q.length >= this.minlength && !c[q]) {
        if (this.optimize || f || this.map[q]) {
          k[u++] = q, c[q] = 1;
        } else {
          return d;
        }
      }
    }
    a = k;
    e = a.length;
  }
  if (!e) {
    return d;
  }
  b || (b = 100);
  h = this.depth && 1 < e && !1 !== h;
  c = 0;
  let m;
  h ? (m = a[0], c = 1) : 1 < e && a.sort(aa);
  for (let p, u; c < e; c++) {
    u = a[c];
    h ? (p = this.add_result(d, f, b, g, 2 === e, u, m), f && !1 === p && d.length || (m = u)) : p = this.add_result(d, f, b, g, 1 === e, u);
    if (p) {
      return p;
    }
    if (f && c === e - 1) {
      k = d.length;
      if (!k) {
        if (h) {
          h = 0;
          c = -1;
          continue;
        }
        return d;
      }
      if (1 === k) {
        return qa(d[0], b, g);
      }
    }
  }
  return ka(d, b, g, f);
};
L.prototype.add_result = function(a, b, c, d, e, f, g) {
  let h = [], k = g ? this.ctx : this.map;
  this.optimize || (k = ra(k, f, g, this.bidirectional));
  if (k) {
    let m = 0;
    const p = Math.min(k.length, g ? this.resolution_ctx : this.resolution);
    for (let u = 0, q = 0, n, l; u < p; u++) {
      if (n = k[u]) {
        if (this.optimize && (n = ra(n, f, g, this.bidirectional)), d && n && e && (l = n.length, l <= d ? (d -= l, n = null) : (n = n.slice(d), d = 0)), n && (h[m++] = n, e && (q += n.length, q >= c))) {
          break;
        }
      }
    }
    if (m) {
      if (e) {
        return qa(h, c, 0);
      }
      a[a.length] = h;
      return;
    }
  }
  return !b && h;
};
function qa(a, b, c) {
  a = 1 === a.length ? a[0] : [].concat.apply([], a);
  return c || a.length > b ? a.slice(c, c + b) : a;
}
function ra(a, b, c, d) {
  c ? (d = d && b > c, a = (a = a[d ? b : c]) && a[d ? c : b]) : a = a[b];
  return a;
}
L.prototype.contain = function(a) {
  return !!this.register[a];
};
L.prototype.update = function(a, b) {
  return this.remove(a).add(a, b);
};
L.prototype.remove = function(a, b) {
  const c = this.register[a];
  if (c) {
    if (this.fastupdate) {
      for (let d = 0, e; d < c.length; d++) {
        e = c[d], e.splice(e.indexOf(a), 1);
      }
    } else {
      N(this.map, a, this.resolution, this.optimize), this.depth && N(this.ctx, a, this.resolution_ctx, this.optimize);
    }
    b || delete this.register[a];
    this.cache && this.cache.del(a);
  }
  return this;
};
function N(a, b, c, d, e) {
  let f = 0;
  if (a.constructor === Array) {
    if (e) {
      b = a.indexOf(b), -1 !== b ? 1 < a.length && (a.splice(b, 1), f++) : f++;
    } else {
      e = Math.min(a.length, c);
      for (let g = 0, h; g < e; g++) {
        if (h = a[g]) {
          f = N(h, b, c, d, e), d || f || delete a[g];
        }
      }
    }
  } else {
    for (let g in a) {
      (f = N(a[g], b, c, d, e)) || delete a[g];
    }
  }
  return f;
}
L.prototype.searchCache = ma;
L.prototype.export = function(a, b, c, d, e) {
  let f, g;
  switch(e || (e = 0)) {
    case 0:
      f = "reg";
      if (this.fastupdate) {
        g = w();
        for (let h in this.register) {
          g[h] = 1;
        }
      } else {
        g = this.register;
      }
      break;
    case 1:
      f = "cfg";
      g = {doc:0, opt:this.optimize ? 1 : 0};
      break;
    case 2:
      f = "map";
      g = this.map;
      break;
    case 3:
      f = "ctx";
      g = this.ctx;
      break;
    default:
      return;
  }
  pa(a, b || this, c, f, d, e, g);
  return !0;
};
L.prototype.import = function(a, b) {
  if (b) {
    switch(x(b) && (b = JSON.parse(b)), a) {
      case "cfg":
        this.optimize = !!b.opt;
        break;
      case "reg":
        this.fastupdate = !1;
        this.register = b;
        break;
      case "map":
        this.map = b;
        break;
      case "ctx":
        this.ctx = b;
    }
  }
};
ja(L.prototype);
function sa(a) {
  a = a.data;
  var b = self._index;
  const c = a.args;
  var d = a.task;
  switch(d) {
    case "init":
      d = a.options || {};
      a = a.factory;
      b = d.encode;
      d.cache = !1;
      b && 0 === b.indexOf("function") && (d.encode = Function("return " + b)());
      a ? (Function("return " + a)()(self), self._index = new self.FlexSearch.Index(d), delete self.FlexSearch) : self._index = new L(d);
      break;
    default:
      a = a.id, b = b[d].apply(b, c), postMessage("search" === d ? {id:a, msg:b} : {id:a});
  }
}
;let ta = 0;
function O(a) {
  if (!(this instanceof O)) {
    return new O(a);
  }
  var b;
  a ? D(b = a.encode) && (a.encode = b.toString()) : a = {};
  (b = (self || window)._factory) && (b = b.toString());
  const c = "undefined" === typeof window && self.exports, d = this;
  this.worker = ua(b, c, a.worker);
  this.resolver = w();
  if (this.worker) {
    if (c) {
      this.worker.on("message", function(e) {
        d.resolver[e.id](e.msg);
        delete d.resolver[e.id];
      });
    } else {
      this.worker.onmessage = function(e) {
        e = e.data;
        d.resolver[e.id](e.msg);
        delete d.resolver[e.id];
      };
    }
    this.worker.postMessage({task:"init", factory:b, options:a});
  }
}
Q("add");
Q("append");
Q("search");
Q("update");
Q("remove");
function Q(a) {
  O.prototype[a] = O.prototype[a + "Async"] = function() {
    const b = this, c = [].slice.call(arguments);
    var d = c[c.length - 1];
    let e;
    D(d) && (e = d, c.splice(c.length - 1, 1));
    d = new Promise(function(f) {
      setTimeout(function() {
        b.resolver[++ta] = f;
        b.worker.postMessage({task:a, id:ta, args:c});
      });
    });
    return e ? (d.then(e), this) : d;
  };
}
function ua(a, b, c) {
  let d;
  try {
    d = b ? eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")') : a ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + sa.toString()], {type:"text/javascript"}))) : new Worker(x(c) ? c : "worker/worker.js", {type:"module"});
  } catch (e) {
  }
  return d;
}
;function R(a) {
  if (!(this instanceof R)) {
    return new R(a);
  }
  var b = a.document || a.doc || a, c;
  this.tree = [];
  this.field = [];
  this.marker = [];
  this.register = w();
  this.key = (c = b.key || b.id) && S(c, this.marker) || "id";
  this.fastupdate = r(a.fastupdate, !0);
  this.storetree = (c = b.store) && !0 !== c && [];
  this.store = c && w();
  this.tag = (c = b.tag) && S(c, this.marker);
  this.tagindex = c && w();
  this.cache = (c = a.cache) && new K(c);
  a.cache = !1;
  this.worker = a.worker;
  this.async = !1;
  c = w();
  let d = b.index || b.field || b;
  x(d) && (d = [d]);
  for (let e = 0, f, g; e < d.length; e++) {
    f = d[e], x(f) || (g = f, f = f.field), g = z(g) ? Object.assign({}, a, g) : a, this.worker && (c[f] = new O(g), c[f].worker || (this.worker = !1)), this.worker || (c[f] = new L(g, this.register)), this.tree[e] = S(f, this.marker), this.field[e] = f;
  }
  if (this.storetree) {
    for (a = b.store, x(a) && (a = [a]), b = 0; b < a.length; b++) {
      this.storetree[b] = S(a[b], this.marker);
    }
  }
  this.index = c;
}
function S(a, b) {
  const c = a.split(":");
  let d = 0;
  for (let e = 0; e < c.length; e++) {
    a = c[e], 0 <= a.indexOf("[]") && (a = a.substring(0, a.length - 2)) && (b[d] = !0), a && (c[d++] = a);
  }
  d < c.length && (c.length = d);
  return 1 < d ? c : c[0];
}
function T(a, b) {
  if (x(b)) {
    a = a[b];
  } else {
    for (let c = 0; a && c < b.length; c++) {
      a = a[b[c]];
    }
  }
  return a;
}
function U(a, b, c, d, e) {
  a = a[e];
  if (d === c.length - 1) {
    b[e] = a;
  } else if (a) {
    if (a.constructor === Array) {
      for (b = b[e] = Array(a.length), e = 0; e < a.length; e++) {
        U(a, b, c, d, e);
      }
    } else {
      b = b[e] || (b[e] = w()), e = c[++d], U(a, b, c, d, e);
    }
  }
}
function V(a, b, c, d, e, f, g, h) {
  if (a = a[g]) {
    if (d === b.length - 1) {
      if (a.constructor === Array) {
        if (c[d]) {
          for (b = 0; b < a.length; b++) {
            e.add(f, a[b], !0, !0);
          }
          return;
        }
        a = a.join(" ");
      }
      e.add(f, a, h, !0);
    } else {
      if (a.constructor === Array) {
        for (g = 0; g < a.length; g++) {
          V(a, b, c, d, e, f, g, h);
        }
      } else {
        g = b[++d], V(a, b, c, d, e, f, g, h);
      }
    }
  }
}
R.prototype.add = function(a, b, c) {
  z(a) && (b = a, a = T(b, this.key));
  if (b && (a || 0 === a)) {
    if (!c && this.register[a]) {
      return this.update(a, b);
    }
    for (let d = 0, e, f; d < this.field.length; d++) {
      f = this.field[d], e = this.tree[d], x(e) && (e = [e]), V(b, e, this.marker, 0, this.index[f], a, e[0], c);
    }
    if (this.tag) {
      let d = T(b, this.tag), e = w();
      x(d) && (d = [d]);
      for (let f = 0, g, h; f < d.length; f++) {
        if (g = d[f], !e[g] && (e[g] = 1, h = this.tagindex[g] || (this.tagindex[g] = []), !c || !h.includes(a))) {
          if (h[h.length] = a, this.fastupdate) {
            const k = this.register[a] || (this.register[a] = []);
            k[k.length] = h;
          }
        }
      }
    }
    if (this.store && (!c || !this.store[a])) {
      let d;
      if (this.storetree) {
        d = w();
        for (let e = 0, f; e < this.storetree.length; e++) {
          f = this.storetree[e], x(f) ? d[f] = b[f] : U(b, d, f, 0, f[0]);
        }
      }
      this.store[a] = d || b;
    }
  }
  return this;
};
R.prototype.append = function(a, b) {
  return this.add(a, b, !0);
};
R.prototype.update = function(a, b) {
  return this.remove(a).add(a, b);
};
R.prototype.remove = function(a) {
  z(a) && (a = T(a, this.key));
  if (this.register[a]) {
    for (var b = 0; b < this.field.length && (this.index[this.field[b]].remove(a, !this.worker), !this.fastupdate); b++) {
    }
    if (this.tag && !this.fastupdate) {
      for (let c in this.tagindex) {
        b = this.tagindex[c];
        const d = b.indexOf(a);
        -1 !== d && (1 < b.length ? b.splice(d, 1) : delete this.tagindex[c]);
      }
    }
    this.store && delete this.store[a];
    delete this.register[a];
  }
  return this;
};
R.prototype.search = function(a, b, c, d) {
  c || (!b && z(a) ? (c = a, a = "") : z(b) && (c = b, b = 0));
  let e = [], f = [], g, h, k, m, p, u, q = 0;
  if (c) {
    if (c.constructor === Array) {
      k = c, c = null;
    } else {
      a = c.query || a;
      k = (g = c.pluck) || c.index || c.field;
      m = c.tag;
      h = this.store && c.enrich;
      p = "and" === c.bool;
      b = c.limit || b || 100;
      u = c.offset || 0;
      if (m && (x(m) && (m = [m]), !a)) {
        for (let l = 0, t; l < m.length; l++) {
          if (t = va.call(this, m[l], b, u, h)) {
            e[e.length] = t, q++;
          }
        }
        return q ? e : [];
      }
      x(k) && (k = [k]);
    }
  }
  k || (k = this.field);
  p = p && (1 < k.length || m && 1 < m.length);
  const n = !d && (this.worker || this.async) && [];
  for (let l = 0, t, y, C; l < k.length; l++) {
    let B;
    y = k[l];
    x(y) || (B = y, y = B.field, a = B.query || a, b = B.limit || b);
    if (n) {
      n[l] = this.index[y].searchAsync(a, b, B || c);
    } else {
      C = (t = d ? d[l] : this.index[y].search(a, b, B || c)) && t.length;
      if (m && C) {
        const A = [];
        let H = 0;
        p && (A[0] = [t]);
        for (let W = 0, oa, P; W < m.length; W++) {
          if (oa = m[W], C = (P = this.tagindex[oa]) && P.length) {
            H++, A[A.length] = p ? [P] : P;
          }
        }
        H && (t = p ? ka(A, b || 100, u || 0) : la(t, A), C = t.length);
      }
      if (C) {
        f[q] = y, e[q++] = t;
      } else if (p) {
        return [];
      }
    }
  }
  if (n) {
    const l = this;
    return new Promise(function(t) {
      Promise.all(n).then(function(y) {
        t(l.search(a, b, c, y));
      });
    });
  }
  if (!q) {
    return [];
  }
  if (g && (!h || !this.store)) {
    return e[0];
  }
  for (let l = 0, t; l < f.length; l++) {
    t = e[l];
    t.length && h && (t = wa.call(this, t));
    if (g) {
      return t;
    }
    e[l] = {field:f[l], result:t};
  }
  return e;
};
function va(a, b, c, d) {
  let e = this.tagindex[a], f = e && e.length - c;
  if (f && 0 < f) {
    if (f > b || c) {
      e = e.slice(c, c + b);
    }
    d && (e = wa.call(this, e));
    return {tag:a, result:e};
  }
}
function wa(a) {
  const b = Array(a.length);
  for (let c = 0, d; c < a.length; c++) {
    d = a[c], b[c] = {id:d, doc:this.store[d]};
  }
  return b;
}
R.prototype.contain = function(a) {
  return !!this.register[a];
};
R.prototype.get = function(a) {
  return this.store[a];
};
R.prototype.set = function(a, b) {
  this.store[a] = b;
  return this;
};
R.prototype.searchCache = ma;
R.prototype.export = function(a, b, c, d, e) {
  e || (e = 0);
  d || (d = 0);
  if (d < this.field.length) {
    const f = this.field[d], g = this.index[f];
    b = this;
    setTimeout(function() {
      g.export(a, b, e ? f : "", d, e++) || (d++, e = 1, b.export(a, b, f, d, e));
    });
  } else {
    let f, g;
    switch(e) {
      case 1:
        f = "tag";
        g = this.tagindex;
        break;
      case 2:
        f = "store";
        g = this.store;
        break;
      default:
        return;
    }
    pa(a, this, c, f, d, e, g);
  }
};
R.prototype.import = function(a, b) {
  if (b) {
    switch(x(b) && (b = JSON.parse(b)), a) {
      case "tag":
        this.tagindex = b;
        break;
      case "reg":
        this.fastupdate = !1;
        this.register = b;
        for (let d = 0, e; d < this.field.length; d++) {
          e = this.index[this.field[d]], e.register = b, e.fastupdate = !1;
        }
        break;
      case "store":
        this.store = b;
        break;
      default:
        a = a.split(".");
        const c = a[0];
        a = a[1];
        c && a && this.index[c].import(a, b);
    }
  }
};
ja(R.prototype);
var ya = {encode:xa, rtl:!1, tokenize:""};
const za = G("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"), Aa = G("[\u00e8\u00e9\u00ea\u00eb]"), Ba = G("[\u00ec\u00ed\u00ee\u00ef]"), Ca = G("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"), Da = G("[\u00f9\u00fa\u00fb\u00fc\u0171]"), Ea = G("[\u00fd\u0177\u00ff]"), Fa = G("\u00f1"), Ga = G("[\u00e7c]"), Ha = G("\u00df"), Ia = G(" & "), Ja = [za, "a", Aa, "e", Ba, "i", Ca, "o", Da, "u", Ea, "y", Fa, "n", Ga, "k", Ha, "s", Ia, " and "];
function xa(a) {
  var b = a = "" + a;
  b.normalize && (b = b.normalize("NFD").replace(da, ""));
  return ba.call(this, b.toLowerCase(), !a.normalize && Ja, ca, !1);
}
;var La = {encode:Ka, rtl:!1, tokenize:"strict"};
const Ma = /[^a-z0-9]+/, Na = {b:"p", v:"f", w:"f", z:"s", x:"s", "\u00df":"s", d:"t", n:"m", c:"k", g:"k", j:"k", q:"k", i:"e", y:"e", u:"o"};
function Ka(a) {
  a = xa.call(this, a).join(" ");
  const b = [];
  if (a) {
    const c = a.split(Ma), d = c.length;
    for (let e = 0, f, g = 0; e < d; e++) {
      if ((a = c[e]) && (!this.filter || !this.filter[a])) {
        f = a[0];
        let h = Na[f] || f, k = h;
        for (let m = 1; m < a.length; m++) {
          f = a[m];
          const p = Na[f] || f;
          p && p !== k && (h += p, k = p);
        }
        b[g++] = h;
      }
    }
  }
  return b;
}
;var Pa = {encode:Oa, rtl:!1, tokenize:""};
const Qa = G("ae"), Ra = G("oe"), Sa = G("sh"), Ta = G("th"), Ua = G("ph"), Va = G("pf"), Wa = [Qa, "a", Ra, "o", Sa, "s", Ta, "t", Ua, "f", Va, "f", G("(?![aeo])h(?![aeo])"), "", G("(?!^[aeo])h(?!^[aeo])"), ""];
function Oa(a, b) {
  a && (a = Ka.call(this, a).join(" "), 2 < a.length && (a = E(a, Wa)), b || (1 < a.length && (a = F(a)), a && (a = a.split(" "))));
  return a || [];
}
;var Ya = {encode:Xa, rtl:!1, tokenize:""};
const Za = G("(?!\\b)[aeo]");
function Xa(a) {
  a && (a = Oa.call(this, a, !0), 1 < a.length && (a = a.replace(Za, "")), 1 < a.length && (a = F(a)), a && (a = a.split(" ")));
  return a || [];
}
;I["latin:default"] = ha;
I["latin:simple"] = ya;
I["latin:balance"] = La;
I["latin:advanced"] = Pa;
I["latin:extra"] = Ya;
const X = self;
let Y;
const Z = {Index:L, Document:R, Worker:O, registerCharset:function(a, b) {
  I[a] = b;
}, registerLanguage:function(a, b) {
  ia[a] = b;
}};
(Y = X.define) && Y.amd ? Y([], function() {
  return Z;
}) : X.exports ? X.exports = Z : X.FlexSearch = Z;
}(this));

'use strict';

(function (global) {

    // minimal symbol polyfill for IE11 and others
    if (typeof Symbol !== 'function') {
        var Symbol = function(name) {
            return name;
        }

        Symbol.nonNative = true;
    }

    const STATE_PLAINTEXT = Symbol('plaintext');
    const STATE_HTML      = Symbol('html');
    const STATE_COMMENT   = Symbol('comment');

    const ALLOWED_TAGS_REGEX  = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;

    function striptags(html, allowable_tags, tag_replacement) {
        html            = html || '';
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return striptags_internal(html, context);
    }

    function init_striptags_stream(allowable_tags, tag_replacement) {
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return function striptags_stream(html) {
            return striptags_internal(html || '', context);
        };
    }

    striptags.init_streaming_mode = init_striptags_stream;

    function init_context(allowable_tags, tag_replacement) {
        allowable_tags = parse_allowable_tags(allowable_tags);

        return {
            allowable_tags : allowable_tags,
            tag_replacement: tag_replacement,

            state         : STATE_PLAINTEXT,
            tag_buffer    : '',
            depth         : 0,
            in_quote_char : ''
        };
    }

    function striptags_internal(html, context) {
        if (typeof html != "string") {
            throw new TypeError("'html' parameter must be a string");
        }

        let allowable_tags  = context.allowable_tags;
        let tag_replacement = context.tag_replacement;

        let state         = context.state;
        let tag_buffer    = context.tag_buffer;
        let depth         = context.depth;
        let in_quote_char = context.in_quote_char;
        let output        = '';

        for (let idx = 0, length = html.length; idx < length; idx++) {
            let char = html[idx];

            if (state === STATE_PLAINTEXT) {
                switch (char) {
                    case '<':
                        state       = STATE_HTML;
                        tag_buffer += char;
                        break;

                    default:
                        output += char;
                        break;
                }
            }

            else if (state === STATE_HTML) {
                switch (char) {
                    case '<':
                        // ignore '<' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // we're seeing a nested '<'
                        depth++;
                        break;

                    case '>':
                        // ignore '>' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // something like this is happening: '<<>>'
                        if (depth) {
                            depth--;

                            break;
                        }

                        // this is closing the tag in tag_buffer
                        in_quote_char = '';
                        state         = STATE_PLAINTEXT;
                        tag_buffer   += '>';

                        if (allowable_tags.has(normalize_tag(tag_buffer))) {
                            output += tag_buffer;
                        } else {
                            output += tag_replacement;
                        }

                        tag_buffer = '';
                        break;

                    case '"':
                    case '\'':
                        // catch both single and double quotes

                        if (char === in_quote_char) {
                            in_quote_char = '';
                        } else {
                            in_quote_char = in_quote_char || char;
                        }

                        tag_buffer += char;
                        break;

                    case '-':
                        if (tag_buffer === '<!-') {
                            state = STATE_COMMENT;
                        }

                        tag_buffer += char;
                        break;

                    case ' ':
                    case '\n':
                        if (tag_buffer === '<') {
                            state      = STATE_PLAINTEXT;
                            output    += '< ';
                            tag_buffer = '';

                            break;
                        }

                        tag_buffer += char;
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }

            else if (state === STATE_COMMENT) {
                switch (char) {
                    case '>':
                        if (tag_buffer.slice(-2) == '--') {
                            // close the comment
                            state = STATE_PLAINTEXT;
                        }

                        tag_buffer = '';
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }
        }

        // save the context for future iterations
        context.state         = state;
        context.tag_buffer    = tag_buffer;
        context.depth         = depth;
        context.in_quote_char = in_quote_char;

        return output;
    }

    function parse_allowable_tags(allowable_tags) {
        let tag_set = new Set();

        if (typeof allowable_tags === 'string') {
            let match;

            while ((match = ALLOWED_TAGS_REGEX.exec(allowable_tags))) {
                tag_set.add(match[1]);
            }
        }

        else if (!Symbol.nonNative &&
                 typeof allowable_tags[Symbol.iterator] === 'function') {

            tag_set = new Set(allowable_tags);
        }

        else if (typeof allowable_tags.forEach === 'function') {
            // IE11 compatible
            allowable_tags.forEach(tag_set.add, tag_set);
        }

        return tag_set;
    }

    function normalize_tag(tag_buffer) {
        let match = NORMALIZE_TAG_REGEX.exec(tag_buffer);

        return match ? match[1].toLowerCase() : null;
    }

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(function module_factory() { return striptags; });
    }

    else if (typeof module === 'object' && module.exports) {
        // Node
        module.exports = striptags;
    }

    else {
        // Browser
        global.striptags = striptags;
    }
}(this));

jQuery.extend({
	highlight: function (node, re, nodeName, className) {
		if (node.nodeType === 3) {
			var match = node.data.match(re);
			if (match) {
				var highlight = document.createElement(nodeName || 'mark');
				highlight.className = className || 'highlight';
				var wordNode = node.splitText(match.index);
				wordNode.splitText(match[0].length);
				var wordClone = wordNode.cloneNode(true);
				highlight.appendChild(wordClone);
				wordNode.parentNode.replaceChild(highlight, wordNode);
				return 1; //skip added node in parent
			}
		} else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
			!/(script|style)/i.test(node.tagName) && // ignore script and style nodes
			!(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
			for (var i = 0; i < node.childNodes.length; i++) {
				i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
			}
		}
		return 0;
	}
});

jQuery.fn.unhighlight = function (options) {
	var settings = { className: 'highlight', element: 'mark' };
	jQuery.extend(settings, options);

	return this.find(settings.element).each(function () {
		var parent = this.parentNode;
		parent.replaceChild(this.firstChild, this);
		parent.normalize();
	}).end();
};

jQuery.fn.highlight = function (words, options) {
	var settings = { className: 'highlight', element: 'mark', caseSensitive: false, wordsOnly: false };
	jQuery.extend(settings, options);

	if (words.constructor === String) {
		words = [words];
	}
	words = jQuery.grep(words, function (word, i) {
		return word != '';
	});
	words = jQuery.map(words, function (word, i) {
		return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	});
	if (words.length == 0) { return this; };

	var flag = settings.caseSensitive ? "" : "i";
	var pattern = "(" + words.join("|") + ")";
	if (settings.wordsOnly) {
		pattern = "\\b" + pattern + "\\b";
	}
	var re = new RegExp(pattern, flag);

	return this.each(function () {
		jQuery.highlight(this, re, settings.element, settings.className);
	});
};
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007 Ariel Flesler - aflesler ○ gmail • com | https://github.com/flesler
 * Licensed under MIT
 * https://github.com/flesler/jquery.scrollTo
 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global
		factory(jQuery);
	}
})(function($) {
	'use strict';

	var $scrollTo = $.scrollTo = function(target, duration, settings) {
		return $(window).scrollTo(target, duration, settings);
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: 0,
		limit:true
	};

	function isWin(elem) {
		return !elem.nodeName ||
			$.inArray(elem.nodeName.toLowerCase(), ['iframe','#document','html','body']) !== -1;
	}

	$.fn.scrollTo = function(target, duration, settings) {
		if (typeof duration === 'object') {
			settings = duration;
			duration = 0;
		}
		if (typeof settings === 'function') {
			settings = { onAfter:settings };
		}
		if (target === 'max') {
			target = 9e9;
		}

		settings = $.extend({}, $scrollTo.defaults, settings);
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		var queue = settings.queue && settings.axis.length > 1;
		if (queue) {
			// Let's keep the overall duration
			duration /= 2;
		}
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);

		return this.each(function() {
			// Null target yields nothing, just like jQuery does
			if (target === null) return;

			var win = isWin(this),
				elem = win ? this.contentWindow || window : this,
				$elem = $(elem),
				targ = target,
				attr = {},
				toff;

			switch (typeof targ) {
				// A number will pass the regex
				case 'number':
				case 'string':
					if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
						targ = both(targ);
						// We are done
						break;
					}
					// Relative/Absolute selector
					targ = win ? $(targ) : $(targ, elem);
					/* falls through */
				case 'object':
					if (targ.length === 0) return;
					// DOMElement / jQuery
					if (targ.is || targ.style) {
						// Get the real position of the target
						toff = (targ = $(targ)).offset();
					}
			}

			var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

			$.each(settings.axis.split(''), function(i, axis) {
				var Pos	= axis === 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					prev = $elem[key](),
					max = $scrollTo.max(elem, axis);

				if (toff) {// jQuery / DOMElement
					attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

					// If it's a dom element, reduce the margin
					if (settings.margin) {
						attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
					}

					attr[key] += offset[pos] || 0;

					if (settings.over[pos]) {
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis === 'x'?'width':'height']() * settings.over[pos];
					}
				} else {
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) === '%' ?
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if (settings.limit && /^\d+$/.test(attr[key])) {
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
				}

				// Don't waste time animating, if there's no need.
				if (!i && settings.axis.length > 1) {
					if (prev === attr[key]) {
						// No animation needed
						attr = {};
					} else if (queue) {
						// Intermediate animation
						animate(settings.onAfterFirst);
						// Don't animate this axis again in the next iteration.
						attr = {};
					}
				}
			});

			animate(settings.onAfter);

			function animate(callback) {
				var opts = $.extend({}, settings, {
					// The queue setting conflicts with animate()
					// Force it to always be true
					queue: true,
					duration: duration,
					complete: callback && function() {
						callback.call(elem, targ, settings);
					}
				});
				$elem.animate(attr, opts);
			}
		});
	};

	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function(elem, axis) {
		var Dim = axis === 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;

		if (!isWin(elem))
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();

		var size = 'client' + Dim,
			doc = elem.ownerDocument || elem.document,
			html = doc.documentElement,
			body = doc.body;

		return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
	};

	function both(val) {
		return $.isFunction(val) || $.isPlainObject(val) ? val : { top:val, left:val };
	}

	// Add special hooks so that window scroll properties can be animated
	$.Tween.propHooks.scrollLeft =
	$.Tween.propHooks.scrollTop = {
		get: function(t) {
			return $(t.elem)[t.prop]();
		},
		set: function(t) {
			var curr = this.get(t);
			// If interrupt is true and user scrolled, stop animating
			if (t.options.interrupt && t._last && t._last !== curr) {
				return $(t.elem).stop();
			}
			var next = Math.round(t.now);
			// Don't waste CPU
			// Browsers don't render floating point scroll
			if (curr !== next) {
				$(t.elem)[t.prop](next);
				t._last = this.get(t);
			}
		}
	};

	// AMD requirement
	return $scrollTo;
});

$(document).ready(function () {
	$(finder.activator).click(function() {
		finder.activate();
	});

	$(document).on('mousedown', '#finderClose,#finderPrev,#finderNext', (function (event) {
		if (event.which === 1) {
			switch ($(event.target).attr('id') || $(event.target).parents().attr('id')) {
				case 'finderClose':
					finder.closeFinder();
					break;
				
				case 'finderPrev':
					finder.prevResult();
					break;

				case 'finderNext':
					finder.nextResult();
					break;
				
				default:
					return true;
			}
		}
	}));
	
});

const finder = {
	activator: '[data-finder-activator]',

	content: '[data-finder-content]',

	wrapper: '[data-finder-wrapper]',

	scrollOffset: () => $(finder.wrapper).data('finderScrollOffset'),

	activate: () => {
		if (!$('#finder').length) {
			finder.createFinder();
		}
		//setTimeout(function () {
			$('#finder').addClass('active');
			$('#finderInput').focus();
			if ($('#finderInput').val()) {
				finder.findTerm($('#finderInput').val());
			}
			$('#finderInput').on('input', $.debounce(600, function () {
				finder.findTerm($(this).val());
			}));
		//}, 50);
	},

	createFinder: () => {
		if($('#finder').length) return;
		const finderElem = $('<div />')
			.attr({
				'id': 'finder',
				'class': 'finder'
			})
			.prependTo(finder.wrapper);

		const input = $('<input />')
			.attr({
				'id': 'finderInput',
				'type': 'text',
				'class': 'finder-input',
				'placeholder': 'Find text in page...',
			})
			.appendTo(finderElem);

		const prev = $('<button />')
			.attr({
				'id': 'finderPrev',
				'class': 'btn btn-finder btn-finder-prev',
			})
			.appendTo(finderElem);

		const prevIcon = $('<i />')
			.attr({
				'class': 'fas fa-angle-up',
			})
			.appendTo(prev);

		const next = $('<button />')
			.attr({
				'id': 'finderNext',
				'class': 'btn btn-finder btn-finder-next',
			})
			.appendTo(finderElem);

		const nextIcon = $('<i />')
			.attr({
				'class': 'fas fa-angle-down',
			})
			.appendTo(next);

		const close = $('<button />')
			.attr({
				'id': 'finderClose',
				'class': 'btn btn-finder btn-finder-close',
			})
			.appendTo(finderElem);

		const closeIcon = $('<i />')
			.attr({
				'class': 'fas fa-times',
			})
			.appendTo(close);
	},

	closeFinder: () => {
		$('#finder').removeClass('active');
		$(finder.content).unhighlight();
	},

	resultsCount: 0,

	currentResult: 0,

	findTerm: (term) => {
		if(term.length === 1)
			term = "";
		// highlight results
		$(finder.content).unhighlight();
		$(finder.content).highlight(term);

		finder.findExistingMarks(term);
	},

	findExistingMarks: (term=null) => {
		finder.resultsCount = $('mark').length;

		if (finder.resultsCount) {
			// there are results, scroll to first one
			finder.currentResult = 1;
			finder.scrollToCurrent();
		} else {
			// no results
			finder.currentResult = 0;
		}

		// term not found
		if (!finder.resultsCount && term) {
			$('#finderInput').addClass('not-found');
		} else {
			$('#finderInput').removeClass('not-found');
		}

		finder.updateCurrent();
	},

	scrollToCurrent: () => {
		let scrollingElement;

		let i = finder.currentResult - 1;
		$('mark').removeClass('active');
		$(`mark:eq(${i})`).addClass('active');

		let offsetTop = -100;
		if (finder.scrollOffset() !== null) {
			offsetTop = finder.scrollOffset() * -1;
		}

		$(finder.wrapper).scrollTo('mark.active', {
			offset: {
				left: 0,
				top: offsetTop,
			},
		});
	},

	prevResult: () => {
		if (finder.resultsCount) {
			if (finder.currentResult > 1) {
				finder.currentResult--;
			} else {
				finder.currentResult = finder.resultsCount;
			}
			finder.scrollToCurrent();
		}

		finder.updateCurrent();
	},

	nextResult: () => {
		if(!finder.resultsCount)
			finder.resultsCount = $('mark').length;
		if (finder.resultsCount) {
			if (finder.currentResult < finder.resultsCount) {
				finder.currentResult++;
			} else {
				finder.currentResult = 1;
			}
			finder.scrollToCurrent();
		}

		finder.updateCurrent();
	},

	updateCurrent: () => {
		if ($('#finderInput').val()) {
			if (!$('#finderCount').length) {
				const countElem = $('<span />')
					.attr({
						'id': 'finderCount',
						'class': 'finder-count',
					})
					.insertAfter('#finderInput');
			}
			setTimeout(function () {
				$('#finderCount').text(finder.currentResult + ' / ' + finder.resultsCount);
			}, 50);
		} else {
			$('#finderCount').remove();
		}
	},
}
class Bible {
    static Stats = {"Genesis":[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],"Exodus":[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],"Leviticus":[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],"Numbers":[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],"Deuteronomy":[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],"Joshua":[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],"Judges":[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],"Ruth":[22,23,18,22],"1 Samuel":[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],"2 Samuel":[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],"1 Kings":[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],"2 Kings":[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],"1 Chronicles":[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],"2 Chronicles":[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],"Ezra":[11,70,13,24,17,22,28,36,15,44],"Nehemiah":[11,20,32,23,19,19,73,18,38,39,36,47,31],"Esther":[22,23,15,17,14,14,10,17,32,3],"Job":[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],"Psalms":[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],"Proverbs":[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],"Ecclesiastes":[18,26,22,16,20,12,29,17,18,20,10,14],"Solomon":[17,17,11,16,16,13,13,14],"Isaiah":[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],"Jeremiah":[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],"Lamentations":[22,22,66,22,22],"Ezekiel":[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],"Daniel":[21,49,30,37,31,28,28,27,27,21,45,13],"Hosea":[11,23,5,19,15,11,16,14,17,15,12,14,16,9],"Joel":[20,32,21],"Amos":[15,16,15,13,27,14,17,14,15],"Jonah":[17,10,10,11],"Micah":[16,13,12,13,15,16,20],"Nahum":[15,13,19],"Habakkuk":[17,20,19],"Zephaniah":[18,15,20],"Haggai":[15,23],"Zechariah":[21,13,10,14,11,15,14,23,17,12,17,14,9,21],"Malachi":[14,17,18,6],"Matthew":[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],"Mark":[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,8],"Luke":[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],"John":[51,25,36,54,47,71,52,59,41,42,57,50,38,31,27,33,26,40,42,31,25],"Acts":[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],"Romans":[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],"1 Corinthians":[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],"2 Corinthians":[24,17,18,18,21,18,16,24,15,18,33,21,14],"Galatians":[24,21,29,31,26,18],"Ephesians":[23,22,21,32,33,24],"Philippians":[30,30,21,23],"Colossians":[29,23,25,18],"1 Thessalonians":[10,20,13,18,28],"2 Thessalonians":[12,17,18],"1 Timothy":[20,15,16,16,25,21],"2 Timothy":[18,26,17,22],"Titus":[16,15,15],"Hebrews":[14,18,19,16,14,20,28,13,28,39,40,29,25],"James":[27,26,18,17,20],"1 Peter":[25,25,22,19,14],"2 Peter":[21,22,18],"1 John":[10,29,24,21,21],"Revelation":[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]}
    static Books = {};

    static contentRegex = /(((([123]|\bI+|First|Second|Third)\s*)?[A-Z][a-z]+\.?)\s(\d+:\s*)((\d|[:.]\s*|;\s(?=\s*\d+:)|,\s*|-|(?:\s+\d+:))+))\b/g
    static regex = /((([123]|\bI+ |First|Second|Third)\s*)?[A-Z][a-z]+\.?)\s((\d|[:.]\s*|;\s(?=\s*\d+:)|,\s*|-|(?:\s+\d+:))+)/g;
    static regexVerses = /(\d+)[:;.]\s*((\d+)( ?[,-] ?)?(?!\d+:))+/g;
    static regexVersesSub = /(\d+)(\s*[,-]\s*)?/g;
    static regexGoesOverEnd = /(\d+):(\d+)-(\d+):(\d+)/g;

    static Fetch(books, callback){
        let needSearching = books.filter((b) => Bible.Books[b] == null);
        if (!needSearching.length){
            if(callback) callback();
            return;
        }
        let promises = [];
        let completions = 0;
        for (const book of needSearching){
            promises.push($.getJSON('js/nwt/' + book + ".json", function(data){
                Bible.Books[book] = data;
                // if(++completions === promises.length)
                //     if(callback) callback();
            }));
        }
        return $.when(...promises).then(function(){
            if(callback) callback();
        });
    }
    static GetBooksAndVersess(line){
        let matches = [...line.matchAll(this.regex)];

        let versesOnLine = 0;
        let bookDict = {};

        for(let i = 0; i < matches.length; i++)
        {
            let match = matches[i]

            let book = match[1].toLowerCase();
            book = BibleBooks.ComplexMatchBook(book);
            if (book === "") break;
            if (!book || book.length === 0)
            {
                break;
            }
            if(!bookDict[book])
                bookDict[book] = {};

            let bookChapters = this.Stats[book];

            let rawVerse = match[0].replace(/(^[-,"\s]|[-,"\s]$)/g, '').replace(/(:)\s*/, '$1').replace(';', ' ');
            if (bookChapters != null && bookChapters.length === 1 && rawVerse.indexOf(':') === -1)
            {
                rawVerse = rawVerse.replace(/^(\d*\s*\w+\.?)\s*/, "$1 1:");
            }

            if (rawVerse.match(/:/g).length > 1)
            {
                let overmatch;
                while((overmatch = this.regexGoesOverEnd.exec(rawVerse)) !== null)
                {
                    let startChapter = parseInt(overmatch[1]);
                    if (startChapter <= 0) { continue; }
                    let startVerse = parseInt(overmatch[2]);
                    let endChapter = parseInt(overmatch[3]);
                    let endVerse = parseInt(overmatch[4]);
                    if (endChapter > startChapter + 3) { continue; }
                    if (endChapter < startChapter) { continue; }
                    if (bookChapters == null) continue;
                    if (startChapter > bookChapters.length || endChapter > bookChapters.length) continue;
                    for (let c = startChapter; c <= endChapter; c++)
                    {
                        let maxVerse = c === endChapter ? Math.min(endVerse, bookChapters[c - 1]): bookChapters[c - 1];
                        for (let verse = startVerse; verse <= maxVerse; verse++)
                        {
                            if(!bookDict[book][c]) bookDict[book][c] = [];
                            bookDict[book][c].push(verse);
                        }
                        startVerse = 0;
                    }
                }
                rawVerse = rawVerse.replace(this.regexGoesOverEnd, "");
            }

            //if(verseGroups.Count > 1) { }
            let verseMatch;
            while((verseMatch = this.regexVerses.exec(rawVerse)) !== null)
            {
                var chapter = parseInt(verseMatch[1]);
                if (chapter <= 0) { continue; }
                if (bookChapters != null && chapter > bookChapters.length) continue;
                let startVerse = 99999;

                let versesPart = verseMatch[0].substr(verseMatch[0].indexOf(':') + 1);
                let subMatches = [...versesPart.matchAll(this.regexVersesSub)]
                for (let i = 0; i < subMatches.length; i++)
                {
                    let endVerse = parseInt(subMatches[i][1].trim());
                    let mode = (i === 0) ? ',' : subMatches[i - 1][2].trim();
                    if (mode === ',') startVerse = endVerse;
                    else startVerse++;
                    if (bookChapters != null && endVerse > bookChapters[chapter - 1]) continue;
                    if (endVerse - startVerse > 100) continue;
                    for (let v = startVerse; v <= endVerse; v++)
                    {
                        //let textVer = chapter + ":" + v;
                        if(!bookDict[book][chapter]) bookDict[book][chapter] = [];
                        bookDict[book][chapter].push(v);
                    }
                }
            }

        }

        return bookDict;
    }
}

class BibleBooks {
    static books = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "1 Peter",
        "2 Peter",
        "1 John",
        "2 John",
        "3 John",
        "Jude",
        "Revelation"
    ];
    static initd = false;
    static Init(){
        if(this.initd) return;
        this.initd = true;
        for(const value of Object.values(BibleBooks.conversion)){
            BibleBooks.conversion[value.toLowerCase()] = value;
        }
    }
    static GetBookAtIndex(index){
        return BibleBooks.books[index];
    }
    static GetIndexOfBook(book){
        let index = BibleBooks.books.indexOf(book);
        if(index === -1){
            console.error("Could not find index for Bible book " + book);
        }
        return index;
    }
    static ComplexMatchBook(book)
    {
        this.Init();
        book = book.replace(/\.+$/, '').toLowerCase();

        if (!book || book.length === 0) return null;
        book = book.replace(/\s+/, ' ');
        if (isNumeric(book.charAt(0)) && book.charAt(1) !== ' ')
            book = book[0] + " " + book.Substring(1);
        let exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        if(book.match(/^(i+) /)){
            book = book.replace(/^(i+) /, (match, match0)=>{
                return match0.length + " ";
            });
        }
        book = book.replace(/\s+/, " ");
        book = book.replace(/First/i, "1");
        book = book.replace(/Second/i, "2");
        book = book.replace(/Third/i, "3");

        exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        book = book.replace(/^[\d\s]*/, '');
        exactMatch = this.conversion[book];
        if (exactMatch) return exactMatch;

        return null;
    }

    static conversion = {
        "jude": "Jude",
        "1 tim": "1 Timothy",
        "2 tim": "2 Timothy",
        "1 ti": "1 Timothy",
        "2 ti": "2 Timothy",
        "matt": "Matthew",
        "mt": "Matthew",
        "mr": "Mark",
        "mk": "Mark",
        "ezra": "Ezra",
        "ezr": "Ezra",
        "ez": "Ezra",
        "esdras": "Ezra",
        "psalm": "Psalms",
        "1 psalm": "Psalms",
        "2 psalm": "Psalms",
        "3 psalm": "Psalms",
        "ps": "Psalms",
        "pss": "Psalms",
        "psa": "Psalms",
        "gen": "Genesis",
        "prov": "Proverbs",
        "ex": "Exodus",
        "exo": "Exodus",
        "lev": "Leviticus",
        "le": "Leviticus",
        "zech": "Zechariah",
        "zec": "Zechariah",
        "jas": "James",
        "ezek": "Ezekiel",
        "ezck": "Ezekiel",
        "eccl": "Ecclesiastes",
        "ecclus": "Ecclesiastes",
        "ec": "Ecclesiastes",
        "ecclesiasticus": "Ecclesiastes",
        "hag": "Haggai",
        "1 chron": "1 Chronicles",
        "2 chron": "2 Chronicles",
        "1 chro": "1 Chronicles",
        "2 chro": "2 Chronicles",
        "1 chr": "1 Chronicles",
        "2 chr": "2 Chronicles",
        "1 ch": "1 Chronicles",
        "2 ch": "2 Chronicles",
        "1 paralipomenon": "1 Chronicles",
        "2 paralipomenon": "2 Chronicles",
        "rev": "Revelation",
        "1 cor": "1 Corinthians",
        "2 cor": "2 Corinthians",
        "1 co": "1 Corinthians",
        "2 co": "2 Corinthians",
        "isa": "Isaiah",
        "isaias": "Isaiah",
        "mic": "Micah",
        "micheas": "Micah",
        "ho": "Hosea",
        "hos": "Hosea",
        "osee": "Hosea",
        "jer": "Jeremiah",
        "zeph": "Zephaniah",
        "sophonias": "Zephaniah",
        "hab": "Habakkuk",
        "habakkuk": "Habakkuk",
        "hahakkuk": "Habakkuk",
        "da": "Daniel",
        "dan": "Daniel",
        "deut": "Deuteronomy",
        "de": "Deuteronomy",
        "rom": "Romans",
        "col": "Colossians",
        "josh": "Joshua",
        "jos": "Joshua",
        "1 thess": "1 Thessalonians",
        "2 thess": "2 Thessalonians",
        "1 thes": "1 Thessalonians",
        "2 thes": "2 Thessalonians",
        "1 thcss": "1 Thessalonians",
        "2 thcss": "2 Thessalonians",
        "1 thcs": "1 Thessalonians",
        "2 thcs": "2 Thessalonians",
        "1 th": "1 Thessalonians",
        "2 th": "2 Thessalonians",
        "1 sam": "1 Samuel",
        "2 sam": "2 Samuel",
        "1 sa": "1 Samuel",
        "2 sa": "2 Samuel",
        "judg": "Judges",
        "jg": "Judges",
        "eph": "Ephesians",
        "nah": "Nahum",
        "pr": "Proverbs",
        "phil": "Philippians",
        "php": "Philippians",
        "phm": "Philemon",
        "philemon": "Philemon",
        "philem": "Philemon",
        "gal": "Galatians",
        "ga": "Galatians",
        "gn": "Galatians",
        "heb": "Hebrews",
        "num": "Numbers",
        "mal": "Malachi",
        "tit": "Titus",
        "obad": "Obadiah",
        "es": "Esther",
        "esth": "Esther",
        "1 ki": "1 Kings",
        "2 ki": "2 Kings",
        "joe": "Joseph",
//"{  ,
        "neh": "Nehemiah",
        "ne": "Nehemiah",
        "re": "Revelation",
        "eze": "Ezekiel",
        "ezech": "Ezekiel",
        "ezechiel": "Ezekiel",
        "ge": "Genesis",
        "ac": "Acts",
        "act": "Acts",
        "ro": "Romans",
        "lu": "Luke",
        "lk": "Luke",
        "joh": "John",
        "jon": "John",
        "jn": "John",
        "jno": "John",
        "jo": "John",
        "1 john": "1 John",
        "2 john": "2 John",
        "3 john": "3 John",
        "1 joh": "1 John",
        "2 joh": "2 John",
        "3 joh": "3 John",
        "1 jo": "1 John",
        "2 jo": "2 John",
        "3 jo": "3 John",
        "1 jn": "1 John",
        "2 jn": "2 John",
        "3 jn": "3 John",
        "1 jon": "1 John",
        "2 jon": "2 John",
        "3 jon": "3 John",
        "1 jno": "1 John",
        "2 jno": "2 John",
        "3 jno": "3 John",
        "nu": "Numbers",
        "job": "Job",
        "mark": "Mark",
        "joel": "Joel",
        "amos": "Amos",
        "zep": "Zephaniah",
        "1 pe": "1 Peter",
        "2 pe": "2 Peter",
        "1 pet": "1 Peter",
        "2 pet": "2 Peter",
        "sura": "Sura",
        "suras": "Sura",
        "jona": "Jonah",
        "ruth": "Ruth",
        "ca": "Solomon",
        "cant": "Solomon",
        "sol": "Solomon",
        "1 macc": "1 Maccabees",
        "2 macc": "2 Maccabees",
        "1 machabees": "1 Maccabees",
        "2 machabees": "2 Maccabees",
        "wisdom": "Wisdom",
        "lam": "Lamentations",
        "la": "Lamentations",
        "mormon": "Mormon",
        "moroni": "Moroni",
        "ether": "Ether",
        "apoc": "Apocalypse",
        "mosiah": "Mosiah",
        "alma": "Alma",
        "1 nephi": "1 Nephi",
        "2 nephi": "2 Nephi",
        "3 nephi": "3 Nephi",
        "helaman": "Helaman",
        "apostles": "Acts",

        "to": "",
        "at": "",
        "and": "",
        "around": "",
        "about": "",
        "between": "",
        "until": "",
        "by": "",
        "was": "",
        "from": "",
        "till": "",
        "through": "",
        "vs": "",
        "ver": "",
        "no": "",
    };
}
class ImageGallery {

    static pagesShown = [];

    static json = null;
    static ShowGallery(randomPage = false) {
        if(!this.json){
            this.pagesShown = (localStorage.getItem('gallery-pages-seen') ?? '').split(' ').map(x => parseInt(x));
            return $.getJSON('index/images.json', function(resp) {
                ImageGallery.json = resp;
                ImageGallery._showImages(randomPage);
            });
        }
        return this._showImages(randomPage);
    }
    static getRandomPage(maxPages){
        let page = 1;
        for(let i = 0; i < 50; i++) {
            page = Math.ceil(maxPages * Math.random());
            if(!this.pagesShown.includes(page))
                break;
            page = Math.max(1, (page - 1));
            if(!this.pagesShown.includes(page))
                break;
        }
        return page;
    }
    static itemsPerPage = 40;
    static  getMaxPages(){
        return Math.ceil(this.json.length / this.itemsPerPage);
    }
    static jumpToIndex(index){
        let page = 1 + Math.floor(index / this.itemsPerPage);
        setPageState('page', page);
    }
    static ShowYear(newYear){
        let index = ImageGallery.json.findIndex(d => d.y == newYear);
        if (index >= 0) {
            ImageGallery.jumpToIndex(index);
            ImageGallery.ShowGallery();
        } else {
            alert("Couldnt find any images for " + newYear);
        }
    }
    static _showImages(randomPage = false){
        let page = randomPage ? null : (getPageState('page') ?? null);
        let allImages = this.json;
        let maxPages = this.getMaxPages();
        if(page == null) {
            page = this.getRandomPage(maxPages);
        }
        page = parseInt(page);
        localStorage.setItem('gallery-pages-seen', this.pagesShown.join(' '));
        if(!this.pagesShown.includes(page)) {
            this.pagesShown.push(page);
            if(this.pagesShown.length > maxPages * 0.8)
                this.pagesShown = this.pagesShown.slice(maxPages * 0.3);
        }
        setPageState('page', page);
        setPageTitle("WTBTS Image Gallery" + pageTitleEnd);
        setPageDescription("Images since 1880 used in Jehovahs Witness publications");

        let pagination = generatePagination(allImages.length, this.itemsPerPage, page - 1, this.getRandomPage(maxPages));
        pagination.addClass('mb-2 mt-2')

        let startItem = (page - 1) * this.itemsPerPage;
        let images = allImages.slice(startItem, startItem + this.itemsPerPage);

        let imageFlow = $("<div class='imageFlow'></div>");
        for(const img of images){
            let article = '#none';
            if (img.t){
                let dir = getPath(getPath(img.f));
                article = '?file=data/' + encodeURICompClean(dir + "/" + img.t) + "#imgsrc=" + basename(img.f);
            }
            else if (img.f.indexOf('_files') >= 0) {
                article = img.f.replace(/_files.*$/g, '.html');
                article = '?file=data/' + encodeURICompClean(article) + "#imgsrc=" + basename(img.f);
            }
            imageFlow.append(`
<div style="width:${img.w*180/img.h}px;flex-grow:${img.w*200/img.h}">
    <i style="padding-bottom:${img.h/img.w*100}%"></i>
    <a href="${article}"><img src="data/${img.f}" alt=""></a>
</div>`);
        }

        let seedUrl = setUrlState(location.href, 'page', page);
        let ControlBar = `
<div class="mb-2 mt-2">
<div class="input-group float-right">
    <input id="shareUrl" type="url" class="form-control" style="max-width: 500px" name="shareURL" value="${seedUrl}" />
    <div class="input-group-append"><button type="button" onclick="ImageGallery.CopyUrlToClipboard()" class="btn btn-primary" type="button">Copy Shareable Link</button></div>
</div>
<span style="color: white">Clicking an image will take you to that spot in the article.</span>
</div>`
        $("#contents").empty().append(ControlBar).append(pagination.clone()).append("<button class='btn btn-outline-light btn-lg' id='yearNum'>"+images[0].y+"</button>").append(imageFlow).append(pagination).append("<div style='height: 200px'></div>");
    }

    static CopyUrlToClipboard(){
        let input = document.getElementById("shareUrl").value;
        navigator.clipboard.writeText(input).then(r => {});
    }
}
$(document).on('click', '#yearNum', function() {
    let newYear = prompt("Enter year", $(this).text());
    if (newYear === null || newYear === undefined) return;
    newYear = parseInt(newYear.trim());
    ImageGallery.ShowYear(newYear);
});
function InsertNav(){
    $('.nav-link').each(function(){
        //console.log(location.href.indexOf($(this).attr('href')));
        if(location.href.indexOf($(this).attr('href')) >= 0) {
            $(this).addClass('active');
        }
    });
}
function addScript(src, async = false) {
    let s = document.createElement( 'script' );
    s.src = src;
    if(async)  s.async = true;
    document.body.appendChild(s);
}

function IsHtml(content){
    return ((/(<p([^>]*)>)/i).test(content));
}

function basename(path) {
    return path.split(/[\\\/]/).reverse()[0];
}
function filenameWithoutExt(path) {
    return path.match(/([^\\\/]+)\.\w+$/)[1] ?? path.match(/([^\\\/]+)$/)[1];
}
function getPath(path) {
    return path.substring(0, Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")));
}

function mergeDict(a, b, path = null) {
    if (path === null) path = [];
    for (const key of Object.keys(b)) {
        let aVal = a[key];
        if (aVal === undefined || typeof aVal === 'function'){
            a[key] = b[key];
        }else{
            let bVal = b[key];
            if (typeof aVal == 'object' && typeof bVal == 'object')
                mergeDict(aVal, bVal, path.concat([key]));
            else if (aVal == b[key]) continue;
            else if (aVal.constructor === Array && bVal.constructor === Array) {
                a[key] = mergeDict(aVal, bVal);
                //a[key] = aVal.concat(bVal);
            }
            else throw new Error("Conflict at " + path.join(".") + key);
        }
    }
    return a;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

var highlightRegex;
var lastHighlightTerms;
function highlightSearchTerms(contents, searchTerms){
    if(searchTerms.length === 0) return contents;
    if(lastHighlightTerms !== searchTerms) {
        let cleanedTerms = searchTerms.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        highlightRegex = new RegExp("(\\b(" + cleanedTerms + ")\w*)", 'gi');
        lastHighlightTerms = searchTerms;
    }
    return contents.replace(highlightRegex, "<mark>$1</mark>");
}
function fuzzyExactMatchRegexJoiner(){
    return '(\\s*[.,!;“”’—\'\\-\\(\\)]*\\s*[.,!;“”’—\'\\-\\(\\)\\w]*\\s*[.,!;“”’—\'\\-\\(\\)]*\\s*)';
}
var lastExtractsTerms;
var extractsRegex;
function createExtracts(content, searchTerms, limit=0, exactSearch=false){
    if(!content) return [];
    if(IsHtml(content)){
        content = striptags(content);
    }
    if(lastExtractsTerms !== searchTerms) {
        lastExtractsTerms = searchTerms;
        if(!exactSearch && searchTerms.length > 3) searchTerms = searchTerms.filter(t => t.length >= 3);
        let cleanedTerms = searchTerms.map(s => escapeRegExp(s)).join(exactSearch ? fuzzyExactMatchRegexJoiner() : '|');
        let regexes = [];
        let startMatch = (/(<p.{1,200}|[^\r\n]{1,100})/).toString().slice(1, -1);//I do this for my IDE. No judging
        let endMatch = (/(.{1,200}<\/p>|[^\r\n]{1,100})/).toString().slice(1, -1);
        console.log(startMatch);
        if(exactSearch){
            regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})${endMatch}`, 'ig'));
        }else {
            if (searchTerms.length >= 4)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})(?<f2>.{0,100})(?<t3>${cleanedTerms})(?<f3>.{0,100})(?<t4>${cleanedTerms})${endMatch}`, 'ig'));
            if (searchTerms.length >= 3)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})(?<f2>.{0,100})(?<t3>${cleanedTerms})${endMatch}`, 'ig'));
            if (searchTerms.length >= 2)
                regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})(?<f1>.{0,100})(?<t2>${cleanedTerms})${endMatch}`, 'ig'));
            regexes.push(new RegExp(`${startMatch}(?<t1>${cleanedTerms})${endMatch}`, 'ig'));
        }
        extractsRegex = regexes;
        console.log(regexes);
    }
    let allResults = [];
    let m;
    for(let i = 0; i < extractsRegex.length; i++) {
        let regex = extractsRegex[i];
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            let matchScore = {};
            let fillerScore = 0;
            for (const [key, match] of Object.entries(m.groups)){
                let char0 = key.charAt(0);
                if(char0 === 't')
                    matchScore[match] = (matchScore[match] ?? 0) + 1;
                else if(char0 === 'f')
                    fillerScore += match.length;
            }
            let score = Object.values(matchScore).reduce((a, b) => (a + a) * (b + b), 1);
            if (allResults.filter(r=>r.value === m[0]).length > 0)
                continue;
            allResults.push({ score: score, fillerScore: fillerScore, value: m[0] });
            if(matchScore.length === searchTerms.length) break;
        }
        if(allResults.length >= 2) break;
    }
    allResults = allResults.sort((a, b) => b.score - a.score || a.fillerScore - b.fillerScore);

    // for(let i = 0; i < extractsRegex.length; i++) {
    //     let results = content.match(extractsRegex[i]);
    //     if(results && results.length > 0) break;
    // }
    return highlightSearchTerms(allResults.slice(0, 2).map(r => r.value.replace(/<img [^>]+>/gi, '')).join(' <b>...</b> '), lastExtractsTerms);
}
function highlightTimestamps(contents){
    return contents.replace(/^((\d+:)?\d+:\d+)/gm, "<i class='ts'>$1</i>");
}

String.prototype.hashCode = function() {
    var i, l, hval = 0x811c9dc5;

    for (i = 0, l = this.length; i < l; i++) {
        hval ^= this.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    // if( asString ){
    //     // Convert to 8 digit hex string
    //     return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    // }
    return hval >>> 0;
}
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv', '([VIXvix]+)'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), (m)=> m.toUpperCase());
            //uppers[i].toUpperCase());

    return str;
}

function HtmlEncode(s) {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function setUrlState(href, param, value) {
    //console.log(param + " = " + value);
    let newURL = new URL(href);
    if (value == null || value === '' || value === '[""]' || value === '[]')
        newURL.searchParams.delete(param);
    else
        newURL.searchParams.set(param, value);
    return newURL.toString();
}
function setPageState(param, value) {
    let dict = { };
    dict[param] = value;
    setPageStates(dict, false, false);
}

function setPageStates(dict, replaceState = false, wipeOthers=false) {
    //console.log(param + " = " + value);
    let newURL = new URL(location.href);
    let name = "?";
    let anyChanges = false;
    if(wipeOthers){
        for(const key of [...newURL.searchParams.keys()])
            if(!(key in dict))
                newURL.searchParams.delete(key);
    }
    for(const [param, value] of Object.entries(dict)) {
        let newVal = value;
        if (newVal == null || newVal === '' || newVal === '[""]' || newVal === '[]')
            newVal = null;
        else if(Number.isInteger(newVal))
            newVal = newVal.toString();
        name += param + ":" + value + "&";
        let curVal = newURL.searchParams.get(param);
        if(newVal === curVal) continue;
        if (newVal == null)
            newURL.searchParams.delete(param);
        else
            newURL.searchParams.set(param, newVal);
        if (!anyChanges)//For debug purposes
            anyChanges = true;
    }
    if(!anyChanges) return;
    if(replaceState)
        window.history.replaceState(name.slice(0, -1), null, newURL.toString().replaceAll("%2F", "/"));
    else
        window.history.pushState(name.slice(0, -1), null, newURL.toString().replaceAll("%2F", "/"));
}
function encodeURICompClean(param){
    return encodeURIComponent(param).replaceAll('%20', '+').replaceAll('%2F', '/');
}
function getPageState(param) {
    return getUrlParam(location.href, param);
}
var lastHref = null;
var lastURL = null;
function getUrlParam(href, param) {
    if(lastHref !== href) {
        lastURL = new URL(href);
    }
    return lastURL.searchParams.get(param);
}

class PublicationCodes {
    static codeToName = {
        //'ws': 'Watchtower',
        'vod': 'Video Subtitles',
        //'dx': 'Indexes',
        'w': 'Watchtower',
        //'ws': 'Watchtower Simplified',
        //'wp': 'Watchtower Public',
        'g': 'Awake / Consolation / Golden Age',
        'bk': 'Books',
        'yb': 'Year Book',
        'manual': 'Manuals / Guidelines',
        'news': 'Publisher Newsletters',
        'mwb': 'Meeting Workbooks',
        'km': 'Kingdom Ministry',
        'brch': 'Brochures',
        'bklt': 'Booklets',
        'trct': 'Tracts',

        'bi': 'Bible',
        'gloss': 'Glossary',
        'it': 'Insight',

        'kn': 'Kingdom News',
        'web': 'Web',
        'pgm': 'Programs',
    };
    static GetCategory(info){
        let category = PublicationCodes.codeToName[info.Category] ?? null;
        if(!category) return null;
        return category;
    }
}
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class BASE_64 {
    static DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
    static toDigit(ch) {
        if (ch >= 48 && ch <= 57) {
            return ch - 48;
        } else if (ch >= 65 && ch <= 90) {
            return ch - 65 + 10;
        } else if (ch == 94) {
            return 36;
        } else if (ch == 95) {
            return 37;
        } else if (ch >= 97 && ch <= 122) {
            return ch - 97 + 38;
        } else {
            throw new IllegalArgumentException("Not valid digit: " + ch);
        }
    }
    // static toChar(digit) {
    //   return this.DIGITS[digit];
    // }
    static toChar(number) {
        //console.log(number);
        return BASE_64.DIGITS.charAt(number);// String.fromCharCode('A'.charCodeAt(0) - 1 + number);
    }
    static toString(number) {
        let string = "";
        let _number = number;
        while (_number > 0) {
            string = BASE_64.toChar(_number % 71 || 71) + string;
            _number = Math.floor((_number - 1) / 71);
        }
        return string;
    }
}
var _setTimeout = setTimeout;
async function until(predicate, interval = 500, timeout = 30 * 1000) {
    const start = Date.now();

    let done = false;

    do {
        if (predicate()) {
            done = true;
        } else if (Date.now() > (start + timeout)) {
            throw new Error(`Timed out waiting for predicate to return true after ${timeout}ms.`);
        }

        await new Promise((resolve) => _setTimeout(resolve, interval));
    } while (done !== true);
}
function defaultDict(defaultValue) {
    this.stringy = JSON.stringify(defaultValue);
    this.get = function (key) {
        if (this.hasOwnProperty(key)) {
            return key;
        } else {
            return JSON.parse(this.stringy);
        }
    }
}

function GetIndexForWord(word){
    let char0 = word.charAt(0).toLowerCase();
    let char1 = word.charAt(1).toLowerCase();
    if('scaptrdmfwbehilognu'.indexOf(char0) >= 0 && char1.match(/[a-z]/i))
        return char0 + char1;
    if(!char0.match(/[a-z0-9]/))
        return 'etc';
    return char0;
}

if(typeof module !== 'undefined')
    module.exports = { PublicationCodes, BASE_64, basename, getPath, mergeDict, filenameWithoutExt, until, GetIndexForWord, encodeURICompClean };
var PerformanceMode = /bot|googlebot|crawler|spider|robot|crawling|Lighthouse/i.test(navigator.userAgent);
PerformanceMode = true;

class PackedData {
    static Ready = false;
    static Data = null;
    static NowReady(){
        this.Ready = true;

        let options = this.Data['index.json'];
        infoStore = this.Data['infoStore.json'];
        delete this.Data['index.json'];
        delete this.Data['infoStore.json'];
        index = new FlexSearch.Document(options);
        for (const [filename, file] of Object.entries(this.Data)) {
            console.log("Importing " + filename);
            index.import(filename, file);
        }
        page_data_ready = true;
        $('#loading-state').html('');

        if(!getPageState('file'))
            pageStateChanged();

        let event = new Event("PackedDataReady", {bubbles: true}); // (2)
        document.dispatchEvent(event);
        // else if(showingFileFor == null && !hasLoadedFileWithStore)
        //     FileOnceStoreLoaded();
    }
}
let search = getPageState('search') ?? getPageState('searchExact') ?? '';
let words = location.hash.substr(location.hash.indexOf('=') + 1);
if(location.hash.startsWith(("#search="))) {
    let words = location.hash.substr(location.hash.indexOf('=') + 1);
    search = decodeURIComponent(words);
}
$("input[type=search]").val(search);

var page_data_ready = false;
var pageTitle = "JWS Online Library";
var pageTitleEnd = " - JWS Online Library";
var pageStates = -1;
var searchCount = 0;
var index = null;
var searchMaps = {};
var infoStore = {};
var loadedCategories = false;
var abortController = new AbortController()
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const monthNamesFull = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

async function GetPackedData(filename) {
    let newCache = null;
    // if ('caches' in window) {
    //     newCache = await window.caches.open('new-cache');
    //     // newCache.add('packedData.json' JSON.stringify(files));
    //     const packedData = await newCache.match(filename);
    //     if (packedData) {
    //         console.log("Used local storage " + filename);
    //         return new Promise(function (resolve, reject) {
    //             return resolve(JSON.parse(packedData));
    //         });
    //     }
    // }
    return new JSZip.external.Promise(function (resolve, reject) {
        let display = filenameWithoutExt(filename);
        display = display.replaceAll('.', ' ');
        $('#loading-state').html(`<h2 style="text-transform: capitalize">Downloading ${display} Data...</h2>`);
        JSZipUtils.getBinaryContent(filename, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
    .then(function (data) {
        $('#loading-state').html('<h2>Unpacking</h2><img src="images/examples/Heatmap Genesis.png" height="1"/>');
        return JSZip.loadAsync(data, {
            // decodeFileName: function (bytes) {
            //     return Encoding.codeToString(Encoding.convert(bytes, { to: 'ASCII', from: 'UTF8' }));
            //     //return iconv.decode(bytes, 'cp866');
            // }
        });
    })
    .then(async function (data) {
        $('#loading-state').html('<img src="images/examples/Heatmap Revelation.png" height="1"/>');
        let files = {};
        for (const [key, file] of Object.entries(data.files)){
            const contents = await file.async("string");
            if(!contents) continue;
            files[key] = JSON.parse(contents);
        }
        //console.log(files);
        // console.log(JSON.stringify(files));
        if(newCache !== null)
            newCache.add(filename, JSON.stringify(files));
        $('#loading-state').html('');
        return files;
    }).then(function(data){
        return data;
    })
}

async function LoadSearchMapsForWords(words){
    let indexNames = words.map(w => GetIndexForWord(index.index.content.encode(w.replace(/^-+/, ''))[0]) );
    let currentMaps = {};
    for (const indexName of Object.values(indexNames)){
        let searchMap = searchMaps[indexName];
        if(searchMap !== undefined){
            currentMaps = mergeDict(currentMaps, searchMap);
            continue;
        }

        await GetPackedData('index/' + indexName + '.content.map.zip')
            .then(async function(files){

                let replaceRegex = new RegExp('^' + indexName + "\.", 'i');
                searchMap = {};
                for (const [filename, file] of Object.entries(files)){
                    console.log("Got Map " + filename);
                    let normalFilename = filename.replace(replaceRegex, '');
                    searchMap[normalFilename] = file;
                }
                searchMaps[indexName] = searchMap;
        });
        currentMaps = mergeDict(currentMaps, searchMap);
    }
    for (const [filename, file] of Object.entries(currentMaps)){
        index.import(filename, file);
    }
}

function getSearchWords(){
    let words = $("input[type=search]").val().trim().replace(/\s{2,5}/g, ' ');
    if (!words) return [];
    words = words.replace(/sh[ae]?ph?[ea]?r?d/gi, "Shepherd");
    words = words.replace(/di?sf.ll?o?w?sh?i?p/gi, "disfellowship");
    words = words.replace(/["'“”’—”]/g, '').split(' ');
    //words = words.match(/\w+|"[^"]+"/g).map(s => s.replaceAll('"', ''));
    return words;
}
function getDateForInfo(info){
    if(!info.Year && info[1] && info[1].Year)
        info = info[1];
    if(info.YMD) return info.YMD;
    let date = info.Year + '';
    if(info.Issue) {
        let issueDate = info.Issue.toString().match(/^(\d{4})(\d{2})($|\d{2})$/);
        if(issueDate) {
            info.Month = parseInt(issueDate[2]);
            info.Day = parseInt(issueDate[3]);
            date += ' ' + String(info.Month).padStart(2, '0') + " " + String(info.Day).padStart(2, '0')
        }
    }
    return info.YMD = date;
}
function GetFriendlyName(info){
    if(info.FriendlyName) return info.FriendlyName;
    let issue = getIssueName(info);
    info.FriendlyName = `${info.Symbol} ${issue} - ${info.UDRT} (${info.Category}) - ${info.Year}`;
    return info.FriendlyName;
}
function getIssueName(info, fullMonth = true){
    getDateForInfo(info);
    const months = fullMonth ? monthNamesFull : monthNames;
    if(info.Month) {
        let issue = (months[info.Month - 1] + (info.Day > 0 ? (" " + info.Day) : ''));
        return issue;
    }
    return info.Issue || '';
}

function getStoredItemTitle(storeItem){
    if(storeItem.title !== undefined) return storeItem.title;
    if(storeItem.t)
        storeItem.title = filenameWithoutExt(storeItem.p);
    else
        storeItem.title = infoStore[storeItem.iid].Title;
    return storeItem.title;
}
function ShowInfo(info){
    HideSideMenu();
    setPageStates({list: 'publications', pubId: info.Name, year: info.Year});
    pageStateChanged();
}
async function DoSearchIfDirty(){
    if(searchDirty)
        await DoSearch();
}
function HideSideMenu(){
    if($("#btnSideMenu").is(":visible")) {
        $("body").removeClass('showSideMenu');
    }
}
async function DoSearch(){
    if(!CheckPackedDataLoaded()){
        setTimeout(DoSearch, 100);
        return;
    }

    const input = $("input[type=search]");
    const searchStart = input.val();
    let words = getSearchWords();
    if(!words.length) return false;
    let thisSearchCount = StopLoading();
    searchDirty = false;

    HideSideMenu();

    let newPageState = {};
    if((getPageState('search') ?? getPageState('searchExact')) !== searchStart){
        newPageState['search'] = searchStart;
        newPageState['searchExact'] = null;
        let div = $('#contents');
        div.text('');
    }

    {
        let articleMatch = searchStart.match(/([a-z]+)(\d+)[\s.]*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d+)[\s.]*(\d+)?/);
        if (articleMatch && articleMatch.length){
            let year = parseInt(articleMatch[2]);
            let curYear = new Date().getFullYear() - 2000;
            if(year < 100 && year > curYear) year = "19" + year;
            let symbol = articleMatch[1] + year;
            let month = articleMatch[3].substring(0, 3);
            if(!isNumeric(month)) {
                let monthIndex = monthNames.findIndex(m => m === month);
                if(monthIndex >= 0) month = monthIndex + 1;
            }else month = parseInt(month);
            let day = articleMatch[4];
            day = isNumeric(day) ? parseInt(day) : 0;
            let forSymbol = Object.values(infoStore).filter(i=> i.Symbol === symbol && getDateForInfo(i));
            let info = forSymbol.find(i => i.Month == month && i.Day == day);
            if(!info)
                info = forSymbol.find(i => i.Month == month);
            //let infoIndex = Object.values(infoStore).indexOf(i=>i.Symbol === symbol);
            if(info){
                ShowInfo(info);
                return;
            }
        }
    }

    await LoadSearchMapsForWords(words);
    console.log("Search Maps Loaded");

    const itemsPerPage = 20;
    let page = (getPageState('page') ?? 1) - 1;
    let rankBy = $("#rankSelector select").val();
    if(rankBy === 'occ') rankBy = null;
    if(rankBy !== getPageState('sort')) {
        newPageState['page'] = null;
        page = 0;
    }
    let itemStart = itemsPerPage * page;

    let minYear = parseInt($("#minYear").val() ?? 1880);
    let maxYear = parseInt($("#maxYear").val() ?? 2022);
    if(minYear < 1880 || maxYear < 1880) return false;
    if(maxYear < minYear) {
        let tmp = minYear;
        minYear = maxYear;
        maxYear = tmp;
    }

    let searchCats = $(".searchNav input:checkbox:checked" ).map(function() {return $(this).val()}).get();
    let untickedCats = $(".searchNav input:checkbox:not(:checked)" ).map(function() {return $(this).val()}).get();
    if (!untickedCats.length) searchCats = [];
    newPageState['file'] = null;
    newPageState['list'] = null;
    newPageState['cat'] = searchCats.length > 0 ? searchCats.join(' ') : null;
    newPageState['sort'] = rankBy;
    newPageState['minYear'] = minYear !== 1880 ? minYear : null;
    newPageState['maxYear'] = maxYear !== 2022 ? maxYear : null;
    setPageStates(newPageState);

    let searchExact = getPageState('searchExact');
    if(words.length <= 1) searchExact = false;

    let positiveWordsList = words.filter(w => !w.startsWith('-'))
    let positiveWords = positiveWordsList.join(' ');
    let negativeWords = words.filter(w => w.startsWith('-'));

    let matchingTitles = [];
    let matchingTitles2 = [];
    if(positiveWords.length > 1) {
        let titleRegex = new RegExp(escapeRegExp(positiveWords).replaceAll(' ', '.*').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        //let titleRegex = new RegExp(positiveWordsList.map(s => escapeRegExp(s).replace(/([a-z])s/ig, '$1\\W?s')).join(fuzzyExactMatchRegexJoiner()), 'ig');
        let titleRegex2 = new RegExp(positiveWordsList.map(s => escapeRegExp(s)).join('|').replace(/([a-z])s/ig, '$1\\W?s'), 'ig');
        for (const [id, store] of Object.entries(index.store)) {
            let info = infoStore[store.iid];
            if(info.Year < minYear || info.Year > maxYear) continue;
            if(searchCats.length > 0 && !searchCats.includes(info.Category)) continue;
            let storeTitle = getStoredItemTitle(store);
            let title = info.UDRT || info.Title;
            // if(title == "Pay Attention To Yourselves And To All The Flock")
            //     debugger;
            if (info.Title !== storeTitle) title += " " + storeTitle;
            title += ` ${info.Symbol} ${info.issue} ${info.UDRT} ${info.Year}`
            let matchScore2 = title.match(titleRegex2);
            if(!matchScore2 || matchScore2.length < positiveWordsList.length)
                continue;
            let matchScore = title.match(titleRegex);
            if (matchScore) {
                matchingTitles.push({id: id, doc: store, searched: title});
                continue;
            }
            if (matchScore2) {
                matchingTitles2.push({id: id, doc: store});
            }
        }
    }

    // console.log(searchCats);
    // const results = index.search([{ field: 'content', query: searchStart, bool: 'or' }], { limit: itemsPerPage, offset: itemsPerPage * offset, enrich: true, suggest: true });
    let results = index.search(positiveWords, { limit: 10000000, enrich: true, suggest: false });
    if (results.length)
        results = results[0].result;
    results = [...matchingTitles, ...matchingTitles2, ...results];

    let negativeResults = new Set();
    if(negativeWords.length){
        for (let word of negativeWords){
            let negativeResult = index.search({ query: word.replace(/^\-/, ''), /*tag:searchCats,*/ index:['content'], limit: 10000000, enrich: false, suggest: false });
            if (negativeResult.length)
                negativeResults = [...negativeResults, ...negativeResult[0].result];
        }
        negativeResults = new Set(negativeResults);
    }

    if(minYear !== 1880 || maxYear !== 2022 || searchCats) {
        results = results.filter((result)=>{
            let info = infoStore[result.doc.iid];
            if(info.Year < minYear || info.Year > maxYear)
                return false;
            if(searchCats.length && !searchCats.includes(info.Category))
                return false;
            if (negativeResults.has(result.id))
                return false;
            return true;
        });
    }

    if(rankBy === "newest"){
        results = results.sort((a, b) => {
            const timeA = getDateForInfo(infoStore[a.doc.iid]);
            const timeB = getDateForInfo(infoStore[b.doc.iid]);
            if(timeA < timeB) return 1;
            if(timeA > timeB) return -1;
            return 0;
        });
    }else if(rankBy === "oldest"){
        results = results.sort((a, b) => {
            const timeA = getDateForInfo(infoStore[a.doc.iid]);
            const timeB = getDateForInfo(infoStore[b.doc.iid]);
            if(timeA < timeB) return -1;
            if(timeA > timeB) return 1;
            return 0;
        });
    }

    $("#resultsCount").text(results.length + " Results")

    let itemEnd = Math.min(itemStart + itemsPerPage, results.length);
    if (searchExact){
        itemEnd = Math.min(2000, results.length);
    }

    let hashcode = '#search=' + encodeURIComponent(words.join(' '));
    let documents = [];
    for(let i = itemStart; i < itemEnd; i++) {
        let result = results[i]
        let info = infoStore[result.doc.iid];
        let issue = getIssueName(info);
        let title = (getStoredItemTitle(result.doc));
        let ref = (`${info.Symbol} ${issue} - ${info.UDRT} (${info.Category}) - ${info.Year}`);
        documents.push(`
<ul class="result resultContentDocument">
    <li class="caption"><a class="lnk" target="_blank" href='?file=data/${encodeURICompClean(result.doc.p)+hashcode}' file="data/${result.doc.p}">${title}</a></li>
    <li class="result"><ul class="resultItems"><li class="searchResult"></li><li class="ref">${ref}</li></ul></li>
</ul>`);
    }
    // console.log(documents);
    const signal = abortController.signal

    $('#resultsHeader').show();
    let pagination = generatePagination(results.length, itemsPerPage, page);

    FileNoLongerActive();
    if(searchExact)
        $('#contents').empty().append($('<div id="results" class="results">Downloading each document and scanning</div>'));
    else
        $('#contents').empty().append($('<div id="results" class="results"></div>').append(documents));
    $('#contents').append(pagination);

    let exactResults = 0;
    async function scanElement(element){
        if(thisSearchCount !== searchCount) return;
        let docPath = $(element).find('[file]').attr('file');
        let lsKey = `se:${searchStart}:${docPath.hashCode()}`;
        if(searchExact){
            let existingResult = localStorage.getItem(lsKey);
            if (existingResult === "0"){
                return;
            }
            $(".pagination").text("Scanning " + $(element).find('li .ref').text());
        }
        await fetch(docPath, {
            cache: "force-cache",
            method: "get",
            redirect: 'follow',
            signal: signal,
        }).then(resp=>resp.text()).then((contents)=>{
            if(!contents || !contents.length) return;
            const classes = GetClassesForContent(contents);
            const extracts = createExtracts(contents, words, 0, searchExact);
            if(thisSearchCount !== searchCount) return;
            if (searchExact){
                localStorage.setItem(lsKey, extracts.length > 0 ? "1" : "0");
            }
            if(extracts.length) {
                $(element).closest('.resultContentDocument').find('.searchResult').append(extracts).addClass(classes);
                if (searchExact) {
                    exactResults++;
                    $('#results').append($(element));
                }
            }
        }).catch(error => console.log(error.message));
    }
    if(searchExact){
        let index = 0;
        for(const doc of documents){
            if(thisSearchCount !== searchCount) return false;
            if(index++ % 3 === 0)
                await scanElement($(doc)[0]);
            else
                scanElement($(doc)[0]);
            if(exactResults > 100) break;
        }
        $(".pagination").text("Scanning Finished" + ((exactResults > 100) ? " - Max 100 results reached" : ""));
    } else{
        let scanContext = $('#contents').find('.resultContentDocument');
        scanContext.each(function(){
            scanElement(this);
        });
    }
    return true;
}
function generatePagination(items, itemsPerPage, page, addRandom = false){
    page = parseInt(page);
    let maxPage = Math.ceil(items / itemsPerPage);
    let pagination = '';
    let paginationStart = Math.max(1, page - 3);
    let paginationEnd = Math.min(maxPage, paginationStart + 9);
    let paginationURL = new URL(location);
    if(addRandom){
        let randomPage = addRandom === true ? Math.floor(maxPage * Math.random()) : parseInt(addRandom);
        paginationURL.searchParams.set('page', randomPage);
        pagination += `<a href='${paginationURL.search}' class="random paginator"><span>🔀 Random Page</span></a>`;
    }
    if (paginationStart > 1) {
        paginationURL.searchParams.set('page', 1);
        pagination += `<a href='${paginationURL.search}' class="paginator"><span>1</span></a>`;
        pagination += `<a href='#${maxPage}' class="paginator" ><span>...</span></a>`;
    }
    for(let i = paginationStart; i <= paginationEnd; i++){
        paginationURL.searchParams.set('page', i);
        let active = (page + 1) === i ? 'active' : '';
        pagination += `<a class="${active} paginator" href='${paginationURL.search}'><span>${i}</span></a>`;
    }
    if(paginationEnd !== maxPage) {
        pagination += `<a href='#${maxPage}' class="paginator" ><span>...</span></a>`;

        paginationURL.searchParams.set('page', maxPage);
        pagination += `<a href='${paginationURL.search}'><span>${maxPage}</span></a>`;
    }
    return $('<div class="pagination"></div>').append(pagination);
}
function SortInfosByYear(infos, reverse){
    if(!infos || infos.length === 0) return [];
    if (reverse) reverse = -1;
    else reverse = 1;
    return infos.sort((a, b) => {
        const timeA = getDateForInfo(a);
        const timeB = getDateForInfo(b);
        if(timeA < timeB) return reverse;
        if(timeA > timeB) return -reverse;
        return 0;
    });
}
function SortInfosByTitle(infos, reverse){
    if(!infos || infos.length === 0) return [];
    if (reverse) reverse = -1;
    else reverse = 1;
    if(!infos[0].Title && infos[0][1] && infos[0][1].Title)
        infos.map(i => { i.sortTitle = i[1].Title.toUpperCase().replace(/["'\-“”]/g, ''); return 1;});
    else if(infos[0].p)
        infos.map(i => { i.sortTitle = getStoredItemTitle(i).toUpperCase().replace(/["'\-“”]/g, ''); return 1;});
    else
        infos.map(i => { i.sortTitle = i.Title.toUpperCase().replace(/["'\-“”]/g, ''); return 1;});

    return infos.sort((a, b) => {
        const valA = a.sortTitle;
        const valB = b.sortTitle;
        return valA.localeCompare(valB, undefined, {
            numeric: true,
            sensitivity: 'base'
        }) * reverse;
    });
}
function StopLoading() {
    abortController.abort();
    abortController = new AbortController()
    return ++searchCount;
}

var lastLocation;
async function pageStateChanged(e = null){
    if(lastLocation != null && lastLocation.search === location.search && lastLocation.hash !== location.hash){
        lastLocation = {...location};
        ResetScroll();
        return;
    }
    lastLocation = {...location};

    pageStates++;
    console.log('pageStateChanged');
    let list = getPageState('list');
    let category = getPageState('category');
    let title = getPageState('title');
    let symbol = getPageState('symbol');
    let pubId = getPageState('pubId');
    let search = getPageState('search') ?? getPageState('searchExact');
    let file = getPageState('file');
    let cat = getPageState('cat');
    let sort = getPageState('sort') ?? 'occ';
    let minYear = getPageState('minYear') ?? '1880';
    let maxYear = getPageState('maxYear') ?? '2022';
    if(!file){
        FileNoLongerActive();
    }
    if(list === "image-gallery"){
        return ImageGallery.ShowGallery();
    }
    if(list === 'publications' || (!file && !search)){
        return ShowPublications(category, title, symbol, pubId);
    }

    if($("#rankSelector select").val() !== sort) {
        $("#rankSelector select").val(sort);
        if(pageStates) searchDirty = true;
    }
    if($("#minYear").val() != minYear){
        $('#minYear').val(minYear);
        if(pageStates) searchDirty = true;
    }
    if($("#maxYear").val() != maxYear){
        $('#maxYear').val(maxYear);
        if(pageStates) searchDirty = true;
    }
    if(cat || !loadedCategories) {
        LoadCategories();
    }
    if(search) {
        if($("input[type=search]").val() !== search)
            $("input[type=search]").val(search);
        if(!file) searchDirty = true;
    }
    if(file) {
        return ShowFile(file);
    }
    else if(searchDirty){
        return DoSearch();
    }
}

function LoadCategories(){
    let cat = getPageState('cat');
    let cats = cat != null ? cat.split(' ') : [];
    if(!loadedCategories){
        console.log("Inserting Categories");
        loadedCategories = true;
        let list = $("#searchFilterContainer").find('ul');
        for(const [code, name] of Object.entries(PublicationCodes.codeToName)) {
            let checked = cat === null || cats.includes(code) ? 'checked' : '';
            list.append(`<li><input type="checkbox" name="filt[]" value="${code}" id="chk-${code}" ${checked}>&nbsp;<label for="chk-${code}">${name}</label></li>`);
        }
    }
    if(!cat) return;
    $("#searchFilterContainer").find('input:checkbox').each(function(){
        let val = $(this).attr('value');
        let check = cats.includes(val);
        if($(this).is(':checked') != check) {
            $(this).prop('checked', check);
            searchDirty = true;
        }
    });
}
var hasLoadedFileWithStore = false;
var showingFileFor = null;
async function ShowFile(docPath, replaceState= false){
    if(showingFileFor === docPath) return;
    let info = null, store = null;
    let preload = null;
    if(index && index.store) {
        StopLoading();
        setPageStates({'file': docPath}, replaceState, true);
        docPath = docPath.replace('\\', '/');
        store = getStoreForFile(docPath);
        if(!store){
            $("#contents").html("<h1>Could not find document</h1>");
            return;
        }
        info = infoStore[store.iid] ?? null;
        //showRelatedFiles(store);
    } else{
        preload = $.getJSON(getPath(docPath) + "/info.json", function(resp) {
            info = resp;
        });
    }
    showingFileFor = docPath;
    let docFetch = fetch(docPath, {
        cache: "force-cache",
        method: "get",
        signal: abortController.signal
    }).then(resp=>resp.text()).catch(error => console.log(error.message));
    $.when(preload, docFetch).done((pl, contents)=>
    {
        if(!info){
            info = { Category: '',  Year: docPath.match(/\b\d{4}\b/), };
            if(info.Year) info.Year = info.Year[0];
            let match;
            if((match = docPath.match(/([^_[a-zA-Z])_E/))) info.Category = match[1];
            if(docPath.includes('/VOD/')) info.Category = 'vod';
        }

        // let searchWords = getSearchWords();
        // if(searchWords && searchWords.length) {
        //     if(searchWords.filter(w=>w.length > 2).length)
        //         searchWords = searchWords.filter(w => w.length > 2);
        //     contents = highlightSearchTerms(contents, searchWords);
        // }
        let dir = getPath(docPath).replace('\\', '/');

        let elements = [];

        let isJwPub = false;
        if (info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
            isJwPub = contents.substr(0, 1000).indexOf('data-pid') >= 0;
            //contents = contents.replace(/src="jwpub-media[^"]*"/g, '');
        }
        contents = contents.replace(/( (src)=['"])/ig, '$1' + dir + '/');
        // contents = contents.replace(/height[:=]"?\s*\d+[\w"]+;?/ig, '');
        contents = contents.replace(/(width[:=]"?\s*)(\d+)([\w"]+;?\s*)(height[:=]"?\s*)(\d+)([\w"]+;?)/ig, function(...m){
            let width = parseFloat(m[2]), height = parseFloat(m[5]);
            let ratio = (width / height).toFixed(3);
            if (m[1].includes(':')){
                return m[1] + m[2] + m[3] + ` aspect-ratio:${ratio}`;
            }else{
                return m[1] + m[2] + m[3] + ` style="aspect-ratio:${ratio};"`;
            }
        });
        let imagesReplaced = 0;
        contents = contents.replace(/<img /, function(v){
            if(++imagesReplaced === 1) return v;
            return '<img loading="lazy" ';
        });
        //contents = contents.replaceAll('<img ', 'bookmark=" ');

        if(info.Category === 'vod') {
            contents = highlightTimestamps(contents);
            if(info.files && info.files.length > 0) {
                let video =  $("<video style='width: 100%; max-width: 720px; display: block' controls></video>");
                let file = info.files[info.files.length - 1];
                video.append(`<source src="${file.progressiveDownloadURL}" type="video/mp4">`);
                video.append(`<track label="English" kind="subtitles" srclang="en" src="${docPath.replace('.txt', '.vtt')}" default />`);
                contents = video[0].outerHTML + "Video above © Watch Tower Bible and Tract Society of Pennsylvania<br/><br/>" + (contents);
            }
        }
        else if(docPath.endsWith(".txt")){
            if($(window).width() < 1000) {
                contents = contents.replace(/([a-z],?)[ ]?\r?\n([a-z])/g, '$1 $2');
            }
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }else if(!isJwPub){
            contents = contents.replace(Bible.contentRegex, "<a href='BIBLE://NWTR/' class='lookupScripture'>$1</a>")
        }

        let classes = GetClassesForContent(contents);
        elements.push($(`<input name="file" type='hidden' value='' />`).val(docPath));
        elements.push(AddDisclaimer(info));
        elements.push(`<div class="document ${classes}">${contents}</div>`);

        $('#loading-state').html('');
        $('#contents').html('').append(elements);
        $('#contents').find('style').remove();

        if(!store && index && index.store) store = getStoreForFile(docPath);
        else document.addEventListener("PackedDataReady", FileOnceStoreLoaded);
        showRelatedFiles(store);

        showingFileFor = null;

        $('#resultsHeader').hide();
        if(info.Title) AddDisclaimer(info);
        $('#contents').fadeIn(200);
        $('#currentFileBox').fadeIn(200);
        if(preload === null) {
            setTimeout(AfterShowFile, 10);
        }
    }).catch(error => {showingFileFor = null; console.log(error.message); });
}
function FileOnceStoreLoaded(){
    let docPath = getPageState('file');
    docPath = docPath.replace('\\', '/');
    let store = getStoreForFile(docPath);
    showRelatedFiles(store);
    AfterShowFile();
}
function AfterShowFile(){
    AddChapters();
    ResetScroll();
    let searchWords = getSearchWords();
    if(searchWords.length && typeof finder !== 'undefined') {
        setTimeout(()=> {
            finder.createFinder();
            $('#finder input').val(searchWords.join(' '));
            finder.activate();
        }, 100);
    }
}

function AddDisclaimer(info){
    let orgName = info.Year > 1932 ? "Watch Tower Bible and Tract Society of Pennsylvania" : (info.Year + " International Bible Students Association");
    let disclaimer = $(`<div id='docDisclaimer'>The content displayed below is for educational and archival purposes only.<br/>Unless stated otherwise, content is © ${orgName}</div>`);
    if(info.Year > 1970 || (info.Year > 1950 && info.Category === 'w')){
        let link = `https://wol.jw.org/en/wol/publication/r1/lp-e/${info.Symbol}`;
        if(info.Month === undefined) getDateForInfo(info);
        if(info.Category === 'w') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/watchtower/the-watchtower-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
        else if(info.Category === 'g') link = `https://wol.jw.org/en/wol/library/r1/lp-e/all-publications/awake/awake-${info.Year}/${monthNamesFull[info.Month - 1].toLowerCase()}` + (info.Day ? '-'+ info.Day : '');
        disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?${link}">You may be able to find the original on wol.jw.org</a>`);
    }else {
        disclaimer.append(`<br/><a target="_blank" rel="noreferrer" href="https://archive.org/search.php?query=${encodeURIComponent(info.Title + " " + info.Year)}"><img alt="pdf" src="images/icons/pdf.png" height="24"> Content is too old for wol.jw.org, original copies may be found on Archive.org</a>`);
    }
    if(location.protocol === "http:"){
        let path = encodeURIComponent("C:\\MyDev\\www\\JW_Lib_Extended\\" + getPath(getPageState('file')));
        let path2 = encodeURIComponent("C:\\MyDev\\WT\\PDFs\\Books\\Sorted\\" + getPath(getPageState('file').substr(10)));
        disclaimer.append(`<br/><br/><a href="OpenFolder:${path}">OPEN FOLDER</a>`);
        disclaimer.append(`<br/><a href="OpenFolder:${path2}">OPEN PDF FOLDER</a>`);
    }
    return disclaimer[0].outerHTML;
}

function ResetScroll(){
    //console.log("ResetScroll");
    setTimeout(()=> {
        if (location.hash) {
            let element;
            if (location.hash.startsWith("#imgsrc")) {
                element = $("img[src$='" + location.hash.substr(location.hash.indexOf('=') + 1) + "']")
            } else if (location.hash.startsWith(("#search="))) {
                let words = location.hash.substr(location.hash.indexOf('=') + 1);
                //$("input[type=search]").val(words);
            } else {
                element = $(location.hash + ",[name='" + location.hash.substr(1) + "']");
            }
            if (element && element.length) {

                ScrollToElement(element, -240);
                //window.scroll(0, element.offset().top - 240);
                //$(window).scrollTo(element, {offset: { left: 0, top: -240,}});
                return;
            }
            return;
        }
        if (window.scrollY !== 0)
            window.scrollTo({top: 0, behavior: 'auto'});
    }, 10);
}
function ScrollToElement(element, offset) {
    let target = null;
    let lastScrollTop = window.scrollY;
    const checkIfScrollToIsFinished = setInterval(() => {
        let curTarget = Math.max(0, element.offset().top + offset);
        if (Math.abs(curTarget - window.scrollY) < 10) {
            // do something
            clearInterval(checkIfScrollToIsFinished);
        }else if(lastScrollTop === window.scrollY){
            target = curTarget;
            console.log("Issue new scroll");
            window.scroll(0, curTarget);
        }
        lastScrollTop = window.scrollY;
    }, 100);
}
function getStoreForFile(path) {
    if(path.startsWith("data/")) path = path.substr("data/".length);
    for (const [key, store] of Object.entries(index.store)) {
        if (store.p === path)
            return store;
    }
    return null;
}
async function ShowPublications(category, title, symbol, pubId) {
    console.log('ShowPublications', category);
    StopLoading();
    let contents = $('#contents');
    FileNoLongerActive();

    let UndatedTitle = getPageState('udrt');
    //await contents.fadeOut(200);

    let list = [];

    let newPageTitle = null;
    let infos = null;
    let groupBy = null;
    let showBy = null;

    if(UndatedTitle) {
        infos = getInfosForUndatedReferenceTitle(UndatedTitle, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${CapitalizeCompressedString(UndatedTitle)}</h1></a>`)[0]);
        // for (const [infoId, info] of infos) {
        //     let issue = getIssueName(info);
        //     if(!issue)issue = info.Title;
        //     list.append(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, null, true));
        // }
        groupBy = "Title";
        //showBy = "Title";
    }

    if(!CheckPackedDataLoaded() && [...new URL(location.href).searchParams].length > 1){
        setTimeout(pageStateChanged, 100);
        return;
    }

    if(pubId) {
        const [infoId, info] = getInfoForPubId(pubId, getPageState('year')??0);
        let issue = getIssueName(info, true);
        if(issue) issue += ' — ';

        let files = Object.values(getFilesForInfoId(infoId));

        if (files.length === 1) {
            await ShowFile("data/" + files[0].p, true);
            return;
        }

        let groupByFirstLetter = category === 'it' || files.length > 200;
        if(pubId === 'The_Emphatic_Diaglott') groupByFirstLetter = false;
        if(groupByFirstLetter){
            if(title){
                list.push($(`<a href="?list=publications&pubId=${info.Name}&year=${info.Year}"><h1><big>‹</big> ${issue} ${info.Title} - ${title.toUpperCase()}</h1></a>`)[0]);
                files = files.filter(f => getStoredItemTitle(f).match(/[a-z]/i)[0].toUpperCase() === title);
                files = SortInfosByTitle(files);
                for (const item of files) {
                    list.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', getStoredItemTitle(item), null, null, true));
                }
            }else {
                list.push($(`<a href="?list=publications&category=${info.Category}&title=${encodeURICompClean(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`)[0]);
                let chars = [...new Set(files.map(f => getStoredItemTitle(f).match(/[a-z]/i)[0].toUpperCase()))].sort();
                for (const char of chars) {
                    list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&title=${char}&year=${info.Year}`, null, '.icon-docs', char.toUpperCase(), null, null, true));
                }
            }
        }else {
            files = SortInfosByTitle(files);
            list.push($(`<a href="?list=publications&category=${info.Category}&title=${encodeURICompClean(info.Title)}"><h1><big>‹</big> ${issue} ${info.Title}</h1></a>`)[0]);
            for (const item of files) {
                list.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', getStoredItemTitle(item), null, null, true));
            }
        }
    }
    else if(symbol) {
        infos = getInfosForSymbol(symbol, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${CapitalizeCompressedString(symbol)}</h1></a>`)[0]);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue)issue = info.Title;
            list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, null, true));
        }
    }
    else if(title) {
        if(title.startsWith('%'))
            infos = getInfosForTitleStart(title.substr(1), infos)
        else
            infos = getInfosForTitle(title, infos)
        infos = SortInfosByYear(infos);
        let info = infos[0][1];
        list.push($(`<a href="?list=publications&category=${info.Category}"><h1><big>‹</big> ${title}</h1></a>`)[0]);
        for (const [infoId, info] of infos) {
            let issue = getIssueName(info);
            if(!issue) issue = info.Title;
            else issue = info.Year + " - " + issue;
            let showYear = info.Title.indexOf(info.Year) === -1 ? info.Year : '';
            list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, issue, null, showYear, true));
        }
    }
    else if(category) {
        let categoryName = PublicationCodes.codeToName[category];
        let sortBy = getPageState('sort');
        let sortByYearSel = !sortBy ? 'selected' : '';
        let sortByTitleSel = sortBy === 'Title' ? 'selected' : '';
        let sortSelect = (`<select class="form-select w-auto d-inline-block" name='sort'><option value='' ${sortByYearSel}>By Year</option><option value='Title' ${sortByTitleSel}>By Title</option></select>`);
        if(!list.length)
            list.push($(`<div><a class="d-inline-block" href="?list=publications"><h1><big>‹</big> ${categoryName}</h1></a>&nbsp;&nbsp;`+ sortSelect + "</div>")[0]);
        infos = getInfosForCategory(category, infos);
        if(getPageState('sort') === "Title")
            infos = SortInfosByTitle(infos, infos);
        else
            infos = SortInfosByYear(infos, infos);
        if(!groupBy)
            groupBy = getGroupByForCategory(category);
        let groups = {};
        let groupFirstLetter = false;
        for (const [infoId, info] of infos) {
            let groupName = info[groupBy];
            if (groupFirstLetter) groupName = groupName.charAt(0);
            if (!groups[groupName]) groups[groupName] = {};
            groups[groupName][infoId] = info;
        }
        for (let [title, items] of Object.entries((groups))) {
            let subinfos = Object.values(items);
            let info = subinfos[0];
            let displayTitle = showBy ? info[showBy] : title;
            let maxYear = subinfos[subinfos.length - 1].Year;
            let showYear = displayTitle.indexOf(info.Year) === -1 ? info.Year : '';
            if(info.Year != maxYear) showYear = info.Year+'-'+maxYear;
            if(category === 'vod'){
                displayTitle = CapitalizeCompressedString(title);
            }else if(groupFirstLetter)
                title = '%' + title;
            if (subinfos.length === 1) {
                list.push(buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, `.icon-${info.Category}`, info.Title, null, showYear, true));
            } else {
                list.push(buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=` + encodeURICompClean(title), null, `.icon-folder`, displayTitle, null, showYear, true));
            }
        }
    }
    else {
        newPageTitle = "Publications"
        list.push(buildDirectoryItem(`?list=image-gallery`, null, `.icon-images`, 'Image Gallery', 'View the thousands of images', 'Wow!', true));
        for (const [code, name] of Object.entries(PublicationCodes.codeToName)) {
            list.push(buildDirectoryItem(`?list=publications&category=${code}`, null, `.icon-${code}`, name, null, null, true));
        }
    }

    if(category || title || symbol || pubId || location.search !== '')
        setPageStates({'file': null, search: null, page: null, list: 'publications', category: category, title: title, symbol: symbol, pubId: pubId });

    if (newPageTitle) {
        setPageTitle(newPageTitle + pageTitleEnd);
        setPageDescription("Index for " + newPageTitle + " by Jehovahs Witnesses");
    } else if(list.length > 0) {
        let catTitle = list[0].textContent.replace("‹", '').trim();
        setPageTitle(catTitle + pageTitleEnd);
        setPageDescription("Index for " + catTitle + " by Jehovahs Witnesses");
    }

    let listEl = document.createElement('ul');
    listEl.classList.add('directory');
    listEl.append(...list);

    let container = document.createElement('div');
    container.classList.add('publications');
    container.appendChild(listEl);

    $('#contents')[0].replaceChildren(container);
    $('#resultsHeader').hide();

    // contents.fadeIn(200);
    ResetScroll();
}
function getGroupByForCategory(category){
    if(category == 'vod') return 'Symbol';
    if(category == 'news') return 'UDRT';
    return 'Title';
}
function FileNoLongerActive(){
    if(showCurrentFileBox) {
        showCurrentFileBox = false;
        $("#currentFileBox").fadeOut(0, function () {
            $(this).html('')
        });
    }
    if(showingRelatedFiles) {
        showingRelatedFiles = false;
        $("#relatedDocuments").fadeOut(200, function () {
            $("#searchRefineForm").fadeIn(200);
        });
    }else{
        $("#searchRefineForm").fadeIn(0);
    }
}
function getFilesForInfoId(infoId){
    //let infoId = store.iid;
    let results = {};
    for (let id = Math.max(1, infoId - 50); id < infoId + 100; id++) {
        let store = index.store[id];
        if (store === null || store.iid > infoId) return results;
        if (store.iid != infoId) continue;
        results[id] = store;
    }
    return results;
}
function getInfoForPubId(pubId, year=0){
    for(const [infoId, info] of Object.entries((infoStore))){
        if(year !== 0 && info.Year != year)
            continue;
        if(info.Name === pubId)
            return [infoId, info];
    }
}
function getInfosForCategory(code, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Category === code;
    });
}
function getInfosForTitleStart(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Title.startsWith(title);
    });
}
function getInfosForTitle(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Title === title;
    });
}
function getInfosForSymbol(symbol, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.Symbol === symbol;
    });
}
function getInfosForUndatedReferenceTitle(title, existingList = null){
    if(existingList) existingList = Object.fromEntries(existingList);
    return Object.entries(existingList ?? infoStore).filter(function([infoId, info]) {
        return info.UDRT === title;
    });
}
function CapitalizeCompressedString(text){
    return text.replace(/([a-zA-Z])([A-Z][a-z])/g, '$1 $2');
}

var relatedFilesCategoryTitle;
var showingRelatedFiles = false;
async function showRelatedFiles(store) {
    //console.log('showRelatedFiles', path);
    if (store == null) return;
    let info = infoStore[store.iid];

    showingRelatedFiles = true;
    let searchRefine = $("#searchRefineForm");
    let relatedDocs = $("#relatedDocuments");
    if (relatedDocs.attr('infoId') == store.iid) {
        highlightRelatedFile();

        searchRefine.fadeOut(200, function() {
            relatedDocs.fadeIn(200);
        });

        let titleYear = '';
        let storeTitle = getStoredItemTitle(store);
        if(!storeTitle.includes(info.Year.toString()) && !relatedFilesCategoryTitle.includes(info.Year.toString()))
            titleYear = ` ${info.Year} `;
        setPageTitle(storeTitle + titleYear + ((relatedFilesCategoryTitle !== storeTitle) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);
        setPageDescription(storeTitle + " published in " + info.Year);
        return;
    }

    let items = Object.values(getFilesForInfoId(store.iid));
    console.log('Related files', items);

    let issue = getIssueName(info, false);

    let newItems = [];
    if (items.length === 1) {
        let groupBy = getGroupByForCategory(info.Category);
        relatedFilesCategoryTitle = CapitalizeCompressedString(info[groupBy]);
        let di = buildDirectoryItem(`?list=publications&category=${info.Category}&${groupBy.toLowerCase()}=${encodeURICompClean(info[groupBy])}`, null, '.icon-folder', relatedFilesCategoryTitle, null, null, false, true);
        di.classList.add('folder');
        newItems.push(di);
    }
    else {
        relatedFilesCategoryTitle = info.Title + " " + issue;
        let di = buildDirectoryItem(`?list=publications&pubId=${info.Name}&year=${info.Year}`, null, '.icon-folder', relatedFilesCategoryTitle, null, null, false, true);
        di.classList.add('folder');
        newItems.push(di);
    }
    for (const item of items){
        let title = getStoredItemTitle(item);
        if (items.length === 1) title += " " + issue;
        newItems.push(buildDirectoryItem(null, "data/" + item.p, '.icon-docs', title , null, null, true));
    }

    if(info.Category === 'vod')
        relatedFilesCategoryTitle += " Subtitles";

    let titleYear = '';
    let storeTitle = getStoredItemTitle(store);
    if(!storeTitle.includes(info.Year.toString()) && !relatedFilesCategoryTitle.includes(info.Year.toString()))
        titleYear = ` ${info.Year} `;
    setPageTitle(storeTitle + titleYear + ((relatedFilesCategoryTitle !== storeTitle) ? " - " + relatedFilesCategoryTitle : '') + pageTitleEnd);
    setPageDescription(storeTitle + " published in " + info.Year);

    if (relatedDocs.is(":visible")){
        await relatedDocs.fadeOut(200);
    }
    relatedDocs.empty();
    let list = $("<ul class='directory'></ul>");
    list.append(newItems);
    relatedDocs.append(list);

    searchRefine.fadeOut(200, function() {
        $('#relatedDocuments').fadeIn(200);
    });

    relatedDocs.attr('infoId', store.iid);
    highlightRelatedFile();
}
async function AddChapters(){
    let ul = $("#relatedDocuments ul");
    ul.find('.chapter').remove();

    let list = [];

    let bookmarks = $("[name^='bookmark']");
    if(bookmarks.length == 0){
        bookmarks = $("p.ss");
    }
    if(bookmarks.length === 0){
        let numParagraphs = $("p").length;
        bookmarks = [$("h1"),$("h2"),$("h3"),$("h4"),$("h5"),$("h6")];
        bookmarks = bookmarks.filter(b=>b.length > 2 && b.length < numParagraphs / 5);
        bookmarks = bookmarks.sort((a, b) => b.length - a.length);
        if(bookmarks.length === 0)
            bookmarks = [$("strong:first-child")];
        if(bookmarks.length > 0) {
            bookmarks = bookmarks[0];
            let bookmark = 0;
            bookmarks.each(function(){
                if(this.innerText.length <= 3) return;
                $(this).prepend(`<a name="bookmark${++bookmark}"></a>`);
            })
            bookmarks = $("[name^='bookmark']");
        }
    }
    if (bookmarks.length > 3 && bookmarks.length < 5000){
        //console.log(bookmarks.toArray().map(b=>b.innerText));
        let lastTitle = "";
        let lastElement = null;
        bookmarks.each(function(){
            if(this.classList.contains('skip')) {
                let siblingBookmarks = $(this.parentElement).find("[name^='bookmark']");
                if(this.parentElement.tagName !== "BODY" && siblingBookmarks.length > 1 && siblingBookmarks.length < bookmarks.length / 2){
                    siblingBookmarks.slice(1).addClass('skip');
                }
                return;
            }
            let title = this.innerText;
            if(!title) {
                title = this.parentElement.innerText;
                let siblingBookmarks = $(this.parentElement).find("[name^='bookmark']");
                if(this.parentElement.tagName !== "BODY" && siblingBookmarks.length > 1 && siblingBookmarks.length < bookmarks.length / 2){
                    siblingBookmarks.slice(1).addClass('skip');
                }
            }
            if(!title || title.length > 70 || title === lastTitle) return;
            if(title === title.toUpperCase())
                title = title.toTitleCase();
            let href = "#" + (this.id || this.name);
            lastTitle = title;
            if(lastElement !== null && ($(this).offset().top - $(lastElement).offset().top < 200)){
                if(title.match(/[A-Z]/))
                    $(list[list.length - 1]).find('.title').append(" " + title);
            }else {
                let item = buildDirectoryItem(href, null, null, title, null, null, true);
                item.classList.add('chapter');
                list.push(item);
            }
            lastElement = this;
        });
        if(list.length > 500){
            list = list.filter(i=> !$(i).find('.title').text().match(/[*^@*$]/))
        }
        if(list.length < 1000)
            ul.append(list);
    }
}
function setPageTitle(text){
    document.title = text.replace('—', '-');
}
function setPageDescription(desc){
    document.querySelector('meta[name="description"]').setAttribute("content", desc);
}
var showCurrentFileBox = false;
function highlightRelatedFile(){
    let currentDoc = getPageState('file');
    if(!currentDoc) return;
    showCurrentFileBox = true;
    $("#relatedDocuments a[file]").each(function(){
        if($(this).attr('file') === currentDoc) {
            $(this).addClass('active');
            let dir = $(this).closest('.directory').find('.folder');
            let file = $(this).closest('.item');
            let html = dir[0].outerHTML;
            if(dir.find('.title').text().indexOf(file.find(".title").text().trim()) === -1)
                html += file[0].outerHTML;
            $('#currentFileBox').html(html);
        }
        else
            $(this).removeClass('active');
    });
}
function buildDirectoryItem(href, doc, thumbnail, title, subtext, detail = null, arrow = true, backArrow = false){
    if(!href && doc){
        href = '?file=' + encodeURICompClean(doc);
    }
    let li = document.createElement('li');
    li.classList.add('item');
    let a = document.createElement('a');
    a.href = href;
    let aContents = [];
    if(doc) $(a).attr('file', doc);
    if (thumbnail) {
        if(thumbnail.charAt(0) === '.')
            aContents.push(`<div class="thumbnail"><span class="${thumbnail.replaceAll('.', '')}"></span></div>`);
        else
            aContents.push(`<div class="thumbnail"><img alt="thumbnail" src="${thumbnail}"/></div>`);
    }
    if(backArrow)
        aContents.push('<div class="arrow"><div class="icon-rev"></div></div>');
    subtext = !subtext ? '' : `<span class="subtext">${subtext}</span>`;
    let divTitle = (`<div class="title"><span class="text">${title}</span>${subtext}</div>`);
    aContents.push(divTitle);
    if (detail)
        aContents.push(`<div class="detail">${detail}</div>`);
    if(arrow)
        aContents.push(`<div class="arrow"><div class="icon"></div></div>`);
    a.innerHTML = aContents.join('\n');
    li.appendChild(a);
    return li;
}
function GetClassesForContent(content){
    const isHtml = IsHtml(content);
    let classes = [];
    if(isHtml) classes += "htmlDoc ";
    if(!isHtml) classes += "txtDoc ";
    return classes;
}

function ShowScripture(scripture, click){
    clearTimeout(tooltipFadeout);
    console.log("Show scriptures:" + scripture);
    let references = Bible.GetBooksAndVersess(scripture);
    let books = Object.keys(references);
    Bible.Fetch(books, function() {
        let text = "<div>";
        for (const [book, chapters] of Object.entries(references)) {
            //text += `<h3>${book}</h3>`;
            let bibleBook = Bible.Books[book];
            for (const [chapter, verses] of Object.entries(chapters)) {
                let name = "";
                let scriptures = "";
                let lastVerse = 0;
                let startRange = 0;
                for (let verse of verses) {
                    if (lastVerse === 0) {
                        name += verse;
                        startRange = verse;
                    } else if (lastVerse !== verse - 1) {
                        if (startRange < lastVerse) {
                            name += "-" + lastVerse;
                        }
                        name += "," + verse;
                        startRange = verse;
                    }
                    if (lastVerse !== 0 && verse - lastVerse > 1) scriptures += "<br/>";
                    lastVerse = verse;

                    let rawVerse = bibleBook[chapter - 1][verse - 1];
                    let verseText = "";
                    for (const line of rawVerse.split("\n")) {
                        if (line.startsWith("\t"))
                            verseText += "<span class='indent'>" + line + "</span>";
                        else
                            verseText += "<span>" + line + "</span>";
                    }
                    if (rawVerse.endsWith("\n")) verseText += "<br/>";

                    scriptures += ` <b>${verse}</b> <span class="verse serif">${verseText}</span>`;
                }
                if (name !== "" && lastVerse !== startRange) name += "-" + lastVerse;
                text += `\r\n<div class="scripture-header"><div class="scripture">${book} ${chapter}:${name}</div></div>\r\n`;
                text += `<p class="credit">Excerpt from <a target="_blank" rel="noreferrer" href="http://hidereferrer.net/?https://wol.jw.org/en/wol/binav/r1/lp-e/nwtsty">New World Translation of the Holy Scriptures</a><br/>© Watch Tower Bible and Tract Society of Pennsylvania</p><p>${scriptures}</p>`;
            }
        }
        text += "</div>";

        $('#tooltip-body').html(text);

        let tooltip = $("#tooltip");
        let width = tooltip.outerWidth();
        let x;
        if (click && $(document).width() > 900)
            x = click.clientX + window.pageXOffset - (width / 2);
        else
            x = ($(document).width() / 2) - (width / 2);
        tooltip.css('left', x).css('top', click.clientY + window.pageYOffset + 30);
        clearTimeout(tooltipFadeout);
        tooltip.stop().fadeIn(200);
    });
    //console.log(text);
}


$(document).on('click', 'i.ts', function(){
    let vid = $('video')[0];
    let timestamp = $(this).text();
    let match = timestamp.match(/(((?<h>\d+):)?(?<m>\d+):)?(?<s>\d+)$/);
    let seconds = ((match.groups['h'] ?? 0) * 60 * 60) + ((match.groups['m'] ?? 0) * 60) + parseInt(match.groups['s'] ?? 0);
    vid.currentTime = parseInt(seconds);
    $(document).scrollTo('video', {
        offset: {
            left: 0,
            top: -240,
        },
    });
});

var autoCompleteJS = null;
function initAutoComplete(){
    if(autoCompleteJS !== null) return;
    let values = Object.values(infoStore);
    if(!values.length) return;
    values.map(i => GetFriendlyName(i));
    let lastQuery = null;
    let lastQuerySplit = null;
    let regex = null;
    autoCompleteJS = new autoComplete({ placeHolder: "Search",
        selector: "#search",
        submit: true,
        // threshold: 10,
        data: {
            src: values,
            keys: [ 'FriendlyName', 'Symbol', 'Issue', 'Name', 'Title' ],
            cache: false,
            filter: (list) => {
                // Filter duplicates
                const filteredResults = Array.from(new Set(list.map((value) => value.value.FriendlyName))).map((iid) => {
                    return list.find((value) =>
                        value.value.FriendlyName === iid
                    );
                });
                return filteredResults;
            },
        },
        searchEngine: (query, record) => {
            if(!record) return false;
            if(lastQuery !== query){
                lastQuery = query;
                lastQuerySplit = lastQuery.split(' ');
                regex = new RegExp(lastQuerySplit.map(w=>escapeRegExp(w)).join('|'), 'ig');
            }
            record = record.toString()
            let match = record.match(regex);
            if(!match || new Set(match).size < lastQuerySplit.length)
                return;
            return highlightSearchTerms(record, lastQuerySplit);
        },
        query: (input) => {
            return input.replace(/(\d+)[.\s]*(\d+)/, '$1$2');
        },
        resultsList: {
            noResults: false,
            maxResults: 15,
            tabSelect: true,
        },
        resultItem: {
            element: (item, data) => {
                getDateForInfo(data.value);
                // Modify Results Item Style
                item.style = "display: flex; justify-content: space-between;";
                // Modify Results Item Content
                item.innerHTML = `
                  <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    ${GetFriendlyName(data.value)}
                  </span>
                  <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
                    ${data.key}
                  </span>`;
            },
            highlight: true,
        },
        events: {
            input: {
                focus() {
                    if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                },
                selection(event) {
                    const feedback = event.detail;
                    autoCompleteJS.input.blur();
                    //const selection = feedback.selection.value[feedback.selection.key];
                    autoCompleteJS.input.value = '';//selection;
                    ShowInfo(feedback.selection.value);
                    //console.log(feedback);
                },
            },
        },
    });
    $("#search").focus();
}
$(document).on('click', "#search-form input[type=search]", function(){
    initAutoComplete();
    if(!$("#btnSideMenu").is(":visible")) return;
    $("#btnSideMenu").click();
});
$(document).on('click', '#btnSideMenu,#searchBackdrop', function(){
    $('body').toggleClass('showSideMenu');
});
$(document).on('click', '.pagination a', function(){
    let href = $(this).attr('href');
    let pageNum = null;
    if (href.startsWith('#')) {
        pageNum = parseInt(href.replace('#', ''));
        let input = prompt("Enter page number", pageNum.toString());
        input = parseInt(input);
        if(!input || input <= 0 || input > pageNum) return;
        pageNum = input;
    }else
        pageNum = getUrlParam(location.origin + location.pathname + href, 'page');
    setPageState('page', pageNum);
    if (getPageState('search'))
        DoSearch();
    else if (getPageState('list') == 'image-gallery')
        ImageGallery.ShowGallery();
    window.scrollTo({top: 0, behavior: 'auto'});
    return false;
});
$(document).on('click', 'a[href]:not(.paginator)', function(e){
    if($(this).attr('target') === '_blank'){
        return true;
    }
    let doc = $(this).attr('file');
    if(doc) {
        ShowFile(doc);
        return false;
    }

    let href = $(this).attr('href');
    if(href.startsWith('#')) {
        if(href.length > 1) {
            window.history.replaceState(name.slice(0, -1), null, location.href.replace(location.hash, '') + href);
            ResetScroll();
        }
        return false;
    }

    if($(this).hasClass('lookupScripture')){
        ShowScripture($(this).text(), e);
        return false;
    }
    else if(href.startsWith('jwpub://b/')){
        let scripture = href.replace(/.*NWTR?\//, '').replace(/^(\d+):(\d+:\d+)/, function(match, bookNum, chapters) {
            return BibleBooks.GetBookAtIndex(bookNum - 1) + " " + chapters;
        }).replace(/(\d+):(\d+:\d+)/g, '$2');
        ShowScripture(scripture, e);
        return false;
    }

    if(href.indexOf('?') >= 0)
    {
        console.log("Pushing url");
        window.history.pushState($(this).text(), null, href.replaceAll('%20', '+'));
        pageStateChanged();
        return false;
    }

    if(!href.startsWith('data/')) return;
    ShowFile(href);
    return false;
});
var tooltipFadeout;
$(document).on('mouseleave', 'a[href],#tooltip', function(){
    let tooltip = $("#tooltip");
    tooltipFadeout = setTimeout(()=> {
        if (tooltip.is(':visible') && !tooltip.is(':hover'))
            tooltip.fadeOut(500);
    }, 500);
});
$(document).on('mouseenter', '#tooltip', function(){
    let tooltip = $(this);
    if (tooltip.is(':visible')){
        clearTimeout(tooltipFadeout);
        tooltip.fadeIn(50);
    }
});
$('#resultsHeader select').change(function(){
    searchDirty = true;
    DoSearch();
});
$(document).on('change', '.publications select', function(){
    setPageState($(this).attr('name'), $(this).val());
    pageStateChanged();
});
$(document).on('click', '#startExactSearch', function(){
    if(!confirm("This will literally download and scan each result for an exact match.\r\nContinue?"))
        return;
    $('#contents').text('');
    searchDirty = true;
    setPageStates({
        search: null,
        searchExact: $("input[type=search]").val(),
    });
    pageStateChanged();
});
// $("#regionBody").mouseenter(function(){
//     if(searchDirty)
//         DoSearch();
// });

var searchDirty = false;
$(document).on('input', 'input[type=search]', function () {
    initAutoComplete();
    searchDirty = true;
    $('#contents .results').fadeTo(600, 1.5);
});//.on('input', 'input[type=search]',$.debounce(1500, DoSearchIfDirty));
$(document).on('input', 'input[type=search]', function () {
    searchDirty = true;
    $('#contents .results').fadeTo(600, 1.5);
});

var scrollListener;
$(document).ready(async function(){
    scrollListener = new ScrollListener();
});
// if(getPageState('file')){
//     ShowFile(getPageState('file'));
// }
function CheckPackedDataLoaded(){
    if(page_data_ready) return true;
    if(typeof packedData === 'undefined') return false;
    return true;
}

$(document).on('click', '#manualLoad', Begin);
function Begin(){
    if(!PerformanceMode) {
        addScript('//static.getclicky.com/101371960.js', true);
        addScript('https://www.googletagmanager.com/gtag/js?id=G-9WR5TN5ZP3', true);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-9WR5TN5ZP3');
    }

    LoadCategories();
    window.addEventListener('popstate', pageStateChanged);
    // if(!getPageState('file')){
    pageStateChanged();
}
// window.onload = function(){
//    $('body').css('background-color', 'red');
// }

class ScrollListener{
    didScroll;
    lastScrollTop = 0;
    delta = 5;
    navbarHeight = $('#fixedHeader').outerHeight();

    constructor() {
        const _this = this;

        $(window).scroll(function(event){
            _this.didScroll = true;
        });
        setInterval(function() {
            if (_this.didScroll) {
                hasScrolled();
                _this.didScroll = false;
            }
        }, 250);
        function hasScrolled() {
            let st = $(window).scrollTop();
            if(Math.abs(_this.lastScrollTop - st) <= _this.delta)
                return;
            if (st > _this.lastScrollTop && st > _this.navbarHeight){
                $('body').removeClass('nav-down').addClass('nav-up');
            } else {
                if(st + $(window).height() < $(document).height()) {
                    $('body').removeClass('nav-up').addClass('nav-down');
                }
            }
            _this.lastScrollTop = st;
        }
    }
}

$(window).on('load', function(){
    if(PerformanceMode) return;
    setTimeout(()=> {
        console.log("add tidio");
        let tidio = document.createElement('script');
        tidio.setAttribute('src', 'https://code.tidio.co/b0tisogvmg2hnkczsjpfa2i1jfsuljkq.js');
        document.head.appendChild(tidio);
    }, 2000);
});

Begin();