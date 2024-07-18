class SmallChicken extends MoveableObject {

    x = 120;
    y = 390;
    width = 40;
    height = 40;
    isDead = false;
    offset = {
        left: 2,
        top: 2,
        right: 2,
        bottom: 2,
    };

    constructor(sounds) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.sounds = sounds;
        this.loadSmallChickenImages();
        this.x = 730 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    loadSmallChickenImages() {
        this.loadImages(SMALL_CHICKEN_WALKING);
        this.loadImages(SMALL_CHICKEN_DEAD);
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(SMALL_CHICKEN_WALKING);
                this.sounds.playSound(this.sounds.chicken_sound);
            }
            else {
                if (!this.deadSoundPlayed) {
                    this.deadSoundPlayed = true;
                    this.sounds.stopSound(this.sounds.chicken_sound);
                    this.playAnimation(SMALL_CHICKEN_DEAD);
                    this.sounds.playSound(this.sounds.small_chicken_dies_sound);
                }
            }
        }, 200);
    }
}



