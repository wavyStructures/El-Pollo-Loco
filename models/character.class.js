class Character extends MoveableObject {

    x = 120;
    y = 140;
    width = 150;
    height = 300;
    speed = 30;
    energy = 100;
    offset = {
        top: 120,
        right: 40,
        bottom: 30,
        left: 40
    }
    world;
    currentImage;

    hitImmunity = false;
    isHit = false;
    awake = true;

    cHhitCount = 0;
    hurtState = false;
    hurtAnimationPlayed = false;

    resetTime = 5000;

    hurtDuration = 1500;
    hurtStartTime = 0;
    lastKeyPressTime = Date.now();
    sounds;
    characterInterval;
    idleInterval;

    /**
     * Initializes the character with the provided sounds and sets up initial properties and actions.
     * @param {type} sounds - The sounds associated with the character.
     */
    constructor(sounds) {
        super();
        this.loadImage(CHARACTER_IDLE[0]);
        this.currentImage = 0;
        this.world = world;
        this.sounds = sounds;
        this.loadCharacterImages();
        this.applyGravity();
        setTimeout(() => { this.animate(); }, 2000);
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
     * Animates the character's different movements and actions via Interval.
     */
    animate() {
        this.characterInterval = setInterval(() => {
            this.animateWalking();
            this.animateJumping();
            this.animateImages();
            this.handleIdleState();
        }, 200);
    }

    /**
     * Animates the character's walking movement, uses setInterval method to continuously check for keyboard input to determine if the character
     * should walk right or left if character is within level boundaries. If no keyboard input is detected, the walking sound
     * is stopped. Additionally, the camera is updated to follow the character's movement.
     */
    animateWalking() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.walkRight();
        }
        else if (this.world.keyboard.LEFT && this.x > 0) {
            this.walkLeft();
        }
        else {
            this.sounds.stopSound(this.sounds.walking_sound);
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Makes the character walk right.
     */
    walkRight() {
        // if (this.x < this.world.endboss.x) {
        this.moveRight();
        this.wakeUp();
        this.otherDirection = false;
        this.sounds.playSound(this.sounds.walking_sound);
        // }
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
     * Animates the character's jumping movement, triggers a jump action and plays a jumping sound when the space key is pressed and the character is not above the ground.
     */
    animateJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.wakeUp();
            this.jump();
            this.sounds.playSound(this.sounds.jumping_sound);
        }
    }

    characterHitCount() {
        if (this.awake === false) {
            this.wakeUp();
        }
        this.sounds.playSound(this.sounds.isHurt_sound);
        this.cHhitCount++;
        if (this.cHhitCount % 3 === 0) {
            this.hurtState = true;
        }
        console.log('cHhitCount and hurtState', this.cHhitCount, this.hurtState);
    }


    /**
     * Sets up an interval to handle different character animations based on the character's state and keyboard input.
     */
    animateImages() {
        let deathFrame = 0;
        if (this.energy <= 0 && (deathFrame <= CHARACTER_DEAD.length - 1)) {
            this.playAnimation(CHARACTER_DEAD);
            deathFrame++;

            setTimeout(() => { this.stopGameAfterDying(); }, 1000);

        } else if (this.isHurt() && !this.hurtAnimationPlayed && this.hurtState) {
            console.log('hurtState and hurtAnimationPlayed  ', this.hurtState, this.hurtAnimationPlayed);

            this.playAnimation(CHARACTER_HURT);
            this.regulateHurt();

        } else if (this.isAboveGround()) {
            this.playAnimation(CHARACTER_JUMPING);

        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(CHARACTER_WALKING);

        }
        // else {
        //     this.handleIdleState();
        // }
    }

    regulateHurt() {
        this.hurtAnimationPlayed = true;
        setTimeout(() => {
            this.hurtAnimationPlayed = false;
        }, 1500);
    }

    // 
    handleIdleState() {
        if (this.aKeyWasPressed()) {
            this.lastKeyPressTime = Date.now();
        }
        if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime <= 10000)) {
            this.playAnimation(CHARACTER_IDLE);
        } else if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime >= 10000)) {
            this.playAnimation(CHARACTER_LONG_IDLE);
            this.sounds.playSound(this.sounds.long_idle_sound);
            this.awake = false;
        }
    }

    /**
        //  * Updates the last key press time, sets the character to not idle, stops the long idle sound, and wakes up the character.
        //  */
    // handleKeyPress() {
    //     this.lastKeyPressTime = Date.now();
    //     this.sounds.stopSound(this.sounds.long_idle_sound);
    //     this.wakeUp();
    // }

    // handleIdleState() {
    //     const timeSinceLastPress = Date.now() - this.lastKeyPressTime;
    //     if (Keyboard.aKeyWasPressed(this.world)) {
    //         this.handleKeyPress();
    //     } else if (Keyboard.noKeyPressed(this.world) && this.energy > 10) {
    //         if (timeSinceLastPress <= 2000) {
    //             this.playAnimation(CHARACTER_IDLE);
    //         } else {
    //             this.checkForLongIdle(timeSinceLastPress);
    //         }
    //     }
    // }

    // checkForLongIdle(timeSinceLastPress) {
    //     if (timeSinceLastPress > 6000) {
    //         console.log('long idleis on and timeSinceLastPress:', timeSinceLastPress);
    //         setTimeout(() => {
    //             this.playAnimation(CHARACTER_LONG_IDLE);
    //             this.sounds.playSound(this.sounds.long_idle_sound);
    //         }, 1500);
    //     }
    // }

    /**
     * Loads the idle character image and sets the character's state to awake.
     */
    wakeUp() {
        this.hurtState = false;
        // this.loadImage(CHARACTER_IDLE[0]);
        this.sounds.stopSound(this.sounds.long_idle_sound);
    }

    /**
     * Stops the game after the character dies.
     * @param {number} characterInterval - The interval ID of the animation.
     */
    stopGameAfterDying() {
        clearInterval(this.characterInterval);
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

    /**
        * Checks if any key on the keyboard is pressed.
        * @return {boolean} Returns true if any key is pressed, false otherwise.
        */
    aKeyWasPressed() {
        return this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.SPACE || this.world.keyboard.D || this.world.keyboard.B;
    }

    /**
     * Checks if no key is pressed in the given world.
     * @return {boolean} Returns true if no key is pressed, false otherwise.
     */
    noKeyPressed() {
        return !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.D && !this.world.keyboard.B;
    }

}
