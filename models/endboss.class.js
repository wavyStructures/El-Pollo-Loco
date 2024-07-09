class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 60;
    energy = 100;
    speed = 5;


    IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = ['./img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    IMAGES_ATTACK = ['./img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',

    ]
    IMAGES_HURT = ['./img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',

    ]
    IMAGES_DEAD = ['./img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    hadFirstContact = false;



    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.energy = 100;
        console.log('endboss energy at constructor: ', this.energy);

        this.animate();
        // this.isVisible();
    }

    offset = {
        top: 80,
        bottom: 30,
        left: 15,
        right: 15
    }

    animate() {
        let endbossInterval = setInterval(() => {

            if (this.energy === 0) {
                console.log('endboss energy at if zero: ', this.energy);
                this.playAnimation(this.IMAGES_DEAD);
                // setTimeout(
                //     () => {
                //         clearInterval(endbossInterval);
                //         showWinOverlay();
                //     }, this.IMAGES_DEAD.length * 300);

            }


            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }


            else if (this.hit()) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.jump();
            }

            else if (this.hadFirstContact() && !this.hit()) {
                this.playAnimation(this.IMAGES_ALERT);
                this.walkLeft();
                this.hadFirstContact = true;
            }

            else {
                this.playAnimation(this.IMAGES_WALKING);
                // this.walkLeft();
            }
        }, 200);
    }

    walkLeft() {
        this.moveLeft();
    }

    hit() {
        this.energy -= 10; // Reduce energy by 10 for each hit
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    hadFirstContact() {
        return World.character.x >= 2200;
    }
}

// hit() {
//     this.energy -= 20;
//     this.isHurt = true;
//     setTimeout(() => this.isHurt = false, 1000);
// }

// isHurt() {
//     return this.isHurt;
// }

// animate() {
//     setInterval(() => {
//         if (this.isHurt) {
//             this.playAnimation(this.IMAGES_HURT);
//         } else if (this.isDead) {
//             this.playAnimation(this.IMAGES_DEAD);
//             characterWins();
//         } else {
//             basicAnimationEndboss();
//         }
//     }, 200);

// }



// basicAnimationEndboss() {

//     let i = 0;
//     setInterval(() => {
//         if (i < 10) { this.playAnimation(this.IMAGES_WALKING); } else {
//             this.playAnimation(this.IMAGES_ATTACK);
//         }
//         i++;
//         if (!this.hadFirstContact) {
//             i = 0;
//             this.hadFirstContact = true;
//             this.playAnimation(this.IMAGES_ATTACK);
//         }
//     }, 200);
// }