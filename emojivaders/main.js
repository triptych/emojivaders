import { Game } from './game.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas.width, canvas.height);
const renderer = new Renderer(ctx);
const inputHandler = new InputHandler(canvas, game);

let audioInitialized = false;

function initializeAudio() {
    if (!audioInitialized) {
        game.audioManager.initialize();
        audioInitialized = true;
    }
}

canvas.addEventListener('click', initializeAudio);
document.addEventListener('keydown', initializeAudio);

function gameLoop() {
    game.update();
    renderer.render(game);
    requestAnimationFrame(gameLoop);
}

// Start screen
function drawStartScreen() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '32px "Press Start 2P"';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('👾Emoji Invaders👾', canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2 + 40);
}

drawStartScreen();

canvas.addEventListener('click', startGame, { once: true });

function startGame() {
    initializeAudio();
    gameLoop();
}