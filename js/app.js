const allowedY = [60,143,226];

function randomY() {
    return allowedY[Math.floor(Math.random()*allowedY.length)];
}

function randomSpeed() {
    return Math.floor(Math.random()*200+50);
}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 505) {
        this.x = -101;
        this.y = randomY();
        this.speed = randomSpeed();
    }
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 392;
}

// If reach water, then move the player back to the start point
Player.prototype.update = function() {
    if(this.y === -23) {
        const player = this;
        setTimeout(function(){
            player.x = 202;
            player.y = 392;
        }, 100);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player. Only allow the player to move within the canvas.
Player.prototype.handleInput = function(keyValue) {
    if(keyValue === 'left') {
        this.x = (this.x > 0) ? this.x-101: this.x ;
    } else if(keyValue === 'up') {
        this.y = (this.y > 0) ? this.y-83: this.y ;
    } else if(keyValue === 'right') {
        this.x = (this.x < 404) ? this.x+101: this.x ;
    } else if(keyValue === 'down') {
        this.y = (this.y < 392) ? this.y+83: this.y ;
    }          
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (let i = 0; i < 4; i++) { 
  allEnemies.push(new Enemy(-101,randomY(),randomSpeed()));
}
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
