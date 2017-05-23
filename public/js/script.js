// force remove stuff for test purpose
// delete window.Audio
/*******************
** General
********************/

var global = {
    intervalId: null, // placeholder for the interval
    feedback: ["Not playing", "Playing"],
    feedbackElement: document.querySelector('.feedback h3'),
    isMobile: false
}
/*******************
** Feature detection
********************/
// check if the browser supports audio
if ("Audio" in window) {
    console.log("Audio supported");
}else {
    document.body.innerHTML =
    '<section id="pop-up"><h1>Your browser doesn\'t support HTML Audio</h2><div class="container"><h3 class="title">Here is an inspirational video of what can be done with HTML audio elements</h3><video class="content" width="560" height="315" controls="controls"><source src="/video/video.mp4" type="video/mp4" /><p>The source didn\'t load. You should try viewing this page on another web browser. I recommend <a href="https://www.google.nl/chrome/browser/desktop/">Google Chrome</a></p></video></div></section>'
}

// mobile check
//src: https://stackoverflow.com/questions/6666907/how-to-detect-a-mobile-device-with-javascript
global.isMobile = detectmob();
function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 || window.innerWidth < 600){ return true;}
 else { return false;}
}


// check if orientation is landscape
if(window.innerHeight > window.innerWidth){
    var popup = document.createElement('section');
    popup.id="pop-up";
    var button = document.createElement('button');
    button.innerHTML = "Close";
    button.className="button";
    var container = document.createElement('div');
    container.className="container";
    var phone = document.createElement('img');
    phone.className = "content"
    var text = document.createElement('h3');
    text.innerHTML = '<h3 class="title">This app works better on landscape mode</h3>';
    phone.src='/img/phone.svg';

    container.appendChild(button)
    container.appendChild(text)
    container.appendChild(phone);

    popup.appendChild(container)
    document.body.appendChild(popup);
    createEvent(button, 'click', function(e){
        e.target.parentNode.parentNode.remove()
    })
}

/**************
** Instruments
***************/
var instruments = {
    labels: document.querySelectorAll('label'),
    rows: document.getElementsByClassName('row'),
    all: // list of all the instruments and their names. !!ATTENTION: name = html id
    [
        {id: "crash", src:"./sounds/Perc/Crash Future.mp3", icon:"/img/cymbals.svg", audio: new Audio("./sounds/Perc/Crash Future.mp3")},
        {id: "hiHat", src:"./sounds/Hat/Hats14.mp3", icon:"/img/drum-1.svg", audio: new Audio("./sounds/Hat/Hats14.mp3")},
        {id: "snare", src:"./sounds/Snare/Snare04.mp3", icon:"/img/drum-2.svg", audio: new Audio("./sounds/Snare/Snare04.mp3")},
        {id: "rightTom", src:"./sounds/Claps/Claps09.mp3", icon:"/img/triangle.svg", audio: new Audio("./sounds/Claps/Claps09.mp3")},
        {id: "leftTom", src:"./sounds/Claps/Claps09.mp3", icon:"/img/triangle.svg", audio: new Audio("./sounds/Claps/Claps09.mp3")},
        {id: "floorTom", src:"./sounds/Perc/Triangle.mp3", icon:"/img/triangle.svg", audio: new Audio("./sounds/Perc/Triangle.mp3")},
        {id: "kick", src:"./sounds/Kick/Kick14.mp3", icon:"/img/drums.svg", audio: new Audio("./sounds/Kick/Kick14.mp3")}
    ],
    init: function(){
        this.appendIcon();
        // init app
        metronome.init();
        alert(global.isMobile)
        // remove four labels to fix on screen
        if(global.isMobile === true){
            // minify instructions
            var instructions = global.feedbackElement.parentNode.parentNode;
            instructions.className = 'mobile small';
            var menuButton = document.createElement('button');
            menuButton.innerHTML="menu";menuButton.id="menu-toggle"
            createEvent(menuButton, 'click', function(){
                instructions.classList.toggle('small');
            })
            instructions.insertAdjacentElement('afterbegin',menuButton);
            for (var i = 0; i < instruments.rows.length; i++) {
                for (var j = 1; j < 5; j++) {
                    instruments.rows[i].children[j].remove()
                }
            }
        }
    },
    selected: (function(){
        // whenever you click on a label make it selected;
        window.addEventListener('click', function(e){
            if (e.target.localName === "label" ) {
                e.target.classList.toggle('selected');
            }
        })
    }()),
    appendIcon: function(){
        // set the names of the instruments to the labels
        for (var i = 0; i < instruments.rows.length; i++) {
            instruments.rows[i].querySelector('.label').innerHTML = "<img width='50' src='"+instruments.all[i].icon+"'/><span>"+instruments.all[i].id+"</span>";
        }
    }
}
/*******************
** BPM and tempo
********************/
var bpm = {
    // Keeps track of the current column.
    index: 0,
    value: 150,
    plusBtn: (function(){
        // increase tempo
        createEvent('#plus', "click", updateTempo)
    }()),
    minusBtn:(function(){
        // decrease tempo
        createEvent('#minus', "click", updateTempo)
    }()),
    manual:(function(){
        // // manual input
        createEvent('#tempo', "change", updateTempo)
    }()),
    update:function(input){bpm.value = input; return bpm.value}, // beat per minute
    currentTempo: function(){return 60000 / bpm.value;},
    newTempo(){
        clearInterval(global.intervalId);
        global.intervalId = setInterval(metronome.updateRows,bpm.currentTempo());
    }
}


