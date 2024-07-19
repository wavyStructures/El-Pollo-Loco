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

    /**
     * Initializes the character with the provided sounds and sets up initial properties and actions.
     * @param {type} sounds - The sounds associated with the character.
     */
    constructor(sounds) {
        super().loadImage(CHARACTER_IDLE[0]);
        this.world = world;
        this.sounds = sounds;
        this.loadCharacterImages();
        this.applyGravity();
        setTimeout(() => { this.animate(); }, 1000);
    }

    /**
     * Loads images for various character actions like walking, jumping, hurt, dead, idle, and long idle.
     */
    loadCharacterImages() {
        this.loadImages(CHARACTER_WALKING);
        this.loadImages(CHARACTER_JUMPING);
        this.loadImages(CHARACTER_HURT);
        this.loadImages(CHARACTER_DEAD);
        this.loadImages(CHARACTER_IDLE);
        this.loadImages(CHARACTER_LONG_IDLE);
    }

    /**
     * Animates the character's different movements and actions.
     */
    animate() {
        this.animateWalkingAndJumping();
        this.animateImages();
        this.animateIdle();
        this.wakeUp();
    }

    /**
     * Animates the character's walking and jumping movements based on keyboard input, sets up an interval to handle different 
     * character animations based on the character's state and keyboard input.
     * If the right arrow key is pressed and the character is not at the end of the level, the character moves to the right.
     * If the left arrow key is pressed and the character is not at the beginning, the character moves to the left.
     * If the space bar is pressed and the character is not above the ground, the character jumps.
     * The camera is positioned to follow the character's x-coordinate.
     */
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

    /**
     * Sets up an interval to handle different character animations based on the character's state and keyboard input.
     */
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

    /**
     * Sets up an interval to handle character idle animations based on keyboard input.
     */
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

    /**
     * Loads the idle character image and sets the character's state to awake.
     */
    wakeUp() {
        this.loadImage(CHARACTER_IDLE[0]);
        this.isIdle = false;
    }

    /**
     * Displays the lost overlay by playing the "you_lose_sound" sound,
     * setting a timeout to mute all sounds and clear all intervals after 500ms,
     * removing the 'd-none' class from the 'lostOverlay' element and adding the 'flex' class.
     */
    showLostOverlay() {
        this.sounds.playSound(this.sounds.you_lose_sound);
        setTimeout(() => {
            this.sounds.muteAllSounds();
            clearAllIntervals();
        }, 500);

        document.getElementById('lostOverlay').classList.remove('d-none');
        document.getElementById('lostOverlay').classList.add('flex');
    }
}