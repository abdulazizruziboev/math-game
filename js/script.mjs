import {elLoader,elMathTxt,elCorrectTxt,elWrongTxt,elTimerTxt,elSelectBox,elGreetingBox,elGreetingCloseBtn,elContinueBox,elContinueCloseBtn} from "./elements.mjs";

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(()=>{
    elLoader.style.transform = "translateY(-100%)";
    },1500)
})

let correctScore = 0;
let wrongScore = 0;
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
return {math,result};
};

function results(result) {
let resultsArray = [];
while(resultsArray.length!==20) {
resultsArray.push(random(100));
} 
resultsArray[random(resultsArray.length)] = result;
return resultsArray;
}

function decraseCorrect(){
    correctScore--;
    elCorrectTxt.textContent=correctScore;
    newGame();
}

function newGameRetry(){
    newGame();
};

function newGame(){
    let ti = null;
    function timer(time) {
    ti = setInterval(()=>{
        elTimerTxt.textContent=time;
        if(time==0){
            clearInterval(ti);
            timer(8);
            decraseCorrect();
        }
        time--;
    },1000);
    };
    timer(8);

    const {math,result} = generate();
    const resultsArray = results(result);
    elMathTxt.textContent = math;
    elSelectBox.innerHTML="";
    resultsArray.forEach((el,inx)=>{
        let resultChilds = document.createElement("span");
        resultChilds.textContent=el;
        if(inx%2==0) {
            resultChilds.style.cssText = `
            width: 100px; 
            height: 100px;
            background: yellow;
            color: dodgerblue;
            font-size: 30px;
            display: flex; justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s linear;
            `;
        } else {
            resultChilds.style.cssText = `
            width: 100px; 
            height: 100px;
            background: dodgerblue;
            color: yellow;
            font-size: 30px;
            display: flex; justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s linear;
            `
        }
        resultChilds.classList.add("select_btns");
        elSelectBox.append(resultChilds);
        resultChilds.addEventListener("click",(evt)=>{
            if(evt.target.textContent==result) {
                correctScore++;
                elCorrectTxt.textContent=correctScore;
                evt.target.textContent="👌";
                clearInterval(ti);
                setTimeout(()=>{newGameRetry()},1000)
            } else {
                wrongScore++;
                elWrongTxt.textContent=wrongScore;
                evt.target.textContent="😞";
                clearInterval(ti);
                setTimeout(()=>{newGameRetry()},1000)
            }
        })
    });
};

elGreetingCloseBtn.addEventListener("click",()=>{
    elGreetingBox.style.transform="translateY(-100%)";
});
elContinueCloseBtn.addEventListener("click",()=>{
    elContinueBox.style.transform="translateY(-100%)";
    newGame();
});

let enterPressed = 0;
document.addEventListener("keypress",(evt)=>{
    if(evt.key=="Enter") {
        enterPressed++;
    };
    if(enterPressed==1) {
        elGreetingBox.style.transform="translateY(-100%)";
    }; 
    if(enterPressed==2) {
       elContinueBox.style.transform="translateY(-100%)";
       newGame();
    };
});
