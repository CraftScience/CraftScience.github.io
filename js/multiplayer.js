let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  if (cname == "username") {
    return "";
  } else return "0";
}
var user = getCookie("username");
var winning = getCookie("win");
var losing = getCookie("lose");
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function updateCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
var rivalNumber = 12;
var room = decodeURI(document.URL); //获取到编码的数据并进行解码
room = room.slice(room.indexOf("=") + 1);
console.log(user);
player1.textContent = user;
//初始化GoEasy对象;
let goEasy = GoEasy.getInstance({
  host: "hangzhou.goeasy.io", //新加坡host：singapore.goeasy.io
  appkey: "BC-461f5c6ef8ed482d8f5fb674c2b144ce", //替换为您的应用appkey
  modules: ["pubsub"],
});
//建立连接
goEasy.connect({
  id: user,
  onSuccess: function () {
    //连接成功
    console.log("GoEasy connect successfully."); //连接成功
    publishMessage("12," + user);
  },
  onFailed: function (error) {
    //连接失败
    console.log(
      "Failed to connect GoEasy, code:" + error.code + ",error:" + error.content
    );
  },
  onProgress: function (attempts) {
    //连接或自动重连中
    console.log("GoEasy is connecting", attempts);
  },
});
//订阅消息
goEasy.pubsub.subscribe({
  channel: room, //替换为您自己的channel
  presence: {
    enable: true,
  },
  onMessage: function (message) {
    //收到消息
    rival = message.content.split(",");
    if (rival[1] != user) {
      player2.textContent = rival[1];
      if (0 <= rival[0] <= 11) rivalNumber = parseInt(rival[0]);
      if (rival[0] == 12) publishMessage("13," + user);
      change = true;
    }
  },
  onSuccess: function () {
    console.log("Channel订阅成功。");
  },
  onFailed: function (error) {
    console.log(
      "Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content
    );
  },
});
//发送
function publishMessage(num) {
  goEasy.pubsub.publish({
    channel: room, //替换为您自己的channel
    message: num, //替换为您想要发送的消息内容
    onSuccess: function () {
      console.log("消息发布成功。");
    },
    onFailed: function (error) {
      console.log(
        "消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content
      );
    },
  });
}
// goEasy.pubsub.subscribePresence({
//   channel: room,
//   membersLimit: 4, //可选项，定义返回的最新上线成员列表的数量，默认为10，最多支持返回100个成员
//   onPresence: function (presenceEvent) {
//     console.log("Presence events: ", JSON.stringify(presenceEvent));
//   },
//   onSuccess: function () {
//     //监听成功
//     console.log("subscribe presence successfully.");
//   },
//   onFailed: function (error) {
//     //监听失败
//     console.log(
//       "Failed to subscribe presence, code:" +
//         error.code +
//         ",error:" +
//         error.content
//     );
//   },
// });
// goEasy.pubsub.hereNow({
//   channel: room,
//   limit: 4, //可选项，定义返回的最新上线成员列表的数量，默认为10，最多支持返回最新上线的100个成员
//   onSuccess: function (response) {
//     //获取成功
//     console.log("hereNow response: " + JSON.stringify(response)); //json格式的response
//   },
//   onFailed: function (error) {
//     //获取失败
//     console.log(
//       "Failed to obtain online clients, code:" +
//         error.code +
//         ",error:" +
//         error.content
//     );
//   },
// });
//logic
const choices = [
  {
    id: 0,
    image: "../img/zero.png",
  },
  {
    id: 1,
    image: "../img/one.png",
  },
  {
    id: 2,
    image: "../img/two.png",
  },
  {
    id: 3,
    image: "../img/three.png",
  },
  {
    id: 4,
    image: "../img/four.png",
  },
  {
    id: 5,
    image: "../img/five.png",
  },
  {
    id: 6,
    image: "../img/six.png",
  },
  {
    id: 7,
    image: "../img/seven.png",
  },
  {
    id: 8,
    image: "../img/eight.png",
  },
  {
    id: 9,
    image: "../img/nine.png",
  },
  {
    id: 10,
    image: "../img/ten.png",
  },
  {
    id: 11,
    image: "../img/seven-one.png",
  },
  {
    id: 12,
    image: "../img/waiting.png",
  },
];
let resTxt = document.querySelector("#resTxt");
let playerPoints = document.querySelector(".playerPoints");
let rivalPoints = document.querySelector(".rivalPoints");
let playerChoiceImg = document.querySelector("#playerChoiceImg");
let playerChoiceTxt = document.querySelector("#playerChoiceTxt");
let rivalChoiceImg = document.querySelector("#rivalChoiceImg");
let rivalChoiceTxt = document.querySelector("#rivalChoiceTxt");
let buttons = document.querySelectorAll(".btn");
let login = document.querySelector("#user");
let points = [3, 3];
var change = false;
var act = document.getElementById("act");
var status1 = document.getElementById("status1");
var status2 = document.getElementById("status2");
var status3 = document.getElementById("status3");
var status4 = document.getElementById("status4");
let playerjudge = 12;
let rivaljudge = 12;
killjudge = false;
let kill = false;
// EVENT LISTENERS
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playerPoints.textContent = points[0];
    rivalPoints.textContent = points[1];
    if (button.textContent === "0") {
      playerChoiceImg.src = choices[0].image;
      playerChoiceTxt.textContent = choices[0].id;
      playerjudge = 0;
    } else if (button.textContent === "1") {
      playerChoiceImg.src = choices[1].image;
      playerChoiceTxt.textContent = choices[1].id;
      playerjudge = 1;
    } else if (button.textContent === "2") {
      playerChoiceImg.src = choices[2].image;
      playerChoiceTxt.textContent = choices[2].id;
      playerjudge = 2;
    } else if (button.textContent === "3") {
      playerChoiceImg.src = choices[3].image;
      playerChoiceTxt.textContent = choices[3].id;
      playerjudge = 3;
    } else if (button.textContent === "4") {
      playerChoiceImg.src = choices[4].image;
      playerChoiceTxt.textContent = choices[4].id;
      playerjudge = 4;
    } else if (button.textContent === "5") {
      playerChoiceImg.src = choices[5].image;
      playerChoiceTxt.textContent = choices[5].id;
      playerjudge = 5;
    } else if (button.textContent === "6") {
      playerChoiceImg.src = choices[6].image;
      playerChoiceTxt.textContent = choices[6].id;
      playerjudge = 6;
    } else if (button.textContent === "7") {
      playerChoiceImg.src = choices[7].image;
      playerChoiceTxt.textContent = choices[7].id;
      playerjudge = 7;
    } else if (button.textContent === "8") {
      playerChoiceImg.src = choices[8].image;
      playerChoiceTxt.textContent = choices[8].id;
      playerjudge = 8;
    } else if (button.textContent === "9") {
      playerChoiceImg.src = choices[9].image;
      playerChoiceTxt.textContent = choices[9].id;
      playerjudge = 9;
    } else if (button.textContent === "10") {
      playerChoiceImg.src = choices[10].image;
      playerChoiceTxt.textContent = choices[10].id;
      playerjudge = 10;
    } else if (button.textContent === "71") {
      playerChoiceImg.src = choices[11].image;
      playerChoiceTxt.textContent = choices[11].id;
      act.disabled = true;
      act.style.backgroundColor = "#404040 ";
    }
    publishMessage(button.textContent + "," + user);
    getRivalChoice();
  });
});

