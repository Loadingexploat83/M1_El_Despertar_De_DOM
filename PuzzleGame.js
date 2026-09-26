
const board = document.querySelector("#gameboard");
//Consigue el contexto en el que esta el "gameboard" para poder dibujar
const context = board.getContext("2d");


const slider = document.querySelector("#myRange");
const output = document.querySelector("#value");
const catDificulty = document.querySelector("#catDifficulty");
const startButton = document.querySelector("#startButton");
startButton.addEventListener('click', startGame);

// el tamanio y numero de tiles
const boardSize = board.clientWidth;

let tileCount = slider.value;
let tileSize = boardSize / tileCount;
const solved = false;

const boardParts =new Object;
createBoard();

// Donde clickea el usuario
const clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

//Donde esta la tile vacia
const emptyTile = new Object;
emptyTile.x = 0;
emptyTile.y = 0;

const img = new Image();
//img.src = getRandomImg();

// Espera a que se cargue la imagen antes de continuar con el codigo
// Si el codigo intenta dibujar los tiles sin que cargue la imagen daria problemas
//img.addEventListener("load", drawTiles, false);

output.textContent = `${slider.value} x ${slider.value}`;
slider.oninput = function() {
    output.textContent = `${this.value} x ${this.value}`;
    changeSliderColor();
    catDifficulty();
}



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

function createBoard(){

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
    solved = false;
}

document.querySelector("#board").onmousemove = function(e){
    //clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / );

}
