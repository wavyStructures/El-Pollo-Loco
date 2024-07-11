let canvas;
let keyboard;
let world;
let sounds = new Sounds();
let audioMute = true;

function startPage() {
    canvas = document.getElementById("canvas");
    canvas.style.backgroundImage = 'url("/img/9_intro_outro_screens/start/startscreen_1.png")';

}

function init() {

    console.log('Initializing game...');
    keyboard = new Keyboard();
    // console.log('Keyboard initialized:', keyboard);

    initLevel1(); // Ensure level1 is initialized
    // console.log('Level:', level1); // Ensure level1 is defined and initialized

    world = new World(canvas, sounds, keyboard);
    // console.log('World initialized:', world);
    checkScreenSize();
}

function checkScreenSize() {
    window.addEventListener('resize', adaptToMobile);
    window.addEventListener('orientationchange', adaptToMobile);
}


function adaptToMobile() {
    checkMobileBtns();

    // showTurnInfo();
    adaptInnerWidth();
}

function checkMobileBtns() {
    if (window.innerWidth <= 768) {
        showMobileBtns();
    } else if (window.innerWidth > 768) {
        hideMobileBtns();
    }
}


function showMobileBtns() {
    document.getElementById('bottom-info').classList.remove('flex');
    document.getElementById('bottom-info-mobile').classList.remove('d-none');

    document.getElementById('bottom-info').classList.add('d-none');
    document.getElementById('bottom-info-mobile').classList.add('flex');
}

function hideMobileBtns() {
    document.getElementById('bottom-info').classList.remove('d-none');
    document.getElementById('bottom-info-mobile').classList.remove('flex');
    document.getElementById('bottom-info').classList.add('flex');
    document.getElementById('bottom-info-mobile').classList.add('d-none');
}




function showTurnInfo() {
    if (window.innerWidth <= 480 && window.innerHeight > window.innerWidth) {
        document.getElementById('turn-phone-overlay').classList.remove('d-none');
        document.getElementById('turn-phone-overlay').classList.add('flex');
    } else {
        document.getElementById('turn-phone-overlay').classList.remove('d-none');
        document.getElementById('turn-phone-overlay').classList.add('flex');
    }
}

/**
 * Adapts width and height of a canvas based on the window's inner width. If the window's inner width is less than 500, 
 * sets the canvas width to window's inner width and canvas height to window's inner height. 
 * Otherwise,  sets the backgroundSize property of  canvas to 720, 480.
 *
 */
function adaptInnerWidth() {
    if (window.innerWidth < 500) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.backgroundSize = 720, 480;
    }
}

function toggleAudio() {
    let audioIcon = document.getElementById('audioIcon');
    if (!audioMute) {
        audioIcon.setAttribute('src', './icons/audio_off.svg');
    } else {
        audioIcon.setAttribute('src', './icons/audio_on.svg');
    }
    audioMute = !audioMute;
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}




// function closeFullscreen() {
//     if (document.fullscreenElement) {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) { // Safari compatibility
//             document.webkitExitFullscreen();
//         } else if (document.mozCancelFullScreen) { // Firefox compatibility
//             document.mozCancelFullScreen();
//         } else if (document.msExitFullscreen) { // IE/Edge compatibility
//             document.msExitFullscreen();
//         }
//     }
// }


function startGame() {
    sounds.playSound(sounds.come_on_sound);
    init();
    hideStartInfo();
}

function hideStartInfo() {

    document.getElementById('startScreenTop').classList.remove('flex');
    document.getElementById('startScreenTop').classList.add('d-none');

    document.getElementById('bottom-info').classList.remove('flex');
    document.getElementById('bottom-info').classList.add('d-none');
}




function showWinOverlay() {
    document.getElementById('winOverlay').classList.remove('d-none');
    document.getElementById('winOverlay').classList.add('flex');
}






//     const restartButton = document.getElementById('playAgainButton');
//     restartButton.classList.remove('d-none');
//     restartButton.classList.add('flex');
//     if (world) { world.removeEnemiesAndBars();
//or   clearAllIntervals
//     }
// }


