export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 300, 'sky');

    //platforms
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 572, 'groundfloor').setScale(1.2).refreshBody();

    platforms.create(0, 200, 'ground').setScale(0.5).refreshBody();
    platforms.create(400, 200, 'ground').setScale(0.5).refreshBody();
    platforms.create(800, 200, 'ground').setScale(0.5).refreshBody();

    platforms.create(725, 375, 'ground').setScale(0.5).refreshBody();
    platforms.create(75, 375, 'ground').setScale(0.5).refreshBody();

    platforms.create(400, 525, 'ground').setScale(0.75).refreshBody();

    //wall

    wall = this.physics.add.staticGroup();
    wall.create(510, 440, 'wall').setScale(1).refreshBody();
    wall.create(288, 440, 'wall').setScale(1).refreshBody();

    // Player functions

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    cursors = this.input.keyboard.createCursorKeys();

    //friend cat

    friend = this.physics.add.sprite(300, 450, 'cat');
    friend.setBounce(0.2);
    friend.setCollideWorldBounds(true);

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

    friend.anims.play('cat-right', true);

    friend.setVelocityX(FRIEND_SPEED);

    //flag

    flag = this.physics.add.sprite(775, 100, 'flag');
    flag.setBounce(0.2);
    flag.setCollideWorldBounds(true);

    this.anims.create({
      key: 'flag-left',
      frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'flag-turn',
      frames: [{ key: 'flag', frame: 4 }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'flag-right',
      frames: this.anims.generateFrameNumbers('flag', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    //friend catcus

    cactus = this.physics.add.sprite(400, 100, 'cactus');
    cactus.setBounce(0.2);
    cactus.setCollideWorldBounds(true);

    //   this.anims.add({
    //     key: 'cat-walk',
    //     frames: this.anims.generateFrameNumbers('cat', { start: 5, end: 8,}),
    //     frameRate: 20,

    //   });
    // this.anims.pla({
    //   key: 'cat-walk',
    //   frames: this.anims.generateFrameNumbers('cat', { start: 5, end: 8 }),
    //   frameRate: 20,
    // });

    energy = this.physics.add.sprite(725, 400, 'bowl');
    energy.setBounce(0.2);
    energy.setCollideWorldBounds(true);

    /// Cookies

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    bees = this.physics.add.group({
      key: 'bee',
      repeat: 3,
      setXY: { x: 200, y: 0, stepX: 200 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bees.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.3));
    });

    scoreText = this.add.text(16, 16, 'Energy: 0', {
      fontSize: '20px',
      fontFamily: 'Roboto',
      fill: '#000',
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bees, platforms);

    this.physics.add.collider(friend, platforms);
    this.physics.add.collider(friend, player);
    this.physics.add.collider(flag, platforms);
    this.physics.add.collider(cactus, platforms);
    this.physics.add.collider(energy, platforms);
    this.physics.add.collider(wall, friend);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, bees, collectBee, null, this);

    function collectStar(player, star) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText('Energy: ' + score);
      player.setTint();
    }

    function collectBee(player, bee) {
      bee.disableBody(true, true);

      score -= 10;
      scoreText.setText('Energy: ' + score);
      player.setTint(0xff0000);
    }

    function noEnergy() {
      score = 0;
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
      // need to set a timer
    }
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    const isJumpJustDown = Phaser.Input.Keyboard.JustDown(cursors.up);
    const isTouchingGround = player.body.touching.down;

    if (isJumpJustDown && (isTouchingGround || jumpCount < 2)) {
      player.setVelocityY(-330);
      jumpCount += 1;
    }

    if (isTouchingGround && !isJumpJustDown && jumpCount > 2) {
      jumpCount = 0;
    }
    // console.log(isTouchingGround, !isJumpJustDown, jumpCount);

    // console.log(friend.body.velocity.x);

    if (friend.body.touching.right) {
      friend.anims.play('cat-left', true);
      friend.setVelocityX(-FRIEND_SPEED);
    }

    if (friend.body.touching.left) {
      friend.anims.play('cat-right', true);
      friend.setVelocityX(FRIEND_SPEED);
    }
  }
}
