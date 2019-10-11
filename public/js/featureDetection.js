const { detectmob } = require('./helpers');

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
global.isMobile = detectmob();


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