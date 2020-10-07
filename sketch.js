var tower, towerImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var ghost, ghostImg;

var invisibleBlock, invisibleBlockGroup;

var PLAY = 1;
var END = 0;
var gameState = 1;
var spookySound;

function preload() {
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");

  spookySound = loadSound("spooky.wave");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;



  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(0);
  if (gameState === 1) {

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.1;

    if (keyDown("left_arrow")) {

      ghost.x = ghost.x - 3;
    }

    if (keyDown("right_arrow")) {

      ghost.x = ghost.x + 3;
    }
    //creating an infinite scrolling tower  
    if (tower.y > 400) {
      tower.y = 300;
    }

    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState === 0;
    }

    // spawning the door 
    spawnDoor();


    drawSprites();
  }
  if (gameState === 0) {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver", 230, 250);
  }
}

function spawnDoor() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);

    door.addImage(doorImg);

    door.x = Math.round(random(120, 400));
    // giving velocity to the door
    door.velocityY = tower.velocityY;
    // adding lifetime to the door
    door.lifetime = 800;
    //adding each door to the group
    doorGroup.add(door);

    ghost.depth = door.depth;
    ghost.depth = door.depth + 1;

    // spawning railings to the doors
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climberGroup.add(climber);

    // invisibleBlock
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }

}