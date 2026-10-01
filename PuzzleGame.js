
const board = document.querySelector("#gameboard");


const slider = document.querySelector("#myRange");
const outputTxt = document.querySelector("#value");
const catDificulty = document.querySelector("#catDifficulty");
const startButton = document.querySelector("#startButton");
const catList = { 
    Onyx: "img/cats/Onyx",
    Kira: "img/cats/Kira",
    Patchi: "img/cats/Patchi",
    Mauricio: "img/cats/Mauricio"
}

startButton.addEventListener('click', startGame);

// el tamanio y numero de tiles
let boardSize = 0;
let tileSize = 0;

let tileCount = Number(slider.value);
let solved = false;

//Donde esta la tile vacia
const emptyTile = {
    x: 0,
    y: 0
};


let digitalBoard = {};

const img = new Image();

// Espera a que se cargue la imagen antes de continuar con el codigo
// Si el codigo intenta dibujar los tiles sin que cargue la imagen daria problemas
img.addEventListener("load", drawTiles);

outputTxt.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener( "input", function() {
    outputTxt.textContent = `${this.value} x ${this.value}`;

    
    //cuando cambiamos la barra de dificultad hay que calcular todo el tablero otra vez
    tileCount = Number(this.value);
    tileSize = boardSize / tileCount;

    changeSliderColor();
    setCatDifficultyImg();

    createBoard();
    createDivBoard();
    drawTiles();
});



function handleBoardClick(event){
    // donde clickeas en el tablero
    const rect =  board.getBoundingClientRect();

    // event.clientX es donde clickeas segun el navegador
    // Rect.left es donde empieza el tablero
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    if(canMove(x, y, emptyTile.x, emptyTile.y)){
        moveTile(emptyTile, {x, y});
        drawTiles();
    }   

    if(solved){
        // Hacemos esperar un poco antes de poner el print de victoria
        // ya que sino quizas lo hace antes de que se actualice visualmente el tablero
        setTimeout(function () {alert("Yippie");}, 250);
    }
}

board.addEventListener('click', handleBoardClick);


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
    document.querySelector("menu").style.display = "none";
    document.querySelector("#GameMode").style.display = "flex";

    img.src = getRandomImg();
    boardSize = board.clientWidth;
    tileSize = boardSize / tileCount;

    createBoard();
    createDivBoard();
    drawTiles();
    
}



// Funciones del juego:
function getRandomImg(){
    const cats = [
        "img/cats/Onyx_1.jpg",
        "img/cats/Kira_1.jpg",
        "img/cats/Patchi_1.jpg",
        "img/cats/Mauricio_1.jpg"
    ];

    const randomIndex = Math.floor(Math.random() * cats.length);
    return cats[randomIndex];
}



function createBoard(){

    digitalBoard = new Array(tileCount);
    for(let i = 0; i < tileCount; ++i){
        digitalBoard[i] = new Array(tileCount);
        for(let j = 0; j < tileCount; ++j){
            digitalBoard[i][j] = {
                x: tileCount - 1 - i,
                y: tileCount - 1 - j
            };
        }
    }

    emptyTile.x = digitalBoard[tileCount - 1][tileCount - 1].x;
    emptyTile.y = digitalBoard[tileCount - 1][tileCount - 1].y;
    solved = false;
}


function createDivBoard(){
    board.textContent = "";
    for(let i = 0; i < tileCount; i++){
        for(let j = 0; j < tileCount; j++){
            const tile = document.createElement("div");
            tile.classList.add("tile");

            // hace un width y height en % al total de "tiles"
            tile.style.width = `${100 / tileCount}%`;
            tile.style.height = `${100 / tileCount}%`;

            //dataset: permite guardar datos personalizados en elementos
            tile.dataset.x = i;
            tile.dataset.y = j;

            board.appendChild(tile)
        }
    }
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

}