const playBtn = document.querySelector(".game__play");
const playIcon = document.querySelector(".play__icon");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");
const field = document.querySelector(".game__field");

const bug = document.querySelector("bug");
const carrot = document.querySelector("carrot");

const popUp = document.querySelector(".pop-up");

let BUG_NUM = 5;
let CARROT_NUM = 5;
let ITEM_SIZE = 80;

let timeDuration = 10;

// menu : start
// 1. play button click
playBtn.addEventListener("click", () => {
  // 1-1. play -> stop button
  playIcon.classList.remove("fa-play-circle");
  playIcon.classList.add("fa-stop-circle");
  // 1-2. show timer & score
  showTimerAndScore();
  // 1-3. show bug, carrot on field
  addItem("bug", BUG_NUM, "img/bug.png");
  addItem("carrot", CARROT_NUM, "img/carrot.png");
});

// 1-2. show timer & score
function showTimerAndScore() {
  timer.style.visibility = "visible";
  score.style.visibility = "visible";
  startTimer();
}
// 1-2-1. start timer
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
  timer.innerText = `0:${time}`;
}

// 1-3. show bug, carrot on field
function addItem(item, num, src) {
  const rect = field.getBoundingClientRect();
  x1 = 0;
  x2 = rect.width - ITEM_SIZE;
  y1 = 0;
  y2 = rect.height - ITEM_SIZE;
  for (let i = 0; i < num; i++) {
    item = document.createElement("img");
    item.setAttribute("class", item);
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

// field: click
bug.addEventListener("click", () => {
  stopGame();
});

carrot.addEventListener("click", () => {
  gainScore();
});

function stopGame() {
  clearInterval(timer);
  popUp.classList.remove("pop-up--hide");
}
