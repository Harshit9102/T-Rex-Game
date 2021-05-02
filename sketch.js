var trex, trex_running, edges;
var ground, ground_image;
var fake_ground;
var cloud,cloudImage;
var obstacles,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6;
var score=0;
var cloud_group;
var obstacle_group;

var play=1;
var end=0;
var gameState=play;
var trex_collided;

var restart,restartImage;
var gameOver,overImage;

var jumpSound;
var dieSound;
var checkPoint;  

function preload(){
  trex_running = loadAnimation("trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  
  obstacleImage1 = loadImage("obstacle1.png");
   obstacleImage2 = loadImage("obstacle2.png");
   obstacleImage3 = loadImage("obstacle3.png");
   obstacleImage4 = loadImage("obstacle4.png");
   obstacleImage5 = loadImage("obstacle5.png");
   obstacleImage6 = loadImage("obstacle6.png");
  
  restartImage = loadImage("restart.png");
  overImage = loadImage("gameOver.png");
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkPoint=loadSound("beep-07.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //console.info("Harshit");
 // console.error("This is error");
 // console.warn("This is Warning");
  
  // creating trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider("circle",0,0,40);
  trex.debug=false;

  
  
  edges = createEdgeSprites();
  
  
  ground = createSprite(300,height-40,600,10);
  ground.addImage(ground_image);
  
  
  fake_ground = createSprite(300,height-30,600,1);
  fake_ground.visible=(false);
  
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.X= 100;
  
  cloud_group = new Group(); 
  obstacle_group = new Group();
  
  restart = createSprite(width/2,height/2,1,1);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  gameOver = createSprite(width/2,height/2-25,1,1);
  gameOver.addImage(overImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
}


function draw(){
  
  
  //set background color 
  background("skyblue");
  
  
  
  if(gameState===play){
    
    score=score+Math.round(getFrameRate()/60.5);
    
    ground.velocityX=-(4+score/200);
    
    //console.log(ground.velocityX);
    if(ground.x<0 ){
    ground.x=ground.width/2;
      
  }
    if(keyDown("space")&& trex.y>height-70){
    trex.velocityY = -10;
     jumpSound.play(); 
  }
    trex.velocityY = trex.velocityY + 0.5;
    
    spawn_clouds();
  
    spawn_obstacles();
    
    if(trex.isTouching(obstacle_group)){
      gameState=end;
      dieSound.play();
      
    }   
    
    if(score%100===0 && score>0){
      checkPoint.play();
    }
    
  }
   else if(gameState===end){
    ground.velocityX=0;
     trex.changeAnimation("collided", trex_collided);
     trex.velocityY=0;
     restart.visible=true;
     gameOver.visible=true;
     obstacle_group.setVelocityXEach(0);
     obstacle_group.setLifetimeEach(-1);
     cloud_group.setVelocityXEach(0);
     cloud_group.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)){
      reset();
     }
  }
  
 // stroke("black");
  textSize(20);
  fill("black");
  text("score="+score,width-90,height-250); 

  
  //logging the y position of the trex
  //console.log(trex.y) 
  
  
 // console.log(number);
  
  
  
  //jump when space key is pressed
  
   
  
  
  
  //stop trex from falling down
  trex.collide(edges);
  trex.collide(fake_ground);
  
 
  
  drawSprites();
  
  //text(mouseX+","+mouseY,mouseX,mouseY);  
  
  
}

function spawn_clouds(){
  if(frameCount%60===0){
    cloud = createSprite(600,70,10,10);
    cloud.velocityX=-5;
   cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.y=Math.round(random(height-300,height-200));
    //console.log(trex.depth);
    cloud.depth=trex.depth;
    trex.depth= trex.depth+1;
    cloud.lifetime=200;      
    cloud_group.add(cloud);
  }
}

function spawn_obstacles(){
  if(frameCount%80===0){
    obstacles=createSprite(650,height-40,10,10);
    obstacles.velocityX=-(4+score/200);
    var A =Math.round(random(1,6));
  switch(A){
    case 1:obstacles.addImage(obstacleImage1);
      break;
      case 2:obstacles.addImage(obstacleImage2);
      break;
       case 3:obstacles.addImage(obstacleImage3);
      break;
       case 4:obstacles.addImage(obstacleImage4);
      break;
       case 5:obstacles.addImage(obstacleImage5);
      break;
       case 6:obstacles.addImage(obstacleImage6);
      break;
      default:break;
  }
    obstacles.scale=0.5;
    obstacles.lifetime=200;
    obstacle_group.add(obstacles);
  }
  
}

function reset(){
  gameState=play;
  score=0;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  trex.changeAnimation("running", trex_running);
}

