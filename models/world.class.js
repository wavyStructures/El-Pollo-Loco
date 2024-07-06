class World {
    fullscreenOn = false;
    charactersBottles = 0;
    charactersCoins = 0;



    constructor(canvas, keyboard) {
        this.character = new Character();
        this.statusBar = new StatusBar();
        this.statusBarCoins = new StatusBarCoins();
        this.statusBarBottles = new StatusBarBottles();
        this.statusBarEndboss = new StatusBarEndboss();

        this.level = level1;
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss); // Find the endboss in the level

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

    }

    // setIcons() {
    //     // this.fullScreen = new FullScreen(this.canvas);
    //     this.audioHandler = new AudioHandler(this.canvas, this.audioOn);
    // }

    collectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.increaseStatusBar(this.statusBarBottles, 20);
                this.charactersBottles++;
                console.log('charactersBottles: ', this.charactersBottles);
                this.level.bottles.splice(index, 1);
            }
        })
    }

    collectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.increaseStatusBar(this.statusBarCoins, 20);
                this.level.coins.splice(index, 1);
                console.log('charactersCoins: ', this.charactersCoins);
                this.charactersCoins++;
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
        if (this.keyboard.D
            // && !this.character.isAboveGround()
            // && this.amountOfBottles > 0
        ) {
            let xOffset = 80;
            let yOffset = 120;

            // Adjust the xOffset based on the direction the character is facing
            if (this.character.otherDirection) {
                xOffset = -xOffset + 100; // If facing left, offset should be negative
            }

            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + yOffset, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            // decreaseStatusBar(this.statusBarBottles, 20);
            // this.amountOfBottles--;


        }
    }

    checkCollisions() {
        this.collectBottle();
        this.collectCoin();

        this.characterJumpingOnEnemy();
        this.enemyHurtsCharacter();
    }



    enemyHurtsCharacter() {
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
    }



    characterJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround() && this.character.isColliding(enemy)) {
                enemy.isDead = true;
            }
        });
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


        if (this.endboss) {
            // console.log(`Endboss position: ${this.endboss.x}, Camera position: ${this.camera_x}`);
            // console.log(`Is Endboss visible? ${this.endboss.isVisible(this.camera_x, this.canvas.width)}`);
        }

        if (this.endboss && this.endboss.isVisible(this.camera_x, this.canvas.width)) {
            console.log('Drawing statusBarEndboss');
            this.addToMap(this.statusBarEndboss);
        }

        this.addToMap(this.audioHandler);
        this.addToMap(this.fullscreenHandler);

        // if (this.endboss.isVisible(this.camera_x, this.canvas.width)) {
        //     this.addToMap(this.statusBarEndboss);
        // }


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

    // drawFixedObjects() {

    // }

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

    decreaseStatusBar(statusBar, value) {
        statusBar.percentage -= value;
        statusBar.setPercentage(statusBar.percentage);
    }
}
//mo = moveableObject
