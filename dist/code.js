!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=15)}({15:function(e,t,o){"use strict";o.r(t);var n=o(2);figma.showUI(__html__,{width:360,height:600});const r=(e,t,o=!1)=>{e.name=""+t.hookName,e.layoutMode=t.direction,o||(e.primaryAxisSizingMode="HORIZONTAL"===t.direction?"FIXED":"AUTO",e.counterAxisSizingMode="VERTICAL"===t.direction?"FIXED":"AUTO"),e.paddingTop=t.space.top,e.paddingRight=t.space.right,e.paddingBottom=t.space.bottom,e.paddingLeft=t.space.left,e.itemSpacing=t.space.between};figma.ui.onmessage=async e=>{let t=figma.currentPage.selection;if("apply-composition"===e.type)if(t.length>1){let o=t[0].parent,a=figma.createFrame();const i=figma.group(t,o);a.x=i.x,a.y=i.y,a.backgrounds=[],a.resize(i.width,i.height),r(a,e.data),Object(n.e)(t).map(e=>{console.log(e.width),a.appendChild(e)}),o.appendChild(a),figma.currentPage.selection=[a]}else if(1===t.length&&"FRAME"===t[0].type){if("NONE"!==t[0].layoutMode){let o=t[0];r(o,e.data,!0)}}else n.d.error("Please select at least two blocks");if("update-all"===e.type){let t=!1;figma.root.children.map(o=>{e.data.compositions.map(e=>{let a=o.findAll(t=>t.name===e.hookName);a.length>0?(!t&&n.d.success("Updating all compositions"),t=!0,a.map(t=>{r(t,e)})):n.d.neutral(`no matches on "${o.name}" page`)})})}}},2:function(e,t,o){"use strict";o.d(t,"d",(function(){return r})),o.d(t,"e",(function(){return a})),o.d(t,"b",(function(){return c})),o.d(t,"a",(function(){return l})),o.d(t,"c",(function(){return u}));let n="border-radius: 4px; padding: 2px 4px;";var r={success:(e,t=!0,o=800)=>{t&&console.log("%c"+e,"background: rgba(0, 255, 136, 0.14);"+n),figma.notify("🎉 "+e,{timeout:o})},check:(e,t=!0,o=800)=>{t&&console.log("%c"+e,"background: rgba(0, 204, 255, 0.14);"+n),figma.notify("✅ "+e,{timeout:o})},neutral:(e,t=!0,o=800)=>{t&&console.log("%c"+e,"background: rgba(128, 128, 128, 0.14);"+n),figma.notify(""+e,{timeout:o})},warn:(e,t=!0,o=800)=>{t&&console.log("%c"+e,"background: rgba(255, 123, 0, 0.14);"+n),figma.notify("☢️ "+e,{timeout:o})},error:(e,t=!0,o=800)=>{t&&console.log("%c"+e,"background: rgba(255,0,0,0.14);"+n),figma.notify("⛔️ "+e,{timeout:o})}};var a=e=>{var t=e.map(e=>e);return t.sort((e,t)=>e.x-t.x),t.sort((e,t)=>e.y-t.y)};var i=["🐺","🐱","🐭","🐹","🐰","🐸","🐯","🐨","🐻","🐷","🐽","🐮","🐗","🐵","🐒","🐴","🐑","🐘","🐼","🐧","🐦","🐤","🐥","🐣","🐔","🐍","🐢","🐛","🐝","🐜","🐞","🐌","🐙","🐚","🐠","🐟","🐬","🐳","🐋","🐄","🐏","🐀","🐃","🐅","🐇","🐉","🐎","🐐","🐓","🐕","🐖","🐁","🐂","🐲","🐡","🐊","🐫","🐪","🐆","🐈","🐩","🐾","💐","🌸","🌷","🍀","🌹","🌻","🌺","🍁","🍃","🍂","🌿","🌾","🍄","🌵","🌴","🌲","🌳","🏈","🏀","⚽","⚾","🎾","🎱","🍺","🍻","🍸","🍹","🍷","🍴","🍕","🍔","🍟","🍗","🍖","🍝","🍛","🍤","🍱","🍣","🍥","🍙","🍘","🍚","🍜","🍲","🍢","🍡","🍳","🍞","🍩","🍮","🍦","🍨","🍧","🎂","🍰","🍪","🍫","🍬","🍭","🍯","🍎","🍏","🍊","🍋","🍒","🍇","🍉","🍓","🍑","🍈","🍌","🍐","🍍","🍠","🍆","🍅","🌽"];var c=()=>`${i[Math.floor(Math.random()*i.length)]}${Math.random().toString(36).slice(-4)}`;var l=(e,t,o)=>{var n=document.createElement("a"),r=new Blob([JSON.stringify(e,null,2)],{type:o});n.href=URL.createObjectURL(r),n.download=t,n.click()};var u=()=>Math.floor(1e7*Math.random()).toString()}});