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
    energy = 100;
    speed = 5;
    hitCount = 0;
    hadFirstContact = false;
    isDead = false;

    /**
     * Constructor for initializing the Endboss with sounds, image, energy, and animation.
     *
     * @param {type} sounds - The sounds for the Endboss.
     * @return {type} description of return value
     */
    constructor(sounds) {
        super();
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.sounds = sounds;
        this.loadEndbossImages();
        this.x = 2500;
        this.energy = 100;
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
     * Checks if the character in the world has reached a certain x-coordinate to indicate the first contact.
     *
     * @return {boolean} Returns true if the character's x-coordinate is greater than or equal to 2200, false otherwise.
     */
    checkFirstContact() {
        return world.character.x >= 2200;
    }

    /**
     * Animates the endboss by continuously checking its energy level, hurt status, and first contact with the character.
     * If the endboss's energy is zero, it logs a message and plays the dead animation.
     * If the endboss is hurt, it plays the hurt animation.
     * If the endboss has had first contact with the character, it plays the attack animation.
     * Otherwise, it plays the walking animation.
     * The animation is updated every 200 milliseconds.
     *
     * @return {void}
     */
    animate() {
        this.endbossInterval = setInterval(() => {
            if (this.energy === 0) {
                console.log('endboss ZERO ENERGY');
                this.deadAnimation();
            }
            else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.checkFirstContact()) {
                this.attackAnimation();
            }
            else {
                this.playAnimation(ENDBOSS_WALKING);
            }
        }, 200);
    }

    deadAnimation() {
        setInterval(() => {
            this.playAnimation(ENDBOSS_DEAD);
        }, 200);
        this.isDead = true;  // Add a flag to indicate the boss is dead
        setTimeout(() => { this.endOfGame(); }, 1500);
    }

    /**
     * Ends the game by clearing the endboss interval and showing the win overlay.
    */
    endOfGame() {
        clearInterval(this.endbossInterval);
        this.showWinOverlay();
    }

    /**
     * Plays the ENDBOSS_HURT animation and plays the endboss hurt sound.
    */
    hurtAnimation() {
        this.playAnimation(ENDBOSS_HURT);
        this.sounds.playSound(this.sounds.endboss_hurt_sound);
    }

    /**
     * Executes the attack animation by playing the ENDBOSS_ATTACK animation,
     * making the character jump, and moving the character to the left.
     */
    attackAnimation() {
        this.playAnimation(ENDBOSS_ATTACK);
        this.jump();
        this.walkLeft();
    }

    /**
     * Moves the character left.
    */
    walkLeft() {
        this.moveLeft();
    }

    /**
     * Displays the win overlay by playing the "you_lose_sound" sound,
     * setting a timeout to mute all sounds and clear all intervals after 1000ms,
     * removing the 'd-none' class from the 'winOverlay' element and adding the 'flex' class,
     * and adding the 'd-none' class to the 'startScreenAndCanvas' element.
     */
    showWinOverlay() {
        this.sounds.playSound(this.sounds.you_lose_sound);
        setTimeout(() => {
            this.sounds.muteAllSounds();
            clearAllIntervals();
        }, 3000);
        document.getElementById('winOverlay').classList.remove('d-none');
        document.getElementById('winOverlay').classList.add('flex');
        document.getElementById('startScreenAndCanvas').classList.add('d-none');
    }
}