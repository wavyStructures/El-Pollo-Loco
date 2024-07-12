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

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
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
            if (this.isDead === false) {
                this.playAnimation(SMALL_CHICKEN_WALKING);
            }
            if (this.isDead === true) {
                this.playAnimation(SMALL_CHICKEN_DEAD);
                this.sounds.playSound(this.sounds.small_chicken_dies);
            }
        }, 200);
    }
}



