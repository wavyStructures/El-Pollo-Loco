class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Constructor for the BackgroundObject class.
     *
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x coordinate.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}