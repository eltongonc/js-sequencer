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

function createEvent(selector, eventType, callback){
    var element = typeof selector === "string" ? document.querySelector(selector) : selector;
    element.addEventListener(eventType, callback);
    return element;
}

function updateTempo(e){
	var inputEl = e.target.parentNode.children['tempo'];
	
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
    if(window.isPlaying === true) {
        this.newTempo();
    }
}

var global = {
    intervalId: null, // placeholder for the interval
    feedback: ["Not playing", "Playing"],
    feedbackElement: document.querySelector('.feedback h3'),
    isMobile: false
}

module.exports = {
	detectmob,
	createEvent,
	updateTempo,
	global
}