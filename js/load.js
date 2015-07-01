var loadState = {

  preload: function() {

     var loadingLabel = game.add.text(80, 150, 'loading...',{font:'30px Courier', fill: '#ffffff'})

    this.game.load.spritesheet('ship', '/assets/ship.png', 32, 32);
    this.game.load.image('ground', '/assets/ground.png');
    this.game.load.spritesheet('explosion', '/assets/explosion.png', 128, 128);

},

create: function() {
  game.state.start('menu');
}

}
