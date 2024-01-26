﻿var user = prompt("Login", "Your Name Please");
var recvJson = "";
var winning = 0;
var losing = 0;
// var data = JSON.stringify({
//   app_key: "E52FD4B9C437A0A520466D07684DB2A0",
//   return_data: "1",
//   model_name: "grade",
//   select: "username,win,lose",
//   logic: "or",
//   where: `[["username", "=", "${user}"]]`,
//   page: "1",
//   perpage: "10",
//   is_real_total: "1",
// });
// var newdata = JSON.stringify({
//   app_key: "E52FD4B9C437A0A520466D07684DB2A0",
//   return_data: "1",
//   model_name: "grade",
//   data: `{"username":"${user}","win":"0","lose":"0"}`,
//   check_field: "username",
//   logic: "or",
// });
// const Http = new XMLHttpRequest();
// const url = "https://hn216.api.yesapi.cn/api/App/Table/FreeQuery";
// const link = "https://hn216.api.yesapi.cn/api/App/Table/CheckCreateOrUpdate";
// Http.open("POST", url);
// Http.send(data);

// Http.onreadystatechange = (e) => {
//   if (Http.readyState == 4) {
//     recvJson = JSON.parse(Http.responseText);
//     if (typeof recvJson["list"]["0"] == "undefined") {
//       var r = confirm("Create a new player name?");
//       if (r == false) {
//         location.reload();
//       } else {
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", link);
//         xhr.send(newdata);
//       }
//     } else {
//       alert("Welcomeback," + user);
//       winning = recvJson["list"]["0"]["win"];
//       losing = recvJson["list"]["0"]["lose"];
//     }
//   }
// };
// function Update(winning, losing) {
//   var update = JSON.stringify({
//     app_key: "E52FD4B9C437A0A520466D07684DB2A0",
//     return_data: "1",
//     model_name: "grade",
//     data: `{"username":"${user}","win":"${winning}","lose":"${losing}"}`,
//     check_field: "username",
//     logic: "or",
//   });
//   const request = new XMLHttpRequest();
//   request.open("POST", link);
//   request.send(update);
// }
// VARIABLES
const choices = [
  {
    id: 0,
    image: "./asset/img/zero.png",
  },
  {
    id: 1,
    image: "./asset/img/one.png",
  },
  {
    id: 2,
    image: "./asset/img/two.png",
  },
  {
    id: 3,
    image: "./asset/img/three.png",
  },
  {
    id: 4,
    image: "./asset/img/four.png",
  },
  {
    id: 5,
    image: "./asset/img/five.png",
  },
  {
    id: 6,
    image: "./asset/img/six.png",
  },
  {
    id: 7,
    image: "./asset/img/seven.png",
  },
  {
    id: 8,
    image: "./asset/img/eight.png",
  },
  {
    id: 9,
    image: "./asset/img/nine.png",
  },
  {
    id: 10,
    image: "./asset/img/ten.png",
  },
  {
    id: 11,
    image: "./asset/img/seven-one.png",
  },
];

let resTxt = document.querySelector("#resTxt");
let playerPoints = document.querySelector(".playerPoints");
let computerPoints = document.querySelector(".computerPoints");
let playerChoiceImg = document.querySelector("#playerChoiceImg");
let playerChoiceTxt = document.querySelector("#playerChoiceTxt");
let computerChoiceImg = document.querySelector("#computerChoiceImg");
let computerChoiceTxt = document.querySelector("#computerChoiceTxt");
let buttons = document.querySelectorAll(".btn");
let login = document.querySelector("#user");
let points = [3, 3];
let randomNumber;
let res = document.querySelector("#res");
var act = document.getElementById("act");
var status1 = document.getElementById("status1");
var status2 = document.getElementById("status2");
var status3 = document.getElementById("status3");
var status4 = document.getElementById("status4");
let playerjudge = true;
let computerjudge = true;
let kill = false;
res.textContent =
  `Player:${user}` + " " + `Winning:${winning}` + " " + `Losing:${losing}`;
