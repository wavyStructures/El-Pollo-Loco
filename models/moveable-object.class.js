class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
    }

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };


    isColliding(mo) {
        let thisLeft = this.x + this.offset.left;
        let thisRight = this.x + this.width - this.offset.right;
        let thisTop = this.y + this.offset.top;
        let thisBottom = this.y + this.height - this.offset.bottom;

        let moLeft = mo.x + mo.offset.left;
        let moRight = mo.x + mo.width - mo.offset.right;
        let moTop = mo.y + mo.offset.top;
        let moBottom = mo.y + mo.height - mo.offset.bottom;

        return thisRight > moLeft &&
            thisBottom > moTop &&
            moRight > thisLeft &&
            moBottom > thisTop;
    }

    isCollidingFromSide(mo) {
        let isCollidingFromLeft = this.x + this.width - 10 >= mo.x &&
            this.x + this.width - 10 <= mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        let isCollidingFromRight = this.x + 10 <= mo.x + mo.width &&
            this.x + 10 >= mo.x &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
        // console.log('isCollidingFromLeft, isCollidingFromRight:', isCollidingFromLeft, isCollidingFromRight);
        return isCollidingFromLeft || isCollidingFromRight;
    }

    isCollidingFromTop(mo) {
        let isCollidingFromTop = this.y + this.height >= mo.y &&
            this.y + this.height <= mo.y + mo.height &&
            this.x + 50 < mo.x + mo.width &&
            this.x + this.width - 50 > mo.x;
        // console.log('isCollidingFromTop:', isCollidingFromTop);
        return isCollidingFromTop;
    }



    hit(loss = 5) {
        this.energy -= loss;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            if (this instanceof Endboss) {
                this.hitCount++;
                this.hurtAnimation();
                if (this.hitCount >= 5) {
                    this.energy = 0;
                    this.deadAnimation();
                }
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;   //difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {  //should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    // wakeUp() {
    //     this.playAnimation(this.IMAGES_WALKING);
    //     this.long_idle_sound.pause();
    // }
    //aufrufen mit: this.wakeUp();  NOCH AUFRUFEN!!!

}

