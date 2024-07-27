class Level {

    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    sounds;
    level_end_x = 2400;

    /**
     * Constructor for initializing enemies, clouds, background objects, coins, bottles, and sounds.
     * @param {type} enemies - The enemies to be initialized.
     * @param {type} clouds - The clouds to be initialized.
     * @param {type} backgroundObjects - The background objects to be initialized.
     * @param {type} coins - The coins to be initialized.
     * @param {type} bottles - The bottles to be initialized.
     * @param {type} sounds - The sounds to be initialized.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, sounds, world) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.world = world;
        this.sounds = sounds;
        this.createEnemies();
    }

    /**
     * Creates an array of enemies with the specified sounds.
     */
    createEnemies() {
        this.enemies = [
            new Chicken(this.sounds),
            new Chicken(this.sounds),
            new Chicken(this.sounds),
            new Chicken(this.sounds),
            new Chicken(this.sounds),
            new Chicken(this.sounds),
            new SmallChicken(this.sounds),
            new SmallChicken(this.sounds),
            new SmallChicken(this.sounds),
            new SmallChicken(this.sounds),
            new SmallChicken(this.sounds),
            new Endboss(this.sounds, this.world)
        ];
    }
}