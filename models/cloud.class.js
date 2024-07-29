class Cloud extends MoveableObject {

    y = 20;
    height = 250;
    width = 500;
    static lastCloudX = 50;

    /**
     * Initializes a new Cloud object.
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.setClouds();
        this.moveClouds();  //brauche eine Funktion die x reduziert
    }

    /**
     * Sets the position of the cloud and updates the last cloud position.
     */
    setClouds() {
        this.x = Cloud.lastCloudX + 250;
        Cloud.lastCloudX += this.width + 50 + Math.random() * 50;
    }
    /**
     * Moves the clouds to the left by updating the x-coordinate at a certain interval.
     */
    moveClouds() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}
