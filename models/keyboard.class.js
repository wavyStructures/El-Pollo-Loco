class Keyboard {

    static aKeyWasPressed(world) {
        return world.keyboard.LEFT || world.keyboard.RIGHT || world.keyboard.UP || world.keyboard.DOWN || world.keyboard.SPACE || world.keyboard.D || world.keyboard.B;
    }

    static noKeyPressed(world) {
        return !world.keyboard.LEFT && !world.keyboard.RIGHT && !world.keyboard.UP && !world.keyboard.DOWN && !world.keyboard.SPACE && !world.keyboard.D && !world.keyboard.B;
    }

    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
        this.B = false;

        this.keyPressEvents();


    }

    keyPressEvents() {

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
                case 66:
                    keyboard.B = true;
                    break;
                case 68:
                    keyboard.D = true;
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
                case 66:
                    keyboard.B = false;
                    break;
                case 68:
                    keyboard.D = false;
                    break;

                case 27:
                    keyboard.ESC = false;
                    break;
            }
            // console.log('Key down:', e.key, keyboard);
        });

    }
}





