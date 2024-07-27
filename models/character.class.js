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
    isHit = false;
    isHitForHurt = false;
    isHitForHurtAnimation = false;
    awake = true;
    lastKeyPressTime = Date.now();
    deathFrame = 0;

    CHARACTER_WALKING = ['./img/2_character_pepe/2_walk/W-21.png', './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png', './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png', './img/2_character_pepe/2_walk/W-26.png'];

    CHARACTER_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    CHARACTER_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    CHARACTER_DEAD = ['./img/2_character_pepe/5_dead/D-51.png', './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png', './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png', './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    CHARACTER_IDLE = ['./img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    CHARACTER_LONG_IDLE = ['./img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    /**
     * Initializes the character with the provided sounds and sets up initial properties and actions.
     * @param {type} sounds - The sounds associated with the character.
     */
    constructor(sounds) {
        super();
        this.loadImage(this.CHARACTER_IDLE[0]);
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
        this.loadImages(this.CHARACTER_IDLE);
        this.loadImages(this.CHARACTER_LONG_IDLE);
        this.loadImages(this.CHARACTER_WALKING);
        this.loadImages(this.CHARACTER_JUMPING);
        this.loadImages(this.CHARACTER_HURT);
        this.loadImages(this.CHARACTER_DEAD);
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
        setInterval(() => {
            this.characterIdle();
            this.characterJump();
            this.characterHurt();
            this.characterDead();
            this.characterMoveLeft();
            this.characterMoveRight();

            this.world.camera_x = -this.x + 1
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
            this.sounds.playSound(this.sounds.walking_sound);
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

    characterAnimation() {
        /**
         * Executes the character animation by calling the necessary animation functions at regular intervals. This includes animating the character's dead state, hurt state,
         * idle state, walking state, and jumping state. The animation is executed every 200ms.
         */
        setInterval(() => {
            this.animateDead();
            this.animateHurt();
            this.handleIdleState();
            this.animateWalking();
            this.animateJumping();
        }, 200);
    }

    animateWalking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.CHARACTER_WALKING);
        }
    }

    animateJumping() {
        if (this.isAboveGround()) {
            this.playAnimation(this.CHARACTER_JUMPING);
        }
    }

    animateHurt() {
        if (this.isHitForHurtAnimation === true) {
            console.log('hurtFOR: ', this.isHitForHurtAnimation);
            console.log('inside anmiateHurt: ', this.energy);
            this.playAnimation(this.CHARACTER_HURT);
        }
        setTimeout(() => { this.isHitForHurtAnimation = false; }, 500);
    }

    animateDead() {
        if (this.energy <= 0 && (this.deathFrame <= this.CHARACTER_DEAD.length - 1)) {
            this.playAnimation(this.CHARACTER_DEAD);
            this.deathFrame++;
            setTimeout(() => { this.stopGameAfterDying(); }, 2000);
        }
    }

    handleIdleState() {


        // if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime <= 10000)) {
        //     this.playAnimation(this.CHARACTER_IDLE);


        //             } else 
        if (this.noKeyPressed() && (Date.now() - this.lastKeyPressTime >= 10000)) {
            this.playAnimation(this.CHARACTER_LONG_IDLE);
        }
    }

    // characterHitCount() {
    //     this.isHit = true;
    //     if (this.awake === false) {
    //         this.wakeUp();
    //     }
    //     this.sounds.playSound(this.sounds.isHurt_sound);
    //     this.cHhitCount++;
    //     if (this.cHhitCount % 3 === 0 || this.cHhitCount % 4 === 0) {
    //         this.hurtState = true;
    //     }
    //     setTimeout(() => {
    //         this.isHit = false;
    //     }, 1500);
    //     console.log('cHhitCount and hurtState', this.cHhitCount, this.hurtState);
    // }

    /**
     * Loads the idle character image and sets the character's state to awake.
     */
    wakeUp() {
        // this.hurtState = false;
        this.sounds.stopSound(this.sounds.long_idle_sound);
        this.playAnimation(this.CHARACTER_IDLE);
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
            clearAllIntervals();
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
