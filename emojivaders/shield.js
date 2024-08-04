export class Shield {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.health = 4;
        this.emoji = '🛡️';
        this.shakeAmount = 0;
        this.shakeDecay = 0.9;
    }

    checkCollision(bullet) {
        if (
            bullet.x < this.x + this.width &&
            bullet.x + bullet.width > this.x &&
            bullet.y < this.y + this.height &&
            bullet.y + bullet.height > this.y
        ) {
            this.health--;
            return true;
        }
        return false;
    }

    shake() {
        this.shakeAmount = 5;
    }

    update() {
        if (this.shakeAmount > 0) {
            this.shakeAmount *= this.shakeDecay;
            if (this.shakeAmount < 0.1) {
                this.shakeAmount = 0;
            }
        }
    }

    getDisplayX() {
        return this.x + (Math.random() - 0.5) * this.shakeAmount * 2;
    }

    getDisplayY() {
        return this.y + (Math.random() - 0.5) * this.shakeAmount * 2;
    }
}