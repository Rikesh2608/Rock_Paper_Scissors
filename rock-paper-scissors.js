let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,losses:0,tie:0
};
display();
let rock='rock-emoji.png';
let paper='paper-emoji.png';
let scissors='scissors-emoji.png';

let result;
let ComputerMove='';
document.querySelector('.js-autoplay')
.addEventListener('click',()=>autoplay());
document.querySelector('.reset')
.addEventListener('click',()=>reset());

document.addEventListener('keydown', function (event) {
    if (event.key === 'r') {
        update('rock');
    }
    else if(event.key==='p'){
        update('paper');
    }
    else if(event.key==='s'){
        update('scissors');
    }
    else if(event.key==='Backspace'){
        reset();
    }
});


function update(playerMove){
    ComputerMove=Math.random();
    if(ComputerMove<=(1/3)){
        ComputerMove='rock';
    }
    else if(ComputerMove<=(2/3)){
        ComputerMove='paper';
    }
    else if (ComputerMove<=(3/3)){
        ComputerMove='scissors';
    }

    if(playerMove==='rock'){
        if(ComputerMove=='rock'){
            score.wins++;
            result='Win';
        }
        if(ComputerMove=='paper'){
            score.losses++;
            result='Loss';
        }
        if(ComputerMove=='scissors'){
            score.wins++;
            result='Tie';
        }
    }
    else if(playerMove==='paper'){
        if(ComputerMove=='rock'){
            score.wins++;
            result='Win';
        }
        if(ComputerMove=='paper'){
            score.tie++;
            result='Tie';
        }
        if(ComputerMove=='scissors'){
            score.losses++;
            result='Loss';
        }
    }
    else if(playerMove==='scissors'){
        if(ComputerMove=='rock'){
            score.losses++;
            result='Loss';
        }
        if(ComputerMove=='paper'){
            score.wins++;
            result='Win';
        }
        if(ComputerMove=='scissors'){
            score.tie++;
            result='Tie';
        }
    }
    display();
    emojis(playerMove,ComputerMove);
}
function emojis(playerMove,ComputerMove){
    let c=document.querySelector('.score-board');
    c.innerHTML=`
    <p class="result">${result}</p>
    <div class="computer-score">
        You
        <img src="${playerMove}-emoji.png" class="emojis">
        <img src="${ComputerMove}-emoji.png" class="emojis">
        Computer    
    </div>
    `;
}
function display(){
    let c=document.querySelector('.scores');
    c.innerHTML=`
    Wins:${score.wins},Losses: ${score.losses}, Ties: ${score.tie}
    `;
    localStorage.setItem('score',JSON.stringify(score));
}

function reset(){
    let r=document.querySelector('.reset-button');
    r.innerHTML=`
        Are you sure you want to reset the score?
        <button onclick="reset_score(1)">Yes</button>
        <button onclick="reset_score(0)">No</button>
    `;
}

function reset_score(r){
    if(r){
        score.wins=0;
        score.losses=0;
        score.tie=0;
        display();
        let r=document.querySelector('.reset-button');
        r.innerHTML=`
        <button class="reset" onclick="reset()">Reset Score</button>
        <button class="js-autoplay" onclick="autoplay()"></button>
        `;
        auto=1;
    }
    else{
    let r=document.querySelector('.reset-button');
        r.innerHTML=`
        <button class="reset" onclick="reset()">Reset Score</button>
        <button class="js-autoplay" onclick="autoplay()"></button>
        `;
        auto=0;
    }
    autoplay();
}

let autoplayInterval;
let auto;

function autoplay() {
    let c;
    if (!auto) { 
        auto = 1;
        c = document.querySelector('.js-autoplay');
        c.innerHTML = `Stop`;
        autoplayInterval = setInterval(() => {
            playerMove = Math.random();
            if (playerMove <= 1 / 3) {
                playerMove = 'rock';
            } else if (playerMove <= 2 / 3) {
                playerMove = 'paper';
            } else if (playerMove <= 3 / 3) {
                playerMove = 'scissors';
            }
            update(playerMove);
        }, 500);
    } else {
        auto = 0;
        c = document.querySelector('.js-autoplay');
        c.innerHTML = `Auto Play`;
        clearInterval(autoplayInterval);
    }
}
