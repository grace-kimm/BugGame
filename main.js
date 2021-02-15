const playBtn = document.querySelector(".game__play");
const playIcon = document.querySelector(".play__icon");
const timerBoard = document.querySelector(".game__timer");
const scoreBoard = document.querySelector(".game__score");
const field = document.querySelector(".game__field");

const bug = document.querySelector(".bug");
const carrot = document.querySelector(".carrot");

const popUp = document.querySelector(".pop-up");
let popUpText = document.querySelector(".pop-up__result");

let BUG_NUM = 5;
let CARROT_NUM = 5;
let ITEM_SIZE = 80;

let started = false;
let timeDuration = 10;
let score = 0;
let timer = undefined;

// menu : start
// 1. play button click
playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

// 1. start button click
function startGame() {
  started = true;
  // 1-1. play -> stop button
  showStopBtn();
  // 1-2. show timer & score
  showTimerAndScore();
  // 1-3. start timer
  startTimer();
  // 1-4. show bug, carrot on field
  initGame();
  // 1-5. hide popup
  hidePopup();
}

// 1-1. play -> stop button
function showStopBtn() {
  playIcon.classList.remove("fa-play-circle");
  playIcon.classList.add("fa-stop-circle");
}

// 1-2. show timer & score
function showTimerAndScore() {
  timerBoard.style.visibility = "visible";
  scoreBoard.style.visibility = "visible";
}
// 1-3. start timer
function startTimer() {
  let remainTime = timeDuration;
  updateTimerText(remainTime);
  setInterval(() => {
    if (remainTime <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainTime);
  }, 1000);
}

function updateTimerText(time) {
  timerBoard.innerText = `0:${time}`;
}

// 1-4. show bug, carrot on field
function initGame() {
  addItem("bug", BUG_NUM, "img/bug.png");
  addItem("carrot", CARROT_NUM, "img/carrot.png");
}

// 1-4-1. add items
function addItem(itemName, num, src) {
  const rect = field.getBoundingClientRect();
  x1 = 0;
  x2 = rect.width - ITEM_SIZE;
  y1 = 0;
  y2 = rect.height - ITEM_SIZE;
  for (let i = 0; i < num; i++) {
    item = document.createElement("img");
    item.setAttribute("class", itemName);
    item.setAttribute("src", src);
    item.style.position = "absolute";
    item.style.top = `${randomNumber(y1, y2)}px`;
    item.style.left = `${randomNumber(x1, x2)}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 1-5. hide popup
function hidePopup() {
  popUp.classList.add("pop-up--hide");
}

// menu: finish
// 2. stop button click
function stopGame() {
  started = false;
  showStartBtn();
  hideTimerAndScore();
  stopTimer();
  showPopup();
}
// 2-1. stop -> play button
function showStartBtn() {
  playIcon.classList.add("fa-play-circle");
  playIcon.classList.remove("fa-stop-circle");
}
// 2-2. hide timer & score
function hideTimerAndScore() {
  timerBoard.style.visibility = "hidden";
  scoreBoard.style.visibility = "hidden";
}
// 2-3. stop timer
function stopTimer() {
  clearInterval(timer);
}

// 2-4. show popup
function showPopup() {
  popUp.classList.remove("pop-up--hide");
  popUpText.innerText = "Replay?";
}

// field: click
field.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".bug")) {
    stopGame();
  } else if (target.matches(".carrot")) {
    gainScore();
  }
});

function gainScore() {
  score++;
  updateScore();
}

function updateScore() {
  scoreBoard.innerText = `${score}`;
}
