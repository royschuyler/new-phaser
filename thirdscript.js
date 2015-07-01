// This example uses the Phaser 2.2.2 framework

// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var GameState = function(game) {
};




// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.spritesheet('ship', '/assets/gfx/ship.png', 32, 32);
    this.game.load.image('ground', '/assets/gfx/ground.png');
    this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);

};


    var score = 0;
    var scoreString = '';
    var scoreText;

// Setup the example
GameState.prototype.create = function() {


    scoreString = 'Score: ';
    scoreText = game.add.text(32, 32, scoreString + score, { font: '24px Arial', fill: '#fff' });

     function updateScore() {
          score += 1;
          scoreText.text = scoreString + score;

     };

    game.time.events.loop(100, updateScore, this);

    // Set stage background color
    this.game.stage.backgroundColor = 0x333333;

    // Define motion constants
    // this.ROTATION_SPEED = 180; // degrees/second
    // this.ACCELERATION = 200; // pixels/second/second
    // this.MAX_SPEED = 250; // pixels/second
    // this.DRAG = 0; // pixels/second
    this.GRAVITY = 400; // pixels/second/second

    // Add the ship to the stage
    this.ship = this.game.add.sprite(0, 0, 'ship');
    this.ship.anchor.setTo(0.5, 0.5);
    this.ship.angle = 0; // Point the ship up


    // Enable physics on the ship
    this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.ship.body.collideWorldBounds = true;

    this.ship.gravity = 400;

    // // Set maximum velocity
    // this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

    // Add drag to the ship that slows it down when it is not accelerating
    this.ship.body.drag.setTo(this.DRAG, this.DRAG); // x, y

    // Choose a random starting angle and velocity for the ship
    this.resetShip();

    // Turn on gravity
    game.physics.arcade.gravity.y = this.GRAVITY;

    // Make ship bounce a little
    this.ship.body.bounce.setTo(0.25, 0.25);

    // Create some ground for the ship to land on
    game.time.events.loop(700, send, this);
    this.ground = this.game.add.group();
    function send(){

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(1, 2); x += 1) {
        var randomValue = this.game.rnd.integerInRange(0, 400);
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(game.width + 32, randomValue, 'ground');
        groundBlock.width = 32;
        groundBlock.height = 32;
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        groundBlock.body.velocity.x = -300;
        this.ground.add(groundBlock);
    }
  }
//make top and bottom borders
      for(var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        var topBlock = this.game.add.sprite(x, this.game.height - 400, 'ground');
        topBlock.width = 32;
        topBlock.height = 32;
        groundBlock.width = 32;
        groundBlock.height = 32;
        this.game.physics.enable(topBlock, Phaser.Physics.ARCADE);
        topBlock.body.immovable = true;
        topBlock.body.allowGravity = false;
        this.ground.add(topBlock);
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }






    // Create a group for explosions
    this.explosionGroup = this.game.add.group();

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);
};

// Try to get a used explosion from the explosionGroup.
// If an explosion isn't available, create a new one and add it to the group.
// Setup new explosions so that they animate and kill themselves when the
// animation is complete.
GameState.prototype.getExplosion = function(x, y) {
    // Get the first dead explosion from the explosionGroup
    var explosion = this.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0,1,2,3], 60, false);
        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        this.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = this.game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
};

GameState.prototype.resetShip = function() {
    // Move the ship back to the top of the stage
    this.ship.x = 32;
    this.ship.y = 32;
    this.ship.body.acceleration.setTo(0, 0);
    this.ship.body.velocity.setTo(0,0)
    score = 0;
    scoreText.text = scoreString + score;

};




// The update() method is called every frame
GameState.prototype.update = function() {




    // Collide the ship with the ground
    if(this.game.physics.arcade.collide(this.ship, this.ground)){
      console.log('heyy')
            this.getExplosion(this.ship.x, this.ship.y);
            this.resetShip()
          }



    if (this.upInputIsActive()) {
        // If the UP key is down, thrust
        // Calculate acceleration vector based on this.angle and this.ACCELERATION
        // this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
        // this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;
        this.ship.body.velocity.y = -120;
        // Show the frame from the spritesheet with the engine on
        this.ship.frame = 1;
    } else {
        // Otherwise, stop thrusting
        // this.ship.body.acceleration.setTo(0, 0);

        // Show the frame from the spritesheet with the engine off
        this.ship.frame = 0;
    }
};


GameState.prototype.upInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x > this.game.width/4 &&
        this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

    return isActive;
};

var game = new Phaser.Game(1000, 400, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
