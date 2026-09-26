
const slider = document.querySelector("#myRange");
const output = document.querySelector("#value");
const catDificulty = document.querySelector("#catDifficulty");
const board = document.querySelector("#board");
const startButton = document.querySelector("#startButton");

const solved = false;
const clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

output.textContent = `${slider.value} x ${slider.value}`;

slider.oninput = function() {
    output.textContent = `${this.value} x ${this.value}`;
    changeSliderColor();
    catDifficulty();
}

startButton.addEventListener('click', startGame);
//startButton.onclick = startGame();


function changeSliderColor() {
    let value = ((slider.value - slider.min) / (slider.max - slider.min) * 100 );
    let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + value + '%, rgb(214, 214, 214)' + value + '%)';
    slider.style.background = color;
}

function catDifficulty() {
    catDificulty.src = `img/difficulty/cat_${slider.value}.png`;

}

function startGame() {
    let difficulty = slider.value;
    document.getElementById("menu").style.display = "none";
    document.getElementById("GameMode").style.display = "flex";
    generatePuzzle(difficulty);
}

/*
function generatePuzzle(difficulty) {

    let blocks = "";
    for(let i = 0; i < difficulty; i++){
        blocks += `<div class = "row"> `;
        for(let j = 0; j < difficulty; j++){
            blocks += `<img class = "cell" src = "img/${difficulty}x${difficulty}/Onyx_2/${i}_${j}.jpg"> </img>`
        }
        blocks += `</div> `;
    }
    board.innerHTML = blocks;
    board.style.setProperty("--difficulty", difficulty);

}
*/

function setBoard(){

    boardParts = new Array(difficulty);
    for(let i = 0; i < difficulty; i++){
        boardParts[i] = new Array(difficulty);
        for(let j = 0; j < difficulty; j++){
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (difficulty - 1) - i;
            boardParts[i][j].x = (difficulty - 1) - j;
        }
    }

    emptyLoc.x = boardParts[difficulty - 1][difficulty - 1].x;
    emptyLoc.y = boardParts[difficulty - 1][difficulty - 1].y;
}
