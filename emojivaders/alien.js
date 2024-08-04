import { Bullet } from './bullet.js';

export class Alien {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.emoji = emoji;
        this.rotation = 0; // In radians
    }

    shoot() {
        return new Bullet(this.x + this.width / 2, this.y + this.height, -1, 3); // Downward direction, slower speed
    }

    tilt(direction, speed) {
        const maxTilt = Math.PI / 6; // Increased maximum tilt to π/6 radians (about 30 degrees)
        const tiltSpeed = 0.01; // Adjust this value to change the speed of the tilt
        this.rotation = Math.sin(Date.now() * tiltSpeed * speed) * maxTilt * direction;
    }
}