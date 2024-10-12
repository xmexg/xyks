e = function () {
    return n
};
var r, n = {}, i = Object.prototype, o = i.hasOwnProperty, a = Object.defineProperty || function (t, e, r) {
        t[e] = r.value
    }, s = "function" == typeof Symbol ? Symbol : {}, u = s.iterator || "@@iterator",
    c = s.asyncIterator || "@@asyncIterator", l = s.toStringTag || "@@toStringTag";

function h(t, e, r) {
    return Object.defineProperty(t, e, {value: r, enumerable: !0, configurable: !0, writable: !0}), t[e]
}

try {
    h({}, "")
} catch (r) {
    h = function (t, e, r) {
        return t[e] = r
    }
}

function f(t, e, r, n) {
    var i = e && e.prototype instanceof A ? e : A, o = Object.create(i.prototype), s = new R(n || []);
    return a(o, "_invoke", {value: I(t, r, s)}), o
}

function p(t, e, r) {
    try {
        return {type: "normal", arg: t.call(e, r)}
    } catch (t) {
        return {type: "throw", arg: t}
    }
}

n.wrap = f;
var d = "suspendedStart", m = "suspendedYield", g = "executing", v = "completed", y = {};

function A() {
}

function b() {
}

function E() {
}

var w = {};
h(w, u, (function () {
    return this
}));
var _ = Object.getPrototypeOf, x = _ && _(_(O([])));
x && x !== i && o.call(x, u) && (w = x);
var S = E.prototype = A.prototype = Object.create(w);

function C(t) {
    ["next", "throw", "return"].forEach((function (e) {
        h(t, e, (function (t) {
            return this._invoke(e, t)
        }))
    }))
}

function V(e, r) {
    function n(i, a, s, u) {
        var c = p(e[i], e, a);
        if ("throw" !== c.type) {
            var l = c.arg, h = l.value;
            return h && "object" == t(h) && o.call(h, "__await") ? r.resolve(h.__await).then((function (t) {
                n("next", t, s, u)
            }), (function (t) {
                n("throw", t, s, u)
            })) : r.resolve(h).then((function (t) {
                l.value = t, s(l)
            }), (function (t) {
                return n("throw", t, s, u)
            }))
        }
        u(c.arg)
    }

    var i;
    a(this, "_invoke", {
        value: function (t, e) {
            function o() {
                return new r((function (r, i) {
                    n(t, e, r, i)
                }))
            }

            return i = i ? i.then(o, o) : o()
        }
    })
}

function I(t, e, n) {
    var i = d;
    return function (o, a) {
        if (i === g) throw Error("Generator is already running");
        if (i === v) {
            if ("throw" === o) throw a;
            return {value: r, done: !0}
        }
        for (n.method = o, n.arg = a; ;) {
            var s = n.delegate;
            if (s) {
                var u = P(s, n);
                if (u) {
                    if (u === y) continue;
                    return u
                }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                if (i === d) throw i = v, n.arg;
                n.dispatchException(n.arg)
            } else "return" === n.method && n.abrupt("return", n.arg);
            i = g;
            var c = p(t, e, n);
            if ("normal" === c.type) {
                if (i = n.done ? v : m, c.arg === y) continue;
                return {value: c.arg, done: n.done}
            }
            "throw" === c.type && (i = v, n.method = "throw", n.arg = c.arg)
        }
    }
}

function P(t, e) {
    var n = e.method, i = t.iterator[n];
    if (i === r) return e.delegate = null, "throw" === n && t.iterator["return"] && (e.method = "return", e.arg = r, P(t, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var o = p(i, t.iterator, e.arg);
    if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, y;
    var a = o.arg;
    return a ? a.done ? (e[t.resultName] = a.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = r), e.delegate = null, y) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, y)
}

function T(t) {
    var e = {tryLoc: t[0]};
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
}

function k(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e
}

function R(t) {
    this.tryEntries = [{tryLoc: "root"}], t.forEach(T, this), this.reset(!0)
}

function O(e) {
    if (e || "" === e) {
        var n = e[u];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
            var i = -1, a = function t() {
                for (; ++i < e.length;) if (o.call(e, i)) return t.value = e[i], t.done = !1, t;
                return t.value = r, t.done = !0, t
            };
            return a.next = a
        }
    }
    throw new TypeError(t(e) + " is not iterable")
}

return b.prototype = E, a(S, "constructor", {value: E, configurable: !0}), a(E, "constructor", {
    value: b,
    configurable: !0
}), b.displayName = h(E, l, "GeneratorFunction"), n.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === b || "GeneratorFunction" === (e.displayName || e.name))
}, n.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, E) : (t.__proto__ = E, h(t, l, "GeneratorFunction")), t.prototype = Object.create(S), t
}, n.awrap = function (t) {
    return {__await: t}
}, C(V.prototype), h(V.prototype, c, (function () {
    return this
})), n.AsyncIterator = V, n.async = function (t, e, r, i, o) {
    void 0 === o && (o = Promise);
    var a = new V(f(t, e, r, i), o);
    return n.isGeneratorFunction(e) ? a : a.next().then((function (t) {
        return t.done ? t.value : a.next()
    }))
}, C(S), h(S, l, "Generator"), h(S, u, (function () {
    return this
})), h(S, "toString", (function () {
    return "[object Generator]"
})), n.keys = function (t) {
    var e = Object(t), r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function t() {
        for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t
        }
        return t.done = !0, t
    }
}, n.values = O, R.prototype = {
    constructor: R, reset: function (t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(k), !t) for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = r)
    }, stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval
    }, dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;

        function n(n, i) {
            return s.type = "throw", s.arg = t, e.next = n, i && (e.method = "next", e.arg = r), !!i
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var a = this.tryEntries[i], s = a.completion;
            if ("root" === a.tryLoc) return n("end");
            if (a.tryLoc <= this.prev) {
                var u = o.call(a, "catchLoc"), c = o.call(a, "finallyLoc");
                if (u && c) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc)
                } else if (u) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0)
                } else {
                    if (!c) throw Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc)
                }
            }
        }
    }, abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var n = this.tryEntries[r];
            if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                var i = n;
                break
            }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
    }, complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y
    }, finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), k(r), y
        }
    }, catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                    var i = n.arg;
                    k(r)
                }
                return i
            }
        }
        throw Error("illegal catch attempt")
    }, delegateYield: function (t, e, n) {
        return this.delegate = {iterator: O(t), resultName: e, nextLoc: n}, "next" === this.method && (this.arg = r), y
    }
}, n
}

function r(t, e, r, n, i, o, a) {
    try {
        var s = t[o](a), u = s.value
    } catch (c) {
        return void r(c)
    }
    s.done ? e(u) : Promise.resolve(u).then(n, i)
}

function n(t) {
    return function () {
        var e = this, n = arguments;
        return new Promise((function (i, o) {
            var a = t.apply(e, n);

            function s(t) {
                r(a, i, o, s, u, "next", t)
            }

            function u(t) {
                r(a, i, o, s, u, "throw", t)
            }

            s(void 0)
        }))
    }
}

__webpack_require__(23792), __webpack_require__(3362), __webpack_require__(69085), __webpack_require__(9391);
var i = Vue, o = __webpack_require__.n(i), a = VueRouter, s = __webpack_require__.n(a), u = "//oapi.yuanfudao.com",
    c = "//oapi.yuanfudao.biz", l = function (t) {
        return new RegExp(t.toLowerCase()).test(navigator.userAgent.toLowerCase())
    }, h = function () {
        return l("iP(hone|od|ad)")
    }, f = function () {
        return l("Android|HarmonyOS")
    }, p = function () {
        return l("YuanTiKu") && !g()
    }, d = function () {
        return l("YuanFuDao")
    }, m = function () {
        return g() || v()
    }, g = function () {
        return l("YuanTiKuEmbed")
    }, v = function () {
        return l("YuanSouTiEmbed")
    }, y = function () {
        return l("YuanSouTi") && !A()
    }, A = function () {
        return l("YuanSouTiKouSuan")
    }, b = function () {
        return l("CheckMath")
    }, E = function () {
        return l("Pumpkin")
    }, w = function () {
        return l("Gemini")
    }, x = function () {
        return p() || d() || A() || y() || g() || m() || w() || b()
    }, S = function () {
        var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan|Gemini)\/(\d+\.\d+\.\d+)(\s+|$)/i,
            e = navigator.userAgent.match(t);
        return e ? e[2] : ""
    }, C = function () {
        return navigator.onLine
    }, V = function () {
        var t = window;
        return "miniprogram" === t.__wxjs_environment
    }, I = function (t, e) {
        var r = t.split("."), n = e.split("."), i = r[0] - n[0];
        return 0 === parseInt(i, 10) && t !== e ? I(r.splice(1).join("."), n.splice(1).join(".")) : Number(i)
    }, P = function (t) {
        return I(S(), t) >= 0
    }, T = function () {
        return /^ytk1\.yuanfudao|^ytk\.yuanfudao/.test(location.hostname)
    }, k = function () {
        return /^xyst\.yuanfudao|^solar-lago\.yuanfudao/.test(location.hostname)
    }, R = function () {
        return /^m\.yuanfudao/.test(location.hostname)
    }, O = function () {
        return /^xyks\.yuanfudao/.test(location.hostname)
    }, D = function () {
        return /^api(-test)?\.checkmath/.test(location.hostname)
    }, M = function () {
        return /^pumpkin\.yuanfudao/.test(location.hostname)
    }, B = function () {
        return x() ? p() || g() ? 131 : y() || v() ? 241 : d() ? 351 : A() ? h() ? 601 : 611 : E() ? 1131 : w() ? 247 : b() ? 29000004 : 131 : T() ? 131 : k() ? 241 : R() ? 351 : O() ? V() ? 681 : 631 : M() ? 1131 : D() ? 632 : 131
    }, F = function () {
        return x() ? p() || g() ? 101 : y() || v() ? 201 : d() ? 301 : A() ? 601 : E() ? 1101 : w() ? 207 : b() ? 2901 : 101 : 0
    }, L = /^test-m\.|^(xyst|xyks|xjyy)-test\.|\.ws$|\.biz$/.test(location.hostname), N = L ? c : u, U = B(), j = F(),
    G = __webpack_require__(80802), H = ["wifi", "2g", "3g", "4g"], q = {INIT: 0, SENDING: 1, SUCCESS: 2, FAILED: 3},
    Q = 5e3, z = {STATUS_ERROR: "statusError", TIMEOUT: "timeout", ABORT: "abort", ERROR: "error"},
    W = function (t, e) {
        return "undefined" !== typeof navigator && navigator.sendBeacon && "function" === typeof navigator.sendBeacon ? new Promise((function (r, n) {
            var i = navigator.sendBeacon(t, JSON.stringify(e));
            i ? r("") : n(z.ERROR)
        })) : new Promise((function (r, n) {
            var i;
            try {
                i = new XDomainRequest
            } catch (o) {
                i = new XMLHttpRequest
            }
            i.withCredentials = !0, i.open("POST", t, !0), i.setRequestHeader && i.setRequestHeader("Content-Type", "application/json"), i.timeout = Q, i.onreadystatechange = function () {
                4 === i.readyState && (i.status && i.status > 199 && i.status < 300 ? r("") : n(z.STATUS_ERROR))
            }, i.onload = function () {
                r("")
            }, i.ontimeout = function () {
                n(z.TIMEOUT)
            }, i.onabort = function () {
                n(z.ABORT)
            }, i.onerror = function () {
                n(z.ERROR)
            }, i.send(JSON.stringify(e))
        }))
    }, Y = function (t, e) {
        return W(t, e)
    }, K = !0;

function J() {
    try {
        var t = "ttttttttt" + Date.now(), e = "abc";
        localStorage.setItem(t, e), localStorage.getItem(t) !== e && (K = !1), localStorage.removeItem(t)
    } catch (r) {
        K = !1
    }
}

J();
var X = function (t, e) {
    var r = "__local_" + t;
    if (e && K) try {
        localStorage.setItem(r, JSON.stringify(e))
    } catch (n) {
        console.warn("failed to setItem to localStorage, key=" + r, n)
    }
}, Z = function (t) {
    var e = "__local_" + t;
    if (K) try {
        var r = localStorage.getItem(e);
        return r ? JSON.parse(r) : ""
    } catch (n) {
        return console.warn("failed to getItem from localStorage, key=" + e, n), ""
    }
    return ""
}, $ = {
    search: function () {
        var t = {};
        if (window && window.location) {
            var e = window.location.search.substr(1);
            e.split("&").forEach((function (e) {
                var r = e.split("=");
                t[r[0]] = decodeURIComponent(r[1])
            }))
        }
        return t
    }
}, tt = function () {
    return "undefined" !== typeof wx || "undefined" !== typeof swan
}, et = function () {
    return "undefined" !== typeof wx ? wx : "undefined" !== typeof swan ? swan : void 0
}, rt = $.search() || {}, nt = /(?:^|&)([^&=#]+)=?([^&#]+)?/g, it = 0, ot = function () {
    function t(t) {
        this.initKeyValues = [], this.config = t, this.setInitKeyValues()
    }

    return t.prototype.getData = function (t) {
        var e = {
            productId: this.productId,
            timestamp: (new Date).getTime(),
            url: this.getUrlPrefix(t),
            keyValues: this.getKeyValues(t),
            net: this.net,
            seqId: ++it
        };
        return Object.defineProperty(e, "key", {
            get: function () {
                return this.url + "/" + this.timestamp + "/" + this.seqId
            }, configurable: !1, enumerable: !1
        })
    }, Object.defineProperty(t.prototype, "productId", {
        get: function () {
            return this.config.productId || 351
        }, enumerable: !0, configurable: !0
    }), t.prototype.setInitKeyValues = function () {
        this.initKeyValues = this.config.keyValues || [];
        var t = this.config, e = t.keyfrom, r = void 0 === e ? rt.keyfrom || "" : e, n = t.vendor,
            i = void 0 === n ? rt.vendor || "" : n;
        r && this.addKeyValue("keyfrom", r), i && this.addKeyValue("vendor", i)
    }, t.prototype.getUrlPrefix = function (t) {
        return void 0 === t && (t = ""), t.split("?")[0]
    }, t.prototype.getUrlKeyValues = function (t) {
        void 0 === t && (t = "");
        var e = t.split("?"), r = e[1], n = void 0 === r ? "" : r, i = [];
        return n && n.replace(nt, (function (t, e, r) {
            return i.push({key: e, value: decodeURIComponent(r)}), ""
        })), i
    }, t.prototype.getKeyValues = function (t) {
        var e = {};
        return this.initKeyValues.forEach((function (t) {
            e[t.key] = t.value
        })), this.getUrlKeyValues(t).forEach((function (t) {
            e[t.key] = t.value
        })), Object.keys(e).map((function (t) {
            return {key: t, value: e[t]}
        }))
    }, t.prototype.addKeyValue = function (t, e) {
        t && e && this.initKeyValues.push({key: t, value: e})
    }, Object.defineProperty(t.prototype, "net", {
        get: function () {
            var t = "", e = 4;
            if (navigator) {
                var r = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                if (r && r.type ? t = r.type : /NetType\/(\S+)/.test(navigator.userAgent) && (t = RegExp.$1), t && "string" === typeof t) {
                    t = t.toLowerCase();
                    while (e--) if (t.indexOf(H[e]) > -1) return e + 1
                }
            } else if (tt()) {
                var n = this.config.appletConfig && this.config.appletConfig.netWorkType || "";
                return "unknown" === n || "" === n ? 0 : H.indexOf(n) + 1
            }
            return 0
        }, enumerable: !0, configurable: !0
    }), t
}(), at = ot, st = navigator && navigator.userAgent;
st || tt() && (st = JSON.stringify(et().getSystemInfoSync()));
var ut = st.match(/(Android);?[\s\/]+([\d.]+)?/), ct = st.match(/(iPad).*OS\s([\d_]+)/),
    lt = !ct && st.match(/(iPhone\sOS)\s([\d_]+)/), ht = ct || lt,
    ft = st.match(/(?:YuanSouTi|YuanTiKu|YuanFuDao|QQ|MicroMessenger|QQBrowser|MQQBrowser|MQQBrowserQQ|WeiBo|baiduboxapp|baidubrowser|SogouMobileBrowser|MiuiBrowser|UCBrowser|Maxthon|Kwai|NewsArticle)[^\/]*\/[\.0-9]+/g) || st.match(/aweme_\d\.\d\.\d/),
    pt = st.match(/;([^/;]+)Build\//), dt = function () {
        if (navigator) {
            var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan|Zebra YuanTiKu|Pumpkin)\/(\d+\.\d+\.\d+)(\s+|$)/i,
                e = st.match(t);
            return e ? e[2] : ""
        }
        return tt() ? JSON.parse(st).version : ""
    }, mt = function () {
        return !navigator && tt() ? -1 !== st.indexOf("iOS") : !!ht
    }, gt = function () {
        return !!ct
    }, vt = function () {
        return !navigator && tt() ? -1 !== st.indexOf("Android") : !!ut
    }, yt = function () {
        if (navigator) {
            if (ut) return ut[2];
            if (ht) return ht[2].replace(/_/g, ".")
        } else if (tt()) return JSON.parse(st).system;
        return ""
    }, At = function () {
        return pt ? pt[1].trim() : ""
    }, bt = function () {
        if (navigator) {
            if (ft) return ft.pop() || ""
        } else if (tt()) return JSON.parse(st).model;
        return ""
    }, Et = function () {
        return vt() ? 2 : mt() ? gt() ? 3 : 1 : 5
    }, wt = function (t) {
        if (document) {
            var e = document.cookie.match(new RegExp("(?:^| )" + encodeURIComponent(t) + "=([^;]+)"));
            return e && decodeURIComponent(e[1])
        }
        return ""
    }, _t = function (t, e, r, n, i, o) {
        void 0 === e && (e = 1), void 0 === r && (r = 0), void 0 === n && (n = "/"), void 0 === i && (i = ""), void 0 === o && (o = !1), document && (document.cookie = encodeURIComponent(t) + "=" + encodeURIComponent(String(e)) + (r ? "" : "; expires=" + new Date(+new Date + 864e5 * ("undefined" !== typeof r ? r : 1)).toUTCString()) + "; path=" + n + "; domain=" + (i || document.domain.split(".").slice(-2).join(".")) + (o ? "; secure" : ""))
    }, xt = function () {
        return xt = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, xt.apply(this, arguments)
    }, St = "YFD_U", Ct = function () {
        function t(t) {
            this.config = t, this.appVersion = this.getAppVersion(), this.osVersion = yt(), this.model = t.model || bt(), this.device = Et(), this.manufacturer = t.manufacturer || At(), this.screenWidth = this.getScreenWidth(), this.screenHeight = this.getScreenHeight(), this.staticData = this.getStaticData();
            var e = {key: "YFD_U", value: this.getDeviceId()};
            this.config.extensions || (this.config.extensions = []), this.config.extensions = this.config.extensions.filter((function (t) {
                return t.key !== e.key
            })).concat([e])
        }

        return t.prototype.setUserId = function (t) {
            this.config.userId = t
        }, t.prototype.getData = function () {
            return xt({}, this.staticData, {userId: this.config.userId || 0}, this.config.extensions && {extensions: this.config.extensions})
        }, t.prototype.getDeviceId = function () {
            if (this.config.deviceId) return this.config.deviceId;
            var t = $.search() || {}, e = t._deviceId || t[St] || "";
            return e ? _t(St, e, 365) : (e = wt("deviceId") || wt(St) || "", e || (e = (new Date).getTime() + "-" + Math.random().toString().substr(-5), _t(St, e, 365))), e
        }, t.prototype.getAppVersion = function () {
            return this.config.appVersion || dt() || "1.0.0"
        }, t.prototype.getScreenWidth = function () {
            if ("undefined" !== typeof window && window.screen && window.screen.width) return window.screen.width;
            if (tt()) {
                var t = et().getSystemInfoSync();
                return t.screenWidth
            }
            return 0
        }, t.prototype.getScreenHeight = function () {
            if ("undefined" !== typeof window && window.screen && window.screen.height) return window.screen.height;
            if (tt()) {
                var t = et().getSystemInfoSync();
                return t.screenHeight
            }
            return 0
        }, t.prototype.getStaticData = function () {
            var t = this, e = t.osVersion, r = t.manufacturer, n = t.model;
            return xt({
                userId: this.config.userId || 0,
                device: this.device,
                appVersion: this.appVersion,
                screenWidth: this.screenWidth,
                screenHeight: this.screenHeight
            }, this.config.extensions && {extensions: this.config.extensions}, e && {osVersion: e}, r && {manufacturer: r}, n && {model: n})
        }, t
    }(), Vt = Ct, It = {FROG_HOST: "https://frog.yuanfudao.com/statV2/plain"},
    Pt = {FROG_HOST: "https://frog.yuanfudao.biz/statV2/plain"}, Tt = function () {
        return Tt = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, Tt.apply(this, arguments)
    }, kt = location ? location.hostname : "", Rt = function () {
        return /^test-m\.|^[0-9a-zA-Z]+-test\.|^local\.|\.ws$|\.biz$/.test(kt) ? Pt : It
    }(), Ot = {}, Dt = Tt({}, Ot, Rt), Mt = function () {
        function t(t) {
            this.frogMap = {}, this.header = new Vt(t), this.entry = new at(t), this.key = t.key || "_fr_g_v4_", this.url = t.url || Dt.FROG_HOST, this.maxCacheCount = t.maxCacheCount || 1, t.send && (this.sendMethod = t.send), this.bindUnloadEvent()
        }

        return t.prototype.clear = function () {
            this.clearItems()
        }, t.prototype.send = function () {
            for (var t = this, e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
            this.pickExistItems(), this.setItems(e.map((function (e) {
                return t.entry.getData(e)
            })));
            var n = this.buildEntries(), i = n.length;
            return i && (i >= this.maxCacheCount || 0 === e.length) ? this.sendMethod && "function" === typeof this.sendMethod ? this.sendByConfig(n) : this.sendByDefault(n) : Promise.resolve("")
        }, t.prototype.add = function () {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            return this.send.apply(this, t)
        }, t.prototype.setUserId = function (t) {
            t && this.header.setUserId(t)
        }, t.prototype.bindUnloadEvent = function () {
            var t = this, e = function () {
                return t.send()
            };
            "undefined" !== typeof window && (window.addEventListener ? window.addEventListener("beforeunload", e, !1) : window.attachEvent && window.attachEvent("onbeforeunload", e))
        }, t.prototype.buildEntries = function () {
            var t = this, e = Z(this.key) || {}, r = Object.keys(this.frogMap), n = r.filter((function (e) {
                var r = t.frogMap[e];
                return r.status === q.INIT || r.status === q.SENDING && (new Date).getTime() > r.sendingTimeout
            })).map((function (n) {
                var i = t.frogMap[n];
                return t.maxCacheCount > 1 && r.length < t.maxCacheCount ? i.status = q.INIT : (i.status = q.SENDING, i.sendingTimeout = (new Date).getTime() + Q), e[n] = i, i.data
            }));
            return X(this.key, e), n
        }, t.prototype.sendByConfig = function (t) {
            var e = this;
            return new Promise((function (r, n) {
                e.sendMethod(e.url, {head: e.header.getData(), entries: t}, (function (t) {
                    t || e.clearItems(), t ? n(t) : r("")
                }))
            }))
        }, t.prototype.sendByDefault = function (t) {
            var e = this;
            return Y(this.url, {head: this.header.getData(), entries: t}).then((function (t) {
                return e.clearItems(), t
            }))
        }, t.prototype.clearItems = function () {
            var t = this, e = Z(this.key) || {};
            Object.keys(this.frogMap).forEach((function (r) {
                delete t.frogMap[r], e[r] && delete e[r]
            })), X(this.key, e)
        }, t.prototype.setItems = function (t) {
            var e = this;
            t.map((function (t) {
                return {data: t, status: q.INIT}
            })).forEach((function (t) {
                e.frogMap[t.data.key] = t
            }))
        }, t.prototype.pickExistItems = function () {
            var t = this, e = Z(this.key) || {};
            Object.keys(e).forEach((function (r) {
                var n = e[r];
                (n.status === q.SENDING && Date.now() > n.sendingTimeout || n.status === q.INIT) && (t.frogMap[r] = n)
            }))
        }, t
    }(), Bt = Mt, Ft = Bt, Lt = (__webpack_require__(95127), "webViewLeftButtonClicked"), Nt = "webViewRightButtonClicked",
    Ut = "webViewShare", jt = "webviewLogin", Gt = function () {
        function t() {
        }

        return t.prototype.get = function (t) {
            return new Promise((function (e, r) {
                var n = new XMLHttpRequest;
                n.withCredentials = !0, n.open("GET", t), n.timeout = 1e3, n.onload = function () {
                    this.status >= 200 && this.status < 400 ? e({
                        status: this.status,
                        body: this.response
                    }) : r({status: this.status})
                }, n.onerror = function () {
                    r({status: 502})
                }, n.ontimeout = function () {
                    r({status: 502})
                }, n.send()
            }))
        }, t.prototype.post = function (t, e) {
            return new Promise((function (r, n) {
                var i = new XMLHttpRequest;
                i.withCredentials = !0, i.open("POST", t, !0), i.setRequestHeader && i.setRequestHeader("Content-Type", "application/json"), i.send(JSON.stringify(e)), i.timeout = 1e3, i.onload = function () {
                    this.status >= 200 && this.status < 400 ? r({
                        status: this.status,
                        body: this.response
                    }) : n({status: this.status})
                }, i.onerror = function () {
                    n({status: 502})
                }, i.ontimeout = function () {
                    n({status: 502})
                }
            }))
        }, t
    }(), Ht = new Gt, qt = {
        APE_HOST: "//ytk1.yuanfudao.biz",
        SOLAR_HOST: "//xyst.yuanfudao.biz",
        LEO_HOST: "//xyks.yuanfudao.biz",
        CHECKMATH_HOST: "//api-test.checkmath.net",
        appToken: "36004e299b664afc96bc4bb677736720",
        env: 0
    }, Qt = {
        APE_HOST: "//ytk.yuanfudao.com",
        SOLAR_HOST: "//xyst.yuanfudao.com",
        LEO_HOST: "//xyks.yuanfudao.com",
        CHECKMATH_HOST: "//api.checkmath.net",
        appToken: "9733ac91ee004b15b1e207a695579afb",
        env: 1
    }, zt = function () {
        return zt = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, zt.apply(this, arguments)
    }, Wt = /^test-m\.|^(xyst|xyks|xjyy|api)-test\.|\.ws$|\.biz$/.test(location.hostname) ? qt : Qt, Yt = {},
    Kt = zt(zt({}, Yt), Wt), Jt = function () {
        function t() {
        }

        return t.getIsVisibleByMutation = function (e) {
            var r = document.createElement("div");
            r.style.display = "none", r.style.width = "0px", r.style.height = "0px";
            var n = e.target.cloneNode(!1);
            if ("style" === e.attributeName) {
                var i = t.getStyleMap(e.oldValue || "");
                Object.keys(i).forEach((function (t) {
                    n.style[t] = i[t]
                }))
            } else {
                var o = e.oldValue || "";
                o.split(" ").map((function (t) {
                    t && n.classList.add(t)
                }))
            }
            r.appendChild(n), document.body.appendChild(r);
            var a = t.getIsVisibleByElement(n);
            return document.body.removeChild(r), a
        }, t.getIsVisibleByElement = function (t) {
            var e = window.getComputedStyle(t);
            return "hidden" !== e.visibility && "none" !== e.display && "0" !== e.opacity
        }, t.getStyleMap = function (t) {
            var e = {};
            return t ? (t.replace(/ /g, "").split(";").forEach((function (t) {
                var r = t.split(":"), n = r[0], i = r[1];
                e[n] = i
            })), e) : e
        }, t.isCheckMath = function () {
            var t = function (t) {
                return new RegExp(t.toLowerCase()).test(navigator.userAgent.toLowerCase())
            };
            return t("CheckMath")
        }, t
    }(), Xt = Jt, Zt = function (t, e, r, n) {
        function i(t) {
            return t instanceof r ? t : new r((function (e) {
                e(t)
            }))
        }

        return new (r || (r = Promise))((function (r, o) {
            function a(t) {
                try {
                    u(n.next(t))
                } catch (e) {
                    o(e)
                }
            }

            function s(t) {
                try {
                    u(n["throw"](t))
                } catch (e) {
                    o(e)
                }
            }

            function u(t) {
                t.done ? r(t.value) : i(t.value).then(a, s)
            }

            u((n = n.apply(t, e || [])).next())
        }))
    }, $t = function (t, e) {
        var r, n, i, o, a = {
            label: 0, sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1]
            }, trys: [], ops: []
        };
        return o = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" === typeof Symbol && (o[Symbol.iterator] = function () {
            return this
        }), o;

        function s(t) {
            return function (e) {
                return u([t, e])
            }
        }

        function u(o) {
            if (r) throw new TypeError("Generator is already executing.");
            while (a) try {
                if (r = 1, n && (i = 2 & o[0] ? n["return"] : o[0] ? n["throw"] || ((i = n["return"]) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                    case 0:
                    case 1:
                        i = o;
                        break;
                    case 4:
                        return a.label++, {value: o[1], done: !1};
                    case 5:
                        a.label++, n = o[1], o = [0];
                        continue;
                    case 7:
                        o = a.ops.pop(), a.trys.pop();
                        continue;
                    default:
                        if (i = a.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            a = 0;
                            continue
                        }
                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            a.label = o[1];
                            break
                        }
                        if (6 === o[0] && a.label < i[1]) {
                            a.label = i[1], i = o;
                            break
                        }
                        if (i && a.label < i[2]) {
                            a.label = i[2], a.ops.push(o);
                            break
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue
                }
                o = e.call(t, a)
            } catch (s) {
                o = [6, s], n = 0
            } finally {
                r = i = 0
            }
            if (5 & o[0]) throw o[1];
            return {value: o[0] ? o[1] : void 0, done: !0}
        }
    }, te = function () {
        function t() {
        }

        return t.getApeContext = function (t) {
            return Ht.get(Kt.APE_HOST + "/accounts/api/current" + (t ? "?_productId=" + t : "")).then((function (t) {
                return JSON.parse(t.body)
            })).catch((function () {
                return {id: 0}
            }))
        }, t.getSolarContext = function () {
            return Ht.get(Kt.SOLAR_HOST + "/api/current-user-context").then((function (t) {
                return JSON.parse(t.body)
            })).catch((function () {
                return {userId: 0, ytkUserId: 0}
            }))
        }, t.getSolarVipTypeContext = function () {
            return Ht.get(Kt.SOLAR_HOST + "/solar-vip/api/users/self").then((function (t) {
                var e = JSON.parse(t.body);
                return e && 1 === e.payUserStatus ? 0 : e && 3 === e.payUserStatus ? -1 : e && 2 === e.payUserStatus ? 1 : 0
            })).catch((function () {
                return 0
            }))
        }, t.getLeoContext = function (t) {
            return Zt(this, void 0, void 0, (function () {
                return $t(this, (function (e) {
                    return [2, Ht.get(Kt.LEO_HOST + "/leo-profile/api/user-infos/context?_productId=" + t).then((function (t) {
                        return JSON.parse(t.body)
                    })).catch((function () {
                        return {ytkUserId: 0, deviceId: 0}
                    }))]
                }))
            }))
        }, t.getCheckMathContext = function () {
            return Zt(this, void 0, void 0, (function () {
                var t, e;
                return $t(this, (function (r) {
                    switch (r.label) {
                        case 0:
                            return r.trys.push([0, 3, , 4]), [4, Ht.get(Kt.CHECKMATH_HOST + "/leo-cm-oauth/api/auth").then((function (t) {
                                return JSON.parse(t.body)
                            }))];
                        case 1:
                            return t = r.sent().ytkUserId, [4, Ht.get(Kt.CHECKMATH_HOST + "/leo-cm-auth/api/user-devices/auth").then((function (t) {
                                return JSON.parse(t.body)
                            }))];
                        case 2:
                            return e = r.sent().deviceId, [2, {ytkUserId: t, deviceId: e}];
                        case 3:
                            return r.sent(), [2, {ytkUserId: 0, deviceId: 0}];
                        case 4:
                            return [2]
                    }
                }))
            }))
        }, t.getAuthContext = function (e, r, n) {
            return void 0 === e && (e = U), Zt(this, void 0, void 0, (function () {
                var i, o, a, s, u, c, l;
                return $t(this, (function (h) {
                    switch (h.label) {
                        case 0:
                            return i = Xt.isCheckMath, o = {ytkUserId: 0}, y() || w() ? [4, t.getSolarContext()] : [3, 3];
                        case 1:
                            return a = h.sent(), [4, t.getSolarVipTypeContext()];
                        case 2:
                            return s = h.sent(), o.ytkUserId = a.ytkUserId, o.solarUserId = a.userId, o.VIPType = s, [3, 13];
                        case 3:
                            return A() ? r ? [3, 5] : [4, t.getLeoContext(e)] : [3, 7];
                        case 4:
                            return u = h.sent(), o.ytkUserId = u.ytkUserId, o.leoUserId = u.deviceId, [3, 6];
                        case 5:
                            o.ytkUserId = 0, o.leoUserId = 0, h.label = 6;
                        case 6:
                            return [3, 13];
                        case 7:
                            return i() ? r ? [3, 9] : [4, t.getCheckMathContext()] : [3, 11];
                        case 8:
                            return c = h.sent(), o.ytkUserId = c.ytkUserId, o.leoUserId = c.deviceId, [3, 10];
                        case 9:
                            o.ytkUserId = 0, o.leoUserId = 0, h.label = 10;
                        case 10:
                            return [3, 13];
                        case 11:
                            return [4, t.getApeContext(n)];
                        case 12:
                            l = h.sent(), o.ytkUserId = l.id, h.label = 13;
                        case 13:
                            return [2, o]
                    }
                }))
            }))
        }, t
    }(), ee = te, re = function () {
        var t = function (e, r) {
            return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            }, t(e, r)
        };
        return function (e, r) {
            function n() {
                this.constructor = e
            }

            t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
        }
    }(), ne = function () {
        return ne = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, ne.apply(this, arguments)
    };
