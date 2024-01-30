!(function () {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            t(e);
        new MutationObserver((e) => {
            for (const n of e)
                if ("childList" === n.type)
                    for (const e of n.addedNodes)
                        "LINK" === e.tagName &&
                            "modulepreload" === e.rel &&
                            t(e);
        }).observe(document, { childList: !0, subtree: !0 });
    }
    function t(e) {
        if (e.ep) return;
        e.ep = !0;
        const t = (function (e) {
            const t = {};
            return (
                e.integrity && (t.integrity = e.integrity),
                e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
                "use-credentials" === e.crossOrigin
                    ? (t.credentials = "include")
                    : "anonymous" === e.crossOrigin
                    ? (t.credentials = "omit")
                    : (t.credentials = "same-origin"),
                t
            );
        })(e);
        fetch(e.href, t);
    }
})();
const e = {},
    t = function (t, n, s) {
        if (!n || 0 === n.length) return t();
        const o = document.getElementsByTagName("link");
        return Promise.all(
            n.map((t) => {
                if (
                    ((t = (function (e, t) {
                        return new URL(e, t).href;
                    })(t, s)),
                    t in e)
                )
                    return;
                e[t] = !0;
                const n = t.endsWith(".css"),
                    i = n ? '[rel="stylesheet"]' : "";
                if (!!s)
                    for (let e = o.length - 1; e >= 0; e--) {
                        const s = o[e];
                        if (s.href === t && (!n || "stylesheet" === s.rel))
                            return;
                    }
                else if (document.querySelector(`link[href="${t}"]${i}`))
                    return;
                const r = document.createElement("link");
                return (
                    (r.rel = n ? "stylesheet" : "modulepreload"),
                    n || ((r.as = "script"), (r.crossOrigin = "")),
                    (r.href = t),
                    document.head.appendChild(r),
                    n
                        ? new Promise((e, n) => {
                              r.addEventListener("load", e),
                                  r.addEventListener("error", () =>
                                      n(
                                          new Error(
                                              `Unable to preload CSS for ${t}`
                                          )
                                      )
                                  );
                          })
                        : void 0
                );
            })
        ).then(() => t());
    };
function n(e, t) {
    const n = Object.create(null),
        s = e.split(",");
    for (let o = 0; o < s.length; o++) n[s[o]] = !0;
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
}
function s(e) {
    if (T(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const o = e[n],
                i = x(o) ? a(o) : s(o);
            if (i) for (const e in i) t[e] = i[e];
        }
        return t;
    }
    return x(e) || R(e) ? e : void 0;
}
const o = /;(?![^(]*\))/g,
    i = /:([^]+)/,
    r = /\/\*.*?\*\//gs;
function a(e) {
    const t = {};
    return (
        e
            .replace(r, "")
            .split(o)
            .forEach((e) => {
                if (e) {
                    const n = e.split(i);
                    n.length > 1 && (t[n[0].trim()] = n[1].trim());
                }
            }),
        t
    );
}
function c(e) {
    let t = "";
    if (x(e)) t = e;
    else if (T(e))
        for (let n = 0; n < e.length; n++) {
            const s = c(e[n]);
            s && (t += s + " ");
        }
    else if (R(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const l = n(
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
);
function u(e) {
    return !!e || "" === e;
}
function d(e, t) {
    if (e === t) return !0;
    let n = O(e),
        s = O(t);
    if (n || s) return !(!n || !s) && e.getTime() === t.getTime();
    if (((n = A(e)), (s = A(t)), n || s)) return e === t;
    if (((n = T(e)), (s = T(t)), n || s))
        return (
            !(!n || !s) &&
            (function (e, t) {
                if (e.length !== t.length) return !1;
                let n = !0;
                for (let s = 0; n && s < e.length; s++) n = d(e[s], t[s]);
                return n;
            })(e, t)
        );
    if (((n = R(e)), (s = R(t)), n || s)) {
        if (!n || !s) return !1;
        if (Object.keys(e).length !== Object.keys(t).length) return !1;
        for (const n in e) {
            const s = e.hasOwnProperty(n),
                o = t.hasOwnProperty(n);
            if ((s && !o) || (!s && o) || !d(e[n], t[n])) return !1;
        }
    }
    return String(e) === String(t);
}
function h(e, t) {
    return e.findIndex((e) => d(e, t));
}
const p = (e) =>
        x(e)
            ? e
            : null == e
            ? ""
            : T(e) || (R(e) && (e.toString === D || !N(e.toString)))
            ? JSON.stringify(e, f, 2)
            : String(e),
    f = (e, t) =>
        t && t.__v_isRef
            ? f(e, t.value)
            : I(t)
            ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                      (e, [t, n]) => ((e[`${t} =>`] = n), e),
                      {}
                  ),
              }
            : k(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : !R(t) || T(t) || F(t)
            ? t
            : String(t),
    m = {},
    g = [],
    y = () => {},
    v = () => !1,
    b = /^on[^a-z]/,
    S = (e) => b.test(e),
    E = (e) => e.startsWith("onUpdate:"),
    w = Object.assign,
    C = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    _ = Object.prototype.hasOwnProperty,
    M = (e, t) => _.call(e, t),
    T = Array.isArray,
    I = (e) => "[object Map]" === L(e),
    k = (e) => "[object Set]" === L(e),
    O = (e) => "[object Date]" === L(e),
    N = (e) => "function" == typeof e,
    x = (e) => "string" == typeof e,
    A = (e) => "symbol" == typeof e,
    R = (e) => null !== e && "object" == typeof e,
    P = (e) => R(e) && N(e.then) && N(e.catch),
    D = Object.prototype.toString,
    L = (e) => D.call(e),
    F = (e) => "[object Object]" === L(e),
    U = (e) =>
        x(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
    B = n(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    j = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    G = /-(\w)/g,
    $ = j((e) => e.replace(G, (e, t) => (t ? t.toUpperCase() : ""))),
    q = /\B([A-Z])/g,
    V = j((e) => e.replace(q, "-$1").toLowerCase()),
    H = j((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    W = j((e) => (e ? `on${H(e)}` : "")),
    z = (e, t) => !Object.is(e, t),
    X = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    J = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n,
        });
    },
    K = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Y;
const Q = [
    "ad",
    "ad-content-page",
    "ad-draw",
    "audio",
    "button",
    "camera",
    "canvas",
    "checkbox",
    "checkbox-group",
    "cover-image",
    "cover-view",
    "editor",
    "form",
    "functional-page-navigator",
    "icon",
    "image",
    "input",
    "label",
    "live-player",
    "live-pusher",
    "map",
    "movable-area",
    "movable-view",
    "navigator",
    "official-account",
    "open-data",
    "picker",
    "picker-view",
    "picker-view-column",
    "progress",
    "radio",
    "radio-group",
    "rich-text",
    "scroll-view",
    "slider",
    "swiper",
    "swiper-item",
    "switch",
    "text",
    "textarea",
    "video",
    "view",
    "web-view",
].map((e) => "uni-" + e);
const Z = /^([a-z-]+:)?\/\//i,
    ee = /^data:.*,.*/,
    te = "onLoad";
function ne(e) {
    if (!e) return;
    let t = e.type.name;
    for (
        ;
        t && ((n = V(t)), -1 !== Q.indexOf("uni-" + n.replace("v-uni-", "")));

    )
        t = (e = e.parent).type.name;
    var n;
    return e.proxy;
}
function se(e) {
    return 1 === e.nodeType;
}
function oe(e) {
    return 0 === e.indexOf("/");
}
function ie(e) {
    return oe(e) ? e : "/" + e;
}
function re(e, t = null) {
    let n;
    return (...s) => (e && ((n = e.apply(t, s)), (e = null)), n);
}
function ae(e, t) {
    (e = e || {}),
        x(t) && (t = { errMsg: t }),
        /:ok$/.test(t.errMsg)
            ? N(e.success) && e.success(t)
            : N(e.fail) && e.fail(t),
        N(e.complete) && e.complete(t);
}
function ce(e) {
    return $(e.substring(5));
}
const le = re(() => {
    const e = HTMLElement.prototype,
        t = e.setAttribute;
    e.setAttribute = function (e, n) {
        if (e.startsWith("data-") && this.tagName.startsWith("UNI-")) {
            (this.__uniDataset || (this.__uniDataset = {}))[ce(e)] = n;
        }
        t.call(this, e, n);
    };
    const n = e.removeAttribute;
    e.removeAttribute = function (e) {
        this.__uniDataset &&
            e.startsWith("data-") &&
            this.tagName.startsWith("UNI-") &&
            delete this.__uniDataset[ce(e)],
            n.call(this, e);
    };
});
function ue(e) {
    return w({}, e.dataset, e.__uniDataset);
}
const de = new RegExp(
    "\"[^\"]+\"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px",
    "g"
);
function he(e) {
    return { passive: e };
}
function pe(e) {
    const { id: t, offsetTop: n, offsetLeft: s } = e;
    return { id: t, dataset: ue(e), offsetTop: n, offsetLeft: s };
}
function fe(e) {
    try {
        return decodeURIComponent("" + e);
    } catch (t) {}
    return "" + e;
}
function me(e = {}) {
    const t = {};
    return (
        Object.keys(e).forEach((n) => {
            try {
                t[n] = fe(e[n]);
            } catch (lf) {
                t[n] = e[n];
            }
        }),
        t
    );
}
const ge = /\+/g;
function ye(e) {
    const t = {};
    if ("" === e || "?" === e) return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let s = 0; s < n.length; ++s) {
        const e = n[s].replace(ge, " ");
        let o = e.indexOf("="),
            i = fe(o < 0 ? e : e.slice(0, o)),
            r = o < 0 ? null : fe(e.slice(o + 1));
        if (i in t) {
            let e = t[i];
            T(e) || (e = t[i] = [e]), e.push(r);
        } else t[i] = r;
    }
    return t;
}
function ve(e, t, { clearTimeout: n, setTimeout: s }) {
    let o;
    const i = function () {
        n(o);
        const i = () => e.apply(this, arguments);
        o = s(i, t);
    };
    return (
        (i.cancel = function () {
            n(o);
        }),
        i
    );
}
class be {
    constructor(e, t) {
        (this.id = e),
            (this.listener = {}),
            (this.emitCache = []),
            t &&
                Object.keys(t).forEach((e) => {
                    this.on(e, t[e]);
                });
    }
    emit(e, ...t) {
        const n = this.listener[e];
        if (!n) return this.emitCache.push({ eventName: e, args: t });
        n.forEach((e) => {
            e.fn.apply(e.fn, t);
        }),
            (this.listener[e] = n.filter((e) => "once" !== e.type));
    }
    on(e, t) {
        this._addListener(e, "on", t), this._clearCache(e);
    }
    once(e, t) {
        this._addListener(e, "once", t), this._clearCache(e);
    }
    off(e, t) {
        const n = this.listener[e];
        if (n)
            if (t)
                for (let s = 0; s < n.length; )
                    n[s].fn === t && (n.splice(s, 1), s--), s++;
            else delete this.listener[e];
    }
    _clearCache(e) {
        for (let t = 0; t < this.emitCache.length; t++) {
            const n = this.emitCache[t],
                s = e ? (n.eventName === e ? e : null) : n.eventName;
            if (!s) continue;
            "number" != typeof this.emit.apply(this, [s, ...n.args])
                ? (this.emitCache.splice(t, 1), t--)
                : this.emitCache.pop();
        }
    }
    _addListener(e, t, n) {
        (this.listener[e] || (this.listener[e] = [])).push({ fn: n, type: t });
    }
}
const Se = [
        "onInit",
        "onLoad",
        "onShow",
        "onHide",
        "onUnload",
        "onBackPress",
        "onPageScroll",
        "onTabItemTap",
        "onReachBottom",
        "onPullDownRefresh",
        "onShareTimeline",
        "onShareAppMessage",
        "onAddToFavorites",
        "onSaveExitState",
        "onNavigationBarButtonTap",
        "onNavigationBarSearchInputClicked",
        "onNavigationBarSearchInputChanged",
        "onNavigationBarSearchInputConfirmed",
        "onNavigationBarSearchInputFocusChanged",
    ],
    Ee = ["onLoad", "onShow"];
const we = [
    "onShow",
    "onHide",
    "onLaunch",
    "onError",
    "onThemeChange",
    "onPageNotFound",
    "onUnhandledRejection",
    "onExit",
    "onInit",
    "onLoad",
    "onReady",
    "onUnload",
    "onResize",
    "onBackPress",
    "onPageScroll",
    "onTabItemTap",
    "onReachBottom",
    "onPullDownRefresh",
    "onShareTimeline",
    "onAddToFavorites",
    "onShareAppMessage",
    "onSaveExitState",
    "onNavigationBarButtonTap",
    "onNavigationBarSearchInputClicked",
    "onNavigationBarSearchInputChanged",
    "onNavigationBarSearchInputConfirmed",
    "onNavigationBarSearchInputFocusChanged",
];
const Ce = [];
const _e = re((e, t) => {
        if (N(e._component.onError)) return t(e);
    }),
    Me = function () {};
Me.prototype = {
    on: function (e, t, n) {
        var s = this.e || (this.e = {});
        return (s[e] || (s[e] = [])).push({ fn: t, ctx: n }), this;
    },
    once: function (e, t, n) {
        var s = this;
        function o() {
            s.off(e, o), t.apply(n, arguments);
        }
        return (o._ = t), this.on(e, o, n);
    },
    emit: function (e) {
        for (
            var t = [].slice.call(arguments, 1),
                n = ((this.e || (this.e = {}))[e] || []).slice(),
                s = 0,
                o = n.length;
            s < o;
            s++
        )
            n[s].fn.apply(n[s].ctx, t);
        return this;
    },
    off: function (e, t) {
        var n = this.e || (this.e = {}),
            s = n[e],
            o = [];
        if (s && t)
            for (var i = 0, r = s.length; i < r; i++)
                s[i].fn !== t && s[i].fn._ !== t && o.push(s[i]);
        return o.length ? (n[e] = o) : delete n[e], this;
    },
};
var Te = Me;
const Ie = { black: "rgba(0,0,0,0.4)", white: "rgba(255,255,255,0.4)" };
function ke(e, t = {}, n = "light") {
    const s = t[n],
        o = {};
    return s
        ? (Object.keys(e).forEach((i) => {
              let r = e[i];
              o[i] = (() => {
                  if (F(r)) return ke(r, t, n);
                  if (T(r)) return r.map((e) => (F(e) ? ke(e, t, n) : e));
                  if (x(r) && r.startsWith("@")) {
                      const t = r.replace("@", "");
                      let n = s[t] || r;
                      switch (i) {
                          case "titleColor":
                              n = "black" === n ? "#000000" : "#ffffff";
                              break;
                          case "borderStyle":
                              n = (e = n) && e in Ie ? Ie[e] : e;
                      }
                      return n;
                  }
                  var e;
                  return r;
              })();
          }),
          o)
        : e;
}
let Oe;
class Ne {
    constructor(e = !1) {
        (this.detached = e),
            (this._active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = Oe),
            !e &&
                Oe &&
                (this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(e) {
        if (this._active) {
            const t = Oe;
            try {
                return (Oe = this), e();
            } finally {
                Oe = t;
            }
        }
    }
    on() {
        Oe = this;
    }
    off() {
        Oe = this.parent;
    }
    stop(e) {
        if (this._active) {
            let t, n;
            for (t = 0, n = this.effects.length; t < n; t++)
                this.effects[t].stop();
            for (t = 0, n = this.cleanups.length; t < n; t++)
                this.cleanups[t]();
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++)
                    this.scopes[t].stop(!0);
            if (!this.detached && this.parent && !e) {
                const e = this.parent.scopes.pop();
                e &&
                    e !== this &&
                    ((this.parent.scopes[this.index] = e),
                    (e.index = this.index));
            }
            (this.parent = void 0), (this._active = !1);
        }
    }
}
function xe(e) {
    return new Ne(e);
}
const Ae = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    Re = (e) => (e.w & Fe) > 0,
    Pe = (e) => (e.n & Fe) > 0,
    De = new WeakMap();
let Le = 0,
    Fe = 1;
let Ue;
const Be = Symbol(""),
    je = Symbol("");
class Ge {
    constructor(e, t = null, n) {
        (this.fn = e),
            (this.scheduler = t),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            (function (e, t = Oe) {
                t && t.active && t.effects.push(e);
            })(this, n);
    }
    run() {
        if (!this.active) return this.fn();
        let e = Ue,
            t = qe;
        for (; e; ) {
            if (e === this) return;
            e = e.parent;
        }
        try {
            return (
                (this.parent = Ue),
                (Ue = this),
                (qe = !0),
                (Fe = 1 << ++Le),
                Le <= 30
                    ? (({ deps: e }) => {
                          if (e.length)
                              for (let t = 0; t < e.length; t++) e[t].w |= Fe;
                      })(this)
                    : $e(this),
                this.fn()
            );
        } finally {
            Le <= 30 &&
                ((e) => {
                    const { deps: t } = e;
                    if (t.length) {
                        let n = 0;
                        for (let s = 0; s < t.length; s++) {
                            const o = t[s];
                            Re(o) && !Pe(o) ? o.delete(e) : (t[n++] = o),
                                (o.w &= ~Fe),
                                (o.n &= ~Fe);
                        }
                        t.length = n;
                    }
                })(this),
                (Fe = 1 << --Le),
                (Ue = this.parent),
                (qe = t),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        Ue === this
            ? (this.deferStop = !0)
            : this.active &&
              ($e(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function $e(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let qe = !0;
const Ve = [];
function He() {
    Ve.push(qe), (qe = !1);
}
function We() {
    const e = Ve.pop();
    qe = void 0 === e || e;
}
function ze(e, t, n) {
    if (qe && Ue) {
        let t = De.get(e);
        t || De.set(e, (t = new Map()));
        let s = t.get(n);
        s || t.set(n, (s = Ae())), Xe(s);
    }
}
function Xe(e, t) {
    let n = !1;
    Le <= 30 ? Pe(e) || ((e.n |= Fe), (n = !Re(e))) : (n = !e.has(Ue)),
        n && (e.add(Ue), Ue.deps.push(e));
}
function Je(e, t, n, s, o, i) {
    const r = De.get(e);
    if (!r) return;
    let a = [];
    if ("clear" === t) a = [...r.values()];
    else if ("length" === n && T(e)) {
        const e = Number(s);
        r.forEach((t, n) => {
            ("length" === n || n >= e) && a.push(t);
        });
    } else
        switch ((void 0 !== n && a.push(r.get(n)), t)) {
            case "add":
                T(e)
                    ? U(n) && a.push(r.get("length"))
                    : (a.push(r.get(Be)), I(e) && a.push(r.get(je)));
                break;
            case "delete":
                T(e) || (a.push(r.get(Be)), I(e) && a.push(r.get(je)));
                break;
            case "set":
                I(e) && a.push(r.get(Be));
        }
    if (1 === a.length) a[0] && Ke(a[0]);
    else {
        const e = [];
        for (const t of a) t && e.push(...t);
        Ke(Ae(e));
    }
}
function Ke(e, t) {
    const n = T(e) ? e : [...e];
    for (const s of n) s.computed && Ye(s);
    for (const s of n) s.computed || Ye(s);
}
function Ye(e, t) {
    (e !== Ue || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Qe = n("__proto__,__v_isRef,__isVue"),
    Ze = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => "arguments" !== e && "caller" !== e)
            .map((e) => Symbol[e])
            .filter(A)
    ),
    et = at(),
    nt = at(!1, !0),
    st = at(!0),
    ot = it();
function it() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...e) {
                const n = Ht(this);
                for (let t = 0, o = this.length; t < o; t++) ze(n, 0, t + "");
                const s = n[t](...e);
                return -1 === s || !1 === s ? n[t](...e.map(Ht)) : s;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...e) {
                He();
                const n = Ht(this)[t].apply(this, e);
                return We(), n;
            };
        }),
        e
    );
}
function rt(e) {
    const t = Ht(this);
    return ze(t, 0, e), t.hasOwnProperty(e);
}
function at(e = !1, t = !1) {
    return function (n, s, o) {
        if ("__v_isReactive" === s) return !e;
        if ("__v_isReadonly" === s) return e;
        if ("__v_isShallow" === s) return t;
        if ("__v_raw" === s && o === (e ? (t ? Lt : Dt) : t ? Pt : Rt).get(n))
            return n;
        const i = T(n);
        if (!e) {
            if (i && M(ot, s)) return Reflect.get(ot, s, o);
            if ("hasOwnProperty" === s) return rt;
        }
        const r = Reflect.get(n, s, o);
        return (A(s) ? Ze.has(s) : Qe(s))
            ? r
            : (e || ze(n, 0, s),
              t
                  ? r
                  : Yt(r)
                  ? i && U(s)
                      ? r
                      : r.value
                  : R(r)
                  ? e
                      ? Bt(r)
                      : Ut(r)
                  : r);
    };
}
function ct(e = !1) {
    return function (t, n, s, o) {
        let i = t[n];
        if ($t(i) && Yt(i) && !Yt(s)) return !1;
        if (
            !e &&
            (qt(s) || $t(s) || ((i = Ht(i)), (s = Ht(s))),
            !T(t) && Yt(i) && !Yt(s))
        )
            return (i.value = s), !0;
        const r = T(t) && U(n) ? Number(n) < t.length : M(t, n),
            a = Reflect.set(t, n, s, o);
        return (
            t === Ht(o) &&
                (r ? z(s, i) && Je(t, "set", n, s) : Je(t, "add", n, s)),
            a
        );
    };
}
const lt = {
        get: et,
        set: ct(),
        deleteProperty: function (e, t) {
            const n = M(e, t);
            e[t];
            const s = Reflect.deleteProperty(e, t);
            return s && n && Je(e, "delete", t, void 0), s;
        },
        has: function (e, t) {
            const n = Reflect.has(e, t);
            return (A(t) && Ze.has(t)) || ze(e, 0, t), n;
        },
        ownKeys: function (e) {
            return ze(e, 0, T(e) ? "length" : Be), Reflect.ownKeys(e);
        },
    },
    ut = { get: st, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    dt = w({}, lt, { get: nt, set: ct(!0) }),
    ht = (e) => e,
    pt = (e) => Reflect.getPrototypeOf(e);
function ft(e, t, n = !1, s = !1) {
    const o = Ht((e = e.__v_raw)),
        i = Ht(t);
    n || (t !== i && ze(o, 0, t), ze(o, 0, i));
    const { has: r } = pt(o),
        a = s ? ht : n ? Xt : zt;
    return r.call(o, t)
        ? a(e.get(t))
        : r.call(o, i)
        ? a(e.get(i))
        : void (e !== o && e.get(t));
}
function mt(e, t = !1) {
    const n = this.__v_raw,
        s = Ht(n),
        o = Ht(e);
    return (
        t || (e !== o && ze(s, 0, e), ze(s, 0, o)),
        e === o ? n.has(e) : n.has(e) || n.has(o)
    );
}
function gt(e, t = !1) {
    return (e = e.__v_raw), !t && ze(Ht(e), 0, Be), Reflect.get(e, "size", e);
}
function yt(e) {
    e = Ht(e);
    const t = Ht(this);
    return pt(t).has.call(t, e) || (t.add(e), Je(t, "add", e, e)), this;
}
function vt(e, t) {
    t = Ht(t);
    const n = Ht(this),
        { has: s, get: o } = pt(n);
    let i = s.call(n, e);
    i || ((e = Ht(e)), (i = s.call(n, e)));
    const r = o.call(n, e);
    return (
        n.set(e, t),
        i ? z(t, r) && Je(n, "set", e, t) : Je(n, "add", e, t),
        this
    );
}
function bt(e) {
    const t = Ht(this),
        { has: n, get: s } = pt(t);
    let o = n.call(t, e);
    o || ((e = Ht(e)), (o = n.call(t, e))), s && s.call(t, e);
    const i = t.delete(e);
    return o && Je(t, "delete", e, void 0), i;
}
function St() {
    const e = Ht(this),
        t = 0 !== e.size,
        n = e.clear();
    return t && Je(e, "clear", void 0, void 0), n;
}
function Et(e, t) {
    return function (n, s) {
        const o = this,
            i = o.__v_raw,
            r = Ht(i),
            a = t ? ht : e ? Xt : zt;
        return (
            !e && ze(r, 0, Be), i.forEach((e, t) => n.call(s, a(e), a(t), o))
        );
    };
}
function wt(e, t, n) {
    return function (...s) {
        const o = this.__v_raw,
            i = Ht(o),
            r = I(i),
            a = "entries" === e || (e === Symbol.iterator && r),
            c = "keys" === e && r,
            l = o[e](...s),
            u = n ? ht : t ? Xt : zt;
        return (
            !t && ze(i, 0, c ? je : Be),
            {
                next() {
                    const { value: e, done: t } = l.next();
                    return t
                        ? { value: e, done: t }
                        : { value: a ? [u(e[0]), u(e[1])] : u(e), done: t };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function Ct(e) {
    return function (...t) {
        return "delete" !== e && this;
    };
}
function _t() {
    const e = {
            get(e) {
                return ft(this, e);
            },
            get size() {
                return gt(this);
            },
            has: mt,
            add: yt,
            set: vt,
            delete: bt,
            clear: St,
            forEach: Et(!1, !1),
        },
        t = {
            get(e) {
                return ft(this, e, !1, !0);
            },
            get size() {
                return gt(this);
            },
            has: mt,
            add: yt,
            set: vt,
            delete: bt,
            clear: St,
            forEach: Et(!1, !0),
        },
        n = {
            get(e) {
                return ft(this, e, !0);
            },
            get size() {
                return gt(this, !0);
            },
            has(e) {
                return mt.call(this, e, !0);
            },
            add: Ct("add"),
            set: Ct("set"),
            delete: Ct("delete"),
            clear: Ct("clear"),
            forEach: Et(!0, !1),
        },
        s = {
            get(e) {
                return ft(this, e, !0, !0);
            },
            get size() {
                return gt(this, !0);
            },
            has(e) {
                return mt.call(this, e, !0);
            },
            add: Ct("add"),
            set: Ct("set"),
            delete: Ct("delete"),
            clear: Ct("clear"),
            forEach: Et(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
            (e[o] = wt(o, !1, !1)),
                (n[o] = wt(o, !0, !1)),
                (t[o] = wt(o, !1, !0)),
                (s[o] = wt(o, !0, !0));
        }),
        [e, n, t, s]
    );
}
const [Mt, Tt, It, kt] = _t();
function Ot(e, t) {
    const n = t ? (e ? kt : It) : e ? Tt : Mt;
    return (t, s, o) =>
        "__v_isReactive" === s
            ? !e
            : "__v_isReadonly" === s
            ? e
            : "__v_raw" === s
            ? t
            : Reflect.get(M(n, s) && s in t ? n : t, s, o);
}
const Nt = { get: Ot(!1, !1) },
    xt = { get: Ot(!1, !0) },
    At = { get: Ot(!0, !1) },
    Rt = new WeakMap(),
    Pt = new WeakMap(),
    Dt = new WeakMap(),
    Lt = new WeakMap();
function Ft(e) {
    return e.__v_skip || !Object.isExtensible(e)
        ? 0
        : (function (e) {
              switch (e) {
                  case "Object":
                  case "Array":
                      return 1;
                  case "Map":
                  case "Set":
                  case "WeakMap":
                  case "WeakSet":
                      return 2;
                  default:
                      return 0;
              }
          })(((e) => L(e).slice(8, -1))(e));
}
function Ut(e) {
    return $t(e) ? e : jt(e, !1, lt, Nt, Rt);
}
function Bt(e) {
    return jt(e, !0, ut, At, Dt);
}
function jt(e, t, n, s, o) {
    if (!R(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const i = o.get(e);
    if (i) return i;
    const r = Ft(e);
    if (0 === r) return e;
    const a = new Proxy(e, 2 === r ? s : n);
    return o.set(e, a), a;
}
function Gt(e) {
    return $t(e) ? Gt(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function $t(e) {
    return !(!e || !e.__v_isReadonly);
}
function qt(e) {
    return !(!e || !e.__v_isShallow);
}
function Vt(e) {
    return Gt(e) || $t(e);
}
function Ht(e) {
    const t = e && e.__v_raw;
    return t ? Ht(t) : e;
}
function Wt(e) {
    return J(e, "__v_skip", !0), e;
}
const zt = (e) => (R(e) ? Ut(e) : e),
    Xt = (e) => (R(e) ? Bt(e) : e);
function Jt(e) {
    qe && Ue && Xe((e = Ht(e)).dep || (e.dep = Ae()));
}
function Kt(e, t) {
    const n = (e = Ht(e)).dep;
    n && Ke(n);
}
function Yt(e) {
    return !(!e || !0 !== e.__v_isRef);
}
function Qt(e) {
    return Zt(e, !1);
}
function Zt(e, t) {
    return Yt(e) ? e : new en(e, t);
}
class en {
    constructor(e, t) {
        (this.__v_isShallow = t),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = t ? e : Ht(e)),
            (this._value = t ? e : zt(e));
    }
    get value() {
        return Jt(this), this._value;
    }
    set value(e) {
        const t = this.__v_isShallow || qt(e) || $t(e);
        (e = t ? e : Ht(e)),
            z(e, this._rawValue) &&
                ((this._rawValue = e), (this._value = t ? e : zt(e)), Kt(this));
    }
}
function tn(e) {
    return Yt(e) ? e.value : e;
}
const nn = {
    get: (e, t, n) => tn(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const o = e[t];
        return Yt(o) && !Yt(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function sn(e) {
    return Gt(e) ? e : new Proxy(e, nn);
}
var on;
class rn {
    constructor(e, t, n, s) {
        (this._setter = t),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this[on] = !1),
            (this._dirty = !0),
            (this.effect = new Ge(e, () => {
                this._dirty || ((this._dirty = !0), Kt(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !s),
            (this.__v_isReadonly = n);
    }
    get value() {
        const e = Ht(this);
        return (
            Jt(e),
            (!e._dirty && e._cacheable) ||
                ((e._dirty = !1), (e._value = e.effect.run())),
            e._value
        );
    }
    set value(e) {
        this._setter(e);
    }
}
function an(e, t, n, s) {
    let o;
    try {
        o = s ? e(...s) : e();
    } catch (i) {
        ln(i, t, n);
    }
    return o;
}
function cn(e, t, n, s) {
    if (N(e)) {
        const o = an(e, t, n, s);
        return (
            o &&
                P(o) &&
                o.catch((e) => {
                    ln(e, t, n);
                }),
            o
        );
    }
    const o = [];
    for (let i = 0; i < e.length; i++) o.push(cn(e[i], t, n, s));
    return o;
}
function ln(e, t, n, s = !0) {
    t && t.vnode;
    if (t) {
        let s = t.parent;
        const o = t.proxy,
            i = n;
        for (; s; ) {
            const t = s.ec;
            if (t)
                for (let n = 0; n < t.length; n++)
                    if (!1 === t[n](e, o, i)) return;
            s = s.parent;
        }
        const r = t.appContext.config.errorHandler;
        if (r) return void an(r, null, 10, [e, o, i]);
    }
    !(function (e, t, n, s = !0) {
        console.error(e);
    })(e, 0, 0, s);
}
on = "__v_isReadonly";
let un = !1,
    dn = !1;
const hn = [];
let pn = 0;
const fn = [];
let mn = null,
    gn = 0;
const yn = Promise.resolve();
let vn = null;
function bn(e) {
    const t = vn || yn;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sn(e) {
    (hn.length && hn.includes(e, un && e.allowRecurse ? pn + 1 : pn)) ||
        (null == e.id
            ? hn.push(e)
            : hn.splice(
                  (function (e) {
                      let t = pn + 1,
                          n = hn.length;
                      for (; t < n; ) {
                          const s = (t + n) >>> 1;
                          _n(hn[s]) < e ? (t = s + 1) : (n = s);
                      }
                      return t;
                  })(e.id),
                  0,
                  e
              ),
        En());
}
function En() {
    un || dn || ((dn = !0), (vn = yn.then(Tn)));
}
function wn(e, t = un ? pn + 1 : 0) {
    for (; t < hn.length; t++) {
        const e = hn[t];
        e && e.pre && (hn.splice(t, 1), t--, e());
    }
}
function Cn(e) {
    if (fn.length) {
        const e = [...new Set(fn)];
        if (((fn.length = 0), mn)) return void mn.push(...e);
        for (
            mn = e, mn.sort((e, t) => _n(e) - _n(t)), gn = 0;
            gn < mn.length;
            gn++
        )
            mn[gn]();
        (mn = null), (gn = 0);
    }
}
const _n = (e) => (null == e.id ? 1 / 0 : e.id),
    Mn = (e, t) => {
        const n = _n(e) - _n(t);
        if (0 === n) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return n;
    };
function Tn(e) {
    (dn = !1), (un = !0), hn.sort(Mn);
    try {
        for (pn = 0; pn < hn.length; pn++) {
            const e = hn[pn];
            e && !1 !== e.active && an(e, null, 14);
        }
    } finally {
        (pn = 0),
            (hn.length = 0),
            Cn(),
            (un = !1),
            (vn = null),
            (hn.length || fn.length) && Tn();
    }
}
function In(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || m;
    let o = n;
    const i = t.startsWith("update:"),
        r = i && t.slice(7);
    if (r && r in s) {
        const e = `${"modelValue" === r ? "model" : r}Modifiers`,
            { number: t, trim: i } = s[e] || m;
        i && (o = n.map((e) => (x(e) ? e.trim() : e))), t && (o = n.map(K));
    }
    let a,
        c = s[(a = W(t))] || s[(a = W($(t)))];
    !c && i && (c = s[(a = W(V(t)))]), c && cn(c, e, 6, kn(e, c, o));
    const l = s[a + "Once"];
    if (l) {
        if (e.emitted) {
            if (e.emitted[a]) return;
        } else e.emitted = {};
        (e.emitted[a] = !0), cn(l, e, 6, kn(e, l, o));
    }
}
function kn(e, t, n) {
    if (1 !== n.length) return n;
    if (N(t)) {
        if (t.length < 2) return n;
    } else if (!t.find((e) => e.length >= 2)) return n;
    const s = n[0];
    if (
        s &&
        M(s, "type") &&
        M(s, "timeStamp") &&
        M(s, "target") &&
        M(s, "currentTarget") &&
        M(s, "detail")
    ) {
        const t = e.proxy,
            s = t.$gcd(t, !0);
        s && n.push(s);
    }
    return n;
}
function On(e, t, n = !1) {
    const s = t.emitsCache,
        o = s.get(e);
    if (void 0 !== o) return o;
    const i = e.emits;
    let r = {},
        a = !1;
    if (!N(e)) {
        const s = (e) => {
            const n = On(e, t, !0);
            n && ((a = !0), w(r, n));
        };
        !n && t.mixins.length && t.mixins.forEach(s),
            e.extends && s(e.extends),
            e.mixins && e.mixins.forEach(s);
    }
    return i || a
        ? (T(i) ? i.forEach((e) => (r[e] = null)) : w(r, i),
          R(e) && s.set(e, r),
          r)
        : (R(e) && s.set(e, null), null);
}
function Nn(e, t) {
    return (
        !(!e || !S(t)) &&
        ((t = t.slice(2).replace(/Once$/, "")),
        M(e, t[0].toLowerCase() + t.slice(1)) || M(e, V(t)) || M(e, t))
    );
}
let xn = null,
    An = null;
function Rn(e) {
    const t = xn;
    return (xn = e), (An = (e && e.type.__scopeId) || null), t;
}
function Pn(e, t = xn, n) {
    if (!t) return e;
    if (e._n) return e;
    const s = (...n) => {
        s._d && Do(-1);
        const o = Rn(t);
        let i;
        try {
            i = e(...n);
        } finally {
            Rn(o), s._d && Do(1);
        }
        return i;
    };
    return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Dn(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: o,
        props: i,
        propsOptions: [r],
        slots: a,
        attrs: c,
        emit: l,
        render: u,
        renderCache: d,
        data: h,
        setupState: p,
        ctx: f,
        inheritAttrs: m,
    } = e;
    let g, y;
    const v = Rn(e);
    try {
        if (4 & n.shapeFlag) {
            const e = o || s;
            (g = Jo(u.call(e, e, d, i, p, h, f))), (y = c);
        } else {
            const e = t;
            0,
                (g = Jo(
                    e.length > 1
                        ? e(i, { attrs: c, slots: a, emit: l })
                        : e(i, null)
                )),
                (y = t.props ? c : Ln(c));
        }
    } catch (S) {
        (xo.length = 0), ln(S, e, 1), (g = Ho(Oo));
    }
    let b = g;
    if (y && !1 !== m) {
        const e = Object.keys(y),
            { shapeFlag: t } = b;
        e.length && 7 & t && (r && e.some(E) && (y = Fn(y, r)), (b = Wo(b, y)));
    }
    return (
        n.dirs &&
            ((b = Wo(b)), (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (b.transition = n.transition),
        (g = b),
        Rn(v),
        g
    );
}
const Ln = (e) => {
        let t;
        for (const n in e)
            ("class" === n || "style" === n || S(n)) &&
                ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Fn = (e, t) => {
        const n = {};
        for (const s in e) (E(s) && s.slice(9) in t) || (n[s] = e[s]);
        return n;
    };
function Un(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < s.length; o++) {
        const i = s[o];
        if (t[i] !== e[i] && !Nn(n, i)) return !0;
    }
    return !1;
}
const Bn = (e) => e.__isSuspense;
function jn(e, t) {
    if (ni) {
        let n = ni.provides;
        const s = ni.parent && ni.parent.provides;
        s === n && (n = ni.provides = Object.create(s)),
            (n[e] = t),
            "app" === ni.type.mpType && ni.appContext.app.provide(e, t);
    } else;
}
function Gn(e, t, n = !1) {
    const s = ni || xn;
    if (s) {
        const o =
            null == s.parent
                ? s.vnode.appContext && s.vnode.appContext.provides
                : s.parent.provides;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return n && N(t) ? t.call(s.proxy) : t;
    }
}
function $n(e, t) {
    return Hn(e, null, t);
}
const qn = {};
function Vn(e, t, n) {
    return Hn(e, t, n);
}
function Hn(
    e,
    t,
    { immediate: n, deep: s, flush: o, onTrack: i, onTrigger: r } = m
) {
    const a = Oe === (null == ni ? void 0 : ni.scope) ? ni : null;
    let c,
        l,
        u = !1,
        d = !1;
    if (
        (Yt(e)
            ? ((c = () => e.value), (u = qt(e)))
            : Gt(e)
            ? ((c = () => e), (s = !0))
            : T(e)
            ? ((d = !0),
              (u = e.some((e) => Gt(e) || qt(e))),
              (c = () =>
                  e.map((e) =>
                      Yt(e)
                          ? e.value
                          : Gt(e)
                          ? Xn(e)
                          : N(e)
                          ? an(e, a, 2)
                          : void 0
                  )))
            : (c = N(e)
                  ? t
                      ? () => an(e, a, 2)
                      : () => {
                            if (!a || !a.isUnmounted)
                                return l && l(), cn(e, a, 3, [p]);
                        }
                  : y),
        t && s)
    ) {
        const e = c;
        c = () => Xn(e());
    }
    let h,
        p = (e) => {
            l = b.onStop = () => {
                an(e, a, 4);
            };
        };
    if (ai) {
        if (
            ((p = y),
            t ? n && cn(t, a, 3, [c(), d ? [] : void 0, p]) : c(),
            "sync" !== o)
        )
            return y;
        {
            const e = mi();
            h = e.__watcherHandles || (e.__watcherHandles = []);
        }
    }
    let f = d ? new Array(e.length).fill(qn) : qn;
    const g = () => {
        if (b.active)
            if (t) {
                const e = b.run();
                (s || u || (d ? e.some((e, t) => z(e, f[t])) : z(e, f))) &&
                    (l && l(),
                    cn(t, a, 3, [
                        e,
                        f === qn ? void 0 : d && f[0] === qn ? [] : f,
                        p,
                    ]),
                    (f = e));
            } else b.run();
    };
    let v;
    (g.allowRecurse = !!t),
        "sync" === o
            ? (v = g)
            : "post" === o
            ? (v = () => Co(g, a && a.suspense))
            : ((g.pre = !0), a && (g.id = a.uid), (v = () => Sn(g)));
    const b = new Ge(c, v);
    t
        ? n
            ? g()
            : (f = b.run())
        : "post" === o
        ? Co(b.run.bind(b), a && a.suspense)
        : b.run();
    const S = () => {
        b.stop(), a && a.scope && C(a.scope.effects, b);
    };
    return h && h.push(S), S;
}
function Wn(e, t, n) {
    const s = this.proxy,
        o = x(e) ? (e.includes(".") ? zn(s, e) : () => s[e]) : e.bind(s, s);
    let i;
    N(t) ? (i = t) : ((i = t.handler), (n = t));
    const r = ni;
    oi(this);
    const a = Hn(o, i.bind(s), n);
    return r ? oi(r) : ii(), a;
}
function zn(e, t) {
    const n = t.split(".");
    return () => {
        let t = e;
        for (let e = 0; e < n.length && t; e++) t = t[n[e]];
        return t;
    };
}
function Xn(e, t) {
    if (!R(e) || e.__v_skip) return e;
    if ((t = t || new Set()).has(e)) return e;
    if ((t.add(e), Yt(e))) Xn(e.value, t);
    else if (T(e)) for (let n = 0; n < e.length; n++) Xn(e[n], t);
    else if (k(e) || I(e))
        e.forEach((e) => {
            Xn(e, t);
        });
    else if (F(e)) for (const n in e) Xn(e[n], t);
    return e;
}
const Jn = [Function, Array],
    Kn = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: Jn,
        onEnter: Jn,
        onAfterEnter: Jn,
        onEnterCancelled: Jn,
        onBeforeLeave: Jn,
        onLeave: Jn,
        onAfterLeave: Jn,
        onLeaveCancelled: Jn,
        onBeforeAppear: Jn,
        onAppear: Jn,
        onAfterAppear: Jn,
        onAppearCancelled: Jn,
    },
    Yn = {
        name: "BaseTransition",
        props: Kn,
        setup(e, { slots: t }) {
            const n = si(),
                s = (function () {
                    const e = {
                        isMounted: !1,
                        isLeaving: !1,
                        isUnmounting: !1,
                        leavingVNodes: new Map(),
                    };
                    return (
                        Ms(() => {
                            e.isMounted = !0;
                        }),
                        ks(() => {
                            e.isUnmounting = !0;
                        }),
                        e
                    );
                })();
            let o;
            return () => {
                const i = t.default && ss(t.default(), !0);
                if (!i || !i.length) return;
                let r = i[0];
                if (i.length > 1)
                    for (const e of i)
                        if (e.type !== Oo) {
                            r = e;
                            break;
                        }
                const a = Ht(e),
                    { mode: c } = a;
                if (s.isLeaving) return es(r);
                const l = ts(r);
                if (!l) return es(r);
                const u = Zn(l, a, s, n);
                ns(l, u);
                const d = n.subTree,
                    h = d && ts(d);
                let p = !1;
                const { getTransitionKey: f } = l.type;
                if (f) {
                    const e = f();
                    void 0 === o ? (o = e) : e !== o && ((o = e), (p = !0));
                }
                if (h && h.type !== Oo && (!jo(l, h) || p)) {
                    const e = Zn(h, a, s, n);
                    if ((ns(h, e), "out-in" === c))
                        return (
                            (s.isLeaving = !0),
                            (e.afterLeave = () => {
                                (s.isLeaving = !1),
                                    !1 !== n.update.active && n.update();
                            }),
                            es(r)
                        );
                    "in-out" === c &&
                        l.type !== Oo &&
                        (e.delayLeave = (e, t, n) => {
                            (Qn(s, h)[String(h.key)] = h),
                                (e._leaveCb = () => {
                                    t(),
                                        (e._leaveCb = void 0),
                                        delete u.delayedLeave;
                                }),
                                (u.delayedLeave = n);
                        });
                }
                return r;
            };
        },
    };
function Qn(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Zn(e, t, n, s) {
    const {
            appear: o,
            mode: i,
            persisted: r = !1,
            onBeforeEnter: a,
            onEnter: c,
            onAfterEnter: l,
            onEnterCancelled: u,
            onBeforeLeave: d,
            onLeave: h,
            onAfterLeave: p,
            onLeaveCancelled: f,
            onBeforeAppear: m,
            onAppear: g,
            onAfterAppear: y,
            onAppearCancelled: v,
        } = t,
        b = String(e.key),
        S = Qn(n, e),
        E = (e, t) => {
            e && cn(e, s, 9, t);
        },
        w = (e, t) => {
            const n = t[1];
            E(e, t),
                T(e)
                    ? e.every((e) => e.length <= 1) && n()
                    : e.length <= 1 && n();
        },
        C = {
            mode: i,
            persisted: r,
            beforeEnter(t) {
                let s = a;
                if (!n.isMounted) {
                    if (!o) return;
                    s = m || a;
                }
                t._leaveCb && t._leaveCb(!0);
                const i = S[b];
                i && jo(e, i) && i.el._leaveCb && i.el._leaveCb(), E(s, [t]);
            },
            enter(e) {
                let t = c,
                    s = l,
                    i = u;
                if (!n.isMounted) {
                    if (!o) return;
                    (t = g || c), (s = y || l), (i = v || u);
                }
                let r = !1;
                const a = (e._enterCb = (t) => {
                    r ||
                        ((r = !0),
                        E(t ? i : s, [e]),
                        C.delayedLeave && C.delayedLeave(),
                        (e._enterCb = void 0));
                });
                t ? w(t, [e, a]) : a();
            },
            leave(t, s) {
                const o = String(e.key);
                if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return s();
                E(d, [t]);
                let i = !1;
                const r = (t._leaveCb = (n) => {
                    i ||
                        ((i = !0),
                        s(),
                        E(n ? f : p, [t]),
                        (t._leaveCb = void 0),
                        S[o] === e && delete S[o]);
                });
                (S[o] = e), h ? w(h, [t, r]) : r();
            },
            clone: (e) => Zn(e, t, n, s),
        };
    return C;
}
function es(e) {
    if (cs(e)) return ((e = Wo(e)).children = null), e;
}
function ts(e) {
    return cs(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ns(e, t) {
    6 & e.shapeFlag && e.component
        ? ns(e.component.subTree, t)
        : 128 & e.shapeFlag
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function ss(e, t = !1, n) {
    let s = [],
        o = 0;
    for (let i = 0; i < e.length; i++) {
        let r = e[i];
        const a =
            null == n ? r.key : String(n) + String(null != r.key ? r.key : i);
        r.type === Io
            ? (128 & r.patchFlag && o++, (s = s.concat(ss(r.children, t, a))))
            : (t || r.type !== Oo) && s.push(null != a ? Wo(r, { key: a }) : r);
    }
    if (o > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
    return s;
}
function os(e) {
    return N(e) ? { setup: e, name: e.name } : e;
}
const is = (e) => !!e.type.__asyncLoader;
function rs(e) {
    N(e) && (e = { loader: e });
    const {
        loader: t,
        loadingComponent: n,
        errorComponent: s,
        delay: o = 200,
        timeout: i,
        suspensible: r = !0,
        onError: a,
    } = e;
    let c,
        l = null,
        u = 0;
    const d = () => {
        let e;
        return (
            l ||
            (e = l =
                t()
                    .catch((e) => {
                        if (
                            ((e =
                                e instanceof Error ? e : new Error(String(e))),
                            a)
                        )
                            return new Promise((t, n) => {
                                a(
                                    e,
                                    () => t((u++, (l = null), d())),
                                    () => n(e),
                                    u + 1
                                );
                            });
                        throw e;
                    })
                    .then((t) =>
                        e !== l && l
                            ? l
                            : (t &&
                                  (t.__esModule ||
                                      "Module" === t[Symbol.toStringTag]) &&
                                  (t = t.default),
                              (c = t),
                              t)
                    ))
        );
    };
    return os({
        name: "AsyncComponentWrapper",
        __asyncLoader: d,
        get __asyncResolved() {
            return c;
        },
        setup() {
            const e = ni;
            if (c) return () => as(c, e);
            const t = (t) => {
                (l = null), ln(t, e, 13, !s);
            };
            if ((r && e.suspense) || ai)
                return d()
                    .then((t) => () => as(t, e))
                    .catch(
                        (e) => (t(e), () => (s ? Ho(s, { error: e }) : null))
                    );
            const a = Qt(!1),
                u = Qt(),
                h = Qt(!!o);
            return (
                o &&
                    setTimeout(() => {
                        h.value = !1;
                    }, o),
                null != i &&
                    setTimeout(() => {
                        if (!a.value && !u.value) {
                            const e = new Error(
                                `Async component timed out after ${i}ms.`
                            );
                            t(e), (u.value = e);
                        }
                    }, i),
                d()
                    .then(() => {
                        (a.value = !0),
                            e.parent &&
                                cs(e.parent.vnode) &&
                                Sn(e.parent.update);
                    })
                    .catch((e) => {
                        t(e), (u.value = e);
                    }),
                () =>
                    a.value && c
                        ? as(c, e)
                        : u.value && s
                        ? Ho(s, { error: u.value })
                        : n && !h.value
                        ? Ho(n)
                        : void 0
            );
        },
    });
}
function as(e, t) {
    const { ref: n, props: s, children: o, ce: i } = t.vnode,
        r = Ho(e, s, o);
    return (r.ref = n), (r.ce = i), delete t.vnode.ce, r;
}
const cs = (e) => e.type.__isKeepAlive;
class ls {
    constructor(e) {
        (this.max = e),
            (this._cache = new Map()),
            (this._keys = new Set()),
            (this._max = parseInt(e, 10));
    }
    get(e) {
        const { _cache: t, _keys: n, _max: s } = this,
            o = t.get(e);
        if (o) n.delete(e), n.add(e);
        else if ((n.add(e), s && n.size > s)) {
            const e = n.values().next().value;
            this.pruneCacheEntry(t.get(e)), this.delete(e);
        }
        return o;
    }
    set(e, t) {
        this._cache.set(e, t);
    }
    delete(e) {
        this._cache.delete(e), this._keys.delete(e);
    }
    forEach(e, t) {
        this._cache.forEach(e.bind(t));
    }
}
const us = {
        name: "KeepAlive",
        __isKeepAlive: !0,
        props: {
            include: [String, RegExp, Array],
            exclude: [String, RegExp, Array],
            max: [String, Number],
            matchBy: { type: String, default: "name" },
            cache: Object,
        },
        setup(e, { slots: t }) {
            const n = si(),
                s = n.ctx;
            if (!s.renderer)
                return () => {
                    const e = t.default && t.default();
                    return e && 1 === e.length ? e[0] : e;
                };
            const o = e.cache || new ls(e.max);
            o.pruneCacheEntry = r;
            let i = null;
            function r(t) {
                var s;
                !i || !jo(t, i) || ("key" === e.matchBy && t.key !== i.key)
                    ? (ys((s = t)), u(s, n, a, !0))
                    : i && ys(i);
            }
            const a = n.suspense,
                {
                    renderer: {
                        p: c,
                        m: l,
                        um: u,
                        o: { createElement: d },
                    },
                } = s,
                h = d("div");
            function p(t) {
                o.forEach((n, s) => {
                    const i = bs(n, e.matchBy);
                    !i || (t && t(i)) || (o.delete(s), r(n));
                });
            }
            (s.activate = (e, t, n, s, o) => {
                const i = e.component;
                if (i.ba) {
                    const e = i.isDeactivated;
                    (i.isDeactivated = !1), X(i.ba), (i.isDeactivated = e);
                }
                l(e, t, n, 0, a),
                    c(i.vnode, e, t, n, i, a, s, e.slotScopeIds, o),
                    Co(() => {
                        (i.isDeactivated = !1), i.a && X(i.a);
                        const t = e.props && e.props.onVnodeMounted;
                        t && Zo(t, i.parent, e);
                    }, a);
            }),
                (s.deactivate = (e) => {
                    const t = e.component;
                    t.bda && Ss(t.bda),
                        l(e, h, null, 1, a),
                        Co(() => {
                            t.bda && Es(t.bda), t.da && X(t.da);
                            const n = e.props && e.props.onVnodeUnmounted;
                            n && Zo(n, t.parent, e), (t.isDeactivated = !0);
                        }, a);
                }),
                Vn(
                    () => [e.include, e.exclude, e.matchBy],
                    ([e, t]) => {
                        e && p((t) => hs(e, t)), t && p((e) => !hs(t, e));
                    },
                    { flush: "post", deep: !0 }
                );
            let f = null;
            const m = () => {
                null != f && o.set(f, vs(n.subTree));
            };
            return (
                Ms(m),
                Is(m),
                ks(() => {
                    o.forEach((t, s) => {
                        o.delete(s), r(t);
                        const { subTree: i, suspense: a } = n,
                            c = vs(i);
                        if (
                            t.type !== c.type ||
                            ("key" === e.matchBy && t.key !== c.key)
                        );
                        else {
                            c.component.bda && X(c.component.bda), ys(c);
                            const e = c.component.da;
                            e && Co(e, a);
                        }
                    });
                }),
                () => {
                    if (((f = null), !t.default)) return null;
                    const n = t.default(),
                        s = n[0];
                    if (n.length > 1) return (i = null), n;
                    if (!Bo(s) || (!(4 & s.shapeFlag) && !Bn(s.type)))
                        return (i = null), s;
                    let r = vs(s);
                    const a = r.type,
                        c = bs(r, e.matchBy),
                        { include: l, exclude: u } = e;
                    if ((l && (!c || !hs(l, c))) || (u && c && hs(u, c)))
                        return (i = r), s;
                    const d = null == r.key ? a : r.key,
                        h = o.get(d);
                    return (
                        r.el && ((r = Wo(r)), Bn(s.type) && (s.ssContent = r)),
                        (f = d),
                        h &&
                            ((r.el = h.el),
                            (r.component = h.component),
                            r.transition && ns(r, r.transition),
                            (r.shapeFlag |= 512)),
                        (r.shapeFlag |= 256),
                        (i = r),
                        Bn(s.type) ? s : r
                    );
                }
            );
        },
    },
    ds = us;
function hs(e, t) {
    return T(e)
        ? e.some((e) => hs(e, t))
        : x(e)
        ? e.split(",").includes(t)
        : !!e.test && e.test(t);
}
function ps(e, t) {
    ms(e, "a", t);
}
function fs(e, t) {
    ms(e, "da", t);
}
function ms(e, t, n = ni) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let t = n;
            for (; t; ) {
                if (t.isDeactivated) return;
                t = t.parent;
            }
            return e();
        });
    if (((s.__called = !1), ws(t, s, n), n)) {
        let e = n.parent;
        for (; e && e.parent; )
            cs(e.parent.vnode) && gs(s, t, n, e), (e = e.parent);
    }
}
function gs(e, t, n, s) {
    const o = ws(t, e, s, !0);
    Os(() => {
        C(s[t], o);
    }, n);
}
function ys(e) {
    (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function vs(e) {
    return Bn(e.type) ? e.ssContent : e;
}
function bs(e, t) {
    if ("name" === t) {
        const t = e.type;
        return di(is(e) ? t.__asyncResolved || {} : t);
    }
    return String(e.key);
}
function Ss(e) {
    for (let t = 0; t < e.length; t++) {
        const n = e[t];
        n.__called || (n(), (n.__called = !0));
    }
}
function Es(e) {
    e.forEach((e) => (e.__called = !1));
}
function ws(e, t, n = ni, s = !1) {
    if (n) {
        if (((o = e), Se.indexOf(o) > -1 && n.$pageInstance)) {
            if (n.type.__reserved) return;
            if (
                n !== n.$pageInstance &&
                ((n = n.$pageInstance),
                (function (e) {
                    return Ee.indexOf(e) > -1;
                })(e))
            ) {
                const s = n.proxy;
                cn(t.bind(s), n, e, "onLoad" === e ? [s.$page.options] : []);
            }
        }
        const i = n[e] || (n[e] = []),
            r =
                t.__weh ||
                (t.__weh = (...s) => {
                    if (n.isUnmounted) return;
                    He(), oi(n);
                    const o = cn(t, n, e, s);
                    return ii(), We(), o;
                });
        return s ? i.unshift(r) : i.push(r), r;
    }
    var o;
}
const Cs =
        (e) =>
        (t, n = ni) =>
            (!ai || "sp" === e) && ws(e, (...e) => t(...e), n),
    _s = Cs("bm"),
    Ms = Cs("m"),
    Ts = Cs("bu"),
    Is = Cs("u"),
    ks = Cs("bum"),
    Os = Cs("um"),
    Ns = Cs("sp"),
    xs = Cs("rtg"),
    As = Cs("rtc");
function Rs(e, t = ni) {
    ws("ec", e, t);
}
function Ps(e, t) {
    const n = xn;
    if (null === n) return e;
    const s = ui(n) || n.proxy,
        o = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let [e, n, r, a = m] = t[i];
        e &&
            (N(e) && (e = { mounted: e, updated: e }),
            e.deep && Xn(n),
            o.push({
                dir: e,
                instance: s,
                value: n,
                oldValue: void 0,
                arg: r,
                modifiers: a,
            }));
    }
    return e;
}
function Ds(e, t, n, s) {
    const o = e.dirs,
        i = t && t.dirs;
    for (let r = 0; r < o.length; r++) {
        const a = o[r];
        i && (a.oldValue = i[r].value);
        let c = a.dir[s];
        c && (He(), cn(c, n, 8, [e.el, a, e, t]), We());
    }
}
function Ls(e, t) {
    return Bs("components", e, !0, t) || e;
}
const Fs = Symbol();
function Us(e) {
    return x(e) ? Bs("components", e, !1) || e : e || Fs;
}
function Bs(e, t, n = !0, s = !1) {
    const o = xn || ni;
    if (o) {
        const n = o.type;
        if ("components" === e) {
            const e = di(n, !1);
            if (e && (e === t || e === $(t) || e === H($(t)))) return n;
        }
        const i = js(o[e] || n[e], t) || js(o.appContext[e], t);
        return !i && s ? n : i;
    }
}
function js(e, t) {
    return e && (e[t] || e[$(t)] || e[H($(t))]);
}
function Gs(e, t, n, s) {
    let o;
    const i = n && n[s];
    if (T(e) || x(e)) {
        o = new Array(e.length);
        for (let n = 0, s = e.length; n < s; n++)
            o[n] = t(e[n], n, void 0, i && i[n]);
    } else if ("number" == typeof e) {
        o = new Array(e);
        for (let n = 0; n < e; n++) o[n] = t(n + 1, n, void 0, i && i[n]);
    } else if (R(e))
        if (e[Symbol.iterator])
            o = Array.from(e, (e, n) => t(e, n, void 0, i && i[n]));
        else {
            const n = Object.keys(e);
            o = new Array(n.length);
            for (let s = 0, r = n.length; s < r; s++) {
                const r = n[s];
                o[s] = t(e[r], r, s, i && i[s]);
            }
        }
    else o = [];
    return n && (n[s] = o), o;
}
function $s(e, t, n = {}, s, o) {
    if (xn.isCE || (xn.parent && is(xn.parent) && xn.parent.isCE))
        return "default" !== t && (n.name = t), Ho("slot", n, s && s());
    let i = e[t];
    i && i._c && (i._d = !1), Ro();
    const r = i && qs(i(n)),
        a = Uo(
            Io,
            { key: n.key || (r && r.key) || `_${t}` },
            r || (s ? s() : []),
            r && 1 === e._ ? 64 : -2
        );
    return (
        !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
        i && i._c && (i._d = !0),
        a
    );
}
function qs(e) {
    return e.some(
        (e) => !Bo(e) || (e.type !== Oo && !(e.type === Io && !qs(e.children)))
    )
        ? e
        : null;
}
const Vs = (e) => (e ? (ri(e) ? ui(e) || e.proxy : Vs(e.parent)) : null),
    Hs = w(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Vs(e.parent),
        $root: (e) => Vs(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Qs(e),
        $forceUpdate: (e) => e.f || (e.f = () => Sn(e.update)),
        $nextTick: (e) => e.n || (e.n = bn.bind(e.proxy)),
        $watch: (e) => Wn.bind(e),
    }),
    Ws = (e, t) => e !== m && !e.__isScriptSetup && M(e, t),
    zs = {
        get({ _: e }, t) {
            const {
                ctx: n,
                setupState: s,
                data: o,
                props: i,
                accessCache: r,
                type: a,
                appContext: c,
            } = e;
            let l;
            if ("$" !== t[0]) {
                const a = r[t];
                if (void 0 !== a)
                    switch (a) {
                        case 1:
                            return s[t];
                        case 2:
                            return o[t];
                        case 4:
                            return n[t];
                        case 3:
                            return i[t];
                    }
                else {
                    if (Ws(s, t)) return (r[t] = 1), s[t];
                    if (o !== m && M(o, t)) return (r[t] = 2), o[t];
                    if ((l = e.propsOptions[0]) && M(l, t))
                        return (r[t] = 3), i[t];
                    if (n !== m && M(n, t)) return (r[t] = 4), n[t];
                    Xs && (r[t] = 0);
                }
            }
            const u = Hs[t];
            let d, h;
            return u
                ? ("$attrs" === t && ze(e, 0, t), u(e))
                : (d = a.__cssModules) && (d = d[t])
                ? d
                : n !== m && M(n, t)
                ? ((r[t] = 4), n[t])
                : ((h = c.config.globalProperties), M(h, t) ? h[t] : void 0);
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: o, ctx: i } = e;
            return Ws(o, t)
                ? ((o[t] = n), !0)
                : s !== m && M(s, t)
                ? ((s[t] = n), !0)
                : !M(e.props, t) &&
                  ("$" !== t[0] || !(t.slice(1) in e)) &&
                  ((i[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: s,
                    appContext: o,
                    propsOptions: i,
                },
            },
            r
        ) {
            let a;
            return (
                !!n[r] ||
                (e !== m && M(e, r)) ||
                Ws(t, r) ||
                ((a = i[0]) && M(a, r)) ||
                M(s, r) ||
                M(Hs, r) ||
                M(o.config.globalProperties, r)
            );
        },
        defineProperty(e, t, n) {
            return (
                null != n.get
                    ? (e._.accessCache[t] = 0)
                    : M(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
let Xs = !0;
function Js(e) {
    const t = Qs(e),
        n = e.proxy,
        s = e.ctx;
    (Xs = !1), t.beforeCreate && Ks(t.beforeCreate, e, "bc");
    const {
        data: o,
        computed: i,
        methods: r,
        watch: a,
        provide: c,
        inject: l,
        created: u,
        beforeMount: d,
        mounted: h,
        beforeUpdate: p,
        updated: f,
        activated: m,
        deactivated: g,
        beforeDestroy: v,
        beforeUnmount: b,
        destroyed: S,
        unmounted: E,
        render: w,
        renderTracked: C,
        renderTriggered: _,
        errorCaptured: M,
        serverPrefetch: I,
        expose: k,
        inheritAttrs: O,
        components: x,
        directives: A,
        filters: P,
    } = t;
    if (
        (l &&
            (function (e, t, n = y, s = !1) {
                T(e) && (e = no(e));
                for (const o in e) {
                    const n = e[o];
                    let i;
                    (i = R(n)
                        ? "default" in n
                            ? Gn(n.from || o, n.default, !0)
                            : Gn(n.from || o)
                        : Gn(n)),
                        Yt(i) && s
                            ? Object.defineProperty(t, o, {
                                  enumerable: !0,
                                  configurable: !0,
                                  get: () => i.value,
                                  set: (e) => (i.value = e),
                              })
                            : (t[o] = i);
                }
            })(l, s, null, e.appContext.config.unwrapInjectedRef),
        r)
    )
        for (const y in r) {
            const e = r[y];
            N(e) && (s[y] = e.bind(n));
        }
    if (o) {
        const t = o.call(n, n);
        R(t) && (e.data = Ut(t));
    }
    if (((Xs = !0), i))
        for (const T in i) {
            const e = i[T],
                t = N(e) ? e.bind(n, n) : N(e.get) ? e.get.bind(n, n) : y,
                o = !N(e) && N(e.set) ? e.set.bind(n) : y,
                r = hi({ get: t, set: o });
            Object.defineProperty(s, T, {
                enumerable: !0,
                configurable: !0,
                get: () => r.value,
                set: (e) => (r.value = e),
            });
        }
    if (a) for (const y in a) Ys(a[y], s, n, y);
    if (c) {
        const e = N(c) ? c.call(n) : c;
        Reflect.ownKeys(e).forEach((t) => {
            jn(t, e[t]);
        });
    }
    function D(e, t) {
        T(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
    }
    if (
        (u && Ks(u, e, "c"),
        D(_s, d),
        D(Ms, h),
        D(Ts, p),
        D(Is, f),
        D(ps, m),
        D(fs, g),
        D(Rs, M),
        D(As, C),
        D(xs, _),
        D(ks, b),
        D(Os, E),
        D(Ns, I),
        T(k))
    )
        if (k.length) {
            const t = e.exposed || (e.exposed = {});
            k.forEach((e) => {
                Object.defineProperty(t, e, {
                    get: () => n[e],
                    set: (t) => (n[e] = t),
                });
            });
        } else e.exposed || (e.exposed = {});
    w && e.render === y && (e.render = w),
        null != O && (e.inheritAttrs = O),
        x && (e.components = x),
        A && (e.directives = A);
    const L = e.appContext.config.globalProperties.$applyOptions;
    L && L(t, e, n);
}
function Ks(e, t, n) {
    cn(T(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ys(e, t, n, s) {
    const o = s.includes(".") ? zn(n, s) : () => n[s];
    if (x(e)) {
        const n = t[e];
        N(n) && Vn(o, n);
    } else if (N(e)) Vn(o, e.bind(n));
    else if (R(e))
        if (T(e)) e.forEach((e) => Ys(e, t, n, s));
        else {
            const s = N(e.handler) ? e.handler.bind(n) : t[e.handler];
            N(s) && Vn(o, s, e);
        }
}
function Qs(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: o,
            optionsCache: i,
            config: { optionMergeStrategies: r },
        } = e.appContext,
        a = i.get(t);
    let c;
    return (
        a
            ? (c = a)
            : o.length || n || s
            ? ((c = {}),
              o.length && o.forEach((e) => Zs(c, e, r, !0)),
              Zs(c, t, r))
            : (c = t),
        R(t) && i.set(t, c),
        c
    );
}
function Zs(e, t, n, s = !1) {
    const { mixins: o, extends: i } = t;
    i && Zs(e, i, n, !0), o && o.forEach((t) => Zs(e, t, n, !0));
    for (const r in t)
        if (s && "expose" === r);
        else {
            const s = eo[r] || (n && n[r]);
            e[r] = s ? s(e[r], t[r]) : t[r];
        }
    return e;
}
const eo = {
    data: to,
    props: oo,
    emits: oo,
    methods: oo,
    computed: oo,
    beforeCreate: so,
    created: so,
    beforeMount: so,
    mounted: so,
    beforeUpdate: so,
    updated: so,
    beforeDestroy: so,
    beforeUnmount: so,
    destroyed: so,
    unmounted: so,
    activated: so,
    deactivated: so,
    errorCaptured: so,
    serverPrefetch: so,
    components: oo,
    directives: oo,
    watch: function (e, t) {
        if (!e) return t;
        if (!t) return e;
        const n = w(Object.create(null), e);
        for (const s in t) n[s] = so(e[s], t[s]);
        return n;
    },
    provide: to,
    inject: function (e, t) {
        return oo(no(e), no(t));
    },
};
function to(e, t) {
    return t
        ? e
            ? function () {
                  return w(
                      N(e) ? e.call(this, this) : e,
                      N(t) ? t.call(this, this) : t
                  );
              }
            : t
        : e;
}
function no(e) {
    if (T(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function so(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function oo(e, t) {
    return e ? w(w(Object.create(null), e), t) : t;
}
function io(e, t, n, s = !1) {
    const o = {},
        i = {};
    J(i, Go, 1), (e.propsDefaults = Object.create(null)), ro(e, t, o, i);
    for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
    n
        ? (e.props = s ? o : jt(o, !1, dt, xt, Pt))
        : e.type.props
        ? (e.props = o)
        : (e.props = i),
        (e.attrs = i);
}
function ro(e, t, n, s) {
    const [o, i] = e.propsOptions;
    let r,
        a = !1;
    if (t)
        for (let c in t) {
            if (B(c)) continue;
            const l = t[c];
            let u;
            o && M(o, (u = $(c)))
                ? i && i.includes(u)
                    ? ((r || (r = {}))[u] = l)
                    : (n[u] = l)
                : Nn(e.emitsOptions, c) ||
                  (c in s && l === s[c]) ||
                  ((s[c] = l), (a = !0));
        }
    if (i) {
        const t = Ht(n),
            s = r || m;
        for (let r = 0; r < i.length; r++) {
            const a = i[r];
            n[a] = ao(o, t, a, s[a], e, !M(s, a));
        }
    }
    return a;
}
function ao(e, t, n, s, o, i) {
    const r = e[n];
    if (null != r) {
        const e = M(r, "default");
        if (e && void 0 === s) {
            const e = r.default;
            if (r.type !== Function && N(e)) {
                const { propsDefaults: i } = o;
                n in i
                    ? (s = i[n])
                    : (oi(o), (s = i[n] = e.call(null, t)), ii());
            } else s = e;
        }
        r[0] &&
            (i && !e
                ? (s = !1)
                : !r[1] || ("" !== s && s !== V(n)) || (s = !0));
    }
    return s;
}
function co(e, t, n = !1) {
    const s = t.propsCache,
        o = s.get(e);
    if (o) return o;
    const i = e.props,
        r = {},
        a = [];
    let c = !1;
    if (!N(e)) {
        const s = (e) => {
            c = !0;
            const [n, s] = co(e, t, !0);
            w(r, n), s && a.push(...s);
        };
        !n && t.mixins.length && t.mixins.forEach(s),
            e.extends && s(e.extends),
            e.mixins && e.mixins.forEach(s);
    }
    if (!i && !c) return R(e) && s.set(e, g), g;
    if (T(i))
        for (let u = 0; u < i.length; u++) {
            const e = $(i[u]);
            lo(e) && (r[e] = m);
        }
    else if (i)
        for (const u in i) {
            const e = $(u);
            if (lo(e)) {
                const t = i[u],
                    n = (r[e] =
                        T(t) || N(t) ? { type: t } : Object.assign({}, t));
                if (n) {
                    const t = po(Boolean, n.type),
                        s = po(String, n.type);
                    (n[0] = t > -1),
                        (n[1] = s < 0 || t < s),
                        (t > -1 || M(n, "default")) && a.push(e);
                }
            }
        }
    const l = [r, a];
    return R(e) && s.set(e, l), l;
}
function lo(e) {
    return "$" !== e[0];
}
function uo(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : null === e ? "null" : "";
}
function ho(e, t) {
    return uo(e) === uo(t);
}
function po(e, t) {
    return T(t) ? t.findIndex((t) => ho(t, e)) : N(t) && ho(t, e) ? 0 : -1;
}
const fo = (e) => "_" === e[0] || "$stable" === e,
    mo = (e) => (T(e) ? e.map(Jo) : [Jo(e)]),
    go = (e, t, n) => {
        if (t._n) return t;
        const s = Pn((...e) => mo(t(...e)), n);
        return (s._c = !1), s;
    },
    yo = (e, t, n) => {
        const s = e._ctx;
        for (const o in e) {
            if (fo(o)) continue;
            const n = e[o];
            if (N(n)) t[o] = go(0, n, s);
            else if (null != n) {
                const e = mo(n);
                t[o] = () => e;
            }
        }
    },
    vo = (e, t) => {
        const n = mo(t);
        e.slots.default = () => n;
    };
function bo() {
    return {
        app: null,
        config: {
            isNativeTag: v,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let So = 0;
function Eo(e, t) {
    return function (n, s = null) {
        N(n) || (n = Object.assign({}, n)), null == s || R(s) || (s = null);
        const o = bo(),
            i = new Set();
        let r = !1;
        const a = (o.app = {
            _uid: So++,
            _component: n,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: gi,
            get config() {
                return o.config;
            },
            set config(e) {},
            use: (e, ...t) => (
                i.has(e) ||
                    (e && N(e.install)
                        ? (i.add(e), e.install(a, ...t))
                        : N(e) && (i.add(e), e(a, ...t))),
                a
            ),
            mixin: (e) => (o.mixins.includes(e) || o.mixins.push(e), a),
            component: (e, t) =>
                t ? ((o.components[e] = t), a) : o.components[e],
            directive: (e, t) =>
                t ? ((o.directives[e] = t), a) : o.directives[e],
            mount(i, c, l) {
                if (!r) {
                    const u = Ho(n, s);
                    return (
                        (u.appContext = o),
                        c && t ? t(u, i) : e(u, i, l),
                        (r = !0),
                        (a._container = i),
                        (i.__vue_app__ = a),
                        (a._instance = u.component),
                        ui(u.component) || u.component.proxy
                    );
                }
            },
            unmount() {
                r && (e(null, a._container), delete a._container.__vue_app__);
            },
            provide: (e, t) => ((o.provides[e] = t), a),
        });
        return a;
    };
}
function wo(e, t, n, s, o = !1) {
    if (T(e))
        return void e.forEach((e, i) => wo(e, t && (T(t) ? t[i] : t), n, s, o));
    if (is(s) && !o) return;
    const i = 4 & s.shapeFlag ? ui(s.component) || s.component.proxy : s.el,
        r = o ? null : i,
        { i: a, r: c } = e,
        l = t && t.r,
        u = a.refs === m ? (a.refs = {}) : a.refs,
        d = a.setupState;
    if (
        (null != l &&
            l !== c &&
            (x(l)
                ? ((u[l] = null), M(d, l) && (d[l] = null))
                : Yt(l) && (l.value = null)),
        N(c))
    )
        an(c, a, 12, [r, u]);
    else {
        const t = x(c),
            s = Yt(c);
        if (t || s) {
            const a = () => {
                if (e.f) {
                    const n = t ? (M(d, c) ? d[c] : u[c]) : c.value;
                    o
                        ? T(n) && C(n, i)
                        : T(n)
                        ? n.includes(i) || n.push(i)
                        : t
                        ? ((u[c] = [i]), M(d, c) && (d[c] = u[c]))
                        : ((c.value = [i]), e.k && (u[e.k] = c.value));
                } else
                    t
                        ? ((u[c] = r), M(d, c) && (d[c] = r))
                        : s && ((c.value = r), e.k && (u[e.k] = r));
            };
            r ? ((a.id = -1), Co(a, n)) : a();
        }
    }
}
const Co = function (e, t) {
    var n;
    t && t.pendingBranch
        ? T(e)
            ? t.effects.push(...e)
            : t.effects.push(e)
        : (T((n = e))
              ? fn.push(...n)
              : (mn && mn.includes(n, n.allowRecurse ? gn + 1 : gn)) ||
                fn.push(n),
          En());
};
function _o(e) {
    return (function (e, t) {
        (
            Y ||
            (Y =
                "undefined" != typeof globalThis
                    ? globalThis
                    : "undefined" != typeof self
                    ? self
                    : "undefined" != typeof window
                    ? window
                    : "undefined" != typeof global
                    ? global
                    : {})
        ).__VUE__ = !0;
        const {
                insert: n,
                remove: s,
                patchProp: o,
                forcePatchProp: i,
                createElement: r,
                createText: a,
                createComment: c,
                setText: l,
                setElementText: u,
                parentNode: d,
                nextSibling: h,
                setScopeId: p = y,
                insertStaticContent: f,
            } = e,
            v = (
                e,
                t,
                n,
                s = null,
                o = null,
                i = null,
                r = !1,
                a = null,
                c = !!t.dynamicChildren
            ) => {
                if (e === t) return;
                e && !jo(e, t) && ((s = te(e)), z(e, o, i, !0), (e = null)),
                    -2 === t.patchFlag &&
                        ((c = !1), (t.dynamicChildren = null));
                const { type: l, ref: u, shapeFlag: d } = t;
                switch (l) {
                    case ko:
                        b(e, t, n, s);
                        break;
                    case Oo:
                        S(e, t, n, s);
                        break;
                    case No:
                        null == e && E(t, n, s, r);
                        break;
                    case Io:
                        R(e, t, n, s, o, i, r, a, c);
                        break;
                    default:
                        1 & d
                            ? T(e, t, n, s, o, i, r, a, c)
                            : 6 & d
                            ? D(e, t, n, s, o, i, r, a, c)
                            : (64 & d || 128 & d) &&
                              l.process(e, t, n, s, o, i, r, a, c, se);
                }
                null != u && o && wo(u, e && e.ref, i, t || e, !t);
            },
            b = (e, t, s, o) => {
                if (null == e) n((t.el = a(t.children)), s, o);
                else {
                    const n = (t.el = e.el);
                    t.children !== e.children && l(n, t.children);
                }
            },
            S = (e, t, s, o) => {
                null == e
                    ? n((t.el = c(t.children || "")), s, o)
                    : (t.el = e.el);
            },
            E = (e, t, n, s) => {
                [e.el, e.anchor] = f(e.children, t, n, s, e.el, e.anchor);
            },
            C = ({ el: e, anchor: t }, s, o) => {
                let i;
                for (; e && e !== t; ) (i = h(e)), n(e, s, o), (e = i);
                n(t, s, o);
            },
            _ = ({ el: e, anchor: t }) => {
                let n;
                for (; e && e !== t; ) (n = h(e)), s(e), (e = n);
                s(t);
            },
            T = (e, t, n, s, o, i, r, a, c) => {
                (r = r || "svg" === t.type),
                    null == e
                        ? I(t, n, s, o, i, r, a, c)
                        : N(e, t, o, i, r, a, c);
            },
            I = (e, t, s, i, a, c, l, d) => {
                let h, p;
                const {
                    type: f,
                    props: m,
                    shapeFlag: g,
                    transition: y,
                    dirs: v,
                } = e;
                if (
                    ((h = e.el = r(e.type, c, m && m.is, m)),
                    8 & g
                        ? u(h, e.children)
                        : 16 & g &&
                          O(
                              e.children,
                              h,
                              null,
                              i,
                              a,
                              c && "foreignObject" !== f,
                              l,
                              d
                          ),
                    v && Ds(e, null, i, "created"),
                    k(h, e, e.scopeId, l, i),
                    m)
                ) {
                    for (const t in m)
                        "value" === t ||
                            B(t) ||
                            o(h, t, null, m[t], c, e.children, i, a, ee);
                    "value" in m && o(h, "value", null, m.value),
                        (p = m.onVnodeBeforeMount) && Zo(p, i, e);
                }
                Object.defineProperty(h, "__vueParentComponent", {
                    value: i,
                    enumerable: !1,
                }),
                    v && Ds(e, null, i, "beforeMount");
                const b = (!a || (a && !a.pendingBranch)) && y && !y.persisted;
                b && y.beforeEnter(h),
                    n(h, t, s),
                    ((p = m && m.onVnodeMounted) || b || v) &&
                        Co(() => {
                            p && Zo(p, i, e),
                                b && y.enter(h),
                                v && Ds(e, null, i, "mounted");
                        }, a);
            },
            k = (e, t, n, s, o) => {
                if ((n && p(e, n), s))
                    for (let i = 0; i < s.length; i++) p(e, s[i]);
                if (o) {
                    if (t === o.subTree) {
                        const t = o.vnode;
                        k(e, t, t.scopeId, t.slotScopeIds, o.parent);
                    }
                }
            },
            O = (e, t, n, s, o, i, r, a, c = 0) => {
                for (let l = c; l < e.length; l++) {
                    const c = (e[l] = a ? Ko(e[l]) : Jo(e[l]));
                    v(null, c, t, n, s, o, i, r, a);
                }
            },
            N = (e, t, n, s, r, a, c) => {
                const l = (t.el = e.el);
                let { patchFlag: d, dynamicChildren: h, dirs: p } = t;
                d |= 16 & e.patchFlag;
                const f = e.props || m,
                    g = t.props || m;
                let y;
                n && Mo(n, !1),
                    (y = g.onVnodeBeforeUpdate) && Zo(y, n, t, e),
                    p && Ds(t, e, n, "beforeUpdate"),
                    n && Mo(n, !0);
                const v = r && "foreignObject" !== t.type;
                if (
                    (h
                        ? x(e.dynamicChildren, h, l, n, s, v, a)
                        : c || G(e, t, l, null, n, s, v, a, !1),
                    d > 0)
                ) {
                    if (16 & d) A(l, t, f, g, n, s, r);
                    else if (
                        (2 & d &&
                            f.class !== g.class &&
                            o(l, "class", null, g.class, r),
                        4 & d && o(l, "style", f.style, g.style, r),
                        8 & d)
                    ) {
                        const a = t.dynamicProps;
                        for (let t = 0; t < a.length; t++) {
                            const c = a[t],
                                u = f[c],
                                d = g[c];
                            (d !== u || "value" === c || (i && i(l, c))) &&
                                o(l, c, u, d, r, e.children, n, s, ee);
                        }
                    }
                    1 & d && e.children !== t.children && u(l, t.children);
                } else c || null != h || A(l, t, f, g, n, s, r);
                ((y = g.onVnodeUpdated) || p) &&
                    Co(() => {
                        y && Zo(y, n, t, e), p && Ds(t, e, n, "updated");
                    }, s);
            },
            x = (e, t, n, s, o, i, r) => {
                for (let a = 0; a < t.length; a++) {
                    const c = e[a],
                        l = t[a],
                        u =
                            c.el &&
                            (c.type === Io || !jo(c, l) || 70 & c.shapeFlag)
                                ? d(c.el)
                                : n;
                    v(c, l, u, null, s, o, i, r, !0);
                }
            },
            A = (e, t, n, s, r, a, c) => {
                if (n !== s) {
                    if (n !== m)
                        for (const i in n)
                            B(i) ||
                                i in s ||
                                o(e, i, n[i], null, c, t.children, r, a, ee);
                    for (const l in s) {
                        if (B(l)) continue;
                        const u = s[l],
                            d = n[l];
                        ((u !== d && "value" !== l) || (i && i(e, l))) &&
                            o(e, l, d, u, c, t.children, r, a, ee);
                    }
                    "value" in s && o(e, "value", n.value, s.value);
                }
            },
            R = (e, t, s, o, i, r, c, l, u) => {
                const d = (t.el = e ? e.el : a("")),
                    h = (t.anchor = e ? e.anchor : a(""));
                let { patchFlag: p, dynamicChildren: f, slotScopeIds: m } = t;
                m && (l = l ? l.concat(m) : m),
                    null == e
                        ? (n(d, s, o),
                          n(h, s, o),
                          O(t.children, s, h, i, r, c, l, u))
                        : p > 0 && 64 & p && f && e.dynamicChildren
                        ? (x(e.dynamicChildren, f, s, i, r, c, l),
                          (null != t.key || (i && t === i.subTree)) &&
                              To(e, t, !0))
                        : G(e, t, s, h, i, r, c, l, u);
            },
            D = (e, t, n, s, o, i, r, a, c) => {
                (t.slotScopeIds = a),
                    null == e
                        ? 512 & t.shapeFlag
                            ? o.ctx.activate(t, n, s, r, c)
                            : L(t, n, s, o, i, r, c)
                        : F(e, t, c);
            },
            L = (e, t, n, s, o, i, r) => {
                const a = (e.component = (function (e, t, n) {
                    const s = e.type,
                        o = (t ? t.appContext : e.appContext) || ei,
                        i = {
                            uid: ti++,
                            vnode: e,
                            type: s,
                            parent: t,
                            appContext: o,
                            root: null,
                            next: null,
                            subTree: null,
                            effect: null,
                            update: null,
                            scope: new Ne(!0),
                            render: null,
                            proxy: null,
                            exposed: null,
                            exposeProxy: null,
                            withProxy: null,
                            provides: t
                                ? t.provides
                                : Object.create(o.provides),
                            accessCache: null,
                            renderCache: [],
                            components: null,
                            directives: null,
                            propsOptions: co(s, o),
                            emitsOptions: On(s, o),
                            emit: null,
                            emitted: null,
                            propsDefaults: m,
                            inheritAttrs: s.inheritAttrs,
                            ctx: m,
                            data: m,
                            props: m,
                            attrs: m,
                            slots: m,
                            refs: m,
                            setupState: m,
                            setupContext: null,
                            suspense: n,
                            suspenseId: n ? n.pendingId : 0,
                            asyncDep: null,
                            asyncResolved: !1,
                            isMounted: !1,
                            isUnmounted: !1,
                            isDeactivated: !1,
                            bc: null,
                            c: null,
                            bm: null,
                            m: null,
                            bu: null,
                            u: null,
                            um: null,
                            bum: null,
                            bda: null,
                            da: null,
                            ba: null,
                            a: null,
                            rtg: null,
                            rtc: null,
                            ec: null,
                            sp: null,
                        };
                    (i.ctx = { _: i }),
                        (i.root = t ? t.root : i),
                        (i.emit = In.bind(null, i)),
                        (i.$pageInstance = t && t.$pageInstance),
                        e.ce && e.ce(i);
                    return i;
                })(e, s, o));
                if (
                    (cs(e) && (a.ctx.renderer = se),
                    (function (e, t = !1) {
                        ai = t;
                        const { props: n, children: s } = e.vnode,
                            o = ri(e);
                        io(e, n, o, t),
                            ((e, t) => {
                                if (32 & e.vnode.shapeFlag) {
                                    const n = t._;
                                    n
                                        ? ((e.slots = Ht(t)), J(t, "_", n))
                                        : yo(t, (e.slots = {}));
                                } else (e.slots = {}), t && vo(e, t);
                                J(e.slots, Go, 1);
                            })(e, s);
                        const i = o
                            ? (function (e, t) {
                                  const n = e.type;
                                  (e.accessCache = Object.create(null)),
                                      (e.proxy = Wt(new Proxy(e.ctx, zs)));
                                  const { setup: s } = n;
                                  if (s) {
                                      const n = (e.setupContext =
                                          s.length > 1
                                              ? (function (e) {
                                                    const t = (t) => {
                                                        e.exposed = t || {};
                                                    };
                                                    let n;
                                                    return {
                                                        get attrs() {
                                                            return (
                                                                n ||
                                                                (n = (function (
                                                                    e
                                                                ) {
                                                                    return new Proxy(
                                                                        e.attrs,
                                                                        {
                                                                            get: (
                                                                                t,
                                                                                n
                                                                            ) => (
                                                                                ze(
                                                                                    e,
                                                                                    0,
                                                                                    "$attrs"
                                                                                ),
                                                                                t[
                                                                                    n
                                                                                ]
                                                                            ),
                                                                        }
                                                                    );
                                                                })(e))
                                                            );
                                                        },
                                                        slots: e.slots,
                                                        emit: e.emit,
                                                        expose: t,
                                                    };
                                                })(e)
                                              : null);
                                      oi(e), He();
                                      const o = an(s, e, 0, [e.props, n]);
                                      if ((We(), ii(), P(o))) {
                                          if ((o.then(ii, ii), t))
                                              return o
                                                  .then((n) => {
                                                      ci(e, n, t);
                                                  })
                                                  .catch((t) => {
                                                      ln(t, e, 0);
                                                  });
                                          e.asyncDep = o;
                                      } else ci(e, o, t);
                                  } else li(e, t);
                              })(e, t)
                            : void 0;
                        ai = !1;
                    })(a),
                    a.asyncDep)
                ) {
                    if ((o && o.registerDep(a, U), !e.el)) {
                        const e = (a.subTree = Ho(Oo));
                        S(null, e, t, n);
                    }
                } else U(a, e, t, n, o, i, r);
            },
            F = (e, t, n) => {
                const s = (t.component = e.component);
                if (
                    (function (e, t, n) {
                        const { props: s, children: o, component: i } = e,
                            { props: r, children: a, patchFlag: c } = t,
                            l = i.emitsOptions;
                        if (t.dirs || t.transition) return !0;
                        if (!(n && c >= 0))
                            return (
                                !((!o && !a) || (a && a.$stable)) ||
                                (s !== r && (s ? !r || Un(s, r, l) : !!r))
                            );
                        if (1024 & c) return !0;
                        if (16 & c) return s ? Un(s, r, l) : !!r;
                        if (8 & c) {
                            const e = t.dynamicProps;
                            for (let t = 0; t < e.length; t++) {
                                const n = e[t];
                                if (r[n] !== s[n] && !Nn(l, n)) return !0;
                            }
                        }
                        return !1;
                    })(e, t, n)
                ) {
                    if (s.asyncDep && !s.asyncResolved) return void j(s, t, n);
                    (s.next = t),
                        (function (e) {
                            const t = hn.indexOf(e);
                            t > pn && hn.splice(t, 1);
                        })(s.update),
                        s.update();
                } else (t.el = e.el), (s.vnode = t);
            },
            U = (e, t, n, s, o, i, r) => {
                const a = () => {
                        if (e.isMounted) {
                            let t,
                                {
                                    next: n,
                                    bu: s,
                                    u: a,
                                    parent: c,
                                    vnode: l,
                                } = e,
                                u = n;
                            Mo(e, !1),
                                n ? ((n.el = l.el), j(e, n, r)) : (n = l),
                                s && X(s),
                                (t = n.props && n.props.onVnodeBeforeUpdate) &&
                                    Zo(t, c, n, l),
                                Mo(e, !0);
                            const h = Dn(e),
                                p = e.subTree;
                            (e.subTree = h),
                                v(p, h, d(p.el), te(p), e, o, i),
                                (n.el = h.el),
                                null === u &&
                                    (function ({ vnode: e, parent: t }, n) {
                                        for (; t && t.subTree === e; )
                                            ((e = t.vnode).el = n),
                                                (t = t.parent);
                                    })(e, h.el),
                                a && Co(a, o),
                                (t = n.props && n.props.onVnodeUpdated) &&
                                    Co(() => Zo(t, c, n, l), o);
                        } else {
                            let r;
                            const { el: a, props: c } = t,
                                { bm: l, m: u, parent: d } = e,
                                h = is(t);
                            if (
                                (Mo(e, !1),
                                l && X(l),
                                !h &&
                                    (r = c && c.onVnodeBeforeMount) &&
                                    Zo(r, d, t),
                                Mo(e, !0),
                                a && ie)
                            ) {
                                const n = () => {
                                    (e.subTree = Dn(e)),
                                        ie(a, e.subTree, e, o, null);
                                };
                                h
                                    ? t.type
                                          .__asyncLoader()
                                          .then(() => !e.isUnmounted && n())
                                    : n();
                            } else {
                                const r = (e.subTree = Dn(e));
                                v(null, r, n, s, e, o, i), (t.el = r.el);
                            }
                            if (
                                (u && Co(u, o),
                                !h && (r = c && c.onVnodeMounted))
                            ) {
                                const e = t;
                                Co(() => Zo(r, d, e), o);
                            }
                            const { ba: p, a: f } = e;
                            (256 & t.shapeFlag ||
                                (d &&
                                    is(d.vnode) &&
                                    256 & d.vnode.shapeFlag)) &&
                                (p && Ss(p),
                                f && Co(f, o),
                                p && Co(() => Es(p), o)),
                                (e.isMounted = !0),
                                (t = n = s = null);
                        }
                    },
                    c = (e.effect = new Ge(a, () => Sn(l), e.scope)),
                    l = (e.update = () => c.run());
                (l.id = e.uid), Mo(e, !0), l();
            },
            j = (e, t, n) => {
                t.component = e;
                const s = e.vnode.props;
                (e.vnode = t),
                    (e.next = null),
                    (function (e, t, n, s) {
                        const {
                                props: o,
                                attrs: i,
                                vnode: { patchFlag: r },
                            } = e,
                            a = Ht(o),
                            [c] = e.propsOptions;
                        let l = !1;
                        if (!(s || r > 0) || 16 & r) {
                            let s;
                            ro(e, t, o, i) && (l = !0);
                            for (const i in a)
                                (t &&
                                    (M(t, i) ||
                                        ((s = V(i)) !== i && M(t, s)))) ||
                                    (c
                                        ? !n ||
                                          (void 0 === n[i] &&
                                              void 0 === n[s]) ||
                                          (o[i] = ao(c, a, i, void 0, e, !0))
                                        : delete o[i]);
                            if (i !== a)
                                for (const e in i)
                                    (t && M(t, e)) || (delete i[e], (l = !0));
                        } else if (8 & r) {
                            const n = e.vnode.dynamicProps;
                            for (let s = 0; s < n.length; s++) {
                                let r = n[s];
                                if (Nn(e.emitsOptions, r)) continue;
                                const u = t[r];
                                if (c)
                                    if (M(i, r))
                                        u !== i[r] && ((i[r] = u), (l = !0));
                                    else {
                                        const t = $(r);
                                        o[t] = ao(c, a, t, u, e, !1);
                                    }
                                else u !== i[r] && ((i[r] = u), (l = !0));
                            }
                        }
                        l && Je(e, "set", "$attrs");
                    })(e, t.props, s, n),
                    ((e, t, n) => {
                        const { vnode: s, slots: o } = e;
                        let i = !0,
                            r = m;
                        if (32 & s.shapeFlag) {
                            const e = t._;
                            e
                                ? n && 1 === e
                                    ? (i = !1)
                                    : (w(o, t), n || 1 !== e || delete o._)
                                : ((i = !t.$stable), yo(t, o)),
                                (r = t);
                        } else t && (vo(e, t), (r = { default: 1 }));
                        if (i)
                            for (const a in o) fo(a) || a in r || delete o[a];
                    })(e, t.children, n),
                    He(),
                    wn(),
                    We();
            },
            G = (e, t, n, s, o, i, r, a, c = !1) => {
                const l = e && e.children,
                    d = e ? e.shapeFlag : 0,
                    h = t.children,
                    { patchFlag: p, shapeFlag: f } = t;
                if (p > 0) {
                    if (128 & p) return void H(l, h, n, s, o, i, r, a, c);
                    if (256 & p) return void q(l, h, n, s, o, i, r, a, c);
                }
                8 & f
                    ? (16 & d && ee(l, o, i), h !== l && u(n, h))
                    : 16 & d
                    ? 16 & f
                        ? H(l, h, n, s, o, i, r, a, c)
                        : ee(l, o, i, !0)
                    : (8 & d && u(n, ""), 16 & f && O(h, n, s, o, i, r, a, c));
            },
            q = (e, t, n, s, o, i, r, a, c) => {
                t = t || g;
                const l = (e = e || g).length,
                    u = t.length,
                    d = Math.min(l, u);
                let h;
                for (h = 0; h < d; h++) {
                    const s = (t[h] = c ? Ko(t[h]) : Jo(t[h]));
                    v(e[h], s, n, null, o, i, r, a, c);
                }
                l > u ? ee(e, o, i, !0, !1, d) : O(t, n, s, o, i, r, a, c, d);
            },
            H = (e, t, n, s, o, i, r, a, c) => {
                let l = 0;
                const u = t.length;
                let d = e.length - 1,
                    h = u - 1;
                for (; l <= d && l <= h; ) {
                    const s = e[l],
                        u = (t[l] = c ? Ko(t[l]) : Jo(t[l]));
                    if (!jo(s, u)) break;
                    v(s, u, n, null, o, i, r, a, c), l++;
                }
                for (; l <= d && l <= h; ) {
                    const s = e[d],
                        l = (t[h] = c ? Ko(t[h]) : Jo(t[h]));
                    if (!jo(s, l)) break;
                    v(s, l, n, null, o, i, r, a, c), d--, h--;
                }
                if (l > d) {
                    if (l <= h) {
                        const e = h + 1,
                            d = e < u ? t[e].el : s;
                        for (; l <= h; )
                            v(
                                null,
                                (t[l] = c ? Ko(t[l]) : Jo(t[l])),
                                n,
                                d,
                                o,
                                i,
                                r,
                                a,
                                c
                            ),
                                l++;
                    }
                } else if (l > h) for (; l <= d; ) z(e[l], o, i, !0), l++;
                else {
                    const p = l,
                        f = l,
                        m = new Map();
                    for (l = f; l <= h; l++) {
                        const e = (t[l] = c ? Ko(t[l]) : Jo(t[l]));
                        null != e.key && m.set(e.key, l);
                    }
                    let y,
                        b = 0;
                    const S = h - f + 1;
                    let E = !1,
                        w = 0;
                    const C = new Array(S);
                    for (l = 0; l < S; l++) C[l] = 0;
                    for (l = p; l <= d; l++) {
                        const s = e[l];
                        if (b >= S) {
                            z(s, o, i, !0);
                            continue;
                        }
                        let u;
                        if (null != s.key) u = m.get(s.key);
                        else
                            for (y = f; y <= h; y++)
                                if (0 === C[y - f] && jo(s, t[y])) {
                                    u = y;
                                    break;
                                }
                        void 0 === u
                            ? z(s, o, i, !0)
                            : ((C[u - f] = l + 1),
                              u >= w ? (w = u) : (E = !0),
                              v(s, t[u], n, null, o, i, r, a, c),
                              b++);
                    }
                    const _ = E
                        ? (function (e) {
                              const t = e.slice(),
                                  n = [0];
                              let s, o, i, r, a;
                              const c = e.length;
                              for (s = 0; s < c; s++) {
                                  const c = e[s];
                                  if (0 !== c) {
                                      if (((o = n[n.length - 1]), e[o] < c)) {
                                          (t[s] = o), n.push(s);
                                          continue;
                                      }
                                      for (i = 0, r = n.length - 1; i < r; )
                                          (a = (i + r) >> 1),
                                              e[n[a]] < c
                                                  ? (i = a + 1)
                                                  : (r = a);
                                      c < e[n[i]] &&
                                          (i > 0 && (t[s] = n[i - 1]),
                                          (n[i] = s));
                                  }
                              }
                              (i = n.length), (r = n[i - 1]);
                              for (; i-- > 0; ) (n[i] = r), (r = t[r]);
                              return n;
                          })(C)
                        : g;
                    for (y = _.length - 1, l = S - 1; l >= 0; l--) {
                        const e = f + l,
                            d = t[e],
                            h = e + 1 < u ? t[e + 1].el : s;
                        0 === C[l]
                            ? v(null, d, n, h, o, i, r, a, c)
                            : E && (y < 0 || l !== _[y] ? W(d, n, h, 2) : y--);
                    }
                }
            },
            W = (e, t, s, o, i = null) => {
                const {
                    el: r,
                    type: a,
                    transition: c,
                    children: l,
                    shapeFlag: u,
                } = e;
                if (6 & u) return void W(e.component.subTree, t, s, o);
                if (128 & u) return void e.suspense.move(t, s, o);
                if (64 & u) return void a.move(e, t, s, se);
                if (a === Io) {
                    n(r, t, s);
                    for (let e = 0; e < l.length; e++) W(l[e], t, s, o);
                    return void n(e.anchor, t, s);
                }
                if (a === No) return void C(e, t, s);
                if (2 !== o && 1 & u && c)
                    if (0 === o)
                        c.beforeEnter(r), n(r, t, s), Co(() => c.enter(r), i);
                    else {
                        const { leave: e, delayLeave: o, afterLeave: i } = c,
                            a = () => n(r, t, s),
                            l = () => {
                                e(r, () => {
                                    a(), i && i();
                                });
                            };
                        o ? o(r, a, l) : l();
                    }
                else n(r, t, s);
            },
            z = (e, t, n, s = !1, o = !1) => {
                const {
                    type: i,
                    props: r,
                    ref: a,
                    children: c,
                    dynamicChildren: l,
                    shapeFlag: u,
                    patchFlag: d,
                    dirs: h,
                } = e;
                if ((null != a && wo(a, null, n, e, !0), 256 & u))
                    return void t.ctx.deactivate(e);
                const p = 1 & u && h,
                    f = !is(e);
                let m;
                if (
                    (f && (m = r && r.onVnodeBeforeUnmount) && Zo(m, t, e),
                    6 & u)
                )
                    Z(e.component, n, s);
                else {
                    if (128 & u) return void e.suspense.unmount(n, s);
                    p && Ds(e, null, t, "beforeUnmount"),
                        64 & u
                            ? e.type.remove(e, t, n, o, se, s)
                            : l && (i !== Io || (d > 0 && 64 & d))
                            ? ee(l, t, n, !1, !0)
                            : ((i === Io && 384 & d) || (!o && 16 & u)) &&
                              ee(c, t, n),
                        s && K(e);
                }
                ((f && (m = r && r.onVnodeUnmounted)) || p) &&
                    Co(() => {
                        m && Zo(m, t, e), p && Ds(e, null, t, "unmounted");
                    }, n);
            },
            K = (e) => {
                const { type: t, el: n, anchor: o, transition: i } = e;
                if (t === Io) return void Q(n, o);
                if (t === No) return void _(e);
                const r = () => {
                    s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
                };
                if (1 & e.shapeFlag && i && !i.persisted) {
                    const { leave: t, delayLeave: s } = i,
                        o = () => t(n, r);
                    s ? s(e.el, r, o) : o();
                } else r();
            },
            Q = (e, t) => {
                let n;
                for (; e !== t; ) (n = h(e)), s(e), (e = n);
                s(t);
            },
            Z = (e, t, n) => {
                const { bum: s, scope: o, update: i, subTree: r, um: a } = e;
                s && X(s),
                    o.stop(),
                    i && ((i.active = !1), z(r, e, t, n)),
                    a && Co(a, t),
                    Co(() => {
                        e.isUnmounted = !0;
                    }, t),
                    t &&
                        t.pendingBranch &&
                        !t.isUnmounted &&
                        e.asyncDep &&
                        !e.asyncResolved &&
                        e.suspenseId === t.pendingId &&
                        (t.deps--, 0 === t.deps && t.resolve());
            },
            ee = (e, t, n, s = !1, o = !1, i = 0) => {
                for (let r = i; r < e.length; r++) z(e[r], t, n, s, o);
            },
            te = (e) =>
                6 & e.shapeFlag
                    ? te(e.component.subTree)
                    : 128 & e.shapeFlag
                    ? e.suspense.next()
                    : h(e.anchor || e.el),
            ne = (e, t, n) => {
                null == e
                    ? t._vnode && z(t._vnode, null, null, !0)
                    : v(t._vnode || null, e, t, null, null, null, n),
                    wn(),
                    Cn(),
                    (t._vnode = e);
            },
            se = {
                p: v,
                um: z,
                m: W,
                r: K,
                mt: L,
                mc: O,
                pc: G,
                pbc: x,
                n: te,
                o: e,
            };
        let oe, ie;
        t && ([oe, ie] = t(se));
        return { render: ne, hydrate: oe, createApp: Eo(ne, oe) };
    })(e);
}
function Mo({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function To(e, t, n = !1) {
    const s = e.children,
        o = t.children;
    if (T(s) && T(o))
        for (let i = 0; i < s.length; i++) {
            const e = s[i];
            let t = o[i];
            1 & t.shapeFlag &&
                !t.dynamicChildren &&
                ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
                    ((t = o[i] = Ko(o[i])), (t.el = e.el)),
                n || To(e, t)),
                t.type === ko && (t.el = e.el);
        }
}
const Io = Symbol(void 0),
    ko = Symbol(void 0),
    Oo = Symbol(void 0),
    No = Symbol(void 0),
    xo = [];
let Ao = null;
function Ro(e = !1) {
    xo.push((Ao = e ? null : []));
}
let Po = 1;
function Do(e) {
    Po += e;
}
function Lo(e) {
    return (
        (e.dynamicChildren = Po > 0 ? Ao || g : null),
        xo.pop(),
        (Ao = xo[xo.length - 1] || null),
        Po > 0 && Ao && Ao.push(e),
        e
    );
}
function Fo(e, t, n, s, o, i) {
    return Lo(Vo(e, t, n, s, o, i, !0));
}
function Uo(e, t, n, s, o) {
    return Lo(Ho(e, t, n, s, o, !0));
}
function Bo(e) {
    return !!e && !0 === e.__v_isVNode;
}
function jo(e, t) {
    return e.type === t.type && e.key === t.key;
}
const Go = "__vInternal",
    $o = ({ key: e }) => (null != e ? e : null),
    qo = ({ ref: e, ref_key: t, ref_for: n }) =>
        null != e
            ? x(e) || Yt(e) || N(e)
                ? { i: xn, r: e, k: t, f: !!n }
                : e
            : null;
function Vo(
    e,
    t = null,
    n = null,
    s = 0,
    o = null,
    i = e === Io ? 0 : 1,
    r = !1,
    a = !1
) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && $o(t),
        ref: t && qo(t),
        scopeId: An,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: s,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: xn,
    };
    return (
        a
            ? (Yo(c, n), 128 & i && e.normalize(c))
            : n && (c.shapeFlag |= x(n) ? 8 : 16),
        Po > 0 &&
            !r &&
            Ao &&
            (c.patchFlag > 0 || 6 & i) &&
            32 !== c.patchFlag &&
            Ao.push(c),
        c
    );
}
const Ho = function (e, t = null, n = null, o = 0, i = null, r = !1) {
    (e && e !== Fs) || (e = Oo);
    if (Bo(e)) {
        const s = Wo(e, t, !0);
        return (
            n && Yo(s, n),
            Po > 0 &&
                !r &&
                Ao &&
                (6 & s.shapeFlag ? (Ao[Ao.indexOf(e)] = s) : Ao.push(s)),
            (s.patchFlag |= -2),
            s
        );
    }
    (a = e), N(a) && "__vccOpts" in a && (e = e.__vccOpts);
    var a;
    if (t) {
        t = (function (e) {
            return e ? (Vt(e) || Go in e ? w({}, e) : e) : null;
        })(t);
        let { class: e, style: n } = t;
        e && !x(e) && (t.class = c(e)),
            R(n) && (Vt(n) && !T(n) && (n = w({}, n)), (t.style = s(n)));
    }
    const l = x(e)
        ? 1
        : Bn(e)
        ? 128
        : ((e) => e.__isTeleport)(e)
        ? 64
        : R(e)
        ? 4
        : N(e)
        ? 2
        : 0;
    return Vo(e, t, n, o, i, l, r, !0);
};
function Wo(e, t, n = !1) {
    const { props: s, ref: o, patchFlag: i, children: r } = e,
        a = t ? Qo(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && $o(a),
        ref:
            t && t.ref
                ? n && o
                    ? T(o)
                        ? o.concat(qo(t))
                        : [o, qo(t)]
                    : qo(t)
                : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: r,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Io ? (-1 === i ? 16 : 16 | i) : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Wo(e.ssContent),
        ssFallback: e.ssFallback && Wo(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
    };
}
function zo(e = " ", t = 0) {
    return Ho(ko, null, e, t);
}
function Xo(e = "", t = !1) {
    return t ? (Ro(), Uo(Oo, null, e)) : Ho(Oo, null, e);
}
function Jo(e) {
    return null == e || "boolean" == typeof e
        ? Ho(Oo)
        : T(e)
        ? Ho(Io, null, e.slice())
        : "object" == typeof e
        ? Ko(e)
        : Ho(ko, null, String(e));
}
function Ko(e) {
    return (null === e.el && -1 !== e.patchFlag) || e.memo ? e : Wo(e);
}
function Yo(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (null == t) t = null;
    else if (T(t)) n = 16;
    else if ("object" == typeof t) {
        if (65 & s) {
            const n = t.default;
            return void (
                n && (n._c && (n._d = !1), Yo(e, n()), n._c && (n._d = !0))
            );
        }
        {
            n = 32;
            const s = t._;
            s || Go in t
                ? 3 === s &&
                  xn &&
                  (1 === xn.slots._
                      ? (t._ = 1)
                      : ((t._ = 2), (e.patchFlag |= 1024)))
                : (t._ctx = xn);
        }
    } else
        N(t)
            ? ((t = { default: t, _ctx: xn }), (n = 32))
            : ((t = String(t)), 64 & s ? ((n = 16), (t = [zo(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Qo(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const o = e[n];
        for (const e in o)
            if ("class" === e)
                t.class !== o.class && (t.class = c([t.class, o.class]));
            else if ("style" === e) t.style = s([t.style, o.style]);
            else if (S(e)) {
                const n = t[e],
                    s = o[e];
                !s ||
                    n === s ||
                    (T(n) && n.includes(s)) ||
                    (t[e] = n ? [].concat(n, s) : s);
            } else "" !== e && (t[e] = o[e]);
    }
    return t;
}
function Zo(e, t, n, s = null) {
    cn(e, t, 7, [n, s]);
}
const ei = bo();
let ti = 0;
let ni = null;
const si = () => ni || xn,
    oi = (e) => {
        (ni = e), e.scope.on();
    },
    ii = () => {
        ni && ni.scope.off(), (ni = null);
    };
function ri(e) {
    return 4 & e.vnode.shapeFlag;
}
let ai = !1;
function ci(e, t, n) {
    N(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : R(t) && (e.setupState = sn(t)),
        li(e, n);
}
function li(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || y), oi(e), He(), Js(e), We(), ii();
}
function ui(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(sn(Wt(e.exposed)), {
                get: (t, n) => (n in t ? t[n] : n in Hs ? Hs[n](e) : void 0),
                has: (e, t) => t in e || t in Hs,
            }))
        );
}
function di(e, t = !0) {
    return N(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
const hi = (e, t) =>
    (function (e, t, n = !1) {
        let s, o;
        const i = N(e);
        return (
            i ? ((s = e), (o = y)) : ((s = e.get), (o = e.set)),
            new rn(s, o, i || !o, n)
        );
    })(e, 0, ai);
function pi(e, t, n) {
    const s = arguments.length;
    return 2 === s
        ? R(t) && !T(t)
            ? Bo(t)
                ? Ho(e, null, [t])
                : Ho(e, t)
            : Ho(e, null, t)
        : (s > 3
              ? (n = Array.prototype.slice.call(arguments, 2))
              : 3 === s && Bo(n) && (n = [n]),
          Ho(e, t, n));
}
const fi = Symbol(""),
    mi = () => Gn(fi),
    gi = "3.2.47",
    yi = "undefined" != typeof document ? document : null,
    vi = yi && yi.createElement("template"),
    bi = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const o = t
                ? yi.createElementNS("http://www.w3.org/2000/svg", e)
                : yi.createElement(e, n ? { is: n } : void 0);
            return (
                "select" === e &&
                    s &&
                    null != s.multiple &&
                    o.setAttribute("multiple", s.multiple),
                o
            );
        },
        createText: (e) => yi.createTextNode(e),
        createComment: (e) => yi.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => yi.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, n, s, o, i) {
            const r = n ? n.previousSibling : t.lastChild;
            if (o && (o === i || o.nextSibling))
                for (
                    ;
                    t.insertBefore(o.cloneNode(!0), n),
                        o !== i && (o = o.nextSibling);

                );
            else {
                vi.innerHTML = s ? `<svg>${e}</svg>` : e;
                const o = vi.content;
                if (s) {
                    const e = o.firstChild;
                    for (; e.firstChild; ) o.appendChild(e.firstChild);
                    o.removeChild(e);
                }
                t.insertBefore(o, n);
            }
            return [
                r ? r.nextSibling : t.firstChild,
                n ? n.previousSibling : t.lastChild,
            ];
        },
    };
const Si = /\s*!important$/;
function Ei(e, t, n) {
    if (T(n)) n.forEach((n) => Ei(e, t, n));
    else if ((null == n && (n = ""), (n = xi(n)), t.startsWith("--")))
        e.setProperty(t, n);
    else {
        const s = (function (e, t) {
            const n = Ci[t];
            if (n) return n;
            let s = $(t);
            if ("filter" !== s && s in e) return (Ci[t] = s);
            s = H(s);
            for (let o = 0; o < wi.length; o++) {
                const n = wi[o] + s;
                if (n in e) return (Ci[t] = n);
            }
            return t;
        })(e, t);
        Si.test(n)
            ? e.setProperty(V(s), n.replace(Si, ""), "important")
            : (e[s] = n);
    }
}
const wi = ["Webkit", "Moz", "ms"],
    Ci = {};
const {
        unit: _i,
        unitRatio: Mi,
        unitPrecision: Ti,
    } = { unit: "rem", unitRatio: 10 / 320, unitPrecision: 5 },
    Ii =
        ((ki = _i),
        (Oi = Mi),
        (Ni = Ti),
        (e) =>
            e.replace(de, (e, t) => {
                if (!t) return e;
                if (1 === Oi) return `${t}${ki}`;
                const n = (function (e, t) {
                    const n = Math.pow(10, t + 1),
                        s = Math.floor(e * n);
                    return (10 * Math.round(s / 10)) / n;
                })(parseFloat(t) * Oi, Ni);
                return 0 === n ? "0" : `${n}${ki}`;
            }));
var ki, Oi, Ni;
const xi = (e) => (x(e) ? Ii(e) : e),
    Ai = "http://www.w3.org/1999/xlink";
function Ri(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function Pi(e, t, n, s, o = null) {
    const i = e._vei || (e._vei = {}),
        r = i[t];
    if (s && r) r.value = s;
    else {
        const [n, a] = (function (e) {
            let t;
            if (Di.test(e)) {
                let n;
                for (t = {}; (n = e.match(Di)); )
                    (e = e.slice(0, e.length - n[0].length)),
                        (t[n[0].toLowerCase()] = !0);
            }
            return [":" === e[2] ? e.slice(3) : V(e.slice(2)), t];
        })(t);
        if (s) {
            const r = (i[t] = (function (e, t) {
                const n = (e) => {
                    if (e._vts) {
                        if (e._vts <= n.attached) return;
                    } else e._vts = Date.now();
                    const s = t && t.proxy,
                        o = s && s.$nne,
                        { value: i } = n;
                    if (o && T(i)) {
                        const n = Ui(e, i);
                        for (let s = 0; s < n.length; s++) {
                            const i = n[s];
                            cn(i, t, 5, i.__wwe ? [e] : o(e));
                        }
                    } else cn(Ui(e, i), t, 5, o && !i.__wwe ? o(e, i, t) : [e]);
                };
                return (
                    (n.value = e),
                    (n.attached = (() =>
                        Li || (Fi.then(() => (Li = 0)), (Li = Date.now())))()),
                    n
                );
            })(s, o));
            Ri(e, n, r, a);
        } else
            r &&
                (!(function (e, t, n, s) {
                    e.removeEventListener(t, n, s);
                })(e, n, r, a),
                (i[t] = void 0));
    }
}
const Di = /(?:Once|Passive|Capture)$/;
let Li = 0;
const Fi = Promise.resolve();
function Ui(e, t) {
    if (T(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((e) => {
                const t = (t) => !t._stopped && e && e(t);
                return (t.__wwe = e.__wwe), t;
            })
        );
    }
    return t;
}
const Bi = /^on[a-z]/;
const ji = "transition",
    Gi = (e, { slots: t }) =>
        pi(
            Yn,
            (function (e) {
                const t = {};
                for (const w in e) w in $i || (t[w] = e[w]);
                if (!1 === e.css) return t;
                const {
                        name: n = "v",
                        type: s,
                        duration: o,
                        enterFromClass: i = `${n}-enter-from`,
                        enterActiveClass: r = `${n}-enter-active`,
                        enterToClass: a = `${n}-enter-to`,
                        appearFromClass: c = i,
                        appearActiveClass: l = r,
                        appearToClass: u = a,
                        leaveFromClass: d = `${n}-leave-from`,
                        leaveActiveClass: h = `${n}-leave-active`,
                        leaveToClass: p = `${n}-leave-to`,
                    } = e,
                    f = (function (e) {
                        if (null == e) return null;
                        if (R(e)) return [Hi(e.enter), Hi(e.leave)];
                        {
                            const t = Hi(e);
                            return [t, t];
                        }
                    })(o),
                    m = f && f[0],
                    g = f && f[1],
                    {
                        onBeforeEnter: y,
                        onEnter: v,
                        onEnterCancelled: b,
                        onLeave: S,
                        onLeaveCancelled: E,
                        onBeforeAppear: C = y,
                        onAppear: _ = v,
                        onAppearCancelled: M = b,
                    } = t,
                    T = (e, t, n) => {
                        zi(e, t ? u : a), zi(e, t ? l : r), n && n();
                    },
                    I = (e, t) => {
                        (e._isLeaving = !1),
                            zi(e, d),
                            zi(e, p),
                            zi(e, h),
                            t && t();
                    },
                    k = (e) => (t, n) => {
                        const o = e ? _ : v,
                            r = () => T(t, e, n);
                        qi(o, [t, r]),
                            Xi(() => {
                                zi(t, e ? c : i),
                                    Wi(t, e ? u : a),
                                    Vi(o) || Ki(t, s, m, r);
                            });
                    };
                return w(t, {
                    onBeforeEnter(e) {
                        qi(y, [e]), Wi(e, i), Wi(e, r);
                    },
                    onBeforeAppear(e) {
                        qi(C, [e]), Wi(e, c), Wi(e, l);
                    },
                    onEnter: k(!1),
                    onAppear: k(!0),
                    onLeave(e, t) {
                        e._isLeaving = !0;
                        const n = () => I(e, t);
                        Wi(e, d),
                            document.body.offsetHeight,
                            Wi(e, h),
                            Xi(() => {
                                e._isLeaving &&
                                    (zi(e, d),
                                    Wi(e, p),
                                    Vi(S) || Ki(e, s, g, n));
                            }),
                            qi(S, [e, n]);
                    },
                    onEnterCancelled(e) {
                        T(e, !1), qi(b, [e]);
                    },
                    onAppearCancelled(e) {
                        T(e, !0), qi(M, [e]);
                    },
                    onLeaveCancelled(e) {
                        I(e), qi(E, [e]);
                    },
                });
            })(e),
            t
        );
Gi.displayName = "Transition";
const $i = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
};
Gi.props = w({}, Kn, $i);
const qi = (e, t = []) => {
        T(e) ? e.forEach((e) => e(...t)) : e && e(...t);
    },
    Vi = (e) => !!e && (T(e) ? e.some((e) => e.length > 1) : e.length > 1);
function Hi(e) {
    const t = ((e) => {
        const t = x(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t;
    })(e);
    return t;
}
function Wi(e, t) {
    t.split(/\s+/).forEach((t) => t && e.classList.add(t)),
        (e._vtc || (e._vtc = new Set())).add(t);
}
function zi(e, t) {
    t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
    const { _vtc: n } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Xi(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e);
    });
}
let Ji = 0;
function Ki(e, t, n, s) {
    const o = (e._endId = ++Ji),
        i = () => {
            o === e._endId && s();
        };
    if (n) return setTimeout(i, n);
    const {
        type: r,
        timeout: a,
        propCount: c,
    } = (function (e, t) {
        const n = window.getComputedStyle(e),
            s = (e) => (n[e] || "").split(", "),
            o = s("transitionDelay"),
            i = s("transitionDuration"),
            r = Yi(o, i),
            a = s("animationDelay"),
            c = s("animationDuration"),
            l = Yi(a, c);
        let u = null,
            d = 0,
            h = 0;
        t === ji
            ? r > 0 && ((u = ji), (d = r), (h = i.length))
            : "animation" === t
            ? l > 0 && ((u = "animation"), (d = l), (h = c.length))
            : ((d = Math.max(r, l)),
              (u = d > 0 ? (r > l ? ji : "animation") : null),
              (h = u ? (u === ji ? i.length : c.length) : 0));
        const p =
            u === ji &&
            /\b(transform|all)(,|$)/.test(s("transitionProperty").toString());
        return { type: u, timeout: d, propCount: h, hasTransform: p };
    })(e, t);
    if (!r) return s();
    const l = r + "end";
    let u = 0;
    const d = () => {
            e.removeEventListener(l, h), i();
        },
        h = (t) => {
            t.target === e && ++u >= c && d();
        };
    setTimeout(() => {
        u < c && d();
    }, a + 1),
        e.addEventListener(l, h);
}
function Yi(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((t, n) => Qi(t) + Qi(e[n])));
}
function Qi(e) {
    return 1e3 * Number(e.slice(0, -1).replace(",", "."));
}
const Zi = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return T(t) ? (e) => X(t, e) : t;
};
function er(e) {
    e.target.composing = !0;
}
function tr(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const nr = {
        created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
            e._assign = Zi(o);
            const i = s || (o.props && "number" === o.props.type);
            Ri(e, t ? "change" : "input", (t) => {
                if (t.target.composing) return;
                let s = e.value;
                n && (s = s.trim()), i && (s = K(s)), e._assign(s);
            }),
                n &&
                    Ri(e, "change", () => {
                        e.value = e.value.trim();
                    }),
                t ||
                    (Ri(e, "compositionstart", er),
                    Ri(e, "compositionend", tr),
                    Ri(e, "change", tr));
        },
        mounted(e, { value: t }) {
            e.value = null == t ? "" : t;
        },
        beforeUpdate(
            e,
            { value: t, modifiers: { lazy: n, trim: s, number: o } },
            i
        ) {
            if (((e._assign = Zi(i)), e.composing)) return;
            if (document.activeElement === e && "range" !== e.type) {
                if (n) return;
                if (s && e.value.trim() === t) return;
                if ((o || "number" === e.type) && K(e.value) === t) return;
            }
            const r = null == t ? "" : t;
            e.value !== r && (e.value = r);
        },
    },
    sr = {
        deep: !0,
        created(e, t, n) {
            (e._assign = Zi(n)),
                Ri(e, "change", () => {
                    const t = e._modelValue,
                        n = cr(e),
                        s = e.checked,
                        o = e._assign;
                    if (T(t)) {
                        const e = h(t, n),
                            i = -1 !== e;
                        if (s && !i) o(t.concat(n));
                        else if (!s && i) {
                            const n = [...t];
                            n.splice(e, 1), o(n);
                        }
                    } else if (k(t)) {
                        const e = new Set(t);
                        s ? e.add(n) : e.delete(n), o(e);
                    } else o(lr(e, s));
                });
        },
        mounted: or,
        beforeUpdate(e, t, n) {
            (e._assign = Zi(n)), or(e, t, n);
        },
    };
function or(e, { value: t, oldValue: n }, s) {
    (e._modelValue = t),
        T(t)
            ? (e.checked = h(t, s.props.value) > -1)
            : k(t)
            ? (e.checked = t.has(s.props.value))
            : t !== n && (e.checked = d(t, lr(e, !0)));
}
const ir = {
        created(e, { value: t }, n) {
            (e.checked = d(t, n.props.value)),
                (e._assign = Zi(n)),
                Ri(e, "change", () => {
                    e._assign(cr(e));
                });
        },
        beforeUpdate(e, { value: t, oldValue: n }, s) {
            (e._assign = Zi(s)), t !== n && (e.checked = d(t, s.props.value));
        },
    },
    rr = {
        deep: !0,
        created(e, { value: t, modifiers: { number: n } }, s) {
            const o = k(t);
            Ri(e, "change", () => {
                const t = Array.prototype.filter
                    .call(e.options, (e) => e.selected)
                    .map((e) => (n ? K(cr(e)) : cr(e)));
                e._assign(e.multiple ? (o ? new Set(t) : t) : t[0]);
            }),
                (e._assign = Zi(s));
        },
        mounted(e, { value: t }) {
            ar(e, t);
        },
        beforeUpdate(e, t, n) {
            e._assign = Zi(n);
        },
        updated(e, { value: t }) {
            ar(e, t);
        },
    };
function ar(e, t) {
    const n = e.multiple;
    if (!n || T(t) || k(t)) {
        for (let s = 0, o = e.options.length; s < o; s++) {
            const o = e.options[s],
                i = cr(o);
            if (n) T(t) ? (o.selected = h(t, i) > -1) : (o.selected = t.has(i));
            else if (d(cr(o), t))
                return void (e.selectedIndex !== s && (e.selectedIndex = s));
        }
        n || -1 === e.selectedIndex || (e.selectedIndex = -1);
    }
}
function cr(e) {
    return "_value" in e ? e._value : e.value;
}
function lr(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
}
const ur = {
    created(e, t, n) {
        dr(e, t, n, null, "created");
    },
    mounted(e, t, n) {
        dr(e, t, n, null, "mounted");
    },
    beforeUpdate(e, t, n, s) {
        dr(e, t, n, s, "beforeUpdate");
    },
    updated(e, t, n, s) {
        dr(e, t, n, s, "updated");
    },
};
function dr(e, t, n, s, o) {
    const i = (function (e, t) {
        switch (e) {
            case "SELECT":
                return rr;
            case "TEXTAREA":
                return nr;
            default:
                switch (t) {
                    case "checkbox":
                        return sr;
                    case "radio":
                        return ir;
                    default:
                        return nr;
                }
        }
    })(e.tagName, n.props && n.props.type)[o];
    i && i(e, t, n, s);
}
const hr = ["ctrl", "shift", "alt", "meta"],
    pr = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => "button" in e && 0 !== e.button,
        middle: (e) => "button" in e && 1 !== e.button,
        right: (e) => "button" in e && 2 !== e.button,
        exact: (e, t) => hr.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    fr =
        (e, t) =>
        (n, ...s) => {
            for (let e = 0; e < t.length; e++) {
                const s = pr[t[e]];
                if (s && s(n, t)) return;
            }
            return e(n, ...s);
        },
    mr = {
        beforeMount(e, { value: t }, { transition: n }) {
            (e._vod = "none" === e.style.display ? "" : e.style.display),
                n && t ? n.beforeEnter(e) : gr(e, t);
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e);
        },
        updated(e, { value: t, oldValue: n }, { transition: s }) {
            !t != !n &&
                (s
                    ? t
                        ? (s.beforeEnter(e), gr(e, !0), s.enter(e))
                        : s.leave(e, () => {
                              gr(e, !1);
                          })
                    : gr(e, t));
        },
        beforeUnmount(e, { value: t }) {
            gr(e, t);
        },
    };
function gr(e, t) {
    e.style.display = t ? e._vod : "none";
}
const yr = w(
    {
        patchProp: (e, t, n, s, o = !1, i, r, a, c) => {
            if (0 === t.indexOf("change:"))
                return (function (e, t, n, s = null) {
                    if (!n || !s) return;
                    const o = t.replace("change:", ""),
                        { attrs: i } = s,
                        r = i[o],
                        a = (e.__wxsProps || (e.__wxsProps = {}))[o];
                    if (a === r) return;
                    e.__wxsProps[o] = r;
                    const c = s.proxy;
                    bn(() => {
                        n(r, a, c.$gcd(c, !0), c.$gcd(c, !1));
                    });
                })(e, t, s, r);
            "class" === t
                ? (function (e, t, n) {
                      const { __wxsAddClass: s, __wxsRemoveClass: o } = e;
                      o &&
                          o.length &&
                          ((t = (t || "")
                              .split(/\s+/)
                              .filter((e) => -1 === o.indexOf(e))
                              .join(" ")),
                          (o.length = 0)),
                          s && s.length && (t = (t || "") + " " + s.join(" "));
                      const i = e._vtc;
                      i && (t = (t ? [t, ...i] : [...i]).join(" ")),
                          null == t
                              ? e.removeAttribute("class")
                              : n
                              ? e.setAttribute("class", t)
                              : (e.className = t);
                  })(e, s, o)
                : "style" === t
                ? (function (e, t, n) {
                      const s = e.style,
                          o = x(n);
                      if (n && !o) {
                          if (t && !x(t))
                              for (const e in t) null == n[e] && Ei(s, e, "");
                          for (const e in n) Ei(s, e, n[e]);
                      } else {
                          const i = s.display;
                          o
                              ? t !== n && (s.cssText = n)
                              : t && e.removeAttribute("style"),
                              "_vod" in e && (s.display = i);
                      }
                      const { __wxsStyle: i } = e;
                      if (i) for (const r in i) Ei(s, r, i[r]);
                  })(e, n, s)
                : S(t)
                ? E(t) || Pi(e, t, 0, s, r)
                : (
                      "." === t[0]
                          ? ((t = t.slice(1)), 1)
                          : "^" === t[0]
                          ? ((t = t.slice(1)), 0)
                          : (function (e, t, n, s) {
                                if (s)
                                    return (
                                        "innerHTML" === t ||
                                        "textContent" === t ||
                                        !!(t in e && Bi.test(t) && N(n))
                                    );
                                if (
                                    "spellcheck" === t ||
                                    "draggable" === t ||
                                    "translate" === t
                                )
                                    return !1;
                                if ("form" === t) return !1;
                                if ("list" === t && "INPUT" === e.tagName)
                                    return !1;
                                if ("type" === t && "TEXTAREA" === e.tagName)
                                    return !1;
                                if (Bi.test(t) && x(n)) return !1;
                                return t in e;
                            })(e, t, s, o)
                  )
                ? (function (e, t, n, s, o, i, r) {
                      if ("innerHTML" === t || "textContent" === t)
                          return (
                              s && r(s, o, i), void (e[t] = null == n ? "" : n)
                          );
                      if (
                          "value" === t &&
                          "PROGRESS" !== e.tagName &&
                          !e.tagName.includes("-")
                      ) {
                          e._value = n;
                          const s = null == n ? "" : n;
                          return (
                              (e.value === s && "OPTION" !== e.tagName) ||
                                  (e.value = s),
                              void (null == n && e.removeAttribute(t))
                          );
                      }
                      let a = !1;
                      if ("" === n || null == n) {
                          const s = typeof e[t];
                          "boolean" === s
                              ? (n = u(n))
                              : null == n && "string" === s
                              ? ((n = ""), (a = !0))
                              : "number" === s && ((n = 0), (a = !0));
                      }
                      try {
                          e[t] = n;
                      } catch (lf) {}
                      a && e.removeAttribute(t);
                  })(e, t, s, i, r, a, c)
                : ("true-value" === t
                      ? (e._trueValue = s)
                      : "false-value" === t && (e._falseValue = s),
                  (function (e, t, n, s, o) {
                      if (s && t.startsWith("xlink:"))
                          null == n
                              ? e.removeAttributeNS(Ai, t.slice(6, t.length))
                              : e.setAttributeNS(Ai, t, n);
                      else {
                          const s = l(t);
                          null == n || (s && !u(n))
                              ? e.removeAttribute(t)
                              : e.setAttribute(t, s ? "" : n);
                      }
                  })(e, t, s, o));
        },
        forcePatchProp: (e, t) =>
            0 === t.indexOf("change:") ||
            ("class" === t && e.__wxsClassChanged
                ? ((e.__wxsClassChanged = !1), !0)
                : !("style" !== t || !e.__wxsStyleChanged) &&
                  ((e.__wxsStyleChanged = !1), !0)),
    },
    bi
);
let vr;
const br = (...e) => {
    const t = (vr || (vr = _o(yr))).createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (e) => {
            const s = (function (e) {
                if (x(e)) {
                    return document.querySelector(e);
                }
                return e;
            })(e);
            if (!s) return;
            const o = t._component;
            N(o) || o.render || o.template || (o.template = s.innerHTML),
                (s.innerHTML = "");
            const i = n(s, !1, s instanceof SVGElement);
            return (
                s instanceof Element &&
                    (s.removeAttribute("v-cloak"),
                    s.setAttribute("data-v-app", "")),
                i
            );
        }),
        t
    );
};
const Sr = ["{", "}"];
const Er = /^(?:\d)+/,
    wr = /^(?:\w)+/;
const Cr = Object.prototype.hasOwnProperty,
    _r = (e, t) => Cr.call(e, t),
    Mr = new (class {
        constructor() {
            this._caches = Object.create(null);
        }
        interpolate(e, t, n = Sr) {
            if (!t) return [e];
            let s = this._caches[e];
            return (
                s ||
                    ((s = (function (e, [t, n]) {
                        const s = [];
                        let o = 0,
                            i = "";
                        for (; o < e.length; ) {
                            let r = e[o++];
                            if (r === t) {
                                i && s.push({ type: "text", value: i }),
                                    (i = "");
                                let t = "";
                                for (r = e[o++]; void 0 !== r && r !== n; )
                                    (t += r), (r = e[o++]);
                                const a = r === n,
                                    c = Er.test(t)
                                        ? "list"
                                        : a && wr.test(t)
                                        ? "named"
                                        : "unknown";
                                s.push({ value: t, type: c });
                            } else i += r;
                        }
                        return i && s.push({ type: "text", value: i }), s;
                    })(e, n)),
                    (this._caches[e] = s)),
                (function (e, t) {
                    const n = [];
                    let s = 0;
                    const o = Array.isArray(t)
                        ? "list"
                        : ((i = t),
                          null !== i && "object" == typeof i
                              ? "named"
                              : "unknown");
                    var i;
                    if ("unknown" === o) return n;
                    for (; s < e.length; ) {
                        const i = e[s];
                        switch (i.type) {
                            case "text":
                                n.push(i.value);
                                break;
                            case "list":
                                n.push(t[parseInt(i.value, 10)]);
                                break;
                            case "named":
                                "named" === o && n.push(t[i.value]);
                        }
                        s++;
                    }
                    return n;
                })(s, t)
            );
        }
    })();
function Tr(e, t) {
    if (!e) return;
    if (((e = e.trim().replace(/_/g, "-")), t && t[e])) return e;
    if ("chinese" === (e = e.toLowerCase())) return "zh-Hans";
    if (0 === e.indexOf("zh"))
        return e.indexOf("-hans") > -1
            ? "zh-Hans"
            : e.indexOf("-hant") > -1
            ? "zh-Hant"
            : ((n = e),
              ["-tw", "-hk", "-mo", "-cht"].find((e) => -1 !== n.indexOf(e))
                  ? "zh-Hant"
                  : "zh-Hans");
    var n;
    let s = ["en", "fr", "es"];
    t && Object.keys(t).length > 0 && (s = Object.keys(t));
    const o = (function (e, t) {
        return t.find((t) => 0 === e.indexOf(t));
    })(e, s);
    return o || void 0;
}
class Ir {
    constructor({
        locale: e,
        fallbackLocale: t,
        messages: n,
        watcher: s,
        formater: o,
    }) {
        (this.locale = "en"),
            (this.fallbackLocale = "en"),
            (this.message = {}),
            (this.messages = {}),
            (this.watchers = []),
            t && (this.fallbackLocale = t),
            (this.formater = o || Mr),
            (this.messages = n || {}),
            this.setLocale(e || "en"),
            s && this.watchLocale(s);
    }
    setLocale(e) {
        const t = this.locale;
        (this.locale = Tr(e, this.messages) || this.fallbackLocale),
            this.messages[this.locale] || (this.messages[this.locale] = {}),
            (this.message = this.messages[this.locale]),
            t !== this.locale &&
                this.watchers.forEach((e) => {
                    e(this.locale, t);
                });
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(e) {
        const t = this.watchers.push(e) - 1;
        return () => {
            this.watchers.splice(t, 1);
        };
    }
    add(e, t, n = !0) {
        const s = this.messages[e];
        s
            ? n
                ? Object.assign(s, t)
                : Object.keys(t).forEach((e) => {
                      _r(s, e) || (s[e] = t[e]);
                  })
            : (this.messages[e] = t);
    }
    f(e, t, n) {
        return this.formater.interpolate(e, t, n).join("");
    }
    t(e, t, n) {
        let s = this.message;
        return (
            "string" == typeof t
                ? (t = Tr(t, this.messages)) && (s = this.messages[t])
                : (n = t),
            _r(s, e)
                ? this.formater.interpolate(s[e], n).join("")
                : (console.warn(
                      `Cannot translate the value of keypath ${e}. Use the value of keypath as default.`
                  ),
                  e)
        );
    }
}
function kr(e, t = {}, n, s) {
    "string" != typeof e && ([e, t] = [t, e]),
        "string" != typeof e &&
            (e =
                "undefined" != typeof uni && $u
                    ? $u()
                    : "undefined" != typeof global && global.getLocale
                    ? global.getLocale()
                    : "en"),
        "string" != typeof n &&
            (n =
                ("undefined" != typeof __uniConfig &&
                    __uniConfig.fallbackLocale) ||
                "en");
    const o = new Ir({ locale: e, fallbackLocale: n, messages: t, watcher: s });
    let i = (e, t) => {
        {
            let e = !1;
            i = function (t, n) {
                const s = Fh().$vm;
                return (
                    s &&
                        (s.$locale,
                        e ||
                            ((e = !0),
                            (function (e, t) {
                                e.$watchLocale
                                    ? e.$watchLocale((e) => {
                                          t.setLocale(e);
                                      })
                                    : e.$watch(
                                          () => e.$locale,
                                          (e) => {
                                              t.setLocale(e);
                                          }
                                      );
                            })(s, o))),
                    o.t(t, n)
                );
            };
        }
        return i(e, t);
    };
    return {
        i18n: o,
        f: (e, t, n) => o.f(e, t, n),
        t: (e, t) => i(e, t),
        add: (e, t, n = !0) => o.add(e, t, n),
        watch: (e) => o.watchLocale(e),
        getLocale: () => o.getLocale(),
        setLocale: (e) => o.setLocale(e),
    };
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Or = "undefined" != typeof window;
const Nr = Object.assign;
function xr(e, t) {
    const n = {};
    for (const s in t) {
        const o = t[s];
        n[s] = Rr(o) ? o.map(e) : e(o);
    }
    return n;
}
const Ar = () => {},
    Rr = Array.isArray,
    Pr = /\/$/;
function Dr(e, t, n = "/") {
    let s,
        o = {},
        i = "",
        r = "";
    const a = t.indexOf("#");
    let c = t.indexOf("?");
    return (
        a < c && a >= 0 && (c = -1),
        c > -1 &&
            ((s = t.slice(0, c)),
            (i = t.slice(c + 1, a > -1 ? a : t.length)),
            (o = e(i))),
        a > -1 && ((s = s || t.slice(0, a)), (r = t.slice(a, t.length))),
        (s = (function (e, t) {
            if (e.startsWith("/")) return e;
            if (!e) return t;
            const n = t.split("/"),
                s = e.split("/");
            let o,
                i,
                r = n.length - 1;
            for (o = 0; o < s.length; o++)
                if (((i = s[o]), "." !== i)) {
                    if (".." !== i) break;
                    r > 1 && r--;
                }
            return (
                n.slice(0, r).join("/") +
                "/" +
                s.slice(o - (o === s.length ? 1 : 0)).join("/")
            );
        })(null != s ? s : t, n)),
        { fullPath: s + (i && "?") + i + r, path: s, query: o, hash: r }
    );
}
function Lr(e, t) {
    return t && e.toLowerCase().startsWith(t.toLowerCase())
        ? e.slice(t.length) || "/"
        : e;
}
function Fr(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ur(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Br(e[n], t[n])) return !1;
    return !0;
}
function Br(e, t) {
    return Rr(e) ? jr(e, t) : Rr(t) ? jr(t, e) : e === t;
}
function jr(e, t) {
    return Rr(t)
        ? e.length === t.length && e.every((e, n) => e === t[n])
        : 1 === e.length && e[0] === t;
}
var Gr, $r, qr, Vr;
function Hr(e) {
    if (!e)
        if (Or) {
            const t = document.querySelector("base");
            e = (e = (t && t.getAttribute("href")) || "/").replace(
                /^\w+:\/\/[^\/]+/,
                ""
            );
        } else e = "/";
    return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(Pr, "");
}
(($r = Gr || (Gr = {})).pop = "pop"),
    ($r.push = "push"),
    ((Vr = qr || (qr = {})).back = "back"),
    (Vr.forward = "forward"),
    (Vr.unknown = "");
const Wr = /^[^#]+#/;
function zr(e, t) {
    return e.replace(Wr, "#") + t;
}
const Xr = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Jr(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            s = "string" == typeof n && n.startsWith("#"),
            o =
                "string" == typeof n
                    ? s
                        ? document.getElementById(n.slice(1))
                        : document.querySelector(n)
                    : n;
        if (!o) return;
        t = (function (e, t) {
            const n = document.documentElement.getBoundingClientRect(),
                s = e.getBoundingClientRect();
            return {
                behavior: t.behavior,
                left: s.left - n.left - (t.left || 0),
                top: s.top - n.top - (t.top || 0),
            };
        })(o, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              null != t.left ? t.left : window.pageXOffset,
              null != t.top ? t.top : window.pageYOffset
          );
}
function Kr(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const Yr = new Map();
function Qr(e, t) {
    const { pathname: n, search: s, hash: o } = t,
        i = e.indexOf("#");
    if (i > -1) {
        let t = o.includes(e.slice(i)) ? e.slice(i).length : 1,
            n = o.slice(t);
        return "/" !== n[0] && (n = "/" + n), Lr(n, "");
    }
    return Lr(n, e) + s + o;
}
function Zr(e, t, n, s = !1, o = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: o ? Xr() : null,
    };
}
function ea(e) {
    const { history: t, location: n } = window,
        s = { value: Qr(e, n) },
        o = { value: t.state };
    function i(s, i, r) {
        const a = e.indexOf("#"),
            c =
                a > -1
                    ? (n.host && document.querySelector("base")
                          ? e
                          : e.slice(a)) + s
                    : location.protocol + "//" + location.host + e + s;
        try {
            t[r ? "replaceState" : "pushState"](i, "", c), (o.value = i);
        } catch (l) {
            console.error(l), n[r ? "replace" : "assign"](c);
        }
    }
    return (
        o.value ||
            i(
                s.value,
                {
                    back: null,
                    current: s.value,
                    forward: null,
                    position: t.length - 1,
                    replaced: !0,
                    scroll: null,
                },
                !0
            ),
        {
            location: s,
            state: o,
            push: function (e, n) {
                const r = Nr({}, o.value, t.state, {
                    forward: e,
                    scroll: Xr(),
                });
                i(r.current, r, !0),
                    i(
                        e,
                        Nr(
                            {},
                            Zr(s.value, e, null),
                            { position: r.position + 1 },
                            n
                        ),
                        !1
                    ),
                    (s.value = e);
            },
            replace: function (e, n) {
                i(
                    e,
                    Nr(
                        {},
                        t.state,
                        Zr(o.value.back, e, o.value.forward, !0),
                        n,
                        { position: o.value.position }
                    ),
                    !0
                ),
                    (s.value = e);
            },
        }
    );
}
function ta(e) {
    const t = ea((e = Hr(e))),
        n = (function (e, t, n, s) {
            let o = [],
                i = [],
                r = null;
            const a = ({ state: i }) => {
                const a = Qr(e, location),
                    c = n.value,
                    l = t.value;
                let u = 0;
                if (i) {
                    if (((n.value = a), (t.value = i), r && r === c))
                        return void (r = null);
                    u = l ? i.position - l.position : 0;
                } else s(a);
                o.forEach((e) => {
                    e(n.value, c, {
                        delta: u,
                        type: Gr.pop,
                        direction: u
                            ? u > 0
                                ? qr.forward
                                : qr.back
                            : qr.unknown,
                    });
                });
            };
            function c() {
                const { history: e } = window;
                e.state &&
                    e.replaceState(Nr({}, e.state, { scroll: Xr() }), "");
            }
            return (
                window.addEventListener("popstate", a),
                window.addEventListener("beforeunload", c),
                {
                    pauseListeners: function () {
                        r = n.value;
                    },
                    listen: function (e) {
                        o.push(e);
                        const t = () => {
                            const t = o.indexOf(e);
                            t > -1 && o.splice(t, 1);
                        };
                        return i.push(t), t;
                    },
                    destroy: function () {
                        for (const e of i) e();
                        (i = []),
                            window.removeEventListener("popstate", a),
                            window.removeEventListener("beforeunload", c);
                    },
                }
            );
        })(e, t.state, t.location, t.replace);
    const s = Nr(
        {
            location: "",
            base: e,
            go: function (e, t = !0) {
                t || n.pauseListeners(), history.go(e);
            },
            createHref: zr.bind(null, e),
        },
        t,
        n
    );
    return (
        Object.defineProperty(s, "location", {
            enumerable: !0,
            get: () => t.location.value,
        }),
        Object.defineProperty(s, "state", {
            enumerable: !0,
            get: () => t.state.value,
        }),
        s
    );
}
function na(e) {
    return "string" == typeof e || "symbol" == typeof e;
}
const sa = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0,
    },
    oa = Symbol("");
var ia, ra;
function aa(e, t) {
    return Nr(new Error(), { type: e, [oa]: !0 }, t);
}
function ca(e, t) {
    return e instanceof Error && oa in e && (null == t || !!(e.type & t));
}
((ra = ia || (ia = {}))[(ra.aborted = 4)] = "aborted"),
    (ra[(ra.cancelled = 8)] = "cancelled"),
    (ra[(ra.duplicated = 16)] = "duplicated");
const la = { sensitive: !1, strict: !1, start: !0, end: !0 },
    ua = /[.+*?^${}()[\]/\\]/g;
function da(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const s = t[n] - e[n];
        if (s) return s;
        n++;
    }
    return e.length < t.length
        ? 1 === e.length && 80 === e[0]
            ? -1
            : 1
        : e.length > t.length
        ? 1 === t.length && 80 === t[0]
            ? 1
            : -1
        : 0;
}
function ha(e, t) {
    let n = 0;
    const s = e.score,
        o = t.score;
    for (; n < s.length && n < o.length; ) {
        const e = da(s[n], o[n]);
        if (e) return e;
        n++;
    }
    if (1 === Math.abs(o.length - s.length)) {
        if (pa(s)) return 1;
        if (pa(o)) return -1;
    }
    return o.length - s.length;
}
function pa(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}
const fa = { type: 0, value: "" },
    ma = /[a-zA-Z0-9_]/;
function ga(e, t, n) {
    const s = (function (e, t) {
            const n = Nr({}, la, t),
                s = [];
            let o = n.start ? "^" : "";
            const i = [];
            for (const c of e) {
                const e = c.length ? [] : [90];
                n.strict && !c.length && (o += "/");
                for (let t = 0; t < c.length; t++) {
                    const s = c[t];
                    let r = 40 + (n.sensitive ? 0.25 : 0);
                    if (0 === s.type)
                        t || (o += "/"),
                            (o += s.value.replace(ua, "\\$&")),
                            (r += 40);
                    else if (1 === s.type) {
                        const {
                            value: e,
                            repeatable: n,
                            optional: l,
                            regexp: u,
                        } = s;
                        i.push({ name: e, repeatable: n, optional: l });
                        const d = u || "[^/]+?";
                        if ("[^/]+?" !== d) {
                            r += 10;
                            try {
                                new RegExp(`(${d})`);
                            } catch (a) {
                                throw new Error(
                                    `Invalid custom RegExp for param "${e}" (${d}): ` +
                                        a.message
                                );
                            }
                        }
                        let h = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
                        t || (h = l && c.length < 2 ? `(?:/${h})` : "/" + h),
                            l && (h += "?"),
                            (o += h),
                            (r += 20),
                            l && (r += -8),
                            n && (r += -20),
                            ".*" === d && (r += -50);
                    }
                    e.push(r);
                }
                s.push(e);
            }
            if (n.strict && n.end) {
                const e = s.length - 1;
                s[e][s[e].length - 1] += 0.7000000000000001;
            }
            n.strict || (o += "/?"),
                n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
            const r = new RegExp(o, n.sensitive ? "" : "i");
            return {
                re: r,
                score: s,
                keys: i,
                parse: function (e) {
                    const t = e.match(r),
                        n = {};
                    if (!t) return null;
                    for (let s = 1; s < t.length; s++) {
                        const e = t[s] || "",
                            o = i[s - 1];
                        n[o.name] = e && o.repeatable ? e.split("/") : e;
                    }
                    return n;
                },
                stringify: function (t) {
                    let n = "",
                        s = !1;
                    for (const o of e) {
                        (s && n.endsWith("/")) || (n += "/"), (s = !1);
                        for (const e of o)
                            if (0 === e.type) n += e.value;
                            else if (1 === e.type) {
                                const {
                                        value: i,
                                        repeatable: r,
                                        optional: a,
                                    } = e,
                                    c = i in t ? t[i] : "";
                                if (Rr(c) && !r)
                                    throw new Error(
                                        `Provided param "${i}" is an array but it is not repeatable (* or + modifiers)`
                                    );
                                const l = Rr(c) ? c.join("/") : c;
                                if (!l) {
                                    if (!a)
                                        throw new Error(
                                            `Missing required param "${i}"`
                                        );
                                    o.length < 2 &&
                                        (n.endsWith("/")
                                            ? (n = n.slice(0, -1))
                                            : (s = !0));
                                }
                                n += l;
                            }
                    }
                    return n || "/";
                },
            };
        })(
            (function (e) {
                if (!e) return [[]];
                if ("/" === e) return [[fa]];
                if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
                function t(e) {
                    throw new Error(`ERR (${n})/"${l}": ${e}`);
                }
                let n = 0,
                    s = n;
                const o = [];
                let i;
                function r() {
                    i && o.push(i), (i = []);
                }
                let a,
                    c = 0,
                    l = "",
                    u = "";
                function d() {
                    l &&
                        (0 === n
                            ? i.push({ type: 0, value: l })
                            : 1 === n || 2 === n || 3 === n
                            ? (i.length > 1 &&
                                  ("*" === a || "+" === a) &&
                                  t(
                                      `A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`
                                  ),
                              i.push({
                                  type: 1,
                                  value: l,
                                  regexp: u,
                                  repeatable: "*" === a || "+" === a,
                                  optional: "*" === a || "?" === a,
                              }))
                            : t("Invalid state to consume buffer"),
                        (l = ""));
                }
                function h() {
                    l += a;
                }
                for (; c < e.length; )
                    if (((a = e[c++]), "\\" !== a || 2 === n))
                        switch (n) {
                            case 0:
                                "/" === a
                                    ? (l && d(), r())
                                    : ":" === a
                                    ? (d(), (n = 1))
                                    : h();
                                break;
                            case 4:
                                h(), (n = s);
                                break;
                            case 1:
                                "(" === a
                                    ? (n = 2)
                                    : ma.test(a)
                                    ? h()
                                    : (d(),
                                      (n = 0),
                                      "*" !== a &&
                                          "?" !== a &&
                                          "+" !== a &&
                                          c--);
                                break;
                            case 2:
                                ")" === a
                                    ? "\\" == u[u.length - 1]
                                        ? (u = u.slice(0, -1) + a)
                                        : (n = 3)
                                    : (u += a);
                                break;
                            case 3:
                                d(),
                                    (n = 0),
                                    "*" !== a && "?" !== a && "+" !== a && c--,
                                    (u = "");
                                break;
                            default:
                                t("Unknown state");
                        }
                    else (s = n), (n = 4);
                return (
                    2 === n && t(`Unfinished custom RegExp for param "${l}"`),
                    d(),
                    r(),
                    o
                );
            })(e.path),
            n
        ),
        o = Nr(s, { record: e, parent: t, children: [], alias: [] });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function ya(e, t) {
    const n = [],
        s = new Map();
    function o(e, n, s) {
        const a = !s,
            c = (function (e) {
                return {
                    path: e.path,
                    redirect: e.redirect,
                    name: e.name,
                    meta: e.meta || {},
                    aliasOf: void 0,
                    beforeEnter: e.beforeEnter,
                    props: ba(e),
                    children: e.children || [],
                    instances: {},
                    leaveGuards: new Set(),
                    updateGuards: new Set(),
                    enterCallbacks: {},
                    components:
                        "components" in e
                            ? e.components || null
                            : e.component && { default: e.component },
                };
            })(e);
        c.aliasOf = s && s.record;
        const l = wa(t, e),
            u = [c];
        if ("alias" in e) {
            const t = "string" == typeof e.alias ? [e.alias] : e.alias;
            for (const e of t)
                u.push(
                    Nr({}, c, {
                        components: s ? s.record.components : c.components,
                        path: e,
                        aliasOf: s ? s.record : c,
                    })
                );
        }
        let d, h;
        for (const t of u) {
            const { path: u } = t;
            if (n && "/" !== u[0]) {
                const e = n.record.path,
                    s = "/" === e[e.length - 1] ? "" : "/";
                t.path = n.record.path + (u && s + u);
            }
            if (
                ((d = ga(t, n, l)),
                s
                    ? s.alias.push(d)
                    : ((h = h || d),
                      h !== d && h.alias.push(d),
                      a && e.name && !Sa(d) && i(e.name)),
                c.children)
            ) {
                const e = c.children;
                for (let t = 0; t < e.length; t++)
                    o(e[t], d, s && s.children[t]);
            }
            (s = s || d),
                ((d.record.components &&
                    Object.keys(d.record.components).length) ||
                    d.record.name ||
                    d.record.redirect) &&
                    r(d);
        }
        return h
            ? () => {
                  i(h);
              }
            : Ar;
    }
    function i(e) {
        if (na(e)) {
            const t = s.get(e);
            t &&
                (s.delete(e),
                n.splice(n.indexOf(t), 1),
                t.children.forEach(i),
                t.alias.forEach(i));
        } else {
            const t = n.indexOf(e);
            t > -1 &&
                (n.splice(t, 1),
                e.record.name && s.delete(e.record.name),
                e.children.forEach(i),
                e.alias.forEach(i));
        }
    }
    function r(e) {
        let t = 0;
        for (
            ;
            t < n.length &&
            ha(e, n[t]) >= 0 &&
            (e.record.path !== n[t].record.path || !Ca(e, n[t]));

        )
            t++;
        n.splice(t, 0, e), e.record.name && !Sa(e) && s.set(e.record.name, e);
    }
    return (
        (t = wa({ strict: !1, end: !0, sensitive: !1 }, t)),
        e.forEach((e) => o(e)),
        {
            addRoute: o,
            resolve: function (e, t) {
                let o,
                    i,
                    r,
                    a = {};
                if ("name" in e && e.name) {
                    if (((o = s.get(e.name)), !o)) throw aa(1, { location: e });
                    (r = o.record.name),
                        (a = Nr(
                            va(
                                t.params,
                                o.keys
                                    .filter((e) => !e.optional)
                                    .map((e) => e.name)
                            ),
                            e.params &&
                                va(
                                    e.params,
                                    o.keys.map((e) => e.name)
                                )
                        )),
                        (i = o.stringify(a));
                } else if ("path" in e)
                    (i = e.path),
                        (o = n.find((e) => e.re.test(i))),
                        o && ((a = o.parse(i)), (r = o.record.name));
                else {
                    if (
                        ((o = t.name
                            ? s.get(t.name)
                            : n.find((e) => e.re.test(t.path))),
                        !o)
                    )
                        throw aa(1, { location: e, currentLocation: t });
                    (r = o.record.name),
                        (a = Nr({}, t.params, e.params)),
                        (i = o.stringify(a));
                }
                const c = [];
                let l = o;
                for (; l; ) c.unshift(l.record), (l = l.parent);
                return { name: r, path: i, params: a, matched: c, meta: Ea(c) };
            },
            removeRoute: i,
            getRoutes: function () {
                return n;
            },
            getRecordMatcher: function (e) {
                return s.get(e);
            },
        }
    );
}
function va(e, t) {
    const n = {};
    for (const s of t) s in e && (n[s] = e[s]);
    return n;
}
function ba(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const s in e.components) t[s] = "boolean" == typeof n ? n : n[s];
    return t;
}
function Sa(e) {
    for (; e; ) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function Ea(e) {
    return e.reduce((e, t) => Nr(e, t.meta), {});
}
function wa(e, t) {
    const n = {};
    for (const s in e) n[s] = s in t ? t[s] : e[s];
    return n;
}
function Ca(e, t) {
    return t.children.some((t) => t === e || Ca(e, t));
}
const _a = /#/g,
    Ma = /&/g,
    Ta = /\//g,
    Ia = /=/g,
    ka = /\?/g,
    Oa = /\+/g,
    Na = /%5B/g,
    xa = /%5D/g,
    Aa = /%5E/g,
    Ra = /%60/g,
    Pa = /%7B/g,
    Da = /%7C/g,
    La = /%7D/g,
    Fa = /%20/g;
function Ua(e) {
    return encodeURI("" + e)
        .replace(Da, "|")
        .replace(Na, "[")
        .replace(xa, "]");
}
function Ba(e) {
    return Ua(e)
        .replace(Oa, "%2B")
        .replace(Fa, "+")
        .replace(_a, "%23")
        .replace(Ma, "%26")
        .replace(Ra, "`")
        .replace(Pa, "{")
        .replace(La, "}")
        .replace(Aa, "^");
}
function ja(e) {
    return null == e
        ? ""
        : (function (e) {
              return Ua(e).replace(_a, "%23").replace(ka, "%3F");
          })(e).replace(Ta, "%2F");
}
function Ga(e) {
    try {
        return decodeURIComponent("" + e);
    } catch (t) {}
    return "" + e;
}
function $a(e) {
    const t = {};
    if ("" === e || "?" === e) return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let s = 0; s < n.length; ++s) {
        const e = n[s].replace(Oa, " "),
            o = e.indexOf("="),
            i = Ga(o < 0 ? e : e.slice(0, o)),
            r = o < 0 ? null : Ga(e.slice(o + 1));
        if (i in t) {
            let e = t[i];
            Rr(e) || (e = t[i] = [e]), e.push(r);
        } else t[i] = r;
    }
    return t;
}
function qa(e) {
    let t = "";
    for (let n in e) {
        const s = e[n];
        if (((n = Ba(n).replace(Ia, "%3D")), null == s)) {
            void 0 !== s && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (Rr(s) ? s.map((e) => e && Ba(e)) : [s && Ba(s)]).forEach((e) => {
            void 0 !== e &&
                ((t += (t.length ? "&" : "") + n), null != e && (t += "=" + e));
        });
    }
    return t;
}
function Va(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        void 0 !== s &&
            (t[n] = Rr(s)
                ? s.map((e) => (null == e ? null : "" + e))
                : null == s
                ? s
                : "" + s);
    }
    return t;
}
const Ha = Symbol(""),
    Wa = Symbol(""),
    za = Symbol(""),
    Xa = Symbol(""),
    Ja = Symbol("");
function Ka() {
    let e = [];
    return {
        add: function (t) {
            return (
                e.push(t),
                () => {
                    const n = e.indexOf(t);
                    n > -1 && e.splice(n, 1);
                }
            );
        },
        list: () => e,
        reset: function () {
            e = [];
        },
    };
}
function Ya(e, t, n, s, o) {
    const i = s && (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
    return () =>
        new Promise((r, a) => {
            const c = (e) => {
                    var c;
                    !1 === e
                        ? a(aa(4, { from: n, to: t }))
                        : e instanceof Error
                        ? a(e)
                        : "string" == typeof (c = e) ||
                          (c && "object" == typeof c)
                        ? a(aa(2, { from: t, to: e }))
                        : (i &&
                              s.enterCallbacks[o] === i &&
                              "function" == typeof e &&
                              i.push(e),
                          r());
                },
                l = e.call(s && s.instances[o], t, n, c);
            let u = Promise.resolve(l);
            e.length < 3 && (u = u.then(c)), u.catch((e) => a(e));
        });
}
function Qa(e, t, n, s) {
    const o = [];
    for (const r of e)
        for (const e in r.components) {
            let a = r.components[e];
            if ("beforeRouteEnter" === t || r.instances[e])
                if (
                    "object" == typeof (i = a) ||
                    "displayName" in i ||
                    "props" in i ||
                    "__vccOpts" in i
                ) {
                    const i = (a.__vccOpts || a)[t];
                    i && o.push(Ya(i, n, s, r, e));
                } else {
                    let i = a();
                    o.push(() =>
                        i.then((o) => {
                            if (!o)
                                return Promise.reject(
                                    new Error(
                                        `Couldn't resolve component "${e}" at "${r.path}"`
                                    )
                                );
                            const i =
                                (a = o).__esModule ||
                                "Module" === a[Symbol.toStringTag]
                                    ? o.default
                                    : o;
                            var a;
                            r.components[e] = i;
                            const c = (i.__vccOpts || i)[t];
                            return c && Ya(c, n, s, r, e)();
                        })
                    );
                }
        }
    var i;
    return o;
}
function Za(e) {
    const t = Gn(za),
        n = Gn(Xa),
        s = hi(() => t.resolve(tn(e.to))),
        o = hi(() => {
            const { matched: e } = s.value,
                { length: t } = e,
                o = e[t - 1],
                i = n.matched;
            if (!o || !i.length) return -1;
            const r = i.findIndex(Fr.bind(null, o));
            if (r > -1) return r;
            const a = tc(e[t - 2]);
            return t > 1 && tc(o) === a && i[i.length - 1].path !== a
                ? i.findIndex(Fr.bind(null, e[t - 2]))
                : r;
        }),
        i = hi(
            () =>
                o.value > -1 &&
                (function (e, t) {
                    for (const n in t) {
                        const s = t[n],
                            o = e[n];
                        if ("string" == typeof s) {
                            if (s !== o) return !1;
                        } else if (
                            !Rr(o) ||
                            o.length !== s.length ||
                            s.some((e, t) => e !== o[t])
                        )
                            return !1;
                    }
                    return !0;
                })(n.params, s.value.params)
        ),
        r = hi(
            () =>
                o.value > -1 &&
                o.value === n.matched.length - 1 &&
                Ur(n.params, s.value.params)
        );
    return {
        route: s,
        href: hi(() => s.value.href),
        isActive: i,
        isExactActive: r,
        navigate: function (n = {}) {
            return (function (e) {
                if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
                if (e.defaultPrevented) return;
                if (void 0 !== e.button && 0 !== e.button) return;
                if (e.currentTarget && e.currentTarget.getAttribute) {
                    const t = e.currentTarget.getAttribute("target");
                    if (/\b_blank\b/i.test(t)) return;
                }
                e.preventDefault && e.preventDefault();
                return !0;
            })(n)
                ? t[tn(e.replace) ? "replace" : "push"](tn(e.to)).catch(Ar)
                : Promise.resolve();
        },
    };
}
const ec = os({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
        to: { type: [String, Object], required: !0 },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Za,
    setup(e, { slots: t }) {
        const n = Ut(Za(e)),
            { options: s } = Gn(za),
            o = hi(() => ({
                [nc(e.activeClass, s.linkActiveClass, "router-link-active")]:
                    n.isActive,
                [nc(
                    e.exactActiveClass,
                    s.linkExactActiveClass,
                    "router-link-exact-active"
                )]: n.isExactActive,
            }));
        return () => {
            const s = t.default && t.default(n);
            return e.custom
                ? s
                : pi(
                      "a",
                      {
                          "aria-current": n.isExactActive
                              ? e.ariaCurrentValue
                              : null,
                          href: n.href,
                          onClick: n.navigate,
                          class: o.value,
                      },
                      s
                  );
        };
    },
});
function tc(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const nc = (e, t, n) => (null != e ? e : null != t ? t : n);
function sc(e, t) {
    if (!e) return null;
    const n = e(t);
    return 1 === n.length ? n[0] : n;
}
const oc = os({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
        const s = Gn(Ja),
            o = hi(() => e.route || s.value),
            i = Gn(Wa, 0),
            r = hi(() => {
                let e = tn(i);
                const { matched: t } = o.value;
                let n;
                for (; (n = t[e]) && !n.components; ) e++;
                return e;
            }),
            a = hi(() => o.value.matched[r.value]);
        jn(
            Wa,
            hi(() => r.value + 1)
        ),
            jn(Ha, a),
            jn(Ja, o);
        const c = Qt();
        return (
            Vn(
                () => [c.value, a.value, e.name],
                ([e, t, n], [s, o, i]) => {
                    t &&
                        ((t.instances[n] = e),
                        o &&
                            o !== t &&
                            e &&
                            e === s &&
                            (t.leaveGuards.size ||
                                (t.leaveGuards = o.leaveGuards),
                            t.updateGuards.size ||
                                (t.updateGuards = o.updateGuards))),
                        !e ||
                            !t ||
                            (o && Fr(t, o) && s) ||
                            (t.enterCallbacks[n] || []).forEach((t) => t(e));
                },
                { flush: "post" }
            ),
            () => {
                const s = o.value,
                    i = e.name,
                    r = a.value,
                    l = r && r.components[i];
                if (!l) return sc(n.default, { Component: l, route: s });
                const u = r.props[i],
                    d = u
                        ? !0 === u
                            ? s.params
                            : "function" == typeof u
                            ? u(s)
                            : u
                        : null,
                    h = pi(
                        l,
                        Nr({}, d, t, {
                            onVnodeUnmounted: (e) => {
                                e.component.isUnmounted &&
                                    (r.instances[i] = null);
                            },
                            ref: c,
                        })
                    );
                return sc(n.default, { Component: h, route: s }) || h;
            }
        );
    },
});
function ic(e) {
    const t = ya(e.routes, e),
        n = e.parseQuery || $a,
        s = e.stringifyQuery || qa,
        o = e.history,
        i = Ka(),
        r = Ka(),
        a = Ka(),
        c = Zt(sa, !0);
    let l = sa;
    Or &&
        e.scrollBehavior &&
        "scrollRestoration" in history &&
        (history.scrollRestoration = "manual");
    const u = xr.bind(null, (e) => "" + e),
        d = xr.bind(null, ja),
        h = xr.bind(null, Ga);
    function p(e, i) {
        if (((i = Nr({}, i || c.value)), "string" == typeof e)) {
            const s = Dr(n, e, i.path),
                r = t.resolve({ path: s.path }, i),
                a = o.createHref(s.fullPath);
            return Nr(s, r, {
                params: h(r.params),
                hash: Ga(s.hash),
                redirectedFrom: void 0,
                href: a,
            });
        }
        let r;
        if ("path" in e) r = Nr({}, e, { path: Dr(n, e.path, i.path).path });
        else {
            const t = Nr({}, e.params);
            for (const e in t) null == t[e] && delete t[e];
            (r = Nr({}, e, { params: d(e.params) })), (i.params = d(i.params));
        }
        const a = t.resolve(r, i),
            l = e.hash || "";
        a.params = u(h(a.params));
        const p = (function (e, t) {
            const n = t.query ? e(t.query) : "";
            return t.path + (n && "?") + n + (t.hash || "");
        })(
            s,
            Nr({}, e, {
                hash:
                    ((f = l),
                    Ua(f).replace(Pa, "{").replace(La, "}").replace(Aa, "^")),
                path: a.path,
            })
        );
        var f;
        const m = o.createHref(p);
        return Nr(
            {
                fullPath: p,
                hash: l,
                query: s === qa ? Va(e.query) : e.query || {},
            },
            a,
            { redirectedFrom: void 0, href: m }
        );
    }
    function f(e) {
        return "string" == typeof e ? Dr(n, e, c.value.path) : Nr({}, e);
    }
    function m(e, t) {
        if (l !== e) return aa(8, { from: t, to: e });
    }
    function g(e) {
        return v(e);
    }
    function y(e) {
        const t = e.matched[e.matched.length - 1];
        if (t && t.redirect) {
            const { redirect: n } = t;
            let s = "function" == typeof n ? n(e) : n;
            return (
                "string" == typeof s &&
                    ((s =
                        s.includes("?") || s.includes("#")
                            ? (s = f(s))
                            : { path: s }),
                    (s.params = {})),
                Nr(
                    {
                        query: e.query,
                        hash: e.hash,
                        params: "path" in s ? {} : e.params,
                    },
                    s
                )
            );
        }
    }
    function v(e, t) {
        const n = (l = p(e)),
            o = c.value,
            i = e.state,
            r = e.force,
            a = !0 === e.replace,
            u = y(n);
        if (u)
            return v(
                Nr(f(u), {
                    state: "object" == typeof u ? Nr({}, i, u.state) : i,
                    force: r,
                    replace: a,
                }),
                t || n
            );
        const d = n;
        let h;
        return (
            (d.redirectedFrom = t),
            !r &&
                (function (e, t, n) {
                    const s = t.matched.length - 1,
                        o = n.matched.length - 1;
                    return (
                        s > -1 &&
                        s === o &&
                        Fr(t.matched[s], n.matched[o]) &&
                        Ur(t.params, n.params) &&
                        e(t.query) === e(n.query) &&
                        t.hash === n.hash
                    );
                })(s, o, n) &&
                ((h = aa(16, { to: d, from: o })), N(o, o, !0, !1)),
            (h ? Promise.resolve(h) : S(d, o))
                .catch((e) => (ca(e) ? (ca(e, 2) ? e : O(e)) : k(e, d, o)))
                .then((e) => {
                    if (e) {
                        if (ca(e, 2))
                            return v(
                                Nr({ replace: a }, f(e.to), {
                                    state:
                                        "object" == typeof e.to
                                            ? Nr({}, i, e.to.state)
                                            : i,
                                    force: r,
                                }),
                                t || d
                            );
                    } else e = w(d, o, !0, a, i);
                    return E(d, o, e), e;
                })
        );
    }
    function b(e, t) {
        const n = m(e, t);
        return n ? Promise.reject(n) : Promise.resolve();
    }
    function S(e, t) {
        let n;
        const [s, o, a] = (function (e, t) {
            const n = [],
                s = [],
                o = [],
                i = Math.max(t.matched.length, e.matched.length);
            for (let r = 0; r < i; r++) {
                const i = t.matched[r];
                i && (e.matched.find((e) => Fr(e, i)) ? s.push(i) : n.push(i));
                const a = e.matched[r];
                a && (t.matched.find((e) => Fr(e, a)) || o.push(a));
            }
            return [n, s, o];
        })(e, t);
        n = Qa(s.reverse(), "beforeRouteLeave", e, t);
        for (const i of s)
            i.leaveGuards.forEach((s) => {
                n.push(Ya(s, e, t));
            });
        const c = b.bind(null, e, t);
        return (
            n.push(c),
            rc(n)
                .then(() => {
                    n = [];
                    for (const s of i.list()) n.push(Ya(s, e, t));
                    return n.push(c), rc(n);
                })
                .then(() => {
                    n = Qa(o, "beforeRouteUpdate", e, t);
                    for (const s of o)
                        s.updateGuards.forEach((s) => {
                            n.push(Ya(s, e, t));
                        });
                    return n.push(c), rc(n);
                })
                .then(() => {
                    n = [];
                    for (const s of e.matched)
                        if (s.beforeEnter && !t.matched.includes(s))
                            if (Rr(s.beforeEnter))
                                for (const o of s.beforeEnter)
                                    n.push(Ya(o, e, t));
                            else n.push(Ya(s.beforeEnter, e, t));
                    return n.push(c), rc(n);
                })
                .then(
                    () => (
                        e.matched.forEach((e) => (e.enterCallbacks = {})),
                        (n = Qa(a, "beforeRouteEnter", e, t)),
                        n.push(c),
                        rc(n)
                    )
                )
                .then(() => {
                    n = [];
                    for (const s of r.list()) n.push(Ya(s, e, t));
                    return n.push(c), rc(n);
                })
                .catch((e) => (ca(e, 8) ? e : Promise.reject(e)))
        );
    }
    function E(e, t, n) {
        for (const s of a.list()) s(e, t, n);
    }
    function w(e, t, n, s, i) {
        const r = m(e, t);
        if (r) return r;
        const a = t === sa,
            l = Or ? history.state : {};
        n &&
            (s || a
                ? o.replace(e.fullPath, Nr({ scroll: a && l && l.scroll }, i))
                : o.push(e.fullPath, i)),
            (c.value = e),
            N(e, t, n, a),
            O();
    }
    let C;
    function _() {
        C ||
            (C = o.listen((e, t, n) => {
                if (!P.listening) return;
                const s = p(e),
                    i = y(s);
                if (i) return void v(Nr(i, { replace: !0 }), s).catch(Ar);
                l = s;
                const r = c.value;
                var a, u;
                Or && ((a = Kr(r.fullPath, n.delta)), (u = Xr()), Yr.set(a, u)),
                    S(s, r)
                        .catch((e) =>
                            ca(e, 12)
                                ? e
                                : ca(e, 2)
                                ? (v(e.to, s)
                                      .then((e) => {
                                          ca(e, 20) &&
                                              !n.delta &&
                                              n.type === Gr.pop &&
                                              o.go(-1, !1);
                                      })
                                      .catch(Ar),
                                  Promise.reject())
                                : (n.delta && o.go(-n.delta, !1), k(e, s, r))
                        )
                        .then((e) => {
                            (e = e || w(s, r, !1)) &&
                                (n.delta && !ca(e, 8)
                                    ? o.go(-n.delta, !1)
                                    : n.type === Gr.pop &&
                                      ca(e, 20) &&
                                      o.go(-1, !1)),
                                E(s, r, e);
                        })
                        .catch(Ar);
            }));
    }
    let M,
        T = Ka(),
        I = Ka();
    function k(e, t, n) {
        O(e);
        const s = I.list();
        return (
            s.length ? s.forEach((s) => s(e, t, n)) : console.error(e),
            Promise.reject(e)
        );
    }
    function O(e) {
        return (
            M ||
                ((M = !e),
                _(),
                T.list().forEach(([t, n]) => (e ? n(e) : t())),
                T.reset()),
            e
        );
    }
    function N(t, n, s, o) {
        const { scrollBehavior: i } = e;
        if (!Or || !i) return Promise.resolve();
        const r =
            (!s &&
                (function (e) {
                    const t = Yr.get(e);
                    return Yr.delete(e), t;
                })(Kr(t.fullPath, 0))) ||
            ((o || !s) && history.state && history.state.scroll) ||
            null;
        return bn()
            .then(() => i(t, n, r))
            .then((e) => e && Jr(e))
            .catch((e) => k(e, t, n));
    }
    const x = (e) => o.go(e);
    let A;
    const R = new Set(),
        P = {
            currentRoute: c,
            listening: !0,
            addRoute: function (e, n) {
                let s, o;
                return (
                    na(e) ? ((s = t.getRecordMatcher(e)), (o = n)) : (o = e),
                    t.addRoute(o, s)
                );
            },
            removeRoute: function (e) {
                const n = t.getRecordMatcher(e);
                n && t.removeRoute(n);
            },
            hasRoute: function (e) {
                return !!t.getRecordMatcher(e);
            },
            getRoutes: function () {
                return t.getRoutes().map((e) => e.record);
            },
            resolve: p,
            options: e,
            push: g,
            replace: function (e) {
                return g(Nr(f(e), { replace: !0 }));
            },
            go: x,
            back: () => x(-1),
            forward: () => x(1),
            beforeEach: i.add,
            beforeResolve: r.add,
            afterEach: a.add,
            onError: I.add,
            isReady: function () {
                return M && c.value !== sa
                    ? Promise.resolve()
                    : new Promise((e, t) => {
                          T.add([e, t]);
                      });
            },
            install(e) {
                e.component("RouterLink", ec),
                    e.component("RouterView", oc),
                    (e.config.globalProperties.$router = this),
                    Object.defineProperty(e.config.globalProperties, "$route", {
                        enumerable: !0,
                        get: () => tn(c),
                    }),
                    Or &&
                        !A &&
                        c.value === sa &&
                        ((A = !0), g(o.location).catch((e) => {}));
                const t = {};
                for (const s in sa) t[s] = hi(() => c.value[s]);
                e.provide(za, this), e.provide(Xa, Ut(t)), e.provide(Ja, c);
                const n = e.unmount;
                R.add(e),
                    (e.unmount = function () {
                        R.delete(e),
                            R.size < 1 &&
                                ((l = sa),
                                C && C(),
                                (C = null),
                                (c.value = sa),
                                (A = !1),
                                (M = !1)),
                            n();
                    });
            },
        };
    return P;
}
function rc(e) {
    return e.reduce((e, t) => e.then(() => t()), Promise.resolve());
}
function ac() {
    return Gn(za);
}
function lc() {
    return Gn(Xa);
}
const uc = re(
    () =>
        "undefined" != typeof __uniConfig &&
        __uniConfig.locales &&
        !!Object.keys(__uniConfig.locales).length
);
let dc;
function hc() {
    if (!dc) {
        let e;
        if (
            ((e =
                (navigator.cookieEnabled &&
                    window.localStorage &&
                    localStorage.UNI_LOCALE) ||
                __uniConfig.locale ||
                navigator.language),
            (dc = kr(e)),
            uc())
        ) {
            const t = Object.keys(__uniConfig.locales || {});
            t.length && t.forEach((e) => dc.add(e, __uniConfig.locales[e])),
                dc.setLocale(e);
        }
    }
    return dc;
}
function pc(e, t, n) {
    return t.reduce((t, s, o) => ((t[e + s] = n[o]), t), {});
}
const fc = re(() => {
        const e = "uni.async.",
            t = ["error"];
        hc().add(
            "en",
            pc(e, t, [
                "The connection timed out, click the screen to try again.",
            ]),
            !1
        ),
            hc().add(
                "es",
                pc(e, t, [
                    "Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo.",
                ]),
                !1
            ),
            hc().add(
                "fr",
                pc(e, t, [
                    "La connexion a expiré, cliquez sur l'écran pour réessayer.",
                ]),
                !1
            ),
            hc().add("zh-Hans", pc(e, t, ["连接服务器超时，点击屏幕重试"]), !1),
            hc().add("zh-Hant", pc(e, t, ["連接服務器超時，點擊屏幕重試"]), !1);
    }),
    mc = re(() => {
        const e = "uni.showToast.",
            t = ["unpaired"];
        hc().add(
            "en",
            pc(e, t, ["Please note showToast must be paired with hideToast"]),
            !1
        ),
            hc().add(
                "es",
                pc(e, t, [
                    "Tenga en cuenta que showToast debe estar emparejado con hideToast",
                ]),
                !1
            ),
            hc().add(
                "fr",
                pc(e, t, [
                    "Veuillez noter que showToast doit être associé à hideToast",
                ]),
                !1
            ),
            hc().add(
                "zh-Hans",
                pc(e, t, ["请注意 showToast 与 hideToast 必须配对使用"]),
                !1
            ),
            hc().add(
                "zh-Hant",
                pc(e, t, ["請注意 showToast 與 hideToast 必須配對使用"]),
                !1
            );
    }),
    gc = re(() => {
        const e = "uni.showLoading.",
            t = ["unpaired"];
        hc().add(
            "en",
            pc(e, t, [
                "Please note showLoading must be paired with hideLoading",
            ]),
            !1
        ),
            hc().add(
                "es",
                pc(e, t, [
                    "Tenga en cuenta que showLoading debe estar emparejado con hideLoading",
                ]),
                !1
            ),
            hc().add(
                "fr",
                pc(e, t, [
                    "Veuillez noter que showLoading doit être associé à hideLoading",
                ]),
                !1
            ),
            hc().add(
                "zh-Hans",
                pc(e, t, ["请注意 showLoading 与 hideLoading 必须配对使用"]),
                !1
            ),
            hc().add(
                "zh-Hant",
                pc(e, t, ["請注意 showLoading 與 hideLoading 必須配對使用"]),
                !1
            );
    });
function yc(e) {
    const t = new Te();
    return {
        on: (e, n) => t.on(e, n),
        once: (e, n) => t.once(e, n),
        off: (e, n) => t.off(e, n),
        emit: (e, ...n) => t.emit(e, ...n),
        subscribe(n, s, o = !1) {
            t[o ? "once" : "on"](`${e}.${n}`, s);
        },
        unsubscribe(n, s) {
            t.off(`${e}.${n}`, s);
        },
        subscribeHandler(n, s, o) {
            t.emit(`${e}.${n}`, s, o);
        },
    };
}
let vc = 1;
const bc = Object.create(null);
function Sc(e, t) {
    return e + "." + t;
}
function Ec({ id: e, name: t, args: n }, s) {
    t = Sc(s, t);
    const o = (t) => {
            e && $p.publishHandler("invokeViewApi." + e, t);
        },
        i = bc[t];
    i ? i(n, o) : o({});
}
const wc = w(yc("service"), {
        invokeServiceMethod: (e, t, n) => {
            const { subscribe: s, publishHandler: o } = $p,
                i = n ? vc++ : 0;
            n && s("invokeServiceApi." + i, n, !0),
                o("invokeServiceApi", { id: i, name: e, args: t });
        },
    }),
    Cc = he(!0);
let _c;
function Mc() {
    _c && (clearTimeout(_c), (_c = null));
}
let Tc = 0,
    Ic = 0;
function kc(e) {
    if ((Mc(), 1 !== e.touches.length)) return;
    const { pageX: t, pageY: n } = e.touches[0];
    (Tc = t),
        (Ic = n),
        (_c = setTimeout(function () {
            const t = new CustomEvent("longpress", {
                bubbles: !0,
                cancelable: !0,
                target: e.target,
                currentTarget: e.currentTarget,
            });
            (t.touches = e.touches),
                (t.changedTouches = e.changedTouches),
                e.target.dispatchEvent(t);
        }, 350));
}
function Oc(e) {
    if (!_c) return;
    if (1 !== e.touches.length) return Mc();
    const { pageX: t, pageY: n } = e.touches[0];
    return Math.abs(t - Tc) > 10 || Math.abs(n - Ic) > 10 ? Mc() : void 0;
}
function Nc(e, t) {
    const n = Number(e);
    return isNaN(n) ? t : n;
}
function xc() {
    const e = __uniConfig.globalStyle || {},
        t = Nc(e.rpxCalcMaxDeviceWidth, 960),
        n = Nc(e.rpxCalcBaseDeviceWidth, 375);
    function s() {
        let e = (function () {
            const e =
                    /^Apple/.test(navigator.vendor) &&
                    "number" == typeof window.orientation,
                t = e && 90 === Math.abs(window.orientation);
            var n = e
                ? Math[t ? "max" : "min"](screen.width, screen.height)
                : screen.width;
            return (
                Math.min(
                    window.innerWidth,
                    document.documentElement.clientWidth,
                    n
                ) || n
            );
        })();
        (e = e <= t ? e : n),
            (document.documentElement.style.fontSize = e / 23.4375 + "px");
    }
    s(),
        document.addEventListener("DOMContentLoaded", s),
        window.addEventListener("load", s),
        window.addEventListener("resize", s);
}
function Ac() {
    xc(),
        le(),
        window.addEventListener("touchstart", kc, Cc),
        window.addEventListener("touchmove", Oc, Cc),
        window.addEventListener("touchend", Mc, Cc),
        window.addEventListener("touchcancel", Mc, Cc);
}
function Rc(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
var Pc,
    Dc,
    Lc = ["top", "left", "right", "bottom"],
    Fc = {};
function Uc() {
    return (Dc =
        "CSS" in window && "function" == typeof CSS.supports
            ? CSS.supports("top: env(safe-area-inset-top)")
                ? "env"
                : CSS.supports("top: constant(safe-area-inset-top)")
                ? "constant"
                : ""
            : "");
}
function Bc() {
    if ((Dc = "string" == typeof Dc ? Dc : Uc())) {
        var e = [],
            t = !1;
        try {
            var n = Object.defineProperty({}, "passive", {
                get: function () {
                    t = { passive: !0 };
                },
            });
            window.addEventListener("test", null, n);
        } catch (a) {}
        var s = document.createElement("div");
        o(s, {
            position: "absolute",
            left: "0",
            top: "0",
            width: "0",
            height: "0",
            zIndex: "-1",
            overflow: "hidden",
            visibility: "hidden",
        }),
            Lc.forEach(function (e) {
                r(s, e);
            }),
            document.body.appendChild(s),
            i(),
            (Pc = !0);
    } else
        Lc.forEach(function (e) {
            Fc[e] = 0;
        });
    function o(e, t) {
        var n = e.style;
        Object.keys(t).forEach(function (e) {
            var s = t[e];
            n[e] = s;
        });
    }
    function i(t) {
        t
            ? e.push(t)
            : e.forEach(function (e) {
                  e();
              });
    }
    function r(e, n) {
        var s = document.createElement("div"),
            r = document.createElement("div"),
            a = document.createElement("div"),
            c = document.createElement("div"),
            l = {
                position: "absolute",
                width: "100px",
                height: "200px",
                boxSizing: "border-box",
                overflow: "hidden",
                paddingBottom: Dc + "(safe-area-inset-" + n + ")",
            };
        o(s, l),
            o(r, l),
            o(a, {
                transition: "0s",
                animation: "none",
                width: "400px",
                height: "400px",
            }),
            o(c, {
                transition: "0s",
                animation: "none",
                width: "250%",
                height: "250%",
            }),
            s.appendChild(a),
            r.appendChild(c),
            e.appendChild(s),
            e.appendChild(r),
            i(function () {
                s.scrollTop = r.scrollTop = 1e4;
                var e = s.scrollTop,
                    o = r.scrollTop;
                function i() {
                    this.scrollTop !== (this === s ? e : o) &&
                        ((s.scrollTop = r.scrollTop = 1e4),
                        (e = s.scrollTop),
                        (o = r.scrollTop),
                        (function (e) {
                            Gc.length ||
                                setTimeout(function () {
                                    var e = {};
                                    Gc.forEach(function (t) {
                                        e[t] = Fc[t];
                                    }),
                                        (Gc.length = 0),
                                        $c.forEach(function (t) {
                                            t(e);
                                        });
                                }, 0);
                            Gc.push(e);
                        })(n));
                }
                s.addEventListener("scroll", i, t),
                    r.addEventListener("scroll", i, t);
            });
        var u = getComputedStyle(s);
        Object.defineProperty(Fc, n, {
            configurable: !0,
            get: function () {
                return parseFloat(u.paddingBottom);
            },
        });
    }
}
function jc(e) {
    return Pc || Bc(), Fc[e];
}
var Gc = [];
var $c = [];
const qc = Rc({
        get support() {
            return 0 != ("string" == typeof Dc ? Dc : Uc()).length;
        },
        get top() {
            return jc("top");
        },
        get left() {
            return jc("left");
        },
        get right() {
            return jc("right");
        },
        get bottom() {
            return jc("bottom");
        },
        onChange: function (e) {
            Uc() && (Pc || Bc(), "function" == typeof e && $c.push(e));
        },
        offChange: function (e) {
            var t = $c.indexOf(e);
            t >= 0 && $c.splice(t, 1);
        },
    }),
    Vc = fr(() => {}, ["prevent"]);
function Hc(e, t) {
    return parseInt((e.getPropertyValue(t).match(/\d+/) || ["0"])[0]);
}
function Wc() {
    const e = Hc(document.documentElement.style, "--window-top");
    return e ? e + qc.top : 0;
}
function zc(e) {
    const t = document.documentElement.style;
    Object.keys(e).forEach((n) => {
        t.setProperty(n, e[n]);
    });
}
function Xc(e) {
    return Symbol(e);
}
const Jc =
        "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z",
    Kc =
        "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z",
    Yc =
        "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
function Qc(e, t = "#000", n = 27) {
    return Ho(
        "svg",
        { width: n, height: n, viewBox: "0 0 32 32" },
        [Ho("path", { d: e, fill: t }, null, 8, ["d", "fill"])],
        8,
        ["width", "height"]
    );
}
function Zc() {
    const e = ph(),
        t = e.length;
    if (t) return e[t - 1];
}
function el() {
    const e = Zc();
    if (e) return e.$page.meta;
}
function tl() {
    const e = el();
    return e ? e.id : -1;
}
function nl() {
    const e = Zc();
    if (e) return e.$vm;
}
const sl = ["navigationBar", "pullToRefresh"];
function ol(e, t) {
    const n = JSON.parse(JSON.stringify(__uniConfig.globalStyle || {})),
        s = w({ id: t }, n, e);
    sl.forEach((t) => {
        s[t] = w({}, n[t], e[t]);
    });
    const { navigationBar: o } = s;
    return o.titleText && o.titleImage && (o.titleText = ""), s;
}
function il(e, t, n) {
    if (x(e)) (n = t), (t = e), (e = nl());
    else if ("number" == typeof e) {
        const t = ph().find((t) => t.$page.id === e);
        e = t ? t.$vm : nl();
    }
    if (!e) return;
    const s = e.$[t];
    return (
        s &&
        ((e, t) => {
            let n;
            for (let s = 0; s < e.length; s++) n = e[s](t);
            return n;
        })(s, n)
    );
}
function rl(e) {
    e.preventDefault();
}
let al,
    cl = 0;
function ll({ onPageScroll: e, onReachBottom: t, onReachBottomDistance: n }) {
    let s = !1,
        o = !1,
        i = !0;
    const r = () => {
        function r() {
            if (
                (() => {
                    const { scrollHeight: e } = document.documentElement,
                        t = window.innerHeight,
                        s = window.scrollY,
                        i = s > 0 && e > t && s + t + n >= e,
                        r = Math.abs(e - cl) > n;
                    return !i || (o && !r)
                        ? (!i && o && (o = !1), !1)
                        : ((cl = e), (o = !0), !0);
                })()
            )
                return (
                    t && t(),
                    (i = !1),
                    setTimeout(function () {
                        i = !0;
                    }, 350),
                    !0
                );
        }
        e && e(window.pageYOffset),
            t && i && (r() || (al = setTimeout(r, 300))),
            (s = !1);
    };
    return function () {
        clearTimeout(al), s || requestAnimationFrame(r), (s = !0);
    };
}
function ul(e, t) {
    if (0 === t.indexOf("/")) return t;
    if (0 === t.indexOf("./")) return ul(e, t.slice(2));
    const n = t.split("/"),
        s = n.length;
    let o = 0;
    for (; o < s && ".." === n[o]; o++);
    n.splice(0, o), (t = n.join("/"));
    const i = e.length > 0 ? e.split("/") : [];
    return i.splice(i.length - o - 1, o + 1), ie(i.concat(n).join("/"));
}
function dl(e, t = !1) {
    return t
        ? __uniRoutes.find((t) => t.path === e || t.alias === e)
        : __uniRoutes.find((t) => t.path === e);
}
class hl {
    constructor(e) {
        (this.$bindClass = !1),
            (this.$bindStyle = !1),
            (this.$vm = e),
            (this.$el = (function (e, t = !1) {
                const { vnode: n } = e;
                if (se(n.el)) return t ? (n.el ? [n.el] : []) : n.el;
                const { subTree: s } = e;
                if (16 & s.shapeFlag) {
                    const e = s.children.filter((e) => e.el && se(e.el));
                    if (e.length > 0) return t ? e.map((e) => e.el) : e[0].el;
                }
                return t ? (n.el ? [n.el] : []) : n.el;
            })(e.$)),
            this.$el.getAttribute &&
                ((this.$bindClass = !!this.$el.getAttribute("class")),
                (this.$bindStyle = !!this.$el.getAttribute("style")));
    }
    selectComponent(e) {
        if (!this.$el || !e) return;
        const t = gl(this.$el.querySelector(e));
        return t ? pl(t, !1) : void 0;
    }
    selectAllComponents(e) {
        if (!this.$el || !e) return [];
        const t = [],
            n = this.$el.querySelectorAll(e);
        for (let s = 0; s < n.length; s++) {
            const e = gl(n[s]);
            e && t.push(pl(e, !1));
        }
        return t;
    }
    forceUpdate(e) {
        "class" === e
            ? this.$bindClass
                ? ((this.$el.__wxsClassChanged = !0), this.$vm.$forceUpdate())
                : this.updateWxsClass()
            : "style" === e &&
              (this.$bindStyle
                  ? ((this.$el.__wxsStyleChanged = !0), this.$vm.$forceUpdate())
                  : this.updateWxsStyle());
    }
    updateWxsClass() {
        const { __wxsAddClass: e } = this.$el;
        e.length && (this.$el.className = e.join(" "));
    }
    updateWxsStyle() {
        const { __wxsStyle: e } = this.$el;
        e &&
            this.$el.setAttribute(
                "style",
                (function (e) {
                    let t = "";
                    if (!e || x(e)) return t;
                    for (const n in e) {
                        const s = e[n],
                            o = n.startsWith("--") ? n : V(n);
                        (x(s) || "number" == typeof s) && (t += `${o}:${s};`);
                    }
                    return t;
                })(e)
            );
    }
    setStyle(e) {
        return this.$el && e
            ? (x(e) && (e = a(e)),
              F(e) && ((this.$el.__wxsStyle = e), this.forceUpdate("style")),
              this)
            : this;
    }
    addClass(e) {
        if (!this.$el || !e) return this;
        const t = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
        return (
            -1 === t.indexOf(e) && (t.push(e), this.forceUpdate("class")), this
        );
    }
    removeClass(e) {
        if (!this.$el || !e) return this;
        const { __wxsAddClass: t } = this.$el;
        if (t) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1);
        }
        const n = this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = []);
        return (
            -1 === n.indexOf(e) && (n.push(e), this.forceUpdate("class")), this
        );
    }
    hasClass(e) {
        return this.$el && this.$el.classList.contains(e);
    }
    getDataset() {
        return this.$el && this.$el.dataset;
    }
    callMethod(e, t = {}) {
        const n = this.$vm[e];
        N(n)
            ? n(JSON.parse(JSON.stringify(t)))
            : this.$vm.ownerId &&
              $p.publishHandler("onWxsInvokeCallMethod", {
                  nodeId: this.$el.__id,
                  ownerId: this.$vm.ownerId,
                  method: e,
                  args: t,
              });
    }
    requestAnimationFrame(e) {
        return window.requestAnimationFrame(e);
    }
    getState() {
        return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
    }
    triggerEvent(e, t = {}) {
        return this.$vm.$emit(e, t), this;
    }
    getComputedStyle(e) {
        if (this.$el) {
            const t = window.getComputedStyle(this.$el);
            return e && e.length
                ? e.reduce((e, n) => ((e[n] = t[n]), e), {})
                : t;
        }
        return {};
    }
    setTimeout(e, t) {
        return window.setTimeout(e, t);
    }
    clearTimeout(e) {
        return window.clearTimeout(e);
    }
    getBoundingClientRect() {
        return this.$el.getBoundingClientRect();
    }
}
function pl(e, t = !0) {
    if ((t && e && (e = ne(e.$)), e && e.$el))
        return (
            e.$el.__wxsComponentDescriptor ||
                (e.$el.__wxsComponentDescriptor = new hl(e)),
            e.$el.__wxsComponentDescriptor
        );
}
function fl(e, t) {
    return pl(e, t);
}
function ml(e, t, n, s = !0) {
    if (t) {
        e.__instance ||
            ((e.__instance = !0),
            Object.defineProperty(e, "instance", {
                get: () => fl(n.proxy, !1),
            }));
        const o = (function (e, t, n = !0) {
            if (!t) return !1;
            if (n && e.length < 2) return !1;
            const s = ne(t);
            if (!s) return !1;
            const o = s.$.type;
            return !(!o.$wxs && !o.$renderjs) && s;
        })(t, n, s);
        if (o) return [e, fl(o, !1)];
    }
}
function gl(e) {
    if (e) return e.__vueParentComponent && e.__vueParentComponent.proxy;
}
function yl(e) {
    for (; e && 0 !== e.tagName.indexOf("UNI-"); ) e = e.parentElement;
    return e;
}
function vl(e, t = !1) {
    const { type: n, timeStamp: s, target: o, currentTarget: i } = e,
        r = {
            type: n,
            timeStamp: s,
            target: pe(t ? o : yl(o)),
            detail: {},
            currentTarget: pe(i),
        };
    return (
        e._stopped && (r._stopped = !0),
        e.type.startsWith("touch") &&
            ((r.touches = e.touches), (r.changedTouches = e.changedTouches)),
        (function (e, t) {
            w(e, {
                preventDefault: () => t.preventDefault(),
                stopPropagation: () => t.stopPropagation(),
            });
        })(r, e),
        r
    );
}
function bl(e, t) {
    return {
        force: 1,
        identifier: 0,
        clientX: e.clientX,
        clientY: e.clientY - t,
        pageX: e.pageX,
        pageY: e.pageY - t,
    };
}
function Sl(e, t) {
    const n = [];
    for (let s = 0; s < e.length; s++) {
        const {
            identifier: o,
            pageX: i,
            pageY: r,
            clientX: a,
            clientY: c,
            force: l,
        } = e[s];
        n.push({
            identifier: o,
            pageX: i,
            pageY: r - t,
            clientX: a,
            clientY: c - t,
            force: l || 0,
        });
    }
    return n;
}
const El = Object.defineProperty(
    {
        __proto__: null,
        $nne: function (e, t, n) {
            const { currentTarget: s } = e;
            if (!(e instanceof Event && s instanceof HTMLElement)) return [e];
            const o = 0 !== s.tagName.indexOf("UNI-");
            if (o) return ml(e, t, n, !1) || [e];
            const i = vl(e, o);
            if ("click" === e.type)
                !(function (e, t) {
                    const { x: n, y: s } = t,
                        o = Wc();
                    (e.detail = { x: n, y: s - o }),
                        (e.touches = e.changedTouches = [bl(t, o)]);
                })(i, e);
            else if (
                ((e) =>
                    0 === e.type.indexOf("mouse") ||
                    ["contextmenu"].includes(e.type))(e)
            )
                !(function (e, t) {
                    const n = Wc();
                    (e.pageX = t.pageX),
                        (e.pageY = t.pageY - n),
                        (e.clientX = t.clientX),
                        (e.clientY = t.clientY - n),
                        (e.touches = e.changedTouches = [bl(t, n)]);
                })(i, e);
            else if (
                ((e) =>
                    ("undefined" != typeof TouchEvent &&
                        e instanceof TouchEvent) ||
                    0 === e.type.indexOf("touch") ||
                    ["longpress"].indexOf(e.type) >= 0)(e)
            ) {
                const t = Wc();
                (i.touches = Sl(e.touches, t)),
                    (i.changedTouches = Sl(e.changedTouches, t));
            } else if (
                ((e) => !e.type.indexOf("key") && e instanceof KeyboardEvent)(e)
            ) {
                ["key", "code"].forEach((t) => {
                    Object.defineProperty(i, t, { get: () => e[t] });
                });
            }
            return ml(i, t, n) || [i];
        },
        createNativeEvent: vl,
    },
    Symbol.toStringTag,
    { value: "Module" }
);
function wl(e) {
    !(function (e) {
        const t = e.globalProperties;
        w(t, El), (t.$gcd = fl);
    })(e._context.config);
}
let Cl = 1;
function _l(e) {
    return (e || tl()) + ".invokeViewApi";
}
const Ml = w(yc("view"), {
    invokeOnCallback: (e, t) => qp.emit("api." + e, t),
    invokeViewMethod: (e, t, n, s) => {
        const { subscribe: o, publishHandler: i } = qp,
            r = s ? Cl++ : 0;
        s && o("invokeViewApi." + r, s, !0),
            i(_l(n), { id: r, name: e, args: t }, n);
    },
    invokeViewMethodKeepAlive: (e, t, n, s) => {
        const { subscribe: o, unsubscribe: i, publishHandler: r } = qp,
            a = Cl++,
            c = "invokeViewApi." + a;
        return (
            o(c, n),
            r(_l(s), { id: a, name: e, args: t }, s),
            () => {
                i(c);
            }
        );
    },
});
function Tl(e) {
    il(Zc(), "onResize", e), qp.invokeOnCallback("onWindowResize", e);
}
function Il(e) {
    const t = Zc();
    il(Fh(), "onShow", e), il(t, "onShow");
}
function kl() {
    il(Fh(), "onHide"), il(Zc(), "onHide");
}
const Ol = ["onPageScroll", "onReachBottom"];
function Nl() {
    Ol.forEach((e) =>
        qp.subscribe(
            e,
            (function (e) {
                return (t, n) => {
                    il(parseInt(n), e, t);
                };
            })(e)
        )
    );
}
function xl() {
    !(function () {
        const { on: e } = qp;
        e("onResize", Tl),
            e("onAppEnterForeground", Il),
            e("onAppEnterBackground", kl);
    })(),
        Nl();
}
function Al() {
    if (this.$route) {
        const e = this.$route.meta;
        return (
            e.eventChannel || (e.eventChannel = new be(this.$page.id)),
            e.eventChannel
        );
    }
}
function Rl(e) {
    e._context.config.globalProperties.getOpenerEventChannel = Al;
}
function Pl() {
    return {
        path: "",
        query: {},
        scene: 1001,
        referrerInfo: { appId: "", extraData: {} },
    };
}
function Dl(e) {
    return /^-?\d+[ur]px$/i.test(e)
        ? e.replace(/(^-?\d+)[ur]px$/i, (e, t) => `${Bu(parseFloat(t))}px`)
        : /^-?[\d\.]+$/.test(e)
        ? `${e}px`
        : e || "";
}
function Ll(e) {
    const t = e.animation;
    if (!t || !t.actions || !t.actions.length) return;
    let n = 0;
    const s = t.actions,
        o = t.actions.length;
    function i() {
        const t = s[n],
            r = t.option.transition,
            a = (function (e) {
                const t = [
                        "matrix",
                        "matrix3d",
                        "scale",
                        "scale3d",
                        "rotate3d",
                        "skew",
                        "translate",
                        "translate3d",
                    ],
                    n = [
                        "scaleX",
                        "scaleY",
                        "scaleZ",
                        "rotate",
                        "rotateX",
                        "rotateY",
                        "rotateZ",
                        "skewX",
                        "skewY",
                        "translateX",
                        "translateY",
                        "translateZ",
                    ],
                    s = ["opacity", "background-color"],
                    o = ["width", "height", "left", "right", "top", "bottom"],
                    i = e.animates,
                    r = e.option,
                    a = r.transition,
                    c = {},
                    l = [];
                return (
                    i.forEach((e) => {
                        let i = e.type,
                            r = [...e.args];
                        if (t.concat(n).includes(i))
                            i.startsWith("rotate") || i.startsWith("skew")
                                ? (r = r.map((e) => parseFloat(e) + "deg"))
                                : i.startsWith("translate") && (r = r.map(Dl)),
                                n.indexOf(i) >= 0 && (r.length = 1),
                                l.push(`${i}(${r.join(",")})`);
                        else if (s.concat(o).includes(r[0])) {
                            i = r[0];
                            const e = r[1];
                            c[i] = o.includes(i) ? Dl(e) : e;
                        }
                    }),
                    (c.transform = c.webkitTransform = l.join(" ")),
                    (c.transition = c.webkitTransition =
                        Object.keys(c)
                            .map(
                                (e) =>
                                    `${(function (e) {
                                        return e
                                            .replace(
                                                /[A-Z]/g,
                                                (e) => `-${e.toLowerCase()}`
                                            )
                                            .replace("webkit", "-webkit");
                                    })(e)} ${a.duration}ms ${
                                        a.timingFunction
                                    } ${a.delay}ms`
                            )
                            .join(",")),
                    (c.transformOrigin = c.webkitTransformOrigin =
                        r.transformOrigin),
                    c
                );
            })(t);
        Object.keys(a).forEach((t) => {
            e.$el.style[t] = a[t];
        }),
            (n += 1),
            n < o && setTimeout(i, r.duration + r.delay);
    }
    setTimeout(() => {
        i();
    }, 0);
}
const Fl = {
        props: ["animation"],
        watch: {
            animation: {
                deep: !0,
                handler() {
                    Ll(this);
                },
            },
        },
        mounted() {
            Ll(this);
        },
    },
    Ul = (e) => {
        e.__reserved = !0;
        const { props: t, mixins: n } = e;
        return (t && t.animation) || (n || (e.mixins = [])).push(Fl), Bl(e);
    },
    Bl = (e) => ((e.__reserved = !0), (e.compatConfig = { MODE: 3 }), os(e)),
    jl = {
        hoverClass: { type: String, default: "none" },
        hoverStopPropagation: { type: Boolean, default: !1 },
        hoverStartTime: { type: [Number, String], default: 50 },
        hoverStayTime: { type: [Number, String], default: 400 },
    };
function Gl(e) {
    const t = Qt(!1);
    let n,
        s,
        o = !1;
    function i() {
        requestAnimationFrame(() => {
            clearTimeout(s),
                (s = setTimeout(() => {
                    t.value = !1;
                }, parseInt(e.hoverStayTime)));
        });
    }
    function r(s) {
        s._hoverPropagationStopped ||
            (e.hoverClass &&
                "none" !== e.hoverClass &&
                !e.disabled &&
                (e.hoverStopPropagation && (s._hoverPropagationStopped = !0),
                (o = !0),
                (n = setTimeout(() => {
                    (t.value = !0), o || i();
                }, parseInt(e.hoverStartTime)))));
    }
    function a() {
        (o = !1), t.value && i();
    }
    function c() {
        a(), window.removeEventListener("mouseup", c);
    }
    return {
        hovering: t,
        binding: {
            onTouchstartPassive: function (e) {
                e.touches.length > 1 || r(e);
            },
            onMousedown: function (e) {
                o || (r(e), window.addEventListener("mouseup", c));
            },
            onTouchend: function () {
                a();
            },
            onMouseup: function () {
                o && c();
            },
            onTouchcancel: function () {
                (o = !1), (t.value = !1), clearTimeout(n);
            },
        },
    };
}
function $l(e, t) {
    return (n, s, o) => {
        e.value &&
            t(
                n,
                (function (e, t, n, s) {
                    const o = pe(n);
                    return {
                        type: s.type || e,
                        timeStamp: t.timeStamp || 0,
                        target: o,
                        currentTarget: o,
                        detail: s,
                    };
                })(n, s, e.value, o || {})
            );
    };
}
const ql = Xc("uf");
function Vl(e) {
    const { base: t } = __uniConfig.router;
    return 0 === ie(e).indexOf(t) ? ie(e) : t + e;
}
function Hl(e) {
    const { base: t, assets: n } = __uniConfig.router;
    if (
        ("./" === t &&
            (0 === e.indexOf("./static/") ||
                (n && 0 === e.indexOf("./" + n + "/"))) &&
            (e = e.slice(1)),
        0 === e.indexOf("/"))
    ) {
        if (0 !== e.indexOf("//")) return Vl(e.slice(1));
        e = "https:" + e;
    }
    if (Z.test(e) || ee.test(e) || 0 === e.indexOf("blob:")) return e;
    const s = ph();
    return s.length ? Vl(ul(s[s.length - 1].$page.route, e).slice(1)) : e;
}
const Wl = navigator.userAgent,
    zl = /android/i.test(Wl),
    Xl = /iphone|ipad|ipod/i.test(Wl),
    Jl = Wl.match(/Windows NT ([\d|\d.\d]*)/i),
    Kl = /Macintosh|Mac/i.test(Wl),
    Yl = /Linux|X11/i.test(Wl),
    Ql = Kl && navigator.maxTouchPoints > 0;
function Zl() {
    return (
        /^Apple/.test(navigator.vendor) && "number" == typeof window.orientation
    );
}
function eu(e) {
    return e && 90 === Math.abs(window.orientation);
}
function tu(e, t) {
    return e
        ? Math[t ? "max" : "min"](screen.width, screen.height)
        : screen.width;
}
function nu(e) {
    return (
        Math.min(window.innerWidth, document.documentElement.clientWidth, e) ||
        e
    );
}
const su = [
    "GET",
    "OPTIONS",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "TRACE",
    "CONNECT",
    "PATCH",
];
function ou(e, t) {
    return e && -1 !== t.indexOf(e) ? e : t[0];
}
function iu(e) {
    return function () {
        try {
            return e.apply(e, arguments);
        } catch (t) {
            console.error(t);
        }
    };
}
let ru = 1;
const au = {};
function cu(e, t, n) {
    if ("number" == typeof e) {
        const s = au[e];
        if (s) return s.keepAlive || delete au[e], s.callback(t, n);
    }
    return t;
}
const lu = "success",
    uu = "fail",
    du = "complete";
function hu(e, t = {}, { beforeAll: n, beforeSuccess: s } = {}) {
    F(t) || (t = {});
    const {
            success: o,
            fail: i,
            complete: r,
        } = (function (e) {
            const t = {};
            for (const n in e) {
                const s = e[n];
                N(s) && ((t[n] = iu(s)), delete e[n]);
            }
            return t;
        })(t),
        a = N(o),
        c = N(i),
        l = N(r),
        u = ru++;
    return (
        (function (e, t, n, s = !1) {
            au[e] = { name: t, keepAlive: s, callback: n };
        })(u, e, (u) => {
            ((u = u || {}).errMsg = (function (e, t) {
                return e && -1 !== e.indexOf(":fail")
                    ? t + e.substring(e.indexOf(":fail"))
                    : t + ":ok";
            })(u.errMsg, e)),
                N(n) && n(u),
                u.errMsg === e + ":ok"
                    ? (N(s) && s(u, t), a && o(u))
                    : c && i(u),
                l && r(u);
        }),
        u
    );
}
const pu = "success",
    fu = "fail",
    mu = "complete",
    gu = {},
    yu = {};
function vu(e, t) {
    return function (n) {
        return e(n, t) || n;
    };
}
function bu(e, t, n) {
    let s = !1;
    for (let o = 0; o < e.length; o++) {
        const i = e[o];
        if (s) s = Promise.resolve(vu(i, n));
        else {
            const e = i(t, n);
            if ((P(e) && (s = Promise.resolve(e)), !1 === e))
                return { then() {}, catch() {} };
        }
    }
    return s || { then: (e) => e(t), catch() {} };
}
function Su(e, t = {}) {
    return (
        [pu, fu, mu].forEach((n) => {
            const s = e[n];
            if (!T(s)) return;
            const o = t[n];
            t[n] = function (e) {
                bu(s, e, t).then((e) => (N(o) && o(e)) || e);
            };
        }),
        t
    );
}
function Eu(e, t) {
    const n = [];
    T(gu.returnValue) && n.push(...gu.returnValue);
    const s = yu[e];
    return (
        s && T(s.returnValue) && n.push(...s.returnValue),
        n.forEach((e) => {
            t = e(t) || t;
        }),
        t
    );
}
function wu(e) {
    const t = Object.create(null);
    Object.keys(gu).forEach((e) => {
        "returnValue" !== e && (t[e] = gu[e].slice());
    });
    const n = yu[e];
    return (
        n &&
            Object.keys(n).forEach((e) => {
                "returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]));
            }),
        t
    );
}
function Cu(e, t, n, s) {
    const o = wu(e);
    if (o && Object.keys(o).length) {
        if (T(o.invoke)) {
            return bu(o.invoke, n).then((n) => t(Su(wu(e), n), ...s));
        }
        return t(Su(o, n), ...s);
    }
    return t(n, ...s);
}
function _u(e, t) {
    return (n = {}, ...s) =>
        (function (e) {
            return !(!F(e) || ![lu, uu, du].find((t) => N(e[t])));
        })(n)
            ? Eu(e, Cu(e, t, n, s))
            : Eu(
                  e,
                  new Promise((o, i) => {
                      Cu(e, t, w(n, { success: o, fail: i }), s);
                  })
              );
}
function Mu(e, t, n, s) {
    return cu(e, w({ errMsg: t + ":fail" + (n ? " " + n : "") }, s));
}
function Tu(e, t, n, s) {
    if (s && s.beforeInvoke) {
        const e = s.beforeInvoke(t);
        if (x(e)) return e;
    }
    const o = (function (e, t) {
        const n = e[0];
        if (!t || (!F(t.formatArgs) && F(n))) return;
        const s = t.formatArgs,
            o = Object.keys(s);
        for (let i = 0; i < o.length; i++) {
            const t = o[i],
                r = s[t];
            if (N(r)) {
                const s = r(e[0][t], n);
                if (x(s)) return s;
            } else M(n, t) || (n[t] = r);
        }
    })(t, s);
    if (o) return o;
}
function Iu(e, t, n, s) {
    return (n) => {
        const o = hu(e, n, s),
            i = Tu(0, [n], 0, s);
        return i
            ? Mu(o, e, i)
            : t(n, {
                  resolve: (t) =>
                      (function (e, t, n) {
                          return cu(e, w(n || {}, { errMsg: t + ":ok" }));
                      })(o, e, t),
                  reject: (t, n) =>
                      Mu(
                          o,
                          e,
                          (function (e) {
                              return !e || x(e)
                                  ? e
                                  : e.stack
                                  ? (console.error(e.message + "\n" + e.stack),
                                    e.message)
                                  : e;
                          })(t),
                          n
                      ),
              });
    };
}
function ku(e, t, n, s) {
    return _u(e, Iu(e, t, 0, s));
}
function Ou(e, t, n, s) {
    return (function (e, t, n, s) {
        return (...e) => {
            const n = Tu(0, e, 0, s);
            if (n) throw new Error(n);
            return t.apply(null, e);
        };
    })(0, t, 0, s);
}
function Nu(e, t, n, s) {
    return _u(
        e,
        (function (e, t, n, s) {
            return Iu(e, t, 0, s);
        })(e, t, 0, s)
    );
}
let xu = !1,
    Au = 0,
    Ru = 0,
    Pu = 960,
    Du = 375,
    Lu = 750;
function Fu() {
    const {
        platform: e,
        pixelRatio: t,
        windowWidth: n,
    } = (function () {
        const e = Zl(),
            t = nu(tu(e, eu(e)));
        return {
            platform: Xl ? "ios" : "other",
            pixelRatio: window.devicePixelRatio,
            windowWidth: t,
        };
    })();
    (Au = n), (Ru = t), (xu = "ios" === e);
}
function Uu(e, t) {
    const n = Number(e);
    return isNaN(n) ? t : n;
}
const Bu = Ou(0, (e, t) => {
        if (
            (0 === Au &&
                (Fu(),
                (function () {
                    const e = __uniConfig.globalStyle || {};
                    (Pu = Uu(e.rpxCalcMaxDeviceWidth, 960)),
                        (Du = Uu(e.rpxCalcBaseDeviceWidth, 375)),
                        (Lu = Uu(e.rpxCalcBaseDeviceWidth, 750));
                })()),
            0 === (e = Number(e)))
        )
            return 0;
        let n = t || Au;
        n = e === Lu || n <= Pu ? n : Du;
        let s = (e / 750) * n;
        return (
            s < 0 && (s = -s),
            (s = Math.floor(s + 1e-4)),
            0 === s && (s = 1 !== Ru && xu ? 0.5 : 1),
            e < 0 ? -s : s
        );
    }),
    ju = [
        "onCanplay",
        "onPlay",
        "onPause",
        "onStop",
        "onEnded",
        "onTimeUpdate",
        "onError",
        "onWaiting",
        "onSeeking",
        "onSeeked",
    ],
    Gu = [
        "offCanplay",
        "offPlay",
        "offPause",
        "offStop",
        "offEnded",
        "offTimeUpdate",
        "offError",
        "offWaiting",
        "offSeeking",
        "offSeeked",
    ],
    $u = Ou(0, () => {
        const e = Fh();
        return e && e.$vm ? e.$vm.$locale : hc().getLocale();
    }),
    qu = {
        onUnhandledRejection: [],
        onPageNotFound: [],
        onError: [],
        onShow: [],
        onHide: [],
    };
function Vu(e, t) {
    const n = Fh();
    if (n && n.$vm) return ws(e, t, n.$vm.$);
    qu[e].push(t);
}
const Hu = {
        formatArgs: {
            filePath(e, t) {
                t.filePath = Hl(e);
            },
        },
    },
    Wu = {
        formatArgs: {
            src(e, t) {
                t.src = Hl(e);
            },
        },
    },
    zu = {
        formatArgs: {
            filePath(e, t) {
                e && (t.filePath = Hl(e));
            },
            header(e, t) {
                t.header = e || {};
            },
            formData(e, t) {
                t.formData = e || {};
            },
        },
    },
    Xu = {
        formatArgs: {
            header(e, t) {
                t.header = e || {};
            },
            method(e, t) {
                t.method = ou((e || "").toUpperCase(), su);
            },
            protocols(e, t) {
                x(e) && (t.protocols = [e]);
            },
        },
    };
const Ju = { url: { type: String, required: !0 } },
    Ku =
        (Zu([
            "slide-in-right",
            "slide-in-left",
            "slide-in-top",
            "slide-in-bottom",
            "fade-in",
            "zoom-out",
            "zoom-fade-out",
            "pop-in",
            "none",
        ]),
        Zu([
            "slide-out-right",
            "slide-out-left",
            "slide-out-top",
            "slide-out-bottom",
            "fade-out",
            "zoom-in",
            "zoom-fade-in",
            "pop-out",
            "none",
        ]),
        nd("redirectTo")),
    Yu = nd("reLaunch"),
    Qu = {
        formatArgs: {
            delta(e, t) {
                (e = parseInt(e + "") || 1),
                    (t.delta = Math.min(ph().length - 1, e));
            },
        },
    };
function Zu(e) {
    return {
        animationType: {
            type: String,
            validator(t) {
                if (t && -1 === e.indexOf(t))
                    return (
                        "`" +
                        t +
                        "` is not supported for `animationType` (supported values are: `" +
                        e.join("`|`") +
                        "`)"
                    );
            },
        },
        animationDuration: { type: Number },
    };
}
let ed;
function td() {
    ed = "";
}
function nd(e) {
    return { formatArgs: { url: sd(e) }, beforeAll: td };
}
function sd(e) {
    return function (t, n) {
        if (!t) return 'Missing required args: "url"';
        const s = (t = (function (e) {
                if (0 === e.indexOf("/")) return e;
                let t = "";
                const n = ph();
                return n.length && (t = n[n.length - 1].$page.route), ul(t, e);
            })(t)).split("?")[0],
            o = dl(s, !0);
        if (!o) return "page `" + t + "` is not found";
        if ("navigateTo" === e || "redirectTo" === e) {
            if (o.meta.isTabBar) return `can not ${e} a tabbar page`;
        } else if ("switchTab" === e && !o.meta.isTabBar)
            return "can not switch to no-tabBar page";
        if (
            (("switchTab" !== e && "preloadPage" !== e) ||
                !o.meta.isTabBar ||
                "appLaunch" === n.openType ||
                (t = s),
            o.meta.isEntry && (t = t.replace(o.alias, "/")),
            (n.url = (function (e) {
                if (!x(e)) return e;
                const t = e.indexOf("?");
                if (-1 === t) return e;
                const n = e
                    .slice(t + 1)
                    .trim()
                    .replace(/^(\?|#|&)/, "");
                if (!n) return e;
                e = e.slice(0, t);
                const s = [];
                return (
                    n.split("&").forEach((e) => {
                        const t = e.replace(/\+/g, " ").split("="),
                            n = t.shift(),
                            o = t.length > 0 ? t.join("=") : "";
                        s.push(n + "=" + encodeURIComponent(o));
                    }),
                    s.length ? e + "?" + s.join("&") : e
                );
            })(t)),
            "unPreloadPage" !== e)
        )
            if ("preloadPage" !== e) {
                if (ed === t && "appLaunch" !== n.openType)
                    return `${ed} locked`;
                __uniConfig.ready && (ed = t);
            } else if (o.meta.isTabBar) {
                const e = ph(),
                    t = o.path.slice(1);
                if (e.find((e) => e.route === t))
                    return "tabBar page `" + t + "` already exists";
            }
    };
}
const od = { formatArgs: { duration: 300 } },
    id = ["success", "loading", "none", "error"],
    rd =
        (Boolean,
        {
            formatArgs: {
                title: "",
                icon(e, t) {
                    t.icon = ou(e, id);
                },
                image(e, t) {
                    t.image = e ? Hl(e) : "";
                },
                duration: 1500,
                mask: !1,
            },
        }),
    ad = {};
function cd(e, t) {
    const n = ad[e];
    return n
        ? Promise.resolve(n)
        : /^data:[a-z-]+\/[a-z-]+;base64,/.test(e)
        ? Promise.resolve(
              (function (e) {
                  const t = e.split(","),
                      n = t[0].match(/:(.*?);/),
                      s = n ? n[1] : "",
                      o = atob(t[1]);
                  let i = o.length;
                  const r = new Uint8Array(i);
                  for (; i--; ) r[i] = o.charCodeAt(i);
                  return ld(r, s);
              })(e)
          )
        : t
        ? Promise.reject(new Error("not find"))
        : new Promise((t, n) => {
              const s = new XMLHttpRequest();
              s.open("GET", e, !0),
                  (s.responseType = "blob"),
                  (s.onload = function () {
                      t(this.response);
                  }),
                  (s.onerror = n),
                  s.send();
          });
}
function ld(e, t) {
    let n;
    if (e instanceof File) n = e;
    else {
        t = t || e.type || "";
        const o = `${Date.now()}${(function (e) {
            const t = e.split("/")[1];
            return t ? `.${t}` : "";
        })(t)}`;
        try {
            n = new File([e], o, { type: t });
        } catch (s) {
            (n = e = e instanceof Blob ? e : new Blob([e], { type: t })),
                (n.name = n.name || o);
        }
    }
    return n;
}
const ud = Pl(),
    dd = Pl();
const hd = Ul({
    name: "ResizeSensor",
    props: { initial: { type: Boolean, default: !1 } },
    emits: ["resize"],
    setup(e, { emit: t }) {
        const n = Qt(null),
            s = (function (e) {
                return () => {
                    const { firstElementChild: t, lastElementChild: n } =
                        e.value;
                    (t.scrollLeft = 1e5),
                        (t.scrollTop = 1e5),
                        (n.scrollLeft = 1e5),
                        (n.scrollTop = 1e5);
                };
            })(n),
            o = (function (e, t, n) {
                const s = Ut({ width: -1, height: -1 });
                return (
                    Vn(
                        () => w({}, s),
                        (e) => t("resize", e)
                    ),
                    () => {
                        const t = e.value;
                        (s.width = t.offsetWidth),
                            (s.height = t.offsetHeight),
                            n();
                    }
                );
            })(n, t, s);
        return (
            (function (e, t, n, s) {
                ps(s),
                    Ms(() => {
                        t.initial && bn(n);
                        const o = e.value;
                        o.offsetParent !== o.parentElement &&
                            (o.parentElement.style.position = "relative"),
                            "AnimationEvent" in window || s();
                    });
            })(n, e, o, s),
            () =>
                Ho(
                    "uni-resize-sensor",
                    { ref: n, onAnimationstartOnce: o },
                    [
                        Ho(
                            "div",
                            { onScroll: o },
                            [Ho("div", null, null)],
                            40,
                            ["onScroll"]
                        ),
                        Ho(
                            "div",
                            { onScroll: o },
                            [Ho("div", null, null)],
                            40,
                            ["onScroll"]
                        ),
                    ],
                    40,
                    ["onAnimationstartOnce"]
                )
        );
    },
});
function pd() {}
const fd = {
    cursorSpacing: { type: [Number, String], default: 0 },
    showConfirmBar: { type: [Boolean, String], default: "auto" },
    adjustPosition: { type: [Boolean, String], default: !0 },
    autoBlur: { type: [Boolean, String], default: !1 },
};
function md(e, t, n) {
    function s(e) {
        const t = hi(() => 0 === String(navigator.vendor).indexOf("Apple"));
        e.addEventListener("focus", () => {
            clearTimeout(undefined), document.addEventListener("click", pd, !1);
        });
        e.addEventListener("blur", () => {
            t.value && e.blur(),
                document.removeEventListener("click", pd, !1),
                t.value &&
                    document.documentElement.scrollTo(
                        document.documentElement.scrollLeft,
                        document.documentElement.scrollTop
                    );
        });
    }
    Vn(
        () => t.value,
        (e) => e && s(e)
    );
}
const gd = {
        src: { type: String, default: "" },
        mode: { type: String, default: "scaleToFill" },
        lazyLoad: { type: [Boolean, String], default: !1 },
        draggable: { type: Boolean, default: !1 },
    },
    yd = {
        widthFix: ["offsetWidth", "height", (e, t) => e / t],
        heightFix: ["offsetHeight", "width", (e, t) => e * t],
    },
    vd = {
        aspectFit: ["center center", "contain"],
        aspectFill: ["center center", "cover"],
        widthFix: [, "100% 100%"],
        heightFix: [, "100% 100%"],
        top: ["center top"],
        bottom: ["center bottom"],
        center: ["center center"],
        left: ["left center"],
        right: ["right center"],
        "top left": ["left top"],
        "top right": ["right top"],
        "bottom left": ["left bottom"],
        "bottom right": ["right bottom"],
    },
    bd = Ul({
        name: "Image",
        props: gd,
        setup(e, { emit: t }) {
            const n = Qt(null),
                s = (function (e, t) {
                    const n = Qt(""),
                        s = hi(() => {
                            let e = "auto",
                                s = "";
                            const o = vd[t.mode];
                            return (
                                o
                                    ? (o[0] && (s = o[0]), o[1] && (e = o[1]))
                                    : ((s = "0% 0%"), (e = "100% 100%")),
                                `background-image:${
                                    n.value ? 'url("' + n.value + '")' : "none"
                                };background-position:${s};background-size:${e};`
                            );
                        }),
                        o = Ut({
                            rootEl: e,
                            src: hi(() => (t.src ? Hl(t.src) : "")),
                            origWidth: 0,
                            origHeight: 0,
                            origStyle: { width: "", height: "" },
                            modeStyle: s,
                            imgSrc: n,
                        });
                    return (
                        Ms(() => {
                            const t = e.value.style;
                            (o.origWidth = Number(t.width) || 0),
                                (o.origHeight = Number(t.height) || 0);
                        }),
                        o
                    );
                })(n, e),
                o = $l(n, t),
                { fixSize: i } = (function (e, t, n) {
                    const s = () => {
                            const { mode: s } = t,
                                o = yd[s];
                            if (!o) return;
                            const { origWidth: i, origHeight: r } = n,
                                a = i && r ? i / r : 0;
                            if (!a) return;
                            const c = e.value,
                                l = c[o[0]];
                            l &&
                                (c.style[o[1]] =
                                    (function (e) {
                                        Sd &&
                                            e > 10 &&
                                            (e = 2 * Math.round(e / 2));
                                        return e;
                                    })(o[2](l, a)) + "px");
                        },
                        o = () => {
                            const { style: t } = e.value,
                                {
                                    origStyle: { width: s, height: o },
                                } = n;
                            (t.width = s), (t.height = o);
                        };
                    return (
                        Vn(
                            () => t.mode,
                            (e, t) => {
                                yd[t] && o(), yd[e] && s();
                            }
                        ),
                        { fixSize: s, resetSize: o }
                    );
                })(n, e, s);
            return (
                (function (e, t, n, s, o) {
                    let i, r;
                    const a = (t = 0, n = 0, s = "") => {
                            (e.origWidth = t),
                                (e.origHeight = n),
                                (e.imgSrc = s);
                        },
                        c = (c) => {
                            if (!c) return l(), void a();
                            (i = i || new Image()),
                                (i.onload = (e) => {
                                    const { width: u, height: d } = i;
                                    a(u, d, c),
                                        s(),
                                        (i.draggable = t.draggable),
                                        r && r.remove(),
                                        (r = i),
                                        n.value.appendChild(i),
                                        l(),
                                        o("load", e, { width: u, height: d });
                                }),
                                (i.onerror = (t) => {
                                    a(),
                                        l(),
                                        o("error", t, {
                                            errMsg: `GET ${e.src} 404 (Not Found)`,
                                        });
                                }),
                                (i.src = c);
                        },
                        l = () => {
                            i &&
                                ((i.onload = null),
                                (i.onerror = null),
                                (i = null));
                        };
                    Vn(
                        () => e.src,
                        (e) => c(e)
                    ),
                        Vn(
                            () => e.imgSrc,
                            (e) => {
                                !e && r && (r.remove(), (r = null));
                            }
                        ),
                        Ms(() => c(e.src)),
                        ks(() => l());
                })(s, e, n, i, o),
                () =>
                    Ho(
                        "uni-image",
                        { ref: n },
                        [
                            Ho("div", { style: s.modeStyle }, null, 4),
                            yd[e.mode]
                                ? Ho(hd, { onResize: i }, null, 8, ["onResize"])
                                : Ho("span", null, null),
                        ],
                        512
                    )
            );
        },
    });
const Sd = "Google Inc." === navigator.vendor;
const Ed = he(!0),
    wd = [];
let Cd,
    _d = 0;
const Md = (e) => wd.forEach((t) => (t.userAction = e));
function Td(e = { userAction: !1 }) {
    if (!Cd) {
        ["touchstart", "touchmove", "touchend", "mousedown", "mouseup"].forEach(
            (e) => {
                document.addEventListener(
                    e,
                    function () {
                        !_d && Md(!0),
                            _d++,
                            setTimeout(() => {
                                !--_d && Md(!1);
                            }, 0);
                    },
                    Ed
                );
            }
        ),
            (Cd = !0);
    }
    wd.push(e);
}
function Id() {
    const e = Ut({ userAction: !1 });
    return (
        Ms(() => {
            Td(e);
        }),
        ks(() => {
            !(function (e) {
                const t = wd.indexOf(e);
                t >= 0 && wd.splice(t, 1);
            })(e);
        }),
        { state: e }
    );
}
function kd(e, t) {
    const n = document.activeElement;
    if (!n) return t({});
    const s = {};
    ["input", "textarea"].includes(n.tagName.toLowerCase()) &&
        ((s.start = n.selectionStart), (s.end = n.selectionEnd)),
        t(s);
}
const Od = function () {
    var e, t, n;
    (e = tl()),
        (n = kd),
        (t = Sc(e, (t = "getSelectedTextRange"))),
        bc[t] || (bc[t] = n);
};
function Nd(e, t) {
    return (
        "number" === t && isNaN(Number(e)) && (e = ""),
        null === e ? "" : String(e)
    );
}
const xd = [
        "none",
        "text",
        "decimal",
        "numeric",
        "tel",
        "search",
        "email",
        "url",
    ],
    Ad = w(
        {},
        {
            name: { type: String, default: "" },
            modelValue: { type: [String, Number], default: "" },
            value: { type: [String, Number], default: "" },
            disabled: { type: [Boolean, String], default: !1 },
            autoFocus: { type: [Boolean, String], default: !1 },
            focus: { type: [Boolean, String], default: !1 },
            cursor: { type: [Number, String], default: -1 },
            selectionStart: { type: [Number, String], default: -1 },
            selectionEnd: { type: [Number, String], default: -1 },
            type: { type: String, default: "text" },
            password: { type: [Boolean, String], default: !1 },
            placeholder: { type: String, default: "" },
            placeholderStyle: { type: String, default: "" },
            placeholderClass: { type: String, default: "" },
            maxlength: { type: [Number, String], default: 140 },
            confirmType: { type: String, default: "done" },
            confirmHold: { type: Boolean, default: !1 },
            ignoreCompositionEvent: { type: Boolean, default: !0 },
            step: { type: String, default: "0.000000000000000001" },
            inputmode: {
                type: String,
                default: void 0,
                validator: (e) => !!~xd.indexOf(e),
            },
        },
        fd
    ),
    Rd = [
        "input",
        "focus",
        "blur",
        "update:value",
        "update:modelValue",
        "update:focus",
        "compositionstart",
        "compositionupdate",
        "compositionend",
        "keyboardheightchange",
    ];
function Pd(e, t, n, s) {
    const o = ve(
        (n) => {
            t.value = Nd(n, e.type);
        },
        100,
        { setTimeout: setTimeout, clearTimeout: clearTimeout }
    );
    Vn(() => e.modelValue, o), Vn(() => e.value, o);
    const i = (function (e, t) {
        let n,
            s,
            o = 0;
        const i = function (...i) {
            const r = Date.now();
            clearTimeout(n),
                (s = () => {
                    (s = null), (o = r), e.apply(this, i);
                }),
                r - o < t ? (n = setTimeout(s, t - (r - o))) : s();
        };
        return (
            (i.cancel = function () {
                clearTimeout(n), (s = null);
            }),
            (i.flush = function () {
                clearTimeout(n), s && s();
            }),
            i
        );
    })((e, t) => {
        o.cancel(),
            n("update:modelValue", t.value),
            n("update:value", t.value),
            s("input", e, t);
    }, 100);
    return (
        _s(() => {
            o.cancel(), i.cancel();
        }),
        {
            trigger: s,
            triggerInput: (e, t, n) => {
                o.cancel(), i(e, t), n && i.flush();
            },
        }
    );
}
function Dd(e, t) {
    Id();
    const n = hi(() => e.autoFocus || e.focus);
    function s() {
        if (!n.value) return;
        const e = t.value;
        e ? e.focus() : setTimeout(s, 100);
    }
    Vn(
        () => e.focus,
        (e) => {
            e
                ? s()
                : (function () {
                      const e = t.value;
                      e && e.blur();
                  })();
        }
    ),
        Ms(() => {
            n.value && bn(s);
        });
}
function Ld(e, t, n, s) {
    Od();
    const {
            fieldRef: o,
            state: i,
            trigger: r,
        } = (function (e, t, n) {
            const s = Qt(null),
                o = $l(t, n),
                i = hi(() => {
                    const t = Number(e.selectionStart);
                    return isNaN(t) ? -1 : t;
                }),
                r = hi(() => {
                    const t = Number(e.selectionEnd);
                    return isNaN(t) ? -1 : t;
                }),
                a = hi(() => {
                    const t = Number(e.cursor);
                    return isNaN(t) ? -1 : t;
                }),
                c = hi(() => {
                    var t = Number(e.maxlength);
                    return isNaN(t) ? 140 : t;
                }),
                l = Nd(e.modelValue, e.type) || Nd(e.value, e.type),
                u = Ut({
                    value: l,
                    valueOrigin: l,
                    maxlength: c,
                    focus: e.focus,
                    composing: !1,
                    selectionStart: i,
                    selectionEnd: r,
                    cursor: a,
                });
            return (
                Vn(
                    () => u.focus,
                    (e) => n("update:focus", e)
                ),
                Vn(
                    () => u.maxlength,
                    (e) => (u.value = u.value.slice(0, e))
                ),
                { fieldRef: s, state: u, trigger: o }
            );
        })(e, t, n),
        { triggerInput: a } = Pd(e, i, n, r);
    Dd(e, o), md(0, o);
    const { state: c } = (function () {
        const e = Ut({ attrs: {} });
        return (
            Ms(() => {
                let t = si();
                for (; t; ) {
                    const n = t.type.__scopeId;
                    n && (e.attrs[n] = ""),
                        (t =
                            t.proxy && "page" === t.proxy.$mpType
                                ? null
                                : t.parent);
                }
            }),
            { state: e }
        );
    })();
    !(function (e, t) {
        const n = Gn(ql, !1);
        if (!n) return;
        const s = si(),
            o = {
                submit() {
                    const n = s.proxy;
                    return [n[e], x(t) ? n[t] : t.value];
                },
                reset() {
                    x(t) ? (s.proxy[t] = "") : (t.value = "");
                },
            };
        n.addField(o),
            ks(() => {
                n.removeField(o);
            });
    })("name", i),
        (function (e, t, n, s, o, i) {
            function r() {
                const n = e.value;
                n &&
                    t.focus &&
                    t.selectionStart > -1 &&
                    t.selectionEnd > -1 &&
                    "number" !== n.type &&
                    ((n.selectionStart = t.selectionStart),
                    (n.selectionEnd = t.selectionEnd));
            }
            function a() {
                const n = e.value;
                n &&
                    t.focus &&
                    t.selectionStart < 0 &&
                    t.selectionEnd < 0 &&
                    t.cursor > -1 &&
                    "number" !== n.type &&
                    (n.selectionEnd = n.selectionStart = t.cursor);
            }
            function c(e) {
                return "number" === e.type ? null : e.selectionEnd;
            }
            Vn([() => t.selectionStart, () => t.selectionEnd], r),
                Vn(() => t.cursor, a),
                Vn(
                    () => e.value,
                    function () {
                        const l = e.value;
                        if (!l) return;
                        const u = function (e, s) {
                            e.stopPropagation(),
                                (N(i) && !1 === i(e, t)) ||
                                    ((t.value = l.value),
                                    (t.composing && n.ignoreCompositionEvent) ||
                                        o(
                                            e,
                                            { value: l.value, cursor: c(l) },
                                            s
                                        ));
                        };
                        function d(e) {
                            n.ignoreCompositionEvent ||
                                s(e.type, e, { value: e.data });
                        }
                        l.addEventListener("change", (e) =>
                            e.stopPropagation()
                        ),
                            l.addEventListener("focus", function (e) {
                                (t.focus = !0),
                                    s("focus", e, { value: t.value }),
                                    r(),
                                    a();
                            }),
                            l.addEventListener("blur", function (e) {
                                t.composing && ((t.composing = !1), u(e, !0)),
                                    (t.focus = !1),
                                    s("blur", e, {
                                        value: t.value,
                                        cursor: c(e.target),
                                    });
                            }),
                            l.addEventListener("input", u),
                            l.addEventListener("compositionstart", (e) => {
                                e.stopPropagation(), (t.composing = !0), d(e);
                            }),
                            l.addEventListener("compositionend", (e) => {
                                e.stopPropagation(),
                                    t.composing && ((t.composing = !1), u(e)),
                                    d(e);
                            }),
                            l.addEventListener("compositionupdate", d);
                    }
                );
        })(o, i, e, r, a, s);
    return {
        fieldRef: o,
        state: i,
        scopedAttrsState: c,
        fixDisabledColor:
            0 === String(navigator.vendor).indexOf("Apple") &&
            CSS.supports("image-orientation:from-image"),
        trigger: r,
    };
}
const Fd = Ul({
        name: "Input",
        props: w({}, Ad, {
            placeholderClass: { type: String, default: "input-placeholder" },
            textContentType: { type: String, default: "" },
        }),
        emits: ["confirm", ...Rd],
        setup(e, { emit: t }) {
            const n = ["text", "number", "idcard", "digit", "password", "tel"],
                s = ["off", "one-time-code"],
                o = hi(() => {
                    let t = "";
                    switch (e.type) {
                        case "text":
                            "search" === e.confirmType && (t = "search");
                            break;
                        case "idcard":
                            t = "text";
                            break;
                        case "digit":
                            t = "number";
                            break;
                        default:
                            t = ~n.includes(e.type) ? e.type : "text";
                    }
                    return e.password ? "password" : t;
                }),
                i = hi(() => {
                    const t = s.indexOf(e.textContentType),
                        n = s.indexOf(V(e.textContentType));
                    return s[-1 !== t ? t : -1 !== n ? n : 0];
                });
            let r,
                a = Qt("");
            const c = Qt(null),
                {
                    fieldRef: l,
                    state: u,
                    scopedAttrsState: d,
                    fixDisabledColor: h,
                    trigger: p,
                } = Ld(e, c, t, (e, t) => {
                    const n = e.target;
                    if ("number" === o.value) {
                        if (
                            (r &&
                                (n.removeEventListener("blur", r), (r = null)),
                            n.validity && !n.validity.valid)
                        ) {
                            if (
                                ((!a.value || !n.value) && "-" === e.data) ||
                                ("-" === a.value[0] &&
                                    "deleteContentBackward" === e.inputType)
                            )
                                return (
                                    (a.value = "-"),
                                    (t.value = ""),
                                    (r = () => {
                                        a.value = n.value = "";
                                    }),
                                    n.addEventListener("blur", r),
                                    !1
                                );
                            if (a.value)
                                if (-1 !== a.value.indexOf(".")) {
                                    if (
                                        "." !== e.data &&
                                        "deleteContentBackward" === e.inputType
                                    ) {
                                        const e = a.value.indexOf(".");
                                        return (
                                            (a.value =
                                                n.value =
                                                t.value =
                                                    a.value.slice(0, e)),
                                            !0
                                        );
                                    }
                                } else if ("." === e.data)
                                    return (
                                        (a.value += "."),
                                        (r = () => {
                                            a.value = n.value = a.value.slice(
                                                0,
                                                -1
                                            );
                                        }),
                                        n.addEventListener("blur", r),
                                        !1
                                    );
                            return (
                                (a.value =
                                    t.value =
                                    n.value =
                                        "-" === a.value ? "" : a.value),
                                !1
                            );
                        }
                        a.value = n.value;
                        const s = t.maxlength;
                        if (s > 0 && n.value.length > s)
                            return (
                                (n.value = n.value.slice(0, s)),
                                (t.value = n.value),
                                !1
                            );
                    }
                });
            Vn(
                () => u.value,
                (t) => {
                    "number" !== e.type ||
                        ("-" === a.value && "" === t) ||
                        (a.value = t);
                }
            );
            const f = ["number", "digit"],
                m = hi(() => (f.includes(e.type) ? e.step : ""));
            function g(t) {
                if ("Enter" !== t.key) return;
                const n = t.target;
                t.stopPropagation(),
                    p("confirm", t, { value: n.value }),
                    !e.confirmHold && n.blur();
            }
            return () => {
                let t =
                    e.disabled && h
                        ? Ho(
                              "input",
                              {
                                  key: "disabled-input",
                                  ref: l,
                                  value: u.value,
                                  tabindex: "-1",
                                  readonly: !!e.disabled,
                                  type: o.value,
                                  maxlength: u.maxlength,
                                  step: m.value,
                                  class: "uni-input-input",
                                  onFocus: (e) => e.target.blur(),
                              },
                              null,
                              40,
                              [
                                  "value",
                                  "readonly",
                                  "type",
                                  "maxlength",
                                  "step",
                                  "onFocus",
                              ]
                          )
                        : Ps(
                              Ho(
                                  "input",
                                  {
                                      key: "input",
                                      ref: l,
                                      "onUpdate:modelValue": (e) =>
                                          (u.value = e),
                                      disabled: !!e.disabled,
                                      type: o.value,
                                      maxlength: u.maxlength,
                                      step: m.value,
                                      enterkeyhint: e.confirmType,
                                      pattern:
                                          "number" === e.type
                                              ? "[0-9]*"
                                              : void 0,
                                      class: "uni-input-input",
                                      autocomplete: i.value,
                                      onKeyup: g,
                                      inputmode: e.inputmode,
                                  },
                                  null,
                                  40,
                                  [
                                      "onUpdate:modelValue",
                                      "disabled",
                                      "type",
                                      "maxlength",
                                      "step",
                                      "enterkeyhint",
                                      "pattern",
                                      "autocomplete",
                                      "onKeyup",
                                      "inputmode",
                                  ]
                              ),
                              [[ur, u.value]]
                          );
                return Ho(
                    "uni-input",
                    { ref: c },
                    [
                        Ho("div", { class: "uni-input-wrapper" }, [
                            Ps(
                                Ho(
                                    "div",
                                    Qo(d.attrs, {
                                        style: e.placeholderStyle,
                                        class: [
                                            "uni-input-placeholder",
                                            e.placeholderClass,
                                        ],
                                    }),
                                    [e.placeholder],
                                    16
                                ),
                                [[mr, !(u.value.length || "-" === a.value)]]
                            ),
                            "search" === e.confirmType
                                ? Ho(
                                      "form",
                                      {
                                          action: "",
                                          onSubmit: (e) => e.preventDefault(),
                                          class: "uni-input-form",
                                      },
                                      [t],
                                      40,
                                      ["onSubmit"]
                                  )
                                : t,
                        ]),
                    ],
                    512
                );
            };
        },
    }),
    Ud = ["navigate", "redirect", "switchTab", "reLaunch", "navigateBack"],
    Bd = [
        "slide-in-right",
        "slide-in-left",
        "slide-in-top",
        "slide-in-bottom",
        "fade-in",
        "zoom-out",
        "zoom-fade-out",
        "pop-in",
        "none",
    ],
    jd = [
        "slide-out-right",
        "slide-out-left",
        "slide-out-top",
        "slide-out-bottom",
        "fade-out",
        "zoom-in",
        "zoom-fade-in",
        "pop-out",
        "none",
    ],
    Gd = {
        hoverClass: { type: String, default: "navigator-hover" },
        url: { type: String, default: "" },
        openType: {
            type: String,
            default: "navigate",
            validator: (e) => Boolean(~Ud.indexOf(e)),
        },
        delta: { type: Number, default: 1 },
        hoverStartTime: { type: [Number, String], default: 50 },
        hoverStayTime: { type: [Number, String], default: 600 },
        exists: { type: String, default: "" },
        hoverStopPropagation: { type: Boolean, default: !1 },
        animationType: {
            type: String,
            default: "",
            validator: (e) => !e || Bd.concat(jd).includes(e),
        },
        animationDuration: { type: [String, Number], default: 300 },
    };
w({}, Gd, { renderLink: { type: Boolean, default: !0 } });
const $d = { ensp: " ", emsp: " ", nbsp: " " };
function qd(e, t) {
    return e
        .replace(/\\n/g, "\n")
        .split("\n")
        .map((e) =>
            (function (e, { space: t, decode: n }) {
                if (!e) return e;
                t && $d[t] && (e = e.replace(/ /g, $d[t]));
                if (!n) return e;
                return e
                    .replace(/&nbsp;/g, $d.nbsp)
                    .replace(/&ensp;/g, $d.ensp)
                    .replace(/&emsp;/g, $d.emsp)
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, '"')
                    .replace(/&apos;/g, "'");
            })(e, t)
        );
}
const Vd = Ul({
        name: "Text",
        props: {
            selectable: { type: [Boolean, String], default: !1 },
            space: { type: String, default: "" },
            decode: { type: [Boolean, String], default: !1 },
        },
        setup:
            (e, { slots: t }) =>
            () => {
                const n = [];
                return (
                    t.default &&
                        t.default().forEach((t) => {
                            if (8 & t.shapeFlag && t.type !== Oo) {
                                const s = qd(t.children, {
                                        space: e.space,
                                        decode: e.decode,
                                    }),
                                    o = s.length - 1;
                                s.forEach((e, t) => {
                                    (0 !== t || e) && n.push(zo(e)),
                                        t !== o && n.push(Ho("br"));
                                });
                            } else n.push(t);
                        }),
                    Ho(
                        "uni-text",
                        { selectable: !!e.selectable || null },
                        [Ho("span", null, n)],
                        8,
                        ["selectable"]
                    )
                );
            },
    }),
    Hd = Ul({
        name: "View",
        props: w({}, jl),
        setup(e, { slots: t }) {
            const { hovering: n, binding: s } = Gl(e);
            return () => {
                const o = e.hoverClass;
                return o && "none" !== o
                    ? Ho(
                          "uni-view",
                          Qo({ class: n.value ? o : "" }, s),
                          [t.default && t.default()],
                          16
                      )
                    : Ho("uni-view", null, [t.default && t.default()]);
            };
        },
    });
function Wd(e, t, n, s) {
    N(t) && ws(e, t.bind(n), s);
}
function zd(e, t, n) {
    var s;
    const o = e.mpType || n.$mpType;
    if (
        o &&
        "component" !== o &&
        (Object.keys(e).forEach((s) => {
            if (
                (function (e, t, n = !0) {
                    return (
                        !(n && !N(t)) &&
                        (we.indexOf(e) > -1 || 0 === e.indexOf("on"))
                    );
                })(s, e[s], !1)
            ) {
                const o = e[s];
                T(o) ? o.forEach((e) => Wd(s, e, n, t)) : Wd(s, o, n, t);
            }
        }),
        "page" === o)
    ) {
        t.__isVisible = !0;
        try {
            il(n, "onLoad", t.attrs.__pageQuery),
                delete t.attrs.__pageQuery,
                "preloadPage" !==
                    (null == (s = n.$page) ? void 0 : s.openType) &&
                    il(n, "onShow");
        } catch (i) {
            console.error(i.message + "\n" + i.stack);
        }
    }
}
function Xd(e, t, n) {
    zd(e, t, n);
}
function Jd(e, t, n) {
    return (e[t] = n);
}
function Kd(e, ...t) {
    const n = this[e];
    return n ? n(...t) : (console.error(`method ${e} not found`), null);
}
function Yd(e) {
    return function (t, n, s) {
        if (!n) throw t;
        const o = e._instance;
        if (!o || !o.proxy) throw t;
        il(o.proxy, "onError", t);
    };
}
function Qd(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Zd(e) {
    const t = e._context.config;
    var n;
    (t.errorHandler = _e(e, Yd)),
        (n = t.optionMergeStrategies),
        we.forEach((e) => {
            n[e] = Qd;
        });
    const s = t.globalProperties;
    (s.$set = Jd),
        (s.$applyOptions = Xd),
        (s.$callMethod = Kd),
        (function (e) {
            Ce.forEach((t) => t(e));
        })(e);
}
const eh = Xc("upm");
function th() {
    return Gn(eh);
}
function nh(e) {
    const t = (function (e) {
        return Ut(
            (function (e) {
                {
                    const { navigationBar: t } = e,
                        { titleSize: n, titleColor: s, backgroundColor: o } = t;
                    (t.titleText = t.titleText || ""),
                        (t.type = t.type || "default"),
                        (t.titleSize = n || "16px"),
                        (t.titleColor = s || "#000000"),
                        (t.backgroundColor = o || "#F8F8F8");
                }
                if (history.state) {
                    const t = history.state.__type__;
                    ("redirectTo" !== t && "reLaunch" !== t) ||
                        0 !== ph().length ||
                        ((e.isEntry = !0), (e.isQuit = !0));
                }
                return e;
            })(JSON.parse(JSON.stringify(ol(lc().meta, e))))
        );
    })(e);
    return jn(eh, t), t;
}
function sh() {
    return lc();
}
function oh() {
    return (history.state && history.state.__id__) || 1;
}
const ih = window.CSS && window.CSS.supports;
function rh(e) {
    return ih && (ih(e) || ih.apply(window.CSS, e.split(":")));
}
const ah = rh("top:env(a)"),
    ch = rh("top:constant(a)"),
    lh = (() => (ah ? "env" : ch ? "constant" : ""))();
function uh(e) {
    let t = 0;
    var n, s;
    "custom" !== e.navigationBar.style &&
        ["default", "float"].indexOf(e.navigationBar.type) > -1 &&
        (t = 44),
        zc({
            "--window-top":
                ((s = t),
                lh ? `calc(${s}px + ${lh}(safe-area-inset-top))` : `${s}px`),
            "--window-bottom":
                ((n = 0),
                lh ? `calc(${n}px + ${lh}(safe-area-inset-bottom))` : `${n}px`),
        });
}
const dh = new Map();
function hh() {
    return dh;
}
function ph() {
    const e = [],
        t = dh.values();
    for (const n of t) n.$.__isTabBar ? n.$.__isActive && e.push(n) : e.push(n);
    return e;
}
function fh(e, t = !0) {
    const n = dh.get(e);
    (n.$.__isUnload = !0),
        il(n, "onUnload"),
        dh.delete(e),
        t &&
            (function (e) {
                const t = bh.get(e);
                t && (bh.delete(e), Sh.pruneCacheEntry(t));
            })(e);
}
let mh = oh();
function gh(e) {
    const t = th();
    let n = e.fullPath;
    return (
        e.meta.isEntry &&
            -1 === n.indexOf(e.meta.route) &&
            (n = "/" + e.meta.route + n.replace("/", "")),
        (function (e, t, n, s, o, i) {
            const { id: r, route: a } = s,
                c = ke(s.navigationBar, __uniConfig.themeConfig, i).titleColor;
            return {
                id: r,
                path: ie(a),
                route: a,
                fullPath: t,
                options: n,
                meta: s,
                openType: e,
                eventChannel: o,
                statusBarStyle: "#ffffff" === c ? "light" : "dark",
            };
        })("navigateTo", n, {}, t)
    );
}
function yh(e) {
    const t = gh(e.$route);
    !(function (e, t) {
        (e.route = t.route),
            (e.$vm = e),
            (e.$page = t),
            (e.$mpType = "page"),
            t.meta.isTabBar && ((e.$.__isTabBar = !0), (e.$.__isActive = !0));
    })(e, t),
        dh.set(vh(t.path, t.id), e);
}
function vh(e, t) {
    return e + "$$" + t;
}
const bh = new Map(),
    Sh = {
        get: (e) => bh.get(e),
        set(e, t) {
            !(function (e) {
                const t = parseInt(e.split("$$")[1]);
                if (!t) return;
                Sh.forEach((e, n) => {
                    const s = parseInt(n.split("$$")[1]);
                    s &&
                        s > t &&
                        (Sh.delete(n),
                        Sh.pruneCacheEntry(e),
                        bn(() => {
                            dh.forEach((e, t) => {
                                e.$.isUnmounted && dh.delete(t);
                            });
                        }));
                });
            })(e),
                bh.set(e, t);
        },
        delete(e) {
            bh.get(e) && bh.delete(e);
        },
        forEach(e) {
            bh.forEach(e);
        },
    };
function Eh(e, t) {
    !(function (e) {
        const t = Ch(e),
            { body: n } = document;
        _h && n.removeAttribute(_h), t && n.setAttribute(t, ""), (_h = t);
    })(e),
        uh(t),
        (function (e) {
            {
                const t = "nvue-dir-" + __uniConfig.nvue["flex-direction"];
                e.isNVue
                    ? (document.body.setAttribute("nvue", ""),
                      document.body.setAttribute(t, ""))
                    : (document.body.removeAttribute("nvue"),
                      document.body.removeAttribute(t));
            }
        })(t),
        (function (e, t) {
            document.removeEventListener("touchmove", rl),
                Mh && document.removeEventListener("scroll", Mh);
            if (t.disableScroll)
                return document.addEventListener("touchmove", rl);
            const { onPageScroll: n, onReachBottom: s } = e,
                o = "transparent" === t.navigationBar.type;
            if (!n && !s && !o) return;
            const i = {},
                r = e.proxy.$page.id;
            (n || o) &&
                (i.onPageScroll = (function (e, t, n) {
                    return (s) => {
                        t &&
                            $p.publishHandler(
                                "onPageScroll",
                                { scrollTop: s },
                                e
                            ),
                            n && $p.emit(e + ".onPageScroll", { scrollTop: s });
                    };
                })(r, n, o));
            s &&
                ((i.onReachBottomDistance = t.onReachBottomDistance || 50),
                (i.onReachBottom = () =>
                    $p.publishHandler("onReachBottom", {}, r)));
            (Mh = ll(i)),
                requestAnimationFrame(() =>
                    document.addEventListener("scroll", Mh)
                );
        })(e, t);
}
function wh(e) {
    const t = Ch(e);
    t &&
        (function (e) {
            const t = document.querySelector("uni-page-body");
            t && t.setAttribute(e, "");
        })(t);
}
function Ch(e) {
    return e.type.__scopeId;
}
let _h, Mh;
function Th(e) {
    const t = ic({
        history: kh(),
        strict: !!__uniConfig.router.strict,
        routes: __uniRoutes,
        scrollBehavior: Ih,
    });
    (e.router = t), e.use(t);
}
const Ih = (e, t, n) => {
    if (n) return n;
};
function kh() {
    let { routerBase: e } = __uniConfig.router;
    "/" === e && (e = "");
    const t =
        ((n = e),
        (n = location.host
            ? n || location.pathname + location.search
            : "").includes("#") || (n += "#"),
        ta(n));
    var n;
    return (
        t.listen((e, t, n) => {
            "back" === n.direction &&
                (function (e = 1) {
                    const t = ph(),
                        n = t.length - 1,
                        s = n - e;
                    for (let o = n; o > s; o--) {
                        const e = t[o].$page;
                        fh(vh(e.path, e.id), !1);
                    }
                })(Math.abs(n.delta));
        }),
        t
    );
}
const Oh = {
    install(e) {
        Zd(e),
            wl(e),
            Rl(e),
            e.config.warnHandler || (e.config.warnHandler = Nh),
            Th(e);
    },
};
function Nh(e, t, n) {
    if (t) {
        if ("PageMetaHead" === t.$.type.name) return;
        const e = t.$.parent;
        if (e && "PageMeta" === e.type.name) return;
    }
    const s = [`[Vue warn]: ${e}`];
    n.length && s.push("\n", n), console.warn(...s);
}
const xh = { class: "uni-async-loading" },
    Ah = Ho("i", { class: "uni-loading" }, null, -1),
    Rh = Bl({
        name: "AsyncLoading",
        render: () => (Ro(), Uo("div", xh, [Ah])),
    });
function Ph() {
    window.location.reload();
}
const Dh = Bl({
    name: "AsyncError",
    setup() {
        fc();
        const { t: e } = hc();
        return () =>
            Ho(
                "div",
                { class: "uni-async-error", onClick: Ph },
                [e("uni.async.error")],
                8,
                ["onClick"]
            );
    },
});
let Lh;
function Fh() {
    return Lh;
}
function Uh(e) {
    (Lh = e),
        Object.defineProperty(Lh.$.ctx, "$children", {
            get: () => ph().map((e) => e.$vm),
        });
    const t = Lh.$.appContext.app;
    t.component(Rh.name) || t.component(Rh.name, Rh),
        t.component(Dh.name) || t.component(Dh.name, Dh),
        (function (e) {
            (e.$vm = e), (e.$mpType = "app");
            const t = Qt(hc().getLocale());
            Object.defineProperty(e, "$locale", {
                get: () => t.value,
                set(e) {
                    t.value = e;
                },
            });
        })(Lh),
        (function (e, t) {
            const n = e.$options || {};
            (n.globalData = w(n.globalData || {}, t)),
                Object.defineProperty(e, "globalData", {
                    get: () => n.globalData,
                    set(e) {
                        n.globalData = e;
                    },
                });
        })(Lh),
        xl(),
        Ac();
}
function Bh(e, { clone: t, init: n, setup: s, before: o }) {
    t && (e = w({}, e)), o && o(e);
    const i = e.setup;
    return (
        (e.setup = (e, t) => {
            const o = si();
            n(o.proxy);
            const r = s(o);
            if (i) return i(r || e, t);
        }),
        e
    );
}
function jh(e, t) {
    return e && (e.__esModule || "Module" === e[Symbol.toStringTag])
        ? Bh(e.default, t)
        : Bh(e, t);
}
function Gh(e) {
    return jh(e, {
        clone: !0,
        init: yh,
        setup(e) {
            e.$pageInstance = e;
            const t = sh(),
                n = me(t.query);
            (e.attrs.__pageQuery = n), (e.proxy.$page.options = n);
            const s = th();
            var o, i, r;
            return (
                _s(() => {
                    Eh(e, s);
                }),
                Ms(() => {
                    wh(e);
                    const { onReady: n } = e;
                    n && X(n), Hh(t);
                }),
                ms(
                    () => {
                        if (!e.__isVisible) {
                            Eh(e, s), (e.__isVisible = !0);
                            const { onShow: n } = e;
                            n && X(n),
                                bn(() => {
                                    Hh(t);
                                });
                        }
                    },
                    "ba",
                    o
                ),
                (function (e, t) {
                    ms(e, "bda", t);
                })(() => {
                    if (e.__isVisible && !e.__isUnload) {
                        e.__isVisible = !1;
                        const { onHide: t } = e;
                        t && X(t);
                    }
                }),
                (i = s.id),
                $p.subscribe(Sc(i, "invokeViewApi"), r ? r(Ec) : Ec),
                ks(() => {
                    !(function (e) {
                        $p.unsubscribe(Sc(e, "invokeViewApi")),
                            Object.keys(bc).forEach((t) => {
                                0 === t.indexOf(e + ".") && delete bc[t];
                            });
                    })(s.id);
                }),
                n
            );
        },
    });
}
function $h() {
    const {
            windowWidth: e,
            windowHeight: t,
            screenWidth: n,
            screenHeight: s,
        } = rp(),
        o =
            90 === Math.abs(Number(window.orientation))
                ? "landscape"
                : "portrait";
    qp.emit("onResize", {
        deviceOrientation: o,
        size: {
            windowWidth: e,
            windowHeight: t,
            screenWidth: n,
            screenHeight: s,
        },
    });
}
function qh(e) {
    F(e.data) &&
        "WEB_INVOKE_APPSERVICE" === e.data.type &&
        qp.emit("onWebInvokeAppService", e.data.data, e.data.pageId);
}
function Vh() {
    const { emit: e } = qp;
    "visible" === document.visibilityState
        ? e("onAppEnterForeground", w({}, dd))
        : e("onAppEnterBackground");
}
function Hh(e) {
    const { tabBarText: t, tabBarIndex: n, route: s } = e.meta;
    t && il("onTabItemTap", { index: n, text: t, pagePath: s });
}
const Wh = re(() => {
    ju.forEach((e) => {
        zh.prototype[e] = function (t) {
            N(t) && this._events[e].push(t);
        };
    }),
        Gu.forEach((e) => {
            zh.prototype[e] = function (t) {
                var n = this._events[e.replace("off", "on")],
                    s = n.indexOf(t);
                s >= 0 && n.splice(s, 1);
            };
        });
});
class zh {
    constructor() {
        this._src = "";
        var e = (this._audio = new Audio());
        this._stoping = !1;
        [
            "src",
            "autoplay",
            "loop",
            "duration",
            "currentTime",
            "paused",
            "volume",
        ].forEach((t) => {
            Object.defineProperty(this, t, {
                set:
                    "src" === t
                        ? (t) => ((e.src = Hl(t)), (this._src = t), t)
                        : (n) => ((e[t] = n), n),
                get: "src" === t ? () => this._src : () => e[t],
            });
        }),
            (this.startTime = 0),
            Object.defineProperty(this, "obeyMuteSwitch", {
                set: () => !1,
                get: () => !1,
            }),
            Object.defineProperty(this, "buffered", {
                get() {
                    var t = e.buffered;
                    return t.length ? t.end(t.length - 1) : 0;
                },
            }),
            (this._events = {}),
            ju.forEach((e) => {
                this._events[e] = [];
            }),
            e.addEventListener("loadedmetadata", () => {
                var t = Number(this.startTime) || 0;
                t > 0 && (e.currentTime = t);
            });
        var t = ["canplay", "pause", "seeking", "seeked", "timeUpdate"];
        t.concat(["play", "ended", "error", "waiting"]).forEach((n) => {
            e.addEventListener(
                n.toLowerCase(),
                () => {
                    if (this._stoping && t.indexOf(n) >= 0) return;
                    const e = `on${n.slice(0, 1).toUpperCase()}${n.slice(1)}`;
                    this._events[e].forEach((e) => {
                        e();
                    });
                },
                !1
            );
        }),
            Wh();
    }
    play() {
        (this._stoping = !1), this._audio.play();
    }
    pause() {
        this._audio.pause();
    }
    stop() {
        (this._stoping = !0),
            this._audio.pause(),
            (this._audio.currentTime = 0),
            this._events.onStop.forEach((e) => {
                e();
            });
    }
    seek(e) {
        (this._stoping = !1),
            "number" != typeof (e = Number(e)) ||
                isNaN(e) ||
                (this._audio.currentTime = e);
    }
    destroy() {
        this.stop();
    }
}
const Xh = Ou(0, () => new zh()),
    Jh =
        (navigator.cookieEnabled &&
            (window.localStorage || window.sessionStorage)) ||
        {};
let Kh;
function Yh() {
    if (((Kh = Kh || Jh.__DC_STAT_UUID), !Kh)) {
        Kh = Date.now() + "" + Math.floor(1e7 * Math.random());
        try {
            Jh.__DC_STAT_UUID = Kh;
        } catch (e) {}
    }
    return Kh;
}
function Qh() {
    if (!0 !== __uniConfig.darkmode)
        return x(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
    try {
        return window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    } catch (e) {
        return "light";
    }
}
function Zh() {
    let e,
        t = "0",
        n = "",
        s = "phone";
    const o = navigator.language;
    if (Xl) {
        e = "iOS";
        const s = Wl.match(/OS\s([\w_]+)\slike/);
        s && (t = s[1].replace(/_/g, "."));
        const o = Wl.match(/\(([a-zA-Z]+);/);
        o && (n = o[1]);
    } else if (zl) {
        e = "Android";
        const s = Wl.match(/Android[\s/]([\w\.]+)[;\s]/);
        s && (t = s[1]);
        const o = Wl.match(/\((.+?)\)/),
            i = o ? o[1].split(";") : Wl.split(" "),
            r = [
                /\bAndroid\b/i,
                /\bLinux\b/i,
                /\bU\b/i,
                /^\s?[a-z][a-z]$/i,
                /^\s?[a-z][a-z]-[a-z][a-z]$/i,
                /\bwv\b/i,
                /\/[\d\.,]+$/,
                /^\s?[\d\.,]+$/,
                /\bBrowser\b/i,
                /\bMobile\b/i,
            ];
        for (let e = 0; e < i.length; e++) {
            const t = i[e];
            if (t.indexOf("Build") > 0) {
                n = t.split("Build")[0].trim();
                break;
            }
            let s;
            for (let e = 0; e < r.length; e++)
                if (r[e].test(t)) {
                    s = !0;
                    break;
                }
            if (!s) {
                n = t.trim();
                break;
            }
        }
    } else if (Ql)
        (n = "iPad"),
            (e = "iOS"),
            (s = "pad"),
            (t = N(window.BigInt) ? "14.0" : "13.0");
    else if (Jl || Kl || Yl) {
        (n = "PC"), (e = "PC"), (s = "pc"), (t = "0");
        let o = Wl.match(/\((.+?)\)/)[1];
        if (Jl) {
            switch (((e = "Windows"), Jl[1])) {
                case "5.1":
                    t = "XP";
                    break;
                case "6.0":
                    t = "Vista";
                    break;
                case "6.1":
                    t = "7";
                    break;
                case "6.2":
                    t = "8";
                    break;
                case "6.3":
                    t = "8.1";
                    break;
                case "10.0":
                    t = "10";
            }
            const n = o && o.match(/[Win|WOW]([\d]+)/);
            n && (t += ` x${n[1]}`);
        } else if (Kl) {
            e = "macOS";
            const n = (o && o.match(/Mac OS X (.+)/)) || "";
            t &&
                ((t = n[1].replace(/_/g, ".")),
                -1 !== t.indexOf(";") && (t = t.split(";")[0]));
        } else if (Yl) {
            e = "Linux";
            const n = (o && o.match(/Linux (.*)/)) || "";
            n && ((t = n[1]), -1 !== t.indexOf(";") && (t = t.split(";")[0]));
        }
    } else (e = "Other"), (t = "0"), (s = "unknown");
    const i = `${e} ${t}`,
        r = e.toLocaleLowerCase();
    let a = "",
        c = String(
            (function () {
                const e = navigator.userAgent,
                    t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1,
                    n = e.indexOf("Edge") > -1 && !t,
                    s = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
                if (t) {
                    new RegExp("MSIE (\\d+\\.\\d+);").test(e);
                    const t = parseFloat(RegExp.$1);
                    return t > 6 ? t : 6;
                }
                return n ? -1 : s ? 11 : -1;
            })()
        );
    if ("-1" !== c) a = "IE";
    else {
        const e = ["Version", "Firefox", "Chrome", "Edge{0,1}"],
            t = ["Safari", "Firefox", "Chrome", "Edge"];
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                o = new RegExp(`(${s})/(\\S*)\\b`);
            o.test(Wl) && ((a = t[n]), (c = Wl.match(o)[2]));
        }
    }
    let l = "portrait";
    const u =
        void 0 === window.screen.orientation
            ? window.orientation
            : window.screen.orientation.angle;
    return (
        (l = 90 === Math.abs(u) ? "landscape" : "portrait"),
        {
            deviceBrand: void 0,
            brand: void 0,
            deviceModel: n,
            deviceOrientation: l,
            model: n,
            system: i,
            platform: r,
            browserName: a.toLocaleLowerCase(),
            browserVersion: c,
            language: o,
            deviceType: s,
            ua: Wl,
            osname: e,
            osversion: t,
            theme: Qh(),
        }
    );
}
const ep = Ou(0, () => {
    const e = window.devicePixelRatio,
        t = Zl(),
        n = eu(t),
        s = tu(t, n),
        o = (function (e, t) {
            return e
                ? Math[t ? "min" : "max"](screen.height, screen.width)
                : screen.height;
        })(t, n),
        i = nu(s);
    let r = window.innerHeight;
    const a = qc.top,
        c = {
            left: qc.left,
            right: i - qc.right,
            top: qc.top,
            bottom: r - qc.bottom,
            width: i - qc.left - qc.right,
            height: r - qc.top - qc.bottom,
        },
        { top: l, bottom: u } = (function () {
            const e = document.documentElement.style,
                t = Wc(),
                n = Hc(e, "--window-bottom"),
                s = Hc(e, "--window-left"),
                o = Hc(e, "--window-right"),
                i = Hc(e, "--top-window-height");
            return {
                top: t,
                bottom: n ? n + qc.bottom : 0,
                left: s ? s + qc.left : 0,
                right: o ? o + qc.right : 0,
                topWindowHeight: i || 0,
            };
        })();
    return (
        (r -= l),
        (r -= u),
        {
            windowTop: l,
            windowBottom: u,
            windowWidth: i,
            windowHeight: r,
            pixelRatio: e,
            screenWidth: s,
            screenHeight: o,
            statusBarHeight: a,
            safeArea: c,
            safeAreaInsets: {
                top: qc.top,
                right: qc.right,
                bottom: qc.bottom,
                left: qc.left,
            },
            screenTop: o - r,
        }
    );
});
let tp,
    np = !0;
function sp() {
    np && (tp = Zh());
}
const op = Ou(0, () => {
        sp();
        const {
            deviceBrand: e,
            deviceModel: t,
            brand: n,
            model: s,
            platform: o,
            system: i,
            deviceOrientation: r,
            deviceType: a,
        } = tp;
        return {
            brand: n,
            deviceBrand: e,
            deviceModel: t,
            devicePixelRatio: window.devicePixelRatio,
            deviceId: Yh(),
            deviceOrientation: r,
            deviceType: a,
            model: s,
            platform: o,
            system: i,
        };
    }),
    ip = Ou(0, () => {
        sp();
        const { theme: e, language: t, browserName: n, browserVersion: s } = tp;
        return {
            appId: __uniConfig.appId,
            appName: __uniConfig.appName,
            appVersion: __uniConfig.appVersion,
            appVersionCode: __uniConfig.appVersionCode,
            appLanguage: $u ? $u() : t,
            enableDebug: !1,
            hostSDKVersion: void 0,
            hostPackageName: void 0,
            hostFontSizeSetting: void 0,
            hostName: n,
            hostVersion: s,
            hostTheme: e,
            hostLanguage: t,
            language: t,
            SDKVersion: "",
            theme: e,
            version: "",
        };
    }),
    rp = Ou(0, () => {
        (np = !0), sp(), (np = !1);
        const e = ep(),
            t = op(),
            n = ip();
        np = !0;
        const {
                ua: s,
                browserName: o,
                browserVersion: i,
                osname: r,
                osversion: a,
            } = tp,
            c = w(e, t, n, {
                ua: s,
                browserName: o,
                browserVersion: i,
                uniPlatform: "web",
                uniCompileVersion: __uniConfig.compilerVersion,
                uniRuntimeVersion: __uniConfig.compilerVersion,
                fontSizeSetting: void 0,
                osName: r.toLocaleLowerCase(),
                osVersion: a,
                osLanguage: void 0,
                osTheme: void 0,
            });
        return (
            delete c.screenTop,
            delete c.enableDebug,
            __uniConfig.darkmode || delete c.theme,
            (function (e) {
                let t = {};
                return (
                    F(e) &&
                        Object.keys(e)
                            .sort()
                            .forEach((n) => {
                                const s = n;
                                t[s] = e[s];
                            }),
                    Object.keys(t) ? t : e
                );
            })(c)
        );
    });
const ap = Ou(0, (e, t) => {
    const n = typeof t,
        s = "string" === n ? t : JSON.stringify({ type: n, data: t });
    localStorage.setItem(e, s);
});
function cp(e) {
    const t = localStorage && localStorage.getItem(e);
    if (!x(t)) throw new Error("data not found");
    let n = t;
    try {
        const e = (function (e) {
            const t = ["object", "string", "number", "boolean", "undefined"];
            try {
                const n = x(e) ? JSON.parse(e) : e,
                    s = n.type;
                if (t.indexOf(s) >= 0) {
                    const e = Object.keys(n);
                    if (2 === e.length && "data" in n) {
                        if (typeof n.data === s) return n.data;
                        if (
                            "object" === s &&
                            /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(
                                n.data
                            )
                        )
                            return new Date(n.data);
                    } else if (1 === e.length) return "";
                }
            } catch (n) {}
        })(JSON.parse(t));
        void 0 !== e && (n = e);
    } catch (s) {}
    return n;
}
const lp = Ou(0, (e) => {
        try {
            return cp(e);
        } catch (t) {
            return "";
        }
    }),
    up = Ou(0, (e) => {
        localStorage && localStorage.removeItem(e);
    }),
    dp = Nu(
        "getFileInfo",
        ({ filePath: e }, { resolve: t, reject: n }) => {
            cd(e)
                .then((e) => {
                    t({ size: e.size });
                })
                .catch((e) => {
                    n(String(e));
                });
        },
        0,
        Hu
    );
const hp = Nu(
    "getImageInfo",
    ({ src: e }, { resolve: t, reject: n }) => {
        const s = new Image();
        (s.onload = function () {
            t({
                width: s.naturalWidth,
                height: s.naturalHeight,
                path:
                    0 === e.indexOf("/")
                        ? window.location.protocol +
                          "//" +
                          window.location.host +
                          e
                        : e,
            });
        }),
            (s.onerror = function () {
                n();
            }),
            (s.src = e);
    },
    0,
    Wu
);
Td();
const pp = { esc: ["Esc", "Escape"], enter: ["Enter"] },
    fp = Object.keys(pp);
function mp(e, { onEsc: t, onEnter: n }) {
    const s = Qt(e.visible),
        { key: o, disable: i } = (function () {
            const e = Qt(""),
                t = Qt(!1),
                n = (n) => {
                    if (t.value) return;
                    const s = fp.find((e) => -1 !== pp[e].indexOf(n.key));
                    s && (e.value = s), bn(() => (e.value = ""));
                };
            return (
                Ms(() => {
                    document.addEventListener("keyup", n);
                }),
                ks(() => {
                    document.removeEventListener("keyup", n);
                }),
                { key: e, disable: t }
            );
        })();
    return (
        Vn(
            () => e.visible,
            (e) => (s.value = e)
        ),
        Vn(
            () => s.value,
            (e) => (i.value = !e)
        ),
        $n(() => {
            const { value: e } = o;
            "esc" === e ? t && t() : "enter" === e && n && n();
        }),
        s
    );
}
class gp {
    constructor(e) {
        (this._callbacks = []), (this._xhr = e);
    }
    onProgressUpdate(e) {
        N(e) && this._callbacks.push(e);
    }
    offProgressUpdate(e) {
        const t = this._callbacks.indexOf(e);
        t >= 0 && this._callbacks.splice(t, 1);
    }
    abort() {
        (this._isAbort = !0),
            this._xhr && (this._xhr.abort(), delete this._xhr);
    }
    onHeadersReceived(e) {
        throw new Error("Method not implemented.");
    }
    offHeadersReceived(e) {
        throw new Error("Method not implemented.");
    }
}
const yp = ku(
        "uploadFile",
        (
            {
                url: e,
                file: t,
                filePath: n,
                name: s,
                files: o,
                header: i,
                formData: r,
                timeout: a = __uniConfig.networkTimeout.uploadFile,
            },
            { resolve: c, reject: l }
        ) => {
            var u = new gp();
            return (
                (T(o) && o.length) || (o = [{ name: s, file: t, uri: n }]),
                Promise.all(
                    o.map(({ file: e, uri: t }) =>
                        e instanceof Blob ? Promise.resolve(ld(e)) : cd(t)
                    )
                )
                    .then(function (t) {
                        var n,
                            s = new XMLHttpRequest(),
                            d = new FormData();
                        Object.keys(r).forEach((e) => {
                            d.append(e, r[e]);
                        }),
                            Object.values(o).forEach(({ name: e }, n) => {
                                const s = t[n];
                                d.append(
                                    e || "file",
                                    s,
                                    s.name || `file-${Date.now()}`
                                );
                            }),
                            s.open("POST", e),
                            Object.keys(i).forEach((e) => {
                                s.setRequestHeader(e, i[e]);
                            }),
                            (s.upload.onprogress = function (e) {
                                u._callbacks.forEach((t) => {
                                    var n = e.loaded,
                                        s = e.total;
                                    t({
                                        progress: Math.round((n / s) * 100),
                                        totalBytesSent: n,
                                        totalBytesExpectedToSend: s,
                                    });
                                });
                            }),
                            (s.onerror = function () {
                                clearTimeout(n), l();
                            }),
                            (s.onabort = function () {
                                clearTimeout(n), l("abort");
                            }),
                            (s.onload = function () {
                                clearTimeout(n);
                                const e = s.status;
                                c({
                                    statusCode: e,
                                    data: s.responseText || s.response,
                                });
                            }),
                            u._isAbort
                                ? l("abort")
                                : ((n = setTimeout(function () {
                                      (s.upload.onprogress =
                                          s.onload =
                                          s.onabort =
                                          s.onerror =
                                              null),
                                          u.abort(),
                                          l("timeout");
                                  }, a)),
                                  s.send(d),
                                  (u._xhr = s));
                    })
                    .catch(() => {
                        setTimeout(() => {
                            l("file error");
                        }, 0);
                    }),
                u
            );
        },
        0,
        zu
    ),
    vp = [],
    bp = { open: "", close: "", error: "", message: "" };
class Sp {
    constructor(e, t, n) {
        let s;
        this._callbacks = { open: [], close: [], error: [], message: [] };
        try {
            const n = (this._webSocket = new WebSocket(e, t));
            n.binaryType = "arraybuffer";
            ["open", "close", "error", "message"].forEach((e) => {
                (this._callbacks[e] = []),
                    n.addEventListener(e, (t) => {
                        const { data: n, code: s, reason: o } = t,
                            i =
                                "message" === e
                                    ? { data: n }
                                    : "close" === e
                                    ? { code: s, reason: o }
                                    : {};
                        if (
                            (this._callbacks[e].forEach((t) => {
                                try {
                                    t(i);
                                } catch (n) {
                                    console.error(
                                        `thirdScriptError\n${n};at socketTask.on${H(
                                            e
                                        )} callback function\n`,
                                        n
                                    );
                                }
                            }),
                            this === vp[0] &&
                                bp[e] &&
                                qp.invokeOnCallback(bp[e], i),
                            "error" === e || "close" === e)
                        ) {
                            const e = vp.indexOf(this);
                            e >= 0 && vp.splice(e, 1);
                        }
                    });
            });
            ["CLOSED", "CLOSING", "CONNECTING", "OPEN", "readyState"].forEach(
                (e) => {
                    Object.defineProperty(this, e, { get: () => n[e] });
                }
            );
        } catch (o) {
            s = o;
        }
        n && n(s, this);
    }
    send(e) {
        const t = (e || {}).data,
            n = this._webSocket;
        try {
            if (n.readyState !== n.OPEN)
                throw new Error("SocketTask.readyState is not OPEN");
            n.send(t), ae(e, "sendSocketMessage:ok");
        } catch (s) {
            ae(e, `sendSocketMessage:fail ${s}`);
        }
    }
    close(e = {}) {
        const t = this._webSocket;
        try {
            const n = e.code || 1e3,
                s = e.reason;
            x(s) ? t.close(n, s) : t.close(n), ae(e, "closeSocket:ok");
        } catch (n) {
            ae(e, `closeSocket:fail ${n}`);
        }
    }
    onOpen(e) {
        this._callbacks.open.push(e);
    }
    onMessage(e) {
        this._callbacks.message.push(e);
    }
    onError(e) {
        this._callbacks.error.push(e);
    }
    onClose(e) {
        this._callbacks.close.push(e);
    }
}
const Ep = ku(
        "connectSocket",
        ({ url: e, protocols: t }, { resolve: n, reject: s }) =>
            new Sp(e, t, (e, t) => {
                e ? s(e.toString()) : (vp.push(t), n());
            }),
        0,
        Xu
    ),
    wp = Nu(
        "navigateBack",
        (e, { resolve: t, reject: n }) => {
            let s = !0;
            return (
                !0 === il("onBackPress", { from: e.from || "navigateBack" }) &&
                    (s = !1),
                s ? (Fh().$router.go(-e.delta), t()) : n("onBackPress")
            );
        },
        0,
        Qu
    );
function Cp(
    { type: e, url: t, tabBarText: n, events: s, isAutomatedTesting: o },
    i
) {
    const r = Fh().$router,
        { path: a, query: c } = (function (e) {
            const [t, n] = e.split("?", 2);
            return { path: t, query: ye(n || "") };
        })(t);
    return new Promise((t, l) => {
        const u = (function (e, t) {
            return { __id__: t || ++mh, __type__: e };
        })(e, i);
        r["navigateTo" === e ? "push" : "replace"]({
            path: a,
            query: c,
            state: u,
            force: !0,
        }).then((i) => {
            if (ca(i)) return l(i.message);
            if (
                ("switchTab" === e &&
                    (r.currentRoute.value.meta.tabBarText = n),
                "navigateTo" === e)
            ) {
                const e = r.currentRoute.value.meta;
                return (
                    e.eventChannel
                        ? s &&
                          (Object.keys(s).forEach((t) => {
                              e.eventChannel._addListener(t, "on", s[t]);
                          }),
                          e.eventChannel._clearCache())
                        : (e.eventChannel = new be(u.__id__, s)),
                    t(
                        o
                            ? { __id__: u.__id__ }
                            : { eventChannel: e.eventChannel }
                    )
                );
            }
            return o ? t({ __id__: u.__id__ }) : t();
        });
    });
}
const _p = Nu(
    "redirectTo",
    ({ url: e, isAutomatedTesting: t }, { resolve: n, reject: s }) => (
        (function () {
            const e = Zc();
            if (!e) return;
            const t = e.$page;
            fh(vh(t.path, t.id));
        })(),
        Cp({ type: "redirectTo", url: e, isAutomatedTesting: t })
            .then(n)
            .catch(s)
    ),
    0,
    Ku
);
const Mp = Nu(
    "reLaunch",
    ({ url: e, isAutomatedTesting: t }, { resolve: n, reject: s }) => (
        (function () {
            const e = hh().keys();
            for (const t of e) fh(t);
        })(),
        Cp({ type: "reLaunch", url: e, isAutomatedTesting: t }).then(n).catch(s)
    ),
    0,
    Yu
);
function Tp(e) {
    __uniConfig.darkmode && qp.on("onThemeChange", e);
}
function Ip(e) {
    let t = {};
    return (
        __uniConfig.darkmode && (t = ke(e, __uniConfig.themeConfig, Qh())),
        __uniConfig.darkmode ? t : e
    );
}
const kp = {
        title: { type: String, default: "" },
        icon: { default: "success", validator: (e) => -1 !== id.indexOf(e) },
        image: { type: String, default: "" },
        duration: { type: Number, default: 1500 },
        mask: { type: Boolean, default: !1 },
        visible: { type: Boolean },
    },
    Op = { light: "#fff", dark: "rgba(255,255,255,0.9)" },
    Np = (e) => Op[e],
    xp = os({
        name: "Toast",
        props: kp,
        setup(e) {
            mc(), gc();
            const { Icon: t } = (function (e) {
                    const t = Qt(Np(Qh())),
                        n = ({ theme: e }) => (t.value = Np(e));
                    $n(() => {
                        var t;
                        e.visible
                            ? Tp(n)
                            : ((t = n), qp.off("onThemeChange", t));
                    });
                    return {
                        Icon: hi(() => {
                            switch (e.icon) {
                                case "success":
                                    return Ho(Qc(Jc, t.value, 38), {
                                        class: "uni-toast__icon",
                                    });
                                case "error":
                                    return Ho(Qc(Kc, t.value, 38), {
                                        class: "uni-toast__icon",
                                    });
                                case "loading":
                                    return Ho(
                                        "i",
                                        {
                                            class: [
                                                "uni-toast__icon",
                                                "uni-loading",
                                            ],
                                        },
                                        null,
                                        2
                                    );
                                default:
                                    return null;
                            }
                        }),
                    };
                })(e),
                n = mp(e, {});
            return () => {
                const { mask: s, duration: o, title: i, image: r } = e;
                return Ho(
                    Gi,
                    { name: "uni-fade" },
                    {
                        default: () => [
                            Ps(
                                Ho(
                                    "uni-toast",
                                    { "data-duration": o },
                                    [
                                        s
                                            ? Ho(
                                                  "div",
                                                  {
                                                      class: "uni-mask",
                                                      style: "background: transparent;",
                                                      onTouchmove: Vc,
                                                  },
                                                  null,
                                                  40,
                                                  ["onTouchmove"]
                                              )
                                            : "",
                                        r || t.value
                                            ? Ho(
                                                  "div",
                                                  { class: "uni-toast" },
                                                  [
                                                      r
                                                          ? Ho(
                                                                "img",
                                                                {
                                                                    src: r,
                                                                    class: "uni-toast__icon",
                                                                },
                                                                null,
                                                                10,
                                                                ["src"]
                                                            )
                                                          : t.value,
                                                      Ho(
                                                          "p",
                                                          {
                                                              class: "uni-toast__content",
                                                          },
                                                          [i]
                                                      ),
                                                  ]
                                              )
                                            : Ho(
                                                  "div",
                                                  { class: "uni-sample-toast" },
                                                  [
                                                      Ho(
                                                          "p",
                                                          {
                                                              class: "uni-simple-toast__text",
                                                          },
                                                          [i]
                                                      ),
                                                  ]
                                              ),
                                    ],
                                    8,
                                    ["data-duration"]
                                ),
                                [[mr, n.value]]
                            ),
                        ],
                    }
                );
            };
        },
    });
let Ap,
    Rp,
    Pp = "";
const Dp = xe();
function Lp(e) {
    Ap
        ? w(Ap, e)
        : ((Ap = Ut(w(e, { visible: !1 }))),
          bn(() => {
              var e, t, n;
              Dp.run(() => {
                  Vn([() => Ap.visible, () => Ap.duration], ([e, t]) => {
                      if (e) {
                          if ((Rp && clearTimeout(Rp), "onShowLoading" === Pp))
                              return;
                          Rp = setTimeout(() => {
                              Up("onHideToast");
                          }, t);
                      } else Rp && clearTimeout(Rp);
                  });
              }),
                  qp.on("onHidePopup", () => Up("onHidePopup")),
                  ((e = xp),
                  (t = Ap),
                  (n = () => {}),
                  (t.onClose = (...e) => ((t.visible = !1), n.apply(null, e))),
                  br(
                      os({ setup: () => () => (Ro(), Uo(e, t, null, 16)) })
                  )).mount(
                      (function (e) {
                          let t = document.getElementById(e);
                          return (
                              t ||
                                  ((t = document.createElement("div")),
                                  (t.id = e),
                                  document.body.append(t)),
                              t
                          );
                      })("u-a-t")
                  );
          })),
        setTimeout(() => {
            Ap.visible = !0;
        }, 10);
}
const Fp = Nu(
    "showToast",
    (e, { resolve: t, reject: n }) => {
        Lp(e), (Pp = "onShowToast"), t();
    },
    0,
    rd
);
function Up(e) {
    const { t: t } = hc();
    if (!Pp) return;
    let n = "";
    if (
        ("onHideToast" === e && "onShowToast" !== Pp
            ? (n = t("uni.showToast.unpaired"))
            : "onHideLoading" === e &&
              "onShowLoading" !== Pp &&
              (n = t("uni.showLoading.unpaired")),
        n)
    )
        return console.warn(n);
    (Pp = ""),
        setTimeout(() => {
            Ap.visible = !1;
        }, 10);
}
function Bp(e) {
    function t() {
        var t;
        (t = e.navigationBar.titleText),
            (document.title = t),
            qp.emit("onNavigationBarChange", { titleText: t });
    }
    $n(t), ps(t);
}
const jp = Nu(
        "pageScrollTo",
        ({ scrollTop: e, selector: t, duration: n }, { resolve: s }) => {
            !(function (e, t, n) {
                if (x(e)) {
                    const t = document.querySelector(e);
                    if (t) {
                        const { height: s, top: o } = t.getBoundingClientRect();
                        (e = o + window.pageYOffset), n && (e -= s);
                    }
                }
                e < 0 && (e = 0);
                const s = document.documentElement,
                    { clientHeight: o, scrollHeight: i } = s;
                if (((e = Math.min(e, i - o)), 0 === t))
                    return void (s.scrollTop = document.body.scrollTop = e);
                if (window.scrollY === e) return;
                const r = (t) => {
                    if (t <= 0) return void window.scrollTo(0, e);
                    const n = e - window.scrollY;
                    requestAnimationFrame(function () {
                        window.scrollTo(0, window.scrollY + (n / t) * 10),
                            r(t - 10);
                    });
                };
                r(t);
            })(t || e || 0, n, !0),
                s();
        },
        0,
        od
    ),
    Gp = Bl({
        name: "Layout",
        setup(e, { emit: t }) {
            const n = Qt(null);
            zc({
                "--status-bar-height": "0px",
                "--top-window-height": "0px",
                "--window-left": "0px",
                "--window-right": "0px",
                "--window-margin": "0px",
                "--tab-bar-height": "0px",
            });
            const s = (function () {
                    const e = lc();
                    return {
                        routeKey: hi(() => vh("/" + e.meta.route, oh())),
                        isTabBar: hi(() => e.meta.isTabBar),
                        routeCache: Sh,
                    };
                })(),
                { layoutState: o, windowState: i } = (function () {
                    sh();
                    {
                        const e = Ut({
                            marginWidth: 0,
                            leftWindowWidth: 0,
                            rightWindowWidth: 0,
                        });
                        return (
                            Vn(
                                () => e.marginWidth,
                                (e) => zc({ "--window-margin": e + "px" })
                            ),
                            Vn(
                                () => e.leftWindowWidth + e.marginWidth,
                                (e) => {
                                    zc({ "--window-left": e + "px" });
                                }
                            ),
                            Vn(
                                () => e.rightWindowWidth + e.marginWidth,
                                (e) => {
                                    zc({ "--window-right": e + "px" });
                                }
                            ),
                            { layoutState: e, windowState: hi(() => ({})) }
                        );
                    }
                })();
            !(function (e, t) {
                const n = sh();
                function s() {
                    const s = document.body.clientWidth,
                        o = ph();
                    let i = {};
                    if (o.length > 0) {
                        i = o[o.length - 1].$page.meta;
                    } else {
                        const e = dl(n.path, !0);
                        e && (i = e.meta);
                    }
                    const r = parseInt(
                        String(
                            (M(i, "maxWidth")
                                ? i.maxWidth
                                : __uniConfig.globalStyle.maxWidth) ||
                                Number.MAX_SAFE_INTEGER
                        )
                    );
                    let a = !1;
                    (a = s > r),
                        a && r
                            ? ((e.marginWidth = (s - r) / 2),
                              bn(() => {
                                  const e = t.value;
                                  e &&
                                      e.setAttribute(
                                          "style",
                                          "max-width:" + r + "px;margin:0 auto;"
                                      );
                              }))
                            : ((e.marginWidth = 0),
                              bn(() => {
                                  const e = t.value;
                                  e && e.removeAttribute("style");
                              }));
                }
                Vn([() => n.path], s),
                    Ms(() => {
                        s(), window.addEventListener("resize", s);
                    });
            })(o, n);
            const r = (function (e) {
                const t = Qt(!1);
                return hi(() => ({
                    "uni-app--showtabbar": e && e.value,
                    "uni-app--maxwidth": t.value,
                }));
            })(!1);
            return () => {
                const e = (function (e, t, n, s, o, i) {
                    return (function ({
                        routeKey: e,
                        isTabBar: t,
                        routeCache: n,
                    }) {
                        return Ho(oc, null, {
                            default: Pn(({ Component: s }) => [
                                (Ro(),
                                Uo(
                                    ds,
                                    { matchBy: "key", cache: n },
                                    [
                                        (Ro(),
                                        Uo(Us(s), {
                                            type: t.value ? "tabBar" : "",
                                            key: e.value,
                                        })),
                                    ],
                                    1032,
                                    ["cache"]
                                )),
                            ]),
                            _: 1,
                        });
                    })(e);
                })(s);
                return Ho("uni-app", { ref: n, class: r.value }, [e, !1], 2);
            };
        },
    });
const $p = w(wc, {
        publishHandler(e, t, n) {
            qp.subscribeHandler(e, t, n);
        },
    }),
    qp = w(Ml, {
        publishHandler(e, t, n) {
            $p.subscribeHandler(e, t, n);
        },
    }),
    Vp = Bl({
        name: "PageHead",
        setup() {
            const e = Qt(null),
                t = th(),
                n = (function (e, t) {
                    const n = Gt(e),
                        s = n ? Ut(Ip(e)) : Ip(e);
                    return (
                        __uniConfig.darkmode &&
                            n &&
                            Vn(e, (e) => {
                                const t = Ip(e);
                                for (const n in t) s[n] = t[n];
                            }),
                        t && Tp(t),
                        s
                    );
                })(t.navigationBar, () => {
                    const e = Ip(t.navigationBar);
                    (n.backgroundColor = e.backgroundColor),
                        (n.titleColor = e.titleColor);
                }),
                { clazz: s, style: o } = (function (e) {
                    const t = hi(() => {
                            const {
                                    type: t,
                                    titlePenetrate: n,
                                    shadowColorType: s,
                                } = e,
                                o = {
                                    "uni-page-head": !0,
                                    "uni-page-head-transparent":
                                        "transparent" === t,
                                    "uni-page-head-titlePenetrate": "YES" === n,
                                    "uni-page-head-shadow": !!s,
                                };
                            return (
                                s && (o[`uni-page-head-shadow-${s}`] = !0), o
                            );
                        }),
                        n = hi(() => ({
                            backgroundColor: e.backgroundColor,
                            color: e.titleColor,
                            transitionDuration: e.duration,
                            transitionTimingFunction: e.timingFunc,
                        }));
                    return { clazz: t, style: n };
                })(n);
            return () => {
                const i = (function (e, t) {
                        if (!t)
                            return Ho(
                                "div",
                                { class: "uni-page-head-btn", onClick: Wp },
                                [
                                    Qc(
                                        Yc,
                                        "transparent" === e.type
                                            ? "#fff"
                                            : e.titleColor,
                                        27
                                    ),
                                ],
                                8,
                                ["onClick"]
                            );
                    })(n, t.isQuit),
                    r = n.type || "default",
                    a =
                        "transparent" !== r &&
                        "float" !== r &&
                        Ho(
                            "div",
                            {
                                class: {
                                    "uni-placeholder": !0,
                                    "uni-placeholder-titlePenetrate":
                                        n.titlePenetrate,
                                },
                            },
                            null,
                            2
                        );
                return Ho(
                    "uni-page-head",
                    { "uni-page-head-type": r },
                    [
                        Ho(
                            "div",
                            { ref: e, class: s.value, style: o.value },
                            [
                                Ho("div", { class: "uni-page-head-hd" }, [i]),
                                Hp(n),
                                Ho("div", { class: "uni-page-head-ft" }, []),
                            ],
                            6
                        ),
                        a,
                    ],
                    8,
                    ["uni-page-head-type"]
                );
            };
        },
    });
function Hp(e, t) {
    return (function ({
        type: e,
        loading: t,
        titleSize: n,
        titleText: s,
        titleImage: o,
    }) {
        return Ho("div", { class: "uni-page-head-bd" }, [
            Ho(
                "div",
                {
                    style: {
                        fontSize: n,
                        opacity: "transparent" === e ? 0 : 1,
                    },
                    class: "uni-page-head__title",
                },
                [
                    t
                        ? Ho("i", { class: "uni-loading" }, null)
                        : o
                        ? Ho(
                              "img",
                              { src: o, class: "uni-page-head__title_image" },
                              null,
                              8,
                              ["src"]
                          )
                        : s,
                ],
                4
            ),
        ]);
    })(e);
}
function Wp() {
    1 === ph().length
        ? Mp({ url: "/" })
        : wp({ from: "backbutton", success() {} });
}
const zp = Bl({
        name: "PageBody",
        setup: (e, t) => () =>
            Ho(Io, null, [
                !1,
                Ho(
                    "uni-page-wrapper",
                    null,
                    [Ho("uni-page-body", null, [$s(t.slots, "default")])],
                    16
                ),
            ]),
    }),
    Xp = Bl({
        name: "Page",
        setup(e, t) {
            const n = nh(oh()),
                s = n.navigationBar;
            return (
                Bp(n),
                () =>
                    Ho(
                        "uni-page",
                        { "data-page": n.route },
                        "custom" !== s.style ? [Ho(Vp), Jp(t)] : [Jp(t)]
                    )
            );
        },
    });
function Jp(e) {
    return (
        Ro(),
        Uo(zp, { key: 0 }, { default: Pn(() => [$s(e.slots, "page")]), _: 3 })
    );
}
const Kp = {
    loading: "AsyncLoading",
    error: "AsyncError",
    delay: 200,
    timeout: 6e4,
    suspensible: !0,
};
(window.uni = {}), (window.wx = {}), (window.rpx2px = Bu);
const Yp = Object.assign({}),
    Qp = Object.assign;
(window.__uniConfig = Qp(
    {
        globalStyle: {
            backgroundColor: "#FFFFFF",
            navigationBar: {
                backgroundColor: "#FFFFFF",
                titleText: "uni-app",
                type: "default",
                titleColor: "#000000",
            },
            isNVue: !1,
        },
        compilerVersion: "3.99",
    },
    {
        appId: "__UNI__F508721",
        appName: "GoEasyDemo-Uniapp-LiveChatRoom",
        appVersion: "1.0.0-0",
        appVersionCode: "100",
        async: Kp,
        debug: !1,
        networkTimeout: {
            request: 6e4,
            connectSocket: 6e4,
            uploadFile: 6e4,
            downloadFile: 6e4,
        },
        sdkConfigs: {},
        qqMapKey: void 0,
        bMapKey: void 0,
        googleMapKey: void 0,
        aMapKey: void 0,
        aMapSecurityJsCode: void 0,
        aMapServiceHost: void 0,
        nvue: { "flex-direction": "column" },
        locale: "",
        fallbackLocale: "",
        locales: Object.keys(Yp).reduce((e, t) => {
            const n = t.replace(/\.\/locale\/(uni-app.)?(.*).json/, "$2");
            return Qp(e[n] || (e[n] = {}), Yp[t].default), e;
        }, {}),
        router: { mode: "hash", base: "./", assets: "assets", routerBase: "/" },
        darkmode: !1,
        themeConfig: {},
    }
)),
    (window.__uniLayout = window.__uniLayout || {});
const Zp = {
    delay: Kp.delay,
    timeout: Kp.timeout,
    suspensible: Kp.suspensible,
};
Kp.loading &&
    (Zp.loadingComponent = {
        name: "SystemAsyncLoading",
        render: () => Ho(Ls(Kp.loading)),
    }),
    Kp.error &&
        (Zp.errorComponent = {
            name: "SystemAsyncError",
            render: () => Ho(Ls(Kp.error)),
        });
const ef = () =>
        t(
            () => import("./pages-index-index.74717d5a.js"),
            [
                "./pages-index-index.74717d5a.js",
                "./_plugin-vue_export-helper.1b428a4d.js",
                "./index-ca4bc7ec.css",
            ],
            import.meta.url
        ).then((e) => Gh(e.default || e)),
    tf = rs(Qp({ loader: ef }, Zp)),
    nf = () =>
        t(
            () => import("./pages-chatroom-chatroom.726b5546.js"),
            [
                "./pages-chatroom-chatroom.726b5546.js",
                "./_plugin-vue_export-helper.1b428a4d.js",
                "./chatroom-78026120.css",
            ],
            import.meta.url
        ).then((e) => Gh(e.default || e)),
    sf = rs(Qp({ loader: nf }, Zp));
function of(e, t) {
    return (
        Ro(),
        Uo(Xp, null, {
            page: Pn(() => [Ho(e, Qp({}, t, { ref: "page" }), null, 512)]),
            _: 1,
        })
    );
}
window.__uniRoutes = [
    {
        path: "/",
        alias: "/pages/index/index",
        component: {
            setup() {
                const e = Fh(),
                    t = (e && e.$route && e.$route.query) || {};
                return () => of(tf, t);
            },
        },
        loader: ef,
        meta: {
            isQuit: !0,
            isEntry: !0,
            navigationBar: { titleText: "", type: "default" },
            isNVue: !1,
        },
    },
    {
        path: "/pages/chatroom/chatroom",
        component: {
            setup() {
                const e = Fh(),
                    t = (e && e.$route && e.$route.query) || {};
                return () => of(sf, t);
            },
        },
        loader: nf,
        meta: {
            navigationBar: {
                titleText: "首页",
                style: "custom",
                type: "default",
            },
            isNVue: !1,
        },
    },
].map((e) => ((e.meta.route = (e.alias || e.path).slice(1)), e));
const rf = {
    onLaunch: function () {
        console.log("App Launch");
    },
    onShow: function () {
        console.log("App Show");
    },
    onHide: function () {
        console.log("App Hide");
    },
};
var af, cf, lf;
jh(rf, {
    init: Uh,
    setup(e) {
        const t = sh(),
            n = () => {
                var n;
                (n = e),
                    Object.keys(qu).forEach((e) => {
                        qu[e].forEach((t) => {
                            ws(e, t, n);
                        });
                    });
                const {
                        onLaunch: s,
                        onShow: o,
                        onPageNotFound: i,
                        onError: r,
                    } = e,
                    a = (function ({ path: e, query: t }) {
                        return (
                            w(ud, { path: e, query: t }), w(dd, ud), w({}, ud)
                        );
                    })({
                        path: t.path.slice(1) || __uniRoutes[0].meta.route,
                        query: me(t.query),
                    });
                if ((s && X(s, a), o && X(o, a), !t.matched.length)) {
                    const e = {
                        notFound: !0,
                        openType: "appLaunch",
                        path: t.path,
                        query: {},
                        scene: 1001,
                    };
                    i && X(i, e);
                }
                r &&
                    (e.appContext.config.errorHandler = (e) => {
                        X(r, e);
                    });
            };
        return (
            ac().isReady().then(n),
            Ms(() => {
                window.addEventListener(
                    "resize",
                    ve($h, 50, {
                        setTimeout: setTimeout,
                        clearTimeout: clearTimeout,
                    })
                ),
                    window.addEventListener("message", qh),
                    document.addEventListener("visibilitychange", Vh),
                    (function () {
                        let e = null;
                        try {
                            e = window.matchMedia(
                                "(prefers-color-scheme: dark)"
                            );
                        } catch (t) {}
                        if (e) {
                            let t = (e) => {
                                qp.emit("onThemeChange", {
                                    theme: e.matches ? "dark" : "light",
                                });
                            };
                            e.addEventListener
                                ? e.addEventListener("change", t)
                                : e.addListener(t);
                        }
                    })();
            }),
            t.query
        );
    },
    before(e) {
        e.mpType = "app";
        const { setup: t } = e,
            n = () => (Ro(), Uo(Gp));
        (e.setup = (e, s) => {
            const o = t && t(e, s);
            return N(o) ? n : o;
        }),
            (e.render = n);
    },
}),
    ((lf = af || (af = {})).UNIAPP = "uniapp"),
    (lf.REACT_NATIVE = "rn"),
    (lf.COCOS = "cocos"),
    (lf.TARO = "taro"),
    (lf.UNKNOWN = "unknown");
class uf {
    constructor() {
        (this.framework = null),
            (this.methods = {
                [af.UNIAPP]: this.isUniApp,
                [af.REACT_NATIVE]: this.isReactNative,
                [af.TARO]: this.isTaro,
                [af.COCOS]: this.isCocos,
            });
        const e = this.methods,
            t = Object.keys(e);
        for (const n of t)
            if ((0, e[n])()) {
                this.framework = n;
                break;
            }
        (this.framework = this.framework || af.UNKNOWN), this.framework;
    }
    static currentFramework() {
        return (
            this.instance || (this.instance = new uf()), this.instance.framework
        );
    }
    isUniApp() {
        try {
            return "function" == typeof rp;
        } catch (lf) {
            return !1;
        }
    }
    isReactNative() {
        try {
            return void 0 !== global.__fbGenNativeModule;
        } catch (lf) {
            return !1;
        }
    }
    isTaro() {
        try {
            return void 0 !== {}.TARO_ENV;
        } catch (lf) {
            return !1;
        }
    }
    isCocos() {
        try {
            return void 0 !== cc.sys.localStorage;
        } catch (lf) {
            return !1;
        }
    }
}
class df {
    static init(e) {
        uf.currentFramework() === af.REACT_NATIVE &&
            (this.validate(e),
            (this.platform = e.platform),
            (this.asyncStorage = e.asyncStorage));
    }
    static validate(e) {
        if (!e)
            throw new Error(
                "'reactNativeOptions' is missing when calling GoEasy.getInstance()"
            );
        if (!e.platform)
            throw new Error(
                "'platform' is missing in GoEasy 'reactNativeOptions'"
            );
        if (!e.asyncStorage)
            throw new Error(
                "'asyncStorage' is missing in GoEasy 'reactNativeOptions'"
            );
    }
}
!(function (e) {
    (e.DISCONNECTED = "disconnected"),
        (e.DISCONNECTING = "disconnecting"),
        (e.CONNECTING = "connecting"),
        (e.CONNECTED = "connected"),
        (e.RECONNECTING = "reconnecting"),
        (e.RECONNECTED = "reconnected"),
        (e.EXPIRED_RECONNECTED = "reconnected"),
        (e.CONNECT_FAILED = "connect_failed");
})(cf || (cf = {}));
const hf = "2.10.14";
var pf, ff;
!(function (e) {
    (e.PRIVATE = "private"),
        (e.GROUP = "group"),
        (e.SYSTEM = "system"),
        (e.CS = "cs");
})(pf || (pf = {})),
    (function (e) {
        (e.NEW = "new"),
            (e.SENDING = "sending"),
            (e.SUCCESS = "success"),
            (e.FAIL = "fail");
    })(ff || (ff = {}));
class mf {}
class gf {
    constructor(e, t) {
        (this.id = e), (this.data = t);
    }
}
let yf = new (class {
    isDef(e) {
        return !this.isUndef(e);
    }
    isUndef(e) {
        return null == e;
    }
    isPrimitive(e) {
        return (
            "string" == typeof e ||
            "number" == typeof e ||
            "symbol" == typeof e ||
            "boolean" == typeof e
        );
    }
    isObject(e) {
        return null !== e && "object" == typeof e;
    }
    isPlainObject(e) {
        return "[object Object]" === Object.prototype.toString.call(e);
    }
    isRegExp(e) {
        return "[object RegExp]" === Object.prototype.toString.call(e);
    }
    isValidArrayIndex(e) {
        let t = parseFloat(String(e));
        return t >= 0 && Math.floor(t) === t && isFinite(e);
    }
    isString(e) {
        return "string" == typeof e;
    }
    isNumber(e) {
        return "number" == typeof e;
    }
    isStringOrNumber(e) {
        return this.isString(e) || this.isNumber(e);
    }
    isArray(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }
    isEmpty(e) {
        return this.isArray(e)
            ? 0 === e.length
            : this.isObject(e)
            ? !this.isDef(e)
            : !this.isNumber(e) &&
              (this.isString(e) ? "" === e.trim() : !this.isDef(e));
    }
    isNative(e) {
        return "function" == typeof e && /native code/.test(e.toString());
    }
    isFunction(e) {
        return "function" == typeof e;
    }
    isBoolean(e) {
        return "boolean" == typeof e;
    }
    isTrue(e) {
        return !0 === e;
    }
    isFalse(e) {
        return !1 === e;
    }
    isNull(e) {
        return null === e;
    }
})();
var vf;
!(function (e) {
    (e.MP_WX = "mp-wx"),
        (e.MP_WGAME = "mp-wgame"),
        (e.MP_BYTE = "mp-byte"),
        (e.MP_BAIDU = "mp-baidu"),
        (e.MP_ALI = "mp-ali"),
        (e.BROWSER = "browser"),
        (e.NODE = "node"),
        (e.UNI_IOS = "uni-ios"),
        (e.UNI_ANDROID = "uni-android"),
        (e.COCOS_IOS = "cocos-ios"),
        (e.COCOS_ANDROID = "cocos-android"),
        (e.RN_IOS = "rn-ios"),
        (e.RN_ANDROID = "rn-android"),
        (e.UNKNOWN = "unknown");
})(vf || (vf = {}));
class bf {
    constructor() {
        (this.platform = null),
            (this.methods = {
                [vf.BROWSER]: this.isBrowser,
                [vf.MP_WX]: this.isMPWX,
                [vf.MP_WGAME]: this.isMPWeGame,
                [vf.MP_BYTE]: this.isMPByte,
                [vf.MP_BAIDU]: this.isMPBaidu,
                [vf.MP_ALI]: this.isMPAli,
                [vf.NODE]: this.isNode,
                [vf.UNI_IOS]: this.isUniAppIOS,
                [vf.UNI_ANDROID]: this.isUniAppAndroid,
                [vf.COCOS_IOS]: this.isCocosIOS,
                [vf.COCOS_ANDROID]: this.isCocosAndroid,
                [vf.RN_IOS]: this.isRNiOS,
                [vf.RN_ANDROID]: this.isRNAndroid,
            });
        const e = this.methods,
            t = Object.keys(e);
        for (const n of t)
            if ((0, e[n])()) {
                this.platform = n;
                break;
            }
        (this.platform = this.platform || vf.UNKNOWN), this.platform;
    }
    static currentPlatform() {
        return (
            this.instance || (this.instance = new bf()), bf.instance.platform
        );
    }
    isBrowser() {
        return (
            "undefined" != typeof navigator &&
            "Taro" !== navigator.product &&
            "ReactNative" !== navigator.product &&
            "undefined" == typeof GameGlobal &&
            ("undefined" == typeof cc || null !== cc.sys.browserType) &&
            "undefined" == typeof my &&
            "undefined" == typeof tt
        );
    }
    isMPWX() {
        return (
            "object" == typeof wx &&
            "function" == typeof rp &&
            "undefined" == typeof WebSocket &&
            "undefined" == typeof XMLHttpRequest &&
            "undefined" == typeof plus &&
            "undefined" == typeof tt
        );
    }
    isMPWeGame() {
        return "object" == typeof GameGlobal;
    }
    isMPByte() {
        return (
            "object" == typeof tt && "function" == typeof tt.getSystemInfoSync
        );
    }
    isMPBaidu() {
        return (
            "object" == typeof swan &&
            "function" == typeof swan.getSystemInfoSync
        );
    }
    isMPAli() {
        return (
            "object" == typeof my && "function" == typeof my.getSystemInfoSync
        );
    }
    isNode() {
        try {
            return "node" === process.release.name;
        } catch (lf) {
            return !1;
        }
    }
    isUniAppIOS() {
        try {
            return "ios" === rp().platform && "app" === rp().uniPlatform;
        } catch (lf) {
            return !1;
        }
    }
    isUniAppAndroid() {
        try {
            return "android" === rp().platform && "app" === rp().uniPlatform;
        } catch (lf) {
            return !1;
        }
    }
    isCocosIOS() {
        try {
            return "iOS" === cc.sys.os;
        } catch (lf) {
            return !1;
        }
    }
    isCocosAndroid() {
        try {
            return "Android" === cc.sys.os;
        } catch (lf) {
            return !1;
        }
    }
    isRNiOS() {
        try {
            return "ios" === df.platform.OS;
        } catch (lf) {
            return !1;
        }
    }
    isRNAndroid() {
        try {
            return "android" === df.platform.OS;
        } catch (lf) {
            return !1;
        }
    }
}
class Sf {}
(Sf.type = vf), (Sf.current = bf.currentPlatform());
class Ef {}
class wf extends Ef {
    constructor() {
        super(...arguments), (this.runningBackend = !1);
    }
    startCheck() {
        "object" == typeof plus &&
            (plus.globalEvent.addEventListener(
                "resume",
                () => {
                    (this.runningBackend = !1), this.runningBackend;
                },
                !1
            ),
            plus.globalEvent.addEventListener(
                "pause",
                () => {
                    (this.runningBackend = !0), this.runningBackend;
                },
                !1
            ));
    }
    isBackend() {
        return this.runningBackend;
    }
    support() {
        const e = bf.currentPlatform();
        return [vf.UNI_IOS, vf.UNI_ANDROID].includes(e);
    }
}
class Cf extends Ef {
    constructor() {
        super(...arguments), (this.runningBackend = !1);
    }
    startCheck() {
        Vu("onShow", () => {
            this.runningBackend = !1;
        }),
            (function (e) {
                Vu("onHide", e);
            })(() => {
                this.runningBackend = !0;
            });
    }
    isBackend() {
        return this.runningBackend;
    }
    support() {
        return bf.currentPlatform() === vf.MP_WX;
    }
}
const _f = new (class {
    constructor() {
        [new wf(), new Cf()].forEach((e) => {
            if (e.support())
                return (this.checker = e), void this.checker.startCheck();
        });
    }
    isBackend() {
        return this.checker && this.checker.isBackend();
    }
})();
var Mf,
    Tf,
    If = Object.freeze({ __proto__: null, runStatus: _f });
!(function (e) {
    (e.authorize = "authorize"),
        (e.manualDisconnect = "manualDisconnect"),
        (e.subscribe = "subscribe"),
        (e.unsubscribe = "unsubscribe"),
        (e.publish = "publish"),
        (e.ack = "ack"),
        (e.historyMessages = "historyMessages"),
        (e.hereNow = "hereNow"),
        (e.hereNowByUserIds = "hereNowByUserIds"),
        (e.PUBSUB_PRESENCE_SUBSCRIBE = "PUBSUB_PRESENCE_SUBSCRIBE"),
        (e.PUBSUB_PRESENCE_UNSUBSCRIBE = "PUBSUB_PRESENCE_UNSUBSCRIBE"),
        (e.PUBSUB_PRESENCE_HERENOW = "PUBSUB_PRESENCE_HERENOW"),
        (e.imLastConversations = "imLastConversations"),
        (e.markPrivateMessageAsRead = "markPrivateMessageAsRead"),
        (e.markGroupMessageAsRead = "markGroupMessageAsRead"),
        (e.imGroupOnlineCount = "imGroupOnlineCount"),
        (e.imHereNow = "imHereNow"),
        (e.imGroupHereNow = "imGroupHereNow"),
        (e.publishIM = "publishIM"),
        (e.subscribeUserPresence = "subscribeUserPresence"),
        (e.unsubscribeUserPresence = "unsubscribeUserPresence"),
        (e.subscribeGroupPresence = "subscribeGroupPresence"),
        (e.unsubscribeGroupPresence = "unsubscribeGroupPresence"),
        (e.removeConversation = "removeConversation"),
        (e.topConversation = "topConversation"),
        (e.imData = "imData"),
        (e.subscribeGroups = "subscribeGroups"),
        (e.unsubscribeGroup = "unsubscribeGroup"),
        (e.IM_DELETE_MESSAGE = "IM_DELETE_MESSAGE"),
        (e.IM_HISTORY = "IM_HISTORY"),
        (e.IM_HISTORY_CHANGE = "IM_HISTORY_CHANGE"),
        (e.IM_RECALL_MESSAGE = "IM_RECALL_MESSAGE"),
        (e.IM_MARK_AS_READ = "IM_MARK_AS_READ"),
        (e.CS_PENDING_CONVERSATION = "CS_PENDING_CONVERSATION"),
        (e.CS_ACCEPT = "CS_ACCEPT"),
        (e.CS_END = "CS_END"),
        (e.CS_TRANSFER = "CS_TRANSFER"),
        (e.CS_AGENTS = "CS_AGENTS"),
        (e.CS_CUSTOMER_STATUS = "CS_CUSTOMER_STATUS"),
        (e.CS_MY_TEAMS = "CS_MY_TEAMS"),
        (e.CS_ONLINE = "CS_ONLINE"),
        (e.CS_OFFLINE = "CS_OFFLINE"),
        (e.CS_LIVE_SESSION = "CS_LIVE_SESSION"),
        (e.CS_QUIT_LIVE = "CS_QUIT_LIVE"),
        (e.SET_IOS_BADGE = "SET_IOS_BADGE"),
        (e.MD_CMD = "MD_CMD");
})(Mf || (Mf = {})),
    (function (e) {
        (e[(e.connect = 3e3)] = "connect"),
            (e[(e.reconnectionDelayMax = 3e3)] = "reconnectionDelayMax"),
            (e[(e.commonQuerySingle = 2500)] = "commonQuerySingle"),
            (e[(e.commonQueryTotal = 12e3)] = "commonQueryTotal"),
            (e[(e.commonRequestSingle = 1700)] = "commonRequestSingle"),
            (e[(e.commonRequestTotal = 12e3)] = "commonRequestTotal"),
            (e[(e.commonInfiniteSingle = 1700)] = "commonInfiniteSingle"),
            (e[(e.commonInfiniteTotal = 864e5)] = "commonInfiniteTotal");
    })(Tf || (Tf = {}));
class kf {
    static onSuccess(e, t) {
        yf.isFunction(e.onSuccess) && e.onSuccess(t);
    }
    static onFailed(e, t) {
        if (!yf.isObject(e) || !yf.isFunction(e.onFailed)) throw t;
        e.onFailed(t);
    }
}
function Of(e, t, n, s) {
    return new (n || (n = Promise))(function (o, i) {
        function r(e) {
            try {
                c(s.next(e));
            } catch (t) {
                i(t);
            }
        }
        function a(e) {
            try {
                c(s.throw(e));
            } catch (t) {
                i(t);
            }
        }
        function c(e) {
            var t;
            e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof n
                      ? t
                      : new n(function (e) {
                            e(t);
                        })).then(r, a);
        }
        c((s = s.apply(e, t || [])).next());
    });
}
"function" == typeof SuppressedError && SuppressedError;
var Nf =
    "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
function xf(e) {
    if (e.__esModule) return e;
    var t = Object.defineProperty({}, "__esModule", { value: !0 });
    return (
        Object.keys(e).forEach(function (n) {
            var s = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(
                t,
                n,
                s.get
                    ? s
                    : {
                          enumerable: !0,
                          get: function () {
                              return e[n];
                          },
                      }
            );
        }),
        t
    );
}
var Af = { exports: {} };
!(function (e) {
    function t(e) {
        if (e)
            return (function (e) {
                for (var n in t.prototype) e[n] = t.prototype[n];
                return e;
            })(e);
    }
    (Af.exports = t),
        (t.prototype.on = t.prototype.addEventListener =
            function (e, t) {
                return (
                    (this._callbacks = this._callbacks || {}),
                    (this._callbacks["$" + e] =
                        this._callbacks["$" + e] || []).push(t),
                    this
                );
            }),
        (t.prototype.once = function (e, t) {
            function n() {
                this.off(e, n), t.apply(this, arguments);
            }
            return (n.fn = t), this.on(e, n), this;
        }),
        (t.prototype.off =
            t.prototype.removeListener =
            t.prototype.removeAllListeners =
            t.prototype.removeEventListener =
                function (e, t) {
                    if (
                        ((this._callbacks = this._callbacks || {}),
                        0 == arguments.length)
                    )
                        return (this._callbacks = {}), this;
                    var n,
                        s = this._callbacks["$" + e];
                    if (!s) return this;
                    if (1 == arguments.length)
                        return delete this._callbacks["$" + e], this;
                    for (var o = 0; o < s.length; o++)
                        if ((n = s[o]) === t || n.fn === t) {
                            s.splice(o, 1);
                            break;
                        }
                    return this;
                }),
        (t.prototype.emit = function (e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1),
                n = this._callbacks["$" + e];
            if (n)
                for (var s = 0, o = (n = n.slice(0)).length; s < o; ++s)
                    n[s].apply(this, t);
            return this;
        }),
        (t.prototype.listeners = function (e) {
            return (
                (this._callbacks = this._callbacks || {}),
                this._callbacks["$" + e] || []
            );
        }),
        (t.prototype.hasListeners = function (e) {
            return !!this.listeners(e).length;
        });
})();
var Rf = Af.exports,
    Pf = { exports: {} },
    Df =
        ("undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)) ||
        ("undefined" != typeof msCrypto &&
            "function" == typeof window.msCrypto.getRandomValues &&
            msCrypto.getRandomValues.bind(msCrypto));
if (Df) {
    var Lf = new Uint8Array(16);
    Pf.exports = function () {
        return Df(Lf), Lf;
    };
} else {
    var Ff = new Array(16);
    Pf.exports = function () {
        for (var e, t = 0; t < 16; t++)
            0 == (3 & t) && (e = 4294967296 * Math.random()),
                (Ff[t] = (e >>> ((3 & t) << 3)) & 255);
        return Ff;
    };
}
for (var Uf = [], Bf = 0; Bf < 256; ++Bf)
    Uf[Bf] = (Bf + 256).toString(16).substr(1);
var jf,
    Gf,
    $f = function (e, t) {
        var n = t || 0,
            s = Uf;
        return [
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
            "-",
            s[e[n++]],
            s[e[n++]],
            "-",
            s[e[n++]],
            s[e[n++]],
            "-",
            s[e[n++]],
            s[e[n++]],
            "-",
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
            s[e[n++]],
        ].join("");
    },
    qf = Pf.exports,
    Vf = $f,
    Hf = 0,
    Wf = 0,
    zf = Pf.exports,
    Xf = $f,
    Jf = function (e, t, n) {
        var s = (t && n) || 0,
            o = t || [],
            i = (e = e || {}).node || jf,
            r = void 0 !== e.clockseq ? e.clockseq : Gf;
        if (null == i || null == r) {
            var a = qf();
            null == i && (i = jf = [1 | a[0], a[1], a[2], a[3], a[4], a[5]]),
                null == r && (r = Gf = 16383 & ((a[6] << 8) | a[7]));
        }
        var c = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
            l = void 0 !== e.nsecs ? e.nsecs : Wf + 1,
            u = c - Hf + (l - Wf) / 1e4;
        if (
            (u < 0 && void 0 === e.clockseq && (r = (r + 1) & 16383),
            (u < 0 || c > Hf) && void 0 === e.nsecs && (l = 0),
            l >= 1e4)
        )
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        (Hf = c), (Wf = l), (Gf = r);
        var d = (1e4 * (268435455 & (c += 122192928e5)) + l) % 4294967296;
        (o[s++] = (d >>> 24) & 255),
            (o[s++] = (d >>> 16) & 255),
            (o[s++] = (d >>> 8) & 255),
            (o[s++] = 255 & d);
        var h = ((c / 4294967296) * 1e4) & 268435455;
        (o[s++] = (h >>> 8) & 255),
            (o[s++] = 255 & h),
            (o[s++] = ((h >>> 24) & 15) | 16),
            (o[s++] = (h >>> 16) & 255),
            (o[s++] = (r >>> 8) | 128),
            (o[s++] = 255 & r);
        for (var p = 0; p < 6; ++p) o[s + p] = i[p];
        return t || Vf(o);
    },
    Kf = function (e, t, n) {
        var s = (t && n) || 0;
        "string" == typeof e &&
            ((t = "binary" === e ? new Array(16) : null), (e = null));
        var o = (e = e || {}).random || (e.rng || zf)();
        if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t))
            for (var i = 0; i < 16; ++i) t[s + i] = o[i];
        return t || Xf(o);
    },
    Yf = Kf;
(Yf.v1 = Jf), (Yf.v4 = Kf);
var Qf = Yf;
class Zf {
    support() {
        return !0;
    }
    getParams() {
        return this.params;
    }
    setData(e) {
        (this.active = e.a), (this.data = e.d);
    }
    postConnect() {}
}
class em {
    static initModule(e) {
        e.support() && this.modules.set(e.name, e);
    }
    static getParams() {
        return Of(this, void 0, void 0, function* () {
            let e = {};
            for (const [t, n] of this.modules)
                e[t] = (yield n.getParams()) || null;
            return e;
        });
    }
    static setDatas(e) {
        Object.keys(e).forEach((t) => {
            this.modules.get(t).setData(e[t]);
        });
    }
    static postConnect() {
        this.modules.forEach((e, t) => {
            e.postConnect();
        });
    }
}
(em.Module = Zf), (em.modules = new Map());
const tm = Rf;
class nm {
    constructor() {
        this.emitter = new tm();
    }
    on(e, t) {
        return this.emitter.on(e, t), this;
    }
    once(e, t) {
        return this.emitter.once(e, t), this;
    }
    off(e, t) {
        return this.emitter.off(e, t), this;
    }
    fire(e, t) {
        return this.emitter.emit(e, t), this;
    }
}
class sm {
    constructor() {
        this.eventDriver = new nm();
    }
    on(e, t) {
        this.eventDriver.on(e, t);
    }
    off(e, t) {
        this.eventDriver.off(e, t);
    }
    fire(e, t) {
        this.eventDriver.fire(e, t);
    }
}
let om = new (class {
    isDef(e) {
        return !this.isUndef(e);
    }
    isUndef(e) {
        return null == e;
    }
    isPrimitive(e) {
        return (
            "string" == typeof e ||
            "number" == typeof e ||
            "symbol" == typeof e ||
            "boolean" == typeof e
        );
    }
    isObject(e) {
        return null !== e && "object" == typeof e;
    }
    isPlainObject(e) {
        return "[object Object]" === Object.prototype.toString.call(e);
    }
    isRegExp(e) {
        return "[object RegExp]" === Object.prototype.toString.call(e);
    }
    isValidArrayIndex(e) {
        let t = parseFloat(String(e));
        return t >= 0 && Math.floor(t) === t && isFinite(e);
    }
    isString(e) {
        return "string" == typeof e;
    }
    isNumber(e) {
        return "number" == typeof e;
    }
    isStringOrNumber(e) {
        return this.isString(e) || this.isNumber(e);
    }
    isArray(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }
    isEmpty(e) {
        return this.isArray(e)
            ? 0 === e.length
            : this.isObject(e)
            ? !this.isDef(e)
            : !this.isNumber(e) &&
              (this.isString(e) ? "" === e.trim() : !this.isDef(e));
    }
    isNative(e) {
        return "function" == typeof e && /native code/.test(e.toString());
    }
    isFunction(e) {
        return "function" == typeof e;
    }
    isBoolean(e) {
        return "boolean" == typeof e;
    }
    isTrue(e) {
        return !0 === e;
    }
    isFalse(e) {
        return !1 === e;
    }
    isNull(e) {
        return null === e;
    }
})();
const im = Rf;
class rm {
    constructor() {
        this.emitter = new im();
    }
    on(e, t) {
        if (!om.isString(e)) throw Error("event require a string.");
        if (!om.isFunction(t)) throw Error("callback must be a function");
        this.emitter.on(e, t);
    }
    fire(e, t) {
        this.emitter.emit(e, t);
    }
    off(e, t) {
        this.emitter.off(e, t);
    }
}
class am {
    static init(e, t, n, s, o, i) {
        (this.Socket = e),
            (this.N = t),
            (this.Member = n),
            (this.v = s),
            (this.Platform = o),
            (this.GModules = i);
    }
}
const cm = Qf;
class lm {
    static get() {
        return cm.v1().replace(/-/g, "");
    }
}
var um, dm, hm;
((dm = um || (um = {})).WRITE = "WRITE"),
    (dm.READ = "READ"),
    (dm.NONE = "NONE");
class pm {
    constructor(e) {
        (this.permission = um.NONE),
            (this.singleTimeout = 0),
            (this.totalTimeout = 0),
            (this.startTime = 0),
            (this.complete = !1),
            (this.retried = 0),
            (this.unique = !1),
            (this.uuid = lm.get()),
            (this.name = e.name),
            (this.params = e.params),
            (this.permission = e.permission),
            (this.totalTimeout = e.totalTimeout),
            (this.singleTimeout = e.singleTimeout),
            e.unique && (this.unique = e.unique),
            (this.success = (t) => {
                this.complete || (this.end(), e.success(t));
            }),
            (this.fail = (t) => {
                this.complete || (this.end(), e.fail(t));
            });
    }
    start() {
        (this.startTime = Date.now()), this.initAutoTimeout();
    }
    end() {
        (this.complete = !0), clearTimeout(this.timeoutHandler);
    }
    initAutoTimeout() {
        this.timeoutHandler = setTimeout(() => {
            this.complete ||
                this.fail({
                    resultCode: 408,
                    content: "Host unreachable or timeout",
                });
        }, this.totalTimeout);
    }
}
class fm extends Zf {
    static init(e) {
        (this.module = new fm()),
            (this.module.name = this.GN_MODULE_NAME),
            (this.module.regIdPromise = e);
        let t = null;
        if (this.module.support()) {
            let e = uni.requireNativePlugin("GoEasy-Uniapp");
            e && (t = e.v());
        }
        return (this.module.params = { v: { npv: t } }), this.module;
    }
    getParams() {
        return Of(this, void 0, void 0, function* () {
            try {
                return (
                    (this.params.regId = yield this.regIdPromise), this.params
                );
            } catch (lf) {
                return (
                    console.warn(
                        "Failed to register the Manufacturers Push service:" +
                            JSON.stringify(lf)
                    ),
                    this.params
                );
            }
        });
    }
    support() {
        return [vf.UNI_ANDROID, vf.UNI_IOS].includes(bf.currentPlatform());
    }
}
fm.GN_MODULE_NAME = "GN";
class mm {
    static init(e) {
        if (e && this.supportNotification()) {
            let e = fm.init(this.regIdPromise);
            em.initModule(e), this.setClientBadge(0);
        }
    }
    static addAssembler(e) {
        this.payloadAssemblers.push(e);
    }
    static assemblePayload(e) {
        let t = this.payloadAssemblers.find((t) => t.support(e));
        return t ? t.assemble(e) : e;
    }
    static createLocalNotification(e, t, n, s, o) {
        _f.isBackend() &&
            ((n.g = 1),
            "undefined" != typeof plus &&
                (s
                    ? (this.uniappPlugin && this.uniappPlugin.playSound(s),
                      plus.push.createMessage(t, JSON.stringify(n), {
                          title: e,
                          sound: "none",
                      }))
                    : plus.push.createMessage(t, JSON.stringify(n), {
                          title: e,
                      }),
                "+1" === o && this.setClientBadge(mm.badge + 1)));
    }
    static setBadge(e) {
        if (!Number.isInteger(e.badge) || e.badge < 0)
            kf.onFailed(
                e,
                "badge must be an integer greater than or equal to 0."
            );
        else if (mm.supportNotification())
            if (bf.currentPlatform() === vf.UNI_IOS) {
                let t = new pm({
                    name: Mf.SET_IOS_BADGE,
                    params: { badge: e.badge },
                    unique: !0,
                    singleTimeout: Tf.commonRequestSingle,
                    totalTimeout: Tf.commonRequestTotal,
                    permission: um.WRITE,
                    success: () => {
                        kf.onSuccess(e), this.setClientBadge(e.badge);
                    },
                    fail: (t) => {
                        kf.onFailed(e, t.content);
                    },
                });
                am.Socket.e(t);
            } else kf.onSuccess(e), this.setClientBadge(e.badge);
    }
    static setClientBadge(e) {
        "vivo" !== plus.device.vendor &&
            ((mm.badge = e), plus.runtime.setBadgeNumber(e));
    }
    static askRegId() {
        let e = null,
            t = 0;
        const n = () =>
            new Promise((s, o) => {
                this.uniappPlugin.regId(
                    (e) => {
                        s(e);
                    },
                    (s) => {
                        if (!(1e6 === s.data.code && t <= 10))
                            return clearTimeout(e), o(s);
                        e = setTimeout(() => {
                            t++, (this.regIdPromise = n());
                        }, 3500);
                    }
                );
            });
        return n();
    }
    static getRegIdPromise() {
        return this.regIdPromise;
    }
    static supportNotification() {
        const e = bf.currentPlatform();
        return e === vf.UNI_ANDROID || e === vf.UNI_IOS;
    }
    static listenPlusClickNotification() {
        plus.push.addEventListener("click", (e) => {
            try {
                if (e) {
                    const t =
                        "string" == typeof e.payload
                            ? JSON.parse(e.payload)
                            : e.payload;
                    if (this.availableIntent(t)) {
                        let e = this.assemblePayload(t);
                        plus.push.clear(), this.onClickNotificationCallback(e);
                    }
                }
            } catch (t) {}
        });
    }
    static availableIntent(e) {
        return e && Object.keys(e).length && e.g && 1 === parseInt(e.g);
    }
    static getIntentData() {
        this.uniappPlugin.getIntentData((e) => {
            if (!this.availableIntent(e)) return;
            let t = this.assemblePayload(e);
            const n = bf.currentPlatform();
            plus.push.clear(),
                n === vf.UNI_ANDROID && this.uniappPlugin.clearAll(),
                this.onClickNotificationCallback(t);
        });
    }
    static listenClick() {
        this.listenPlusClickNotification();
        const e = bf.currentPlatform();
        this.uniappPlugin && e === vf.UNI_ANDROID && this.getIntentData();
    }
    static onClickNotification(e) {
        if (mm.supportNotification()) {
            if (!yf.isFunction(e))
                throw new Error("The arguments must be a function.");
            null === this.onClickNotificationCallback
                ? ((this.onClickNotificationCallback = e), this.listenClick())
                : console.warn(
                      "The onClickNotification event has been listened on. Please do not listen to it more than once."
                  );
        } else
            console.warn(
                "The current environment doesn't support or allowNotification is false."
            );
    }
}
function gm(...e) {}
(hm = mm),
    (mm.uniappPlugin = null),
    (mm.regIdPromise = null),
    (mm.onClickNotificationCallback = null),
    (mm.payloadAssemblers = new Array()),
    hm.supportNotification() &&
        ((hm.uniappPlugin = uni.requireNativePlugin("GoEasy-Uniapp")),
        hm.uniappPlugin
            ? (hm.regIdPromise = hm.askRegId())
            : console.warn("No GoEasy-Uniapp Native Plugin."));
const ym = new (class {
    validateId(e, t) {
        if (yf.isEmpty(e)) throw { code: 400, content: ` ${t} is required.` };
        if (!yf.isStringOrNumber(e))
            throw {
                code: 400,
                content: `TypeError: ${t} require string or number.`,
            };
    }
    validateIdArray(e, t) {
        if (!Array.isArray(e) || 0 === e.length)
            throw { code: 400, content: `TypeError: ${t} require array.` };
        if (e.length > 300)
            throw { code: 400, content: `${t} is over max length 500.` };
        for (let n = 0; n < e.length; n++) {
            if (!yf.isStringOrNumber(e[n]))
                throw {
                    code: 400,
                    content: `TypeError: ${t} item require string or number.`,
                };
            if (
                (yf.isNumber(e[n]) && (e[n] = e[n].toString()),
                0 == e[n].length)
            )
                throw { code: 400, content: `${t} has empty item.` };
        }
        if (Array.from(new Set(e)).length < e.length)
            throw { code: 400, content: `Duplicate element in ${t}` };
    }
    validateChannel(e, t) {
        this.validateId(e, t);
    }
    validateChannelArray(e, t) {
        this.validateIdArray(e, t);
    }
    validateChannelAndChannels(e, t) {
        let n = !yf.isEmpty(e),
            s = !yf.isEmpty(t);
        if (!n && !s) throw { code: 400, content: "channel is required." };
        if (n && s)
            throw {
                code: 400,
                content: "subscribe to either channel or channels, not both.",
            };
        n && this.validateId(e, "channel"),
            s && this.validateIdArray(t, "channels");
    }
    validateCallbackOptions(e) {
        if (!yf.isObject(e)) throw { code: 400, content: "bad parameters" };
    }
    validateNotification(e) {
        function t(e, t, n) {
            if (!(yf.isString(e[t]) && e[t].length <= n))
                throw {
                    code: 400,
                    content: `notification.${t} must be a string of no more than ${n} characters`,
                };
        }
        function n(e, t, n, s) {
            let o = e[t];
            if (yf.isObject(o) && yf.isDef(o[n])) {
                let e = {
                        code: 400,
                        content: `notification.vendorOptions.${t}.${n} require a ${s}}`,
                    },
                    i = o[n];
                if ("string" === s && !yf.isString(i)) throw e;
                if ("number" === s && !yf.isNumber(i)) throw e;
            }
        }
        if (!yf.isObject(e))
            throw {
                code: 400,
                content: "TypeError: notification requires an object.",
            };
        {
            if (
                (t(e, "title", 32),
                t(e, "body", 50),
                yf.isDef(e.sound) && !yf.isString(e.sound))
            )
                throw {
                    code: 400,
                    content: "notification.sound must be a string",
                };
            if (yf.isDef(e.badge) && !yf.isString(e.badge))
                throw {
                    code: 400,
                    content: "notification.badge must be a string",
                };
            e.badge = e.badge || "0";
            let s = e.vendorOptions;
            yf.isObject(s) &&
                (n(s, "huawei", "category", "string"),
                n(s, "xiaomi", "channel_id", "string"),
                n(s, "oppo", "channel_id", "string"),
                n(s, "vivo", "classification", "number"),
                n(s, "vivo", "category", "string"));
        }
    }
    validateValIsEmpty(e, t) {
        if (yf.isUndef(e) || yf.isEmpty(e))
            throw { code: 400, content: `${t} is empty` };
    }
    validateWXMPTemplateMsg(e) {
        if (yf.isObject(e)) {
            if (!yf.isString(e.template_id))
                throw { code: 400, content: "template_id must be string." };
            if (!yf.isEmpty(e.url) && !yf.isString(e.url))
                throw { code: 400, content: "url must be string" };
            if (
                !(
                    yf.isEmpty(e.miniprogram) ||
                    (yf.isString(e.miniprogram.appid) &&
                        yf.isString(e.miniprogram.pagepath))
                )
            )
                throw {
                    code: 400,
                    content:
                        "miniprogram.appid and miniprogram.pagepath must be strings.",
                };
            if (!yf.isObject(e.data))
                throw { code: 400, content: "data requires an object." };
        } else if (yf.isPrimitive(e))
            throw { code: 400, content: "wxmpTemplateMsg must be an object." };
    }
    validateObject(e, t) {
        if (yf.isUndef(e) || !yf.isObject(e))
            throw { code: 400, content: t + " must be an object." };
    }
    validateString(e, t) {
        if (yf.isUndef(e) || !yf.isString(e))
            throw { code: 400, content: t + " must be a string." };
    }
})();
function vm(e) {
    if (null === e || "object" != typeof e || "isActiveClone" in e) return e;
    let t = e instanceof Array ? [] : {};
    for (let n in e)
        "object" == typeof e[n] ? (t[n] = vm(e[n])) : (t[n] = e[n]);
    return t;
}
class bm {
    publish(e) {
        yf.isFunction(e.onFailed) || (e.onFailed = gm),
            yf.isFunction(e.onSuccess) || (e.onSuccess = gm),
            this.validate(e),
            (e.channel = e.channel.toString());
        let t = {
            channel: e.channel,
            content: e.message,
            nt: e.notification,
            at: e.accessToken,
            guid: lm.get(),
            q: e.qos,
        };
        e.wxmpTemplateMsg &&
            ((t.wxmpTemplateMsg = vm(e.wxmpTemplateMsg)),
            (t.wxmpTemplateMsg.data = JSON.stringify(t.wxmpTemplateMsg.data)));
        let n = new pm({
            name: Mf.publish,
            params: t,
            unique: !0,
            singleTimeout: Tf.commonRequestSingle,
            totalTimeout: Tf.commonRequestTotal,
            permission: um.WRITE,
            success: function (t) {
                e.onSuccess({ code: 200, content: "ok" });
            },
            fail: function (t) {
                e.onFailed({ code: t.resultCode, content: t.content });
            },
        });
        am.Socket.e(n);
    }
    validate(e) {
        if ((ym.validateChannel(e.channel, "channel"), yf.isEmpty(e.message)))
            throw { code: 400, content: "message is required." };
        if (!yf.isString(e.message))
            throw { code: 400, content: "TypeError: message requires string." };
        if (e.message.length > 1e4)
            throw { code: 400, content: "Message over max length 10000." };
        if (e.qos && !(e.qos in [0, 1]))
            throw { code: 400, content: "Qos must be 0 or 1." };
        e.wxmpTemplateMsg && ym.validateWXMPTemplateMsg(e.wxmpTemplateMsg),
            yf.isDef(e.notification) && ym.validateNotification(e.notification);
    }
}
class Sm {
    constructor(e) {
        if (
            ((this.options = e),
            (this.channels = e.channels || [e.channel]),
            !yf.isEmpty(e.channel))
        ) {
            let t = e.channel.toString();
            this.channels = [t];
        }
        yf.isEmpty(e.channels) ||
            (this.channels = e.channels.toString().split(","));
    }
}
var Em, wm;
!(function (e) {
    (e.message = "message"),
        (e.imMessage = "imMessage"),
        (e.userPresence = "userPresence"),
        (e.groupPresence = "groupPresence"),
        (e.PS_PRESENCE_EVENT = "PS_PRESENCE_EVENT"),
        (e.IM_MSG_READ = "IM_MSG_READ"),
        (e.IM_MSG_DELETED = "IM_MSG_DELETED"),
        (e.IM_MSG_RECALLED = "IM_MSG_RECALLED"),
        (e.CS_ONLINE_CHANGED = "CS_ONLINE_CHANGED");
})(Em || (Em = {})),
    (function (e) {
        (e.CONNECTED = "CONNECTED"),
            (e.RECONNECTED = "RECONNECTED"),
            (e.DISCONNECTED = "DISCONNECTED"),
            (e.LOST = "LOST"),
            (e.EXPIRED_RECONNECTED = "EXPIRED_RECONNECTED"),
            (e.NEW_MESSAGE = "NEW_MESSAGE"),
            (e.CONNECTING = "CONNECTING");
    })(wm || (wm = {}));
class Cm {
    constructor() {
        (this.subscriptions = []),
            am.Socket.onMessage(Em.message, this.onNewMessage.bind(this)),
            am.Socket.on(
                wm.EXPIRED_RECONNECTED,
                this.expiredResubscribe.bind(this)
            ),
            am.Socket.on(
                wm.CONNECTED,
                this.resubscribePresenceChannel.bind(this)
            );
    }
    expiredResubscribe() {
        this.subscriptions.forEach((e) => {
            this.doSubscribe(e, !1);
        });
    }
    resubscribePresenceChannel() {
        this.subscriptions.forEach((e) => {
            let t = e.options;
            t.presence && t.presence.enable && this.doSubscribe(e, !0);
        });
    }
    onNewMessage(e) {
        if (e.n.indexOf("_presence") > -1) return;
        e.a && am.Socket.sendAck("ack", { publishGuid: e.i });
        let t = { time: e.t, channel: e.n, content: e.c };
        this.createNotification(e),
            this.findSubscriptionByChannel(t.channel).options.onMessage(t);
    }
    createNotification(e) {
        const t = am.N.supportNotification();
        if (!yf.isObject(e.nt) || !t) return;
        const n = { ch: e.n, ctt: e.c };
        am.N.createLocalNotification(e.nt.t, e.nt.c, n, e.nt.sound, e.nt.badge);
    }
    subscribe(e) {
        if (
            (ym.validateChannelAndChannels(e.channel, e.channels),
            yf.isDef(e.presence))
        ) {
            let t = e.presence.enable;
            if (!yf.isBoolean(t))
                throw {
                    code: 400,
                    content:
                        "Subscription failed. presence.enable must be a boolean",
                };
            if (t && !am.Socket.user().id)
                throw {
                    code: 400,
                    content:
                        "Subscription failed. If presence is enable, the id must be specified when calling the connect method",
                };
        }
        let t = new Sm(e);
        this.doSubscribe(t, !1)
            .then(() => {
                this.subscriptions.push(t),
                    kf.onSuccess(e, { code: 200, content: "ok" });
            })
            .catch((t) => {
                kf.onFailed(e, { code: t.resultCode, content: t.content });
            });
    }
    doSubscribe(e, t) {
        let n = e.options;
        return new Promise((s, o) => {
            let i = new pm({
                name: Mf.subscribe,
                permission: um.READ,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                params: {
                    channels: e.channels,
                    accessToken: n.accessToken,
                    presence: n.presence,
                    resubscribe: t,
                },
                success: () => {
                    s();
                },
                fail: (e) => {
                    o(e);
                },
            });
            am.Socket.e(i);
        });
    }
    unsubscribe(e) {
        ym.validateChannel(e.channel, "channel"),
            (e.channel = e.channel.toString());
        const t = this.findSubscriptionByChannel(e.channel);
        if (!t)
            return void e.onFailed({
                code: 400,
                content: "channel[" + e.channel + "] is not subscribed",
            });
        let n = new pm({
            name: Mf.unsubscribe,
            params: { channel: e.channel, presence: t.options.presence },
            permission: um.READ,
            singleTimeout: Tf.commonRequestSingle,
            totalTimeout: Tf.commonRequestTotal,
            success: () => {
                e.onSuccess({ code: 200, content: "ok" }),
                    this.removeChannel(e.channel);
            },
            fail: function (t) {
                e.onFailed({ code: t.resultCode, content: t.content });
            },
        });
        am.Socket.e(n);
    }
    removeChannel(e) {
        for (let t = this.subscriptions.length - 1; t >= 0; t--) {
            const n = this.subscriptions[t].channels,
                s = n.indexOf(e);
            if (s > -1) {
                n.splice(s, 1),
                    0 === n.length && this.subscriptions.splice(t, 1);
                break;
            }
        }
    }
    findSubscriptionByChannel(e) {
        let t = !1,
            n = null;
        for (let s = this.subscriptions.length - 1; s >= 0; s--) {
            let o = this.subscriptions[s].channels;
            for (let i = 0; i < o.length; i++)
                if (o[i] == e) {
                    (t = !0), (n = this.subscriptions[s]);
                    break;
                }
            if (t) break;
        }
        return n;
    }
}
class _m {
    get(e) {
        yf.isFunction(e.onSuccess) || (e.onSuccess = gm),
            yf.isFunction(e.onFailed) || (e.onFailed = gm),
            ym.validateChannel(e.channel, "channel"),
            (e.channel = e.channel.toString());
        let t = new pm({
            name: Mf.historyMessages,
            permission: um.READ,
            params: e,
            singleTimeout: Tf.commonQuerySingle,
            totalTimeout: Tf.commonQueryTotal,
            success: (t) => {
                e.onSuccess({
                    code: t.resultCode || t.code || 200,
                    content: t.content,
                });
            },
            fail: (t) => {
                e.onFailed({
                    code: t.resultCode || t.code,
                    content: t.content,
                });
            },
        });
        am.Socket.e(t);
    }
}
class Mm {
    constructor() {
        (this.channelPresenceMap = new Map()),
            (this.onPresenceEvent = (e) => {
                this.channelPresenceMap.get(e.channel).onPresence(e);
            }),
            (this.expireAllChannelPresences = () => {
                this.channelPresenceMap.forEach((e, t) => {
                    e.expire();
                });
            }),
            (this.resubscribe = () => {
                this.channelPresenceMap.forEach((e, t) => {
                    e.subscribed() && e.doSubscribe();
                });
            }),
            am.Socket.on(wm.LOST, this.expireAllChannelPresences),
            am.Socket.on(wm.RECONNECTED, this.resubscribe),
            am.Socket.onMessage(Em.PS_PRESENCE_EVENT, this.onPresenceEvent);
    }
    hereNow(e) {
        let t,
            n = this.channelPresenceMap.get(e.channel);
        n && n.queryPromise
            ? (e.limit && e.limit > n.membersLimit && n.doQuery(e.limit),
              (t = n.queryPromise))
            : (t = Im(e.channel, e.limit)),
            t
                .then((t) => {
                    e.onSuccess(t);
                })
                .catch((t) => {
                    e.onFailed(t);
                });
    }
    subscribe(e) {
        if (yf.isUndef(e.onPresence) || !yf.isFunction(e.onPresence))
            throw {
                code: 400,
                content:
                    "Subscription Presence failed. onPresence callback function is required",
            };
        let t = e.channel,
            n = this.channelPresenceMap.get(t);
        n || ((n = new Tm(t)), this.channelPresenceMap.set(t, n)),
            n.subscribe(e);
    }
    unsubscribe(e) {
        let t = e.channel;
        if (this.channelPresenceMap.get(t)) {
            let n = new pm({
                name: Mf.PUBSUB_PRESENCE_UNSUBSCRIBE,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                params: { channel: t },
                success: (n) => {
                    this.channelPresenceMap.delete(t), e.onSuccess();
                },
                fail: (t) => {
                    e.onFailed(t);
                },
            });
            am.Socket.e(n);
        } else e.onSuccess();
    }
}
class Tm {
    constructor(e) {
        (this.membersLimit = 10), (this.queried = !1), (this.channel = e);
    }
    onPresence(e) {
        return Of(this, void 0, void 0, function* () {
            this.queried ? this.update(e) : yield this.queryPromise,
                this.on({
                    channel: this.channel,
                    action: e.action,
                    member: e.member,
                    time: e.time,
                    amount: this.amount,
                    members: this.membersByLimit(),
                });
        });
    }
    membersByLimit() {
        return this.members.slice(0, this.membersLimit);
    }
    subscribe(e) {
        return Of(this, void 0, void 0, function* () {
            if (
                (e.membersLimit &&
                    (this.membersLimit = Math.min(e.membersLimit, 300)),
                !this.subscribed())
            )
                try {
                    yield this.doSubscribe();
                } catch (t) {
                    return void e.onFailed(t);
                }
            (this.on = e.onPresence), e.onSuccess();
        });
    }
    doSubscribe() {
        return (
            this.doQuery(this.membersLimit),
            new Promise((e, t) => {
                let n = new pm({
                    name: Mf.PUBSUB_PRESENCE_SUBSCRIBE,
                    permission: um.READ,
                    params: { channel: this.channel },
                    singleTimeout: Tf.commonRequestSingle,
                    totalTimeout: Tf.commonRequestTotal,
                    success: (t) => {
                        e();
                    },
                    fail: (e) => {
                        t(e);
                    },
                });
                am.Socket.e(n);
            })
        );
    }
    doQuery(e) {
        (this.queryPromise = Im(this.channel, e)),
            this.queryPromise
                .then((e) => {
                    (this.members = e.content.members),
                        (this.amount = e.content.amount),
                        (this.queried = !0);
                })
                .catch((e) => {
                    throw e;
                });
    }
    update(e) {
        if (["join", "back"].includes(e.action)) this.members.unshift(e.member);
        else if (["leave", "timeout"].includes(e.action)) {
            let t = this.members.findIndex((t) => t.id === e.member.id);
            t > -1 && this.members.splice(t, 1);
        }
        this.amount = e.amount;
    }
    expire() {
        (this.queried = !1), (this.queryPromise = null);
    }
    subscribed() {
        return void 0 !== this.on;
    }
}
function Im(e, t) {
    return (
        t || (t = 10),
        new Promise((n, s) => {
            let o = { channel: e, limit: t },
                i = new pm({
                    name: Mf.PUBSUB_PRESENCE_HERENOW,
                    permission: um.READ,
                    params: o,
                    singleTimeout: Tf.commonQuerySingle,
                    totalTimeout: Tf.commonQueryTotal,
                    success: (e) => {
                        n(e);
                    },
                    fail: (e) => {
                        s(e);
                    },
                });
            am.Socket.e(i);
        })
    );
}
class km {
    constructor() {
        (this.publisher = new bm()),
            (this.subscriber = new Cm()),
            (this.presence2 = new Mm()),
            (this.histories = new _m());
    }
    static init() {
        this.instance = new km();
    }
    publish(e) {
        this.publisher.publish(e);
    }
    subscribe(e) {
        this.subscriber.subscribe(e);
    }
    unsubscribe(e) {
        this.subscriber.unsubscribe(e);
    }
    subscribePresence(e) {
        this.presence2.subscribe(e);
    }
    unsubscribePresence(e) {
        this.presence2.unsubscribe(e);
    }
    history(e) {
        this.histories.get(e);
    }
    hereNow(e) {
        this.presence2.hereNow(e);
    }
}
class Om extends Zf {
    static init() {
        return (
            (this.module = new Om()),
            (this.module.name = this.GWS_MODULE_NAME),
            this.initGN(),
            this.module
        );
    }
    static initGN() {
        mm.addAssembler(
            new (class {
                assemble(e) {
                    return { channel: e.ch, content: e.ctt };
                }
                support(e) {
                    return !!e.ch;
                }
            })()
        );
    }
    postConnect() {
        km.init();
    }
    static check() {
        if (!this.module)
            throw new Error(
                "PubSub not initialized. Please include 'PUBSUB' in the 'modules' during GoEasy initialization."
            );
    }
}
Om.GWS_MODULE_NAME = "GWS";
class Nm {
    constructor() {}
}
let xm = new (class extends Nm {
    constructor() {
        super();
    }
    upload(e, t) {
        try {
            return (
                delete e.parameters.fileRes,
                new Promise((n, s) => {
                    yp({
                        url: e.host,
                        filePath: this.getTempFilePath(e),
                        name: "file",
                        formData: e.parameters,
                        success(e) {
                            200 === e.statusCode
                                ? n()
                                : s({ code: e.statusCode, content: e.errMsg });
                        },
                        fail(e) {
                            s({ code: 500, content: e.errMsg });
                        },
                    }).onProgressUpdate((e) => {
                        t && t(e);
                    });
                })
            );
        } catch (n) {
            return new Promise((e, t) => {
                t({ code: 500, content: n });
            });
        }
    }
    getTempFilePath(e) {
        let t = e.file;
        return t.tempFilePath || t.fullPath || t.path;
    }
})();
const Am = new (class extends Nm {
        upload(e, t) {
            try {
                return new Promise((n, s) => {
                    yp({
                        url: e.host,
                        filePath: this.getTempFilePath(e),
                        name: "file",
                        formData: e.parameters,
                        success(e) {
                            200 === e.statusCode
                                ? n()
                                : s({ code: e.statusCode, content: e.errMsg });
                        },
                        fail(e) {
                            s({ code: 500, content: e.errMsg });
                        },
                    }).onProgressUpdate((e) => {
                        t && t(e);
                    });
                });
            } catch (n) {
                return new Promise((e, t) => {
                    t({ code: 500, content: n });
                });
            }
        }
        getTempFilePath(e) {
            let t = e.file || e.fileRes;
            return t.path || t.tempFilePath;
        }
    })(),
    Rm = new (class extends Nm {
        constructor() {
            super();
        }
        upload(e, t) {
            try {
                return new Promise((n, s) => {
                    let o = new XMLHttpRequest();
                    o.open("post", e.host, !0);
                    for (let t in e.headers)
                        o.setRequestHeader(t, e.headers[t]);
                    (o.upload.onprogress = function (e) {
                        t && t(e);
                    }),
                        (o.upload.onloadstart = function (e) {
                            t && t(e);
                        }),
                        (o.upload.onloadend = function (e) {
                            t && t(e);
                        });
                    let i = new FormData();
                    for (let t in e.parameters)
                        "fileRes" == t
                            ? i.append("file", e.parameters[t])
                            : i.append(t, e.parameters[t]);
                    o.send(i),
                        (o.onreadystatechange = function () {
                            4 == o.readyState &&
                                ((o.status >= 200 && o.status < 300) ||
                                304 == o.status
                                    ? n()
                                    : s({
                                          code: o.status,
                                          content: o.responseText,
                                      }));
                        });
                });
            } catch (n) {
                return new Promise((e, t) => {
                    t({ code: 500, content: n });
                });
            }
        }
    })();
class Pm {
    constructor(e, t, n) {
        (this.storageLocation = e), (this.url = t), (this.name = n);
    }
}
const Dm = new (class {
    constructor() {
        this.uploader = { [af.UNIAPP]: xm, [vf.MP_WX]: Am, [vf.BROWSER]: Rm };
    }
    upload(e, t) {
        return Of(this, void 0, void 0, function* () {
            const n = uf.currentFramework(),
                s = bf.currentPlatform(),
                o = n === af.UNKNOWN ? s : n;
            let i = this.uploader[o];
            return (
                yield i.upload(e, t),
                new Pm(e.storageLocation, e.url, e.newFileName)
            );
        });
    }
})();
class Lm {
    resolve(e) {
        return new Promise((t, n) => {
            let s = new pm({
                name: "uploadToken",
                params: { filename: e },
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail(e) {
                    n(e.content);
                },
                success(e) {
                    200 === e.code ? t(e.content) : n(e.content);
                },
            });
            am.Socket.e(s);
        });
    }
}
var Fm;
!(function (e) {
    (e.aliYun = "ALI"), (e.qiNiu = "QN"), (e.tencent = "TX");
})(Fm || (Fm = {}));
class Um {
    constructor(e, t, n, s, o, i, r) {
        (this.storageLocation = e),
            (this.host = t),
            (this.headers = n),
            (this.parameters = s),
            (this.file = o),
            (this.newFileName = i),
            (this.url = r);
    }
}
class Bm {
    constructor() {}
    newFileName(e) {
        return (e && e.newFilename) || "";
    }
}
let jm = new (class extends Bm {
        constructor() {
            super();
        }
        url(e) {
            return e.host + "/" + e.dir + "/" + this.newFileName(e);
        }
        build(e, t, n) {
            let s,
                o = this.newFileName(e);
            return (
                (s = {
                    key: e.dir + "/" + o,
                    OSSAccessKeyId: e.accessKeyId,
                    policy: e.policy,
                    signature: e.signature,
                    success_action_status: "200",
                    fileRes: t,
                }),
                n &&
                    (s = {
                        key: e.dir + "/" + o,
                        OSSAccessKeyId: e.accessKeyId,
                        policy: e.policy,
                        signature: e.signature,
                        success_action_status: "200",
                        "Content-Disposition": "attachment;filename=" + t.name,
                        fileRes: t,
                    }),
                new Um(Fm.aliYun, e.host, null, s, t, o, this.url(e))
            );
        }
    })(),
    Gm = new (class extends Bm {
        constructor() {
            super();
        }
        url(e) {
            return e.host + "/" + e.key;
        }
        build(e, t, n) {
            let s = {
                "q-sign-algorithm": e.qSignAlgorithm,
                "q-ak": e.qAk,
                "q-key-time": e.qKeyTime,
                "q-signature": e.qSignature,
                policy: e.policy,
                "x-cos-security-token": e.xCosSecurityToken,
                success_action_status: "200",
                key: e.key,
                fileRes: t,
            };
            return (
                n &&
                    (s = {
                        "q-sign-algorithm": e.qSignAlgorithm,
                        "q-ak": e.qAk,
                        "q-key-time": e.qKeyTime,
                        "q-signature": e.qSignature,
                        policy: e.policy,
                        "x-cos-security-token": e.xCosSecurityToken,
                        success_action_status: "200",
                        key: e.key,
                        "Content-Disposition": `attachment;filename=${t.name}`,
                        fileRes: t,
                    }),
                new Um(Fm.tencent, e.host, null, s, t, e.key, this.url(e))
            );
        }
    })();
class $m {
    constructor() {
        this.uploadTokenResolver = new Lm();
    }
    builder(e) {
        if (e === Fm.aliYun) return jm;
        if (e === Fm.tencent) return Gm;
        throw new Error(
            "Only Ali OSS and Tencent COS are supported, unknown storage location:" +
                e
        );
    }
    build(e, t, n) {
        return Of(this, void 0, void 0, function* () {
            try {
                let s = yield this.uploadTokenResolver.resolve(t),
                    o = this.builder(s.vendor).build(s, e, n);
                return Promise.resolve(o);
            } catch (s) {
                return Promise.reject(s);
            }
        });
    }
}
class qm {
    constructor() {
        (this.requestBuilder = new $m()), (this.fileUploader = Dm);
    }
    upload(e, t, n, s) {
        return Of(this, void 0, void 0, function* () {
            try {
                let o = yield this.requestBuilder.build(e, t, s);
                return this.fileUploader.upload(o, n);
            } catch (o) {
                return Promise.reject(o);
            }
        });
    }
}
var Vm, Hm, Wm, zm;
!(function (e) {
    (e.MESSAGE_SENDING = "IM_INTERNAL_MESSAGE_SENDING"),
        (e.MESSAGE_SEND_SUCCESS = "IM_INTERNAL_MESSAGE_SEND_SUCCESS"),
        (e.MESSAGE_SEND_FAILED = "IM_INTERNAL_MESSAGE_SEND_FAILED"),
        (e.MESSAGE_RECEIVED = "IM_INTERNAL_MESSAGE_RECEIVED"),
        (e.MESSAGE_RECALLED = "IM_INTERNAL_MESSAGE_RECALLED"),
        (e.MAX_MESSAGE_CHANGED = "IM_INTERNAL_MAX_MESSAGE_CHANGED"),
        (e.MAX_MESSAGE_DELETED = "IM_INTERNAL_MAX_MESSAGE_DELETED"),
        (e.UNREAD_AMOUNT_CHANGED = "IM_INTERNAL_UNREAD_MESSAGE_CHANGED"),
        (e.CS_ONLINE_SUCCESS = "CS_ONLINE_SUCCESS"),
        (e.CS_OFFLINE_SUCCESS = "CS_OFFLINE_SUCCESS"),
        (e.CS_ACCEPTED = "CS_ACCEPTED"),
        (e.CS_ENDED = "CS_ENDED"),
        (e.CS_TRANSFER = "CS_TRANSFER"),
        (e.CS_AGENT_MESSAGE_RECEIVED = "CS_AGENT_MESSAGE_RECEIVED");
})(Vm || (Vm = {}));
class Xm {
    clearUseLessAttribute() {
        delete this.buildOptions;
    }
    isOtherSent() {
        return this.senderId !== am.Socket.user().id;
    }
    getToData() {
        return this.buildOptions.createOptions.to.data;
    }
}
!(function (e) {
    (e.TEXT = "text"),
        (e.IMAGE = "image"),
        (e.FILE = "file"),
        (e.VIDEO = "video"),
        (e.AUDIO = "audio");
})(Hm || (Hm = {}));
class Jm extends class {} {
    constructor() {
        super(...arguments), (this.goEasyUploader = new qm());
    }
    improve(e) {
        let t = e.message;
        return new Promise((e, n) => {
            let s,
                o,
                i = t.buildOptions.createOptions;
            t.type === Hm.VIDEO
                ? ((o = t.payload), (s = o.video.name))
                : ((o = t.payload), (s = o.name)),
                this.goEasyUploader
                    .upload(i.file, s, i.onProgress, t.type === Hm.FILE)
                    .then((n) => {
                        this.setPayload(n, t), e();
                    })
                    .catch((e) => {
                        n(e);
                    });
        });
    }
    setPayload(e, t) {
        t.payload.url = e.url;
    }
}
class Km extends Jm {
    setPayload(e, t) {
        let n,
            s = t.payload;
        switch (
            ((s.video.url = e.url),
            (s.video.name = e.name),
            s.thumbnail.height > 200 &&
                ((s.thumbnail.height = 200),
                (s.thumbnail.width = (200 * s.video.width) / s.video.height)),
            e.storageLocation)
        ) {
            case Fm.aliYun:
                n =
                    "?x-oss-process=video/snapshot,t_0000,f_jpg,h_" +
                    s.thumbnail.height +
                    ",m_fast,ar_auto";
                break;
            case Fm.tencent:
                n =
                    "?ci-process=snapshot&time=1&format=jpg&height=" +
                    s.thumbnail.height;
                break;
            default:
                throw new Error(
                    "Only Ali OSS and Tencent COS are supported, unknown storage location:" +
                        e.storageLocation
                );
        }
        s.thumbnail.url = e.url + n;
    }
}
class Ym extends Jm {
    setPayload(e, t) {
        let n,
            s = t.payload;
        s.url = e.url;
        const o = s.height > 200 ? 200 : s.height;
        switch (e.storageLocation) {
            case Fm.aliYun:
                n = "?x-oss-process=image/resize,m_lfit,h_" + o;
                break;
            case Fm.tencent:
                n = `?imageMogr2/thumbnail/x${o}`;
                break;
            default:
                throw new Error(
                    "Only Ali OSS and Tencent COS are supported, unknown storage location:" +
                        e.storageLocation
                );
        }
        s.thumbnail = e.url + n;
    }
}
class Qm {
    constructor() {
        this.improvers = {
            [Hm.FILE]: new Jm(),
            [Hm.AUDIO]: new Jm(),
            [Hm.IMAGE]: new Ym(),
            [Hm.VIDEO]: new Km(),
        };
    }
    improve(e) {
        let t = this.improvers[e.message.type];
        if (t)
            try {
                return t.improve(e);
            } catch (n) {
                return Promise.reject(n);
            }
        return Promise.resolve();
    }
}
class Zm extends sm {
    static init() {
        this.i = new Zm();
    }
}
class eg {
    constructor(e, t, n, s, o) {
        this.validate(e),
            (this.mt = e.type),
            (this.to = t.id.toString()),
            (this.d = JSON.stringify(t.data)),
            (this.p = JSON.stringify(e.payload)),
            n && (this.nt = n),
            o && (this.at = o),
            s &&
                ((this.wxmpTemplateMsg = vm(s)),
                (this.wxmpTemplateMsg.data = JSON.stringify(
                    this.wxmpTemplateMsg.data
                )));
        let i = t.type;
        if (((this.t = i), i === pf.CS)) {
            let t = e;
            this.tid = t.teamId;
        }
        this.guid = e.messageId;
    }
    validate(e) {
        if (e.type === Hm.TEXT && JSON.stringify(e.payload).length > 3072)
            throw Error("message-length limit 3kb");
    }
}
class tg {
    constructor() {
        this.payloadImprover = new Qm();
    }
    send(e) {
        this.validate(e);
        let t = e.message,
            n = e.accessToken,
            s = t.buildOptions,
            o = s.createOptions,
            i = o.notification,
            r = o.wxmpTemplateMsg,
            a = o.to;
        a.data || (a.data = {}), (t.status = ff.SENDING);
        let c = s.complete,
            l = this.payloadImprover.improve(e);
        Promise.all([c, l])
            .then(() =>
                Of(this, void 0, void 0, function* () {
                    if (o.beforeSend) {
                        const e = JSON.parse(JSON.stringify(t));
                        yield o.beforeSend(e);
                    }
                    this.doSend(t, a, i, r, n, e);
                })
            )
            .catch((n) => {
                (t.status = ff.FAIL),
                    kf.onFailed(e, {
                        code: (n && n.code) || 400,
                        content: (n && n.content) || n,
                    });
            });
    }
    doSend(e, t, n, s, o, i) {
        let r = new eg(e, t, n, s, o);
        Zm.i.fire(Vm.MESSAGE_SENDING, e);
        let a = new pm({
            name: Mf.publishIM,
            params: r,
            unique: !0,
            permission: um.WRITE,
            singleTimeout: Tf.commonRequestSingle,
            totalTimeout: Tf.commonRequestTotal,
            fail: (t) => {
                (e.status = ff.FAIL),
                    Zm.i.fire(Vm.MESSAGE_SEND_FAILED, e),
                    kf.onFailed(i, { code: t.resultCode, content: t.content });
            },
            success: (t) => {
                if (
                    ((e.status = ff.SUCCESS),
                    (e.timestamp = t.content.timestamp),
                    e.scene() === pf.CS)
                ) {
                    let n = e;
                    n.customerId() !== am.Socket.user().id &&
                        (n.sessionId = t.content.sessionId);
                }
                e.clearUseLessAttribute(),
                    Zm.i.fire(Vm.MESSAGE_SEND_SUCCESS, e),
                    kf.onSuccess(i, e);
            },
        });
        am.Socket.e(a);
    }
    validate(e) {
        let t = e.message;
        if (!(t instanceof Xm)) throw new Error("it is invalid message");
        if (t.status !== ff.NEW)
            throw new Error(
                "Please create a new message, a message can only be sent once"
            );
    }
}
class ng {
    insert(e, t) {
        let n = this.binarySearch(e, t);
        if (n >= 0) e.splice(n, 1, t);
        else {
            let s = -n - 1;
            e.splice(s, 0, t);
        }
    }
    binarySearch(e, t) {
        let n = 0,
            s = e.length - 1;
        for (; n <= s; ) {
            let o = (s + n) >> 1,
                i = this.compare(t, e[o]);
            if (i > 0) n = o + 1;
            else {
                if (!(i < 0)) return o;
                s = o - 1;
            }
        }
        return -n - 1;
    }
}
class sg {
    constructor(e) {
        (this.messages = new Array()), (this.allLoaded = !1), (this.target = e);
    }
    all() {
        return this.messages;
    }
    sliceOverLengthMessages() {
        this.messages.length > sg.CACHE_MAX_LENGTH &&
            ((this.messages = this.messages.slice(-sg.CACHE_MAX_LENGTH)),
            !0 === this.allLoaded && (this.allLoaded = !1));
    }
    getMaxMessage() {
        return this.messages[this.messages.length - 1];
    }
    loadLocalMessages(e, t) {
        let n = [],
            s = this.messages.length;
        if (t) {
            if (s > 0) {
                let o = this.messages[0].timestamp,
                    i = this.messages[s - 1].timestamp;
                if (t >= o && t <= i)
                    for (let r = s - 1; r >= 0; r--) {
                        let s = this.messages[r];
                        if (s.timestamp < t) {
                            if (!(n.length < e)) break;
                            n.unshift(s);
                        }
                    }
            }
        } else n = this.messages.slice(-e);
        return n;
    }
    cacheServerMessages(e, t) {
        let n = this.messages[0];
        this.messages.length < sg.CACHE_MAX_LENGTH &&
            (!e.lastTimestamp ||
                (this.messages.length > 0 &&
                    n.timestamp === e.lastTimestamp)) &&
            (t.forEach((e) => {
                sg.sortedInserter.insert(this.messages, e);
            }),
            t.length < e.limit && (this.allLoaded = !0));
    }
    findMessageByTime(e) {
        return this.messages.find((t) => e === t.timestamp);
    }
    findMessagesByTimes(e) {
        let t = [];
        return (
            e.forEach((e) => {
                let n = this.findMessageByTime(e);
                yf.isDef(n) && t.push(n);
            }),
            t
        );
    }
    existsMessage(e) {
        return this.findMessageIndexById(e) > -1;
    }
    findMessageIndexById(e) {
        return this.messages.findIndex((t) => e === t.messageId);
    }
    deleteMessage(e) {
        let t = this.findMessageIndexById(e);
        t >= 0 && this.messages.splice(t, 1);
    }
    recallMessage(e) {
        return e.times
            .map((e) => this.findMessageByTime(e))
            .filter((e) => yf.isDef(e))
            .map((t) => ((t.recalled = !0), (t.recaller = e.recaller), t));
    }
    isEmpty() {
        return 0 === this.messages.length;
    }
    deleteMessages(e) {
        e.forEach((e) => {
            this.deleteMessage(e.messageId);
        });
    }
    saveMessage(e) {
        sg.sortedInserter.insert(this.messages, e),
            this.sliceOverLengthMessages();
    }
    maxSuccessMessageTime() {
        for (let e = this.messages.length - 1; e >= 0; e--)
            if (this.messages[e].status === ff.SUCCESS)
                return this.messages[e].timestamp;
        return 0;
    }
    minTime() {
        return this.isEmpty() ? 0 : this.messages[0].timestamp;
    }
    correctPosition(e) {
        this.deleteMessage(e.messageId), this.saveMessage(e);
    }
}
(sg.CACHE_MAX_LENGTH = 200),
    (sg.sortedInserter = new (class extends ng {
        compare(e, t) {
            let n = e.timestamp - t.timestamp;
            return n > 0 ? 1 : 0 === n ? 0 : -1;
        }
    })());
class og {
    constructor(e, t, n) {
        (this.scene = e), (this.id = t), yf.isDef(n) && (this.teamId = n);
    }
    toString() {
        return pf.PRIVATE === this.scene || pf.GROUP === this.scene
            ? this.scene + "#" + this.id
            : this.scene + "#" + this.id + "#" + this.teamId;
    }
    customerId() {
        if (pf.CS === this.scene)
            return this.id === this.teamId ? am.Socket.user().id : this.id;
    }
    static byScene(e, t, n) {
        return new og(e, t, n);
    }
    static byIMMessage(e) {
        let t,
            n,
            s = e.scene();
        if (s === pf.PRIVATE) {
            let t = e.senderId,
                s = e.targetId();
            n = am.Socket.user().id === t ? s : t;
        } else if (s === pf.GROUP) n = e.targetId();
        else {
            if (s !== pf.CS)
                throw { code: 400, content: `scene ${s} not exists` };
            (n = e.targetId()), (t = e.teamId);
        }
        return new og(s, n, t);
    }
    static byMessageReadRemoteEvent(e) {
        let t,
            n = e.scene,
            s = e.targetId,
            o = e.markerId,
            i = e.teamId;
        return (
            n === pf.PRIVATE
                ? (t = am.Socket.user().id === o ? s : o)
                : n === pf.GROUP
                ? (t = s)
                : n === pf.CS &&
                  (t =
                      s === i
                          ? o === am.Socket.user().id
                              ? i
                              : o
                          : o === am.Socket.user().id
                          ? s
                          : i),
            new og(n, t, i)
        );
    }
    static byIMMessageDeletedEvent(e) {
        let t = e.scene,
            n = e.deleterId;
        if (t === pf.PRIVATE) {
            let s = am.Socket.user().id === n ? e.targetId : n;
            return new og(t, s);
        }
        if (t === pf.GROUP) return new og(t, e.targetId);
    }
    static byConversationDTO(e) {
        let t = e.lastMessage;
        return this.byIMMessage(t);
    }
    static byConversationId(e, t) {
        let n;
        if (e === pf.PRIVATE) {
            let e = t.split(":", 2);
            n = e[0] === am.Socket.user().id ? e[1] : e[0];
        } else n = t;
        return new og(e, n);
    }
}
class ig {
    constructor(e) {
        this.times = new Array();
        let t = e[0],
            n = og.byIMMessage(t);
        (this.scene = n.scene),
            (this.targetId = n.id),
            e.forEach((e) => {
                e.status === ff.SUCCESS && this.times.push(e.timestamp);
            }),
            this.times.sort((e, t) => (e < t ? -1 : e == t ? 0 : 1));
    }
}
class rg {
    static deleteServerMessages(e) {
        let t = new ig(e);
        return t.times.length < 0
            ? Promise.resolve()
            : new Promise((e, n) => {
                  let s = new pm({
                      name: Mf.IM_DELETE_MESSAGE,
                      params: t,
                      permission: um.WRITE,
                      singleTimeout: Tf.commonQuerySingle,
                      totalTimeout: Tf.commonQueryTotal,
                      success: (t) => {
                          200 === t.code ? e(t) : n(t);
                      },
                      fail: (e) => {
                          n(e);
                      },
                  });
                  am.Socket.e(s);
              });
    }
    static validate(e) {
        let t = e.messages;
        for (let n = 0; n < t.length; n++) {
            let e = t[n];
            if (e.status === ff.SENDING)
                throw {
                    code: 400,
                    content:
                        "message[" +
                        n +
                        "] is '" +
                        e.status +
                        "' and cannot be deleted",
                };
        }
    }
}
class ag {
    constructor(e, t, n, s, o) {
        (this.scene = e),
            (this.id = t),
            (this.after = n),
            (this.min = s),
            (this.teamId = o);
    }
}
class cg {
    constructor(e, t, n, s) {
        (this.id = e),
            (this.scene = t),
            (this.lastTimestamp = n),
            (this.teamId = s);
    }
}
class lg extends Xm {
    constructor() {
        super(...arguments), (this.read = !1);
    }
    scene() {
        return pf.PRIVATE;
    }
    targetId() {
        return this.receiverId;
    }
}
class ug extends Xm {
    scene() {
        return pf.GROUP;
    }
    targetId() {
        return this.groupId;
    }
}
class dg extends Xm {
    constructor() {
        super(...arguments), (this.accepted = !1);
    }
    scene() {
        return pf.CS;
    }
    targetId() {
        return am.Socket.user().id === this.customerId()
            ? this.teamId
            : this.customerId();
    }
    sendByCustomer() {
        return this.to === this.teamId;
    }
    customerId() {
        return this.sendByCustomer() ? this.senderId : this.to;
    }
    isOtherSent() {
        return am.Socket.user().id === this.customerId()
            ? this.senderId !== am.Socket.user().id
            : this.senderId === this.customerId();
    }
}
!(function (e) {
    (e.ACCEPT = "CS_ACCEPT"), (e.END = "CS_END"), (e.TRANSFER = "CS_TRANSFER");
})(Wm || (Wm = {}));
class hg {
    build(e) {
        let t,
            n = e.t;
        n === pf.PRIVATE
            ? ((t = new lg()), (t.read = !1), (t.receiverId = e.r))
            : n === pf.GROUP
            ? ((t = new ug()),
              (t.groupId = e.r),
              (t.senderData = e.d ? JSON.parse(e.d) : {}))
            : n === pf.CS &&
              ((t = new dg()),
              (t.to = e.r),
              (t.teamId = e.tid),
              (t.senderData = e.d ? JSON.parse(e.d) : {}),
              (t.accepted = e.accepted),
              t.customerId() !== am.Socket.user().id &&
                  (t.sessionId = e.sessionId)),
            (t.senderId = e.s),
            (t.messageId = e.i),
            (t.timestamp = e.ts),
            (t.type = e.mt);
        let s = e.p;
        if (yf.isDef(s))
            if (n === pf.CS && t.type === Wm.TRANSFER) {
                let e = JSON.parse(s);
                (e.transferTo.data = JSON.parse(e.transferTo.data)),
                    (t.payload = e);
            } else t.payload = JSON.parse(s);
        let o = e.rc;
        return (
            yf.isDef(o) && !0 === o
                ? ((t.recalled = o), (t.recaller = e.recaller))
                : (t.recalled = !1),
            (t.status = ff.SUCCESS),
            t
        );
    }
}
class pg {
    constructor() {
        this.builder = new hg();
    }
    sync(e, t, n, s, o) {
        let i = new ag(e, t, n, s, o);
        return new Promise((e, t) => {
            let n = new pm({
                name: Mf.IM_HISTORY_CHANGE,
                params: i,
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                fail: (e) => {
                    t(e);
                },
                success: (t) => {
                    let n = t.content;
                    e(n);
                },
            });
            am.Socket.e(n);
        });
    }
    loadServerMessages(e, t) {
        return new Promise((n, s) => {
            let o = new pm({
                name: Mf.IM_HISTORY,
                params: t,
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                fail: (e) => {
                    s(e);
                },
                success: (t) => {
                    let s = t.content;
                    (s.messages = this.convertServerMessages(e, s.messages)),
                        n(s);
                },
            });
            am.Socket.e(o);
        });
    }
    convertServerMessages(e, t) {
        let n = [],
            s = e.scene,
            o = e.id;
        return (
            t.forEach((t) => {
                if (((t.t = s), pf.PRIVATE === s))
                    t.r = t.s === am.Socket.user().id ? o : am.Socket.user().id;
                else if (pf.GROUP === s) t.r = o;
                else if (pf.CS === s) {
                    let n = e.customerId(),
                        s = e.teamId;
                    n === am.Socket.user().id ? (t.r = s) : (t.r = n);
                }
                let i = this.builder.build(t);
                n.push(i);
            }),
            n
        );
    }
    updateServerOffsets(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = new cg(t.id, t.scene, e, t.teamId);
            return new Promise((e, t) => {
                let s = new pm({
                    name: Mf.IM_MARK_AS_READ,
                    params: n,
                    permission: um.WRITE,
                    singleTimeout: Tf.commonRequestSingle,
                    totalTimeout: Tf.commonRequestTotal,
                    success: (t) => {
                        e(t);
                    },
                    fail: (e) => {
                        t(e);
                    },
                });
                am.Socket.e(s);
            });
        });
    }
}
pg.instance = new pg();
class fg {
    constructor() {
        (this.offsetMap = new Map()),
            (this.markingTime = 0),
            (this.userId = am.Socket.user().id);
    }
    updateOffset(e, t) {
        let n = this.offsetMap.get(e);
        return yf.isDef(n)
            ? t > n && (this.offsetMap.set(e, t), !0)
            : (this.offsetMap.set(e, t), !0);
    }
    updateUserOffsets(e) {
        e.forEach((e) => {
            let t = e.userId,
                n = e.offset;
            this.updateOffset(t, n);
        });
    }
    updateMyOffset(e) {
        return this.updateOffset(this.userId, e);
    }
    myOffset() {
        return this.getOffset(this.userId);
    }
    getOffset(e) {
        return this.offsetMap.get(e) || 0;
    }
}
class mg {
    constructor(e, t, n, s, o) {
        (this.id = e),
            (this.scene = t),
            (this.lastTimestamp = n),
            (this.limit = s),
            (this.teamId = o);
    }
}
class gg {
    constructor(e) {
        this.history = e;
    }
    pre() {
        (this.oldLastMessage = this.history.getMaxMessage()),
            (this.oldUnreadAmount = this.history.unreadAmount()),
            this.oldLastMessage &&
                ((this.oldLastMessageRecalled = this.oldLastMessage.recalled),
                (this.oldLastMessageRead = this.oldLastMessage.read),
                (this.oldLastMessageStatus = this.oldLastMessage.status));
    }
    post() {
        let e,
            t,
            n,
            s = this.history.unreadAmount(),
            o = this.history.getMaxMessage();
        o && ((n = o.status), (e = o.read), (t = o.recalled));
        let i = this.history.target;
        this.oldLastMessage !== o ||
        this.oldLastMessageRead !== e ||
        this.oldLastMessageRecalled !== t ||
        this.oldLastMessageStatus !== n
            ? o
                ? Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, o)
                : Zm.i.fire(Vm.MAX_MESSAGE_DELETED, i)
            : this.oldUnreadAmount !== s &&
              Zm.i.fire(Vm.UNREAD_AMOUNT_CHANGED, i);
    }
}
class yg {
    constructor(e, t, n, s) {
        (this.scene = e),
            (this.conversationId = t),
            (this.recaller = n),
            (this.times = s);
    }
}
class vg {
    static init() {
        this.eventCenter = new rm();
    }
    static on(e, t) {
        this.eventCenter.on(e, t);
    }
    static fire(e, t) {
        this.eventCenter.fire(e, t);
    }
    static off(e, t) {
        this.eventCenter.off(e, t);
    }
}
!(function (e) {
    (e.PRIVATE_MESSAGE_RECEIVED = "PRIVATE_MESSAGE_RECEIVED"),
        (e.GROUP_MESSAGE_RECEIVED = "GROUP_MESSAGE_RECEIVED"),
        (e.SYSTEM_MESSAGE_RECEIVED = "SYSTEM_MESSAGE_RECEIVED"),
        (e.CONVERSATIONS_UPDATED = "CONVERSATIONS_UPDATED"),
        (e.USER_PRESENCE = "USER_PRESENCE"),
        (e.GROUP_PRESENCE = "GROUP_PRESENCE"),
        (e.MESSAGE_DELETED = "MESSAGE_DELETED"),
        (e.MESSAGE_READ = "MESSAGE_READ"),
        (e.MESSAGE_RECALLED = "MESSAGE_RECALLED"),
        (e.CS_MESSAGE_RECEIVED = "CS_MESSAGE_RECEIVED"),
        (e.PENDING_CONVERSATIONS_UPDATED = "PENDING_CONVERSATIONS_UPDATED");
})(zm || (zm = {}));
class bg {
    constructor(e) {
        (this.expiredTime = 0),
            (this.remoteHistory = pg.instance),
            (this.target = e),
            (this.userOffsets = new fg()),
            (this.messageCache = new sg(e));
    }
    initMaxMessageAndOffsets(e, t) {
        this.existsMessage(e) ||
            (this.messageCache.saveMessage(e),
            t.forEach((e) => {
                this.markLocalMessagesRead(
                    this.messageCache.all(),
                    e.userId,
                    e.offset,
                    !1
                );
            }));
    }
    existsMessage(e) {
        return this.messageCache.existsMessage(e.messageId);
    }
    loadHistory(e, t) {
        return Of(this, void 0, void 0, function* () {
            return (
                this.expiredTime > 0 &&
                    !this.messageCache.isEmpty() &&
                    (yield this.updateByServerChange()),
                yf.isUndef(t) ? (t = 10) : t > 30 && (t = 30),
                yield this.loadServerMessages(e, t)
            );
        });
    }
    loadServerMessages(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = this.messageCache.loadLocalMessages(t, e);
            if (!1 === this.messageCache.allLoaded && n.length !== t) {
                let s = t - n.length,
                    o = n[0] ? n[0].timestamp : e,
                    i = new mg(
                        this.target.id.toString(),
                        this.target.scene,
                        o,
                        s,
                        this.target.teamId
                    ),
                    r = yield this.remoteHistory.loadServerMessages(
                        this.target,
                        i
                    ),
                    a = r.messages;
                (n = a.concat(n)),
                    this.messageCache.cacheServerMessages(i, a),
                    r.userOffsets.forEach((e) => {
                        this.userOffsets.updateOffset(e.userId, e.offset);
                    }),
                    this.userOffsets.offsetMap.forEach((e, t) => {
                        this.markLocalMessagesRead(a, t, e, !1);
                    });
            }
            return n;
        });
    }
    deleteMessages(e) {
        return Of(this, void 0, void 0, function* () {
            yield this.aopUnreadAmountMaxMessage(() =>
                Of(this, void 0, void 0, function* () {
                    let t = e.messages;
                    yield rg.deleteServerMessages(t),
                        this.messageCache.deleteMessages(t),
                        kf.onSuccess(e);
                })
            );
        });
    }
    syncDeletedMessage(e, t) {
        this.aopUnreadAmountMaxMessage(() => {
            this.doSyncDeletedMessage(e, t);
        });
    }
    doSyncDeletedMessage(e, t) {
        if (e === am.Socket.user().id) {
            let e = this.messageCache.findMessagesByTimes(t);
            this.messageCache.deleteMessages(e),
                e.length > 0 && vg.fire(zm.MESSAGE_DELETED, e);
        }
    }
    recallMessages(e) {
        return Of(this, void 0, void 0, function* () {
            yield this.aopUnreadAmountMaxMessage(() =>
                Of(this, void 0, void 0, function* () {
                    this.doRecall(e);
                })
            );
        });
    }
    doRecall(e) {
        let t = this.messageCache.recallMessage(e);
        t.length > 0 && vg.fire(zm.MESSAGE_RECALLED, t);
    }
    expire() {
        this.messageCache.isEmpty() ||
            (this.expiredTime = this.messageCache.maxSuccessMessageTime());
    }
    updateByServerChange() {
        return Of(this, void 0, void 0, function* () {
            yield this.aopUnreadAmountMaxMessage(() =>
                Of(this, void 0, void 0, function* () {
                    let e = yield this.remoteHistory.sync(
                        this.target.scene,
                        this.target.id,
                        this.expiredTime,
                        this.messageCache.minTime(),
                        this.target.teamId
                    );
                    e.userOffsets.forEach((e) => {
                        this.markLocalMessagesRead(
                            this.messageCache.all(),
                            e.userId,
                            e.offset,
                            !0
                        );
                    });
                    let t = e.deletedMessageTimes;
                    t.length > 0 &&
                        this.doSyncDeletedMessage(am.Socket.user().id, t);
                    let n = e.recalledMessages;
                    n.length > 0 &&
                        n.forEach((e) => {
                            let t = new yg(
                                this.target.scene,
                                this.target.id,
                                e.recaller,
                                e.times
                            );
                            this.doRecall(t);
                        }),
                        (this.expiredTime = 0);
                })
            );
        });
    }
    markRead() {
        return Of(this, void 0, void 0, function* () {
            yield this.aopUnreadAmountMaxMessage(() =>
                Of(this, void 0, void 0, function* () {
                    let e = this.messageCache.maxSuccessMessageTime();
                    e > this.userOffsets.myOffset() &&
                        ((this.userOffsets.markingTime = e),
                        yield this.remoteHistory.updateServerOffsets(
                            e,
                            this.target
                        ),
                        e === this.userOffsets.markingTime &&
                            this.markLocalMessagesRead(
                                this.messageCache.all(),
                                am.Socket.user().id,
                                e,
                                !0
                            ));
                })
            );
        });
    }
    syncMarkedMessage(e) {
        this.aopUnreadAmountMaxMessage(() => {
            this.markLocalMessagesRead(
                this.messageCache.all(),
                e.markerId,
                e.time,
                !0
            );
        });
    }
    onMessageSending(e) {
        this.aopUnreadAmountMaxMessage(() => {
            this.messageCache.saveMessage(e);
        });
    }
    onMessageSendSuccess(e) {
        this.aopUnreadAmountMaxMessage(() => {
            this.messageCache.correctPosition(e),
                this.markLocalMessagesRead(
                    this.messageCache.all(),
                    am.Socket.user().id,
                    e.timestamp,
                    !0
                );
        });
    }
    onMessageSendFailed(e) {
        this.getMaxMessage() === e && Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, e);
    }
    onMessageReceived(e) {
        this.aopUnreadAmountMaxMessage(() => {
            this.messageCache.saveMessage(e),
                this.markLocalMessagesRead(
                    this.messageCache.all(),
                    e.senderId,
                    e.timestamp,
                    !0
                );
        });
    }
    aopUnreadAmountMaxMessage(e, t) {
        return Of(this, void 0, void 0, function* () {
            try {
                let t = new gg(this);
                t.pre(), yield e(), t.post();
            } catch (n) {
                kf.onFailed(t, n);
            }
        });
    }
    markLocalMessagesRead(e, t, n, s) {
        if ((this.userOffsets.updateOffset(t, n), this.isOtherUserId(t))) {
            let t = this.markMySentRead(e, n);
            s && t.length > 0 && vg.fire(zm.MESSAGE_READ, t);
        } else t === am.Socket.user().id && this.markOthersSentRead(e, n);
    }
    markOthersSentRead(e, t) {
        if (this.target.scene === pf.PRIVATE)
            for (let n = e.length - 1; n >= 0; n--) {
                let s = e[n];
                if (s.isOtherSent() && s.timestamp <= t) {
                    if (s.read) break;
                    s.read = !0;
                }
            }
    }
    markMySentRead(e, t) {
        let n = new Array();
        if (this.target.scene === pf.PRIVATE)
            for (let s = e.length - 1; s >= 0; s--) {
                let o = e[s];
                if (
                    !o.isOtherSent() &&
                    o.timestamp <= t &&
                    o.status === ff.SUCCESS
                ) {
                    if (o.read) break;
                    (o.read = !0), n.push(o);
                }
            }
        return n;
    }
    isOtherUserId(e) {
        if (this.target.scene === pf.CS) {
            let t = this.target.customerId();
            return am.Socket.user().id === t
                ? e !== am.Socket.user().id
                : e === t;
        }
        return e !== am.Socket.user().id;
    }
    unreadAmount(e) {
        let t = 0,
            n = this.userOffsets.myOffset(),
            s = this.messageCache.all();
        for (const o of s)
            o.isOtherSent() && !1 === o.recalled && o.timestamp > n && (t += 1);
        return t;
    }
    getMaxMessage(e) {
        return this.messageCache.getMaxMessage();
    }
    maxTime(e) {
        let t = this.getMaxMessage();
        return yf.isDef(t) ? t.timestamp : 0;
    }
}
class Sg {
    constructor(e, t) {
        (this.teamId = e), (this.customerId = t);
    }
}
class Eg {}
class wg {
    constructor(e, t, n) {
        (this.teamId = e),
            (this.teamData = JSON.stringify(t)),
            (this.agentData = JSON.stringify(n));
    }
}
class Cg {
    constructor(e) {
        this.teamId = e;
    }
}
class _g {
    constructor(e) {
        this.teamId = e;
    }
}
var Mg = { exports: {} },
    Tg =
        /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    Ig = [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor",
    ],
    kg = function (e) {
        var t = e,
            n = e.indexOf("["),
            s = e.indexOf("]");
        -1 != n &&
            -1 != s &&
            (e =
                e.substring(0, n) +
                e.substring(n, s).replace(/:/g, ";") +
                e.substring(s, e.length));
        for (var o = Tg.exec(e || ""), i = {}, r = 14; r--; )
            i[Ig[r]] = o[r] || "";
        return (
            -1 != n &&
                -1 != s &&
                ((i.source = t),
                (i.host = i.host
                    .substring(1, i.host.length - 1)
                    .replace(/;/g, ":")),
                (i.authority = i.authority
                    .replace("[", "")
                    .replace("]", "")
                    .replace(/;/g, ":")),
                (i.ipv6uri = !0)),
            i
        );
    },
    Og = { exports: {} },
    Ng = { exports: {} },
    xg = 1e3,
    Ag = 6e4,
    Rg = 60 * Ag,
    Pg = 24 * Rg,
    Dg = function (e, t) {
        t = t || {};
        var n,
            s = typeof e;
        if ("string" === s && e.length > 0)
            return (function (e) {
                if (!((e = String(e)).length > 100)) {
                    var t =
                        /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                            e
                        );
                    if (t) {
                        var n = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return 315576e5 * n;
                            case "days":
                            case "day":
                            case "d":
                                return n * Pg;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return n * Rg;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return n * Ag;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return n * xg;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return n;
                            default:
                                return;
                        }
                    }
                }
            })(e);
        if ("number" === s && !1 === isNaN(e))
            return t.long
                ? Lg((n = e), Pg, "day") ||
                      Lg(n, Rg, "hour") ||
                      Lg(n, Ag, "minute") ||
                      Lg(n, xg, "second") ||
                      n + " ms"
                : (function (e) {
                      return e >= Pg
                          ? Math.round(e / Pg) + "d"
                          : e >= Rg
                          ? Math.round(e / Rg) + "h"
                          : e >= Ag
                          ? Math.round(e / Ag) + "m"
                          : e >= xg
                          ? Math.round(e / xg) + "s"
                          : e + "ms";
                  })(e);
        throw new Error(
            "val is not a non-empty string or a valid number. val=" +
                JSON.stringify(e)
        );
    };
function Lg(e, t, n) {
    if (!(e < t))
        return e < 1.5 * t
            ? Math.floor(e / t) + " " + n
            : Math.ceil(e / t) + " " + n + "s";
}
!(function (e, t) {
    function n(e) {
        var n;
        function o() {
            if (o.enabled) {
                var e = o,
                    s = +new Date(),
                    i = s - (n || s);
                (e.diff = i), (e.prev = n), (e.curr = s), (n = s);
                for (
                    var r = new Array(arguments.length), a = 0;
                    a < r.length;
                    a++
                )
                    r[a] = arguments[a];
                (r[0] = t.coerce(r[0])),
                    "string" != typeof r[0] && r.unshift("%O");
                var c = 0;
                (r[0] = r[0].replace(/%([a-zA-Z%])/g, function (n, s) {
                    if ("%%" === n) return n;
                    c++;
                    var o = t.formatters[s];
                    if ("function" == typeof o) {
                        var i = r[c];
                        (n = o.call(e, i)), r.splice(c, 1), c--;
                    }
                    return n;
                })),
                    t.formatArgs.call(e, r),
                    (o.log || t.log || console.log.bind(console)).apply(e, r);
            }
        }
        return (
            (o.namespace = e),
            (o.enabled = t.enabled(e)),
            (o.useColors = t.useColors()),
            (o.color = (function (e) {
                var n,
                    s = 0;
                for (n in e) (s = (s << 5) - s + e.charCodeAt(n)), (s |= 0);
                return t.colors[Math.abs(s) % t.colors.length];
            })(e)),
            (o.destroy = s),
            "function" == typeof t.init && t.init(o),
            t.instances.push(o),
            o
        );
    }
    function s() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
    }
    ((t = Ng.exports = n.debug = n.default = n).coerce = function (e) {
        return e instanceof Error ? e.stack || e.message : e;
    }),
        (t.disable = function () {
            t.enable("");
        }),
        (t.enable = function (e) {
            var n;
            t.save(e), (t.names = []), (t.skips = []);
            var s = ("string" == typeof e ? e : "").split(/[\s,]+/),
                o = s.length;
            for (n = 0; n < o; n++)
                s[n] &&
                    ("-" === (e = s[n].replace(/\*/g, ".*?"))[0]
                        ? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
                        : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var i = t.instances[n];
                i.enabled = t.enabled(i.namespace);
            }
        }),
        (t.enabled = function (e) {
            if ("*" === e[e.length - 1]) return !0;
            var n, s;
            for (n = 0, s = t.skips.length; n < s; n++)
                if (t.skips[n].test(e)) return !1;
            for (n = 0, s = t.names.length; n < s; n++)
                if (t.names[n].test(e)) return !0;
            return !1;
        }),
        (t.humanize = Dg),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {});
})(0, Ng.exports),
    (function (e, t) {
        function n() {
            var e;
            try {
                e = t.storage.debug;
            } catch (n) {}
            return (
                !e &&
                    "undefined" != typeof process &&
                    "env" in process &&
                    (e = {}.DEBUG),
                e
            );
        }
        ((t = e.exports = Ng.exports).log = function () {
            return (
                "object" == typeof console &&
                console.log &&
                Function.prototype.apply.call(console.log, console, arguments)
            );
        }),
            (t.formatArgs = function (e) {
                var n = this.useColors;
                if (
                    ((e[0] =
                        (n ? "%c" : "") +
                        this.namespace +
                        (n ? " %c" : " ") +
                        e[0] +
                        (n ? "%c " : " ") +
                        "+" +
                        t.humanize(this.diff)),
                    n)
                ) {
                    var s = "color: " + this.color;
                    e.splice(1, 0, s, "color: inherit");
                    var o = 0,
                        i = 0;
                    e[0].replace(/%[a-zA-Z%]/g, function (e) {
                        "%%" !== e && (o++, "%c" === e && (i = o));
                    }),
                        e.splice(i, 0, s);
                }
            }),
            (t.save = function (e) {
                try {
                    null == e
                        ? t.storage.removeItem("debug")
                        : (t.storage.debug = e);
                } catch (n) {}
            }),
            (t.load = n),
            (t.useColors = function () {
                return (
                    !(
                        "undefined" == typeof window ||
                        !window.process ||
                        "renderer" !== window.process.type
                    ) ||
                    (("undefined" == typeof navigator ||
                        !navigator.userAgent ||
                        !navigator.userAgent
                            .toLowerCase()
                            .match(/(edge|trident)\/(\d+)/)) &&
                        (("undefined" != typeof document &&
                            document.documentElement &&
                            document.documentElement.style &&
                            document.documentElement.style.WebkitAppearance) ||
                            ("undefined" != typeof window &&
                                window.console &&
                                (window.console.firebug ||
                                    (window.console.exception &&
                                        window.console.table))) ||
                            ("undefined" != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/firefox\/(\d+)/) &&
                                parseInt(RegExp.$1, 10) >= 31) ||
                            ("undefined" != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/applewebkit\/(\d+)/))))
                );
            }),
            (t.storage =
                "undefined" != typeof chrome && void 0 !== chrome.storage
                    ? chrome.storage.local
                    : (function () {
                          try {
                              return window.localStorage;
                          } catch (e) {}
                      })()),
            (t.colors = [
                "#0000CC",
                "#0000FF",
                "#0033CC",
                "#0033FF",
                "#0066CC",
                "#0066FF",
                "#0099CC",
                "#0099FF",
                "#00CC00",
                "#00CC33",
                "#00CC66",
                "#00CC99",
                "#00CCCC",
                "#00CCFF",
                "#3300CC",
                "#3300FF",
                "#3333CC",
                "#3333FF",
                "#3366CC",
                "#3366FF",
                "#3399CC",
                "#3399FF",
                "#33CC00",
                "#33CC33",
                "#33CC66",
                "#33CC99",
                "#33CCCC",
                "#33CCFF",
                "#6600CC",
                "#6600FF",
                "#6633CC",
                "#6633FF",
                "#66CC00",
                "#66CC33",
                "#9900CC",
                "#9900FF",
                "#9933CC",
                "#9933FF",
                "#99CC00",
                "#99CC33",
                "#CC0000",
                "#CC0033",
                "#CC0066",
                "#CC0099",
                "#CC00CC",
                "#CC00FF",
                "#CC3300",
                "#CC3333",
                "#CC3366",
                "#CC3399",
                "#CC33CC",
                "#CC33FF",
                "#CC6600",
                "#CC6633",
                "#CC9900",
                "#CC9933",
                "#CCCC00",
                "#CCCC33",
                "#FF0000",
                "#FF0033",
                "#FF0066",
                "#FF0099",
                "#FF00CC",
                "#FF00FF",
                "#FF3300",
                "#FF3333",
                "#FF3366",
                "#FF3399",
                "#FF33CC",
                "#FF33FF",
                "#FF6600",
                "#FF6633",
                "#FF9900",
                "#FF9933",
                "#FFCC00",
                "#FFCC33",
            ]),
            (t.formatters.j = function (e) {
                try {
                    return JSON.stringify(e);
                } catch (t) {
                    return "[UnexpectedJSONParseError]: " + t.message;
                }
            }),
            t.enable(n());
    })(Og, Og.exports);
var Fg = kg,
    Ug = Og.exports("socket.io-client:url"),
    Bg = function (e, t) {
        var n = e;
        (t = t || ("undefined" != typeof location && location)),
            null == e && (e = t.protocol + "//" + t.host),
            "string" == typeof e &&
                ("/" === e.charAt(0) &&
                    (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e),
                /^(https?|wss?):\/\//.test(e) ||
                    (Ug("protocol-less url %s", e),
                    (e =
                        void 0 !== t ? t.protocol + "//" + e : "https://" + e)),
                Ug("parse %s", e),
                (n = Fg(e))),
            n.port ||
                (/^(http|ws)$/.test(n.protocol)
                    ? (n.port = "80")
                    : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
            (n.path = n.path || "/");
        var s = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return (
            (n.id = n.protocol + "://" + s + ":" + n.port),
            (n.href =
                n.protocol +
                "://" +
                s +
                (t && t.port === n.port ? "" : ":" + n.port)),
            n
        );
    },
    jg = {},
    Gg = {}.toString,
    $g =
        Array.isArray ||
        function (e) {
            return "[object Array]" == Gg.call(e);
        };
!(function (e) {
    Og.exports("socket.io-parser");
    var t = Af.exports,
        n = $g;
    function s() {}
    (e.protocol = 4),
        (e.types = [
            "CONNECT",
            "DISCONNECT",
            "EVENT",
            "ACK",
            "ERROR",
            "BINARY_EVENT",
            "BINARY_ACK",
        ]),
        (e.CONNECT = 0),
        (e.DISCONNECT = 1),
        (e.EVENT = 2),
        (e.ACK = 3),
        (e.ERROR = 4),
        (e.BINARY_EVENT = 5),
        (e.BINARY_ACK = 6),
        (e.Encoder = s),
        (e.Decoder = i);
    var o = e.ERROR + '"encode error"';
    function i() {
        this.reconstructor = null;
    }
    function r(t) {
        return { type: e.ERROR, data: "parser error: " + t };
    }
    (s.prototype.encode = function (t, n) {
        n([
            (function (t) {
                var n = "" + t.type;
                if (
                    ((e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type) ||
                        (n += t.attachments + "-"),
                    t.nsp && "/" !== t.nsp && (n += t.nsp + ","),
                    null != t.id && (n += t.id),
                    null != t.data)
                ) {
                    var s = (function (e) {
                        try {
                            return JSON.stringify(e);
                        } catch (t) {
                            return !1;
                        }
                    })(t.data);
                    if (!1 === s) return o;
                    n += s;
                }
                return n;
            })(t),
        ]);
    }),
        t(i.prototype),
        (i.prototype.add = function (t) {
            var s;
            if ("string" != typeof t) throw new Error("Unknown type: " + t);
            (s = (function (t) {
                var s = 0,
                    o = { type: Number(t.charAt(0)) };
                if (null == e.types[o.type])
                    return r("unknown packet type " + o.type);
                if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
                    for (
                        var i = "";
                        "-" !== t.charAt(++s) &&
                        ((i += t.charAt(s)), s != t.length);

                    );
                    if (i != Number(i) || "-" !== t.charAt(s))
                        throw new Error("Illegal attachments");
                    o.attachments = Number(i);
                }
                if ("/" === t.charAt(s + 1))
                    for (
                        o.nsp = "";
                        ++s &&
                        "," !== (c = t.charAt(s)) &&
                        ((o.nsp += c), s !== t.length);

                    );
                else o.nsp = "/";
                var a = t.charAt(s + 1);
                if ("" !== a && Number(a) == a) {
                    for (o.id = ""; ++s; ) {
                        var c;
                        if (null == (c = t.charAt(s)) || Number(c) != c) {
                            --s;
                            break;
                        }
                        if (((o.id += t.charAt(s)), s === t.length)) break;
                    }
                    o.id = Number(o.id);
                }
                if (t.charAt(++s)) {
                    var l = (function (e) {
                        try {
                            return JSON.parse(e);
                        } catch (t) {
                            return !1;
                        }
                    })(t.substr(s));
                    if (!1 === l || (o.type !== e.ERROR && !n(l)))
                        return r("invalid payload");
                    o.data = l;
                }
                return o;
            })(t)),
                this.emit("decoded", s);
        }),
        (i.prototype.destroy = function () {
            this.reconstructor && this.reconstructor.finishedReconstruction();
        });
})(jg);
var qg = { exports: {} },
    Vg = {},
    Hg = {},
    Wg =
        Object.keys ||
        function (e) {
            var t = [],
                n = Object.prototype.hasOwnProperty;
            for (var s in e) n.call(e, s) && t.push(s);
            return t;
        },
    zg = $g,
    Xg = Object.prototype.toString,
    Jg =
        "function" == typeof Blob ||
        ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === Xg.call(Blob)),
    Kg =
        "function" == typeof File ||
        ("undefined" != typeof File &&
            "[object FileConstructor]" === Xg.call(File)),
    Yg = function e(t) {
        if (!t || "object" != typeof t) return !1;
        if (zg(t)) {
            for (var n = 0, s = t.length; n < s; n++) if (e(t[n])) return !0;
            return !1;
        }
        if (
            ("function" == typeof Buffer &&
                Buffer.isBuffer &&
                Buffer.isBuffer(t)) ||
            ("function" == typeof ArrayBuffer && t instanceof ArrayBuffer) ||
            (Jg && t instanceof Blob) ||
            (Kg && t instanceof File)
        )
            return !0;
        if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length)
            return e(t.toJSON(), !0);
        for (var o in t)
            if (Object.prototype.hasOwnProperty.call(t, o) && e(t[o]))
                return !0;
        return !1;
    },
    Qg = function (e, t, n) {
        var s = !1;
        return (n = n || Zg), (o.count = e), 0 === e ? t() : o;
        function o(e, i) {
            if (o.count <= 0) throw new Error("after called too many times");
            --o.count,
                e
                    ? ((s = !0), t(e), (t = n))
                    : 0 !== o.count || s || t(null, i);
        }
    };
function Zg() {}
var ey,
    ty,
    ny,
    sy = String.fromCharCode;
function oy(e) {
    for (var t, n, s = [], o = 0, i = e.length; o < i; )
        (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
            ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                ? s.push(((1023 & t) << 10) + (1023 & n) + 65536)
                : (s.push(t), o--)
            : s.push(t);
    return s;
}
function iy(e, t) {
    if (e >= 55296 && e <= 57343) {
        if (t)
            throw Error(
                "Lone surrogate U+" +
                    e.toString(16).toUpperCase() +
                    " is not a scalar value"
            );
        return !1;
    }
    return !0;
}
function ry(e, t) {
    return sy(((e >> t) & 63) | 128);
}
function ay(e, t) {
    if (0 == (4294967168 & e)) return sy(e);
    var n = "";
    return (
        0 == (4294965248 & e)
            ? (n = sy(((e >> 6) & 31) | 192))
            : 0 == (4294901760 & e)
            ? (iy(e, t) || (e = 65533),
              (n = sy(((e >> 12) & 15) | 224)),
              (n += ry(e, 6)))
            : 0 == (4292870144 & e) &&
              ((n = sy(((e >> 18) & 7) | 240)),
              (n += ry(e, 12)),
              (n += ry(e, 6))),
        n + sy((63 & e) | 128)
    );
}
function cy() {
    if (ny >= ty) throw Error("Invalid byte index");
    var e = 255 & ey[ny];
    if ((ny++, 128 == (192 & e))) return 63 & e;
    throw Error("Invalid continuation byte");
}
function ly(e) {
    var t, n;
    if (ny > ty) throw Error("Invalid byte index");
    if (ny == ty) return !1;
    if (((t = 255 & ey[ny]), ny++, 0 == (128 & t))) return t;
    if (192 == (224 & t)) {
        if ((n = ((31 & t) << 6) | cy()) >= 128) return n;
        throw Error("Invalid continuation byte");
    }
    if (224 == (240 & t)) {
        if ((n = ((15 & t) << 12) | (cy() << 6) | cy()) >= 2048)
            return iy(n, e) ? n : 65533;
        throw Error("Invalid continuation byte");
    }
    if (
        240 == (248 & t) &&
        (n = ((7 & t) << 18) | (cy() << 12) | (cy() << 6) | cy()) >= 65536 &&
        n <= 1114111
    )
        return n;
    throw Error("Invalid UTF-8 detected");
}
var uy = {
        version: "2.1.2",
        encode: function (e, t) {
            for (
                var n = !1 !== (t = t || {}).strict,
                    s = oy(e),
                    o = s.length,
                    i = -1,
                    r = "";
                ++i < o;

            )
                r += ay(s[i], n);
            return r;
        },
        decode: function (e, t) {
            var n = !1 !== (t = t || {}).strict;
            (ey = oy(e)), (ty = ey.length), (ny = 0);
            for (var s, o = []; !1 !== (s = ly(n)); ) o.push(s);
            return (function (e) {
                for (var t, n = e.length, s = -1, o = ""; ++s < n; )
                    (t = e[s]) > 65535 &&
                        ((o += sy((((t -= 65536) >>> 10) & 1023) | 55296)),
                        (t = 56320 | (1023 & t))),
                        (o += sy(t));
                return o;
            })(o);
        },
    },
    dy =
        void 0 !== dy
            ? dy
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : "undefined" != typeof MSBlobBuilder
            ? MSBlobBuilder
            : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
    hy = (function () {
        try {
            return 2 === new Blob(["hi"]).size;
        } catch (lf) {
            return !1;
        }
    })(),
    py =
        hy &&
        (function () {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size;
            } catch (lf) {
                return !1;
            }
        })(),
    fy = dy && dy.prototype.append && dy.prototype.getBlob;
function gy(e) {
    return e.map(function (e) {
        if (e.buffer instanceof ArrayBuffer) {
            var t = e.buffer;
            if (e.byteLength !== t.byteLength) {
                var n = new Uint8Array(e.byteLength);
                n.set(new Uint8Array(t, e.byteOffset, e.byteLength)),
                    (t = n.buffer);
            }
            return t;
        }
        return e;
    });
}
function yy(e, t) {
    t = t || {};
    var n = new dy();
    return (
        gy(e).forEach(function (e) {
            n.append(e);
        }),
        t.type ? n.getBlob(t.type) : n.getBlob()
    );
}
function vy(e, t) {
    return new Blob(gy(e), t || {});
}
"undefined" != typeof Blob &&
    ((yy.prototype = Blob.prototype), (vy.prototype = Blob.prototype));
var by = hy ? (py ? Blob : vy) : fy ? yy : void 0;
!(function (e) {
    var t = Wg,
        n = Yg,
        s = Qg,
        o = uy;
    e.protocol = 3;
    var i = (e.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6,
        }),
        r = t(i),
        a = { type: "error", data: "parser error" },
        c = by;
    (e.encodePacket = function (e, t, n, s) {
        "function" == typeof t && ((s = t), (t = !1)),
            "function" == typeof n && ((s = n), (n = null)),
            void 0 === e.data || e.data.buffer || e.data;
        var r = i[e.type];
        return (
            void 0 !== e.data &&
                (r += n
                    ? o.encode(String(e.data), { strict: !1 })
                    : String(e.data)),
            s("" + r)
        );
    }),
        (e.decodePacket = function (e, t, n) {
            if (void 0 === e) return a;
            if ("string" == typeof e) {
                if (
                    n &&
                    !1 ===
                        (e = (function (e) {
                            try {
                                e = o.decode(e, { strict: !1 });
                            } catch (t) {
                                return !1;
                            }
                            return e;
                        })(e))
                )
                    return a;
                var s = e.charAt(0);
                return Number(s) == s && r[s]
                    ? e.length > 1
                        ? { type: r[s], data: e.substring(1) }
                        : { type: r[s] }
                    : a;
            }
            s = new Uint8Array(e)[0];
            var i = sliceBuffer(e, 1);
            return (
                c && "blob" === t && (i = new c([i])), { type: r[s], data: i }
            );
        }),
        (e.encodePayload = function (t, o, i) {
            "function" == typeof o && ((i = o), (o = null));
            var r = n(t);
            if (!t.length) return i("0:");
            !(function (t, n, a) {
                for (
                    var c = new Array(t.length),
                        l = s(t.length, function (e, t) {
                            return i(t.join(""));
                        }),
                        u = function (t, n, s) {
                            !(function (t, n) {
                                e.encodePacket(t, !!r && o, !0, function (e) {
                                    n(
                                        null,
                                        (function (e) {
                                            return e.length + ":" + e;
                                        })(e)
                                    );
                                });
                            })(n, function (e, n) {
                                (c[t] = n), s(e, c);
                            });
                        },
                        d = 0;
                    d < t.length;
                    d++
                )
                    u(d, t[d], l);
            })(t);
        }),
        (e.decodePayload = function (t, n, s) {
            var o;
            if (("function" == typeof n && ((s = n), (n = null)), "" === t))
                return s(a, 0, 1);
            for (var i, r, c = "", l = 0, u = t.length; l < u; l++) {
                var d = t.charAt(l);
                if (":" === d) {
                    if ("" === c || c != (i = Number(c))) return s(a, 0, 1);
                    if (c != (r = t.substr(l + 1, i)).length) return s(a, 0, 1);
                    if (r.length) {
                        if (
                            ((o = e.decodePacket(r, n, !0)),
                            a.type === o.type && a.data === o.data)
                        )
                            return s(a, 0, 1);
                        if (!1 === s(o, l + i, u)) return;
                    }
                    (l += i), (c = "");
                } else c += d;
            }
            return "" !== c ? s(a, 0, 1) : void 0;
        });
})(Hg);
var Sy = Hg,
    Ey = wy;
function wy(e) {
    (this.path = e.path),
        (this.hostname = e.hostname),
        (this.port = e.port),
        (this.secure = e.secure),
        (this.query = e.query),
        (this.timestampParam = e.timestampParam),
        (this.timestampRequests = e.timestampRequests),
        (this.readyState = ""),
        (this.agent = e.agent || !1),
        (this.socket = e.socket),
        (this.enablesXDR = e.enablesXDR),
        (this.pfx = e.pfx),
        (this.key = e.key),
        (this.passphrase = e.passphrase),
        (this.cert = e.cert),
        (this.ca = e.ca),
        (this.ciphers = e.ciphers),
        (this.rejectUnauthorized = e.rejectUnauthorized),
        (this.forceNode = e.forceNode),
        (this.isReactNative = e.isReactNative),
        (this.extraHeaders = e.extraHeaders),
        (this.localAddress = e.localAddress);
}
(0, Af.exports)(wy.prototype),
    (wy.prototype.onError = function (e, t) {
        var n = new Error(e);
        return (
            (n.type = "TransportError"),
            (n.description = t),
            this.emit("error", n),
            this
        );
    }),
    (wy.prototype.open = function () {
        return (
            ("closed" !== this.readyState && "" !== this.readyState) ||
                ((this.readyState = "opening"), this.doOpen()),
            this
        );
    }),
    (wy.prototype.close = function () {
        return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
                (this.doClose(), this.onClose()),
            this
        );
    }),
    (wy.prototype.send = function (e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e);
    }),
    (wy.prototype.onOpen = function () {
        (this.readyState = "open"), (this.writable = !0), this.emit("open");
    }),
    (wy.prototype.onData = function (e) {
        var t = Sy.decodePacket(e, this.socket.binaryType);
        this.onPacket(t);
    }),
    (wy.prototype.onPacket = function (e) {
        this.emit("packet", e);
    }),
    (wy.prototype.onClose = function () {
        (this.readyState = "closed"), this.emit("close");
    });
var Cy,
    _y = {
        encode: function (e) {
            var t = "";
            for (var n in e)
                e.hasOwnProperty(n) &&
                    (t.length && (t += "&"),
                    (t +=
                        encodeURIComponent(n) +
                        "=" +
                        encodeURIComponent(e[n])));
            return t;
        },
        decode: function (e) {
            for (
                var t = {}, n = e.split("&"), s = 0, o = n.length;
                s < o;
                s++
            ) {
                var i = n[s].split("=");
                t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
            }
            return t;
        },
    },
    My = function (e, t) {
        var n = function () {};
        (n.prototype = t.prototype),
            (e.prototype = new n()),
            (e.prototype.constructor = e);
    },
    Ty =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
        ),
    Iy = {},
    ky = 0,
    Oy = 0;
function Ny(e) {
    var t = "";
    do {
        (t = Ty[e % 64] + t), (e = Math.floor(e / 64));
    } while (e > 0);
    return t;
}
function xy() {
    var e = Ny(+new Date());
    return e !== Cy ? ((ky = 0), (Cy = e)) : e + "." + Ny(ky++);
}
for (; Oy < 64; Oy++) Iy[Ty[Oy]] = Oy;
(xy.encode = Ny),
    (xy.decode = function (e) {
        var t = 0;
        for (Oy = 0; Oy < e.length; Oy++) t = 64 * t + Iy[e.charAt(Oy)];
        return t;
    });
var Ay = xy,
    Ry = { exports: {} };
try {
    Ry.exports =
        "undefined" != typeof XMLHttpRequest &&
        "withCredentials" in new XMLHttpRequest();
} catch (lf) {
    Ry.exports = !1;
}
var Py = Ry.exports,
    Dy = Ey,
    Ly = _y,
    Fy = Hg,
    Uy = My,
    By = Ay,
    jy = Og.exports("engine.io-client:polling"),
    Gy = qy,
    $y =
        null !=
        new (function (e) {
            var t = e.xdomain,
                n = e.xscheme,
                s = e.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!t || Py))
                    return new XMLHttpRequest();
            } catch (o) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && s)
                    return new XDomainRequest();
            } catch (o) {}
            if (!t)
                try {
                    return new self[["Active"].concat("Object").join("X")](
                        "Microsoft.XMLHTTP"
                    );
                } catch (o) {}
        })({ xdomain: !1 }).responseType;
function qy(e) {
    var t = e && e.forceBase64;
    ($y && !t) || (this.supportsBinary = !1), Dy.call(this, e);
}
Uy(qy, Dy),
    (qy.prototype.name = "polling"),
    (qy.prototype.doOpen = function () {
        this.poll();
    }),
    (qy.prototype.pause = function (e) {
        var t = this;
        function n() {
            jy("paused"), (t.readyState = "paused"), e();
        }
        if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            var s = 0;
            this.polling &&
                (jy("we are currently polling - waiting to pause"),
                s++,
                this.once("pollComplete", function () {
                    jy("pre-pause polling complete"), --s || n();
                })),
                this.writable ||
                    (jy("we are currently writing - waiting to pause"),
                    s++,
                    this.once("drain", function () {
                        jy("pre-pause writing complete"), --s || n();
                    }));
        } else n();
    }),
    (qy.prototype.poll = function () {
        jy("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
    }),
    (qy.prototype.onData = function (e) {
        var t = this;
        jy("polling got data %s", e),
            Fy.decodePayload(e, this.socket.binaryType, function (e, n, s) {
                if (
                    ("opening" === t.readyState && t.onOpen(),
                    "close" === e.type)
                )
                    return t.onClose(), !1;
                t.onPacket(e);
            }),
            "closed" !== this.readyState &&
                ((this.polling = !1),
                this.emit("pollComplete"),
                "open" === this.readyState
                    ? this.poll()
                    : jy(
                          'ignoring poll - transport state "%s"',
                          this.readyState
                      ));
    }),
    (qy.prototype.doClose = function () {
        var e = this;
        function t() {
            jy("writing close packet"), e.write([{ type: "close" }]);
        }
        "open" === this.readyState
            ? (jy("transport open - closing"), t())
            : (jy("transport not open - deferring close"),
              this.once("open", t));
    }),
    (qy.prototype.write = function (e) {
        var t = this;
        this.writable = !1;
        var n = function () {
            (t.writable = !0), t.emit("drain");
        };
        Fy.encodePayload(e, this.supportsBinary, function (e) {
            t.doWrite(e, n);
        });
    }),
    (qy.prototype.uri = function () {
        var e = this.query || {},
            t = this.secure ? "https" : "http",
            n = "";
        return (
            !1 !== this.timestampRequests && (e[this.timestampParam] = By()),
            this.supportsBinary || e.sid || (e.b64 = 1),
            (e = Ly.encode(e)),
            this.port &&
                (("https" === t && 443 !== Number(this.port)) ||
                    ("http" === t && 80 !== Number(this.port))) &&
                (n = ":" + this.port),
            e.length && (e = "?" + e),
            t +
                "://" +
                (-1 !== this.hostname.indexOf(":")
                    ? "[" + this.hostname + "]"
                    : this.hostname) +
                n +
                this.path +
                e
        );
    });
var Vy,
    Hy = Gy,
    Wy = Ky,
    zy = /\n/g,
    Xy = /\\n/g;
function Jy() {}
function Ky(e) {
    if ((Hy.call(this, e), (this.query = this.query || {}), !Vy)) {
        var t =
            "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : void 0 !== Nf
                ? Nf
                : {};
        Vy = t.___eio = t.___eio || [];
    }
    this.index = Vy.length;
    var n = this;
    Vy.push(function (e) {
        n.onData(e);
    }),
        (this.query.j = this.index),
        "function" == typeof addEventListener &&
            addEventListener(
                "beforeunload",
                function () {
                    n.script && (n.script.onerror = Jy);
                },
                !1
            );
}
My(Ky, Hy),
    (Ky.prototype.supportsBinary = !1),
    (Ky.prototype.doClose = function () {
        this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            this.form &&
                (this.form.parentNode.removeChild(this.form),
                (this.form = null),
                (this.iframe = null)),
            Hy.prototype.doClose.call(this);
    }),
    (Ky.prototype.doPoll = function () {
        var e = this,
            t = document.createElement("script");
        this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            (t.async = !0),
            (t.src = this.uri()),
            (t.onerror = function (t) {
                e.onError("jsonp poll error", t);
            });
        var n = document.getElementsByTagName("script")[0];
        n
            ? n.parentNode.insertBefore(t, n)
            : (document.head || document.body).appendChild(t),
            (this.script = t),
            "undefined" != typeof navigator &&
                /gecko/i.test(navigator.userAgent) &&
                setTimeout(function () {
                    var e = document.createElement("iframe");
                    document.body.appendChild(e), document.body.removeChild(e);
                }, 100);
    }),
    (Ky.prototype.doWrite = function (e, t) {
        var n = this;
        if (!this.form) {
            var s,
                o = document.createElement("form"),
                i = document.createElement("textarea"),
                r = (this.iframeId = "eio_iframe_" + this.index);
            (o.className = "socketio"),
                (o.style.position = "absolute"),
                (o.style.top = "-1000px"),
                (o.style.left = "-1000px"),
                (o.target = r),
                (o.method = "POST"),
                o.setAttribute("accept-charset", "utf-8"),
                (i.name = "d"),
                o.appendChild(i),
                document.body.appendChild(o),
                (this.form = o),
                (this.area = i);
        }
        function a() {
            c(), t();
        }
        function c() {
            if (n.iframe)
                try {
                    n.form.removeChild(n.iframe);
                } catch (t) {
                    n.onError("jsonp polling iframe removal error", t);
                }
            try {
                var e = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                s = document.createElement(e);
            } catch (t) {
                ((s = document.createElement("iframe")).name = n.iframeId),
                    (s.src = "javascript:0");
            }
            (s.id = n.iframeId), n.form.appendChild(s), (n.iframe = s);
        }
        (this.form.action = this.uri()),
            c(),
            (e = e.replace(Xy, "\\\n")),
            (this.area.value = e.replace(zy, "\\n"));
        try {
            this.form.submit();
        } catch (l) {}
        this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function () {
                  "complete" === n.iframe.readyState && a();
              })
            : (this.iframe.onload = a);
    });
var Yy,
    Qy = Ey,
    Zy = Hg,
    ev = _y,
    tv = My,
    nv = Ay,
    sv = Og.exports("engine.io-client:websocket");
(("undefined" == typeof uni &&
    "undefined" == typeof wx &&
    "undefined" == typeof my) ||
    "undefined" != typeof WebSocket) &&
    ("undefined" != typeof WebSocket
        ? (Yy = WebSocket)
        : "undefined" != typeof self &&
          (Yy = self.WebSocket || self.MozWebSocket));
var ov = Yy || undefined;
((("undefined" == typeof uni &&
    "undefined" == typeof wx &&
    "undefined" == typeof my) ||
    "undefined" != typeof WebSocket) &&
    "undefined" == typeof GameGlobal) ||
    (ov = function (e) {
        var t = this;
        if (
            ((t.onopen = function () {}),
            (t.onclose = function () {}),
            (t.onmessage = function (e) {}),
            (t.onerror = function (e) {}),
            "object" == typeof tt && tt.getSystemInfo)
        ) {
            let n = tt.connectSocket({ url: e });
            (t.send = function (e) {
                n.send({ data: e });
            }),
                (t.close = function () {
                    n.close();
                }),
                n.onOpen(function () {
                    t.onopen();
                }),
                n.onError(function (e) {
                    t.onerror(e);
                }),
                n.onMessage(function (e) {
                    t.onmessage(e);
                }),
                n.onClose(function () {
                    t.onclose();
                });
        } else if ("undefined" != typeof my)
            my.connectSocket({ url: e }),
                (t.send = function (e) {
                    my.sendSocketMessage({ data: e });
                }),
                (t.close = function (e) {
                    my.closeSocket();
                }),
                my.onSocketOpen(function (e) {
                    t.onopen();
                }),
                my.onSocketError(function (e) {
                    t.onerror(e);
                }),
                my.onSocketMessage(function (e) {
                    t.onmessage(e);
                }),
                my.onSocketClose((e) => {
                    t.onclose(e);
                });
        else if ("undefined" != typeof uni)
            if ("undefined" != typeof my)
                my.connectSocket({ url: e }),
                    (t.send = function (e) {
                        my.sendSocketMessage({ data: e });
                    }),
                    (t.close = function (e) {
                        my.closeSocket();
                    }),
                    my.onSocketOpen(function (e) {
                        t.onopen();
                    }),
                    my.onSocketError(function (e) {
                        t.onerror(e);
                    }),
                    my.onSocketMessage(function (e) {
                        t.onmessage(e);
                    }),
                    my.onSocketClose((e) => {
                        t.onclose(e);
                    });
            else {
                var n = Ep({ url: e, complete: () => {} });
                (t.send = function (e) {
                    n.send({ data: e });
                }),
                    (t.close = function () {
                        n.close();
                    }),
                    n.onOpen(function (e) {
                        t.onopen();
                    }),
                    n.onError(function (e) {
                        t.onerror(e);
                    }),
                    n.onMessage(function (e) {
                        t.onmessage(e);
                    }),
                    n.onClose(function (e) {
                        t.onclose();
                    });
            }
        else {
            var s = Ep({ url: e });
            (t.send = function (e) {
                s.send({ data: e });
            }),
                (t.close = function (e) {
                    s.close({ code: 1e3 });
                }),
                s.onOpen(function () {
                    t.onopen();
                }),
                s.onError(function (e) {
                    t.onerror(e);
                }),
                s.onMessage(function (e) {
                    t.onmessage(e);
                }),
                s.onClose(function (e) {
                    t.onclose(e);
                });
        }
    });
var iv = rv;
function rv(e) {
    e && e.forceBase64 && (this.supportsBinary = !1),
        (("undefined" == typeof uni &&
            "undefined" == typeof wx &&
            "undefined" == typeof my) ||
            "undefined" != typeof WebSocket) &&
            ((this.perMessageDeflate = e.perMessageDeflate),
            (this.usingBrowserWebSocket = Yy && !e.forceNode),
            (this.protocols = e.protocols),
            this.usingBrowserWebSocket || (ov = undefined)),
        Qy.call(this, e);
}
tv(rv, Qy),
    (rv.prototype.name = "websocket"),
    (rv.prototype.supportsBinary = !1),
    (rv.prototype.doOpen = function () {
        if (this.check()) {
            var e,
                t,
                n = this.uri();
            (("undefined" == typeof uni &&
                "undefined" == typeof wx &&
                "undefined" == typeof my) ||
                "undefined" != typeof WebSocket) &&
                (e = this.protocols),
                ((t =
                    ("undefined" != typeof uni ||
                        ("undefined" != typeof wx &&
                            "undefined" != typeof my)) &&
                    "undefined" == typeof WebSocket
                        ? { agent: this.agent }
                        : {
                              agent: this.agent,
                              perMessageDeflate: this.perMessageDeflate,
                          }).pfx = this.pfx),
                (t.key = this.key),
                (t.passphrase = this.passphrase),
                (t.cert = this.cert),
                (t.ca = this.ca),
                (t.ciphers = this.ciphers),
                (t.rejectUnauthorized = this.rejectUnauthorized),
                this.extraHeaders && (t.headers = this.extraHeaders),
                this.localAddress && (t.localAddress = this.localAddress);
            try {
                ("undefined" == typeof uni &&
                    "undefined" == typeof wx &&
                    "undefined" == typeof my) ||
                "undefined" != typeof WebSocket
                    ? (this.ws =
                          this.usingBrowserWebSocket && !this.isReactNative
                              ? e
                                  ? new ov(n, e)
                                  : new ov(n)
                              : new ov(n, e, t))
                    : (this.ws = new ov(n));
            } catch (s) {
                return this.emit("error", s);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                this.ws.supports && this.ws.supports.binary
                    ? ((this.supportsBinary = !0),
                      (this.ws.binaryType = "nodebuffer"))
                    : (this.ws.binaryType = "arraybuffer"),
                this.addEventListeners();
        }
    }),
    (rv.prototype.addEventListeners = function () {
        var e = this;
        (this.ws.onopen = function () {
            e.onOpen();
        }),
            (this.ws.onclose = function () {
                e.onClose();
            }),
            (this.ws.onmessage = function (t) {
                e.onData(t.data);
            }),
            (this.ws.onerror = function (t) {
                e.onError("websocket error", t);
            });
    }),
    (rv.prototype.write = function (e) {
        var t = this;
        this.writable = !1;
        for (var n = e.length, s = 0, o = n; s < o; s++)
            !(function (e) {
                Zy.encodePacket(e, t.supportsBinary, function (s) {
                    if (
                        ("undefined" == typeof uni &&
                            "undefined" == typeof wx &&
                            "undefined" == typeof my) ||
                        "undefined" != typeof WebSocket
                    ) {
                        if (!t.usingBrowserWebSocket) {
                            var o = {};
                            e.options && (o.compress = e.options.compress),
                                t.perMessageDeflate &&
                                    ("string" == typeof s
                                        ? Buffer.byteLength(s)
                                        : s.length) <
                                        t.perMessageDeflate.threshold &&
                                    (o.compress = !1);
                        }
                        try {
                            t.usingBrowserWebSocket
                                ? t.ws.send(s)
                                : t.ws.send(s, o);
                        } catch (i) {
                            sv("websocket closed before onclose event");
                        }
                    } else
                        try {
                            t.ws.send(s);
                        } catch (i) {
                            sv("websocket closed before onclose event");
                        }
                    --n ||
                        (t.emit("flush"),
                        setTimeout(function () {
                            (t.writable = !0), t.emit("drain");
                        }, 0));
                });
            })(e[s]);
    }),
    (rv.prototype.onClose = function () {
        Qy.prototype.onClose.call(this);
    }),
    (rv.prototype.doClose = function () {
        void 0 !== this.ws && this.ws.close();
    }),
    (rv.prototype.uri = function () {
        var e = this.query || {},
            t = this.secure ? "wss" : "ws",
            n = "";
        return (
            this.port &&
                (("wss" === t && 443 !== Number(this.port)) ||
                    ("ws" === t && 80 !== Number(this.port))) &&
                (n = ":" + this.port),
            this.timestampRequests && (e[this.timestampParam] = nv()),
            this.supportsBinary || (e.b64 = 1),
            (e = ev.encode(e)).length && (e = "?" + e),
            t +
                "://" +
                (-1 !== this.hostname.indexOf(":")
                    ? "[" + this.hostname + "]"
                    : this.hostname) +
                n +
                this.path +
                e
        );
    }),
    (rv.prototype.check = function () {
        return !(
            !ov ||
            ("__initialize" in ov && this.name === rv.prototype.name)
        );
    });
var av = Wy,
    cv = iv;
(Vg.polling = function (e) {
    var t = !1,
        n = !1;
    if ((e.jsonp, "undefined" != typeof location)) {
        var s = "https:" === location.protocol,
            o = location.port;
        o || (o = s ? 443 : 80),
            (t = e.hostname !== location.hostname || o !== e.port),
            (n = e.secure !== s);
    }
    return (e.xdomain = t), (e.xscheme = n), new av(e);
}),
    (Vg.websocket = cv);
var lv = [].indexOf,
    uv = function (e, t) {
        if (lv) return e.indexOf(t);
        for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
        return -1;
    },
    dv = Vg,
    hv = Af.exports,
    pv = Og.exports("engine.io-client:socket"),
    fv = uv,
    mv = Hg,
    gv = kg,
    yv = _y,
    vv = bv;
function bv(e, t) {
    if (!(this instanceof bv)) return new bv(e, t);
    (t = t || {}),
        e && "object" == typeof e && ((t = e), (e = null)),
        e
            ? ((e = gv(e)),
              (t.hostname = e.host),
              (t.secure = "https" === e.protocol || "wss" === e.protocol),
              (t.port = e.port),
              e.query && (t.query = e.query))
            : t.host && (t.hostname = gv(t.host).host),
        (this.secure =
            null != t.secure
                ? t.secure
                : "undefined" != typeof location &&
                  "https:" === location.protocol),
        t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
        (this.agent = t.agent || !1),
        (this.hostname =
            t.hostname ||
            ("undefined" != typeof location ? location.hostname : "localhost")),
        (this.port =
            t.port ||
            ("undefined" != typeof location && location.port
                ? location.port
                : this.secure
                ? 443
                : 80)),
        (this.query = t.query || {}),
        "string" == typeof this.query && (this.query = yv.decode(this.query)),
        (this.upgrade = !1 !== t.upgrade),
        (this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/"),
        (this.forceJSONP = !!t.forceJSONP),
        (this.jsonp = !1 !== t.jsonp),
        (this.forceBase64 = !!t.forceBase64),
        (this.enablesXDR = !!t.enablesXDR),
        (this.timestampParam = t.timestampParam || "t"),
        (this.timestampRequests = t.timestampRequests),
        (this.transports = t.transports || ["polling", "websocket"]),
        (this.transportOptions = t.transportOptions || {}),
        (this.readyState = ""),
        (this.writeBuffer = []),
        (this.prevBufferLen = 0),
        (this.policyPort = t.policyPort || 843),
        (this.rememberUpgrade = t.rememberUpgrade || !1),
        (this.binaryType = null),
        (this.onlyBinaryUpgrades = t.onlyBinaryUpgrades),
        (this.perMessageDeflate =
            !1 !== t.perMessageDeflate && (t.perMessageDeflate || {})),
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
        this.perMessageDeflate &&
            null == this.perMessageDeflate.threshold &&
            (this.perMessageDeflate.threshold = 1024),
        (this.pfx = t.pfx || null),
        (this.key = t.key || null),
        (this.passphrase = t.passphrase || null),
        (this.cert = t.cert || null),
        (this.ca = t.ca || null),
        (this.ciphers = t.ciphers || null),
        (this.rejectUnauthorized =
            void 0 === t.rejectUnauthorized || t.rejectUnauthorized),
        (this.forceNode = !!t.forceNode),
        (this.isReactNative =
            "undefined" != typeof navigator &&
            "string" == typeof navigator.product &&
            "reactnative" === navigator.product.toLowerCase()),
        ("undefined" == typeof self || this.isReactNative) &&
            (t.extraHeaders &&
                Object.keys(t.extraHeaders).length > 0 &&
                (this.extraHeaders = t.extraHeaders),
            t.localAddress && (this.localAddress = t.localAddress)),
        (this.id = null),
        (this.upgrades = null),
        (this.pingInterval = null),
        (this.pingTimeout = null),
        (this.pingIntervalTimer = null),
        (this.pingTimeoutTimer = null),
        this.open();
}
(bv.priorWebsocketSuccess = !1),
    hv(bv.prototype),
    (bv.protocol = mv.protocol),
    (bv.Socket = bv),
    (bv.Transport = Ey),
    (bv.transports = Vg),
    (bv.parser = Hg),
    (bv.prototype.createTransport = function (e) {
        pv('creating transport "%s"', e);
        var t = (function (e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
        })(this.query);
        (t.EIO = mv.protocol), (t.transport = e);
        var n = this.transportOptions[e] || {};
        return (
            this.id && (t.sid = this.id),
            new dv[e]({
                query: t,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests:
                    n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized:
                    n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate:
                    n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0,
                isReactNative: this.isReactNative,
            })
        );
    }),
    (bv.prototype.open = function () {
        var e;
        if (
            this.rememberUpgrade &&
            bv.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
        )
            e = "websocket";
        else {
            if (0 === this.transports.length) {
                var t = this;
                return void setTimeout(function () {
                    t.emit("error", "No transports available");
                }, 0);
            }
            e = this.transports[0];
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e);
        } catch (n) {
            return this.transports.shift(), void this.open();
        }
        e.open(), this.setTransport(e);
    }),
    (bv.prototype.setTransport = function (e) {
        pv("setting transport %s", e.name);
        var t = this;
        this.transport &&
            (pv("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            (this.transport = e),
            e
                .on("drain", function () {
                    t.onDrain();
                })
                .on("packet", function (e) {
                    t.onPacket(e);
                })
                .on("error", function (e) {
                    t.onError(e);
                })
                .on("close", function () {
                    t.onClose("transport close");
                });
    }),
    (bv.prototype.probe = function (e) {
        pv('probing transport "%s"', e);
        var t = this.createTransport(e, { probe: 1 }),
            n = !1,
            s = this;
        function o() {
            if (s.onlyBinaryUpgrades) {
                var o = !this.supportsBinary && s.transport.supportsBinary;
                n = n || o;
            }
            n ||
                (pv('probe transport "%s" opened', e),
                t.send([{ type: "ping", data: "probe" }]),
                t.once("packet", function (o) {
                    if (!n)
                        if ("pong" === o.type && "probe" === o.data) {
                            if (
                                (pv('probe transport "%s" pong', e),
                                (s.upgrading = !0),
                                s.emit("upgrading", t),
                                !t)
                            )
                                return;
                            (bv.priorWebsocketSuccess = "websocket" === t.name),
                                pv(
                                    'pausing current transport "%s"',
                                    s.transport.name
                                ),
                                s.transport.pause(function () {
                                    n ||
                                        ("closed" !== s.readyState &&
                                            (pv(
                                                "changing transport and sending upgrade packet"
                                            ),
                                            u(),
                                            s.setTransport(t),
                                            t.send([{ type: "upgrade" }]),
                                            s.emit("upgrade", t),
                                            (t = null),
                                            (s.upgrading = !1),
                                            s.flush()));
                                });
                        } else {
                            pv('probe transport "%s" failed', e);
                            var i = new Error("probe error");
                            (i.transport = t.name), s.emit("upgradeError", i);
                        }
                }));
        }
        function i() {
            n || ((n = !0), u(), t.close(), (t = null));
        }
        function r(n) {
            var o = new Error("probe error: " + n);
            (o.transport = t.name),
                i(),
                pv('probe transport "%s" failed because of error: %s', e, n),
                s.emit("upgradeError", o);
        }
        function a() {
            r("transport closed");
        }
        function c() {
            r("socket closed");
        }
        function l(e) {
            t &&
                e.name !== t.name &&
                (pv('"%s" works - aborting "%s"', e.name, t.name), i());
        }
        function u() {
            t.removeListener("open", o),
                t.removeListener("error", r),
                t.removeListener("close", a),
                s.removeListener("close", c),
                s.removeListener("upgrading", l);
        }
        (bv.priorWebsocketSuccess = !1),
            t.once("open", o),
            t.once("error", r),
            t.once("close", a),
            this.once("close", c),
            this.once("upgrading", l),
            t.open();
    }),
    (bv.prototype.onOpen = function () {
        if (
            (pv("socket open"),
            (this.readyState = "open"),
            (bv.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause)
        ) {
            pv("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++)
                this.probe(this.upgrades[e]);
        }
    }),
    (bv.prototype.onPacket = function (e) {
        if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
        )
            switch (
                (pv('socket receive: type "%s", data "%s"', e.type, e.data),
                this.emit("packet", e),
                this.emit("heartbeat"),
                e.type)
            ) {
                case "open":
                    this.onHandshake(JSON.parse(e.data));
                    break;
                case "pong":
                    this.setPing(), this.emit("pong");
                    break;
                case "error":
                    var t = new Error("server error");
                    (t.code = e.data), this.onError(t);
                    break;
                case "message":
                    this.emit("data", e.data), this.emit("message", e.data);
            }
        else pv('packet received with socket readyState "%s"', this.readyState);
    }),
    (bv.prototype.onHandshake = function (e) {
        this.emit("handshake", e),
            (this.id = e.sid),
            (this.transport.query.sid = e.sid),
            (this.upgrades = this.filterUpgrades(e.upgrades)),
            (this.pingInterval = e.pingInterval),
            (this.pingTimeout = e.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState &&
                (this.setPing(),
                this.removeListener("heartbeat", this.onHeartbeat),
                this.on("heartbeat", this.onHeartbeat));
    }),
    (bv.prototype.onHeartbeat = function (e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout(function () {
            "closed" !== t.readyState && t.onClose("ping timeout");
        }, e || t.pingInterval + t.pingTimeout);
    }),
    (bv.prototype.setPing = function () {
        var e = this;
        clearTimeout(e.pingIntervalTimer),
            (e.pingIntervalTimer = setTimeout(function () {
                pv(
                    "writing ping packet - expecting pong within %sms",
                    e.pingTimeout
                ),
                    e.ping(),
                    e.onHeartbeat(e.pingTimeout);
            }, e.pingInterval));
    }),
    (bv.prototype.ping = function () {
        var e = this;
        this.sendPacket("ping", function () {
            e.emit("ping");
        });
    }),
    (bv.prototype.onDrain = function () {
        this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
    }),
    (bv.prototype.flush = function () {
        "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (pv("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit("flush"));
    }),
    (bv.prototype.write = bv.prototype.send =
        function (e, t, n) {
            return this.sendPacket("message", e, t, n), this;
        }),
    (bv.prototype.sendPacket = function (e, t, n, s) {
        if (
            ("function" == typeof t && ((s = t), (t = void 0)),
            "function" == typeof n && ((s = n), (n = null)),
            "closing" !== this.readyState && "closed" !== this.readyState)
        ) {
            (n = n || {}).compress = !1 !== n.compress;
            var o = { type: e, data: t, options: n };
            this.emit("packetCreate", o),
                this.writeBuffer.push(o),
                s && this.once("flush", s),
                this.flush();
        }
    }),
    (bv.prototype.close = function () {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var e = this;
            this.writeBuffer.length
                ? this.once("drain", function () {
                      this.upgrading ? s() : t();
                  })
                : this.upgrading
                ? s()
                : t();
        }
        function t() {
            e.onClose("forced close"),
                pv("socket closing - telling transport to close"),
                e.transport.close();
        }
        function n() {
            e.removeListener("upgrade", n),
                e.removeListener("upgradeError", n),
                t();
        }
        function s() {
            e.once("upgrade", n), e.once("upgradeError", n);
        }
        return this;
    }),
    (bv.prototype.onError = function (e) {
        pv("socket error %j", e),
            (bv.priorWebsocketSuccess = !1),
            this.emit("error", e),
            this.onClose("transport error", e);
    }),
    (bv.prototype.onClose = function (e, t) {
        ("opening" !== this.readyState &&
            "open" !== this.readyState &&
            "closing" !== this.readyState) ||
            (pv('socket close with reason: "%s"', e),
            clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            (this.readyState = "closed"),
            (this.id = null),
            this.emit("close", e, t),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
    }),
    (bv.prototype.filterUpgrades = function (e) {
        for (var t = [], n = 0, s = e.length; n < s; n++)
            ~fv(this.transports, e[n]) && t.push(e[n]);
        return t;
    }),
    (qg.exports = vv),
    (qg.exports.parser = Hg);
var Sv = { exports: {} },
    Ev = function (e, t) {
        for (var n = [], s = (t = t || 0) || 0; s < e.length; s++)
            n[s - t] = e[s];
        return n;
    },
    wv = function (e, t, n) {
        return (
            e.on(t, n),
            {
                destroy: function () {
                    e.removeListener(t, n);
                },
            }
        );
    },
    Cv = [].slice,
    _v = function (e, t) {
        if (("string" == typeof t && (t = e[t]), "function" != typeof t))
            throw new Error("bind() requires a function");
        var n = Cv.call(arguments, 2);
        return function () {
            return t.apply(e, n.concat(Cv.call(arguments)));
        };
    };
!(function (e, t) {
    var n = jg,
        s = Af.exports,
        o = Ev,
        i = wv,
        r = _v,
        a = (Og.exports("socket.io-client:socket"), _y),
        c = Yg;
    e.exports = d;
    var l = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1,
        },
        u = s.prototype.emit;
    function d(e, t, n) {
        (this.io = e),
            (this.nsp = t),
            (this.json = this),
            (this.ids = 0),
            (this.acks = {}),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this.connected = !1),
            (this.disconnected = !0),
            (this.flags = {}),
            n && n.query && (this.query = n.query),
            this.io.autoConnect && this.open();
    }
    s(d.prototype),
        (d.prototype.subEvents = function () {
            if (!this.subs) {
                var e = this.io;
                this.subs = [
                    i(e, "open", r(this, "onopen")),
                    i(e, "packet", r(this, "onpacket")),
                    i(e, "close", r(this, "onclose")),
                ];
            }
        }),
        (d.prototype.open = d.prototype.connect =
            function () {
                return (
                    this.connected ||
                        (this.subEvents(),
                        this.io.open(),
                        "open" === this.io.readyState && this.onopen(),
                        this.emit("connecting")),
                    this
                );
            }),
        (d.prototype.send = function () {
            var e = o(arguments);
            return e.unshift("message"), this.emit.apply(this, e), this;
        }),
        (d.prototype.emit = function (e) {
            if (l.hasOwnProperty(e)) return u.apply(this, arguments), this;
            var t = o(arguments),
                s = {
                    type: (
                        void 0 !== this.flags.binary ? this.flags.binary : c(t)
                    )
                        ? n.BINARY_EVENT
                        : n.EVENT,
                    data: t,
                    options: {},
                };
            return (
                (s.options.compress =
                    !this.flags || !1 !== this.flags.compress),
                "function" == typeof t[t.length - 1] &&
                    (this.ids,
                    (this.acks[this.ids] = t.pop()),
                    (s.id = this.ids++)),
                this.connected ? this.packet(s) : this.sendBuffer.push(s),
                (this.flags = {}),
                this
            );
        }),
        (d.prototype.packet = function (e) {
            (e.nsp = this.nsp), this.io.packet(e);
        }),
        (d.prototype.onopen = function () {
            if ("/" !== this.nsp)
                if (this.query) {
                    var e =
                        "object" == typeof this.query
                            ? a.encode(this.query)
                            : this.query;
                    this.packet({ type: n.CONNECT, query: e });
                } else this.packet({ type: n.CONNECT });
        }),
        (d.prototype.onclose = function (e) {
            (this.connected = !1),
                (this.disconnected = !0),
                delete this.id,
                this.emit("disconnect", e);
        }),
        (d.prototype.onpacket = function (e) {
            var t = e.nsp === this.nsp,
                s = e.type === n.ERROR && "/" === e.nsp;
            if (t || s)
                switch (e.type) {
                    case n.CONNECT:
                        this.onconnect();
                        break;
                    case n.EVENT:
                    case n.BINARY_EVENT:
                        this.onevent(e);
                        break;
                    case n.ACK:
                    case n.BINARY_ACK:
                        this.onack(e);
                        break;
                    case n.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case n.ERROR:
                        this.emit("error", e.data);
                }
        }),
        (d.prototype.onevent = function (e) {
            var t = e.data || [];
            null != e.id && t.push(this.ack(e.id)),
                this.connected ? u.apply(this, t) : this.receiveBuffer.push(t);
        }),
        (d.prototype.ack = function (e) {
            var t = this,
                s = !1;
            return function () {
                if (!s) {
                    s = !0;
                    var i = o(arguments);
                    t.packet({
                        type: c(i) ? n.BINARY_ACK : n.ACK,
                        id: e,
                        data: i,
                    });
                }
            };
        }),
        (d.prototype.onack = function (e) {
            var t = this.acks[e.id];
            "function" == typeof t
                ? (e.id, e.data, t.apply(this, e.data), delete this.acks[e.id])
                : e.id;
        }),
        (d.prototype.onconnect = function () {
            (this.connected = !0),
                (this.disconnected = !1),
                this.emit("connect"),
                this.emitBuffered();
        }),
        (d.prototype.emitBuffered = function () {
            var e;
            for (e = 0; e < this.receiveBuffer.length; e++)
                u.apply(this, this.receiveBuffer[e]);
            for (
                this.receiveBuffer = [], e = 0;
                e < this.sendBuffer.length;
                e++
            )
                this.packet(this.sendBuffer[e]);
            this.sendBuffer = [];
        }),
        (d.prototype.ondisconnect = function () {
            this.nsp, this.destroy(), this.onclose("io server disconnect");
        }),
        (d.prototype.destroy = function () {
            if (this.subs) {
                for (var e = 0; e < this.subs.length; e++)
                    this.subs[e].destroy();
                this.subs = null;
            }
            this.io.destroy(this);
        }),
        (d.prototype.close = d.prototype.disconnect =
            function () {
                return (
                    this.connected &&
                        (this.nsp, this.packet({ type: n.DISCONNECT })),
                    this.destroy(),
                    this.connected && this.onclose("io client disconnect"),
                    this
                );
            }),
        (d.prototype.compress = function (e) {
            return (this.flags.compress = e), this;
        }),
        (d.prototype.binary = function (e) {
            return (this.flags.binary = e), this;
        });
})(Sv);
var Mv = Tv;
function Tv(e) {
    (e = e || {}),
        (this.ms = e.min || 100),
        (this.max = e.max || 1e4),
        (this.factor = e.factor || 2),
        (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
        (this.attempts = 0);
}
(Tv.prototype.duration = function () {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
        e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
    }
    return 0 | Math.min(e, this.max);
}),
    (Tv.prototype.reset = function () {
        this.attempts = 0;
    }),
    (Tv.prototype.setMin = function (e) {
        this.ms = e;
    }),
    (Tv.prototype.setMax = function (e) {
        this.max = e;
    }),
    (Tv.prototype.setJitter = function (e) {
        this.jitter = e;
    });
class Iv {
    static init(e, t, n) {
        (this.host = e),
            ((void 0 !== t && !1 === t) || !0 === n) && (this.https = !1);
    }
    static isMP() {
        return [
            vf.MP_WX,
            vf.MP_ALI,
            vf.MP_BYTE,
            vf.MP_WGAME,
            vf.MP_BAIDU,
        ].includes(bf.currentPlatform());
    }
    static uri() {
        let e = "http";
        return this.https && (e += "s"), e + "://" + this.index() + this.host;
    }
    static index() {
        return (
            0 == this.i
                ? (this.i = Math.floor(Math.random() * (this.max - 1) + 1))
                : (this.i = (this.i % this.max) + 1),
            this.i
        );
    }
}
(Iv.i = 0), (Iv.max = 5), (Iv.https = !0);
var kv = xf(Object.freeze({ __proto__: null, URIResolver: Iv })),
    Ov = xf(If),
    Nv = qg.exports,
    xv = Sv.exports,
    Av = Af.exports,
    Rv = jg,
    Pv = wv,
    Dv = _v,
    Lv = (Og.exports("socket.io-client:manager"), uv),
    Fv = Mv;
const { URIResolver: Uv } = kv;
var Bv = Ov.runStatus,
    jv = Object.prototype.hasOwnProperty,
    Gv = $v;
function $v(e, t) {
    if (!(this instanceof $v)) return new $v(e, t);
    e && "object" == typeof e && ((t = e), (e = void 0)),
        ((t = t || {}).path = t.path || "/socket.io"),
        (this.nsps = {}),
        (this.subs = []),
        (this.opts = t),
        this.reconnection(!1 !== t.reconnection),
        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(t.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
        this.randomizationFactor(t.randomizationFactor || 0.5),
        (this.backoff = new Fv({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        })),
        this.timeout(null == t.timeout ? 2e4 : t.timeout),
        (this.readyState = "closed"),
        (this.uri = e),
        (this.connecting = []),
        (this.lastPing = null),
        (this.encoding = !1),
        (this.packetBuffer = []);
    var n = t.parser || Rv;
    (this.encoder = new n.Encoder()),
        (this.decoder = new n.Decoder()),
        (this.autoConnect = !1 !== t.autoConnect),
        this.autoConnect && this.open();
}
function qv() {
    return Bv.isBackend();
}
($v.prototype.emitAll = function () {
    for (var e in (this.emit.apply(this, arguments), this.nsps))
        jv.call(this.nsps, e) &&
            this.nsps[e].emit.apply(this.nsps[e], arguments);
}),
    ($v.prototype.updateSocketIds = function () {
        for (var e in this.nsps)
            jv.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));
    }),
    ($v.prototype.generateId = function (e) {
        return ("/" === e ? "" : e + "#") + this.engine.id;
    }),
    Av($v.prototype),
    ($v.prototype.reconnection = function (e) {
        return arguments.length
            ? ((this._reconnection = !!e), this)
            : this._reconnection;
    }),
    ($v.prototype.reconnectionAttempts = function (e) {
        return arguments.length
            ? ((this._reconnectionAttempts = e), this)
            : this._reconnectionAttempts;
    }),
    ($v.prototype.reconnectionDelay = function (e) {
        return arguments.length
            ? ((this._reconnectionDelay = e),
              this.backoff && this.backoff.setMin(e),
              this)
            : this._reconnectionDelay;
    }),
    ($v.prototype.randomizationFactor = function (e) {
        return arguments.length
            ? ((this._randomizationFactor = e),
              this.backoff && this.backoff.setJitter(e),
              this)
            : this._randomizationFactor;
    }),
    ($v.prototype.reconnectionDelayMax = function (e) {
        return arguments.length
            ? ((this._reconnectionDelayMax = e),
              this.backoff && this.backoff.setMax(e),
              this)
            : this._reconnectionDelayMax;
    }),
    ($v.prototype.timeout = function (e) {
        return arguments.length ? ((this._timeout = e), this) : this._timeout;
    }),
    ($v.prototype.maybeReconnectOnOpen = function () {
        !this.reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
    }),
    ($v.prototype.open = $v.prototype.connect =
        function (e, t) {
            if ((this.readyState, ~this.readyState.indexOf("open")))
                return this;
            this.uri, (this.engine = Nv(this.uri, this.opts));
            var n = this.engine,
                s = this;
            (this.readyState = "opening"), (this.skipReconnect = !1);
            var o = Pv(n, "open", function () {
                    s.onopen(), e && e();
                }),
                i = Pv(n, "error", async function (t) {
                    if (
                        ((s.uri = Uv.uri()),
                        s.cleanup(),
                        (s.readyState = "closed"),
                        s.emitAll("connect_error", t),
                        e)
                    ) {
                        var n = new Error("Connection error");
                        (n.data = t), e(n);
                    } else s.maybeReconnectOnOpen();
                });
            if (!1 !== this._timeout) {
                var r = this._timeout,
                    a = setTimeout(function () {
                        o.destroy(),
                            n.close(),
                            n.emit("error", "timeout"),
                            s.emitAll("connect_timeout", r);
                    }, r);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(a);
                    },
                });
            }
            return this.subs.push(o), this.subs.push(i), this;
        }),
    ($v.prototype.onopen = function () {
        this.cleanup(), (this.readyState = "open"), this.emit("open");
        var e = this.engine;
        this.subs.push(Pv(e, "data", Dv(this, "ondata"))),
            this.subs.push(Pv(e, "ping", Dv(this, "onping"))),
            this.subs.push(Pv(e, "pong", Dv(this, "onpong"))),
            this.subs.push(Pv(e, "error", Dv(this, "onerror"))),
            this.subs.push(Pv(e, "close", Dv(this, "onclose"))),
            this.subs.push(Pv(this.decoder, "decoded", Dv(this, "ondecoded")));
    }),
    ($v.prototype.onping = function () {
        (this.lastPing = new Date()), this.emitAll("ping");
    }),
    ($v.prototype.onpong = function () {
        this.emitAll("pong", new Date() - this.lastPing);
    }),
    ($v.prototype.ondata = function (e) {
        this.decoder.add(e);
    }),
    ($v.prototype.ondecoded = function (e) {
        this.emit("packet", e);
    }),
    ($v.prototype.onerror = function (e) {
        this.emitAll("error", e);
    }),
    ($v.prototype.socket = function (e, t) {
        var n = this.nsps[e];
        if (!n) {
            (n = new xv(this, e, t)), (this.nsps[e] = n);
            var s = this;
            n.on("connecting", o),
                n.on("connect", function () {
                    n.id = s.generateId(e);
                }),
                this.autoConnect && o();
        }
        function o() {
            ~Lv(s.connecting, n) || s.connecting.push(n);
        }
        return n;
    }),
    ($v.prototype.destroy = function (e) {
        var t = Lv(this.connecting, e);
        ~t && this.connecting.splice(t, 1),
            this.connecting.length || this.close();
    }),
    ($v.prototype.packet = function (e) {
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query),
            t.encoding
                ? t.packetBuffer.push(e)
                : ((t.encoding = !0),
                  this.encoder.encode(e, function (n) {
                      for (var s = 0; s < n.length; s++)
                          t.engine.write(n[s], e.options);
                      (t.encoding = !1), t.processPacketQueue();
                  }));
    }),
    ($v.prototype.processPacketQueue = function () {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e);
        }
    }),
    ($v.prototype.cleanup = function () {
        for (var e = this.subs.length, t = 0; t < e; t++)
            this.subs.shift().destroy();
        (this.packetBuffer = []),
            (this.encoding = !1),
            (this.lastPing = null),
            this.decoder.destroy();
    }),
    ($v.prototype.close = $v.prototype.disconnect =
        function () {
            (this.skipReconnect = !0),
                (this.reconnecting = !1),
                "opening" === this.readyState && this.cleanup(),
                this.backoff.reset(),
                (this.readyState = "closed"),
                this.engine && this.engine.close();
        }),
    ($v.prototype.onclose = function (e) {
        this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.emit("close", e),
            this._reconnection && !this.skipReconnect && this.reconnect();
    }),
    ($v.prototype.reconnect = function () {
        if ((qv(), this.reconnecting || this.skipReconnect)) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(),
                this.emitAll("reconnect_failed"),
                (this.reconnecting = !1);
        else {
            var t = this.backoff.duration();
            this.reconnecting = !0;
            var n = setTimeout(function () {
                e.skipReconnect ||
                    (e.emitAll("reconnect_attempt", e.backoff.attempts),
                    e.emitAll("reconnecting", e.backoff.attempts),
                    e.skipReconnect ||
                        (qv()
                            ? ((e.reconnecting = !1),
                              e.reconnect(),
                              e.emitAll(
                                  "reconnect_error",
                                  "Uniapp running backend, skipped reconnect..."
                              ))
                            : e.open(function (t) {
                                  t
                                      ? ((e.reconnecting = !1),
                                        e.reconnect(),
                                        e.emitAll("reconnect_error", t.data))
                                      : e.onreconnect();
                              })));
            }, t);
            this.subs.push({
                destroy: function () {
                    clearTimeout(n);
                },
            });
        }
    }),
    ($v.prototype.onreconnect = function () {
        var e = this.backoff.attempts;
        (this.reconnecting = !1),
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", e);
    }),
    (function (e, t) {
        var n = Bg,
            s = jg,
            o = Gv;
        Og.exports("socket.io-client"), (e.exports = t = r);
        var i = (t.managers = {});
        function r(e, t) {
            "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
            var s,
                r = n(e),
                a = r.source,
                c = r.id,
                l = r.path,
                u = i[c] && l in i[c].nsps;
            return (
                t.forceNew ||
                t["force new connection"] ||
                !1 === t.multiplex ||
                u
                    ? (s = o(a, t))
                    : (i[c] || (i[c] = o(a, t)), (s = i[c])),
                r.query && !t.query && (t.query = r.query),
                s.socket(r.path, t)
            );
        }
        (t.protocol = s.protocol),
            (t.connect = r),
            (t.Manager = Gv),
            (t.Socket = Sv.exports);
    })(Mg, Mg.exports);
const Vv = Mg.exports;
class Hv {
    constructor() {
        (this.io = Vv),
            (this.status = cf.DISCONNECTED),
            (this.permissions = [um.NONE]),
            (this.connectedObservers = []),
            (this.disconnectedObservers = []);
    }
    connect() {
        this.status = cf.CONNECTING;
    }
    socketio() {
        return this.io;
    }
    on(e, t) {
        this.io.on(e, t);
    }
    disconnect() {
        this.io.disconnect();
    }
    getStatus() {
        return this.status;
    }
    addConnectedObserver(e) {
        yf.isFunction(e) && this.connectedObservers.push(e);
    }
    addDisconnectedObserver(e) {
        yf.isFunction(e) && this.disconnectedObservers.push(e);
    }
    notify(e, t) {
        for (let n = 0; n < e.length; n++) e[n](t);
    }
}
class Wv extends Hv {
    constructor(e) {
        super(),
            (this.reconnectingObservers = []),
            this.addReconnectingObserver(e.onReconnecting),
            this.addDisconnectedObserver(e.onDisconnected);
    }
    connect(e) {
        super.connect(),
            (this.io = this.io.connect(e.uri, e.opts)),
            this.initListener();
    }
    initListener() {
        this.io.on("connect", () => {
            (this.status = cf.CONNECTED), this.notify(this.connectedObservers);
        }),
            this.io.on("reconnecting", (e) => {
                (this.status = cf.CONNECTING),
                    this.notify(this.reconnectingObservers, e);
            }),
            this.io.on("disconnect", () => {
                (this.status = cf.DISCONNECTED),
                    this.notify(this.disconnectedObservers);
            }),
            this.io.on("connect_error", function (e) {});
    }
    addReconnectingObserver(e) {
        this.reconnectingObservers.push(e);
    }
}
class zv {
    static get(e) {
        const t = encodeURIComponent(e) + "=",
            n = document.cookie.split("; ");
        for (const s of n)
            if (s.startsWith(t))
                return decodeURIComponent(s.substring(t.length));
        return null;
    }
    static set(e, t, n, s, o = "/", i = !1) {
        let r = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        n instanceof Date && (r += "; expires=" + n.toGMTString()),
            o && (r += "; path=" + o),
            s && (r += "; domain=" + s),
            i && (r += "; secure"),
            (document.cookie = r);
    }
    static remove(e, t, n = "/", s = !1) {
        zv.set(e, "", new Date(0), t, n, s);
    }
}
class Xv {
    asyncGet(e) {
        let t = this.get(e);
        return Promise.resolve(t);
    }
    asyncPut(e, t) {
        return this.put(e, t), Promise.resolve();
    }
    get(e) {
        let t = this.doGet(e);
        return (t = JSON.parse(t)), t;
    }
    put(e, t) {
        this.doPut(e, JSON.stringify(t));
    }
}
class Jv extends Xv {
    constructor() {
        super(),
            (this.domain = null),
            (this.domain =
                "undefined" != typeof location &&
                /^(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/.test(
                    location.host
                )
                    ? location.host.split(".").slice(-2).join(".")
                    : null);
    }
    doGet(e) {
        return zv.get(e) || null;
    }
    doPut(e, t) {
        const n = new Date(2030, 12, 31, 0, 0, 0, 0),
            s = this.domain;
        zv.set(e, t, n, s);
    }
    remove(e) {
        const t = this.domain;
        zv.remove(e, t);
    }
    support() {
        return (
            "undefined" != typeof navigator && !0 === navigator.cookieEnabled
        );
    }
}
class Kv extends Xv {
    doGet(e) {
        return localStorage.getItem(e) || null;
    }
    doPut(e, t) {
        localStorage.setItem(e, t);
    }
    remove(e) {
        localStorage.removeItem(e);
    }
    support() {
        return !(
            "undefined" != typeof GameGlobal ||
            "undefined" == typeof localStorage ||
            !localStorage.setItem
        );
    }
}
class Yv extends Xv {
    doGet(e) {
        return lp(e) || null;
    }
    doPut(e, t) {
        ap(e, t);
    }
    remove(e) {
        up(e);
    }
    support() {
        return !("object" != typeof uni || !lp);
    }
}
class Qv extends Xv {
    doGet(e) {
        return cc.sys.localStorage.getItem(e) || null;
    }
    doPut(e, t) {
        cc.sys.localStorage.setItem(e, t);
    }
    remove(e) {
        cc.sys.localStorage.removeItem(e);
    }
    support() {
        return "undefined" != typeof cc && void 0 !== cc.sys.localStorage;
    }
}
class Zv extends Xv {
    doGet(e) {
        return lp(e) || null;
    }
    doPut(e, t) {
        ap(e, t);
    }
    remove(e) {
        up(e);
    }
    support() {
        return !("object" != typeof wx || !lp);
    }
}
class eb extends Xv {
    asyncGet(e) {
        return Of(this, void 0, void 0, function* () {
            const t = yield df.asyncStorage.getItem(e);
            return JSON.parse(t);
        });
    }
    asyncPut(e, t) {
        return df.asyncStorage.setItem(e, JSON.stringify(t));
    }
    doPut(e, t) {
        throw new Error("Method not implemented.");
    }
    remove(e) {
        df.asyncStorage.removeItem(e);
    }
    support() {
        return uf.currentFramework() === af.REACT_NATIVE;
    }
    doGet(e) {
        throw new Error("Method not implemented.");
    }
}
class tb extends Xv {
    doGet(e) {
        const t = my.getStorageSync({ key: e }).data || null;
        return JSON.parse(t);
    }
    doPut(e, t) {
        my.setStorageSync({ key: e, data: JSON.stringify(t) });
    }
    remove(e) {
        my.removeStorageSync({ key: e });
    }
    support() {
        return !("undefined" == typeof my || !my.getStorageSync);
    }
}
class nb {
    constructor() {
        this.supportedStorage = null;
        const e = nb.storages;
        e.push(new Yv()),
            e.push(new Qv()),
            e.push(new Kv()),
            e.push(new Zv()),
            e.push(new eb()),
            e.push(new tb()),
            e.push(new Jv()),
            this.dispatch(),
            this.supportedStorage;
    }
    static localStorage() {
        return this.instance.supportedStorage;
    }
    dispatch() {
        for (let e of nb.storages)
            if (e.support()) {
                this.supportedStorage = e;
                break;
            }
    }
}
(nb.storages = new Array()), (nb.instance = new nb());
class sb {
    static get() {
        return Of(this, void 0, void 0, function* () {
            let e,
                t = nb.localStorage();
            return null !== t && (e = yield t.asyncGet(sb.SM_KEY)), e;
        });
    }
    static put(e) {
        return Of(this, void 0, void 0, function* () {
            var t = nb.localStorage();
            let n = e.sm;
            null !== t && n && t.asyncPut(sb.SM_KEY, n);
        });
    }
}
sb.SM_KEY = "GE-SM";
class ob {
    static initRNUniqueId() {
        if (uf.currentFramework() === af.REACT_NATIVE) {
            let e = df.platform,
                t = e.constants,
                n = { os: e.OS };
            return (
                "android" === n.os ? (n.f = t.Fingerprint) : (n.v = e.Version),
                JSON.stringify(n)
            );
        }
        return null;
    }
    static initPlusDeviceId() {
        return new Promise((e, t) => {
            "undefined" != typeof plus
                ? plus.device.getInfo({
                      success: (t) => {
                          e(t.uuid);
                      },
                      fail: (e) => {
                          t(e);
                      },
                  })
                : e(null);
        });
    }
    static getVideoCard() {
        var e;
        if (
            bf.currentPlatform() === vf.BROWSER &&
            "undefined" != typeof document
        ) {
            const t = document.createElement("canvas"),
                n =
                    null !== (e = t.getContext("webgl")) && void 0 !== e
                        ? e
                        : t.getContext("experimental-webgl");
            if (n && "getExtension" in n) {
                let e = 0,
                    t = 0;
                if (navigator.userAgent.indexOf("Firefox") > -1)
                    (t = n.VENDOR), (e = n.RENDERER);
                else {
                    let s = n.getExtension("WEBGL_debug_renderer_info");
                    if (!s) return null;
                    (t = s.UNMASKED_VENDOR_WEBGL),
                        (e = s.UNMASKED_RENDERER_WEBGL);
                }
                const s = {
                    vendor: (n.getParameter(t) || "").toString(),
                    renderer: (n.getParameter(e) || "").toString(),
                };
                return JSON.stringify(s);
            }
        }
        return null;
    }
    static z() {
        return Of(this, void 0, void 0, function* () {
            const e = {
                p: bf.currentPlatform(),
                f: uf.currentFramework(),
                vc: this.getVideoCard(),
                rfp: this.initRNUniqueId(),
            };
            return class {
                static e(e, t) {
                    let n = "";
                    for (let i = 0; i < e.length; i++)
                        n +=
                            ((o = void 0),
                            (o = s = e.charCodeAt(i)) >= 32 && o <= 126
                                ? String.fromCharCode(
                                      (function (e) {
                                          let n = e + t;
                                          return n > 126 ? n - 126 + 32 : n;
                                      })(s)
                                  )
                                : String.fromCharCode(s));
                    var s, o;
                    return n;
                }
            }.e(JSON.stringify(e), 5);
        });
    }
}
class ib {
    constructor(e) {
        (this.rocketsBuffer = new Set()),
            (this.socket = e),
            this.socket.addConnectedObserver(this.onSocketConnected.bind(this));
    }
    emit(e) {
        this.socket.status !== cf.DISCONNECTED
            ? (e.start(), this.doEmit(e))
            : e.fail({ resultCode: "409", content: "Please connect first" });
    }
    doEmit(e) {
        if (!e.complete)
            if (this.socket.status !== cf.CONNECT_FAILED)
                if (this.isConnected())
                    if (this.hasPermission(e)) {
                        let t = setTimeout(() => {
                            this.doEmit(e);
                        }, e.singleTimeout);
                        e.unique && (e.params.retried = e.retried),
                            this.socket
                                .socketio()
                                .emit(e.name, e.params, (n) => {
                                    clearTimeout(t),
                                        200 === n.resultCode || 200 == n.code
                                            ? e.success(n)
                                            : e.fail(n);
                                }),
                            e.retried++;
                    } else
                        e.fail({ resultCode: 401, content: "No permission" });
                else this.isConnecting() && this.rocketsBuffer.add(e);
            else
                e.fail({
                    resultCode: 408,
                    content: "Failed to connect GoEasy.",
                });
    }
    hasPermission(e) {
        return !!this.socket.permissions.find((t) => t === e.permission);
    }
    isConnected() {
        return [
            cf.CONNECTED,
            cf.RECONNECTED,
            cf.EXPIRED_RECONNECTED,
            cf.DISCONNECTING,
        ].includes(this.socket.status);
    }
    isConnecting() {
        return [cf.CONNECTING, cf.RECONNECTING].includes(this.socket.status);
    }
    onSocketConnected() {
        this.emitBuffer();
    }
    emitBuffer() {
        Array.from(this.rocketsBuffer).forEach((e) => {
            this.rocketsBuffer.delete(e), this.doEmit(e);
        });
    }
}
class rb extends sm {
    static init() {
        rb.i = new rb();
    }
    static fire(e, t) {
        this.i.fire(e, t);
    }
    static on(e, t) {
        this.i.on(e, t);
    }
    static off(e, t) {
        this.i.off(e, t);
    }
}
class ab extends Hv {
    constructor(e, t) {
        super(),
            (this.ioSocket = null),
            (this.sid = null),
            (this.anonymous = !1),
            (this.userId = null),
            (this.artifactVersion = hf),
            (this.vname = null),
            (this.uri = null),
            (this.ioOpts = null),
            (this.reconnectingTimes = 0),
            (this.messageObservers = new Map()),
            (this.connectFailedObservers = []),
            (this.connectingObservers = []),
            (this.expiredReconnectedObservers = []),
            this.validateUserIdAndData(t),
            (this.options = e),
            (this.ioSocket = new Wv({
                onDisconnected: this.onIoDisconnected.bind(this),
                onReconnecting: this.onIoReconnecting.bind(this),
            })),
            (this.ioSocketEmitter = new ib(this.ioSocket)),
            this.ioSocket.addConnectedObserver(this.onIoReconnected.bind(this)),
            this.initOptions(t),
            this.connect();
    }
    initUserId() {
        let e = this.connectOptions.id;
        yf.isEmpty(e) ? (this.anonymous = !0) : (this.userId = e.toString());
    }
    socketio() {
        return this.ioSocket.socketio();
    }
    extendOptions() {
        let e = this.connectOptions;
        if (yf.isNull(e.data) || (yf.isDef(e.data) && !yf.isObject(e.data)))
            throw { code: 400, content: "TypeError: data requires an object." };
        if (
            (yf.isDef(e.data) ? String(e.data).length : 0) > 300 &&
            yf.isObject(e) &&
            yf.isFunction(e.onFailed)
        )
            throw { code: 400, content: "user.data-length limit 300 byte." };
        if (yf.isObject(e.wxmpId)) {
            if (yf.isEmpty(e.wxmpId.appid))
                throw { code: 400, content: "wxmpId.appid is required." };
            if (yf.isEmpty(e.wxmpId.openid))
                throw {
                    code: 400,
                    content: "wxmpId.openid is required. requires string.",
                };
        } else if (yf.isPrimitive(e.wxmpId))
            throw {
                code: 400,
                content: "TypeError: wxmpId requires an object.",
            };
    }
    initUriAndOpts() {
        let e = this.options;
        Iv.init(e.host, e.forceTLS, e.supportOldBrowser), (this.uri = Iv.uri());
        let t = ["websocket"];
        !0 === e.supportOldBrowser && t.push("polling"),
            (this.ioOpts = {
                transports: t,
                timeout: Tf.connect,
                reconnectionDelayMax: Tf.reconnectionDelayMax,
            });
    }
    onIoReconnected() {
        this.status === cf.RECONNECTING && this.authorize();
    }
    sendAck(e, t) {
        this.ioSocket.io.emit(e, t);
    }
    initOptions(e) {
        (this.connectOptions = e),
            this.addConnectedObserver(e.onSuccess),
            this.addConnectFailedObserver(e.onFailed),
            this.addConnectingObserver(e.onProgress),
            this.initUserId();
    }
    connect() {
        this.initUriAndOpts(),
            this.extendOptions(),
            super.connect(),
            this.onConnecting(),
            this.ioSocket.connect({ uri: this.uri, opts: this.ioOpts }),
            this.authorize();
    }
    disconnect() {
        return new Promise((e, t) => {
            this.status = cf.DISCONNECTING;
            let n = () => {
                this.ioSocket.disconnect(),
                    (this.status = cf.DISCONNECTED),
                    rb.fire(wm.DISCONNECTED),
                    e();
            };
            const s = em.modules.get("GN");
            if (s && (s.params.regId || this.connectOptions.wxmpId)) {
                let e = (e) => {
                        t(e);
                    },
                    s = new pm({
                        name: Mf.manualDisconnect,
                        params: {},
                        permission: um.READ,
                        singleTimeout: Tf.commonRequestSingle,
                        totalTimeout: Tf.commonRequestTotal,
                        fail: e,
                        success: n,
                    });
                am.Socket.e(s);
            } else n();
        });
    }
    authorize() {
        return Of(this, void 0, void 0, function* () {
            let e = this.connectOptions,
                t = {
                    appkey: this.options.appkey,
                    userId: this.userId,
                    userData: JSON.stringify(e.data),
                    otp: e.otp,
                    artifactVersion: this.artifactVersion,
                    sid: this.sid,
                    wxmpId: e.wxmpId,
                    mP: yield em.getParams(),
                    a: this.anonymous,
                    z: yield ob.z(),
                    sm: yield sb.get(),
                    c: { n: this.vname, v: this.artifactVersion },
                };
            JSON.stringify(t);
            let n = new pm({
                name: Mf.authorize,
                params: t,
                permission: um.NONE,
                singleTimeout: Tf.commonInfiniteSingle,
                totalTimeout: Tf.commonInfiniteTotal,
                success: (e) => {
                    this.onAuthorizeSuccess(e);
                },
                fail: (e) => {
                    this.onAuthorizeFailed(e);
                },
            });
            this.ioSocketEmitter.emit(n);
        });
    }
    onConnecting() {
        rb.fire(wm.CONNECTING, this.reconnectingTimes),
            this.notify(this.connectingObservers, this.reconnectingTimes);
    }
    onIoReconnecting() {
        this.reconnectingTimes++,
            this.status == cf.CONNECTED ||
            this.status == cf.EXPIRED_RECONNECTED ||
            this.status == cf.RECONNECTING
                ? (this.status = cf.RECONNECTING)
                : (this.status = cf.CONNECTING),
            this.onConnecting();
    }
    onIoDisconnected() {
        this.status !== cf.DISCONNECTING &&
            ((this.status = cf.RECONNECTING),
            rb.fire(wm.LOST),
            this.notify(this.disconnectedObservers));
    }
    onAuthorizeSuccess(e) {
        sb.put(e),
            em.setDatas(e.mD),
            this.status === cf.RECONNECTING
                ? this.sid !== e.sid
                    ? ((this.status = cf.EXPIRED_RECONNECTED),
                      (this.sid = e.sid),
                      rb.fire(wm.EXPIRED_RECONNECTED),
                      this.notify(this.expiredReconnectedObservers))
                    : ((this.status = cf.RECONNECTED), rb.fire(wm.RECONNECTED))
                : ((this.status = cf.CONNECTED), (this.sid = e.sid)),
            e.enablePublish &&
                (this.permissions.find((e) => e == um.WRITE) ||
                    this.permissions.push(um.WRITE)),
            e.enableSubscribe &&
                (this.permissions.find((e) => e == um.READ) ||
                    this.permissions.push(um.READ)),
            (this.reconnectingTimes = 0),
            rb.fire(wm.CONNECTED),
            this.notify(this.connectedObservers);
    }
    onAuthorizeFailed(e) {
        this.ioSocket.disconnect(), (this.status = cf.CONNECT_FAILED);
        let t = {
            code: e.resultCode || 408,
            content: e.content || "Host unreachable or timeout",
        };
        this.notify(this.connectFailedObservers, t);
    }
    addConnectingObserver(e) {
        yf.isFunction(e) && this.connectingObservers.push(e);
    }
    addConnectFailedObserver(e) {
        yf.isFunction(e) && this.connectFailedObservers.push(e);
    }
    addExpiredReconnectedObserver(e) {
        yf.isFunction(e) && this.expiredReconnectedObservers.push(e);
    }
    onMessage(e, t) {
        this.ioSocket.io._callbacks.hasOwnProperty("$" + e) ||
            this.ioSocket.io.on(e, t);
    }
    validateUserIdAndData(e) {
        if (em.modules.get("GIM")) {
            if (!yf.isStringOrNumber(e.id))
                throw {
                    code: 400,
                    content: "TypeError: id requires number or string.",
                };
            if (!yf.isObject(e.data))
                throw {
                    code: 400,
                    content: "TypeError: data requires object.",
                };
        } else if ("string" == typeof e.id && e.id.length > 60)
            throw { code: 400, content: "id over max length 60" };
    }
    user() {
        let e = this.connectOptions;
        return e ? { id: e.id, data: e.data } : null;
    }
}
class cb {
    constructor(e) {
        (this.guidList = []), (this.socket = e);
    }
    offMessage(e, t) {
        rb.off(wm.NEW_MESSAGE + "_" + e, t);
    }
    onMessage(e, t) {
        rb.on(wm.NEW_MESSAGE + "_" + e, t),
            this.socket.onMessage(e, (t) => {
                this.fire(e, t);
            });
    }
    fire(e, t) {
        let n = this.filter(t);
        n && rb.fire(wm.NEW_MESSAGE + "_" + e, n);
    }
    filter(e) {
        if (("string" == typeof e && (e = JSON.parse(e)), e.i)) {
            if (this.guidList.findIndex((t) => t === e.i) > -1) return;
            this.guidList.unshift(e.i),
                this.guidList.length > 300 && this.guidList.pop();
        }
        return e;
    }
}
class lb {
    static init(e) {
        this.i = new lb(e);
    }
    constructor(e) {
        this.goeasyOptions = e;
    }
    static connect(e, t) {
        if (
            this.status() !== cf.DISCONNECTED &&
            yf.isObject(e) &&
            yf.isFunction(e.onFailed)
        )
            return void e.onFailed({
                code: 408,
                content:
                    "It is already connected, don't try again until disconnect() is called. ",
            });
        this.confirmUserIdAndData(e), rb.init();
        let n = this.i;
        (n.socket = new ab(n.goeasyOptions, e)),
            (n.socket.vname = t),
            (n.emitter = new ib(n.socket)),
            (n.messageListener = new cb(n.socket));
    }
    static confirmUserIdAndData(e) {
        if (em.modules.get("GIM")) {
            if (!yf.isStringOrNumber(e.id))
                throw {
                    code: 400,
                    content: "TypeError: id requires number or string.",
                };
            if (!yf.isObject(e.data))
                throw {
                    code: 400,
                    content: "TypeError: data requires object.",
                };
        } else if ("string" == typeof e.id && e.id.length > 60)
            throw { code: 400, content: "id over max length 60" };
    }
    static e(e) {
        this.i.emitter.emit(e);
    }
    static sendAck(e, t) {
        this.i.socket.sendAck(e, t);
    }
    static status() {
        return this.i && this.i.socket
            ? this.i.socket.getStatus()
            : cf.DISCONNECTED;
    }
    static on(e, t) {
        rb.on(e, t);
    }
    static off(e, t) {
        rb.off(e, t);
    }
    static offMessage(e, t) {
        this.i.messageListener.offMessage(e, t);
    }
    static onMessage(e, t) {
        this.i.messageListener.onMessage(e, t);
    }
    static disconnect(e) {
        this.i.socket
            .disconnect()
            .then(() => {
                kf.onSuccess(e);
            })
            .catch((t) => {
                kf.onFailed(e, t);
            });
    }
    static user() {
        return this.i.socket.user();
    }
}
lb.EVENT = wm;
class ub {
    static getInstance() {
        return ub.instance || (ub.instance = new ub()), ub.instance;
    }
    constructor() {
        (this.synchronized = !0),
            (this.onlineChanged = (e) => {
                e.online
                    ? this.teamIds.add(e.teamId)
                    : this.teamIds.delete(e.teamId);
            }),
            (this.onDisconnected = () => {
                (this.queryMyTeamPromise = null), (this.teamIds = null);
            }),
            (this.onConnected = () => {
                this.synchronized &&
                    (this.queryMyTeamPromise = this.queryTeams());
            }),
            lb.on(lb.EVENT.LOST, this.onDisconnected),
            lb.on(lb.EVENT.RECONNECTED, this.onConnected),
            lb.onMessage(Em.CS_ONLINE_CHANGED, this.onlineChanged);
    }
    queryTeams() {
        return (
            this.queryMyTeamPromise ||
                (this.queryMyTeamPromise = new Promise((e, t) => {
                    let n = new pm({
                        name: Mf.CS_MY_TEAMS,
                        params: {},
                        permission: um.READ,
                        singleTimeout: Tf.commonQuerySingle,
                        totalTimeout: Tf.commonQueryTotal,
                        fail: (e) => {
                            t(e);
                        },
                        success: (t) => {
                            (this.teamIds = new Set(t.content)),
                                (this.synchronized = !0),
                                e(this.teamIds);
                        },
                    });
                    am.Socket.e(n);
                })),
            this.queryMyTeamPromise
        );
    }
    myTeams() {
        if (this.synchronized && this.queryMyTeamPromise) return this.teamIds;
        throw "please query team first.";
    }
    isOnline(e, t) {
        return Of(this, void 0, void 0, function* () {
            yield this.queryTeams(), kf.onSuccess(t, this.teamIds.has(e));
        });
    }
    online(e, t) {
        if (!yf.isObject(t.agentData) || !yf.isObject(t.teamData))
            throw {
                code: 400,
                content: "agentData and teamData require an object",
            };
        let n = new wg(e, t.teamData, t.agentData),
            s = new pm({
                name: Mf.CS_ONLINE,
                params: n,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (n) => {
                    this.teamIds.add(e),
                        kf.onSuccess(t),
                        Zm.i.fire(Vm.CS_ONLINE_SUCCESS);
                },
            });
        am.Socket.e(s);
    }
    offline(e, t) {
        let n = new Cg(e),
            s = new pm({
                name: Mf.CS_OFFLINE,
                params: n,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (n) => {
                    this.teamIds.delete(e),
                        kf.onSuccess(t),
                        Zm.i.fire(Vm.CS_OFFLINE_SUCCESS);
                },
            });
        am.Socket.e(s);
    }
    agents(e, t) {
        let n = new _g(e),
            s = new pm({
                name: Mf.CS_AGENTS,
                params: n,
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (e) => {
                    e.content.forEach((e) => {
                        e.data = JSON.parse(e.data);
                    }),
                        kf.onSuccess(t, e);
                },
            });
        am.Socket.e(s);
    }
}
class db {
    constructor(e) {
        (this.onMessageReceived = (e) => {
            let t = db.session;
            if (e.scene() === pf.CS && t.liveOptions) {
                let n = e,
                    s = t.liveOptions.customerId;
                t.teamId === n.teamId &&
                    n.customerId() === s &&
                    (t.tryUpdateStatus(n), t.liveOptions.onNewMessage(n));
            }
        }),
            (this.teamId = e),
            Zm.i.on(Vm.CS_AGENT_MESSAGE_RECEIVED, this.onMessageReceived),
            Zm.i.on(Vm.CS_ACCEPTED, this.onMessageReceived),
            Zm.i.on(Vm.CS_ENDED, this.onMessageReceived),
            Zm.i.on(Vm.CS_TRANSFER, this.onMessageReceived),
            lb.on(wm.DISCONNECTED, db.destroy);
    }
    static live(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = t.customerId;
            ym.validateId(n, "customerId");
            let s = new Sg(e, n);
            yield ub.getInstance().queryTeams();
            let o = new pm({
                name: Mf.CS_LIVE_SESSION,
                params: s,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (n) => {
                    db.destroy(),
                        (this.session = new db(e)),
                        (this.session.liveOptions = t);
                    let s = n.content.customerStatus;
                    "ACCEPTED" === s.status &&
                        (s.agent.data = JSON.parse(s.agent.data)),
                        (this.session.status = s),
                        this.session.liveOptions.onStatusUpdated(
                            this.session.status
                        ),
                        kf.onSuccess(t);
                },
            });
            am.Socket.e(o);
        });
    }
    customerId() {
        return this.liveOptions.customerId;
    }
    static isMyCustomer(e) {
        let t = db.session;
        if (t && t.teamId === e.teamId && t.customerId() === e.customerId()) {
            let n = ub.getInstance().myTeams(),
                s = t.status.agent;
            return n.has(e.teamId) && (!s || s.id === am.Socket.user().id);
        }
        return !0;
    }
    static isMyMessage(e) {
        let t = og.byIMMessage(e);
        return (
            (e.type === Wm.TRANSFER &&
                e.payload.transferTo.id === am.Socket.user().id) ||
            this.isMyCustomer(t)
        );
    }
    static quit(e) {
        let t = db.session;
        if (t) {
            let n = t.liveOptions.customerId;
            ym.validateId(n, "customerId");
            let s = new Sg(t.teamId, n),
                o = new pm({
                    name: Mf.CS_QUIT_LIVE,
                    params: s,
                    permission: um.WRITE,
                    singleTimeout: Tf.commonRequestSingle,
                    totalTimeout: Tf.commonRequestTotal,
                    fail: (t) => {
                        kf.onFailed(e, t);
                    },
                    success: (t) => {
                        db.destroy(), kf.onSuccess(e);
                    },
                });
            am.Socket.e(o);
        }
    }
    tryUpdateStatus(e) {
        if (
            "FREE" !== this.status.status &&
            this.status.sessionId > e.sessionId
        )
            return;
        let t;
        switch (e.type) {
            case Wm.ACCEPT:
                (t = new Eg()),
                    (t.status = "ACCEPTED"),
                    (t.start = e.payload.sessionStart),
                    (t.sessionId = e.sessionId),
                    (t.agent = new gf(e.senderId, e.senderData));
                break;
            case Wm.END:
                (t = new Eg()), (t.status = "FREE");
                break;
            case Wm.TRANSFER:
                (t = new Eg()),
                    (t.status = "ACCEPTED"),
                    (t.start = e.payload.sessionStart),
                    (t.sessionId = e.sessionId),
                    (t.agent = e.payload.transferTo);
                break;
            default:
                "FREE" === this.status.status &&
                    ((t = new Eg()),
                    (t.status = "PENDING"),
                    (t.start = e.timestamp),
                    (t.sessionId = e.sessionId));
        }
        t && ((this.status = t), this.liveOptions.onStatusUpdated(t));
    }
}
db.destroy = () => {
    let e = db.session;
    e &&
        (Zm.i.off(Vm.CS_AGENT_MESSAGE_RECEIVED, e.onMessageReceived),
        Zm.i.off(Vm.CS_ACCEPTED, e.onMessageReceived),
        Zm.i.off(Vm.CS_ENDED, e.onMessageReceived),
        Zm.i.off(Vm.CS_TRANSFER, e.onMessageReceived),
        lb.off(wm.DISCONNECTED, db.destroy),
        (db.session = null));
};
class hb extends bg {
    constructor(e) {
        super(e), (this.unread = 0), (this.markingAmount = 0);
    }
    loadHistory(e, t) {
        return Of(this, void 0, void 0, function* () {
            return (
                yf.isUndef(t) ? (t = 10) : t > 30 && (t = 30),
                yield this.loadServerMessages(e, t)
            );
        });
    }
    loadServerMessages(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = new mg(
                    this.target.id.toString(),
                    this.target.scene,
                    e,
                    t,
                    this.target.teamId
                ),
                s = yield this.remoteHistory.loadServerMessages(this.target, n);
            return (
                s.userOffsets.forEach((e) => {
                    this.userOffsets.updateOffset(e.userId, e.offset);
                }),
                s.messages
            );
        });
    }
    deleteMessages(e) {
        return Of(this, void 0, void 0, function* () {
            kf.onFailed(e, "Delete CS message is not supported yet");
        });
    }
    initMaxMessageAndOffsets(e, t) {
        t.forEach((e) => {
            this.userOffsets.updateOffset(e.userId, e.offset);
        }),
            (yf.isUndef(this.acceptedMaxMessage) ||
                this.acceptedMaxMessage.timestamp < e.timestamp) &&
                this.increaseUnreadAmount(e),
            this.saveAcceptedMessage(e);
    }
    initPendingMaxMessageAndOffsets(e, t) {
        t.forEach((e) => {
            this.userOffsets.updateOffset(e.userId, e.offset);
        }),
            this.savePendingMessage(e);
    }
    savePendingMessage(e) {
        this.pendingMaxMessage
            ? this.pendingMaxMessage.timestamp < e.timestamp &&
              (this.pendingMaxMessage = e)
            : (this.pendingMaxMessage = e);
    }
    saveAcceptedMessage(e) {
        this.acceptedMaxMessage
            ? this.acceptedMaxMessage.timestamp < e.timestamp &&
              (this.acceptedMaxMessage = e)
            : (this.acceptedMaxMessage = e);
    }
    onMessageSending(e) {
        this.saveAcceptedMessage(e), Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, e);
    }
    onMessageSendSuccess(e) {
        this.saveAcceptedMessage(e),
            this.userOffsets.updateOffset(e.senderId, e.timestamp),
            this.acceptedMaxMessage === e &&
                Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, e);
    }
    onMessageSendFailed(e) {
        this.acceptedMaxMessage === e && Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, e);
    }
    onMessageReceived(e) {
        db.isMyMessage(e) &&
            (!e.accepted ||
            (e.senderId !== am.Socket.user().id && e.type === Wm.ACCEPT)
                ? this.savePendingMessage(e)
                : this.saveAcceptedMessage(e),
            this.userOffsets.updateOffset(e.senderId, e.timestamp),
            this.increaseUnreadAmount(e),
            Zm.i.fire(Vm.MAX_MESSAGE_CHANGED, e));
    }
    increaseUnreadAmount(e) {
        (e.sendByCustomer() ||
            (e.type === Wm.TRANSFER && e.senderId !== am.Socket.user().id)) &&
            this.userOffsets.myOffset() < e.timestamp &&
            e.accepted &&
            (this.unread += 1);
    }
    markRead() {
        return Of(this, void 0, void 0, function* () {
            let e = this.maxAcceptedMessageTime();
            db.isMyCustomer(this.target) &&
                this.preMark(e) &&
                (yield this.remoteHistory.updateServerOffsets(e, this.target),
                this.postMark(e));
        });
    }
    preMark(e) {
        let t = this.userOffsets.myOffset();
        return (
            e > this.userOffsets.markingTime &&
            e > t &&
            ((this.userOffsets.markingTime = e),
            (this.markingAmount = this.unread),
            !0)
        );
    }
    postMark(e) {
        e === this.userOffsets.markingTime &&
            ((this.unread -= this.markingAmount),
            (this.markingAmount = 0),
            this.userOffsets.updateOffset(am.Socket.user().id, e),
            Zm.i.fire(Vm.UNREAD_AMOUNT_CHANGED, this.target));
    }
    syncMarkedMessage(e) {}
    getMaxMessage(e) {
        return e ? this.acceptedMaxMessage : this.pendingMaxMessage;
    }
    unreadAmount(e) {
        return e ? this.unread : 0;
    }
    existsMessage(e) {
        return (
            (this.acceptedMaxMessage &&
                this.acceptedMaxMessage.messageId === e.messageId) ||
            (this.pendingMaxMessage &&
                this.pendingMaxMessage.messageId === e.messageId)
        );
    }
    maxAcceptedMessageTime() {
        return this.acceptedMaxMessage ? this.acceptedMaxMessage.timestamp : 0;
    }
    maxTime(e) {
        let t = this.getMaxMessage(e);
        return t ? t.timestamp : 0;
    }
}
class pb extends bg {
    constructor(e) {
        super(e);
    }
    deleteMessages(e) {
        return Of(this, void 0, void 0, function* () {
            kf.onFailed(e, "Delete CS message is not supported yet");
        });
    }
}
class fb {
    static validateMessageArray(e) {
        if (!yf.isArray(e) || yf.isEmpty(e))
            throw { code: 400, content: "messages requires non empty array" };
        if (e.length > 20)
            throw {
                code: 400,
                content: "The maximum number of messages is 20",
            };
        let t = og.byIMMessage(e[0]);
        for (let n = 0; n < e.length; n++) {
            let s = e[n];
            if (!(s instanceof Xm))
                throw {
                    code: 400,
                    content: "message[" + n + "] is not a correct message",
                };
            if (n > 0) {
                let e = og.byIMMessage(s);
                if (e.scene !== t.scene || e.id !== t.id)
                    throw {
                        code: 400,
                        content:
                            "each message must be from the same friend or group",
                    };
            }
        }
    }
}
class mb {
    static init() {
        return (mb.instance = new mb()), mb.instance;
    }
    constructor() {
        (this.map = new Map()),
            (this.onMessageSending = (e) => {
                let t = og.byIMMessage(e);
                this.findOrCreateHistory(t).onMessageSending(e);
            }),
            (this.onMessageSendSuccess = (e) => {
                let t = og.byIMMessage(e);
                this.findHistory(t).onMessageSendSuccess(e);
            }),
            (this.onMessageSendFailed = (e) => {
                let t = og.byIMMessage(e);
                this.findHistory(t).onMessageSendFailed(e);
            }),
            (this.onMessageReceived = (e) => {
                let t = og.byIMMessage(e);
                this.findOrCreateHistory(t).onMessageReceived(e);
            }),
            (this.onRemoteMarkRead = (e) => {
                let t = og.byMessageReadRemoteEvent(e),
                    n = this.findHistory(t);
                n && n.syncMarkedMessage(e);
            }),
            (this.onRemoteMessageDeleted = (e) => {
                let t = og.byIMMessageDeletedEvent(e),
                    n = this.findHistory(t);
                n && n.syncDeletedMessage(e.deleterId, e.times);
            }),
            (this.onMessageRecalled = (e) => {
                let t = og.byConversationId(e.scene, e.conversationId),
                    n = this.findHistory(t);
                n && n.recallMessages(e);
            }),
            (this.onDisconnected = () => {
                this.map.forEach((e, t) => {
                    e.expire();
                });
            }),
            (this.destroy = () => {}),
            this.initialListeners();
    }
    initialListeners() {
        Zm.i.on(Vm.MESSAGE_SENDING, this.onMessageSending),
            Zm.i.on(Vm.MESSAGE_SEND_SUCCESS, this.onMessageSendSuccess),
            Zm.i.on(Vm.MESSAGE_SEND_FAILED, this.onMessageSendFailed),
            Zm.i.on(Vm.MESSAGE_RECEIVED, this.onMessageReceived),
            Zm.i.on(Vm.CS_AGENT_MESSAGE_RECEIVED, this.onMessageReceived),
            Zm.i.on(Vm.CS_ACCEPTED, this.onMessageReceived),
            Zm.i.on(Vm.CS_ENDED, this.onMessageReceived),
            Zm.i.on(Vm.CS_TRANSFER, this.onMessageReceived),
            Zm.i.on(Vm.MESSAGE_RECALLED, this.onMessageRecalled),
            lb.onMessage(Em.IM_MSG_READ, this.onRemoteMarkRead),
            lb.onMessage(Em.IM_MSG_DELETED, this.onRemoteMessageDeleted),
            lb.on(lb.EVENT.LOST, this.onDisconnected);
    }
    loadHistory(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = this.queryToTarget(e, t),
                s = this.findOrCreateHistory(n),
                o = yield s.loadHistory(e.lastTimestamp, e.limit);
            kf.onSuccess(e, { code: 200, content: o });
        });
    }
    queryToTarget(e, t) {
        if (yf.isDef(e.userId)) return new og(pf.PRIVATE, e.userId);
        if (yf.isDef(e.groupId)) return new og(pf.GROUP, e.groupId);
        if (yf.isDef(e.type)) {
            if (!Object.values(pf).includes(e.type))
                throw new Error(
                    "incorrect type, must be: " + Object.values(pf)
                );
            if (yf.isUndef(e.id))
                throw new Error("If type is not empty, id is required.");
            return (
                pf.CS == e.type && yf.isUndef(t) && (t = e.id),
                new og(e.type, e.id, t)
            );
        }
        throw new Error("incorrect query options.");
    }
    privateMarkAsRead(e) {
        return Of(this, void 0, void 0, function* () {
            if (yf.isUndef(e.userId))
                throw new Error("userId could not be empty.");
            let t = og.byScene(pf.PRIVATE, e.userId);
            yield this.markAsRead(t, e);
        });
    }
    groupMarkAsRead(e) {
        return Of(this, void 0, void 0, function* () {
            if (yf.isUndef(e.groupId))
                throw new Error("groupId could not be empty.");
            let t = og.byScene(pf.GROUP, e.groupId);
            yield this.markAsRead(t, e);
        });
    }
    markMessageAsRead(e, t) {
        return Of(this, void 0, void 0, function* () {
            if (yf.isUndef(e.id)) throw new Error("id could not be empty.");
            if (!Object.values(pf).includes(e.type))
                throw new Error(
                    "incorrect type, must be: " + Object.values(pf)
                );
            pf.CS == e.type && yf.isUndef(t) && (t = e.id);
            let n = og.byScene(e.type, e.id, t);
            yield this.markAsRead(n, e);
        });
    }
    markAsRead(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = this.findHistory(e);
            n && (yield n.markRead()), kf.onSuccess(t);
        });
    }
    deleteMessage(e) {
        return Of(this, void 0, void 0, function* () {
            this.validateMessageArray(e.messages), rg.validate(e);
            let t = e.messages[0],
                n = og.byIMMessage(t),
                s = this.findHistory(n);
            if (!s)
                throw {
                    code: 400,
                    content: "No message that could be deleted",
                };
            yield s.deleteMessages(e);
        });
    }
    findOrCreateHistory(e) {
        let t = this.findHistory(e);
        return (
            t ||
            ((t =
                e.scene === pf.CS
                    ? am.Socket.user().id === e.customerId()
                        ? new pb(e)
                        : new hb(e)
                    : new bg(e)),
            this.map.set(e.toString(), t),
            t)
        );
    }
    static get(e) {
        return mb.instance.findOrCreateHistory(e);
    }
    findHistory(e) {
        return this.map.get(e.toString());
    }
    validateMessageArray(e) {
        fb.validateMessageArray(e);
    }
}
class gb {
    constructor(e) {
        (this.top = !1),
            (this.data = null),
            (this.dataLoaded = !1),
            (this.target = e);
    }
    toDto() {
        let e = this.target.scene,
            t = this.target.id,
            n = new mf();
        return (
            e === pf.PRIVATE
                ? (n.userId = t)
                : e === pf.GROUP
                ? (n.groupId = t)
                : e === pf.CS && (n.id = this.target.teamId),
            (n.type = e),
            (n.lastMessage = this.getMaxMessage()),
            (n.unread = this.getUnreadAmount()),
            (n.top = this.top),
            (n.data = this.data),
            n
        );
    }
    getMaxMessage() {
        return mb.get(this.target).getMaxMessage();
    }
    getUnreadAmount() {
        return mb.get(this.target).unreadAmount();
    }
    maxMessageTime() {
        return mb.get(this.target).maxTime();
    }
}
class yb extends gb {
    constructor(e) {
        super(e), (this.accepted = !1);
    }
    toDto() {
        let e = new mf(),
            t = this.target.scene,
            n = this.target.id,
            s = this.target.teamId;
        return (
            (e.id = n),
            (e.teamId = s),
            (e.type = t),
            (e.lastMessage = this.getMaxMessage()),
            (e.unread = this.getUnreadAmount()),
            (e.top = this.top),
            (e.data = this.data),
            (e.ended = this.isEnded()),
            e
        );
    }
    isEnded() {
        let e = this.getMaxMessage(),
            t = e.type,
            n = e.payload;
        return (
            t === Wm.END ||
            (t === Wm.TRANSFER && n.transferTo.id !== am.Socket.user().id)
        );
    }
    getMaxMessage() {
        return mb.get(this.target).getMaxMessage(this.accepted);
    }
    getUnreadAmount() {
        return mb.get(this.target).unreadAmount(this.accepted);
    }
    maxMessageTime() {
        return mb.get(this.target).maxTime(this.accepted);
    }
}
class vb {
    constructor(e, t, n, s) {
        (this.type = e), (this.top = t), (this.targetId = n), (this.teamId = s);
    }
}
class bb {
    constructor(e, t, n) {
        (this.type = e), (this.targetId = t), (this.teamId = n);
    }
}
class Sb {
    constructor(e, t, n) {
        (this.type = e), (this.targetId = t), (this.teamId = n);
    }
}
class Eb {
    top(e, t) {
        let n = new vb(e.scene, t, e.id, e.teamId);
        return new Promise((e, t) => {
            let s = new pm({
                name: Mf.topConversation,
                params: n,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                success: (n) => {
                    200 === n.code ? e(n) : t(n);
                },
                fail: (e) => {
                    t(e);
                },
            });
            am.Socket.e(s);
        });
    }
    remove(e) {
        let t = new bb(e.scene, e.id, e.teamId);
        return new Promise((e, n) => {
            let s = new pm({
                name: Mf.removeConversation,
                params: t,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                success: (t) => {
                    200 == t.code ? e(t) : n(t);
                },
                fail: (e) => {
                    n(e);
                },
            });
            am.Socket.e(s);
        });
    }
    query(e) {
        return new Promise((t, n) => {
            let s = new pm({
                name: e,
                params: {},
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                fail: (e) => {
                    n(e);
                },
                success: (e) =>
                    Of(this, void 0, void 0, function* () {
                        t(e);
                    }),
            });
            am.Socket.e(s);
        });
    }
    loadData(e) {
        let t = new Sb(e.scene, e.id, e.teamId);
        return new Promise((e, n) => {
            let s = new pm({
                name: Mf.imData,
                params: t,
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                success: (t) => {
                    let n = JSON.parse(t.content);
                    e(n);
                },
                fail: (e) => {
                    n(e);
                },
            });
            am.Socket.e(s);
        });
    }
}
Eb.instance = new Eb();
class wb {
    constructor() {
        (this.list = new Array()),
            (this.builder = new hg()),
            (this.remoteConversations = Eb.instance),
            (this.synchronized = !1),
            Zm.i.on(
                Vm.MAX_MESSAGE_CHANGED,
                this.onMaxMessageChanged.bind(this)
            ),
            Zm.i.on(
                Vm.UNREAD_AMOUNT_CHANGED,
                this.onUnreadMessageChanged.bind(this)
            ),
            Zm.i.on(
                Vm.MAX_MESSAGE_DELETED,
                this.onMaxMessageDeleted.bind(this)
            );
    }
    onUnreadMessageChanged(e) {
        this.findConversation(e) && this.fireUpdated();
    }
    fireUpdated() {
        let e = this.loadLocalConversations(),
            t = this.getUpdatedEventName();
        vg.fire(t, {
            unreadTotal: e.content.unreadTotal,
            conversations: e.content.conversations,
        });
    }
    getUpdatedEventName() {
        return zm.CONVERSATIONS_UPDATED;
    }
    latestConversations(e) {
        return Of(this, void 0, void 0, function* () {
            this.synchronized || (yield this.loadServerConversations());
            let t = this.loadLocalConversations();
            kf.onSuccess(e, t);
        });
    }
    loadServerConversations() {
        return Of(this, void 0, void 0, function* () {
            let e = this.rocketName(),
                t = yield this.remoteConversations.query(e);
            this.convertAbbrConversation(t.content), (this.synchronized = !0);
        });
    }
    rocketName() {
        return Mf.imLastConversations;
    }
    convertAbbrConversation(e) {
        let t = e;
        for (const n of t) {
            let e = n.t,
                t = n.top,
                s = n.d ? JSON.parse(n.d) : {},
                o = n.userOffsets;
            n.lmsg.t = e;
            let i = n.lmsg,
                r = this.builder.build(i),
                a = og.byIMMessage(r),
                c = this.findConversation(a);
            yf.isUndef(c)
                ? ((c = this.buildByAbbr(n, r)), this.insertOne(c))
                : ((c.top = t), (c.data = s)),
                mb.get(a).initMaxMessageAndOffsets(r, o),
                this.correctPosition(c);
        }
    }
    onMaxMessageDeleted(e) {
        this.removeConversation(e);
    }
    onMaxMessageChanged(e) {
        return Of(this, void 0, void 0, function* () {
            if (e.scene() === pf.CS) {
                let t = e;
                if (
                    am.Socket.user().id != t.customerId() &&
                    (!1 === t.accepted ||
                        (t.type === Wm.ACCEPT &&
                            t.senderId != am.Socket.user().id))
                )
                    return;
            }
            yield this.saveOrUpdateConversation(e);
        });
    }
    saveOrUpdateConversation(e) {
        return Of(this, void 0, void 0, function* () {
            let t = e.status,
                n = og.byIMMessage(e),
                s = this.findConversation(n);
            yf.isUndef(s) &&
                t !== ff.FAIL &&
                ((s = this.buildByMessage(e)),
                this.insertOne(s),
                t === ff.SUCCESS &&
                    ((s.data = yield this.remoteConversations.loadData(n)),
                    (s.dataLoaded = !0))),
                t === ff.SENDING &&
                    ((s.data = e.getToData()), (s.dataLoaded = !0)),
                s &&
                    s.dataLoaded &&
                    (this.correctPosition(s), this.fireUpdated());
        });
    }
    loadLocalConversations() {
        let e = 0,
            t = new Array();
        for (const n of this.list)
            if (n.dataLoaded && n.getMaxMessage()) {
                e += n.getUnreadAmount();
                let s = n.toDto();
                t.push(s);
            }
        return { code: 200, content: { unreadTotal: e, conversations: t } };
    }
    findConversationIndex(e) {
        return this.list.findIndex((t) => e.toString() === t.target.toString());
    }
    findConversation(e) {
        let t = this.findConversationIndex(e);
        return this.list[t];
    }
    removeLocalConversation(e) {
        let t = this.findConversationIndex(e.target);
        this.list.splice(t, 1);
    }
    insertOne(e) {
        wb.sortedInserter.insert(this.list, e),
            this.list.length > wb.CONVERSATIONS_MAX_LENGTH &&
                (this.list = this.list.slice(0, wb.CONVERSATIONS_MAX_LENGTH));
    }
    correctPosition(e) {
        this.removeLocalConversation(e), this.insertOne(e);
    }
    removeConversation(e) {
        let t = this.findConversation(e);
        t && (this.removeLocalConversation(t), this.fireUpdated());
    }
    top(e, t, n) {
        return Of(this, void 0, void 0, function* () {
            if (!yf.isBoolean(t)) throw new Error("top must be boolean.");
            let s = this.findConversation(e);
            if (!s) throw new Error("conversation does not exist.");
            s.top != t &&
                (yield this.remoteConversations.top(e, t),
                (s.top = t),
                this.correctPosition(s)),
                this.fireUpdated(),
                kf.onSuccess(n);
        });
    }
    remove(e, t) {
        return Of(this, void 0, void 0, function* () {
            let n = this.findConversation(e);
            if (!n) throw new Error("conversation does not exist.");
            if (n instanceof yb && !n.isEnded())
                throw new Error(
                    "CS conversation can only be deleted after it ends"
                );
            yield this.remoteConversations.remove(e),
                this.removeLocalConversation(n),
                this.fireUpdated(),
                kf.onSuccess(t);
        });
    }
    buildByAbbr(e, t) {
        let n,
            s = og.byIMMessage(t);
        if (e.t === pf.CS) {
            let e = t;
            am.Socket.user().id === e.customerId()
                ? (n = new gb(s))
                : ((n = new yb(s)), (n.accepted = e.accepted));
        } else n = new gb(s);
        return (
            (n.dataLoaded = !0),
            (n.top = e.top),
            (n.data = e.d ? JSON.parse(e.d) : {}),
            n
        );
    }
    buildByMessage(e) {
        let t,
            n = og.byIMMessage(e);
        if (e.scene() === pf.CS) {
            let s = e;
            am.Socket.user().id === s.customerId()
                ? (t = new gb(n))
                : ((t = new yb(n)), (t.accepted = s.accepted));
        } else t = new gb(n);
        return t;
    }
}
(wb.CONVERSATIONS_MAX_LENGTH = 200),
    (wb.sortedInserter = new (class extends ng {
        compare(e, t) {
            let n;
            if (e.top == t.top) {
                let s = e.maxMessageTime();
                n = t.maxMessageTime() - s;
            } else n = e.top ? -1 : 1;
            return 0 === n ? 0 : n > 0 ? 1 : -1;
        }
    })());
class Cb extends Zf {
    static init() {
        return (
            (this.module = new Cb()),
            (this.module.name = this.GIM_MODULE_NAME),
            this.initGN(),
            this.module
        );
    }
    static initGN() {
        mm.addAssembler(
            new (class {
                assemble(e) {
                    let t = {
                        messageId: e.id,
                        timestamp: e.tm,
                        type: e.t,
                        senderId: e.sid,
                        toType: e.tt,
                    };
                    return e.tt === pf.GROUP && (t.groupId = e.gid), t;
                }
                support(e) {
                    return !!e.sid;
                }
            })()
        );
    }
    postConnect() {
        pS.init();
    }
    static check() {
        if (!this.module)
            throw new Error(
                "IM not initialized. Please include 'IM' in the 'modules' during GoEasy initialization."
            );
    }
}
Cb.GIM_MODULE_NAME = "GIM";
class _b extends wb {
    constructor() {
        super(),
            (this.expired = !1),
            Zm.i.on(Vm.CS_ONLINE_SUCCESS, this.onCSOnlineSuccess.bind(this)),
            Zm.i.on(Vm.CS_OFFLINE_SUCCESS, this.onCSOfflineSuccess.bind(this)),
            lb.on(lb.EVENT.LOST, this.onDisconnected.bind(this)),
            lb.on(lb.EVENT.RECONNECTED, this.onConnected.bind(this));
    }
    onMaxMessageChanged(e) {
        return Of(this, void 0, void 0, function* () {
            if (e.scene() === pf.CS) {
                let t = e;
                if (
                    t.customerId() != am.Socket.user().id &&
                    (!1 === t.accepted || t.type === Wm.ACCEPT)
                )
                    if (Wm.ACCEPT === e.type) {
                        let t = og.byIMMessage(e);
                        this.removeConversation(t);
                    } else yield this.saveOrUpdateConversation(e);
            }
        });
    }
    latestConversations(e) {
        const t = Object.create(null, {
            latestConversations: { get: () => super.latestConversations },
        });
        return Of(this, void 0, void 0, function* () {
            let n = this.synchronized;
            yield t.latestConversations.call(this, e),
                this.list.length > 0 && !n && this.fireUpdated();
        });
    }
    onUnreadMessageChanged(e) {}
    onCSOnlineSuccess() {
        return Of(this, void 0, void 0, function* () {
            yield this.loadServerConversations(), this.fireUpdated();
        });
    }
    onCSOfflineSuccess() {
        (this.list = []), this.fireUpdated();
    }
    getUpdatedEventName() {
        return zm.PENDING_CONVERSATIONS_UPDATED;
    }
    rocketName() {
        return Mf.CS_PENDING_CONVERSATION;
    }
    convertAbbrConversation(e) {
        return Of(this, void 0, void 0, function* () {
            let t = e;
            for (const e of t) {
                e.lastMessage.t = pf.CS;
                let t = e.customerData,
                    n = e.lastMessage,
                    s = e.userOffsets,
                    o = t ? JSON.parse(t) : {},
                    i = this.builder.build(n),
                    r = og.byIMMessage(i),
                    a = this.findConversation(r);
                yf.isUndef(a) &&
                    ((a = new yb(r)),
                    (a.accepted = i.accepted),
                    (a.dataLoaded = !0),
                    this.insertOne(a)),
                    (a.top = !1),
                    (a.data = o),
                    mb.get(r).initPendingMaxMessageAndOffsets(i, s),
                    this.correctPosition(a);
            }
        });
    }
    onDisconnected() {
        this.expired = !0;
    }
    onConnected() {
        return Of(this, void 0, void 0, function* () {
            this.expired &&
                Cb.module &&
                Cb.module.active &&
                ((this.expired = !1),
                (this.list = []),
                yield this.loadServerConversations(),
                this.fireUpdated());
        });
    }
}
class Mb {
    constructor() {
        (this.conversations = new wb()), (this.pendingConversations = new _b());
    }
    latestConversations(e) {
        this.conversations.latestConversations(e);
    }
    latestPendingConversations(e) {
        this.pendingConversations.latestConversations(e);
    }
    topPrivateConversation(e) {
        let t = og.byScene(pf.PRIVATE, e.userId);
        this.conversations.top(t, e.top, e);
    }
    topGroupConversation(e) {
        let t = og.byScene(pf.GROUP, e.groupId);
        this.conversations.top(t, e.top, e);
    }
    topConversation(e) {
        let t = e.conversation;
        this.validateConversationDTO(t);
        let n = og.byConversationDTO(t);
        this.conversations.top(n, e.top, e);
    }
    removePrivateConversation(e) {
        let t = og.byScene(pf.PRIVATE, e.userId);
        this.conversations.remove(t, e);
    }
    removeGroupConversation(e) {
        let t = og.byScene(pf.GROUP, e.groupId);
        this.conversations.remove(t, e);
    }
    removeConversation(e) {
        let t = e.conversation;
        this.validateConversationDTO(t);
        let n = og.byConversationDTO(t);
        this.conversations.remove(n, e);
    }
    validateConversationDTO(e) {
        if (!(e instanceof mf))
            throw new Error("Incorrect conversation object.");
        {
            let t = e.lastMessage;
            if (
                t instanceof dg &&
                t.customerId() !== am.Socket.user().id &&
                !1 === t.accepted
            )
                throw new Error(
                    "pending conversation cannot be topped or removed."
                );
        }
    }
}
class Tb {
    constructor() {
        (this.builder = new hg()),
            am.Socket.onMessage(
                Em.imMessage,
                this.onMessageReceived.bind(this)
            );
    }
    onMessageReceived(e) {
        if (e.t !== pf.CS) {
            let t = this.builder.build(e);
            this.sendAck(t);
            let n = og.byIMMessage(t),
                s = n.scene;
            mb.get(n).existsMessage(t) ||
                (this.createNotification(e),
                Zm.i.fire(Vm.MESSAGE_RECEIVED, t),
                s === pf.PRIVATE
                    ? vg.fire(zm.PRIVATE_MESSAGE_RECEIVED, t)
                    : s === pf.GROUP && vg.fire(zm.GROUP_MESSAGE_RECEIVED, t));
        }
    }
    sendAck(e) {
        am.Socket.sendAck("imAck", { publishGuid: e.messageId });
    }
    createNotification(e) {
        const t = am.N.supportNotification();
        if (!yf.isObject(e.nt) || e.s === am.Socket.user().id || !t) return;
        let n = { id: e.i, tm: e.ts, t: e.mt, sid: e.s, tt: e.t };
        n.tt === pf.GROUP && (n.gid = e.r),
            am.N.createLocalNotification(
                e.nt.t,
                e.nt.c,
                n,
                e.nt.sound,
                e.nt.badge
            );
    }
}
class Ib {
    subscribe(e) {
        ym.validateIdArray(e.groupIds, "groupIds"),
            (e.groupIds = e.groupIds.toString().split(","));
        let t = new pm({
            name: Mf.subscribeGroups,
            params: { groupIds: e.groupIds, at: e.accessToken },
            permission: um.WRITE,
            singleTimeout: Tf.commonRequestSingle,
            totalTimeout: Tf.commonRequestTotal,
            success: function () {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            fail: function (t) {
                kf.onFailed(e, {
                    code: t.resultCode || 408,
                    content: t.content || "Failed to subscribe group message",
                });
            },
        });
        am.Socket.e(t);
    }
    unsubscribe(e) {
        ym.validateId(e.groupId, "groupId"), (e.groupId = e.groupId.toString());
        let t = new pm({
            name: Mf.unsubscribeGroup,
            params: { groupId: e.groupId },
            permission: um.READ,
            singleTimeout: Tf.commonRequestSingle,
            totalTimeout: Tf.commonRequestTotal,
            success: () => {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            fail: (t) => {
                kf.onFailed(e, {
                    code: t.resultCode || 408,
                    content: t.content || "Failed to unsubscribe group message",
                });
            },
        });
        am.Socket.e(t);
    }
}
class kb {
    constructor() {
        (this.newMessageReceived = (e) => {
            let t = null;
            e.c && (t = JSON.parse(e.c)),
                t &&
                    t.events &&
                    t.events.map((e) => {
                        let n = e.userData ? JSON.parse(e.userData) : {},
                            s = {
                                time: e.time,
                                action: e.action,
                                groupOnlineCount: t.userAmount,
                                groupId: t.groupId,
                                id: e.userId,
                                data: n,
                            };
                        vg.fire(zm.GROUP_PRESENCE, s);
                    });
        }),
            lb.onMessage(Em.groupPresence, this.newMessageReceived);
    }
    presence(e) {
        ym.validateIdArray(e.groupIds, "groupIds"),
            e.groupIds.toString().split(",");
        let t = { groupIds: e.groupIds };
        this.emitRocket(
            Mf.subscribeGroupPresence,
            t,
            () => {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            (t) => {
                kf.onFailed(e, {
                    code: t.code || 408,
                    content: t.content || "Failed to subscribe group message",
                });
            },
            Tf.commonRequestSingle,
            Tf.commonRequestTotal
        );
    }
    unPresence(e) {
        ym.validateId(e.groupId, "groupId"), (e.groupId = e.groupId.toString());
        let t = { groupId: e.groupId };
        this.emitRocket(
            Mf.unsubscribeGroupPresence,
            t,
            () => {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            (t) => {
                kf.onFailed(e, {
                    code: t.code || 408,
                    content: t.content || "Failed to unsubscribe presence",
                });
            },
            Tf.commonRequestSingle,
            Tf.commonRequestTotal
        );
    }
    emitRocket(e, t, n, s, o, i) {
        let r = new pm({
            name: e,
            params: t,
            singleTimeout: o,
            totalTimeout: i,
            permission: um.WRITE,
            success: n,
            fail: s,
        });
        am.Socket.e(r);
    }
}
class Ob {
    get(e) {
        ym.validateId(e.groupId, "groupId"), (e.groupId = e.groupId.toString());
        let t = new pm({
            name: Mf.imGroupOnlineCount,
            params: { groupId: e.groupId },
            permission: um.READ,
            singleTimeout: Tf.commonQuerySingle,
            totalTimeout: Tf.commonQueryTotal,
            fail: function (t) {
                kf.onFailed(
                    e,
                    t || {
                        code: 408,
                        content: "Failed to query online group users",
                    }
                );
            },
            success: function (t) {
                200 == t.code ? kf.onSuccess(e, t) : kf.onFailed(e, t);
            },
        });
        am.Socket.e(t);
    }
}
class Nb {
    doHereNow(e, t, n) {
        let s = new pm({
            name: e,
            params: t,
            permission: um.READ,
            singleTimeout: Tf.commonQuerySingle,
            totalTimeout: Tf.commonQueryTotal,
            fail: (e) => {
                kf.onFailed(n, e);
            },
            success: (e) => {
                let t = e.content;
                (e.content = t.map((e) => {
                    let t = e.userData ? JSON.parse(e.userData) : {};
                    return { id: e.userId, data: t };
                })),
                    kf.onSuccess(n, e);
            },
        });
        am.Socket.e(s);
    }
}
class xb extends Nb {
    hereNow(e) {
        ym.validateId(e.groupId, "groupId"), (e.groupId = e.groupId.toString());
        let t = { groupId: e.groupId };
        this.doHereNow(Mf.imGroupHereNow, t, e);
    }
}
class Ab {
    constructor() {
        (this.newMessageReceived = (e) => {
            let t = [];
            e.c && (t = JSON.parse(e.c).events || []),
                t.map((e) => {
                    let t = e.userData ? JSON.parse(e.userData) : {},
                        n = {
                            time: e.time,
                            action: e.action,
                            id: e.userId,
                            data: t,
                        };
                    vg.fire(zm.USER_PRESENCE, n);
                });
        }),
            lb.onMessage(Em.userPresence, this.newMessageReceived);
    }
    presence(e) {
        ym.validateIdArray(e.userIds, "userIds"),
            e.userIds.toString().split(",");
        let t = { userIds: e.userIds };
        this.emitRocket(
            Mf.subscribeUserPresence,
            t,
            () => {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            (t) => {
                kf.onFailed(e, {
                    code: t.code || 408,
                    content: t.content || "Failed to subscribe group message",
                });
            },
            Tf.commonRequestSingle,
            Tf.commonRequestTotal
        );
    }
    unPresence(e) {
        ym.validateId(e.userId, "userId"), (e.userId = e.userId.toString());
        let t = { userId: e.userId };
        this.emitRocket(
            Mf.unsubscribeUserPresence,
            t,
            () => {
                kf.onSuccess(e, { code: 200, content: "ok" });
            },
            (t) => {
                kf.onFailed(e, {
                    code: t.code || 408,
                    content: t.content || "Failed to unsubscribe presence",
                });
            },
            Tf.commonRequestSingle,
            Tf.commonRequestTotal
        );
    }
    emitRocket(e, t, n, s, o, i) {
        let r = new pm({
            name: e,
            params: t,
            singleTimeout: o,
            totalTimeout: i,
            permission: um.WRITE,
            success: n,
            fail: s,
        });
        am.Socket.e(r);
    }
}
class Rb extends Nb {
    hereNow(e) {
        let t = e.userIds;
        ym.validateIdArray(t, "userIds"),
            t.toString().split(","),
            this.doHereNow(Mf.imHereNow, e, e);
    }
}
const Pb = new (class {
    fileExtension(e, t) {
        if (yf.isString(e))
            try {
                let n = e.split(t);
                return n[n.length - 1];
            } catch (n) {
                throw Error(n);
            }
    }
})();
class Db {}
class Lb extends Db {
    constructor() {
        super(...arguments),
            (this.contentType = ""),
            (this.name = ""),
            (this.size = 0),
            (this.url = "");
    }
}
class Fb extends Lb {
    constructor() {
        super(...arguments), (this.width = 0), (this.height = 0);
    }
}
class Ub {
    build(e) {
        this.validate(e.createOptions);
        let t = this.create();
        return this.setPayload(e, t), t;
    }
}
class Bb extends Ub {
    create() {
        return new Lb();
    }
    setPayload(e, t) {
        let n = t,
            s = e.createOptions.file;
        (n.url = s.path),
            (n.name = s.name),
            (n.size = s.size),
            (n.contentType = s.type),
            (e.complete = Promise.resolve());
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!yf.isDef(e.file)) throw Error("file is empty.");
    }
}
class jb extends Bb {
    create() {
        return new Fb();
    }
    setPayload(e, t) {
        super.setPayload(e, t);
        let n = e.createOptions.file,
            s = t,
            o = n.path || n.tempFilePath,
            i = yf.isEmpty(n.name) || void 0 === n.name ? o : n.name;
        (s.name = "wx-image." + Pb.fileExtension(i, ".")),
            (s.contentType = "image/" + Pb.fileExtension(i, ".")),
            (s.url = o),
            (s.size = n.size),
            (e.complete = new Promise((e, t) => {
                hp({
                    src: s.url,
                    success(t) {
                        (s.width = t.width), (s.height = t.height), e();
                    },
                    fail(e) {
                        t(e);
                    },
                });
            }));
    }
    validate(e) {
        super.validate(e);
    }
}
class Gb extends Lb {
    constructor() {
        super(...arguments), (this.duration = 0);
    }
}
class $b extends Bb {
    create() {
        return new Gb();
    }
    setPayload(e, t) {
        super.setPayload(e, t);
        let n = e.createOptions.file,
            s = t,
            o = n.tempFilePath,
            i = yf.isEmpty(n.name) || null == n.name ? o : n.name,
            r = n.duration,
            a = n.fileSize;
        (s.url = o),
            (s.size = a),
            (s.duration = r / 1e3),
            (s.name = "wx-audio." + Pb.fileExtension(i, ".")),
            (s.contentType = "audio/" + Pb.fileExtension(i, ".")),
            (e.complete = Promise.resolve());
    }
    validate(e) {
        super.validate(e);
    }
}
class qb extends Db {
    constructor() {
        super(...arguments), (this.text = "");
    }
}
class Vb extends Ub {
    create() {
        return new qb();
    }
    setPayload(e, t) {
        let n = t,
            s = e.createOptions;
        (n.text = s.text), (e.complete = Promise.resolve());
    }
    validate(e) {
        if (yf.isEmpty(e.text)) throw { code: 400, content: "text is empty" };
        if (!yf.isString(e.text))
            throw { code: 400, content: "TypeError: text requires string." };
        if ("" === e.text.trim()) throw { code: 400, content: "text is empty" };
        if (e.text.length > 2500)
            throw { code: 400, content: "Message text over max length 2500" };
    }
}
class Hb extends Db {
    constructor() {
        super(...arguments),
            (this.video = new zb()),
            (this.thumbnail = new Wb());
    }
}
class Wb {
    constructor() {
        (this.name = ""),
            (this.url = ""),
            (this.width = 0),
            (this.height = 0),
            (this.contentType = "");
    }
    initURL(e) {
        bf.currentPlatform() === vf.BROWSER && this.htmlUrl(e);
    }
    htmlUrl(e) {
        let t = document.createElement("canvas");
        (t.width = e.videoWidth),
            (t.height = e.videoHeight),
            t.getContext("2d").drawImage(e, 0, 0, t.width, t.height),
            (this.url = t.toDataURL("image/png"));
    }
}
class zb {
    constructor() {
        (this.name = ""),
            (this.url = ""),
            (this.width = 0),
            (this.height = 0),
            (this.contentType = ""),
            (this.size = 0),
            (this.duration = 0);
    }
}
class Xb extends Ub {
    create() {
        return new Hb();
    }
    setPayload(e, t) {
        let n = e.createOptions.file,
            s = t,
            o = s.video,
            i = s.thumbnail,
            {
                duration: r,
                height: a,
                size: c,
                tempFilePath: l,
                thumbTempFilePath: u,
                width: d,
                name: h = "",
            } = n,
            p = yf.isEmpty(h) ? l : h;
        (o.contentType = "video/" + Pb.fileExtension(p, ".")),
            (o.name = "wx-video." + Pb.fileExtension(p, ".")),
            (o.url = l),
            (o.width = i.width = d),
            (o.height = i.height = a),
            (o.size = c),
            (o.duration = r),
            (i.url = u),
            (i.contentType = "image/jpg"),
            (i.name = "wx-thumbnail.jpg"),
            (e.complete = Promise.resolve());
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!yf.isDef(e.file)) throw Error("file is empty.");
    }
}
class Jb extends Ub {
    create() {
        return new Lb();
    }
    setPayload(e, t) {
        let n = t,
            s = e.createOptions.file;
        (n.url = s.fullPath || s.path),
            (n.name = s.name),
            (n.size = s.size),
            (n.contentType = s.type),
            s.type,
            (e.complete = Promise.resolve());
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!yf.isDef(e.file)) throw Error("file is empty.");
    }
}
class Kb extends Jb {
    create() {
        return new Fb();
    }
    setPayload(e, t) {
        let n = t,
            s = e.createOptions.file;
        (n.url = s.path), (n.size = s.size);
        let o = yf.isEmpty(s.name) || void 0 === s.name ? s.path : s.name;
        (n.contentType = "image/" + Pb.fileExtension(o, ".")),
            (n.name = "uni-image." + Pb.fileExtension(o, ".")),
            (e.complete = new Promise((e, t) => {
                hp({
                    src: s.path,
                    success(t) {
                        (n.width = t.width), (n.height = t.height), e();
                    },
                    fail(e) {
                        t(e);
                    },
                });
            }));
    }
    validate(e) {
        super.validate(e);
    }
}
class Yb extends Jb {
    create() {
        return new Gb();
    }
    setPayload(e, t) {
        let n = e.createOptions,
            s = t,
            o = n.file,
            i = o.tempFilePath,
            r = yf.isEmpty(o.name) || null == o.name ? i : o.name;
        (s.url = i),
            (s.name = "uni-audio." + Pb.fileExtension(r, ".")),
            (s.contentType = "audio/" + Pb.fileExtension(r, ".")),
            (e.complete = new Promise((e, t) => {
                dp({
                    filePath: i,
                    success: (o) => {
                        let r = o.size;
                        if (((s.size = r), 0 === r)) e();
                        else if (yf.isDef(n.file.duration))
                            (s.duration = n.file.duration / 1e3), e();
                        else {
                            const n = Xh();
                            (n.src = i),
                                n.onCanplay(function (o) {
                                    o.errCode
                                        ? (n.destroy(), t(o))
                                        : ((s.duration = n.duration),
                                          n.destroy(),
                                          e());
                                }),
                                n.onError((s) => {
                                    n.destroy(), -99 === s.errCode ? e() : t(s);
                                });
                        }
                    },
                    fail(e) {
                        t(e);
                    },
                });
            }));
    }
    validate(e) {
        super.validate(e);
    }
}
class Qb extends Ub {
    create() {
        return new Hb();
    }
    setPayload(e, t) {
        let n = e.createOptions.file,
            s = t,
            o = s.video,
            i = s.thumbnail,
            {
                duration: r,
                height: a,
                size: c,
                tempFilePath: l,
                width: u,
                name: d = "",
            } = n,
            h = yf.isEmpty(d) ? l : d;
        (o.size = c),
            (o.width = u),
            (o.height = a),
            (o.url = l),
            (o.duration = r),
            (o.contentType = "video/" + Pb.fileExtension(h, ".")),
            (o.name = "uni-video." + Pb.fileExtension(h, ".")),
            (i.url = l),
            (i.height = 200),
            (i.width = Number(((o.width * i.height) / o.height).toFixed(0))),
            (i.contentType = "image/jpg"),
            (i.name = "uni-thumbnail.jpg"),
            (e.complete = Promise.resolve());
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!yf.isDef(e.file)) throw Error("file is empty.");
    }
}
class Zb extends Ub {
    create() {
        return new Lb();
    }
    setPayload(e, t) {
        let n = t,
            s = e.createOptions.file,
            o = window.URL || window.webkitURL;
        (n.url = o.createObjectURL(s)),
            (n.name = s.name),
            (n.size = s.size),
            (n.contentType = s.type),
            (e.complete = Promise.resolve());
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!(e.file instanceof File)) throw Error("wrong file type.");
        if (0 == e.file.size) throw Error("File size is 0.");
        if (e.file.size > 524288e3) throw Error("message-length limit 30mib");
    }
}
class eS extends Zb {
    create() {
        return new Fb();
    }
    setPayload(e, t) {
        super.setPayload(e, t);
        let n = e.createOptions.file,
            s = t,
            o = window.URL || window.webkitURL,
            i = new Image();
        (i.src = o.createObjectURL(n)),
            (e.complete = new Promise((e, t) => {
                (i.onload = function () {
                    (s.width = i.width),
                        (s.height = i.height),
                        o.revokeObjectURL(i.src),
                        e();
                }),
                    (i.onerror = function (e) {
                        o.revokeObjectURL(i.src), t(e);
                    });
            }));
    }
    validate(e) {
        super.validate(e);
        let t = ["gif", "jpg", "png", "jpeg"];
        if (!t.find((t) => t === e.file.type.split("/")[1].toLowerCase()))
            throw Error("Only " + t.join(",") + " is supported image.");
    }
}
class tS extends Zb {
    create() {
        return new Gb();
    }
    setPayload(e, t) {
        super.setPayload(e, t);
        let n = e.createOptions.file,
            s = t,
            o = window.URL || window.webkitURL,
            i = document.createElement("audio");
        (i.src = o.createObjectURL(n)),
            (e.complete = new Promise((e, t) => {
                (i.onloadedmetadata = () => {
                    (s.duration = i.duration), o.revokeObjectURL(i.src), e();
                }),
                    (i.onerror = (e) => {
                        o.revokeObjectURL(i.src), t(e);
                    });
            }));
    }
    validate(e) {
        super.validate(e);
        let t = ["mp3", "ogg", "wav", "wma", "ape", "acc", "mpeg"];
        if (!t.find((t) => t === e.file.type.split("/")[1].toLowerCase()))
            throw Error("Only " + t.join(",") + " is supported audio.");
    }
}
class nS extends Ub {
    create() {
        return new Hb();
    }
    setPayload(e, t) {
        let n = e.createOptions.file,
            s = t,
            o = s.video,
            i = s.thumbnail,
            r = window.URL || window.webkitURL,
            a = document.createElement("video");
        (a.src = r.createObjectURL(n)),
            (o.size = n.size),
            (o.name = n.name),
            (o.contentType = n.type),
            (o.url = a.src),
            (i.name = n.name),
            (i.contentType = "image/jpg"),
            (e.complete = new Promise((e, t) => {
                (a.onloadedmetadata = () => {
                    (o.duration = a.duration),
                        (o.width = a.videoWidth),
                        (o.height = a.videoHeight),
                        (i.width = a.videoWidth),
                        (i.height = a.videoHeight),
                        (i.url = this.getThumbnailUrl(a)),
                        r.revokeObjectURL(a.src),
                        e();
                }),
                    (a.onerror = function (e) {
                        r.revokeObjectURL(a.src), t(e);
                    });
            }));
    }
    getThumbnailUrl(e) {
        let t = document.createElement("canvas");
        return (
            (t.width = e.videoWidth),
            (t.height = e.videoHeight),
            t.getContext("2d").drawImage(e, 0, 0, t.width, t.height),
            t.toDataURL("image/png")
        );
    }
    validate(e) {
        if (!yf.isObject(e)) throw Error("it is an empty message.");
        if (!(e.file instanceof File)) throw Error("wrong file type.");
        if (0 == e.file.size) throw Error("File size is 0.");
        if (e.file.size > 31457280) throw Error("message-length limit 30mib");
        let t = ["avi", "mov", "rmvb", "rm", "flv", "mp4", "3gp", "quicktime"];
        if (!t.find((t) => t === e.file.type.split("/")[1].toLowerCase()))
            throw Error("Only " + t.join(",") + " is supported video.");
    }
}
class sS extends Db {}
class oS extends Ub {
    create() {
        return new sS();
    }
    setPayload(e, t) {
        let n = e.createOptions;
        (t.payload = n.payload), (e.complete = Promise.resolve());
    }
    validate(e) {
        let t = e.type,
            n = e.payload;
        if (yf.isEmpty(t)) throw Error("type is empty.");
        if (!yf.isString(t)) throw Error("type require a string");
        if (yf.isEmpty(n)) throw Error("payload is empty.");
        if (!yf.isPlainObject(n) && !yf.isStringOrNumber(n))
            throw Error("payload require object | string | number.");
    }
}
class iS {
    constructor(e, t) {
        (this.type = e), (this.createOptions = t);
    }
}
class rS {
    constructor() {
        (this.framework = uf.currentFramework()),
            (this.platform = bf.currentPlatform()),
            (this.payloadBuilders = {
                [af.UNIAPP]: {
                    image: new Kb(),
                    file: new Jb(),
                    audio: new Yb(),
                    video: new Qb(),
                    text: new Vb(),
                },
                [vf.MP_WX]: {
                    image: new jb(),
                    file: new Bb(),
                    audio: new $b(),
                    video: new Xb(),
                    text: new Vb(),
                },
                [vf.BROWSER]: {
                    image: new eS(),
                    file: new Zb(),
                    audio: new tS(),
                    video: new nS(),
                    text: new Vb(),
                },
            });
    }
    buildMessage(e, t) {
        const n =
            this.framework === af.UNKNOWN ? this.platform : this.framework;
        let s = this.payloadBuilders[n][e],
            o = new iS(e, t);
        if (s) {
            let e = s.build(o);
            o.payload = e;
        } else {
            let e = new oS().build(o);
            o.payload = e.payload;
        }
        let i = this.build(o);
        return (
            o.complete
                .then(() => {
                    kf.onSuccess(t, i);
                })
                .catch((e) => {
                    kf.onFailed(t, e);
                }),
            i
        );
    }
    build(e) {
        let t,
            n = e.type,
            s = e.payload,
            o = e.createOptions,
            i = o.to,
            r = i.type;
        return (
            this.validate(o),
            r === pf.GROUP
                ? ((t = new ug()),
                  (t.groupId = i.id.toString()),
                  (t.senderData = am.Socket.user().data))
                : r === pf.PRIVATE
                ? ((t = new lg()),
                  (t.read = !1),
                  (t.receiverId = i.id.toString()))
                : r === pf.CS &&
                  ((t = new dg()),
                  (t.to = i.id.toString()),
                  (t.teamId = i.id.toString()),
                  (t.senderData = am.Socket.user().data)),
            (t.senderId = am.Socket.user().id),
            (t.messageId = lm.get()),
            (t.payload = s),
            (t.timestamp = Date.now()),
            (t.type = n),
            (t.recalled = !1),
            (t.status = ff.NEW),
            (t.buildOptions = e),
            t
        );
    }
    validate(e) {
        const t = e.to;
        if (!t) throw new Error("message require property to.");
        if (!yf.isObject(t))
            throw new Error("TypeError: to requires an object.");
        if (!yf.isObject(t.data))
            throw new Error("TypeError: to.data requires an object.");
        if (
            !t.type ||
            (t.type !== pf.GROUP && t.type !== pf.PRIVATE && t.type !== pf.CS)
        )
            throw new Error("message require property to.type");
        if (yf.isEmpty(t.id)) throw new Error("message require property to.id");
        if (!yf.isStringOrNumber(t.id))
            throw new Error("to.id should be a string or number.");
        if (am.Socket.user().id === t.id)
            throw new Error("to.id can not be the same as your id.");
        yf.isDef(e.notification) && ym.validateNotification(e.notification),
            e.wxmpTemplateMsg && ym.validateWXMPTemplateMsg(e.wxmpTemplateMsg);
    }
}
class aS extends Tb {
    onMessageReceived(e) {
        if (e.t === pf.CS) {
            let t = this.builder.build(e);
            this.sendAck(t);
            let n = og.byIMMessage(t);
            mb.get(n).existsMessage(t) ||
                (t.customerId() === am.Socket.user().id
                    ? (this.createNotification(e),
                      Zm.i.fire(Vm.MESSAGE_RECEIVED, t),
                      vg.fire(zm.CS_MESSAGE_RECEIVED, t))
                    : ub
                          .getInstance()
                          .queryTeams()
                          .then(() => {
                              db.isMyMessage(t) && this.createNotification(e),
                                  Zm.i.fire(Vm.CS_AGENT_MESSAGE_RECEIVED, t);
                          }));
        }
    }
}
class cS {
    constructor(e) {
        this.times = new Array();
        let t = e[0],
            n = og.byIMMessage(t);
        (this.scene = n.scene),
            (this.targetId = n.id),
            e.forEach((e) => {
                this.times.push(e.timestamp);
            }),
            this.times.sort((e, t) => (e < t ? -1 : e == t ? 0 : 1));
    }
}
class lS {
    constructor() {
        (this.onRemoteRecalled = (e) => {
            Zm.i.fire(Vm.MESSAGE_RECALLED, e);
        }),
            lb.onMessage(Em.IM_MSG_RECALLED, this.onRemoteRecalled);
    }
    recallMessage(e) {
        return Of(this, void 0, void 0, function* () {
            fb.validateMessageArray(e.messages), this.validate(e);
            let t = e.messages;
            yield this.recallServerMessages(t);
            let n = t[0],
                s = n.scene(),
                o = this.toConversationId(s, n.senderId, n.targetId()),
                i = { id: am.Socket.user().id, data: am.Socket.user().data },
                r = t.map((e) => e.timestamp),
                a = new yg(s, o, i, r);
            Zm.i.fire(Vm.MESSAGE_RECALLED, a), kf.onSuccess(e);
        });
    }
    toConversationId(e, t, n) {
        if (pf.PRIVATE === e)
            return (
                (o = n),
                (s = t).localeCompare(o) > 0 ? `${s}:${o}` : `${o}:${s}`
            );
        var s, o;
        if (pf.GROUP === e) return n;
        throw { code: 400, content: `scene: ${e} not support` };
    }
    recallServerMessages(e) {
        let t = new cS(e);
        return 0 === t.times.length
            ? Promise.resolve()
            : new Promise((e, n) => {
                  let s = new pm({
                      name: Mf.IM_RECALL_MESSAGE,
                      params: t,
                      permission: um.WRITE,
                      singleTimeout: Tf.commonRequestSingle,
                      totalTimeout: Tf.commonRequestTotal,
                      fail: (e) => {
                          n(e);
                      },
                      success: (t) => {
                          200 === t.code ? e(t) : n(t);
                      },
                  });
                  am.Socket.e(s);
              });
    }
    validate(e) {
        let t = e.messages;
        for (let n = 0; n < t.length; n++) {
            let e = t[n];
            if (e.scene() === pf.CS)
                throw {
                    code: 400,
                    content: "Recall CS message is not supported yet.",
                };
            if (e.status !== ff.SUCCESS)
                throw {
                    code: 400,
                    content:
                        "message[" +
                        n +
                        "] is '" +
                        e.status +
                        "' and cannot be recalled",
                };
            if (e.recalled)
                throw {
                    code: 400,
                    content: "message[" + n + "] has been recalled",
                };
            if (e.senderId !== am.Socket.user().id)
                throw {
                    code: 400,
                    content:
                        "it is not allowed to recall messages sent by others",
                };
        }
    }
}
class uS {
    constructor() {
        this.map = new Map();
    }
    getData(e) {
        return this.map.get(e);
    }
    setData(e, t) {
        this.map.set(e, t);
    }
}
class dS {
    constructor() {
        this.dataCache = new uS();
    }
    static init() {
        this.i = new dS();
    }
    getData(...e) {
        return Of(this, void 0, void 0, function* () {
            let t = [],
                n = new Map();
            return (
                e.forEach((e) => {
                    let s = this.dataCache.getData(e);
                    s ? n.set(e, s) : t.push(e);
                }),
                0 === t.length ||
                    (yield this.fetchData(...t)).forEach((e, t) => {
                        this.dataCache.setData(t, e), n.set(t, e);
                    }),
                Promise.resolve(n)
            );
        });
    }
    fetchData(...e) {
        return new Promise((t, n) => {
            let s = new pm({
                name: Mf.MD_CMD,
                permission: um.READ,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                params: { name: "GET", data: { ids: e } },
                success: (e) => {
                    if (200 === e.code) {
                        const n = new Map();
                        e.content.forEach((e) => {
                            n.set(e.id, e.data);
                        }),
                            t(n);
                    } else n(e);
                },
                fail: (e) => {
                    n(e);
                },
            });
            am.Socket.e(s);
        });
    }
    setData(e, t) {
        this.dataCache.setData(e, t);
    }
}
class hS {
    constructor() {
        Zm.i.on(Vm.MESSAGE_RECEIVED, this.onMessageReceived),
            Zm.i.on(Vm.MESSAGE_SENDING, this.onMessageSending);
    }
    onMessageSending(e) {
        let t = og.byIMMessage(e);
        t.scene === pf.PRIVATE && dS.i.setData(t.id, e.getToData());
    }
    onMessageReceived(e) {
        if (og.byIMMessage(e).scene === pf.GROUP) {
            let t = e;
            dS.i.setData(t.senderId, t.senderData);
        }
    }
}
class pS {
    constructor() {
        (this._iMReceiver = new Tb()),
            (this.csMessageReceiver = new aS()),
            (this.memberDataUpdator = new hS()),
            (this._userHereNow = new Rb()),
            (this.goEasyUploader = new qm()),
            (this._groupHereNow = new xb()),
            (this._groupOnlineCount = new Ob()),
            (this.groupMessageSubscriber = new Ib()),
            (this.messageBuilder = new rS()),
            (this.messageSender = new tg()),
            (this.recaller = new lS()),
            (this._groupPresenceSubscriber = new kb()),
            (this._userPresenceSubscriber = new Ab()),
            (this.conversations = new Mb()),
            (this.histories = mb.init());
    }
    static init() {
        Zm.init(), vg.init(), (pS.instance = new pS());
    }
    static i() {
        if (pS.instance) return pS.instance;
        throw Error("Please connect first.");
    }
    validateModules() {
        if (lb.status() === cf.DISCONNECTED)
            throw Error("Please call connect() first.");
        Cb.check();
    }
    catch(e, t) {
        return Of(this, void 0, void 0, function* () {
            try {
                this.validateModules(),
                    ym.validateCallbackOptions(t),
                    yield e();
            } catch (n) {
                kf.onFailed(t, n);
            }
        });
    }
    on(e, t) {
        vg.on(e, t);
    }
    off(e, t) {
        vg.off(e, t);
    }
    createTextMessage(e) {
        return (
            this.validateModules(), this.messageBuilder.buildMessage(Hm.TEXT, e)
        );
    }
    createImageMessage(e) {
        return (
            this.validateModules(),
            this.messageBuilder.buildMessage(Hm.IMAGE, e)
        );
    }
    createFileMessage(e) {
        return (
            this.validateModules(), this.messageBuilder.buildMessage(Hm.FILE, e)
        );
    }
    createAudioMessage(e) {
        return (
            this.validateModules(),
            this.messageBuilder.buildMessage(Hm.AUDIO, e)
        );
    }
    createVideoMessage(e) {
        return (
            this.validateModules(),
            this.messageBuilder.buildMessage(Hm.VIDEO, e)
        );
    }
    createCustomMessage(e) {
        return (
            this.validateModules(), this.messageBuilder.buildMessage(e.type, e)
        );
    }
    sendMessage(e) {
        this.catch(() => {
            this.messageSender.send(e);
        }, e);
    }
    recallMessage(e) {
        this.catch(() => {
            this.recaller.recallMessage(e);
        }, e);
    }
    deleteMessage(e) {
        this.catch(() => {
            this.histories.deleteMessage(e);
        }, e);
    }
    markGroupMessageAsRead(e) {
        this.catch(
            () =>
                Of(this, void 0, void 0, function* () {
                    yield this.histories.groupMarkAsRead(e);
                }),
            e
        );
    }
    markPrivateMessageAsRead(e) {
        this.catch(
            () =>
                Of(this, void 0, void 0, function* () {
                    yield this.histories.privateMarkAsRead(e);
                }),
            e
        );
    }
    markMessageAsRead(e, t) {
        this.catch(
            () =>
                Of(this, void 0, void 0, function* () {
                    yield this.histories.markMessageAsRead(e, t);
                }),
            e
        );
    }
    latestConversations(e) {
        this.validateModules(), this.conversations.latestConversations(e);
    }
    removePrivateConversation(e) {
        this.catch(() => this.conversations.removePrivateConversation(e), e);
    }
    removeGroupConversation(e) {
        this.catch(() => this.conversations.removeGroupConversation(e), e);
    }
    topPrivateConversation(e) {
        this.catch(() => this.conversations.topPrivateConversation(e), e);
    }
    topGroupConversation(e) {
        this.catch(() => this.conversations.topGroupConversation(e), e);
    }
    history(e, t) {
        this.catch(() => {
            this.histories.loadHistory(e, t);
        }, e);
    }
    subscribeUserPresence(e) {
        this.catch(() => this._userPresenceSubscriber.presence(e), e);
    }
    unsubscribeUserPresence(e) {
        this.catch(() => this._userPresenceSubscriber.unPresence(e), e);
    }
    hereNow(e) {
        this.catch(() => this._userHereNow.hereNow(e), e);
    }
    subscribeGroup(e) {
        this.catch(() => this.groupMessageSubscriber.subscribe(e), e);
    }
    unsubscribeGroup(e) {
        this.catch(() => this.groupMessageSubscriber.unsubscribe(e), e);
    }
    subscribeGroupPresence(e) {
        this.catch(() => this._groupPresenceSubscriber.presence(e), e);
    }
    unsubscribeGroupPresence(e) {
        this.catch(() => this._groupPresenceSubscriber.unPresence(e), e);
    }
    groupHereNow(e) {
        this.catch(() => this._groupHereNow.hereNow(e), e);
    }
    groupOnlineCount(e) {
        this.catch(() => this._groupOnlineCount.get(e), e);
    }
    latestPendingConversations(e) {
        this.validateModules(),
            this.conversations.latestPendingConversations(e);
    }
    topConversation(e) {
        this.validateModules(), this.conversations.topConversation(e);
    }
    removeConversation(e) {
        this.validateModules(), this.conversations.removeConversation(e);
    }
}
class fS {
    constructor(e, t) {
        (this.customerId = e), (this.teamId = t);
    }
}
class mS {
    constructor(e, t) {
        this.teamId = e;
        let n = new gf(t.id.toString(), JSON.stringify(t.data));
        this.customer = n;
    }
}
class gS {
    constructor(e, t, n) {
        (this.customerId = e), (this.teamId = t), (this.agentId = n);
    }
}
class yS {
    constructor(e, t) {
        (this.customerId = e), (this.teamId = t);
    }
}
class vS {
    constructor(e) {
        (this.builder = new hg()), (this.teamId = e);
    }
    accept(e, t) {
        let n = t.customer;
        if (yf.isUndef(n))
            throw { code: 400, content: "customer is required." };
        ym.validateId(n.id, "customer.id");
        let s = n.data;
        if (yf.isUndef(s) || !yf.isObject(s))
            throw {
                code: 400,
                content: "customer data must be non-empty object.",
            };
        let o = new mS(e, n),
            i = new pm({
                name: Mf.CS_ACCEPT,
                params: o,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (e) => {
                    let n = this.builder.build(e.content.message);
                    Zm.i.fire(Vm.CS_ACCEPTED, n), kf.onSuccess(t);
                },
            });
        am.Socket.e(i);
    }
    end(e, t) {
        ym.validateId(t.id, "id");
        let n = t.id.toString(),
            s = new yS(n, e),
            o = new pm({
                name: Mf.CS_END,
                params: s,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (e) => {
                    let n = this.builder.build(e.content.message);
                    Zm.i.fire(Vm.CS_ENDED, n), kf.onSuccess(t);
                },
            });
        am.Socket.e(o);
    }
    queryCustomerStatus(e, t) {
        return Of(this, void 0, void 0, function* () {
            ym.validateId(t.id, "id");
            let n = yield this.doCustomerStatus(e, t.id);
            (this.activeCustomerStatus = n),
                (this.activeCustomerStatusOptions = t),
                kf.onSuccess(t, n);
        });
    }
    doCustomerStatus(e, t) {
        let n = t.toString(),
            s = new fS(n, e);
        return new Promise((e, t) => {
            let n = new pm({
                name: Mf.CS_CUSTOMER_STATUS,
                params: s,
                permission: um.READ,
                singleTimeout: Tf.commonQuerySingle,
                totalTimeout: Tf.commonQueryTotal,
                fail: (e) => {
                    t(e);
                },
                success: (t) => {
                    let n = t.content;
                    n.agent && (n.agent.data = JSON.parse(n.agent.data)), e(n);
                },
            });
            am.Socket.e(n);
        });
    }
    transfer(e, t) {
        ym.validateId(t.customerId, "customerId"),
            ym.validateId(t.agentId, "agentId");
        let n = t.customerId.toString(),
            s = t.agentId.toString(),
            o = new gS(n, e, s),
            i = new pm({
                name: Mf.CS_TRANSFER,
                params: o,
                permission: um.WRITE,
                singleTimeout: Tf.commonRequestSingle,
                totalTimeout: Tf.commonRequestTotal,
                fail: (e) => {
                    kf.onFailed(t, e);
                },
                success: (e) => {
                    let n = this.builder.build(e.content.message);
                    Zm.i.fire(Vm.CS_TRANSFER, n), kf.onSuccess(t);
                },
            });
        am.Socket.e(i);
    }
}
class bS {
    createTextMessage(e, t) {
        let n = pS.i().createTextMessage(t);
        this.extendProps(e, n);
    }
    createImageMessage(e, t) {
        let n = pS.i().createImageMessage(t);
        this.extendProps(e, n);
    }
    createFileMessage(e, t) {
        let n = pS.i().createFileMessage(t);
        this.extendProps(e, n);
    }
    createAudioMessage(e, t) {
        let n = pS.i().createAudioMessage(t);
        this.extendProps(e, n);
    }
    createVideoMessage(e, t) {
        let n = pS.i().createVideoMessage(t);
        this.extendProps(e, n);
    }
    createCustomMessage(e, t) {
        let n = pS.i().createCustomMessage(t);
        this.extendProps(e, n);
    }
    extendProps(e, t) {
        if (t.scene() === pf.CS) {
            let n = t;
            (n.teamId = e), (n.accepted = !0);
        }
    }
}
class SS {
    constructor(e) {
        (this.teamId = e),
            (this.agentStatus = ub.getInstance()),
            (this.conversationHandler = new vS(e)),
            (this.messageCreator = new bS());
    }
    catch(e, t) {
        return Of(this, void 0, void 0, function* () {
            try {
                ym.validateCallbackOptions(t), yield e();
            } catch (n) {
                kf.onFailed(t, n);
            }
        });
    }
    isOnline(e) {
        this.catch(() => {
            this.agentStatus.isOnline(this.teamId, e);
        }, e);
    }
    online(e) {
        this.catch(() => {
            this.agentStatus.online(this.teamId, e);
        }, e);
    }
    offline(e) {
        this.catch(() => {
            this.agentStatus.offline(this.teamId, e);
        }, e);
    }
    customerStatus(e) {
        this.catch(() => {
            this.conversationHandler.queryCustomerStatus(this.teamId, e);
        }, e);
    }
    accept(e) {
        this.catch(() => {
            this.conversationHandler.accept(this.teamId, e);
        }, e);
    }
    end(e) {
        this.catch(() => {
            this.conversationHandler.end(this.teamId, e);
        }, e);
    }
    history(e) {
        pS.i().history(e, this.teamId);
    }
    markMessageAsRead(e) {
        pS.i().markMessageAsRead(e, this.teamId);
    }
    createTextMessage(e) {
        this.messageCreator.createTextMessage(this.teamId, e);
    }
    createImageMessage(e) {
        this.messageCreator.createImageMessage(this.teamId, e);
    }
    createFileMessage(e) {
        this.messageCreator.createFileMessage(this.teamId, e);
    }
    createAudioMessage(e) {
        this.messageCreator.createAudioMessage(this.teamId, e);
    }
    createVideoMessage(e) {
        this.messageCreator.createVideoMessage(this.teamId, e);
    }
    createCustomMessage(e) {
        this.messageCreator.createCustomMessage(this.teamId, e);
    }
    transfer(e) {
        this.catch(() => {
            this.conversationHandler.transfer(this.teamId, e);
        }, e);
    }
    agents(e) {
        this.catch(() => {
            this.agentStatus.agents(this.teamId, e);
        }, e);
    }
    liveSession(e) {
        this.catch(() => {
            db.live(this.teamId, e);
        }, e);
    }
    quitLiveSession(e) {
        this.catch(() => {
            db.quit(e);
        }, e);
    }
    listenCustomer(e) {
        let t = {
            customerId: e.id,
            onNewMessage: e.onNewMessage,
            onStatusUpdated: e.onStatusUpdated,
            onFailed: e.onFailed,
            onSuccess: e.onSuccess,
        };
        this.catch(() => {
            db.live(this.teamId, t);
        }, e);
    }
    cancelListenCustomer(e) {
        this.catch(() => {
            db.quit(e);
        }, e);
    }
}
class ES {
    static team(e) {
        ym.validateId(e, "teamId");
        let t = this.teams.get(e);
        return (
            t || ((t = new SS(e.toString())), this.teams.set(e.toString(), t)),
            t
        );
    }
}
ES.teams = new Map();
class wS {
    constructor(e) {
        this.id = e;
    }
    isOnline(e) {
        ES.team(this.id).isOnline(e);
    }
    online(e) {
        ES.team(this.id).online(e);
    }
    offline(e) {
        ES.team(this.id).offline(e);
    }
    customerStatus(e) {
        ES.team(this.id).customerStatus(e);
    }
    accept(e) {
        ES.team(this.id).accept(e);
    }
    end(e) {
        ES.team(this.id).end(e);
    }
    history(e) {
        ES.team(this.id).history(e);
    }
    markMessageAsRead(e) {
        ES.team(this.id).markMessageAsRead(e);
    }
    createTextMessage(e) {
        ES.team(this.id).createTextMessage(e);
    }
    createImageMessage(e) {
        ES.team(this.id).createImageMessage(e);
    }
    createFileMessage(e) {
        ES.team(this.id).createFileMessage(e);
    }
    createAudioMessage(e) {
        ES.team(this.id).createAudioMessage(e);
    }
    createVideoMessage(e) {
        ES.team(this.id).createVideoMessage(e);
    }
    createCustomMessage(e) {
        ES.team(this.id).createCustomMessage(e);
    }
    transfer(e) {
        ES.team(this.id).transfer(e);
    }
    agents(e) {
        ES.team(this.id).agents(e);
    }
    liveSession(e) {
        ES.team(this.id).liveSession(e);
    }
    quitLiveSession(e) {
        ES.team(this.id).quitLiveSession(e);
    }
    listenCustomer(e) {
        ES.team(this.id).listenCustomer(e);
    }
    cancelListenCustomer(e) {
        ES.team(this.id).cancelListenCustomer(e);
    }
}
class CS {
    static getInstance(e) {
        return this.init(e), CS;
    }
    static init(e) {
        if (this.getConnectionStatus() !== cf.DISCONNECTED)
            throw new Error(
                "Initialization failed. Please disconnect and try again."
            );
        this.validateOptions(e),
            df.init(e.reactNativeOptions),
            (this.options = e),
            lb.init(e),
            e.allowNotification && mm.init(e.allowNotification),
            e.modules &&
                (e.modules.includes("PUBSUB") && em.initModule(Om.init()),
                e.modules.includes("IM") && em.initModule(Cb.init())),
            dS.init(),
            am.init(lb, mm, dS, hf, Sf, em);
    }
    static setBadge(e) {
        mm.setBadge(e);
    }
    static connect(e) {
        lb.connect(e, "JS"), em.postConnect();
    }
    static disconnect(e) {
        lb.disconnect(e);
    }
    static getConnectionStatus() {
        return lb.status();
    }
    static validateOptions(e) {
        let t = "";
        if (!yf.isObject(e))
            throw ((t = "options is require an object."), Error(t));
        if (!yf.isPrimitive(e.appkey) || 0 == e.appkey.length)
            throw ((t = "Invalid options:'appkey' is empty."), Error(t));
        if (!yf.isPrimitive(e.host) || 0 == e.host.length)
            throw ((t = "Invalid options:'host' is empty."), Error(t));
        if (!yf.isArray(e.modules))
            throw (
                ((t = "Invalid options: 'modules' must be nonempty array"),
                Error(t))
            );
        e.modules = e.modules.map((e) => e.toUpperCase());
    }
    static onClickNotification(e) {
        mm.onClickNotification(e);
    }
    static c(e) {
        e.init(am.Socket, am.N, am.Member, am.v, am.Platform, em);
    }
}
(CS.version = hf),
    (CS.IM_EVENT = zm),
    (CS.IM_SCENE = pf),
    (CS.im = class {
        static on(e, t) {
            pS.i().on(e, t);
        }
        static off(e, t) {
            pS.i().off(e, t);
        }
        static createTextMessage(e) {
            return pS.i().createTextMessage(e);
        }
        static createImageMessage(e) {
            return pS.i().createImageMessage(e);
        }
        static createFileMessage(e) {
            return pS.i().createFileMessage(e);
        }
        static createAudioMessage(e) {
            return pS.i().createAudioMessage(e);
        }
        static createVideoMessage(e) {
            return pS.i().createVideoMessage(e);
        }
        static createCustomMessage(e) {
            return pS.i().createCustomMessage(e);
        }
        static sendMessage(e) {
            pS.i().sendMessage(e);
        }
        static recallMessage(e) {
            pS.i().recallMessage(e);
        }
        static deleteMessage(e) {
            pS.i().deleteMessage(e);
        }
        static markGroupMessageAsRead(e) {
            pS.i().markGroupMessageAsRead(e);
        }
        static markPrivateMessageAsRead(e) {
            pS.i().markPrivateMessageAsRead(e);
        }
        static latestConversations(e) {
            pS.i().latestConversations(e);
        }
        static removePrivateConversation(e) {
            pS.i().removePrivateConversation(e);
        }
        static removeGroupConversation(e) {
            pS.i().removeGroupConversation(e);
        }
        static topPrivateConversation(e) {
            pS.i().topPrivateConversation(e);
        }
        static topGroupConversation(e) {
            pS.i().topGroupConversation(e);
        }
        static history(e) {
            pS.i().history(e);
        }
        static subscribeUserPresence(e) {
            pS.i().subscribeUserPresence(e);
        }
        static unsubscribeUserPresence(e) {
            pS.i().unsubscribeUserPresence(e);
        }
        static hereNow(e) {
            pS.i().hereNow(e);
        }
        static subscribeGroup(e) {
            pS.i().subscribeGroup(e);
        }
        static unsubscribeGroup(e) {
            pS.i().unsubscribeGroup(e);
        }
        static subscribeGroupPresence(e) {
            pS.i().subscribeGroupPresence(e);
        }
        static unsubscribeGroupPresence(e) {
            pS.i().unsubscribeGroupPresence(e);
        }
        static groupHereNow(e) {
            pS.i().groupHereNow(e);
        }
        static groupOnlineCount(e) {
            pS.i().groupOnlineCount(e);
        }
        static markMessageAsRead(e) {
            pS.i().markMessageAsRead(e);
        }
        static csteam(e) {
            return new wS(e);
        }
        static pendingConversations(e) {
            pS.i().latestPendingConversations(e);
        }
        static topConversation(e) {
            pS.i().topConversation(e);
        }
        static removeConversation(e) {
            pS.i().removeConversation(e);
        }
    }),
    (CS.pubsub = class {
        static publish(e) {
            this.catch(() => {
                km.instance.publish(e);
            }, e);
        }
        static subscribe(e) {
            this.catch(() => {
                km.instance.subscribe(e);
            }, e);
        }
        static unsubscribe(e) {
            this.catch(() => {
                km.instance.unsubscribe(e);
            }, e);
        }
        static subscribePresence(e) {
            this.catch(() => {
                km.instance.subscribePresence(e);
            }, e);
        }
        static unsubscribePresence(e) {
            this.catch(() => {
                km.instance.unsubscribePresence(e);
            }, e);
        }
        static history(e) {
            this.catch(() => {
                km.instance.history(e);
            }, e);
        }
        static hereNow(e) {
            this.catch(() => {
                km.instance.hereNow(e);
            }, e);
        }
        static catch(e, t) {
            try {
                if (
                    (Om.check(),
                    [
                        cf.DISCONNECTED,
                        cf.DISCONNECTING,
                        cf.CONNECT_FAILED,
                    ].includes(am.Socket.status()))
                )
                    throw new Error("Please call connect() first.");
                e();
            } catch (n) {
                kf.onFailed(t, n);
            }
        }
    });
const _S = CS.getInstance({
    host: "hangzhou.goeasy.io",
    appkey: "BC-461f5c6ef8ed482d8f5fb674c2b144ce",
    modules: ["pubsub"],
});
(function () {
    const e = br(rf);
    return e.provide("goEasy", _S), { app: e };
})()
    .app.use(Oh)
    .mount("#app");
export {
    Io as F,
    Fd as I,
    te as O,
    Ho as a,
    zo as b,
    Uo as c,
    tn as d,
    Xo as e,
    Fo as f,
    Gs as g,
    Gn as h,
    Hd as i,
    bn as j,
    Vd as k,
    _p as l,
    bd as m,
    c as n,
    Ro as o,
    ws as p,
    si as q,
    Qt as r,
    Fp as s,
    p as t,
    ac as u,
    ai as v,
    Pn as w,
    jp as x,
    Vo as y,
    s as z,
};

