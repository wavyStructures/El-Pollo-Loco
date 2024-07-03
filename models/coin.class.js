class Coin extends MoveableObject {


    height = 120;
    width = 120;
    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    // offset = {
    //     left: 50,
    //     top: 60,
    //     right: 50,
    //     bottom: 60,
    // };

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.randomizePosition();
    }


    randomizePosition() {
        this.x = 500 + Math.random() * 1900;
        this.y = 60 + Math.random() * 100;
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 300);
    }
}


