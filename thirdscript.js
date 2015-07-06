var ref = new Firebase("https://phaser-app.firebaseio.com/");

var gameInfo = [];
var grapes;
var bannana;
var pear;
var orange;

var menuState = {

  create: function() {

    menuText = game.add.text(200, 200, 'phaser game (click to play, use up arrow to thrust)', {
      font: '24px Arial',
      fill: '#fff'
    });

    this.game.stage.backgroundColor = 0x330033;
    game.input.onDown.add(start, this);

    ref.once("value", function(snapshot) {
      var newPost = snapshot.val();
      gameInfo.push(newPost);
      addToTable(gameInfo)
    });

    //function to append a row to the table
    function addToTable(gameInfo) {

      // console.log(gameInfo[0])

      var newArr = [];

      $.each(gameInfo[0], function(key, value) {
        // console.log(value)
        newArr.push(value)
      });

      newArr.sort(function(a, b) {
        return (b.score - a.score)
      });

      var table = $("table")

      for (i = 0; i < 10; i++) {

        table.append("<tr></tr>");
        var $target = $("tr:last");
        $target.append("<td>" + newArr[i].name + "</td>");
        $target.append("<td>" + newArr[i].score + "</td>");
      }
    }
  }
}

function start() {

  score = 0;
  $('button').prop("disabled", false);
  game.state.start('game', true, false);
}

var diedState = {

  create: function() {

    diedText = game.add.text(200, 200, 'You crashed with a score of ' + score + '. Click to play again', {
      font: '24px Arial',
      fill: '#fff'
    });
    var input = $('.input-container');
    input.css('display', 'initial');
    var button = $('button');

    button.on('click', function() {
      var name = $('input').val();
      if (name != '') {
        ref.push({
          name: name,
          score: score
        })
      }
      $(this).prop("disabled", true);
      $('input').val('');
    });
    game.input.onDown.add(start, this);
  }
}

var GameState = function(game) {};

// Load images
GameState.prototype.preload = function() {
  this.game.load.spritesheet('ship', './assets/ship.png', 32, 32);
  this.game.load.image('ground', './assets/fadeBlue.png');
  this.game.load.spritesheet('explosion', './assets/explosion.png', 128, 128);
  this.game.load.image('grapes', './assets/grapes.png');
  this.game.load.image('bannana', './assets/bannana.png');
  this.game.load.image('orange', './assets/orange.png');
  this.game.load.image('pear', './assets/newPear.png');
  this.game.load.image('blue', './assets/blue.png');
  this.game.load.image('cherries', './assets/cherries.png');

};



var score = 0;
var scoreString = '';
var scoreText;




GameState.prototype.create = function() {

  var input = $('.input-container');
  input.css('display', 'none');
  scoreString = 'Score: ';
  scoreText = game.add.text(32, 32, scoreString + score, {
    font: '24px Arial',
    fill: '#fff'
  });



  game.time.events.loop(100, updateScore, this);

  // Set stage background color
  this.game.stage.backgroundColor = 0x333333;

  this.MAX_SPEED = 250; // pixels/second
  this.DRAG = 100; // pixels/second
  this.GRAVITY = 400; // pixels/second/second


  this.ship = this.game.add.sprite(0, 0, 'ship');
  this.ship.anchor.setTo(0.5, 0.5);
  this.ship.angle = 0;

  // Enable physics on the ship
  this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

  this.ship.body.collideWorldBounds = true;


  // // Set maximum velocity
  this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

  // Add drag to the ship that slows it down when it is not accelerating
  this.ship.body.drag.setTo(this.DRAG, this.DRAG); // x, y

  // Choose a random starting angle and velocity for the ship
  this.resetShip();

  // Turn on gravity
  game.physics.arcade.gravity.y = this.GRAVITY;

  // Make ship bounce a little
  this.ship.body.bounce.setTo(0.25, 0.25);

  function updateScore() {

    score += 1;
    scoreText.text = scoreString + score;
  }

//SEND FRUIT********************************************************
speed = 3000

//GRAPES
  cherrySpeed = speed;
  game.time.events.loop(cherrySpeed, sendCherries, this);

  this.cherryBunch = this.game.add.group();

  function sendCherries() {

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(0, 1); x += 1) {
      var randomValue = this.game.rnd.integerInRange(30, 370);
      // Add the ground blocks, enable physics on each, make them immovable
      cherries = this.game.add.sprite(game.width + 32, randomValue, 'cherries');
      cherries.width = 32;
      cherries.height = 32;
      this.game.physics.enable(cherries, Phaser.Physics.ARCADE);
      cherries.body.immovable = true;
      cherries.body.allowGravity = false;
      cherries.body.velocity.x = velocity -100;
      // groundBlock.body.velocity.y = -10;
      this.cherryBunch.add(cherries);


    };
  };