function updateTempo(e){
    var inputEl = e.target.parentNode.children['tempo'];
    // slower
    if (e.target.id === "minus" && inputEl.value > inputEl.min ) {
       inputEl.value = bpm.update(Number(inputEl.value)-10);
    }
    // faster
    else if (e.target.id === "plus" && inputEl.value < inputEl.max ) {
       inputEl.value = bpm.update(Number(inputEl.value)+10);
    }
    // manual input
    if (e.target.id === "tempo") {bpm.update(e.target.value);}
    if(metronome.isPlaying === true) {
        bpm.newTempo();
    }
}

/*******************
** metronome
********************/
var metronome = {
    isPlaying: false, //current state of the metronome
    init:function(){
        // play pause toggle
        createEvent('#play-pause', "click", metronome.startStop);
    },
    getColumn:function(){
        if ( bpm.index < (instruments.rows[0].children.length - 1) ) {
            ++bpm.index;
        }
        // set it to 1 because position 0 is the instrument label
        else { bpm.index = 1;}
        return document.querySelectorAll('label:nth-of-type('+bpm.index+')');
    },
    startStop: function(e){
        if (metronome.isPlaying === false) {
            // play pause toggle
            // e.target.innerHTML = "Pause";
            global.feedbackElement.innerHTML = global.feedback[1]
            global.intervalId = setInterval(metronome.updateRows,bpm.currentTempo());
        }else {
            // play pause toggle
            // e.target.innerHTML = "Play";
            global.feedbackElement.innerHTML = global.feedback[0]
            clearInterval(global.intervalId);
        }
        metronome.isPlaying = !metronome.isPlaying;
    },
    updateRows: function(){
        var currentColumn = metronome.getColumn();
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
    }
}

/*************************
** keyboard input
**************************/
var controls = {
    keyboard: (function(){
        window.addEventListener("keydown", function(event){
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
                metronome.startStop()
            }
        });
        window.addEventListener("keyup", function(event){
            var id = "key-"+event.key;
            if (event.code !== "Space" && document.getElementById(id)) {
                var src = document.getElementById(id);
            }
        });
    }())
};

/*********************
** helpers
**********************/
function createEvent(selector, eventType, eventFunction){
    var element = typeof selector === "string"?document.querySelector(selector): selector;
    element.addEventListener(eventType,eventFunction);
    return element;
}

//build instrument
instruments.init();
