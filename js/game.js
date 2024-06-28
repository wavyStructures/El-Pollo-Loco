let canvas;
let world;
let keyboard;

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);

    // character.src = '../img/I-1.png';

    // world = new World(canvas, keyboard);
    // gamescreen.style.display = "block";
    // optionsScreen();
    // playAudio();
    // mobileControls();

    // setTimeout(function () {
    //     ctx.drawImage(character, 20, 20, 50, 150);
    // }, 2000);

    console.log('My Character is: ', world.character);
}

// function startGame() {
//     this.initLevel();
// }

window.addEventListener('keydown', (e) => {
    console.log(e);
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
    console.log('Key down:', e.key, keyboard);
});

window.addEventListener('keyup', (e) => {
    console.log(e);
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
    console.log('Key down:', e.key, keyboard);
});
