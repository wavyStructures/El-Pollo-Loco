class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     *
     * @param {type} path - The path of the image to load.
     * @return {type} undefined
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of image paths and stores them in the image cache.
     * @param {Array<string>} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image (this.img) on the canvas using the specified context (at position this.x and this.y).
     * @param {CanvasRenderingContext2D, HTML 5 element} ctx - The context to draw on.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        } catch (error) {
            console.warn('loading img failed: ', error);
            console.log('img : ', this.img);
        }
    }

    /**
     * Draws a frame around the object if it is an instance of certain classes.
     * @param {CanvasRenderingContext2D} ctx - The context to draw on.
     */
    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            // this instanceof smallChicken ||
            this instanceof Coin ||
            this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top
            );
            ctx.stroke();
        }
    }
}