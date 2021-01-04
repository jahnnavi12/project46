class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
    }
  
    play(){
      form.hide();
      Player.getPlayerInfo();
      
      currentTime=hour();
  if(currentTime==(lastPlanted+1)){
      update("Playing");
      seedObj.garden();
   }else if(currentTime==(lastPlanted+2)){
    update("Sleeping");
      seedObj.bedroom();
   }else if(currentTime>(lastPlanted+2) && currentTime<=(lastPlanted+4)){
    update("Bathing");
      seedObj.washroom();
   }else{
    update("Hungry")
    seedObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    
   }  
    }
  
    end(){
      console.log("Game Ended");
      }
  };
  