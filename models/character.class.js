class Character extends MoveableObject {
    x = 120;
    y = 90;
    width = 180;
    height = 350;
    speed = 10;
    IMAGES_WALKING = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png', '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.isJumping = false;
        this.applyGravity();  //sobald er erstellt wird soll er auch Gravitation haben
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT) {
                this.walking_sound.play();
                if (this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                } else {
                    this.x = this.world.level.level_end_x;
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walking_sound.play();
                this.x -= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.speedY = 30;
                // this.jump();
            }

            this.world.camera_x = -this.x + 100;   //camera auf die gegenteilige x-Koordinate von Pepe setzen
        }, 1000 / 60);


        setInterval(() => {
            if (this.isAboveGround()
                // && !this.isJumping
            ) {
                this.playAnimation(this.IMAGES_JUMPING);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // this.x += this.speed;
                    //WALKING 
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }


    // jump() {
    //     if (!this.isJumping) {
    //         this.speedY = 20;
    //         this.isJumping = true;
    //     }
    // }
}