let focusTime = 25*60;
let breakTime = 5*60;
let time = focusTime;
let timer = null;
let isRunning = false;
let isFocus = true;

const  timerDisplay =document.getElementById("timer");
const startbtn = document.getElementById("start");
const pausebtn = document.getElementById("pause");
const resetbtn = document.getElementById("reset");
const modeDisplay = document.getElementById("mode");

function formatTime(seconds){
    const min = Math.floor(seconds/60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
}
function updateDisplay(){
    timerDisplay.textContent = formatTime(time)
}
function startTimer(){
    if(isRunning) return;
    isRunning = true;
    timer = setInterval(()=>{
        time--;
        updateDisplay();
        if(time<=0){
            clearInterval(timer);
            isRunning = false;
            switchMode();
        }
    },1000)
}
function pauseTimer(){
    clearInterval(timer);
    isRunning = false;
}
function resetTimer(){
    clearInterval(timer);
    isRunning = false;
    time = isFocus?focusTime:breakTime;
    updateDisplay();
}
function switchMode(){
    isFocus = !isFocus;
    time  = isFocus?focusTime:breakTime;
    modeDisplay.textContent = isFocus?"Focus Time":"Break Time";
    updateDisplay();
}
startbtn.addEventListener("click",startTimer);
pausebtn.addEventListener("click",pauseTimer);
resetbtn.addEventListener("click",resetTimer);
updateDisplay();