IntersectionObserver.prototype.POLL_INTERVAL = 1e3;
var ie, oe = new Promise((function (t) {
        window.addEventListener("load", (function () {
            t(0)
        }))
    })), ae = function (t) {
        function e(e) {
            var r = t.call(this, e) || this;
            return r.initHook(), r.config = e, r.observeDisableSeenFrogFlag(), r.watchVisibilityChangeEvent(), r.config.productId || (r.config.productId = U), r.config.userId && (r.config.userId = +r.config.userId), r.config.threshold || (r.config.threshold = [.5]), r.authPromise = r.updateAuthConfig(), r.globalParams = e.globalParams || {}, r.globalParams.appId || (r.globalParams.appId = j), r.seenNodeDataArr = [], r.watchUserIdChangeEvent(), r
        }

        return re(e, t), e.getFrogName = function (t) {
            return t.dataset.name || t.id || "button"
        }, e.prototype.observeDisableSeenFrogFlag = function () {
            var t = this;
            this.config.disableSeenFrog = !!this.config.disableSeenFrog;
            var e = this.config.disableSeenFrog;
            Object.defineProperty(this.config, "disableSeenFrog", {
                set: function (r) {
                    e = r, r || "visible" !== document.visibilityState || t.addSeenNodeDataIntoObserver()
                }, get: function () {
                    return e
                }
            })
        }, e.prototype.initHook = function () {
            var t = this;
            (0, G.solarHook)({
                onreadystatechange: function (e) {
                    t.handleXHR(e)
                }, onload: function (e) {
                    t.handleXHR(e)
                }
            }), O() && document.addEventListener("WeixinJSBridgeReady", (function () {
                "miniprogram" === window.__wxjs_environment && (t.config.productId = 681)
            }), !1)
        }, e.prototype.handleXHR = function (t) {
            if (t.status >= 200 && t.status < 300 && 4 === t.readyState) {
                if (/accounts\/api\/(login|current)/.test(t.responseURL)) try {
                    var e = void 0;
                    "string" === typeof t.response ? e = JSON.parse(t.response) : "object" === typeof t.response && t.response && t.response.id && (e = t.response), e && e.id && this.updateUserId(e.id)
                } catch (r) {
                    console.error("parse response failed", r)
                }
                /accounts\/api\/logout/.test(t.responseURL) && this.updateUserId(0)
            }
        }, Object.defineProperty(e.prototype, "pageName", {
            get: function () {
                return this.config && this.config.pageName || "page"
            }, enumerable: !1, configurable: !0
        }), e.prototype.createNewFrogInstance = function (t) {
            return t.extensions && (t.extensions = t.extensions.filter((function (t) {
                return "YFD_U" !== t.key
            }))), new Ft(t)
        }, e.prototype.watchUserIdChangeEvent = function () {
            var t = this;
            document.body.addEventListener(jt, (function (e) {
                try {
                    var r = e, n = r.detail;
                    n && n.userId && n.userId > 0 && t.updateUserId(n.userId)
                } catch (i) {
                    console.log("handle login event error: ", i)
                }
            }))
        }, e.prototype.updateAuthConfig = function () {
            var t = this, e = this.config || {}, r = e.interfaceLogProductId, n = e.isNativeFrog, i = void 0 !== n && n,
                o = e.productId, a = e.isCarryProductId;
            return ee.getAuthContext(r, i, a ? o : void 0).then((function (e) {
                t.config.userId = +e.ytkUserId, t.config.VIPType = e.VIPType, (e.solarUserId || e.leoUserId) && (t.config.extensions || (t.config.extensions = []), e.solarUserId && t.config.extensions.push({
                    key: "solarUserId",
                    value: e.solarUserId
                }), e.leoUserId && t.config.extensions.push({key: "leoUserId", value: e.leoUserId}))
            })).catch((function (t) {
                console.log(t)
            }))
        }, e.prototype.updateUserId = function (t) {
            t && (this.config.userId = +t)
        }, e.prototype.addFrog = function (t, e) {
            var r = this;
            this.authPromise.then((function () {
                return r.send(t + "?" + r.buildFrogSuffix(ne({VIPType: r.config.VIPType}, e)))
            })).catch((function (t) {
                console.error("addFrog error:", t)
            }))
        }, e.prototype.addClickFrog = function (t, e, r) {
            this.addFrog("/click/" + (r || this.pageName) + "/" + t, e)
        }, e.prototype.addEventFrog = function (t, e, r) {
            this.addFrog("/event/" + (r || this.pageName) + "/" + t, e)
        }, e.prototype.buildFrogSuffix = function (t) {
            var e = ne(ne({}, this.globalParams), t), r = [];
            return Object.keys(e).forEach((function (t) {
                t && (e[t] || 0 === e[t]) && r.push(t + "=" + e[t])
            })), r.join("&")
        }, e.prototype.sendEnterFrog = function (t) {
            this.addFrog("/event/" + this.pageName + "/enter", t)
        }, e.prototype.sendWebViewEventFrog = function (t, e) {
            switch (t.type) {
                case Lt:
                    this.addFrog("/click/" + this.pageName + "/" + Lt, e);
                    break;
                case Nt:
                    this.addFrog("/click/" + this.pageName + "/" + Nt, e);
                    break;
                case Ut:
                    var r = t, n = void 0;
                    n = "qq" === r.detail ? "QQ" : r.detail.toLowerCase().replace(/( |^)[a-z]/g, (function (t) {
                        return t.toUpperCase()
                    })), this.addFrog("/click/" + this.pageName + "/" + Ut + "To" + n)
            }
        }, e.prototype.sendClickFrog = function (t, r) {
            var n = e.getFrogName(t);
            this.addFrog("/click/" + this.pageName + "/" + n, r)
        }, e.prototype.sendDisplayFrog = function (t, r) {
            var n = e.getFrogName(t);
            this.addFrog("/event/" + this.pageName + "/" + n, r)
        }, e.prototype.bindDisplayMutationObserver = function (t, e) {
            var r = Xt.getIsVisibleByElement(t), n = {
                attributes: !0,
                attributeFilter: ["style", "class"],
                attributeOldValue: !0,
                childList: !0,
                subtree: !1
            }, i = new MutationObserver((function (t) {
                for (var n = 0, i = t; n < i.length; n++) {
                    var o = i[n];
                    if ("attributes" === o.type) {
                        var a = o.oldValue ? Xt.getIsVisibleByMutation(o) : r, s = Xt.getIsVisibleByElement(o.target);
                        !a && s && "function" === typeof e && e()
                    }
                }
            }));
            i.observe(t, n)
        }, e.prototype.bindDisplayIntersectionObserver = function (t, e) {
            "visible" !== document.visibilityState || this.config.disableSeenFrog ? this.seenNodeDataArr.push({
                node: t,
                callback: e
            }) : this.addIntersectionObserver(t, e, !1)
        }, e.prototype.bindEveryDisplayIntersectionObserver = function (t, e) {
            "visible" !== document.visibilityState || this.config.disableSeenFrog ? this.seenNodeDataArr.push({
                node: t,
                callback: e
            }) : this.addIntersectionObserver(t, e, !0)
        }, e.prototype.addIntersectionObserver = function (t, e, r, n) {
            void 0 === n && (n = !1);
            var i = new IntersectionObserver((function (t) {
                var n = t[0];
                n.isIntersecting && ("function" === typeof e && e(), !r && i.unobserve(n.target))
            }), {threshold: this.config.threshold});
            n ? i.observe(t) : oe.then((function () {
                i.observe(t)
            }))
        }, e.prototype.addSeenNodeDataIntoObserver = function () {
            var t = this;
            this.seenNodeDataArr.forEach((function (e) {
                t.bindDisplayIntersectionObserver(e.node, e.callback)
            })), this.seenNodeDataArr = []
        }, e.prototype.watchVisibilityChangeEvent = function () {
            var t = this;
            document.addEventListener("visibilitychange", (function () {
                "visible" === document.visibilityState && t.seenNodeDataArr.length && !t.config.disableSeenFrog && t.addSeenNodeDataIntoObserver()
            }))
        }, e
    }(Ft), se = ae, ue = function () {
        function t() {
        }

        return t.getUserAgent = function () {
            return navigator.userAgent
        }, t.getQuery = function () {
            var t = window.location.search.substr(1);
            if (!t) return {};
            var e = {};
            return t.split("&").forEach((function (t) {
                var r = t.split("=");
                e[r[0]] = decodeURIComponent(r[1])
            })), e
        }, t.isIOS = function () {
            return /iP(hone|od|ad)/.test(t.getUserAgent())
        }, t.isIPhone = function () {
            return /iP(hone|od)/.test(t.getUserAgent())
        }, t.isIPad = function () {
            return /iPad/.test(t.getUserAgent())
        }, t.isAndroid = function () {
            return /Android/.test(t.getUserAgent())
        }, t.isYuanTiku = function () {
            return /YuanTiKu/i.test(t.getUserAgent()) && !/YuanTiKuEmbed/i.test(t.getUserAgent())
        }, t.isYuanFuDao = function () {
            return /YuanFuDao|YuanTiKuEmbed/i.test(t.getUserAgent())
        }, t.isYuanTiKuEmbed = function () {
            return /YuanTiKuEmbed/i.test(t.getUserAgent())
        }, t.isYuanSouTi = function () {
            return /YuanSouTi/i.test(t.getUserAgent()) && !this.isYuanKouSuan()
        }, t.isYuanZuoWen = function () {
            return /YuanZuoWen/i.test(t.getUserAgent())
        }, t.isYuanKouSuan = function () {
            return /YuanSouTiKouSuan/i.test(t.getUserAgent())
        }, t.isCheckMath = function () {
            return /CheckMath/i.test(t.getUserAgent())
        }, t.isApp = function () {
            return t.isYuanTiku() || t.isYuanFuDao() || t.isYuanSouTi() || t.isYuanTiKuEmbed()
        }, t.isWechat = function () {
            return /micromessenger/i.test(t.getUserAgent().toLowerCase())
        }, t.getAppVersion = function () {
            var e = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan|CheckMath)\/(\d+\.\d+\.\d+)(\s+|$)/i,
                r = t.getUserAgent(), n = r.match(e);
            return n ? n[2] : ""
        }, t.getImgSearchSDKVersion = function () {
            var e = t.getQuery();
            return e["imgsearch_version"] || ""
        }, t.compareVersions = function (t, e) {
            if (t === e) return 0;
            for (var r = t.split("."), n = e.split("."), i = Math.min(r.length, n.length), o = 0; o < i; o++) {
                if (parseInt(r[o]) > parseInt(n[o])) return 1;
                if (parseInt(r[o]) < parseInt(n[o])) return -1
            }
            return r.length > n.length ? 1 : r.length < n.length ? -1 : 0
        }, t.greaterThanOrEqualTo = function (e) {
            return t.compareVersions(t.getAppVersion(), e) >= 0
        }, t.greaterThan = function (e) {
            return t.compareVersions(t.getAppVersion(), e) > 0
        }, t.stringToByte = function (t) {
            var e, r, n = [];
            e = t.length;
            for (var i = 0; i < e; i++) r = t.charCodeAt(i), r >= 65536 && r <= 1114111 ? (n.push(r >> 18 & 7 | 240), n.push(r >> 12 & 63 | 128), n.push(r >> 6 & 63 | 128), n.push(63 & r | 128)) : r >= 2048 && r <= 65535 ? (n.push(r >> 12 & 15 | 224), n.push(r >> 6 & 63 | 128), n.push(63 & r | 128)) : r >= 128 && r <= 2047 ? (n.push(r >> 6 & 31 | 192), n.push(63 & r | 128)) : n.push(255 & r);
            return n
        }, t.getIOSVersion = function () {
            var e = t.getUserAgent().toLocaleLowerCase().match(/cpu iphone os (.*?) like mac os/);
            return e && e[1] ? e[1].replace(/_/g, ".") : ""
        }, t.getAndroidVersion = function () {
            var e = t.getUserAgent().toLocaleLowerCase().match(/android (.*?);/);
            return e && e[1] ? e[1].replace(/_/g, ".") : ""
        }, t.cached = function (t) {
            var e = Object.create(null);
            return function (r) {
                var n = e[r];
                return void 0 !== n && n || (e[r] = t(r))
            }
        }, t.isSupportCanvas = function (t) {
            return t && t instanceof HTMLCanvasElement || (t = document.createElement("canvas")), !!t.getContext("2d")
        }, t.base64ToFile = function (t) {
            var e;
            e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : unescape(t.split(",")[1]);
            for (var r = t.split(",")[0].split(":")[1].split(";")[0], n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
            return new Blob([n], {type: r})
        }, t.iosVersion = function () {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                if (t) return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || "0", 10)]
            }
            return []
        }, t.replaceSymbol = function (t, e) {
            return t ? (t = e ? t.replace(/frac/g, "\\frac").replace(/percent/g, "\\%").replace(/sqrt/g, "\\sqrt").replace(/times/g, "\\times").replace(/div/g, "\\div").replace(/\$n/g, "\n") : t.replace(/\\*frac/g, "frac").replace(/\\*%/g, "percent").replace(/\\*sqrt/g, "sqrt").replace(/\\*times/g, "times").replace(/\\*div/g, "div").replace(/\\\\/g, "spet").replace(/\n/g, "$n"), t) : t
        }, t.hasLatexSymbols = function (t) {
            return /frac|div|times|sqrt|\^|_/g.test(t)
        }, t.replaceLatexSymbols = function (e) {
            var r = t.hasLatexSymbols(e);
            return r ? /spet/g.test(e) ? (e = e.split("spet").map((function (t, e, r) {
                return e === r.length - 1 ? "" + t : t + " \\\\"
            })).join(" "), e = "$$\\begin{align}" + e + "\\end{align}$$") : e = "$$" + e + "$$" : /spet/g.test(e) ? e = e.replace(/spet/g, "\n") : e.length >= 20 || (e = "$$" + e + "$$"), e
        }, t.numberFormat = function (t, e) {
            void 0 === e && (e = "万");
            var r = 1e4;
            return t < r ? t : (Math.round(t / r * 10) / 10).toFixed(1) + e
        }, t.verifyPhone = function (t) {
            return /^(1[3-9]|70)\d{9}$/.test(t)
        }, t.verifyEmoji = function (t) {
            for (var e = 0; e < t.length; e++) {
                var r = t.charCodeAt(e);
                if (r >= 55296 && r <= 56319) {
                    if (t.length > 1) {
                        var n = t.charCodeAt(e + 1), i = 1024 * (r - 55296) + (n - 56320) + 65536;
                        if (i >= 118784 && i <= 128895) return !0
                    }
                } else if (t.length > 1) {
                    n = t.charCodeAt(e + 1);
                    if (8419 === n) return !0
                } else {
                    if (r >= 8448 && r <= 10239) return !0;
                    if (r >= 11013 && r <= 11015) return !0;
                    if (r >= 10548 && r <= 10549) return !0;
                    if (r >= 12951 && r <= 12953) return !0;
                    if (169 === r || 174 === r || 12349 === r || 12336 === r || 11093 === r || 11036 === r || 11035 === r || 11088 === r) return !0
                }
            }
        }, t.verifyEmojiV2 = function (t) {
            var e = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/gi;
            return e.test(t)
        }, t.haveEmoji = function (e) {
            return t.verifyEmoji(e) || t.verifyEmojiV2(e)
        }, t
    }(), ce = ue, le = ("undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : {}).NativeModules,
    he = void 0 === le ? null : le, fe = function (t) {
        return !he && new RegExp(t.toLowerCase()).test(("undefined" !== typeof navigator ? navigator.userAgent : "").toLowerCase())
    }, pe = function () {
        return fe("iP(hone|od|ad)")
    }, de = function () {
        return fe("Android|HarmonyOS")
    }, me = function () {
        return fe("YuanTiKu") && !ge()
    }, ge = function () {
        return fe("YuanTiKuEmbed")
    }, ve = function () {
        return fe("YuanSouTi") && !ye()
    }, ye = function () {
        return fe("YuanSouTiKouSuan")
    }, Ae = function () {
        return fe("YuanZuoWen")
    }, be = function () {
        return fe("CheckMath")
    }, Ee = function () {
        var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan|Gemini)\/(\d+\.\d+\.\d+)(\s+|$)/i,
            e = navigator.userAgent.match(t);
        return e ? e[2] : ""
    }, we = function () {
        var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan|Gemini)\/(\d+\.\d+\.\d+)(\s+|$)/i,
            e = navigator.userAgent.match(t);
        return e ? e[1] : ""
    },
    _e = (__webpack_require__(8269)["hp"], ("undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : {}).NativeModules),
    xe = void 0 === _e ? null : _e, Se = function (t, e) {
        if (t === e) return 0;
        for (var r = t.split("."), n = e.split("."), i = Math.min(r.length, n.length), o = 0; o < i; o++) {
            if (parseInt(r[o]) > parseInt(n[o])) return 1;
            if (parseInt(r[o]) < parseInt(n[o])) return -1
        }
        return r.length > n.length ? 1 : r.length < n.length ? -1 : 0
    }, Ce = function (t) {
        return Se(Ee(), t) >= 0
    }, Ve = function (t, e) {
        if (void 0 === e && (e = ""), !xe) {
            var r = new CustomEvent(t);
            r.initCustomEvent(t, !0, !0, e), document.body.dispatchEvent(r)
        }
    }, Ie = function () {
        if (de()) {
            var t = "undefined" === typeof window ? {} : window, e = t["CommonWebview"];
            return e && e["getWebViewInfo"]
        }
        return !0
    };
(function (t) {
    t[t["NULL"] = 0] = "NULL", t[t["METHOD_NOT_SUPPORT"] = -100] = "METHOD_NOT_SUPPORT", t[t["SET_TITLE_ERROR"] = 100] = "SET_TITLE_ERROR", t[t["SET_LEFT_BUTTON_ERROR"] = 200] = "SET_LEFT_BUTTON_ERROR", t[t["SET_RIGHT_BUTTON_ERROR"] = 300] = "SET_RIGHT_BUTTON_ERROR", t[t["TOAST_ERROR"] = 400] = "TOAST_ERROR", t[t["SHOW_SHARE_WINDOW_ERROR"] = 500] = "SHOW_SHARE_WINDOW_ERROR", t[t["SHOW_SHARE_WINDOW_CANCELED"] = 501] = "SHOW_SHARE_WINDOW_CANCELED", t[t["CAPTURE_ERROR"] = 600] = "CAPTURE_ERROR", t[t["CAPTURE_INVALID_AREA"] = 601] = "CAPTURE_INVALID_AREA", t[t["CAPTURE_FAILED"] = 602] = "CAPTURE_FAILED", t[t["CAPTURE_UPLOAD_FAILED"] = 603] = "CAPTURE_UPLOAD_FAILED", t[t["SHARE_AS_IMAGE_ERROR"] = 700] = "SHARE_AS_IMAGE_ERROR", t[t["SHARE_AS_IMAGE_CANCELED"] = 701] = "SHARE_AS_IMAGE_CANCELED", t[t["LOGIN_ERROR"] = 800] = "LOGIN_ERROR", t[t["LOGIN_CANCELED"] = 801] = "LOGIN_CANCELED", t[t["GET_USER_INFO_ERROR"] = 900] = "GET_USER_INFO_ERROR", t[t["GET_USER_INFO_NOT_LOGIN"] = 901] = "GET_USER_INFO_NOT_LOGIN", t[t["GET_USER_INFO_TRAIL_USER"] = 902] = "GET_USER_INFO_TRAIL_USER", t[t["OPEN_WEBVIEW_ERROR"] = 1e3] = "OPEN_WEBVIEW_ERROR", t[t["GET_IMMERSE_STATUS_BAR_HEIGHT_ERROR"] = 1100] = "GET_IMMERSE_STATUS_BAR_HEIGHT_ERROR", t[t["CLOSE_WEBVIEW_ERROR"] = 1200] = "CLOSE_WEBVIEW_ERROR", t[t["PAY_ERROR"] = 1300] = "PAY_ERROR", t[t["PAY_FAILED"] = 1301] = "PAY_FAILED", t[t["PAY_BROKEN"] = 1302] = "PAY_BROKEN", t[t["PAY_WECHAT_UNINSTALLED"] = 1303] = "PAY_WECHAT_UNINSTALLED", t[t["PAY_WECHAT_VERSION_TOO_LOW"] = 1304] = "PAY_WECHAT_VERSION_TOO_LOW", t[t["PREVIEW_IMAGE_ERROR"] = 1400] = "PREVIEW_IMAGE_ERROR", t[t["CHOOSE_IMAGE"] = 1500] = "CHOOSE_IMAGE", t[t["CAMERA_ERROR"] = 1600] = "CAMERA_ERROR", t[t["CAMERA_NOT_FOUND"] = 1601] = "CAMERA_NOT_FOUND", t[t["UPLOAD_IMAGE_ERROR"] = 1700] = "UPLOAD_IMAGE_ERROR", t[t["UPLOAD_IMAGE_FAILED"] = 1701] = "UPLOAD_IMAGE_FAILED", t[t["JS_LOAD_COMPLETE_ERROR"] = 1800] = "JS_LOAD_COMPLETE_ERROR", t[t["OPEN_SCHEMA_ERROR"] = 1900] = "OPEN_SCHEMA_ERROR", t[t["OPEN_SCHEMA_NO_MATCHED_PAGE"] = 1901] = "OPEN_SCHEMA_NO_MATCHED_PAGE", t[t["SET_ON_VISIBILITY_CHANGE"] = 2e3] = "SET_ON_VISIBILITY_CHANGE", t[t["GET_SHARE_LIST_ERROR"] = 2100] = "GET_SHARE_LIST_ERROR", t[t["DO_SHARE_ERROR"] = 2200] = "DO_SHARE_ERROR", t[t["DO_SHARE_CANCELED"] = 2201] = "DO_SHARE_CANCELED", t[t["BASE64_TO_LOCAL_PATH_ERROR"] = 2300] = "BASE64_TO_LOCAL_PATH_ERROR", t[t["LOCAL_PATH_TO_BASE64_ERROR"] = 2400] = "LOCAL_PATH_TO_BASE64_ERROR", t[t["GET_WEBVIEW_INFO_ERROR"] = 2500] = "GET_WEBVIEW_INFO_ERROR", t[t["DO_SHARE_AS_IMAGE_ERROR"] = 2600] = "DO_SHARE_AS_IMAGE_ERROR", t[t["DO_SHARE_AS_IMAGE_CANCELED"] = 2601] = "DO_SHARE_AS_IMAGE_CANCELED", t[t["SAVE_IMAGE_TO_ALBUM_ERROR"] = 2700] = "SAVE_IMAGE_TO_ALBUM_ERROR", t[t["SAVE_IMAGE_TO_ALBUM_NO_PERMISSION"] = 2701] = "SAVE_IMAGE_TO_ALBUM_NO_PERMISSION", t[t["SAVE_IMAGE_TO_ALBUM_DOWNLOAD_FAIL"] = 2702] = "SAVE_IMAGE_TO_ALBUM_DOWNLOAD_FAIL", t[t["SAVE_IMAGE_TO_ALBUM_SAVE_FAIL"] = 2703] = "SAVE_IMAGE_TO_ALBUM_SAVE_FAIL", t[t["COPY_TO_CLIPBOARD_ERROR"] = 2800] = "COPY_TO_CLIPBOARD_ERROR", t[t["SET_STATUS_BAR_TEXT_COLOR_ERROR"] = 3200] = "SET_STATUS_BAR_TEXT_COLOR_ERROR", t[t["OPEN_FULL_SCREEN_VIDEO_ERROR"] = 501] = "OPEN_FULL_SCREEN_VIDEO_ERROR", t[t["READ_CLIPBOARD_AUTH_ERROR"] = 3301] = "READ_CLIPBOARD_AUTH_ERROR", t[t["OTHER_ERROR"] = 3300] = "OTHER_ERROR", t[t["READ_CLIPBOARD_NO_CONTENT"] = 3302] = "READ_CLIPBOARD_NO_CONTENT", t[t["INVALID_PARAMS"] = 3401] = "INVALID_PARAMS"
})(ie || (ie = {}));
var Pe, Te = function () {
        function t() {
        }

        return t.prototype.get = function (t) {
            return new Promise((function (e, r) {
                var n = new XMLHttpRequest;
                n.withCredentials = !0, n.open("GET", t), n.timeout = 1e3, n.onload = function () {
                    this.status >= 200 && this.status < 400 ? e({
                        status: this.status,
                        body: this.response
                    }) : r({status: this.status})
                }, n.ontimeout = function () {
                    r({status: 502})
                }, n.send()
            }))
        }, t.prototype.post = function (t, e) {
            return new Promise((function (r, n) {
                var i = new XMLHttpRequest;
                i.withCredentials = !0, i.open("POST", t, !0), i.setRequestHeader && i.setRequestHeader("Content-Type", "application/json"), i.send(JSON.stringify(e)), i.timeout = 1e3, i.onload = function () {
                    this.status >= 200 && this.status < 400 ? r({
                        status: this.status,
                        body: this.response
                    }) : n({status: this.status})
                }, i.ontimeout = function () {
                    n({status: 502})
                }
            }))
        }, t
    }(), ke = new Te, Re = {
        SOLAR_HOST: "https://xyst.yuanfudao.com",
        LEO_HOST: "https://xyks.yuanfudao.com",
        GALLERY_HOST: "https://gallery.fbcontent.cn/api/ape/images/",
        APE_HOST: "https://ytk.yuanfudao.com"
    }, Oe = {
        SOLAR_HOST: "https://xyst.yuanfudao.biz",
        LEO_HOST: "https://xyks.yuanfudao.biz",
        GALLERY_HOST: "https://ytkgallery.yuanfudao.biz/api/ape/images/",
        APE_HOST: "https://ytk1.yuanfudao.biz"
    }, De = function () {
        return De = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, De.apply(this, arguments)
    }, Me = "undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : {}, Be = Me.NativeModules,
    Fe = void 0 === Be ? null : Be, Le = Me.RN_APP_CONFIG, Ne = void 0 === Le ? null : Le, Ue = Me.SSR_WEB_CONFIG,
    je = void 0 === Ue ? null : Ue, Ge = function () {
        if (Fe) return "online" === Ne ? Re : Oe;
        if (je) return "online" === je ? Re : Oe;
        var t = "undefined" === typeof window ? {} : window;
        return /^test-m\.|^(xyst|xyks|xjyy)-test\.|\.biz$/.test(t.location && t.location.hostname) ? Oe : Re
    }(), He = {}, qe = De(De({}, Ge), He), Qe = function () {
        return ke.get(qe.APE_HOST + "/accounts/api/current").then((function (t) {
            return JSON.parse(t.body)
        })).catch((function () {
            return {id: 0}
        }))
    };
(function (t) {
    t[t["TIMEOUT"] = -101] = "TIMEOUT", t[t["NULL"] = 0] = "NULL"
})(Pe || (Pe = {}));
var ze, We, Ye, Ke, Je, Xe, Ze, $e, tr, er, rr, nr, ir, or, ar = __webpack_require__(18448)["hp"], sr = 0,
    ur = function () {
        return "undefined" !== typeof navigator ? navigator.userAgent : ""
    }, cr = function (t) {
        void 0 === t && (t = "");
        for (var e = t + "_" + Date.now() + "_" + sr++, r = 0; r < 500 && window && window[e]; r++) e = t + "_" + Date.now() + "_" + sr++;
        if (window && window[e]) throw new Error(t + "_回调方法重复");
        return e
    }, lr = function () {
        return /iP(hone|od|ad)/.test(ur())
    }, hr = function () {
        return /iPad|iPhone|iPod|Android|Mobile/.test(ur())
    }, fr = function (t) {
        return t = String(t).replace(/[-_]/g, (function (t) {
            return "-" === t ? "+" : "/"
        })).replace(/[^A-Za-z0-9+/]/g, ""), new ar(t, "base64").toString()
    }, pr = function () {
        return /bridgetype\/2/.test(ur())
    }, dr = __webpack_require__(18448)["hp"], mr = function () {
        for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
        var n = Array(t), i = 0;
        for (e = 0; e < r; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, i++) n[i] = o[a];
        return n
    }, gr = ("undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : {}).NativeModules,
    vr = void 0 === gr ? null : gr, yr = "undefined" === typeof window ? {} : window, Ar = function (t, e, r, n, i) {
        void 0 === r && (r = "");
        var o = dr.from(JSON.stringify(e)).toString("base64");
        if (vr && vr.RNJsBridge) {
            var a = dr.from(JSON.stringify(e.arguments && e.arguments[0])).toString("base64");
            return vr.RNJsBridge.callNative(r, t, a, (function (t) {
                if (t && n) {
                    var e = JSON.parse(fr(t)), r = "function" === typeof n;
                    if (Array.isArray(e)) {
                        var o = e[0], a = e.slice(1);
                        o ? r ? n.apply(void 0, mr([o], a)) : i(o, a) : r ? n.apply(void 0, mr([Pe.NULL], a)) : i(Pe.NULL, a)
                    } else r ? n(Pe.NULL, e) : i(Pe.NULL, e)
                }
            })), !0
        }
        if (pr()) {
            var s = r + "_" + t;
            return !(!r || !yr[s]) && (yr[s].postMessage(o), !0)
        }
        if (lr()) {
            var u = r ? r + "_" + t : t, c = yr.webkit && yr.webkit.messageHandlers;
            if (c) {
                if (c[u]) return c[u].postMessage(o), !0
            } else if (hr() && "undefined" !== typeof window) {
                var l = window.document, h = l.body, f = l.createElement("iframe");
                return f.style.display = "none", f.src = "async:" + u + ":" + o, h.appendChild(f), h.removeChild(f), !0
            }
        } else {
            var p = (r ? r[0].toUpperCase() + r.substring(1) : "") + "WebView";
            c = yr[p];
            if (c && c[t]) return c[t](o), !0;
            var d = yr["LeoWebView"] || yr["SolarWebViewV2"];
            if (d && d.callNative) {
                var m = r ? r + "_" + t : t;
                a = dr.from(JSON.stringify({method: m, params: e.arguments && e.arguments[0]})).toString("base64");
                return d.callNative(a), !0
            }
        }
        return !1
    }, br = function () {
        return br = Object.assign || function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }, br.apply(this, arguments)
    }, Er = "undefined" === typeof window ? {} : window, wr = function (t, e, r, n) {
        void 0 === n && (n = 0);
        var i = -1;
        n > 0 && (i = setTimeout((function () {
            e({err: Pe.TIMEOUT, extData: {}})
        }), n));
        var o = function (r) {
            i && clearTimeout(i);
            var n = JSON.parse(fr(r));
            if (Array.isArray(n)) {
                var o = n[0], a = n.slice(1);
                o ? e({err: o, extData: a}) : t({extData: a, err: Pe.NULL})
            } else t({err: Pe.NULL, extData: n})
        };
        Er[r] = o
    }, _r = function (t, e, r) {
        void 0 === r && (r = 0);
        var n = -1;
        r > 0 && (n = setTimeout((function () {
            Er[t] = "", e(Pe.TIMEOUT)
        }), r)), Er[t] = function (t) {
            clearTimeout(n), e.apply(null, t ? JSON.parse(fr(t)) : [null])
        }
    }, xr = function (t, e) {
        return function (r, n) {
            r ? e({err: r, extData: n}) : t({err: r, extData: n})
        }
    }, Sr = function (t) {
        Er[t] = ""
    }, Cr = function (t, e, r, n) {
        void 0 === e && (e = {}), void 0 === r && (r = 0), void 0 === n && (n = "");
        var i = e.trigger, o = e.shareTrigger, a = e.callback, s = e.extraTriggers, u = cr(t),
            c = br(br(br({}, e), i && {trigger: u}), o && {shareCallback: u});
        Pr(c, s);
        var l = cr(t + "_callback"), h = !(i || o) && a, f = {arguments: [c], callback: h ? u : l};
        return new Promise((function (e, c) {
            var p = function () {
            };
            h || _r(l, p, r), i || o || a ? wr(e, c, u, r) : e({err: Pe.NULL, extData: []});
            var d = Ar(t, f, n, i || o || a, xr(e, c));
            !d && h ? (Sr(u), Ir(s)) : d || h || (Sr(l), Ir(s))
        }))
    }, Vr = function (t, e, r, n) {
        void 0 === e && (e = {}), void 0 === r && (r = 0), void 0 === n && (n = "");
        var i = e.trigger, o = e.shareTrigger, a = e.callback, s = e.extraTriggers, u = cr(t), c = cr(t + "_callback"),
            l = !(i || o) && a, h = br(br(br({}, e), i && {trigger: u}), o && {shareCallback: u});
        Pr(h, s), (i || o || a) && _r(u, i || o || a, r);
        var f = function () {
        };
        l || _r(c, f, r);
        var p = {arguments: [h], callback: l ? u : c}, d = Ar(t, p, n, i || o || a, f);
        !d && l ? (Sr(u), Ir(s)) : d || l || (Sr(c), Ir(s))
    }, Ir = function (t) {
        t && t.forEach((function (t) {
            Sr(t.generateTriggerName)
        }))
    }, Pr = function (t, e) {
        e && (e = Tr(e), e.forEach((function (e) {
            t[e.triggerName] = e.generateTriggerName, _r(e.generateTriggerName, e.trigger, e.timeout)
        })))
    }, Tr = function (t) {
        return t && t.map((function (t) {
            var e = cr(t.triggerName + "_extra");
            return t.generateTriggerName = e, t
        })) || []
    }, kr = "undefined" !== typeof navigator ? navigator.userAgent : "";
(function (t) {
    t["V0"] = "0.0.0", t["V1"] = "1.0.0", t["V1_1_0"] = "1.1.0", t["V1_2_0"] = "1.2.0", t["V1_3_0"] = "1.3.0", t["V1_4_0"] = "1.4.0", t["V1_5_0"] = "1.5.0", t["V1_6_0"] = "1.6.0", t["V1_8_1"] = "1.8.1", t["V1_9_0"] = "1.9.0"
})(ze || (ze = {})), function (t) {
    t["SOLAR"] = "YuanSouTi", t["LEO"] = "YuanSouTiKouSuan", t["TUTOR"] = "YuanFuDao", t["APE"] = "YuanTiKu", t["ODIN"] = "YuanZuoWen"
}(We || (We = {})), function (t) {
    t["ANDROID"] = "android", t["IOS"] = "ios"
}(Ye || (Ye = {})), function (t) {
    t[t["LINK"] = 0] = "LINK", t[t["IMAGE"] = 1] = "IMAGE"
}(Ke || (Ke = {})), function (t) {
    t[t["weibo"] = 1] = "weibo", t[t["moments"] = 2] = "moments", t[t["wechat"] = 3] = "wechat", t[t["qzone"] = 4] = "qzone", t[t["qq"] = 5] = "qq"
}(Je || (Je = {})), function (t) {
    t[t["weibo"] = 1] = "weibo", t[t["pyq"] = 2] = "pyq", t[t["wechat"] = 3] = "wechat", t[t["qzone"] = 4] = "qzone", t[t["qq"] = 5] = "qq"
}(Xe || (Xe = {})), function (t) {
    t[t["SinaWeibo"] = 1] = "SinaWeibo", t[t["WeChatTimeline"] = 2] = "WeChatTimeline", t[t["WeChat"] = 3] = "WeChat", t[t["Qzone"] = 4] = "Qzone", t[t["QQ"] = 5] = "QQ"
}(Ze || (Ze = {})), function (t) {
    t[t["SinaWeibo"] = 1] = "SinaWeibo", t[t["WeChatTimeline"] = 2] = "WeChatTimeline", t[t["WeChat"] = 3] = "WeChat", t[t["QZone"] = 4] = "QZone", t[t["QQ"] = 5] = "QQ"
}($e || ($e = {})), function (t) {
    t["OFFLINE"] = "offline", t["WIFI"] = "wifi", t["WWAN"] = "WWAN", t["TWO_G"] = "2G", t["THREE_G"] = "3G", t["FOUR_G"] = "4G", t["UNKNOWN"] = "unknown"
}(tr || (tr = {})), function (t) {
    t["MOBILE"] = "mobile", t["UNICOM"] = "unicom", t["TELECOM"] = "telecom", t["UNKNOWN"] = "unknown"
}(er || (er = {})), function (t) {
    t[t["NETWORK_ERROR"] = 1] = "NETWORK_ERROR", t[t["LOADING_ERROR"] = 2] = "LOADING_ERROR", t[t["LOADING"] = 3] = "LOADING", t[t["HIDE"] = 4] = "HIDE"
}(rr || (rr = {})), function (t) {
    t[t["PLAYLING"] = 1] = "PLAYLING", t[t["PAUSED"] = 2] = "PAUSED", t[t["FINISHED"] = 3] = "FINISHED"
}(nr || (nr = {})), function (t) {
    t[t["NOT_POPUP"] = 0] = "NOT_POPUP", t[t["POPUP"] = 1] = "POPUP"
}(ir || (ir = {})), function (t) {
    t[t["NOT_POPUP"] = 0] = "NOT_POPUP", t[t["AUTHORIZATED"] = 1] = "AUTHORIZATED", t[t["UNAUTHORIZATED"] = 2] = "UNAUTHORIZATED"
}(or || (or = {}));
var Rr, Or = "webViewLeftButtonClicked", Dr = "webviewLogin";
(function (t) {
    t["LOGIN_STATUS_CHANGE"] = "loginStatusChange", t["APP_GRADE_CHANGE"] = "appGradeChange", t["EXERCISE_GRADE_CHANGE"] = "exerciseGradeChange", t["SET_EXERCISE_GRADE"] = "setExerciseGrade"
})(Rr || (Rr = {}));
var Mr = function () {
    return Mr = Object.assign || function (t) {
        for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t
    }, Mr.apply(this, arguments)
}, Br = function (t, e, r, n) {
    function i(t) {
        return t instanceof r ? t : new r((function (e) {
            e(t)
        }))
    }

    return new (r || (r = Promise))((function (r, o) {
        function a(t) {
            try {
                u(n.next(t))
            } catch (e) {
                o(e)
            }
        }

        function s(t) {
            try {
                u(n["throw"](t))
            } catch (e) {
                o(e)
            }
        }

        function u(t) {
            t.done ? r(t.value) : i(t.value).then(a, s)
        }

        u((n = n.apply(t, e || [])).next())
    }))
}, Fr = function (t, e) {
    var r, n, i, o, a = {
        label: 0, sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1]
        }, trys: [], ops: []
    };
    return o = {
        next: s(0),
        throw: s(1),
        return: s(2)
    }, "function" === typeof Symbol && (o[Symbol.iterator] = function () {
        return this
    }), o;

    function s(t) {
        return function (e) {
            return u([t, e])
        }
    }

    function u(o) {
        if (r) throw new TypeError("Generator is already executing.");
        while (a) try {
            if (r = 1, n && (i = 2 & o[0] ? n["return"] : o[0] ? n["throw"] || ((i = n["return"]) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
            switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                case 0:
                case 1:
                    i = o;
                    break;
                case 4:
                    return a.label++, {value: o[1], done: !1};
                case 5:
                    a.label++, n = o[1], o = [0];
                    continue;
                case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                default:
                    if (i = a.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                        a = 0;
                        continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                        a.label = o[1];
                        break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                        a.label = i[1], i = o;
                        break
                    }
                    if (i && a.label < i[2]) {
                        a.label = i[2], a.ops.push(o);
                        break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
            }
            o = e.call(t, a)
        } catch (s) {
            o = [6, s], n = 0
        } finally {
            r = i = 0
        }
        if (5 & o[0]) throw o[1];
        return {value: o[0] ? o[1] : void 0, done: !0}
    }
}, Lr = function (t, e) {
    var r = {};
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
    if (null != t && "function" === typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (n = Object.getOwnPropertySymbols(t); i < n.length; i++) e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[i]) && (r[n[i]] = t[n[i]])
    }
    return r
}, Nr = "undefined" === typeof window ? {} : window;
Nr.box = {};
var Ur = ze.V0, jr = ze.V1, Gr = (ze.V1_2_0, ze.V1_3_0, ze.V1_4_0, ze.V1_6_0, ze.V1_8_1, ze.V1_9_0, []),
    Hr = ("undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : {}).NativeModules,
    qr = void 0 === Hr ? null : Hr, Qr = {}, zr = {}, Wr = function () {
        return Br(void 0, void 0, void 0, (function () {
            var t, e, r;
            return Fr(this, (function (n) {
                switch (n.label) {
                    case 0:
                        return Nr.box.webviewInfo ? [3, 2] : [4, Cr("getWebViewInfo", {trigger: !0}, 0, "common").catch((function (t) {
                            return t
                        }))];
                    case 1:
                        if (t = n.sent(), e = t.err, r = t.extData, e && e !== ie.METHOD_NOT_SUPPORT) throw e;
                        e === ie.METHOD_NOT_SUPPORT && (Nr.box.webviewInfo = {version: Ur}), e || (Nr.box.webviewInfo = r[0]), n.label = 2;
                    case 2:
                        return [2, Nr.box.webviewInfo]
                }
            }))
        }))
    }, Yr = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            var e, r, n, i, o, a, s, u, c, l, h, f, p, d, m, g;
            return Fr(this, (function (v) {
                switch (v.label) {
                    case 0:
                        return e = t.params, r = void 0 === e ? {} : e, n = t.exceptedVersion, i = t.supportedApps, o = void 0 === i ? [] : i, a = t.excludeApps, s = void 0 === a ? {} : a, u = t.requiredParams, c = void 0 === u ? [] : u, c.every((function (t) {
                            return !!r[t]
                        })) ? qr ? [2, !0] : Ie() ? [4, Wr()] : [3, 2] : [2, !1];
                    case 1:
                        if (l = v.sent().version, Se(l, n) < 0) return [2, !1];
                        v.label = 2;
                    case 2:
                        return o.length > 0 && !o.find((function (t) {
                            kr.includes(t) && (t !== We.SOLAR || kr.includes(We.LEO))
                        })) ? [2, !1] : (h = we(), s[h] && (f = s[h], p = f.version, d = void 0 === p ? "" : p, m = f.device, g = void 0 === m ? "" : m, (g === Ye.ANDROID && de() || g === Ye.IOS && pe()) && d && !Ce(d)) ? [2, !1] : [2, !0])
                }
            }))
        }))
    }, Kr = function (t, e, r, n) {
        return void 0 === n && (n = ""), Br(void 0, void 0, void 0, (function () {
            var i, o, a, s, u, c, l, h, f;
            return Fr(this, (function (p) {
                switch (p.label) {
                    case 0:
                        return i = e.V0, o = e.V1, a = e.timeout, s = void 0 === a ? 0 : a, u = e.validParams, c = e.oldValidParams, l = o, l ? [4, Yr(Mr(Mr({}, u), {exceptedVersion: o}))] : [3, 2];
                    case 1:
                        l = p.sent(), p.label = 2;
                    case 2:
                        return l ? [2, Cr(t, null === u || void 0 === u ? void 0 : u.params, s, n || "common").then((function (t) {
                            return Mr(Mr({}, t), {version: o})
                        })).catch((function (t) {
                            return Promise.reject(Mr(Mr({}, t), {version: o}))
                        }))] : (h = i, h ? [4, Yr(Mr(Mr({}, c || u), {exceptedVersion: i}))] : [3, 4]);
                    case 3:
                        h = p.sent(), p.label = 4;
                    case 4:
                        return h ? (f = (null === c || void 0 === c ? void 0 : c.params) || (null === u || void 0 === u ? void 0 : u.params), [2, Cr(r || t, f, s, n).then((function (t) {
                            return Mr(Mr({}, t), {version: i})
                        })).catch((function (t) {
                            return Promise.reject(Mr(Mr({}, t), {version: i}))
                        }))]) : [2, Promise.reject({V0: i, err: ie.METHOD_NOT_SUPPORT, extData: []})]
                }
            }))
        }))
    }, Jr = function (t, e, r, n) {
        return void 0 === n && (n = ""), Br(void 0, void 0, void 0, (function () {
            var i, o, a, s, u, c, l, h, f, p, d, m, g;
            return Fr(this, (function (v) {
                switch (v.label) {
                    case 0:
                        return i = e.V0, o = e.V1, a = e.timeout, s = void 0 === a ? 0 : a, u = e.validParams, c = e.oldValidParams, l = o, l ? [4, Yr(Mr(Mr({}, u), {exceptedVersion: o}))] : [3, 2];
                    case 1:
                        l = v.sent(), v.label = 2;
                    case 2:
                        return l ? (Vr(t, null === u || void 0 === u ? void 0 : u.params, s, n || "common"), [3, 6]) : [3, 3];
                    case 3:
                        return h = i, h ? [4, Yr(Mr(Mr({}, c || u), {exceptedVersion: i}))] : [3, 5];
                    case 4:
                        h = v.sent(), v.label = 5;
                    case 5:
                        h ? (f = (null === c || void 0 === c ? void 0 : c.params) || (null === u || void 0 === u ? void 0 : u.params), Vr(r || t, f, s, n)) : (f = (null === c || void 0 === c ? void 0 : c.params) || (null === u || void 0 === u ? void 0 : u.params), p = f, d = p.trigger, m = p.shareTrigger, g = p.callback, d && d(ie.METHOD_NOT_SUPPORT), m && m(ie.METHOD_NOT_SUPPORT), g && g(ie.METHOD_NOT_SUPPORT)), v.label = 6;
                    case 6:
                        return [2]
                }
            }))
        }))
    }, Xr = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            var e;
            return Fr(this, (function (r) {
                return e = t.trigger, Jr("setLeftButton", {
                    V0: Ur,
                    V1: jr,
                    validParams: {
                        params: Mr(Mr(Mr({}, t), e && {
                            trigger: function () {
                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                var n = t[0], i = t.slice(1);
                                Ve(Or, i[0]), e(n)
                            }
                        }), {hidden: !!t.hidden})
                    }
                }), [2]
            }))
        }))
    }, Zr = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            var e, r, n, i;
            return Fr(this, (function (o) {
                return e = t, r = e.trigger, n = e.block, i = Lr(e, ["trigger", "block"]), qr ? Xr(Mr({trigger: r}, i)) : (!Nr._LeftButtonTriggerCacheList_ && (Nr._LeftButtonTriggerCacheList_ = []), r && Nr._LeftButtonTriggerCacheList_.push(r), pe() && ("boolean" === typeof n && (zr.showDialog = n), cn("exitDialog", Mr(Mr({}, zr), {
                    trigger: function (t, e) {
                        if (!t && e.result) for (var r = 0; r < Nr._LeftButtonTriggerCacheList_.length; r++) Nr._LeftButtonTriggerCacheList_[r](t)
                    }
                }), "leo")), Qr = Mr(Mr({}, Qr), null !== i && void 0 !== i ? i : {}), Jr("setLeftButton", {
                    V0: Ur,
                    V1: jr,
                    validParams: {
                        params: Mr(Mr({}, Qr), {
                            trigger: function () {
                                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                var r = t[0], n = t.slice(1);
                                Ve(Or, n[0]);
                                for (var i = 0; i < Nr._LeftButtonTriggerCacheList_.length; i++) Nr._LeftButtonTriggerCacheList_[i](r)
                            }, hidden: !!Qr.hidden
                        })
                    }
                })), [2]
            }))
        }))
    }, $r = function (t, e) {
        return Ce("11.39.0") ? Kr("toast", {
            V0: Ur,
            V1: jr,
            validParams: {params: {message: t, timeout: e || 3e3}}
        }, "", "solar") : Kr("toast", {V0: Ur, V1: jr, validParams: {params: {message: t}}})
    }, tn = function () {
        return Kr("closeWebView", {V0: Ur, V1: jr})
    }, en = function (t) {
        return Kr("jsLoadComplete", {V0: Ur, V1: jr, validParams: {params: t}})
    }, rn = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            var e, r, n, i, o, a, s, u;
            return Fr(this, (function (c) {
                switch (c.label) {
                    case 0:
                        if (e = t.trigger, r = Mr(Mr({}, t), {schemas: JSON.parse(JSON.stringify(t.schemas))}), !r.schemas.length) throw "string" === typeof e && "function" === typeof Nr[e] && Nr[e](ie.OPEN_SCHEMA_NO_MATCHED_PAGE), "function" === typeof e && e(ie.OPEN_SCHEMA_NO_MATCHED_PAGE), new Error("ERRORS.OPEN_SCHEMA_NO_MATCHED_PAGE");
                        return [4, Kr("openSchema", {
                            V0: Ur,
                            V1: jr,
                            validParams: {params: r},
                            oldValidParams: {params: Mr(Mr({}, r), {schema: r.schemas[0], trigger: !1, callback: !0})}
                        }).catch((function (t) {
                            return t
                        }))];
                    case 1:
                        return n = c.sent(), i = n.version, o = n.err, a = n.extData, i === Ur ? (s = a[0], u = function () {
                            return pe() ? !o : "成功" === s
                        }(), u ? ("function" === typeof e && e(ie.NULL), "string" === typeof e && "function" === typeof (window && window[e]) && Nr[e](ie.NULL)) : (r.schemas.shift(), rn(r))) : e && e(o), [2]
                }
            }))
        }))
    }, nn = function (t) {
        Yr({exceptedVersion: jr}).then((function () {
            var e = t.trigger;
            if (de()) {
                e && Gr.push(e);
                var r = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    Gr.forEach((function (e) {
                        e.apply(void 0, t)
                    }))
                };
                t.trigger = r
            }
            Vr("setOnVisibilityChange", t, 0, "common")
        }))
    }, on = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            var e, r, n, i;
            return Fr(this, (function (o) {
                switch (o.label) {
                    case 0:
                        return e = t.trigger, [4, Kr("openWebView", {
                            V0: Ur,
                            V1: jr,
                            validParams: {params: t}
                        }).catch((function (t) {
                            return t
                        }))];
                    case 1:
                        return r = o.sent(), n = r.err, i = r.extData, e && e(n, i[0]), [2]
                }
            }))
        }))
    }, an = function () {
        return Br(void 0, void 0, void 0, (function () {
            var t, e, r, n, i, o, a;
            return Fr(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return [4, Kr("getUserInfo", {V1: jr, validParams: {params: {trigger: !0}}}).catch((function (t) {
                            return t
                        }))];
                    case 1:
                        if (t = s.sent(), e = t.err, r = t.extData, console.log(">>>>>>>>>最终结果", e, r), Ve(Dr, r[0]), e) throw e;
                        return n = r[0], !pe() || be() ? [3, 4] : ve() ? (i = Ee(), o = Se(i, "10.14.0"), o < 1 ? [4, Qe()] : [3, 3]) : [3, 3];
                    case 2:
                        a = s.sent(), n.userId = a.id, s.label = 3;
                    case 3:
                        n.nickname && (n.nickName = n.nickname, delete n.nickname), s.label = 4;
                    case 4:
                        return [2, n]
                }
            }))
        }))
    }, sn = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            return Fr(this, (function (e) {
                switch (e.label) {
                    case 0:
                        return [4, Kr("login", {
                            V0: Ur,
                            V1: jr,
                            validParams: {params: Mr({trigger: !0}, t)},
                            oldValidParams: {params: {callback: me() && pe()}}
                        })];
                    case 1:
                        if (e.sent(), Ae()) return [3, 5];
                        e.label = 2;
                    case 2:
                        return e.trys.push([2, , 4, 5]), [4, an()];
                    case 3:
                        return e.sent(), [3, 5];
                    case 4:
                        return [7];
                    case 5:
                        return [2]
                }
            }))
        }))
    }, un = function () {
        return Br(void 0, void 0, void 0, (function () {
            var t, e, r;
            return Fr(this, (function (n) {
                switch (n.label) {
                    case 0:
                        return [4, Kr("getImmerseStatusBarHeight", {
                            V0: Ur,
                            V1: jr,
                            validParams: {params: {trigger: !0}},
                            oldValidParams: {params: {callback: !0}}
                        }, "getStatusBarHeight").catch((function (t) {
                            return t
                        }))];
                    case 1:
                        if (t = n.sent(), e = t.err, r = t.extData, e) throw e;
                        return [2, r[0]]
                }
            }))
        }))
    }, cn = function (t, e, r) {
        void 0 === r && (r = ""), e.callback && (e.trigger = e.callback), Jr(t, {V0: Ur, oldValidParams: {params: e}}, t, r)
    }, ln = function (t) {
        cn("refreshStateView", Mr({state: rr.LOADING_ERROR}, t))
    }, hn = function () {
        cn("refreshStateView", {state: rr.LOADING})
    }, fn = function () {
        cn("refreshStateView", {state: rr.HIDE})
    }, pn = function (t) {
        return Br(void 0, void 0, void 0, (function () {
            return Fr(this, (function (e) {
                return cn("addFrog", t, "leo"), [2]
            }))
        }))
    };
