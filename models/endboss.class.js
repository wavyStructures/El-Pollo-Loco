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

    constructor(sounds) {
        super();
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.sounds = sounds;
        this.loadEndbossImages();
        this.x = 2500;
        this.energy = 100;
        this.animate();
    }

    loadEndbossImages() {
        this.loadImages(ENDBOSS_WALKING);
        this.loadImages(ENDBOSS_ALERT);
        this.loadImages(ENDBOSS_ATTACK);
        this.loadImages(ENDBOSS_HURT);
        this.loadImages(ENDBOSS_DEAD);
    }

    checkFirstContact() {
        return world.character.x >= 2200;
    }

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

    endOfGame() {
        clearInterval(this.endbossInterval);
        this.showWinOverlay();
    }

    hurtAnimation() {
        this.playAnimation(ENDBOSS_HURT);
        this.sounds.playSound(this.sounds.endboss_hurt_sound);
    }

    attackAnimation() {
        this.playAnimation(ENDBOSS_ATTACK);
        this.jump();
        this.walkLeft();
    }

    walkLeft() {
        this.moveLeft();
    }

    showWinOverlay() {

        this.sounds.playSound(this.sounds.you_lose_sound);
        document.getElementById('winOverlay').classList.remove('d-none');
        document.getElementById('winOverlay').classList.add('flex');

        document.getElementById('startScreenAndCanvas').classList.add('d-none');
    }

}

