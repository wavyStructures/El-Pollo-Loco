class StatusBarBottles extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    /**
     * Constructor for initializing the status bar bottles with images, position, width, height, and percentage.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value and updates the image path accordingly.
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to be used based on the percentage value.
     @return {number} The index of the image to be used.
     */
    resolveImageIndex() {

        // if (this.percentage > 100) {
        //     this.percentage = 100;
        // }
        if (this.percentage >= 100) {
            return 5;
        }
        else if (this.percentage == 80) {
            return 4;
        }
        else if (this.percentage == 60) {
            return 3;
        }
        else if (this.percentage == 40) {
            return 2;
        }
        else if (this.percentage == 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}