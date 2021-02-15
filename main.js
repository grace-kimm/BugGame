const playBtn = document.querySelector(".game__play");
const playIcon = document.querySelector(".play__icon");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");

let timeDuration = 20;

// menu
// 1. play button click
playBtn.addEventListener("click", () => {
  // 1-1. play -> stop button
  playIcon.classList.remove("fa-play-circle");
  playIcon.classList.add("fa-stop-circle");
  // 1-2. show timer & score
  showTimerAndScore();
});
// 1-1. play -> stop button
// 1-2. show timer & score
function showTimerAndScore() {
  timer.style.visibility = "visible";
  score.style.visibility = "visible";
  startTimer();
}
// 1-2-1. start timer
function startTimer() {
  const remainTime = timeDuration;
  timer.innerText = `00:${remainTime}`;
  setInterval(goTime, 1000);
}

function goTime() {
  let remainTime = timeDuration;
  remainTime = remainTime - 1;
}

// 1-3. show bug, carrot on field