//GRAPES
  grapeSpeed = speed * 2.3;
  game.time.events.loop(grapeSpeed, sendGrapes, this);

  this.bunch = this.game.add.group();

  function sendGrapes() {

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(0, 1); x += 1) {
      var randomValue = this.game.rnd.integerInRange(30, 370);
      // Add the ground blocks, enable physics on each, make them immovable
      grapes = this.game.add.sprite(game.width + 32, randomValue, 'grapes');
      grapes.width = 32;
      grapes.height = 32;
      this.game.physics.enable(grapes, Phaser.Physics.ARCADE);
      grapes.body.immovable = true;
      grapes.body.allowGravity = false;
      grapes.body.velocity.x = velocity -100;
      // groundBlock.body.velocity.y = -10;
      this.bunch.add(grapes);


    };
  };





//BANNANA
  bannanaSpeed = speed * 3.1;
  game.time.events.loop(bannanaSpeed, sendBannanas, this);

  this.bannanaBunch = this.game.add.group();

  function sendBannanas() {

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(0, 1); x += 1) {
      var randomValue = this.game.rnd.integerInRange(30, 330);
      // Add the ground blocks, enable physics on each, make them immovable
      bannana = this.game.add.sprite(game.width + 32, randomValue, 'bannana');
      bannana.width = 32;
      bannana.height = 32;
      this.game.physics.enable(bannana, Phaser.Physics.ARCADE);
      bannana.body.immovable = true;
      bannana.body.allowGravity = false;
      bannana.body.velocity.x = velocity -100;
      // groundBlock.body.velocity.y = -10;
      this.bannanaBunch.add(bannana);

    };
  };





  //ORANGE
  orangeSpeed = speed * 9.7;
  game.time.events.loop(bannanaSpeed, sendOranges, this);

  this.orangeBunch = this.game.add.group();

  function sendOranges() {

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(0, 1); x += 1) {
      var randomValue = this.game.rnd.integerInRange(30, 330);
      // Add the ground blocks, enable physics on each, make them immovable
      orange = this.game.add.sprite(game.width + 32, randomValue, 'orange');
      orange.width = 32;
      orange.height = 32;
      this.game.physics.enable(orange, Phaser.Physics.ARCADE);
      orange.body.immovable = true;
      orange.body.allowGravity = false;
      orange.body.velocity.x = velocity -100;
      // groundBlock.body.velocity.y = -10;
      this.orangeBunch.add(orange);

    };
  };




  //PEAR
  pearSpeed = speed * 13.3;
  game.time.events.loop(pearSpeed, sendPears, this);

  this.pearBunch = this.game.add.group();

  function sendPears() {

    // this.ground = this.game.add.group();
    for (x = 0; x < this.game.rnd.integerInRange(0, 1); x += 1) {
      var randomValue = this.game.rnd.integerInRange(30, 330);
      // Add the ground blocks, enable physics on each, make them immovable
      pear = this.game.add.sprite(game.width + 32, randomValue, 'pear');
      pear.width = 32;
      pear.height = 32;
      this.game.physics.enable(pear, Phaser.Physics.ARCADE);
      pear.body.immovable = true;
      pear.body.allowGravity = false;
      pear.body.velocity.x = velocity -100;
      // groundBlock.body.velocity.y = -10;
      this.pearBunch.add(pear);

    };
  };





  //END SEND FRUIT*****************************************************






  speed = 600;
  velocity = -350;
  game.time.events.loop(speed, send, this);

  this.ground = this.game.add.group();

  function send() {

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
        velocity -= .15;
        groundBlock.body.velocity.x = velocity;
        // groundBlock.body.velocity.y = -10;
        this.ground.add(groundBlock);

      }
    }
    //make top and bottom borders
  for (var x = 0; x < this.game.width; x += 32) {
    // Add the ground blocks, enable physics on each, make them immovable
    var blueBlock = this.game.add.sprite(x, this.game.height - 32, 'blue');
    var topblue = this.game.add.sprite(x, this.game.height - 400, 'blue');
    topblue.width = 32;
    topblue.height = 32;
   blueBlock.width = 32;
    blueBlock.height = 32;
    this.game.physics.enable(topblue, Phaser.Physics.ARCADE);
    topblue.body.immovable = true;
    topblue.body.allowGravity = false;
    this.ground.add(topblue);
    this.game.physics.enable(blueBlock, Phaser.Physics.ARCADE);
    blueBlock.body.immovable = true;
    blueBlock.body.allowGravity = false;
    this.ground.add(blueBlock);
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
    var animation = explosion.animations.add('boom', [0, 1, 2, 3], 60, false);
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
  // Move the ship back to the top of the stage and set score back to zero
  this.ship.x = 100;
  this.ship.y = 100;
  this.ship.body.acceleration.setTo(0, 0);
  this.ship.body.velocity.setTo(0, 0)

};