de() && en({});
var dn = function (t) {
    return Br(void 0, void 0, void 0, (function () {
        return Fr(this, (function (e) {
            return cn("addFrog", t), [2]
        }))
    }))
}, mn = __webpack_require__(18448)["hp"], gn = function () {
    return navigator.userAgent
}, vn = function () {
    return /iP(hone|od|ad)/.test(gn())
}, yn = function (t) {
    return t = String(t).replace(/[-_]/g, (function (t) {
        return "-" === t ? "+" : "/"
    })).replace(/[^A-Za-z0-9+/]/g, ""), new mn(t, "base64").toString()
}, An = 0, bn = function (t) {
    void 0 === t && (t = "");
    for (var e = t + "_" + Date.now() + "_" + An++, r = 0; r < 500 && window[e]; r++) e = t + "_" + Date.now() + "_" + An++;
    if (window[e]) throw new Error(t + "_回调方法重复");
    return e
}, En = __webpack_require__(18448)["hp"], wn = window, _n = "CheckMathWebView", xn = function (t) {
    if (t.params && t.params.trigger) {
        var e = t.params.trigger, r = t.name, n = bn(t.name);
        wn[n] = function (t) {
            var n = yn(t), i = JSON.parse(n), o = i[0];
            if (o) try {
                Cn({url: "/debug/jsbridge/error", params: {name: r, err: o}})
            } catch (a) {
            }
            e.apply(null, i)
        }, t.params.trigger = n
    }
}, Sn = function (t) {
    if (xn(t), vn()) {
        var e = wn.webkit && wn.webkit.messageHandlers;
        if (e && e[t.name]) {
            var r = En.from(JSON.stringify({arguments: t.params ? [t.params] : []})).toString("base64");
            return e[t.name].postMessage(r), !0
        }
    } else {
        r = En.from(JSON.stringify(t)).toString("base64"), e = wn[_n];
        if (e && e.callNative) return e.callNative(r), !0
    }
    return !1
}, Cn = function (t) {
    Sn({name: "CheckMath_addFrog", params: t})
}, Vn = function (t, e, r) {
    return !1 !== e && In() ? Pn(t, r) : t
}, In = function () {
    return ce.isYuanKouSuan() && ce.greaterThanOrEqualTo("3.36.0") || ce.isCheckMath() && ce.greaterThanOrEqualTo("1.31.0") || ce.isYuanSouTi() && ce.greaterThanOrEqualTo("11.43.0") || ce.isYuanZuoWen()
}, Pn = function (t, e) {
    return t.send = function (t, r, n) {
        var i = r.entries[0];
        if (i) {
            var o = i.url, a = {};
            a.url = o, a.flushFrog = e || !1, a.params = {}, i.keyValues.forEach((function (t) {
                var e = t.key, r = t.value;
                a.params[e] = r
            })), ce.isCheckMath() ? Cn(a) : ce.isYuanSouTi() || ce.isYuanZuoWen() ? dn(a) : pn(a), n(void 0)
        }
    }, t.isNativeFrog = !0, t
}, Tn = function () {
    var t = function (e, r) {
        return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        }, t(e, r)
    };
    return function (e, r) {
        function n() {
            this.constructor = e
        }

        t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
    }
}(), kn = function (t) {
    function e(e, r, n) {
        var i = t.call(this, Vn(e, r, n)) || this;
        return i.contexts = [], i.__isBindWebViewEvent = !1, i
    }

    return Tn(e, t), e.buildFrogData = function (t, e) {
        return e
    }, e.prototype.bindEnterFrog = function (t, r) {
        this.sendEnterFrog(e.buildFrogData(t, r))
    }, e.prototype.bindWebViewEventFrog = function (t, r) {
        var n = this;
        if (!this.__isBindWebViewEvent) {
            var i = [Lt, Nt, Ut];
            i.forEach((function (i) {
                document.body.addEventListener(i, (function (i) {
                    n.sendWebViewEventFrog(i, e.buildFrogData(t, r))
                }))
            })), this.__isBindWebViewEvent = !0
        }
    }, e.prototype.bindElementClickEventFrog = function (t, r, n) {
        var i = this;
        t.addEventListener("click", (function () {
            i.sendClickFrog(t, e.buildFrogData(r, n))
        }), !0)
    }, e.prototype.bindElementDisplayEventFrog = function (t, r, n) {
        var i = this;
        Xt.getIsVisibleByElement(t) && this.sendDisplayFrog(t, e.buildFrogData(r, n)), this.bindDisplayMutationObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e.prototype.bindElementSeenEventFrog = function (t, r, n) {
        var i = this;
        this.bindDisplayIntersectionObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e.prototype.bindElementEverySeenEventFrog = function (t, r, n) {
        var i = this;
        this.bindEveryDisplayIntersectionObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e
}(se), Rn = kn, On = __webpack_require__(96743), Dn = function () {
    var t = function (e, r) {
        return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        }, t(e, r)
    };
    return function (e, r) {
        function n() {
            this.constructor = e
        }

        t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
    }
}(), Mn = function () {
    return Mn = Object.assign || function (t) {
        for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t
    }, Mn.apply(this, arguments)
};
IntersectionObserver.prototype.POLL_INTERVAL = 1e3;
var Bn = new Promise((function (t) {
    window.addEventListener("load", (function () {
        t(0)
    }))
})), Fn = function (t) {
    function e(e) {
        var r = t.call(this, {
            appId: "solar-web", appToken: Kt.appToken, env: Kt.env, getTimestamp: function () {
                return Date.now()
            }, debug: !1, immediate: !0
        }) || this;
        return r.commonConfig = e, r.initHook(), r.observeDisableSeenFrogFlag(), r.watchVisibilityChangeEvent(), r.commonConfig.productId || (r.commonConfig.productId = U), r.commonConfig.userId && (r.commonConfig.userId = +r.commonConfig.userId), r.commonConfig.threshold || (r.commonConfig.threshold = [.5]), r.authPromise = r.updateAuthConfig(), r.authPromise.then((function () {
            r.init({
                userId: r.commonConfig.userId || 0,
                originUserId: 0,
                primaryUserId: 0,
                productId: r.commonConfig.productId || 0,
                appVersion: S()
            })
        })), r.globalParams = e.globalParams || {}, r.globalParams.appId || (r.globalParams.appId = j), r.seenNodeDataArr = [], r.watchUserIdChangeEvent(), r
    }

    return Dn(e, t), e.getFrogName = function (t) {
        return t.dataset.name || t.id || "button"
    }, e.getFrogEventId = function (t) {
        var e = t.dataset.id && Number(t.dataset.id);
        return e || -1
    }, e.prototype.observeDisableSeenFrogFlag = function () {
        var t = this;
        this.commonConfig.disableSeenFrog = !!this.commonConfig.disableSeenFrog;
        var e = this.commonConfig.disableSeenFrog;
        Object.defineProperty(this.commonConfig, "disableSeenFrog", {
            set: function (r) {
                e = r, r || "visible" !== document.visibilityState || t.addSeenNodeDataIntoObserver()
            }, get: function () {
                return e
            }
        })
    }, e.prototype.initHook = function () {
        var t = this;
        (0, G.solarHook)({
            onreadystatechange: function (e) {
                t.handleXHR(e)
            }, onload: function (e) {
                t.handleXHR(e)
            }
        }), O() && document.addEventListener("WeixinJSBridgeReady", (function () {
            "miniprogram" === window.__wxjs_environment && (t.commonConfig.productId = 681)
        }), !1)
    }, e.prototype.handleXHR = function (t) {
        if (t.status >= 200 && t.status < 300 && 4 === t.readyState) {
            if (/accounts\/api\/(login|current)/.test(t.responseURL)) try {
                var e = void 0;
                "string" === typeof t.response ? e = JSON.parse(t.response) : "object" === typeof t.response && t.response && t.response.id && (e = t.response), e && e.id && this.updateUserId(e.id)
            } catch (r) {
                console.error("parse response failed", r)
            }
            /accounts\/api\/logout/.test(t.responseURL) && this.updateUserId(0)
        }
    }, Object.defineProperty(e.prototype, "pageName", {
        get: function () {
            return this.commonConfig && this.commonConfig.pageName || "page"
        }, enumerable: !1, configurable: !0
    }), e.prototype.watchUserIdChangeEvent = function () {
        var t = this;
        document.body.addEventListener(jt, (function (e) {
            try {
                var r = e, n = r.detail;
                n && n.userId && n.userId > 0 && t.updateUserId(n.userId)
            } catch (i) {
                console.log("handle login event error: ", i)
            }
        }))
    }, e.prototype.updateAuthConfig = function () {
        var t = this, e = this.commonConfig || {}, r = e.interfaceLogProductId, n = e.isNativeFrog,
            i = void 0 !== n && n;
        return ee.getAuthContext(r, i).then((function (e) {
            t.commonConfig.userId = +e.ytkUserId, t.commonConfig.VIPType = e.VIPType
        })).catch((function (t) {
            console.log(t)
        }))
    }, e.prototype.updateUserId = function (t) {
        t && (this.commonConfig.userId = +t)
    }, e.prototype.addFrog = function (t, e, r) {
        var n = this;
        void 0 === r && (r = -1), this.authPromise.then((function () {
            return n.add({url: t, eventId: r, customExtend: Mn(Mn({}, n.globalParams), e)})
        })).catch((function (t) {
            console.error("addFrog error:", t)
        }))
    }, e.prototype.addClickFrog = function (t, e, r, n) {
        this.addFrog("/click/" + (n || this.pageName) + "/" + t, e, r)
    }, e.prototype.addEventFrog = function (t, e, r, n) {
        this.addFrog("/event/" + (n || this.pageName) + "/" + t, e, r)
    }, e.prototype.sendEnterFrog = function (t, r) {
        var n = e.getFrogEventId(t);
        this.addFrog("/event/" + this.pageName + "/enter", r, n)
    }, e.prototype.sendWebViewEventFrog = function (t, e) {
        switch (t.type) {
            case Lt:
                this.addFrog("/click/" + this.pageName + "/" + Lt, e);
                break;
            case Nt:
                this.addFrog("/click/" + this.pageName + "/" + Nt, e);
                break;
            case Ut:
                var r = t, n = void 0;
                n = "qq" === r.detail ? "QQ" : r.detail.toLowerCase().replace(/( |^)[a-z]/g, (function (t) {
                    return t.toUpperCase()
                })), this.addFrog("/click/" + this.pageName + "/" + Ut + "To" + n)
        }
    }, e.prototype.sendClickFrog = function (t, r) {
        var n = e.getFrogName(t), i = e.getFrogEventId(t);
        this.addFrog("/click/" + this.pageName + "/" + n, r, i)
    }, e.prototype.sendDisplayFrog = function (t, r) {
        var n = e.getFrogName(t), i = e.getFrogEventId(t);
        this.addFrog("/event/" + this.pageName + "/" + n, r, i)
    }, e.prototype.bindDisplayMutationObserver = function (t, e) {
        var r = Xt.getIsVisibleByElement(t), n = {
            attributes: !0,
            attributeFilter: ["style", "class"],
            attributeOldValue: !0,
            childList: !0,
            subtree: !1
        }, i = new MutationObserver((function (t) {
            for (var n = 0, i = t; n < i.length; n++) {
                var o = i[n];
                if ("attributes" === o.type) {
                    var a = o.oldValue ? Xt.getIsVisibleByMutation(o) : r, s = Xt.getIsVisibleByElement(o.target);
                    !a && s && "function" === typeof e && e()
                }
            }
        }));
        i.observe(t, n)
    }, e.prototype.bindDisplayIntersectionObserver = function (t, e) {
        "visible" !== document.visibilityState || this.commonConfig.disableSeenFrog ? this.seenNodeDataArr.push({
            node: t,
            callback: e
        }) : this.addIntersectionObserver(t, e, !1)
    }, e.prototype.bindEveryDisplayIntersectionObserver = function (t, e) {
        "visible" !== document.visibilityState || this.commonConfig.disableSeenFrog ? this.seenNodeDataArr.push({
            node: t,
            callback: e
        }) : this.addIntersectionObserver(t, e, !0)
    }, e.prototype.addIntersectionObserver = function (t, e, r, n) {
        void 0 === n && (n = !1);
        var i = new IntersectionObserver((function (t) {
            var n = t[0];
            n.isIntersecting && ("function" === typeof e && e(), !r && i.unobserve(n.target))
        }), {threshold: this.commonConfig.threshold});
        n ? i.observe(t) : Bn.then((function () {
            i.observe(t)
        }))
    }, e.prototype.addSeenNodeDataIntoObserver = function () {
        var t = this;
        this.seenNodeDataArr.forEach((function (e) {
            t.bindDisplayIntersectionObserver(e.node, e.callback)
        })), this.seenNodeDataArr = []
    }, e.prototype.watchVisibilityChangeEvent = function () {
        var t = this;
        document.addEventListener("visibilitychange", (function () {
            "visible" === document.visibilityState && t.seenNodeDataArr.length && !t.commonConfig.disableSeenFrog && t.addSeenNodeDataIntoObserver()
        }))
    }, e
}(On.$A), Ln = Fn, Nn = function () {
    var t = function (e, r) {
        return t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
            t.__proto__ = e
        } || function (t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        }, t(e, r)
    };
    return function (e, r) {
        function n() {
            this.constructor = e
        }

        t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
    }
}(), Un = function (t) {
    function e(e, r, n) {
        var i = t.call(this, Vn(e, r, n)) || this;
        return i.contexts = [], i.__isBindWebViewEvent = !1, i
    }

    return Nn(e, t), e.buildFrogData = function (t, e) {
        return e
    }, e.prototype.bindEnterFrog = function (t, r, n) {
        this.sendEnterFrog(t, e.buildFrogData(r, n))
    }, e.prototype.bindWebViewEventFrog = function (t, r) {
        var n = this;
        if (!this.__isBindWebViewEvent) {
            var i = [Lt, Nt, Ut];
            i.forEach((function (i) {
                document.body.addEventListener(i, (function (i) {
                    n.sendWebViewEventFrog(i, e.buildFrogData(t, r))
                }))
            })), this.__isBindWebViewEvent = !0
        }
    }, e.prototype.bindElementClickEventFrog = function (t, r, n) {
        var i = this;
        t.addEventListener("click", (function () {
            i.sendClickFrog(t, e.buildFrogData(r, n))
        }), !0)
    }, e.prototype.bindElementDisplayEventFrog = function (t, r, n) {
        var i = this;
        Xt.getIsVisibleByElement(t) && this.sendDisplayFrog(t, e.buildFrogData(r, n)), this.bindDisplayMutationObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e.prototype.bindElementSeenEventFrog = function (t, r, n) {
        var i = this;
        this.bindDisplayIntersectionObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e.prototype.bindElementEverySeenEventFrog = function (t, r, n) {
        var i = this;
        this.bindEveryDisplayIntersectionObserver(t, (function () {
            i.sendDisplayFrog(t, e.buildFrogData(r, n))
        }))
    }, e
}(Ln), jn = Un, Gn = {
    ENTER: "enter",
    CLICK: "click",
    UPDATE: "update",
    DISPLAY: "display",
    WEBVIEW: "webview",
    SEEN: "seen",
    SEEN_ALWAYS: "always"
}, Hn = function () {
    return Hn = Object.assign || function (t) {
        for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t
    }, Hn.apply(this, arguments)
}, qn = function (t, e, r, n) {
    function i(t) {
        return t instanceof r ? t : new r((function (e) {
            e(t)
        }))
    }

    return new (r || (r = Promise))((function (r, o) {
        function a(t) {
            try {
                u(n.next(t))
            } catch (e) {
                o(e)
            }
        }

        function s(t) {
            try {
                u(n["throw"](t))
            } catch (e) {
                o(e)
            }
        }

        function u(t) {
            t.done ? r(t.value) : i(t.value).then(a, s)
        }

        u((n = n.apply(t, e || [])).next())
    }))
}, Qn = function (t, e) {
    var r, n, i, o, a = {
        label: 0, sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1]
        }, trys: [], ops: []
    };
    return o = {
        next: s(0),
        throw: s(1),
        return: s(2)
    }, "function" === typeof Symbol && (o[Symbol.iterator] = function () {
        return this
    }), o;

    function s(t) {
        return function (e) {
            return u([t, e])
        }
    }

    function u(o) {
        if (r) throw new TypeError("Generator is already executing.");
        while (a) try {
            if (r = 1, n && (i = 2 & o[0] ? n["return"] : o[0] ? n["throw"] || ((i = n["return"]) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
            switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                case 0:
                case 1:
                    i = o;
                    break;
                case 4:
                    return a.label++, {value: o[1], done: !1};
                case 5:
                    a.label++, n = o[1], o = [0];
                    continue;
                case 7:
                    o = a.ops.pop(), a.trys.pop();
                    continue;
                default:
                    if (i = a.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                        a = 0;
                        continue
                    }
                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                        a.label = o[1];
                        break
                    }
                    if (6 === o[0] && a.label < i[1]) {
                        a.label = i[1], i = o;
                        break
                    }
                    if (i && a.label < i[2]) {
                        a.label = i[2], a.ops.push(o);
                        break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
            }
            o = e.call(t, a)
        } catch (s) {
            o = [6, s], n = 0
        } finally {
            r = i = 0
        }
        if (5 & o[0]) throw o[1];
        return {value: o[0] ? o[1] : void 0, done: !0}
    }
}, zn = function (t) {
    var e = window.location.href || "", r = e.match(/(^|[?&])keypath=([^&#]*)/),
        n = decodeURIComponent(r && r[2] || "");
    return n ? "" + n + (t && "," + t) : t
}, Wn = function (t, e, r, n, i) {
    return qn(void 0, void 0, void 0, (function () {
        var o, a;
        return Qn(this, (function (s) {
            switch (s.label) {
                case 0:
                    if (!e || !Object.keys(e).length) return [2];
                    if (o = {}, !(r instanceof Promise)) return [3, 5];
                    s.label = 1;
                case 1:
                    return s.trys.push([1, 3, , 4]), [4, r];
                case 2:
                    return o = s.sent(), [3, 4];
                case 3:
                    return a = s.sent(), console.error("get data from promise failed", a), [3, 4];
                case 4:
                    return [3, 6];
                case 5:
                    o = r === Object(r) ? r : {}, s.label = 6;
                case 6:
                    return e[Gn.ENTER] && i.bindEnterFrog(n.context, o), e[Gn.CLICK] && i.bindElementClickEventFrog(t, n.context, o), e[Gn.DISPLAY] && i.bindElementDisplayEventFrog(t, n.context, o), e[Gn.WEBVIEW] && i.bindWebViewEventFrog(n.context, o), e[Gn.SEEN] && !e[Gn.SEEN_ALWAYS] && i.bindElementSeenEventFrog(t, n.context, o), e[Gn.SEEN] && e[Gn.SEEN_ALWAYS] && i.bindElementEverySeenEventFrog(t, n.context, o), [2]
            }
        }))
    }))
};

function Yn(t) {
    return function (e, r, n) {
        void 0 === r && (r = {});
        var i = r.keyname || "";
        return delete r.keyname, t.addClickFrog.call(t, e, Hn(Hn({}, r), {keypath: zn(i)}), n)
    }
}

function Kn(t) {
    return function (e, r, n) {
        void 0 === r && (r = {});
        var i = r.keyname || "";
        return delete r.keyname, t.addEventFrog.call(t, e, Hn(Hn({}, r), {keypath: zn(i)}), n)
    }
}

var Jn = function (t, e) {
    var r = new Rn(e.config, e.isNativeBridgeEnable, e.isNativeFlushFrog);
    if (t.directive("frog", {
        inserted: function (t, e, n) {
            var i = e.modifiers, o = e.value;
            Wn(t, i, o, n, r)
        }, mounted: function (t, e, n) {
            var i = e.modifiers, o = e.value;
            Wn(t, i, o, n, r)
        }
    }), t.version.startsWith("2") ? (t.prototype.$addClickFrog = r.addClickFrog.bind(r), t.prototype.$addEventFrog = r.addEventFrog.bind(r), t.prototype.$addFrog = r.addFrog.bind(r), t.prototype.$addKeypathClickFrog = Yn(r), t.prototype.$addKeypathEventFrog = Kn(r)) : (t.config.globalProperties.$addClickFrog = r.addClickFrog.bind(r), t.config.globalProperties.$addEventFrog = r.addEventFrog.bind(r), t.config.globalProperties.$addFrog = r.addFrog.bind(r), t.config.globalProperties.$addKeypathClickFrog = Yn(r), t.config.globalProperties.$addKeypathEventFrog = Kn(r)), e.useNewFrog) {
        var n = new jn(e.config, e.isNativeBridgeEnable, e.isNativeFlushFrog);
        t.directive("new-frog", {
            inserted: function (t, e, r) {
                var i = e.modifiers, o = e.value;
                return qn(this, void 0, void 0, (function () {
                    var e, a;
                    return Qn(this, (function (s) {
                        switch (s.label) {
                            case 0:
                                if (!i || !Object.keys(i).length) return [2];
                                if (e = {}, !(o instanceof Promise)) return [3, 5];
                                s.label = 1;
                            case 1:
                                return s.trys.push([1, 3, , 4]), [4, o];
                            case 2:
                                return e = s.sent(), [3, 4];
                            case 3:
                                return a = s.sent(), console.error("get data from promise failed", a), [3, 4];
                            case 4:
                                return [3, 6];
                            case 5:
                                e = o === Object(o) ? o : {}, s.label = 6;
                            case 6:
                                return i[Gn.ENTER] && n.bindEnterFrog(t, r.context, e), i[Gn.CLICK] && n.bindElementClickEventFrog(t, r.context, e), i[Gn.DISPLAY] && n.bindElementDisplayEventFrog(t, r.context, e), i[Gn.WEBVIEW] && n.bindWebViewEventFrog(r.context, e), i[Gn.SEEN] && !i[Gn.SEEN_ALWAYS] && n.bindElementSeenEventFrog(t, r.context, e), i[Gn.SEEN] && i[Gn.SEEN_ALWAYS] && n.bindElementEverySeenEventFrog(t, r.context, e), [2]
                        }
                    }))
                }))
            }
        }), t.prototype.$addClickNewFrog = n.addClickFrog.bind(n), t.prototype.$addEventNewFrog = n.addEventFrog.bind(n), t.prototype.$addNewFrog = n.addFrog.bind(n)
    }
}, Xn = {install: Jn}, Zn = function () {
    var t, e, r = this, n = r._self._c, i = r._self._setupProxy;
    return n("div", {
        staticClass: "exercise-container",
        attrs: {pad: "", device: i.isLandScape ? "pad" : ""}
    }, [n("img", {
        staticClass: "bg-texture",
        attrs: {src: __webpack_require__(13084), alt: ""}
    }), n(i.NavBar, {
        attrs: {title: i.title, "show-gems": !1, gems: 0},
        on: {onBack: i.goBack}
    }), n(i.Header, {attrs: {"target-time": i.targetText}}), n("div", {staticClass: "body-container"}, [n("div", {
        staticClass: "question-wrap",
        staticStyle: {position: "relative", flex: "2"}
    }, [i.formatQuestionList.length > 0 ? n(i.Question, {
        attrs: {
            jumpToNext: i.jumpToNext,
            answerPaperResult: i.curTrueAnswer
        },
        on: {dataReady: i.onLoadFinish, canSlideToNextQuestion: i.slideToNextQuestion, finishExercise: i.finishExercise}
    }) : r._e()], 1), n(i.WriteArea, {
        staticStyle: {flex: "3.8"},
        attrs: {showTime: i.showTime, timerText: i.timerText}
    })], 1), n(i.WritingCanvas), n(i.DraftBoard, {attrs: {"show-icon": !0}}), i.isShowReadyGo ? n(i.PKReadyGo, {
        attrs: {
            start: i.startReadyGo,
            time: "".concat(i.targetText, "内"),
            count: null === (t = i.questionVO) || void 0 === t || null === (t = t.examVO) || void 0 === t ? void 0 : t.questionCnt,
            "finish-gems": null === (e = i.questionVO) || void 0 === e || null === (e = e.examVO) || void 0 === e ? void 0 : e.questionCnt,
            "win-gems": 30
        }, on: {readyGoEnd: i.startExercise}
    }) : r._e(), n(i.ExitModal, {
        attrs: {exitModalShow: i.exitModalShow},
        on: {"update:exitModalShow": i.continueExercise, confirmExit: i.confirmExit}
    }), i.showMatching ? n(i.Matching, {
        ref: "matchingRef",
        on: {startExercise: i.afterMatching}
    }) : r._e(), n(i.UniversityStudentVerify, {
        directives: [{
            name: "show",
            rawName: "v-show",
            value: i.showUniversityStudentVerify,
            expression: "showUniversityStudentVerify"
        }], ref: "universityRef"
    }), i.showMatching || i.isShowReadyGo || i.showUniversityStudentVerify ? n("img", {
        staticClass: "logo",
        attrs: {src: __webpack_require__(33153), alt: ""}
    }) : r._e(), n("audio", {
        ref: "skipQuestion",
        attrs: {src: __webpack_require__(38180)}
    }), n("audio", {ref: "bgmAudio", attrs: {src: i.bmgUrl, loop: ""}}), n("audio", {
        ref: "clickAudio",
        attrs: {src: __webpack_require__(92728)}
    }), n("audio", {ref: "faultAudio", attrs: {src: __webpack_require__(53128)}}), n("audio", {
        ref: "correctAudio",
        attrs: {src: __webpack_require__(34223)}
    })], 1)
}, $n = [];
__webpack_require__(2008), __webpack_require__(67945), __webpack_require__(83851), __webpack_require__(81278), __webpack_require__(79432), __webpack_require__(45700), __webpack_require__(89572), __webpack_require__(2892);

function ti(e, r) {
    if ("object" != t(e) || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
        var i = n.call(e, r || "default");
        if ("object" != t(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === r ? String : Number)(e)
}

function ei(e) {
    var r = ti(e, "string");
    return "symbol" == t(r) ? r : r + ""
}

function ri(t, e, r) {
    return e = ei(e), e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}

function ni(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e && (n = n.filter((function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), r.push.apply(r, n)
    }
    return r
}

function ii(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2 ? ni(Object(r), !0).forEach((function (e) {
            ri(t, e, r[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ni(Object(r)).forEach((function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
        }))
    }
    return t
}

__webpack_require__(28706), __webpack_require__(62062), __webpack_require__(59089), __webpack_require__(60739), __webpack_require__(23288), __webpack_require__(33110), __webpack_require__(38781), __webpack_require__(76031);
var oi = function () {
        var t = this, e = t._self._c, r = t._self._setupProxy;
        return e("div", {
            staticClass: "question-body",
            attrs: {pad: "", device: r.isLandScape ? "pad" : ""}
        }, [e("div", {staticClass: "question-board-bg"}), e("img", {
            staticClass: "question-pad-decor",
            staticStyle: {left: "0"},
            attrs: {src: __webpack_require__(92141), alt: ""}
        }), e("img", {
            staticClass: "question-pad-decor",
            staticStyle: {right: "0"},
            attrs: {src: __webpack_require__(25870), alt: ""}
        }), e("div", {
            staticClass: "question-wrap",
            attrs: {id: "primary-question-wrap"}
        }, t._l(r.formatQuestionList, (function (n, i) {
            return e("transition", {
                key: i,
                attrs: {name: "primary-question"},
                on: {"before-enter": r.questionBeforeEnter, enter: r.questionEnter}
            }, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: i === r.questionIndex,
                    expression: "index===questionIndex"
                }], class: ["primary-question", "primary-question-".concat(i)]
            }, t._l(n.content, (function (o, a) {
                var s, u, c, l, h, f, p, d;
                return e("div", {key: a}, ["\\square" === o ? e("div", {
                    ref: "answerBlock",
                    refInFor: !0,
                    staticClass: "answer-block"
                }, [r.showAnswerContent && i === r.questionIndex ? e("div", {
                    staticClass: "answer-content",
                    attrs: {id: "answer-".concat(i)}
                }, [n.curTrueAnswer ? [e("span", {
                    ref: "answer",
                    refInFor: !0,
                    domProps: {innerHTML: t._s(r.formatFracContent((null === (s = n.curTrueAnswer) || void 0 === s ? void 0 : s.recognizeResult) || "?"))}
                })] : e("span", [t._v("?")]), n.curTrueAnswer && i === r.questionIndex ? e("div", {staticClass: "result-mark"}, [(null === (u = n.curTrueAnswer) || void 0 === u ? void 0 : u.answer) === r.ANSWER_RESULT.CORRECT ? e(r.CorrectMark) : t._e(), (null === (c = n.curTrueAnswer) || void 0 === c ? void 0 : c.answer) === r.ANSWER_RESULT.FAULT ? e(r.FaultMark) : t._e()], 1) : t._e(), n.curTrueAnswer && (null === (l = n.curTrueAnswer) || void 0 === l ? void 0 : l.showReductionFraction) === r.REDUCTION.YES ? e("div", {staticClass: "reduction-tip"}, [e(r.Reduction)], 1) : t._e()], 2) : t._e()]) : "\\circle" === o ? e("div", {
                    ref: "answerBlock",
                    refInFor: !0,
                    staticClass: "answer-block circle"
                }, [r.showAnswerContent && i === r.questionIndex ? e("div", {staticClass: "answer-content"}, [n.curTrueAnswer ? [e("span", {
                    ref: "answer",
                    refInFor: !0,
                    domProps: {innerHTML: t._s(r.formatFracContent((null === (h = n.curTrueAnswer) || void 0 === h ? void 0 : h.recognizeResult) || ""))}
                })] : e("span", [t._v("?")]), n.curTrueAnswer && i === r.questionIndex ? e("div", {staticClass: "result-mark"}, [(null === (f = n.curTrueAnswer) || void 0 === f ? void 0 : f.answer) === r.ANSWER_RESULT.CORRECT ? e(r.CorrectMark) : t._e(), (null === (p = n.curTrueAnswer) || void 0 === p ? void 0 : p.answer) === r.ANSWER_RESULT.FAULT ? e(r.FaultMark) : t._e()], 1) : t._e(), n.curTrueAnswer && (null === (d = n.curTrueAnswer) || void 0 === d ? void 0 : d.showReductionFraction) === r.REDUCTION.YES ? e("div", {staticClass: "reduction-tip"}, [e(r.Reduction)], 1) : t._e()], 2) : t._e()]) : e("div", {
                    staticClass: "common-content",
                    domProps: {innerHTML: t._s(o)}
                })])
            })), 0)])
        })), 1), e("div", {
            staticClass: "second-question-wrap",
            attrs: {id: "second-question-wrap"}
        }, t._l(r.nextQuestionQueue, (function (n, i) {
            return e("transition", {key: i, attrs: {name: "primary-question"}}, [e("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: i === r.questionIndex,
                    expression: "index===questionIndex"
                }], class: ["primary-question", "second-question", "second-question-".concat(i)]
            }, t._l(n.content, (function (r, n) {
                return e("div", {key: n}, ["\\square" === r ? e("div", {
                    ref: "answerBlock",
                    refInFor: !0,
                    staticClass: "answer-block"
                }, [e("div", {staticClass: "answer-content"}, [t._v(" ? ")])]) : "\\circle" === r ? e("div", {
                    ref: "answerBlock",
                    refInFor: !0,
                    staticClass: "answer-block circle"
                }, [e("div", {staticClass: "answer-content"}, [t._v(" ? ")])]) : e("div", {
                    staticClass: "common-content",
                    domProps: {innerHTML: t._s(r)}
                })])
            })), 0)])
        })), 1)])
    }, ai = [],
    si = (__webpack_require__(50113), __webpack_require__(72712), __webpack_require__(54554), __webpack_require__(58940), function () {
        var t = this, e = t._self._c;
        t._self._setupProxy;
        return e("div", [e("div", {ref: "animation", staticClass: "correct-mark"})])
    }), ui = [], ci = __webpack_require__(49891), li = __webpack_require__.n(ci),
    hi = JSON.parse('{"v":"5.1.20","fr":30,"ip":0,"op":20,"w":147,"h":146,"nm":"√","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[73.5,102,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[10.569,10.569,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-133,4],[-182,184]],"o":[[0,0],[148.5,-15.5],[0,0]],"v":[[-471.5,76.5],[-212,276],[472,-280.5]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.376470595598,0.800000011921,0.505882382393,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":87,"ix":5},"lc":2,"lj":1,"ml":4,"d":[{"n":"d","nm":"虚线","v":{"a":0,"k":1304,"ix":1}},{"n":"o","nm":"偏移","v":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":5,"s":[1326],"e":[0]},{"t":15}],"ix":7}}],"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"变换"}],"nm":"Shape 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":56,"st":0,"bm":0}],"markers":[]}'),
    fi = (0, i.defineComponent)({
        __name: "CorrectMark", setup: function (t) {
            var e = (0, i.ref)(), r = function () {
                var t = e.value, r = {animationData: hi, container: t, renderer: "svg", loop: !1, autoplay: !1},
                    n = li().loadAnimation(r);
                n.setSpeed(2), n.play()
            };
            return (0, i.onMounted)((function () {
                r()
            })), {__sfc: !0, animation: e, initAnimation: r}
        }
    }), pi = fi;

function di(t, e, r, n, i, o, a, s) {
    var u, c = "function" === typeof t ? t.options : t;
    if (e && (c.render = e, c.staticRenderFns = r, c._compiled = !0), n && (c.functional = !0), o && (c._scopeId = "data-v-" + o), a ? (u = function (t) {
        t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" === typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a)
    }, c._ssrRegister = u) : i && (u = s ? function () {
        i.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot)
    } : i), u) if (c.functional) {
        c._injectStyles = u;
        var l = c.render;
        c.render = function (t, e) {
            return u.call(e), l(t, e)
        }
    } else {
        var h = c.beforeCreate;
        c.beforeCreate = h ? [].concat(h, u) : [u]
    }
    return {exports: t, options: c}
}

var mi, gi, vi = di(pi, si, ui, !1, null, "77b22b0e", null), yi = vi.exports, Ai = function () {
        var t = this, e = t._self._c;
        t._self._setupProxy;
        return e("div", [e("div", {ref: "animation", staticClass: "fault-mark"})])
    }, bi = [],
    Ei = JSON.parse('{"v":"5.1.20","fr":30,"ip":0,"op":20,"w":146,"h":146,"nm":"○","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[73,73,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[14.429,14.429,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[-55.5,-178],[-167,0.5],[-86.375,66.745],[-29.323,49.764],[95,75],[55,-25]],"o":[[-84,45],[58.429,187.393],[130.5,-1.5],[66,-51],[120.5,-204.5],[-172.266,-135.999],[-55,25]],"v":[[-346,-117],[-431,184],[-42.5,452.5],[263,346],[412.5,170.5],[246,-361],[-199.75,-423.75]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.396078437567,0.223529413342,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":64,"ix":5},"lc":2,"lj":1,"ml":4,"d":[{"n":"d","nm":"虚线","v":{"a":0,"k":2498,"ix":1}},{"n":"o","nm":"偏移","v":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":5,"s":[2499],"e":[0]},{"t":15}],"ix":7}}],"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"变换"}],"nm":"Shape 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":56,"st":0,"bm":0}],"markers":[]}'),
    wi = (0, i.defineComponent)({
        __name: "FaultMark", setup: function (t) {
            var e = (0, i.ref)(), r = function () {
                var t = e.value, r = {animationData: Ei, container: t, renderer: "svg", loop: !1, autoplay: !1},
                    n = li().loadAnimation(r);
                n.setSpeed(2), n.play()
            };
            return (0, i.onMounted)((function () {
                r()
            })), {__sfc: !0, animation: e, initAnimation: r}
        }
    }), _i = wi, xi = di(_i, Ai, bi, !1, null, "1143f431", null), Si = xi.exports, Ci = function () {
        var t = this, e = t._self._c;
        t._self._setupProxy;
        return e("div", {ref: "animation", staticClass: "reduction-wrap"})
    }, Vi = [],
    Ii = JSON.parse('{"v":"5.6.10","fr":25,"ip":0,"op":41,"w":164,"h":100,"nm":"bubble","ddd":0,"assets":[{"id":"image_0","w":150,"h":84,"u":"images/","p":"reduction.png","e":0}],"layers":[{"ddd":0,"ind":1,"ty":2,"nm":"bubble","refId":"image_0","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[100]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":38,"s":[100]},{"t":41,"s":[0]}],"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":3,"s":[5]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":6,"s":[-5]},{"t":9,"s":[0]}],"ix":10},"p":{"a":0,"k":[82,100,0],"ix":2},"a":{"a":0,"k":[75.125,90.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"ip":0,"op":41,"st":0,"bm":0}],"markers":[]}'),
    Pi = (0, i.defineComponent)({
        __name: "Reduction", setup: function (t) {
            var e = (0, i.ref)(), r = function () {
                var t = e.value, r = {animationData: Ii, container: t, renderer: "svg", loop: !1, autoplay: !0},
                    n = li().loadAnimation(r);
                n.goToAndStop(0), setTimeout((function () {
                    n.play()
                }), 200)
            };
            return (0, i.onMounted)((function () {
                r()
            })), {__sfc: !0, animation: e, initAnimation: r}
        }
    }), Ti = Pi, ki = di(Ti, Ci, Vi, !1, null, "2c439a42", null), Ri = ki.exports;
(function (t) {
    t[t["FAULT"] = 0] = "FAULT", t[t["CORRECT"] = 1] = "CORRECT"
})(mi || (mi = {})), function (t) {
    t[t["YES"] = 1] = "YES", t[t["NO"] = 0] = "NO"
}(gi || (gi = {}));
__webpack_require__(27495), __webpack_require__(5746);

function Oi(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function Di(t, e) {
    for (var r = 0; r < e.length; r++) {
        var n = e[r];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, ei(n.key), n)
    }
}

function Mi(t, e, r) {
    return e && Di(t.prototype, e), r && Di(t, r), Object.defineProperty(t, "prototype", {writable: !1}), t
}

__webpack_require__(15472), __webpack_require__(25276), __webpack_require__(25440), __webpack_require__(48598), __webpack_require__(62483), __webpack_require__(57465), __webpack_require__(87745), __webpack_require__(90906), __webpack_require__(71761), __webpack_require__(50375);
var Bi = function (t) {
        return new RegExp(t.toLowerCase()).test(navigator.userAgent.toLowerCase())
    }, Fi = function () {
        return navigator.userAgent
    }, Li = function () {
        return Bi("iP(hone|od|ad)")
    }, Ni = function () {
        return Bi("Android")
    }, Ui = function () {
        return Bi("YuanTiKuEmbed")
    }, ji = function () {
        return Bi("YuanSouTiKouSuan")
    }, Gi = function () {
        return Bi("YuanTiKu") && !Ui()
    }, Hi = function () {
        return Bi("YuanFuDao") || Ui()
    }, qi = function () {
        return Bi("YuanSouTi") && !ji()
    }, Qi = function () {
        return Gi() || Hi() || ji() || qi()
    }, zi = function () {
        return Gi() ? 101 : qi() ? 201 : ji() ? 601 : Hi() ? 301 : 0
    }, Wi = function () {
        var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan)\/(\d+\.\d+\.\d+)(\s+|$)/i,
            e = navigator.userAgent.match(t);
        return e ? e[2] : ""
    }, Yi = function () {
        return navigator.onLine
    }, Ki = function () {
        var t = window.location.search.substr(1), e = {};
        return t.split("&").forEach((function (t) {
            var r = t.split("=");
            e[r[0]] = decodeURIComponent(r[1])
        })), e
    }, Ji = function (t, e) {
        if (t === e) return 0;
        for (var r = t.split("."), n = e.split("."), i = Math.min(r.length, n.length), o = 0; o < i; o++) {
            if (parseInt(r[o]) > parseInt(n[o])) return 1;
            if (parseInt(r[o]) < parseInt(n[o])) return -1
        }
        return r.length > n.length ? 1 : r.length < n.length ? -1 : 0
    }, Xi = function (t) {
        return Ji(Wi(), t) >= 0
    }, Zi = function () {
        var t = Fi().toLocaleLowerCase().match(/android (.*?);/);
        return t && t[1] ? t[1].replace(/_/g, ".") : ""
    }, $i = function () {
        return Zi().split(".")[0]
    }, to = axios, eo = __webpack_require__.n(to), ro = {
        APE_HOST: "https://ytk.yuanfudao.com",
        APE_IN_RECORD_HOST: "https://ytk.yuanfudao.com",
        SOLAR_HOST: "https://xyst.yuanfudao.com",
        SOLAR_IN_RECORD_HOST: "https://xyst.yuanfudao.com",
        LEO_HOST: "https://xyks.yuanfudao.com",
        LEO_IN_RECORD_HOST: "https://xyks.yuanfudao.com",
        SOLAR_OPEN_HOST: "https://xyst-open.yuanfudao.com",
        LEO_OPEN_HOST: "https://xyks-open.yuanfudao.com",
        APE_GALLERY: "https://solar-gallery.fbcontent.cn/api/ape/images/",
        TUTOR_GALLERY: "https://solar-gallery.fbcontent.cn/api/tutor/images/",
        SOLAR_GALLERY: "https://solar-gallery.fbcontent.cn/api/solar/images/",
        SOLAR_GALLERY_HOST: "https://gallery.yuanfudao.com/api/solar/images/",
        SOLAR_OSS: "https://solar-online.fbcontent.cn/",
        QUESTION_IMAGE_PREFIX: "https://solar.fbcontent.cn/api/apolo-images/",
        QUESTION_SHARE_IMAGE_PREFIX: "https://xyst-open.yuanfudao.com/open-api/wx/image/",
        wenanPrefix: "https://ytk.yuanfudao.com/wenan/api/groups/",
        solarWenanPrefix: "https://xyst.yuanfudao.com/wenan/",
        defaultAvatar: "https://solar-gallery.fbcontent.cn/api/ape/images/16c5fe669534020.png",
        defaultAppletQRCode: "https://gallery.fbcontent.cn/api/ape/images/16caa4b3b193d47.jpg",
        CHECKMATH_HOST: "https://api.checkmath.net",
        APE_HOST_NEW: "https://ape-api.yuanfudao.com",
        wechat: {
            srvAppId: "wxa3be453f8a804cf4",
            appId: "wxa3be453f8a804cf4",
            jsApiList: ["onMenuShareWeibo", "updateTimelineShareData", "updateAppMessageShareData"],
            openTagList: ["wx-open-launch-app"],
            applet: "LEO_SRV"
        },
        leoAppId: "wx8e012ea748385c1c"
    }, no = {
        APE_HOST: "https://ape-api.yuanfudao.biz",
        APE_IN_RECORD_HOST: "https://ytk-test.yuanfudao.com",
        SOLAR_HOST: "https://xyst.yuanfudao.biz",
        SOLAR_IN_RECORD_HOST: "https://xyst-test.yuanfudao.com",
        LEO_HOST: "xyks-test.yuanfudao.com" === location.host ? "https://xyks.yuanfudao.com" : "https://xyks.yuanfudao.biz",
        LEO_IN_RECORD_HOST: "https://xyks-test.yuanfudao.com",
        SOLAR_OPEN_HOST: "https://xyst-open.yuanfudao.biz",
        LEO_OPEN_HOST: "https://xyks.yuanfudao.biz",
        APE_GALLERY: "https://ytkgallery.yuantiku.biz/api/ape/images/",
        TUTOR_GALLERY: "https://ytkgallery.yuanfudao.biz/api/tutor/images/",
        SOLAR_GALLERY: "https://ytkgallery.yuanfudao.biz/api/solar/images/",
        SOLAR_GALLERY_HOST: "https://ytkgallery.yuanfudao.biz/api/solar/images/",
        SOLAR_OSS: "https://solar-test.fbcontent.cn/",
        QUESTION_IMAGE_PREFIX: "/api/apolo-images/",
        QUESTION_SHARE_IMAGE_PREFIX: "https://xyst-test.yuanfudao.com/open-api/wx/image/",
        wenanPrefix: "https://ytk1.yuanfudao.biz/wenan/api/groups/",
        solarWenanPrefix: "https://xyst.yuanfudao.biz/wenan/",
        defaultAvatar: "https://ytkgallery.yuanfudao.biz/api/ape/images/16c5fe60f86ea1c.png",
        defaultAppletQRCode: "https://ytkgallery.yuantiku.biz/api/ape/images/16caa4a3cfff040.jpg",
        CHECKMATH_HOST: "https://api-test.checkmath.net",
        APE_HOST_NEW: "xyks-test.yuanfudao.com" === location.host ? "https://ape-api.yuanfudao.com" : "https://ape-api.yuanfudao.biz",
        wechat: {
            srvAppId: "wx2943c948d78b6918",
            appId: "wx2943c948d78b6918",
            jsApiList: ["onMenuShareWeibo", "updateTimelineShareData", "updateAppMessageShareData"],
            openTagList: ["wx-open-launch-app"],
            applet: "LEO_SRV_TEST"
        },
        leoAppId: "wx8e012ea748385c1c"
    }, io = 16089247, oo = ii({
        debugUser: {
            _debug_user_: io,
            __debug_ytk_user__: io,
            __debug_user__: 41322844,
            _debug_ytk_user_: io,
            _debug_ks_device_: 125
        }
    }, no), ao = oo, so = "online", uo = function () {
        switch (so) {
            case"online":
                return ro;
            case"test":
                return no;
            default:
                return ao
        }
    }(), co = {isDev: "dev" === so, productId: 631, appId: zi()}, lo = ii(ii(ii({}, co), uo), {}, {CONFIG_ENV: so}),
    ho = lo, fo = _;
var po = function () {
    return po = Object.assign || function (t) {
        for (var e, r = 1, n = arguments.length; r < n; r++) for (var i in e = arguments[r], e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t
    }, po.apply(this, arguments)
};

function mo(t, e, r, n) {
    function i(t) {
        return t instanceof r ? t : new r((function (e) {
            e(t)
        }))
    }

    return new (r || (r = Promise))((function (r, o) {
        function a(t) {
            try {
                u(n.next(t))
            } catch (e) {
                o(e)
            }
        }

        function s(t) {
            try {
                u(n["throw"](t))
            } catch (e) {
                o(e)
            }
        }

        function u(t) {
            t.done ? r(t.value) : i(t.value).then(a, s)
        }

        u((n = n.apply(t, e || [])).next())
    }))
}

function go(t, e) {
    var r, n, i, o, a = {
        label: 0, sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1]
        }, trys: [], ops: []
    };
    return o = {
        next: s(0),
        throw: s(1),
        return: s(2)
    }, "function" === typeof Symbol && (o[Symbol.iterator] = function () {
        return this
    }), o;

    function s(t) {
        return function (e) {
            return u([t, e])
        }
    }

    function u(s) {
        if (r) throw new TypeError("Generator is already executing.");
        while (o && (o = 0, s[0] && (a = 0)), a) try {
            if (r = 1, n && (i = 2 & s[0] ? n["return"] : s[0] ? n["throw"] || ((i = n["return"]) && i.call(n), 0) : n.next) && !(i = i.call(n, s[1])).done) return i;
            switch (n = 0, i && (s = [2 & s[0], i.value]), s[0]) {
                case 0:
                case 1:
                    i = s;
                    break;
                case 4:
                    return a.label++, {value: s[1], done: !1};
                case 5:
                    a.label++, n = s[1], s = [0];
                    continue;
                case 7:
                    s = a.ops.pop(), a.trys.pop();
                    continue;
                default:
                    if (i = a.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === s[0] || 2 === s[0])) {
                        a = 0;
                        continue
                    }
                    if (3 === s[0] && (!i || s[1] > i[0] && s[1] < i[3])) {
                        a.label = s[1];
                        break
                    }
                    if (6 === s[0] && a.label < i[1]) {
                        a.label = i[1], i = s;
                        break
                    }
                    if (i && a.label < i[2]) {
                        a.label = i[2], a.ops.push(s);
                        break
                    }
                    i[2] && a.ops.pop(), a.trys.pop();
                    continue
            }
            s = e.call(t, a)
        } catch (u) {
            s = [6, u], n = 0
        } finally {
            r = i = 0
        }
        if (5 & s[0]) throw s[1];
        return {value: s[0] ? s[1] : void 0, done: !0}
    }
}

