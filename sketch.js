var START = 1;
var END = 0;
var gameStates = START;
var score = 0;

var car ,carImg;
var obsGroup, obsImg;

var bg, backgroundImg;
var leftSideWalk, rightSideWalk;
var gameOver, go;
var restart, reImg;

function preload(){
  carImg = loadImage("images/car2.png");
  backgroundImg = loadImage("images/track.jpg");
  obsImg = loadImage("images/Obstacle.png");
  go = loadImage("images/gO.png");
  reImg = loadImage("images/reset.png");
}

function setup() {
  createCanvas(800,800);

  bg = createSprite(400,-1,800,800);
  bg.addImage("track",backgroundImg);
  bg.y = bg.height/2;
  bg.velocityY = 6;

  leftSideWalk = createSprite(170,400,20,800);
  leftSideWalk.visible = false;
  rightSideWalk = createSprite(635,400,20,800);
  rightSideWalk.visible = false;

  car = createSprite(450,500,20,30);
  car.addImage("car2",carImg);
  car.velocityY = 0.0003;
  car.setCollider("circle",0,0,10);
  car.collide(rightSideWalk);
  car.collide(leftSideWalk);

  gameOver = createSprite(400,300);
  gameOver.addImage(go);
  gameOver.visible = false;

  restart = createSprite(400,430);
  restart.scale = 0.4;
  restart.addImage(reImg);
  restart.visible = false;

  obsGroup = new Group();
  score = 0;
}

function draw() {
  background(255);  
  
  if(bg.y > 800){
    bg.y = -1;
  }

  if(gameStates === START){
    Obstacle();

    score = score + Math.round(getFrameRate()/60);
    bg.velocityY = (6 + 3*score/100);

    if (keyDown("Left_Arrow")){
      car.x = car.x -10;
    }
    if (keyDown("Right_Arrow")){
      car.x = car.x +10;
    }

    car.collide(rightSideWalk);
    car.collide(leftSideWalk);

    if(obsGroup.isTouching(car)){
      gameStates = END;
    }
  }

  else if(gameStates === END){
    gameOver.visible = true;
    restart.visible = true;

    obsGroup.setVelocityYEach(0);
    obsGroup.setLifetimeEach(-7);

    car.velocityY = 0;
    bg.velocityY = 0;

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  textSize(23);
  fill("black");
  text("Score: "+ score, 650,50);
}

function Obstacle(){
       
  if (frameCount % 35 === 0 ){
  var obs = createSprite(400,-100,20,30);
  obs.addImage("Obstacle",obsImg)
  obs.scale = 0.1;
  
  obs.x = Math.round(random(600,250));
  obs.velocityY = bg.velocityY + 0.9;
         
  obs.depth = car.depth;
  obs.depth = car.depth + 1;

  gameOver.depth = obs.depth;
  gameOver.depth = obs.depth + 1;

  obsGroup.add(obs);
  obs.lifeTime = 40;  
  }
}

function reset(){
  gameStates = START;
  bg.velocityY = 6;
  car.velocityY = 0.0003;
  
  gameOver.visible = false;
  restart.visible = false;

  obsGroup.destroyEach();
  score = 0;
}