//FUNCTIONS
function getRivalChoice() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  rivalChoiceImg.src = "../img/waiting.png";
  var current = 10;
  myinterval = setInterval(function () {
    (rivalChoiceImg.style.transform = "rotate(" + current + "deg)"),
      (current += 10);
  }, 20);

  //rival传参
  var changeinterval = setInterval(function () {
    if (change == true && rivalNumber != 12) {
      change = false;
      clearInterval(myinterval);
      rivalChoiceImg.style.transform = null;
      rivalChoiceImg.src = choices[rivalNumber].image;
      rivalChoiceTxt.textContent = choices[rivalNumber].id;
      gameRules();
      playerPoints.textContent = points[0];
      rivalPoints.textContent = points[1];
      buttons.forEach((button) => {
        button.disabled = false;
      });
      if (playerjudge == 1) status1.disabled = true;
      if (playerjudge == 2) status2.disabled = true;
      if (playerjudge == 3) status3.disabled = true;
      if (playerjudge == 4) status4.disabled = true;
      if (killjudge == false) act.disabled = true;
      setTimeout(() => {
        whoWon();
      }, 500);
      clearInterval(changeinterval);
    }
  }, 1000);
}

function gameRules() {
  if (playerChoiceTxt.textContent === rivalChoiceTxt.textContent) {
    resTxt.textContent = "Tie";
  } else if (
    playerChoiceTxt.textContent === "11" &&
    rivalChoiceTxt.textContent !== "0"
  ) {
    points[1] -= 3;
    resTxt.textContent = "Dong";
    killjudge = false;
    MoveRight();
  } else if (
    playerChoiceTxt.textContent !== "0" &&
    rivalChoiceTxt.textContent === "11"
  ) {
    points[0] -= 3;
    resTxt.textContent = "Dong";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "0" &&
    rivalChoiceTxt.textContent !== "5"
  ) {
    resTxt.textContent = "Defend";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "0" &&
    rivalChoiceTxt.textContent === "5"
  ) {
    points[0]--;
    resTxt.textContent = "Pa";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "5" &&
    rivalChoiceTxt.textContent === "0"
  ) {
    points[1]--;
    resTxt.textContent = "Pa";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent !== "5" &&
    rivalChoiceTxt.textContent === "0"
  ) {
    resTxt.textContent = "Defend";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "10" &&
    rivalChoiceTxt.textContent === "5"
  ) {
    points[0]++;
    resTxt.textContent = "Hui";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "5" &&
    rivalChoiceTxt.textContent === "10"
  ) {
    points[1]++;
    resTxt.textContent = "Hui";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "10" &&
    rivalChoiceTxt.textContent === "3"
  ) {
    points[1]--;
    resTxt.textContent = "Kou";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "3" &&
    rivalChoiceTxt.textContent === "10"
  ) {
    points[0]--;
    resTxt.textContent = "Kou";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "9" &&
    rivalChoiceTxt.textContent === "6"
  ) {
    points[0]++;
    resTxt.textContent = "Hua";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "6" &&
    rivalChoiceTxt.textContent === "9"
  ) {
    points[1]++;
    resTxt.textContent = "Hua";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "9" &&
    rivalChoiceTxt.textContent === "1"
  ) {
    points[1]--;
    resTxt.textContent = "Dang";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    rivalChoiceTxt.textContent === "9"
  ) {
    points[0]--;
    resTxt.textContent = "Dang";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "8" &&
    rivalChoiceTxt.textContent === "2"
  ) {
    var ch = confirm("Choose OK to PaPa or Cancel to PaHui");
    if (ch == false) {
      points[1] -= 1;
      points[0] += 1;
      resTxt.textContent = "PaHui";
      MoveRight();
    } else {
      points[1] -= 2;
      resTxt.textContent = "PaPa";
      MoveRight();
    }
  } else if (
    playerChoiceTxt.textContent === "2" &&
    rivalChoiceTxt.textContent === "8"
  ) {
    if (points[0] == 2 || points[1] > 1) {
      points[0] -= 2;
      resTxt.textContent = "PaPa";
      MoveLeft();
    } else {
      points[0] -= 1;
      points[1] += 1;
      resTxt.textContent = "PaHui";
      MoveLeft();
    }
  } else if (
    playerChoiceTxt.textContent === "7" &&
    rivalChoiceTxt.textContent === "1"
  ) {
    act.disabled = false;
    act.style.backgroundColor = "red";
    resTxt.textContent = "Ci";
    killjudge = true;
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    rivalChoiceTxt.textContent === "7"
  ) {
    resTxt.textContent = "Ci";
    kill = true;
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "6" &&
    rivalChoiceTxt.textContent === "1"
  ) {
    points[0]++;
    resTxt.textContent = "Hui";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    rivalChoiceTxt.textContent === "6"
  ) {
    points[1]++;
    resTxt.textContent = "Hui";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "3" &&
    rivalChoiceTxt.textContent === "2"
  ) {
    var cho = confirm("Choose OK to Kou or Cancel to Hui");
    if (cho == false) {
      points[0]++;
      resTxt.textContent = "Hui";
      MoveLeft();
    } else {
      points[1]--;
      resTxt.textContent = "Kou";
      MoveRight();
    }
  } else if (
    playerChoiceTxt.textContent === "2" &&
    rivalChoiceTxt.textContent === "3"
  ) {
    if (points[1] < 2) {
      points[1]++;
      resTxt.textContent = "Hui";
      MoveRight();
    } else {
      points[0]--;
      resTxt.textContent = "Kou";
      MoveLeft();
    }
  } else if (playerChoiceTxt.textContent === "10") {
    points[0]--;
    resTxt.textContent = "Cha";
    MoveLeft();
  } else if (rivalChoiceTxt.textContent === "10") {
    points[1]--;
    resTxt.textContent = "Cha";
    MoveRight();
  } else if (playerChoiceTxt.textContent < rivalChoiceTxt.textContent) {
    points[1]--;
    resTxt.textContent = "Cha";
    MoveRight();
  } else if (playerChoiceTxt.textContent > rivalChoiceTxt.textContent) {
    points[0]--;
    resTxt.textContent = "Cha";
    MoveLeft();
  }
}

