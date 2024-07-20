class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    // lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Constructor for initializing the object with sounds.
     * @param {type} sounds - The sounds for the object.
     */
    constructor(sounds) {
        super();
        this.sounds = sounds;
    }

    /**
     * Check if this object is colliding with another object.
     * @param {Object} mo - The other object to check collision with.
     * @return {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        let thisLeft = this.x + this.offset.left;
        let thisRight = this.x + this.width - this.offset.right;
        let thisTop = this.y + this.offset.top;
        let thisBottom = this.y + this.height - this.offset.bottom;

        let moLeft = mo.x + mo.offset.left;
        let moRight = mo.x + mo.width - mo.offset.right;
        let moTop = mo.y + mo.offset.top;
        let moBottom = mo.y + mo.height - mo.offset.bottom;

        return thisRight > moLeft &&
            thisBottom > moTop &&
            moRight > thisLeft &&
            moBottom > thisTop;
    }

    /**
     * Check if this object is colliding with another object from the side.
     * @param {Object} mo - The other object to check collision with.
     * @return {boolean} True if colliding from the side, false otherwise.
     */
    isCollidingFromSide(mo) {
        let isCollidingFromLeft = this.x + this.width - 200 >= mo.x &&
            this.x + this.width - 200 <= mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        let isCollidingFromRight = this.x + 75 <= mo.x + mo.width &&
            this.x + 75 >= mo.x &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        return isCollidingFromLeft || isCollidingFromRight;
    }

    /**
     * Check if this object is colliding with another object from the top.
     * @param {Object} mo - The other object to check collision with.
     * @return {boolean} True if colliding from the top, false otherwise.
     */
    isCollidingFromTop(mo) {
        let isCollidingFromTop = this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + mo.height &&
            this.x + 20 < mo.x + mo.width &&
            this.x + this.width - 20 > mo.x;
        return isCollidingFromTop;
    }
    /**
     * Decreases the energy of the object by the specified loss.
     * @param {number} [loss=5] - The amount of energy to be subtracted.
     */
    hit(loss = 5) {
        this.energy -= loss;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            if (this instanceof Endboss) {
                this.hitCount++;
                if (this.hitCount >= 8) {
                    this.energy = 0;
                }
            }
        }
    }

    /**
     * Checks if the object is hurt.
     * @return {boolean} Returns true if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 3;
    }

    /**
     * Checks if the object is dead by checking if its energy is equal to 0.
     * @return {boolean} Returns true if the object's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation using the provided images.
     * @param {Array<string>} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by reducing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Sets the vertical speed of the object to a positive value, simulating a jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is above the ground.
     * @return {boolean} Returns true if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {  //should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Applies gravity to the object by updating its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }
}