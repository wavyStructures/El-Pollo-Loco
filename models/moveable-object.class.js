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

    moveRight(){
        console.log('moving right');
    }

    moveLeft(){
        setInterval(() => {    //ich möchte das das immer wieder gemacht wird
            this.x -= this.speed;
        }, 1000 / 60);    //damit es 60mal pro Sekunde ausgeführt wird
    }

    jump() {

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




















