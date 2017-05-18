


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
// Sequencer
function metronome () {
    for (var i = 0; i < labels.length; i++) {
        labels[i].classList.remove('active');
    }
    var currentRow = document.querySelectorAll('label:nth-of-type('+beat+')');
    // Do this function for each .row
    for (var i = 0; i < currentRow.length; i++) {
        currentRow[i].classList.add('active');
    }
        // Select the child element at the "beat" index
        // If the current input is checked do some stuff!
        // if (current.find('input').is(":checked")) {
        //   targetDrum = (current.parent().attr('data-target-drum'));
        //         // If there a function that shares the same name as the data attribue, do it!
        //         fn = window[targetDrum];
        //         if (typeof fn === "function") {
        //             fn();
        //         }
        // }
    // If we get to the last child, start over
  if ( beat < (rows[0].children.length - 1) ) {
    ++beat;
  } else {
    beat = 1;
  }
}
