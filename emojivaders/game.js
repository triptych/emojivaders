import { Player } from './player.js';
import { Alien } from './alien.js';
import { Shield } from './shield.js';
import { Bullet } from './bullet.js';
import { ParticleSystem } from './particleSystem.js';
import { AudioManager } from './audioManager.js';

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(width / 2, height - 50);
        this.aliens = [];
        this.shields = [];
        this.bullets = [];
        this.particleSystems = [];
        this.score = 0;
        this.wave = 1;
        this.gameOver = false;
        this.alienDirection = 1;
        this.baseAlienSpeed = 1;
        this.alienSpeed = this.baseAlienSpeed;
        this.alienMoveDownDistance = 20;
        this.alienShootingInterval = 1000; // Aliens shoot every 1 second on average
        this.lastAlienShot = 0;
        this.initialAlienCount = 0;
        this.audioManager = new AudioManager();

        this.initializeGame();
    }

    initializeGame() {
        this.createAliens();
        this.createShields();
        this.initialAlienCount = this.aliens.length;
    }

    createAliens() {
        const alienTypes = ['👾', '👽', '👻', '🤖', '🛸'];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 11; col++) {
                const x = col * 40 + 80;
                const y = row * 40 + 40;
                const emoji = alienTypes[row % alienTypes.length];
                this.aliens.push(new Alien(x, y, emoji));
            }
        }
    }

    createShields() {
        for (let i = 0; i < 4; i++) {
            const x = (i + 1) * (this.width / 5);
            const y = this.height - 100;
            this.shields.push(new Shield(x, y));
        }
    }

    update() {
        if (this.gameOver) return;

        this.player.update();
        this.updateAlienSpeed();
        this.updateAliens();
        this.updateBullets();
        this.checkCollisions();
        this.updateParticleSystems();
        this.alienShooting();
        this.updateShields();

        if (this.aliens.length === 0) {
            this.startNewWave();
        }
    }

    updateAlienSpeed() {
        const remainingAlienRatio = this.aliens.length / this.initialAlienCount;
        this.alienSpeed = this.baseAlienSpeed + (1 - remainingAlienRatio) * this.baseAlienSpeed;
    }

    updateAliens() {
        let moveDown = false;
        for (const alien of this.aliens) {
            alien.x += this.alienDirection * this.alienSpeed;
            alien.tilt(this.alienDirection, this.alienSpeed);

            if (
                (this.alienDirection > 0 && alien.x + alien.width > this.width - 20) ||
                (this.alienDirection < 0 && alien.x < 20)
            ) {
                moveDown = true;
                break;
            }
        }

        if (moveDown) {
            this.alienDirection *= -1;
            for (const alien of this.aliens) {
                alien.y += this.alienMoveDownDistance;
                if (alien.y + alien.height > this.player.y) {
                    this.gameOver = true;
                }
            }
        }
    }

    alienShooting() {
        const currentTime = Date.now();
        if (currentTime - this.lastAlienShot > this.alienShootingInterval) {
            if (Math.random() < 0.3 && this.aliens.length > 0) { // 30% chance to shoot
                const randomAlien = this.aliens[Math.floor(Math.random() * this.aliens.length)];
                const bullet = randomAlien.shoot();
                this.bullets.push(bullet);
                this.lastAlienShot = currentTime;
                this.audioManager.play('alienShoot');
            }
        }
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.bullets[i].isOffScreen(this.height)) {
                this.bullets.splice(i, 1);
            }
        }
    }

    checkCollisions() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];

            if (bullet.direction === 1) { // Player bullet
                // Check collision with aliens
                for (let j = this.aliens.length - 1; j >= 0; j--) {
                    const alien = this.aliens[j];
                    if (this.checkCollision(bullet, alien)) {
                        this.aliens.splice(j, 1);
                        this.bullets.splice(i, 1);
                        this.score += 10;
                        this.createExplosion(alien.x + alien.width / 2, alien.y + alien.height / 2);
                        this.audioManager.play('explosion');
                        break;
                    }
                }
            } else { // Alien bullet
                // Check collision with player
                if (this.checkCollision(bullet, this.player)) {
                    this.gameOver = true;
                    this.createExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
                    this.audioManager.play('explosion');
                    break;
                }
            }

            // Check collision with shields
            for (const shield of this.shields) {
                if (shield.checkCollision(bullet)) {
                    this.bullets.splice(i, 1);
                    this.createExplosion(bullet.x, bullet.y);
                    this.audioManager.play('explosion');
                    shield.shake();
                    break;
                }
            }
        }
    }

    checkCollision(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    }

    createExplosion(x, y) {
        this.particleSystems.push(new ParticleSystem(x, y));
    }

    updateParticleSystems() {
        for (let i = this.particleSystems.length - 1; i >= 0; i--) {
            this.particleSystems[i].update();
            if (this.particleSystems[i].particles.length === 0) {
                this.particleSystems.splice(i, 1);
            }
        }
    }

    updateShields() {
        for (const shield of this.shields) {
            shield.update();
        }
    }

    startNewWave() {
        this.wave++;
        this.baseAlienSpeed *= 1.03;
        this.createAliens();
        this.initialAlienCount = this.aliens.length;
    }

    reset() {
        this.player = new Player(this.width / 2, this.height - 50);
        this.aliens = [];
        this.shields = [];
        this.bullets = [];
        this.particleSystems = [];
        this.score = 0;
        this.wave = 1;
        this.gameOver = false;
        this.alienDirection = 1;
        this.baseAlienSpeed = 1;
        this.alienSpeed = this.baseAlienSpeed;
        this.lastAlienShot = 0;
        this.initializeGame();
    }

    playerShoot() {
        const bullet = this.player.shoot();
        this.bullets.push(bullet);
        console.log('Player shoot sound played'); // Add this line for debugging

        this.audioManager.play('playerShoot');
    }
}