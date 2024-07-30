let canvas;
let keyboard;
let world;
let sounds = new Sounds();
let audioMute = true;
let bgMusic;
let gameIsOn = false;
let fullscreenOn = false;
let allIntervalsCleared = false;


/**
 * Initializes the start page by setting up the canvas and playing the background music if audio is not muted.
 */
function startPage() {
    startPageCanvas();
    hideMobileBtns();
    bgMusic = document.getElementById('bgMusic');
    if (!audioMute) { bgMusic.play(); }
}


document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll(".instructionsAndLegalNotice a");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });
});


/**
 * Initializes the start page canvas by adding a start-page-background class to the canvas element and
 * setting the onclick event handler to startGame.
 */
function startPageCanvas() {
    canvas = document.getElementById("canvas");
    canvas.classList.add("start-page-background");
    canvas.onclick = startGame;
}

/**
 * Initializes the game by creating a new Keyboard instance, initializing the first level, creating a new World instance,
 * removing the 'd-none' class from the 'startScreenAndCanvas' element, checking the screen size, pausing the background music,
 * setting the 'gameIsOn' variable to true, and setting the 'canvas.onclick' event handler to null if 'gameIsOn' is true.
 */
function init() {
    keyboard = new Keyboard();
    initLevel1();
    world = new World(canvas, sounds, keyboard);
    document.getElementById('startScreenAndCanvas').classList.remove('d-none');
    checkScreenSize();
    bgMusic.pause();
    gameIsOn = true;
    if (gameIsOn) { canvas.onclick = null };
}

/**
 * Initializes event listeners for window resize and orientation change to adapt to mobile devices.
 */
function checkScreenSize() {
    window.addEventListener('resize', adaptToMobile);
    window.addEventListener('orientationchange', adaptToMobile);
}

/**
 * Function to adapt content for mobile devices by checking mobile buttons and adjusting inner width.
 */
function adaptToMobile() {
    checkMobileBtns();
    adaptInnerWidth();
}

/**
 * Checks the window inner height and shows or hides mobile buttons accordingly.
 */
function checkMobileBtns() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isOtherMobilePortrait = window.innerWidth <= 915 && isPortrait;
    if (isOtherMobilePortrait) {
        showMobileBtns();
    }
    else if (gameIsOn) {
        document.body.classList.add('game-on');
    } else if (!gameIsOn) {
        document.body.classList.remove('game-on');
    }
    else {
        hideMobileBtns();
    }
}

/**
 * Shows the mobile buttons by removing the 'flex' class from the 'bottom-info' element and the 'd-none' class from the 'bottom-info-mobile' element.
 * Then, it adds the 'd-none' class to the 'bottom-info' element and the 'flex' class to the 'bottom-info-mobile' element.
 */
function showMobileBtns() {
    const bottomInfo = document.getElementById('bottom-info');
    const bottomInfoMobile = document.getElementById('bottom-info-mobile');
    bottomInfo.classList.remove('flex');
    bottomInfo.classList.add('d-none');
    bottomInfoMobile.classList.remove('d-none');
    bottomInfoMobile.classList.add('flex');
    bottomInfoMobile.style.setProperty('display', 'flex', 'important');
}

/**
 * Hides the mobile buttons by removing the 'flex' class from the 'bottom-info-mobile' element and adding the 'd-none' class to it.
 */
function hideMobileBtns() {
    document.getElementById('bottom-info-mobile').classList.remove('flex');
    document.getElementById('bottom-info-mobile').classList.add('d-none');
}

/**
 * Adapts width and height of a canvas based on the window's inner width. If the window's inner width is less than 500, 
 * sets the canvas width to window's inner width and canvas height to window's inner height, otherwise, sets backgroundSize property of canvas to 720, 480.
 */
function adaptInnerWidth() {
    if (window.innerWidth < 500) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = 720;
        canvas.height = 480;
    }
}

/**
 * Toggles the audio on and off.
 */
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

/**
 * Toggles full screen based on the game state.
 */
function checkToggleFullScreen() {
    if (gameIsOn) {
        toggleFullScreen(document.getElementById('newFullScreen'));
    } else {
        toggleFullScreen(document.documentElement);
    }
}

/**
 * Toggles the full screen mode based on the provided element.
 * @param {Element} element - The element to toggle full screen on.
*/
function toggleFullScreen(element) {
    if (!fullscreenOn) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
            document.body.classList.add('fullscreen-mode');
            checkMobileBtns();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    fullscreenOn = !fullscreenOn;
}


/**
 * Removes the 'flex' class and adds the 'd-none' class to the 'winOverlay' element.
 */
function removeWinOverlay() {
    document.getElementById('winOverlay').classList.remove('flex');
    document.getElementById('winOverlay').classList.remove('you-won');
    document.getElementById('winOverlay').classList.add('d-none');
    document.querySelector('div.endscreen-buttons').classList.add('d-none');
}

/**
 * Removes the 'flex' class and adds the 'd-none' class to the 'lostOverlay' element.
 */
function removeLostOverlay() {
    if (removeLostOverlay) {
        document.getElementById('lostOverlay').classList.remove('flex');
        document.getElementById('lostOverlay').classList.remove('you-lost');
        document.getElementById('lostOverlay').classList.add('d-none');
        document.querySelector('div.endscreen-buttons').classList.add('d-none');
    }
}

/**
 * Reloads the page and removes the win and lost overlays.
 */
function restartPage() {
    location.reload();
    removeOverlays();
}

/**
 * Initializes the game by removing the "start-page-background" class from the canvas,
 * starting the game sounds, initializing the game, hiding the start information,
 * checking for mobile buttons, removing the win overlay, and removing the lost overlay.
 */
function startGame() {
    canvas = document.getElementById("canvas");
    canvas.classList.remove("start-page-background");
    startGameSound();
    init();
    hideStartInfo();
    checkMobileBtns();
}

/**
 * Asynchronously restarts the game by clearing all intervals and timeouts, removing overlays, initializing level 1, 
 * starting game sounds, initializing the game, checking for mobile buttons and removing the win and lost overlays.
 * @return {Promise<void>} A promise that resolves when the game has been restarted.
 */
async function restartGame() {
    hideMobileBtns();
    clearAllIntervalsAndTimeouts();
    removeOverlays();
    sounds.stopSound(sounds.you_win_sound);
    canvas = document.getElementById("canvas");
    await initLevel1();
    startGameSound();
    init();
    checkMobileBtns();
}

/**
 * Removes the win and lost overlays by calling the corresponding functions.
 */
function removeOverlays() {
    removeWinOverlay();
    removeLostOverlay();
}

/**
 * Starts the game sounds by pausing the background music and playing the come on sound.
 */
function startGameSound() {
    let bgMusic = document.getElementById('bgMusic');
    bgMusic.pause();
    sounds.playSound(sounds.come_on_sound);
}

/**
 * Hides the start info by removing the 'flex' class from 'startScreenTop' and adding the 'd-none' class to it.
 * Then, it removes the 'flex' class from 'bottom-info' and adds the 'd-none' class to it.
*/
function hideStartInfo() {
    document.getElementById('startScreenTop').classList.remove('flex');
    document.getElementById('startScreenTop').classList.add('d-none');
    document.getElementById('bottom-info').classList.remove('flex');
    document.getElementById('bottom-info').classList.add('d-none');
}

/**
 * Clears all intervals and Timeouts from 1 to 9999.
*/
function clearAllIntervalsAndTimeouts() {
    for (let i = 1; i < 9999; i++)
        window.clearInterval(i);
    for (let j = 1; j < 9999; j++)
        clearTimeout(j);
    allIntervalsCleared = true;
}

