const { createEvent } = require('./helpers');

var instruments = {
    labels: document.querySelectorAll('label'),
    rows: document.getElementsByClassName('row'),
    all: // list of all the instruments and their names. !!ATTENTION: name = html id
    [
        { id: "crash", src:"./sounds/Perc/Crash Future.mp3", icon:"../img/cymbals.svg", audio: new Audio("../sounds/Perc/Crash Future.mp3") },
        { id: "hiHat", src:"./sounds/Hat/Hats14.mp3", icon:"../img/drum-1.svg", audio: new Audio("../sounds/Hat/Hats14.mp3") },
        { id: "snare", src:"./sounds/Snare/Snare04.mp3", icon:"../img/drum-2.svg", audio: new Audio("../sounds/Snare/Snare04.mp3") },
        { id: "rightTom", src:"./sounds/Claps/Claps09.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Claps/Claps09.mp3") },
        { id: "leftTom", src:"./sounds/Claps/Claps09.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Claps/Claps09.mp3") },
        { id: "floorTom", src:"./sounds/Perc/Triangle.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Perc/Triangle.mp3") },
        { id: "kick", src:"./sounds/Kick/Kick14.mp3", icon:"../img/drums.svg", audio: new Audio("../sounds/Kick/Kick14.mp3") }
    ],

    selected() {
        // whenever you click on a label make it selected;
        window.addEventListener('click', function(e){
            console.log(e.target);
            if (e.target.localName === "label" ) {
                
                e.target.classList.toggle('selected');
            }
        })
    },

    appendIcon() {
        // set the names of the instruments to the labels
        for (var i = 0; i < instruments.rows.length; i++) {
            instruments.rows[i].querySelector('.label').innerHTML = "<img width='50' src='"+instruments.all[i].icon+"'/><span>"+instruments.all[i].id+"</span>";
        }
    },

    init() {
        this.appendIcon();
        this.selected();

        // remove four labels to fix on screen
        if(window.isMobile === true){
            // minify instructions
            var instructions = global.feedbackElement.parentNode.parentNode;
            instructions.className = 'mobile small';

            var menuButton = document.createElement('button');
            menuButton.innerHTML="menu";menuButton.id = "menu-toggle"

            createEvent(menuButton, 'click', function(){
                instructions.classList.toggle('small');
            });

            instructions.insertAdjacentElement('afterbegin', menuButton);

            for (var i = 0; i < instruments.rows.length; i++) {
                for (var j = 1; j < 5; j++) {
                    instruments.rows[i].children[j].remove()
                }
            }
        }
    },
}

module.exports = instruments;