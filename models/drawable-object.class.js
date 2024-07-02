class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            // console.log("images array img is", img);
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        } catch (error) {
            console.warn('loading img failed: ', error);
            console.log('img : ', this.img);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
// drawOffsetFrame(ctx) {
//     if (this instanceof Character || this instanceof Chicken) {
//         ctx.beginPath();
//         ctx.lineWidth = '3';
//         ctx.strokeStyle = 'red';
//         ctx.rect(this.offset);
//         // ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.stroke();
//     }

// }
