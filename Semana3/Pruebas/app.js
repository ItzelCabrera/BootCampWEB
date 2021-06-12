const rock = document.getElementById("R");
const paper = document.getElementById("P");
const scissors = document.getElementById("S");

const score_user = document.getElementById("s-u");
const score_computer = document.getElementById("s-c");

const message = document.getElementById("mssg");

let computerScore = 0;
let userScore = 0;

function getComputerChoice(){
    const choices = ["r","p","s"];
    let random = Math.floor(Math.random()*3);
    return choices[random];
}

function updateScore(){
    /*Modifica los valores del html*/
    score_user.innerHTML = userScore;
    score_computer.innerHTML = computerScore;
}

function convert(s){
    switch(s){
        case "r":
            return "Rock";
            break;
        case "p":
            return "Paper";
            break;
        case "s":
            return "Scissors"; 
            break;
        default:
            alert("Algo salió mal");
            break;
    }
}

function loose(u,c){
    /*console.log("Perdiste");*/
    computerScore++;
    updateScore();
    message.innerHTML = `${convert(u)} loose with ${convert(c)}, so you loose`;
}

function win(u,c){
    /*console.log("Ganaste");*/
    userScore++;
    updateScore();
    message.innerHTML = `${convert(u)} wins to ${convert(c)}, so you win`;
}

function draw(u,c){
    /*console.log("Empate");*/
    message.innerHTML = `Draw`;
}

function changeColors(HTMLelement,state){
    HTMLelement.className =  "choice " + state;
    setTimeout(function(){
        HTMLelement.className =  "choice ";
    },1000); /*Llama a esta funcion despues del tiempo establecido*/
}

function game(uChoice,element){
    let cChoice = getComputerChoice();
    switch(uChoice+cChoice){
        case "ps":
        case "sr":
        case "rp":
            console.log(uChoice+cChoice);
            loose(uChoice,cChoice);
            changeColors(element,"loose");
            break;
        case "sp":
        case "rs":
        case "pr":
            console.log(uChoice+cChoice);
            win(uChoice,cChoice);
            changeColors(element,"win");
            break;
        case "pp":
        case "ss":
        case "rr":
            console.log(uChoice+cChoice);
            draw(uChoice,cChoice);
            changeColors(element,"draw");
            break;
        default:
            alert("Algo salió mal");
            break;
    }
}

rock.addEventListener('click',function(){
    game("r",this);
})

paper.addEventListener('click',function(){
    game("p",this);
})

scissors.addEventListener('click',function(){
    game("s",this);
})