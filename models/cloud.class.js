class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 20;
    static lastCloudX = 50;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.setClouds();
        this.moveClouds();  //brauche eine Funktion die x reduziert
    }

    setClouds() {
        this.x = Cloud.lastCloudX + 250;
        Cloud.lastCloudX += this.width + 50 + Math.random() * 50;
    }
    moveClouds() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}
