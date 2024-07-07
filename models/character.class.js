class Character extends MoveableObject {
    x = 120;
    y = 120;
    width = 150;
    height = 300;
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
    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = ['../img/2_character_pepe/5_dead/D-51.png', '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png', '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png', '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = ['../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = ['../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    isJumping = false;
    isIdle = false;
    lastKeyPress = Date.now();
    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    long_idle_sound = new Audio('audio/long_idle.mp3');


    constructor() {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();  //sobald er erstellt wird soll er auch Gravitation haben
        this.animate();
    }

    offset = {
        top: 120,
        right: 30,
        bottom: 30,
        left: 40
    }

    animate() {
        this.animateWalkingAndJumping();
        this.animateImages();
        this.animateIdle();
        this.wakeUp();
    }

    animateWalkingAndJumping() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {

                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {

                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {

                this.jump();
            }

            this.world.camera_x = -this.x + 100;   //camera auf die gegenteilige x-Koordinate von Pepe setzen
        }, 1000 / 60);
    }
    animateImages() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                // this.world.gameOver();
                // this.world.clearAllIntervals();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    animateIdle() {
        setInterval(() => {
            if (Keyboard.aKeyWasPressed(this.world)) {
                this.lastKeyPressTime = Date.now();
                this.isIdle = false;
                this.wakeUp();
            }
            if (Keyboard.noKeyPressed(this.world) && Date.now() - this.lastKeyPressTime <= 10000) {
                this.playAnimation(this.IMAGES_IDLE);
                this.isIdle = true;
            } else if (Keyboard.noKeyPressed(this.world) && Date.now() - this.lastKeyPressTime > 10000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.long_idle_sound.play();
                this.isIdle = true;
            }
        }, 200);
    }


    wakeUp() {
        this.loadImage(this.IMAGES_IDLE[0]);
        this.isIdle = false;
    }


}

