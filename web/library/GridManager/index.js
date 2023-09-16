/* GridManager 3.2.1 */
!function(e,t){
 if("object"== typeof exports&&"object"== typeof module) module.exports=t(); else if("function"== typeof define&&define.amd) define([],t); else{
  var o=t();
  for(var n in o) ("object"== typeof exports?exports:e)[n]=o[n]
 }
}(self,(function(){
 return (()=>{
  var e={
   956:e=>{
    e.exports='<div class="gm-toolbar" {{vm.keyName}}="{{vm.gridManagerName}}"><span class="refresh-action"><i class="gm-icon gm-icon-refresh"></i></span><div class="goto-page">{{ vm.gotoFirstText }}<input type="text" class="gp-input" current-page-info/>{{ vm.gotoLastText }}</div><div class="change-size">{{ vm.pageSizeOptionTpl }}</div><div class="toolbar-info checked-info"></div><div class="toolbar-info page-info"></div><div class="pagination"><ul pagination-before><li class="first-page">{{ vm.firstPageText }}</li><li class="previous-page">{{ vm.previousPageText }}</li></ul><ul pagination-number></ul><ul pagination-after><li class="next-page">{{ vm.nextPageText }}</li><li class="last-page">{{ vm.lastPageText }}</li></ul></div></div>'
   },976:e=>{
    e.exports="<label class=\"gm-checkbox-wrapper{{vm.disabled ? ' disabled-radio-checkbox' : ''}}\"><span class=\"gm-radio-checkbox gm-checkbox{{vm.checked === 'checked' ? ' gm-checkbox-checked' : ''}}\"><input type=\"checkbox\" class=\"gm-radio-checkbox-input gm-checkbox-input\"{{vm.value ? ' value=\"' + vm.value + '\"' : ''}}{{vm.checked === 'checked' ? ' checked=\"true\"' : ''}}/><span class=\"gm-radio-checkbox-inner gm-checkbox-inner\"></span></span>{{vm.label ? '<span class=\"gm-radio-checkbox-label\">' + vm.label + '</span>' : ''}}</label>"
   },692:e=>{
    e.exports="<td gm-create gm-checkbox>{{vm.template}}</td>"
   },963:e=>{
    e.exports="<label class=\"gm-radio-wrapper{{vm.disabled ? ' disabled-radio-checkbox' : ''}}\"><span class=\"gm-radio-checkbox gm-radio{{vm.checked ? ' gm-radio-checked' : ''}}\"><input type=\"radio\" class=\"gm-radio-checkbox-input gm-radio-input\"{{vm.value ? ' value=\"' + vm.value + '\"' : ''}}{{vm.checked ? ' checked=\"true\"' : ''}}/><span class=\"gm-radio-checkbox-inner gm-radio-inner\"></span></span>{{vm.label ? '<span class=\"gm-radio-checkbox-label\">' + vm.label + '</span>' : ''}}</label>"
   },271:e=>{
    e.exports='<div class="gm-config-area" {{vm.key}}><span class="config-action"><i class="gm-icon gm-icon-close"></i></span><div class="config-info">{{vm.info}}</div><ul class="config-list"></ul></div>'
   },125:e=>{
    e.exports='<th {{vm.thAttr}}><div class="th-wrap"><span class="{{vm.thTextClassName}}" {{vm.compileAttr}}>{{vm.thText}}</span>\t\t{{vm.remindHtml}}\t\t{{vm.sortHtml}}\t\t{{vm.filterHtml}}\t\t{{vm.adjustHtml}}</div></th>'
   },985:e=>{
    e.exports='<div class="{{vm.classNames}}" {{vm.wrapKey}}><div class="table-header"></div><div class="table-div" {{vm.divKey}}></div><span class="text-dreamland"></span>{{vm.configTpl}} {{vm.ajaxPageTpl}}</div>'
   },909:e=>{
    e.exports='<table class="dreamland-table {{vm.class}}"><thead><tr>{{vm.th}}</tr></thead><tbody>{{vm.tbody}}</tbody></table>'
   },986:e=>{
    e.exports='<div class="gm-dropdown"><span class="gm-dropdown-text"></span><span class="gm-dropdown-icon"></span><ul class="gm-dropdown-list">{{vm.li}}</ul></div>'
   },285:e=>{
    e.exports='<div class="gm-filter-area"><i class="fa-icon gm-icon gm-icon-filter{{vm.icon}}"></i><div class="fa-con"><ul class="filter-list" {{vm.style}}>{{vm.list}}</ul><div class="filter-bottom"><span class="filter-button filter-submit">{{vm.ok}}</span><span class="filter-button filter-reset">{{vm.reset}}</span></div></div></div>'
   },763:e=>{
    e.exports='<table class="dreamland-row {{vm.class}}"><tbody>{{vm.tbody}}</tbody></table>'
   },923:e=>{
    e.exports='<div class="gm-remind-action"><i class="ra-icon gm-icon gm-icon-help"></i><div class="ra-area"{{vm.style}}>{{vm.text}}</div></div>'
   },472:e=>{
    e.exports='<div class="gm-sorting-action{{vm.typeClass}}"><i class="sa-icon sa-up gm-icon gm-icon-up"></i><i class="sa-icon sa-down gm-icon gm-icon-down"></i></div>'
   }
  },t={};
  function o(n){
   var s=t[n];
   if(void 0!==s) return s.exports;
   var r=t[n]={exports:{}};
   return e[n](r,r.exports,o), r.exports
  }
  o.n=e=>{
   var t=e&&e.__esModule?()=>e.default:()=>e;
   return o.d(t,{a:t}), t
  }, o.d=(e,t)=>{
   for(var n in t) o.o(t,n)&& !o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})
  }, o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t), o.r=e=>{
   "undefined"!= typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}), Object.defineProperty(e,"__esModule",{value:!0})
  };
  var n={};
  return (()=>{
   "use strict";
   o.r(n), o.d(n,{default:()=>Sr,jTool:()=>Q});
   const e="jTool-create-dom",t={
     "[object String]":"string",
     "[object Boolean]":"boolean",
     "[object Undefined]":"undefined",
     "[object Number]":"number",
     "[object Object]":"object",
     "[object Error]":"error",
     "[object Function]":"function",
     "[object Date]":"date",
     "[object Array]":"array",
     "[object RegExp]":"regexp",
     "[object Null]":"null",
     "[object NodeList]":"nodeList",
     "[object Arguments]":"arguments",
     "[object Window]":"window",
     "[object HTMLDocument]":"document"
    },s=window,r=s.document,i=e=>e&&e===e.window,
    a=e=>e instanceof Element?"element":t[Object.prototype.toString.call(e)],c=()=>{
    },l=e=>e.jTool,d=(e,t)=>{
     const o=e.DOMList;
     if(!g(o)) return b(t)?o[t]:o
    },u=(e,t)=>{
     if(e&&(!l(e)||(e=d(e), !g(e)))&&(g(e.length)||[].every.call(e,((e,o)=>(!i(e)&&l(e)&&(e=e.get(0)), !1!==t.call(e,e,o)))), x(e))) for(const o in e){
      const n=e[o];
      if(!1===t.call(n,o,n)) break
     }
    },h=(e,t)=>getComputedStyle(e)[t],p=t=>{
     let o=r.querySelector(`#${e}`);
     if(!o){
      const t=r.createElement("table");
      t.id=e, t.style.display="none", r.body.appendChild(t), o=r.querySelector(`#${e}`)
     }
     o.innerHTML=g(t)?"":t;
     let n=o.childNodes;
     if(1===n.length){
      const e=n[0],o=e.nodeName,s=e.childNodes;
      (!/<tbody|<TBODY/.test(t)&&"TBODY"===o|| !/<thead|<THEAD/.test(t)&&"THEAD"===o|| !/<tr|<TR/.test(t)&&"TR"===o|| !/<td|<TD/.test(t)&&"TD"===o|| !/<th|<TH/.test(t)&&"TH"===o)&&(n=s)
     }
     return r.body.removeChild(o), n
    },g=e=>"undefined"===a(e),f=e=>"null"===a(e),m=e=>"string"===a(e),v=e=>"function"===a(e),b=e=>"number"===a(e),
    y=e=>"boolean"===a(e),x=e=>"object"===a(e),w=e=>{
     let t=!0;
     for(const o in e) e.hasOwnProperty(o)&&(t= !1);
     return t
    },k=e=>"array"===a(e),C=e=>k(e)&&e.length>0,$=e=>"element"===a(e),T=e=>"nodeList"===a(e);
   function S(...[]){
    if(0===arguments.length) return {};
    let e,t=!1,o=1,n=arguments[0];
    for(1===arguments.length&&x(arguments[0])?(n=this, o=0):2===arguments.length&&y(arguments[0])?(t=arguments[0], n=this, o=1):arguments.length>2&&y(arguments[0])&&(t=arguments[0], n=arguments[1]||{}, o=2); o<arguments.length; o++) e=arguments[o]||{}, s(e,n);
    function s(e,o){
     for(let n in e) e.hasOwnProperty(n)&&(t&&x(e[n])?(x(o[n])||(o[n]={}), s(e[n],o[n])):o[n]=e[n])
    }
    return n
   }
   const D={isWindow:i,noop:c,type:a,getStyle:h,isEmptyObject:w,each:u},j=function(e,t){
    let o=(()=>{
     if(!e) return void (e=null);
     if(i(e)||e===r||$(e)) return [e];
     if(T(e)||k(e)) return e;
     if(l(e)) return e.DOMList;
     if(/<.+>/.test(e)) return p(e.trim());
     if(!t) return r.querySelectorAll(e);
     m(t)&&(t=r.querySelectorAll(t)), $(t)&&(t=[t]), l(t)&&(t=t.DOMList);
     const o=[];
     return u(t,(t=>{
      u(t.querySelectorAll(e),(e=>{
       e&&o.push(e)
      }))
     })), o
    })();
    return o&&0!==o.length||(o= void 0), this.jTool= !0, this.DOMList=o, this.length=o?o.length:0, this.querySelector=e, this
   },A="Content-Type",M="application/x-www-form-urlencoded";
   function O(e){
    if(!x(e)) return e;
    let t="";
    return u(e,((e,o)=>{
     t&&(t+="&"), t+=e+"="+o
    })), t
   }
   function _(e){
    let {url:t,type:o,data:n,headers:s,async:r,xhrFields:i,beforeSend:a,complete:l,success:d,error:u}=S({
     url:null,type:"GET",data:null,headers:{},async:!0,xhrFields:{},beforeSend:c,complete:c,success:c,error:c
    },e);
    o=o.toUpperCase();
    const h=new XMLHttpRequest;
    let p;
    "GET"===o&&n&&(t=t+(-1===t.indexOf("?")?"?":"&")+O(n)), "POST"===o&&(s[A]||(s[A]=M), 0===s[A].indexOf(M)&&(p=O(n)), 0===s[A].indexOf("application/json")&&(p=JSON.stringify(n))), h.open(o,t,r);
    for(const e in i) h[e]=i[e];
    for(const e in s) h.setRequestHeader(e,s[e]);
    a(h), h.onload=()=>{
     l(h,h.status)
    }, h.onreadystatechange=function(){
     if(4!==h.readyState) return;
     const e=h.status;
     e>=200&&e<300||304===e?d(h.response,e):u(h,e,h.statusText)
    }, h.send(p)
   }
   const P=e=>e.jToolEvent||{},H=(e,t,o,n,s)=>{
    if(v(o)&&(s=n|| !1, n=o, o= void 0), o&&$(e[0])||(o=""), ""!==o){
     const e=n;
     n=function(t){
      let n=t.target;
      for(; n&&n!==this;){
       if(-1!==[].indexOf.call(this.querySelectorAll(o),n)){
        e.apply(n,arguments);
        break
       }
       n=n.parentNode
      }
     }
    }
    const r=t.split(" "),i=[];
    return u(r,(e=>{
     e.trim()&&i.push({eventName:e+o,type:e.split(".")[0],querySelector:o,callback:n||c,useCapture:s|| !1})
    })), i
   },E={
    on:function(e,t,o,n){
     return this.addEvent(H(d(this),e,t,o,n))
    },off:function(e,t){
     return this.removeEvent(H(d(this),e,t))
    },bind:function(e,t,o){
     return this.on(e,void 0,t,o)
    },unbind:function(e){
     return this.removeEvent(H(d(this),e))
    },trigger:function(e){
     return u(this,(t=>{
      try{
       const o=P(t)[e];
       if(o&&o.length>0){
        const o=new Event(e);
        t.dispatchEvent(o)
       }else "click"===e&&t[e]()
      }catch(t){
       console.error(`Event:[${e}] error`,t)
      }
     })), this
    },addEvent:function(e){
     return u(e,(e=>{
      u(this,(t=>{
       const o=P(t),{eventName:n,type:s,callback:r,useCapture:i}=e;
       o[n]=o[n]||[], o[n].push(e), t.jToolEvent=o, t.addEventListener(s,r,i)
      }))
     })), this
    },removeEvent:function(e){
     return u(e,(e=>{
      u(this,(t=>{
       const o=P(t),n=e.eventName,s=o[n];
       s&&(u(s,(e=>{
        t.removeEventListener(e.type,e.callback)
       })), delete o[n])
      }))
     })), this
    }
   },R=e=>["width","max-width","height","top","left","right","bottom","padding","margin"].some((t=>-1!==e.indexOf(t)));
   function L(e,t,o){
    f(o)||g(o)||(b(o)&&(o=o.toString()), -1===o.indexOf("px")&&R(t)&&(o+="px"), u(e,(e=>{
     e.style[t]=o
    })))
   }
   const N={
    css:function(e,t){
     const o=d(this);
     if(m(e)&&g(t)){
      const t=h(o[0],e);
      return R(e)?parseFloat(t):t
     }
     if(x(e)) for(const t in e) L(o,t,e[t]); else L(o,e,t);
     return this
    },width:function(e){
     return this.css("width",e)
    },height:function(e){
     return this.css("height",e)
    }
   };
   function z(e,t,o){
    const n=function(e){
     return e.indexOf(" ")?e.split(" "):[e]
    }(t);
    u(e,(e=>{
     u(n,(t=>{
      e.classList[o](t)
     }))
    }))
   }
   const q={
    addClass:function(e){
     return z(d(this),e,"add"), this
    },removeClass:function(e){
     return z(d(this),e,"remove"), this
    },hasClass:function(e){
     return [].some.call(d(this),(function(t){
      return t.classList.contains(e)
     }))
    }
   },K={
    append:function(e){
     return this.html(e,"append")
    },prepend:function(e){
     return this.html(e,"prepend")
    },before:function(e){
     l(e)&&(e=d(e,0));
     const t=d(this,0);
     return t.parentNode.insertBefore(e,t), this
    },after:function(e){
     l(e)&&(e=d(e,0));
     const t=d(this,0),o=t.parentNode;
     o.lastChild===t?o.appendChild(e):o.insertBefore(e,t.nextSibling)
    },text:function(e){
     return g(e)?d(this,0).textContent:(u(this,(t=>{
      t.textContent=e
     })), this)
    },html:function(e,t){
     const o=d(this);
     if(g(e)&&g(t)) return o[0].innerHTML;
     let n;
     return l(e)&&(e=d(e)), (m(e)||b(e))&&(e=p(e)), $(e)&&(e=[e]), u(o,(o=>{
      t||(o.innerHTML=""), "prepend"===t&&(n=o.firstChild), u(e,(e=>{
       e=e.cloneNode(!0), n?o.insertBefore(e,n):o.appendChild(e), o.normalize()
      }))
     })), this
    },wrap:function(e,t){
     const o=p(e)[0],n=d(this,0);
     n.parentNode.insertBefore(o,n), o.querySelector(t).appendChild(n)
    },closest:function(e){
     const t=d(this,0);
     return g(e)?new j(t.parentNode):new j(t.closest(e))
    },parent:function(){
     return this.closest()
    },clone:function(e){
     return new j(d(this,0).cloneNode(e|| !1))
    },remove:function(){
     u(this,(e=>{
      e.remove()
     }))
    }
   },B=(e,t,o)=>{
    const n={top:"scrollTop",left:"scrollLeft"}[o];
    if(9===e.nodeType&&(e=e.body), !b(t)) return e[n];
    e[n]=t
   },F={
    offset:function(){
     let e={top:0,left:0};
     const t=d(this,0);
     if(!t.getClientRects().length) return e;
     if("none"===h(t,"display")) return e;
     e=t.getBoundingClientRect();
     const o=t.ownerDocument.documentElement;
     return {top:e.top+pageYOffset-o.clientTop,left:e.left+pageXOffset-o.clientLeft}
    },scrollTop:function(e){
     return B(d(this,0),e,"top")
    },scrollLeft:function(e){
     return B(d(this,0),e,"left")
    }
   },I={
    get:function(e){
     return d(this,e)
    },eq:function(e){
     return new j(d(this,e))
    },find:function(e){
     return new j(e,this)
    },index:function(e){
     const t=d(this,0);
     return e?l(e)&&(e=d(e)):e=t.parentNode.children, e?[].indexOf.call(e,t):-1
    }
   },G="inline-block",W="table-cell",J={
    TABLE:"table",
    THEAD:"table-header-group",
    TBODY:"table-row-group",
    TR:"table-row",
    TH:W,
    TD:W,
    SPAN:G,
    A:G,
    FONT:G,
    BUTTON:G,
    I:G
   },U={
    animate:function(e,t=0,o=c){
     let n="",s="",i=d(this,0);
     u(e,((e,t)=>{
      n+=e+":"+h(i,e)+";", s+=e+":"+t+";"
     }));
     const a=`@keyframes jToolAnimate {from {${n}}to {${s}}}`,l=r.createElement("style");
     l.type="text/css", r.head.appendChild(l), l.textContent=l.textContent+a, i.style.animation=`jToolAnimate ${t/1e3}s ease-in-out forwards`, setTimeout((()=>{
      N.css.call(this,e), i.style.animation="", r.head.removeChild(l), o()
     }),t)
    },show:function(){
     return u(this,(e=>{
      e.style.display=J[e.nodeName]||"block"
     })), this
    },hide:function(){
     return u(this,(e=>{
      e.style.display="none"
     })), this
    }
   },V=e=>f(e)?void 0:e,X={
    attr:function(e,t){
     return g(t)?V(d(this,0).getAttribute(e)):(u(this,(o=>{
      o.setAttribute(e,t)
     })), this)
    },removeAttr:function(e){
     u(this,(t=>{
      t.removeAttribute(e)
     }))
    },prop:function(e,t){
     return g(t)?V(d(this,0)[e]):(u(this,(o=>{
      o[e]=t
     })), this)
    },val:function(e){
     return this.prop("value",e)||""
    }
   },Y=function(e,t){
    return new j(e,t)
   };
   j.prototype=Y.prototype={}, Y.extend=Y.prototype.extend=S, Y.extend(D), Y.ajax=_, u([E,N,q,K,F,I,U,X],(e=>{
    Y.prototype.extend(e)
   })), window.jTool=Y;
   const Q=Y,Z="grid-manager",ee="grid-manager-wrap",te="grid-manager-div",oe="grid-manager-config",
    ne="grid-manager-toolbar",se="grid-master",re="grid-manager-thead",ie="grid-manager-mock-thead",
    ae="grid-manager-tbody",ce="th-name",le="gm-row-index",de="gm-tr-row",ue="gm-cache-key",he="gm-level-key",
    pe="parent-key",ge="children-state",fe="gm-focus-td",me="gm_row_class_name",ve="GridManagerMemory",
    be="GridManagerVersion",ye="grid-manager-cache-error",xe="gm_fold",we="gm_order",ke="gm_moverow",Ce="gm_checkbox",
    $e="no-select-text",Te="empty-data",Se="gm-load-area",De="last-visible",je="cell-hidden",Ae="gm-create",
    Me=["class","style"],Oe="checked",_e="indeterminate",Pe="unchecked",He="gm-checkbox-checked",
    Ee="gm-checkbox-indeterminate",Re="disabled",Le="gm-remind-action",Ne="gm-sorting-action",ze="disableCustomize",
    qe="gm-row-hide",Ke="px",
    Be=e=>[`background:${e};height:18px;line-height:18px;padding:1px;border-radius:3px 0 0 3px;color:#fff`,"background:#169fe6;height:18px;line-height:18px;padding:1px;border-radius:0 3px 3px 0;color:#fff"],
    Fe="Info",Ie="Warn",Ge="Error",We={[Fe]:Be("#333"),[Ie]:Be("#f90"),[Ge]:Be("#f00")},
    Je={[Z]:{},[te]:{},[ee]:{},[re]:{},[ie]:{},[ae]:{},allTh:{},allFakeTh:{}},Ue=(e,t,o)=>{
     const n=Je[t];
     return n[e]||(n[e]=Q(o||`[${t}="${e}"]`)), n[e]
    },Ve=e=>{
     for(let t in Je) delete Je[t][e]
    },Xe="filter-selected",Ye="fa-con",Qe="click",Ze="dblclick",et="mousedown",tt="mousemove",ot="mouseup",
    nt="mouseleave",st="scroll",rt="events",it="target",at="selector",ct=(e,t,o)=>({[rt]:e,[it]:t,[at]:o}),lt=(e,t,o)=>{
     let n=S(!0,{},t);
     for(let t in e) e[t].isAutoCreate&& delete n[t];
     return delete n.gm_checkbox_disabled, delete n[ue], delete n[le], delete n[he], delete n[me], o&&o.forEach((e=>delete n[e])), n
    },dt=(e,t)=>{
     const o=mt(e),n=o.find(".gm-load-area");
     n.length>0&&n.remove();
     const s=Q(t);
     s.addClass(Se), o.append(s)
    },ut=(e,t)=>{
     setTimeout((()=>{
      Q(".gm-load-area",mt(e)).remove()
     }),t||0)
    },ht=e=>m(e)?e:e.getAttribute(Z),pt=e=>`[grid-manager="${e}"]`,gt=e=>Ue(e,Z),ft=e=>Ue(e,te),mt=e=>Ue(e,ee),
    vt=e=>Ue(e,re),bt=e=>Ue(e,ie),yt=e=>Ue(e,ae),xt=(e,t)=>(t.jTool&&(t=$t(t)), Q(`[${re}="${e}"] th[th-name="${t}"]`)),
    wt=(e,t)=>Q(`[grid-manager-mock-thead="${e}"] th[th-name="${t}"]`),kt=e=>Q(`[${re}="${e}"] th:not(cell-hidden)`),
    Ct=(e,t)=>Q(`[grid-manager-mock-thead="${e}"] th:not([cell-hidden])${t?":not([gm-create])":""}`),$t=e=>e.attr(ce),
    Tt=e=>Q(`[empty-template="${e}"]`),
    St=(e,t)=>m(t)?Q(`tbody tr td:nth-child(${e.index()+1})`,gt(t)):Q(`td:nth-child(${e.index()+1})`,t),Dt=(e,t,o)=>{
     u(k(t)?t:[t],(t=>{
      const n=xt(e,t),s=wt(e,t),r=St(n,e),i=o?"removeAttr":"attr";
      n[i](je,""), s[i](je,""), r[i](je,"");
      const a=Q(`[${oe}="${e}"] li[th-name="${t}"]`);
      o?a.addClass("checked-li"):a.removeClass("checked-li"), Q('input[type="checkbox"]',a).prop("checked",o), (e=>{
       const t=Tt(e);
       if(0===t.length) return;
       const o=kt(e).length;
       Q("td",t).attr("colspan",o)
      })(e)
     }))
    },jt=e=>{
     const t=Ct(e),o=t.length-1,n=t.eq(o);
     Q(`${pt(e)} [last-visible]`).removeAttr(De), n.attr(De,""), kt(e).eq(o).attr(De,""), St(n,e).attr(De,"")
    },At=(e,t)=>{
     const {_:o,columnMap:n,isIconFollowText:s,__isNested:r}=e;
     let i=ft(o).width(),a=0;
     const c=[],l=[];
     let d;
     u(n,((e,n)=>{
      let {__width:u,width:h,isShow:p,pk:g,children:f}=n;
      if(p&& !g) if(n.disableCustomize) i-=h; else{
       if(h&&"auto"!==h&&r&&C(f)){
        const e=n.colspan;
        n.width=h=parseInt(h/e,10)*e
       }
       if(t&&(!h||"auto"===h)|| !t&&(!u||"auto"===u)) return n.width=Mt(o,n,s,r), a+=n.width, void (r&&C(f)?l.push(n):c.push(n));
       t&&(a+=h), t||(n.width=u, a+=u), (!d||d.index>n.index)&&(d=n)
      }
     }));
     const h=c.length,p=l.length;
     let g=i-a;
     if(g>0&&p){
      let e=Math.floor(g/(p+h));
      u(l,(t=>{
       const o=t.colspan;
       e=parseInt(parseInt(e,10)/o,10)*o, t.width=t.width+e, g-=e
      }))
     }
     if(d&&g>0&& !h&&(d.width=d.width+g), g>0&&h){
      const e=Math.floor(g/h);
      u(c,((t,o)=>{
       o!==h-1?(t.width=t.width+e, g-=e):t.width=t.width+g
      }))
     }
     u(n,((e,t)=>{
      t.isShow&&t.disableCustomize||t.pk||xt(o,e).width(t.width)
     }))
    },Mt=(e,t,o,n)=>{
     const s=(e,t,o)=>{
      const n=Q(".th-wrap",t),s=Q(".th-text",t),
       r=Ot(e,s.html(),{fontSize:s.css("font-size"),fontWeight:s.css("font-weight"),fontFamily:s.css("font-family")}),
       i=n.css("padding-left"),a=n.css("padding-right");
      let c=0;
      if(o){
       const e=Q(`.${Le}`,t);
       e.length&&(c+=e.width());
       const o=Q(`.${Ne}`,t);
       o.length&&(c+=o.width());
       const n=Q(".gm-filter-area",t);
       n.length&&(c+=n.width())
      }
      return Math.ceil(r+c+(i||0)+(a||0)+2+1)
     };
     if(!n|| !C(t.children)) return s(e,wt(e,t.key),o);
     let r=0,i=0;
     const a=t=>{
      t.children.forEach((n=>{
       C(n.children)?a(n):(i++, r+=s(e,wt(e,t.key),o))
      }))
     };
     return a(t), parseInt(r/i,10)*i
    },Ot=(e,t,o)=>{
     const n=Q(`[${ee}="${e}"] .text-dreamland`);
     return n.html(t), n.css(o), n.width()
    },_t=(e,t)=>{
     const {_:o,columnMap:n}=e,s=ft(o);
     if(!s.length) return;
     const r=bt(o);
     if(r.css("left",-s.scrollLeft()+Ke), !t){
      let e;
      for(let t in n) e=n[t].width, wt(o,t).css({width:e,"max-width":e});
      r.width(vt(o).width())
     }
    },Pt=e=>{
     const t=ft(e);
     t.attr("gm-overflow-x",vt(e).width()>t.width())
    },Ht=e=>{
     const {_:t,width:o,height:n,minHeight:s,maxHeight:r,supportAjaxPage:i}=e,a=mt(t).get(0),c=vt(t).height(),l=c+1;
     a.style.width=`calc(${o})`, a.style.height=`calc(${n})`, m(s)&&(a.style.minHeight=`calc(${s})`), m(r)&&(a.style.maxHeight=`calc(${r})`), a.style.paddingTop=l+Ke, ft(t).get(0).style.height=i?`calc(100% - ${Q(`[${ne}="${t}"]`).height()+Ke})`:"100%", Q(".table-header",a).height(l), gt(t).css("margin-top",-c)
    },Et=e=>{
     for(let t in e){
      const o=e[t],n=Q(o.target);
      n.length&&n.off(o.events,o.selector)
     }
    },Rt=(e,t)=>{
     ft(e).get(0).style.setProperty("--gm-line-height",t)
    },Lt=(e,t)=>{
     console.log(`%c GridManager ${t} %c ${e} `,...We[t])
    },Nt=e=>{
     Lt(e,Fe)
    },zt=e=>{
     Lt(e,Ie)
    },qt=e=>{
     Lt(e,Ge)
    },Kt=(e,t,o)=>{
     const n=Object.keys(e),s=Object.keys(t);
     return m(o)?e[o]===t[o]:n.length===s.length&&n.every((o=>JSON.stringify(e[o])===JSON.stringify(t[o])))
    },Bt=e=>JSON.parse(JSON.stringify(e)),Ft={},It={supportDrag:!0,dragBefore:c,dragAfter:c},
    Gt={supportMoveRow:!1,moveRowConfig:{handler:c}},Wt={supportAdjust:!0,adjustBefore:c,adjustAfter:c},
    Jt={supportMenu:!0,menuHandler:e=>e},Ut={supportConfig:!0,configInfo:"配置列的显示状态"},Vt={
     width:"100%",
     height:"300px",
     lineHeight:"41px",
     animateTime:300,
     disableLine:!1,
     disableBorder:!1,
     loadingTemplate:'<section class="gm-loading"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg></div></section>',
     skinClassName:"",
     useWordBreak:!1,
     isIconFollowText:!1
    },Xt={rowHover:null,rowClick:null,rowDblClick:null,cellHover:null,cellClick:null,cellDblClick:null},
    Yt={disableCache:!0},Qt={
     isCombSorting:!1,
     mergeSort:!1,
     sortKey:"sort_",
     sortData:{},
     sortUpText:"ASC",
     sortDownText:"DESC",
     sortMode:"overall",
     sortingBefore:c,
     sortingAfter:c
    },Zt={
     supportAjaxPage:!1,
     useNoTotalsMode:!1,
     sizeData:[10,20,30,50,100],
     pageSize:20,
     pageData:{},
     totalsKey:"totals",
     currentPageKey:"cPage",
     pageSizeKey:"pSize",
     pagingBefore:c,
     pagingAfter:c
    },eo={supportAutoOrder:!0,autoOrderConfig:{width:50}},to={
     supportCheckbox:!0,checkboxConfig:{width:40},checkedBefore:c,checkedAfter:c,checkedAllBefore:c,checkedAllAfter:c
    },oo={i18n:"zh-cn"},no={supportTreeData:!1,treeConfig:{treeKey:"children",openState:!1}},so={
     firstLoading:!0,
     virtualScroll:{useVirtualScroll:!1,virtualNum:20},
     ajaxType:"GET",
     query:{},
     ajaxHeaders:{},
     ajaxXhrFields:{},
     ajaxBeforeSend:c,
     ajaxSuccess:c,
     ajaxComplete:c,
     ajaxError:c,
     requestHandler:e=>e,
     responseHandler:e=>e,
     rowRenderHandler:(e,t)=>e,
     dataKey:"data",
     emptyTemplate:()=>'<div class="gm-empty-template">暂无数据</div>'
    },ro={supportExport:!0,exportConfig:{mode:"static",suffix:"xls",handler:c}},io={supportPrint:!0},
    ao={supportAutoPlay:!1,autoPlayConfig:{interval:5,step:40}};
   function co(){
    S(!0,this,Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({rendered:!1},Ft),It),Gt),Wt),Jt),Ut),Vt),Yt),Qt),Zt),eo),to),oo),so),ro),io),no),Xt),ao))
   }
   function lo(){
    const e=this;
    e["order-text"]={"zh-cn":"序号","zh-tw":"序號","en-us":"order"}, e["first-page"]={
     "zh-cn":"首页","zh-tw":"首頁","en-us":"first"
    }, e["previous-page"]={"zh-cn":"上一页","zh-tw":"上一頁","en-us":"previous"}, e["next-page"]={
     "zh-cn":"下一页","zh-tw":"下一頁","en-us":"next"
    }, e["last-page"]={
     "zh-cn":"尾页","zh-tw":"尾頁","en-us":"last"
    }, e["page-info"]={
     "zh-cn":'此页显示 {0}-{1}<span class="page-info-totals"> 共{2}条</span>',
     "zh-tw":'此頁顯示 {0}-{1}<span class="page-info-totals"> 共{2}條</span>',
     "en-us":'this page show {0}-{1}<span class="page-info-totals"> count {2}</span>'
    }, e["checked-info"]={
     "zh-cn":"已选 {0} 条","zh-tw":"已選 {0} 條","en-us":"selected {0}"
    }, e["goto-first-text"]={"zh-cn":"跳转至","zh-tw":"跳轉至","en-us":"goto"}, e["goto-last-text"]={
     "zh-cn":"页","zh-tw":"頁","en-us":"page"
    }, e.refresh={"zh-cn":"重新加载","zh-tw":"重新加載","en-us":"Refresh"}, e.export={
     "zh-cn":"导出","zh-tw":"導出","en-us":"Export"
    }, e["export-checked"]={
     "zh-cn":"导出选中项","zh-tw":"導出選中項","en-us":"Export selected"
    }, e.config={"zh-cn":"配置表","zh-tw":"配置表","en-us":"Setting Grid"}, e.print={
     "zh-cn":"打印","zh-tw":"打印","en-us":"Print"
    }, e.copy={"zh-cn":"复制","zh-tw":"復制","en-us":"Copy"}, e["hide-row"]={
     "zh-cn":"隐藏行","zh-tw":"隱藏行","en-us":"Hidden Row"
    }, e.ok={"zh-cn":"确定","zh-tw":"確定","en-us":"OK"}, e.reset={"zh-cn":"重置","zh-tw":"重置","en-us":"Reset"}
   }
   const uo={version:"3.2.1",responseData:{},checkedData:{},settings:{}},
    ho=["width","__width","isShow","__isShow","index","__index"],po=["__width","__isShow","__index"],
    go=e=>localStorage.getItem(e),fo=(e,t)=>{
     localStorage.setItem(e,t)
    },mo={},vo={},bo=(e,t,o)=>{
     const n=Oo(e),s=e=>{
      let t=e[de];
      return o?t:lt(n.columnMap,t)
     };
     if($(t)) return s(t);
     if(T(t)){
      let e=[];
      return u(t,(t=>{
       e.push(s(t))
      })), e
     }
     return {}
    },yo=(e,t)=>{
     const o=uo.responseData[e]||[];
     return t?o:Bt(o)
    },xo=(e,t)=>{
     uo.responseData[e]=t
    },wo=e=>(uo.checkedData[e]||[]).map((e=>S(!0,{},e))),ko=(e,t,o)=>{
     const {columnMap:n,checkboxConfig:s}=Oo(e);
     if(o) return void (uo.checkedData[e]=t.map((e=>lt(n,e))));
     uo.checkedData[e]||(uo.checkedData[e]=[]);
     const r=uo.checkedData[e],i=s.key,a=r.length>0,c=[];
     t.forEach((e=>{
      const t=lt(n,e),o=e.gm_checkbox;
      let s=-1;
      a&&(s=((e,t,o)=>{
       let n=-1,s=!1;
       return e.some(((e,r)=>(s=Kt(e,t,o), s&&(n=r), s))), n
      })(r,t,i)), o&& -1===s?c.push(t):o|| -1===s||r.splice(s,1)
     })), uo.checkedData[e]=r.concat(c)
    },Co=e=>location.pathname+location.hash+"-"+e,$o=e=>{
     let t=go(ve);
     return t&&"{}"!==t?(t=JSON.parse(t), JSON.parse(t[Co(e)]||"{}")):(gt(e).attr(ye,"error"), {})
    },To=e=>{
     const {disableCache:t,_:o,columnMap:n,supportAjaxPage:s,pageData:r,pageSizeKey:i}=e;
     if(t) return;
     const a={};
     u(n,((e,t)=>{
      const o={};
      ho.forEach((e=>{
       o[e]=t[e]
      })), a[e]=o
     }));
     const c={column:a};
     s&&(c[i]=r[i]);
     const l=JSON.stringify(c),d=JSON.parse(go(ve)||"{}");
     d[Co(o)]=l, fo(ve,JSON.stringify(d))
    },So=e=>{
     if(!e) return t=ve, localStorage.removeItem(t), Nt("delete user memory of all"), !0;
     var t;
     let o=go(ve);
     return !!o&&(o=JSON.parse(o), delete o[Co(e)], fo(ve,JSON.stringify(o)), Nt(`delete user memory of ${e}`), !0)
    },Do=e=>{
     const {columnData:t,emptyTemplate:o}=e;
     o&& !v(o)&&(e.emptyTemplate=()=>o);
     const n=e=>{
      e.forEach((e=>{
       const t=e.text;
       if(t&& !v(t)&&(e.text=()=>t), C(e.children)) return n(e.children), void delete e.template;
       const o=e.template;
       o&& !v(o)&&(e.template=()=>o)
      }))
     };
     return n(t), e
    },jo=e=>m(e[0])?e.map((e=>({key:e,text:e}))):e,Ao=(e,t,o,n,s)=>{
     const {
      __isNested:r,
      columnData:i,
      supportMoveRow:a,
      moveRowConfig:c,
      supportAutoOrder:l,
      autoOrderConfig:d,
      __isFullColumn:u,
      fullColumn:h,
      supportCheckbox:p,
      checkboxConfig:f
     }=e,v={};
     i.some((e=>"left"===e.fixed))&&(c.fixed="left", f.fixed="left", d.fixed="left");
     let y=[];
     a&&c.useSingleMode&&y.push(t(c)), p&&y.push(o(f)), l&&y.push(n(e)), u&&h.useFold&&y.push(s(e)), y=y.concat(i);
     const w=(t,o,n)=>{
      t.forEach(((t,s)=>{
       const i=(t=S(!0,{},t)).key;
       i?(t.width&& !b(t.width)&&(t.width=parseInt(t.width,10)), t.remind&&(e._remind= !0), m(t.sorting)&&(e._sort= !0), x(t.filter)&&(e._filter= !0), !r&&m(t.fixed)?(e._fixed= !0, t.disableCustomize= !0):delete t.fixed, !t.disableCustomize||t.width?(v[i]=t, v[i].isShow=t.isShow||g(t.isShow), v[i].index=s, v[i].__index=s, v[i].__width=t.width, v[i].__isShow=t.isShow, r&&(C(t.children)&&w(t.children,o+1,t.key), v[i].pk=n, v[i].level=o)):qt(`column ${i}: width must be set`)):qt(`columnData[${s}].key undefined`)
      }))
     };
     w(y,0,void 0), e.columnMap=v
    },Mo=(e,t,o,n,s)=>{
     e.columnData=jo(e.columnData), e=Do(e);
     let r=new co;
     r.textConfig=new lo, S(!0,r,e), r._=r.gridManagerName, r.browser=(()=>{
      try{
       return navigator.userAgent.toLowerCase().match(/(msie|firefox|chrome|opera|version).*?([\d.]+)/)[1].replace(/version/,"safari")
      }catch(e){
       return "-"
      }
     })();
     const {_:i}=r;
     Ao(r,t,o,n,s);
     return (()=>{
      if(r.disableCache) return;
      const e=r.columnMap,t=$o(i).column||{},o=Object.keys(t),n=Object.keys(e);
      if(0===o.length) return;
      let s=!0;
      o.length!==n.length&&(s= !1), s&&u(e,((e,o)=>{
       if(!t[e]||po.some((n=>{
        const s=t[e][n],r=o[n];
        return x(s)?JSON.stringify(s)!==JSON.stringify(r):s!==r
       }))) return s= !1, !1
      })), s?S(!0,e,t):So(i)
     })(), _o(r), r
    },Oo=e=>S(!0,{},uo.settings[e]||{}),_o=e=>{
     uo.settings[e._]=S(!0,{},e)
    },Po=(e,t)=>{
     const o=Oo(e),n=o.columnMap;
     return u(n,((o,n)=>{
      if(n.disableCustomize) return;
      let s=((e,o)=>t?wt(e,o):xt(e,o))(e,n.key);
      n.width=s.width(), n.index=s.index(), n.isShow= !m(s.attr(je))
     })), _o(o), To(o), o
    },Ho=e=>(t,o,n)=>{
     const s=n.value;
     n.value=o=>{
      const n=s.call(t,o);
      return (o&&o.tpl||e).replace(/\{\{([^(\}\})]+)\}\}/g,((e,t)=>new Function("vm","return "+t)(n)||""))
     }
    },Eo="data-compile-node",Ro={},Lo=e=>(Ro[e]||(Ro[e]=[]), Ro[e]),No=e=>{
     Ro[e]=[]
    },zo=(e,t,o,n,s)=>{
     const {_:r,compileAngularjs:i,compileVue:a,compileReact:c}=e,l=Lo(r);
     let d="",u="";
     return t?(c&&(u=Eo, l.push({
      template:t,row:o,index:n,key:s,type:g(n)?void 0:"template",fnArg:[o[s],o,n,s]
     })), (a||i)&&(u=Eo, l.push({row:o,index:n,key:s})), c||(d=t(o[s],o,n,s))):(d=o[s], (f(d)||g(d))&&(d="")), {
      text:d,compileAttr:u
     }
    };
   async function qo(e){
    const {_:t,compileAngularjs:o,compileVue:n,compileReact:s}=e,i=Lo(t);
    if(0===i.length) return Promise.resolve();
    let a=r.querySelectorAll(`${pt(t)} [${Eo}]`);
    i.forEach(((e,t)=>{
     e.el||(e.el=a[t])
    })), n&&(await n(i), a=r.querySelectorAll(`${pt(t)} [${Eo}]`)), o&& await o(i), s&& await s(i), [].forEach.call(a,(e=>{
     e.removeAttribute(Eo)
    })), No(t)
   }
   const Ko={},Bo=(e,t)=>e.textConfig[t][e.i18n];
   function Fo(e,t,o,n,s){
    let r=[];
    const i=arguments.length;
    if(3===i&&k(arguments[2])) r=arguments[2]; else if(i>2) for(let e=2; e<i; e++) r.push(arguments[e]);
    try{
     let o=Bo(e,t);
     return r&&r.length?o.replace(/{\d+}/g,(e=>{
      const t=r[e.match(/\d+/)];
      return g(t)?"":t
     })):o
    }catch(e){
     return zt(`not find language matched to ${t}`), ""
    }
   }
   const Io=(e,t)=>{
    const o=r.createElement("a");
    o.addEventListener("click",(()=>{
     o.download=e, o.href=t
    }));
    const n=r.createEvent("MouseEvents");
    n.initEvent("click",!1,!1), o.dispatchEvent(n)
   };
   const Go=new class{
    async exportGrid(e,t,o){
     const n=Oo(e),{query:s,disableAutoLoading:r,loadingTemplate:i,exportConfig:a,pageData:c,sortData:l}=n;
     t=((e,t,o,n)=>{
      if(!t){
       const e=n.fileName;
       t=v(e)?e(o):e
      }
      return t||(t=e), `${t}.${n.suffix}`
     })(e,t,s,a);
     const d=o?wo(e):[],u=yo(e),h=a.handler;
     switch(a.mode){
      case"static":
       this.downStatic(e,r,i,t,o,a.suffix,h,s,c,l,d,u);
       break;
      case"blob":
       await this.downBlob(e,r,i,t,h,s,c,l,d,u);
       break;
      case"url":
       await this.downFilePath(e,r,i,t,h,c,l,d)
     }
    }

    downStatic(e,t,o,n,s,r,i,a,c,l,d,h){
     !t&&dt(e,o);
     let p=i(n,a,c,l,d,h);
     if(!k(p)){
      const t=Ct(e,!0),o=yt(e);
      let n;
      n=Q(s?'tr[checked="true"]':"tr",o), p=[];
      const r=[];
      u(t,(e=>{
       r.push(`"${e.querySelector(".th-text").textContent||""}"`)
      })), p.push(r), u(n,(e=>{
       let t=[];
       const o=Q("td:not([gm-create]):not([cell-hidden])",e);
       u(o,(e=>{
        t.push(`"${e.textContent||""}"`)
       })), p.push(t)
      }))
     }
     let g="";
     u(p,((e,t)=>{
      0!==t&&(g+="\r\n"), g+=e.join(",")
     }));
     Io(n,`data:${{
      csv:"text/csv",xls:"application/vnd.ms-excel"
     }[r]};charset=utf-8,\ufeff${encodeURIComponent(g)}`), !t&&ut(e,300)
    }

    async downFilePath(e,t,o,n,s,r,i,a){
     try{
      !t&&dt(e,o);
      const c=await s(n,r,i,a);
      Io(n,c)
     }catch(e){
      qt(e)
     }finally{
      !t&&ut(e,300)
     }
    }

    async downBlob(e,t,o,n,s,r,i,a,c,l){
     try{
      !t&&dt(e,o);
      const d=await s(n,r,i,a,c,l),u=Blob.prototype;
      let h;
      if(Object.getPrototypeOf(d)===u&&(h=d), d.data&&Object.getPrototypeOf(d.data)===u&&(h=d.data), !h||Object.getPrototypeOf(h)!==u) return void qt("response type not equal to Blob");
      Io(n,URL.createObjectURL(h))
     }catch(e){
      qt(e)
     }finally{
      !t&&ut(e,300)
     }
    }
   },Wo="rowspan",Jo="merge-td",Uo="last-rowspan",Vo=(e,t)=>{
    u(t,((t,o)=>{
     let n=o.merge;
     if(!n||"text"!==n&&"html"!==n) return !0;
     const s=St(xt(e,t),yt(e).find("tr:not([gm-summary-row]):not([gm-row-hide])"));
     let r=s.length,i=r,a=1;
     for(; i;){
      const e=s.eq(i-1);
      if(e.removeAttr(Wo), e.removeAttr(Jo), e.removeAttr(Uo), i--, 0===i) return void (a>1&&(e.attr(Wo,a), a=1));
      s.eq(i-1)[n]()===e[n]()?(e.attr(Jo,""), a++):a>1&&(e.attr(Wo,a), i+a===r&&e.attr(Uo,""), a=1)
     }
    }))
   },Xo=e=>Q(`[gm-cache-key="${e}"], [${pe}="${e}"], [${pe}^="${e}-"]`),Yo=(e,t)=>{
    const o=Xo(t);
    o.attr(qe,"ing"), setTimeout((()=>{
     o.attr(qe,"true"), Vo(e._,e.columnMap)
    }),500)
   };
   function Qo(e){
    const t=gt(e).clone(!0),o=open();
    t.find("[cell-hidden]").remove(), t.find("[merge-td]").remove(), t.find("[gm-create]").remove();
    const n=t.find("[grid-manager-mock-thead] th"),s=t.find(`[${re}] th`);
    s.removeAttr("style"), u(s,((e,t)=>{
     e.innerHTML=n.eq(t).find(".th-text").html()
    })), t.removeAttr("style"), t.find("[grid-manager-mock-thead]").remove(), o.document.write("<style>\ntable{width: 100%;border-collapse: collapse;border-spacing: 0;}\nth,td{height: 18px;padding:11px;border: 1px solid #999;font-size: 12px;color: #666;}\nth{color: #333}\na{color: #666; text-decoration:none;}\ntr[empty-template] td{text-align: center}\n</style>"+t.get(0).outerHTML), o.document.close(), o.print(), o.close()
   }
   const Zo=e=>`[grid-master="${e}"]`,en=e=>{
    const {closeMenu:t}=Ko[e];
    Q(t.target).off(t.events), Q(Zo(e)).remove()
   },tn=(e,t)=>{
    const o=Oo(e),{
     supportAjaxPage:n,supportExport:s,supportConfig:i,supportPrint:a,menuHandler:c,useCellFocus:l,useHideRow:d
    }=o;
    let u=[];
    n&&u.push((e=>({
     content:`${Fo(e,"previous-page")}<i class="gm-icon gm-icon-up"></i>`,onClick:e=>{
      const t=Oo(e),{currentPageKey:o,pageData:n}=t,s=n[o];
      $s(t,s>1?s-1:s)
     },run:(e,t)=>{
      const o=Oo(e),{pageData:n,currentPageKey:s}=o,r=n[s],i=n.tPage;
      1===r||0===i?t.addClass(Re):t.removeClass(Re)
     }
    }))(o),(e=>({
     content:`${Fo(e,"next-page")}<i class="gm-icon gm-icon-down"></i>`,line:!0,onClick:e=>{
      const t=Oo(e),{currentPageKey:o,pageData:n}=t,s=n[o];
      $s(t,s<n.tPage?s+1:s)
     },run:(e,t)=>{
      const o=Oo(e),{pageData:n,currentPageKey:s}=o,r=n[s],i=n.tPage;
      r===i||0===i?t.addClass(Re):t.removeClass(Re)
     }
    }))(o)), s&&u.push((e=>({
     content:`${Fo(e,"export")}<i class="gm-icon gm-icon-export"></i>`,onClick:e=>{
      Go.exportGrid(e,void 0,!1)
     }
    }))(o),(e=>({
     content:`${Fo(e,"export-checked")}<i class="gm-icon gm-icon-export-checked"></i>`,onClick:e=>{
      Go.exportGrid(e,void 0,!0)
     },run:(e,t)=>{
      0===Q('tr[checked="true"]',yt(e)).length?t.addClass(Re):t.removeClass(Re)
     }
    }))(o)), u.push((e=>({
     content:`${Fo(e,"refresh")}<i class="gm-icon gm-icon-refresh"></i>`,onClick:e=>{
      const t=Oo(e),{currentPageKey:o,pageData:n}=t;
      $s(t,n[o])
     }
    }))(o)), l&&u.push((e=>({
     content:`${Fo(e,"copy")}<i class="gm-icon gm-icon-copy"></i><input gm-fake-copy="${e._}"/>`,onClick:e=>{
      const t=r.querySelector(`[gm-fake-copy=${e}]`);
      t.value=yt(e).find("td[gm-focus-td]").text(), t.select(), r.execCommand("Copy")
     },run:(e,t,o)=>{
      "td"!==o.nodeName&&0===Q(o).closest("td").length?t.addClass(Re):t.removeClass(Re)
     }
    }))(o)), a&&u.push((e=>({
     content:`${Fo(e,"print")}<i class="gm-icon gm-icon-print"></i>`,onClick:e=>{
      Qo(e)
     }
    }))(o)), d&&u.push((e=>({
     content:`${Fo(e,"hide-row")}<i class="gm-icon gm-icon-hide"></i>`,onClick:(e,t)=>{
      const o=Q(t).closest("tr");
      Yo(Oo(e),o.attr(ue)||o.attr(pe))
     },run:(e,t,o)=>{
      "tr"!==o.nodeName&&0===Q(o).closest("tr[gm-cache-key]").length?t.addClass(Re):t.removeClass(Re)
     }
    }))(o)), i&&u.push((e=>({
     content:`${Fo(e,"config")}<i class="gm-icon gm-icon-config"></i>`,onClick:e=>{
      Qs.toggle(e)
     }
    }))(o)), u=c(u);
    let h="";
    const p=u.length;
    u.forEach(((e,t)=>{
     h+=`<span menu-action>${e.content}</span>`, e.line&&t!==p-1&&(h+='<span class="menu-line"></span>')
    })), Q("[grid-master]").remove(), Q("body").append(`<div class="gm-menu" grid-master="${e}">${h}</div>`);
    const g=Q(Zo(e)),f=g.find("[menu-action]");
    return u.forEach(((o,n)=>{
     const {run:s,onClick:r}=o,i=f.eq(n);
     s&&s(e,i,t), i.bind("click",(function(o){
      if(((e,t)=>{
       if(Q(e).hasClass(Re)) return t.stopPropagation(), t.preventDefault(), !0
      })(this,o)) return !1;
      r(e,t), en(e)
     }))
    })), g
   };
   var on=o(923),nn=o.n(on);
   const sn={};
   var rn=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };
   const an=e=>{
    const t=ft(e).find(".gm-tooltip");
    t.length&&t.remove()
   },cn=(e,t,o,n)=>{
    if(!x(o)) return;
    const {text:s,position:r}=o;
    let i="right"===r?" right-model":"";
    const a=ft(e),c=Q(t),l=gt(e),d=t.offsetTop-a.scrollTop()-30+l.css("marginTop")+vt(e).height();
    let u="";
    "TD"===t.nodeName&&(i="", u=`left:${c.offset().left-l.offset().left-a.scrollLeft()+Ke};`), an(e);
    const h=`<span class="ra-area gm-tooltip${i}" style="height:30px;top:${d+Ke};${u}">${s}</span>`;
    a.append(h), c.bind(nt,(()=>{
     c.unbind(nt), an(e), v(n)&&n()
    }))
   };

   class ln{
    init(e){
     sn[e]=((e,t)=>({
      start:ct("mouseover",t,`[grid-manager-mock-thead="${e}"] .${Le}`),
      tooltipLeave:ct(nt,t,`[grid-manager-mock-thead="${e}"] .${Le}`)
     }))(e,`${pt(e)} [grid-manager-mock-thead]`);
     const {start:t}=sn[e],o=ft(e);
     Q(t.target).on(t.events,t.selector,(function(){
      const e=Q(this),t=e.find(".ra-area");
      o.get(0).offsetWidth-(e.offset().left-o.offset().left)>t.get(0).offsetWidth+20?t.removeClass("right-model"):t.addClass("right-model")
     }))
    }

    createHtml(e){
     const {remind:t}=e;
     let o="",n="";
     n=x(t)?t.text:t;
     const s=t.style;
     return x(s)&&(o=' style="', Object.keys(s).forEach((e=>{
      o=`${o}${e}:${s[e]};`
     })), o+='"'), {text:n,style:o}
    }

    destroy(e){
     Et(sn[e]), an(e)
    }
   }

   rn([Ho(nn())],ln.prototype,"createHtml",null);
   const dn=new ln,un="gm-drag-ongoing";
   var hn=o(985),pn=o.n(hn),gn=o(125),fn=o.n(gn),mn=o(472),vn=o.n(mn);
   const bn={};
   var yn=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };
   const xn=(e,t,o,n)=>{
    if(!x(t)||w(t)) return void zt("sortJson unavailable");
    const s=Oo(e);
    s.isCombSorting||(s.sortData={}), S(s.sortData,t), _o(s), v(o)||(o=()=>{
    }), g(n)&&(n= !0);
    const r=S({},s.query,s.sortData,s.pageData);
    s.sortingBefore(r), n?us.refresh(e,(t=>{
     (e=>{
      const {sortData:t,sortUpText:o,sortDownText:n}=Oo(e),s="sorting-up",r="sorting-down",i="sorting";
      u(Q(`${pt(e)} .${Ne}`),(e=>{
       Q(e).removeClass("sorting-up sorting-down"), Q(e).closest("th").attr(i,"")
      })), u(t,((t,a)=>{
       const c=Q(`${pt(e)} th[th-name="${t}"]`),l=Q(`.${Ne}`,c);
       a===o&&(l.addClass(s), l.removeClass(r), c.attr(i,o)), a===n&&(l.addClass(r), l.removeClass(s), c.attr(i,n))
      }))
     })(e), o(t), s.sortingAfter(r)
    })):(o(), s.sortingAfter(r))
   };

   class wn{
    init(e){
     bn[e]=((e,t)=>({start:ct(Qe,t,`[grid-manager-mock-thead="${e}"] .${Ne}`)}))(e,pt(e));
     const {start:t}=bn[e];
     Q(t.target).on(t.events,t.selector,(function(t){
      const o=$t(Q(this).closest("th")),{sortData:n,sortMode:s,sortUpText:r,sortDownText:i}=Oo(e),a=n[o];
      let c="";
      if("single"===s){
       const e=Q(t.target);
       e.hasClass("sa-up")&&(c=a===r?"":r), e.hasClass("sa-down")&&(c=a===i?"":i)
      }
      "overall"===s&&(c=a===i?r:i);
      xn(e,{[o]:c})
     }))
    }

    createHtml(e){
     const {type:t,sortUpText:o,sortDownText:n}=e;
     let s="";
     switch(t){
      case o:
       s=" sorting-up";
       break;
      case n:
       s=" sorting-down"
     }
     return {typeClass:s}
    }

    destroy(e){
     Et(bn[e])
    }
   }

   yn([Ho(vn())],wn.prototype,"createHtml",null);
   const kn=new wn;
   var Cn=o(285),$n=o.n(Cn);
   const Tn={};
   var Sn=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };

   class Dn{
    init(e){
     const t=this,o=Q("body"),n=pt(e);
     Tn[e]=((e,t)=>{
      const o=`[grid-manager-mock-thead="${e}"] .gm-filter-area`;
      return {
       toggle:ct(et,t,`${o} .fa-icon`),
       close:ct("mousedown.closeFitler","body"),
       submit:ct(ot,t,`${o} .filter-submit`),
       reset:ct(ot,t,`${o} .filter-reset`),
       checkboxAction:ct(Qe,t,`${o} .gm-checkbox-input`),
       radioAction:ct(Qe,t,`${o} .gm-radio-input`)
      }
     })(e,n);
     const {toggle:s,close:r,submit:i,reset:a,checkboxAction:c,radioAction:l}=Tn[e];
     Q(s.target).on(s.events,s.selector,(function(s){
      s.stopPropagation(), s.preventDefault();
      const i=Q(`${n} .fa-con`),a=Q(this),c=a.closest(".gm-filter-area"),l=a.closest("th[th-name]"),d=$t(l),
       h=c.find(".fa-con");
      h.find(".filter-list").css("max-height",mt(e).height()-70+Ke), u(i,(e=>{
       h.get(0)!==e&&(e.style.display="none")
      }));
      const p=Oo(e);
      t.update(l,p.columnMap[d].filter);
      "none"!==h.css("display")?h.hide():h.show();
      const g="direction-left",f="direction-right";
      c.offset().left+h.width()>ft(e).width()?(h.addClass(f), h.removeClass(g)):(h.addClass(g), h.removeClass(f)), Q(r.target).on(r.events,(function(e){
       const t=Q(e.target);
       if(t.hasClass(Ye)||1===t.closest(".fa-con").length) return !1;
       o.find(".fa-con").hide(), Q(r.target).off(r.events)
      }))
     })), Q(i.target).on(i.events,i.selector,(function(){
      const o=Q(this).closest(".fa-con"),n=Q(".gm-radio-checkbox-input",o),s=o.closest("th"),i=$t(s),a=[];
      u(n,(e=>{
       e.checked&&a.push(e.value)
      }));
      const c=Oo(e),l=a.join(",");
      c.columnMap[i].filter.selected=l, c.pageData[c.currentPageKey]=1, S(c.query,{[i]:l}), _o(c), t.update(s,c.columnMap[i].filter), us.refresh(e), o.hide(), Q(r.target).off(r.events)
     })), Q(a.target).on(a.events,a.selector,(function(){
      const o=Q(this).closest(".fa-con"),n=Q(this).closest("th[th-name]"),s=$t(n),i=Oo(e);
      delete i.query[s], i.columnMap[s].filter.selected="", i.pageData[i.currentPageKey]=1, _o(i), t.update(n,i.columnMap[s].filter), us.refresh(e), o.hide(), Q(r.target).off(r.events)
     })), Q(c.target).on(c.events,c.selector,(function(){
      const e=Q(this).closest(".filter-checkbox").find(".gm-checkbox");
      Ns(e,this.checked?Oe:Pe)
     })), Q(l.target).on(l.events,l.selector,(function(){
      const e=Q(this).closest(".filter-list").find(".filter-radio");
      u(e,(e=>{
       Ls(Q(e).find(".gm-radio"),this===e.querySelector(".gm-radio-input"))
      }))
     }))
    }

    createHtml(e){
     const {settings:t,columnFilter:o}=e;
     let n="";
     return o.selected=o.selected||"", o.option.forEach((e=>{
      let t=o.selected.split(",");
      t=t.map((e=>e.trim()));
      const s={checked:-1!==t.indexOf(e.value),label:e.text,value:e.value};
      o.isMultiple?n+=`<li class="filter-checkbox">${Ks.getCheckboxTpl(s)}</li>`:n+=`<li class="filter-radio">${Ks.getRadioTpl(s)}</li>`
     })), {icon:o.selected?" filter-selected":"",ok:Fo(t,"ok"),reset:Fo(t,"reset"),list:n}
    }

    update(e,t){
     const o=Q(".fa-icon",e),n=Q(".fa-con .gm-radio-checkbox-input",e);
     u(n,(e=>{
      let o=Q(e).closest(".gm-radio-checkbox");
      t.isMultiple?Ns(o,t.selected.split(",").includes(e.value)?Oe:Pe):Ls(o,e.value===t.selected)
     })), t.selected?o.addClass(Xe):o.removeClass(Xe)
    }

    destroy(e){
     Et(Tn[e])
    }
   }

   Sn([Ho($n())],Dn.prototype,"createHtml",null);
   const jn=new Dn;
   var An=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };

   class Mn{
    getWrapTpl(e){
     const t=e.settings,{
      _:o,
      skinClassName:n,
      isIconFollowText:s,
      disableBorder:r,
      disableLine:i,
      supportConfig:a,
      supportAjaxPage:c,
      configInfo:l,
      ajaxPageTemplate:d
     }=t,u=["table-wrap"];
     return n&&m(n)&&n.trim()&&u.push(n), s&&u.push("gm-icon-follow-text"), r&&u.push("disable-border"), i&&u.push("disable-line"), {
      wrapKey:`${ee}="${o}"`,
      divKey:`${te}="${o}"`,
      classNames:u.join(" "),
      configTpl:a?Qs.createHtml({_:o,configInfo:l}):"",
      ajaxPageTpl:c?Ss.createHtml({settings:t,tpl:d}):""
     }
    }

    getThTpl(e){
     const {settings:t,col:o}=e,{query:n,supportDrag:s,sortData:r,sortUpText:i,sortDownText:a,supportAdjust:c}=t;
     let l="",d="";
     o.remind&&(l="remind", d=dn.createHtml({remind:o.remind}));
     let u="",h="";
     m(o.sorting)&&(o.sorting===a?(u=`sorting="${a}"`, r[o.key]=a):o.sorting===i?(u=`sorting="${i}"`, r[o.key]=i):u="sorting", h=kn.createHtml({
      type:o.sorting,sortUpText:i,sortDownText:a
     }));
     let p="",f="";
     x(o.filter)&&(p="filter", g(o.filter.selected)?o.filter.selected=n[o.key]:n[o.key]=o.filter.selected, f=jn.createHtml({
      settings:t,columnFilter:o.filter
     }));
     let v="";
     c&& !o.disableCustomize&&(v=hr.html);
     let b="";
     "left"!==o.fixed&&"right"!==o.fixed||(b=`fixed="${o.fixed}"`);
     const y=o.align?`align="${o.align}"`:"",w=o.isShow?"":je;
     let k="",C=o.key,$=o.text,T="";
     switch(o.key){
      case we:
       k="gm-create gm-order";
       break;
      case Ce:
       k="gm-create gm-checkbox";
       break;
      case xe:
      case ke:
       k=Ae;
       break;
      default:
       const e=((e,t,o)=>{
        const {_:n,compileAngularjs:s,compileVue:r,compileReact:i}=e,a=Lo(n);
        let c="",l="";
        return o&&((s||r||i)&&(l=Eo, a.push({key:t,template:o,type:"text"})), i||(c=o())), {text:c,compileAttr:l}
       })(t,C,o.text);
       $=e.text, T=e.compileAttr
     }
     let S="th-text";
     !s||o.isAutoCreate||o.disableCustomize||(S=`${S} gm-drag-action`);
     const D=g(o.colspan)?"":`colspan="${o.colspan}"`,j=g(o.rowspan)?"":`rowspan="${o.rowspan}"`;
     let A="auto";
     return o.width&&(A=o.width+Ke), {
      thAttr:`th-name="${C}" ${D} ${j} style="width:${A}" ${w} ${y} ${u} ${p} ${b} ${l} ${k}`,
      thTextClassName:S,
      thText:$,
      compileAttr:T,
      remindHtml:d,
      sortHtml:h,
      filterHtml:f,
      adjustHtml:v
     }
    }
   }

   An([Ho(pn())],Mn.prototype,"getWrapTpl",null), An([Ho(fn())],Mn.prototype,"getThTpl",null);
   const On=new Mn;
   var _n=o(763),Pn=o.n(_n);
   const Hn={},En="gm-move-row-ongoing",Rn="disable-move";
   var Ln=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };

   class Nn{
    init(e){
     const t=this,{supportCheckbox:o,checkboxConfig:n,moveRowConfig:s,animateTime:r,columnMap:i}=Oo(e),{
      key:a,useSingleMode:c,handler:l
     }=s,d=Q("body"),u=gt(e).get(0);
     Hn[e]=(e=>{
      const t="gmLineDrag";
      return {
       start:ct(`mousedown.${t}`,e,"tr:not([empty-template])"),
       doing:ct(`mousemove.${t}`,"body"),
       abort:ct(`mouseup.${t}`,"body")
      }
     })(`${pt(e)} tbody`);
     const {start:h,doing:p,abort:g}=Hn[e],f=yt(e),b=ft(e),y=b.get(0);
     let x;
     b.attr("move-row",c?"single":"all"), Q(h.target).on(h.events,h.selector,(function(s){
      const h=s.target;
      if(1!==s.buttons) return;
      if("TD"!==h.nodeName) return;
      if(c&& !m(h.getAttribute("gm-moverow"))) return;
      if(!c&&m(h.getAttribute(Rn))) return;
      const w=this,k=Q(w);
      let C=Q("tr",f);
      d.addClass($e);
      const $=yo(e);
      x=[...$];
      let T=Q(".dreamland-row-div",b);
      if(T.length) return;
      b.append('<div class="dreamland-row-div"></div>'), T=Q(".dreamland-row-div",b), (e=>{
       const t=gt(e);
       Q("[rowspan]",t).removeAttr(Wo), Q("[merge-td]",t).removeAttr(Jo)
      })(e);
      const S="true"===ft(e).attr("gm-overflow-x");
      T.get(0).innerHTML=t.createHtml({table:u,tr:w,$thList:Ct(e),overFlow:S}), k.addClass(En);
      let D=0;
      const j=Q(p.target),A=p.events;
      j.off(A), j.on(A,(function(e){
       let t,o;
       D=k.index(), D>0&&(t=C.eq(D-1)), D<C.length-1&&(o=C.eq(D+1)), T.show().css({
        width:w.offsetWidth,top:e.clientY-b.offset().top+pageYOffset,left:0-y.scrollLeft
       }), C=((e,t,o,n,s,r,i,a)=>{
        const c=i.attr(ue);
        let l;
        if(s&&n.offset().top<s.offset().top&&(s.before(i), l=s), r&&n.offset().top+n.height()/2>r.offset().top&&(r.after(i), l=r), l){
         const e=l.attr(ue);
         l.attr(ue,c), i.attr(ue,e);
         const o=a[c],n=a[e];
         if(o[ue]=e, n[ue]=c, m(t)){
          const e=o[t],s=n[t];
          o[t]=s, n[t]=e
         }
         a[c]=n, a[e]=o
        }
        return Q("tr",o)
       })(0,a,f,T,t,o,k,$)
      }));
      const M=Q(g.target),O=g.events;
      M.off(O), M.on(O,(function(){
       j.off(A), M.off(O);
       const t=Oo(e).virtualScroll.top||0;
       T.animate({top:`${w.offsetTop-(y.scrollTop-t)+Ke}`},r,(()=>{
        k.removeClass(En), T.remove()
       }));
       const s=$.filter(((e,t)=>!Kt(e,x[t])));
       v(l)&&l(s,$), o&&((e,t,o,n,s)=>{
        if(!m(o)) return;
        const r=wo(e);
        r.length&&(r.forEach((e=>{
         s.forEach((s=>{
          Kt(lt(n,e,[o]),lt(n,s,[o]),t)&&(e[o]=s[o])
         }))
        })), ko(e,r,!0))
       })(e,n.key,a,i,s), us.changeTableData(e,$,!0), d.removeClass($e)
      }))
     }))
    }

    addSign(e){
     return e.disableMoveRow?Rn:""
    }

    createHtml(e){
     const {table:t,tr:o,overFlow:n,$thList:s}=e,r=o.cloneNode(!0);
     r.style.height=h(o,"height");
     const i=r.querySelectorAll("td");
     return u(s,((e,t)=>{
      i[t].style.width=h(e,"width"), i[t].style.left=h(e,"left"), i[t].style.right=h(e,"right"), n&&(i[t].style.boxShadow=h(e,"box-shadow"))
     })), {class:t.className,tbody:r.outerHTML}
    }

    getColumn(e){
     const {fixed:t}=e;
     return {
      key:ke,
      text:"",
      isAutoCreate:!0,
      isShow:!0,
      [ze]:!0,
      width:30,
      fixed:t,
      template:()=>'<td gm-create gm-moverow><i class="gm-icon gm-icon-move"></i></td>'
     }
    }

    destroy(e){
     Et(Hn[e])
    }
   }

   Ln([Ho(Pn())],Nn.prototype,"createHtml",null);
   const zn=new Nn,qn={},Kn="full-column-fold",Bn="full-column-state",Fn=(e,t,o,n,s,r,i,a)=>{
    let {text:c,compileAttr:l}=((e,t,o,n,s)=>{
     const {_:r,compileAngularjs:i,compileVue:a,compileReact:c}=e,l=Lo(r);
     let d="",u="";
     return c&&(u=Eo, l.push({template:n,row:t,index:o,type:"full-"+s,fnArg:[t,o]})), (a||i)&&(u=Eo, l.push({
      row:t,index:o
     })), c||(d=n(t,o)), {text:d,compileAttr:u}
    })(e,r,i,o,a);
    c=$(c)?c.outerHTML:c;
    let d=[];
    return n&&(d=[[Bn,s+""]]), {
     className:[],
     attribute:[["full-column",a],[pe,i+""]].concat(d),
     querySelector:`[full-column][${pe}="${i}"]`,
     tdList:[`<td colspan="${t}"><div class="full-column-div" ${l}>${c}</div></td>`]
    }
   },In=(e,t,o,n,s)=>{
    const {columnMap:r,fullColumn:i}=e,{topTemplate:a,bottomTemplate:c,useFold:l,interval:d,openState:u=!1}=i,
     h=Object.keys(r).length;
    if("top"===s&&v(a)){
     const r=Fn(e,h,a,l,u,t,o,s);
     r&&n.push(r)
    }
    if("bottom"===s&&v(c)){
     const r=Fn(e,h,c,l,u,t,o,s);
     r&&n.push(r)
    }
    "bottom"===s&&(v(a)||v(c))&&n.push(((e,t,o=0)=>(b(o)&&(o+=Ke), {
     className:[],
     attribute:[["full-column-interval",o+""],[pe,t+""]],
     querySelector:`[full-column-interval][${pe}="${t}"]`,
     tdList:[`<td colspan="${e}"><div style="height: ${o}"></div></td>`]
    }))(h,o,d))
   },Gn=e=>e?"gm-icon-sub":"gm-icon-add";
   const Wn=new class{
    init(e){
     const {useFold:t}=Oo(e).fullColumn;
     if(ft(e).attr("gm-full-column",""), t){
      qn[e]=(o=`${pt(e)} tbody`, {fold:ct(Qe,o,`i[${Kn}]`)});
      const t=qn[e].fold;
      Q(t.target).on(t.events,t.selector,(function(){
       const t=Q(this),o=t.closest("tr"),n=o.attr(ue),s=Q(`${pt(e)} tbody [${pe}="${n}"]`),r=!("true"===t.attr(Kn));
       t.attr(Kn,r), s.attr(Bn,r), o.attr(Bn,r), t.removeClass(Gn(!r)), t.addClass(Gn(r))
      }))
     }
     var o
    }

    addTop(e,t,o,n){
     In(e,t,o,n,"top")
    }

    addBottom(e,t,o,n){
     In(e,t,o,n,"bottom")
    }

    getColumn(e){
     const {openState:t=!1,fixed:o,text:n="",width:s="40px",align:r="",remind:i}=e.fullColumn;
     return {
      key:xe,
      text:n,
      isAutoCreate:!0,
      isShow:!0,
      disableCustomize:!0,
      align:r,
      remind:i,
      width:s,
      fixed:o,
      template:()=>`<td gm-create gm-fold><i class="gm-icon ${Gn(t)}" ${Kn}="${t}"></i></td>`
     }
    }

    destroy(e){
     Et(qn[e])
    }
   },Jn={},Un="tree-element",Vn={},Xn=e=>{
    delete Vn[e]
   },Yn=e=>e?"gm-icon-sub":"gm-icon-add";
   const Qn=new class{
    add(e,t,o,n,s){
     ((e,t)=>{
      Vn[e]||(Vn[e]=[]), Vn[e].push(t)
     })(e,{cacheKey:t,level:o,state:s,hasChildren:n})
    }

    init(e){
     const t=this;
     var o;
     Jn[e]=(o=pt(e), {toggle:ct(Qe,o,`[${Un}] i`)});
     const {toggle:n}=Jn[e];
     yt(e).addClass("tree-tbody"), Q(n.target).on(n.events,n.selector,(function(){
      const o=Q(this).closest("tr");
      t.updateDOM(e,void 0,o)
     }))
    }

    updateDOM(e,t,o){
     const n=yt(e),s=(e,t)=>{
      const o=Q("[tree-element]",e),r=Q("i",o),i=e.attr(ue);
      g(t)&&(t= !("true"===o.attr(Un))), r.removeClass(Yn(!t)), r.addClass(Yn(t)), o.attr(Un,t);
      const a=n.find(`[${pe}="${i}"]`);
      0!==a.length&&(a.attr(ge,t), t||u(a,(e=>{
       s(Q(e),!1)
      })))
     };
     o?s(o,t):(e=>{
      const t=Q("[tree-element]",n),o=Q("i",t);
      o.removeClass(Yn(!e)), o.addClass(Yn(e)), t.attr(Un,e);
      n.find(`[${pe}]`).attr(ge,e)
     })(t), lr.update(e)
    }

    insertDOM(e,t){
     const {openState:o,insertTo:n}=t,s=gt(e),i=[];
     u(Q(`tr[${pe}]`,s),(e=>{
      i.push(e.getAttribute(pe))
     }));
     const a=(e=>Vn[e])(e);
     a&&0!==a.length&&(a.forEach((t=>{
      let {cacheKey:i,level:a,hasChildren:c,state:l}=t;
      g(l)&&(l=o);
      const d=Q(`tr[gm-cache-key="${i}"]`,s);
      let u;
      m(n)&&(u=St(xt(e,n),d)), u||(u=Q("td:not([gm-create])",d).eq(0));
      const h=r.createElement("span");
      h.setAttribute(Un,l+""), h.style.width=14*(a+1)+Ke, c&&(h.innerHTML=`<i class="gm-icon ${Yn(l)}"></i>`), u.prepend(h)
     })), Xn(e))
    }

    destroy(e){
     Et(Jn[e]), Xn(e)
    }
   },Zn="gm-summary",es="gm-summary-row",ts="[gm-summary-row]",os=(e,t,o,n)=>{
    u(o,(o=>{
     const s=e[o.key],{level:r}=s;
     t[r]||(t[r]=[]), C(s.children)?(s.rowspan=1, s.colspan=(e=>{
      let t=0;
      const o=e=>{
       e.children.forEach((e=>{
        C(e.children)?o(e):t++
       }))
      };
      return o(e), t
     })(s), os(e,t,s.children,n-1)):(s.rowspan=n, s.colspan=1), r>0&&t[r].push(s)
    }))
   };
   const ns=new class{
    addSign(e){
     ft(e).attr("gm-nested","")
    }

    push(e,t){
     let o=0;
     const n=t[0];
     u(e,((e,t)=>{
      const {level:s,index:r}=t;
      0===s&&(n[r]=t), o<s&&(o=s)
     })), os(e,t,n,o+1)
    }
   },ss=async e=>{
    const {_:t,columnMap:o,__isNested:n}=e,s=[[]],r=s[0];
    n?ns.push(o,s):u(o,((e,t)=>{
     r[t.index]=t
    }));
    let i="";
    u(s,(t=>{
     i+="<tr>", u(t,(t=>{
      i+=On.getThTpl({settings:e,col:t})
     })), i+="</tr>"
    })), vt(t).html(i), bt(t).html(i), ((e,t)=>{
     const {_:o,compileAngularjs:n,compileVue:s,compileReact:r}=e;
     if(n||s||r){
      const e=Lo(o),n=t.querySelectorAll(`[${Eo}]`);
      [].forEach.call(n,((t,o)=>{
       const n=e[o];
       e.push(Object.assign({},n))
      }))
     }
    })(e,bt(t).get(0)), await qo(e)
   },rs=(e,t)=>{
    const {_:o,emptyTemplate:n}=e;
    if(t&&0!==yo(o,!0).length) return;
    const s=ft(o);
    s.addClass(Te), yt(o).html(`<tr empty-template="${o}" style="height: ${s.height()-1+Ke}"><td colspan="${kt(o).length}"></td></tr>`);
    const r=Tt(o).get(0).querySelector("td");
    r.innerHTML=((e,t,o)=>{
     const {_:n,compileAngularjs:s,compileVue:r,compileReact:i}=e,a=Lo(n);
     return i?(a.push({el:t,template:o,type:"empty",fnArg:[e]}), ""):(r&&a.push({el:t}), s&&a.push({el:t}), o(e))
    })(e,r,n), qo(e)
   },is=async(e,t,o,n,s)=>{
    const {
     _:r,columnMap:i,supportTreeData:a,supportCheckbox:c,supportMoveRow:l,treeConfig:d,__isNested:h,__isFullColumn:p
    }=e,{treeKey:m,openState:y}=d,x=yt(r),k=x.get(0),T=x.find(`[empty-template="${r}"]`);
    T.length&&T.remove();
    let S=[];
    const D=[],j=[];
    u(i,((e,t)=>{
     t.pk||(D[t.index]=t)
    }));
    const A=e=>{
     u(e,(e=>{
      C(e.children)?A(e.children):j.push(e)
     }))
    };
    A(D);
    try{
     const o=(t,n,s)=>{
      const i=g(s);
      u(t,((t,d)=>{
       const h=[],g=[],f=t[ue];
       if(t[me]&&h.push(t[me]), !i){
        g.push([pe,s]);
        const e=k.querySelector(`[gm-cache-key="${f}"]`);
        let t=y;
        e&&(t="true"===e.getAttribute(ge)), g.push([ge,t])
       }
       i&&a&&d%2==0&&g.push(["odd",""]), g.push([ue,f]);
       const v={className:h,attribute:g,row:t,querySelector:`[gm-cache-key="${f}"]`,tdList:[]};
       if(i&&p&&Wn.addTop(e,t,d,S), ((t,o,n,s)=>{
        const r=t.tdList;
        u(j,(t=>{
         const i=t.template;
         if(t.isAutoCreate) return void r.push(i(o[t.key],o,n,s));
         let {text:a,compileAttr:d}=zo(e,i,o,n,t.key);
         const u=t.align?`align=${t.align}`:"",h=l?zn.addSign(t):"",p=c?Ks.addSign(t):"",
          g=t.fixed?`fixed=${t.fixed}`:"",f=`td-name="${t.key}"`;
         a=$(a)?a.outerHTML:a, r.push(`<td ${f} ${d} ${u} ${h} ${p} ${g}>${a}</td>`)
        }))
       })(v,t,d,i), S.push(v), i&&p&&Wn.addBottom(e,t,d,S), a){
        const e=t[m],s=e&&e.length;
        let i;
        const a=x.find(`${v.querySelector} [tree-element]`);
        a.length&&(i="true"===a.attr(Un)), Qn.add(r,f,n,s,i), s&&o(e,n+1,f)
       }
      }))
     };
     o(t,0), ((e,t,o)=>{
      const {_:n,summaryHandler:s}=e;
      if(!v(s)) return;
      const r=s(yo(n,!0)),i=ft(n);
      if(i.find(ts).remove(), w(r)) return void i.removeAttr(Zn);
      i.attr(Zn,"");
      const a=[];
      u(t,(t=>{
       const {key:o,align:n}=t;
       let s=r[o];
       (f(s)||g(s))&&(s="");
       const i=n?`align="${n}"`:"";
       let {text:c,compileAttr:l}=zo(e,(()=>s),{},void 0,o);
       c=$(c)?c.outerHTML:c, a.push(`<td ${l} ${i} disable-move >${c}</td>`)
      })), o.push({className:[],attribute:[[es,""]],querySelector:ts,tdList:a})
     })(e,j,S);
     const i=document.createDocumentFragment(),d=document.createDocumentFragment(),h=x.find("tr");
     if(u(h,(e=>{
      d.appendChild(e)
     })), k.innerHTML="", d.children.length){
      let e,t,o=((e,t,o)=>e.querySelector(`[full-column="${t}"][${pe}="${o}"]`))(d,"top",n);
      o||(o=d.querySelector(`[gm-cache-key="${n}"]`)), o&&(e=[].indexOf.call(d.children,o));
      let r=(M=s, d.querySelector(`[full-column-interval][${pe}="${M}"]`));
      r||(r=d.querySelector(`[gm-cache-key="${s}"]`)), r&&(t=[].indexOf.call(d.children,r));
      const i=[];
      u(d.children,((o,n)=>{
       b(e)||b(t)?(b(e)&&n<e&&i.push(o), b(t)&&n>t&&i.push(o)):i.push(o)
      })), u(i,(e=>e.remove()))
     }
     S.forEach((e=>{
      const {className:t,attribute:o,tdList:n,row:s,querySelector:a}=e,c=n.join("");
      let l=d.querySelector(a);
      if(l) l.innerHTML=c; else{
       l=document.createElement("tr"), l.innerHTML=c;
       const e=d.querySelector("[gm-cache-key]");
       if(e&& !g(s)){
        const t=bo(r,e,!0)[le];
        s[le]<t?i.appendChild(l):d.appendChild(l)
       }else d.appendChild(l)
      }
      t.length&&(l.className=t.join(" ")), o.forEach((e=>{
       l.setAttribute(e[0],e[1])
      })), l[de]=s
     })), d.insertBefore(i,d.firstChild), k.appendChild(d)
    }catch(e){
     qt("render tbody error"), console.error(e)
    }
    var M;
    h||u(i,((e,t)=>{
     Dt(r,e,t.isShow)
    })), await qo(e), a&&Qn.insertDOM(r,d), Vo(r,i), o||(lr.update(r), x.height()>=ft(r).height()?x.attr("filled",""):x.removeAttr("filled"), e.__isNested||jt(r))
   },as=e=>{
    const {
     query:t,
     supportAjaxPage:o,
     pageData:n,
     sortData:s,
     mergeSort:r,
     sortKey:i,
     currentPageKey:a,
     pageSizeKey:c,
     requestHandler:l
    }=e,d=S(!0,{},t);
    return o&&(d[a]=n[a], d[c]=n[c]), w(s)||(r?(d[i]="", u(s,((e,t)=>{
     d[i]=`${d[i]}${d[i]?",":""}${e}:${t}`
    }))):u(s,((e,t)=>{
     d[`${i}${e}`]=t
    }))), l(Bt(d))
   },cs=(e,t,o)=>{
    const n=Bt(o),{supportTreeData:s,treeConfig:r}=e,{treeKey:i}=r;
    let a,c=n[0];
    const l=(e,t)=>{
     const o={};
     t.forEach((e=>{
      o[e[ue]]=e
     })), u(e,((t,n)=>{
      const r=o[t[ue]]||{};
      a=t, Kt(r,t)&& delete e[n], s&&t[i]&&l(t[i],r[i]||[])
     }))
    };
    return l(n,t), {diffList:n,diffFirst:c,diffLast:a}
   },ls={},ds=e=>{
    const {rowHover:t,rowClick:o,rowDblClick:n,cellHover:s,cellClick:r,cellDblClick:i,useCellFocus:a}=Oo(e);
    ls[e]=(e=>{
     const t="tr[gm-cache-key]",o="tr[gm-cache-key] td";
     return {
      rowHover:ct(tt,e,t),
      rowClick:ct(Qe,e,t),
      rowDblClick:ct(Ze,e,t),
      cellHover:ct(tt,e,o),
      cellClick:ct(Qe,e,o),
      cellDblClick:ct(Ze,e,o),
      cellFocus:ct(et,e,"td")
     }
    })(pt(e));
    const c=ls[e],l=t=>[bo(e,t),parseInt(t.getAttribute(ue),10)];
    t&&(()=>{
     let o;
     const n=c.rowHover;
     Q(n.target).on(n.events,n.selector,(function(){
      o!==this&&(o=this, cn(e,this,t(...l(this),this),(()=>{
       o=null
      })))
     }))
    })(), o&&(()=>{
     const t=c.rowClick;
     Q(t.target).on(t.events,t.selector,(function(){
      cn(e,this,o(...l(this),this))
     }))
    })(), n&&(()=>{
     const t=c.rowDblClick;
     Q(t.target).on(t.events,t.selector,(function(){
      cn(e,this,n(...l(this),this))
     }))
    })();
    const d=t=>{
     const o=t.parentNode;
     return [bo(e,o),parseInt(o.getAttribute(ue),10),t.cellIndex]
    };
    s&&(()=>{
     let t;
     const o=c.cellHover;
     Q(o.target).on(o.events,o.selector,(function(){
      t!==this&&(t=this, cn(e,this,s(...d(t),this),(()=>{
       t=null
      })))
     }))
    })(), r&&(()=>{
     const t=c.cellClick;
     Q(t.target).on(t.events,t.selector,(function(){
      cn(e,this,r(...d(this),this))
     }))
    })(), i&&(()=>{
     const t=c.cellDblClick;
     Q(t.target).on(t.events,t.selector,(function(){
      cn(e,this,i(...d(this),this))
     }))
    })(), a&&(()=>{
     const t=c.cellFocus;
     Q(t.target).on(t.events,t.selector,(function(){
      yt(e).find("[gm-focus-td]").removeAttr(fe), this.setAttribute(fe,"")
     }))
    })()
   };
   const us=new class{
    refresh(e,t){
     const o=Oo(e),{
      disableAutoLoading:n,loadingTemplate:s,ajaxBeforeSend:r,ajaxSuccess:i,ajaxError:a,ajaxComplete:c,checkboxConfig:l
     }=o;
     l.disableStateKeep&&ko(e,[],!0), Ss.updateRefreshIconState(e,!0), !n&&dt(e,s);
     let d=(e=>{
      const t=as(e),{
       supportAjaxPage:o,pageData:n,sortData:s,sortKey:r,ajaxType:i,ajaxHeaders:a,ajaxXhrFields:c,ajaxData:l
      }=e;
      o&&u(n,((e,o)=>{
       n[e]=t[e]||o
      })), u(s,((e,o)=>{
       s[e]=t[`${r}${e}`]||o
      })), _o(e);
      const d=v(l)?l(e,t):l;
      return m(d)?new Promise(((e,o)=>{
       _({url:d,type:i,data:t,headers:a,xhrFields:c,cache:!0,success:e,error:o})
      })):d instanceof Promise?d:new Promise((e=>{
       e(d)
      }))
     })(o);
     r(d), d.then((o=>{
      try{
       const s=Oo(e);
       setTimeout((()=>{
        this.driveDomForSuccessAfter(s,o,t), i(o), c(o), !n&&ut(e), Ss.updateRefreshIconState(e,!1)
       }))
      }catch(e){
       console.error(e)
      }
     })).catch((t=>{
      a(t), c(t), !n&&ut(e), Ss.updateRefreshIconState(e,!1)
     }))
    }

    async changeTableData(e,t,o,n){
     const s=Oo(e);
     if(0===t.length) return rs(s), void xo(e,[]);
     let r=yo(e,!0);
     const i=o?((e,t)=>{
      const {
       columnMap:o,
       rowRenderHandler:n,
       pageData:s,
       supportAutoOrder:r,
       supportCheckbox:i,
       checkboxConfig:a,
       pageSizeKey:c,
       currentPageKey:l,
       supportTreeData:d,
       treeConfig:u,
       fullColumn:h
      }=Oo(e),p=a.key;
      let f=0;
      const m=(e,t,o,n)=>{
       let s=o.toString();
       g(n)||(s=`${n}-${o}`);
       const {topTemplate:r,bottomTemplate:i}=h||{};
       if(v(r)&&f++, e[le]=f, f++, v(i)&&f++, (v(r)||v(i))&&f++, d){
        const o=e[u.treeKey];
        o&&o.length&&o.forEach(((e,o)=>{
         m(e,t+1,o,s)
        }))
       }
       e[ue]=s, e[he]=t
      };
      return t.map(((t,a)=>{
       if(r){
        let e=1;
        s&&s[c]&&s[l]&&(e=s[c]*(s[l]-1)+1), t.gm_order=e+a
       }
       return i&&(t.gm_checkbox=wo(e).some((e=>Kt(lt(o,e),lt(o,t),p))), t.gm_checkbox_disabled= !1), m(t,0,a), n(t,a)
      }))
     })(e,t):t;
     ko(e,i), xo(e,i);
     const {virtualScroll:a,supportCheckbox:c,checkboxConfig:l,supportTreeData:d}=s,{useVirtualScroll:u,virtualNum:h}=a,
      p=gt(e),f=yt(e),m=vt(e).height();
     if(d&& !n&&(f.get(0).innerHTML="", r=[]), !u||h>=i.length){
      tr.virtualScrollMap[e]&&(r=[]);
      const {diffList:t,diffFirst:o,diffLast:n}=cs(s,r,i);
      return await is(s,t,!1,o[ue],n[ue]), c&&zs(e,i,l.useRadio,l.max), delete tr.virtualScrollMap[e], void p.css({
       marginTop:-m,marginBottom:0
      })
     }
     const b=ft(e);
     let y=yo(e,!0),x=parseInt(s.lineHeight,10);
     const w=b.height();
     let k,C,$=[];
     tr.virtualScrollMap[e]=async t=>{
      const o=Oo(e),{supportCheckbox:n,checkboxConfig:s}=o;
      y=yo(e,!0);
      const r=b.scrollTop();
      if(k&&r===k) return;
      const i=f.find("tr[gm-cache-key]").eq(0);
      if(i.length&&(x=i.height()), k&&Math.abs(r-k)<x) return;
      k=r;
      const a=Math.ceil(w/x);
      let c=Math.ceil(r/x)-Math.ceil((h-a)/2);
      c<0&&(c=0);
      let l=c+h;
      l>=y.length&&(l=y.length, c=l-h), c<0&&(c=0);
      const d=c*x;
      p.css({marginTop:d-m,marginBottom:(y.length-l)*x}), o.virtualScroll.top=d, _o(o);
      const u=y.slice(c,l),{diffList:g,diffFirst:v,diffLast:T}=cs(o,$,u);
      $=u, await is(o,g,t,v[ue],T[ue]), C&&clearTimeout(C), C=setTimeout((()=>{
       clearTimeout(C), n&&zs(e,y,s.useRadio,s.max)
      }),300)
     }, tr.virtualScrollMap[e](!1)
    }

    async driveDomForSuccessAfter(e,t,o){
     const {
      _:n,
      rendered:s,
      responseHandler:r,
      supportAjaxPage:i,
      supportMenu:a,
      dataKey:c,
      totalsKey:l,
      useNoTotalsMode:d,
      asyncTotals:u
     }=e;
     if(!s) return;
     if(!t) return void qt("response undefined！please check ajaxData");
     let h=m(t)?JSON.parse(t):t;
     h=r(Bt(h));
     let p=h[c],g=h[l];
     if(p&&k(p)) if(!i||d||u|| !isNaN(parseInt(g,10))){
      if(0===p.length) h[l]=0; else{
       const e=ft(n);
       e.removeClass(Te), e.scrollTop(0)
      }
      await this.changeTableData(n,p,!0), i&&Ss.resetPageData(e,h[l],p.length), a&&en(n), v(o)&&o(h)
     }else qt(`response.${l} undefined，please check totalsKey`); else qt(`response.${c} is not Array，please check dataKey`)
    }

    async createDOM(e,t){
     const {_:o,lineHeight:n,useWordBreak:s}=t;
     No(o), e.wrap(On.getWrapTpl({settings:t}),".table-div");
     const i=r.createElement("thead");
     i.setAttribute(re,o), e.append(i);
     const a=r.createElement("tbody");
     a.setAttribute(ae,o), s&&a.setAttribute("word-break",""), e.append(a);
     const c=r.createElement("thead");
     c.setAttribute(ie,o), e.append(c), ds(o), Rt(o,n), await this.waitContainerAvailable(o), await ss(t), Ht(t), tr.init(o)
    }

    waitContainerAvailable(e){
     const t=r.querySelector(`[${ee}="${e}"]`);
     function o(){
      return "100%"!==h(t,"width")
     }
     if(!o()) return new Promise((t=>{
      mo[e]=setInterval((()=>{
       o()&&(clearInterval(mo[e]), mo[e]=null, t())
      }),50)
     }))
    }

    destroy(e){
     Et(ls[e]);
     try{
      const t=gt(e),o=mt(e);
      if(!t.length|| !o.length) return;
      const n=t.get(0);
      Me.forEach((e=>{
       let o=n["__"+e];
       o?t.attr(e,o):t.removeAttr(e), delete n["__"+e]
      })), t.html(""), o.after(t), o.remove()
     }catch(e){
     }
    }
   };
   var hs=o(986),ps=o.n(hs);
   const gs={};
   var fs=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };

   class ms{
    init({_:e,defaultValue:t="",onChange:o}){
     var n;
     gs[e]={
      open:ct(Qe,n=`[${ne}="${e}"]`,".gm-dropdown .gm-dropdown-text"),
      close:ct(Qe,"body"),
      selected:ct(Qe,n,".gm-dropdown .gm-dropdown-list >li")
     };
     const {open:s,close:r,selected:i}=gs[e],a=mt(e).find(".gm-dropdown"),c=a.find(".gm-dropdown-text"),
      l=a.find(".gm-dropdown-list");
     c.text(t), Q(s.target).on(s.events,s.selector,(function(e){
      e.stopPropagation();
      const t=Q(r.target);
      if("block"===l.css("display")) return l.hide(), void t.unbind(r.events);
      l.show();
      const o=r.events;
      t.unbind(o), t.bind(o,(function(){
       t.unbind(o), l.hide()
      }))
     })), Q(i.target).on(i.events,i.selector,(function(){
      const e=parseInt(c.text(),10),t=this.value;
      e!==t&&(c.text(t), o(t,e))
     }))
    }

    createHtml(e){
     const {sizeData:t}=e;
     let o="";
     return t.forEach((e=>{
      o+=`<li value="${e}">${e}</li>`
     })), {li:o}
    }

    destroy(e){
     Et(gs[e])
    }
   }

   fs([Ho(ps())],ms.prototype,"createHtml",null);
   const vs=new ms;
   var bs=o(956),ys=o.n(bs);
   const xs=e=>`[${ne}="${e}"]`,ws={};
   var ks=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };
   const Cs=(e,t,o)=>{
    const {useNoTotalsMode:n,currentPageKey:s}=t;
    n&&e.attr("no-totals-mode","true");
    Q("[pagination-number]",e).html(((e,t)=>{
     let o=Number(t[e]||0),n=Number(t.tPage||0),s="",r="",i=1,a=n;
     if(o>4&&(s+='<li to-page="1">1</li><li class="disabled">...</li>', i=o-2), n-o>4&&(a=o+2, r+=`<li class="disabled">...</li><li to-page="${n}">${n}</li>`), t.tSize) for(; i<=a; i++) s+=i!==o?`<li to-page="${i}">${i}</li>`:`<li class="active">${o}</li>`;
     return s+=r, s
    })(s,o));
    const r=o[s],i=Q("[pagination-before] .first-page",e),a=Q("[pagination-before] .previous-page",e),
     c=Q("[pagination-after] .next-page",e),l=Q("[pagination-after] .last-page",e),d=Boolean(i.length),
     u=Boolean(a.length),h=Boolean(c.length),p=Boolean(l.length);
    1===r?(d&&i.addClass(Re), u&&a.addClass(Re)):(d&&i.removeClass(Re), u&&a.removeClass(Re)), r>=o.tPage?(h&&c.addClass(Re), p&&l.addClass(Re)):(h&&c.removeClass(Re), p&&l.removeClass(Re))
   },$s=(e,t)=>{
    (!t||t<1)&&(t=1);
    const {
     _:o,
     useNoTotalsMode:n,
     currentPageKey:s,
     pageData:r,
     pageSize:i,
     pageSizeKey:a,
     sortData:c,
     query:l,
     pagingBefore:d,
     pagingAfter:u
    }=e,{tPage:h}=r;
    !n&&t>h&&(t=h), r[s]=t, r[a]=r[a]||i, _o(e);
    const p=S({},l,c,r);
    d(p), us.refresh(o,(()=>{
     u(p)
    }))
   };

   class Ts{
    init(e){
     const {_:t,disableCache:o,pageSizeKey:n,pageSize:s,currentPageKey:r,useNoTotalsMode:i}=e;
     ws[t]=(e=>{
      const t=`[${ne}="${e}"]`;
      return {
       input:ct("keyup",t,".gp-input"),
       first:ct(Qe,t,"[pagination-before] .first-page"),
       previous:ct(Qe,t,"[pagination-before] .previous-page"),
       next:ct(Qe,t,"[pagination-after] .next-page"),
       last:ct(Qe,t,"[pagination-after] .last-page"),
       num:ct(Qe,t,"[pagination-number] li"),
       refresh:ct(Qe,t,".refresh-action")
      }
     })(t);
     let a=s||10;
     if(!o){
      const e=$o(t)[n];
      e&&(a=e)
     }
     S(e,{pageData:{[n]:a,[r]:1}}), i&&(e.asyncTotals=null), _o(e);
     const c={
      _:t,defaultValue:e.pageData[n],onChange:e=>{
       const o=Oo(t);
       o.pageData={[r]:1,[n]:e}, To(o), _o(o);
       const s=S({},o.query,o.sortData,o.pageData);
       o.pagingBefore(s), us.refresh(t,(()=>{
        o.pagingAfter(s)
       }))
      }
     };
     vs.init(c), this.initEvent(t)
    }

    initEvent(e){
     const {first:t,previous:o,next:n,last:s,num:r,refresh:i,input:a}=ws[e];
     Q(t.target).on(t.events,t.selector,(function(){
      $s(Oo(e),1)
     })), Q(o.target).on(o.events,o.selector,(function(){
      const t=Oo(e),o=t.pageData[t.currentPageKey]-1;
      $s(t,o<1?1:o)
     })), Q(n.target).on(n.events,n.selector,(function(){
      const t=Oo(e),o=t.pageData[t.currentPageKey],n=t.pageData.tPage,s=o+1;
      $s(t,s>n?n:s)
     })), Q(s.target).on(s.events,s.selector,(function(){
      const t=Oo(e);
      $s(t,t.pageData.tPage)
     })), Q(r.target).on(r.events,r.selector,(function(){
      const t=Oo(e),o=Q(this),n=o.attr("to-page");
      if(!n|| !Number(n)||o.hasClass(Re)) return !1;
      $s(t,parseInt(n,10))
     })), Q(i.target).on(i.events,i.selector,(function(){
      const t=Oo(e);
      $s(t,t.pageData[t.currentPageKey])
     })), Q(a.target).on(a.events,a.selector,(function(t){
      13===t.which&&$s(Oo(e),parseInt(this.value,10))
     }))
    }

    createHtml(e){
     const {settings:t}=e;
     return {
      gridManagerName:t._,
      keyName:ne,
      gotoFirstText:Fo(t,"goto-first-text"),
      gotoLastText:Fo(t,"goto-last-text"),
      firstPageText:Fo(t,"first-page"),
      previousPageText:Fo(t,"previous-page"),
      nextPageText:Fo(t,"next-page"),
      lastPageText:Fo(t,"last-page"),
      pageSizeOptionTpl:vs.createHtml(t)
     }
    }

    resetPageData(e,t,o){
     const {_:n,useNoTotalsMode:s,currentPageKey:r,pageData:i,asyncTotals:a,pageSizeKey:c,pageSize:l}=e,d=Q(xs(n)),
      u=i[r]||1,h=i[c]||l,p=(t,n)=>{
       const s=((e,t,o)=>{
        const {pageData:n,pageSizeKey:s,pageSize:r,currentPageKey:i}=e,a=n[s]||r,c=n[i]||1;
        let l=1;
        return l=t?Math.ceil(t/a):o<a?c:c+1, {tPage:l,[i]:c>l?1:c,[s]:a,tSize:t}
       })(e,t,o);
       Cs(d,e,s), ((e,t,o,n)=>{
        const {currentPageKey:s,pageSizeKey:r}=t,i=1===o[s]?1:(o[s]-1)*o[r]+1,a=o[s]*o[r];
        let c=o.tSize;
        const l=o[s];
        let d=o.tPage;
        !c&&n&&(c=d=n);
        const u=Q(".page-info",e);
        if(u.length){
         const e=Fo(t,"page-info",[i,a,c]);
         u.html(e)
        }
        const h=Q("[begin-number-info]",e);
        h.length&&(h.html(i), h.val(i));
        const p=Q("[end-number-info]",e);
        p.length&&(p.html(a), p.val(a));
        const g=Q("[current-page-info]",e);
        g.length&&(g.html(l), g.val(l));
        const f=Q("[totals-number-info]",e);
        f.length&&(f.html(c), f.val(c));
        const m=Q("[totals-page-info]",e);
        m.length&&(m.html(d), m.val(d))
       })(d,e,s,n), _o(S(!0,e,{pageData:s})), d.css("visibility","visible")
      };
     if(a) return o<h?void p((u-1)*h+o):(p(null,a.text), void a.handler(e,as(e)).then((e=>{
      p(e)
     })));
     s?p():p(t)
    }

    updateRefreshIconState(e,t){
     const o=Q(`${xs(e)} .refresh-action`);
     if(!o.length) return;
     const n="refreshing";
     t?o.addClass(n):setTimeout((()=>{
      o.removeClass(n)
     }),3e3)
    }

    updateCheckedInfo(e){
     const t=Q(`${xs(e)} .toolbar-info.checked-info`);
     0!==t.length&&t.html(Fo(Oo(e),"checked-info",wo(e).length))
    }

    destroy(e){
     Et(ws[e])
    }
   }

   ks([Ho(ys())],Ts.prototype,"createHtml",null);
   const Ss=new Ts;
   var Ds=o(692),js=o.n(Ds),As=o(976),Ms=o.n(As),Os=o(963),_s=o.n(Os);
   const Ps={},Hs=(e,t,o,n,s)=>{
    const r=yo(e),i=[];
    return o&& !n&&r.forEach((e=>{
     e.gm_checkbox_disabled||(e.gm_checkbox!==t&&i.push(e), e.gm_checkbox=t)
    })), o||s|| !n||(r[n].gm_checkbox=t, i.push(r[n])), s&&r.forEach((e=>{
     e[ue]===n?(e.gm_checkbox= !0, i.push(e)):e.gm_checkbox= !1
    })), xo(e,r), ko(e,i,s), r
   };
   var Es=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };
   const Rs="disabled-selected",Ls=(e,t)=>{
    const o=Q('input[type="radio"]',e),n="gm-radio-checked";
    t?e.addClass(n):e.removeClass(n), o.prop(Oe,t)
   },Ns=(e,t)=>{
    const o=Q('input[type="checkbox"]',e);
    switch(t){
     case Oe:
      e.addClass(He), e.removeClass(Ee), o.prop(Oe,!0);
      break;
     case _e:
      e.removeClass(He), e.addClass(Ee), o.prop(Oe,!1);
      break;
     case Pe:
      e.removeClass(He), e.removeClass(Ee), o.prop(Oe,!1)
    }
   },zs=(e,t,o,n)=>{
    const s=gt(e);
    let r=0,i=t.length;
    t&&t.forEach(((e,t)=>{
     const n=e.gm_checkbox,a=Q(`tbody tr[gm-cache-key="${t}"]`,s),c=Q("td[gm-checkbox] .gm-radio-checkbox",a);
     a.attr(Oe,n), o?Ls(c,n):Ns(c,n?Oe:Pe), e.gm_checkbox_disabled&&i--, !e.gm_checkbox_disabled&&n&&r++
    }));
    const a=Q("thead tr th[gm-checkbox] .gm-checkbox-wrapper",s),c=Q(".gm-checkbox ",a);
    if(!o&&Ns(c,0===r?Pe:r===i?Oe:_e), Ss.updateCheckedInfo(e), !o&&b(n)){
     const t=Q("tbody .gm-checkbox-wrapper ",s);
     u(t,(t=>{
      const o=Q(t);
      Q(".gm-checkbox",o).hasClass("gm-checkbox-checked")||(wo(e).length>=n?o.addClass(Rs):o.removeClass(Rs))
     })), t.length>n?a.addClass(Rs):a.removeClass(Rs)
    }
   };

   class qs{
    init(e){
     var t;
     Ps[e]=(t=pt(e), {
      allChange:ct(Qe,t,"th[gm-checkbox] .gm-checkbox-wrapper"),
      checkboxChange:ct(Qe,t,"td[gm-checkbox] .gm-checkbox-wrapper"),
      radioChange:ct(Qe,t,"td[gm-checkbox] .gm-radio-wrapper"),
      trChange:ct(Qe,t,"tbody > tr[gm-cache-key]")
     });
     const {allChange:o,checkboxChange:n,radioChange:s,trChange:r}=Ps[e],{
      checkboxConfig:i,checkedBefore:a,checkedAllBefore:c,checkedAfter:l,checkedAllAfter:d
     }=Oo(e),{max:u,useRowCheck:h}=i;
     Q(o.target).on(o.events,o.selector,(function(){
      let t=wo(e);
      const o=this.querySelector(".gm-checkbox-input"),n=o.checked;
      if(a(t,!n), !1===c(t,!n)) return void (o.checked= !n);
      const s=Hs(e,n,!0);
      zs(e,s), t=wo(e), l(t,n), d(t,n)
     })), Q(n.target).on(n.events,n.selector,(function(){
      const t=Q(this).closest("tr").get(0),o=this.querySelector(".gm-checkbox-input"),n=o.checked;
      if(!1===a(wo(e),!n,bo(e,t))) return void (o.checked= !n);
      const s=t.getAttribute(ue),r=Hs(e,n,!1,s);
      zs(e,r,!1,u), l(wo(e),n,bo(e,t))
     })), Q(s.target).on(s.events,s.selector,(function(){
      const t=Q(this).closest("tr").get(0),o=this.querySelector(".gm-radio-input"),n=o.checked;
      if(!1===a(wo(e),"true"===t.getAttribute("checked"),bo(e,t))) return void (o.checked= !n);
      const s=t.getAttribute(ue),r=Hs(e,void 0,!1,s,!0);
      zs(e,r,!0), l(wo(e),!0,bo(e,t))
     })), h&&Q(r.target).on(r.events,r.selector,(function(t){
      if(this.getAttribute(pe)) return;
      const o=bo(e,this,!0),n=Q("td[gm-checkbox] label",this),s=t.target;
      let r=Q(s);
      "TD"!==s.nodeName&&(r=r.closest("td")), o.gm_checkbox_disabled||m(r.attr(Rs))||n.hasClass(Rs)|| -1!==[].indexOf.call(s.classList,"gm-radio-checkbox-input")||n.find("input").trigger("click")
     }))
    }

    addSign(e){
     return e.disableRowCheck?Rs:""
    }

    getCheckedTr(e){
     return r.querySelectorAll(`${pt(e)} tbody tr[checked="true"]`)
    }

    getColumn(e){
     return {
      key:Ce,
      text:e.useRadio?"":this.getCheckboxTpl({}),
      isAutoCreate:!0,
      isShow:!0,
      [ze]:!0,
      width:e.width,
      fixed:e.fixed,
      template:(t,o,n,s)=>this.getColumnTemplate({
       checked:t,disabled:o.gm_checkbox_disabled,useRadio:e.useRadio,isTop:s
      })
     }
    }

    getColumnTemplate(e){
     const {checked:t,disabled:o,useRadio:n,isTop:s}=e;
     return {template:s?n?this.getRadioTpl({checked:t,disabled:o}):this.getCheckboxTpl({checked:t,disabled:o}):""}
    }

    getCheckboxTpl(e){
     const {checked:t,disabled:o,label:n,value:s}=e;
     return {checked:t?Oe:Pe,disabled:o,label:n,value:s}
    }

    getRadioTpl(e){
     const {checked:t,disabled:o,label:n,value:s}=e;
     return {checked:t,disabled:o,label:n,value:s}
    }

    destroy(e){
     Et(Ps[e])
    }
   }

   Es([Ho(js())],qs.prototype,"getColumnTemplate",null), Es([Ho(Ms())],qs.prototype,"getCheckboxTpl",null), Es([Ho(_s())],qs.prototype,"getRadioTpl",null);
   const Ks=new qs;
   var Bs=o(271),Fs=o.n(Bs);
   const Is={},Gs="no-click",Ws="gm-config-ing",Js="gm-config-area";
   var Us=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };
   const Vs=e=>Q(`[${oe}="${e}"]`),Xs=e=>{
    const t=mt(e),o=Vs(e),n=o.find(".config-list").get(0),s=o.find(".config-info");
    o.css("visibility","hidden"), setTimeout((()=>{
     n.style.maxHeight=(t.height()-90-20-s.height()||0)+Ke, o.css("visibility","inherit")
    }))
   };

   class Ys{
    init(e){
     const t=this;
     Is[e]=(e=>{
      const t=`[${oe}="${e}"]`;
      return {
       closeConfig:ct(Qe,t,".config-action"),
       liChange:ct(Qe,t,".config-list li"),
       closeConfigByBody:ct("mousedown.closeConfig","body")
      }
     })(e);
     const {closeConfig:o,liChange:n}=Is[e];
     Q(o.target).on(o.events,o.selector,(function(){
      t.hide(e)
     })), Q(n.target).on(n.events,n.selector,(function(o){
      o.preventDefault();
      const n=Q(this);
      if(n.hasClass(Gs)) return !1;
      const s=n.find(".gm-checkbox"),r=n.attr(ce),i=Vs(e),a=ft(e);
      Q(".config-list .no-click",i).removeClass(Gs);
      let c=!n.find('input[type="checkbox"]').prop(Oe);
      c?s.addClass(He):s.removeClass(He), a.addClass(Ws), Dt(e,r,c), a.removeClass(Ws);
      const l=Q(".checked-li",i);
      1===l.length&&l.addClass(Gs), t.update(e)
     }))
    }

    updateConfigList(e){
     const t=Vs(e),o=Q(".config-list",t);
     let n=0;
     const s=[];
     u(Oo(e).columnMap,((e,t)=>{
      s[t.index]=t
     })), o.html(""), u(s,(t=>{
      const {key:s,isShow:r}=t;
      if(t.disableCustomize) return;
      const i=wt(e,s).find(".th-text").text();
      o.append(this.createColumn({key:s,isShow:r,label:i})), r&&n++
     }));
     const r=Q(".checked-li",t);
     1===n?r.addClass(Gs):r.removeClass(Gs)
    }

    update(e){
     let t=Po(e);
     ft(e).scrollLeft(0), At(t), t=Po(e), _t(t), lr.update(e), jt(e), Pt(e), lr.resetFlag(e)
    }

    createHtml(e){
     return {key:`${oe}="${e._}"`,info:e.configInfo}
    }

    createColumn(e){
     const {key:t,isShow:o,label:n}=e;
     return `<li th-name="${t}"${o?' class="checked-li"':""}>${Ks.getCheckboxTpl({checked:o,label:n})}</li>`
    }

    toggle(e){
     "block"===Vs(e).css("display")?this.hide(e):this.show(e)
    }

    show(e){
     const t=Vs(e);
     this.updateConfigList(e), t.show(), Xs(e);
     const {closeConfigByBody:o}=Is[e],n=o.events,s=Q(o.target);
     s.off(n), s.on(n,(function(e){
      const o=Q(e.target);
      if(o.hasClass(Js)||1===o.closest(".gm-config-area").length) return !1;
      t.hide(), s.off(n)
     }))
    }

    hide(e){
     Vs(e).hide()
    }

    destroy(e){
     Et(Is[e])
    }
   }

   Us([Ho(Fs())],Ys.prototype,"createHtml",null);
   const Qs=new Ys,Zs={},er={};
   const tr=new class{
     constructor(){
      this.width=0, this.pauseResizeEventMap={}, this.virtualScrollMap={}
     }

     init(e){
      this.bindResizeToTable(e), this.bindScrollToTableDiv(e), this.width=(e=>{
       const t=r.createElement("div");
       t.style.width="100px", t.style.height="100px", t.style.overflow="scroll", t.style.scrollbarWidth="thin", ft(e).get(0).appendChild(t);
       const o=t.offsetWidth-t.clientWidth;
       return t.remove(), o
      })(e)
     }

     update(e){
      const t=mt(e);
      let o=er[e],n=Oo(e);
      if(1===t.length){
       this.pauseResizeEventMap[e]= !0;
       try{
        const s=t.width();
        o&&s!==o&&(At(n), _o(n)), er[e]=s, Pt(e), _t(n), lr.update(e), an(e), n.supportConfig&&Xs(e)
       }catch(e){
       }
       setTimeout((()=>{
        delete this.pauseResizeEventMap[e]
       }))
      }
     }

     bindResizeToTable(e){
      const t=mt(e).parent(),o=s.ResizeObserver;
      if(o){
       const n=new o((()=>{
        this.pauseResizeEventMap[e]||this.update(e)
       })),s=t.get(0);
       return n.observe(s), void (Zs[e]={observer:n,el:s})
      }
      Q(s).bind(`resize.${e}`,(()=>{
       this.pauseResizeEventMap[e]||this.update(e)
      })), setTimeout((()=>{
       this.update(e)
      }))
     }

     bindScrollToTableDiv(e){
      const t=ft(e),o=this.virtualScrollMap;
      t.unbind(st), t.bind(st,(()=>{
       const t=o[e];
       t&&t(!0), _t(Oo(e),!0), lr.update(e), an(e)
      }))
     }

     destroy(e){
      Q(s).unbind(`resize.${e}`), ft(e).unbind(st);
      const t=Zs[e];
      t&&t.el&&t.observer&&(t.observer.unobserve(t.el), delete Zs[e]), delete this.virtualScrollMap[e]
     }
    },or={},nr=(e,t,o,n)=>{
     t.setProperty(`--gm-${e}-${o}-sticky-value`,n+Ke)
    },
    sr=(e,t,o,n)=>`[${te}="${e}"][gm-overflow-x="true"] tr:not([empty-template]) td:nth-of-type(${t+1}){position: sticky;\nposition: -webkit-sticky;\n${o}: var(--gm-${e}-${t}-sticky-value);\nz-index: 3;\nbox-shadow: ${n};}`,
    rr={},ir={},ar={},cr="fixed-focus";
   const lr=new class{
    init(e){
     const {_:t,browser:o,columnMap:n}=e,s=pt(t);
     or[t]={fixedFocus:ct(et,s,"td[fixed]")};
     const {fixedFocus:i}=or[t];
     Q(i.target).on(i.events,i.selector,(function(){
      yt(t).find("[fixed-focus]").removeAttr(cr), this.setAttribute(cr,"")
     }));
     const a=bt(t),c=vt(t).height()+Ke;
     let l="",d=0,h=0;
     const p=[],g=[];
     u(n,((e,t)=>{
      "left"===t.fixed&&p.push(t), "right"===t.fixed&&g.push(t)
     }));
     const f=p.length;
     let m="none";
     rr[t]=p.sort(((e,t)=>e.index-t.index)), u(rr[t],((e,o)=>{
      const n=wt(t,e.key);
      o===f-1&&(m="2px 0 4px #e8e8e8"), l+=sr(t,e.index,"left",m), e.pl=d, d+=e.width, n.css({
       height:c,lineHeight:c,boxShadow:m
      })
     })), "safari"===o&&d--, a.css("padding-left",d), m="none";
     const v=g.length;
     ir[t]=g.sort(((e,t)=>t.index-e.index)), ir[t].forEach(((e,o)=>{
      const n=wt(t,e.key);
      o===v-1&&(m="-2px 0 4px #e8e8e8"), n.css({
       height:c,lineHeight:c,boxShadow:m
      }), l+=sr(t,e.index,"right",m), e.pr=h, h+=e.width
     })), a.css("padding-right",h);
     const b=ft(t),y=`fixed-style-${t}`;
     let x=r.getElementById(y);
     x||(x=r.createElement("style"), x.id=y, b.append(x), x=r.getElementById(y)), x.innerHTML=l, this.resetFlag(t)
    }

    update(e){
     const t=ft(e),o=t.get(0).style,n=t.scrollLeft(),s=t.width(),r=bt(e).width(),i=yt(e).height();
     if(ar[e]&&ar[e].divWidth===s&&ar[e].scrollLeft===n&&ar[e].theadWidth===r&&ar[e].tbodyHeight===i) return;
     ar[e]={divWidth:s,scrollLeft:n,theadWidth:r,tbodyHeight:i};
     const a="true"===ft(e).attr("gm-overflow-x"),c=(e,t)=>a?xt(e,t.key).width():t.width;
     if(rr[e]&&rr[e].length){
      let t,s=0;
      u(rr[e],(r=>{
       t=c(e,r), wt(e,r.key).css({width:t,left:s+n}), nr(e,o,r.index,s), s+=t
      })), bt(e).css("padding-left",s)
     }
     if(ir[e]&&ir[e].length){
      let s=r-t.width()-n;
      yt(e).height()>t.get(0).clientHeight&&(s+=tr.width);
      let i,a=0;
      ir[e].forEach((t=>{
       i=c(e,t), wt(e,t.key).css({width:i,right:a+s}), nr(e,o,t.index,a), a+=i
      })), bt(e).css("padding-right",a)
     }
    }

    resetFlag(e){
     if(!ir[e]|| !ir[e].length) return;
     const t="fixed-previous",o=bt(e).find('th[fixed="right"]').eq(0),n=Ct(e),s=o.index(n);
     n.removeAttr(t), n.eq(s-1).attr(t,"")
    }

    destroy(e){
     delete rr[e], delete ir[e], Et(or[e])
    }
   },dr="gm-adjust-ing";
   const ur={};
   const hr=new class{
    get html(){
     return '<span class="gm-adjust-action"></span>'
    }

    init(e){
     ur[e]=function(e,t){
      return {
       start:ct(et,t,`[grid-manager-mock-thead="${e}"] .gm-adjust-action`),
       doing:ct(tt,`[${te}="${e}"]`,t),
       abort:ct("mouseup mouseleave",t)
      }
     }(e,pt(e));
     const {start:t}=ur[e];
     Q(t.target).on(t.events,t.selector,(function(t){
      const o=Q(this).closest("th"),n=o.find(".th-wrap");
      let s=o.find(".gm-adjust-ing");
      if(!s.length){
       const e=r.createElement("span");
       e.className=dr, n.append(e), s=o.find(".gm-adjust-ing")
      }
      const i=o.height();
      s.css({top:-(i-n.height())/2,right:-(o.width()-n.width()+1)/2,height:ft(e).height()+i});
      const a=gt(e),{adjustBefore:c,adjustAfter:l,isIconFollowText:d,columnMap:u}=Oo(e),h=Ct(e),p=h.eq(o.index(h)+1);
      c(t), a.addClass($e), ((e,t,o,n,s)=>{
       let r,i=o.width();
       const a=ft(e).width(),{doing:c}=ur[e],l=bt(e),d=t.offset().left,u=l.width()-i-t.width();
       Q(c.target).on(c.events,c.selector,(function(c){
        r=Math.ceil(c.clientX-d);
        const h=t.width();
        if(r!==h){
         if(s>r){
          if(r<=n) return;
          const e=u+r+i;
          e<a&&(i=i+a-e)
         }
         s<r&&(i=o.width()), l.width(u+r+i), t.css({width:r,"max-width":r}), o.css({
          width:i,"max-width":i
         }), lr.update(e)
        }
       }))
      })(e,o,p,Mt(e,u[$t(o)],d),Math.ceil(t.clientX-o.offset().left)), ((e,t,o,n)=>{
       const {doing:s,abort:r}=ur[e];
       Q(r.target).on(r.events,(i=>{
        Q(r.target).off(r.events), Q(s.target).off(s.events,s.selector);
        const a=Po(e,!0).columnMap;
        for(let t in a) xt(e,t).width(a[t].width);
        Pt(e), tr.update(e), n(i), t.removeClass($e), o.find(".gm-adjust-ing").remove()
       }))
      })(e,a,o,l)
     }))
    }

    destroy(e){
     Et(ur[e])
    }
   };
   const pr=new class{
    getColumn(e){
     const {autoOrderConfig:t}=e;
     return {
      key:we,
      text:Fo(e,"order-text"),
      isAutoCreate:!0,
      isShow:!0,
      [ze]:!0,
      width:t.width,
      fixed:t.fixed,
      template:(e,t,o,n)=>`<td gm-create gm-order>${n?e:""}</td>`
     }
    }
   };
   var gr=o(909),fr=o.n(gr);
   const mr={};
   var vr=function(e,t,o,n){
    var s,r=arguments.length,i=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;
    if("object"== typeof Reflect&&"function"== typeof Reflect.decorate) i=Reflect.decorate(e,t,o,n); else for(var a=e.length-1; a>=0; a--) (s=e[a])&&(i=(r<3?s(i):r>3?s(t,o,i):s(t,o))||i);
    return r>3&&i&&Object.defineProperty(t,o,i), i
   };

   class br{
    init(e){
     const t=this,o=gt(e),n=Q("body");
     mr[e]=((e,t)=>({
      start:ct(et,t,`[grid-manager-mock-thead="${e}"] .gm-drag-action`),
      doing:ct("mousemove.gmDrag","body"),
      abort:ct("mouseup.gmDrag","body")
     }))(e,`${pt(e)} [grid-manager-mock-thead]`);
     const {start:s,doing:r,abort:i}=mr[e];
     Q(s.target).on(s.events,s.selector,(function(s){
      let a=Oo(e);
      const {columnMap:c,dragBefore:l,animateTime:d,dragAfter:u,supportConfig:h}=a,p=Q(this).closest("th"),g=p.get(0);
      let f=Ct(e);
      const m=mt(e),v=St(p,e);
      l(s), n.addClass($e), p.addClass(un), v.addClass(un);
      let b=Q(".gm-dreamland-div",m);
      if(b.length) return;
      m.append('<div class="gm-dreamland-div"></div>'), b=Q(".gm-dreamland-div",m), b.get(0).innerHTML=t.createHtml({
       $table:o,$th:p
      });
      let y=0;
      const x=p.width(),w=p.height(),k=o.height(),C=m.offset(),$=pageXOffset-C.left-x/2,T=pageYOffset-C.top-w/2;
      b.css({width:x+2,height:k+2});
      const S=Q(r.target);
      S.off(r.events), S.on(r.events,(function(o){
       let n,s,r,i;
       b.show(), y=p.index(f), y>0&&(n=f.eq(y-1), s=$t(n)), y<f.length-1&&(r=f.eq(y+1), i=$t(r)), n&&n.length&&c[s].disableCustomize?n= void 0:r&&r.length&&c[i].disableCustomize&&(r= void 0), b.css({
        left:o.clientX+$,top:o.clientY+T
       }), f=t.updateDrag(e,n,r,p,v,b,f)
      }));
      const D=i.events,j=Q(i.target);
      j.off(D), j.on(D,(function(t){
       Q(r.target).off(r.events), j.off(D), b.animate({
        top:o.get(0).offsetTop+Ke,left:`${g.offsetLeft-ft(e).get(0).scrollLeft+Ke}`
       },d,(()=>{
        p.removeClass(un), v.removeClass(un), b.remove(), u(t)
       })), Po(e), h&&Qs.updateConfigList(e), Pt(e), lr.resetFlag(e), n.removeClass($e)
      }))
     }))
    }

    createHtml(e){
     const {$table:t,$th:o}=e,n=St(o,t.find("tbody tr:not([children-state])"));
     let s="";
     return u(n,(e=>{
      s+=`<tr style="height: ${e.offsetHeight+Ke}">${e.outerHTML}</tr>`
     })), {class:t.get(0).className,th:o.get(0).outerHTML,tbody:s}
    }

    updateDrag(e,t,o,n,s,r,i){
     if(t&&r.offset().left<t.offset().left){
      let o=St(t,e);
      t.before(n), u(s,((e,t)=>{
       o.eq(t).before(e)
      })), xt(e,t).before(xt(e,n)), jt(e), i=Ct(e)
     }
     if(o&&r.offset().left+r.width()>o.offset().left){
      let t=St(o,e);
      o.after(n), u(s,((e,o)=>{
       t.eq(o).after(e)
      })), xt(e,o).after(xt(e,n)), jt(e), i=Ct(e)
     }
     return i
    }

    destroy(e){
     Et(mr[e])
    }
   }

   vr([Ho(fr())],br.prototype,"createHtml",null);
   const yr=new br;
   const xr=new class{
    init(e){
     Ko[e]=(e=>({openMenu:ct("contextmenu",`[${ee}="${e}"]`),closeMenu:ct("mousedown.closeMenu","body")}))(e);
     const {openMenu:t,closeMenu:o}=Ko[e];
     Q(t.target).on(t.events,(function(n){
      n.preventDefault(), n.stopPropagation();
      const s=n.target,i=tn(e,s);
      i.show(), i.css(((e,t,o,n)=>{
       const s=r.documentElement,i=r.body,a=s.offsetHeight,c=s.offsetWidth,l=i.scrollTop||s.scrollTop,
        d=i.scrollLeft||s.scrollLeft;
       return {top:(a-l<n+t?n-t:n)+l,left:(c-d<o+e?o-e:o)+d}
      })(i.width(),i.height(),n.clientX,n.clientY)), i.on(t.events,(function(e){
       e.preventDefault(), e.stopPropagation()
      }));
      const a=Q(o.target),c=o.events;
      a.off(c), a.on(c,(function(t){
       const o=Q(t.target);
       o.attr(se)||1===o.closest("[grid-master]").length||en(e)
      }))
     }))
    }

    destroy(e){
     Et(Ko[e]), Q(Zo(e)).remove()
    }
   };
   const wr=new class{
    init(e){
     const {autoPlayConfig:t}=Oo(e),{interval:o,step:n}=t,s=ft(e);
     let r;
     this.siv&&clearInterval(this.siv), this.siv=setInterval((()=>{
      r=s.scrollTop(), s.scrollTop(r+n)
     }),1e3*o)
    }

    start(e){
     this.init(e)
    }

    stop(e){
     clearInterval(this.siv)
    }
   },kr=(e,t)=>{
    if(t||(t=Oo(e)), t.rendered) return !0;
    zt(`run failed，please check ${e} had been init`)
   };
   let Cr={};
   const $r={};

   class Tr{
    constructor(e,t,o){
     if("TABLE"!==e.nodeName) return void qt('nodeName !== "TABLE"');
     Me.forEach((t=>{
      e["__"+t]=e.getAttribute(t)
     }));
     let n=Q(e),s=(t=S(!0,{},Tr.defaultOption,t)).gridManagerName;
     if(m(s)?n.attr(Z,s):s=t.gridManagerName=ht(e), !m(s)) return void qt("gridManagerName undefined");
     let r=Tr.get(s);
     if(r.rendered&&Tr.destroy(s), $r[s]&& !vo[s]) return;
     if($r[s]&&vo[s]&&(clearInterval(vo[s]), delete vo[s]), $r[s]= !0, !t||w(t)) return void qt("init method params error");
     if(!C(t.columnData)) return void qt("columnData invalid");
     if(!t.ajaxData) return void qt("ajaxData undefined");
     x(t.fullColumn)&&(v(t.fullColumn.topTemplate)||v(t.fullColumn.bottomTemplate))&&(t.supportConfig= !1, t.supportDrag= !1, t.supportMoveRow= !1, t.supportTreeData= !1, t.__isFullColumn= !0, delete t.virtualScroll), t.supportTreeData&&(t.supportMoveRow= !1, t.__isFullColumn= !1, delete t.virtualScroll), t.columnData.some((e=>C(e.children)))&&(t.supportConfig= !1, t.supportDrag= !1, t.supportAdjust= !1, t.disableLine= !1, t.supportMoveRow= !1, t.__isNested= !0), (()=>{
      const e=go(be),t=uo.version;
      e||fo(be,t), e&&e!==t&&(So(), fo(be,t))
     })(), r=Mo(t,zn.getColumn.bind(zn),Ks.getColumn.bind(Ks),pr.getColumn.bind(pr),Wn.getColumn.bind(Wn)), Ve(r._);
     const i=()=>{
      g(n.attr(ye))||setTimeout((()=>{
       To(r), n.removeAttr(ye)
      }),1e3), r=Oo(s), delete $r[s], n.addClass("gm-ready"), r.rendered= !0, _o(r);
      const e=()=>{
       v(o)&&o(r.query)
      };
      r.firstLoading?us.refresh(s,(()=>{
       e()
      })):(rs(r,!0), e()), tr.update(r._)
     },a=()=>{
      n=gt(s), e=n.get(0);
      const t=h(e,"width");
      if(!t||"0px"===t|| -1===t.indexOf(Ke)) return !0;
      clearInterval(vo[s]), delete vo[s], this.initTable(n,r).then(i)
     };
     a()&&(clearInterval(vo[s]), vo[s]=setInterval((()=>{
      a()
     }),50))
    }

    static get version(){
     return uo.version
    }

    static get defaultOption(){
     return Cr
    }

    static set defaultOption(e){
     Cr=e
    }

    static mergeDefaultOption(e){
     Cr=S(Cr,e)
    }

    static get(e){
     return Oo(ht(e))
    }

    static getLocalStorage(e){
     return $o(ht(e))
    }

    static resetLayout(e,t,o){
     const n=ht(e),s=Oo(n);
     kr(n,s)&&(s.width=t, s.height=o, _o(s), Ht(s), tr.update(n))
    }

    static clear(e){
     const t=ht(e);
     return kr(t)&&So(t)
    }

    static getTableData(e){
     const t=ht(e);
     return kr(t)&&yo(t)
    }

    static getRowData(e,t){
     const o=ht(e);
     return kr(o)&&bo(o,t)
    }

    static setSort(e,t,o,n){
     const s=ht(e);
     kr(s)&&xn(s,t,o,n)
    }

    static setConfigVisible(e,t){
     const o=ht(e),n=Oo(o);
     if(kr(o,n)) if(n.supportConfig) switch(t){
      case!0:
       Qs.show(o);
       break;
      case!1:
       Qs.hide(o);
       break;
      case void 0:
       Qs.toggle(o)
     } else qt("supportConfig!==true")
    }

    static showTh(e,t){
     const o=ht(e);
     kr(o)&&Oo(o).supportConfig&&(Dt(o,t,!0), Qs.update(o))
    }

    static hideTh(e,t){
     const o=ht(e);
     kr(o)&&Oo(o).supportConfig&&(Dt(o,t,!1), Qs.update(o))
    }

    static exportGrid(e,t,o){
     const n=ht(e);
     return kr(n)&&Go.exportGrid(n,t,o)
    }

    static setQuery(e,t,o,n){
     const s=ht(e),r=Oo(s);
     if(!kr(s,r)) return;
     const {columnMap:i,pageData:a,currentPageKey:c}=r;
     x(t)||(t={}), y(o)||b(o)||(n=o, o= !0), r._filter&&u(i,((e,o)=>{
      o.filter&&(o.filter.selected=m(t[e])?t[e]:"", jn.update(wt(s,e),o.filter))
     })), S(r,{query:t}), !0===o&&(a[c]=1), b(o)&&(a[c]=o), _o(r), us.refresh(s,n)
    }

    static setAjaxData(e,t,o){
     const n=ht(e),s=Oo(n);
     kr(n,s)&&(S(s,{ajaxData:t}), xo(n,[]), _o(s), us.refresh(n,o))
    }

    static refreshGrid(e,t,o){
     const n=ht(e),s=Oo(n);
     kr(n,s)&&(y(t)||(o=t, t= !1), t&&(s.pageData[s.currentPageKey]=1, _o(s)), us.refresh(n,o))
    }

    static async renderGrid(e,t){
     const o=ht(e);
     let n=Oo(o);
     if(kr(o,n)){
      if(C(t)){
       t=jo(t);
       S(!0,n,Do({columnData:t})), Ao(n,zn.getColumn.bind(zn),Ks.getColumn.bind(Ks),pr.getColumn.bind(pr),Wn.getColumn.bind(Wn)), await ss(n), Ht(n), At(n,!0), n._fixed&&lr.init(n), _o(n), tr.update(o)
      }
      const {dataKey:e,totalsKey:s,pageData:r}=n,i={[e]:yo(o),[s]:r.tSize||0};
      xo(o,[]), us.driveDomForSuccessAfter(n,i)
     }
    }

    static resetSettings(e,t){
     const o=ht(e);
     kr(o,t)&&_o(t)
    }

    static updateTemplate(e){
     return Do(e)
    }

    static getCheckedTr(e){
     const t=ht(e);
     return kr(t)&&Ks.getCheckedTr(t)
    }

    static getCheckedData(e){
     const t=ht(e);
     return kr(t)&&wo(t)
    }

    static setCheckedData(e,t){
     const o=ht(e),n=Oo(o);
     if(kr(o,n)){
      const e=k(t)?t:[t],{columnMap:s,checkboxConfig:r,treeConfig:i,supportMenu:a}=n,c=i.treeKey,l=yo(o),{
       key:d,useRadio:u,max:h
      }=r;
      l.forEach((t=>{
       let o=lt(s,t,[c]);
       t.gm_checkbox=e.some((e=>Kt(o,lt(s,e,[c]),d)))
      })), xo(o,l), ko(o,e,!0), a&&en(o), zs(o,l,u,h)
     }
    }

    static updateRowData(e,t,o){
     const n=ht(e),s=Oo(n);
     if(kr(n,s)){
      const {columnMap:e,supportCheckbox:r,supportTreeData:i,treeConfig:a,rowRenderHandler:c}=s,l=k(o)?o:[o],d=yo(n),
       u=a.treeKey,h=(e,o)=>{
        e.some(((e,n)=>{
         if(e[t]===o[t]) return S(e,c(S(e,o),n)), !0;
         if(i){
          const t=e[u];
          if(t&&t.length) return h(t,o)
         }
        }))
       };
      return l.forEach((e=>{
       h(d,e)
      })), r&&((e,t,o,n)=>{
       uo.checkedData[e]&&(uo.checkedData[e]=uo.checkedData[e].map((e=>(n.forEach((n=>{
        e[o]===n[o]&&S(e,lt(t,n))
       })), e))))
      })(n,e,t,l), us.changeTableData(n,d,!1,!0), d
     }
    }

    static updateTreeState(e,t){
     const o=ht(e);
     kr(o)&&Qn.updateDOM(o,t)
    }

    static cleanData(e){
     const t=ht(e);
     kr(t)&&(xo(t,[]), this.renderGrid(t))
    }

    static print(e){
     const t=ht(e);
     kr(t)&&Qo(t)
    }

    static showLoading(e){
     const t=ht(e),o=Oo(t);
     kr(t,o)&&dt(t,o.loadingTemplate)
    }

    static hideLoading(e,t){
     const o=ht(e);
     kr(o)&&ut(o,t)
    }

    static showRow(e,t){
     const o=ht(e);
     kr(o)&&((e,t)=>{
      let o;
      o=g(t)?Q("[gm-row-hide]"):Xo(t), o.attr(qe,"out"), setTimeout((()=>{
       o.removeAttr(qe), Vo(e._,e.columnMap)
      }),500)
     })(Oo(o),t)
    }

    static hideRow(e,t){
     const o=ht(e);
     kr(o)&&b(t)&&Yo(Oo(o),t)
    }

    static setLineHeight(e,t){
     const o=ht(e);
     kr(o)&&m(t)&&Rt(o,t)
    }

    static startAutoPlay(e){
     const t=ht(e);
     kr(t)&&wr.start(t)
    }

    static stopAutoPlay(e){
     const t=ht(e);
     kr(t)&&wr.stop(t)
    }

    async initTable(e,t){
     await us.createDOM(e,t);
     const {_:o}=t;
     t.supportAdjust&&hr.init(o), t.supportDrag&&yr.init(o), t.supportMoveRow&&zn.init(o), t.supportCheckbox&&Ks.init(o), t._sort&&kn.init(o), t._remind&&dn.init(o), t._filter&&jn.init(o), t.supportConfig&&Qs.init(o), t.supportMenu&&xr.init(o), t.supportAjaxPage&&Ss.init(t), t.supportTreeData&&Qn.init(o), t.__isFullColumn&&Wn.init(o), t._fixed&&lr.init(t), t.supportAutoPlay&&wr.init(o), At(t,!0), _o(t), t.__isNested?ns.addSign(o):jt(o), Pt(o);
     const n=vt(o).find("tr"),s=n.height();
     n.height(s), bt(o).find("tr").height(s), u((e=>Ue(e,"allTh",`[${re}="${e}"] th`))(o),(e=>{
      e.innerHTML=""
     })), Po(o)
    }

    static destroy(e){
     const t=ht(e);
     try{
      hr.destroy(t), Ss.destroy(t), Ks.destroy(t), Qs.destroy(t), us.destroy(t), yr.destroy(t), vs.destroy(t), jn.destroy(t), xr.destroy(t), zn.destroy(t), dn.destroy(t), tr.destroy(t), kn.destroy(t), Qn.destroy(t), lr.destroy(t), Wn.destroy(t)
     }catch(e){
      console.error(e)
     }
     delete $r[t], (e=>{
      delete uo.responseData[e], delete uo.checkedData[e], delete uo.settings[e], clearInterval(vo[e]), clearInterval(mo[e]), delete vo[e], delete mo[e]
     })(t), Ve(t)
    }
   }

   Element.prototype.GM=Element.prototype.GridManager=function(){
    let e,t,o,n;
    const s=arguments;
    if(m(s[0])?(e=s[0], t=s[1], o=s[2], n=s[3]):(e="init", t=s[0], o=s[1]), "init"!==e) return Tr[e](this,t,o,n)||this;
    new Tr(this,t,o)
   }, s.GridManager||s.GM||(s.GridManager=s.GM=Tr), (e=>{
    if(!e) return;
    const t=function(){
     return this.get(0).GM(...arguments)
    };
    e.fn.extend({GridManager:t,GM:t}), s.$=e
   })(s.jQuery);
   const Sr=Tr
  })(), n
 })()
}));