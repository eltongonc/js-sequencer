let { createEvent, updateTempo } = require('./helpers');

var bpm = {
    // Keeps track of the current column.
    index: 0,
    value: 150,
    update(input) { return this.value = input }, // beat per minute
    currentTempo() { return 60000 / this.value },
    newTempo(){
        clearInterval(global.intervalId);
        global.intervalId = setInterval(metronome.updateRows,this.currentTempo());
	},
	init() {
		updateTempo = updateTempo.bind(this);
		// increase tempo
		createEvent('#plus', "click", updateTempo)
		// decrease tempo
		createEvent('#minus', "click", updateTempo)
        // // manual input
        createEvent('#tempo', "change", updateTempo)
	}
}

module.exports = bpm;