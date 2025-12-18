import {elLoader,elMathTxt,elCorrectTxt,elWrongTxt,elTimerTxt,elSelectBox,elGreetingBox,elGreetingCloseBtn,elContinueBox,elContinueCloseBtn} from "./elements.mjs";

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(()=>{
    elLoader.style.transform = "translateY(-100%)";
    },1500)
})

let correctScore = 0;
let wrongScore = 0;
let time = 8
function random(p) {
return Math.trunc(Math.random()*p);
};

function generate() {
let ms = ['+','-','*','/'];
let ri = random(ms.length);
let a = random(10);
let c = random(10);
let b = ms[ri];
if(b=="/") {
while(a<c||a%c!==0) {
a = random(10);
c = random(10);
}
}
let math = `${a}${b}${c}`;
let result = eval(math);
console.log
(math,result);
return {math,result};
};

function results(result) {
let resultsArray = [];
while(resultsArray.length!==16) {
resultsArray.push(random(100));
} 
resultsArray[random(resultsArray.length)] = result;
return resultsArray;
}
function game(timeID){  
clearInterval(timeID);
const {math,result} = generate();
const resultsArray = results(result);
elMathTxt.textContent=math;
elSelectBox.innerHTML=``;
resultsArray.forEach((el)=>{
let resultItems = document.createElement("span");
resultItems.textContent = el;
resultItems.style.cssText = `
width: 100px;
height: 100px;
color: yellow;
background: dodgerblue;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.4s linear;
`;
resultItems.classList.add("js-select");
resultItems.classList.add("hover:transform-[scale(1.1)]");
resultItems.classList.add("hover:shadow-[0px_0px_20px_20px_#0003]");
elSelectBox.append(resultItems);
})
function timer(time) {
    let timetInterval = setInterval(() => {
    elTimerTxt.textContent=time+"s";
    if(time==-1){
        elTimerTxt.textContent="8s";
        correctScore--;
        elCorrectTxt.textContent=correctScore;
        game(timetInterval);
    }
    time--;
}, 1000);
return timetInterval;
}
timer(time);
let selectItems = document.querySelectorAll(".js-select")
selectItems.forEach((el)=>el.addEventListener("click",(evt)=>{
    if(evt.target.textContent==result) {
        correctScore++;
        elCorrectTxt.textContent=correctScore;
        evt.target.textContent="👌";
        setTimeout(game,1500);
    } else if(evt.target.textContent!=result) {
        wrongScore++;
        elWrongTxt.textContent=wrongScore;
        evt.target.textContent="😞";
        setTimeout(game,1500);
    }
}));
};

let enterPressed = 0;

elGreetingCloseBtn.addEventListener("click",()=>{
    elGreetingBox.style.transform="translateY(-100%)";
});
elContinueCloseBtn.addEventListener("click",()=>{
    elContinueBox.style.transform="translateY(-100%)";
    game();
});

document.addEventListener("keypress",(evt)=>{
    if(evt.key=="Enter") {
        enterPressed++;
    };
    if(enterPressed==1) {
        elGreetingBox.style.transform="translateY(-100%)";
    }; 
    if(enterPressed==2) {
       elContinueBox.style.transform="translateY(-100%)";
       game();
    };
});
