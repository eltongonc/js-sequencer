const { createEvent } = require('./helpers');

const instructions = {
	isOpen: false,
	container: document.querySelector('aside'),
	sequencer: document.getElementById('sequencer'),
	toggleBtn: document.getElementById('i-toggle'),

	toggle() {
		this.isOpen = !this.isOpen;
		
		if (this.isOpen) {
			this.container.classList.add('open');
			this.sequencer.classList.add('aside-open');
		} else {
			this.sequencer.classList.remove('aside-open');
			this.container.classList.remove('open');
		}
	},

	init() {
		createEvent('#i-toggle', 'click', this.toggle.bind(this));
	}
}

module.exports = instructions;