Object.create;
Object.create;
"function" === typeof SuppressedError && SuppressedError;
var vo = function (t) {
    return new RegExp(t.toLowerCase()).test(navigator.userAgent.toLowerCase())
}, yo = function () {
    return vo("YuanSouTiKouSuan")
}, Ao = function () {
    var t = /\s+(YuanTiKu|YuanFuDao|YuanSouTi|YuanSouTiKouSuan)\/(\d+\.\d+\.\d+)(\s+|$)/i,
        e = navigator.userAgent.match(t);
    return e ? e[2] : ""
}, bo = function () {
    if (!window.location.search) return {};
    var t = window.location.search.substr(1), e = {};
    return t.split("&").forEach((function (t) {
        var r = t.split("=");
        e[r[0]] = decodeURIComponent(r[1])
    })), e
}, Eo = function (t, e) {
    if (t === e) return 0;
    for (var r = t.split("."), n = e.split("."), i = Math.min(r.length, n.length), o = 0; o < i; o++) {
        if (parseInt(r[o]) > parseInt(n[o])) return 1;
        if (parseInt(r[o]) < parseInt(n[o])) return -1
    }
    return r.length > n.length ? 1 : r.length < n.length ? -1 : 0
}, wo = function (t) {
    return Eo(Ao(), t) >= 0
}, _o = function () {
    function t() {
    }

    return t.networkManageFor4xx = function (e, r) {
        return mo(this, void 0, void 0, (function () {
            var n;
            return go(this, (function (i) {
                switch (i.label) {
                    case 0:
                        return wo("3.43.0") && r.response && r.config && !r.config.__isRetryRequest ? 401 !== r.response.status ? [3, 2] : [4, t.networkManageFor401(r, e)] : [2, null];
                    case 1:
                        return n = i.sent(), [2, n];
                    case 2:
                        return 417 !== r.response.status ? [3, 4] : [4, t.networkManageFor417(r, e)];
                    case 3:
                        return n = i.sent(), [2, n];
                    case 4:
                        return [2, null]
                }
            }))
        }))
    }, t.networkManageFor401 = function (e, r) {
        return mo(this, void 0, void 0, (function () {
            var r, n;
            return go(this, (function (i) {
                switch (i.label) {
                    case 0:
                        if (r = e.response.request.responseURL, r && (t.hostNeedIgnore401(r || "") || t.urlNeedIgnore401(r || "") || e.config.ignore401)) return [2, null];
                        i.label = 1;
                    case 1:
                        return i.trys.push([1, 3, , 4]), [4, t.networkFailedManageByJsb(401)];
                    case 2:
                        return i.sent(), [3, 4];
                    case 3:
                        return n = i.sent(), console.warn(n), [3, 4];
                    case 4:
                        return [2, null]
                }
            }))
        }))
    }, t.networkManageFor417 = function (e, r) {
        return mo(this, void 0, void 0, (function () {
            var n, i;
            return go(this, (function (o) {
                switch (o.label) {
                    case 0:
                        if (!e || !e.response) return [3, 4];
                        n = new Date(e.response.headers.date).getTime().toString(), o.label = 1;
                    case 1:
                        return o.trys.push([1, 3, , 4]), [4, t.networkFailedManageByJsb(417, n)];
                    case 2:
                        return o.sent(), [2, t.networkRequestAgain(r, e)];
                    case 3:
                        return i = o.sent(), console.warn(i), [2, null];
                    case 4:
                        return [2, null]
                }
            }))
        }))
    }, t.networkRequestAgain = function (t, e) {
        return e.config.__isRetryRequest = !0, t(e.config)
    }, t.networkFailedManageByJsb = function (t, e) {
        return new Promise((function (r, n) {
            var i = setTimeout((function () {
                n(new Error("leo_networkFailedManage time out"))
            }), 3e3);
            cn("networkFailedManage", {
                errorCode: t, message: e, trigger: function (t) {
                    console.log("in networkFailedManage trigger, the code is:", t), clearTimeout(i), t ? n(new Error("leo_networkFailedManage error code is " + t)) : r()
                }
            }, "leo")
        }))
    }, t.hostNeedIgnore401 = function (t) {
        var e = ["https://xyks.yuanfudao.", "https://xyst.yuanfudao.", "https://oapi.yuanfudao.", "https://ape-api.yuanfudao.", "https://bolt.yuanfudao."],
            r = e.filter((function (e) {
                return t.indexOf(e) >= 0
            }));
        return 0 === r.length
    }, t.urlNeedIgnore401 = function (t) {
        var e = [new RegExp(".*/leo-auth/(.+)/user-devices.*"), new RegExp(".*/leo-profile/(.+)/user-infos/replace-phone.*")],
            r = e.filter((function (e) {
                return null !== t.match(e)
            }));
        return r.length > 0
    }, t
}(), xo = 1, So = 1e3 * xo, Co = 60 * So, Vo = 60 * Co, Io = 24 * Vo, Po = function (t) {
    return t.valueOf() < 10 ? "0" + t : String(t)
}, To = function (t) {
    var e = Math.floor(t / Io);
    e = Po(e), t %= Io;
    var r = Math.floor(t / Vo);
    r = Po(r), t %= Vo;
    var n = Math.floor(t / Co);
    n = Po(n), t %= Co;
    var i = Math.floor(t / So);
    i = Po(i), t %= So;
    var o = Math.floor(t / (So / 10));
    return {day: e, hour: r, minute: n, second: i, last: o}
}, ko = __webpack_require__(8127), Ro = (0, fo.throttle)((function (t) {
    window.VUE_APP && window.VUE_APP.$showToast && window.VUE_APP.$showToast(t)
}), 1e3, {trailing: !1}), Oo = function (t) {
    return new Promise((function (e) {
        if (yo() && Xi("3.42.0") && (-1 !== t.indexOf("{device}") || -1 !== t.indexOf("{client}"))) cn("requestConfig", {
            path: t,
            trigger: function (r, n) {
                e(r && 0 !== r ? t : n.wrappedUrl)
            }
        }, "LeoSecure"); else if (-1 !== t.indexOf("{device}") || -1 !== t.indexOf("{client}")) {
            var r = t.replace("{device}", "api").replace("{client}", "api");
            e(r)
        } else e(t)
    }))
}, Do = function (t) {
    t.interceptors.request.use(function () {
        var t = n(e().mark((function t(r) {
            var n, i;
            return e().wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                    case 0:
                        return Yi() || Ro("天了噜，你的网络罢工了。"), t.next = 3, Oo(r.url || "");
                    case 3:
                        return n = t.sent, -1 === n.indexOf("_productId") && (i = {
                            _productId: ho.productId,
                            _appId: ho.appId,
                            version: Wi()
                        }, r.params = ii(ii({}, r.params), i)), r.url = n, t.abrupt("return", r);
                    case 7:
                    case"end":
                        return t.stop()
                }
            }), t)
        })));
        return function (e) {
            return t.apply(this, arguments)
        }
    }(), (function (t) {
        return Promise.reject(t)
    }))
}, Mo = function (t) {
    t.interceptors.response.use((function (t) {
        return t
    }), function () {
        var r = n(e().mark((function r(n) {
            var i;
            return e().wrap((function (e) {
                while (1) switch (e.prev = e.next) {
                    case 0:
                        return n.response && n.response.status >= 500 && Ro("小猿出故障惹，正在修复，等会儿嗷"), e.next = 3, _o.networkManageFor4xx(t, n);
                    case 3:
                        if (i = e.sent, !i) {
                            e.next = 6;
                            break
                        }
                        return e.abrupt("return", i);
                    case 6:
                        throw n.response && 418 === n.response.status && Ro(n.response.data.message || "服务器升级中，请稍后使用"), n;
                    case 8:
                    case"end":
                        return e.stop()
                }
            }), r)
        })));
        return function (t) {
            return r.apply(this, arguments)
        }
    }())
}, Bo = function () {
    return ho.LEO_HOST
}, Fo = eo().create({withCredentials: !0, baseURL: "".concat(Bo(), "/")});
Do(Fo), Mo(Fo);
var Lo = Fo,
    No = (__webpack_require__(11745), __webpack_require__(38309), __webpack_require__(16573), __webpack_require__(78100), __webpack_require__(77936), __webpack_require__(42781), __webpack_require__(21489), __webpack_require__(48140), __webpack_require__(81630), __webpack_require__(72170), __webpack_require__(75044), __webpack_require__(69539), __webpack_require__(31694), __webpack_require__(89955), __webpack_require__(21903), __webpack_require__(91134), __webpack_require__(33206), __webpack_require__(44496), __webpack_require__(66651), __webpack_require__(12887), __webpack_require__(19369), __webpack_require__(66812), __webpack_require__(8995), __webpack_require__(31575), __webpack_require__(36072), __webpack_require__(88747), __webpack_require__(28845), __webpack_require__(29423), __webpack_require__(57301), __webpack_require__(373), __webpack_require__(86614), __webpack_require__(41405), __webpack_require__(37467), __webpack_require__(44732), __webpack_require__(33684), __webpack_require__(79577), __webpack_require__(42207), __webpack_require__(55815), __webpack_require__(64979), __webpack_require__(79739), function (t) {
        var r = JSON.stringify(t);
        return new Promise((function (t, i) {
            cn("dataEncrypt", {
                base64: ko.Base64.encode(r), trigger: function () {
                    var o = n(e().mark((function n(o, a) {
                        var s;
                        return e().wrap((function (e) {
                            while (1) switch (e.prev = e.next) {
                                case 0:
                                    a && a.result ? (s = Uo(a.result).buffer, t(s)) : (i(Error("encrypt data fail")), pn({
                                        url: "/debug/oralPK/dataEncryptFailed",
                                        params: {status: o, dataJson: r},
                                        flushFrog: !1
                                    }));
                                case 1:
                                case"end":
                                    return e.stop()
                            }
                        }), n)
                    })));

                    function a(t, e) {
                        return o.apply(this, arguments)
                    }

                    return a
                }()
            }, "LeoSecure")
        }))
    }), Uo = function (t) {
        for (var e = "=".repeat((4 - t.length % 4) % 4), r = (t + e).replace(/-/g, "+").replace(/_/g, "/"), n = ko.Base64.atob(r), i = new Uint8Array(n.length), o = 0; o < n.length; ++o) i[o] = n.charCodeAt(o);
        return i
    }, jo = function (t, r, i) {
        var o = i.value, a = function () {
            var r = n(e().mark((function r() {
                var i, a, s, u = arguments;
                return e().wrap((function (r) {
                    while (1) switch (r.prev = r.next) {
                        case 0:
                            for (i = u.length, a = new Array(i), s = 0; s < i; s++) a[s] = u[s];
                            return r.abrupt("return", o.apply(t, a).then(function () {
                                var t = n(e().mark((function t(r) {
                                    var n;
                                    return e().wrap((function (t) {
                                        while (1) switch (t.prev = t.next) {
                                            case 0:
                                                return n = btoa(String.fromCharCode.apply(null, new Uint8Array(r))), t.next = 3, Go(n);
                                            case 3:
                                                return t.abrupt("return", t.sent);
                                            case 4:
                                            case"end":
                                                return t.stop()
                                        }
                                    }), t)
                                })));
                                return function (e) {
                                    return t.apply(this, arguments)
                                }
                            }())["catch"]((function (t) {
                                throw t
                            })));
                        case 2:
                        case"end":
                            return r.stop()
                    }
                }), r)
            })));
            return function () {
                return r.apply(this, arguments)
            }
        }();
        return i.value = a, i
    }, Go = function (t) {
        return new Promise((function (e) {
            cn("dataDecrypt", {
                base64: t, trigger: function (t, r) {
                    var n = JSON.parse(ko.Base64.decode(r.result));
                    e(n)
                }
            }, "LeoSecure")
        }))
    }, Ho = function (e, r, n, i) {
        var o, a = arguments.length, s = a < 3 ? r : null === i ? i = Object.getOwnPropertyDescriptor(r, n) : i;
        if ("object" === ("undefined" === typeof Reflect ? "undefined" : t(Reflect)) && "function" === typeof Reflect.decorate) s = Reflect.decorate(e, r, n, i); else for (var u = e.length - 1; u >= 0; u--) (o = e[u]) && (s = (a < 3 ? o(s) : a > 3 ? o(r, n, s) : o(r, n)) || s);
        return a > 3 && s && Object.defineProperty(r, n, s), s
    }, qo = function () {
        function t() {
            Oi(this, t)
        }

        return Mi(t, null, [{
            key: "getPkExerciseQuestion", value: function (t, e) {
                var r = e ? "challengeCode=".concat(e, "&pointId=0") : "pointId=".concat(t);
                return Lo.post("/leo-game-pk/{client}/math/pk/match?".concat(r), null).then((function (t) {
                    return t.data
                }))
            }
        }, {
            key: "getPkExerciseQuestionV2", value: function (t, e) {
                var r = e ? "challengeCode=".concat(e, "&pointId=0") : "pointId=".concat(t);
                return Lo.post("/leo-game-pk/{client}/math/pk/match/v2?".concat(r), null, {responseType: "arraybuffer"}).then((function (t) {
                    return t.data
                }))
            }
        }, {
            key: "postPkExerciseResult", value: function (t) {
                return No(t).then((function (t) {
                    return Lo.put("/leo-game-pk/{client}/math/pk/submit", t, {headers: {"content-type": "application/octet-stream"}}).then((function (t) {
                        return t.data
                    }))
                }))
            }
        }, {
            key: "getPkExerciseResult", value: function (t) {
                return Lo.get("/leo-game-pk/{client}/math/pk/history/detail?pkIdStr=".concat(t)).then((function (t) {
                    return t.data
                }))
            }
        }])
    }();
