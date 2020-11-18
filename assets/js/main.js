var config = {
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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player;
let stars;
let bees;
let platforms;
let cursors;
let score = 0;
var gameOver = false;
let scoreText;
var game = new Phaser.Game(config);

jumpCount = 0

function preload() {
  this.load.image('sky', 'assets/img/sky.png');
  this.load.image('ground', 'assets/img/platform.png');
  this.load.image('star', 'assets/img/star.png');
  this.load.image('bee', 'assets/img/bee.png');
  this.load.spritesheet(
    'dude',
    'assets/img/dude2x.png',

    {
      frameWidth: 64,
      frameHeight: 96,
    }
  );
}

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 572, 'ground').setScale(1).refreshBody();

  platforms.create(800, 400, 'ground').setScale(1).refreshBody();
  platforms.create(1000, 250, 'ground').setScale(1).refreshBody();

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

  this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.overlap(player, bees, collectBee, null, this);
}

function update() {
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

  const isJumpJustDown = (Phaser.Input.Keyboard.JustDown('this.cursors.up',!)
  const touchingGround = this.playerbody.touching.down


  if (isJumpJustDown && (touchingGround || this.jumpCount < 2))
  {this.player.setVelocityY(-330)
++this.jumpCount}

if (touchingGround && (!JumpJustDown & this.JumpCount < 2))
{this.jumpCount = 0
}
}

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
}
