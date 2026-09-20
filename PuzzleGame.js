
var slider = document.getElementById("myRange");
var output = document.getElementById("value");

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

}