Ho([jo], qo, "getPkExerciseQuestionV2", null);
__webpack_require__(13609);
var Qo = function (t) {
    return t.map((function (t) {
        var e = [], r = "\\square", n = 0,
            i = t.content.replace(/\+/g, "&nbsp;+&nbsp;").replace(/-/g, "&nbsp;-&nbsp;").replace(/=/g, "&nbsp;=&nbsp;").replace(/\\div/g, "&nbsp;&divide;&nbsp;").replace(/\\times/g, "&nbsp;&times;&nbsp;").replace(/\\square/g, "\\square&nbsp;").replace(/\\circle/g, "&nbsp;\\circle&nbsp;").replace("······", '&nbsp;<span class="ellipsis">······</span>&nbsp;').replace(/&nbsp;&nbsp;/g, "&nbsp;"),
            o = zo(i);
        return o.indexOf("\\circle") > -1 && (n = o.indexOf("\\circle"), r = "\\circle", e = o.split("\\circle").filter((function (t) {
            return t
        }))), o.indexOf("\\square") > -1 && (n = o.indexOf("\\square"), r = "\\square", e = o.split("\\square").filter((function (t) {
            return t
        }))), e.length > 1 ? e.splice(1, 0, r) : n ? e.push(r) : e.unshift(r), ii(ii({}, t), {}, {content: e})
    }))
}, zo = function (t) {
    var e = /([0-9]*)\\frac{([0-9]*)}{([0-9]*)}/g;
    return t.replace(/\\times/g, "&times").replace(e, (function (t, e, r, n) {
        return '<div class="frac-wrap"><span class="mixed">'.concat(e, '</span><div class="frac-item"><span class="num">').concat(r, '</span><span class="line"></span><span class="deno">').concat(n, "</span></div></div>")
    }))
};
__webpack_require__(64346);

