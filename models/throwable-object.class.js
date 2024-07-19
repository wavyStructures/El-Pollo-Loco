class ThrowableObject extends MoveableObject {

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

    loadBottleImages() {
        this.loadImages(BOTTLE_THROWING);
        this.loadImages(BOTTLE_SPLASHING);
    }

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

    isFlying() {
        return this.y < 321;
    }

    cleanupAfterThrow() {
        clearInterval(this.animationInterval);
    }
}   