class World {
    fullscreenOn = false;
    charactersBottles = 0;
    charactersCoins = 0;
    buyBottleTriggered = false;


    constructor(canvas, keyboard) {
        this.character = new Character();
        this.statusBarHealth = new StatusBarHealth();
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
        this.lastBottleThrowTime = 0;
        this.bottleThrowCooldown = 500;

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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.buyBottleTriggered = false;
        }, 50);
    }

    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.D && currentTime - this.lastBottleThrowTime > this.bottleThrowCooldown)
        // && !this.character.isAboveGround()
        // && this.charactersBottles > 0
        {
            let xOffset = 80;
            let yOffset = 120;

            // Adjust the xOffset based on the direction the character is facing
            if (this.character.otherDirection) {
                xOffset = -xOffset + 100; // If facing left, offset should be negative
            }

            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + yOffset, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.decreaseStatusBar(this.statusBarBottles, 20);
            this.charactersBottles--;
            this.lastBottleThrowTime = currentTime;
        }
    }

    checkCollisions() {
        this.collectBottle();
        this.collectCoin();
        if (!this.buyBottleTriggered) {
            this.buyBottle();
            this.buyBottleTriggered = true; // Set flag to true after calling buyBottle()
        }

        this.characterJumpingOnEnemy();
        this.characterThrowsBottle();
        this.enemyHurtsCharacter();
    }


    characterJumpingOnEnemy() {

        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromTop(enemy) && !(enemy instanceof Endboss)) {
                enemy.isDead = true;
                console.log('one enemy dying');
                this.characterKillsEnemy(enemy);
            }
        });
    }

    characterThrowsBottle() {
        this.throwableObjects.forEach((bottle, index) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isCollidingFromSide(enemy) && !(enemy instanceof Endboss)) {
                    enemy.isDead = true;
                    this.throwableObjects.splice(index, 1);

                    console.log('charactersBottles: ', this.charactersBottles);
                } else if (bottle.isCollidingFromSide(enemy) && (enemy instanceof Endboss)) {
                    console.log('Endboss hit detected');

                    this.endboss.hit(10);
                    this.statusBarEndboss.setPercentage(this.endboss.energy);
                    console.log('endboss was hit and now has ', this.endboss.energy);

                    // Remove the bottle after hitting the endboss
                    this.throwableObjects.splice(index, 1);
                }
            });
        });
    }

    characterKillsEnemy(killedEnemy) {
        this.level.enemies = this.level.enemies.filter((enemy) => enemy !== killedEnemy);
        console.log('number of remaining enemies:', this.level.enemies.length);
    }

    enemyHurtsCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromSide(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);

                // if (this.character.energy <= 0) {
                //     console.log('Game Over');

                // }
            };
        }
        );
    }

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

    buyBottle() {
        if (this.keyboard.B && this.charactersCoins >= 5) {
            console.log('charactersCoins before are: ', this.charactersCoins);

            this.charactersCoins -= 5;
            this.statusBarCoins.setCoins(this.charactersCoins);
            console.log('charactersCoins after are: ', this.charactersCoins);


            console.log('charactersBottles before: ', this.charactersBottles);
            this.increaseStatusBar(this.statusBarBottles, 20);
            this.charactersBottles++;
            console.log('charactersBottles after: ', this.charactersBottles);
        }
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


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);



        // ------------  space for fixed objects ----------------

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);


        this.addToMap(this.audioHandler);
        this.addToMap(this.fullscreenHandler);


        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addObjectsToMap(this.level.enemies);

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
