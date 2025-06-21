let heading = document.querySelector("h2");
// let btn = document.querySelector(".btn");
let gameSeq=[];
let userSeq = [];
let btns = ["red","yellow","blue","purple"];

let started = false;
let level = 0;
let maxScore = 0;

document.addEventListener("click",function(){
    if (started == false) {
        console.log("game started");
        started = true;
    }

    levelUp();

});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },250)
}

function levelUp() {
    userSeq = [];
    level++;
    maxScore = Math.max(level,maxScore);

    heading.innerHTML=`Level ${level} <br> Highest Score : ${maxScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[randIdx];
    let randBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    btnFlash(randBtn);
};

function checkAns(idx){
    // let idx = level - 1;
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        heading.innerHTML=`Game Over. Your Score is ${level}. <br>  Press Any key to Restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length -1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    gameSeq=[];
    userSeq = [];
    started = false;
    level = 0;
}