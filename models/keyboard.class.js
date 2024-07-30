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
        }, { passive: false });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        }, { passive: false });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        }, { passive: false });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        }, { passive: false });
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        }, { passive: false });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        }, { passive: false });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        }, { passive: false });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        }, { passive: false });
        document.getElementById('btnBuy').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.B = true;
        }, { passive: false });
        document.getElementById('btnBuy').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.B = false;
        }, { passive: false });
    }
}
