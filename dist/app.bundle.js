!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return l}));var o=["black","silver","gray","white","maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua","orange","aliceblue","antiquewhite","aquamarine","azure","beige","bisque","blanchedalmond","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","gainsboro","ghostwhite","gold","goldenrod","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","limegreen","linen","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","oldlace","olivedrab","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","thistle","tomato","turquoise","violet","wheat","whitesmoke","yellowgreen","rebeccapurple"];var n={create:function(){const e=function(e){return e&&(this.o=e),this};return e.type="colors-web-instance",Object.assign(e,{styles:[],o:"",log(e){return this.o=e,this},hexColor(e){return this.styles.push(`color:${e};`),this},color(e){return this.styles.push(`color:${e};`),this},bg(e){return this.styles.push(`background:${e};`),this},fontsize(e){return this.styles.push(`font-size:${e}px;`),this},fontfamily(e){return this.styles.push(`font-family:${e};`),this},padding(e,t){return t?this.styles.push(`padding:${e}px ${t}px;`):this.styles.push(`padding:${e}px;`),this},bold(e){return this.styles.push("font-weight:bold;"),e&&(this.o=e),this},underline(e){return this.styles.push("text-decoration:underline;"),e&&(this.o=e),this},linethrough(e){return this.styles.push("text-decoration:line-through;"),e&&(this.o=e),this},italic(e){return this.styles.push("font-style:italic;"),e&&(this.o=e),this},result(){const e={o:this.o,style:this.styles.join("")};return this.o="",this.styles=[],e}}),o.forEach(t=>{Object.defineProperty(e,t,{get(){return this.styles.push(`color:${t};`),this}}),Object.defineProperty(e,t+"Bg",{get(){return this.styles.push(`background:${t};`),this}})}),e}};const i=(...e)=>{const t=[],r=[];e.forEach(e=>{if("string"==typeof e)r.push("%c"+e),t.push("");else if(e&&"colors-web-instance"===e.type){const o=e.result();r.push("%c"+o.o),t.push(o.style)}else r.push(String(e))}),i.source(r.join(""),...t)};i.source=window.console.log;const l=()=>n.create()},function(e,t,r){"use strict";r.r(t);var o=r(0);const n=window.console.log;o.b.source=n,Object(o.b)(Object(o.a)().red.greenBg.log("hello"),"world",Object(o.a)().green("芋头").fontsize(24),Object(o.a)().color("#ff6700").log("dddd").fontsize(24)),Object(o.b)(Object(o.a)().red().snow().greenBg().log("hello"),"world",Object(o.a)().green("芋头")),Object(o.b)(Object(o.a)().red().fontsize(48).fontfamily("SignPainter").log("hello"),"world",Object(o.a)().green("芋头")),Object(o.b)(Object(o.a)().white().redBg("hello"),"world",Object(o.a)().white().padding(2,5).greenBg("芋头").italic()),Object(o.b)(Object(o.a)().white.redBg("hello").linethrough(),"world",Object(o.a)().white.padding(2,5).underline().lightgrey("芋头"))}]);