let canvas;
let keyboard;
let world;
let sounds = new Sounds();
let audioMute = true;
let bgMusic;
let gameIsOn = false;

function startPage() {
    canvas = document.getElementById("canvas");
    canvas.style.backgroundImage = 'url("/img/9_intro_outro_screens/start/startscreen_1.png")';
    canvas.style.backgroundRepeat = 'no-repeat';
    canvas.style.backgroundPosition = 'center';
    adaptCanvasBackground();
    canvas.onclick = startGame;
    bgMusic = document.getElementById('bgMusic');
    if (!audioMute) {
        bgMusic.play();
    }
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
    showTurnInfo();
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
    if (window.innerWidth <= 700 && window.innerHeight > window.innerWidth) {
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
        // canvas.backgroundSize = 720, 480;
        canvas.width = 720;
        canvas.height = 480;
    }
    adaptCanvasBackground();
}

function adaptCanvasBackground() {
    canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
}



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


function fullscreen() {
    let fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenElement) {
        closeFullscreen();
    } else {
        let fullscreen = document.getElementById('fullScreenDiv');
        enterFullscreen(fullscreen);
    }
}

function enterFullscreen(element) {
    document.getElementById('canvas').style.width = '-webkit-fill-available';
    document.getElementById('canvas').style.height = '-webkit-fill-available';
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    }
}

function removeWinOverlay() {
    document.getElementById('winOverlay').classList.remove('flex');
    document.getElementById('winOverlay').classList.add('d-none');
}

function removeLostOverlay() {
    if (removeLostOverlay) {
        document.getElementById('lostOverlay').classList.remove('flex');
        document.getElementById('lostOverlay').classList.add('d-none');

        // sounds.playSound(sounds.oh_no_sound);
    }
}

function restartPage() {
    location.reload();
    removeWinOverlay();
    removeLostOverlay();
}

function startGame() {
    let bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();
    sounds.playSound(sounds.come_on_sound);
    init();
    hideStartInfo(); removeWinOverlay();
    removeLostOverlay();
}

function hideStartInfo() {
    document.getElementById('startScreenTop').classList.remove('flex');
    document.getElementById('startScreenTop').classList.add('d-none');

    document.getElementById('bottom-info').classList.remove('flex');
    document.getElementById('bottom-info').classList.add('d-none');
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

