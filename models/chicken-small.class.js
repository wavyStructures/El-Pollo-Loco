class SmallChicken extends MoveableObject {

    x = 120;
    y = 390;
    width = 40;
    height = 40;


    IMAGES_WALKING = ['../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    isDead = false;
    offset = {
        left: 2,
        top: 2,
        right: 2,
        bottom: 2,
    };
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 230 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead === false) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.isDead === true) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }
}



