// class FullScreen extends MoveableObject {
//     width = 20;
//     height = 20;

//     y = 30;
//     x = 670;

//     canvas;
//     world;

//     isHovered = false;


//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.world = world;
//         this.loadImage('./img/fullscreen.svg');
//         this.addEventListeners();
//     }

//     addEventListeners() {
//         this.canvas.addEventListener('click', (e) => this.handleClick(e));
//         this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
//         this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
//         document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
//     }


//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }

//     handleMouseMove(event) {
//         if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
//             this.isHovered = true;
//             this.canvas.style.cursor = 'pointer';
//         } else {
//             this.isHovered = false;
//             this.canvas.style.cursor = 'default';
//         }
//     }

//     handleMouseLeave() {
//         this.isHovered = false;
//         this.canvas.style.cursor = 'default';
//     }

//     handleClick(event) {
//         if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
//             if (!document.fullscreenElement) {
//                 this.canvas.requestFullscreen();
//             } else {
//                 document.exitFullscreen();
//             }
//         }
//     }

//     handleFullscreenChange() {
//         this.world.fullscreenOn = !document.fullscreenElement;
//         localStorage.setItem('fullscreenOn', JSON.stringify(this.world.fullscreenOn));
//     }

//     render(ctx) {
//         if (this.isHovered) {
//             ctx.strokeStyle = 'yellow';  // Change color on hover
//             ctx.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
//         }
//         ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     }
// }


