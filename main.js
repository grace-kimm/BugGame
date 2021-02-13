"use strict";

const GAME_DURATION_SEC = 10;
const CARROT_COUNT = 5;
const BUG_COUNT = 10;
const CARROT_SIZE = 80;

const playBtn = document.querySelector(".game__play");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");

const bgSound = new Audio("./sound/bg.mp3");
const alertSound = new Audio("./sound/alert.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let timer = 0;
let score = 0;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
    console.log("stopGame");
  } else {
    startGame();
    console.log("startGame");
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimer();
  showScore();
  startTimer();
  playSound(bgSound);
}
function stopGame() {
  started = false;
  stopTimer();
  hidePlayBtn();
  showPopUpWithText("REPLAY?");
  playSound(alertSound);
  stopSound(bgSound);
}
function finishGame() {
  started = false;
  hidePlayBtn();
  if (win) {
    playSound(winSound);
  } else {
    playSound(alertSound);
  }
  stopTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? "YOU WON! 😍" : "YOU LOST 😭");
}

function showStopBtn() {
  const icon = playBtn.querySelector(".fas");
  icon.classList.add("fa-stop-circle");
  icon.classList.remove("fa-play-circle");
}

function showTimer() {
  timer.style.visibility = "visible";
}
function showScore() {
  score.style.visibility = "visible";
}
function startTimer() {
  let duration = GAME_DURATION_SEC;
  updateTimerText(duration);
  timer = setInterval(() => {
    if (duration <= 0) {
      clearInterval(timer);
      finishGame(score === CARROT_COUNT);
      return;
    }
    updateTimerText(duration);
  }, 1000);
}
