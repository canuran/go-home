!function (e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var o = t();
        for (var n in o) ("object" == typeof exports ? exports : e)[n] = o[n]
    }
}(self, (function () {
    return (() => {
        var e = {
            956: e => {
                e.exports = '<div class="gm-toolbar" {{vm.keyName}}="{{vm.gridManagerName}}"><span class="refresh-action"><i class="gm-icon gm-icon-refresh"></i></span><div class="goto-page">{{ vm.gotoFirstText }}<input type="text" class="gp-input" current-page-info/>{{ vm.gotoLastText }}</div><div class="change-size">{{ vm.pageSizeOptionTpl }}</div><div class="toolbar-info checked-info"></div><div class="toolbar-info page-info"></div><div class="pagination"><ul pagination-before><li class="first-page">{{ vm.firstPageText }}</li><li class="previous-page">{{ vm.previousPageText }}</li></ul><ul pagination-number></ul><ul pagination-after><li class="next-page">{{ vm.nextPageText }}</li><li class="last-page">{{ vm.lastPageText }}</li></ul></div></div>'
            }, 976: e => {
                e.exports = "<label class=\"gm-checkbox-wrapper{{vm.disabled ? ' disabled-radio-checkbox' : ''}}\"><span class=\"gm-radio-checkbox gm-checkbox{{vm.checked === 'checked' ? ' gm-checkbox-checked' : ''}}\"><input type=\"checkbox\" class=\"gm-radio-checkbox-input gm-checkbox-input\"{{vm.value ? ' value=\"' + vm.value + '\"' : ''}}{{vm.checked === 'checked' ? ' checked=\"true\"' : ''}}/><span class=\"gm-radio-checkbox-inner gm-checkbox-inner\"></span></span>{{vm.label ? '<span class=\"gm-radio-checkbox-label\">' + vm.label + '</span>' : ''}}</label>"
            }, 692: e => {
                e.exports = "<td gm-create gm-checkbox>{{vm.template}}</td>"
            }, 963: e => {
                e.exports = "<label class=\"gm-radio-wrapper{{vm.disabled ? ' disabled-radio-checkbox' : ''}}\"><span class=\"gm-radio-checkbox gm-radio{{vm.checked ? ' gm-radio-checked' : ''}}\"><input type=\"radio\" class=\"gm-radio-checkbox-input gm-radio-input\"{{vm.value ? ' value=\"' + vm.value + '\"' : ''}}{{vm.checked ? ' checked=\"true\"' : ''}}/><span class=\"gm-radio-checkbox-inner gm-radio-inner\"></span></span>{{vm.label ? '<span class=\"gm-radio-checkbox-label\">' + vm.label + '</span>' : ''}}</label>"
            }, 271: e => {
                e.exports = '<div class="gm-config-area" {{vm.key}}><span class="config-action"><i class="gm-icon gm-icon-close"></i></span><div class="config-info">{{vm.info}}</div><ul class="config-list"></ul></div>'
            }, 125: e => {
                e.exports = '<th {{vm.thAttr}}><div class="th-wrap"><span class="{{vm.thTextClassName}}" {{vm.compileAttr}}>{{vm.thText}}</span>\t\t{{vm.remindHtml}}\t\t{{vm.sortHtml}}\t\t{{vm.filterHtml}}\t\t{{vm.adjustHtml}}</div></th>'
            }, 985: e => {
                e.exports = '<div class="{{vm.classNames}}" {{vm.wrapKey}}><div class="table-header"></div><div class="table-div" {{vm.divKey}}></div><span class="text-dreamland"></span>{{vm.configTpl}} {{vm.ajaxPageTpl}}</div>'
            }, 909: e => {
                e.exports = '<table class="dreamland-table {{vm.class}}"><thead><tr>{{vm.th}}</tr></thead><tbody>{{vm.tbody}}</tbody></table>'
            }, 986: e => {
                e.exports = '<div class="gm-dropdown"><span class="gm-dropdown-text"></span><span class="gm-dropdown-icon"></span><ul class="gm-dropdown-list">{{vm.li}}</ul></div>'
            }, 285: e => {
                e.exports = '<div class="gm-filter-area"><i class="fa-icon gm-icon gm-icon-filter{{vm.icon}}"></i><div class="fa-con"><ul class="filter-list" {{vm.style}}>{{vm.list}}</ul><div class="filter-bottom"><span class="filter-button filter-submit">{{vm.ok}}</span><span class="filter-button filter-reset">{{vm.reset}}</span></div></div></div>'
            }, 763: e => {
                e.exports = '<table class="dreamland-row {{vm.class}}"><tbody>{{vm.tbody}}</tbody></table>'
            }, 923: e => {
                e.exports = '<div class="gm-remind-action"><i class="ra-icon gm-icon gm-icon-help"></i><div class="ra-area"{{vm.style}}>{{vm.text}}</div></div>'
            }, 472: e => {
                e.exports = '<div class="gm-sorting-action{{vm.typeClass}}"><i class="sa-icon sa-up gm-icon gm-icon-up"></i><i class="sa-icon sa-down gm-icon gm-icon-down"></i></div>'
            }
        }, t = {};

        function o(n) {
            var s = t[n];
            if (void 0 !== s) return s.exports;
            var r = t[n] = {exports: {}};
            return e[n](r, r.exports, o), r.exports
        }

        o.n = e => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return o.d(t, {a: t}), t
        }, o.d = (e, t) => {
            for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
        }, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        };
        var n = {};
        return (() => {
            "use strict";
            o.r(n), o.d(n, {default: () => Cr, jTool: () => Q});
            const e = "jTool-create-dom", t = {
                    "[object String]": "string",
                    "[object Boolean]": "boolean",
                    "[object Undefined]": "undefined",
                    "[object Number]": "number",
                    "[object Object]": "object",
                    "[object Error]": "error",
                    "[object Function]": "function",
                    "[object Date]": "date",
                    "[object Array]": "array",
                    "[object RegExp]": "regexp",
                    "[object Null]": "null",
                    "[object NodeList]": "nodeList",
                    "[object Arguments]": "arguments",
                    "[object Window]": "window",
                    "[object HTMLDocument]": "document"
                }, s = window, r = s.document, a = e => e && e === e.window,
                i = e => e instanceof Element ? "element" : t[Object.prototype.toString.call(e)], c = () => {
                }, l = e => e.jTool, d = (e, t) => {
                    const o = e.DOMList;
                    if (!g(o)) return b(t) ? o[t] : o
                }, u = (e, t) => {
                    if (e && (!l(e) || (e = d(e), !g(e))) && (g(e.length) || [].every.call(e, ((e, o) => (!a(e) && l(e) && (e = e.get(0)), !1 !== t.call(e, e, o)))), x(e))) for (const o in e) {
                        const n = e[o];
                        if (!1 === t.call(n, o, n)) break
                    }
                }, h = (e, t) => getComputedStyle(e)[t], p = t => {
                    let o = r.querySelector(`#${e}`);
                    if (!o) {
                        const t = r.createElement("table");
                        t.id = e, t.style.display = "none", r.body.appendChild(t), o = r.querySelector(`#${e}`)
                    }
                    o.innerHTML = g(t) ? "" : t;
                    let n = o.childNodes;
                    if (1 === n.length) {
                        const e = n[0], o = e.nodeName, s = e.childNodes;
                        (!/<tbody|<TBODY/.test(t) && "TBODY" === o || !/<thead|<THEAD/.test(t) && "THEAD" === o || !/<tr|<TR/.test(t) && "TR" === o || !/<td|<TD/.test(t) && "TD" === o || !/<th|<TH/.test(t) && "TH" === o) && (n = s)
                    }
                    return r.body.removeChild(o), n
                }, g = e => "undefined" === i(e), f = e => "null" === i(e), m = e => "string" === i(e),
                v = e => "function" === i(e), b = e => "number" === i(e), y = e => "boolean" === i(e),
                x = e => "object" === i(e), w = e => {
                    let t = !0;
                    for (const o in e) e.hasOwnProperty(o) && (t = !1);
                    return t
                }, k = e => "array" === i(e), C = e => k(e) && e.length > 0, $ = e => "element" === i(e),
                T = e => "nodeList" === i(e);

            function S(...[]) {
                if (0 === arguments.length) return {};
                let e, t = !1, o = 1, n = arguments[0];
                for (1 === arguments.length && x(arguments[0]) ? (n = this, o = 0) : 2 === arguments.length && y(arguments[0]) ? (t = arguments[0], n = this, o = 1) : arguments.length > 2 && y(arguments[0]) && (t = arguments[0], n = arguments[1] || {}, o = 2); o < arguments.length; o++) e = arguments[o] || {}, s(e, n);

                function s(e, o) {
                    for (let n in e) e.hasOwnProperty(n) && (t && x(e[n]) ? (x(o[n]) || (o[n] = {}), s(e[n], o[n])) : o[n] = e[n])
                }

                return n
            }

            const D = {isWindow: a, noop: c, type: i, getStyle: h, isEmptyObject: w, each: u}, j = function (e, t) {
                let o = (() => {
                    if (!e) return void (e = null);
                    if (a(e) || e === r || $(e)) return [e];
                    if (T(e) || k(e)) return e;
                    if (l(e)) return e.DOMList;
                    if (/<.+>/.test(e)) return p(e.trim());
                    if (!t) return r.querySelectorAll(e);
                    m(t) && (t = r.querySelectorAll(t)), $(t) && (t = [t]), l(t) && (t = t.DOMList);
                    const o = [];
                    return u(t, (t => {
                        u(t.querySelectorAll(e), (e => {
                            e && o.push(e)
                        }))
                    })), o
                })();
                return o && 0 !== o.length || (o = void 0), this.jTool = !0, this.DOMList = o, this.length = o ? o.length : 0, this.querySelector = e, this
            }, A = "Content-Type", M = "application/x-www-form-urlencoded";

            function O(e) {
                if (!x(e)) return e;
                let t = "";
                return u(e, ((e, o) => {
                    t && (t += "&"), t += e + "=" + o
                })), t
            }

            function _(e) {
                let {
                    url: t,
                    type: o,
                    data: n,
                    headers: s,
                    async: r,
                    xhrFields: a,
                    beforeSend: i,
                    complete: l,
                    success: d,
                    error: u
                } = S({
                    url: null,
                    type: "GET",
                    data: null,
                    headers: {},
                    async: !0,
                    xhrFields: {},
                    beforeSend: c,
                    complete: c,
                    success: c,
                    error: c
                }, e);
                o = o.toUpperCase();
                const h = new XMLHttpRequest;
                let p;
                "GET" === o && n && (t = t + (-1 === t.indexOf("?") ? "?" : "&") + O(n)), "POST" === o && (s[A] || (s[A] = M), 0 === s[A].indexOf(M) && (p = O(n)), 0 === s[A].indexOf("application/json") && (p = JSON.stringify(n))), h.open(o, t, r);
                for (const e in a) h[e] = a[e];
                for (const e in s) h.setRequestHeader(e, s[e]);
                i(h), h.onload = () => {
                    l(h, h.status)
                }, h.onreadystatechange = function () {
                    if (4 !== h.readyState) return;
                    const e = h.status;
                    e >= 200 && e < 300 || 304 === e ? d(h.response, e) : u(h, e, h.statusText)
                }, h.send(p)
            }

            const P = e => e.jToolEvent || {}, H = (e, t, o, n, s) => {
                    if (v(o) && (s = n || !1, n = o, o = void 0), o && $(e[0]) || (o = ""), "" !== o) {
                        const e = n;
                        n = function (t) {
                            let n = t.target;
                            for (; n && n !== this;) {
                                if (-1 !== [].indexOf.call(this.querySelectorAll(o), n)) {
                                    e.apply(n, arguments);
                                    break
                                }
                                n = n.parentNode
                            }
                        }
                    }
                    const r = t.split(" "), a = [];
                    return u(r, (e => {
                        e.trim() && a.push({
                            eventName: e + o,
                            type: e.split(".")[0],
                            querySelector: o,
                            callback: n || c,
                            useCapture: s || !1
                        })
                    })), a
                }, E = {
                    on: function (e, t, o, n) {
                        return this.addEvent(H(d(this), e, t, o, n))
                    }, off: function (e, t) {
                        return this.removeEvent(H(d(this), e, t))
                    }, bind: function (e, t, o) {
                        return this.on(e, void 0, t, o)
                    }, unbind: function (e) {
                        return this.removeEvent(H(d(this), e))
                    }, trigger: function (e) {
                        return u(this, (t => {
                            try {
                                const o = P(t)[e];
                                if (o && o.length > 0) {
                                    const o = new Event(e);
                                    t.dispatchEvent(o)
                                } else "click" === e && t[e]()
                            } catch (t) {
                                console.error(`Event:[${e}] error`, t)
                            }
                        })), this
                    }, addEvent: function (e) {
                        return u(e, (e => {
                            u(this, (t => {
                                const o = P(t), {eventName: n, type: s, callback: r, useCapture: a} = e;
                                o[n] = o[n] || [], o[n].push(e), t.jToolEvent = o, t.addEventListener(s, r, a)
                            }))
                        })), this
                    }, removeEvent: function (e) {
                        return u(e, (e => {
                            u(this, (t => {
                                const o = P(t), n = e.eventName, s = o[n];
                                s && (u(s, (e => {
                                    t.removeEventListener(e.type, e.callback)
                                })), delete o[n])
                            }))
                        })), this
                    }
                },
                R = e => ["width", "max-width", "height", "top", "left", "right", "bottom", "padding", "margin"].some((t => -1 !== e.indexOf(t)));

            function z(e, t, o) {
                f(o) || g(o) || (b(o) && (o = o.toString()), -1 === o.indexOf("px") && R(t) && (o += "px"), u(e, (e => {
                    e.style[t] = o
                })))
            }

            const L = {
                css: function (e, t) {
                    const o = d(this);
                    if (m(e) && g(t)) {
                        const t = h(o[0], e);
                        return R(e) ? parseFloat(t) : t
                    }
                    if (x(e)) for (const t in e) z(o, t, e[t]); else z(o, e, t);
                    return this
                }, width: function (e) {
                    return this.css("width", e)
                }, height: function (e) {
                    return this.css("height", e)
                }
            };

            function N(e, t, o) {
                const n = function (e) {
                    return e.indexOf(" ") ? e.split(" ") : [e]
                }(t);
                u(e, (e => {
                    u(n, (t => {
                        e.classList[o](t)
                    }))
                }))
            }

            const q = {
                addClass: function (e) {
                    return N(d(this), e, "add"), this
                }, removeClass: function (e) {
                    return N(d(this), e, "remove"), this
                }, hasClass: function (e) {
                    return [].some.call(d(this), (function (t) {
                        return t.classList.contains(e)
                    }))
                }
            }, K = {
                append: function (e) {
                    return this.html(e, "append")
                }, prepend: function (e) {
                    return this.html(e, "prepend")
                }, before: function (e) {
                    l(e) && (e = d(e, 0));
                    const t = d(this, 0);
                    return t.parentNode.insertBefore(e, t), this
                }, after: function (e) {
                    l(e) && (e = d(e, 0));
                    const t = d(this, 0), o = t.parentNode;
                    o.lastChild === t ? o.appendChild(e) : o.insertBefore(e, t.nextSibling)
                }, text: function (e) {
                    return g(e) ? d(this, 0).textContent : (u(this, (t => {
                        t.textContent = e
                    })), this)
                }, html: function (e, t) {
                    const o = d(this);
                    if (g(e) && g(t)) return o[0].innerHTML;
                    let n;
                    return l(e) && (e = d(e)), (m(e) || b(e)) && (e = p(e)), $(e) && (e = [e]), u(o, (o => {
                        t || (o.innerHTML = ""), "prepend" === t && (n = o.firstChild), u(e, (e => {
                            e = e.cloneNode(!0), n ? o.insertBefore(e, n) : o.appendChild(e), o.normalize()
                        }))
                    })), this
                }, wrap: function (e, t) {
                    const o = p(e)[0], n = d(this, 0);
                    n.parentNode.insertBefore(o, n), o.querySelector(t).appendChild(n)
                }, closest: function (e) {
                    const t = d(this, 0);
                    return g(e) ? new j(t.parentNode) : new j(t.closest(e))
                }, parent: function () {
                    return this.closest()
                }, clone: function (e) {
                    return new j(d(this, 0).cloneNode(e || !1))
                }, remove: function () {
                    u(this, (e => {
                        e.remove()
                    }))
                }
            }, B = (e, t, o) => {
                const n = {top: "scrollTop", left: "scrollLeft"}[o];
                if (9 === e.nodeType && (e = e.body), !b(t)) return e[n];
                e[n] = t
            }, F = {
                offset: function () {
                    let e = {top: 0, left: 0};
                    const t = d(this, 0);
                    if (!t.getClientRects().length) return e;
                    if ("none" === h(t, "display")) return e;
                    e = t.getBoundingClientRect();
                    const o = t.ownerDocument.documentElement;
                    return {top: e.top + pageYOffset - o.clientTop, left: e.left + pageXOffset - o.clientLeft}
                }, scrollTop: function (e) {
                    return B(d(this, 0), e, "top")
                }, scrollLeft: function (e) {
                    return B(d(this, 0), e, "left")
                }
            }, I = {
                get: function (e) {
                    return d(this, e)
                }, eq: function (e) {
                    return new j(d(this, e))
                }, find: function (e) {
                    return new j(e, this)
                }, index: function (e) {
                    const t = d(this, 0);
                    return e ? l(e) && (e = d(e)) : e = t.parentNode.children, e ? [].indexOf.call(e, t) : -1
                }
            }, G = "inline-block", W = "table-cell", J = {
                TABLE: "table",
                THEAD: "table-header-group",
                TBODY: "table-row-group",
                TR: "table-row",
                TH: W,
                TD: W,
                SPAN: G,
                A: G,
                FONT: G,
                BUTTON: G,
                I: G
            }, U = {
                animate: function (e, t = 0, o = c) {
                    let n = "", s = "", a = d(this, 0);
                    u(e, ((e, t) => {
                        n += e + ":" + h(a, e) + ";", s += e + ":" + t + ";"
                    }));
                    const i = `@keyframes jToolAnimate {from {${n}}to {${s}}}`, l = r.createElement("style");
                    l.type = "text/css", r.head.appendChild(l), l.textContent = l.textContent + i, a.style.animation = `jToolAnimate ${t / 1e3}s ease-in-out forwards`, setTimeout((() => {
                        L.css.call(this, e), a.style.animation = "", r.head.removeChild(l), o()
                    }), t)
                }, show: function () {
                    return u(this, (e => {
                        e.style.display = J[e.nodeName] || "block"
                    })), this
                }, hide: function () {
                    return u(this, (e => {
                        e.style.display = "none"
                    })), this
                }
            }, V = e => f(e) ? void 0 : e, Y = {
                attr: function (e, t) {
                    return g(t) ? V(d(this, 0).getAttribute(e)) : (u(this, (o => {
                        o.setAttribute(e, t)
                    })), this)
                }, removeAttr: function (e) {
                    u(this, (t => {
                        t.removeAttribute(e)
                    }))
                }, prop: function (e, t) {
                    return g(t) ? V(d(this, 0)[e]) : (u(this, (o => {
                        o[e] = t
                    })), this)
                }, val: function (e) {
                    return this.prop("value", e) || ""
                }
            }, X = function (e, t) {
                return new j(e, t)
            };
            j.prototype = X.prototype = {}, X.extend = X.prototype.extend = S, X.extend(D), X.ajax = _, u([E, L, q, K, F, I, U, Y], (e => {
                X.prototype.extend(e)
            })), window.jTool = X;
            const Q = X, Z = "grid-manager", ee = "grid-manager-wrap", te = "grid-manager-div",
                oe = "grid-manager-config", ne = "grid-manager-toolbar", se = "grid-master", re = "grid-manager-thead",
                ae = "grid-manager-mock-thead", ie = "grid-manager-tbody", ce = "th-name", le = "gm-row-index",
                de = "gm-tr-row", ue = "gm-cache-key", he = "gm-level-key", pe = "parent-key", ge = "children-state",
                fe = "gm-focus-td", me = "gm_row_class_name", ve = "GridManagerMemory", be = "GridManagerVersion",
                ye = "grid-manager-cache-error", xe = "gm_fold", we = "gm_order", ke = "gm_moverow", Ce = "gm_checkbox",
                $e = "no-select-text", Te = "empty-data", Se = "gm-load-area", De = "last-visible", je = "cell-hidden",
                Ae = "gm-create", Me = ["class", "style"], Oe = "checked", _e = "indeterminate", Pe = "unchecked",
                He = "gm-checkbox-checked", Ee = "gm-checkbox-indeterminate", Re = "disabled", ze = "gm-remind-action",
                Le = "gm-sorting-action", Ne = "disableCustomize", qe = "gm-row-hide", Ke = "px",
                Be = e => [`background:${e};height:18px;line-height:18px;padding:1px;border-radius:3px 0 0 3px;color:#fff`, "background:#169fe6;height:18px;line-height:18px;padding:1px;border-radius:0 3px 3px 0;color:#fff"],
                Fe = "Info", Ie = "Warn", Ge = "Error", We = {[Fe]: Be("#333"), [Ie]: Be("#f90"), [Ge]: Be("#f00")},
                Je = {[Z]: {}, [te]: {}, [ee]: {}, [re]: {}, [ae]: {}, [ie]: {}, allTh: {}, allFakeTh: {}},
                Ue = (e, t, o) => {
                    const n = Je[t];
                    return n[e] || (n[e] = Q(o || `[${t}="${e}"]`)), n[e]
                }, Ve = e => {
                    for (let t in Je) delete Je[t][e]
                }, Ye = "filter-selected", Xe = "fa-con", Qe = "click", Ze = "mousedown", et = "mousemove", tt = "mouseup",
                ot = "mouseleave", nt = "scroll", st = "events", rt = "target", at = "selector",
                it = (e, t, o) => ({[st]: e, [rt]: t, [at]: o}), ct = (e, t, o) => {
                    let n = S(!0, {}, t);
                    for (let t in e) e[t].isAutoCreate && delete n[t];
                    return delete n.gm_checkbox_disabled, delete n[ue], delete n[le], delete n[he], delete n[me], o && o.forEach((e => delete n[e])), n
                }, lt = (e, t) => {
                    const o = ft(e), n = o.find(".gm-load-area");
                    n.length > 0 && n.remove();
                    const s = Q(t);
                    s.addClass(Se), o.append(s)
                }, dt = (e, t) => {
                    setTimeout((() => {
                        Q(".gm-load-area", ft(e)).remove()
                    }), t || 0)
                }, ut = e => m(e) ? e : e.getAttribute(Z), ht = e => `[grid-manager="${e}"]`, pt = e => Ue(e, Z),
                gt = e => Ue(e, te), ft = e => Ue(e, ee), mt = e => Ue(e, re), vt = e => Ue(e, ae), bt = e => Ue(e, ie),
                yt = (e, t) => (t.jTool && (t = Ct(t)), Q(`[${re}="${e}"] th[th-name="${t}"]`)),
                xt = (e, t) => Q(`[grid-manager-mock-thead="${e}"] th[th-name="${t}"]`),
                wt = e => Q(`[${re}="${e}"] th:not(cell-hidden)`),
                kt = (e, t) => Q(`[grid-manager-mock-thead="${e}"] th:not([cell-hidden])${t ? ":not([gm-create])" : ""}`),
                Ct = e => e.attr(ce), $t = e => Q(`[empty-template="${e}"]`),
                Tt = (e, t) => m(t) ? Q(`tbody tr td:nth-child(${e.index() + 1})`, pt(t)) : Q(`td:nth-child(${e.index() + 1})`, t),
                St = (e, t, o) => {
                    u(k(t) ? t : [t], (t => {
                        const n = yt(e, t), s = xt(e, t), r = Tt(n, e), a = o ? "removeAttr" : "attr";
                        n[a](je, ""), s[a](je, ""), r[a](je, "");
                        const i = Q(`[${oe}="${e}"] li[th-name="${t}"]`);
                        o ? i.addClass("checked-li") : i.removeClass("checked-li"), Q('input[type="checkbox"]', i).prop("checked", o), (e => {
                            const t = $t(e);
                            if (0 === t.length) return;
                            const o = wt(e).length;
                            Q("td", t).attr("colspan", o)
                        })(e)
                    }))
                }, Dt = e => {
                    const t = kt(e), o = t.length - 1, n = t.eq(o);
                    Q(`${ht(e)} [last-visible]`).removeAttr(De), n.attr(De, ""), wt(e).eq(o).attr(De, ""), Tt(n, e).attr(De, "")
                }, jt = (e, t) => {
                    const {_: o, columnMap: n, isIconFollowText: s, __isNested: r} = e;
                    let a = gt(o).width(), i = 0;
                    const c = [], l = [];
                    let d;
                    u(n, ((e, n) => {
                        let {__width: u, width: h, isShow: p, pk: g, children: f} = n;
                        if (p && !g) if (n.disableCustomize) a -= h; else {
                            if (h && "auto" !== h && r && C(f)) {
                                const e = n.colspan;
                                n.width = h = parseInt(h / e, 10) * e
                            }
                            if (t && (!h || "auto" === h) || !t && (!u || "auto" === u)) return n.width = At(o, n, s, r), i += n.width, void (r && C(f) ? l.push(n) : c.push(n));
                            t && (i += h), t || (n.width = u, i += u), (!d || d.index > n.index) && (d = n)
                        }
                    }));
                    const h = c.length, p = l.length;
                    let g = a - i;
                    if (g > 0 && p) {
                        let e = Math.floor(g / (p + h));
                        u(l, (t => {
                            const o = t.colspan;
                            e = parseInt(parseInt(e, 10) / o, 10) * o, t.width = t.width + e, g -= e
                        }))
                    }
                    if (d && g > 0 && !h && (d.width = d.width + g), g > 0 && h) {
                        const e = Math.floor(g / h);
                        u(c, ((t, o) => {
                            o !== h - 1 ? (t.width = t.width + e, g -= e) : t.width = t.width + g
                        }))
                    }
                    u(n, ((e, t) => {
                        t.isShow && t.disableCustomize || t.pk || yt(o, e).width(t.width)
                    }))
                }, At = (e, t, o, n) => {
                    const s = (e, t, o) => {
                        const n = Q(".th-wrap", t), s = Q(".th-text", t), r = Mt(e, s.html(), {
                            fontSize: s.css("font-size"),
                            fontWeight: s.css("font-weight"),
                            fontFamily: s.css("font-family")
                        }), a = n.css("padding-left"), i = n.css("padding-right");
                        let c = 0;
                        if (o) {
                            const e = Q(`.${ze}`, t);
                            e.length && (c += e.width());
                            const o = Q(`.${Le}`, t);
                            o.length && (c += o.width());
                            const n = Q(".gm-filter-area", t);
                            n.length && (c += n.width())
                        }
                        return Math.ceil(r + c + (a || 0) + (i || 0) + 2 + 1)
                    };
                    if (!n || !C(t.children)) return s(e, xt(e, t.key), o);
                    let r = 0, a = 0;
                    const i = t => {
                        t.children.forEach((n => {
                            C(n.children) ? i(n) : (a++, r += s(e, xt(e, t.key), o))
                        }))
                    };
                    return i(t), parseInt(r / a, 10) * a
                }, Mt = (e, t, o) => {
                    const n = Q(`[${ee}="${e}"] .text-dreamland`);
                    return n.html(t), n.css(o), n.width()
                }, Ot = (e, t) => {
                    const {_: o, columnMap: n} = e, s = gt(o);
                    if (!s.length) return;
                    const r = vt(o);
                    if (r.css("left", -s.scrollLeft() + Ke), !t) {
                        let e;
                        for (let t in n) e = n[t].width, xt(o, t).css({width: e, "max-width": e});
                        r.width(mt(o).width())
                    }
                }, _t = e => {
                    const t = gt(e);
                    t.attr("gm-overflow-x", mt(e).width() > t.width())
                }, Pt = e => {
                    const {_: t, width: o, height: n, minHeight: s, maxHeight: r, supportAjaxPage: a} = e, i = ft(t).get(0),
                        c = mt(t).height(), l = c + 1;
                    i.style.width = `calc(${o})`, i.style.height = `calc(${n})`, m(s) && (i.style.minHeight = `calc(${s})`), m(r) && (i.style.maxHeight = `calc(${r})`), i.style.paddingTop = l + Ke, gt(t).get(0).style.height = a ? `calc(100% - ${Q(`[${ne}="${t}"]`).height() + Ke})` : "100%", Q(".table-header", i).height(l), pt(t).css("margin-top", -c)
                }, Ht = e => {
                    for (let t in e) {
                        const o = e[t], n = Q(o.target);
                        n.length && n.off(o.events, o.selector)
                    }
                }, Et = (e, t) => {
                    gt(e).get(0).style.setProperty("--gm-line-height", t)
                }, Rt = (e, t) => {
                    console.log(`%c GridManager ${t} %c ${e} `, ...We[t])
                }, zt = e => {
                    Rt(e, Fe)
                }, Lt = e => {
                    Rt(e, Ie)
                }, Nt = e => {
                    Rt(e, Ge)
                }, qt = (e, t, o) => {
                    const n = Object.keys(e), s = Object.keys(t);
                    return m(o) ? e[o] === t[o] : n.length === s.length && n.every((o => JSON.stringify(e[o]) === JSON.stringify(t[o])))
                }, Kt = e => JSON.parse(JSON.stringify(e)), Bt = {}, Ft = {supportDrag: !0, dragBefore: c, dragAfter: c},
                It = {supportMoveRow: !1, moveRowConfig: {handler: c}},
                Gt = {supportAdjust: !0, adjustBefore: c, adjustAfter: c}, Wt = {supportMenu: !0, menuHandler: e => e},
                Jt = {supportConfig: !0, configInfo: "配置列的显示状态"}, Ut = {
                    width: "100%",
                    height: "300px",
                    lineHeight: "41px",
                    animateTime: 300,
                    disableLine: !1,
                    disableBorder: !1,
                    loadingTemplate: '<section class="gm-loading"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg></div></section>',
                    skinClassName: "",
                    useWordBreak: !1,
                    isIconFollowText: !1
                }, Vt = {rowHover: null, rowClick: null, cellHover: null, cellClick: null}, Yt = {disableCache: !0},
                Xt = {
                    isCombSorting: !1,
                    mergeSort: !1,
                    sortKey: "sort_",
                    sortData: {},
                    sortUpText: "ASC",
                    sortDownText: "DESC",
                    sortMode: "overall",
                    sortingBefore: c,
                    sortingAfter: c
                }, Qt = {
                    supportAjaxPage: !1,
                    useNoTotalsMode: !1,
                    sizeData: [10, 20, 30, 50, 100],
                    pageSize: 20,
                    pageData: {},
                    totalsKey: "totals",
                    currentPageKey: "cPage",
                    pageSizeKey: "pSize",
                    pagingBefore: c,
                    pagingAfter: c
                }, Zt = {supportAutoOrder: !0, autoOrderConfig: {width: 50}}, eo = {
                    supportCheckbox: !0,
                    checkboxConfig: {width: 40},
                    checkedBefore: c,
                    checkedAfter: c,
                    checkedAllBefore: c,
                    checkedAllAfter: c
                }, to = {i18n: "zh-cn"}, oo = {supportTreeData: !1, treeConfig: {treeKey: "children", openState: !1}},
                no = {
                    firstLoading: !0,
                    virtualScroll: {useVirtualScroll: !1, virtualNum: 20},
                    ajaxType: "GET",
                    query: {},
                    ajaxHeaders: {},
                    ajaxXhrFields: {},
                    ajaxBeforeSend: c,
                    ajaxSuccess: c,
                    ajaxComplete: c,
                    ajaxError: c,
                    requestHandler: e => e,
                    responseHandler: e => e,
                    rowRenderHandler: (e, t) => e,
                    dataKey: "data",
                    emptyTemplate: () => '<div class="gm-empty-template">暂无数据</div>'
                }, so = {supportExport: !0, exportConfig: {mode: "static", suffix: "xls", handler: c}},
                ro = {supportPrint: !0};

            function ao() {
                S(!0, this, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({rendered: !1}, Bt), Ft), It), Gt), Wt), Jt), Ut), Yt), Xt), Qt), Zt), eo), to), no), so), ro), oo), Vt))
            }

            function io() {
                const e = this;
                e["order-text"] = {"zh-cn": "序号", "zh-tw": "序號", "en-us": "order"}, e["first-page"] = {
                    "zh-cn": "首页",
                    "zh-tw": "首頁",
                    "en-us": "first"
                }, e["previous-page"] = {
                    "zh-cn": "上一页",
                    "zh-tw": "上一頁",
                    "en-us": "previous"
                }, e["next-page"] = {"zh-cn": "下一页", "zh-tw": "下一頁", "en-us": "next"}, e["last-page"] = {
                    "zh-cn": "尾页",
                    "zh-tw": "尾頁",
                    "en-us": "last"
                }, e["page-info"] = {
                    "zh-cn": '此页显示 {0}-{1}<span class="page-info-totals"> 共{2}条</span>',
                    "zh-tw": '此頁顯示 {0}-{1}<span class="page-info-totals"> 共{2}條</span>',
                    "en-us": 'this page show {0}-{1}<span class="page-info-totals"> count {2}</span>'
                }, e["checked-info"] = {
                    "zh-cn": "已选 {0} 条",
                    "zh-tw": "已選 {0} 條",
                    "en-us": "selected {0}"
                }, e["goto-first-text"] = {
                    "zh-cn": "跳转至",
                    "zh-tw": "跳轉至",
                    "en-us": "goto"
                }, e["goto-last-text"] = {"zh-cn": "页", "zh-tw": "頁", "en-us": "page"}, e.refresh = {
                    "zh-cn": "重新加载", "zh-tw": "重新加載", "en-us": "Refresh"
                }, e.export = {
                    "zh-cn": "导出",
                    "zh-tw": "導出",
                    "en-us": "Export"
                }, e["export-checked"] = {
                    "zh-cn": "导出选中项",
                    "zh-tw": "導出選中項",
                    "en-us": "Export selected"
                }, e.config = {"zh-cn": "配置表", "zh-tw": "配置表", "en-us": "Setting Grid"}, e.print = {
                    "zh-cn": "打印",
                    "zh-tw": "打印",
                    "en-us": "Print"
                }, e.copy = {"zh-cn": "复制", "zh-tw": "復制", "en-us": "Copy"}, e["hide-row"] = {
                    "zh-cn": "隐藏行",
                    "zh-tw": "隱藏行",
                    "en-us": "Hidden Row"
                }, e.ok = {"zh-cn": "确定", "zh-tw": "確定", "en-us": "OK"}, e.reset = {
                    "zh-cn": "重置",
                    "zh-tw": "重置",
                    "en-us": "Reset"
                }
            }

            const co = {version: "3.0.1", responseData: {}, checkedData: {}, settings: {}},
                lo = ["width", "__width", "isShow", "__isShow", "index", "__index"],
                uo = ["__width", "__isShow", "__index"], ho = e => localStorage.getItem(e), po = (e, t) => {
                    localStorage.setItem(e, t)
                }, go = {}, fo = {}, mo = (e, t, o) => {
                    const n = Ao(e), s = e => {
                        let t = e[de];
                        return o ? t : ct(n.columnMap, t)
                    };
                    if ($(t)) return s(t);
                    if (T(t)) {
                        let e = [];
                        return u(t, (t => {
                            e.push(s(t))
                        })), e
                    }
                    return {}
                }, vo = (e, t) => {
                    const o = co.responseData[e] || [];
                    return t ? o : Kt(o)
                }, bo = (e, t) => {
                    co.responseData[e] = t
                }, yo = e => (co.checkedData[e] || []).map((e => S(!0, {}, e))), xo = (e, t, o) => {
                    const {columnMap: n, checkboxConfig: s} = Ao(e);
                    if (o) return void (co.checkedData[e] = t.map((e => ct(n, e))));
                    co.checkedData[e] || (co.checkedData[e] = []);
                    const r = co.checkedData[e], a = s.key, i = r.length > 0, c = [];
                    t.forEach((e => {
                        const t = ct(n, e), o = e.gm_checkbox;
                        let s = -1;
                        i && (s = ((e, t, o) => {
                            let n = -1, s = !1;
                            return e.some(((e, r) => (s = qt(e, t, o), s && (n = r), s))), n
                        })(r, t, a)), o && -1 === s ? c.push(t) : o || -1 === s || r.splice(s, 1)
                    })), co.checkedData[e] = r.concat(c)
                }, wo = e => location.pathname + location.hash + "-" + e, ko = e => {
                    let t = ho(ve);
                    return t && "{}" !== t ? (t = JSON.parse(t), JSON.parse(t[wo(e)] || "{}")) : (pt(e).attr(ye, "error"), {})
                }, Co = e => {
                    const {disableCache: t, _: o, columnMap: n, supportAjaxPage: s, pageData: r, pageSizeKey: a} = e;
                    if (t) return;
                    const i = {};
                    u(n, ((e, t) => {
                        const o = {};
                        lo.forEach((e => {
                            o[e] = t[e]
                        })), i[e] = o
                    }));
                    const c = {column: i};
                    s && (c[a] = r[a]);
                    const l = JSON.stringify(c), d = JSON.parse(ho(ve) || "{}");
                    d[wo(o)] = l, po(ve, JSON.stringify(d))
                }, $o = e => {
                    if (!e) return t = ve, localStorage.removeItem(t), zt("delete user memory of all"), !0;
                    var t;
                    let o = ho(ve);
                    return !!o && (o = JSON.parse(o), delete o[wo(e)], po(ve, JSON.stringify(o)), zt(`delete user memory of ${e}`), !0)
                }, To = e => {
                    const {columnData: t, emptyTemplate: o} = e;
                    o && !v(o) && (e.emptyTemplate = () => o);
                    const n = e => {
                        e.forEach((e => {
                            const t = e.text;
                            if (t && !v(t) && (e.text = () => t), C(e.children)) return n(e.children), void delete e.template;
                            const o = e.template;
                            o && !v(o) && (e.template = () => o)
                        }))
                    };
                    return n(t), e
                }, So = e => m(e[0]) ? e.map((e => ({key: e, text: e}))) : e, Do = (e, t, o, n, s) => {
                    const {
                        __isNested: r,
                        columnData: a,
                        supportMoveRow: i,
                        moveRowConfig: c,
                        supportAutoOrder: l,
                        __isFullColumn: d,
                        fullColumn: u,
                        supportCheckbox: h,
                        checkboxConfig: p
                    } = e, f = {};
                    let v = [];
                    i && c.useSingleMode && v.push(t(c)), h && v.push(o(p)), l && v.push(n(e)), d && u.useFold && v.push(s(e)), v = v.concat(a);
                    const y = (t, o, n) => {
                        t.forEach(((t, s) => {
                            const a = (t = S(!0, {}, t)).key;
                            a ? (t.width && !b(t.width) && (t.width = parseInt(t.width, 10)), t.remind && (e._remind = !0), m(t.sorting) && (e._sort = !0), x(t.filter) && (e._filter = !0), !r && m(t.fixed) ? (e._fixed = !0, t.disableCustomize = !0) : delete t.fixed, !t.disableCustomize || t.width ? (f[a] = t, f[a].isShow = t.isShow || g(t.isShow), f[a].index = s, f[a].__index = s, f[a].__width = t.width, f[a].__isShow = t.isShow, r && (C(t.children) && y(t.children, o + 1, t.key), f[a].pk = n, f[a].level = o)) : Nt(`column ${a}: width must be set`)) : Nt(`columnData[${s}].key undefined`)
                        }))
                    };
                    y(v, 0, void 0), e.columnMap = f
                }, jo = (e, t, o, n, s) => {
                    e.columnData = So(e.columnData), e = To(e);
                    let r = new ao;
                    r.textConfig = new io, S(!0, r, e), r._ = r.gridManagerName, r.browser = (() => {
                        try {
                            return navigator.userAgent.toLowerCase().match(/(msie|firefox|chrome|opera|version).*?([\d.]+)/)[1].replace(/version/, "safari")
                        } catch (e) {
                            return "-"
                        }
                    })();
                    const {_: a} = r;
                    Do(r, t, o, n, s);
                    return (() => {
                        if (r.disableCache) return;
                        const e = r.columnMap, t = ko(a).column || {}, o = Object.keys(t), n = Object.keys(e);
                        if (0 === o.length) return;
                        let s = !0;
                        o.length !== n.length && (s = !1), s && u(e, ((e, o) => {
                            if (!t[e] || uo.some((n => {
                                const s = t[e][n], r = o[n];
                                return x(s) ? JSON.stringify(s) !== JSON.stringify(r) : s !== r
                            }))) return s = !1, !1
                        })), s ? S(!0, e, t) : $o(a)
                    })(), Mo(r), r
                }, Ao = e => S(!0, {}, co.settings[e] || {}), Mo = e => {
                    co.settings[e._] = S(!0, {}, e)
                }, Oo = (e, t) => {
                    const o = Ao(e), n = o.columnMap;
                    return u(n, ((o, n) => {
                        if (n.disableCustomize) return;
                        let s = ((e, o) => t ? xt(e, o) : yt(e, o))(e, n.key);
                        n.width = s.width(), n.index = s.index(), n.isShow = !m(s.attr(je))
                    })), Mo(o), Co(o), o
                }, _o = e => (t, o, n) => {
                    const s = n.value;
                    n.value = o => {
                        const n = s.call(t, o);
                        return (o && o.tpl || e).replace(/\{\{([^(\}\})]+)\}\}/g, ((e, t) => new Function("vm", "return " + t)(n) || ""))
                    }
                }, Po = "data-compile-node", Ho = {}, Eo = e => (Ho[e] || (Ho[e] = []), Ho[e]), Ro = e => {
                    Ho[e] = []
                }, zo = (e, t, o, n, s) => {
                    const {_: r, compileAngularjs: a, compileVue: i, compileReact: c} = e, l = Eo(r);
                    let d = "", u = "";
                    return t ? (c && (u = Po, l.push({
                        template: t,
                        row: o,
                        index: n,
                        key: s,
                        type: g(n) ? void 0 : "template",
                        fnArg: [o[s], o, n, s]
                    })), (i || a) && (u = Po, l.push({
                        row: o,
                        index: n,
                        key: s
                    })), c || (d = t(o[s], o, n, s))) : (d = o[s], (f(d) || g(d)) && (d = "")), {text: d, compileAttr: u}
                };

            async function Lo(e) {
                const {_: t, compileAngularjs: o, compileVue: n, compileReact: s} = e, a = Eo(t);
                if (0 === a.length) return Promise.resolve();
                let i = r.querySelectorAll(`${ht(t)} [${Po}]`);
                a.forEach(((e, t) => {
                    e.el || (e.el = i[t])
                })), n && (await n(a), i = r.querySelectorAll(`${ht(t)} [${Po}]`)), o && await o(a), s && await s(a), [].forEach.call(i, (e => {
                    e.removeAttribute(Po)
                })), Ro(t)
            }

            const No = {}, qo = (e, t) => e.textConfig[t][e.i18n];

            function Ko(e, t, o, n, s) {
                let r = [];
                const a = arguments.length;
                if (3 === a && k(arguments[2])) r = arguments[2]; else if (a > 2) for (let e = 2; e < a; e++) r.push(arguments[e]);
                try {
                    let o = qo(e, t);
                    return r && r.length ? o.replace(/{\d+}/g, (e => {
                        const t = r[e.match(/\d+/)];
                        return g(t) ? "" : t
                    })) : o
                } catch (e) {
                    return Lt(`not find language matched to ${t}`), ""
                }
            }

            const Bo = (e, t) => {
                const o = r.createElement("a");
                o.addEventListener("click", (() => {
                    o.download = e, o.href = t
                }));
                const n = r.createEvent("MouseEvents");
                n.initEvent("click", !1, !1), o.dispatchEvent(n)
            };
            const Fo = new class {
                async exportGrid(e, t, o) {
                    const n = Ao(e), {
                        query: s,
                        disableAutoLoading: r,
                        loadingTemplate: a,
                        exportConfig: i,
                        pageData: c,
                        sortData: l
                    } = n;
                    t = ((e, t, o, n) => {
                        if (!t) {
                            const e = n.fileName;
                            t = v(e) ? e(o) : e
                        }
                        return t || (t = e), `${t}.${n.suffix}`
                    })(e, t, s, i);
                    const d = o ? yo(e) : [], u = vo(e), h = i.handler;
                    switch (i.mode) {
                        case"static":
                            this.downStatic(e, r, a, t, o, i.suffix, h, s, c, l, d, u);
                            break;
                        case"blob":
                            await this.downBlob(e, r, a, t, h, s, c, l, d, u);
                            break;
                        case"url":
                            await this.downFilePath(e, r, a, t, h, c, l, d)
                    }
                }

                downStatic(e, t, o, n, s, r, a, i, c, l, d, h) {
                    !t && lt(e, o);
                    let p = a(n, i, c, l, d, h);
                    if (!k(p)) {
                        const t = kt(e, !0), o = bt(e);
                        let n;
                        n = Q(s ? 'tr[checked="true"]' : "tr", o), p = [];
                        const r = [];
                        u(t, (e => {
                            r.push(`"${e.querySelector(".th-text").textContent || ""}"`)
                        })), p.push(r), u(n, (e => {
                            let t = [];
                            const o = Q("td:not([gm-create]):not([cell-hidden])", e);
                            u(o, (e => {
                                t.push(`"${e.textContent || ""}"`)
                            })), p.push(t)
                        }))
                    }
                    let g = "";
                    u(p, ((e, t) => {
                        0 !== t && (g += "\r\n"), g += e.join(",")
                    }));
                    Bo(n, `data:${{
                        csv: "text/csv",
                        xls: "application/vnd.ms-excel"
                    }[r]};charset=utf-8,\ufeff${encodeURIComponent(g)}`), !t && dt(e, 300)
                }

                async downFilePath(e, t, o, n, s, r, a, i) {
                    try {
                        !t && lt(e, o);
                        const c = await s(n, r, a, i);
                        Bo(n, c)
                    } catch (e) {
                        Nt(e)
                    } finally {
                        !t && dt(e, 300)
                    }
                }

                async downBlob(e, t, o, n, s, r, a, i, c, l) {
                    try {
                        !t && lt(e, o);
                        const d = await s(n, r, a, i, c, l), u = Blob.prototype;
                        let h;
                        if (Object.getPrototypeOf(d) === u && (h = d), d.data && Object.getPrototypeOf(d.data) === u && (h = d.data), !h || Object.getPrototypeOf(h) !== u) return void Nt("response type not equal to Blob");
                        Bo(n, URL.createObjectURL(h))
                    } catch (e) {
                        Nt(e)
                    } finally {
                        !t && dt(e, 300)
                    }
                }
            }, Io = "rowspan", Go = "merge-td", Wo = "last-rowspan", Jo = (e, t) => {
                u(t, ((t, o) => {
                    let n = o.merge;
                    if (!n || "text" !== n && "html" !== n) return !0;
                    const s = Tt(yt(e, t), bt(e).find("tr:not([gm-summary-row]):not([gm-row-hide])"));
                    let r = s.length, a = r, i = 1;
                    for (; a;) {
                        const e = s.eq(a - 1);
                        if (e.removeAttr(Io), e.removeAttr(Go), e.removeAttr(Wo), a--, 0 === a) return void (i > 1 && (e.attr(Io, i), i = 1));
                        s.eq(a - 1)[n]() === e[n]() ? (e.attr(Go, ""), i++) : i > 1 && (e.attr(Io, i), a + i === r && e.attr(Wo, ""), i = 1)
                    }
                }))
            }, Uo = e => Q(`[gm-cache-key="${e}"], [${pe}="${e}"], [${pe}^="${e}-"]`), Vo = (e, t) => {
                const o = Uo(t);
                o.attr(qe, "ing"), setTimeout((() => {
                    o.attr(qe, "true"), Jo(e._, e.columnMap)
                }), 500)
            };

            function Yo(e) {
                const t = pt(e).clone(!0), o = open();
                t.find("[cell-hidden]").remove(), t.find("[merge-td]").remove(), t.find("[gm-create]").remove();
                const n = t.find("[grid-manager-mock-thead] th"), s = t.find(`[${re}] th`);
                s.removeAttr("style"), u(s, ((e, t) => {
                    e.innerHTML = n.eq(t).find(".th-text").html()
                })), t.removeAttr("style"), t.find("[grid-manager-mock-thead]").remove(), o.document.write("<style>\ntable{width: 100%;border-collapse: collapse;border-spacing: 0;}\nth,td{height: 18px;padding:11px;border: 1px solid #999;font-size: 12px;color: #666;}\nth{color: #333}\na{color: #666; text-decoration:none;}\ntr[empty-template] td{text-align: center}\n</style>" + t.get(0).outerHTML), o.document.close(), o.print(), o.close()
            }

            const Xo = e => `[grid-master="${e}"]`, Qo = e => {
                const {closeMenu: t} = No[e];
                Q(t.target).off(t.events), Q(Xo(e)).remove()
            }, Zo = (e, t) => {
                const o = Ao(e), {
                    supportAjaxPage: n,
                    supportExport: s,
                    supportConfig: a,
                    supportPrint: i,
                    menuHandler: c,
                    useCellFocus: l,
                    useHideRow: d
                } = o;
                let u = [];
                n && u.push((e => ({
                    content: `${Ko(e, "previous-page")}<i class="gm-icon gm-icon-up"></i>`, onClick: e => {
                        const t = Ao(e), {currentPageKey: o, pageData: n} = t, s = n[o];
                        ks(t, s > 1 ? s - 1 : s)
                    }, run: (e, t) => {
                        const o = Ao(e), {pageData: n, currentPageKey: s} = o, r = n[s], a = n.tPage;
                        1 === r || 0 === a ? t.addClass(Re) : t.removeClass(Re)
                    }
                }))(o), (e => ({
                    content: `${Ko(e, "next-page")}<i class="gm-icon gm-icon-down"></i>`, line: !0, onClick: e => {
                        const t = Ao(e), {currentPageKey: o, pageData: n} = t, s = n[o];
                        ks(t, s < n.tPage ? s + 1 : s)
                    }, run: (e, t) => {
                        const o = Ao(e), {pageData: n, currentPageKey: s} = o, r = n[s], a = n.tPage;
                        r === a || 0 === a ? t.addClass(Re) : t.removeClass(Re)
                    }
                }))(o)), s && u.push((e => ({
                    content: `${Ko(e, "export")}<i class="gm-icon gm-icon-export"></i>`, onClick: e => {
                        Fo.exportGrid(e, void 0, !1)
                    }
                }))(o), (e => ({
                    content: `${Ko(e, "export-checked")}<i class="gm-icon gm-icon-export-checked"></i>`, onClick: e => {
                        Fo.exportGrid(e, void 0, !0)
                    }, run: (e, t) => {
                        0 === Q('tr[checked="true"]', bt(e)).length ? t.addClass(Re) : t.removeClass(Re)
                    }
                }))(o)), u.push((e => ({
                    content: `${Ko(e, "refresh")}<i class="gm-icon gm-icon-refresh"></i>`, onClick: e => {
                        const t = Ao(e), {currentPageKey: o, pageData: n} = t;
                        ks(t, n[o])
                    }
                }))(o)), l && u.push((e => ({
                    content: `${Ko(e, "copy")}<i class="gm-icon gm-icon-copy"></i><input gm-fake-copy="${e._}"/>`,
                    onClick: e => {
                        const t = r.querySelector(`[gm-fake-copy=${e}]`);
                        t.value = bt(e).find("td[gm-focus-td]").text(), t.select(), r.execCommand("Copy")
                    }
                }))(o)), i && u.push((e => ({
                    content: `${Ko(e, "print")}<i class="gm-icon gm-icon-print"></i>`, onClick: e => {
                        Yo(e)
                    }
                }))(o)), d && u.push((e => ({
                    content: `${Ko(e, "hide-row")}<i class="gm-icon gm-icon-hide"></i>`, onClick: (e, t) => {
                        const o = Q(t).closest("tr");
                        Vo(Ao(e), o.attr(ue) || o.attr(pe))
                    }
                }))(o)), a && u.push((e => ({
                    content: `${Ko(e, "config")}<i class="gm-icon gm-icon-config"></i>`, onClick: e => {
                        Ys.toggle(e)
                    }
                }))(o)), u = c(u);
                let h = "";
                const p = u.length;
                u.forEach(((e, t) => {
                    h += `<span menu-action>${e.content}</span>`, e.line && t !== p - 1 && (h += '<span class="menu-line"></span>')
                })), Q("[grid-master]").remove(), Q("body").append(`<div class="gm-menu" grid-master="${e}">${h}</div>`);
                const g = Q(Xo(e)), f = g.find("[menu-action]");
                return u.forEach(((o, n) => {
                    const {run: s, onClick: r} = o, a = f.eq(n);
                    s && s(e, a), a.bind("click", (function (o) {
                        if (((e, t) => {
                            if (Q(e).hasClass(Re)) return t.stopPropagation(), t.preventDefault(), !0
                        })(this, o)) return !1;
                        r(e, t), Qo(e)
                    }))
                })), g
            };
            var en = o(923), tn = o.n(en);
            const on = {};
            var nn = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
            const sn = e => {
                const t = gt(e).find(".gm-tooltip");
                t.length && t.remove()
            }, rn = (e, t, o, n) => {
                if (!x(o)) return;
                const {text: s, position: r} = o;
                let a = "right" === r ? " right-model" : "";
                const i = gt(e), c = Q(t), l = pt(e), d = c.offset().top - l.offset().top - i.scrollTop() - 30;
                let u = "";
                "TD" === t.nodeName && (a = "", u = `left:${c.offset().left - l.offset().left - i.scrollLeft() + Ke};`), sn(e);
                const h = `<span class="ra-area gm-tooltip${a}" style="height:30px;top:${d + Ke};${u}">${s}</span>`;
                i.append(h), c.bind(ot, (() => {
                    c.unbind(ot), sn(e), v(n) && n()
                }))
            };

            class an {
                init(e) {
                    on[e] = ((e, t) => ({
                        start: it("mouseover", t, `[grid-manager-mock-thead="${e}"] .${ze}`),
                        tooltipLeave: it(ot, t, `[grid-manager-mock-thead="${e}"] .${ze}`)
                    }))(e, `${ht(e)} [grid-manager-mock-thead]`);
                    const {start: t} = on[e], o = gt(e);
                    Q(t.target).on(t.events, t.selector, (function () {
                        const e = Q(this), t = e.find(".ra-area");
                        o.get(0).offsetWidth - (e.offset().left - o.offset().left) > t.get(0).offsetWidth + 20 ? t.removeClass("right-model") : t.addClass("right-model")
                    }))
                }

                createHtml(e) {
                    const {remind: t} = e;
                    let o = "", n = "";
                    n = x(t) ? t.text : t;
                    const s = t.style;
                    return x(s) && (o = ' style="', Object.keys(s).forEach((e => {
                        o = `${o}${e}:${s[e]};`
                    })), o += '"'), {text: n, style: o}
                }

                destroy(e) {
                    Ht(on[e]), sn(e)
                }
            }

            nn([_o(tn())], an.prototype, "createHtml", null);
            const cn = new an, ln = "gm-drag-ongoing";
            var dn = o(985), un = o.n(dn), hn = o(125), pn = o.n(hn), gn = o(472), fn = o.n(gn);
            const mn = {};
            var vn = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
            const bn = (e, t, o, n) => {
                if (!x(t) || w(t)) return void Lt("sortJson unavailable");
                const s = Ao(e);
                s.isCombSorting || (s.sortData = {}), S(s.sortData, t), Mo(s), v(o) || (o = () => {
                }), g(n) && (n = !0);
                const r = S({}, s.query, s.sortData, s.pageData);
                s.sortingBefore(r), n ? ls.refresh(e, (t => {
                    (e => {
                        const {sortData: t, sortUpText: o, sortDownText: n} = Ao(e), s = "sorting-up",
                            r = "sorting-down", a = "sorting";
                        u(Q(`${ht(e)} .${Le}`), (e => {
                            Q(e).removeClass("sorting-up sorting-down"), Q(e).closest("th").attr(a, "")
                        })), u(t, ((t, i) => {
                            const c = Q(`${ht(e)} th[th-name="${t}"]`), l = Q(`.${Le}`, c);
                            i === o && (l.addClass(s), l.removeClass(r), c.attr(a, o)), i === n && (l.addClass(r), l.removeClass(s), c.attr(a, n))
                        }))
                    })(e), o(t), s.sortingAfter(r)
                })) : (o(), s.sortingAfter(r))
            };

            class yn {
                init(e) {
                    mn[e] = ((e, t) => ({start: it(Qe, t, `[grid-manager-mock-thead="${e}"] .${Le}`)}))(e, ht(e));
                    const {start: t} = mn[e];
                    Q(t.target).on(t.events, t.selector, (function (t) {
                        const o = Ct(Q(this).closest("th")), {
                            sortData: n,
                            sortMode: s,
                            sortUpText: r,
                            sortDownText: a
                        } = Ao(e), i = n[o];
                        let c = "";
                        if ("single" === s) {
                            const e = Q(t.target);
                            e.hasClass("sa-up") && (c = i === r ? "" : r), e.hasClass("sa-down") && (c = i === a ? "" : a)
                        }
                        "overall" === s && (c = i === a ? r : a);
                        bn(e, {[o]: c})
                    }))
                }

                createHtml(e) {
                    const {type: t, sortUpText: o, sortDownText: n} = e;
                    let s = "";
                    switch (t) {
                        case o:
                            s = " sorting-up";
                            break;
                        case n:
                            s = " sorting-down"
                    }
                    return {typeClass: s}
                }

                destroy(e) {
                    Ht(mn[e])
                }
            }

            vn([_o(fn())], yn.prototype, "createHtml", null);
            const xn = new yn;
            var wn = o(285), kn = o.n(wn);
            const Cn = {};
            var $n = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };

            class Tn {
                init(e) {
                    const t = this, o = Q("body"), n = ht(e);
                    Cn[e] = ((e, t) => {
                        const o = `[grid-manager-mock-thead="${e}"] .gm-filter-area`;
                        return {
                            toggle: it(Ze, t, `${o} .fa-icon`),
                            close: it("mousedown.closeFitler", "body"),
                            submit: it(tt, t, `${o} .filter-submit`),
                            reset: it(tt, t, `${o} .filter-reset`),
                            checkboxAction: it(Qe, t, `${o} .gm-checkbox-input`),
                            radioAction: it(Qe, t, `${o} .gm-radio-input`)
                        }
                    })(e, n);
                    const {toggle: s, close: r, submit: a, reset: i, checkboxAction: c, radioAction: l} = Cn[e];
                    Q(s.target).on(s.events, s.selector, (function (s) {
                        s.stopPropagation(), s.preventDefault();
                        const a = Q(`${n} .fa-con`), i = Q(this), c = i.closest(".gm-filter-area"),
                            l = i.closest("th[th-name]"), d = Ct(l), h = c.find(".fa-con");
                        h.find(".filter-list").css("max-height", ft(e).height() - 70 + Ke), u(a, (e => {
                            h.get(0) !== e && (e.style.display = "none")
                        }));
                        const p = Ao(e);
                        t.update(l, p.columnMap[d].filter);
                        "none" !== h.css("display") ? h.hide() : h.show();
                        const g = "direction-left", f = "direction-right";
                        c.offset().left + h.width() > gt(e).width() ? (h.addClass(f), h.removeClass(g)) : (h.addClass(g), h.removeClass(f)), Q(r.target).on(r.events, (function (e) {
                            const t = Q(e.target);
                            if (t.hasClass(Xe) || 1 === t.closest(".fa-con").length) return !1;
                            o.find(".fa-con").hide(), Q(r.target).off(r.events)
                        }))
                    })), Q(a.target).on(a.events, a.selector, (function () {
                        const o = Q(this).closest(".fa-con"), n = Q(".gm-radio-checkbox-input", o), s = o.closest("th"),
                            a = Ct(s), i = [];
                        u(n, (e => {
                            e.checked && i.push(e.value)
                        }));
                        const c = Ao(e), l = i.join(",");
                        c.columnMap[a].filter.selected = l, c.pageData[c.currentPageKey] = 1, S(c.query, {[a]: l}), Mo(c), t.update(s, c.columnMap[a].filter), ls.refresh(e), o.hide(), Q(r.target).off(r.events)
                    })), Q(i.target).on(i.events, i.selector, (function () {
                        const o = Q(this).closest(".fa-con"), n = Q(this).closest("th[th-name]"), s = Ct(n), a = Ao(e);
                        delete a.query[s], a.columnMap[s].filter.selected = "", a.pageData[a.currentPageKey] = 1, Mo(a), t.update(n, a.columnMap[s].filter), ls.refresh(e), o.hide(), Q(r.target).off(r.events)
                    })), Q(c.target).on(c.events, c.selector, (function () {
                        const e = Q(this).closest(".filter-checkbox").find(".gm-checkbox");
                        Rs(e, this.checked ? Oe : Pe)
                    })), Q(l.target).on(l.events, l.selector, (function () {
                        const e = Q(this).closest(".filter-list").find(".filter-radio");
                        u(e, (e => {
                            Es(Q(e).find(".gm-radio"), this === e.querySelector(".gm-radio-input"))
                        }))
                    }))
                }

                createHtml(e) {
                    const {settings: t, columnFilter: o} = e;
                    let n = "";
                    return o.selected = o.selected || "", o.option.forEach((e => {
                        let t = o.selected.split(",");
                        t = t.map((e => e.trim()));
                        const s = {checked: -1 !== t.indexOf(e.value), label: e.text, value: e.value};
                        o.isMultiple ? n += `<li class="filter-checkbox">${Ns.getCheckboxTpl(s)}</li>` : n += `<li class="filter-radio">${Ns.getRadioTpl(s)}</li>`
                    })), {icon: o.selected ? " filter-selected" : "", ok: Ko(t, "ok"), reset: Ko(t, "reset"), list: n}
                }

                update(e, t) {
                    const o = Q(".fa-icon", e), n = Q(".fa-con .gm-radio-checkbox-input", e);
                    u(n, (e => {
                        let o = Q(e).closest(".gm-radio-checkbox");
                        t.isMultiple ? Rs(o, t.selected.split(",").includes(e.value) ? Oe : Pe) : Es(o, e.value === t.selected)
                    })), t.selected ? o.addClass(Ye) : o.removeClass(Ye)
                }

                destroy(e) {
                    Ht(Cn[e])
                }
            }

            $n([_o(kn())], Tn.prototype, "createHtml", null);
            const Sn = new Tn;
            var Dn = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };

            class jn {
                getWrapTpl(e) {
                    const t = e.settings, {
                        _: o,
                        skinClassName: n,
                        isIconFollowText: s,
                        disableBorder: r,
                        disableLine: a,
                        supportConfig: i,
                        supportAjaxPage: c,
                        configInfo: l,
                        ajaxPageTemplate: d
                    } = t, u = ["table-wrap"];
                    return n && m(n) && n.trim() && u.push(n), s && u.push("gm-icon-follow-text"), r && u.push("disable-border"), a && u.push("disable-line"), {
                        wrapKey: `${ee}="${o}"`,
                        divKey: `${te}="${o}"`,
                        classNames: u.join(" "),
                        configTpl: i ? Ys.createHtml({_: o, configInfo: l}) : "",
                        ajaxPageTpl: c ? $s.createHtml({settings: t, tpl: d}) : ""
                    }
                }

                getThTpl(e) {
                    const {settings: t, col: o} = e, {
                        query: n,
                        supportDrag: s,
                        sortData: r,
                        sortUpText: a,
                        sortDownText: i,
                        supportAdjust: c
                    } = t;
                    let l = "", d = "";
                    o.remind && (l = "remind", d = cn.createHtml({remind: o.remind}));
                    let u = "", h = "";
                    m(o.sorting) && (o.sorting === i ? (u = `sorting="${i}"`, r[o.key] = i) : o.sorting === a ? (u = `sorting="${a}"`, r[o.key] = a) : u = "sorting", h = xn.createHtml({
                        type: o.sorting,
                        sortUpText: a,
                        sortDownText: i
                    }));
                    let p = "", f = "";
                    x(o.filter) && (p = "filter", g(o.filter.selected) ? o.filter.selected = n[o.key] : n[o.key] = o.filter.selected, f = Sn.createHtml({
                        settings: t,
                        columnFilter: o.filter
                    }));
                    let v = "";
                    c && !o.disableCustomize && (v = dr.html);
                    let b = "";
                    "left" !== o.fixed && "right" !== o.fixed || (b = `fixed="${o.fixed}"`);
                    const y = o.align ? `align="${o.align}"` : "", w = o.isShow ? "" : je;
                    let k = "", C = o.key, $ = o.text, T = "";
                    switch (o.key) {
                        case we:
                            k = "gm-create gm-order";
                            break;
                        case Ce:
                            k = "gm-create gm-checkbox";
                            break;
                        case xe:
                        case ke:
                            k = Ae;
                            break;
                        default:
                            const e = ((e, t, o) => {
                                const {_: n, compileAngularjs: s, compileVue: r, compileReact: a} = e, i = Eo(n);
                                let c = "", l = "";
                                return o && ((s || r || a) && (l = Po, i.push({
                                    key: t,
                                    template: o,
                                    type: "text"
                                })), a || (c = o())), {text: c, compileAttr: l}
                            })(t, C, o.text);
                            $ = e.text, T = e.compileAttr
                    }
                    let S = "th-text";
                    !s || o.isAutoCreate || o.disableCustomize || (S = `${S} gm-drag-action`);
                    const D = g(o.colspan) ? "" : `colspan="${o.colspan}"`,
                        j = g(o.rowspan) ? "" : `rowspan="${o.rowspan}"`;
                    let A = "auto";
                    return o.width && (A = o.width + Ke), {
                        thAttr: `th-name="${C}" ${D} ${j} style="width:${A}" ${w} ${y} ${u} ${p} ${b} ${l} ${k}`,
                        thTextClassName: S,
                        thText: $,
                        compileAttr: T,
                        remindHtml: d,
                        sortHtml: h,
                        filterHtml: f,
                        adjustHtml: v
                    }
                }
            }

            Dn([_o(un())], jn.prototype, "getWrapTpl", null), Dn([_o(pn())], jn.prototype, "getThTpl", null);
            const An = new jn;
            var Mn = o(763), On = o.n(Mn);
            const _n = {}, Pn = "gm-move-row-ongoing", Hn = "disable-move";
            var En = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };

            class Rn {
                init(e) {
                    const t = this, {
                        supportCheckbox: o,
                        checkboxConfig: n,
                        moveRowConfig: s,
                        animateTime: r,
                        columnMap: a
                    } = Ao(e), {key: i, useSingleMode: c, handler: l} = s, d = Q("body"), u = pt(e).get(0);
                    _n[e] = (e => {
                        const t = "gmLineDrag";
                        return {
                            start: it(`mousedown.${t}`, e, "tr:not([empty-template])"),
                            doing: it(`mousemove.${t}`, "body"),
                            abort: it(`mouseup.${t}`, "body")
                        }
                    })(`${ht(e)} tbody`);
                    const {start: h, doing: p, abort: g} = _n[e], f = bt(e), b = gt(e), y = b.get(0);
                    let x;
                    b.attr("move-row", c ? "single" : "all"), Q(h.target).on(h.events, h.selector, (function (s) {
                        const h = s.target;
                        if (1 !== s.buttons) return;
                        if ("TD" !== h.nodeName) return;
                        if (c && !m(h.getAttribute("gm-moverow"))) return;
                        if (!c && m(h.getAttribute(Hn))) return;
                        const w = this, k = Q(w);
                        let C = Q("tr", f);
                        d.addClass($e);
                        const $ = vo(e);
                        x = [...$];
                        let T = Q(".dreamland-row-div", b);
                        if (T.length) return;
                        b.append('<div class="dreamland-row-div"></div>'), T = Q(".dreamland-row-div", b), (e => {
                            const t = pt(e);
                            Q("[rowspan]", t).removeAttr(Io), Q("[merge-td]", t).removeAttr(Go)
                        })(e);
                        const S = "true" === gt(e).attr("gm-overflow-x");
                        T.get(0).innerHTML = t.createHtml({
                            table: u,
                            tr: w,
                            $thList: kt(e),
                            overFlow: S
                        }), k.addClass(Pn);
                        let D = 0;
                        const j = Q(p.target), A = p.events;
                        j.off(A), j.on(A, (function (e) {
                            let t, o;
                            D = k.index(), D > 0 && (t = C.eq(D - 1)), D < C.length - 1 && (o = C.eq(D + 1)), T.show().css({
                                width: w.offsetWidth,
                                top: e.clientY - b.offset().top + pageYOffset,
                                left: 0 - y.scrollLeft
                            }), C = ((e, t, o, n, s, r, a, i) => {
                                const c = a.attr(ue);
                                let l;
                                if (s && n.offset().top < s.offset().top && (s.before(a), l = s), r && n.offset().top + n.height() / 2 > r.offset().top && (r.after(a), l = r), l) {
                                    const e = l.attr(ue);
                                    l.attr(ue, c), a.attr(ue, e);
                                    const o = i[c], n = i[e];
                                    if (o[ue] = e, n[ue] = c, m(t)) {
                                        const e = o[t], s = n[t];
                                        o[t] = s, n[t] = e
                                    }
                                    i[c] = n, i[e] = o
                                }
                                return Q("tr", o)
                            })(0, i, f, T, t, o, k, $)
                        }));
                        const M = Q(g.target), O = g.events;
                        M.off(O), M.on(O, (function () {
                            j.off(A), M.off(O);
                            const t = Ao(e).virtualScroll.top || 0;
                            T.animate({top: `${w.offsetTop - (y.scrollTop - t) + Ke}`}, r, (() => {
                                k.removeClass(Pn), T.remove()
                            }));
                            const s = $.filter(((e, t) => !qt(e, x[t])));
                            v(l) && l(s, $), o && ((e, t, o, n, s) => {
                                if (!m(o)) return;
                                const r = yo(e);
                                r.length && (r.forEach((e => {
                                    s.forEach((s => {
                                        qt(ct(n, e, [o]), ct(n, s, [o]), t) && (e[o] = s[o])
                                    }))
                                })), xo(e, r, !0))
                            })(e, n.key, i, a, s), ls.changeTableData(e, $, !0), d.removeClass($e)
                        }))
                    }))
                }

                addSign(e) {
                    return e.disableMoveRow ? Hn : ""
                }

                createHtml(e) {
                    const {table: t, tr: o, overFlow: n, $thList: s} = e, r = o.cloneNode(!0);
                    r.style.height = h(o, "height");
                    const a = r.querySelectorAll("td");
                    return u(s, ((e, t) => {
                        a[t].style.width = h(e, "width"), a[t].style.left = h(e, "left"), a[t].style.right = h(e, "right"), n && (a[t].style.boxShadow = h(e, "box-shadow"))
                    })), {class: t.className, tbody: r.outerHTML}
                }

                getColumn(e) {
                    const {fixed: t} = e;
                    return {
                        key: ke,
                        text: "",
                        isAutoCreate: !0,
                        isShow: !0,
                        [Ne]: !0,
                        width: 30,
                        fixed: t,
                        template: () => '<td gm-create gm-moverow><i class="gm-icon gm-icon-move"></i></td>'
                    }
                }

                destroy(e) {
                    Ht(_n[e])
                }
            }

            En([_o(On())], Rn.prototype, "createHtml", null);
            const zn = new Rn, Ln = {}, Nn = "full-column-fold", qn = "full-column-state",
                Kn = (e, t, o, n, s, r, a, i) => {
                    let {text: c, compileAttr: l} = ((e, t, o, n, s) => {
                        const {_: r, compileAngularjs: a, compileVue: i, compileReact: c} = e, l = Eo(r);
                        let d = "", u = "";
                        return c && (u = Po, l.push({
                            template: n,
                            row: t,
                            index: o,
                            type: "full-" + s,
                            fnArg: [t, o]
                        })), (i || a) && (u = Po, l.push({row: t, index: o})), c || (d = n(t, o)), {
                            text: d,
                            compileAttr: u
                        }
                    })(e, r, a, o, i);
                    c = $(c) ? c.outerHTML : c;
                    let d = [];
                    return n && (d = [[qn, s + ""]]), {
                        className: [],
                        attribute: [["full-column", i], [pe, a + ""]].concat(d),
                        querySelector: `[full-column][${pe}="${a}"]`,
                        tdList: [`<td colspan="${t}"><div class="full-column-div" ${l}>${c}</div></td>`]
                    }
                }, Bn = (e, t, o, n, s) => {
                    const {columnMap: r, fullColumn: a} = e, {
                        topTemplate: i,
                        bottomTemplate: c,
                        useFold: l,
                        interval: d,
                        openState: u = !1
                    } = a, h = Object.keys(r).length;
                    if ("top" === s && v(i)) {
                        const r = Kn(e, h, i, l, u, t, o, s);
                        r && n.push(r)
                    }
                    if ("bottom" === s && v(c)) {
                        const r = Kn(e, h, c, l, u, t, o, s);
                        r && n.push(r)
                    }
                    "bottom" === s && (v(i) || v(c)) && n.push(((e, t, o = 0) => (b(o) && (o += Ke), {
                        className: [],
                        attribute: [["full-column-interval", o + ""], [pe, t + ""]],
                        querySelector: `[full-column-interval][${pe}="${t}"]`,
                        tdList: [`<td colspan="${e}"><div style="height: ${o}"></div></td>`]
                    }))(h, o, d))
                }, Fn = e => e ? "gm-icon-sub" : "gm-icon-add";
            const In = new class {
                init(e) {
                    const {useFold: t} = Ao(e).fullColumn;
                    if (gt(e).attr("gm-full-column", ""), t) {
                        Ln[e] = (o = `${ht(e)} tbody`, {fold: it(Qe, o, `i[${Nn}]`)});
                        const t = Ln[e].fold;
                        Q(t.target).on(t.events, t.selector, (function () {
                            const t = Q(this), o = t.closest("tr"), n = o.attr(ue),
                                s = Q(`${ht(e)} tbody [${pe}="${n}"]`), r = !("true" === t.attr(Nn));
                            t.attr(Nn, r), s.attr(qn, r), o.attr(qn, r), t.removeClass(Fn(!r)), t.addClass(Fn(r))
                        }))
                    }
                    var o
                }

                addTop(e, t, o, n) {
                    Bn(e, t, o, n, "top")
                }

                addBottom(e, t, o, n) {
                    Bn(e, t, o, n, "bottom")
                }

                getColumn(e) {
                    const {openState: t = !1, fixed: o} = e.fullColumn;
                    return {
                        key: xe,
                        text: "",
                        isAutoCreate: !0,
                        isShow: !0,
                        disableCustomize: !0,
                        width: "40px",
                        fixed: o,
                        template: () => `<td gm-create gm-fold><i class="gm-icon ${Fn(t)}" ${Nn}="${t}"></i></td>`
                    }
                }

                destroy(e) {
                    Ht(Ln[e])
                }
            }, Gn = {}, Wn = "tree-element", Jn = {}, Un = e => {
                delete Jn[e]
            }, Vn = e => e ? "gm-icon-sub" : "gm-icon-add";
            const Yn = new class {
                add(e, t, o, n, s) {
                    ((e, t) => {
                        Jn[e] || (Jn[e] = []), Jn[e].push(t)
                    })(e, {cacheKey: t, level: o, state: s, hasChildren: n})
                }

                init(e) {
                    const t = this;
                    var o;
                    Gn[e] = (o = ht(e), {toggle: it(Qe, o, `[${Wn}] i`)});
                    const {toggle: n} = Gn[e];
                    bt(e).addClass("tree-tbody"), Q(n.target).on(n.events, n.selector, (function () {
                        const o = Q(this).closest("tr");
                        t.updateDOM(e, void 0, o)
                    }))
                }

                updateDOM(e, t, o) {
                    const n = bt(e), s = (e, t) => {
                        const o = Q("[tree-element]", e), r = Q("i", o), a = e.attr(ue);
                        g(t) && (t = !("true" === o.attr(Wn))), r.removeClass(Vn(!t)), r.addClass(Vn(t)), o.attr(Wn, t);
                        const i = n.find(`[${pe}="${a}"]`);
                        0 !== i.length && (i.attr(ge, t), t || u(i, (e => {
                            s(Q(e), !1)
                        })))
                    };
                    o ? s(o, t) : (e => {
                        const t = Q("[tree-element]", n), o = Q("i", t);
                        o.removeClass(Vn(!e)), o.addClass(Vn(e)), t.attr(Wn, e);
                        n.find(`[${pe}]`).attr(ge, e)
                    })(t), ir.update(e)
                }

                insertDOM(e, t) {
                    const {openState: o, insertTo: n} = t, s = pt(e), a = [];
                    u(Q(`tr[${pe}]`, s), (e => {
                        a.push(e.getAttribute(pe))
                    }));
                    const i = (e => Jn[e])(e);
                    i && 0 !== i.length && (i.forEach((t => {
                        let {cacheKey: a, level: i, hasChildren: c, state: l} = t;
                        g(l) && (l = o);
                        const d = Q(`tr[gm-cache-key="${a}"]`, s);
                        let u;
                        m(n) && (u = Tt(yt(e, n), d)), u || (u = Q("td:not([gm-create])", d).eq(0));
                        const h = r.createElement("span");
                        h.setAttribute(Wn, l + ""), h.style.width = 14 * (i + 1) + Ke, c && (h.innerHTML = `<i class="gm-icon ${Vn(l)}"></i>`), u.prepend(h)
                    })), Un(e))
                }

                destroy(e) {
                    Ht(Gn[e]), Un(e)
                }
            }, Xn = "gm-summary", Qn = "gm-summary-row", Zn = "[gm-summary-row]", es = (e, t, o, n) => {
                u(o, (o => {
                    const s = e[o.key], {level: r} = s;
                    t[r] || (t[r] = []), C(s.children) ? (s.rowspan = 1, s.colspan = (e => {
                        let t = 0;
                        const o = e => {
                            e.children.forEach((e => {
                                C(e.children) ? o(e) : t++
                            }))
                        };
                        return o(e), t
                    })(s), es(e, t, s.children, n - 1)) : (s.rowspan = n, s.colspan = 1), r > 0 && t[r].push(s)
                }))
            };
            const ts = new class {
                addSign(e) {
                    gt(e).attr("gm-nested", "")
                }

                push(e, t) {
                    let o = 0;
                    const n = t[0];
                    u(e, ((e, t) => {
                        const {level: s, index: r} = t;
                        0 === s && (n[r] = t), o < s && (o = s)
                    })), es(e, t, n, o + 1)
                }
            }, os = async e => {
                const {_: t, columnMap: o, __isNested: n} = e, s = [[]], r = s[0];
                n ? ts.push(o, s) : u(o, ((e, t) => {
                    r[t.index] = t
                }));
                let a = "";
                u(s, (t => {
                    a += "<tr>", u(t, (t => {
                        a += An.getThTpl({settings: e, col: t})
                    })), a += "</tr>"
                })), mt(t).html(a), vt(t).html(a), ((e, t) => {
                    const {_: o, compileAngularjs: n, compileVue: s, compileReact: r} = e;
                    if (n || s || r) {
                        const e = Eo(o), n = t.querySelectorAll(`[${Po}]`);
                        [].forEach.call(n, ((t, o) => {
                            const n = e[o];
                            e.push(Object.assign({}, n))
                        }))
                    }
                })(e, vt(t).get(0)), await Lo(e)
            }, ns = (e, t) => {
                const {_: o, emptyTemplate: n} = e;
                if (t && 0 !== vo(o, !0).length) return;
                const s = gt(o);
                s.addClass(Te), bt(o).html(`<tr empty-template="${o}" style="height: ${s.height() - 1 + Ke}"><td colspan="${wt(o).length}"></td></tr>`);
                const r = $t(o).get(0).querySelector("td");
                r.innerHTML = ((e, t, o) => {
                    const {_: n, compileAngularjs: s, compileVue: r, compileReact: a} = e, i = Eo(n);
                    return a ? (i.push({
                        el: t,
                        template: o,
                        type: "empty",
                        fnArg: [e]
                    }), "") : (r && i.push({el: t}), s && i.push({el: t}), o(e))
                })(e, r, n), Lo(e)
            }, ss = async (e, t, o, n, s) => {
                const {
                    _: r,
                    columnMap: a,
                    supportTreeData: i,
                    supportCheckbox: c,
                    supportMoveRow: l,
                    treeConfig: d,
                    __isNested: h,
                    __isFullColumn: p
                } = e, {treeKey: m, openState: y} = d, x = bt(r), k = x.get(0), T = x.find(`[empty-template="${r}"]`);
                T.length && T.remove();
                let S = [];
                const D = [], j = [];
                u(a, ((e, t) => {
                    t.pk || (D[t.index] = t)
                }));
                const A = e => {
                    u(e, (e => {
                        C(e.children) ? A(e.children) : j.push(e)
                    }))
                };
                A(D);
                try {
                    const o = (t, n, s) => {
                        const a = g(s);
                        u(t, ((t, d) => {
                            const h = [], g = [], f = t[ue];
                            t[me] && h.push(t[me]), a || (g.push([pe, s]), g.push([ge, y])), a && i && d % 2 == 0 && g.push(["odd", ""]), g.push([ue, f]);
                            const v = {
                                className: h,
                                attribute: g,
                                row: t,
                                querySelector: `[gm-cache-key="${f}"]`,
                                tdList: []
                            };
                            if (a && p && In.addTop(e, t, d, S), ((t, o, n, s) => {
                                const r = t.tdList;
                                u(j, (t => {
                                    const a = t.template;
                                    if (t.isAutoCreate) return void r.push(a(o[t.key], o, n, s));
                                    let {text: i, compileAttr: d} = zo(e, a, o, n, t.key);
                                    const u = t.align ? `align=${t.align}` : "", h = l ? zn.addSign(t) : "",
                                        p = c ? Ns.addSign(t) : "", g = t.fixed ? `fixed=${t.fixed}` : "";
                                    i = $(i) ? i.outerHTML : i, r.push(`<td ${d} ${u} ${h} ${p} ${g}>${i}</td>`)
                                }))
                            })(v, t, d, a), S.push(v), a && p && In.addBottom(e, t, d, S), i) {
                                const e = t[m], s = e && e.length;
                                let a;
                                const i = x.find(`${v.querySelector} [tree-element]`);
                                i.length && (a = "true" === i.attr(Wn)), Yn.add(r, f, n, s, a), s && o(e, n + 1, f)
                            }
                        }))
                    };
                    o(t, 0), ((e, t, o) => {
                        const {_: n, summaryHandler: s, browser: r} = e;
                        if (!v(s)) return;
                        const a = s(vo(n, !0)), i = gt(n);
                        if (i.find(Zn).remove(), w(a)) return void i.removeAttr(Xn);
                        i.attr(Xn, "");
                        const c = [];
                        let l = "";
                        "safari" === r && (l = `style="bottom: ${mt(n).height()}px"`), u(t, (t => {
                            const {key: o, align: n} = t;
                            let s = a[o];
                            (f(s) || g(s)) && (s = "");
                            const r = n ? `align="${n}"` : "";
                            let {text: i, compileAttr: d} = zo(e, (() => s), {}, void 0, o);
                            i = $(i) ? i.outerHTML : i, c.push(`<td ${d} ${r} disable-move ${l}>${i}</td>`)
                        })), o.push({className: [], attribute: [[Qn, ""]], querySelector: Zn, tdList: c})
                    })(e, j, S);
                    const a = document.createDocumentFragment(), d = document.createDocumentFragment(),
                        h = x.find("tr");
                    if (u(h, (e => {
                        d.appendChild(e)
                    })), k.innerHTML = "", d.children.length) {
                        let e, t, o = ((e, t, o) => e.querySelector(`[full-column="${t}"][${pe}="${o}"]`))(d, "top", n);
                        o || (o = d.querySelector(`[gm-cache-key="${n}"]`)), o && (e = [].indexOf.call(d.children, o));
                        let r = (M = s, d.querySelector(`[full-column-interval][${pe}="${M}"]`));
                        r || (r = d.querySelector(`[gm-cache-key="${s}"]`)), r && (t = [].indexOf.call(d.children, r));
                        const a = [];
                        u(d.children, ((o, n) => {
                            b(e) || b(t) ? (b(e) && n < e && a.push(o), b(t) && n > t && a.push(o)) : a.push(o)
                        })), u(a, (e => e.remove()))
                    }
                    S.forEach((e => {
                        const {className: t, attribute: o, tdList: n, row: s, querySelector: i} = e, c = n.join("");
                        let l = d.querySelector(i);
                        if (l) l.innerHTML = c; else {
                            l = document.createElement("tr"), t.length && (l.className = t.join(" ")), o.forEach((e => {
                                l.setAttribute(e[0], e[1])
                            })), l.innerHTML = c;
                            const e = d.querySelector("[gm-cache-key]");
                            if (e && !g(s)) {
                                const t = mo(r, e, !0)[le];
                                s[le] < t ? a.appendChild(l) : d.appendChild(l)
                            } else d.appendChild(l)
                        }
                        l[de] = s
                    })), d.insertBefore(a, d.firstChild), k.appendChild(d)
                } catch (e) {
                    Nt("render tbody error"), console.error(e)
                }
                var M;
                h || u(a, ((e, t) => {
                    St(r, e, t.isShow)
                })), await Lo(e), i && Yn.insertDOM(r, d), Jo(r, a), o || (ir.update(r), x.height() >= gt(r).height() ? x.attr("filled", "") : x.removeAttr("filled"), e.__isNested || Dt(r))
            }, rs = e => {
                const {
                    query: t,
                    supportAjaxPage: o,
                    pageData: n,
                    sortData: s,
                    mergeSort: r,
                    sortKey: a,
                    currentPageKey: i,
                    pageSizeKey: c,
                    requestHandler: l
                } = e, d = S(!0, {}, t);
                return o && (d[i] = n[i], d[c] = n[c]), w(s) || (r ? (d[a] = "", u(s, ((e, t) => {
                    d[a] = `${d[a]}${d[a] ? "," : ""}${e}:${t}`
                }))) : u(s, ((e, t) => {
                    d[`${a}${e}`] = t
                }))), l(Kt(d))
            }, as = (e, t, o) => {
                const n = Kt(o), {supportTreeData: s, treeConfig: r} = e, {treeKey: a} = r;
                let i, c = n[0];
                const l = (e, t) => {
                    const o = {};
                    t.forEach((e => {
                        o[e[ue]] = e
                    })), u(e, ((t, n) => {
                        const r = o[t[ue]] || {};
                        i = t, qt(r, t) && delete e[n], s && t[a] && l(t[a], r[a] || [])
                    }))
                };
                return l(n, t), {diffList: n, diffFirst: c, diffLast: i}
            }, is = {}, cs = e => {
                const {rowHover: t, rowClick: o, cellHover: n, cellClick: s, useCellFocus: r} = Ao(e);
                is[e] = (e => {
                    const t = "tr[gm-cache-key]", o = "tr[gm-cache-key] td";
                    return {
                        rowHover: it(et, e, t),
                        rowClick: it(Qe, e, t),
                        cellHover: it(et, e, o),
                        cellClick: it(Qe, e, o),
                        cellFocus: it(Ze, e, "td")
                    }
                })(ht(e));
                const a = is[e], i = t => [mo(e, t), parseInt(t.getAttribute(ue), 10)];
                t && (() => {
                    let o;
                    const n = a.rowHover;
                    Q(n.target).on(n.events, n.selector, (function () {
                        o !== this && (o = this, rn(e, this, t(...i(this), this), (() => {
                            o = null
                        })))
                    }))
                })(), o && (() => {
                    const t = a.rowClick;
                    Q(t.target).on(t.events, t.selector, (function () {
                        rn(e, this, o(...i(this), this))
                    }))
                })();
                const c = t => {
                    const o = t.parentNode;
                    return [mo(e, o), parseInt(o.getAttribute(ue), 10), t.cellIndex]
                };
                n && (() => {
                    let t;
                    const o = a.cellHover;
                    Q(o.target).on(o.events, o.selector, (function () {
                        t !== this && (t = this, rn(e, this, n(...c(t), this), (() => {
                            t = null
                        })))
                    }))
                })(), s && (() => {
                    const t = a.cellClick;
                    Q(t.target).on(t.events, t.selector, (function () {
                        rn(e, this, s(...c(this), this))
                    }))
                })(), r && (() => {
                    const t = a.cellFocus;
                    Q(t.target).on(t.events, t.selector, (function () {
                        bt(e).find("[gm-focus-td]").removeAttr(fe), this.setAttribute(fe, "")
                    }))
                })()
            };
            const ls = new class {
                refresh(e, t) {
                    const o = Ao(e), {
                        disableAutoLoading: n,
                        loadingTemplate: s,
                        ajaxBeforeSend: r,
                        ajaxSuccess: a,
                        ajaxError: i,
                        ajaxComplete: c,
                        checkboxConfig: l
                    } = o;
                    l.disableStateKeep && xo(e, [], !0), $s.updateRefreshIconState(e, !0), !n && lt(e, s);
                    let d = (e => {
                        const t = rs(e), {
                            supportAjaxPage: o,
                            pageData: n,
                            sortData: s,
                            sortKey: r,
                            ajaxType: a,
                            ajaxHeaders: i,
                            ajaxXhrFields: c,
                            ajaxData: l
                        } = e;
                        o && u(n, ((e, o) => {
                            n[e] = t[e] || o
                        })), u(s, ((e, o) => {
                            s[e] = t[`${r}${e}`] || o
                        })), Mo(e);
                        const d = v(l) ? l(e, t) : l;
                        return m(d) ? new Promise(((e, o) => {
                            _({url: d, type: a, data: t, headers: i, xhrFields: c, cache: !0, success: e, error: o})
                        })) : d instanceof Promise ? d : new Promise((e => {
                            e(d)
                        }))
                    })(o);
                    r(d), d.then((o => {
                        try {
                            const s = Ao(e);
                            setTimeout((() => {
                                this.driveDomForSuccessAfter(s, o, t), a(o), c(o), !n && dt(e), $s.updateRefreshIconState(e, !1)
                            }))
                        } catch (e) {
                            console.error(e)
                        }
                    })).catch((t => {
                        i(t), c(t), !n && dt(e), $s.updateRefreshIconState(e, !1)
                    }))
                }

                async changeTableData(e, t, o) {
                    const n = Ao(e);
                    if (0 === t.length) return ns(n), void bo(e, []);
                    let s = vo(e, !0);
                    const r = o ? ((e, t) => {
                        const {
                            columnMap: o,
                            rowRenderHandler: n,
                            pageData: s,
                            supportAutoOrder: r,
                            supportCheckbox: a,
                            checkboxConfig: i,
                            pageSizeKey: c,
                            currentPageKey: l,
                            supportTreeData: d,
                            treeConfig: u,
                            fullColumn: h
                        } = Ao(e), p = i.key;
                        let f = 0;
                        const m = (e, t, o, n) => {
                            let s = o.toString();
                            g(n) || (s = `${n}-${o}`);
                            const {topTemplate: r, bottomTemplate: a} = h || {};
                            if (v(r) && f++, e[le] = f, f++, v(a) && f++, (v(r) || v(a)) && f++, d) {
                                const o = e[u.treeKey];
                                o && o.length && o.forEach(((e, o) => {
                                    m(e, t + 1, o, s)
                                }))
                            }
                            e[ue] = s, e[he] = t
                        };
                        return t.map(((t, i) => {
                            if (r) {
                                let e = 1;
                                s && s[c] && s[l] && (e = s[c] * (s[l] - 1) + 1), t.gm_order = e + i
                            }
                            return a && (t.gm_checkbox = yo(e).some((e => qt(ct(o, e), ct(o, t), p))), t.gm_checkbox_disabled = !1), m(t, 0, i), n(t, i)
                        }))
                    })(e, t) : t;
                    xo(e, r), bo(e, r);
                    const {virtualScroll: a, supportCheckbox: i, checkboxConfig: c} = n, {
                        useVirtualScroll: l,
                        virtualNum: d
                    } = a, u = pt(e), h = mt(e).height();
                    if (!l || d >= r.length) {
                        Zs.virtualScrollMap[e] && (s = []);
                        const {diffList: t, diffFirst: o, diffLast: a} = as(n, s, r);
                        return await ss(n, t, !1, o[ue], a[ue]), i && zs(e, r, c.useRadio, c.max), delete Zs.virtualScrollMap[e], void u.css({
                            marginTop: -h,
                            marginBottom: 0
                        })
                    }
                    const p = gt(e), f = bt(e);
                    let m = vo(e, !0), b = parseInt(n.lineHeight, 10);
                    const y = p.height();
                    let x, w, k = [];
                    Zs.virtualScrollMap[e] = async t => {
                        const o = Ao(e), {supportCheckbox: n, checkboxConfig: s} = o;
                        m = vo(e, !0);
                        const r = p.scrollTop();
                        if (x && r === x) return;
                        const a = f.find("tr[gm-cache-key]").eq(0);
                        if (a.length && (b = a.height()), x && Math.abs(r - x) < b) return;
                        x = r;
                        const i = Math.ceil(y / b);
                        let c = Math.ceil(r / b) - Math.ceil((d - i) / 2);
                        c < 0 && (c = 0);
                        let l = c + d;
                        l >= m.length && (l = m.length, c = l - d), c < 0 && (c = 0);
                        const g = c * b;
                        u.css({marginTop: g - h, marginBottom: (m.length - l) * b}), o.virtualScroll.top = g, Mo(o);
                        const v = m.slice(c, l), {diffList: C, diffFirst: $, diffLast: T} = as(o, k, v);
                        k = v, await ss(o, C, t, $[ue], T[ue]), w && clearTimeout(w), w = setTimeout((() => {
                            clearTimeout(w), n && zs(e, m, s.useRadio, s.max)
                        }), 300)
                    }, Zs.virtualScrollMap[e](!1)
                }

                async driveDomForSuccessAfter(e, t, o) {
                    const {
                        _: n,
                        rendered: s,
                        responseHandler: r,
                        supportAjaxPage: a,
                        supportMenu: i,
                        dataKey: c,
                        totalsKey: l,
                        useNoTotalsMode: d,
                        asyncTotals: u
                    } = e;
                    if (!s) return;
                    if (!t) return void Nt("response undefined！please check ajaxData");
                    let h = m(t) ? JSON.parse(t) : t;
                    h = r(Kt(h));
                    let p = h[c], g = h[l];
                    if (p && k(p)) if (!a || d || u || !isNaN(parseInt(g, 10))) {
                        if (0 === p.length) h[l] = 0; else {
                            const e = gt(n);
                            e.removeClass(Te), e.scrollTop(0)
                        }
                        await this.changeTableData(n, p, !0), a && $s.resetPageData(e, h[l], p.length), i && Qo(n), v(o) && o(h)
                    } else Nt(`response.${l} undefined，please check totalsKey`); else Nt(`response.${c} is not Array，please check dataKey`)
                }

                async createDOM(e, t) {
                    const {_: o, lineHeight: n, useWordBreak: s} = t;
                    Ro(o), e.wrap(An.getWrapTpl({settings: t}), ".table-div");
                    const a = r.createElement("thead");
                    a.setAttribute(re, o), e.append(a);
                    const i = r.createElement("tbody");
                    i.setAttribute(ie, o), s && i.setAttribute("word-break", ""), e.append(i);
                    const c = r.createElement("thead");
                    c.setAttribute(ae, o), e.append(c), cs(o), Et(o, n), await this.waitContainerAvailable(o), await os(t), Pt(t), Zs.init(o)
                }

                waitContainerAvailable(e) {
                    const t = r.querySelector(`[${ee}="${e}"]`);

                    function o() {
                        return "100%" !== h(t, "width")
                    }

                    if (!o()) return new Promise((t => {
                        go[e] = setInterval((() => {
                            o() && (clearInterval(go[e]), go[e] = null, t())
                        }), 50)
                    }))
                }

                destroy(e) {
                    Ht(is[e]);
                    try {
                        const t = pt(e), o = ft(e);
                        if (!t.length || !o.length) return;
                        const n = t.get(0);
                        Me.forEach((e => {
                            let o = n["__" + e];
                            o ? t.attr(e, o) : t.removeAttr(e), delete n["__" + e]
                        })), t.html(""), o.after(t), o.remove()
                    } catch (e) {
                    }
                }
            };
            var ds = o(986), us = o.n(ds);
            const hs = {};
            var ps = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };

            class gs {
                init({_: e, defaultValue: t = "", onChange: o}) {
                    var n;
                    hs[e] = {
                        open: it(Qe, n = `[${ne}="${e}"]`, ".gm-dropdown .gm-dropdown-text"),
                        close: it(Qe, "body"),
                        selected: it(Qe, n, ".gm-dropdown .gm-dropdown-list >li")
                    };
                    const {open: s, close: r, selected: a} = hs[e], i = ft(e).find(".gm-dropdown"),
                        c = i.find(".gm-dropdown-text"), l = i.find(".gm-dropdown-list");
                    c.text(t), Q(s.target).on(s.events, s.selector, (function (e) {
                        e.stopPropagation();
                        const t = Q(r.target);
                        if ("block" === l.css("display")) return l.hide(), void t.unbind(r.events);
                        l.show();
                        const o = r.events;
                        t.unbind(o), t.bind(o, (function () {
                            t.unbind(o), l.hide()
                        }))
                    })), Q(a.target).on(a.events, a.selector, (function () {
                        const e = parseInt(c.text(), 10), t = this.value;
                        e !== t && (c.text(t), o(t, e))
                    }))
                }

                createHtml(e) {
                    const {sizeData: t} = e;
                    let o = "";
                    return t.forEach((e => {
                        o += `<li value="${e}">${e}</li>`
                    })), {li: o}
                }

                destroy(e) {
                    Ht(hs[e])
                }
            }

            ps([_o(us())], gs.prototype, "createHtml", null);
            const fs = new gs;
            var ms = o(956), vs = o.n(ms);
            const bs = e => `[${ne}="${e}"]`, ys = {};
            var xs = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
            const ws = (e, t, o) => {
                const {useNoTotalsMode: n, currentPageKey: s} = t;
                n && e.attr("no-totals-mode", "true");
                Q("[pagination-number]", e).html(((e, t) => {
                    let o = Number(t[e] || 0), n = Number(t.tPage || 0), s = "", r = "", a = 1, i = n;
                    if (o > 4 && (s += '<li to-page="1">1</li><li class="disabled">...</li>', a = o - 2), n - o > 4 && (i = o + 2, r += `<li class="disabled">...</li><li to-page="${n}">${n}</li>`), t.tSize) for (; a <= i; a++) s += a !== o ? `<li to-page="${a}">${a}</li>` : `<li class="active">${o}</li>`;
                    return s += r, s
                })(s, o));
                const r = o[s], a = Q("[pagination-before] .first-page", e),
                    i = Q("[pagination-before] .previous-page", e), c = Q("[pagination-after] .next-page", e),
                    l = Q("[pagination-after] .last-page", e), d = Boolean(a.length), u = Boolean(i.length),
                    h = Boolean(c.length), p = Boolean(l.length);
                1 === r ? (d && a.addClass(Re), u && i.addClass(Re)) : (d && a.removeClass(Re), u && i.removeClass(Re)), r >= o.tPage ? (h && c.addClass(Re), p && l.addClass(Re)) : (h && c.removeClass(Re), p && l.removeClass(Re))
            }, ks = (e, t) => {
                (!t || t < 1) && (t = 1);
                const {
                    _: o,
                    useNoTotalsMode: n,
                    currentPageKey: s,
                    pageData: r,
                    pageSize: a,
                    pageSizeKey: i,
                    sortData: c,
                    query: l,
                    pagingBefore: d,
                    pagingAfter: u
                } = e, {tPage: h} = r;
                !n && t > h && (t = h), r[s] = t, r[i] = r[i] || a, Mo(e);
                const p = S({}, l, c, r);
                d(p), ls.refresh(o, (() => {
                    u(p)
                }))
            };

            class Cs {
                init(e) {
                    const {
                        _: t,
                        disableCache: o,
                        pageSizeKey: n,
                        pageSize: s,
                        currentPageKey: r,
                        useNoTotalsMode: a
                    } = e;
                    ys[t] = (e => {
                        const t = `[${ne}="${e}"]`;
                        return {
                            input: it("keyup", t, ".gp-input"),
                            first: it(Qe, t, "[pagination-before] .first-page"),
                            previous: it(Qe, t, "[pagination-before] .previous-page"),
                            next: it(Qe, t, "[pagination-after] .next-page"),
                            last: it(Qe, t, "[pagination-after] .last-page"),
                            num: it(Qe, t, "[pagination-number] li"),
                            refresh: it(Qe, t, ".refresh-action")
                        }
                    })(t);
                    let i = s || 10;
                    if (!o) {
                        const e = ko(t)[n];
                        e && (i = e)
                    }
                    S(e, {pageData: {[n]: i, [r]: 1}}), a && (e.asyncTotals = null), Mo(e);
                    const c = {
                        _: t, defaultValue: e.pageData[n], onChange: e => {
                            const o = Ao(t);
                            o.pageData = {[r]: 1, [n]: e}, Co(o), Mo(o);
                            const s = S({}, o.query, o.sortData, o.pageData);
                            o.pagingBefore(s), ls.refresh(t, (() => {
                                o.pagingAfter(s)
                            }))
                        }
                    };
                    fs.init(c), this.initEvent(t)
                }

                initEvent(e) {
                    const {first: t, previous: o, next: n, last: s, num: r, refresh: a, input: i} = ys[e];
                    Q(t.target).on(t.events, t.selector, (function () {
                        ks(Ao(e), 1)
                    })), Q(o.target).on(o.events, o.selector, (function () {
                        const t = Ao(e), o = t.pageData[t.currentPageKey] - 1;
                        ks(t, o < 1 ? 1 : o)
                    })), Q(n.target).on(n.events, n.selector, (function () {
                        const t = Ao(e), o = t.pageData[t.currentPageKey], n = t.pageData.tPage, s = o + 1;
                        ks(t, s > n ? n : s)
                    })), Q(s.target).on(s.events, s.selector, (function () {
                        const t = Ao(e);
                        ks(t, t.pageData.tPage)
                    })), Q(r.target).on(r.events, r.selector, (function () {
                        const t = Ao(e), o = Q(this), n = o.attr("to-page");
                        if (!n || !Number(n) || o.hasClass(Re)) return !1;
                        ks(t, parseInt(n, 10))
                    })), Q(a.target).on(a.events, a.selector, (function () {
                        const t = Ao(e);
                        ks(t, t.pageData[t.currentPageKey])
                    })), Q(i.target).on(i.events, i.selector, (function (t) {
                        13 === t.which && ks(Ao(e), parseInt(this.value, 10))
                    }))
                }

                createHtml(e) {
                    const {settings: t} = e;
                    return {
                        gridManagerName: t._,
                        keyName: ne,
                        gotoFirstText: Ko(t, "goto-first-text"),
                        gotoLastText: Ko(t, "goto-last-text"),
                        firstPageText: Ko(t, "first-page"),
                        previousPageText: Ko(t, "previous-page"),
                        nextPageText: Ko(t, "next-page"),
                        lastPageText: Ko(t, "last-page"),
                        pageSizeOptionTpl: fs.createHtml(t)
                    }
                }

                resetPageData(e, t, o) {
                    const {
                        _: n,
                        useNoTotalsMode: s,
                        currentPageKey: r,
                        pageData: a,
                        asyncTotals: i,
                        pageSizeKey: c,
                        pageSize: l
                    } = e, d = Q(bs(n)), u = a[r] || 1, h = a[c] || l, p = (t, n) => {
                        const s = ((e, t, o) => {
                            const {pageData: n, pageSizeKey: s, pageSize: r, currentPageKey: a} = e, i = n[s] || r,
                                c = n[a] || 1;
                            let l = 1;
                            return l = t ? Math.ceil(t / i) : o < i ? c : c + 1, {
                                tPage: l,
                                [a]: c > l ? 1 : c,
                                [s]: i,
                                tSize: t
                            }
                        })(e, t, o);
                        ws(d, e, s), ((e, t, o, n) => {
                            const {currentPageKey: s, pageSizeKey: r} = t, a = 1 === o[s] ? 1 : (o[s] - 1) * o[r] + 1,
                                i = o[s] * o[r];
                            let c = o.tSize;
                            const l = o[s];
                            let d = o.tPage;
                            !c && n && (c = d = n);
                            const u = Q(".page-info", e);
                            if (u.length) {
                                const e = Ko(t, "page-info", [a, i, c]);
                                u.html(e)
                            }
                            const h = Q("[begin-number-info]", e);
                            h.length && (h.html(a), h.val(a));
                            const p = Q("[end-number-info]", e);
                            p.length && (p.html(i), p.val(i));
                            const g = Q("[current-page-info]", e);
                            g.length && (g.html(l), g.val(l));
                            const f = Q("[totals-number-info]", e);
                            f.length && (f.html(c), f.val(c));
                            const m = Q("[totals-page-info]", e);
                            m.length && (m.html(d), m.val(d))
                        })(d, e, s, n), Mo(S(!0, e, {pageData: s})), d.css("visibility", "visible")
                    };
                    if (i) return o < h ? void p((u - 1) * h + o) : (p(null, i.text), void i.handler(e, rs(e)).then((e => {
                        p(e)
                    })));
                    s ? p() : p(t)
                }

                updateRefreshIconState(e, t) {
                    const o = Q(`${bs(e)} .refresh-action`);
                    if (!o.length) return;
                    const n = "refreshing";
                    t ? o.addClass(n) : setTimeout((() => {
                        o.removeClass(n)
                    }), 3e3)
                }

                updateCheckedInfo(e) {
                    const t = Q(`${bs(e)} .toolbar-info.checked-info`);
                    0 !== t.length && t.html(Ko(Ao(e), "checked-info", yo(e).length))
                }

                destroy(e) {
                    Ht(ys[e])
                }
            }

            xs([_o(vs())], Cs.prototype, "createHtml", null);
            const $s = new Cs;
            var Ts = o(692), Ss = o.n(Ts), Ds = o(976), js = o.n(Ds), As = o(963), Ms = o.n(As);
            const Os = {}, _s = (e, t, o, n, s) => {
                const r = vo(e), a = [];
                return o && !n && r.forEach((e => {
                    e.gm_checkbox_disabled || (e.gm_checkbox !== t && a.push(e), e.gm_checkbox = t)
                })), o || s || !n || (r[n].gm_checkbox = t, a.push(r[n])), s && r.forEach((e => {
                    e[ue] === n ? (e.gm_checkbox = !0, a.push(e)) : e.gm_checkbox = !1
                })), bo(e, r), xo(e, a, s), r
            };
            var Ps = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
            const Hs = "disabled-selected", Es = (e, t) => {
                const o = Q('input[type="radio"]', e), n = "gm-radio-checked";
                t ? e.addClass(n) : e.removeClass(n), o.prop(Oe, t)
            }, Rs = (e, t) => {
                const o = Q('input[type="checkbox"]', e);
                switch (t) {
                    case Oe:
                        e.addClass(He), e.removeClass(Ee), o.prop(Oe, !0);
                        break;
                    case _e:
                        e.removeClass(He), e.addClass(Ee), o.prop(Oe, !1);
                        break;
                    case Pe:
                        e.removeClass(He), e.removeClass(Ee), o.prop(Oe, !1)
                }
            }, zs = (e, t, o, n) => {
                const s = pt(e);
                let r = 0, a = t.length;
                t && t.forEach(((e, t) => {
                    const n = e.gm_checkbox, i = Q(`tbody tr[gm-cache-key="${t}"]`, s),
                        c = Q("td[gm-checkbox] .gm-radio-checkbox", i);
                    i.attr(Oe, n), o ? Es(c, n) : Rs(c, n ? Oe : Pe), e.gm_checkbox_disabled && a--, !e.gm_checkbox_disabled && n && r++
                }));
                const i = Q("thead tr th[gm-checkbox] .gm-checkbox-wrapper", s), c = Q(".gm-checkbox ", i);
                if (!o && Rs(c, 0 === r ? Pe : r === a ? Oe : _e), $s.updateCheckedInfo(e), !o && b(n)) {
                    const t = Q("tbody .gm-checkbox-wrapper ", s);
                    u(t, (t => {
                        const o = Q(t);
                        Q(".gm-checkbox", o).hasClass("gm-checkbox-checked") || (yo(e).length >= n ? o.addClass(Hs) : o.removeClass(Hs))
                    })), t.length > n ? i.addClass(Hs) : i.removeClass(Hs)
                }
            };

            class Ls {
                init(e) {
                    var t;
                    Os[e] = (t = ht(e), {
                        allChange: it(Qe, t, "th[gm-checkbox] .gm-checkbox-wrapper"),
                        checkboxChange: it(Qe, t, "td[gm-checkbox] .gm-checkbox-wrapper"),
                        radioChange: it(Qe, t, "td[gm-checkbox] .gm-radio-wrapper"),
                        trChange: it(Qe, t, "tbody > tr[gm-cache-key]")
                    });
                    const {allChange: o, checkboxChange: n, radioChange: s, trChange: r} = Os[e], {
                        checkboxConfig: a,
                        checkedBefore: i,
                        checkedAllBefore: c,
                        checkedAfter: l,
                        checkedAllAfter: d
                    } = Ao(e), {max: u, useRowCheck: h} = a;
                    Q(o.target).on(o.events, o.selector, (function () {
                        let t = yo(e);
                        const o = this.querySelector(".gm-checkbox-input"), n = o.checked;
                        if (i(t, !n), !1 === c(t, !n)) return void (o.checked = !n);
                        const s = _s(e, n, !0);
                        zs(e, s), t = yo(e), l(t, n), d(t, n)
                    })), Q(n.target).on(n.events, n.selector, (function () {
                        const t = Q(this).closest("tr").get(0), o = this.querySelector(".gm-checkbox-input"),
                            n = o.checked;
                        if (!1 === i(yo(e), !n, mo(e, t))) return void (o.checked = !n);
                        const s = t.getAttribute(ue), r = _s(e, n, !1, s);
                        zs(e, r, !1, u), l(yo(e), n, mo(e, t))
                    })), Q(s.target).on(s.events, s.selector, (function () {
                        const t = Q(this).closest("tr").get(0), o = this.querySelector(".gm-radio-input"),
                            n = o.checked;
                        if (!1 === i(yo(e), "true" === t.getAttribute("checked"), mo(e, t))) return void (o.checked = !n);
                        const s = t.getAttribute(ue), r = _s(e, void 0, !1, s, !0);
                        zs(e, r, !0), l(yo(e), !0, mo(e, t))
                    })), h && Q(r.target).on(r.events, r.selector, (function (t) {
                        if (this.getAttribute(pe)) return;
                        const o = mo(e, this, !0), n = Q("td[gm-checkbox] label", this), s = t.target;
                        let r = Q(s);
                        "TD" !== s.nodeName && (r = r.closest("td")), o.gm_checkbox_disabled || m(r.attr(Hs)) || n.hasClass(Hs) || -1 !== [].indexOf.call(s.classList, "gm-radio-checkbox-input") || n.find("input").trigger("click")
                    }))
                }

                addSign(e) {
                    return e.disableRowCheck ? Hs : ""
                }

                getCheckedTr(e) {
                    return r.querySelectorAll(`${ht(e)} tbody tr[checked="true"]`)
                }

                getColumn(e) {
                    return {
                        key: Ce,
                        text: e.useRadio ? "" : this.getCheckboxTpl({}),
                        isAutoCreate: !0,
                        isShow: !0,
                        [Ne]: !0,
                        width: e.width,
                        fixed: e.fixed,
                        template: (t, o, n, s) => this.getColumnTemplate({
                            checked: t,
                            disabled: o.gm_checkbox_disabled,
                            useRadio: e.useRadio,
                            isTop: s
                        })
                    }
                }

                getColumnTemplate(e) {
                    const {checked: t, disabled: o, useRadio: n, isTop: s} = e;
                    return {
                        template: s ? n ? this.getRadioTpl({
                            checked: t,
                            disabled: o
                        }) : this.getCheckboxTpl({checked: t, disabled: o}) : ""
                    }
                }

                getCheckboxTpl(e) {
                    const {checked: t, disabled: o, label: n, value: s} = e;
                    return {checked: t ? Oe : Pe, disabled: o, label: n, value: s}
                }

                getRadioTpl(e) {
                    const {checked: t, disabled: o, label: n, value: s} = e;
                    return {checked: t, disabled: o, label: n, value: s}
                }

                destroy(e) {
                    Ht(Os[e])
                }
            }

            Ps([_o(Ss())], Ls.prototype, "getColumnTemplate", null), Ps([_o(js())], Ls.prototype, "getCheckboxTpl", null), Ps([_o(Ms())], Ls.prototype, "getRadioTpl", null);
            const Ns = new Ls;
            var qs = o(271), Ks = o.n(qs);
            const Bs = {}, Fs = "no-click", Is = "gm-config-ing", Gs = "gm-config-area";
            var Ws = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };
            const Js = e => Q(`[${oe}="${e}"]`), Us = e => {
                const t = ft(e), o = Js(e), n = o.find(".config-list").get(0), s = o.find(".config-info");
                o.css("visibility", "hidden"), setTimeout((() => {
                    n.style.maxHeight = (t.height() - 90 - 20 - s.height() || 0) + Ke, o.css("visibility", "inherit")
                }))
            };

            class Vs {
                init(e) {
                    const t = this;
                    Bs[e] = (e => {
                        const t = `[${oe}="${e}"]`;
                        return {
                            closeConfig: it(Qe, t, ".config-action"),
                            liChange: it(Qe, t, ".config-list li"),
                            closeConfigByBody: it("mousedown.closeConfig", "body")
                        }
                    })(e);
                    const {closeConfig: o, liChange: n} = Bs[e];
                    Q(o.target).on(o.events, o.selector, (function () {
                        t.hide(e)
                    })), Q(n.target).on(n.events, n.selector, (function (o) {
                        o.preventDefault();
                        const n = Q(this);
                        if (n.hasClass(Fs)) return !1;
                        const s = n.find(".gm-checkbox"), r = n.attr(ce), a = Js(e), i = gt(e);
                        Q(".config-list .no-click", a).removeClass(Fs);
                        let c = !n.find('input[type="checkbox"]').prop(Oe);
                        c ? s.addClass(He) : s.removeClass(He), i.addClass(Is), St(e, r, c), i.removeClass(Is);
                        const l = Q(".checked-li", a);
                        1 === l.length && l.addClass(Fs), t.update(e)
                    }))
                }

                updateConfigList(e) {
                    const t = Js(e), o = Q(".config-list", t);
                    let n = 0;
                    const s = [];
                    u(Ao(e).columnMap, ((e, t) => {
                        s[t.index] = t
                    })), o.html(""), u(s, (t => {
                        const {key: s, isShow: r} = t;
                        if (t.disableCustomize) return;
                        const a = xt(e, s).find(".th-text").text();
                        o.append(this.createColumn({key: s, isShow: r, label: a})), r && n++
                    }));
                    const r = Q(".checked-li", t);
                    1 === n ? r.addClass(Fs) : r.removeClass(Fs)
                }

                update(e) {
                    let t = Oo(e);
                    gt(e).scrollLeft(0), jt(t), t = Oo(e), Ot(t), ir.update(e), Dt(e), _t(e), ir.resetFlag(e)
                }

                createHtml(e) {
                    return {key: `${oe}="${e._}"`, info: e.configInfo}
                }

                createColumn(e) {
                    const {key: t, isShow: o, label: n} = e;
                    return `<li th-name="${t}"${o ? ' class="checked-li"' : ""}>${Ns.getCheckboxTpl({
                        checked: o,
                        label: n
                    })}</li>`
                }

                toggle(e) {
                    "block" === Js(e).css("display") ? this.hide(e) : this.show(e)
                }

                show(e) {
                    const t = Js(e);
                    this.updateConfigList(e), t.show(), Us(e);
                    const {closeConfigByBody: o} = Bs[e], n = o.events, s = Q(o.target);
                    s.off(n), s.on(n, (function (e) {
                        const o = Q(e.target);
                        if (o.hasClass(Gs) || 1 === o.closest(".gm-config-area").length) return !1;
                        t.hide(), s.off(n)
                    }))
                }

                hide(e) {
                    Js(e).hide()
                }

                destroy(e) {
                    Ht(Bs[e])
                }
            }

            Ws([_o(Ks())], Vs.prototype, "createHtml", null);
            const Ys = new Vs, Xs = {}, Qs = {};
            const Zs = new class {
                    constructor() {
                        this.width = 0, this.pauseResizeEventMap = {}, this.virtualScrollMap = {}
                    }

                    init(e) {
                        this.bindResizeToTable(e), this.bindScrollToTableDiv(e), this.width = (e => {
                            const t = r.createElement("div");
                            t.style.width = "100px", t.style.height = "100px", t.style.overflow = "scroll", t.style.scrollbarWidth = "thin", gt(e).get(0).appendChild(t);
                            const o = t.offsetWidth - t.clientWidth;
                            return t.remove(), o
                        })(e)
                    }

                    update(e) {
                        const t = ft(e);
                        let o = Qs[e], n = Ao(e);
                        if (1 === t.length) {
                            this.pauseResizeEventMap[e] = !0;
                            try {
                                const s = t.width();
                                o && s !== o && (jt(n), Mo(n)), Qs[e] = s, _t(e), Ot(n), ir.update(e), sn(e), n.supportConfig && Us(e)
                            } catch (e) {
                            }
                            setTimeout((() => {
                                delete this.pauseResizeEventMap[e]
                            }))
                        }
                    }

                    bindResizeToTable(e) {
                        const t = ft(e).parent(), o = s.ResizeObserver;
                        if (o) {
                            const n = new o((() => {
                                this.pauseResizeEventMap[e] || this.update(e)
                            })), s = t.get(0);
                            return n.observe(s), void (Xs[e] = {observer: n, el: s})
                        }
                        Q(s).bind(`resize.${e}`, (() => {
                            this.pauseResizeEventMap[e] || this.update(e)
                        })), setTimeout((() => {
                            this.update(e)
                        }))
                    }

                    bindScrollToTableDiv(e) {
                        const t = gt(e), o = this.virtualScrollMap;
                        t.unbind(nt), t.bind(nt, (() => {
                            const t = o[e];
                            t && t(!0), Ot(Ao(e), !0), ir.update(e), sn(e)
                        }))
                    }

                    destroy(e) {
                        Q(s).unbind(`resize.${e}`), gt(e).unbind(nt);
                        const t = Xs[e];
                        t && t.el && t.observer && (t.observer.unobserve(t.el), delete Xs[e]), delete this.virtualScrollMap[e]
                    }
                }, er = {}, tr = (e, t, o, n) => {
                    t.setProperty(`--gm-${e}-${o}-sticky-value`, n + Ke)
                },
                or = (e, t, o, n) => `[${te}="${e}"][gm-overflow-x="true"] tr:not([empty-template]) td:nth-of-type(${t + 1}){position: sticky;\nposition: -webkit-sticky;\n${o}: var(--gm-${e}-${t}-sticky-value);\nz-index: 3;\nbox-shadow: ${n};}`,
                nr = {}, sr = {}, rr = {}, ar = "fixed-focus";
            const ir = new class {
                init(e) {
                    const {_: t, browser: o, columnMap: n} = e, s = ht(t);
                    er[t] = {fixedFocus: it(Ze, s, "td[fixed]")};
                    const {fixedFocus: a} = er[t];
                    Q(a.target).on(a.events, a.selector, (function () {
                        bt(t).find("[fixed-focus]").removeAttr(ar), this.setAttribute(ar, "")
                    }));
                    const i = vt(t), c = mt(t).height() + Ke;
                    let l = "", d = 0, h = 0;
                    const p = [], g = [];
                    u(n, ((e, t) => {
                        "left" === t.fixed && p.push(t), "right" === t.fixed && g.push(t)
                    }));
                    const f = p.length;
                    let m = "none";
                    nr[t] = p.sort(((e, t) => e.index - t.index)), u(nr[t], ((e, o) => {
                        const n = xt(t, e.key);
                        o === f - 1 && (m = "2px 0 4px #e8e8e8"), l += or(t, e.index, "left", m), e.pl = d, d += e.width, n.css({
                            height: c,
                            lineHeight: c,
                            boxShadow: m
                        })
                    })), "safari" === o && d--, i.css("padding-left", d), m = "none";
                    const v = g.length;
                    sr[t] = g.sort(((e, t) => t.index - e.index)), sr[t].forEach(((e, o) => {
                        const n = xt(t, e.key);
                        o === v - 1 && (m = "-2px 0 4px #e8e8e8"), n.css({
                            height: c,
                            lineHeight: c,
                            boxShadow: m
                        }), l += or(t, e.index, "right", m), e.pr = h, h += e.width
                    })), i.css("padding-right", h);
                    const b = gt(t), y = `fixed-style-${t}`;
                    let x = r.getElementById(y);
                    x || (x = r.createElement("style"), x.id = y, b.append(x), x = r.getElementById(y)), x.innerHTML = l, this.resetFlag(t)
                }

                update(e) {
                    const t = gt(e), o = t.get(0).style, n = t.scrollLeft(), s = t.width(), r = vt(e).width(),
                        a = bt(e).height();
                    if (rr[e] && rr[e].divWidth === s && rr[e].scrollLeft === n && rr[e].theadWidth === r && rr[e].tbodyHeight === a) return;
                    rr[e] = {divWidth: s, scrollLeft: n, theadWidth: r, tbodyHeight: a};
                    const i = "true" === gt(e).attr("gm-overflow-x"), c = (e, t) => i ? yt(e, t.key).width() : t.width;
                    if (nr[e] && nr[e].length) {
                        let t, s = 0;
                        u(nr[e], (r => {
                            t = c(e, r), xt(e, r.key).css({width: t, left: s + n}), tr(e, o, r.index, s), s += t
                        })), vt(e).css("padding-left", s)
                    }
                    if (sr[e] && sr[e].length) {
                        let s = r - t.width() - n;
                        bt(e).height() > t.get(0).clientHeight && (s += Zs.width);
                        let a, i = 0;
                        sr[e].forEach((t => {
                            a = c(e, t), xt(e, t.key).css({width: a, right: i + s}), tr(e, o, t.index, i), i += a
                        })), vt(e).css("padding-right", i)
                    }
                }

                resetFlag(e) {
                    if (!sr[e] || !sr[e].length) return;
                    const t = "fixed-previous", o = vt(e).find('th[fixed="right"]').eq(0), n = kt(e), s = o.index(n);
                    n.removeAttr(t), n.eq(s - 1).attr(t, "")
                }

                destroy(e) {
                    delete nr[e], delete sr[e], Ht(er[e])
                }
            }, cr = "gm-adjust-ing";
            const lr = {};
            const dr = new class {
                get html() {
                    return '<span class="gm-adjust-action"></span>'
                }

                init(e) {
                    lr[e] = function (e, t) {
                        return {
                            start: it(Ze, t, `[grid-manager-mock-thead="${e}"] .gm-adjust-action`),
                            doing: it(et, `[${te}="${e}"]`, t),
                            abort: it("mouseup mouseleave", t)
                        }
                    }(e, ht(e));
                    const {start: t} = lr[e];
                    Q(t.target).on(t.events, t.selector, (function (t) {
                        const o = Q(this).closest("th"), n = o.find(".th-wrap");
                        let s = o.find(".gm-adjust-ing");
                        if (!s.length) {
                            const e = r.createElement("span");
                            e.className = cr, n.append(e), s = o.find(".gm-adjust-ing")
                        }
                        const a = o.height();
                        s.css({
                            top: -(a - n.height()) / 2,
                            right: -(o.width() - n.width() + 1) / 2,
                            height: gt(e).height() + a
                        });
                        const i = pt(e), {adjustBefore: c, adjustAfter: l, isIconFollowText: d, columnMap: u} = Ao(e),
                            h = kt(e), p = h.eq(o.index(h) + 1);
                        c(t), i.addClass($e), ((e, t, o, n, s) => {
                            let r, a = o.width();
                            const i = gt(e).width(), {doing: c} = lr[e], l = vt(e), d = t.offset().left,
                                u = l.width() - a - t.width();
                            Q(c.target).on(c.events, c.selector, (function (c) {
                                r = Math.ceil(c.clientX - d);
                                const h = t.width();
                                if (r !== h) {
                                    if (s > r) {
                                        if (r <= n) return;
                                        const e = u + r + a;
                                        e < i && (a = a + i - e)
                                    }
                                    s < r && (a = o.width()), l.width(u + r + a), t.css({
                                        width: r,
                                        "max-width": r
                                    }), o.css({width: a, "max-width": a}), ir.update(e)
                                }
                            }))
                        })(e, o, p, At(e, u[Ct(o)], d), Math.ceil(t.clientX - o.offset().left)), ((e, t, o, n) => {
                            const {doing: s, abort: r} = lr[e];
                            Q(r.target).on(r.events, (a => {
                                Q(r.target).off(r.events), Q(s.target).off(s.events, s.selector);
                                const i = Oo(e, !0).columnMap;
                                for (let t in i) yt(e, t).width(i[t].width);
                                _t(e), Zs.update(e), n(a), t.removeClass($e), o.find(".gm-adjust-ing").remove()
                            }))
                        })(e, i, o, l)
                    }))
                }

                destroy(e) {
                    Ht(lr[e])
                }
            };
            const ur = new class {
                getColumn(e) {
                    const {autoOrderConfig: t} = e;
                    return {
                        key: we,
                        text: Ko(e, "order-text"),
                        isAutoCreate: !0,
                        isShow: !0,
                        [Ne]: !0,
                        width: t.width,
                        fixed: t.fixed,
                        template: (e, t, o, n) => `<td gm-create gm-order>${n ? e : ""}</td>`
                    }
                }
            };
            var hr = o(909), pr = o.n(hr);
            const gr = {};
            var fr = function (e, t, o, n) {
                var s, r = arguments.length, a = r < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, o, a) : s(t, o)) || a);
                return r > 3 && a && Object.defineProperty(t, o, a), a
            };

            class mr {
                init(e) {
                    const t = this, o = pt(e), n = Q("body");
                    gr[e] = ((e, t) => ({
                        start: it(Ze, t, `[grid-manager-mock-thead="${e}"] .gm-drag-action`),
                        doing: it("mousemove.gmDrag", "body"),
                        abort: it("mouseup.gmDrag", "body")
                    }))(e, `${ht(e)} [grid-manager-mock-thead]`);
                    const {start: s, doing: r, abort: a} = gr[e];
                    Q(s.target).on(s.events, s.selector, (function (s) {
                        let i = Ao(e);
                        const {columnMap: c, dragBefore: l, animateTime: d, dragAfter: u, supportConfig: h} = i,
                            p = Q(this).closest("th"), g = p.get(0);
                        let f = kt(e);
                        const m = ft(e), v = Tt(p, e);
                        l(s), n.addClass($e), p.addClass(ln), v.addClass(ln);
                        let b = Q(".gm-dreamland-div", m);
                        if (b.length) return;
                        m.append('<div class="gm-dreamland-div"></div>'), b = Q(".gm-dreamland-div", m), b.get(0).innerHTML = t.createHtml({
                            $table: o,
                            $th: p
                        });
                        let y = 0;
                        const x = p.width(), w = p.height(), k = o.height(), C = m.offset(),
                            $ = pageXOffset - C.left - x / 2, T = pageYOffset - C.top - w / 2;
                        b.css({width: x + 2, height: k + 2});
                        const S = Q(r.target);
                        S.off(r.events), S.on(r.events, (function (o) {
                            let n, s, r, a;
                            b.show(), y = p.index(f), y > 0 && (n = f.eq(y - 1), s = Ct(n)), y < f.length - 1 && (r = f.eq(y + 1), a = Ct(r)), n && n.length && c[s].disableCustomize ? n = void 0 : r && r.length && c[a].disableCustomize && (r = void 0), b.css({
                                left: o.clientX + $,
                                top: o.clientY + T
                            }), f = t.updateDrag(e, n, r, p, v, b, f)
                        }));
                        const D = a.events, j = Q(a.target);
                        j.off(D), j.on(D, (function (t) {
                            Q(r.target).off(r.events), j.off(D), b.animate({
                                top: o.get(0).offsetTop + Ke,
                                left: `${g.offsetLeft - gt(e).get(0).scrollLeft + Ke}`
                            }, d, (() => {
                                p.removeClass(ln), v.removeClass(ln), b.remove(), u(t)
                            })), Oo(e), h && Ys.updateConfigList(e), _t(e), ir.resetFlag(e), n.removeClass($e)
                        }))
                    }))
                }

                createHtml(e) {
                    const {$table: t, $th: o} = e, n = Tt(o, t.find("tbody tr:not([children-state])"));
                    let s = "";
                    return u(n, (e => {
                        s += `<tr style="height: ${e.offsetHeight + Ke}">${e.outerHTML}</tr>`
                    })), {class: t.get(0).className, th: o.get(0).outerHTML, tbody: s}
                }

                updateDrag(e, t, o, n, s, r, a) {
                    if (t && r.offset().left < t.offset().left) {
                        let o = Tt(t, e);
                        t.before(n), u(s, ((e, t) => {
                            o.eq(t).before(e)
                        })), yt(e, t).before(yt(e, n)), Dt(e), a = kt(e)
                    }
                    if (o && r.offset().left + r.width() > o.offset().left) {
                        let t = Tt(o, e);
                        o.after(n), u(s, ((e, o) => {
                            t.eq(o).after(e)
                        })), yt(e, o).after(yt(e, n)), Dt(e), a = kt(e)
                    }
                    return a
                }

                destroy(e) {
                    Ht(gr[e])
                }
            }

            fr([_o(pr())], mr.prototype, "createHtml", null);
            const vr = new mr;
            const br = new class {
                init(e) {
                    No[e] = (e => ({
                        openMenu: it("contextmenu", `[${ee}="${e}"]`),
                        closeMenu: it("mousedown.closeMenu", "body")
                    }))(e);
                    const {openMenu: t, closeMenu: o} = No[e];
                    Q(t.target).on(t.events, (function (n) {
                        n.preventDefault(), n.stopPropagation();
                        const s = n.target;
                        if ("TBODY" !== s.nodeName && 0 === Q(s).closest("tbody").length) return;
                        const a = Zo(e, s);
                        a.show(), a.css(((e, t, o, n) => {
                            const s = r.documentElement, a = r.body, i = s.offsetHeight, c = s.offsetWidth,
                                l = a.scrollTop || s.scrollTop, d = a.scrollLeft || s.scrollLeft;
                            return {top: (i - l < n + t ? n - t : n) + l, left: (c - d < o + e ? o - e : o) + d}
                        })(a.width(), a.height(), n.clientX, n.clientY)), a.on(t.events, (function (e) {
                            e.preventDefault(), e.stopPropagation()
                        }));
                        const i = Q(o.target), c = o.events;
                        i.off(c), i.on(c, (function (t) {
                            const o = Q(t.target);
                            o.attr(se) || 1 === o.closest("[grid-master]").length || Qo(e)
                        }))
                    }))
                }

                destroy(e) {
                    Ht(No[e]), Q(Xo(e)).remove()
                }
            }, yr = (e, t) => {
                if (t || (t = Ao(e)), t.rendered) return !0;
                Lt(`run failed，please check ${e} had been init`)
            };
            let xr = {};
            const wr = {};

            class kr {
                constructor(e, t, o) {
                    if ("TABLE" !== e.nodeName) return void Nt('nodeName !== "TABLE"');
                    Me.forEach((t => {
                        e["__" + t] = e.getAttribute(t)
                    }));
                    let n = Q(e), s = (t = S(!0, {}, kr.defaultOption, t)).gridManagerName;
                    if (m(s) ? n.attr(Z, s) : s = t.gridManagerName = ut(e), !m(s)) return void Nt("gridManagerName undefined");
                    let r = kr.get(s);
                    if (r.rendered && kr.destroy(s), wr[s] && !fo[s]) return;
                    if (wr[s] && fo[s] && (clearInterval(fo[s]), delete fo[s]), wr[s] = !0, !t || w(t)) return void Nt("init method params error");
                    if (!C(t.columnData)) return void Nt("columnData invalid");
                    if (!t.ajaxData) return void Nt("ajaxData undefined");
                    x(t.fullColumn) && (v(t.fullColumn.topTemplate) || v(t.fullColumn.bottomTemplate)) && (t.supportConfig = !1, t.supportDrag = !1, t.supportMoveRow = !1, t.supportTreeData = !1, t.__isFullColumn = !0, delete t.virtualScroll), t.supportTreeData && (t.supportMoveRow = !1, t.__isFullColumn = !1, delete t.virtualScroll), t.columnData.some((e => C(e.children))) && (t.supportConfig = !1, t.supportDrag = !1, t.supportAdjust = !1, t.disableLine = !1, t.supportMoveRow = !1, t.__isNested = !0), (() => {
                        const e = ho(be), t = co.version;
                        e || po(be, t), e && e !== t && ($o(), po(be, t))
                    })(), r = jo(t, zn.getColumn.bind(zn), Ns.getColumn.bind(Ns), ur.getColumn.bind(ur), In.getColumn.bind(In)), Ve(r._);
                    const a = () => {
                        g(n.attr(ye)) || setTimeout((() => {
                            Co(r), n.removeAttr(ye)
                        }), 1e3), r = Ao(s), delete wr[s], n.addClass("gm-ready"), r.rendered = !0, Mo(r);
                        const e = () => {
                            v(o) && o(r.query)
                        };
                        r.firstLoading ? ls.refresh(s, (() => {
                            e()
                        })) : (ns(r, !0), e()), Zs.update(r._)
                    }, i = () => {
                        n = pt(s), e = n.get(0);
                        const t = h(e, "width");
                        if (!t || "0px" === t || -1 === t.indexOf(Ke)) return !0;
                        clearInterval(fo[s]), delete fo[s], this.initTable(n, r).then(a)
                    };
                    i() && (clearInterval(fo[s]), fo[s] = setInterval((() => {
                        i()
                    }), 50))
                }

                static get version() {
                    return co.version
                }

                static get defaultOption() {
                    return xr
                }

                static set defaultOption(e) {
                    xr = e
                }

                static mergeDefaultOption(e) {
                    xr = S(xr, e)
                }

                static get(e) {
                    return Ao(ut(e))
                }

                static getLocalStorage(e) {
                    return ko(ut(e))
                }

                static resetLayout(e, t, o) {
                    const n = ut(e), s = Ao(n);
                    yr(n, s) && (s.width = t, s.height = o, Mo(s), Pt(s), Zs.update(n))
                }

                static clear(e) {
                    const t = ut(e);
                    return yr(t) && $o(t)
                }

                static getTableData(e) {
                    const t = ut(e);
                    return yr(t) && vo(t)
                }

                static getRowData(e, t) {
                    const o = ut(e);
                    return yr(o) && mo(o, t)
                }

                static setSort(e, t, o, n) {
                    const s = ut(e);
                    yr(s) && bn(s, t, o, n)
                }

                static setConfigVisible(e, t) {
                    const o = ut(e), n = Ao(o);
                    if (yr(o, n)) if (n.supportConfig) switch (t) {
                        case!0:
                            Ys.show(o);
                            break;
                        case!1:
                            Ys.hide(o);
                            break;
                        case void 0:
                            Ys.toggle(o)
                    } else Nt("supportConfig!==true")
                }

                static showTh(e, t) {
                    const o = ut(e);
                    yr(o) && Ao(o).supportConfig && (St(o, t, !0), Ys.update(o))
                }

                static hideTh(e, t) {
                    const o = ut(e);
                    yr(o) && Ao(o).supportConfig && (St(o, t, !1), Ys.update(o))
                }

                static exportGrid(e, t, o) {
                    const n = ut(e);
                    return yr(n) && Fo.exportGrid(n, t, o)
                }

                static setQuery(e, t, o, n) {
                    const s = ut(e), r = Ao(s);
                    if (!yr(s, r)) return;
                    const {columnMap: a, pageData: i, currentPageKey: c} = r;
                    x(t) || (t = {}), y(o) || b(o) || (n = o, o = !0), r._filter && u(a, ((e, o) => {
                        o.filter && (o.filter.selected = m(t[e]) ? t[e] : "", Sn.update(xt(s, e), o.filter))
                    })), S(r, {query: t}), !0 === o && (i[c] = 1), b(o) && (i[c] = o), Mo(r), ls.refresh(s, n)
                }

                static setAjaxData(e, t, o) {
                    const n = ut(e), s = Ao(n);
                    yr(n, s) && (S(s, {ajaxData: t}), bo(n, []), Mo(s), ls.refresh(n, o))
                }

                static refreshGrid(e, t, o) {
                    const n = ut(e), s = Ao(n);
                    yr(n, s) && (y(t) || (o = t, t = !1), t && (s.pageData[s.currentPageKey] = 1, Mo(s)), ls.refresh(n, o))
                }

                static async renderGrid(e, t) {
                    const o = ut(e);
                    let n = Ao(o);
                    if (yr(o, n)) {
                        if (C(t)) {
                            t = So(t);
                            S(!0, n, To({columnData: t})), Do(n, zn.getColumn.bind(zn), Ns.getColumn.bind(Ns), ur.getColumn.bind(ur), In.getColumn.bind(In)), await os(n), Pt(n), jt(n, !0), n._fixed && ir.init(n), Mo(n), Zs.update(o)
                        }
                        const {dataKey: e, totalsKey: s, pageData: r} = n, a = {[e]: vo(o), [s]: r.tSize || 0};
                        bo(o, []), ls.driveDomForSuccessAfter(n, a)
                    }
                }

                static resetSettings(e, t) {
                    const o = ut(e);
                    yr(o, t) && Mo(t)
                }

                static updateTemplate(e) {
                    return To(e)
                }

                static getCheckedTr(e) {
                    const t = ut(e);
                    return yr(t) && Ns.getCheckedTr(t)
                }

                static getCheckedData(e) {
                    const t = ut(e);
                    return yr(t) && yo(t)
                }

                static setCheckedData(e, t) {
                    const o = ut(e), n = Ao(o);
                    if (yr(o, n)) {
                        const e = k(t) ? t : [t], {columnMap: s, checkboxConfig: r, treeConfig: a, supportMenu: i} = n,
                            c = a.treeKey, l = vo(o), {key: d, useRadio: u, max: h} = r;
                        l.forEach((t => {
                            let o = ct(s, t, [c]);
                            t.gm_checkbox = e.some((e => qt(o, ct(s, e, [c]), d)))
                        })), bo(o, l), xo(o, e, !0), i && Qo(o), zs(o, l, u, h)
                    }
                }

                static updateRowData(e, t, o) {
                    const n = ut(e), s = Ao(n);
                    if (yr(n, s)) {
                        const {
                            columnMap: e,
                            supportCheckbox: r,
                            supportTreeData: a,
                            treeConfig: i,
                            rowRenderHandler: c
                        } = s, l = k(o) ? o : [o], d = vo(n), u = i.treeKey, h = (e, o) => {
                            e.some(((e, n) => {
                                if (e[t] === o[t]) return S(e, c(S(e, o), n)), !0;
                                if (a) {
                                    const t = e[u];
                                    if (t && t.length) return h(t, o)
                                }
                            }))
                        };
                        return l.forEach((e => {
                            h(d, e)
                        })), r && ((e, t, o, n) => {
                            co.checkedData[e] && (co.checkedData[e] = co.checkedData[e].map((e => (n.forEach((n => {
                                e[o] === n[o] && S(e, ct(t, n))
                            })), e))))
                        })(n, e, t, l), ls.changeTableData(n, d), d
                    }
                }

                static updateTreeState(e, t) {
                    const o = ut(e);
                    yr(o) && Yn.updateDOM(o, t)
                }

                static cleanData(e) {
                    const t = ut(e);
                    yr(t) && (bo(t, []), this.renderGrid(t))
                }

                static print(e) {
                    const t = ut(e);
                    yr(t) && Yo(t)
                }

                static showLoading(e) {
                    const t = ut(e), o = Ao(t);
                    yr(t, o) && lt(t, o.loadingTemplate)
                }

                static hideLoading(e, t) {
                    const o = ut(e);
                    yr(o) && dt(o, t)
                }

                static showRow(e, t) {
                    const o = ut(e);
                    yr(o) && ((e, t) => {
                        let o;
                        o = g(t) ? Q("[gm-row-hide]") : Uo(t), o.attr(qe, "out"), setTimeout((() => {
                            o.removeAttr(qe), Jo(e._, e.columnMap)
                        }), 500)
                    })(Ao(o), t)
                }

                static hideRow(e, t) {
                    const o = ut(e);
                    yr(o) && b(t) && Vo(Ao(o), t)
                }

                static setLineHeight(e, t) {
                    const o = ut(e);
                    yr(o) && m(t) && Et(o, t)
                }

                async initTable(e, t) {
                    await ls.createDOM(e, t);
                    const {_: o} = t;
                    t.supportAdjust && dr.init(o), t.supportDrag && vr.init(o), t.supportMoveRow && zn.init(o), t.supportCheckbox && Ns.init(o), t._sort && xn.init(o), t._remind && cn.init(o), t._filter && Sn.init(o), t.supportConfig && Ys.init(o), t.supportMenu && br.init(o), t.supportAjaxPage && $s.init(t), t.supportTreeData && Yn.init(o), t.__isFullColumn && In.init(o), t._fixed && ir.init(t), jt(t, !0), Mo(t), t.__isNested ? ts.addSign(o) : Dt(o), _t(o);
                    const n = mt(o).find("tr"), s = n.height();
                    n.height(s), vt(o).find("tr").height(s), u((e => Ue(e, "allTh", `[${re}="${e}"] th`))(o), (e => {
                        e.innerHTML = ""
                    })), Oo(o)
                }

                static destroy(e) {
                    const t = ut(e);
                    try {
                        dr.destroy(t), $s.destroy(t), Ns.destroy(t), Ys.destroy(t), ls.destroy(t), vr.destroy(t), fs.destroy(t), Sn.destroy(t), br.destroy(t), zn.destroy(t), cn.destroy(t), Zs.destroy(t), xn.destroy(t), Yn.destroy(t), ir.destroy(t), In.destroy(t)
                    } catch (e) {
                        console.error(e)
                    }
                    delete wr[t], (e => {
                        delete co.responseData[e], delete co.checkedData[e], delete co.settings[e], clearInterval(fo[e]), clearInterval(go[e]), delete fo[e], delete go[e]
                    })(t), Ve(t)
                }
            }

            Element.prototype.GM = Element.prototype.GridManager = function () {
                let e, t, o, n;
                const s = arguments;
                if (m(s[0]) ? (e = s[0], t = s[1], o = s[2], n = s[3]) : (e = "init", t = s[0], o = s[1]), "init" !== e) return kr[e](this, t, o, n) || this;
                new kr(this, t, o)
            }, s.GridManager || s.GM || (s.GridManager = s.GM = kr), (e => {
                if (!e) return;
                const t = function () {
                    return this.get(0).GM(...arguments)
                };
                e.fn.extend({GridManager: t, GM: t}), s.$ = e
            })(s.jQuery);
            const Cr = kr
        })(), n
    })()
}));