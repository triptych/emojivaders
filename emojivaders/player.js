import { Bullet } from './bullet.js';

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 5;
        this.emoji = '🚀';
    }

    update() {
        // Player movement is handled by the InputHandler
    }

    shoot() {
        return new Bullet(this.x + this.width / 2, this.y, 1, 7); // Upward direction, faster speed
    }
}