class SmallChicken extends MoveableObject {

    x = 120;
    y = 390;
    width = 40;
    height = 40;
    offset = {
        left: 20,
        top: 2,
        right: 20,
        bottom: 2,
    };
    energy = 5;
    isDead = false;

    /**
     * Constructor for SmallChicken class.
     * @param {type} sounds - The sounds for the chicken.
     */
    constructor(sounds) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.sounds = sounds;
        this.loadSmallChickenImages();
        this.x = 730 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Loads the small chicken images for walking and dead states.
     */
    loadSmallChickenImages() {
        this.loadImages(CHICKEN_SMALL_WALKING);
        this.loadImages(CHICKEN_SMALL_DEAD);
    }

    /**
     * Function to animate the small chicken's movement and actions.
     */
    animate() {
        let smallChickenWalking = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.energy <= 0) {
                this.playAnimation(CHICKEN_SMALL_WALKING);
                this.sounds.playSound(this.sounds.chicken_sound);

            } else {
                this.sounds.stopSound(this.sounds.chicken_sound);
                this.playAnimation(CHICKEN_SMALL_DEAD);
                clearInterval(smallChickenWalking);
            }
        }, 200);
    }
}