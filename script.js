//load a sprite -- make it default to sinking -- on keypress have it thrust up XXXXXXXX

//make blocks come at player -- XXXXXXXX

//make loop that makes block segments XXXXXXX

//if collision, player explodes -- player starts over

//make border with new image(smaller) no velocity no physics

//make blockSegments exist at a random board height XXXXXXXXX

var game = new Phaser.Game(1000, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var block;

function preload() {

    game.load.spritesheet('ship', 'assets/gfx/ship.png', 32, 32);
    game.load.image('block', 'assets/gfx/block.png');
    game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);

}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

 //player
  player = game.add.sprite(32,32, 'ship');
  player.animations.add('up', [1]);
  player.animations.add('down', [0]);

  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player.body.bounce.setTo(0.25, 0.25);

 //block
  // blockSegments = game.add.group();
  function wait(){
   setInterval(
    function sendBlock() {
        for (x = 0; x < game.rnd.integerInRange(1, 4); x += 1) {
          var randomValue = game.rnd.integerInRange(32, 300);
          block = game.add.sprite(game.width + 32, randomValue, 'block');
          game.physics.arcade.enable(block);
          block.body.collideWorldBounds = false;
          block.body.velocity.x = -300;
          // blockSegments.add(block);
        };
      },1000);
  };

    wait();






  // game.physics.arcade.enable(block);
  // block.body.collideWorldBounds = false;
  // block.body.velocity.x = -300;








}

function update() {
  cursors = game.input.keyboard.createCursorKeys();

      if (cursors.up.isDown){
        player.body.velocity.y = -110;
        player.animations.play('up');
      }
      else {
        player.animations.play('down');
      }

      // console.log(block.body.position.x)



}


