// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;

var labelScore;
var player
var pipes;


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_superman.png");
    //game.load.audio("score", "assets/point.mp3");

    game.load.image("pipe", "assets/pipe.png");

}
/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the background colour of the scene
    game.stage.setBackgroundColor("#0000FF");
    game.add.text(300, 200, "Man Of Steel",
        {font: "30px Arial", fill: "#FFFFFF"}
    );


    game.add.sprite(20, 20, "playerImg");
    game.input
        .onDown
        .add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    ////alert (score);
    labelScore = game.add.text(100, 20, "0");
    player = game.add.sprite(10, 270, "playerImg");
    pipes = game.add.group();
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);



    game.physics.arcade.enable(player);
    player.body.gravity.y = 100;




    game.time.events.loop(2 * Phaser.Timer.SECOND, generatePipe);

}

function generatePipe(){
    var gapstart = game.rnd.integerInRange(1,7);
    for(var count = 0; count <8; count++){
        if(count != gapstart && count != gapstart + 1){
            addPipeBlock(800, count * 50);


        }
    }
    changescore();
}
function addPipeBlock(x,y){
    var block= pipes.create(x,y,"pipe");
    game.physics.arcade.enable(block);
    block.body.velocity.x= -200;
}
function changescore() {
    score = score + 1;
    labelScore.setText(score.toString());
}

function moveRight() {
    player.x = player.x + 5;

}
function moveLeft() {
    player.x = player.x - 5;

}
function moveDown() {
    player.y = player.y + 5;
}
function moveUp() {
    player.y = player.y - 5;
}
function clickHandler(event) {
    alert("click!");
    alert(event.x + ":" + event.y);
    game.add.sprite(event.x, event.y, "playerImg");
}
function spaceHandler() {
    player.body.velocity.y = -100;

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, gameover);

}

function gameover(){
    location.reload();
}