function Wo(t) {
    if (Array.isArray(t)) return t
}

function Yo(t, e) {
    var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (null != r) {
        var n, i, o, a, s = [], u = !0, c = !1;
        try {
            if (o = (r = r.call(t)).next, 0 === e) {
                if (Object(r) !== r) return;
                u = !1
            } else for (; !(u = (n = o.call(r)).done) && (s.push(n.value), s.length !== e); u = !0) ;
        } catch (t) {
            c = !0, i = t
        } finally {
            try {
                if (!u && null != r["return"] && (a = r["return"](), Object(a) !== a)) return
            } finally {
                if (c) throw i
            }
        }
        return s
    }
}

__webpack_require__(23418);

function Ko(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n
}

function Jo(t, e) {
    if (t) {
        if ("string" === typeof t) return Ko(t, e);
        var r = Object.prototype.toString.call(t).slice(8, -1);
        return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ko(t, e) : void 0
    }
}

function Xo() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function Zo(t, e) {
    return Wo(t) || Yo(t, e) || Jo(t, e) || Xo()
}

var $o = {
        search: function () {
            var t = {}, e = window.location.search.substr(1), r = window.location.hash.split("?"), n = Zo(r, 2), i = n[1],
                o = i ? [i, e] : [e];
            return o.forEach((function (e) {
                e.split("&").forEach((function (e) {
                    var r = e.split("=");
                    t[r[0]] = decodeURIComponent(r[1])
                }))
            })), t
        }, params2query: function (t) {
            var e = [];
            return Object.keys(t).forEach((function (r) {
                r && t[r] && e.push("".concat(r, "=").concat(t[r]))
            })), e.length ? "?".concat(e.join("&")) : ""
        }
    }, ta = (0, i.ref)(0), ea = (0, i.ref)([]), ra = (0, i.ref)([]), na = (0, i.ref)([]), ia = (0, i.ref)(null),
    oa = (0, i.ref)(!1), aa = function () {
        ta.value = 0, ea.value = [], ra.value = [], na.value = [], ia.value = null, oa.value = !1
    }, sa = function () {
        var t = n(e().mark((function t() {
            var r, n, i, o;
            return e().wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                    case 0:
                        return aa(), r = $o.search(), n = r.pointId, i = r.challengeCode, t.next = 5, qo.getPkExerciseQuestionV2(n, i);
                    case 5:
                        o = t.sent, ea.value = o.examVO.questions || [], ra.value = Qo(o.examVO.questions), ia.value = o;
                    case 9:
                    case"end":
                        return t.stop()
                }
            }), t)
        })));
        return function () {
            return t.apply(this, arguments)
        }
    }(), ua = (0, i.computed)((function () {
        var t, e;
        return {
            pkid: (null === (t = ia.value) || void 0 === t ? void 0 : t.pkIdStr) || "",
            pointid: (null === (e = ia.value) || void 0 === e || null === (e = e.examVO) || void 0 === e ? void 0 : e.pointId) || 0
        }
    })), ca = function () {
        return {
            questionVO: ia,
            questionIndex: ta,
            questionList: ea,
            formatQuestionList: ra,
            errorQuestion: na,
            frogParams: ua,
            showUserAvatar: oa,
            getQuestion: sa
        }
    }, la = ca;

