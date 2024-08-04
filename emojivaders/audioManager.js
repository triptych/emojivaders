export class AudioManager {
    constructor() {
        this.sounds = {};
        this.initialized = false;
    }

    initialize() {
        if (!this.initialized) {
            this.sounds = {
                playerShoot: new Audio('laserRetro_000.ogg'),
                alienShoot: new Audio('laserSmall_004.ogg'),
                explosion: new Audio('expl.ogg')
            };
            this.initialized = true;
            console.log('Audio initialized'); // Add this line for debugging
        }
    }

    play(soundName) {
        if (this.initialized && this.sounds[soundName]) {
            console.log(`Playing sound: ${soundName}`); // Add this line for debugging
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(error => console.error('Audio play failed:', error));
        } else {
            console.log(`Sound not initialized or not found: ${soundName}`); // Add this line for debugging
        }
    }
}