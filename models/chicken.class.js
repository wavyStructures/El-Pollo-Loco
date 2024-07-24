class Chicken extends MoveableObject {

    x = 405 + Math.random() * 3000;
    y = 370;
    width = 60;
    height = 60;
    offset = {
        left: 4,
        top: 4,
        right: 4,
        bottom: 4,
    };
    speed = 0.9 + Math.random() * 0.5;
    energy = 5;
    isDead = false;
    toBeRemoved = false;

    /**
     * Creates a new instance of the Chicken class.
     * @param {Object} sounds - The sounds object.
     */
    constructor(sounds) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.sounds = sounds;
        this.loadChickenImages();
        this.animate();
    }

    /**
     * Loads the chicken images for walking and dead states.
      */
    loadChickenImages() {
        this.loadImages(CHICKEN_WALKING);
        this.loadImages(CHICKEN_DEAD);
    }

    /**
     * Function to animate the chicken object.
     */
    animate() {
        let chickenWalk = setInterval(() => {
            this.moveLeft();
            if (!this.energy <= 0) {
                this.playAnimation(CHICKEN_WALKING);
                this.sounds.playSound(this.sounds.chicken_sound);
            } else {
                this.isDead;
                this.sounds.stopSound(this.sounds.chicken_sound);
                this.playAnimation(CHICKEN_DEAD);
                clearInterval(chickenWalk);
                setTimeout(() => {
                    this.markForRemoval();
                }, 1500);
            }
        }, 200);


    }
}   