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
    speed = 0.15 + Math.random() * 0.25;
    energy = 5;
    isDead = false;

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

    loadChickenImages() {
        this.loadImages(CHICKEN_WALKING);
        this.loadImages(CHICKEN_DEAD);
    }

    /**
     * Function to animate the chicken object.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.energy <= 0) {
                this.playAnimation(CHICKEN_WALKING);
                this.sounds.playSound(this.sounds.chicken_sound);
            } else {
                this.sounds.stopSound(this.sounds.chicken_sound);
                this.isDead = true;
                this.playAnimation(CHICKEN_DEAD);
                this.sounds.playSound(this.sounds.chicken_dead_sound);
            }
        }, 200);
    }
}   