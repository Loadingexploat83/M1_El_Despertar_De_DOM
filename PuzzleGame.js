
const slider = document.getElementById("myRange");
const output = document.getElementById("value");
const catDificulty = document.getElementById("catDifficulty");
const board = document.getElementById("board");

output.innerHTML = `${slider.value} x ${slider.value}`;

slider.oninput = function() {
    output.innerHTML = `${this.value} x ${this.value}`;
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