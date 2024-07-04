class World {
    fullscreenOn = false;
    amountOfBottles;
    amountOfCoins;



    constructor(canvas, keyboard) {
        this.character = new Character();
        this.statusBar = new StatusBar();
        this.statusBarCoins = new StatusBarCoins();
        this.statusBarBottles = new StatusBarBottles();
        this.level = level1;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.camera_x = 0;
        this.throwableObjects = [];

        this.audioOn = JSON.parse(localStorage.getItem('audioOn'));
        this.audioHandler = new AudioHandler(this.canvas, this.audioOn);

        this.fullscreenOn = JSON.parse(localStorage.getItem('fullscreenOn'));
        this.fullscreenHandler = new FullScreen(this.canvas);

        this.draw();
        this.setWorld();
        // this.setIcons();
        this.run();
    }

    setWorld() {
        this.character.world = this;   //hier wird der Charakter mit der Welt verbunden 
        this.amountOfCoins = 0;
        this.amountOfBottles = 0;
    }

    // setIcons() {
    //     // this.fullScreen = new FullScreen(this.canvas);
    //     this.audioHandler = new AudioHandler(this.canvas, this.audioOn);
    // }

    collectBottle() {

        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.increaseStatusBar(this.statusBarBottles, 20);
                this.level.bottles.splice(index, 1);
            }
        })
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);                                //wird jede fünftel-Sekunde für ALLE Gegner ausgeführt, also bei 5 Gegnern 5mal
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.amountOfBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.amountOfBottles--;

        }
    }

    checkCollisions() {
        this.collectBottle();
        this.level.enemies.forEach(
            (enemy) => {
                if (
                    this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);

                    // if (this.character.energy <= 0) {
                    //     console.log('Game Over');

                    // }
                };
            }
        );

        //wird jede Sekunde für ALLE Gegner ausgeführt, also bei 5 Gegnern 5mal
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        // ------------  space for fixed objects ----------------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        this.addToMap(this.audioHandler);
        this.addToMap(this.fullscreenHandler);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        // console.log('angekommen in addToMap ist unser mo:', mo);
        // console.log('und angekommen ist  mo.img:', mo);
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);        //weil ja Angelpunkt jetzt rechts oben, die Breite von Pepe einmal wegnehmen
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    increaseStatusBar(statusBar, value) {
        statusBar.percentage += value;
        statusBar.setPercentage(statusBar.percentage);
    }
}
//mo = moveableObject
