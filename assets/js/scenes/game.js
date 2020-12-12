export default class Game extends Phaser.Scene {
  constructor() {
    super('game');

    this.FRIEND_SPEED = 80;
    this.FLAG_SPEED = 1;
    this.score = 0;
    this.gameOver = false;
    this.jumpCount = 0;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.registry.set('score', this.score);
    this.add.image(400, 300, 'sky');

    // platforms
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 572, 'groundfloor').setScale(1.2).refreshBody();
    this.platforms.create(0, 200, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, 200, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(800, 200, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(725, 375, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(75, 375, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, 525, 'ground').setScale(0.75).refreshBody();

    // walls
    this.walls = this.physics.add.staticGroup();
    this.walls.create(510, 440, 'wall').setScale(1).refreshBody();
    this.walls.create(288, 440, 'wall').setScale(1).refreshBody();

    // Player functions
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // friend cat
    this.friend = this.physics.add.sprite(300, 450, 'cat');
    this.friend.setBounce(0.2);
    this.friend.setCollideWorldBounds(true);

    this.anims.create({
      key: 'cat-left',
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'cat-turn',
      frames: [{ key: 'cat', frame: 4 }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'cat-right',
      frames: this.anims.generateFrameNumbers('cat', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.friend.anims.play('cat-right', true);

    this.friend.setVelocityX(this.FRIEND_SPEED);

    // flag
    this.flag = this.physics.add.sprite(775, 100, 'flag');
    this.flag.setBounce(0.2);
    this.flag.setCollideWorldBounds(true);

    this.anims.create({
      key: 'flag-left',
      frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'flag-turn',
      frames: [{ key: 'flag', frame: 4 }],
      frameRate: 3,
    });

    this.anims.create({
      key: 'flag-right',
      frames: this.anims.generateFrameNumbers('flag', { start: 5, end: 8 }),
      frameRate: 3,
      repeat: -1,
    });

    this.flag.anims.play('flag-right', true);

    this.flag.setVelocityX(this.FLAG_SPEED);

    // friend catcus
    this.cactus = this.physics.add.sprite(400, 100, 'cactus');
    this.cactus.setBounce(0.2);
    this.cactus.setCollideWorldBounds(true);

    // Cookies

    this.cookies = this.physics.add.group({
      key: 'cookie',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.bees = this.physics.add.group({
      key: 'bee',
      repeat: 2,
      setXY: { x: 100, y: 0, stepX: 400 },
    });

    this.cookies.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bees.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.3));
    });

    this.scoreText = this.add.text(16, 16, 'Energy: 0', {
      fontSize: '20px',
      fontFamily: 'Roboto',
      fill: '#000',
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.cookies, this.platforms);
    this.physics.add.collider(this.bees, this.platforms);
    this.physics.add.collider(this.friend, this.platforms);
    this.physics.add.collider(this.friend, this.player);
    this.physics.add.collider(this.flag, this.platforms);
    this.physics.add.collider(this.cactus, this.platforms);

    this.physics.add.collider(this.walls, this.friend);

    this.physics.add.overlap(
      this.player,
      this.cookies,
      this.collectCookie,
      null,
      this
    );
    
    this.physics.add.overlap(
      this.player,
      this.bees,
      this.collectBee,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.cactus,
      this.collectCactus,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.flag,
      this.collectFlag,
      null,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    const isTouchingGround = this.player.body.touching.down;

    if (isJumpJustDown && (isTouchingGround || this.jumpCount < 2)) {
      this.player.setVelocityY(-330);
      this.jumpCount += 1;
    }

    if (isTouchingGround && !isJumpJustDown && this.jumpCount > 2) {
      this.jumpCount = 0;
    }

    if (this.friend.body.touching.right) {
      this.friend.anims.play('cat-left', true);
      this.friend.setVelocityX(-this.FRIEND_SPEED);
    }

    if (this.friend.body.touching.left) {
      this.friend.anims.play('cat-right', true);
      this.friend.setVelocityX(this.FRIEND_SPEED);
    }

    // Check for game over
    if (this.score < 0) {
      this.noEnergy();
    }
  }

  collectCookie(player, cookie) {
    cookie.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Energy: ' + this.score);
    this.registry.set('score', this.score);
    player.setTint();
    this.sound.play('grunt');
  }

  collectBee(player, bee) {
    bee.disableBody(true, true);
    this.score -= 10;
    this.scoreText.setText('Energy: ' + this.score);
    this.registry.set('score', this.score);
    player.setTint();
    this.sound.play('woof');
  }

  collectCactus(player, cactus) {
    cactus.disableBody(true, true);
    this.score -= 10;
    this.scoreText.setText('Energy: ' + this.score);
    this.registry.set('score', this.score);
    player.setTint();
    this.sound.play('woof');
  }
  noEnergy() {
    this.friend.setVelocity(0, 0);
    this.player.setVelocity(0, 0);
    this.gameOver = true;

    this.add.image(400, 300, 'gameover').setScale(1);

    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
  }

  collectFlag(player, flag) {
    this.player.setVelocityX(-160);
    this.player.anims.play('left', true);
    this.friend.anims.play('cat-right', true);
    this.add.image(400, 300, 'won').setScale(1);
    this.add.image(440, 458, 'trofey').setScale(1);
    this.sound.play('woof');
    this.gameOver = true;
    this.scoreText.setText('Energy: ' + this.score);
  }
}
