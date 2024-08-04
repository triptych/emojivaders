export class Bullet {
    constructor(x, y, direction, speed = 5) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 15;
        this.speed = speed;
        this.direction = direction; // 1 for upward (player), -1 for downward (aliens)
    }

    update() {
        this.y -= this.speed * this.direction;
    }

    isOffScreen(canvasHeight) {
        return this.y < 0 || this.y > canvasHeight;
    }
}