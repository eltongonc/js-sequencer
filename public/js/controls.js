const instruments = require('./instruments');
const { createEvent } = require('./helpers');

const controls = {
    init(sequencer) {
        createEvent('#play-pause', "click", sequencer.startStop);
        
        window.addEventListener("keydown", (event) => {
            event.preventDefault()
            var id = "key-"+event.key;

            if (event.code !== "Space" && document.getElementById(id)) {
                var element = document.getElementById(id);
                var parent = element.parentNode;
                var grandParent = parent.parentNode;
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
        window.addEventListener("keyup", (event) => {
            var id = "key-"+event.key;
            if (event.code !== "Space" && document.getElementById(id)) {
                var src = document.getElementById(id);
            }
        });
    }
};

module.exports = controls;