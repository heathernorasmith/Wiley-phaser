export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    console.log('GAME OVER');

    // this.add.image(400, 300, 'won');
    this.registry.events.on('changedata', this.updateData, this);

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('game');
    });
  }

  updateData(parent, key, data) {
    console.log(key, data);
    if (key === 'score') {
      console.log(data);
      this.scoreText.setText('Energy: ' + data);
    }
  }
}
