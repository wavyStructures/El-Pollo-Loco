class ThrowableObject extends MoveableObject {
    /**
     * Constructor for creating a new ThrowableObject.
     *
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {string} direction - The direction of the object.
     * @param {array} sounds - The sounds associated with the object.
     */
    constructor(x, y, direction, sounds) {
        super();
        this.loadImage(BOTTLE_THROWING[0]);
        this.loadBottleImages();
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.otherDirection = direction;
        this.sounds = sounds;
        this.animate();
        this.throw();
    }

    /**
     * Loads images for throwing and splashing bottles.
     */
    loadBottleImages() {
        this.loadImages(BOTTLE_THROWING);
        this.loadImages(BOTTLE_SPLASHING);
    }

    /**
     * Throws the object in the specified direction.
     * Sets the speedY to 25, applies gravity, plays the throw_bottle_sound,
     * and moves the object in the specified direction at a rate of 10 pixels per 25 milliseconds.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.sounds.playSound(this.sounds.throw_bottle_sound);

        if (this.otherDirection == true) {
            setInterval(() => {
                this.x -= 10;
            }, 25);
        } else {
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
    }

    /**
     * Sets up an interval to animate the object based on its flying state.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isFlying()) {
                this.playAnimation(BOTTLE_THROWING);
            } else {
                this.playAnimation(BOTTLE_SPLASHING);
                this.cleanupAfterThrow();
            }
        }, 60);
    }

    /**
     * Checks if the object is flying based on its y position.
     * @return {boolean} Indicates if the object is flying.
     */
    isFlying() {
        return this.y < 321;
    }

    /**
     * Clears the animation interval after throwing the object.
     */
    cleanupAfterThrow() {
        clearInterval(this.animationInterval);
    }
}   