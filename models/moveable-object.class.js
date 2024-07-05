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

    //character.isColliding(chicken)
    // Bessere Formel zur Kollisionsberechnung (Genauer)
    // isColliding (obj) {
    //     return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
    //             (this.Y + this.offsetY + this.height) >= obj.Y &&
    //             (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    // }
    isColliding(mo) {
        //     return this.x + this.width > mo.x &&
        //         this.y + this.height > mo.y &&
        //         this.x < mo.x &&
        //         this.y < mo.y + mo.height
        // }


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

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            // console.log(this.lastHit);
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

    wakeUp() {
        this.long_idle_sound.pause();
    }
    //aufrufen mit: this.wakeUp();  NOCH AUFRUFEN!!!

}

