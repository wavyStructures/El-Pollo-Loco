class ThrowableObject extends DrawableObject {

    IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    // IMAGES_SPLASH = [
    //     '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_splash.png',
    //     '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_splash.png'
    // ]

    constructor() {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.y = 400;
        this.x = 800;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES);
        // this.loadImages(this.IMAGES_SPLASH);
        this.throw(100, 150);

    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        // this.applyGravity();
        this.speedX = 20;
    }



}