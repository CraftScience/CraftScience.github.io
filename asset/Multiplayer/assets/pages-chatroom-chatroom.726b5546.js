import {
    p as e,
    q as s,
    O as n,
    v as a,
    r as o,
    j as l,
    o as t,
    c,
    w as r,
    h as u,
    x as i,
    i as d,
    a as m,
    y as p,
    b as f,
    t as v,
    d as g,
    f as y,
    g as h,
    F as b,
    e as k,
    l as _,
    m as U,
    I,
    z as w,
    n as N,
    k as S,
} from "./index-c101660b.js";
import { _ as x } from "./_plugin-vue_export-helper.1b428a4d.js";
const F = "" + new URL("handle-heart-6dd96700.png", import.meta.url).href,
    P = "" + new URL("rocket-9f49b687.png", import.meta.url).href,
    E = "" + new URL("heart-fe292d96.png", import.meta.url).href,
    O = (
        (n) =>
        (o, l = s()) => {
            !a && e(n, o, l);
        }
    )(n),
    T = x(
        {
            __name: "chatroom",
            setup(e) {
                const s = u("goEasy");
                let n = o({
                        roomId: null,
                        roomName: null,
                        onlineUsers: { amount: 0, users: [] },
                        messages: [],
                        currentUser: { id: null, nickname: null, avatar: null },
                    }),
                    a = o({ showPropType: 0, play: !1, timer: null }),
                    x = o("");
                const T = 0,
                    C = 1,
                    G = 0,
                    J = 1;
                O(async (e) => {
                    const s = JSON.parse(e.query);
                    (n.value.roomId = s.roomId),
                        (n.value.roomName = s.roomName),
                        (n.value.currentUser = {
                            id: s.userId,
                            nickname: s.nickname,
                            avatar: s.avatar,
                        }),
                        j(),
                        await q(),
                        L(),
                        X(),
                        await R();
                });
                const j = () => {
                        const e = {
                            avatar: n.value.currentUser.avatar,
                            nickname: n.value.currentUser.nickname,
                        };
                        s.connect({
                            id: n.value.currentUser.id,
                            data: e,
                            onSuccess: function () {
                                console.log("GoEasy connect successfully.");
                            },
                            onFailed: function (e) {
                                console.log(
                                    "Failed to connect GoEasy, code:" +
                                        e.code +
                                        ",error:" +
                                        e.content
                                );
                            },
                            onProgress: function (e) {
                                console.log("GoEasy is connecting", e);
                            },
                        });
                    },
                    q = () => {
                        const e = n.value.roomId;
                        return new Promise((a, o) => {
                            s.pubsub.subscribePresence({
                                channel: e,
                                onPresence: (e) => {
                                    let s;
                                    (n.value.onlineUsers = {
                                        amount: e.amount,
                                        users: e.members,
                                    }),
                                        (s =
                                            "join" === e.action ||
                                            "back" === e.action
                                                ? "进入房间"
                                                : "退出房间");
                                    const a = {
                                        content: s,
                                        senderUserId: e.member.id,
                                        senderNickname: e.member.data.nickname,
                                        type: G,
                                    };
                                    n.value.messages.push(a), H();
                                },
                                onSuccess: function () {
                                    console.log("用户上下线监听成功"), a();
                                },
                                onFailed: function (e) {
                                    console.log(
                                        "监听用户上下线失败, code:" +
                                            e.code +
                                            ",content:" +
                                            e.content
                                    ),
                                        o(e);
                                },
                            });
                        });
                    },
                    L = () => {
                        const e = n.value.roomId;
                        s.pubsub.subscribe({
                            channel: e,
                            presence: { enable: !0 },
                            onMessage: (e) => {
                                const s = JSON.parse(e.content);
                                n.value.messages.push(s),
                                    s.type === J && B(parseInt(s.content)),
                                    H();
                            },
                            onSuccess: function () {
                                console.log("监听新消息成功");
                            },
                            onFailed: function (e) {
                                console.log(
                                    "订阅消息失败, code:" +
                                        e.code +
                                        ",错误信息:" +
                                        e.content
                                );
                            },
                        });
                    },
                    R = () => {
                        const e = n.value.roomId;
                        return new Promise((a, o) => {
                            s.pubsub.hereNow({
                                channel: e,
                                onSuccess: function (e) {
                                    (n.value.onlineUsers = {
                                        amount: e.content.amount,
                                        users: e.content.members,
                                    }),
                                        a(e);
                                },
                                onFailed: function (e) {
                                    console.log(
                                        "获取在线用户失败, code:" +
                                            e.code +
                                            ",错误信息:" +
                                            e.content
                                    ),
                                        o(e);
                                },
                            });
                        });
                    },
                    X = () => {
                        const e = n.value.roomId;
                        s.pubsub.history({
                            channel: e,
                            limit: 10,
                            onSuccess: function (e) {
                                (n.value.messages = []),
                                    e.content.messages.map((e) => {
                                        const s = JSON.parse(e.content);
                                        n.value.messages.push(s);
                                    });
                            },
                            onFailed: function (e) {
                                console.log(
                                    "获取历史消息失败, code:" +
                                        e.code +
                                        ",错误信息:" +
                                        e.content
                                );
                            },
                        });
                    },
                    z = (e) => {
                        (x.value = e.detail.value), A(G, x);
                    },
                    M = (e) => {
                        l(() => {
                            x.value = e.detail.value;
                        });
                    },
                    A = (e, a) => {
                        if (e === G && ((a = x.value), !x.value)) return;
                        const o = {
                            senderNickname: n.value.currentUser.nickname,
                            senderUserId: n.value.currentUser.id,
                            type: e,
                            content: a,
                        };
                        s.pubsub.publish({
                            channel: n.value.roomId,
                            message: JSON.stringify(o),
                            onSuccess: function () {
                                console.log("发送成功");
                            },
                            onFailed: function (e) {
                                console.log(
                                    "消息发送失败，错误编码：" +
                                        e.code +
                                        " 错误信息：" +
                                        e.content
                                );
                            },
                        }),
                            (x.value = "");
                    },
                    B = (e) => {
                        a.value.timer ||
                            ((a.value.showPropType = e),
                            (a.value.play = !0),
                            (a.value.timer = setTimeout(() => {
                                (a.value.play = !1), (a.value.timer = null);
                            }, 2e3)));
                    },
                    D = () => {
                        s.disconnect({
                            onSuccess() {
                                _({ url: "/pages/index/index" }),
                                    console.log(
                                        "GoEasy disconnect successfully"
                                    );
                            },
                            onFailed(e) {
                                console.log(
                                    "GoEasy disconnect failed" +
                                        JSON.stringify(e)
                                );
                            },
                        });
                    },
                    H = () => {
                        l(() => {
                            i({ scrollTop: 2e6, duration: 10 });
                        });
                    };
                return (e, s) => {
                    const o = d,
                        l = U,
                        u = S,
                        i = I;
                    return (
                        t(),
                        c(
                            o,
                            { class: "chat-room" },
                            {
                                default: r(() => [
                                    m(
                                        o,
                                        { class: "header" },
                                        {
                                            default: r(() => [
                                                p(
                                                    "span",
                                                    {
                                                        class: "quit-btn",
                                                        onClick: D,
                                                    },
                                                    "X"
                                                ),
                                                m(o, null, {
                                                    default: r(() => [
                                                        f(v(g(n).roomName), 1),
                                                    ]),
                                                    _: 1,
                                                }),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    m(
                                        o,
                                        { class: "online-avatar-container" },
                                        {
                                            default: r(() => [
                                                (t(!0),
                                                y(
                                                    b,
                                                    null,
                                                    h(
                                                        g(n).onlineUsers.users,
                                                        (e, s) => (
                                                            t(),
                                                            c(
                                                                o,
                                                                {
                                                                    class: "online-avatar-item",
                                                                    key: s,
                                                                    style: w(
                                                                        g(n)
                                                                            .onlineUsers
                                                                            .users
                                                                            .length -
                                                                            1 ===
                                                                            s
                                                                            ? ""
                                                                            : "transform:translateX(" +
                                                                                  (20 *
                                                                                      (g(
                                                                                          n
                                                                                      )
                                                                                          .onlineUsers
                                                                                          .users
                                                                                          .length -
                                                                                          1 -
                                                                                          s) +
                                                                                      20) +
                                                                                  "rpx)"
                                                                    ),
                                                                },
                                                                {
                                                                    default: r(
                                                                        () => [
                                                                            m(
                                                                                l,
                                                                                {
                                                                                    src: e
                                                                                        .data
                                                                                        .avatar,
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
                                                                ["style"]
                                                            )
                                                        )
                                                    ),
                                                    128
                                                )),
                                                m(
                                                    o,
                                                    { class: "online-amount" },
                                                    {
                                                        default: r(() => [
                                                            f(
                                                                v(
                                                                    g(n)
                                                                        .onlineUsers
                                                                        .amount
                                                                ),
                                                                1
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    m(
                                        o,
                                        { class: "chat-room-container" },
                                        {
                                            default: r(() => [
                                                m(
                                                    o,
                                                    { class: "scroll-view" },
                                                    {
                                                        default: r(() => [
                                                            (t(!0),
                                                            y(
                                                                b,
                                                                null,
                                                                h(
                                                                    g(n)
                                                                        .messages,
                                                                    (e, s) => (
                                                                        t(),
                                                                        c(
                                                                            o,
                                                                            {
                                                                                class: "message-box",
                                                                                key: s,
                                                                                id:
                                                                                    "message-box" +
                                                                                    s,
                                                                            },
                                                                            {
                                                                                default:
                                                                                    r(
                                                                                        () => [
                                                                                            m(
                                                                                                o,
                                                                                                {
                                                                                                    class: "message-item",
                                                                                                },
                                                                                                {
                                                                                                    default:
                                                                                                        r(
                                                                                                            () => [
                                                                                                                m(
                                                                                                                    u,
                                                                                                                    {
                                                                                                                        class: "user-name",
                                                                                                                    },
                                                                                                                    {
                                                                                                                        default:
                                                                                                                            r(
                                                                                                                                () => [
                                                                                                                                    f(
                                                                                                                                        v(
                                                                                                                                            e.senderNickname
                                                                                                                                        ) +
                                                                                                                                            ":",
                                                                                                                                        1
                                                                                                                                    ),
                                                                                                                                ]
                                                                                                                            ),
                                                                                                                        _: 2,
                                                                                                                    },
                                                                                                                    1024
                                                                                                                ),
                                                                                                                m(
                                                                                                                    u,
                                                                                                                    {
                                                                                                                        class: N(
                                                                                                                            e.senderUserId ===
                                                                                                                                g(
                                                                                                                                    n
                                                                                                                                )
                                                                                                                                    .currentUser
                                                                                                                                    .id
                                                                                                                                ? "user-message self"
                                                                                                                                : "user-message"
                                                                                                                        ),
                                                                                                                    },
                                                                                                                    {
                                                                                                                        default:
                                                                                                                            r(
                                                                                                                                () => [
                                                                                                                                    e.type ===
                                                                                                                                    G
                                                                                                                                        ? (t(),
                                                                                                                                          c(
                                                                                                                                              u,
                                                                                                                                              {
                                                                                                                                                  key: 0,
                                                                                                                                              },
                                                                                                                                              {
                                                                                                                                                  default:
                                                                                                                                                      r(
                                                                                                                                                          () => [
                                                                                                                                                              f(
                                                                                                                                                                  v(
                                                                                                                                                                      e.content
                                                                                                                                                                  ),
                                                                                                                                                                  1
                                                                                                                                                              ),
                                                                                                                                                          ]
                                                                                                                                                      ),
                                                                                                                                                  _: 2,
                                                                                                                                              },
                                                                                                                                              1024
                                                                                                                                          ))
                                                                                                                                        : e.type ===
                                                                                                                                          J
                                                                                                                                        ? (t(),
                                                                                                                                          c(
                                                                                                                                              u,
                                                                                                                                              {
                                                                                                                                                  key: 1,
                                                                                                                                              },
                                                                                                                                              {
                                                                                                                                                  default:
                                                                                                                                                      r(
                                                                                                                                                          () => [
                                                                                                                                                              f(
                                                                                                                                                                  v(
                                                                                                                                                                      e.content ===
                                                                                                                                                                          T
                                                                                                                                                                          ? "送出了一个大大的比心"
                                                                                                                                                                          : "送出了一枚大火箭"
                                                                                                                                                                  ),
                                                                                                                                                                  1
                                                                                                                                                              ),
                                                                                                                                                          ]
                                                                                                                                                      ),
                                                                                                                                                  _: 2,
                                                                                                                                              },
                                                                                                                                              1024
                                                                                                                                          ))
                                                                                                                                        : k(
                                                                                                                                              "",
                                                                                                                                              !0
                                                                                                                                          ),
                                                                                                                                ]
                                                                                                                            ),
                                                                                                                        _: 2,
                                                                                                                    },
                                                                                                                    1032,
                                                                                                                    [
                                                                                                                        "class",
                                                                                                                    ]
                                                                                                                ),
                                                                                                            ]
                                                                                                        ),
                                                                                                    _: 2,
                                                                                                },
                                                                                                1024
                                                                                            ),
                                                                                        ]
                                                                                    ),
                                                                                _: 2,
                                                                            },
                                                                            1032,
                                                                            [
                                                                                "id",
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
                                                m(
                                                    o,
                                                    {
                                                        class: "chat-room-input",
                                                    },
                                                    {
                                                        default: r(() => [
                                                            m(
                                                                o,
                                                                {
                                                                    style: {
                                                                        position:
                                                                            "relative",
                                                                    },
                                                                },
                                                                {
                                                                    default: r(
                                                                        () => [
                                                                            m(
                                                                                i,
                                                                                {
                                                                                    class: "uni-input",
                                                                                    value: g(
                                                                                        x
                                                                                    ),
                                                                                    placeholder:
                                                                                        "说点什么...",
                                                                                    onInput:
                                                                                        M,
                                                                                    onConfirm:
                                                                                        z,
                                                                                },
                                                                                null,
                                                                                8,
                                                                                [
                                                                                    "value",
                                                                                ]
                                                                            ),
                                                                            m(
                                                                                o,
                                                                                {
                                                                                    class: "uni-btn",
                                                                                    onClick:
                                                                                        s[0] ||
                                                                                        (s[0] =
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                A(
                                                                                                    G,
                                                                                                    g(
                                                                                                        x
                                                                                                    )
                                                                                                )),
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        r(
                                                                                            () => [
                                                                                                f(
                                                                                                    "↑"
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                        ]
                                                                    ),
                                                                    _: 1,
                                                                }
                                                            ),
                                                            m(l, {
                                                                class: "heart",
                                                                onClick:
                                                                    s[1] ||
                                                                    (s[1] = (
                                                                        e
                                                                    ) =>
                                                                        A(
                                                                            J,
                                                                            T
                                                                        )),
                                                                src: F,
                                                            }),
                                                            m(l, {
                                                                class: "rocket",
                                                                onClick:
                                                                    s[2] ||
                                                                    (s[2] = (
                                                                        e
                                                                    ) =>
                                                                        A(
                                                                            J,
                                                                            C
                                                                        )),
                                                                src: P,
                                                            }),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    g(a).play
                                        ? (t(),
                                          c(
                                              o,
                                              {
                                                  key: 0,
                                                  class: "show-animation",
                                              },
                                              {
                                                  default: r(() => [
                                                      g(a).showPropType === T
                                                          ? (t(),
                                                            c(
                                                                o,
                                                                { key: 0 },
                                                                {
                                                                    default: r(
                                                                        () => [
                                                                            (t(),
                                                                            y(
                                                                                b,
                                                                                null,
                                                                                h(
                                                                                    4,
                                                                                    (
                                                                                        e,
                                                                                        s
                                                                                    ) =>
                                                                                        m(
                                                                                            l,
                                                                                            {
                                                                                                class: "prop-heart",
                                                                                                key: s,
                                                                                                src: E,
                                                                                            }
                                                                                        )
                                                                                ),
                                                                                64
                                                                            )),
                                                                        ]
                                                                    ),
                                                                    _: 1,
                                                                }
                                                            ))
                                                          : k("", !0),
                                                      g(a).showPropType === C
                                                          ? (t(),
                                                            c(
                                                                o,
                                                                { key: 1 },
                                                                {
                                                                    default: r(
                                                                        () => [
                                                                            m(
                                                                                l,
                                                                                {
                                                                                    class: "prop-rocket",
                                                                                    src: P,
                                                                                }
                                                                            ),
                                                                        ]
                                                                    ),
                                                                    _: 1,
                                                                }
                                                            ))
                                                          : k("", !0),
                                                  ]),
                                                  _: 1,
                                              }
                                          ))
                                        : k("", !0),
                                ]),
                                _: 1,
                            }
                        )
                    );
                };
            },
        },
        [["__scopeId", "data-v-eb3a9e7f"]]
    );
export { T as default };

