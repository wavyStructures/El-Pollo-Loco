class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 60;
    offset = {
        top: 80,
        bottom: 30,
        left: 15,
        right: 15
    }
    energy = 200;
    speed = 35;
    hitCount = 0;
    hadFirstContact = false;
    isDead = false;
    world;
    endbossInterval;


    /**
     * Constructor for initializing the Endboss with sounds, image, energy, and animation.
     * @param {type} sounds - The sounds for the Endboss.
     * @return {type} description of return value
     */
    constructor(sounds) {
        super();
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.world = world;
        this.sounds = sounds;
        this.loadEndbossImages();
        this.x = 2500;
        this.energy = 200;
        this.animate();
    }

    /**
     * Loads the images for different endboss animations including walking, alert, attack, hurt, and dead.
     */
    loadEndbossImages() {
        this.loadImages(ENDBOSS_WALKING);
        this.loadImages(ENDBOSS_ALERT);
        this.loadImages(ENDBOSS_ATTACK);
        this.loadImages(ENDBOSS_HURT);
        this.loadImages(ENDBOSS_DEAD);
    }

    /**
     * Checks if the character in the world has reached a certain x-coordinate to indicate the endboss is comming closer.
     * @return {boolean} Returns true if the character's x-coordinate is greater than or equal to 2000.
     */
    commingCloser() {
        return this.world.character.x >= 2000;
    }

    /**
     * Animates the endboss by continuously checking its energy level, hurt status, and first contact with the character.
     * If the endboss's energy is zero, it logs a message and plays the dead animation.
     * If the endboss is hurt, it plays the hurt animation.
     * If the endboss has had first contact with the character, it plays the attack animation.
     * Otherwise, it plays the walking animation.
     * The animation is updated every 200 milliseconds.
     */
    animate() {
        this.endbossInterval = setInterval(() => {
            if (this.energy == 0) {
                this.playAnimation(ENDBOSS_DEAD);
                this.deadAnimation();
            }
            else if (this.isHurt() && this.energy >= 125) {
                this.playAnimation(ENDBOSS_HURT);
                this.hurtAnimation();
                this.speedingUpWalk();
            } else if (this.energy <= 150) {
                this.playAnimation(ENDBOSS_WALKING);
                this.speedingUpWalk();
                this.attackAnimation();
            } else if (this.x <= this.world.character.x + 550 && this.x > 600) {
                this.playAnimation(ENDBOSS_ATTACK);
                setTimeout(() => { this.attackAnimation(); }, 1500);
            } else if (this.commingCloser()) {
                this.playAnimation(ENDBOSS_ALERT);
                this.sounds.playSound(this.sounds.endboss_alert_sound);
            } else {
                this.playAnimation(ENDBOSS_ALERT);
            }
        }, 200);
    }

    /**
     * Increases the speed of the endboss character while walking to the left by a random value between -0.05 and 0.05 of the base speed.
     * If the endboss is within a certain range of the character's x-coordinate, its speed is set to 0.
     * If a random number is less than 0.2, the character's speed is increased by 0.25.
     */
    speedingUpWalk() {
        this.walkLeft();
        const chickenSpeedVariation = (Math.random() * 0.1) - 0.05;
        const baseChickenSpeed = 0.14;
        this.speed += baseChickenSpeed + chickenSpeedVariation;
        if (Math.random() < 0.2) {
            this.world.character.speed += 0.25;
        }
        if (this.x >= 920 && this.x <= 1100 || this.x >= 320 && this.x <= 500) {
            if (Math.random() < 0.2) {
                this.speed = 0;
                setTimeout(() => {
                    this.speed = baseChickenSpeed + chickenSpeedVariation;
                }, 50);
            }
        }
    }

    /**
     * Increments the hit count of the end boss and performs actions based on the hit count.
     */
    endbossHitCount() {
        this.sounds.playSound(this.sounds.endboss_hit_sound);
        this.hitCount++;
        if (this.hitCount >= 10) {
            this.energy = 0;
        } else if (this.hitCount >= 6) {
            this.speedingUpWalk();
        }
    }

    /**
     * Plays the endboss dying sound and sets the isDead flag to true. After 1500 milliseconds, calls the endOfGame function.
     */
    deadAnimation() {
        this.isDead = true;
        this.sounds.playSound(this.sounds.endboss_dying_sound);
        setTimeout(() => { this.endOfGame(); }, 1500);
    }


    /**
     * Ends the game by clearing the endboss interval, if fullscreen is on removing fullscreen and showing the win overlay.
     */
    endOfGame() {
        clearInterval(this.endbossInterval);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => {
                console.warn("Could not exit fullscreen:", err);
            });
            fullscreenOn = !fullscreenOn;
        }
        this.showWinOverlay();
    }

    /**
     * Plays the ENDBOSS_HURT animation and plays the endboss hurt sound.
    */
    hurtAnimation() {
        this.sounds.playSound(this.sounds.endboss_hurt_sound);
    }

    /**
     * Executes the attack animation by playing the ENDBOSS_ATTACK animation,
     * making the character jump, and moving the character to the left.
     */
    attackAnimation() {
        this.jump();
        this.walkLeft();
    }

    /**
     * Displays the win overlay by playing the "you_lose_sound" sound, setting a timeout to mute all sounds and clear all intervals after 1000ms,
     * removing the 'd-none' class from the 'winOverlay' element and adding the 'flex' class, and adding the 'd-none' class to the 'startScreenAndCanvas' element.
     */
    showWinOverlay() {
        this.sounds.playSound(this.sounds.you_win_sound);
        setTimeout(() => {
            this.sounds.stopSound(this.sounds.you_win_sound);
        }, 3000);
        setTimeout(() => {
            clearAllIntervalsAndTimeouts();
        }, 1000);
        this.handleWinOverlay();
    }

    /**
     * Handles the win overlay by hiding mobile buttons, removing the 'd-none' class from the 'winOverlay' element, adding the 'flex' and 'you-won' classes to the 'winOverlay' element, and adding the 'd-none' class to the
     * 'startScreenAndCanvas' element.
     */
    handleWinOverlay() {
        document.getElementById('bottom-info-mobile').style.display = 'none'
        document.getElementById('winOverlay').classList.remove('d-none');
        document.getElementById('winOverlay').classList.add('flex');
        document.getElementById('winOverlay').classList.add('you-won');
        document.getElementById('startScreenAndCanvas').classList.add('d-none');
        document.body.classList.remove('game-on');
    }

    /**
     * Moves the end boss character left.
     */
    walkLeft() {
        if (this.x > this.world.character.x + 100) {
            this.moveLeft();
        }
    }
}