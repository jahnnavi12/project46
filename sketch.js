var canvas, backgroundImage;
var trackS;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var car1,cars,car1_img;

function preload(){
track = loadImage("../images/jungle.png");
seed1=loadImage("images/seeds.png");
seed2=loadImage("images/sedds2.png");
seed3=loadImage("images/seeds3.png");
seed4=loadImage("images/seeds4.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  seedObj = new Plant();

  seedStock=database.ref('seeds');
  seedStock.on("value",readStock);

  plantedTime=database.ref('plantedTime');
  plantedTime.on("value",function(data){
  lastPlanted=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(550,250,10,10);
//  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("PLANT SEED");
  feed.position(500,15);
  feed.mousePressed(plantSeeds);

  addFood=createButton("ADD SEEDS");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);

 //next=createButton("NEXT");
  //next.position(800,450);
  //next.mousePressed(nextS);
}


function draw(){

if(gameState===0){
  addFood.hide();
  feed.hide();
} 
  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
form.hide();
greeting!=greeting.hide();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
if(gameState===3){
  greeting.hide();
  trackS=createSprite(200,200);
  trackS.addImage(track);
}
}
//function to read food Stock
function readStock(data){
  seedS=data.val();
  seedObj.updateSeedStock(seedS);
}


//function to update food stock and last fed time
function plantSeeds(){

  seedObj.updateSeedStock(seedObj.getSeedStock()-1);
  database.ref('/').update({
    seeds:seedObj.getSeedStock(),
    plantedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  seedS++;
  database.ref('/').update({
    seeds:seedS
  })
}

function nextS(){
gameState===3;
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

