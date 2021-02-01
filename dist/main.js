var Client=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){e.exports=r(3)},function(e,t){function r(e,t,r,n,o,a,c){try{var i=e[a](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,o)}e.exports=function(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function i(e){r(c,o,a,i,u,"next",e)}function u(e){r(c,o,a,i,u,"throw",e)}i(void 0)}))}}},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t,r){var n=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",i=o.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var o=t&&t.prototype instanceof y?t:y,a=Object.create(o.prototype),c=new O(n||[]);return a._invoke=function(e,t,r){var n=p;return function(o,a){if(n===d)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return q()}for(r.method=o,r.arg=a;;){var c=r.delegate;if(c){var i=E(c,r);if(i){if(i===g)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===p)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=l(e,t,r);if("normal"===u.type){if(n=r.done?h:f,u.arg===g)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=h,r.method="throw",r.arg=u.arg)}}}(e,r,c),a}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var p="suspendedStart",f="suspendedYield",d="executing",h="completed",g={};function y(){}function m(){}function v(){}var w={};w[a]=function(){return this};var x=Object.getPrototypeOf,b=x&&x(x(T([])));b&&b!==r&&n.call(b,a)&&(w=b);var S=v.prototype=y.prototype=Object.create(w);function k(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function r(o,a,c,i){var u=l(e[o],e,a);if("throw"!==u.type){var s=u.arg,p=s.value;return p&&"object"==typeof p&&n.call(p,"__await")?t.resolve(p.__await).then((function(e){r("next",e,c,i)}),(function(e){r("throw",e,c,i)})):t.resolve(p).then((function(e){s.value=e,c(s)}),(function(e){return r("throw",e,c,i)}))}i(u.arg)}var o;this._invoke=function(e,n){function a(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(a,a):a()}}function E(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,E(e,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=l(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,g;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function D(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function T(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,c=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return c.next=c}}return{next:q}}function q(){return{value:t,done:!0}}return m.prototype=S.constructor=v,v.constructor=m,m.displayName=u(v,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,u(e,i,"GeneratorFunction")),e.prototype=Object.create(S),e},e.awrap=function(e){return{__await:e}},k(L.prototype),L.prototype[c]=function(){return this},e.AsyncIterator=L,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var c=new L(s(t,r,n,o),a);return e.isGeneratorFunction(r)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},k(S),u(S,i,"Generator"),S[a]=function(){return this},S.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=T,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(D),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return i.type="throw",i.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var c=this.tryEntries[a],i=c.completion;if("root"===c.tryLoc)return o("end");if(c.tryLoc<=this.prev){var u=n.call(c,"catchLoc"),s=n.call(c,"finallyLoc");if(u&&s){if(this.prev<c.catchLoc)return o(c.catchLoc,!0);if(this.prev<c.finallyLoc)return o(c.finallyLoc)}else if(u){if(this.prev<c.catchLoc)return o(c.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return o(c.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var c=a?a.completion:{};return c.type=e,c.arg=t,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),D(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;D(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=n}catch(e){Function("r","regeneratorRuntime = r")(n)}},function(e,t,r){"use strict";r.r(t),r.d(t,"generate",(function(){return u})),r.d(t,"getData",(function(){return l})),r.d(t,"postData",(function(){return f})),r.d(t,"getProjectData",(function(){return h})),r.d(t,"upperCaseFirstChar",(function(){return S})),r.d(t,"checkStorage",(function(){return Q})),r.d(t,"updateUI",(function(){return y})),r.d(t,"getStorageData",(function(){return Z})),r.d(t,"weatherForecast",(function(){return j})),r.d(t,"newForecast",(function(){return I})),r.d(t,"updateWeatherUI",(function(){return _})),r.d(t,"removeTrip",(function(){return B})),r.d(t,"clearInput",(function(){return H})),r.d(t,"lodging",(function(){return R})),r.d(t,"saveLodging",(function(){return A})),r.d(t,"saveNotes",(function(){return V})),r.d(t,"addNotes",(function(){return W})),r.d(t,"dateFormat",(function(){return J})),r.d(t,"changeDate",(function(){return v}));var n=r(0),o=r.n(n),a=r(1),c=r.n(a),i=r.p+"45c7a0e31232cabdf860c3206287e165.jpg";function u(e){return s.apply(this,arguments)}function s(){return(s=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),console.log("generate is on"),console.log("generate local storage",localStorage.getItem("projectData")),l().then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(t);case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then(c()(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:e.sent;case 3:case"end":return e.stop()}}),e)}))));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return p.apply(this,arguments)}function p(){return(p=c()(o.a.mark((function e(){var t,r,n,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("getdata is on"),document.querySelector(".forecast").innerHTML="",t=document.getElementById("destination").value,r=document.getElementById("departure").value,n=document.querySelector("#comeback").value,a=new RegExp(/\S/),c=new Date,""===t){e.next=30;break}if(a.test(t)&&(t=t.trim(),t=encodeURIComponent(t)),!r){e.next=27;break}if(r=encodeURIComponent(r),!n){e.next=24;break}if(n=encodeURIComponent(n),!(Date.parse(r)<=Date.parse(n))){e.next=21;break}if(!(Date.parse(c.toISOString().slice(0,10))<=Date.parse(r))){e.next=18;break}return e.abrupt("return",{destination:t,departure:r,comeback:n});case 18:throw alert("The departure date can't be in past.");case 19:e.next=22;break;case 21:throw alert("The return date can't be before the end date");case 22:e.next=25;break;case 24:throw alert("Please, fill in the return date");case 25:e.next=28;break;case 27:throw alert("Please, fill in the departure date");case 28:e.next=31;break;case 30:throw alert("Please, fill in the destination");case 31:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){return d.apply(this,arguments)}function d(){return(d=c()(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("postdata is on"),void 0===t){e.next=17;break}return e.next=4,fetch("http://localhost:8000/data",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({data:t})});case 4:return r=e.sent,e.prev=5,e.next=8,r.json();case 8:return n=e.sent,e.abrupt("return",n);case 12:e.prev=12,e.t0=e.catch(5),console.log(e.t0);case 15:e.next=18;break;case 17:console.log("The input information is undefined");case 18:case"end":return e.stop()}}),e,null,[[5,12]])})))).apply(this,arguments)}function h(){return g.apply(this,arguments)}function g(){return(g=c()(o.a.mark((function e(){var t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getProjectData is on"),e.next=3,fetch("http://localhost:8000/all");case 3:return t=e.sent,e.prev=4,e.next=7,t.json();case 7:if(r=e.sent,console.log("data",Object.values(r)),void 0!==Object.values(r)[1].longitude){e.next=11;break}throw alert("The destination is incorrect, please choose other destination");case 11:Promise.resolve(r).then((function(e){return e})).then((function(e){return localStorage.setItem("projectData",JSON.stringify(e)),JSON.parse(localStorage.getItem("projectData"))})).then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(4),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[4,14]])})))).apply(this,arguments)}function y(e){return m.apply(this,arguments)}function m(){return(m=c()(o.a.mark((function e(t){var r,n,a,u,s,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("update ui is on"),!t){e.next=14;break}return document.querySelectorAll(".destination")[0].innerText="".concat(t.geoData.city,", ").concat(t.geoData.country),document.querySelector(".picture"),r=t.picture,""!==t.picture?document.querySelector("img").src=r:document.querySelector("img").src=i,console.log("string",t.inputData.departure),v(t).then(function(){var e=c()(o.a.mark((function e(r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelector(".departure").innerText="".concat(r[0]," ").concat(r[1],", ").concat(r[2]),t.inputData.comeback.split("-").reverse().join("-"),document.querySelector(".comeback").innerText="".concat(r[3]," ").concat(r[4],", ").concat(r[5]);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.lodging&&(document.querySelector("#lodging").style.display="none",(n=document.createElement("div")).classList.add("addLodging"),a=t.lodging,n.innerHTML="<span>Lodging:</span> <br> <p>".concat(a,"</p>"),u=document.querySelector(".add-more-info"),document.querySelector(".addLodging")||u.insertBefore(n,u.firstChild),console.log("parent.insertBefore(addLodging, parent.firstChild)")),t.notes&&(console.log("notes",t.notes),document.querySelector("#notes").style.display="none",(s=document.createElement("div")).classList.add("notes"),s.innerHTML="<span>Notes:</span><br> <p>".concat(t.notes,"</p>"),l=document.querySelector(".add-more-info"),document.querySelector(".notes")||l.insertBefore(s,l.firstElementChild.nextSibling),console.log("parent.insertBefore(addNotes, parent.firstElementChild.nextSibling)")),x(t),console.log("update ui end"),e.abrupt("return",t);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){return w.apply(this,arguments)}function w(){return(w=c()(o.a.mark((function e(t){var r,n,a,c,i,u,s,l,p,f;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=["January","February","March","April","May","June","July","August","September","October","November","December"],n=(n=t.inputData.departure.toString())[8]+n[9],a=t.inputData.departure.toString(),c=a[5]+a[6],a="0"===c[0]?a[6]:a[5]+a[6],a=r[a-1],i=(i=t.inputData.departure.toString())[0]+i[1]+i[2]+i[3],u=(u=t.inputData.comeback.toString())[8]+u[9],s=t.inputData.comeback.toString(),l=s[5]+s[6],s="0"===l[0]?s[6]:s[5]+s[6],s=r[s-1],p=(p=t.inputData.comeback.toString())[0]+p[1]+p[2]+p[3],f=[n,a,i,u,s,p],e.abrupt("return",f);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){return b.apply(this,arguments)}function b(){return(b=c()(o.a.mark((function e(t){var r,n,a,c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("project data from countdow",t),r=(new Date).toISOString().slice(0,10),!t){e.next=27;break}if(n=t.inputData.departure,a=Date.parse(n)-Date.parse(r),c=Math.floor(a/864e5),(i=document.querySelector(".countdown")).classList.add("countdown"),1!==c){e.next=13;break}return i.innerText="Your trip is 1 day away.",e.abrupt("return",t);case 13:if(0!==c){e.next=18;break}return i.innerText="Your trip is today!",e.abrupt("return",t);case 18:if(!(c<0)){e.next=23;break}return i.innerText="This trip expired!",e.abrupt("return",t);case 23:return i.innerText="Your trip is ".concat(c," days away."),e.abrupt("return",t);case 25:e.next=28;break;case 27:console.log("no project is stored");case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return k.apply(this,arguments)}function k(){return(k=c()(o.a.mark((function e(t){var r,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=t.split(" "),n=0;n<r.length;n++)a=(a=r[n])[0].toUpperCase()+a.slice(1),r[n]=a;return e.abrupt("return",r.join(" "));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=r(2),E=r.n(L);function j(e){return D.apply(this,arguments)}function D(){return(D=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),console.log("weatherForecast is on"),localStorage.getItem("projectData")?O().then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:q(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I(t).then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:_(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()):alert("Please, create your trip first");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return T.apply(this,arguments)}function T(){return(T=c()(o.a.mark((function e(){var t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("projectData")),e.next=3,t.geoData;case 3:return r=e.sent,console.log("getstorage",r),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e){return N.apply(this,arguments)}function N(){return(N=c()(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("send storage is on",t),e.next=3,fetch("http://localhost:8000/forecast",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify({data:t})});case 3:return r=e.sent,e.prev=4,e.next=7,r.json();case 7:return n=e.sent,e.abrupt("return",n);case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[4,11]])})))).apply(this,arguments)}function I(e,t){return C.apply(this,arguments)}function C(){return(C=c()(o.a.mark((function e(t,r){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("new forecast is on"),e.next=3,fetch("http://localhost:8000/forecast");case 3:return n=e.sent,e.prev=4,e.next=7,n.json();case 7:return a=e.sent,console.log("data from new forecast",E()(a),a),e.abrupt("return",a);case 12:e.prev=12,e.t0=e.catch(4),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[4,12]])})))).apply(this,arguments)}function _(e){return P.apply(this,arguments)}function P(){return(P=c()(o.a.mark((function e(t){var r,n,a,i,u,s,l,p,f;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("update weather ui is on",t),e.next=3,Object.values(t);case 3:if(r=e.sent,console.log(r),n=["January","February","March","April","May","June","July","August","September","October","November","December"],(a=document.querySelector(".forecast")).parentElement.scrollIntoView(),a.children.length>0)a.innerHTML="";else{for(a.innerHTML="",i=0;i<=3;i++){for((u=document.createElement("div")).classList.add("row"),console.log("y",i),l=(s=4*i)+3,p=function(e){console.log("1z",e);var t=document.createElement("div");t.classList.add("cell"),J(r,e).then(function(){var a=c()(o.a.mark((function a(c){return o.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:console.log("day",c),t.innerHTML='<span class="date">'.concat(c[0]," ").concat(n[c[1]],"</span><br>").concat(r[e].description,"\n                       <br>High: ").concat(r[e].max_temp,"&#176C <br>\n                       Low: ").concat(r[e].min_temp,"&#176C");case 2:case"end":return o.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()),u.appendChild(t)},f=s;f<=l;f++)p(f);a.appendChild(u)}console.log("update ui end")}case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e,t){return M.apply(this,arguments)}function M(){return(M=c()(o.a.mark((function e(t,r){var n,a,c,i,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("forecast[z].date",t[r].date),n=t[r].date.toString(),a="".concat(n[8]).concat(n[9]),i="".concat(n[5]).concat(n[6]),c="0"===i[0]?"".concat(n[6]):i,c-=1,console.log(c,a),u=[a,c],e.abrupt("return",u);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e){return F.apply(this,arguments)}function F(){return(F=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),console.log("removeTrip is on"),localStorage.clear(),location.reload();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(){return G.apply(this,arguments)}function G(){return(G=c()(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:document.querySelector("#destination").innerText="",document.querySelector("#departure").innerText="",document.querySelector("#comeback").innerText="";case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e){return U.apply(this,arguments)}function U(){return(U=c()(o.a.mark((function e(t){var r,n,a,c,i,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),console.log("add lodging"),r=JSON.parse(localStorage.getItem("projectData")),console.log(r),null!==r){e.next=8;break}return e.abrupt("return",alert("Create a trip first"));case 8:n=document.querySelector("#lodging"),a=document.querySelector(".add-more-info"),(c=document.createElement("div")).classList.add("divLodging"),(i=document.createElement("textarea")).classList.add("input-lodging"),i.columns="20",c.insertBefore(i,c.firstChild),n.style.display="none",(u=document.createElement("BUTTON")).innerHTML="Save Lodging",u.classList.add("save-info"),c.insertBefore(u,c.firstElementChild.nextSibling),u.addEventListener("click",A),a.insertBefore(c,a.firstChild);case 23:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e){return Y.apply(this,arguments)}function Y(){return(Y=c()(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),console.log("save lodging"),r=JSON.parse(localStorage.getItem("projectData")),n=document.querySelector(".input-lodging").value,!new RegExp(/\S/).test(n)){e.next=14;break}({lodging:"".concat(n)}),r.lodging=n,localStorage.setItem("projectData",JSON.stringify(r)),console.log(localStorage),y(r),document.querySelector(".divLodging").style.display="none",e.next=15;break;case 14:return e.abrupt("return",alert("Lodging info is empty"));case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e){return z.apply(this,arguments)}function z(){return(z=c()(o.a.mark((function e(t){var r,n,a,c,i,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("save list is on"),r=JSON.parse(localStorage.getItem("projectData")),n=document.querySelector("#notes"),JSON.parse(localStorage.getItem("projectData")),null!==r){e.next=8;break}return e.abrupt("return",alert("Create your trip first"));case 8:a=document.querySelector(".add-more-info"),(c=document.createElement("div")).classList.add("divNotes"),(i=document.createElement("textarea")).classList.add("input-notes"),c.insertBefore(i,c.firstChild),n.style.display="none",(u=document.createElement("BUTTON")).innerHTML="Save Notes",u.classList.add("save-info"),c.insertBefore(u,c.firstElementChild.nextSibling),u.addEventListener("click",V),a.insertBefore(c,a.firstElementChild.nextSibling);case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){return K.apply(this,arguments)}function K(){return(K=c()(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("saveList"),r=JSON.parse(localStorage.getItem("projectData")),n=document.querySelector(".input-notes").value,!new RegExp(/\S/).test(n)){e.next=13;break}({notes:"".concat(n)}),r.notes=n,localStorage.setItem("projectData",JSON.stringify(r)),console.log(localStorage),y(r),document.querySelector(".divNotes").style.display="none",e.next=14;break;case 13:return e.abrupt("return",alert("Lodging info is empty"));case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(){return X.apply(this,arguments)}function X(){return(X=c()(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.getItem("projectData")||console.log("no local sotrage data");try{Z().then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then(function(){var e=c()(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage?x(t):console.log("no local");case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}catch(e){console.log(e)}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return $.apply(this,arguments)}function $(){return($=c()(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("projectData")),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ee=r.p+"c5bd65d4e54face2972d4011a46fc5e1.png",te=r.p+"1d5cccc0b0a7549b3bc327f85b179e4e.png";"serviceWorker"in navigator?window.addEventListener("load",(function(){console.log("Installing service workers in production"),navigator.serviceWorker.register("./service-worker.js")})):console.log("Service worker insallation skipped!"),document.querySelector("#img").src=i,document.querySelector("#geoNames").src=ee,document.querySelector("#weatherbit").src=te,document.getElementById("new-save").addEventListener("click",u),document.querySelector("#lodging").addEventListener("click",R),document.querySelector("#weather").addEventListener("click",j),document.querySelector("#remove").addEventListener("click",B),document.querySelector("#new-remove").addEventListener("click",H),document.querySelector("#notes").addEventListener("click",W),window.addEventListener("load",Q)}]);