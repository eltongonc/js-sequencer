const { createEvent, global } = require('./helpers');
const bpm = require('./bpm');
const controls = require('./controls');
const instruments = require('./instruments');

const sequencer = {
    isPlaying: false, //current state of the sequencer
    
    getColumn() {
        if ( bpm.index < (instruments.rows[0].children.length - 1) ) {
            ++bpm.index;
        }
        // set it to 1 because position 0 is the instrument label
        else { bpm.index = 1;}
        return document.querySelectorAll('label:nth-of-type('+bpm.index+')');
    },

    startStop(e) {
        if (this.isPlaying === false) {
            // play pause toggle
            // e.target.innerHTML = "Pause";
            this.isPlaying === true;
            global.feedbackElement.innerHTML = global.feedback[1]
            global.intervalId = window.setInterval(this.updateRows, bpm.currentTempo());
        }else {
            // play pause toggle
            // e.target.innerHTML = "Play";
            this.isPlaying === false;
            global.feedbackElement.innerHTML = global.feedback[0]

            window.clearInterval(global.intervalId);
        }

        this.isPlaying = !this.isPlaying;
    },

    updateRows() {
        var currentColumn = sequencer.getColumn();
        
        for (var i = 0; i < instruments.labels.length; i++) {
            instruments.labels[i].classList.remove('active');
        }
        for (var i = 0; i < currentColumn.length; i++) {
            currentColumn[i].classList.add('active');
            // for every checkbox that is checked play the corresponding Audio
            if (currentColumn[i].children[0].checked) {
                instruments.all[i].audio.play();
            }
        }
    },

    init() {
        // play pause toggle
        createEvent('#play-pause', "click", this.startStop);
        instruments.init();
        bpm.init();
        controls.init(this);
    },
}

module.exports = sequencer;