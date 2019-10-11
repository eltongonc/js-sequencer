const { createEvent } = require('./helpers');

const instructions = {
	isOpen: false,
	container: document.querySelector('aside'),
	toggleBtn: document.getElementById('i-toggle'),

	toggle() {
		this.isOpen = !this.isOpen;
		console.log(this);
		
		this.container.className = this.isOpen ? 'open' : '';
	},

	init() {
		this.toggle = this.toggle.bind(this);
		
		createEvent('#i-toggle', 'click', this.toggle);
	}
}

module.exports = instructions;