import Preloader from './scenes/preloader.js';
import Game from './scenes/game.js';
import GameOver from './scenes/game-over.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Preloader, Game, GameOver],
  scale: {
    // zoom: 0.5,
    zoom: 1,
  },
};

new Phaser.Game(config);
