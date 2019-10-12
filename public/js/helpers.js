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