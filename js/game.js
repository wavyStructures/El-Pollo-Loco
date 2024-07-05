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



// function bindBtnsPressEvents() {

//     document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = true;
//     });

//     document.getElementById('btnLeft').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = false;
//     });
// }


window.addEventListener('keydown', (e) => {
    // console.log(e);
    switch (e.keyCode) {
        case 37:
            keyboard.LEFT = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
        case 87:
            keyboard.W = true;
            break;
        case 88:
            keyboard.X = true;
            break;
        case 89:
            keyboard.Y = true;
            break;
        case 27:
            keyboard.ESC = true;
            break;
    }
    // console.log('Key down:', e.key, keyboard);
});

window.addEventListener('keyup', (e) => {
    // console.log(e);
    switch (e.keyCode) {
        case 37:
            keyboard.LEFT = false;
            break;
        case 39:
            keyboard.RIGHT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
        case 87:
            keyboard.W = false;
            break;
        case 88:
            keyboard.X = false;
            break;
        case 89:
            keyboard.Y = false;
            break;
        case 27:
            keyboard.ESC = false;
            break;
    }
    // console.log('Key down:', e.key, keyboard);
});

