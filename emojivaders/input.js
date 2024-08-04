export class InputHandler {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;

        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('touchstart', this.handleClick.bind(this));
    }

    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        this.game.player.x = (event.clientX - rect.left) * scaleX - this.game.player.width / 2;
        this.clampPlayerPosition();
    }

    handleTouchMove(event) {
        event.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const touch = event.touches[0];
        this.game.player.x = (touch.clientX - rect.left) * scaleX - this.game.player.width / 2;
        this.clampPlayerPosition();
    }

    handleClick(event) {
        event.preventDefault();
        if (this.game.gameOver) {
            this.game.reset();
        } else {
            this.game.playerShoot();  // Changed from this.game.player.shoot()
        }
    }

    clampPlayerPosition() {
        this.game.player.x = Math.max(0, Math.min(this.game.player.x, this.canvas.width - this.game.player.width));
    }
}