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
    sounds;

    constructor(sounds) {
        super().loadImage(CHARACTER_IDLE[0]);
        this.world = world;
        this.sounds = sounds;
        this.loadCharacterImages();
        this.applyGravity();
        setTimeout(() => { this.animate(); }, 1000);
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
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.sounds.playSound(this.sounds.walking_sound);
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.sounds.playSound(this.sounds.jumping_sound);
            }
            this.world.camera_x = -this.x + 100;   //camera auf die gegenteilige x-Koordinate von Pepe setzen
        }, 1000 / 60);
    }

    animateImages() {
        let animationInterval = setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(CHARACTER_DEAD);
                clearInterval(animationInterval);
                this.sounds.playSound(this.sounds.character_dying_sound);
                this.sounds.stopSound(this.sounds.walking_sound);
                this.showLostOverlay();
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
                this.sounds.playSound(this.sounds.long_idle_sound);
                this.isIdle = true;
            }
        }, 200);
    }


    wakeUp() {
        this.loadImage(CHARACTER_IDLE[0]);
        this.isIdle = false;
    }

    showLostOverlay() {


        this.sounds.playSound(this.sounds.you_lose_sound);
        document.getElementById('lostOverlay').classList.remove('d-none');
        document.getElementById('lostOverlay').classList.add('flex');
    }

}