const Win = new Audio("../sound/Win.mp3");
const Lose = new Audio("../sound/Lose.mp3");

function whoWon() {
  if (points[1] <= 0) {
    rivalNumber = 12;
    rivaljudge = 12;
    playerjudge = 12;
    kill = false;
    status1.disabled = false;
    status2.disabled = false;
    status3.disabled = false;
    status4.disabled = false;
    Win.play();
    winning = parseInt(winning) + 1;
    setCookie("win", winning, 30);
    alert("Win! Press any number to restart.");
    points = [3, 3];
    act.disabled = true;
    killjudge = false;
  } else if (points[0] <= 0) {
    rivalNumber = 12;
    rivaljudge = 12;
    playerjudge = 12;
    kill = false;
    status1.disabled = false;
    status2.disabled = false;
    status3.disabled = false;
    status4.disabled = false;
    Lose.play();
    losing = parseInt(losing) + 1;
    setCookie("lose", losing, 30);
    alert("Lose! Press any number to restart.");
    points = [3, 3];
    act.disabled = true;
    killjudge = false;
  }
}
function MoveRight() {
  var elem = document.getElementById("resTxt");
  var pos = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos == 80) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.left = pos + "px";
    }
  }
}
function MoveLeft() {
  var elem = document.getElementById("resTxt");
  var pos = 200;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos == 20) {
      clearInterval(id);
    } else {
      pos--;
      elem.style.left = pos + "px";
    }
  }
}
