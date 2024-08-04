export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(game) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.renderPlayer(game.player);
        this.renderAliens(game.aliens);
        this.renderShields(game.shields);
        this.renderBullets(game.bullets);
        this.renderParticleSystems(game.particleSystems);
        this.renderScore(game.score);
        this.renderWave(game.wave);

        if (game.gameOver) {
            this.renderGameOver();
        }
    }

    renderPlayer(player) {
        this.ctx.font = `32px Arial`;
        this.ctx.fillText(player.emoji, player.x, player.y + player.height);
    }

    renderAliens(aliens) {
        this.ctx.font = `32px Arial`;
        aliens.forEach(alien => {
            this.ctx.save();
            this.ctx.translate(alien.x + alien.width / 2, alien.y + alien.height / 2);
            this.ctx.rotate(alien.rotation);
            this.ctx.fillText(alien.emoji, -alien.width / 2, alien.height / 4);
            this.ctx.restore();
        });
    }

    renderShields(shields) {
        shields.forEach(shield => {
            this.ctx.font = `32px Arial`;
            this.ctx.fillText(shield.emoji, shield.getDisplayX(), shield.getDisplayY() + shield.height);
        });
    }

    renderBullets(bullets) {
        this.ctx.fillStyle = '#fff';
        bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    renderParticleSystems(particleSystems) {
        particleSystems.forEach(ps => {
            ps.particles.forEach(particle => {
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
        });
    }

    renderScore(score) {
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(`Score: ${score}`, 10, 25);
    }

    renderWave(wave) {
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(`Wave: ${wave}`, this.ctx.canvas.width - 120, 25);
    }

    renderGameOver() {
        this.ctx.font = '32px "Press Start 2P"';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.fillText('Click to restart', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 40);
        this.ctx.textAlign = 'left';
    }
}