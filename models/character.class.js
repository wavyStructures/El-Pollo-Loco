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
    isIdle = false;
    isPlayingHurtSound = false;
    hitImmunity = false;
    isHit = false;
    cHhitCount = 0;
    hurtDuration = 1500;
    hurtStartTime = 0;
    lastKeyPressTime = 0;
    sounds;
    characterInterval;

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
            // this.animateHurt();
            this.animateImages();
        }, 150);
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
        if (this.x < this.world.endboss.x) {
            this.moveRight();
            this.wakeUp();
            this.otherDirection = false;
            this.sounds.playSound(this.sounds.walking_sound);
        }
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
        this.sounds.playSound(this.sounds.isHurt_sound);
        this.cHhitCount++;
    }

    // animateHurt() {
    //     if (this.isHurt()) {
    //         this.isPlayingHurtSound = true;
    //         this.hurtStartTime = Date.now();
    //     } else if (!this.isHurt() && Date.now() - this.hurtStartTime > this.hurtDuration) {
    //         this.isPlayingHurtSound = false;
    //     }
    // }

    /**
     * Sets up an interval to handle different character animations based on the character's state and keyboard input.
     */
    animateImages() {
        let deathFrame = 0;
        if (this.energy <= 0 && (deathFrame <= CHARACTER_DEAD.length - 1)) {
            this.playAnimation(CHARACTER_DEAD);
            deathFrame++;

            setTimeout(() => { this.stopGameAfterDying(); }, 1000);

        } else if (this.isHurt()) {
            console.log('in IMAGES is hurt', this.isHurt);
            // && Date.now() - this.hurtStartTime <= this.hurtDuration) 
            // {
            this.playAnimation(CHARACTER_HURT);
            console.log('now executing play IMAGES CH HURTt()');
        } else if (this.isAboveGround()) {
            this.playAnimation(CHARACTER_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(CHARACTER_WALKING);
        }
        // } else {
        //     this.handleIdleState();
        // }
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
        if (Keyboard.noKeyPressed(this.world) && this.energy > 10) {
            if (timeSinceLastPress <= 2000) {
                this.playAnimation(CHARACTER_IDLE);
            } else if (timeSinceLastPress > 10000) {
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
        }, 1500);
    }

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
}