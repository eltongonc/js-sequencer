(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./helpers":3}],2:[function(require,module,exports){
(function (global){
const { detectMobile, createEvent } = require('./helpers');

/*******************
** Feature detection
********************/
// check if the browser supports audio
if ("Audio" in window) {
    console.log("Audio supported test");
}else {
    document.body.innerHTML =
    '<section id="pop-up"><h1>Your browser doesn\'t support HTML Audio</h2><div class="container"><h3 class="title">Here is an inspirational video of what can be done with HTML audio elements</h3><video class="content" width="560" height="315" controls="controls"><source src="/video/video.mp4" type="video/mp4" /><p>The source didn\'t load. You should try viewing this page on another web browser. I recommend <a href="https://www.google.nl/chrome/browser/desktop/">Google Chrome</a></p></video></div></section>'
}

// mobile check
//src: https://stackoverflow.com/questions/6666907/how-to-detect-a-mobile-device-with-javascript
global.isMobile = detectMobile();


// check if orientation is landscape
if(window.innerHeight > window.innerWidth){
    var popup = document.createElement('section');
    popup.id="pop-up";

    var button = document.createElement('button');
    button.innerHTML = "x";
    button.className="button";

    var container = document.createElement('div');
    container.className="container";

    var phone = document.createElement('img');
    phone.className = "content"
    phone.src='/img/phone.svg';
    
    var text = document.createElement('h3');
    // text.innerHTML = '<h3 class="title">This app works better on landscape mode</h3>';
    text.innerHTML = '<h3 class="title">This app hasn\'t been fully optimized for mobile yet!</h3>';

    container.appendChild(button)
    container.appendChild(text)
    container.appendChild(phone);

    popup.appendChild(container);

    document.body.appendChild(popup);

    createEvent(button, 'click', function(e){
        console.log(e.target);
        
        e.target.parentNode.parentNode.remove()
    })
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helpers":3}],3:[function(require,module,exports){
var global = {
    intervalId: null, // placeholder for the interval
    feedback: ["Play", "Pause"],
    feedbackElement: document.getElementById('play-pause'),
    isMobile: false
}

function detectMobile() {
	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	|| window.innerWidth < 600){
        return true;
    } else { 
        return false;
    }
}

function createEvent(selector, eventType, callback){
    const element = typeof selector === "string" ? 
        document.querySelector(selector) : 
        selector;

    element.addEventListener(eventType, callback);

    return element;
}

module.exports = {
	detectMobile,
	createEvent,
	global
}
},{}],4:[function(require,module,exports){
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
},{"./helpers":3}],5:[function(require,module,exports){
const { createEvent, global } = require('./helpers');

var instruments = {
    labels: document.querySelectorAll('label'),
    rows: document.getElementsByClassName('row'),
    // list of all the instruments and their names. !!ATTENTION: name = html id
    all: [
        { id: "crash", src:"./sounds/Perc/Crash Future.mp3", icon:"../img/cymbals.svg", audio: new Audio("../sounds/Perc/Crash Future.mp3") },
        { id: "hiHat", src:"./sounds/Hat/Hats14.mp3", icon:"../img/drum-1.svg", audio: new Audio("../sounds/Hat/Hats14.mp3") },
        { id: "snare", src:"./sounds/Snare/Snare04.mp3", icon:"../img/drum-2.svg", audio: new Audio("../sounds/Snare/Snare04.mp3") },
        { id: "rightTom", src:"./sounds/Claps/Claps09.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Claps/Claps09.mp3") },
        { id: "leftTom", src:"./sounds/Claps/Claps09.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Claps/Claps09.mp3") },
        { id: "floorTom", src:"./sounds/Perc/Triangle.mp3", icon:"../img/triangle.svg", audio: new Audio("../sounds/Perc/Triangle.mp3") },
        { id: "kick", src:"./sounds/Kick/Kick14.mp3", icon:"../img/drums.svg", audio: new Audio("../sounds/Kick/Kick14.mp3") }
    ],

    // whenever you click on a label make it selected;
    selected() {
        window.addEventListener('click', function(e){
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
        if(global.isMobile === true){
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
},{"./helpers":3}],6:[function(require,module,exports){
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
},{"./bpm":1,"./featureDetection":2,"./helpers":3,"./instructions":4,"./instruments":5}]},{},[6]);
