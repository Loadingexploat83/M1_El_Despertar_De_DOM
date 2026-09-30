
const board = document.querySelector("#gameboard");
//Consigue el contexto en el que esta el "gameboard" para poder dibujar
const context = board.getContext("2d");


const slider = document.querySelector("#myRange");
const outputTxt = document.querySelector("#value");
const catDificulty = document.querySelector("#catDifficulty");
const startButton = document.querySelector("#startButton");

startButton.addEventListener('click', startGame);

// el tamanio y numero de tiles
let boardSize = 0;
let tileSize = 0;

let tileCount = Number(slider.value);
let solved = false;


// Donde clickea el usuario
const clickLoc = {
    x: 0,
    y: 0
};

//Donde esta la tile vacia
const emptyTile = {
    x: 0,
    y: 0
};


let digitalBoard = new Object;

const img = new Image();
img.src = getRandomImg();

// Espera a que se cargue la imagen antes de continuar con el codigo
// Si el codigo intenta dibujar los tiles sin que cargue la imagen daria problemas
img.addEventListener("load", drawTiles);

outputTxt.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener( "input", function() {
    outputTxt.textContent = `${this.value} x ${this.value}`;
    changeSliderColor();
    setCatDifficultyImg();

    //cuando cambiamos la barra de dificultad hay que calcular todo el tablero otra vez
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    createBoard();
    drawTiles();
});

board.addEventListener("mousemove", function(e){

    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
});


board.addEventListener('click', function(){
    if(canMove(clickLoc.x, clickLoc.y, emptyTile.x, emptyTile.y)){
        moveTile(emptyTile, clickLoc);
        drawTiles();
    }
    if(solved){
        // Hacemos esperar un poco antes de poner el print de victoria
        // ya que sino quizas lo hace antes de que se actualice visualmente el tablero
        setTimeout(function () {alert("Yippie");}, 250);
    }
});


// funciones del menu:
function changeSliderColor() {
    let value = ((slider.value - slider.min) / (slider.max - slider.min) * 100 );
    let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + value + '%, rgb(214, 214, 214)' + value + '%)';
    slider.style.background = color;
}

function setCatDifficultyImg() {
    catDificulty.src = `img/difficulty/cat_${slider.value}.png`;

}

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("GameMode").style.display = "flex";

    boardSize = board.clientWidth;
    board.width = boardSize;
    board.height = boardSize;
    tileSize = boardSize / tileCount;

    createBoard();
    drawTiles();
}



// Funciones del juego:
function getRandomImg(){
    return `img/cats/Onyx_1.jpg`;
}

function createBoard(){

    digitalBoard = new Array(tileCount);
    for(let i = 0; i < tileCount; ++i){
        digitalBoard[i] = new Array(tileCount);
        for(let j = 0; j < tileCount; ++j){
            digitalBoard[i][j] = new Object;
            digitalBoard[i][j].x = (tileCount - 1) - i;
            digitalBoard[i][j].y = (tileCount - 1) - j;
        }
    }

    emptyTile.x = digitalBoard[tileCount - 1][tileCount - 1].x;
    emptyTile.y = digitalBoard[tileCount - 1][tileCount - 1].y;
    solved = false;
}

// calcula la distancia entre X e Y
// Si la distancia es 1, devuelve "True", sino devuelve "False"
function canMove (x1, y1, x2, y2){
    return Math.abs(x1- x2) + Math.abs (y1 - y2) == 1;
}

function moveTile(destination, origin){
    if(!solved) {
        digitalBoard[destination.x][destination.y].x = digitalBoard [origin.x][origin.y].x;
        digitalBoard[destination.x][destination.y].y = digitalBoard [origin.x][origin.y].y;
        digitalBoard[origin.x][origin.y].x = tileCount -1;
        digitalBoard[origin.x][origin.y].y = tileCount -1;
        destination.x = origin.x;
        destination.y = origin.y;
        checkSolved();
    }
}

function checkSolved(){
    let correct = true;
    for(let i = 0; i < tileCount; i++)
        for(let j = 0; j < tileCount; j++)
            if(digitalBoard[i][j].x != i || digitalBoard [i][j].y != j)
                correct = false;
        
    solved = correct;
}

function drawTiles(){
    // vaciamos el canvas
    context.clearRect(0,0, boardSize, boardSize);

    for(let i = 0; i < tileCount; i++){
        for(let j = 0; j < tileCount; j++){
            let x = digitalBoard[i][j].x;
            let y = digitalBoard[i][j].y;
            if(i != emptyTile.x || j != emptyTile.y || solved === true){
                context.drawImage(img, x*tileSize, y*tileSize, tileSize, tileSize, i * tileSize, j*tileSize, tileSize, tileSize);
            }
        }

    }

}