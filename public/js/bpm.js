const { createEvent, global } = require('./helpers');

const bpm = {
    index: 0,
    value: 150,

    update(input) { return this.value = input },

    currentTempo() { return 60000 / this.value },

    newTempo(){
        clearInterval(global.intervalId);
        global.intervalId = setInterval(this.sequencer.updateRows,this.currentTempo());
    },

    updateTempo(e){
        const inputEl = e.target.parentNode.children['tempo'];
        
        // slower
        if (e.target.id === "minus" && inputEl.value > inputEl.min ) {
           inputEl.value = this.update(Number(inputEl.value)-10);
        }
        // faster
        else if (e.target.id === "plus" && inputEl.value < inputEl.max ) {
           inputEl.value = this.update(Number(inputEl.value)+10);
        }

        // manual input
        if (e.target.id === "tempo") {this.update(e.target.value);}

        if(this.sequencer.isPlaying === true) {
            this.newTempo();
        }
    },

	init(sequencer) {
        this.sequencer = sequencer;
        this.updateTempo = this.updateTempo.bind(this);
        
		// increase tempo
		createEvent('#plus', "click", this.updateTempo)
		// decrease tempo
		createEvent('#minus', "click", this.updateTempo)
        // // manual input
        createEvent('#tempo', "change", this.updateTempo)
	}
}

module.exports = bpm;