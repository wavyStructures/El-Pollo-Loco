class Character extends MoveableObject {

    x = 120;
    y = 140;
    width = 150;
    height = 300;
    speed = 10;
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
    lastHit = 0;
    // hurtDuration = 1500;
    // hurtStartTime = 0;
    lastKeyPressTime = 0;
    sounds;

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
     * Animates the character's different movements and actions.
     */
    animate() {
        this.animateImages();

        this.animateWalking();
        this.animateJumping();
        this.animateHurt();
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
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.walkLeft();
            } else {
                this.sounds.stopSound(this.sounds.walking_sound);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
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
     * Animates the character's jumping movement, triggers a jump action and plays a jumping sound when the space key is pressed and the character is not above the ground.
     */
    animateJumping() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.wakeUp();
                this.jump();
                this.sounds.playSound(this.sounds.jumping_sound);
            }
        }, 1000 / 60);
    }


    animateHurt() {
        setInterval(() => {
            if (this.isHurt() && !this.isPlayingHurtSound) {
                this.sounds.playSound(this.sounds.isHurt_sound);
                this.isPlayingHurtSound = true;
                this.hurtStartTime = Date.now();
            } else if (!this.isHurt() && Date.now() - this.hurtStartTime > this.hurtDuration) {
                this.isPlayingHurtSound = false;
            }
        }, 100);
    }

    /**
     * Sets up an interval to handle different character animations based on the character's state and keyboard input.
     */
    animateImages() {
        let deathFrame = 0;
        let characterInterval = setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(CHARACTER_DEAD);
                deathFrame++;
                if (deathFrame == CHARACTER_DEAD.length - 1) {
                    clearInterval(characterInterval)
                    setTimeout(() => { this.stopGameAfterDying(characterInterval); }, 1000);
                }
            } else if (this.isHurt() && Date.now() - this.hurtStartTime <= this.hurtDuration) {
                this.playAnimation(CHARACTER_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(CHARACTER_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(CHARACTER_WALKING);
            }
            // } else {
            //     this.handleIdleState();
            // }
        }, 1000 / 60);
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

    //     /**
    //  * Decreases the character's energy by 5 and triggers the animation for being hurt if the character is not immune to hits.
    //  * If the character's energy reaches 0, they will be animated as dead. The immunity to hits lasts for 1.5 seconds.
    //  */
    //     characterIsHit() {
    //         const now = new Date().getTime();
    //         this.lastHit = now;
    //         if (!this.hitImmunity) {
    //             this.hitImmunity = true;

    //             const processHit = () => {
    //                 if (this.lastHit === new Date().getTime()) {
    //                     this.energy -= 5;
    //                     console.log('CH energy: ', this.energy);

    //                     if (this.energy <= 0) {
    //                         this.energy = 0;
    //                         // this.animateDead();
    //                     }
    //                 }
    //                 // setTimeout(() => {
    //                 this.hitImmunity = false;
    //                 // }, 1500);
    //             };
    //             processHit();
    //         }
    //     }

    /**
     * Stops the game after the character dies.
     * @param {number} characterInterval - The interval ID of the animation.
     */
    stopGameAfterDying(characterInterval) {
        clearInterval(characterInterval);
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