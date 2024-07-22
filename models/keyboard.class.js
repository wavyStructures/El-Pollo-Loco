class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    B = false;

    /**
     * Constructor for the Keyboard class, initializes key event bindings.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
    }

    /**
     * Listens for keydown and keyup events to update keyboard state.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
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
        });

        window.addEventListener('keyup', (e) => {
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
        });
    }

    /**
     * Binds touchstart and touchend events to the specified buttons to update the corresponding properties of the keyboard object.
     */
    bindBtnPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
        document.getElementById('btnBuy').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.B = true;
        });
        document.getElementById('btnBuy').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.B = false;
        });
    }

    /**
    * Checks if any key on the keyboard is pressed.
    * @param {Object} world - The world object containing the keyboard state.
    * @return {boolean} Returns true if any key is pressed, false otherwise.
    */
    static aKeyWasPressed(world) {
        return world.keyboard.LEFT || world.keyboard.RIGHT || world.keyboard.UP || world.keyboard.DOWN || world.keyboard.SPACE || world.keyboard.D || world.keyboard.B;
    }

    /**
     * Checks if no key is pressed in the given world.
     * @param {Object} world - The world object containing the keyboard state.
     * @return {boolean} Returns true if no key is pressed, false otherwise.
     */
    static noKeyPressed(world) {
        return !world.keyboard.LEFT && !world.keyboard.RIGHT && !world.keyboard.UP && !world.keyboard.DOWN && !world.keyboard.SPACE && !world.keyboard.D && !world.keyboard.B;
    }

}
