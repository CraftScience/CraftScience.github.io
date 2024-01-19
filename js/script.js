// VARIABLES
const choices = [{
        id: 0,
        image: "./img/zero.png"
    },{
        id: 1,
        image: "./img/one.png"
    },{
        id: 2,
        image: "./img/two.png"
    },{
        id: 3,
        image: "./img/three.png"
    },{
        id: 4,
        image: "./img/four.png"
    },{
        id: 5,
        image: "./img/five.png"
    },{
        id: 6,
        image: "./img/six.png"
    },
    {
        id: 7,
        image: "./img/seven.png"
    },
    {
        id: 8,
        image: "./img/eight.png"
    },
    {
        id: 9,
        image: "./img/nine.png"
    },
    {
        id: 10,
        image: "./img/ten.png"
    },
    {
        id: 11,
        image: "./img/seven-one.png"
    }]

let resTxt = document.querySelector("#resTxt")
let playerPoints = document.querySelector(".playerPoints")
let computerPoints = document.querySelector(".computerPoints")
let playerChoiceImg = document.querySelector("#playerChoiceImg")
let playerChoiceTxt = document.querySelector("#playerChoiceTxt")
let computerChoiceImg = document.querySelector("#computerChoiceImg")
let computerChoiceTxt = document.querySelector("#computerChoiceTxt")
let buttons = document.querySelectorAll(".btn")
let points = [3, 3]
let randomNumber;
var act = document.getElementById("act");
const judge = true;

// EVENT LISTENERS
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "0") {
            playerChoiceImg.src = choices[0].image;
            playerChoiceTxt.textContent = choices[0].id;
        } else if (button.textContent === "1") {
            playerChoiceImg.src = choices[1].image;
            playerChoiceTxt.textContent = choices[1].id;
        } else if (button.textContent === "2") {
            playerChoiceImg.src = choices[2].image;
            playerChoiceTxt.textContent = choices[2].id;
        } else if (button.textContent === "3") {
            playerChoiceImg.src = choices[3].image;
            playerChoiceTxt.textContent = choices[3].id;
        } else if (button.textContent === "4") {
            playerChoiceImg.src = choices[4].image;
            playerChoiceTxt.textContent = choices[4].id;
        } else if (button.textContent === "5") {
            playerChoiceImg.src = choices[5].image;
            playerChoiceTxt.textContent = choices[5].id;
        } else if (button.textContent === "6") {
            playerChoiceImg.src = choices[6].image;
            playerChoiceTxt.textContent = choices[6].id;
        } else if (button.textContent === "7") {
            playerChoiceImg.src = choices[7].image;
            playerChoiceTxt.textContent = choices[7].id;
        } else if (button.textContent === "8") {
            playerChoiceImg.src = choices[8].image;
            playerChoiceTxt.textContent = choices[8].id;
        } else if (button.textContent === "9") {
            playerChoiceImg.src = choices[9].image;
            playerChoiceTxt.textContent = choices[9].id;
        } else if (button.textContent === "10") {
            playerChoiceImg.src = choices[10].image;
            playerChoiceTxt.textContent = choices[10].id;
        } else if (button.textContent === "71") {
            playerChoiceImg.src = choices[11].image;
            playerChoiceTxt.textContent = choices[11].id;
        }
        getComputerChoice();
        console.log(points);
    })
})


// FUNCTIONS
function getComputerChoice() {
    computerChoiceImg.src = "./img/waiting.gif"
    setTimeout(() => {
        randomNumber = Math.floor(Math.random() * 10);
        computerChoiceImg.src = choices[randomNumber].image;
        computerChoiceTxt.textContent = choices[randomNumber].id;
        gameRules();
        playerPoints.textContent = points[0];
        computerPoints.textContent = points[1];
        whoWon();
    }, 1000);
}

function gameRules() {
    if (playerChoiceTxt.textContent === computerChoiceTxt.textContent) {
        resTxt.textContent = "Tie";
    } else if (playerChoiceTxt.textContent === "11" && computerChoiceTxt.textContent !== "5") {
        points[1] = 0;
        resTxt.textContent = "KO";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "0" && computerChoiceTxt.textContent !== "5") {
        resTxt.textContent = "Defend";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "0" && computerChoiceTxt.textContent === "5") {
        points[0]--;
        resTxt.textContent = "Pa";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "5" && computerChoiceTxt.textContent === "0") {
        points[1]--;
        resTxt.textContent = "Pa";
        MoveRight();
    } else if (playerChoiceTxt.textContent !== "5" && computerChoiceTxt.textContent === "0") {
        resTxt.textContent = "Defend";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "10" && computerChoiceTxt.textContent === "5") {
        points[0]++;
        resTxt.textContent = "Hui";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "5" && computerChoiceTxt.textContent === "10") {
        points[1]++;
        resTxt.textContent = "Hui";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "10" && computerChoiceTxt.textContent === "3") {
        points[1]--;
        resTxt.textContent = "Kou";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "3" && computerChoiceTxt.textContent === "10") {
        points[0]--;
        resTxt.textContent = "Kou";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "9" && computerChoiceTxt.textContent === "6") {
        points[0]++;
        resTxt.textContent = "Hua";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "6" && computerChoiceTxt.textContent === "9") {
        points[1]++;
        resTxt.textContent = "Hua";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "9" && computerChoiceTxt.textContent === "1") {
        points[1]--;
        resTxt.textContent = "Dang";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "1" && computerChoiceTxt.textContent === "9") {
        points[0]--;
        resTxt.textContent = "Dang";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "8" && computerChoiceTxt.textContent === "2") {
        points[1]-=2;
        resTxt.textContent = "PaPa";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "2" && computerChoiceTxt.textContent === "8") {
        points[0]-=2;
        resTxt.textContent = "PaPa";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "7" && computerChoiceTxt.textContent === "1") {
        act.disabled = false;
        resTxt.textContent = "Ci";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "1" && computerChoiceTxt.textContent === "7") {
        resTxt.textContent = "Sorry, this function is disabled so far";
    } else if (playerChoiceTxt.textContent === "6" && computerChoiceTxt.textContent === "1") {
        points[0]++;
        resTxt.textContent = "Hui";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "1" && computerChoiceTxt.textContent === "6") {
        points[1]++;
        resTxt.textContent = "Hui";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "3" && computerChoiceTxt.textContent === "2") {
        points[1]--;
        resTxt.textContent = "Kou";
        MoveRight();
    } else if (playerChoiceTxt.textContent === "2" && computerChoiceTxt.textContent === "3") {
        points[0]--;
        resTxt.textContent = "Kou";
        MoveLeft();
    } else if (playerChoiceTxt.textContent === "10") {
        points[0]--;
        resTxt.textContent = "Cha";
        MoveLeft();
    } else if (computerChoiceTxt.textContent ==="10") {
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

const Win = new Audio("/sound/Win.mp3");
const Lose = new Audio("/sound/Lose.mp3");

function whoWon() {
    if (points[1] <= 0) {
        Win.play();
        alert("Win")
        points = [3, 3];
        act.disabled = true; 
    } else if (points[0] <= 0) {
        Lose.play();
        alert("Lose")
        points = [3, 3];
        act.disabled = true;
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
      elem.style.left = pos + 'px';
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
      elem.style.left = pos + 'px';
    }
  }
}
