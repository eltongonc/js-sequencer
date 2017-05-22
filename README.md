# Soundboard

Soundboard is a website for playing instruments. It allows users to make beats with 8 different type of instruments. The use case used to produce this project was `I want to be able to create beats online`.

## How to install
First clone this repo with:
```txt
$ git clone https://github.com/eltongonc/browser-technology.git
```

then start a localhost server. I use PHP
```txt
$ npm start && npm run live
```
this should give you live ngrok server for testing purpose

## Fallback process
1. JS enhancement. JavaScript allows users to use the keyboard and mouse to interact. And adds classes to the html file
```js
window.addEventListener("keydown", function(event){
    var id = event.key.toUpperCase();
    if (event.code !== "Space" && document.getElementById(id)) {
        var src = document.getElementById(id);
        var newAudio = new Audio( src.children[1].src);
        newAudio.play();
        src.parentNode.classList.add("active");
    }
});
window.addEventListener("keyup", function(event){
    var id = event.key.toUpperCase();
    if (event.code !== "Space" && document.getElementById(id)) {
        var src = document.getElementById(id);
        src.parentNode.classList.remove("active");
    }
});
```
2. Audio feature. This is the ideal fallback. The user can play the audio file
```html
<audio preload="auto" id="Q"  controls>
    <!-- If the browser supports .wav -->
    <source src="/sounds/Claps/Claps09.wav" type="audio/wav">
    <!-- If the browser supports .mp3 -->
    <source src="/sounds/Claps/Claps09.mp3" type="audio/mp3">
</audio>
```
3. IE enhancement. This is a internet explorer only feature and will show an player. Clicking on the play button allows the user to listen in the browser
```html
<embed controls="true" autostart="false" src="/sounds/Claps/Claps09.wav" />
```
4. No support. The user can download and listen to the file offline if the browser doesn't support audio.
```html
<a href="/sounds/Claps/Claps09.wav">Download</a>
```



## Improving the app
Because this was a week project there is still a lot that can to be done. Below is a list of features already in the app and a wishlist of features.

### Features
- Input via keyboard keys (q,w,e,a,s,d,z,x and c)
- Input via mouse clicks
- Switch from recording mode and click mode.
- On recording mode the website plays whatever instrument you have checked.
- On click mode the user can play freely



### Wishlist
- [ ] Upload own files to play
- [ ] Mobile touch friendlier


## How to contribute
You can help improve this project by sharing your expertise and tips, as well as learn from others. Contributions of all kinds are welcome: reporting issues, updating documentation, fixing bugs, building examples, sharing projects, and any other tips that may me improve my code.


## Example
Here is a link to the [Soundbox](https://eltongonc.github.io/browser-technology/)

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
