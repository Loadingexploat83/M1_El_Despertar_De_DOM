
const board = document.querySelector("#gameboard");
const slider = document.querySelector("#myRange");
const outputTxt = document.querySelector("#value");
const catDifficulty = document.querySelector("#catDifficulty");

const menu = document.querySelector("#menu");
const gameMode = document.querySelector("#GameMode");

const startButton = document.querySelector("#startButton");
const returnButton = document.querySelector("#returnButton");

const movesCounter = document.querySelector("#moves");
const timeCounter = document.querySelector("#time");

const catList = [
    "img/cats/Kira_1.jpg",
    "img/cats/Mauricio_1.jpg",
    "img/cats/Mauricio_2.jpg",
    "img/cats/Onyx_1.jpg",
    "img/cats/Onyx_2.jpg",
    "img/cats/Onyx_3.jpg",
    "img/cats/Onyx_4.jpg",
    "img/cats/Patchi_1.jpg",
    "img/cats/Patchi_2.jpg",
    "img/cats/Patchi_3.jpg",
    "img/cats/Patchi_4.jpg",
]

    
// el tamanio y numero de tiles
let boardSize = 0;
let tileSize = 0;

let tileCount = Number(slider.value);

let solved = false;
let moves = 0;

let timer = 0;
let timerInterval = null;
let timerStarted = false;


//Donde esta la tile vacia
const emptyTile = {
    x: 0,
    y: 0
};

let digitalBoard = {};
const img = new Image();


startButton.addEventListener('click', startGame);

returnButton.addEventListener('click', function() {
    menu.classList.remove("hidden");
    gameMode.classList.add("hidden");
    board.textContent = "";
    solved = false;
});


// Espera a que se cargue la imagen antes de continuar con el codigo
// Si el codigo intenta dibujar los tiles sin que cargue la imagen daria problemas
img.addEventListener("load", drawTiles);


board.addEventListener('click', handleBoardClick)

// funcion que usaremos para activar el modo oscuro
document.addEventListener('keydown', handleKeyPress);


slider.addEventListener( "input", function() {
    outputTxt.textContent = `${this.value} x ${this.value}`;

    
    //cuando cambiamos la barra de dificultad hay que calcular todo el tablero otra vez
    tileCount = Number(this.value);

    changeSliderColor();
    setCatDifficultyImg();
});


outputTxt.textContent = `${slider.value} x ${slider.value}`;


// funciones del menu:
function changeSliderColor() {
    let value = ((slider.value - slider.min) / (slider.max - slider.min) * 100 );

    slider.style.background = 'linear-gradient(90deg, rgb(117, 252, 117)' + value + '%, rgb(214, 214, 214)' + value + '%)';
}

function setCatDifficultyImg() {
    catDifficulty.src = `img/difficulty/cat_${slider.value}.png`;

}

function startGame() {
    menu.classList.add("hidden");
    gameMode.classList.remove("hidden");

    moves = 0;
    movesCounter.textContent = moves;

    stopTimer();
    timer = 0;
    timerStarted = false;
    timeCounter.textContent = "0:00";

    solved = false;

    img.src = getRandomImg();

    boardSize = board.clientWidth;
    tileSize = boardSize / tileCount;

    createBoard();
    shuffleBoard();
    createDivBoard();
    
}


// Funciones del juego:
function getRandomImg(){

    const randomIndex = Math.floor(Math.random() * catList.length);
    return catList[randomIndex];
}



function createBoard(){

    digitalBoard = new Array(tileCount);
    for(let i = 0; i < tileCount; ++i){
        digitalBoard[i] = new Array(tileCount);
        for(let j = 0; j < tileCount; ++j){
            digitalBoard[i][j] = {
                x: i,
                y: j
            };
        }
    }

    emptyTile.x = tileCount - 1;
    emptyTile.y = tileCount - 1;
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
            tile.dataset.x = j;
            tile.dataset.y = i;

            board.appendChild(tile)
        }
    }
}

