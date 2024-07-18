let canvas;
let keyboard;
let world;
let sounds = new Sounds();
let audioMute = true;
let bgMusic;
let gameIsOn = false;
let fullscreenOn = false;

function startPage() {
    startPageCanvas();
    bgMusic = document.getElementById('bgMusic');
    if (!audioMute) { bgMusic.play(); }
}

function startPageCanvas() {
    canvas = document.getElementById("canvas");
    canvas.classList.add("start-page-background");
    canvas.onclick = startGame;
}

function init() {
    console.log('Initializing game...');
    keyboard = new Keyboard();
    initLevel1();
    world = new World(canvas, sounds, keyboard);
    document.getElementById('startScreenAndCanvas').classList.remove('d-none');
    checkScreenSize();
    bgMusic.pause();
    gameIsOn = true;
    if (gameIsOn) { canvas.onclick = null };
}

function checkScreenSize() {
    window.addEventListener('resize', adaptToMobile);
    window.addEventListener('orientationchange', adaptToMobile);
}

function adaptToMobile() {
    checkMobileBtns();
    adaptInnerWidth();
}

function checkMobileBtns() {
    if (window.innerHeight <= 620 && window.matchMedia("(orientation: landscape)").matches) {
        showMobileBtns();
    } else {
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
        // canvas.backgroundSize = 720, 480;
        canvas.width = 720;
        canvas.height = 480;
    }
    // adaptCanvasBackground();
}

// function adaptCanvasBackground() {
//     canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
// }



function toggleAudio() {
    let audioIcon = document.getElementById('audioIcon');
    if (!audioMute) {
        audioIcon.setAttribute('src', './icons/audio_off.svg');
        bgMusic.pause();
    } else {
        audioIcon.setAttribute('src', './icons/audio_on.svg');
        if (gameIsOn) { bgMusic.pause(); } else { bgMusic.play(); }
    }
    audioMute = !audioMute;
}

function checkToggleFullScreen() {
    if (gameIsOn) {
        toggleFullScreen(document.getElementById('newFullScreen'));
    } else {
        toggleFullScreen(document.documentElement);
    }
}

function toggleFullScreen(element) {
    if (!fullscreenOn) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
            document.body.classList.add('fullscreen-mode');
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    fullscreenOn = !fullscreenOn;
}


function removeWinOverlay() {
    document.getElementById('winOverlay').classList.remove('flex');
    document.getElementById('winOverlay').classList.add('d-none');
}

function removeLostOverlay() {
    if (removeLostOverlay) {
        document.getElementById('lostOverlay').classList.remove('flex');
        document.getElementById('lostOverlay').classList.add('d-none');
    }
}

function restartPage() {
    location.reload();
    removeWinOverlay();
    removeLostOverlay();
}

function startGame() {
    canvas.classList.remove("start-page-background");
    startGameSounds();
    init();
    hideStartInfo(); removeWinOverlay();
    removeLostOverlay();
}

function startGameSounds() {
    let bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();
    sounds.playSound(sounds.come_on_sound);
}

function hideStartInfo() {
    document.getElementById('startScreenTop').classList.remove('flex');
    document.getElementById('startScreenTop').classList.add('d-none');

    // document.getElementById('bottom-info').classList.remove('flex');
    // document.getElementById('bottom-info').classList.add('d-none');
}



// function clearAllIntervals() {

//     for (let i = 1; i < 9999; i++) {
//         window.clearInterval(i);
//     }
// }
// function stopGame() {
//     for (let i = 1; i < 9999; i++) window.clearInterval(i);
// }

