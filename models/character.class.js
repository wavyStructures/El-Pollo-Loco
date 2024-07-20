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
    isIdle = false;
    lastKeyPress = 0;
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
        this.animateWalking();
        this.animateJumping();
        this.animateHurt();
        this.animateImages();
        this.animateIdle();
        this.wakeUp();
    }

    /**
         * Makes the character walk right.
         */
    walkRight() {
        this.moveRight();
        this.wakeUp();
        this.otherDirection = false;
        this.sounds.playSound(this.sounds.walking_sound);
    }

    /**
     * Makes the character walk left.
     */
    walkLeft() {
        this.moveLeft();
        this.wakeUp();
        this.otherDirection = true;
        this.sounds.playSound(this.sounds.walking_sound);
    }

    /**
     * Animates the character's walking movement, uses setInterval method to continuously check for keyboard input to determine if the character
     * should walk right or left if character is within level boundaries. If no keyboard input is detected, the walking sound
     * is stopped. Additionally, the camera is updated to follow the character's movement.
     */
    animateWalking() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.walkRight();
            }
            else if (this.world.keyboard.LEFT && this.x > 0) {
                this.walkLeft();
            } else {
                this.sounds.stopSound(this.sounds.walking_sound);
            }
            this.world.camera_x = -this.x + 100;   //camera auf die gegenteilige x-Koordinate von Pepe setzen
        }, 1000 / 20);
    }

    /**
     * Animates the character's jumping movement, triggers a jump action and plays a jumping sound when the space key is pressed and the character is not above the ground.
     */
    animateJumping() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.wakeUp();
                this.jump();
                this.sounds.playSound(this.sounds.jumping_sound);
            }
        }, 1000 / 20);

    }

    animateHurt() {
        setInterval(() => {
            if (this.isHurt()) {
                this.sounds.playSound(this.sounds.isHurt_sound);
            }
        }, 1000 / 20);
    }

    /**
     * Sets up an interval to handle different character animations based on the character's state and keyboard input.
     */
    animateImages() {
        let animationInterval = setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(CHARACTER_DEAD);
                this.stopGameAfterDying(animationInterval);
            } else if (this.isHurt()) {
                this.playAnimation(CHARACTER_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(CHARACTER_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(CHARACTER_WALKING);
            }
        }, 1000 / 20);
    }


    /**
     * Updates the last key press time, sets the character to not idle, stops the long idle sound, and wakes up the character.
     */
    handleKeyPress() {
        this.lastKeyPressTime = Date.now();
        this.isIdle = false;
        this.sounds.stopSound(this.sounds.long_idle_sound);
        this.wakeUp();
    }

    /**
     * Handles the idle state of the character.If no key is pressed, it checks the time since the last key press 
     * and plays the idle animation for the character accordingly. 
     */
    handleIdleState() {
        const timeSinceLastPress = Date.now() - this.lastKeyPressTime;
        if (Keyboard.noKeyPressed(this.world)) {
            if (timeSinceLastPress <= 500) {
                this.playAnimation(CHARACTER_IDLE);
            } else if (timeSinceLastPress > 5000) {
                this.playAnimation(CHARACTER_LONG_IDLE);
                this.sounds.playSound(this.sounds.long_idle_sound);
            }
            this.isIdle = true;
        }
    }

    /**
     * Sets up an interval to handle character animations for idle state based on keyboard input.
     */
    animateIdle() {
        setInterval(() => {
            if (Keyboard.aKeyWasPressed(this.world)) {
                this.handleKeyPress();
            } else {
                this.handleIdleState();
            }
        }, 200);
    }
    // animateIdle() {
    //     setInterval(() => {
    //         if (Keyboard.aKeyWasPressed(this.world)) {
    //             this.lastKeyPressTime = Date.now();
    //             this.isIdle = false;
    //             this.wakeUp();
    //         }
    //         if (Keyboard.noKeyPressed(this.world) && Date.now() - this.lastKeyPressTime <= 10000) {
    //             this.playAnimation(CHARACTER_IDLE);
    //             this.isIdle = true;
    //         } else if (Keyboard.noKeyPressed(this.world) && Date.now() - this.lastKeyPressTime > 20000) {
    //             this.playAnimation(CHARACTER_LONG_IDLE);
    //             this.sounds.playSound(this.sounds.long_idle_sound);
    //             this.isIdle = true;
    //         }
    //     }, 200);
    // }

    /**
     * Loads the idle character image and sets the character's state to awake.
     */
    wakeUp() {
        this.loadImage(CHARACTER_IDLE[0]);
        this.sounds.stopSound(this.sounds.long_idle_sound);
        this.isIdle = false;
    }

    /**
     * Stops the game after the character dies.
     * @param {number} animationInterval - The interval ID of the animation.
     */
    stopGameAfterDying(animationInterval) {
        clearInterval(animationInterval);
        this.sounds.stopSound(this.sounds.walking_sound);
        this.sounds.playSound(this.sounds.character_dying_sound);
        this.showLostOverlay();
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