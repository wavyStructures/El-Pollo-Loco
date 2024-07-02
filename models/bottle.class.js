class Bottle extends MoveableObject {
    y = 380;
    x = 500 + Math.random() * 3000;
    width = 60;
    height = 70;

    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }


}