import {
    u as a,
    r as e,
    o as s,
    c as l,
    w as t,
    i,
    a as o,
    b as n,
    n as r,
    d as u,
    e as m,
    f as c,
    g as d,
    F as g,
    t as v,
    h as p,
    j as f,
    k as _,
    I as U,
    s as I,
    l as k,
    m as b,
} from "./index-c101660b.js";
import { _ as x } from "./_plugin-vue_export-helper.1b428a4d.js";
const h = x(
    {
        __name: "index",
        setup(x) {
            a();
            p("goEasy");
            const h = e([
                    { id: "1", imgUrl: "/static/images/1.png" },
                    { id: "2", imgUrl: "/static/images/2.png" },
                    { id: "3", imgUrl: "/static/images/3.png" },
                    { id: "4", imgUrl: "/static/images/4.png" },
                    { id: "5", imgUrl: "/static/images/5.png" },
                    { id: "6", imgUrl: "/static/images/6.png" },
                    { id: "7", imgUrl: "/static/images/7.png" },
                    { id: "8", imgUrl: "/static/images/8.png" },
                ]),
                y = e([
                    { roomId: "001", name: "程序员集散地" },
                    { roomId: "002", name: "舌尖上的中国" },
                    { roomId: "003", name: "驴友之家" },
                    { roomId: "004", name: "球迷乐翻天" },
                ]);
            let C = e(""),
                j = e({ imgUrl: "", id: "" });
            const E = (a) => {
                f(() => {
                    C.value = a.detail.value;
                });
            };
            return (a, e) => {
                const p = _,
                    f = i,
                    x = U,
                    N = b;
                return (
                    s(),
                    l(f, null, {
                        default: t(() => [
                            o(
                                f,
                                { class: "header" },
                                {
                                    default: t(() => [
                                        o(
                                            p,
                                            { class: "title" },
                                            {
                                                default: t(() => [
                                                    n("GoEasy Websocket示例"),
                                                ]),
                                                _: 1,
                                            }
                                        ),
                                        o(
                                            p,
                                            { class: "description" },
                                            {
                                                default: t(() => [
                                                    n(
                                                        "Uniapp Vue3 聊天室（直播间）"
                                                    ),
                                                ]),
                                                _: 1,
                                            }
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                            o(
                                f,
                                { class: "content" },
                                {
                                    default: t(() => [
                                        o(
                                            x,
                                            {
                                                class: r(
                                                    "" === u(C)
                                                        ? "input-notice uni-input"
                                                        : "uni-input"
                                                ),
                                                value: u(C),
                                                placeholder: "请输入昵称",
                                                onInput: E,
                                            },
                                            null,
                                            8,
                                            ["class", "value"]
                                        ),
                                        o(
                                            f,
                                            { class: "avatar-container" },
                                            {
                                                default: t(() => [
                                                    o(
                                                        f,
                                                        {
                                                            class: "avatar-notice",
                                                        },
                                                        {
                                                            default: t(() => [
                                                                o(p, null, {
                                                                    default: t(
                                                                        () => [
                                                                            n(
                                                                                "请选择头像"
                                                                            ),
                                                                        ]
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                                "" ===
                                                                u(j).imgUrl
                                                                    ? (s(),
                                                                      l(
                                                                          p,
                                                                          {
                                                                              key: 0,
                                                                              class: "avatar-notice-info",
                                                                          },
                                                                          {
                                                                              default:
                                                                                  t(
                                                                                      () => [
                                                                                          n(
                                                                                              "请选一个头像哦!!!"
                                                                                          ),
                                                                                      ]
                                                                                  ),
                                                                              _: 1,
                                                                          }
                                                                      ))
                                                                    : m("", !0),
                                                            ]),
                                                            _: 1,
                                                        }
                                                    ),
                                                    o(
                                                        f,
                                                        { class: "avatar-box" },
                                                        {
                                                            default: t(() => [
                                                                (s(!0),
                                                                c(
                                                                    g,
                                                                    null,
                                                                    d(
                                                                        h.value,
                                                                        (
                                                                            a,
                                                                            e
                                                                        ) => (
                                                                            s(),
                                                                            l(
                                                                                f,
                                                                                {
                                                                                    class: r(
                                                                                        u(
                                                                                            j
                                                                                        )
                                                                                            .id ===
                                                                                            a.id
                                                                                            ? "avatar-box-item active"
                                                                                            : "avatar-box-item "
                                                                                    ),
                                                                                    key: e,
                                                                                    onClick:
                                                                                        (
                                                                                            e
                                                                                        ) => {
                                                                                            return (
                                                                                                (s =
                                                                                                    a),
                                                                                                void (j.value =
                                                                                                    s)
                                                                                            );
                                                                                            var s;
                                                                                        },
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        t(
                                                                                            () => [
                                                                                                o(
                                                                                                    N,
                                                                                                    {
                                                                                                        src: a.imgUrl,
                                                                                                    },
                                                                                                    null,
                                                                                                    8,
                                                                                                    [
                                                                                                        "src",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 2,
                                                                                },
                                                                                1032,
                                                                                [
                                                                                    "class",
                                                                                    "onClick",
                                                                                ]
                                                                            )
                                                                        )
                                                                    ),
                                                                    128
                                                                )),
                                                            ]),
                                                            _: 1,
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            }
                                        ),
                                        o(
                                            f,
                                            { class: "room-container" },
                                            {
                                                default: t(() => [
                                                    o(
                                                        p,
                                                        { class: "room-title" },
                                                        {
                                                            default: t(() => [
                                                                n(
                                                                    "请选择聊天室"
                                                                ),
                                                            ]),
                                                            _: 1,
                                                        }
                                                    ),
                                                    o(
                                                        f,
                                                        { class: "room-box" },
                                                        {
                                                            default: t(() => [
                                                                (s(!0),
                                                                c(
                                                                    g,
                                                                    null,
                                                                    d(
                                                                        y.value,
                                                                        (
                                                                            a,
                                                                            e
                                                                        ) => (
                                                                            s(),
                                                                            l(
                                                                                p,
                                                                                {
                                                                                    class: "room-box-item",
                                                                                    key: a.roomId,
                                                                                    onClick:
                                                                                        (
                                                                                            e
                                                                                        ) =>
                                                                                            ((
                                                                                                a
                                                                                            ) => {
                                                                                                if (
                                                                                                    "" ==
                                                                                                        j
                                                                                                            .value
                                                                                                            .imgUrl ||
                                                                                                    "" ==
                                                                                                        C.value
                                                                                                )
                                                                                                    return void I(
                                                                                                        {
                                                                                                            title: "请输入昵称，并选择头像",
                                                                                                            duration: 2e3,
                                                                                                            icon: "none",
                                                                                                        }
                                                                                                    );
                                                                                                let e =
                                                                                                    {
                                                                                                        roomId: a.roomId,
                                                                                                        roomName:
                                                                                                            a.name,
                                                                                                        userId: (
                                                                                                            1e3 *
                                                                                                            Math.random()
                                                                                                        ).toString(),
                                                                                                        nickname:
                                                                                                            C.value,
                                                                                                        avatar: j
                                                                                                            .value
                                                                                                            .imgUrl,
                                                                                                    };
                                                                                                k(
                                                                                                    {
                                                                                                        url: `/pages/chatroom/chatroom?query=${JSON.stringify(
                                                                                                            e
                                                                                                        )}`,
                                                                                                    }
                                                                                                ),
                                                                                                    (C.value =
                                                                                                        ""),
                                                                                                    (j.value =
                                                                                                        {});
                                                                                            })(
                                                                                                a
                                                                                            ),
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        t(
                                                                                            () => [
                                                                                                n(
                                                                                                    v(
                                                                                                        a.name
                                                                                                    ),
                                                                                                    1
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 2,
                                                                                },
                                                                                1032,
                                                                                [
                                                                                    "onClick",
                                                                                ]
                                                                            )
                                                                        )
                                                                    ),
                                                                    128
                                                                )),
                                                            ]),
                                                            _: 1,
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            }
                                        ),
                                        o(
                                            f,
                                            { class: "version" },
                                            {
                                                default: t(() => [
                                                    n(v(u("1.0.0-0")), 1),
                                                ]),
                                                _: 1,
                                            }
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                        ]),
                        _: 1,
                    })
                );
            };
        },
    },
    [["__scopeId", "data-v-36bb7fa9"]]
);
export { h as default };

