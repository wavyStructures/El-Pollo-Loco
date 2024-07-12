class Chicken extends MoveableObject {

    x = 400 + Math.random() * 500;
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

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadChickenImages();
        this.animate();
    }

    loadChickenImages() {
        this.loadImages(CHICKEN_WALKING);
        this.loadImages(CHICKEN_DEAD);
    }

    animate() {
        setInterval(() => {    //ich möchte das das immer wieder gemacht wird
            this.moveLeft();
        }, 1000 / 60);    //damit es 60mal pro Sekunde ausgeführt wird

        setInterval(() => {
            this.playAnimation(CHICKEN_WALKING);
        }, 200);
    }
}   