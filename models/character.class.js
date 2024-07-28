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
    sounds;
    currentImage;
    isWalkingSoundPlaying = false;
    immune = false;
    lastHit = 0;
    isHit = false;
    isHitForHurt = false;
    isHitForHurtAnimation = false;
    awake = true;
    lastKeyPressTime = Date.now();
    deathFrame = 0;


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
        this.loadImages(CHARACTER_IDLE);
        this.loadImages(CHARACTER_LONG_IDLE);
        this.loadImages(CHARACTER_WALKING);
        this.loadImages(CHARACTER_JUMPING);
        this.loadImages(CHARACTER_HURT);
        this.loadImages(CHARACTER_DEAD);
    }

    /**
     * Animates the character's different movements and images.
     */
    animate() {
        this.characterMovement();
        this.characterAnimation();
    }

    /**
     * Executes character movements at a fixed interval. Additionally, the camera position is updated based on the character's x position.
     */
    characterMovement() {
        let movementInterval = setInterval(() => {
            this.characterDead();
            this.characterHurt();
            this.characterJump();
            this.characterMoveLeft();
            this.characterMoveRight();
            this.characterIdle();

            this.world.camera_x = -this.x + 100
        }, 1000 / 60);
    }

    /**
     * Moves the character to the right if the right arrow key is pressed and the character is within the level boundaries and plays sound accordingly.
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.walkLeft();
        }
        this.manageWalkingSound();
    }

    /**
     * Moves the character to the left if the left arrow key is pressed and the character is within the level boundaries and plays sound accordingly.
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.walkRight();
        }
        this.manageWalkingSound();
    }

    /**
     * Performs the character's jumping action if the SPACE key is pressed and the character is not above the ground, character wakes up, jumps, and plays a jumping sound effect.
    */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.wakeUp();
            this.jump();
            this.sounds.playSound(this.sounds.jumping_sound);
        }
    }

    /**
     * Handles the character's idle state, playing stopping sound, based on keypresses and being hit or not.
     */
    characterIdle() {
        if (this.aKeyWasPressed() || this.isHitForHurt === true) {
            this.sounds.stopSound(this.sounds.long_idle_sound);
            this.wakeUp();
            this.awake = true;
            this.lastKeyPressTime = Date.now();
        } else if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime >= 10000)) {
            this.sounds.playSound(this.sounds.long_idle_sound);
            this.awake = false;
        }
    }

    /**
     * Plays a hurt sound if the character is marked as being hurt, and resets the isHitForHurt flag after 500ms.
     */
    characterHurt() {
        if (this.isHitForHurt === true) {
            this.sounds.playSound(this.sounds.isHurt_sound);
        }
        setTimeout(() => { this.isHitForHurt = false; }, 500);
    }


    /**
     * Checks if the character is dead and plays the appropriate sounds.
     */
    characterDead() {
        if (this.energy === 0) {
            this.sounds.stopSound(this.sounds.walking_sound);
            this.sounds.stopSound(this.sounds.isHurt_sound);
            this.sounds.playSound(this.sounds.character_dying_sound);
        }
    }

    /**
     * Executes the character animation by calling the necessary animation functions at regular intervals, includes animating the character's dead state, hurt state, idle state, walking state, and jumping state.
     */
    characterAnimation() {
        let animationInterval = setInterval(() => {
            if (this.energy <= 0 && (this.deathFrame <= CHARACTER_DEAD.length - 1)) {
                this.playAnimation(CHARACTER_DEAD);
                this.deathFrame++;
                setTimeout(() => { this.stopGameAfterDying(); }, 2000);
            }
            else if (this.isHitForHurtAnimation === true) {
                this.playAnimation(CHARACTER_HURT);
                setTimeout(() => { this.isHitForHurtAnimation = false; }, 500);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(CHARACTER_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(CHARACTER_WALKING);
            } else if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime >= 10000)) {
                this.playAnimation(CHARACTER_LONG_IDLE);
            } else {
                this.playAnimation(CHARACTER_IDLE);
            }
        }, 50);
    }

    // if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime <= 10000)) {
    //     

    characterHit() {
        if (!this.immune) {
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.immune = true;
            setTimeout(() => {
                this.immune = false;
            }, 2500);
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Loads the idle character image and sets the character's state to awake.
     */
    wakeUp() {
        this.sounds.stopSound(this.sounds.long_idle_sound);
        this.awake = true;
    }

    manageWalkingSound() {
        const isMovingLeft = this.world.keyboard.LEFT && this.x > 0;
        const isMovingRight = this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;

        if (isMovingLeft || isMovingRight) {
            if (!this.isWalkingSoundPlaying) {
                this.sounds.playSound(this.sounds.walking_sound);
                this.isWalkingSoundPlaying = true;
            }
        } else {
            if (this.isWalkingSoundPlaying) {
                this.sounds.stopSound(this.sounds.walking_sound);
                this.isWalkingSoundPlaying = false;
            }
        }
    }

    /**
     * Makes the character walk right.
     */
    walkRight() {
        this.moveRight();
        this.wakeUp();
        this.otherDirection = false;
    }

    /**
     * Makes the character walk left.
     */
    walkLeft() {
        this.moveLeft();
        this.wakeUp();
        this.otherDirection = true;
    }


    /**
     * Stops the game after the character dies.
     */
    stopGameAfterDying() {
        this.showLostOverlay();
    }

    /**
     * Displays the lost overlay by playing the "you_lose_sound" sound,
     * setting a timeout to mute all sounds and clear all intervals after 500ms,
     * removing the 'd-none' class from the 'lostOverlay' element and adding the 'flex' class.
     */
    showLostOverlay() {
        document.getElementById('lostOverlay').classList.remove('d-none');
        document.getElementById('lostOverlay').classList.add('flex');
        document.getElementById('lostOverlay').classList.add('you-lost');
        setTimeout(() => {
            this.sounds.muteAllSounds();
            this.sounds.playSound(this.sounds.you_lose_sound);
            clearAllIntervalsAndTimeouts();


            // Check if all intervals are cleared
            if (allIntervalsCleared) {
                console.log("Verified: All intervals and timeouts are cleared.");
            } else {
                console.log("There are still some intervals or timeouts running.");
            }

        }, 500);
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
