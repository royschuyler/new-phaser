//load a sprite -- mave it default to sinking -- on keypress have it thrust up

//make blocks come at player -- if collision, player explodes -- player starts over

var game = new Phaser.Game(1000, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('ship', 'assets/gfx/ship.png', 32, 32);
    game.load.spritesheet('block', 'assets/gfx/block.png');
    game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);

}

function create() {
 //player
  player = game.add.sprite(32,32, 'ship');
  player.animations.add('up', [1]);
  player.animations.add('down', [0]);


  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.body.bounce.setTo(0.25, 0.25);

}

function update() {
  cursors = game.input.keyboard.createCursorKeys();

      if (cursors.up.isDown){
        player.body.velocity.y = -170;
        player.animations.play('up');
      }
      else {
        player.animations.play('down');
      }


}


