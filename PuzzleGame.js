
const board = document.querySelector("#gameboard");
//Consigue el contexto en el que esta el "gameboard" para poder dibujar
const context = board.getContext("2d");


const slider = document.querySelector("#myRange");
const output = document.querySelector("#value");
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


let boardParts = new Object;

const img = new Image();
img.src = `img/cats/Onyx_1.jpg`;

// Espera a que se cargue la imagen antes de continuar con el codigo
// Si el codigo intenta dibujar los tiles sin que cargue la imagen daria problemas
img.addEventListener("load", drawTiles);

output.textContent = `${slider.value} x ${slider.value}`;
slider.oninput = function() {
    output.textContent = `${this.value} x ${this.value}`;
    changeSliderColor();
    catDifficulty();

    //cuando cambiamos la barra de dificultad hay que calcular todo el tablero otra vez
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    createBoard();
    drawTiles();
}

board.onmousemove = function name(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);

}

board.addEventListener('click', function(){
    if(canMove(clickLoc.x, clickLoc.y, emptyTile.x, emptyTile.y)){
        moveTile(emptyTile, clickLoc);
        drawTiles();
    }
    if(solved){
        // Hacemos esperar un poco antes de poner el print de victoria
        // ya que sino quizas lo hace antes de que se actualice visualmente el tablero
        setTimeout(function () {alert("Yippie");}, 500);
    }
});


// funciones del menu:
function changeSliderColor() {
    let value = ((slider.value - slider.min) / (slider.max - slider.min) * 100 );
    let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + value + '%, rgb(214, 214, 214)' + value + '%)';
    slider.style.background = color;
}

function catDifficulty() {
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

    boardParts = new Array(tileCount);
    for(let i = 0; i < tileCount; ++i){
        boardParts[i] = new Array(tileCount);
        for(let j = 0; j < tileCount; ++j){
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (tileCount - 1) - i;
            boardParts[i][j].y = (tileCount - 1) - j;
        }
    }

    emptyTile.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyTile.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
}

// calcula la distancia entre X e Y
// Si la distancia es 1, devuelve "True", sino devuelve "False"
function canMove (x1, y1, x2, y2){
    return Math.abs(x1- x2) + Math.abs (y1 - y2) == 1;
}

function moveTile(destination, origin){
    if(!solved) {
        boardParts[destination.x][destination.y].x = boardParts [origin.x][origin.y].x;
        boardParts[destination.x][destination.y].y = boardParts [origin.x][origin.y].y;
        boardParts[origin.x][origin.y].x = tileCount -1;
        boardParts[origin.x][origin.y].y = tileCount -1;
        destination.x = origin.x;
        destination.y = origin.y;
        checkSolved();
    }
}

function checkSolved(){
    let correct = true;
    for(let i = 0; i < tileCount; i++)
        for(let j = 0; j < tileCount; j++)
            if(boardParts[i][j].x != i || boardParts [i][j].y != j)
                correct = false;
        
    solved = correct;
}

function drawTiles(){
    // vaciamos el canvas
    context.clearRect(0,0, boardSize, boardSize);

    for(let i = 0; i < tileCount; i++){
        for(let j = 0; j < tileCount; j++){
            let x = boardParts[i][j].x;
            let y = boardParts[i][j].y;
            if(i != emptyTile.x || j != emptyTile.y || solved === true){
                context.drawImage(img, x*tileSize, y*tileSize, tileSize, tileSize, i * tileSize, j*tileSize, tileSize, tileSize);
            }
        }

    }

}