var backgroundImg, background;
var zombiesImg,zombies,giants,giantsImg;
var hunterImg,hunter;
var bulletImg,bullet;
var score = 0;
var life = 5;
var gameState = 1;
var zombiesGroup, bulletGroup, giantsGroup;
var zombieSound, blast;

function preload() {
  backgroundImg = loadImage("assets/graveyard.jpg");
  zombiesImg = loadImage("assets/zombie.png");
  hunterImg = loadImage("assets/hunter.png");
  giantsImg = loadImage("assets/giants.png");
  bulletImg = loadImage("assets/bullet.png");
  blast = loadSound("assets/mixkit-fast-game-explosion-1688.wav");
  zombieSound = loadSound("assets/ZombieSound.mp3");
  blastImg = loadImage("assets/blast.png");
}

function setup() {
  createCanvas(800,400);

  hunter = createSprite(50,340,20,20);
  hunter.addImage(hunterImg);
  
  bulletGroup = createGroup();
  zombieGroup = createGroup();
  giantsGroup = createGroup();

}

function draw() {
  background(backgroundImg);

  textSize(20);
  fill(255,255,255);
  text("Score: "+score,70,70);
  
  textSize(20);
  fill(255,255,255);
  text("Life: "+life,70,90);

  textSize(20);
  fill(255,0,0);
  text("Press up arrow and down arrow to control.", 300,30);

  textSize(20);
  fill(255,0,0);
  text("Press space key to shoot.", 300,50);

  textSize(20);
  fill(255,0,0);
  text("Zombies = 1, Giants = 5", 300,70);
  
  if(gameState === 1){
    if(keyDown("UP_ARROW") && hunter.y > 100){
      hunter.y -= 5;
    }
  
    if(keyDown("DOWN_ARROW") && hunter.y < 300){
      hunter.y += 5;
    }
  
    if(keyDown("SPACE")){
      shootBullets();
    }
  
    if(frameCount % 130 === 0) {
      spawnZombies();
    }
  
    if(frameCount % 170 === 0){
      spawnGiants();
    }
  
    if(zombieGroup.collide(hunter)){
      life = life-1;
      zombieGroup.destroyEach(zombies);
      zombieSound.play();
    }
  
    if(giantsGroup.collide(hunter)){
      life = life-5;
      giantsGroup.destroyEach(giants);
    }
  
    if(zombieGroup.collide(bulletGroup)){
      zombieGroup.destroyEach(zombies);
      bulletGroup.destroyEach(bullet);
      blast.play();
      score = score + 1;
      zombies.addImage(blastImg);
    }
  
    if(giantsGroup.collide(bulletGroup)){
      giantsGroup.destroyEach(giants);
      bulletGroup.destroyEach(bullet);
      blast.play();
      score = score + 5;
      giants.addImage(blastImg);
    }
  
  }
  if(life <=0){
    gameState = 2;
  if(gameState === 2){
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });

    
  }
  }

  drawSprites();
}

function shootBullets(){
  bullet = createSprite(150,width/2,50,20);
  bullet.y = hunter.y - 10;
  bullet.addImage(bulletImg);
  bullet.velocityX = 5;
  bullet.scale = 0.12;
  bulletGroup.add(bullet);
}

function spawnZombies(){
  zombies = createSprite(800,random(20,500),50,50);
  zombies.addImage(zombiesImg);
  zombies.scale = 0.5;
  zombies.velocityX = -5;
  zombies.lifetime = 400;
  zombieGroup.add(zombies);
}

function spawnGiants(){
  giants = createSprite(800,random(20,500),50,50);
  giants.addImage(giantsImg);
  giants.scale = 1;
  giants.velocityX = -2;
  giants.lifetime = 400;
  giantsGroup.add(giants);
}