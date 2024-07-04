class Bottle extends MoveableObject {

    x = 140;
    //  + Math.random() * 3000;
    y = 360;
    width = 60;
    height = 70;

    // static lastBottleX = 320;
    // offset = { top: 10, bottom: 10, left: 30, right: 10 };

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 10
    };


    constructor() {
        let randomize = Math.round(Math.random());
        super().loadImage(this.IMAGES_BOTTLE[randomize]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
        this.setInitialPosition();
    }


    setInitialPosition() {
        this.x = this.width + 150 + Math.random() * 2000;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 500);
    }
}


