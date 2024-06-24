class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 60;


    IMAGES_WALKING = ['../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2300;
        this.animate();
    }

    animate() {


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    // IMAGES_DEAD = [
    //     'img/6_salsa_bottle/bottle_1.png',
    //     'img/6_salsa_bottle/bottle_2.png',
    //     'img/6_salsa_bottle/bottle_3.png',
    //     'img/6_salsa_bottle/bottle_4.png'
    // ];

}

