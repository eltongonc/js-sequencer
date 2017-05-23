# Drum kit
Drum kit is an interactive sound board. This project was build to illustrate the capabilities of a web browser.

## What does it do
It allows users to make beats made out of 8 type of instruments. The app allows users to interact and gives feedback based on a set of feature.

## Dependencies
- A basic server: [Nodejs](https://nodejs.org/en/)
- A Nodejs framework: [Express](https://expressjs.com/)
- Handlebars as serverside templating engine (Not needed and will be removed).
- Gulp to bundle and compile SCSS.
- Vanilla JS.
- CSS.

## How to install
In order to run the application you'll need to have a version of Node and NPM installed on your computer.

First clone this repo with:
```txt
$ git clone https://github.com/eltongonc/drum_kit.git
```
Install the dependencies:
```txt
$ npm install
```
Start a local development server.
```txt
$ npm start
```
Start a live development server.
```txt
$ npm run live
```
In order to use the live development server, a local development must be running.

- Visit the app in the browser locally on `localhost:5000`.
- Visit the app in the browser on other devices with a random generated link with the live development server on `http://<RANDOM_CODE>.ngrok.io` or `https://<RANDOM_CODE>.ngrok.io`.

## Feature detection

### HTML Audio tag.
"*Method of playing sound on webpages (without requiring a plug-in)*" - [Can I Use.com](http://caniuse.com/#search=audio).

While being supported on most browser there are still browsers do not support the Audio tag. Internet Explorer 8 e.g.

#### Detection
I tried to give Internet Explorer 8 and lower users a similar experience. This was a hard challenge because the audio tag would have to converted in to a flashplayer. A fallback solution would be something like this:

```html
<audio controls>
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.mp3" type="audio/mp3">
    <object data="mediaplayer.swf?audio=audio.mp3">
        <param name="movie" value="mediaplayer.swf?audio=audio.mp3">
        <p>Your browser does not support native audio or Flash, but you can <a href="audio.mp3">download this MP3</a> to listen on your device.</p>
    </object>
</audio>
```
by doing this I noticed that there where still cases where it did not work. So I ended up with this with a Javascript check:

```js
    if ("Audio" in window) {
        console.log("Audio supported");
    }else {
        document.body.innerHTML =
        '<section id="pop-up"><h1>Your browser doesn\'t support HTML Audio</h2><div class="container"><h3 class="title">Here is an inspirational video of what can be done with HTML audio elements</h3><video class="content" width="560" height="315" controls="controls"><source src="/video/video.mp4" type="video/mp4" /><p>The source didn\'t load. You should try viewing this page on another web browser. I recommend <a href="https://www.google.nl/chrome/browser/desktop/">Google Chrome</a></p></video></div></section>'
    }
```
#### Solution
As a solution I chose to give the user an embeded Youtube video of sequencer which inspired me to make this project. If this embeded video is not supported, the user will receive a link to a recommended browser to help the web-development community.

### Mobile detection.
In order to make this better for smaller screens a check was written.

#### Detection
I tried to give mobile users a similar experience by removing options that are not used in mobile devices:
```js
function detectMobile() {
    // on onoe of the mobile os browsers
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 // or screens smaller than a breakpoint
 || window.innerWidth < 600){ return true;}
 else { return false;}
}
```
this check returns either true or false, and lets me do mobile specific functions:
```js
if(detectMobile()){
    // hide desktop specific features
}
```
#### Solution
I chose to do this check with Javascript instead of CSS, because it gives me much more flexibility. And it also opens doors to new features in the future.

### Landscape/Portrait mode detection.
Because of the layout of the app, holding it in portrait mode would make harder to use it, so a check is made to detect wether the mobile devices is being held in Landscape mode.

#### Detection
I tried to give mobile users a similar experience by removing options that are not used in mobile devices:
```js
if(window.innerHeight > window.innerWidth){
    // give user feedforward
}
```
After the user does what you've asked him to, reward him:
```js
window.addEventListener('resize',function(){
    // notice the switch
    if (window.innerWidth > window.innerHeight) {
        // user gets feedback
    }
})
```
#### Solution
Same as the mobile detection, this also helps in Progressive enhancement of this app. Leaving room for expansions in the future versions. This might not be the ultimate solution, but it gets the job well done.




## Improving the app
A lot love and though have been put to this app, but there are still a lott that can be added or be done better. Here is an overview of features, wishes and know bugs.

### Features - desktop
- Input via keyboard keys
    - Row 1: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> <kbd>5</kbd> <kbd>6</kbd> <kbd>7</kbd> <kbd>8</kbd>
    - Row 2: <kbd>q</kbd> <kbd>w</kbd> <kbd>e</kbd> <kbd>r</kbd> <kbd>t</kbd> <kbd>y</kbd> <kbd>u</kbd> <kbd>i</kbd>  
    - Row 3: <kbd>a</kbd> <kbd>s</kbd> <kbd>d</kbd> <kbd>f</kbd> <kbd>g</kbd> <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd>
    - Row 4: <kbd>z</kbd> <kbd>x</kbd> <kbd>c</kbd> <kbd>v</kbd> <kbd>b</kbd> <kbd>n</kbd> <kbd>m</kbd> <kbd>,</kbd>
    - Row 5: <kbd>SHIFT</kbd> + <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> <kbd>5</kbd> <kbd>6</kbd> <kbd>7</kbd> <kbd>8</kbd>
    - Row 6: <kbd>SHIFT</kbd> + <kbd>q</kbd> <kbd>w</kbd> <kbd>e</kbd> <kbd>r</kbd> <kbd>t</kbd> <kbd>y</kbd> <kbd>u</kbd> <kbd>i</kbd>
    - Row 7: <kbd>SHIFT</kbd> + <kbd>a</kbd> <kbd>s</kbd> <kbd>d</kbd> <kbd>f</kbd> <kbd>g</kbd> <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd>
- Metronome and sequencer
- Mouse click toggles instrument on/off
- On click mode the user can play freely
- Users can change the bpm speed


### Wishlist
- [ ] Upload own audio files to play
- [ ] Mobile touch friendlier

### Known bugs
- Some audio files are to large - may not load fast enough

## How to contribute
You can help improve this project by sharing your expertise and tips, as well as learn from others. Contributions of all kinds are welcome: reporting issues, updating documentation, fixing bugs, building examples, sharing projects, and any other tips that may me improve my code.


## Example
Here is a link to the [Drum kit](https://eltongonc.github.io/drum_kit/)

### Author
Elton Gonçalves Gomes - checkout more of my work on [github](https://github.com/eltongonc)

## Week log
Week 1 Progressive enhancement
- [Break the web](https://github.com/eltongonc/browser-technology/Funda)

Week 2 Feature detection
- **HTML**[HTML5 Detail tag](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/detail-tag)
- **HTML**[Web P](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/webp)
- **CSS**[Scroll snap properties](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/scroll-snap)
- **CSS**[Sticky positioning](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/sticky-position)
- **JS**[JS Drag and drop](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/drag-and-drop)
- **JS**[Font loading](https://github.com/eltongonc/browser-technology/tree/master/feature_detection/font-loading)

***
### Sources
- [Featurelist](http://html5please.com/)
- [IE scripts only](http://stackoverflow.com/questions/29987969/how-to-load-a-script-only-in-ie)
- [AddEventListener prefix](http://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer)
