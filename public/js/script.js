// force remove stuff for test purpose
// delete window.Audio
// delete Window.addEventListener
// delete Document.addEventListener
// delete Element.addEventListener
/*******************
** General
********************/
var intervalId; // placeholder for the interval

var feedback = {
    text: ["Not playing", "Playing"],
    element: document.querySelector('.feedback p')
}

/*******************
** Feature detection
********************/
// check if the browser supports audio
if ("Audio" in window) {
    console.log("Audio supported");
}else {
    document.body.innerHTML = '<h1 class="feedback">Your browser doesn\'t support html audio</h1><p>This is what your missing(...sorta)<p><iframe width="560" height="315" src="https://www.youtube.com/embed/mIvc6uBDGzU" frameborder="0" allowfullscreen></iframe>'
}

// add addEventListener to Window if it doesn't exists
// bad practise according to this post: http://perfectionkills.com/whats-wrong-with-extending-the-dom/
if (!("addEventListener" in window)) {
    var f = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, fn, capture) {
        this.f = f;
        this.f(type, fn, capture);
        alert('Added Event Listener: on' + type);
    }
}
/**************
** Instruments
***************/
var instruments = {
    labels: document.querySelectorAll('label'),
    rows: document.getElementsByClassName('row'),
    all: // list of all the instruments and their names. !!ATTENTION: name = html id
    [
        {id: "crash", src:"/sounds/Perc/Crash Future.wav", icon:"/img/cymbals.svg"},
        {id: "hiHat", src:"/sounds/Hat/Hats14.wav", icon:"/img/drum-1.svg"},
        {id: "snare", src:"/sounds/Snare/Snare04.wav", icon:"/img/drum-2.svg"},
        {id: "rightTom", src:"/sounds/Claps/Claps09.wav", icon:"/img/triangle.svg"},
        {id: "leftTom", src:"/sounds/Claps/Claps09.wav", icon:"/img/triangle.svg"},
        {id: "floorTom", src:"/sounds/Claps/Claps09.wav", icon:"/img/triangle.svg"},
        {id: "kick", src:"/sounds/Kick/Kick14.wav", icon:"/img/drums.svg"}
    ],
    init: function(){
        this.appendIcon();
        // init app
        metronome.init();
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
    currentTempo: function(){return 60000 / bpm.value;}
}

function newTempo(){
    clearInterval(intervalId);
    intervalId = setInterval(metronome.updateRows,bpm.currentTempo());
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
        newTempo();
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
    startStop: function(){
        if (metronome.isPlaying === false) {
            feedback.element.innerHTML = feedback.text[1]
            intervalId = setInterval(metronome.updateRows,bpm.currentTempo());
        }else {
            feedback.element.innerHTML = feedback.text[0]
            clearInterval(intervalId);
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
                new Audio(instruments.all[i].src).play();
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
                playPause()
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
    var element = document.querySelector(selector);
    element.addEventListener(eventType,eventFunction);
    return element;
}

//build instrument
instruments.init();