// EVENT LISTENERS
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "0") {
      playerChoiceImg.src = choices[0].image;
      playerChoiceTxt.textContent = choices[0].id;
      playerjudge = true;
    } else if (button.textContent === "1") {
      playerChoiceImg.src = choices[1].image;
      playerChoiceTxt.textContent = choices[1].id;
      playerjudge = false;
    } else if (button.textContent === "2") {
      playerChoiceImg.src = choices[2].image;
      playerChoiceTxt.textContent = choices[2].id;
      playerjudge = false;
    } else if (button.textContent === "3") {
      playerChoiceImg.src = choices[3].image;
      playerChoiceTxt.textContent = choices[3].id;
      playerjudge = false;
    } else if (button.textContent === "4") {
      playerChoiceImg.src = choices[4].image;
      playerChoiceTxt.textContent = choices[4].id;
      playerjudge = false;
    } else if (button.textContent === "5") {
      playerChoiceImg.src = choices[5].image;
      playerChoiceTxt.textContent = choices[5].id;
      playerjudge = true;
    } else if (button.textContent === "6") {
      playerChoiceImg.src = choices[6].image;
      playerChoiceTxt.textContent = choices[6].id;
      playerjudge = true;
    } else if (button.textContent === "7") {
      playerChoiceImg.src = choices[7].image;
      playerChoiceTxt.textContent = choices[7].id;
      playerjudge = true;
    } else if (button.textContent === "8") {
      playerChoiceImg.src = choices[8].image;
      playerChoiceTxt.textContent = choices[8].id;
      playerjudge = true;
    } else if (button.textContent === "9") {
      playerChoiceImg.src = choices[9].image;
      playerChoiceTxt.textContent = choices[9].id;
      playerjudge = true;
    } else if (button.textContent === "10") {
      playerChoiceImg.src = choices[10].image;
      playerChoiceTxt.textContent = choices[10].id;
      playerjudge = true;
    } else if (button.textContent === "71") {
      playerChoiceImg.src = choices[11].image;
      playerChoiceTxt.textContent = choices[11].id;
      playerjudge = true;
    }
    getComputerChoice();
  });
});

// FUNCTIONS
function getComputerChoice() {
  computerChoiceImg.src = "./asset/img/waiting.png";
  var current = 10;
  myinterval = setInterval(function () {
    (computerChoiceImg.style.transform = "rotate(" + current + "deg)"),
      (current += 10);
  }, 20);
  setTimeout(() => {
    if (kill == true) {
      randomNumber = 11;
      kill = false;
    } else if (computerjudge == false) {
      randomNumber = Math.floor(Math.random() * 5 + 5);
      computerjudge = true;
    } else {
      randomNumber = Math.floor(Math.random() * 11);
      if (0 < randomNumber < 5) {
        computerjudge = false;
      }
    }
    clearInterval(myinterval);
    computerChoiceImg.style.transform = null;
    computerChoiceImg.src = choices[randomNumber].image;
    computerChoiceTxt.textContent = choices[randomNumber].id;
    gameRules();
    playerPoints.textContent = points[0];
    computerPoints.textContent = points[1];
    whoWon();
  }, Math.floor(Math.random() * 3 + 1) * 1000);
}