function ha(t, e) {
    var r = "undefined" !== typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (!r) {
        if (Array.isArray(t) || (r = Jo(t)) || e && t && "number" === typeof t.length) {
            r && (t = r);
            var n = 0, i = function () {
            };
            return {
                s: i, n: function () {
                    return n >= t.length ? {done: !0} : {done: !1, value: t[n++]}
                }, e: function (t) {
                    throw t
                }, f: i
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var o, a = !0, s = !1;
    return {
        s: function () {
            r = r.call(t)
        }, n: function () {
            var t = r.next();
            return a = t.done, t
        }, e: function (t) {
            s = !0, o = t
        }, f: function () {
            try {
                a || null == r["return"] || r["return"]()
            } finally {
                if (s) throw o
            }
        }
    }
}

__webpack_require__(60825), __webpack_require__(94170);

function fa(t) {
    return fa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    }, fa(t)
}

function pa() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
        })))
    } catch (t) {
    }
    return (pa = function () {
        return !!t
    })()
}

function da(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t
}

function ma(e, r) {
    if (r && ("object" === t(r) || "function" === typeof r)) return r;
    if (void 0 !== r) throw new TypeError("Derived constructors may only return object or undefined");
    return da(e)
}

function ga(t, e, r) {
    return e = fa(e), ma(t, pa() ? Reflect.construct(e, r || [], fa(t).constructor) : e.apply(t, r))
}

function va(t, e) {
    return va = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t
    }, va(t, e)
}

function ya(t, e) {
    if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {writable: !1}), e && va(t, e)
}