// The update() method is called every frame
GameState.prototype.update = function() {


    // Collide the ship with the grapes
  if (this.game.physics.arcade.overlap(this.ship, this.cherryBunch)) {

    score += 50;
    scoreText.text = scoreString + score;
    this.bunch.active = false;
    this.cherryBunch.remove(this.cherries);
    cherries.kill();
    //

  };

  // Collide the ship with the grapes
  if (this.game.physics.arcade.overlap(this.ship, this.bunch)) {

    score += 100;
    scoreText.text = scoreString + score;
    this.cherryBunch.active = false;
    this.bunch.remove(this.grapes);
    grapes.kill();
    //

  };

//Bannanas
    if (this.game.physics.arcade.overlap(this.ship, this.bannanaBunch)) {

    score += 200;
    scoreText.text = scoreString + score;
    this.bunch.active = false;
    this.bannanaBunch.remove(this.bannana);
    bannana.kill();
  };

  //oranges
    if (this.game.physics.arcade.overlap(this.ship, this.orangeBunch)) {

    score += 500;
    scoreText.text = scoreString + score;
    this.orangeBunch.active = false;
    this.orangeBunch.remove(this.orange);
    orange.kill();
  };


    //pear
    if (this.game.physics.arcade.overlap(this.ship, this.pearBunch)) {

    score += 800;
    scoreText.text = scoreString + score;
    this.pearBunch.active = false;
    this.pearBunch.remove(this.pear);
    pear.kill();
  };


  // Collide the ship with the ground
  if (this.game.physics.arcade.collide(this.ship, this.ground)) {

    this.getExplosion(this.ship.x, this.ship.y);
    this.resetShip()
    game.state.start('died', true, false);
  }

  if (this.upInputIsActive()) {

    this.ship.body.velocity.y = -120;
    // Show the frame from the spritesheet with the engine on
    this.ship.frame = 1;
  } else {


    // Show the frame from the spritesheet with the engine off
    this.ship.frame = 0;
  }
};

GameState.prototype.upInputIsActive = function() {
  var isActive = false;

  isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
  isActive |= (this.game.input.activePointer.isDown &&
    this.game.input.activePointer.x > this.game.width / 4 &&
    this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

  return isActive;
};

var game = new Phaser.Game(1000, 400, Phaser.CANVAS, 'roy');

game.state.add('game', GameState, true);
game.state.add('menu', menuState);
game.state.add('died', diedState);
game.state.start('menu');
// game.state.start('game',true, false);

