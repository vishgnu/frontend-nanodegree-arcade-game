// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 3) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x >450){
        this.reSpawn()
    }
    else
    {
        this.x += this.speed;
    }
    
}

Enemy.prototype.reSpawn = function (dt) {
    this.x = -30;
    this.speed = Math.floor((Math.random() * 3) + 1);
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.lives = 3;
    this.x = x || 200;
    this.y = y || 400;
    this.sprite = 'images/char-boy.png';
    this.input = null;
}

Player.prototype.restart = function (done) {
    if (done)
    {
        hud.points += 100;
    }

    this.x = 200;
    this.y = 400;
}

// Update for player
Player.prototype.update = function (dt) {

    var yStep = 82;
    var xStep = 100;

    if(this.input != null)
    {
        switch (this.input) {
            case "up":
                // check completed
                if (this.y < 0) {
                    this.restart(true);
                }
                else {
                    this.y -= yStep;
                }
                break;
            case "down":
                if (this.y < 400) {
                    this.y += yStep;
                 }
                break;
            case "left":
                if (this.x > 0) {
                    this.x -= xStep;
                }
                break;
            case "right":
                if (this.x < 400) {
                    this.x += xStep;
                }
                break;
            default:
                break;
        }

        this.input = null;
    }
}

// render player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Player" + this.x, this.y);
}


Player.prototype.handleInput = function (keycode) {
    // call position update for player here
    this.input = keycode;
}

var Hud = function () {
    this.lives = 3;
    this.points = 0;
}

Hud.prototype.render = function () {
    // heart
    ctx.font = "48px serif";
    ctx.fillText(this.lives, 40, 120);
    console.log("Heart" + this.lives);

    // points
    console.log("Points" + this.points);
    ctx.fillText(this.points, 0, 580);
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 60),
    new Enemy(0, 150),
    new Enemy(0, 230),
    new Enemy(0, 315)];

// Place the player object in a variable called player

var player = new Player();

var hud = new Hud();

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
