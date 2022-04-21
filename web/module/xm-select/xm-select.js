/*!
 * @Title: xm-select
 * @Version: 1.2.4
 * @Description：基于layui的多选解决方案
 * @Site: https://gitee.com/maplemei/xm-select
 * @Author: maplemei
 * @License：Apache License 2.0
 */
!function(e){
 var t={};
 function n(o){
  if(t[o]) return t[o].exports;
  var r=t[o]={i:o,l:!1,exports:{}};
  return e[o].call(r.exports,r,r.exports,n), r.l= !0, r.exports
 }
 n.m=e, n.c=t, n.d=function(e,t,o){
  n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})
 }, n.r=function(e){
  "undefined"!= typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}), Object.defineProperty(e,"__esModule",{value:!0})
 }, n.t=function(e,t){
  if(1&t&&(e=n(e)), 8&t) return e;
  if(4&t&&"object"== typeof e&&e&&e.__esModule) return e;
  var o=Object.create(null);
  if(n.r(o), Object.defineProperty(o,"default",{
   enumerable:!0,value:e
  }), 2&t&&"string"!= typeof e) for(var r in e) n.d(o,r,function(t){
   return e[t]
  }.bind(null,r));
  return o
 }, n.n=function(e){
  var t=e&&e.__esModule?function(){
   return e.default
  }:function(){
   return e
  };
  return n.d(t,"a",t), t
 }, n.o=function(e,t){
  return Object.prototype.hasOwnProperty.call(e,t)
 }, n.p="./", n(n.s=214)
}({
 1:function(e,t,n){
  "use strict";
  function o(e,t){
   var n=Object.keys(e);
   if(Object.getOwnPropertySymbols){
    var o=Object.getOwnPropertySymbols(e);
    t&&(o=o.filter((function(t){
     return Object.getOwnPropertyDescriptor(e,t).enumerable
    }))), n.push.apply(n,o)
   }
   return n
  }
  function r(e,t,n){
   return t in e?Object.defineProperty(e,t,{
    value:n,enumerable:!0,configurable:!0,writable:!0
   }):e[t]=n, e
  }
  function i(e){
   return function(e){
    if(Array.isArray(e)) return a(e)
   }(e)||function(e){
    if("undefined"!= typeof Symbol&&Symbol.iterator in Object(e)) return Array.from(e)
   }(e)||function(e,t){
    if(!e) return;
    if("string"== typeof e) return a(e,t);
    var n=Object.prototype.toString.call(e).slice(8,-1);
    "Object"===n&&e.constructor&&(n=e.constructor.name);
    if("Map"===n||"Set"===n) return Array.from(e);
    if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return a(e,t)
   }(e)||function(){
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
   }()
  }
  function a(e,t){
   (null==t||t>e.length)&&(t=e.length);
   for(var n=0,o=new Array(t); n<t; n++) o[n]=e[n];
   return o
  }
  function l(e){
   return e.nodeType?e:document.querySelector(e)
  }
  function s(){
   for(var e=[],t=0; t<arguments.length; t++) e.push("".concat(t+1,". ").concat(arguments[t]));
   console.warn(e.join("\n"))
  }
  function c(e){
   return "[object Array]"==Object.prototype.toString.call(e)
  }
  function u(e){
   return "[object Function]"==Object.prototype.toString.call(e)
  }
  function p(e){
   return e-=0, isNaN(e)&&(e=0), e
  }
  function f(e,t){
   var n;
   for(n in t) e[n]=e[n]&&"[object Object]"===e[n].toString()&&t[n]&&"[object Object]"===t[n].toString()?f(e[n],t[n]):e[n]=t[n];
   return e
  }
  function d(e,t,n){
   for(var o=n.value,r=i(t),a=function(n){
    var i=e[n];
    t.find((function(e){
     return e[o]==i[o]
    }))||r.push(i)
   },l=0; l<e.length; l++) a(l);
   return r
  }
  function h(){
   return -1!=navigator.userAgent.indexOf("Mac OS")?"mac":"win"
  }
  function m(e,t,n,o){
   if(e&&c(e)){
    var r=o.children,i=o.selected,a=o.value;
    e.forEach((function(e){
     e.__node[i]||t.find((function(t){
      return t[a]===e[a]
     }))?n.push(e):m(e[r],t,n,o)
    }))
   }
  }
  function b(e,t,n){
   if(e&&c(e)) return e.map((function(e){
    return e=function(e){
     for(var t=1; t<arguments.length; t++){
      var n=null!=arguments[t]?arguments[t]:{};
      t%2?o(Object(n),!0).forEach((function(t){
       r(e,t,n[t])
      })):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){
       Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))
      }))
     }
     return e
    }({},e), n.forEach((function(t){
     return delete e[t]
    })), e[t]=b(e[t],t,n), e
   }))
  }
  function y(e){
   var t=arguments.length>1&& void 0!==arguments[1]?arguments[1]:100,n=!(arguments.length>2&& void 0!==arguments[2])||arguments[2],o=this,r=!1;
   return function(){
    for(var i=arguments.length,a=new Array(i),l=0; l<i; l++) a[l]=arguments[l];
    r||(r= !0, !n&&e.call.apply(e,[o].concat(a)), setTimeout((function(){
     n&&e.call.apply(e,[o].concat(a)), r= !1
    }),t))
   }
  }
  n.d(t,"g",(function(){
   return l
  })), n.d(t,"k",(function(){
   return s
  })), n.d(t,"d",(function(){
   return c
  })), n.d(t,"e",(function(){
   return u
  })), n.d(t,"i",(function(){
   return p
  })), n.d(t,"b",(function(){
   return f
  })), n.d(t,"f",(function(){
   return d
  })), n.d(t,"a",(function(){
   return h
  })), n.d(t,"j",(function(){
   return m
  })), n.d(t,"c",(function(){
   return b
  })), n.d(t,"h",(function(){
   return y
  }))
 },106:function(e,t){
  e.exports=function(e){
   var t="undefined"!= typeof window&&window.location;
   if(!t) throw new Error("fixUrls requires window.location");
   if(!e||"string"!= typeof e) return e;
   var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");
   return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){
    var r,i=t.trim().replace(/^"(.*)"$/,(function(e,t){
     return t
    })).replace(/^'(.*)'$/,(function(e,t){
     return t
    }));
    return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""), "url("+JSON.stringify(r)+")")
   }))
  }
 },214:function(e,t,n){
  "use strict";
  n.r(t), function(e){
   n(216), n(217), n(219);
   var t=n(42),o=n(1);
   window.addEventListener("click",(function(){
    Object.keys(t.b).forEach((function(e){
     var n=t.b[e];
     n&&n.closed&&n.closed()
    }))
   })), window.addEventListener("scroll",Object(o.h)((function(){
    Object.keys(t.b).forEach((function(e){
     var n=t.b[e];
     n&&n.calcPosition&&n.calcPosition()
    }))
   }))), "object"===("undefined"== typeof exports?"undefined":_typeof(exports))?e.exports=t.c:"function"== typeof define&&n(221)?define(xmSelect):window.layui&&layui.define&&layui.define((function(e){
    e("xmSelect",t.c)
   })), window.xmSelect=t.c
  }.call(this,n(215)(e))
 },215:function(e,t){
  e.exports=function(e){
   if(!e.webpackPolyfill){
    var t=Object.create(e);
    t.children||(t.children=[]), Object.defineProperty(t,"loaded",{
     enumerable:!0,get:function(){
      return t.l
     }
    }), Object.defineProperty(t,"id",{
     enumerable:!0,get:function(){
      return t.i
     }
    }), Object.defineProperty(t,"exports",{enumerable:!0}), t.webpackPolyfill=1
   }
   return t
  }
 },216:function(e,t){
  Array.prototype.map||(Array.prototype.map=function(e,t){
   var n,o,r,i=Object(this),a=i.length>>>0;
   for(t&&(n=t), o=new Array(a), r=0; r<a;){
    var l,s;
    r in i&&(l=i[r], s=e.call(n,l,r,i), o[r]=s), r++
   }
   return o
  }), Array.prototype.forEach||(Array.prototype.forEach=function(e,t){
   var n,o;
   if(null==this) throw new TypeError("this is null or not defined");
   var r=Object(this),i=r.length>>>0;
   if("function"!= typeof e) throw new TypeError(e+" is not a function");
   for(arguments.length>1&&(n=t), o=0; o<i;){
    var a;
    o in r&&(a=r[o], e.call(n,a,o,r)), o++
   }
  }), Array.prototype.filter||(Array.prototype.filter=function(e){
   if(null==this) throw new TypeError;
   var t=Object(this),n=t.length>>>0;
   if("function"!= typeof e) throw new TypeError;
   for(var o=[],r=arguments[1],i=0; i<n; i++) if(i in t){
    var a=t[i];
    e.call(r,a,i,t)&&o.push(a)
   }
   return o
  }), Array.prototype.find||(Array.prototype.find=function(e){
   return e&&(this.filter(e)||[])[0]
  }), Array.prototype.findIndex||(Array.prototype.findIndex=function(e){
   for(var t,n=Object(this),o=n.length>>>0,r=arguments[1],i=0; i<o; i++) if(t=n[i], e.call(r,t,i,n)) return i;
   return -1
  })
 },217:function(e,t,n){
  var o=n(218);
  "string"== typeof o&&(o=[[e.i,o,""]]);
  var r={hmr:!0,transform:void 0,insertInto:void 0};
  n(28)(o,r);
  o.locals&&(e.exports=o.locals)
 },218:function(e,t,n){
  (t=n(27)(!1)).push([e.i,'@font-face {\n  font-family: "xm-iconfont";\n  src: url(\'//at.alicdn.com/t/font_792691_ptvyboo0bno.eot?t=1574048839056\');\n  /* IE9 */\n  src: url(\'//at.alicdn.com/t/font_792691_ptvyboo0bno.eot?t=1574048839056#iefix\') format(\'embedded-opentype\'), /* IE6-IE8 */ url(\'data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAksAAsAAAAAEYAAAAjeAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEUgqTXI8lATYCJAM0CxwABCAFhG0HgTwbZQ4jEbaCkVIj+4sD3sS6BFAp9ka91ulVG4leTC/+h+3V+zyRYCTyREKkcZ+D5/u137lPdveLGJBMunoiNPOQPBMq0/FQtEKIkMRDZng69d+hOiQumAr7bJdBOEzMTU77s78mhbI58aCg7ebCs4LBTgCk+cD/4ZqWUHebipp7al3tyKOjwCV/hVyw9PdzaktxI7IMQs26/1N8gV4DI0bVut3UhCaflGGgwM3oTXg1IfRMbCsmrEnriJVeYM2eXHII4KdMMzL4OoACHgZBCTasITcReDUBE8kWPLMTCGoQaDV+eKpUPQI49r8vP6BTPIDCaiBSml3oOQX0voNPebv/u2P0AUfP1w0s5EADzYBZsNdByylo2eVq/NtRdgFpovQR5x2CIwmIZeik6/u0T/m/A7RJP00sCmmyksj/kwc+LC5BFBqDEMDDjwPiANDB9MpJTXwHmsO3YyBwWDA4OFwwJLRcRgAOBUYMDg0mHRwGTAYozsV0AgWYruDwwExDHfzwKWf4OurQ9jzQDtoF+wpistfBfluQ5bQiiJa4ZQoKhShLiMayBbyg05AIkYBoIBJEEApQy/FwYv4HchADIUBXl61dW6mpwIgyp7p8PrHddieSjhY9oqTxyPB/FGNYDklpfYh8VtaoqSgb0bKoGB17CuVUp9Ll2nS2UpNGMSw9hyirA7C6+QLyByIQS0sSSmxvArC5odZmYZMxZSiBR5OkQl0uiufxMH5eL8t3u0d4XKyuq6EMdcpNe2+oXA8p9yPa+4T1PM7+A54tc7tpl2vcAHAftnhZj2chy1CyaCRFsyMqQ5nkNnskEt2yxxZinPsOZjFm4+XWvKqLkfCGS1k4MNP82isxSMf7ZsGYvQVCNAeSSVtzWCxRdXGxyZlA2CvCEevuO7y9M2z2NWH8icydzq/qAJSp1lGvDWFp6Nw3xChJowPD+76nU+upQk6Kw9jI0Rgym9Ct8VlxMI3CSIaDCZja5tDYt0/EYra4tn0Kp3v8Rdezk8svcy1mKhoSvNcZz3LKlUe777Gmval0s7bzAc0k13LGk896V9DuvNn34N0ebKgItkQgOomuJtgQPChNI4cwa7CEWCvfk5QjJFlem6i3SfVShWi5LTFRG+JwdCNpSqbpRFwrtb1TbcRkJi/AbJJQOmfCdnswLNGVM7qqSRO1zO0Q0j5Vr3cYQ07HB0MX6KoIZhx+D9Djs2C5bXtVwvbgJHtSCIL7hjFJme4sZDdS5IlJdKUO1Qt8opn0trBafz3AX933kmCRgyMEWGZjMAkRKhwmIHJGR4ruwFCdWKYzrap2R/mvd2UKajzRAZu88pGAD90Y+02kTFCKrBSXwGGJ3wRcPCdIppTxSmHOfESRwIli0S5J/8AYDCxTGh4XZua4xvfvGx320rDK2qA8g5FlS7pWNLx71+BwgA/KZ5I0aeKmNeCNoNPl8qNHu8uHHzqaKc86fHi4vPuRI4ny+I/vjxw+clh4HXVCFvVnVFx07EHZwVhSRliTTMWSEi0h6YuS6DxCRmiin0B3L4ry6cvR0ijYexFdBL3wGQM0YOrUAZCBkLOBBtQ+xdk7omfgUv+u++admyUeXduyxLM+r/+49rPfhgEZor6GymToNYksNsZyC7ntwAH0928UpgMpxpF0ydNlsMMBw7QsxTCmu0Hf3F+/+vb99Yumhb+e9R0LBNm+4O+hu7lQ5bGjI9j5G88qQ5SLFyuEC7cwd25xoYo2j4eA4bhpM7TZhPtmc+uhVEVSMYXLWh0bfjI8dvUpvDUocPZmU4kwwOfc83wB5wPehrpD3waApbwW+fgRrZXcxw+mB/3woZT+8JFMYwRMIy2k/18qhqcKpjYeYSnIACaUoRDu0e3kQFh98R5fiI8oJqwwGZSJDSbehLzZs7zIeWTQ4UGOIs2c4j2/Q/tn7n7j9juO33On6WhURCT/wO6Y3QdmWFY0Ef6JUeGRggO7ZbtaZlh5RYKWXbLPBLc3l/5h4A0mu3ZXTZ+u6t6VHMAzZhxak50T+24NnRuaOmehRkXlqVR5lIpuwezUUDUdCuJysv8Z/0/8uNE1s7jIJIubFWnI/x7g4nAZx79yYpFoAOU3a9iwT1O/GxUxPY0ljVPv9EukI3qNrl/So2YfzasqHCroNjS0+w0tlPlsYfC6v/01ixquizJH1Kd/VK+OS3iS3rTJWmqsMPdU3B3oFyC9RSumWE/0gG36IjTysfH51IJ/5oOgNYu6p4yb5Fdufhr/Kjtu0oSyYP/WJQrz35aNFnMhtFcwb55NlNnH8Wdu1b+XZA9zqlZrhdPo/V3uBhiUlQ66h0LhbAmFYIncdFOpVMh6Fl7peqy5Z2ZdQBITO2x1Asj1dRFjIBMC3hbuUh8Ooc4W03EjAdo8UL/t0oUfyU8630bmMcw/vqDNAsC9BQD4OqCgH+ljy0UhJB8AAJA+8EmArxk5gnRLik90AElf8rBm+IMvBTWnucb3+0o0ARk+r0ZBv8sU01nnSmP45/H8Dp8C8X+iE9e+ZvXymK/sQJ5/DuqhYKebPnKmPqLYuDcIMWS2/Rjxp2s8Do821LVn6A/xMK1RKvBLK5gyDsZ5uQ6bYusmx2yqLFe4lECHDPcFhojmckuAbnCI6Cn308RI6AAJdtCICQLQyBHKhSgX5YowN6BBPIEB8VxuSfNncpAuutzPnCSiDHDEo+DsKQBPoJi4MpRktepIs2zjO5h84IEMM3ffECKSZU1ZHxfewEI4h494MuuUNNOBjuw18QKHAzEXaAcylS3m3baq9MpnKenYmfEUgCdbXTHEtTVKsvruNGv9/DuYfOAhcuKu9TeEiA9nNJTUDOUbbVkn3sv2eDJrEnVrpvcHOjJeqRsOcpYYLuxoBzKVtCOm3ZaKbtJcurw+e/zN6c7Pd6r4gqUo0WLEiiOueOITvwQkKCEJM9nO3F60y5HkqLhdqUyXZtK3lqwReQ+G40O92UhOt0x/KmKM+u7LTPMzoEBOCYtiUPfSjODiuFXjSDm2idzAoc4Tj9bs2eJYDOU7HQA=\') format(\'woff2\'), url(\'//at.alicdn.com/t/font_792691_ptvyboo0bno.woff?t=1574048839056\') format(\'woff\'), url(\'//at.alicdn.com/t/font_792691_ptvyboo0bno.ttf?t=1574048839056\') format(\'truetype\'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */ url(\'//at.alicdn.com/t/font_792691_ptvyboo0bno.svg?t=1574048839056#iconfont\') format(\'svg\');\n  /* iOS 4.1- */\n}\n.xm-iconfont {\n  font-family: "xm-iconfont" !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.xm-icon-quanxuan:before {\n  content: "\\e62c";\n}\n.xm-icon-caidan:before {\n  content: "\\e610";\n}\n.xm-icon-fanxuan:before {\n  content: "\\e837";\n}\n.xm-icon-pifu:before {\n  content: "\\e668";\n}\n.xm-icon-qingkong:before {\n  content: "\\e63e";\n}\n.xm-icon-sousuo:before {\n  content: "\\e600";\n}\n.xm-icon-danx:before {\n  content: "\\e62b";\n}\n.xm-icon-duox:before {\n  content: "\\e613";\n}\n.xm-icon-close:before {\n  content: "\\e601";\n}\n.xm-icon-expand:before {\n  content: "\\e641";\n}\n.xm-icon-banxuan:before {\n  content: "\\e60d";\n}\n',""]), e.exports=t
 },219:function(e,t,n){
  var o=n(220);
  "string"== typeof o&&(o=[[e.i,o,""]]);
  var r={hmr:!0,transform:void 0,insertInto:void 0};
  n(28)(o,r);
  o.locals&&(e.exports=o.locals)
 },220:function(e,t,n){
  (t=n(27)(!1)).push([e.i,"@-webkit-keyframes xm-upbit {\n  from {\n    -webkit-transform: translate3d(0, 30px, 0);\n    opacity: 0.3;\n  }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes xm-upbit {\n  from {\n    transform: translate3d(0, 30px, 0);\n    opacity: 0.3;\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loader {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes loader {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\nxm-select {\n  background-color: #FFF;\n  position: relative;\n  border: 1px solid #E6E6E6;\n  border-radius: 2px;\n  display: block;\n  width: 100%;\n  cursor: pointer;\n  outline: none;\n}\nxm-select * {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-size: 14px;\n  font-weight: 400;\n  text-overflow: ellipsis;\n  user-select: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\nxm-select:hover,\nxm-select:focus {\n  border-color: #C0C4CC;\n}\nxm-select > .xm-tips {\n  color: #999999;\n  padding: 0 10px;\n  position: absolute;\n  display: flex;\n  height: 100%;\n  align-items: center;\n}\nxm-select > .xm-icon {\n  display: inline-block;\n  overflow: hidden;\n  position: absolute;\n  width: 0;\n  height: 0;\n  right: 10px;\n  top: 50%;\n  margin-top: -3px;\n  cursor: pointer;\n  border: 6px dashed transparent;\n  border-top-color: #C2C2C2;\n  border-top-style: solid;\n  transition: all 0.3s;\n  -webkit-transition: all 0.3s;\n}\nxm-select > .xm-icon-expand {\n  margin-top: -9px;\n  transform: rotate(180deg);\n}\nxm-select > .xm-label.single-row {\n  position: absolute;\n  top: 0;\n  bottom: 0px;\n  left: 0px;\n  right: 30px;\n  overflow: auto hidden;\n}\nxm-select > .xm-label.single-row .scroll {\n  overflow-y: hidden;\n}\nxm-select > .xm-label.single-row .label-content {\n  flex-wrap: nowrap;\n  white-space: nowrap;\n}\nxm-select > .xm-label.auto-row .label-content {\n  flex-wrap: wrap;\n  padding-right: 30px !important;\n}\nxm-select > .xm-label.auto-row .xm-label-block > span {\n  white-space: unset;\n  height: 100%;\n}\nxm-select > .xm-label .scroll .label-content {\n  display: flex;\n  padding: 3px 10px;\n}\nxm-select > .xm-label .xm-label-block {\n  display: flex;\n  position: relative;\n  padding: 0px 5px;\n  margin: 2px 5px 2px 0;\n  border-radius: 3px;\n  align-items: baseline;\n  color: #FFF;\n}\nxm-select > .xm-label .xm-label-block > span {\n  display: flex;\n  color: #FFF;\n  white-space: nowrap;\n}\nxm-select > .xm-label .xm-label-block > i {\n  color: #FFF;\n  margin-left: 8px;\n  font-size: 12px;\n  cursor: pointer;\n  display: flex;\n}\nxm-select > .xm-label .xm-label-block.disabled {\n  background-color: #C2C2C2 !important;\n  cursor: no-drop !important;\n}\nxm-select > .xm-label .xm-label-block.disabled > i {\n  cursor: no-drop !important;\n}\nxm-select > .xm-body {\n  position: absolute;\n  left: 0;\n  top: 42px;\n  padding: 5px 0;\n  z-index: 999;\n  width: 100%;\n  min-width: fit-content;\n  border: 1px solid #E6E6E6;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);\n  animation-name: xm-upbit;\n  animation-duration: 0.3s;\n  animation-fill-mode: both;\n}\nxm-select > .xm-body .scroll-body {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\nxm-select > .xm-body .scroll-body::-webkit-scrollbar {\n  width: 8px;\n}\nxm-select > .xm-body .scroll-body::-webkit-scrollbar-track {\n  -webkit-border-radius: 2em;\n  -moz-border-radius: 2em;\n  -ms-border-radius: 2em;\n  border-radius: 2em;\n  background-color: #FFF;\n}\nxm-select > .xm-body .scroll-body::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 2em;\n  -moz-border-radius: 2em;\n  -ms-border-radius: 2em;\n  border-radius: 2em;\n  background-color: #C2C2C2;\n}\nxm-select > .xm-body.up {\n  top: auto;\n  bottom: 42px;\n}\nxm-select > .xm-body.relative {\n  position: relative;\n  display: block !important;\n  top: 0;\n  box-shadow: none;\n  border: none;\n  animation-name: none;\n  animation-duration: 0;\n  min-width: 100%;\n}\nxm-select > .xm-body .xm-group {\n  cursor: default;\n}\nxm-select > .xm-body .xm-group-item {\n  display: inline-block;\n  cursor: pointer;\n  padding: 0 10px;\n  color: #999;\n  font-size: 12px;\n}\nxm-select > .xm-body .xm-option {\n  display: flex;\n  align-items: center;\n  position: relative;\n  padding: 0 10px;\n  cursor: pointer;\n}\nxm-select > .xm-body .xm-option-icon {\n  color: transparent;\n  display: flex;\n  border: 1px solid #E6E6E6;\n  border-radius: 3px;\n  justify-content: center;\n  align-items: center;\n}\nxm-select > .xm-body .xm-option-icon.xm-custom-icon {\n  color: unset;\n  border: unset;\n}\nxm-select > .xm-body .xm-option-icon-hidden {\n  margin-right: -10px;\n}\nxm-select > .xm-body .xm-option-icon.xm-icon-danx {\n  border-radius: 100%;\n}\nxm-select > .xm-body .xm-option-content {\n  display: flex;\n  position: relative;\n  padding-left: 15px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: #666;\n  width: calc(100% - 20px);\n}\nxm-select > .xm-body .xm-option.hide-icon .xm-option-content {\n  padding-left: 0;\n}\nxm-select > .xm-body .xm-option.selected.hide-icon .xm-option-content {\n  color: #FFF !important;\n}\nxm-select > .xm-body .xm-option .loader {\n  width: 0.8em;\n  height: 0.8em;\n  margin-right: 6px;\n  color: #C2C2C2;\n}\nxm-select > .xm-body .xm-select-empty {\n  text-align: center;\n  color: #999;\n}\nxm-select > .xm-body .disabled {\n  cursor: no-drop;\n}\nxm-select > .xm-body .disabled:hover {\n  background-color: #FFF;\n}\nxm-select > .xm-body .disabled .xm-option-icon {\n  border-color: #C2C2C2 !important;\n}\nxm-select > .xm-body .disabled .xm-option-content {\n  color: #C2C2C2 !important;\n}\nxm-select > .xm-body .disabled.selected > .xm-option-icon {\n  color: #C2C2C2 !important;\n}\nxm-select > .xm-body .xm-search {\n  background-color: #FFF !important;\n  position: relative;\n  padding: 0 10px;\n  margin-bottom: 5px;\n  cursor: pointer;\n}\nxm-select > .xm-body .xm-search > i {\n  position: absolute;\n  color: #666;\n}\nxm-select > .xm-body .xm-search-input {\n  border: none;\n  border-bottom: 1px solid #E6E6E6;\n  padding-left: 27px;\n  cursor: text;\n}\nxm-select > .xm-body .xm-paging {\n  padding: 0 10px;\n  display: flex;\n  margin-top: 5px;\n}\nxm-select > .xm-body .xm-paging > span:first-child {\n  border-radius: 2px 0 0 2px;\n}\nxm-select > .xm-body .xm-paging > span:last-child {\n  border-radius: 0 2px 2px 0;\n}\nxm-select > .xm-body .xm-paging > span {\n  display: flex;\n  flex: auto;\n  justify-content: center;\n  vertical-align: middle;\n  margin: 0 -1px 0 0;\n  background-color: #fff;\n  color: #333;\n  font-size: 12px;\n  border: 1px solid #e2e2e2;\n  flex-wrap: nowrap;\n  width: 100%;\n  overflow: hidden;\n  min-width: 50px;\n}\nxm-select > .xm-body .xm-toolbar {\n  padding: 0 10px;\n  display: flex;\n  margin: -3px 0;\n  cursor: default;\n}\nxm-select > .xm-body .xm-toolbar .toolbar-tag {\n  cursor: pointer;\n  display: flex;\n  margin-right: 20px;\n  color: #666;\n  align-items: baseline;\n}\nxm-select > .xm-body .xm-toolbar .toolbar-tag:hover {\n  opacity: 0.8;\n}\nxm-select > .xm-body .xm-toolbar .toolbar-tag:active {\n  opacity: 1;\n}\nxm-select > .xm-body .xm-toolbar .toolbar-tag > i {\n  margin-right: 2px;\n  font-size: 14px;\n}\nxm-select > .xm-body .xm-toolbar .toolbar-tag:last-child {\n  margin-right: 0;\n}\nxm-select > .xm-body .xm-body-custom {\n  line-height: initial;\n  cursor: default;\n}\nxm-select > .xm-body .xm-body-custom * {\n  box-sizing: initial;\n}\nxm-select > .xm-body .xm-tree {\n  position: relative;\n}\nxm-select > .xm-body .xm-tree-icon {\n  display: inline-block;\n  margin-right: 3px;\n  cursor: pointer;\n  border: 6px dashed transparent;\n  border-left-color: #C2C2C2;\n  border-left-style: solid;\n  transition: all 0.3s;\n  -webkit-transition: all 0.3s;\n  z-index: 2;\n  visibility: hidden;\n}\nxm-select > .xm-body .xm-tree-icon.expand {\n  margin-top: 3px;\n  margin-right: 5px;\n  margin-left: -2px;\n  transform: rotate(90deg);\n}\nxm-select > .xm-body .xm-tree-icon.xm-visible {\n  visibility: visible;\n}\nxm-select > .xm-body .xm-tree .left-line {\n  position: absolute;\n  left: 13px;\n  width: 0;\n  z-index: 1;\n  border-left: 1px dotted #c0c4cc !important;\n}\nxm-select > .xm-body .xm-tree .top-line {\n  position: absolute;\n  left: 13px;\n  height: 0;\n  z-index: 1;\n  border-top: 1px dotted #c0c4cc !important;\n}\nxm-select > .xm-body .xm-tree .xm-tree-icon + .top-line {\n  margin-left: 1px;\n}\nxm-select > .xm-body .scroll-body > .xm-tree > .xm-option > .top-line,\nxm-select > .xm-body .scroll-body > .xm-option > .top-line {\n  width: 0 !important;\n}\nxm-select > .xm-body .xm-cascader-box {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  padding: 5px 0;\n  border: 1px solid #E6E6E6;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);\n  margin: -1px;\n}\nxm-select > .xm-body .xm-cascader-box::before {\n  content: ' ';\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 6px solid transparent;\n  border-right-color: #E6E6E6;\n  top: 10px;\n  left: -12px;\n}\nxm-select > .xm-body .xm-cascader-box::after {\n  content: ' ';\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 6px solid transparent;\n  border-right-color: #fff;\n  top: 10px;\n  left: -11px;\n}\nxm-select > .xm-body .xm-cascader-scroll {\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\nxm-select > .xm-body.cascader {\n  width: unset;\n  min-width: unset;\n}\nxm-select > .xm-body.cascader .xm-option-content {\n  padding-left: 8px;\n}\nxm-select > .xm-body.cascader .disabled .xm-right-arrow {\n  color: #C2C2C2 !important;\n}\nxm-select > .xm-body.cascader .hide-icon.disabled .xm-right-arrow {\n  color: #999 !important;\n}\nxm-select .xm-input {\n  cursor: pointer;\n  border-radius: 2px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #E6E6E6;\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  background-color: #FFF;\n  line-height: 1.3;\n  padding-left: 10px;\n  outline: 0;\n  user-select: text;\n  -ms-user-select: text;\n  -moz-user-select: text;\n  -webkit-user-select: text;\n}\nxm-select .dis {\n  display: none;\n}\nxm-select .loading {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(255, 255, 255, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nxm-select .loader {\n  border: 0.2em dotted currentcolor;\n  border-radius: 50%;\n  -webkit-animation: 1s loader linear infinite;\n  animation: 1s loader linear infinite;\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  color: inherit;\n  vertical-align: middle;\n  pointer-events: none;\n}\nxm-select .xm-select-default {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: none;\n  visibility: hidden;\n}\nxm-select .xm-select-disabled {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  cursor: no-drop;\n  z-index: 2;\n  opacity: 0.3;\n  background-color: #FFF;\n}\nxm-select .item--divided {\n  border-top: 1px solid #ebeef5;\n  width: calc(100% - 20px);\n  cursor: initial;\n}\nxm-select .xm-right-arrow {\n  position: absolute;\n  color: #666;\n  right: 5px;\n  top: -1px;\n  font-weight: 700;\n  transform: scale(0.6, 1);\n}\nxm-select .xm-right-arrow::after {\n  content: '>';\n}\nxm-select[size='large'] {\n  min-height: 40px;\n  line-height: 40px;\n}\nxm-select[size='large'] .xm-input {\n  height: 40px;\n}\nxm-select[size='large'] .xm-label .scroll .label-content {\n  line-height: 34px;\n}\nxm-select[size='large'] .xm-label .xm-label-block {\n  height: 30px;\n  line-height: 30px;\n}\nxm-select[size='large'] .xm-body .xm-option .xm-option-icon {\n  height: 20px;\n  width: 20px;\n  font-size: 20px;\n}\nxm-select[size='large'] .xm-paging > span {\n  height: 34px;\n  line-height: 34px;\n}\nxm-select[size='large'] .xm-tree .left-line {\n  height: 100%;\n  bottom: 20px;\n}\nxm-select[size='large'] .xm-tree .left-line-group {\n  height: calc(100% - 40px);\n}\nxm-select[size='large'] .xm-tree .xm-tree-icon.xm-hidden + .top-line {\n  top: 19px;\n}\nxm-select[size='large'] .item--divided {\n  margin: 10px;\n}\nxm-select {\n  min-height: 36px;\n  line-height: 36px;\n}\nxm-select .xm-input {\n  height: 36px;\n}\nxm-select .xm-label .scroll .label-content {\n  line-height: 30px;\n}\nxm-select .xm-label .xm-label-block {\n  height: 26px;\n  line-height: 26px;\n}\nxm-select .xm-body .xm-option .xm-option-icon {\n  height: 18px;\n  width: 18px;\n  font-size: 18px;\n}\nxm-select .xm-paging > span {\n  height: 30px;\n  line-height: 30px;\n}\nxm-select .xm-tree .left-line {\n  height: 100%;\n  bottom: 18px;\n}\nxm-select .xm-tree .left-line-group {\n  height: calc(100% - 36px);\n}\nxm-select .xm-tree .xm-tree-icon.xm-hidden + .top-line {\n  top: 17px;\n}\nxm-select .item--divided {\n  margin: 9px;\n}\nxm-select[size='small'] {\n  min-height: 32px;\n  line-height: 32px;\n}\nxm-select[size='small'] .xm-input {\n  height: 32px;\n}\nxm-select[size='small'] .xm-label .scroll .label-content {\n  line-height: 26px;\n}\nxm-select[size='small'] .xm-label .xm-label-block {\n  height: 22px;\n  line-height: 22px;\n}\nxm-select[size='small'] .xm-body .xm-option .xm-option-icon {\n  height: 16px;\n  width: 16px;\n  font-size: 16px;\n}\nxm-select[size='small'] .xm-paging > span {\n  height: 26px;\n  line-height: 26px;\n}\nxm-select[size='small'] .xm-tree .left-line {\n  height: 100%;\n  bottom: 16px;\n}\nxm-select[size='small'] .xm-tree .left-line-group {\n  height: calc(100% - 32px);\n}\nxm-select[size='small'] .xm-tree .xm-tree-icon.xm-hidden + .top-line {\n  top: 15px;\n}\nxm-select[size='small'] .item--divided {\n  margin: 8px;\n}\nxm-select[size='mini'] {\n  min-height: 28px;\n  line-height: 28px;\n}\nxm-select[size='mini'] .xm-input {\n  height: 28px;\n}\nxm-select[size='mini'] .xm-label .scroll .label-content {\n  line-height: 22px;\n}\nxm-select[size='mini'] .xm-label .xm-label-block {\n  height: 18px;\n  line-height: 18px;\n}\nxm-select[size='mini'] .xm-body .xm-option .xm-option-icon {\n  height: 14px;\n  width: 14px;\n  font-size: 14px;\n}\nxm-select[size='mini'] .xm-paging > span {\n  height: 22px;\n  line-height: 22px;\n}\nxm-select[size='mini'] .xm-tree .left-line {\n  height: 100%;\n  bottom: 14px;\n}\nxm-select[size='mini'] .xm-tree .left-line-group {\n  height: calc(100% - 28px);\n}\nxm-select[size='mini'] .xm-tree .xm-tree-icon.xm-hidden + .top-line {\n  top: 13px;\n}\nxm-select[size='mini'] .item--divided {\n  margin: 7px;\n}\n.layui-form-pane xm-select {\n  margin: -1px -1px -1px 0;\n}\n",""]), e.exports=t
 },221:function(e,t){
  (function(t){
   e.exports=t
  }).call(this,{})
 },27:function(e,t,n){
  "use strict";
  e.exports=function(e){
   var t=[];
   return t.toString=function(){
    return this.map((function(t){
     var n=function(e,t){
      var n=e[1]||"",o=e[3];
      if(!o) return n;
      if(t&&"function"== typeof btoa){
       var r=function(e){
        var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);
        return "/*# ".concat(n," */")
       }(o),i=o.sources.map((function(e){
        return "/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")
       }));
       return [n].concat(i).concat([r]).join("\n")
      }
      return [n].join("\n")
     }(t,e);
     return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n
    })).join("")
   }, t.i=function(e,n,o){
    "string"== typeof e&&(e=[[null,e,""]]);
    var r={};
    if(o) for(var i=0; i<this.length; i++){
     var a=this[i][0];
     null!=a&&(r[a]= !0)
    }
    for(var l=0; l<e.length; l++){
     var s=[].concat(e[l]);
     o&&r[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n), t.push(s))
    }
   }, t
  }
 },28:function(e,t,n){
  var o,r,i={},a=(o=function(){
   return window&&document&&document.all&& !window.atob
  }, function(){
   return void 0===r&&(r=o.apply(this,arguments)), r
  }),l=function(e,t){
   return t?t.querySelector(e):document.querySelector(e)
  },s=function(e){
   var t={};
   return function(e,n){
    if("function"== typeof e) return e();
    if(void 0===t[e]){
     var o=l.call(this,e,n);
     if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement) try{
      o=o.contentDocument.head
     }catch(e){
      o=null
     }
     t[e]=o
    }
    return t[e]
   }
  }(),c=null,u=0,p=[],f=n(106);
  function d(e,t){
   for(var n=0; n<e.length; n++){
    var o=e[n],r=i[o.id];
    if(r){
     r.refs++;
     for(var a=0; a<r.parts.length; a++) r.parts[a](o.parts[a]);
     for(; a<o.parts.length; a++) r.parts.push(v(o.parts[a],t))
    }else{
     var l=[];
     for(a=0; a<o.parts.length; a++) l.push(v(o.parts[a],t));
     i[o.id]={id:o.id,refs:1,parts:l}
    }
   }
  }
  function h(e,t){
   for(var n=[],o={},r=0; r<e.length; r++){
    var i=e[r],a=t.base?i[0]+t.base:i[0],l={css:i[1],media:i[2],sourceMap:i[3]};
    o[a]?o[a].parts.push(l):n.push(o[a]={id:a,parts:[l]})
   }
   return n
  }
  function m(e,t){
   var n=s(e.insertInto);
   if(!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
   var o=p[p.length-1];
   if("top"===e.insertAt) o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild), p.push(t); else if("bottom"===e.insertAt) n.appendChild(t); else{
    if("object"!= typeof e.insertAt|| !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
    var r=s(e.insertAt.before,n);
    n.insertBefore(t,r)
   }
  }
  function b(e){
   if(null===e.parentNode) return !1;
   e.parentNode.removeChild(e);
   var t=p.indexOf(e);
   t>=0&&p.splice(t,1)
  }
  function y(e){
   var t=document.createElement("style");
   if(void 0===e.attrs.type&&(e.attrs.type="text/css"), void 0===e.attrs.nonce){
    var o=function(){
     0;
     return n.nc
    }();
    o&&(e.attrs.nonce=o)
   }
   return x(t,e.attrs), m(e,t), t
  }
  function x(e,t){
   Object.keys(t).forEach((function(n){
    e.setAttribute(n,t[n])
   }))
  }
  function v(e,t){
   var n,o,r,i;
   if(t.transform&&e.css){
    if(!(i="function"== typeof t.transform?t.transform(e.css):t.transform.default(e.css))) return function(){
    };
    e.css=i
   }
   if(t.singleton){
    var a=u++;
    n=c||(c=y(t)), o=w.bind(null,n,a,!1), r=w.bind(null,n,a,!0)
   }else e.sourceMap&&"function"== typeof URL&&"function"== typeof URL.createObjectURL&&"function"== typeof URL.revokeObjectURL&&"function"== typeof Blob&&"function"== typeof btoa?(n=function(e){
    var t=document.createElement("link");
    return void 0===e.attrs.type&&(e.attrs.type="text/css"), e.attrs.rel="stylesheet", x(t,e.attrs), m(e,t), t
   }(t), o=O.bind(null,n,t), r=function(){
    b(n), n.href&&URL.revokeObjectURL(n.href)
   }):(n=y(t), o=k.bind(null,n), r=function(){
    b(n)
   });
   return o(e), function(t){
    if(t){
     if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap) return;
     o(e=t)
    }else r()
   }
  }
  e.exports=function(e,t){
   if("undefined"!= typeof DEBUG&&DEBUG&&"object"!= typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
   (t=t||{}).attrs="object"== typeof t.attrs?t.attrs:{}, t.singleton||"boolean"== typeof t.singleton||(t.singleton=a()), t.insertInto||(t.insertInto="head"), t.insertAt||(t.insertAt="bottom");
   var n=h(e,t);
   return d(n,t), function(e){
    for(var o=[],r=0; r<n.length; r++){
     var a=n[r];
     (l=i[a.id]).refs--, o.push(l)
    }
    e&&d(h(e,t),t);
    for(r=0; r<o.length; r++){
     var l;
     if(0===(l=o[r]).refs){
      for(var s=0; s<l.parts.length; s++) l.parts[s]();
      delete i[l.id]
     }
    }
   }
  };
  var g,_=(g=[], function(e,t){
   return g[e]=t, g.filter(Boolean).join("\n")
  });
  function w(e,t,n,o){
   var r=n?"":o.css;
   if(e.styleSheet) e.styleSheet.cssText=_(t,r); else{
    var i=document.createTextNode(r),a=e.childNodes;
    a[t]&&e.removeChild(a[t]), a.length?e.insertBefore(i,a[t]):e.appendChild(i)
   }
  }
  function k(e,t){
   var n=t.css,o=t.media;
   if(o&&e.setAttribute("media",o), e.styleSheet) e.styleSheet.cssText=n; else{
    for(; e.firstChild;) e.removeChild(e.firstChild);
    e.appendChild(document.createTextNode(n))
   }
  }
  function O(e,t,n){
   var o=n.css,r=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;
   (t.convertToAbsoluteUrls||i)&&(o=f(o)), r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");
   var a=new Blob([o],{type:"text/css"}),l=e.href;
   e.href=URL.createObjectURL(a), l&&URL.revokeObjectURL(l)
  }
 },37:function(e){
  e.exports=JSON.parse('{"a":"xm-select","b":"1.2.4","c":"https://maplemei.gitee.io/xm-select"}')
 },42:function(e,t,n){
  "use strict";
  n.d(t,"b",(function(){
   return Xe
  })), n.d(t,"d",(function(){
   return $e
  })), n.d(t,"a",(function(){
   return et
  }));
  var o,r,i,a,l,s=n(37),c=n(1),u={},p=[],f=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function d(e,t){
   for(var n in t) e[n]=t[n];
   return e
  }
  function h(e){
   var t=e.parentNode;
   t&&t.removeChild(e)
  }
  function m(e,t,n){
   var o,r=arguments,i={};
   for(o in t) "key"!==o&&"ref"!==o&&(i[o]=t[o]);
   if(arguments.length>3) for(n=[n], o=3; o<arguments.length; o++) n.push(r[o]);
   if(null!=n&&(i.children=n), "function"== typeof e&&null!=e.defaultProps) for(o in e.defaultProps) void 0===i[o]&&(i[o]=e.defaultProps[o]);
   return b(e,i,t&&t.key,t&&t.ref,null)
  }
  function b(e,t,n,r,i){
   var a={
    type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i
   };
   return null==i&&(a.__v=a), o.vnode&&o.vnode(a), a
  }
  function y(e){
   return e.children
  }
  function x(e,t){
   this.props=e, this.context=t
  }
  function v(e,t){
   if(null==t) return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;
   for(var n; t<e.__k.length; t++) if(null!=(n=e.__k[t])&&null!=n.__e) return n.__e;
   return "function"== typeof e.type?v(e):null
  }
  function g(e){
   var t,n;
   if(null!=(e=e.__)&&null!=e.__c){
    for(e.__e=e.__c.base=null, t=0; t<e.__k.length; t++) if(null!=(n=e.__k[t])&&null!=n.__e){
     e.__e=e.__c.base=n.__e;
     break
    }
    return g(e)
   }
  }
  function _(e){
   (!e.__d&&(e.__d= !0)&&r.push(e)&& !w.__r++||a!==o.debounceRendering)&&((a=o.debounceRendering)||i)(w)
  }
  function w(){
   for(var e; w.__r=r.length;) e=r.sort((function(e,t){
    return e.__v.__b-t.__v.__b
   })), r=[], e.some((function(e){
    var t,n,o,r,i,a,l;
    e.__d&&(a=(i=(t=e).__v).__e, (l=t.__P)&&(n=[], (o=d({},i)).__v=o, r=A(l,i,o,t.__n,void 0!==l.ownerSVGElement,null,n,null==a?v(i):a), R(n,i), r!=a&&g(i)))
   }))
  }
  function k(e,t,n,o,r,i,a,l,s,c){
   var f,d,m,x,g,_,w,k=o&&o.__k||p,C=k.length;
   for(s==u&&(s=null!=a?a[0]:C?v(o,0):null), n.__k=[], f=0; f<t.length; f++) if(null!=(x=n.__k[f]=null==(x=t[f])||"boolean"== typeof x?null:"string"== typeof x||"number"== typeof x?b(null,x,null,null,x):Array.isArray(x)?b(y,{children:x},null,null,null):null!=x.__e||null!=x.__c?b(x.type,x.props,x.key,null,x.__v):x)){
    if(x.__=n, x.__b=n.__b+1, null===(m=k[f])||m&&x.key==m.key&&x.type===m.type) k[f]= void 0; else for(d=0; d<C; d++){
     if((m=k[d])&&x.key==m.key&&x.type===m.type){
      k[d]= void 0;
      break
     }
     m=null
    }
    g=A(e,x,m=m||u,r,i,a,l,s,c), (d=x.ref)&&m.ref!=d&&(w||(w=[]), m.ref&&w.push(m.ref,null,x), w.push(d,x.__c||g,x)), null!=g?(null==_&&(_=g), s=O(e,x,m,k,a,g,s), "option"==n.type?e.value="":"function"== typeof n.type&&(n.__d=s)):s&&m.__e==s&&s.parentNode!=e&&(s=v(m))
   }
   if(n.__e=_, null!=a&&"function"!= typeof n.type) for(f=a.length; f--;) null!=a[f]&&h(a[f]);
   for(f=C; f--;) null!=k[f]&&D(k[f],k[f]);
   if(w) for(f=0; f<w.length; f++) I(w[f],w[++f],w[++f])
  }
  function O(e,t,n,o,r,i,a){
   var l,s,c;
   if(void 0!==t.__d) l=t.__d, t.__d= void 0; else if(r==n||i!=a||null==i.parentNode) e:if(null==a||a.parentNode!==e) e.appendChild(i), l=null; else{
    for(s=a, c=0; (s=s.nextSibling)&&c<o.length; c+=2) if(s==i) break e;
    e.insertBefore(i,a), l=a
   }
   return void 0!==l?l:i.nextSibling
  }
  function C(e,t,n){
   "-"===t[0]?e.setProperty(t,n):e[t]="number"== typeof n&& !1===f.test(t)?n+"px":null==n?"":n
  }
  function j(e,t,n,o,r){
   var i,a,l,s,c;
   if(r?"className"===t&&(t="class"):"class"===t&&(t="className"), "style"===t) if(i=e.style, "string"== typeof n) i.cssText=n; else{
    if("string"== typeof o&&(i.cssText="", o=null), o) for(s in o) n&&s in n||C(i,s,"");
    if(n) for(c in n) o&&n[c]===o[c]||C(i,c,n[c])
   } else "o"===t[0]&&"n"===t[1]?(a=t!==(t=t.replace(/Capture$/,"")), l=t.toLowerCase(), t=(l in e?l:t).slice(2), n?(o||e.addEventListener(t,S,a), (e.l||(e.l={}))[t]=n):e.removeEventListener(t,S,a)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&& !r&&t in e?e[t]=null==n?"":n:"function"!= typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n|| !1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n|| !1===n&& !/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))
  }
  function S(e){
   this.l[e.type](o.event?o.event(e):e)
  }
  function E(e,t,n){
   var o,r;
   for(o=0; o<e.__k.length; o++) (r=e.__k[o])&&(r.__=e, r.__e&&("function"== typeof r.type&&r.__k.length>1&&E(r,t,n), t=O(n,r,r,e.__k,null,r.__e,t), "function"== typeof e.type&&(e.__d=t)))
  }
  function A(e,t,n,r,i,a,l,s,c){
   var u,p,f,h,m,b,v,g,_,w,O,C=t.type;
   if(void 0!==t.constructor) return null;
   (u=o.__b)&&u(t);
   try{
    e:if("function"== typeof C){
     if(g=t.props, _=(u=C.contextType)&&r[u.__c], w=u?_?_.props.value:u.__:r, n.__c?v=(p=t.__c=n.__c).__=p.__E:("prototype" in C&&C.prototype.render?t.__c=p=new C(g,w):(t.__c=p=new x(g,w), p.constructor=C, p.render=M), _&&_.sub(p), p.props=g, p.state||(p.state={}), p.context=w, p.__n=r, f=p.__d= !0, p.__h=[]), null==p.__s&&(p.__s=p.state), null!=C.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=d({},p.__s)), d(p.__s,C.getDerivedStateFromProps(g,p.__s))), h=p.props, m=p.state, f) null==C.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(), null!=p.componentDidMount&&p.__h.push(p.componentDidMount); else{
      if(null==C.getDerivedStateFromProps&&g!==h&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(g,w), !p.__e&&null!=p.shouldComponentUpdate&& !1===p.shouldComponentUpdate(g,p.__s,w)||t.__v===n.__v){
       p.props=g, p.state=p.__s, t.__v!==n.__v&&(p.__d= !1), p.__v=t, t.__e=n.__e, t.__k=n.__k, p.__h.length&&l.push(p), E(t,s,e);
       break e
      }
      null!=p.componentWillUpdate&&p.componentWillUpdate(g,p.__s,w), null!=p.componentDidUpdate&&p.__h.push((function(){
       p.componentDidUpdate(h,m,b)
      }))
     }
     p.context=w, p.props=g, p.state=p.__s, (u=o.__r)&&u(t), p.__d= !1, p.__v=t, p.__P=e, u=p.render(p.props,p.state,p.context), p.state=p.__s, null!=p.getChildContext&&(r=d(d({},r),p.getChildContext())), f||null==p.getSnapshotBeforeUpdate||(b=p.getSnapshotBeforeUpdate(h,m)), O=null!=u&&u.type==y&&null==u.key?u.props.children:u, k(e,Array.isArray(O)?O:[O],t,n,r,i,a,l,s,c), p.base=t.__e, p.__h.length&&l.push(p), v&&(p.__E=p.__=null), p.__e= !1
    }else null==a&&t.__v===n.__v?(t.__k=n.__k, t.__e=n.__e):t.__e=P(n.__e,t,n,r,i,a,l,c);
    (u=o.diffed)&&u(t)
   }catch(e){
    t.__v=null, o.__e(e,t,n)
   }
   return t.__e
  }
  function R(e,t){
   o.__c&&o.__c(t,e), e.some((function(t){
    try{
     e=t.__h, t.__h=[], e.some((function(e){
      e.call(t)
     }))
    }catch(e){
     o.__e(e,t.__v)
    }
   }))
  }
  function P(e,t,n,o,r,i,a,l){
   var s,c,f,d,h,m=n.props,b=t.props;
   if(r="svg"===t.type||r, null!=i) for(s=0; s<i.length; s++) if(null!=(c=i[s])&&((null===t.type?3===c.nodeType:c.localName===t.type)||e==c)){
    e=c, i[s]=null;
    break
   }
   if(null==e){
    if(null===t.type) return document.createTextNode(b);
    e=r?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,b.is&&{is:b.is}), i=null, l= !1
   }
   if(null===t.type) m!==b&&e.data!=b&&(e.data=b); else{
    if(null!=i&&(i=p.slice.call(e.childNodes)), f=(m=n.props||u).dangerouslySetInnerHTML, d=b.dangerouslySetInnerHTML, !l){
     if(null!=i) for(m={}, h=0; h<e.attributes.length; h++) m[e.attributes[h].name]=e.attributes[h].value;
     (d||f)&&(d&&f&&d.__html==f.__html||(e.innerHTML=d&&d.__html||""))
    }
    (function(e,t,n,o,r){
     var i;
     for(i in n) "children"===i||"key"===i||i in t||j(e,i,null,n[i],o);
     for(i in t) r&&"function"!= typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||j(e,i,t[i],n[i],o)
    })(e,b,m,r,l), d?t.__k=[]:(s=t.props.children, k(e,Array.isArray(s)?s:[s],t,n,o,"foreignObject"!==t.type&&r,i,a,u,l)), l||("value" in b&& void 0!==(s=b.value)&&s!==e.value&&j(e,"value",s,m.value,!1), "checked" in b&& void 0!==(s=b.checked)&&s!==e.checked&&j(e,"checked",s,m.checked,!1))
   }
   return e
  }
  function I(e,t,n){
   try{
    "function"== typeof e?e(t):e.current=t
   }catch(e){
    o.__e(e,n)
   }
  }
  function D(e,t,n){
   var r,i,a;
   if(o.unmount&&o.unmount(e), (r=e.ref)&&(r.current&&r.current!==e.__e||I(r,null,t)), n||"function"== typeof e.type||(n=null!=(i=e.__e)), e.__e=e.__d= void 0, null!=(r=e.__c)){
    if(r.componentWillUnmount) try{
     r.componentWillUnmount()
    }catch(e){
     o.__e(e,t)
    }
    r.base=r.__P=null
   }
   if(r=e.__k) for(a=0; a<r.length; a++) r[a]&&D(r[a],t,n);
   null!=i&&h(i)
  }
  function M(e,t,n){
   return this.constructor(e,n)
  }
  function T(e,t,n){
   var r,i,a;
   o.__&&o.__(e,t), i=(r=n===l)?null:n&&n.__k||t.__k, e=m(y,null,[e]), a=[], A(t,(r?t:n||t).__k=e,i||u,u,void 0!==t.ownerSVGElement,n&& !r?[n]:i?null:t.childNodes.length?p.slice.call(t.childNodes):null,a,n||u,r), R(a,e)
  }
  function z(e){
   return (z="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function L(e){
   return function(e){
    if(Array.isArray(e)) return V(e)
   }(e)||function(e){
    if("undefined"!= typeof Symbol&&Symbol.iterator in Object(e)) return Array.from(e)
   }(e)||function(e,t){
    if(!e) return;
    if("string"== typeof e) return V(e,t);
    var n=Object.prototype.toString.call(e).slice(8,-1);
    "Object"===n&&e.constructor&&(n=e.constructor.name);
    if("Map"===n||"Set"===n) return Array.from(e);
    if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return V(e,t)
   }(e)||function(){
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
   }()
  }
  function V(e,t){
   (null==t||t>e.length)&&(t=e.length);
   for(var n=0,o=new Array(t); n<t; n++) o[n]=e[n];
   return o
  }
  function F(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function U(e,t){
   return (U=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function N(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=K(e);
    if(t){
     var r=K(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return B(this,n)
   }
  }
  function B(e,t){
   return !t||"object"!==z(t)&&"function"!= typeof t?function(e){
    if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
   }(e):t
  }
  function K(e){
   return (K=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  o={
   __e:function(e,t){
    for(var n,o; t=t.__;) if((n=t.__c)&& !n.__) try{
     if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(o= !0, n.setState(n.constructor.getDerivedStateFromError(e))), null!=n.componentDidCatch&&(o= !0, n.componentDidCatch(e)), o) return _(n.__E=n)
    }catch(t){
     e=t
    }
    throw e
   }
  }, x.prototype.setState=function(e,t){
   var n;
   n=this.__s!==this.state?this.__s:this.__s=d({},this.state), "function"== typeof e&&(e=e(n,this.props)), e&&d(n,e), null!=e&&this.__v&&(t&&this.__h.push(t), _(this))
  }, x.prototype.forceUpdate=function(e){
   this.__v&&(this.__e= !0, e&&this.__h.push(e), _(this))
  }, x.prototype.render=y, r=[], i="function"== typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout, w.__r=0, l=u;
  var H=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&U(e,t)
   }(i,e);
   var t,n,o,r=N(i);
   function i(e){
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), r.call(this,e)
   }
   return t=i, (n=[{
    key:"iconClick",value:function(e,t,n,o){
     this.props.ck(e,t,n,!0), o.stopPropagation()
    }
   },{
    key:"scrollFunc",value:function(e){
     if(0==e.wheelDeltaX){
      for(var t=this.labelRef.getElementsByClassName("xm-label-block"),n=10,o=0; o<t.length; o++) n+=t[o].getBoundingClientRect().width+5;
      var r=this.labelRef.getBoundingClientRect().width,i=n>r?n-r:r,a=this.labelRef.scrollLeft+e.deltaY;
      a<0&&(a=0), a>i&&(a=i), this.labelRef.scrollLeft=a
     }
    }
   },{
    key:"blur",value:function(){
     var e=this.base.querySelector(".label-search-input");
     e&&e.blur()
    }
   },{
    key:"labelDrag",value:function(e,t){
     for(var n=t.type,o=t.target; ;){
      if(!o||"I"===o.tagName) return;
      if("DIV"===o.tagName&&"fixed"!==o.style.position) break;
      o=o.parentNode
     }
     if(console.log(t), "mousedown"===n){
      var r=o.cloneNode(!0),i=t.pageX,a=t.pageY,l=t.offsetX,s=t.offsetY;
      console.log(i,a,l,s), r.style.position="fixed", r.style.left=i-l+"px", r.style.top=a-s+"px", o.appendChild(r), console.log(r), r.onmousemove=function(e){
       r.style.left=e.pageX-l+"px", r.style.top=e.pageY-s+"px"
      }, r.mouseup=function(){
       r.parentNode.removeChild(r), r.onmousemove=null, r.mouseup=null, r.mouseleave=null
      }, r.mouseleave=function(){
       console.log("mouseleave")
      }
     }else if("mouseup"===n) for(var c=o.childNodes,u=0; u<c.length; u++){
      var p=c[u];
      if("DIV"===p.tagName){
       o.removeChild(p), p.onmousemove=null;
       break
      }
     }
     t.stopPropagation()
    }
   },{
    key:"componentDidMount",value:function(){
     this.labelRef.addEventListener&&this.labelRef.addEventListener("DOMMouseScroll",this.scrollFunc.bind(this),!1), this.labelRef.attachEvent&&this.labelRef.attachEvent("onmousewheel",this.scrollFunc.bind(this)), this.labelRef.onmousewheel=this.scrollFunc.bind(this)
    }
   },{
    key:"render",value:function(e){
     var t=this,n=e.data,o=e.prop,r=e.theme,i=e.model,a=e.sels,l=e.autoRow,s=e.tree,u=o.name,p=o.disabled,f=i.label,d=f.type,h=f[d],b=a;
     s.show&&s.strict&&s.simple&&(b=[], Object(c.j)(n,a,b,o));
     var y="",x=!0,v=b.map((function(e){
      return e[u]
     })).join(",");
     if("text"===d) y=b.map((function(e){
      return "".concat(h.left).concat(e[u]).concat(h.right)
     })).join(h.separator); else if("block"===d){
      x= !1;
      var g=L(b),_={backgroundColor:r.color},w=h.showCount<=0?g.length:h.showCount;
      y=g.splice(0,w).map((function(e){
       var n={width:h.showIcon?"calc(100% - 20px)":"100%"};
       return m("div",{
        class:["xm-label-block",e[p]?"disabled":""].join(" "),style:_
       },h.template&&Object(c.e)(h.template)?m("span",{
        style:n,dangerouslySetInnerHTML:{__html:h.template(e,g)}
       }):m("span",{style:n},e[u]),h.showIcon&&m("i",{
        class:"xm-iconfont xm-icon-close",onClick:t.iconClick.bind(t,e,!0,e[p])
       }))
      })), g.length&&y.push(m("div",{class:"xm-label-block",style:_},"+ ",g.length))
     }else if("search"==d){
      x= !1;
      var k="";
      b.length&&(k=b[0][u]), y=m("input",{
       class:"label-search-input",type:"text",placeholder:e.searchTips,style:{width:"100%",border:"none"},value:k,onInput:function(e){
        t.props.onReset(e,"labelSearch")
       },onCompositionstart:function(e){
        t.props.onReset(e,"labelSearch")
       },compositionupdate:function(e){
        t.props.onReset(e,"labelSearch")
       },compositionend:function(e){
        t.props.onReset(e,"labelSearch")
       },onClick:function(e){
        e.stopPropagation()
       }
      })
     }else y=b.length&&h&&h.template?h.template(n,b):b.map((function(e){
      return e[u]
     })).join(",");
     return m("div",{class:["xm-label",l?"auto-row":"single-row"].join(" ")},m("div",{
      class:"scroll",ref:function(e){
       return t.labelRef=e
      }
     },x?m("div",{
      class:"label-content",dangerouslySetInnerHTML:{__html:y}
     }):m("div",{class:"label-content",title:v},y)))
    }
   }])&&F(t.prototype,n), o&&F(t,o), i
  }(x);
  function q(e){
   return (q="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function Y(e,t){
   var n=Object.keys(e);
   if(Object.getOwnPropertySymbols){
    var o=Object.getOwnPropertySymbols(e);
    t&&(o=o.filter((function(t){
     return Object.getOwnPropertyDescriptor(e,t).enumerable
    }))), n.push.apply(n,o)
   }
   return n
  }
  function Z(e){
   for(var t=1; t<arguments.length; t++){
    var n=null!=arguments[t]?arguments[t]:{};
    t%2?Y(Object(n),!0).forEach((function(t){
     Q(e,t,n[t])
    })):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach((function(t){
     Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))
    }))
   }
   return e
  }
  function Q(e,t,n){
   return t in e?Object.defineProperty(e,t,{
    value:n,enumerable:!0,configurable:!0,writable:!0
   }):e[t]=n, e
  }
  function J(e){
   return function(e){
    if(Array.isArray(e)) return W(e)
   }(e)||function(e){
    if("undefined"!= typeof Symbol&&Symbol.iterator in Object(e)) return Array.from(e)
   }(e)||function(e,t){
    if(!e) return;
    if("string"== typeof e) return W(e,t);
    var n=Object.prototype.toString.call(e).slice(8,-1);
    "Object"===n&&e.constructor&&(n=e.constructor.name);
    if("Map"===n||"Set"===n) return Array.from(e);
    if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return W(e,t)
   }(e)||function(){
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
   }()
  }
  function W(e,t){
   (null==t||t>e.length)&&(t=e.length);
   for(var n=0,o=new Array(t); n<t; n++) o[n]=e[n];
   return o
  }
  function G(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function X(e,t){
   return (X=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function $(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=te(e);
    if(t){
     var r=te(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return ee(this,n)
   }
  }
  function ee(e,t){
   return !t||"object"!==q(t)&&"function"!= typeof t?function(e){
    if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
   }(e):t
  }
  function te(e){
   return (te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  var ne={},oe=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&X(e,t)
   }(i,e);
   var t,n,o,r=$(i);
   function i(e){
    var t;
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), (t=r.call(this,e)).setState({
     filterValue:"",remote:!0,loading:!1,pageIndex:1,totalSize:0,val:ne
    }), t.searchCid=0, t.inputOver= !0, t.__value="", t.tempData=[], t.size=0, t
   }
   return t=i, (n=[{
    key:"optionClick",value:function(e,t,n,o){
     this.props.ck(e,t,n), this.focus(), this.blockClick(o)
    }
   },{
    key:"groupClick",value:function(e,t){
     var n=this.props.prop,o=n.click,r=n.children,i=n.disabled,a=e[o],l=e[r].filter((function(e){
      return !e[i]
     }));
     "SELECT"===a?this.props.onReset(l,"append"):"CLEAR"===a?this.props.onReset(l,"delete"):"AUTO"===a?this.props.onReset(l,"auto"):Object(c.e)(a)&&a(e), this.focus(), this.blockClick(t)
    }
   },{
    key:"blockClick",value:function(e){
     e.stopPropagation()
    }
   },{
    key:"pagePrevClick",value:function(){
     arguments.length>0&& void 0!==arguments[0]||this.size;
     var e=this.state.pageIndex;
     e<=1||(this.changePageIndex(e-1), this.props.pageRemote&&this.postData(e-1,!0))
    }
   },{
    key:"pageNextClick",value:function(){
     var e=arguments.length>0&& void 0!==arguments[0]?arguments[0]:this.size,t=this.state.pageIndex;
     t>=e||(this.changePageIndex(t+1), this.props.pageRemote&&this.postData(t+1,!0))
    }
   },{
    key:"changePageIndex",value:function(e){
     this.setState({pageIndex:e})
    }
   },{
    key:"labelSearch",value:function(e){
     "input"==e.type?this.searchInput(e):this.handleComposition(e)
    }
   },{
    key:"searchInput",value:function(e){
     var t=this,n=e.target.value;
     n!==this.__value&&(this.searchCid&&clearTimeout(this.searchCid), this.inputOver&&(this.__value=n, this.searchCid=setTimeout((function(){
      t.callback= !0, t.setState({filterValue:t.__value,remote:!0,pageIndex:1})
     }),this.props.delay)))
    }
   },{
    key:"focus",value:function(){
     this.searchInputRef&&this.searchInputRef.focus()
    }
   },{
    key:"blur",value:function(){
     this.searchInputRef&&this.searchInputRef.blur()
    }
   },{
    key:"handleComposition",value:function(e){
     var t=e.type;
     "compositionstart"===t?(this.inputOver= !1, this.searchCid&&clearTimeout(this.searchCid)):"compositionend"===t&&(this.inputOver= !0, this.searchInput(e))
    }
   },{
    key:"postData",value:function(){
     var e=this,t=arguments.length>0&& void 0!==arguments[0]?arguments[0]:this.state.pageIndex,n=arguments.length>1&& void 0!==arguments[1]&&arguments[1];
     (this.state.remote||n)&&(this.callback= !1, this.setState({
      loading:!0,remote:!1
     }), this.blur(), this.props.remoteMethod(this.state.filterValue,(function(t){
      var n=arguments.length>1&& void 0!==arguments[1]?arguments[1]:1;
      setTimeout((function(){
       e.focus(), e.callback= !0, e.setState({
        loading:!1,totalSize:n
       }), e.props.onReset(t,"data")
      }),10)
     }),this.props.show,t))
    }
   },{
    key:"keydown",value:function(e,t){
     var n=this,o=t.keyCode;
     if("div"===e&&(27===o||9===o?this.props.onReset(!1,"close"):37===o?this.pagePrevClick():39===o&&this.pageNextClick()), this.props.enableKeyboard){
      var r=this.props.prop,i=r.value,a=r.optgroup,l=r.disabled,s=this.tempData.filter((function(e){
       return !e[a]&& !e[l]
      })),c=s.length-1;
      if(-1===c) return;
      var u=s.findIndex((function(e){
       return e[i]===n.state.val
      }));
      if(38===o){
       u<=0?u=c:u>0&&(u-=1);
       var p=s[u][i];
       this.setState({val:p}), this.viewTo(p)
      }else if(40===o){
       -1===u||u===c?u=0:u<c&&(u+=1);
       var f=s[u][i];
       this.setState({val:f}), this.viewTo(f)
      }else if(o===this.props.selectedKeyCode&&this.state.val!=ne){
       var d=s[u];
       this.optionClick(d,-1!=this.props.sels.findIndex((function(e){
        return e[i]===n.state.val
       })),d[l],t)
      }
     }
    }
   },{
    key:"viewTo",value:function(e){
     if(null!=this.base){
      var t=this.base.querySelector('.xm-option[value="'.concat(e,'"]'));
      t&&t.scrollIntoView(!1)
     }
    }
   },{
    key:"componentWillReceiveProps",value:function(e){
     var t=this;
     this.props.show!=e.show&&(e.show?setTimeout((function(){
      "search"===e.model.label.type||(e.filterable?t.focus():t.base.focus())
     }),0):(this.setState({
      filterValue:"",val:ne
     }), this.__value="", this.searchInputRef&&(this.searchInputRef.value=""), this.props.onReset("","labelSearchBlur"))), this.props.__update!=e.__update&&this.setState({remote:!0})
    }
   },{
    key:"render",value:function(e){
     var t,n=this,o=e.data,r=e.flatData,i=e.prop,a=e.template,l=e.theme,s=e.radio,u=e.sels,p=e.empty,f=e.filterable,d=e.filterMethod,h=e.remoteSearch,b=(e.remoteMethod, e.delay, e.searchTips),y=e.create,x=e.pageRemote,v=e.max,g=e.enableKeyboard,_=e.enableHoverFirst,w=i.name,k=i.value,O=i.disabled,C=i.children,j=i.optgroup,S=Object(c.b)([],r);
     if((x||f&&h)&&this.postData(), f&& !h&& !x){
      S=S.filter((function(e,t){
       return e[j]?(delete e.__del, !0):d(n.state.filterValue,e,t,i)
      }));
      for(var E=0; E<S.length-1; E++){
       var A=S[E],R=S[E+1];
       A[j]&&R[j]&&(S[E].__del= !0)
      }
      S.length&&S[S.length-1][j]&&(S[S.length-1].__del= !0), S=S.filter((function(e){
       return !e.__del
      })), t=this.state.filterValue&&Object(c.e)(y)
     }
     var P=m("div",{class:f&&"search"!=e.model.label.type?"xm-search":"xm-search dis"},m("i",{class:"xm-iconfont xm-icon-sousuo"}),m("input",{
      class:"xm-input xm-search-input",placeholder:b
     })),I={};
     S.filter((function(e){
      return e[j]
     })).forEach((function(e,t){
      I[t]=e, e[C].forEach((function(e){
       return e.__group__index=t
      }))
     })), S=S.filter((function(e){
      return !e[j]
     }));
     var D="";
     if(e.paging){
      var M=x?this.state.totalSize:Math.floor((S.length-1)/e.pageSize)+1;
      M<=0&&(M=1);
      var T=this.state.pageIndex;
      if(T>M&&(T=M), M>0&&T<=0&&(T=1), !x){
       var z=(T-1)*e.pageSize,L=z+e.pageSize;
       S=S.slice(z,L)
      }
      var V={cursor:"no-drop",color:"#d2d2d2"},F={},U={};
      T<=1&&(F=V), T==M&&(U=V), this.state.pageIndex!==T&&this.changePageIndex(T), this.size=M, D=m("div",{class:"xm-paging"},m("span",{
       style:F,onClick:this.pagePrevClick.bind(this,M)
      },e.languageProp.paging.prev),m("span",null,this.state.pageIndex," / ",M),m("span",{
       style:U,onClick:this.pageNextClick.bind(this,M)
      },e.languageProp.paging.next))
     }else e.showCount>0&&(S=S.slice(0,e.showCount));
     var N,B,K=[],H={__tmp:!0};
     H[j]= !0, S.forEach((function(e){
      var t=I[e.__group__index];
      delete e.__group__index, N&& !t&&(t=H), t!=N&&(N=t, t&&K.push(N)), K.push(e)
     })), S=K, t&&null!=(t=y(this.state.filterValue,Object(c.b)([],S)))&&(B=S).splice.apply(B,[0,0].concat(J((Object(c.d)(t)?t:[t]).map((function(e){
      return Z(Z({},e),{},{__node:{}})
     })))));
     var q=Object(c.b)([],S);
     this.tempData=q;
     var Y=m("div",{class:"xm-toolbar"},e.toolbar.list.map((function(t){
      var o,r=e.languageProp.toolbar[t];
      o="ALL"===t?{
       icon:"xm-iconfont xm-icon-quanxuan",name:r,method:function(e){
        var t=i.optgroup,o=i.disabled,r=e.filter((function(e){
         return !e[t]
        })).filter((function(e){
         return !e[o]
        })),a=u.filter((function(e){
         return e[i.disabled]
        })),l=[];
        l=s?a.length?a:r.slice(0,1):v>0?a.length>=v?a:Object(c.f)(r.slice(0,v-a.length),a,i):Object(c.f)(r,u,i), n.props.onReset(l,"sels")
       }
      }:"CLEAR"===t?{
       icon:"xm-iconfont xm-icon-qingkong",name:r,method:function(e){
        n.props.onReset(u.filter((function(e){
         return e[i.disabled]
        })),"sels")
       }
      }:"REVERSE"===t?{
       icon:"xm-iconfont xm-icon-fanxuan",name:r,method:function(e){
        var t=i.optgroup,o=i.disabled,r=e.filter((function(e){
         return !e[t]
        })).filter((function(e){
         return !e[o]
        })),a=[];
        u.forEach((function(e){
         var t=r.findIndex((function(t){
          return t[k]===e[k]
         }));
         -1==t?a.push(e):r.splice(t,1)
        }));
        var l=a.filter((function(e){
         return e[i.disabled]
        })),p=[];
        p=s?l.length?l:r.slice(0,1):v>0?l.length>=v?l:Object(c.f)(r.slice(0,v-l.length),l,i):Object(c.f)(r,a,i), n.props.onReset(p,"sels")
       }
      }:t;
      var a=function(e){
       "mouseenter"===e.type&&(e.target.style.color=l.color), "mouseleave"===e.type&&(e.target.style.color="")
      };
      return m("div",{
       class:"toolbar-tag",style:{},onClick:function(){
        Object(c.e)(o.method)&&o.method(q), n.focus()
       },onMouseEnter:a,onMouseLeave:a
      },e.toolbar.showIcon&&m("i",{class:o.icon}),m("span",null,o.name))
     })).filter((function(e){
      return e
     }))),Q="hidden"!=e.model.icon;
     return (S=S.map((function(t){
      return t[j]?t.__tmp?m("div",{class:"item--divided"}):m("div",{class:"xm-group"},m("div",{
       class:"xm-group-item",onClick:n.groupClick.bind(n,t)
      },t[w])):function(t){
       var r=!!u.find((function(e){
        return e[k]==t[k]
       })),i=r?{color:l.color,border:"none"}:{borderColor:l.color},c={};
       g&&t[k]===n.state.val&&(c.backgroundColor=l.hover), !Q&&r&&(c.backgroundColor=l.color, t[O]&&(c.backgroundColor="#C2C2C2"));
       var p,f,d=["xm-option",t[O]?" disabled":"",r?" selected":"",Q?"show-icon":"hide-icon"].join(" "),h=["xm-option-icon",(p=e.iconfont.select, f=e.iconfont.unselect, (p?!r&&f?f+" xm-custom-icon":p:0)||"xm-iconfont "+(s?"xm-icon-danx":"xm-icon-duox"))].join(" "),b=function(e){
        "mouseenter"===e.type?t[O]||(g?n.setState({val:t[k]}):e.target.style.backgroundColor=l.hover):"mouseleave"===e.type&&(t[O]||g||(e.target.style.backgroundColor=""))
       };
       return m("div",{
        class:d,style:c,value:t[k],onClick:n.optionClick.bind(n,t,r,t[O]),onMouseEnter:b,onMouseLeave:b
       },Q&&m("i",{class:h,style:i}),m("div",{
        class:"xm-option-content",dangerouslySetInnerHTML:{
         __html:a({
          data:o,item:t,arr:u,name:t[w],value:t[k]
         })
        }
       }))
      }(t)
     }))).length?_&&this.state.val==ne&&this.keydown("div",{keyCode:40}):(!e.pageEmptyShow&&(D=""), S.push(m("div",{class:"xm-select-empty"},p))), m("div",{
      onClick:this.blockClick,tabindex:"1",style:"outline: none;"
     },m("div",null,e.toolbar.show&&Y,P,m("div",{
      class:"scroll-body",style:{maxHeight:e.height}
     },S),e.paging&&D),this.state.loading&&m("div",{class:"loading"},m("span",{class:"loader"})))
    }
   },{
    key:"componentDidMount",value:function(){
     var e=this.base.querySelector(".xm-search-input");
     e&&(e.addEventListener("compositionstart",this.handleComposition.bind(this)), e.addEventListener("compositionupdate",this.handleComposition.bind(this)), e.addEventListener("compositionend",this.handleComposition.bind(this)), e.addEventListener("input",this.searchInput.bind(this)), this.searchInputRef=e), this.base.addEventListener("keydown",this.keydown.bind(this,"div"))
    }
   },{
    key:"componentDidUpdate",value:function(){
     if(this.callback){
      this.callback= !1;
      var e=this.props.filterDone;
      Object(c.e)(e)&&e(this.state.filterValue,this.tempData||[])
     }
    }
   }])&&G(t.prototype,n), o&&G(t,o), i
  }(x);
  function re(e){
   return (re="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function ie(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function ae(e,t){
   return (ae=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function le(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=ce(e);
    if(t){
     var r=ce(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return se(this,n)
   }
  }
  function se(e,t){
   return !t||"object"!==re(t)&&"function"!= typeof t?function(e){
    if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
   }(e):t
  }
  function ce(e){
   return (ce=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  var ue=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&ae(e,t)
   }(i,e);
   var t,n,o,r=le(i);
   function i(e){
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), r.call(this,e)
   }
   return t=i, (n=[{
    key:"blockClick",value:function(e){
     e.stopPropagation()
    }
   },{
    key:"shouldComponentUpdate",value:function(){
     return !this.prepare
    }
   },{
    key:"render",value:function(e){
     return this.prepare= !0, m("div",{
      onClick:this.blockClick,class:"xm-body-custom"
     },m("div",{class:"scroll-body",style:{maxHeight:e.height}},m("div",{
      style:"margin: 5px 0",dangerouslySetInnerHTML:{__html:e.content}
     })))
    }
   }])&&ie(t.prototype,n), o&&ie(t,o), i
  }(x);
  function pe(e){
   return (pe="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function fe(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function de(e,t){
   return (de=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function he(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=be(e);
    if(t){
     var r=be(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return me(this,n)
   }
  }
  function me(e,t){
   return !t||"object"!==pe(t)&&"function"!= typeof t?function(e){
    if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
   }(e):t
  }
  function be(e){
   return (be=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  var ye={},xe=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&de(e,t)
   }(i,e);
   var t,n,o,r=he(i);
   function i(e){
    var t;
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), (t=r.call(this,e)).state={
     expandedKeys:[],filterValue:"",remote:!0,loading:!1,val:ye
    }, t.searchCid=0, t.inputOver= !0, t.__value="", t.tempData=[], t.__skipAutoExpand="", t
   }
   return t=i, (n=[{
    key:"init",value:function(e){
     var t=e.tree,n=e.dataObj,o=e.flatData,r=e.prop,i=r.value,a=r.optgroup,l=[];
     !0===t.expandedKeys?l=o.filter((function(e){
      return !0===e[a]
     })).map((function(e){
      return e[i]
     })):!1===t.expandedKeys||t.expandedKeys.forEach((function(e){
      l.push(e);
      for(var t=n[e],o=function(){
       var e=t[i];
       -1===l.findIndex((function(t){
        return t===e
       }))&&l.push(e), t=t.__node.parent
      }; t;) o()
     })), this.setState({expandedKeys:l})
    }
   },{
    key:"blockClick",value:function(e){
     e.stopPropagation()
    }
   },{
    key:"optionClick",value:function(e,t,n,o,r){
     var i=this;
     if("line"===o){
      if(!0===e.__node.loading) return;
      var a=this.props,l=a.tree,s=a.prop,u=a.sels,p=l.clickExpand,f=l.clickCheck,d=r.target&&Object(c.e)(r.target.getAttribute)&&"expand"===r.target.getAttribute("type");
      if(p||d){
       if(!l.lazy&& !e[s.optgroup]) return void this.props.ck(e,t,n);
       var h=e[this.props.prop.value],m=this.state.expandedKeys,b=m.findIndex((function(e){
        return e===h
       }));
       -1===b?m.push(h):m.splice(b,1), this.setState({expandedKeys:m});
       var y=e[s.children];
       l.lazy&&y&&0===y.length&& !1!==e.__node.loading&&(e.__node.loading= !0, l.load(e,(function(t){
        e.__node.loading= !1, e[s.children]=i.handlerData(t,s.children), e[s.selected]=-1!=u.findIndex((function(t){
         return t[s.value]===e[s.value]
        })), i.props.onReset(u,"treeData")
       })))
      }else f&&(o="checkbox")
     }
     "checkbox"===o&&this.props.ck(e,t,n), this.blockClick(r)
    }
   },{
    key:"handlerData",value:function(e,t){
     var n=this;
     return e.map((function(e){
      return e.__node={}, e[t]&&(e[t]=n.handlerData(e[t],t)), e
     }))
    }
   },{
    key:"searchInput",value:function(e){
     var t=this,n=e.target.value;
     n!==this.__value&&(clearTimeout(this.searchCid), this.inputOver&&(this.__value=n, this.searchCid=setTimeout((function(){
      t.callback= !0, t.setState({filterValue:t.__value,remote:!0})
     }),this.props.delay)))
    }
   },{
    key:"focus",value:function(){
     this.searchInputRef&&this.searchInputRef.focus()
    }
   },{
    key:"blur",value:function(){
     this.searchInputRef&&this.searchInputRef.blur()
    }
   },{
    key:"handleComposition",value:function(e){
     var t=e.type;
     "compositionstart"===t?(this.inputOver= !1, clearTimeout(this.searchCid)):"compositionend"===t&&(this.inputOver= !0, this.searchInput(e))
    }
   },{
    key:"filterData",value:function(e,t,n){
     var o=this,r=this.props,i=r.prop,a=r.filterMethod,l=r.tree,s=i.children,c=i.optgroup,u=(i.name, i.value);
     return e.forEach((function(e,r){
      var p,f=!!t&& !a(t,e,r,i);
      if(l.strict?p= !1:f=p=!1!==n&&f, e[c]){
       var d=o.filterData(e[s],t,p),h=!!t&&0===d.filter((function(e){
        return !e.__node.hidn
       })).length;
       if(!(f=(l.strict||p)&&h)&&o.__skipAutoExpand!=t){
        var m=o.state.expandedKeys;
        t&& -1===m.findIndex((function(t){
         return t===e[u]
        }))&&(m.push(e[u]), o.setState({expandedKeys:m})), o.__skipAutoExpand=t
       }
      }
      e.__node.hidn=f
     })), e
    }
   },{
    key:"postData",value:function(){
     var e=this;
     this.state.remote&&(this.callback= !1, this.setState({
      loading:!0,remote:!1
     }), this.blur(), this.props.remoteMethod(this.state.filterValue,(function(t,n){
      e.focus(), e.callback= !0, e.setState({loading:!1,totalSize:n}), e.props.onReset(t,"data")
     }),this.props.show,1))
    }
   },{
    key:"componentWillReceiveProps",value:function(e){
     var t=this;
     this.props.show!=e.show&&(e.show?setTimeout((function(){
      return t.focus()
     }),0):(this.setState({
      filterValue:"",val:ye
     }), this.__value="", this.__skipAutoExpand="", this.searchInputRef&&(this.searchInputRef.value="")))
    }
   },{
    key:"componentWillMount",value:function(){
     this.init(this.props)
    }
   },{
    key:"render",value:function(e,t){
     var n=this,o=(t.expandedKeys, e.prop),r=e.empty,i=e.sels,a=e.theme,l=e.radio,s=e.template,u=e.data,p=e.tree,f=e.filterable,d=e.remoteSearch,h=e.searchTips,b=e.iconfont,y=e.enableKeyboard,x=o.name,v=o.value,g=o.disabled,_=o.children,w=o.optgroup,k="hidden"!=e.model.icon,O=function(e,t,o){
      var r=!!i.find((function(t){
       return t[v]==e[v]
      })),c=e[g],f=!0===e.__node.half;
      p.strict&&(r=r||f||e.__node.selected, c=c||e.__node.disabled);
      var d=r?{color:a.color,border:"none"}:{borderColor:a.color},h={paddingLeft:t+"px"};
      y&&e[v]===n.state.val&&(h.backgroundColor=a.hover), !k&&r&&(h.backgroundColor=a.color, c&&(h.backgroundColor="#C2C2C2"));
      var w=["xm-option",c?" disabled":"",r?" selected":"",k?"show-icon":"hide-icon"].join(" "),O=0!==o&&"hidden"===b.parent?"xm-option-icon-hidden":["xm-option-icon",(f?b.half?b.half+" xm-custom-icon":0:0!==o&&b.parent?b.parent+" xm-custom-icon":r?b.select?b.select:0:b.unselect?b.unselect+" xm-custom-icon":0)||"xm-iconfont "+(l?"xm-icon-danx":p.strict&&f?"xm-icon-banxuan":"xm-icon-duox")].join(" "),C=["xm-tree-icon",o?"expand":"",e[_]&&(e[_].length>0||p.lazy&& !1!==e.__node.loading)?"xm-visible":"xm-hidden"].join(" "),j=[];
      p.showFolderIcon&&(j.push(m("i",{
       class:C,type:"expand"
      })), p.showLine&&(o&&j.push(m("i",{
       class:"left-line",style:{left:t-p.indent+3+"px"}
      })), j.push(m("i",{
       class:"top-line",style:{left:t-p.indent+3+"px",width:p.indent+(0===o?10:-2)+"px"}
      }))));
      var S=function(t){
       "mouseenter"===t.type?e[g]||(y?n.setState({val:e[v]}):t.target.style.backgroundColor=a.hover):"mouseleave"===t.type&&(e[g]||y||(t.target.style.backgroundColor=""))
      };
      return m("div",{
       class:w,style:h,value:e[v],onClick:n.optionClick.bind(n,e,r,e[g],"line"),onMouseEnter:S,onMouseLeave:S
      },j,e.__node.loading&&m("span",{class:"loader"}),k&&m("i",{
       class:O,style:d,onClick:n.optionClick.bind(n,e,r,e[g],"checkbox")
      }),m("div",{
       class:"xm-option-content",dangerouslySetInnerHTML:{__html:s({data:u,item:e,arr:i,name:e[x],value:e[v]})}
      }))
     };
     f&&(d?this.postData():this.filterData(u,this.state.filterValue));
     var C=Object(c.b)([],u),j=Object(c.b)([],i);
     this.tempData=C;
     var S=u.map((function(e){
      return function e(t,o){
       if(!t.__node.hidn){
        var r=t[_];
        if(o+=p.indent, r){
         var i=-1!==n.state.expandedKeys.findIndex((function(e){
          return t[v]===e
         }));
         return 0===r.length&&(i= !1), m("div",{class:"xm-tree"},p.showFolderIcon&&p.showLine&&i&&r.length>0&&m("i",{
          class:"left-line left-line-group",style:{left:o+3+"px"}
         }),O(t,o,0===r.length&&(!p.lazy||p.lazy&& !1===t.__node.loading)?0:i),i&&m("div",{class:"xm-tree-box"},r.map((function(t){
          return e(t,o)
         }))))
        }
        return O(t,o,0)
       }
      }(e,10-p.indent)
     })).filter((function(e){
      return e
     }));
     function E(e,t){
      t.forEach((function(t){
       t[w]?(p.strict||"hidden"===b.parent||e.push(t), E(e,t[_])):e.push(t)
      }))
     }
     var A=m("div",{class:"xm-toolbar"},e.toolbar.list.map((function(t){
      var r,s=e.languageProp.toolbar[t];
      r="ALL"===t?{
       icon:"xm-iconfont xm-icon-quanxuan",name:s,method:function(e){
        var t=[];
        E(t,e), t=t.filter((function(e){
         return !e[g]&& !e.__node.hidn
        })), n.props.onReset(l?t.slice(0,1):Object(c.f)(t,i,o),"treeData")
       }
      }:"CLEAR"===t?{
       icon:"xm-iconfont xm-icon-qingkong",name:s,method:function(e){
        n.props.onReset(i.filter((function(e){
         return e[o.disabled]
        })),"treeData")
       }
      }:"REVERSE"===t?{
       icon:"xm-iconfont xm-icon-fanxuan",name:s,method:function(e){
        var t=[];
        E(t,e), t=t.filter((function(e){
         return !e[g]&& !e.__node.hidn
        }));
        var r=[];
        i.forEach((function(e){
         var n=t.findIndex((function(t){
          return t[v]===e[v]
         }));
         -1==n?r.push(e):t.splice(n,1)
        })), n.props.onReset(l?r.slice(0,1):Object(c.f)(t,r,o),"treeData")
       }
      }:t;
      var u=function(e){
       "mouseenter"===e.type&&(e.target.style.color=a.color), "mouseleave"===e.type&&(e.target.style.color="")
      };
      return m("div",{
       class:"toolbar-tag",onClick:function(){
        Object(c.e)(r.method)&&r.method(C,j)
       },onMouseEnter:u,onMouseLeave:u
      },e.toolbar.showIcon&&m("i",{class:r.icon}),m("span",null,r.name))
     })).filter((function(e){
      return e
     }))),R=m("div",{class:f?"xm-search":"xm-search dis"},m("i",{class:"xm-iconfont xm-icon-sousuo"}),m("input",{
      class:"xm-input xm-search-input",placeholder:h
     }));
     return S.length||S.push(m("div",{class:"xm-select-empty"},r)), m("div",{
      onClick:this.blockClick,class:"xm-body-tree"
     },e.toolbar.show&&A,R,m("div",{
      class:"scroll-body",style:{maxHeight:e.height}
     },S),this.state.loading&&m("div",{class:"loading"},m("span",{class:"loader"})))
    }
   },{
    key:"componentDidMount",value:function(){
     var e=this.base.querySelector(".xm-search-input");
     e&&(e.addEventListener("compositionstart",this.handleComposition.bind(this)), e.addEventListener("compositionupdate",this.handleComposition.bind(this)), e.addEventListener("compositionend",this.handleComposition.bind(this)), e.addEventListener("input",this.searchInput.bind(this)), this.searchInputRef=e)
    }
   },{
    key:"componentDidUpdate",value:function(){
     if(this.callback){
      this.callback= !1;
      var e=this.props.filterDone;
      Object(c.e)(e)&&e(this.state.filterValue,this.tempData||[])
     }
    }
   }])&&fe(t.prototype,n), o&&fe(t,o), i
  }(x);
  function ve(e){
   return (ve="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function ge(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function _e(e,t){
   return (_e=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function we(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=Oe(e);
    if(t){
     var r=Oe(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return ke(this,n)
   }
  }
  function ke(e,t){
   return !t||"object"!==ve(t)&&"function"!= typeof t?function(e){
    if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
   }(e):t
  }
  function Oe(e){
   return (Oe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  var Ce=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&_e(e,t)
   }(i,e);
   var t,n,o,r=we(i);
   function i(e){
    var t;
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), (t=r.call(this,e)).state={expand:[]}, t
   }
   return t=i, (n=[{
    key:"blockClick",value:function(e){
     e.stopPropagation()
    }
   },{
    key:"optionClick",value:function(e,t,n,o,r,i){
     if("line"===o){
      if(!e.optgroup&&n) return;
      if(!0===e.__node.loading) return;
      var a=this.props,l=a.cascader,s=a.prop;
      if(a.sels, !l.lazy&& !e[s.optgroup]) return void this.props.ck(e,t,n);
      var c=this.state.expand.slice(0,r+1);
      c[r]=e[this.props.prop.value], this.setState({expand:c})
     }else "checkbox"===o&&this.props.ck(e,t,n);
     this.blockClick(i)
    }
   },{
    key:"componentWillReceiveProps",value:function(e){
    }
   },{
    key:"componentWillMount",value:function(){
    }
   },{
    key:"render",value:function(e,t){
     var n=this,o=e.prop,r=e.empty,i=e.sels,a=e.theme,l=e.radio,s=e.template,c=e.data,u=e.cascader,p=o.name,f=o.value,d=o.disabled,h=o.children,b=o.optgroup,y="hidden"!=e.model.icon,x=[],v=function t(o,r,v){
      var g=o[h];
      r=r+u.indent+6;
      var _=g&&n.state.expand[v]===o[f];
      return _&&x.push(m("div",{
       class:"xm-cascader-box",index:v%4,style:{left:r+"px",width:u.indent+"px"}
      },m("div",{class:"xm-cascader-scroll scroll-body"},g.map((function(e){
       return t(e,r,v+1)
      }))))), function(t,o,r,x){
       var v=!!i.find((function(e){
        return e[f]==t[f]
       })),g=t[d],_=!0===t.__node.half;
       u.strict&&(v=v||_||t.__node.selected, g=g||t.__node.disabled);
       var w=v?{color:a.color,border:"none"}:{borderColor:a.color},k=t[h]&&t[h].length>0,O={backgroundColor:"transparent"},C=["xm-option",g?" disabled":"",v?" selected":"",y?"show-icon":"hide-icon"].join(" "),j=k&&"hidden"===e.iconfont.parent?"xm-option-icon-hidden":["xm-option-icon",(_?e.iconfont.half?e.iconfont.half+" xm-custom-icon":0:k&&e.iconfont.parent?e.iconfont.parent+" xm-custom-icon":v?e.iconfont.select?e.iconfont.select:0:e.iconfont.unselect?e.iconfont.unselect+" xm-custom-icon":0)||"xm-iconfont "+(l?"xm-icon-danx":u.strict&&_?"xm-icon-banxuan":"xm-icon-duox")].join(" ");
       t[f]===n.state.val&&(O.backgroundColor=a.hover), !y&&v&&(O.backgroundColor=a.color, g&&(O.backgroundColor="#C2C2C2"));
       var S={},E={};
       x&&(S.color=a.color, S.fontWeight=700, E.color=a.color);
       var A=function(e){
        "mouseenter"===e.type?t[d]||n.setState({val:t[f]}):"mouseleave"===e.type&&n.setState({val:""})
       };
       return m("div",{
        class:C,style:O,value:t[f],onClick:n.optionClick.bind(n,t,v,g,"line",r),onMouseEnter:A,onMouseLeave:A
       },y&&m("i",{
        class:j,style:w,onClick:n.optionClick.bind(n,t,v,g,"checkbox",r)
       }),m("div",{
        class:"xm-option-content",style:S,dangerouslySetInnerHTML:{
         __html:s({
          data:c,item:t,arr:i,name:t[p],value:t[f]
         })
        }
       }),t[b]&&m("div",{class:"xm-right-arrow",style:E}))
      }(o,0,v,_)
     },g=c.map((function(e){
      return v(e,2,0)
     })).concat(x).filter((function(e){
      return e
     }));
     return g.length||g.push(m("div",{class:"xm-select-empty"},r)), m("div",{
      onClick:this.blockClick,class:"xm-body-cascader scroll-body",style:{width:u.indent+"px",maxHeight:e.height}
     },g)
    }
   },{
    key:"componentDidMount",value:function(){
     this.props.onReset("cascader","class")
    }
   }])&&ge(t.prototype,n), o&&ge(t,o), i
  }(x);
  function je(){
   return (je=Object.assign||function(e){
    for(var t=1; t<arguments.length; t++){
     var n=arguments[t];
     for(var o in n) Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])
    }
    return e
   }).apply(this,arguments)
  }
  function Se(e){
   return function(e){
    if(Array.isArray(e)) return Ee(e)
   }(e)||function(e){
    if("undefined"!= typeof Symbol&&Symbol.iterator in Object(e)) return Array.from(e)
   }(e)||function(e,t){
    if(!e) return;
    if("string"== typeof e) return Ee(e,t);
    var n=Object.prototype.toString.call(e).slice(8,-1);
    "Object"===n&&e.constructor&&(n=e.constructor.name);
    if("Map"===n||"Set"===n) return Array.from(e);
    if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ee(e,t)
   }(e)||function(){
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
   }()
  }
  function Ee(e,t){
   (null==t||t>e.length)&&(t=e.length);
   for(var n=0,o=new Array(t); n<t; n++) o[n]=e[n];
   return o
  }
  function Ae(e,t){
   var n=Object.keys(e);
   if(Object.getOwnPropertySymbols){
    var o=Object.getOwnPropertySymbols(e);
    t&&(o=o.filter((function(t){
     return Object.getOwnPropertyDescriptor(e,t).enumerable
    }))), n.push.apply(n,o)
   }
   return n
  }
  function Re(e){
   for(var t=1; t<arguments.length; t++){
    var n=null!=arguments[t]?arguments[t]:{};
    t%2?Ae(Object(n),!0).forEach((function(t){
     Pe(e,t,n[t])
    })):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ae(Object(n)).forEach((function(t){
     Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))
    }))
   }
   return e
  }
  function Pe(e,t,n){
   return t in e?Object.defineProperty(e,t,{
    value:n,enumerable:!0,configurable:!0,writable:!0
   }):e[t]=n, e
  }
  function Ie(e){
   return (Ie="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function De(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  function Me(e,t){
   return (Me=Object.setPrototypeOf||function(e,t){
    return e.__proto__=t, e
   })(e,t)
  }
  function Te(e){
   var t=function(){
    if("undefined"== typeof Reflect|| !Reflect.construct) return !1;
    if(Reflect.construct.sham) return !1;
    if("function"== typeof Proxy) return !0;
    try{
     return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){
     }))), !0
    }catch(e){
     return !1
    }
   }();
   return function(){
    var n,o=Ve(e);
    if(t){
     var r=Ve(this).constructor;
     n=Reflect.construct(o,arguments,r)
    }else n=o.apply(this,arguments);
    return ze(this,n)
   }
  }
  function ze(e,t){
   return !t||"object"!==Ie(t)&&"function"!= typeof t?Le(e):t
  }
  function Le(e){
   if(void 0===e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
   return e
  }
  function Ve(e){
   return (Ve=Object.setPrototypeOf?Object.getPrototypeOf:function(e){
    return e.__proto__||Object.getPrototypeOf(e)
   })(e)
  }
  var Fe=function(e){
   !function(e,t){
    if("function"!= typeof t&&null!==t) throw new TypeError("Super expression must either be null or a function");
    e.prototype=Object.create(t&&t.prototype,{
     constructor:{
      value:e,writable:!0,configurable:!0
     }
    }), t&&Me(e,t)
   }(i,e);
   var t,n,o,r=Te(i);
   function i(e){
    var t;
    return function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,i), t=r.call(this,e), et[e.el]=Le(t), t.state=t.initState(), t.bodyView=null, t
   }
   return t=i, (n=[{
    key:"initState",value:function(){
     return {
      data:[],dataObj:{},flatData:[],sels:[],show:!1,tmpColor:"",bodyClass:"",time:0
     }
    }
   },{
    key:"init",value:function(e,t){
     var n,o=e.data,r=e.prop,i=e.initValue,a=e.radio,l=e.tree,s=e.cascader;
     if(t){
      var c={},u=[];
      this.load(o,c,u,null,0,i?i.map((function(e){
       return "object"===Ie(e)?e[r.value]:e
      })):null), n=this.exchangeValue(i||Object.keys(c).filter((function(e){
       return !0===c[e][r.selected]
      })),c), a&&n.length>1&&(n=n.slice(0,1), (l.show&&l.strict||s.show&&s.strict)&&this.clearAndReset(o,n,!1)), this.setState({
       sels:n,dataObj:c,flatData:u
      })
     }
     return this.setState({data:o}), n
    }
   },{
    key:"upDate",value:function(e,t){
     var n=this.state.dataObj,o=this.props,r=o.prop,i=o.tree,a=o.cascader,l=r.value,s=r.disabled,u=r.children;
     e.map((function(e){
      return n["object"===Ie(e)?e[l]:e]
     })).filter((function(e){
      return e
     })).forEach((function(e){
      if(e[s]= !t, i.show&&i.strict||a.show&&a.strict){
       if(t) for(var n=e; n;) n[s]= !1, n=n.__node.parent;
       !function e(n){
        n[s]= !t;
        var o=n[u];
        o&&Object(c.d)(o)&&o.forEach((function(t){
         return e(t)
        }))
       }(e)
      }
     })), this.setState({dataObj:n})
    }
   },{
    key:"exchangeValue",value:function(e){
     var t=this,n=arguments.length>1&& void 0!==arguments[1]?arguments[1]:this.state.dataObj,o=this.props,r=o.prop,i=o.tree,a=o.cascader,l=(o.data, r.children),s=r.value,u=e.map((function(e){
      return "object"===Ie(e)?Re(Re({},e),{},{__node:{}}):n[e]
     })).filter((function(e){
      return e
     })),p=Se(u);
     if(i.show&&i.strict||a.show&&a.strict){
      var f=function e(t,n){
       var o=n[l];
       o&&Object(c.d)(o)&&o.forEach((function(n){
        -1===u.findIndex((function(e){
         return e[s]===n[s]
        }))&&t.push(n), e(t,n)
       }))
      },d={};
      d[l]=u, f(p,d), p=p.filter((function(e){
       return !0!==e[t.props.prop.optgroup]
      }))
     }
     return p
    }
   },{
    key:"value",value:function(e,t,n,o){
     var r=!(arguments.length>4&& void 0!==arguments[4])||arguments[4];
     !1!==t&& !0!==t&&(t=this.state.show);
     var i=this.props,a=i.prop,l=i.tree,s=i.cascader,c=this.exchangeValue(e);
     if(!this.checkMax(c,c,!0)){
      if(l.show&&l.strict||s.show&&s.strict){
       var u=this.state.data;
       this.clearAndReset(u,c,!1), c=this.init({data:u,prop:a},!0)
      }
      this.resetSelectValue(c,o||c,r,n), this.setState({show:t})
     }
    }
   },{
    key:"clearAndReset",value:function(e,t,n){
     var o=this,r=this.props.prop,i=r.selected,a=r.disabled,l=r.children,s=r.value;
     e.forEach((function(e){
      e[i]=-1!=t.findIndex((function(t){
       return t[s]===e[s]
      }))||n;
      var r=e[l];
      if(r&&Object(c.d)(r)&&r.length>0){
       o.clearAndReset(r,t,e[i]);
       var u=r.length,p=r.filter((function(e){
        return !0===e[i]|| !0===e.__node.selected
       })).length;
       e.__node.selected=p===u, e.__node.half=p>0&&p<u||r.filter((function(e){
        return !0===e.__node.half
       })).length>0, e.__node.disabled=r.filter((function(e){
        return !0===e[a]|| !0===e.__node.disabled
       })).length===u
      }
     }))
    }
   },{
    key:"load",value:function(e,t,n,o){
     var r=this,i=arguments.length>4&& void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5?arguments[5]:void 0,l=this.props,s=l.prop,u=l.tree,p=l.cascader,f=s.children,d=s.optgroup,h=s.value,m=s.selected,b=s.disabled;
     e.forEach((function(e){
      e.__node={
       parent:o,level:i,loading:e.__node&&e.__node.loading
      }, a&&(delete e[m], a.find((function(t){
       return t===e[h]
      }))&&(e[m]= !0)), t[e[h]]=e, n.push(e);
      var l=e[f];
      if(l&&Object(c.d)(l)){
       var s=l.length;
       if(s>0){
        r.load(l,t,n,e,i+1,a), e[d]= !0, (u.show&&u.strict||p.show&&p.strict)&&(!0===e[m]&&(delete e[m], l.forEach((function(e){
         return e[m]= !0
        }))), !0===e[b]&&(delete e[b], l.forEach((function(e){
         return e[b]= !0
        }))));
        var y=l.filter((function(e){
         return !0===e[m]|| !0===e.__node.selected
        })).length;
        e.__node.selected=y===s, e.__node.half=y>0&&y<s||l.filter((function(e){
         return !0===e.__node.half
        })).length>0, e.__node.disabled=l.filter((function(e){
         return !0===e[b]|| !0===e.__node.disabled
        })).length===s
       }
      }
     }))
    }
   },{
    key:"resetSelectValue",value:function(){
     var e=arguments.length>0&& void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&& void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,o=!(arguments.length>3&& void 0!==arguments[3])||arguments[3],r=this.props.on;
     if(Object(c.e)(r)&&this.prepare&&o){
      var i=r({arr:e,change:t,isAdd:n});
      if(Object(c.d)(i)) return this.value(i,null,!1)
     }
     this.setState({sels:e})
    }
   },{
    key:"updateBorderColor",value:function(e){
     this.setState({tmpColor:e})
    }
   },{
    key:"treeHandler",value:function(e,t,n,o,r){
     var i=this,a=this.props.prop,l=a.value,s=(a.selected, a.disabled),c=a.children,u=a.optgroup,p=t[c];
     if(p.filter((function(e){
      return !(e[s]||e.__node.disabled)
     })).forEach((function(t){
      if(t[u]) i.treeHandler(e,t,n,o,r); else{
       var a=e.findIndex((function(e){
        return e[l]==t[l]
       }));
       "del"===o?-1!=a&&(e.splice(a,1), n.push(t)):"half"!==o&&"add"!==o|| -1==a&&(e.push(t), n.push(t))
      }
     })), r){
      var f=p.length,d=p.filter((function(t){
       return -1!==e.findIndex((function(e){
        return e[l]===t[l]
       }))|| !0===t.__node.selected
      })).length;
      t.__node.selected=d===f, t.__node.half=d>0&&d<f
     }
    }
   },{
    key:"checkMax",value:function(e,t,n){
     var o=this.props,r=o.max,i=o.maxMethod,a=o.theme,l=Object(c.i)(r),s=(n?t.length:(Object(c.d)(e)?e.length:1)+t.length)>l;
     if(l>0&&s) return this.updateBorderColor(a.maxColor), i&&Object(c.e)(i)&&i(t,e), !0
    }
   },{
    key:"itemClick",value:function(e,t,n,o){
     var r=this.props,i=(r.theme, r.prop),a=r.radio,l=r.repeat,s=r.clickClose,c=(r.max, r.maxMethod, r.tree),u=r.cascader,p=r.data,f=Se(this.state.sels),d=i.value,h=(i.selected, i.disabled, i.children),m=i.optgroup;
     if(!n){
      if(e[m]&&(c.show&&c.strict||u.show&&u.strict)){
       e[h];
       var b,y=[],x=!0;
       if(e.__node.selected?(b="del", x= !1):e.__node.half?(b="half", this.treeHandler(f,e,y,b), 0===y.length&&(b="del", x= !1)):b="add", "half"!=b&&this.treeHandler(f,e,y,b), this.checkMax(y,f)) return;
       f=Se(this.state.sels), y=[], this.treeHandler(f,e,y,b,!0), this.resetSelectValue(f,y,x), this.setState({data:this.state.data})
      }else if(!t||l&& !o){
       if(this.checkMax(e,f)) return;
       f=a?[e]:[].concat(Se(f),[e]), this.clearAndReset(p,f,t), this.resetSelectValue(f,[e],!t)
      }else{
       var v=f.findIndex((function(t){
        return t[d]==e[d]
       }));
       -1!=v&&(f.splice(v,1), this.resetSelectValue(f,[e],!t))
      }
      var g=e.__node.parent;
      if(g){
       for(; g;){
        var _=g[h],w=_.length,k=_.filter((function(e){
         return -1!==f.findIndex((function(t){
          return t[d]===e[d]
         }))|| !0===e.__node.selected
        })).length;
        g.__node.selected=k===w, g.__node.half=k>0&&k<w||_.filter((function(e){
         return !0===e.__node.half
        })).length>0, g=g.__node.parent
       }
       this.setState({data:this.state.data})
      }
      s&& !o&&this.onClick()
     }
    }
   },{
    key:"onClick",value:function(e){
     var t=this;
     if("relative"!==this.props.model.type) if(this.props.disabled) !1!==this.state.show&&this.setState({show:!1}); else{
      var n=!this.state.show;
      if(n){
       if(this.props.show&&0==this.props.show()) return;
       Object.keys(Xe).filter((function(e){
        return e!=t.props.el
       })).forEach((function(e){
        return Xe[e].closed()
       }))
      }else{
       if(this.props.hide&&0==this.props.hide()) return;
       this.bodyView.scroll&&this.bodyView.scroll(0,0)
      }
      this.setState({show:n}), e&&e.stopPropagation()
     }
    }
   },{
    key:"onReset",value:function(e,t){
     var n=this;
     if("data"===t){
      var o=e.filter((function(e){
       return !0===e[n.props.prop.selected]
      }));
      this.resetSelectValue(Object(c.f)(o,this.state.sels,this.props.prop),o,!0);
      var r=[];
      this.load(e,{},r), this.setState({data:e,flatData:r})
     }else "sels"===t?this.resetSelectValue(e,e,!0):"append"===t?this.append(e):"delete"===t?this.del(e):"auto"===t?this.auto(e):"treeData"===t?this.value(e,null,!0,!1,!1):"close"===t?this.onClick():"class"===t?this.setState({bodyClass:e}):"labelSearchBlur"===t?this.labelRef.blur(e):"labelSearch"===t&&this.generalRef.labelSearch(e)
    }
   },{
    key:"append",value:function(e){
     var t=this.exchangeValue(e);
     this.value(Object(c.f)(t,this.state.sels,this.props.prop),this.props.show,!0,t)
    }
   },{
    key:"del",value:function(e){
     var t=this.props.prop.value,n=this.state.sels,o=this.exchangeValue(e);
     o.forEach((function(e){
      var o=n.findIndex((function(n){
       return n[t]===e[t]
      }));
      -1!=o&&n.splice(o,1)
     })), this.value(n,this.props.show,!0,o,!1)
    }
   },{
    key:"auto",value:function(e){
     var t=this,n=this.props.prop.value;
     e.filter((function(e){
      return -1!=t.state.sels.findIndex((function(t){
       return t[n]===e[n]
      }))
     })).length==e.length?this.del(e):this.append(e)
    }
   },{
    key:"changeExpandedKeys",value:function(e){
     var t=this.props,n=t.tree,o=t.prop,r=this.state,i=r.dataObj,a=r.flatData;
     n.show&&this.treeRef.init({dataObj:i,flatData:a,prop:o,tree:{expandedKeys:e}})
    }
   },{
    key:"calcPosition",value:function(){
     if(this.state.show&&"fixed"===this.props.model.type){
      var e=this.base.getBoundingClientRect();
      return Date.now()-this.state.time>10&&this.setState({time:Date.now()}), {
       position:"fixed",left:e.x,top:e.y+e.height+4,width:e.width
      }
     }
     return {}
    }
   },{
    key:"componentWillReceiveProps",value:function(e){
     this.init(e,e.updateData)
    }
   },{
    key:"componentWillMount",value:function(){
     this.init(this.props,!0)
    }
   },{
    key:"render",value:function(e,t){
     var n=this,o=e.theme,r=e.prop,i=(e.radio, e.repeat, e.clickClose, e.on, e.max, e.maxMethod, e.content),a=e.disabled,l=e.tree,s=e.submitConversion,u={borderColor:o.color},p=t.data,f=t.dataObj,d=t.flatData,h=t.sels,b=t.show,y=t.tmpColor,x=t.bodyClass;
     a&&(b= !1);
     var v={
      style:Re(Re({},e.style),b?u:{}),onClick:this.onClick.bind(this),ua:Object(c.a)(),size:e.size,tabindex:1
     };
     y&&(v.style.borderColor=y, setTimeout((function(){
      v.style.borderColor="", n.updateBorderColor("")
     }),300)), r.value;
     var g=Re(Re({},e),{},{
      data:p,sels:h,ck:this.itemClick.bind(this),title:h.map((function(e){
       return e[r.name]
      })).join(","),onReset:this.onReset.bind(this)
     }),_=Re(Re({},e),{},{
      data:p,dataObj:f,flatData:d,sels:h,ck:this.itemClick.bind(this),show:b,onReset:this.onReset.bind(this)
     }),w=i?m(ue,_):l.show?m(xe,je({},_,{
      ref:function(e){
       return n.treeRef=e
      }
     })):e.cascader.show?m(Ce,_):m(oe,je({},_,{
      ref:function(e){
       return n.generalRef=e
      }
     })),k=this.calcPosition();
     return m("xm-select",v,m("input",{
      class:"xm-select-default","lay-verify":e.layVerify,"lay-verType":e.layVerType,"lay-reqText":e.layReqText,name:e.name,value:s(h,r)
     }),m("i",{class:b?"xm-icon xm-icon-expand":"xm-icon"}),0===h.length&&m("div",{class:"xm-tips"},e.tips),m(H,je({},g,{
      ref:function(e){
       return n.labelRef=e
      }
     })),m("div",{
      class:["xm-body",x,e.model.type,b?"":"dis"].join(" "),style:k,ref:function(e){
       return n.bodyView=e
      }
     },w),a&&m("div",{class:"xm-select-disabled"}))
    }
   },{
    key:"componentDidMount",value:function(){
     var e=this;
     this.prepare= !0, this.base.addEventListener("keydown",(function(t){
      13===t.keyCode&&e.onClick(t)
     })), this.input=this.base.querySelector(".xm-select-default");
     var t=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;
     t&&new t((function(t){
      t.forEach((function(t){
       "attributes"==t.type&&"class"===t.attributeName&& -1!==e.input.className.indexOf("layui-form-danger")&&(e.input.className="xm-select-default", e.base.style.borderColor=e.props.theme.maxColor, e.base.scrollIntoView&&e.base.scrollIntoView({behavior:"smooth"}))
      }))
     })).observe(this.input,{attributes:!0});
     for(var n=this.base; n;){
      if("FORM"===n.tagName){
       var o=n.querySelector('button[type="reset"]');
       o&&o.addEventListener("click",(function(t){
        e.init(e.props,!0)
       }));
       break
      }
      n=n.parentElement
     }
     var r=this.props.done;
     r&&r()
    }
   },{
    key:"componentDidUpdate",value:function(){
     var e=this.props,t=e.direction,n=e.model;
     if("relative"!==n.type&&"fixed"!==n.type){
      var o=this.base.getBoundingClientRect();
      if("auto"===t){
       this.bodyView.style.display="block", this.bodyView.style.visibility="hidden";
       var r=this.bodyView.getBoundingClientRect().height;
       this.bodyView.style.display="", this.bodyView.style.visibility="";
       var i=o.y||o.top||0,a=document.documentElement.clientHeight-i-o.height-20;
       t=a>r||i<a?"down":"up"
      }
      "down"==t?(this.bodyView.style.top=o.height+4+"px", this.bodyView.style.bottom="auto"):(this.bodyView.style.top="auto", this.bodyView.style.bottom=o.height+4+"px")
     }
    }
   }])&&De(t.prototype,n), o&&De(t,o), i
  }(x),Ue={
   tips:"请选择",empty:"暂无数据",searchTips:"请选择",toolbar:{ALL:"全选",CLEAR:"清空",REVERSE:"反选",SEARCH:"搜索"},paging:{prev:"上一页",next:"下一页"}
  },Ne={
   zn:Ue,en:{
    tips:"please selected",empty:"no data",searchTips:"please search",toolbar:{ALL:"select all",CLEAR:"clear",REVERSE:"invert select",SEARCH:"search"},paging:{prev:"prev",next:"next"}
   }
  };
  function Be(e,t){
   var n=Object.keys(e);
   if(Object.getOwnPropertySymbols){
    var o=Object.getOwnPropertySymbols(e);
    t&&(o=o.filter((function(t){
     return Object.getOwnPropertyDescriptor(e,t).enumerable
    }))), n.push.apply(n,o)
   }
   return n
  }
  function Ke(e){
   for(var t=1; t<arguments.length; t++){
    var n=null!=arguments[t]?arguments[t]:{};
    t%2?Be(Object(n),!0).forEach((function(t){
     He(e,t,n[t])
    })):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Be(Object(n)).forEach((function(t){
     Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))
    }))
   }
   return e
  }
  function He(e,t,n){
   return t in e?Object.defineProperty(e,t,{
    value:n,enumerable:!0,configurable:!0,writable:!0
   }):e[t]=n, e
  }
  function qe(){
   return (qe=Object.assign||function(e){
    for(var t=1; t<arguments.length; t++){
     var n=arguments[t];
     for(var o in n) Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])
    }
    return e
   }).apply(this,arguments)
  }
  function Ye(e){
   return (Ye="function"== typeof Symbol&&"symbol"== typeof Symbol.iterator?function(e){
    return typeof e
   }:function(e){
    return e&&"function"== typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
   })(e)
  }
  function Ze(e,t){
   for(var n=0; n<t.length; n++){
    var o=t[n];
    o.enumerable=o.enumerable|| !1, o.configurable= !0, "value" in o&&(o.writable= !0), Object.defineProperty(e,o.key,o)
   }
  }
  var Qe=function(){
   function e(t){
    !function(e,t){
     if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }(this,e), this.init(t)
   }
   var t,n,o;
   return t=e, (n=[{
    key:"init",value:function(e){
     this.options=function(){
      var e=arguments.length>0&& void 0!==arguments[0]?arguments[0]:"zn",t=Ne[e]||Ue;
      return {
       language:e,languageProp:t,data:[],content:"",name:"select",layVerify:"",layVerType:"",layReqText:"",size:"medium",disabled:!1,initValue:null,create:null,tips:t.tips,empty:t.empty,delay:500,searchTips:t.searchTips,filterable:!1,filterMethod:function(e,t,n,o){
        return !e|| -1!=t[o.name].indexOf(e)
       },remoteSearch:!1,remoteMethod:function(e,t){
        t([])
       },direction:"auto",style:{},height:"200px",autoRow:!1,paging:!1,pageSize:10,pageEmptyShow:!0,pageRemote:!1,radio:!1,repeat:!1,clickClose:!1,max:0,maxMethod:function(e,t){
       },showCount:0,enableKeyboard:!0,enableHoverFirst:!0,selectedKeyCode:13,toolbar:{show:!1,showIcon:!0,list:["ALL","CLEAR"]},tree:{
        show:!1,showFolderIcon:!0,showLine:!0,indent:20,expandedKeys:[],strict:!0,lazy:!1,load:null,simple:!1,nodeType:"__node_type",clickExpand:!0,clickCheck:!0
       },cascader:{show:!1,indent:100,strict:!0},prop:{
        name:"name",value:"value",selected:"selected",disabled:"disabled",children:"children",optgroup:"optgroup",click:"click"
       },theme:{color:"#009688",maxColor:"#e54d42",hover:"#f2f2f2"},model:{
        label:{
         type:"block",text:{left:"",right:"",separator:", "},block:{showCount:0,showIcon:!0,template:null},count:{
          template:function(e,t){
           return "已选中 ".concat(t.length," 项, 共 ").concat(e.length," 项")
          }
         }
        },icon:"show",type:"absolute"
       },iconfont:{select:"",unselect:"",half:"",parent:""},show:function(){
       },hide:function(){
       },template:function(e){
        e.item, e.sels;
        var t=e.name;
        return e.value, t
       },on:function(e){
        e.arr, e.item, e.selected
       },submitConversion:function(e,t){
        return e.map((function(e){
         return e[t.value]
        })).join(",")
       },done:function(){
       }
      }
     }(e.language), this.update(e)
    }
   },{
    key:"update",value:function(){
     var e=arguments.length>0&& void 0!==arguments[0]?arguments[0]:{},t=!!e.data;
     this.options=Object(c.b)(this.options,e), this.options.__render_success= !1;
     var n=this.options.dom;
     if(n){
      var o=this.options.data||[];
      if("function"== typeof o&&(o=o(), this.options.data=o), Object(c.d)(o)) return T(m(Fe,qe({},this.options,{
       __update:Date.now(),updateData:t
      })),n), this.options.__render_success= !0, this;
      Object(c.k)("data数据必须为数组类型, 不能是".concat("undefined"== typeof data?"undefined":Ye(data),"类型"))
     }else Object(c.k)("没有找到渲染对象: ".concat(e.el,", 请检查"))
    }
   },{
    key:"reset",value:function(){
     var e=this.options.el;
     return this.init($e[e]), et[e].init(this.options,!0), this
    }
   },{
    key:"opened",value:function(){
     var e=et[this.options.el];
     return !e.state.show&&e.onClick(), this
    }
   },{
    key:"closed",value:function(){
     var e=et[this.options.el];
     return e.state.show&&e.onClick(), this
    }
   },{
    key:"getValue",value:function(e){
     var t=this,n=this.options,o=n.tree,r=n.prop,i=n.data,a=et[this.options.el].state.sels,l=a;
     o.show&&o.strict&&o.simple&&(l=[], Object(c.j)(i,a,l,r));
     var s=Object(c.c)(l,r.children,["__node"]);
     return "name"===e?s.map((function(e){
      return e[t.options.prop.name]
     })):"nameStr"===e?s.map((function(e){
      return e[t.options.prop.name]
     })).join(","):"value"===e?s.map((function(e){
      return e[t.options.prop.value]
     })):"valueStr"===e?s.map((function(e){
      return e[t.options.prop.value]
     })).join(","):s
    }
   },{
    key:"setValue",value:function(e,t){
     var n=arguments.length>2&& void 0!==arguments[2]&&arguments[2];
     if(Object(c.d)(e)) return et[this.options.el].value(this.options.radio?e.slice(0,1):e,t,n), this;
     Object(c.k)("请传入数组结构...")
    }
   },{
    key:"append",value:function(e){
     if(Object(c.d)(e)) return et[this.options.el].append(e), this;
     Object(c.k)("请传入数组结构...")
    }
   },{
    key:"delete",value:function(e){
     if(Object(c.d)(e)) return et[this.options.el].del(e), this;
     Object(c.k)("请传入数组结构...")
    }
   },{
    key:"warning",value:function(e){
     var t=arguments.length>1&& void 0!==arguments[1]&&arguments[1],n=e||this.options.theme.maxColor;
     return !0===t?et[this.options.el].base.style.borderColor=n:et[this.options.el].updateBorderColor(n), this
    }
   },{
    key:"getTreeValue",value:function(e,t){
     var n=this.options,o=n.tree,r=n.cascader,i=n.prop,a=i.value;
     if(!o.show&& !r.show) return this.getValue(e);
     for(var l=et[this.options.el].state.sels,s=[],u=o.nodeType,p=function(e,t){
      s.find((function(t){
       return t[a]===e[a]
      }))||((e=Ke({},e))[u]=t, s.push(e))
     },f=0; f<l.length; f++){
      var d=Ke({},l[f]);
      for(p(d,"leaf"); d=d.__node.parent;){
       var h=d.__node,m=h.half,b=h.selected;
       !e&&b?p(d,"parent"):t&&m&& !b&&p(d,"half")
      }
     }
     return Object(c.c)(s,i.children,["__node"])
    }
   },{
    key:"changeExpandedKeys",value:function(e){
     return et[this.options.el].changeExpandedKeys(e), this
    }
   },{
    key:"enable",value:function(e){
     if(Object(c.d)(e)){
      if(0!==e.length) return et[this.options.el].upDate(e,!0), this
     }else Object(c.k)("请传入数组结构...")
    }
   },{
    key:"disable",value:function(e){
     if(Object(c.d)(e)){
      if(0!==e.length) return et[this.options.el].upDate(e,!1), this
     }else Object(c.k)("请传入数组结构...")
    }
   },{
    key:"scroll",value:function(e){
     var t=this.options.dom.querySelector('.xm-option[value="'.concat(e,'"]'));
     return t&&t.scrollIntoView(!1), this
    }
   },{
    key:"calcPosition",value:function(){
     return et[this.options.el].calcPosition(), this
    }
   }])&&Ze(t.prototype,n), o&&Ze(t,o), e
  }();
  function Je(e,t,n){
   return t in e?Object.defineProperty(e,t,{
    value:n,enumerable:!0,configurable:!0,writable:!0
   }):e[t]=n, e
  }
  function We(e){
   return function(e){
    if(Array.isArray(e)) return Ge(e)
   }(e)||function(e){
    if("undefined"!= typeof Symbol&&Symbol.iterator in Object(e)) return Array.from(e)
   }(e)||function(e,t){
    if(!e) return;
    if("string"== typeof e) return Ge(e,t);
    var n=Object.prototype.toString.call(e).slice(8,-1);
    "Object"===n&&e.constructor&&(n=e.constructor.name);
    if("Map"===n||"Set"===n) return Array.from(e);
    if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ge(e,t)
   }(e)||function(){
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
   }()
  }
  function Ge(e,t){
   (null==t||t>e.length)&&(t=e.length);
   for(var n=0,o=new Array(t); n<t; n++) o[n]=e[n];
   return o
  }
  var Xe={},$e={},et={};
  t.c={
   name:s.a,version:s.b,doc:s.c,KeyCode:{Enter:13,Space:32},render:function(e){
    var t=e.el;
    if(e.dom=Object(c.g)(t), t.nodeType){
     var n="DOM_RENDER_"+Date.now()+"_"+Math.random();
     t.setAttribute(s.a,n), t="[".concat(s.a,"='").concat(n,"']"), e.el=t
    }
    $e[t]=e;
    var o=new Qe(e);
    return o&&o.options.__render_success&&(Xe[t]=o), o
   },get:function(e,t){
    var n;
    switch(Object.prototype.toString.call(e)){
     case"[object String]":
      e&&(n=function(t){
       return t===e
      });
      break;
     case"[object RegExp]":
      n=function(t){
       return e.test(t)
      };
      break;
     case"[object Function]":
      n=e
    }
    var o=Object.keys(Xe),r=(n?o.filter(n):o).map((function(e){
     return Xe[e]
    })).filter((function(e){
     return Object(c.g)(e.options.el)
    }));
    return t?r[0]:r
   },batch:function(e,t){
    var n=Array.prototype.slice.call(arguments);
    return n.splice(0,2), this.get(e).map((function(e){
     return e[t].apply(e,We(n))
    }))
   },arr2tree:function(){
    var e=arguments.length>0&& void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&& void 0!==arguments[1]?arguments[1]:"pid",n=arguments.length>2&& void 0!==arguments[2]?arguments[2]:"id",o=arguments.length>3&& void 0!==arguments[3]?arguments[3]:"children",r=arguments.length>4&& void 0!==arguments[4]?arguments[4]:0,i={};
    return safety(e).filter((function(e){
     var a=e[n],l=e[t],s=i[a],c=i[l];
     return s&&(e[o]=s[o]), i[a]=e, c||(c=Je({},o,[]), i[l]=c), c.push(e), n==r
    }))
   }
  }
 }
});