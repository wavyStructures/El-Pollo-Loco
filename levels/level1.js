let level1;
function initLevel1() {

    level1 = new Level(
        [],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719),
            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 0),

            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719),
            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 2),

            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 4),

            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/4_clouds/air.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 6),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 6),
        ]
        ,
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        sounds
    );
}