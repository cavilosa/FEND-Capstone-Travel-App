if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}}))).then((e=>{const r=n(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-e1834b40"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./index.html",revision:"fa9de21b30e1a5810b3bd8d2f6b7ae99"},{url:"1d5cccc0b0a7549b3bc327f85b179e4e.png",revision:null},{url:"45c7a0e31232cabdf860c3206287e165.jpg",revision:null},{url:"c5bd65d4e54face2972d4011a46fc5e1.png",revision:null},{url:"main.css",revision:"28d0d086ff924a704c6d13c62e3f9b9b"},{url:"main.js",revision:"93e3ab5bd95525849a0d17e885948301"}],{})}));
