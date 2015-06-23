//load a sprite -- mave it default to sinking -- on keypress have it thrust up

var game = new Phaser.Game(2000, 200, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('ship', 'assets/gfx/ship.png');
    // game.load.image('sky', 'assets/gfx/ship.png');
    // game.load.image('star', 'assets/star.png');
    // game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() {
  // game.add.sprite(0, 0, 'ship');
  player = game.add.sprite(32, game.world.height - 150, 'ship')
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;


}

function update() {
  cursors = game.input.keyboard.createCursorKeys();

  if (cursors.up.isDown){
    player.body.velocity.y = -100;
  }
}
