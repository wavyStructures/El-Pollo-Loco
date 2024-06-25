class MoveableObject {
    x = 120;
    y = 280;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    

loadImage(path){
    this.img = new Image();
    this.img.src = path;
}

loadImages(arr){
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;         
      this.imageCache[path] = img;  
    })
}

draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken){
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}


playAnimation(images){
    let i = this.currentImage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
}

moveRight(){
    this.x += this.speed;
}

moveLeft(){
    this.x -= this.speed;   
}

jump() {
    this.speedY = 30;
    }

isAboveGround(){
    return this.y < 80;
}

applyGravity(){
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }else{
        // this.isJumping = false;
        this.speedY = 0;
    }
    }, 1000 / 25)   //25mal pro Sekunde
}


}





































// class MoveableObject extends DrawableObject {
//     speed = 0.15;

//     otherDirection = false;

//     speedY = 0;

//     acceleration = 2.5;

//     energy;

//     lastHit = 0;

//     long_idle_sound = new Audio ('audio/long_idle.mp3');

//     applyGravity() {
//         setInterval(()=> {
//             if (this.isAboveGround() || this.speedY > 0) {
//                 this.y -= this.speedY;
//                 this.speedY -= this.acceleration;
//             }

//         }, 1000 / 25);
//         }

// isAboveGround(){
//     if (this instanceof ThrowableObject) {
//         return this.y < 400;
//     } else {
//         return this.y < 150;
//     }
// }

// isColliding(mo) {
//     return this.x + this.width > mo.x &&
//         this.y + this.heigth > mo.y &&
//         this.x < mo.x &&
//         this.y < mo.y + mo.height;
// }

// isCollidingFromSide(mo){
//     let isCollidingFromLeft = this.x + this.width - 10 >= mo.x &&
//         this.x + this.width - 10 <= mo.x + mo.width &&
//         this.y < mo.y + mo.height &&
//         this.y + this.height > mo.y;
    
//     let isCollidingFromRight = this.x + 10 <= mo.x + mo.width &&
//         this.x + 10 >= mo.x &&
//         this.y < mo.y + mo.height &&
//         this.y + this.height > mo.y;
//     return isCollidingFromLeft || isCollidingFromRight;
// }

// isCollidingFromTop



    
// }




















