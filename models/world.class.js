class World {
    statusBarHealth;
    statusBarCoins
    statusBarBottles;
    statusBarEndboss;
    charactersBottles = 0;
    charactersCoins = 0;
    buyBottleTriggered = false;
    throwableObjects = [];
    lastBottleThrowTime = 0;
    bottleThrowCooldown = 500;

    /**
     * Constructor function for creating a new World instance.
     * @param {Canvas} canvas - The canvas element to render the world on.
     * @param {Sounds} sounds - The sounds object for audio in the world.
     * @param {Keyboard} keyboard - The keyboard object for user input.
     */
    constructor(canvas, sounds, keyboard) {
        this.character = new Character(sounds);
        this.level = level1;
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.sounds = sounds;
        this.camera_x = 0;
        this.startWorld();
    }

    /**
     * Starts the world by adding status bars, drawing the world, setting the world, and running the world.
     */
    startWorld() {
        this.addStatusBars();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Initializes the status bars for the game, creates and assigns new instances of the StatusBarHealth, StatusBarCoins,
     * StatusBarBottles, and StatusBarEndboss classes to the corresponding instance variables.
     */
    addStatusBars() {
        this.statusBarHealth = new StatusBarHealth();
        this.statusBarCoins = new StatusBarCoins();
        this.statusBarBottles = new StatusBarBottles();
        this.statusBarEndboss = new StatusBarEndboss();
    }

    /**
     * Sets the world of the character to the current object.
     * This function assigns the current object to the `world` property of the `character` object.
     * This allows the character to access the world and its properties.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Executes a series of game actions at a regular interval.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.buyBottleTriggered = false;
            this.checkDeadEnemies();
        }, 50);
    }

    /**
     * Checks if conditions are met to throw a bottle and initiates the bottle throw process.
     */
    checkThrowObjects() {
        let currentTime = Date.now();
        if (this.keyboard.D && currentTime - this.lastBottleThrowTime > this.bottleThrowCooldown && !this.character.isAboveGround()
            && this.charactersBottles > 0) {
            let xOffset = 80;
            let yOffset = 120;
            if (this.character.otherDirection) {
                xOffset = -xOffset + 100;
            }
            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + yOffset, this.character.otherDirection, sounds);
            this.throwableObjects.push(bottle);
            this.decreaseStatusBar(this.statusBarBottles, 20);
            this.charactersBottles--;
            this.lastBottleThrowTime = currentTime;
        }
    }

    /**
     * Checks for collisions between different elements in the game world.
     */
    checkCollisions() {
        this.collectBottle();
        this.collectCoin();
        if (!this.buyBottleTriggered) {
            this.buyBottle();
            this.buyBottleTriggered = true;
        }
        this.characterJumpingOnEnemy();
        this.characterThrowsBottle();
        this.enemyHurtsCharacter();
    }

    /**
     * Checks if the character is colliding from the top with an enemy.
     * If the enemy is not an instance of Endboss, it is marked as dead,
     * a sound is played, and the character kills the enemy.
     */
    characterJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromTop(enemy) && (this.character.isFalling()) && !(enemy instanceof Endboss)) {
                enemy.isDead = true;
                this.sounds.playSound(this.sounds.chicken_dead_sound);
                this.characterKillsEnemy(enemy);
            }
        });
    }

    /**
     * Checks if the character's bottles are colliding with enemies.
     */
    characterThrowsBottle() {
        this.throwableObjects.forEach((bottle, index) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isCollidingFromSide(enemy) && !(enemy instanceof Endboss)) {
                    enemy.isDead = true;
                    this.throwableObjects.splice(index, 1);
                    console.log('charactersBottles: ', this.charactersBottles);

                } else if (bottle.isCollidingFromSide(enemy) && enemy instanceof Endboss) {
                    this.endboss.hit(10);
                    this.statusBarEndboss.setPercentage(this.endboss.energy);
                    this.throwableObjects.splice(index, 1);
                }
            });
        });
    }

    /**
     * Removes the killedEnemy from the level's list of enemies.
     * @param {Object} killedEnemy - The enemy to be removed from the list.
     * @return {Array} The updated list of enemies after removing the killedEnemy.
     */
    characterKillsEnemy(killedEnemy) {
        this.level.enemies = this.level.enemies.filter((enemy) => enemy !== killedEnemy);
    }

    /**
     * Iterates over each enemy in the level to check if the character is colliding with them. If a collision is detected, the character gets hit and the health status is updated on the status bar.
     */
    enemyHurtsCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromSide(enemy)) {
                this.character.characterIsHit();
                this.statusBarHealth.setPercentage(this.character.energy);
            };
        }
        );
    }

    /**
     * Checks if any enemies in the level are dead and removes them from the level after a delay of 18000 milliseconds.
     * This function iterates over each enemy in the level using the `forEach` method. If an enemy is not an instance of `Endboss` and is dead, it is removed from the level using the `splice` method.
      */
    checkDeadEnemies() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (!(enemy instanceof Endboss) && enemy.isDead) {
                    this.level.enemies.splice(index, 1)
                }
            });
        }, 18000);
    }

    /**
     * Collects bottles based on character collision, updates status bar, and plays bottle sound.
     */
    collectBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.increaseStatusBar(this.statusBarBottles, 20);
                this.charactersBottles++;
                this.level.bottles.splice(index, 1);
                this.sounds.playSound(this.sounds.bottle_sound);
            }
        })
    }

    /**
     * Buys a bottle if the "B" key is pressed and enough coins are available.
     */
    buyBottle() {
        if (this.keyboard.B && this.charactersCoins >= 5) {
            this.charactersCoins -= 5;
            this.statusBarCoins.setCoins(this.charactersCoins);
            this.increaseStatusBar(this.statusBarBottles, 20);
            this.charactersBottles++;
            this.sounds.playSound(this.sounds.buy_bottle_sound);
        }
    }

    /**
     * Collects coins based on character collision, updates status bar, and plays coin sound.
     */
    collectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.increaseStatusBar(this.statusBarCoins, 20);
                this.level.coins.splice(index, 1);
                this.charactersCoins++;
                this.sounds.playSound(this.sounds.coin_sound);
            }
        })
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackgroundObjects();

        this.ctx.translate(-this.camera_x, 0);
        // ------------  space for fixed objects ----------------
        this.drawFixedObjects();
        // ------------  space for more moving objects ----------------
        this.ctx.translate(this.camera_x, 0);
        this.drawMoveableObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () { self.draw() });
    }

    /**
     * Draws the background objects on the map.
     * @param {Array} objects - The array of background objects to draw on the map.
     */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the fixed objects on the map.
     */
    drawFixedObjects() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws the moveable objects on the map.
     */
    drawMoveableObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds a moveable object to the map, potentially flipping its image horizontally and drawing it on the canvas.
     * @param {Object} mo - The moveable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The moveable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the image back to its original state by restoring the canvas context.
     * @param {Object} mo - The moveable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Increases the percentage of the given status bar by the specified value.
     * @param {Object} statusBar - The status bar object to increase.
     * @param {number} value - The value to increase the percentage by.
     */
    increaseStatusBar(statusBar, value) {
        statusBar.percentage += value;
        statusBar.setPercentage(statusBar.percentage);
    }

    /**
     * Decreases the percentage of the given status bar by the specified value.
     * @param {Object} statusBar - The status bar object to decrease.
     * @param {number} value - The value to decrease the percentage by.
     */
    decreaseStatusBar(statusBar, value) {
        statusBar.percentage -= value;
        statusBar.setPercentage(statusBar.percentage);
    }
}