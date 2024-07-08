let canvas;
let keyboard;
let world;

function init() {

    console.log('Initializing game...');
    canvas = document.getElementById("canvas");
    // canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
    keyboard = new Keyboard();
    // console.log('Keyboard initialized:', keyboard);

    initLevel1(); // Ensure level1 is initialized
    // console.log('Level:', level1); // Ensure level1 is defined and initialized

    world = new World(canvas, keyboard);
    // console.log('World initialized:', world);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function closeFullscreen() {
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari compatibility
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox compatibility
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { // IE/Edge compatibility
            document.msExitFullscreen();
        }
    }
}


// function startGame() {
//     initLevel();
//     //responsive hide or show
// }

// optionsScreen();
// playAudio();
// mobileControls();

// setTimeout(function () {
//     ctx.drawImage(character, 20, 20, 50, 150);
// }, 2000);

// }



