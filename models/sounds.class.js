class Sounds {

    constructor() {
        this.allSounds = [
            this.background_music_sound = new Audio('./audio/jarabe-tapatio-mariachi.mp3'),
            this.come_on_sound = new Audio('./audio/come_on.mp3'),
            this.bottle_sound = new Audio('./audio/bottle.mp3'),
            this.buy_bottle_sound = new Audio('./audio/buy_bottle.mp3'),
            this.coin_sound = new Audio('./audio/coin.mp3'),
            this.walking_sound = new Audio('./audio/walking.mp3'),
            this.jumping_sound = new Audio('./audio/jump.mp3'),
            this.long_idle_sound = new Audio('./audio/long_idle.mp3'),
            this.isHurt_sound = new Audio('./audio/male-hurt.mp3'),
            this.character_dying_sound = new Audio('./audio/character_dying.mp3'),
            this.small_chicken_dies_sound = new Audio('./audio/small_chicken_dies.mp3'),
            this.chicken_sound = new Audio('./audio/chicken.mp3'),
            this.chicken_dead_sound = new Audio('./audio/chicken_dead.mp3'),
            this.endboss_alert_sound = new Audio('./audio/endboss_alert.mp3'),
            this.endboss_hit_sound = new Audio('./audio/endboss_hit.mp3'),
            this.endboss_hurt_sound = new Audio('./audio/endboss_hurt.mp3'),
            this.endboss_dying_sound = new Audio('./audio/endboss_dying.mp3'),
            this.you_lose_sound = new Audio('./audio/you_lose.mp3'),
            this.you_win_sound = new Audio('./audio/you_win.mp3')
        ];
    }



    /**
     *  plays a sound if the variable audioMute is not active; otherwise the sound is paused.
     * @param {audioElement} sound 
     */
    playSound(sound) {
        if (!audioMute) {
            sound.play();
        } else {
            sound.pause();
        }
    }
}

// const sounds = new Sounds();
// export default sounds;