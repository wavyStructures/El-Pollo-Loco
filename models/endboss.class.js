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


    constructor() {
        super();
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadEndbossImages();
        this.x = 2500;
        this.energy = 100;
        console.log('endboss energy at constructor: ', this.energy);
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

        let endbossInterval = setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(ENDBOSS_DEAD);
                clearInterval(endbossInterval);
                this.showWinOverlay();

            } else if (this.isHurt()) {
                console.log('Endboss is hurt');
                this.playAnimation(ENDBOSS_HURT);

            } else if (this.checkFirstContact()) {
                this.playAnimation(ENDBOSS_ATTACK);
                this.jump();
                this.walkLeft();

            } else {
                this.playAnimation(ENDBOSS_WALKING);
            }
        }, 200);
    }

    hurtAnimation() {
        // Implement hurt animation logic
        console.log('Endboss hurt animation');
    }

    deadAnimation() {
        // Implement dead animation logic
        console.log('Endboss dead animation');
    }



    walkLeft() {
        this.moveLeft();
    }

    showWinOverlay() {
        document.getElementById('winOverlay').classList.remove('d-none');
        document.getElementById('winOverlay').classList.add('flex');
    }

}




// basicAnimationEndboss() {

//     let i = 0;
//     setInterval(() => {
//         if (i < 10) { this.playAnimation(this.ENDBOSS_WALKING); } else {
//             this.playAnimation(this.ENDBOSS_ATTACK);
//         }
//         i++;
//         if (!this.hadFirstContact) {
//             i = 0;
//             this.hadFirstContact = true;
//             this.playAnimation(this.ENDBOSS_ATTACK);
//         }
//     }, 200);
// }