function gameRules() {
  if (playerjudge == false) {
    status1.disabled = true;
    status2.disabled = true;
    status3.disabled = true;
    status4.disabled = true;
  }
  if (playerjudge == true) {
    status1.disabled = false;
    status2.disabled = false;
    status3.disabled = false;
    status4.disabled = false;
  }
  if (playerChoiceTxt.textContent === computerChoiceTxt.textContent) {
    resTxt.textContent = "Tie";
  } else if (
    playerChoiceTxt.textContent === "11" &&
    computerChoiceTxt.textContent !== "5"
  ) {
    act.style.backgroundColor = "#404040";
    points[1] -= 3;
    resTxt.textContent = "KO";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent !== "5" &&
    computerChoiceTxt.textContent === "11"
  ) {
    points[0] -= 3;
    resTxt.textContent = "KO";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "0" &&
    computerChoiceTxt.textContent !== "5"
  ) {
    resTxt.textContent = "Defend";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "0" &&
    computerChoiceTxt.textContent === "5"
  ) {
    points[0]--;
    resTxt.textContent = "Pa";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "5" &&
    computerChoiceTxt.textContent === "0"
  ) {
    points[1]--;
    resTxt.textContent = "Pa";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent !== "5" &&
    computerChoiceTxt.textContent === "0"
  ) {
    resTxt.textContent = "Defend";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "10" &&
    computerChoiceTxt.textContent === "5"
  ) {
    points[0]++;
    resTxt.textContent = "Hui";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "5" &&
    computerChoiceTxt.textContent === "10"
  ) {
    points[1]++;
    resTxt.textContent = "Hui";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "10" &&
    computerChoiceTxt.textContent === "3"
  ) {
    points[1]--;
    resTxt.textContent = "Kou";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "3" &&
    computerChoiceTxt.textContent === "10"
  ) {
    points[0]--;
    resTxt.textContent = "Kou";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "9" &&
    computerChoiceTxt.textContent === "6"
  ) {
    points[0]++;
    resTxt.textContent = "Hua";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "6" &&
    computerChoiceTxt.textContent === "9"
  ) {
    points[1]++;
    resTxt.textContent = "Hua";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "9" &&
    computerChoiceTxt.textContent === "1"
  ) {
    points[1]--;
    resTxt.textContent = "Dang";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    computerChoiceTxt.textContent === "9"
  ) {
    points[0]--;
    resTxt.textContent = "Dang";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "8" &&
    computerChoiceTxt.textContent === "2"
  ) {
    points[1] -= 2;
    resTxt.textContent = "PaPa";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "2" &&
    computerChoiceTxt.textContent === "8"
  ) {
    points[0] -= 2;
    resTxt.textContent = "PaPa";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "7" &&
    computerChoiceTxt.textContent === "1"
  ) {
    act.disabled = false;
    act.style.backgroundColor = "red";
    resTxt.textContent = "Ci";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    computerChoiceTxt.textContent === "7"
  ) {
    resTxt.textContent = "Ci";
    kill = true;
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "6" &&
    computerChoiceTxt.textContent === "1"
  ) {
    points[0]++;
    resTxt.textContent = "Hui";
    MoveLeft();
  } else if (
    playerChoiceTxt.textContent === "1" &&
    computerChoiceTxt.textContent === "6"
  ) {
    points[1]++;
    resTxt.textContent = "Hui";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "3" &&
    computerChoiceTxt.textContent === "2"
  ) {
    points[1]--;
    resTxt.textContent = "Kou";
    MoveRight();
  } else if (
    playerChoiceTxt.textContent === "2" &&
    computerChoiceTxt.textContent === "3"
  ) {
    points[0]--;
    resTxt.textContent = "Kou";
    MoveLeft();
  } else if (playerChoiceTxt.textContent === "10") {
    points[0]--;
    resTxt.textContent = "Cha";
    MoveLeft();
  } else if (computerChoiceTxt.textContent === "10") {
    points[1]--;
    resTxt.textContent = "Cha";
    MoveRight();
  } else if (playerChoiceTxt.textContent < computerChoiceTxt.textContent) {
    points[1]--;
    resTxt.textContent = "Cha";
    MoveRight();
  } else if (playerChoiceTxt.textContent > computerChoiceTxt.textContent) {
    points[0]--;
    resTxt.textContent = "Cha";
    MoveLeft();
  }
}

const Win = new Audio("/asset/sound/Win.mp3");
const Lose = new Audio("asset/sound/Lose.mp3");

