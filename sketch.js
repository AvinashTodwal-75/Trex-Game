var ground, groundImg;
var trex, trexImg, trexImg1;
var invground;
var cloud, cloudImg, cloudGroup;
var obstacleImg1,obstacleImg2,obstacleImg3;
var obstacleImg4,obstacleImg5,obstacleImg6;
var obstacleG; 
var play = 1;
var end = 0; 
var gameState = play;
var score = 0;
var gameOver, gameOverImg;
var restart, restartImg;
var jump;
var die;
var checkPoint;

function preload(){
  
  groundImg = loadImage("ground2.png");
  trexImg=loadAnimation("trex3.png","trex2.png","trex1.png");
  cloudImg = loadImage("cloud.png");
  trexImg1 = loadAnimation("trex_collided.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver-1.png");
  
  obstacleImg1=loadImage("obstacle1.png");
  obstacleImg2=loadImage("obstacle2.png");
  obstacleImg3=loadImage("obstacle3.png");
  obstacleImg4=loadImage("obstacle4.png");
  obstacleImg5=loadImage("obstacle5.png");
  obstacleImg6=loadImage("obstacle6.png"); 
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
  
}

function setup(){
  createCanvas(600,200);
  
  ground = createSprite(200, 175, 20, 20);
  ground.addImage(groundImg);
  
  trex = createSprite(100, 124, 15, 15);
  trex.addAnimation("running", trexImg);
  trex.addAnimation("walk", trexImg1);
  trex.scale=0.5;
  trex.debug = false;
  trex.setCollider("rectangle",0, -10,100,100);
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.45;
  gameOver.visible = false;
  
  restart = createSprite(300,50,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.45;
  restart.visible = false;
  
  invground = createSprite(300,185,600,10);
  invground.visible = false;
  
  cloudGroup = new Group();
  obstacleG = new Group();
  
}

function draw(){
  background(180);
  
  stroke("red");  
  fill("black");
  textSize(18);
  text("SCORE : "+score,430,30);
  
  if(gameState === play) {
    
    restart.visible = false;
    gameOver.visible = false;
    
  if(ground.x<150){
    ground.x=200;
   } 
    
  if(keyDown("space") && trex.y >= 156){
    trex.velocityY=-15;
    jump.play();
   }
    
  if(score>0 && score%100===0){
    checkPoint.play();
  }
    
    trex.velocityY=trex.velocityY+0.9;   
    score = score+Math.round(frameCount/300);
    
  ground.velocityX=-4; 
  ground.velocityX = -(2 + score/100);   
    
    
  if(trex.isTouching(obstacleG)) {
    gameState=end;
    die.play();
    
  }    
    
  spawnClouds();
  spawnObstacle();  
}  
  
  else if(gameState === end){
    
    ground.velocityX = 0;
    obstacleG.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("walk",trexImg1);
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
      gameState = play;
      obstacleG.destroyEach();
      cloudGroup.destroyEach();
      trex.y = 124;
      score=0;
      trex.changeAnimation("running", trexImg);
    }
 }
  
  trex.collide(invground);
  
  drawSprites();
}

function spawnClouds() {

  if(frameCount % 50 === 0) {
   cloud = createSprite(650,50,10,10);
   cloud.y = Math.round(random(50,80));
   cloud.addImage(cloudImg);
   cloud.velocityX = -4;
   cloud.scale = 0.5;
   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1;
   cloud.lifetime = -1;
   cloudGroup.add(cloud);
  }
}

function spawnObstacle(){
  
  if(frameCount % 80===0){
    
    obstacle=createSprite(650, 157, 10, 10);
    obstacle.velocityX = -(2+score/100);
    obstacle.velocityX = -4;
    obstacle.lifetime = -2;
    obstacle.scale = 0.5;
    obstacleG.add(obstacle);
    
    var aadi = Math.round(random(1,6));
    
    switch(aadi){
      case 1: obstacle.addImage(obstacleImg1);
      break;
      
      case 2: obstacle.addImage(obstacleImg2);
      break;  
      
      case 3: obstacle.addImage(obstacleImg3);
      break;  
        
      case 4: obstacle.addImage(obstacleImg4);
      break;  
        
      case 5: obstacle.addImage(obstacleImg5);
      break;  
        
      case 6: obstacle.addImage(obstacleImg6);
      break;  
              
  }    
    
  }
}