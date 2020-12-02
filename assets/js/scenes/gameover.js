

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.load.image('won', 'wiley-won-no-flowers');

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('game');
    });
  }
}