function whoWon() {
  if (points[1] <= 0) {
    Win.play();
    winning += 1;
    alert("Win");
    points = [3, 3];
    act.disabled = true;
  } else if (points[0] <= 0) {
    Lose.play();
    losing += 1;
    alert("Lose");
    points = [3, 3];
    act.disabled = true;
  }
  res.textContent =
    `Player:${user}` + " " + `Winning:${winning}` + " " + `Losing:${losing}`;
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
function openWindow() {
  new MyLayer({
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    title: "Leaderboard",
    content: "",
    url: "https://open.yesapi.cn/?r=Share/Data&hash=E52FD4B9C437A0A520466D07684DB2A0CF17C3980F9351D6249C476CB06780E8#pageTop",
  }).openLayer();
}
function newWindow() {
  new MyLayer({
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    title: "Game Rules",
    content: "",
    url: "",
  }).openLayer();
}
//Iframe
function MyLayer(options) {
  this.options = options;
}
MyLayer.prototype.openLayer = function () {
  var background_layer = document.createElement("div");
  background_layer.style.display = "none";
  background_layer.style.position = "absolute";
  background_layer.style.top = "0px";
  background_layer.style.left = "0px";
  background_layer.style.width = "100%";
  background_layer.style.height = "100%";
  background_layer.style.backgroundColor = "gray";
  background_layer.style.zIndex = "1001";
  background_layer.style.opacity = "0.8";
  var open_layer = document.createElement("div");
  open_layer.style.display = "none";
  open_layer.style.position = "absolute";
  open_layer.style.top =
    this.options.top === undefined ? "10%" : this.options.top;
  open_layer.style.left =
    this.options.left === undefined ? "10%" : this.options.left;
  open_layer.style.width =
    this.options.width === undefined ? "80%" : this.options.width;
  open_layer.style.height =
    this.options.height === undefined ? "80%" : this.options.height;
  open_layer.style.border = "";
  open_layer.style.borderRadius = "15px";
  open_layer.style.boxShadow = "4px 4px 10px #171414";
  open_layer.style.backgroundColor = "white";
  open_layer.style.zIndex = "1002";
  open_layer.style.overflow = "auto";
  var div_toolBar = document.createElement("div");
  div_toolBar.style.textAlign = "right";
  div_toolBar.style.paddingTop = "10px";
  div_toolBar.style.backgroundColor = "aliceblue";
  div_toolBar.style.height = "40px";
  var span_title = document.createElement("span");
  span_title.style.fontSize = "18px";
  span_title.style.color = "black";
  span_title.style.float = "left";
  span_title.style.marginLeft = "20px";
  var span_title_content = document.createTextNode(
    this.options.title === undefined ? "" : this.options.title
  );
  span_title.appendChild(span_title_content);
  div_toolBar.appendChild(span_title);
  var span_close = document.createElement("span");
  span_close.style.fontSize = "16px";
  span_close.style.color = "black";
  span_close.style.cursor = "pointer";
  span_close.style.marginRight = "20px";
  span_close.onclick = function () {
    open_layer.style.display = "none";
    background_layer.style.display = "none";
  };
  var span_close_content = document.createTextNode("Close");
  span_close.appendChild(span_close_content);
  div_toolBar.appendChild(span_close);
  open_layer.appendChild(div_toolBar);
  //content
  var div_content = document.createElement("div");
  div_content.style.textAlign = "center";
  var content_area = document.createTextNode(
    this.options.content === undefined ? "" : this.options.content
  );
  div_content.appendChild(content_area);
  open_layer.appendChild(div_content);
  var iframe = document.createElement("iframe");
  iframe.src = this.options.url === undefined ? "" : this.options.url;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  open_layer.appendChild(iframe);
  document.body.appendChild(open_layer);
  document.body.appendChild(background_layer);
  open_layer.style.display = "block";
  background_layer.style.display = "block";
};
