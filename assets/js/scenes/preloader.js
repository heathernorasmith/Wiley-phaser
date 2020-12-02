export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('sky', 'assets/img/house-sky.png');
    this.load.image('ground', 'assets/img/small-land.png');
    this.load.image('groundfloor', 'assets/img/platform.png');
    this.load.image('cookie', 'assets/img/cookie.png');
    this.load.image('bee', 'assets/img/bee.png');
    this.load.image('wall', 'assets/img/wall.png');
    this.load.image('cactus', 'assets/img/cactus.png');
    this.load.image('bowl', 'assets/img/bowl.png');
    this.load.image('wall', 'assets/img/wall.png');
    this.load.image('gameover', 'assets/img/game-over.png');
    this.load.image('won', 'assets/img/you-win.png');
    this.load.image('flower', 'assets/img/flower.png');
    this.load.image('trofey', 'assets/img/trofey.png');

    this.load.audio('grunt', 'assets/sound/grunt.wav');
    this.load.audio('woof', 'assets/sound/woof.mp3');
  

    this.load.spritesheet('dude', 'assets/img/wiley.png', {
      frameWidth: 64,
      frameHeight: 65,
    });

    this.load.spritesheet('cat', 'assets/img/cat-friend.png', {
      frameWidth: 64,
      frameHeight: 65,
    });

    this.load.spritesheet('flag', 'assets/img/flag.png', {
      frameWidth: 64,
      frameHeight: 65,
    });
  }

  create() {
    this.scene.start('game');
  }
}
