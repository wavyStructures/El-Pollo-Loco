class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    B = false;

    /**
     * Checks if any key on the keyboard is pressed.
     *
     * @param {Object} world - The world object containing the keyboard state.
     * @return {boolean} Returns true if any key is pressed, false otherwise.
     */
    static aKeyWasPressed(world) {
        return world.keyboard.LEFT || world.keyboard.RIGHT || world.keyboard.UP || world.keyboard.DOWN || world.keyboard.SPACE || world.keyboard.D || world.keyboard.B;
    }

    /**
     * Checks if no key is pressed in the given world.
     *
     * @param {Object} world - The world object containing the keyboard state.
     * @return {boolean} Returns true if no key is pressed, false otherwise.
     */
    static noKeyPressed(world) {
        return !world.keyboard.LEFT && !world.keyboard.RIGHT && !world.keyboard.UP && !world.keyboard.DOWN && !world.keyboard.SPACE && !world.keyboard.D && !world.keyboard.B;
    }

    /**
     * Constructor for the Keyboard class, initializes key event bindings.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
    }

    /**
     * Listens for keydown and keyup events to update keyboard state.
     *
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    this.keyboard.LEFT = true;
                    break;
                case 39:
                    this.keyboard.RIGHT = true;
                    break;
                case 38:
                    this.keyboard.UP = true;
                    break;
                case 40:
                    this.keyboard.DOWN = true;
                    break;
                case 32:
                    this.keyboard.SPACE = true;
                    break;
                case 66:
                    this.keyboard.B = true;
                    break;
                case 68:
                    this.keyboard.D = true;
                    break;
                case 27:
                    this.keyboard.ESC = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 37:
                    this.keyboard.LEFT = false;
                    break;
                case 39:
                    this.keyboard.RIGHT = false;
                    break;
                case 38:
                    this.keyboard.UP = false;
                    break;
                case 40:
                    this.keyboard.DOWN = false;
                    break;
                case 32:
                    this.keyboard.SPACE = false;
                    break;
                case 66:
                    this.keyboard.B = false;
                    break;
                case 68:
                    this.keyboard.D = false;
                    break;
                case 27:
                    this.keyboard.ESC = false;
                    break;
            }
        });
    }

    /**
     * Binds touchstart and touchend events to the specified buttons to update the corresponding properties of the keyboard object.
     *
     * @return {void}
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
}












