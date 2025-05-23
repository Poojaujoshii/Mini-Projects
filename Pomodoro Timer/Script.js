let focusTime = 25*60; 
let breakTime = 5*60; 
const longBreak = 30*30;
let time = focusTime;
let timer = null;
let isRunning = false;
let isFocus = true;
let sessionCount = 0;

const timerDisplay = document.getElementById("timer");
const startbtn = document.getElementById("start");
const pausebtn = document.getElementById("pause");
const resetbtn = document.getElementById("reset");
const modeDisplay = document.getElementById("mode");
const sessionCountDisplay = document.getElementById("sessionCount");
const alarmSound = document.getElementById("alarmSound");

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(time);
}
let beepInterval = null;  

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    time--;
    updateDisplay();

    if (time === 10) {
      
      beepInterval = setInterval(() => {
        alarmSound.play();
      }, 1000);
    }

    if (time <= 0) {
      clearInterval(timer);
      clearInterval(beepInterval);  
      isRunning = false;
      switchMode();
    }
  }, 1000);
}


function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  time = isFocus ? focusTime : breakTime;
  updateDisplay();
}

function switchMode() {
  alarmSound.play();
  if (isFocus) {
    sessionCount++;
    sessionCountDisplay.textContent = `Focus Sessions Completed: ${sessionCount}`;
  }
  isFocus = !isFocus;
  if (!isFocus) {
    if (sessionCount % 4 === 0) {
      time = longBreak * 60;  
    } else {
      time = breakTime * 60;  
    }
  } else {
    time = focusTime * 60;
  }

  modeDisplay.textContent = isFocus ? "Focus Time" : "Break Time";
  updateDisplay();
  startTimer();
}



modeDisplay.textContent = "Focus Time";
sessionCountDisplay.textContent = `Focus Sessions Completed: ${sessionCount}`;
updateDisplay();

startbtn.addEventListener("click", startTimer);
pausebtn.addEventListener("click", pauseTimer);
resetbtn.addEventListener("click", resetTimer);
