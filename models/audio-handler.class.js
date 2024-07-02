class AudioHandler extends MoveableObject {
    width = 20;
    height = 20;
    y = 70;
    x = 240;
    canvas;
    audioOnImage = '../img/audio_on.svg';
    audioOffImage = '../img/audio_off.svg';

    constructor(canvas, audioOn) {
        super();
        this.canvas = canvas;
        this.audioOn = audioOn;
        this.loadImage(this.audioOn ? this.audioOnImage : this.audioOffImage);
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick(e) {
        if (this.isMouseOverButton(e.offsetX, e.offsetY)) {
            this.turnAudioOnAndOff();
        }
    }

    turnAudioOnAndOff() {
        this.audioOn = !this.audioOn;
        world.audioOnOff = this.audioOn;
        this.loadImage(this.audioOn ? this.audioOnImage : this.audioOffImage);
        localStorage.setItem('audioOnOff', JSON.stringify(world.audioOnOff));

        // Pause walking sound for world.character if audio is turned off
        if (this.audioOn && world.character && world.character.walking_sound) {
            world.character.walking_sound.play();
        } else if (!this.audioOn && world.character && world.character.walking_sound) {
            world.character.walking_sound.pause();
        }
    }
}




