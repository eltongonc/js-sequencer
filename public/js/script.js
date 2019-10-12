require('./featureDetection');

const { createEvent, global } = require('./helpers');
const bpm = require('./bpm');
const instruments = require('./instruments');
const instructions = require('./instructions');

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
            this.isPlaying === true;

            global.feedbackElement.innerHTML = global.feedback[1];
            global.feedbackElement.classList.add('playing');

            global.intervalId = window.setInterval(this.updateRows, bpm.currentTempo());
        } else {
            // play pause toggle
            this.isPlaying === false;

            global.feedbackElement.innerHTML = global.feedback[0]
            global.feedbackElement.classList.remove('playing');

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

    controls() {
        // play button
        createEvent('#play-pause', "click", this.startStop.bind(this));
        
        // key input
        window.addEventListener("keydown", (event) => {
            event.preventDefault()
            const id = "key-"+event.key;

            if (event.code !== "Space" && document.getElementById(id)) {
                const element = document.getElementById(id);
                const parent = element.parentNode;
                const grandParent = parent.parentNode;

                element.checked = !element.checked;

                element.checked?
                    parent.classList.add('selected') :
                    parent.classList.remove('selected')

                instruments.all.filter(function(instr){
                    if (instr.id === grandParent.id) {
                        var newAudio = new Audio(instr.src);
                        newAudio.play();
                    }
                })
            }
            
            if (event.code == "Space" || event.code == "Enter") {
                sequencer.startStop()
            }
        });
    },

    init() {
        instructions.init();
        instruments.init();
        bpm.init(this);
        this.controls();
    },
}


createEvent(window, 'load', () => {
    sequencer.init();
})