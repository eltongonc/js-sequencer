/**************
** Instruments
***************/
// list of all the instruments and their names. !!ATTENTION: name = html id
var allInstruments = [
    {id: "crash", src:"/sounds/Perc/Crash Future.wav"},
    {id: "hiHat", src:"/sounds/Hat/Hats14.wav"},
    {id: "snare", src:"/sounds/Snare/Snare04.wav"},
    {id: "rightTom", src:"/sounds/Claps/Claps09.wav"},
    {id: "leftTom", src:"/sounds/Claps/Claps09.wav"},
    {id: "floorTom", src:"/sounds/Claps/Claps09.wav"},
    {id: "kick", src:"/sounds/Kick/Kick14.wav"}
];

// whenever you click on a label make it selected;
window.addEventListener('click', function(e){
    if (e.target.localName === "label" ) {
        e.target.classList.toggle('selected');
    }
})

/*********************
** Metronome
**********************/
var isPlaying = false;
var bpm = 150;
var tempo = 60000 / bpm;
var intervalId;

// play pause toggle
var button = document.getElementById('play-pause');
button.addEventListener('click', playPause);
function playPause(){
    if (isPlaying === false) {
        intervalId = setInterval(metronome, tempo);
    }else {
        clearInterval(intervalId);
    }
    isPlaying = !isPlaying;
}

function newTempo(){
    clearInterval(intervalId);
    intervalId = setInterval(metronome, tempo);
}

// increase speed
var plusBtn = document.getElementById('plus');
plusBtn.addEventListener('click', updateTempo)
// decrease speed
var minusBtn = document.getElementById('minus');
minusBtn.addEventListener('click', updateTempo)
// manual input
var input = document.getElementById('tempo');
input.addEventListener('change', updateTempo)

function updateTempo(e){
    if (e.target.id === "minus" && input.value > input.min ) {
        input.value = Number(input.value)-10;
    }else if (e.target.id === "plus" && input.value < input.max ) {
        input.value = Number(input.value)+10;
    }
    if (e.target.id === "tempo") {
        bpm = e.target.value;
    }

    tempo = 60000 / input.value;
    if(isPlaying === true) {
        newTempo();
    }
}


// Sequencer varibles
var rows = document.getElementsByClassName('row');
var labels = document.querySelectorAll('label');
// Beat starts at 1 because 0 is the img for each row
var beat = 1;

// set the names of the instruments to the labels
for (var i = 0; i < rows.length; i++) {
    console.log(rows[i]);
    rows[i].querySelector('.label').innerHTML = allInstruments[i].id;
}


function metronome () {
    for (var i = 0; i < labels.length; i++) {
        labels[i].classList.remove('active');
    }
    var currentColumn = document.querySelectorAll('label:nth-of-type('+beat+')');
    // Do this function for each .row
    for (var i = 0; i < currentColumn.length; i++) {
        currentColumn[i].classList.add('active');
        // for every checkbox that is checked play the corresponding Audio
        if (currentColumn[i].children[0].checked) {
            var audio = new Audio(allInstruments[i].src);
            audio.play();
        }

    }

    // If we get to the last child, start over
    if ( beat < (rows[0].children.length - 2) ) {
        ++beat;
    } else {
        beat = 1;
    }
}
