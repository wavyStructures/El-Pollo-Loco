class ThrowableObject extends MoveableObject {

    IMAGES_THROWING = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]


    IMAGES_SPLASHING = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    throw_sound = new Audio('audio/throw.mp3');

    constructor(x, y, direction) {
        super();
        this.loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.otherDirection = direction;
        this.animate();
        this.throw();

    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throw_sound.play();

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
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                this.playAnimation(this.IMAGES_SPLASHING);
                this.cleanupAfterThrow();
            }
        }, 60);
    }

    isFlying() {
        return this.y < 321;
    }

    cleanupAfterThrow() {
        clearInterval(this.animationInterval);
        // clearInterval(this.throwInterval......);
        //more objects to be removed e.g.
    }


}