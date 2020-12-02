export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');

  }


  preload() {
    this.load.image('sky', 'assets/img/sky.png');
    this.load.image('ground', 'assets/img/small-land.png');
    this.load.image('groundfloor', 'assets/img/platform.png');
    this.load.image('star', 'assets/img/star.png');
    this.load.image('bee', 'assets/img/bee.png');
    this.load.image('wall', 'assets/img/wall.png');
    this.load.image('cactus', 'assets/img/cactus.png');
    this.load.image('bowl', 'assets/img/bowl.png');
    this.load.image('wall', 'assets/img/wall.png');

    this.load.spritesheet(
      'dude',
      'assets/img/wiley.png',

      {
        frameWidth: 64,
        frameHeight: 65,
      }
    );

    this.load.spritesheet(
      'cat',
      'assets/img/cat-friend.png',

      {
        frameWidth: 64,
        frameHeight: 65,
      }
    );

    this.load.spritesheet(
      'flag',
      'assets/img/flag.png',

      {
        frameWidth: 64,
        frameHeight: 65,
      }
    );
  }
create(){
this.scene.start('game')






}

}