function shuffleBoard(){

    const directions = [
        [-1, 0], // izquierda
        [1, 0],  // derecha
        [0, -1], // arriba
        [0, 1]   // abajo
    ];

    for(let i = 0; i < 100; i++){

        const validMoves = directions.map(function(direction){
            return {
                x: emptyTile.x + direction[0],
                y: emptyTile.y + direction[1]
            };

        }).filter(function(position){
            return (
                position.x >= 0 && position.x < tileCount &&
                position.y >= 0 && position.y < tileCount

            );

        });

        const randomIndex = Math.floor(Math.random() * validMoves.length);
        const randomMove = validMoves[randomIndex];

        // no podemos llamar a moveTile, porque si checkSolves se llama, el tablero se queda resuelto
        digitalBoard[emptyTile.x][emptyTile.y] = digitalBoard[randomMove.x][randomMove.y];
        digitalBoard[randomMove.x][randomMove.y] = {
            x: tileCount - 1,
            y: tileCount - 1
        };
        emptyTile.x = randomMove.x;
        emptyTile.y = randomMove.y;
    }
    solved = false;

}

function startTimer() {
    if (timerStarted) return; // Evita iniciar el temporizador si ya está en marcha
    timerStarted = true;
    timer = 0;
    
    timerInterval = setInterval(function() {
        timer++;
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timeCounter.textContent = 
        //padStart: hace que el string sea de 2 digitos
        `${minutes}:${seconds.toString().padStart(2,"0")}`
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
}

function handleBoardClick(event){


    if (!event.target.classList.contains("tile")) {
        return;
    }

    const x = Number(event.target.dataset.x);
    const y = Number(event.target.dataset.y);

    if(canMove(x, y, emptyTile.x, emptyTile.y)){
        startTimer();
        moveTile(emptyTile, {x: x, y: y});
        moves++;
        movesCounter.textContent = moves;

        if(solved){
            stopTimer();
            // Hacemos esperar un poco antes de poner el print de victoria
            // ya que sino quizas lo hace antes de que se actualice visualmente el tablero
            setTimeout(function () {alert(`Yippie, lo resolviste en ${moves} movimientos y ${timer} segundos`);}, 250);
        }
    }   


}


function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'd') {
        document.body.classList.toggle('dark-mode');
    }
}


// calcula la distancia entre X e Y
// Si la distancia es 1, devuelve "True", sino devuelve "False"
function canMove (x1, y1, x2, y2){
    return Math.abs(x1- x2) + Math.abs (y1 - y2) === 1;
}

function moveTile(destination, origin){
    if(solved) 
        return;
    
    const emptyPosition = {
        x: emptyTile.x,
        y: emptyTile.y
    };

    //movemos la pieza al hueco
    digitalBoard[destination.x][destination.y] = digitalBoard [origin.x][origin.y];

    // creamos una nueva casilla vacia en la posicion de la pieza que hemos movido
    digitalBoard[origin.x][origin.y] = {
        x: tileCount - 1,
        y: tileCount - 1
    };
    destination.x = origin.x;
    destination.y = origin.y;
    checkSolved();

    drawTile(emptyPosition.x, emptyPosition.y);
    drawTile(destination.x, destination.y);
}

function checkSolved(){
    let correct = true;
    for(let i = 0; i < tileCount; i++)
        for(let j = 0; j < tileCount; j++)
            if(digitalBoard[i][j].x !== i || digitalBoard [i][j].y !== j)
                correct = false;
        
    solved = correct;
}

function drawTiles(){

    // busca en el board todos los tiles
    const tiles = board.querySelectorAll(".tile");

    tiles.forEach(function(tile){
        const x = Number(tile.dataset.x);
        const y = Number(tile.dataset.y);

        drawTile(x, y);
    });
    

}

function drawTile(x, y){
    const tile = board.querySelector(
        `.tile[data-x="${x}"][data-y="${y}"]`
    );

    if(!tile) return;

    // si es la tile vacia, no le ponemos imagen
    if(x === emptyTile.x && y === emptyTile.y && !solved){
        tile.style.backgroundImage = "none";
        return;
    }

    const tileX = digitalBoard[x][y].x;
    const tileY = digitalBoard[x][y].y;

    //cogemos la imagen
    tile.style.backgroundImage = `url(${img.src})`;
    //queremos que cada tile tenga la imagen completa, como si fuera el tablero entero, asique multiplicamos el tamaño para conseguirlo
    tile.style.backgroundSize = `${tileCount * 100}% ${tileCount * 100}%`;
    
    //movemos la posicion para que cada tile tenga la parte correcta de la imagen
    tile.style.backgroundPosition = `${tileX * 100 / (tileCount -1)}%` 
                                    + `${tileY * 100 / (tileCount -1)}%`;

}