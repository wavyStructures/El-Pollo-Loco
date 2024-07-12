class Character extends MoveableObject {
    x = 120;
    y = 120;
    width = 150;
    height = 300;
    speed = 10;
    offset = {
        top: 120,
        right: 30,
        bottom: 30,
        left: 40
    }
    world;
    isJumping = false;
    isIdle = false;
    lastKeyPress = Date.now();
    // walking_sound = new Audio('audio/walking.mp3');
    // jump_sound = new Audio('audio/jump.mp3');
    // long_idle_sound = new Audio('audio/long_idle.mp3');


    constructor() {
        super();
        this.world = world;
        this.loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadCharacterImages();
        this.applyGravity();  //sobald er erstellt wird soll er auch Gravitation haben
        this.animate();
    }

    loadCharacterImages() {
        this.loadImages(CHARACTER_WALKING);
        this.loadImages(CHARACTER_JUMPING);
        this.loadImages(CHARACTER_HURT);
        this.loadImages(CHARACTER_DEAD);
        this.loadImages(CHARACTER_IDLE);
        this.loadImages(CHARACTER_LONG_IDLE);
    }

    animate() {
        this.animateWalkingAndJumping();
        this.animateImages();
        this.animateIdle();
        this.wakeUp();
    }


    animateWalkingAndJumping() {
        setInterval(() => {
            // this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {

                this.moveRight();
                this.otherDirection = false;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {

                this.moveLeft();
                this.otherDirection = true;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {

                this.jump();
            }

            this.world.camera_x = -this.x + 100;   //camera auf die gegenteilige x-Koordinate von Pepe setzen
        }, 1000 / 60);
    }

    animateImages() {
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(CHARACTER_DEAD);
                clearInterval(animationInterval); // Stop checking for animations

                setTimeout(() => {
                    this.world.clearAllIntervals();
                    setTimeout(() => {
                        this.showLostOverlay();
                    }, 200);
                }, 50);
            } else if (this.isHurt()) {
                this.playAnimation(CHARACTER_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(CHARACTER_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(CHARACTER_WALKING);
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
                this.playAnimation(CHARACTER_IDLE);
                this.isIdle = true;
            } else if (Keyboard.noKeyPressed(this.world) && Date.now() - this.lastKeyPressTime > 20000) {
                this.playAnimation(CHARACTER_LONG_IDLE);
                // this.long_idle_sound.play();
                this.isIdle = true;
            }
        }, 200);
    }


    wakeUp() {
        this.loadImage(CHARACTER_IDLE[0]);
        this.isIdle = false;
    }

    showLostOverlay() {
        document.getElementById('lostOverlay').classList.remove('d-none');
        document.getElementById('lostOverlay').classList.add('flex');
    }


}

