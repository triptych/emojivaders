class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = `hsl(${Math.random() * 60 + 300}, 100%, 50%)`;
        this.life = 30;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
}

export class ParticleSystem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
}