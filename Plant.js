class Plant {
    constructor(){
    this.seedStock=0;
    this.lastPlanted;
    this.image=loadImage('images/seeds.png');
    }
  
   updateSeedStock(seedStock){
    this.seedStock=seedStock;
   }
  
   getPlantedTime(lastPlanted){
     this.lastPlanted=lastPlanted;
   }
  
   deductPlant(){
     if(this.seedStock>0){
      this.seedStock=this.seedStock-1;
     }
    }
  
    getseedStock(){
      return this.seedStock;
    }
  
    display(){
        background(46,139,87);
  
        fill(255,255,254);
        textSize(15);
        if(this.lastPlanted>=12){
            text("Last Planted : "+ this.lastPlanted%12 + " PM", 50,30);
        }else if(this.lastPlanted==0){
            text("Last Planted : 12 AM",50,30);
        }else{
            text("Last Planted : "+ this.lastPlanted + " AM", 50,30);
        }
        var x=70,y=100; 
        imageMode(CENTER);
        if(this.seedStock!=0){
        for(var i=0;i<this.seedStock;i++){
          if(i%10==0){
            x=70;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
  
   // bedroom(){
     //   background(bedroom,550,500);  
    //}
      
    //garden(){
    //    background(garden,550,500);  
    //} 
  
    //washroom(){
      //  background(washroom,550,500); 
    //}
  }