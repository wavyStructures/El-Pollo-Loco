class FullScreen extends MoveableObject {
    width = 20;
    height = 20;

    y = 30;
    x = 670;

    canvas;
    world;

    isHovered = false;


    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage('../img/fullscreen.svg');
        this.world = world;
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }


    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }


    handleClick(event) {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.canvas.requestFullscreen();
            this.world.fullscreenOn = true;

            localStorage.setItem('fullscreenOn', JSON.stringify(this.world.fullscreenOn));
        }
    }
}
