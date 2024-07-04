class Chicken extends MoveableObject {

    x = 120;
    y = 370;
    width = 60;
    height = 60;
    IMAGES_WALKING = ['../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];

    offset = {
        left: 4,
        top: 4,
        right: 4,
        bottom: 4,
    };

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25

        this.animate();
    }

    animate() {
        setInterval(() => {    //ich möchte das das immer wieder gemacht wird
            this.moveLeft();
        }, 1000 / 60);    //damit es 60mal pro Sekunde ausgeführt wird

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}