__webpack_require__(33771), __webpack_require__(9868);
var Aa = function () {
    function t(e, r, n, i) {
        if (Oi(this, t), isNaN(e) || isNaN(r)) throw new Error("Point is invalid: (".concat(e, ", ").concat(r, ")"));
        this.x = +e, this.y = +r, this.pressure = n || 0, this.time = i || Date.now()
    }

    return Mi(t, [{
        key: "distanceTo", value: function (t) {
            return Math.sqrt(Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2))
        }
    }, {
        key: "equals", value: function (t) {
            return this.x === t.x && this.y === t.y && this.pressure === t.pressure && this.time === t.time
        }
    }, {
        key: "velocityFrom", value: function (t) {
            return this.time !== t.time ? this.distanceTo(t) / (this.time - t.time) : 0
        }
    }])
}(), ba = function () {
    function t(e, r, n, i, o, a) {
        Oi(this, t), this.startPoint = e, this.control2 = r, this.control1 = n, this.endPoint = i, this.startWidth = o, this.endWidth = a
    }

    return Mi(t, [{
        key: "length", value: function () {
            for (var t, e, r = 10, n = 0, i = 0; i <= r; i += 1) {
                var o = i / r, a = this.point(o, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x),
                    s = this.point(o, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
                if (i > 0) {
                    var u = a - t, c = s - e;
                    n += Math.sqrt(u * u + c * c)
                }
                t = a, e = s
            }
            return n
        }
    }, {
        key: "point", value: function (t, e, r, n, i) {
            return e * (1 - t) * (1 - t) * (1 - t) + 3 * r * (1 - t) * (1 - t) * t + 3 * n * (1 - t) * t * t + i * t * t * t
        }
    }], [{
        key: "fromPoints", value: function (e, r) {
            var n = this.calculateControlPoints(e[0], e[1], e[2]).c2,
                i = this.calculateControlPoints(e[1], e[2], e[3]).c1;
            return new t(e[1], n, i, e[2], r.start, r.end)
        }
    }, {
        key: "calculateControlPoints", value: function (t, e, r) {
            var n = t.x - e.x, i = t.y - e.y, o = e.x - r.x, a = e.y - r.y,
                s = {x: (t.x + e.x) / 2, y: (t.y + e.y) / 2}, u = {x: (e.x + r.x) / 2, y: (e.y + r.y) / 2},
                c = Math.sqrt(n * n + i * i), l = Math.sqrt(o * o + a * a), h = s.x - u.x, f = s.y - u.y,
                p = l / (c + l), d = {x: u.x + h * p, y: u.y + f * p}, m = e.x - d.x, g = e.y - d.y;
            return {c1: new Aa(s.x + m, s.y + g), c2: new Aa(u.x + m, u.y + g)}
        }
    }])
}(), Ea = function () {
    function t() {
        Oi(this, t);
        try {
            this._et = new EventTarget
        } catch (e) {
            this._et = document
        }
    }

    return Mi(t, [{
        key: "addEventListener", value: function (t, e, r) {
            this._et.addEventListener(t, e, r)
        }
    }, {
        key: "dispatchEvent", value: function (t) {
            return this._et.dispatchEvent(t)
        }
    }, {
        key: "removeEventListener", value: function (t, e, r) {
            this._et.removeEventListener(t, e, r)
        }
    }])
}();

function wa(t) {
    var e, r, n, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 250, o = 0, a = null,
        s = function () {
            o = Date.now(), a = null, e = t.apply(r, n), a || (r = null, n = [])
        };
    return function () {
        var u = Date.now(), c = i - (u - o);
        r = this;
        for (var l = arguments.length, h = new Array(l), f = 0; f < l; f++) h[f] = arguments[f];
        return n = h, c <= 0 || c > i ? (a && (clearTimeout(a), a = null), o = u, e = t.apply(r, n), a || (r = null, n = [])) : a || (a = window.setTimeout(s, c)), e
    }
}

var _a, xa = function (e) {
    function r(t) {
        var e, n, i, o, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return Oi(this, r), e = ga(this, r), e.canvas = t, e._drawingStroke = !1, e._isEmpty = !0, e._lastPoints = [], e._data = [], e._lastVelocity = 0, e._lastWidth = 0, e.forceUseTouch = !1, e._handleMouseDown = function (t) {
            e._isLeftButtonPressed(t, !0) && !e._drawingStroke && e._strokeBegin(e._pointerEventToSignatureEvent(t))
        }, e._handleMouseMove = function (t) {
            e._isLeftButtonPressed(t, !0) && e._drawingStroke ? e._strokeMoveUpdate(e._pointerEventToSignatureEvent(t)) : e._strokeEnd(e._pointerEventToSignatureEvent(t), !1)
        }, e._handleMouseUp = function (t) {
            e._isLeftButtonPressed(t) || e._strokeEnd(e._pointerEventToSignatureEvent(t))
        }, e._handleTouchStart = function (t) {
            1 !== t.targetTouches.length || e._drawingStroke || (t.preventDefault(), e._strokeBegin(e._touchEventToSignatureEvent(t)))
        }, e._handleTouchMove = function (t) {
            1 === t.targetTouches.length && (t.cancelable && t.preventDefault(), e._drawingStroke ? e._strokeMoveUpdate(e._touchEventToSignatureEvent(t)) : e._strokeEnd(e._touchEventToSignatureEvent(t), !1))
        }, e._handleTouchEnd = function (t) {
            0 === t.targetTouches.length && (e.canvas.removeEventListener("touchmove", e._handleTouchMove), e._strokeEnd(e._touchEventToSignatureEvent(t)))
        }, e._handlePointerDown = function (t) {
            e._isLeftButtonPressed(t) && !e._drawingStroke && (t.preventDefault(), e._strokeBegin(e._pointerEventToSignatureEvent(t)))
        }, e._handlePointerMove = function (t) {
            e._isLeftButtonPressed(t, !0) && e._drawingStroke ? (t.preventDefault(), e._strokeMoveUpdate(e._pointerEventToSignatureEvent(t))) : e._strokeEnd(e._pointerEventToSignatureEvent(t), !1)
        }, e._handlePointerUp = function (t) {
            e._isLeftButtonPressed(t) || (t.preventDefault(), e._strokeEnd(e._pointerEventToSignatureEvent(t)))
        }, e.velocityFilterWeight = a.velocityFilterWeight || .7, e.minWidth = a.minWidth || .5, e.maxWidth = a.maxWidth || 2.5, e.forceUseTouch = a.forceUseTouch || !1, e.throttle = null !== (n = a.throttle) && void 0 !== n ? n : 16, e.minDistance = null !== (i = a.minDistance) && void 0 !== i ? i : 5, e.dotSize = a.dotSize || 0, e.penColor = a.penColor || "black", e.backgroundColor = a.backgroundColor || "rgba(0,0,0,0)", e.compositeOperation = a.compositeOperation || "source-over", e.canvasContextOptions = null !== (o = a.canvasContextOptions) && void 0 !== o ? o : {}, e._strokeMoveUpdate = e.throttle ? wa(r.prototype._strokeUpdate, e.throttle) : r.prototype._strokeUpdate, e._ctx = t.getContext("2d", e.canvasContextOptions), e.clear(), e.on(), e
    }

    return ya(r, e), Mi(r, [{
        key: "clear", value: function () {
            var t = this._ctx, e = this.canvas;
            t.fillStyle = this.backgroundColor, t.clearRect(0, 0, e.width, e.height), t.fillRect(0, 0, e.width, e.height), this._data = [], this._reset(this._getPointGroupOptions()), this._isEmpty = !0
        }
    }, {
        key: "fromDataURL", value: function (t) {
            var e = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return new Promise((function (n, i) {
                var o = new Image, a = r.ratio || window.devicePixelRatio || 1, s = r.width || e.canvas.width / a,
                    u = r.height || e.canvas.height / a, c = r.xOffset || 0, l = r.yOffset || 0;
                e._reset(e._getPointGroupOptions()), o.onload = function () {
                    e._ctx.drawImage(o, c, l, s, u), n()
                }, o.onerror = function (t) {
                    i(t)
                }, o.crossOrigin = "anonymous", o.src = t, e._isEmpty = !1
            }))
        }
    }, {
        key: "toDataURL", value: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "image/png",
                r = arguments.length > 1 ? arguments[1] : void 0;
            switch (e) {
                case"image/svg+xml":
                    return "object" !== t(r) && (r = void 0), "data:image/svg+xml;base64,".concat(btoa(this.toSVG(r)));
                default:
                    return "number" !== typeof r && (r = void 0), this.canvas.toDataURL(e, r)
            }
        }
    }, {
        key: "on", value: function () {
            this.canvas.style.touchAction = "none", this.canvas.style.msTouchAction = "none", this.canvas.style.userSelect = "none";
            var t = /Macintosh/.test(navigator.userAgent) && "ontouchstart" in document;
            !window.PointerEvent || t || this.forceUseTouch ? (this._handleMouseEvents(), "ontouchstart" in window && this._handleTouchEvents()) : this._handlePointerEvents()
        }
    }, {
        key: "off", value: function () {
            this.canvas.style.touchAction = "auto", this.canvas.style.msTouchAction = "auto", this.canvas.style.userSelect = "auto", this.canvas.removeEventListener("pointerdown", this._handlePointerDown), this.canvas.removeEventListener("mousedown", this._handleMouseDown), this.canvas.removeEventListener("touchstart", this._handleTouchStart), this._removeMoveUpEventListeners()
        }
    }, {
        key: "_getListenerFunctions", value: function () {
            var t,
                e = window.document === this.canvas.ownerDocument ? window : null !== (t = this.canvas.ownerDocument.defaultView) && void 0 !== t ? t : this.canvas.ownerDocument;
            return {addEventListener: e.addEventListener.bind(e), removeEventListener: e.removeEventListener.bind(e)}
        }
    }, {
        key: "_removeMoveUpEventListeners", value: function () {
            var t = this._getListenerFunctions(), e = t.removeEventListener;
            e("pointermove", this._handlePointerMove), e("pointerup", this._handlePointerUp), e("mousemove", this._handleMouseMove), e("mouseup", this._handleMouseUp), e("touchmove", this._handleTouchMove), e("touchend", this._handleTouchEnd)
        }
    }, {
        key: "isEmpty", value: function () {
            return this._isEmpty
        }
    }, {
        key: "fromData", value: function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = e.clear,
                n = void 0 === r || r;
            n && this.clear(), this._fromData(t, this._drawCurve.bind(this), this._drawDot.bind(this)), this._data = this._data.concat(t)
        }
    }, {
        key: "toData", value: function () {
            return this._data
        }
    }, {
        key: "_isLeftButtonPressed", value: function (t, e) {
            return e ? 1 === t.buttons : 1 === (1 & t.buttons)
        }
    }, {
        key: "_pointerEventToSignatureEvent", value: function (t) {
            return {event: t, type: t.type, x: t.clientX, y: t.clientY, pressure: "pressure" in t ? t.pressure : 0}
        }
    }, {
        key: "_touchEventToSignatureEvent", value: function (t) {
            var e = t.changedTouches[0];
            return {event: t, type: t.type, x: e.clientX, y: e.clientY, pressure: e.force}
        }
    }, {
        key: "_getPointGroupOptions", value: function (t) {
            return {
                penColor: t && "penColor" in t ? t.penColor : this.penColor,
                dotSize: t && "dotSize" in t ? t.dotSize : this.dotSize,
                minWidth: t && "minWidth" in t ? t.minWidth : this.minWidth,
                maxWidth: t && "maxWidth" in t ? t.maxWidth : this.maxWidth,
                velocityFilterWeight: t && "velocityFilterWeight" in t ? t.velocityFilterWeight : this.velocityFilterWeight,
                compositeOperation: t && "compositeOperation" in t ? t.compositeOperation : this.compositeOperation
            }
        }
    }, {
        key: "_strokeBegin", value: function (t) {
            var e = !this.dispatchEvent(new CustomEvent("beginStroke", {detail: t, cancelable: !0}));
            if (!e) {
                var r = this._getListenerFunctions(), n = r.addEventListener;
                switch (t.event.type) {
                    case"mousedown":
                        n("mousemove", this._handleMouseMove), n("mouseup", this._handleMouseUp);
                        break;
                    case"touchstart":
                        n("touchmove", this._handleTouchMove), n("touchend", this._handleTouchEnd);
                        break;
                    case"pointerdown":
                        n("pointermove", this._handlePointerMove), n("pointerup", this._handlePointerUp);
                        break
                }
                this._drawingStroke = !0;
                var i = this._getPointGroupOptions(), o = Object.assign(Object.assign({}, i), {points: []});
                this._data.push(o), this._reset(i), this._strokeUpdate(t)
            }
        }
    }, {
        key: "_strokeUpdate", value: function (t) {
            if (this._drawingStroke) if (0 !== this._data.length) {
                this.dispatchEvent(new CustomEvent("beforeUpdateStroke", {detail: t}));
                var e = this._createPoint(t.x, t.y, t.pressure), r = this._data[this._data.length - 1], n = r.points,
                    i = n.length > 0 && n[n.length - 1], o = !!i && e.distanceTo(i) <= this.minDistance,
                    a = this._getPointGroupOptions(r);
                if (!i || !i || !o) {
                    var s = this._addPoint(e, a);
                    i ? s && this._drawCurve(s, a) : this._drawDot(e, a), n.push({
                        time: e.time,
                        x: e.x,
                        y: e.y,
                        pressure: e.pressure
                    })
                }
                this.dispatchEvent(new CustomEvent("afterUpdateStroke", {detail: t}))
            } else this._strokeBegin(t)
        }
    }, {
        key: "_strokeEnd", value: function (t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this._removeMoveUpEventListeners(), this._drawingStroke && (e && this._strokeUpdate(t), this._drawingStroke = !1, this.dispatchEvent(new CustomEvent("endStroke", {detail: t})))
        }
    }, {
        key: "_handlePointerEvents", value: function () {
            this._drawingStroke = !1, this.canvas.addEventListener("pointerdown", this._handlePointerDown)
        }
    }, {
        key: "_handleMouseEvents", value: function () {
            this._drawingStroke = !1, this.canvas.addEventListener("mousedown", this._handleMouseDown)
        }
    }, {
        key: "_handleTouchEvents", value: function () {
            this.canvas.addEventListener("touchstart", this._handleTouchStart)
        }
    }, {
        key: "_reset", value: function (t) {
            this._lastPoints = [], this._lastVelocity = 0, this._lastWidth = (t.minWidth + t.maxWidth) / 2, this._ctx.fillStyle = t.penColor, this._ctx.globalCompositeOperation = t.compositeOperation
        }
    }, {
        key: "_createPoint", value: function (t, e, r) {
            var n = this.canvas.getBoundingClientRect();
            return new Aa(t - n.left, e - n.top, r, (new Date).getTime())
        }
    }, {
        key: "_addPoint", value: function (t, e) {
            var r = this._lastPoints;
            if (r.push(t), r.length > 2) {
                3 === r.length && r.unshift(r[0]);
                var n = this._calculateCurveWidths(r[1], r[2], e), i = ba.fromPoints(r, n);
                return r.shift(), i
            }
            return null
        }
    }, {
        key: "_calculateCurveWidths", value: function (t, e, r) {
            var n = r.velocityFilterWeight * e.velocityFrom(t) + (1 - r.velocityFilterWeight) * this._lastVelocity,
                i = this._strokeWidth(n, r), o = {end: i, start: this._lastWidth};
            return this._lastVelocity = n, this._lastWidth = i, o
        }
    }, {
        key: "_strokeWidth", value: function (t, e) {
            return Math.max(e.maxWidth / (t + 1), e.minWidth)
        }
    }, {
        key: "_drawCurveSegment", value: function (t, e, r) {
            var n = this._ctx;
            n.moveTo(t, e), n.arc(t, e, r, 0, 2 * Math.PI, !1), this._isEmpty = !1
        }
    }, {
        key: "_drawCurve", value: function (t, e) {
            var r = this._ctx, n = t.endWidth - t.startWidth, i = 2 * Math.ceil(t.length());
            r.beginPath(), r.fillStyle = e.penColor;
            for (var o = 0; o < i; o += 1) {
                var a = o / i, s = a * a, u = s * a, c = 1 - a, l = c * c, h = l * c, f = h * t.startPoint.x;
                f += 3 * l * a * t.control1.x, f += 3 * c * s * t.control2.x, f += u * t.endPoint.x;
                var p = h * t.startPoint.y;
                p += 3 * l * a * t.control1.y, p += 3 * c * s * t.control2.y, p += u * t.endPoint.y;
                var d = Math.min(t.startWidth + u * n, e.maxWidth);
                this._drawCurveSegment(f, p, d)
            }
            r.closePath(), r.fill()
        }
    }, {
        key: "_drawDot", value: function (t, e) {
            var r = this._ctx, n = e.dotSize > 0 ? e.dotSize : (e.minWidth + e.maxWidth) / 2;
            r.beginPath(), this._drawCurveSegment(t.x, t.y, n), r.closePath(), r.fillStyle = e.penColor, r.fill()
        }
    }, {
        key: "_fromData", value: function (t, e, r) {
            var n, i = ha(t);
            try {
                for (i.s(); !(n = i.n()).done;) {
                    var o = n.value, a = o.points, s = this._getPointGroupOptions(o);
                    if (a.length > 1) for (var u = 0; u < a.length; u += 1) {
                        var c = a[u], l = new Aa(c.x, c.y, c.pressure, c.time);
                        0 === u && this._reset(s);
                        var h = this._addPoint(l, s);
                        h && e(h, s)
                    } else this._reset(s), r(a[0], s)
                }
            } catch (f) {
                i.e(f)
            } finally {
                i.f()
            }
        }
    }, {
        key: "toSVG", value: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.includeBackgroundColor,
                r = void 0 !== e && e, n = this._data, i = Math.max(window.devicePixelRatio || 1, 1), o = 0, a = 0,
                s = this.canvas.width / i, u = this.canvas.height / i,
                c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            if (c.setAttribute("xmlns", "http://www.w3.org/2000/svg"), c.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), c.setAttribute("viewBox", "".concat(o, " ").concat(a, " ").concat(s, " ").concat(u)), c.setAttribute("width", s.toString()), c.setAttribute("height", u.toString()), r && this.backgroundColor) {
                var l = document.createElement("rect");
                l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("fill", this.backgroundColor), c.appendChild(l)
            }
            return this._fromData(n, (function (t, e) {
                var r = e.penColor, n = document.createElement("path");
                if (!isNaN(t.control1.x) && !isNaN(t.control1.y) && !isNaN(t.control2.x) && !isNaN(t.control2.y)) {
                    var i = "M ".concat(t.startPoint.x.toFixed(3), ",").concat(t.startPoint.y.toFixed(3), " ") + "C ".concat(t.control1.x.toFixed(3), ",").concat(t.control1.y.toFixed(3), " ") + "".concat(t.control2.x.toFixed(3), ",").concat(t.control2.y.toFixed(3), " ") + "".concat(t.endPoint.x.toFixed(3), ",").concat(t.endPoint.y.toFixed(3));
                    n.setAttribute("d", i), n.setAttribute("stroke-width", (2.25 * t.endWidth).toFixed(3)), n.setAttribute("stroke", r), n.setAttribute("fill", "none"), n.setAttribute("stroke-linecap", "round"), c.appendChild(n)
                }
            }), (function (t, e) {
                var r = e.penColor, n = e.dotSize, i = e.minWidth, o = e.maxWidth, a = document.createElement("circle"),
                    s = n > 0 ? n : (i + o) / 2;
                a.setAttribute("r", s.toString()), a.setAttribute("cx", t.x.toString()), a.setAttribute("cy", t.y.toString()), a.setAttribute("fill", r), c.appendChild(a)
            })), c.outerHTML
        }
    }])
}(Ea);
(function (t) {
    t[t["OPEN"] = 0] = "OPEN", t[t["CLOSE"] = 1] = "CLOSE", t[t["DELETE"] = 2] = "DELETE", t[t["DELETE_UNABLE"] = 3] = "DELETE_UNABLE", t[t["UNDO"] = 4] = "UNDO", t[t["UNDO_UNABLE"] = 5] = "UNDO_UNABLE", t[t["REDO"] = 6] = "REDO", t[t["REDO_UNABLE"] = 7] = "REDO_UNABLE"
})(_a || (_a = {}));
var Sa = (0, i.ref)(null), Ca = (0, i.ref)(!1), Va = (0, i.ref)([]), Ia = (0, i.computed)((function () {
    var t, e, r;
    return Ca.value ? [null !== (t = Sa.value) && void 0 !== t && t.isEmpty() ? _a.DELETE_UNABLE : _a.DELETE, null !== (e = Sa.value) && void 0 !== e && e.isEmpty() ? _a.UNDO_UNABLE : _a.UNDO, null !== (r = Va.value) && void 0 !== r && r.length ? _a.REDO : _a.REDO_UNABLE, _a.CLOSE] : [_a.OPEN]
})), Pa = function (t) {
    Sa.value = new xa(t, {minWidth: 3, maxWidth: 3, penColor: "#000", forceUseTouch: !0})
}, Ta = function (t) {
    switch (t) {
        case _a.OPEN:
            return __webpack_require__(5866);
        case _a.CLOSE:
            return __webpack_require__(45764);
        case _a.UNDO:
            return __webpack_require__(43547);
        case _a.UNDO_UNABLE:
            return __webpack_require__(87802);
        case _a.REDO:
            return __webpack_require__(99159);
        case _a.REDO_UNABLE:
            return __webpack_require__(9814);
        case _a.DELETE:
            return __webpack_require__(15615);
        case _a.DELETE_UNABLE:
            return __webpack_require__(40590);
        default:
            return __webpack_require__(5866)
    }
}, ka = function (t) {
    switch (t) {
        case _a.OPEN:
            Ra();
            break;
        case _a.CLOSE:
            Oa();
            break;
        case _a.UNDO:
            Da();
            break;
        case _a.UNDO_UNABLE:
            break;
        case _a.REDO:
            Ma();
            break;
        case _a.REDO_UNABLE:
            break;
        case _a.DELETE:
            Ba();
            break;
        case _a.DELETE_UNABLE:
            break;
        default:
            break
    }
}, Ra = function () {
    Ca.value = !0
}, Oa = function () {
    Ca.value = !1
}, Da = function () {
    var t, e = null === (t = Sa.value) || void 0 === t ? void 0 : t.toData();
    if (e) {
        var r, n = e.pop();
        Va.value.push(n), null === (r = Sa.value) || void 0 === r || r.fromData(e)
    }
}, Ma = function () {
    var t, e, r, n = null === (t = Sa.value) || void 0 === t ? void 0 : t.toData(),
        i = null === (e = Va.value) || void 0 === e ? void 0 : e.pop();
    i && n && (n.push(i), null === (r = Sa.value) || void 0 === r || r.fromData(n))
}, Ba = function () {
    var t;
    null === (t = Sa.value) || void 0 === t || t.clear(), Va.value = []
}, Fa = function () {
    return {pad: Sa, showDraftBoard: Ca, toolItems: Ia, initWritingPad: Pa, getToolImageByType: Ta, onItemClick: ka}
}, La = Fa, Na = (0, i.ref)(!1), Ua = function () {
    var t = window.matchMedia("(orientation: landscape)"), e = function (t) {
        t.matches ? Na.value = !0 : Na.value = !1
    };
    e(t), t.addListener(e)
}, ja = function () {
    return {isLandScape: Na, registerLandScapeListener: Ua}
}, Ga = ja;

function Ha(t) {
    if (Array.isArray(t)) return Ko(t)
}

function qa(t) {
    if ("undefined" !== typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
}

function Qa() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function za(t) {
    return Ha(t) || qa(t) || Jo(t) || Qa()
}

__webpack_require__(74423), __webpack_require__(15086), __webpack_require__(21699);
var Wa = (0, i.ref)(null), Ya = (0, i.ref)([]), Ka = (0, i.ref)(), Ja = (0, i.ref)(0), Xa = (0, i.ref)(null),
    Za = (0, i.ref)(!1), $a = (0, i.ref)(0), ts = (0, i.ref)((function (t) {
    })), es = function (t) {
        Wa.value = new xa(t, {
            minWidth: 3,
            maxWidth: 3,
            penColor: "#000",
            throttle: 8,
            forceUseTouch: !0
        }), Wa.value.addEventListener("beginStroke", (function () {
            Xa.value && clearTimeout(Xa.value), Za.value || (Za.value = !0, $a.value = Date.now())
        })), Wa.value.addEventListener("endStroke", (function () {
            rs()
        }))
    }, rs = function () {
        var t, e = null === (t = Wa.value) || void 0 === t ? void 0 : t.toData();
        if (Array.isArray(e)) {
            var r, n, i, a, s = e.map((function (t) {
                return za(t.points.map((function (t) {
                    return {x: t.x, y: t.y}
                })))
            }));
            if (Ya.value = s, Ja.value = (new Date).getTime(), Za.value) o().prototype.$addFrog("/time/oral/onHandUp", {
                duration: Date.now() - $a.value,
                keypointId: null === (i = Ka.value) || void 0 === i ? void 0 : i.keypointId,
                ruleType: null === (a = Ka.value) || void 0 === a ? void 0 : a.ruleType,
                isOralPk: !0,
                stokeCount: s.length
            });
            var u = Date.now();
            cn("recognize", {
                strokes: Ya.value,
                keypointId: (null === (r = Ka.value) || void 0 === r ? void 0 : r.keypointId) || "0",
                expectedResult: (null === (n = Ka.value) || void 0 === n ? void 0 : n.answers) || [],
                startTime: Ja.value,
                trigger: function (t, e) {
                    t || ns(e, s.length), pn({
                        url: "/event/pk/recogniz/time",
                        params: {duration: Date.now() - u, length: s.length},
                        flushFrog: !1
                    })
                }
            }, "MathExercise")
        }
    }, ns = function (t, e) {
        var r, n, i;
        Za.value && o().prototype.$addFrog("/time/oral/onRecognize", {
            duration: Date.now() - $a.value,
            keypointId: null === (r = Ka.value) || void 0 === r ? void 0 : r.keypointId,
            ruleType: null === (n = Ka.value) || void 0 === n ? void 0 : n.ruleType,
            isOralPk: !0,
            recognizeResult: t,
            answers: null === (i = Ka.value) || void 0 === i ? void 0 : i.answers,
            isRight: cs(t) || "false",
            stokeCount: e
        });
        cs(t) ? is(t, e) : (window.clearTimeout(Xa.value), Xa.value = setTimeout((function () {
            Ya.value.length === e && is(t, e)
        }), 700))
    }, is = function (t, e) {
        var r, n, i, a = {
            recognizeResult: t,
            pathPoints: Ya.value,
            answer: cs(t) ? 1 : 0,
            showReductionFraction: !cs(t) && as(t) ? 1 : 0
        };
        (ts.value(a), Za.value) && (o().prototype.$addFrog("/time/oral/singleQuestion", {
            duration: Date.now() - $a.value,
            keypointId: null === (r = Ka.value) || void 0 === r ? void 0 : r.keypointId,
            ruleType: null === (n = Ka.value) || void 0 === n ? void 0 : n.ruleType,
            isOralPk: !0,
            stokeCount: e,
            result: t,
            answer: null === (i = Ka.value) || void 0 === i ? void 0 : i.answers,
            isRight: cs(t) || "false"
        }), Za.value = !1);
        ls()
    }, os = /^(\d*)\\frac\{(\d+)\}\{(\d+)\}$/, as = function (t) {
        var e;
        if (!os.test(t)) return !1;
        var r = ss(t);
        return r && (null === (e = Ka.value) || void 0 === e || null === (e = e.answers) || void 0 === e ? void 0 : e.some((function (t) {
            var e = ss(t);
            return e && us(e, r)
        }))) || !1
    }, ss = function (t) {
        var e = t.match(os);
        return e ? [+e[1], +e[2], +e[3]] : null
    }, us = function (t, e) {
        return 0 !== t[0] && (t[1] += t[0] * t[2]), 0 !== e[0] && (e[1] += e[0] * e[2]), !!(t[1] * t[2] * e[1] * e[2]) && t[1] * e[2] === e[1] * t[2]
    }, cs = function (t) {
        var e;
        return null === (e = Ka.value) || void 0 === e || null === (e = e.answers) || void 0 === e ? void 0 : e.includes(t)
    }, ls = function () {
        var t;
        null === (t = Wa.value) || void 0 === t || t.clear()
    }, hs = function (t, e) {
        t && (Ka.value = t), ts.value = e
    }, fs = function () {
        return {
            pad: Wa,
            writeContent: Ya,
            recognizeConfig: Ka,
            onRecognize: ts,
            performanceTimestamp: Ja,
            initWritingPad: es,
            resetCanvas: ls,
            setOnRecognize: hs
        }
    }, ps = fs, ds = (0, i.defineComponent)({
        __name: "Question",
        props: {jumpToNext: null, answerPaperResult: null},
        emits: ["dataReady", "finishExercise", "canSlideToNextQuestion"],
        setup: function (t, e) {
            var r = e.emit, n = t, o = la(), a = o.questionIndex, s = o.formatQuestionList, u = ps(), c = u.pad, l = La(),
                h = l.onItemClick, f = (0, i.ref)([]), p = Ga(), d = p.isLandScape, m = p.registerLandScapeListener,
                g = (0, i.ref)(!0), v = (0, i.ref)(), y = (0, i.ref)(), A = function () {
                    try {
                        var t;
                        t = d.value ? 3.08 : 9.33;
                        var e = "primary-question-wrap", r = document.getElementById(e),
                            n = r.clientWidth - parseInt(window.getComputedStyle(r).paddingLeft) - parseInt(window.getComputedStyle(r).paddingRight),
                            i = document.getElementsByClassName("primary-question-".concat(a.value))[0],
                            o = document.getElementsByClassName("second-question-".concat(a.value))[0], s = i.cloneNode(!0);
                        s.style.display = "", s.style.visibility = "hidden", r.appendChild(s);
                        var u = Array.prototype.slice.call(s.childNodes), c = u.reduce((function (t, e) {
                            return t += e.clientWidth, t
                        }), 0);
                        c > n && (i.style.fontSize = t * n / c + "vw", o.style.fontSize = t / 1.4 * n / c + "vw")
                    } catch (l) {
                    }
                }, b = function () {
                    var t = document.getElementById("answer-".concat(a.value));
                    if (t) {
                        var e = Array.prototype.slice.call(t.childNodes), r = e.reduce((function (t, e) {
                            return E(e) && (t += e.clientWidth || 0), t
                        }), 0), n = e.find((function (t) {
                            return E(t)
                        }));
                        t.clientWidth < r && (n.style.transform = "scale(".concat(t.clientWidth / r, ")"))
                    }
                }, E = function (t) {
                    return t.tagName && "span" === t.tagName.toLowerCase()
                };
            (0, i.onMounted)((function () {
                f.value = s.value.slice(1, s.value.length), (0, i.nextTick)((function () {
                    A(), b(), r("dataReady")
                }))
            }));
            var w = function () {
                h(_a.DELETE), A()
            }, _ = function () {
                g.value = !0
            };
            return (0, i.watch)((0, i.computed)((function () {
                return n.jumpToNext
            })), (function () {
                g.value = !1
            })), (0, i.watch)((0, i.computed)((function () {
                return n.answerPaperResult
            })), (function () {
                if (n.answerPaperResult.pathPoints) {
                    g.value = !0, (0, i.nextTick)((function () {
                        b()
                    }));
                    var t = ii(ii({}, s.value[a.value]), {}, {curTrueAnswer: n.answerPaperResult});
                    s.value.splice(a.value, 1, t), n.answerPaperResult.answer === mi.CORRECT ? setTimeout((function () {
                        var t;
                        null === (t = c.value) || void 0 === t || t.clear(), a.value + 1 >= s.value.length ? r("finishExercise") : r("canSlideToNextQuestion")
                    }), 200) : n.answerPaperResult.answer === mi.FAULT && setTimeout((function () {
                        g.value = !1
                    }), 600)
                }
            })), m(), {
                __sfc: !0,
                props: n,
                emit: r,
                questionIndex: a,
                formatQuestionList: s,
                pad: c,
                onItemClick: h,
                nextQuestionQueue: f,
                isLandScape: d,
                registerLandScapeListener: m,
                showAnswerContent: g,
                answerBlock: v,
                answer: y,
                adjustFontSizeByWidth: A,
                adjustAnswerSize: b,
                isSpan: E,
                questionBeforeEnter: w,
                questionEnter: _,
                CorrectMark: yi,
                FaultMark: Si,
                Reduction: Ri,
                ANSWER_RESULT: mi,
                REDUCTION: gi,
                formatFracContent: zo
            }
        }
    }), ms = ds, gs = di(ms, oi, ai, !1, null, "3f991ee8", null), vs = gs.exports, ys = function () {
        var t = this, e = t._self._c;
        t._self._setupProxy;
        return e("div", {staticClass: "write-area-wrap"}, [e("div", {staticClass: "background-board"}), t.showTime ? e("div", {staticClass: "exercise-time"}, [t._v(" " + t._s(t.timerText) + " ")]) : t._e()])
    }, As = [], bs = (0, i.defineComponent)({
        __name: "WriteArea",
        props: {showTime: {type: Boolean}, timerText: null},
        setup: function (t) {
            var e = t;
            return {__sfc: !0, props: e}
        }
    }), Es = bs, ws = di(Es, ys, As, !1, null, "01e60152", null), _s = ws.exports, xs = function () {
        var t = this, e = t._self._c;
        t._self._setupProxy;
        return t.exitModalShow ? e("div", {staticClass: "exit-modal"}, [e("div", {staticClass: "content"}, [e("img", {
            staticClass: "quit-img",
            attrs: {src: __webpack_require__(85033), alt: ""}
        }), e("div", {staticClass: "tip"}, [t._v(" 退出比赛，成绩就没有了哦～ ")]), e("div", {staticClass: "btn-group"}, [e("div", {
            staticClass: "continue",
            on: {click: t.onContinue}
        }, [t._v(" 继续战斗 ")]), e("div", {
            staticClass: "exit",
            on: {click: t.onExit}
        }, [t._v(" 算了，打算放弃 ")])])])]) : t._e()
    }, Ss = [];
