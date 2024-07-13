class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2400;
    sounds = new Sounds();


    constructor(enemies, clouds, backgroundObjects, coins, bottles, sounds) {

        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.sounds = sounds;
    }
}