var Bommenlijst = new Array("jan","jaap","robert","juliana")
let aantalLevens = 2;

var xPositie;
var yPositie;

var xSpeed = 1;
var ySpeed = 1;

class Bom {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapgrootte = floor(random(-3,4));
  }
  
  beweeg() {
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

class Apple {
  constructor(x,y){
    this.xPositie = x;
    this.yPositie = y;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.sprite = null;
  }
  
  toon(){
   image(this.sprite, this.xPositie, this.yPositie, raster.celGrootte, raster.celGrootte);
  }
  
  beweeg() {
  this.xPositie += this.xSpeed * raster.celGrootte;
  this.yPositie += this.ySpeed * raster.celGrootte;
  
  
  if (this.xPositie <= 0 || this.xPositie >= canvas.width - raster.celGrootte) {
    this.xSpeed *= -1;  
  }
  if (this.yPositie <= 0 || this.yPositie >= canvas.height - raster.celGrootte) {
    this.ySpeed *= -1;  
  } 
  
  this.xPositie = constrain(this.xPositie, 0, canvas.width - raster.celGrootte);
  this.yPositie = constrain(this.yPositie, 0, canvas.height - raster.celGrootte);
  }
  
  
}


class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  

  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
  }
  
  beweeg() {
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      background('red');
      return true;
    }
    else {
      return false;
    } 
    

  }
  
  wordtGeraakt(bom) {
    if (this.x == bom.x && this.y == bom.y) {
      background('red');
      return true;
      
    }
    else {
      return false;
    }
    
    wordtGeraakt(groen) {
    // Controleer of Eve de appel raakt
    if (this.x < object.x + raster.celGrootte && 
        this.x + raster.celGrootte > object.x && 
        this.y < object.y + raster.celGrootte && 
        this.y + raster.celGrootte > object.y) {
        return true;
    }
    return false;
}
    
  }
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}  

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(5);
  textFont("Verdana");
  textSize(90);
  
  raster = new Raster(12,18);
  
  raster.berekenCelGrootte();
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  
  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png"); 

  jan = new Bom(floor(random(10,18))*50,floor(random(1,12))*50);
  jan.stapGrootte = 1*raster.celGrootte;
  jan.sprite = loadImage("images/sprites/bom.png")
    
  jaap = new Bom(floor(random(10,18))*50,floor(random(1,12))*50);
  jaap.stapGrootte = 1*raster.celGrootte;
  jaap.sprite = loadImage("images/sprites/bom.png")
  
  robert = new Bom(floor(random(10,18))*50,floor(random(1,12))*50);
  robert.stapGrootte = 1*raster.celGrootte;
  robert.sprite = loadImage("images/sprites/bom.png")
    
  juliana = new Bom(floor(random(10,18))*50,floor(random(1,12))*50);
  juliana.stapGrootte = 1*raster.celGrootte;
  juliana.sprite = loadImage("images/sprites/bom.png")
  
  bart = new Bom(floor(random(10,18))*50,floor(random(1,12))*50);
  bart.stapGrootte = 1*raster.celGrootte;
  bart.sprite = loadImage("images/sprites/bom.png")
  
  groen = new Apple(raster.celGrootte,height/2);
  groen.xSpeed = 1; 
  groen.ySpeed = 1; 
  groen.sprite = loadImage("images/sprites/appel_1.png");

  
 
}


function draw() {
  background(brug);
  raster.teken();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  jan.beweeg();
  jaap.beweeg();
  robert.beweeg();
  juliana.beweeg();
  bart.beweeg();
  groen.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();
  jan.toon();
  jaap.toon();
  robert.toon();
  juliana.toon();
  bart.toon();
  groen.toon();


  if (eve.wordtGeraakt(jan) || eve.wordtGeraakt(jaap) || eve.wordtGeraakt(robert) || eve.wordtGeraakt(juliana) || eve.wordtGeraakt(bart) || eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
    aantalLevens--;
  }
  
  if (eve.wordtGeraakt(groen)){
    aantalLevens ++;
  }
  
  if (eve.gehaald) {
    background('green');
    fill('white');
    textSize(44);
    text("Je hebt gewonnen!",30,300);
    noLoop();
    }  
  
  if (aantalLevens <= 0){
    background('red');
    fill('white');
    textSize(32);
    text("Je bent te vaak geraakt, je hebt geen levens meer.",50, 300);
    noLoop();
  }
  
  fill('black');
  textSize(20);
  text("Levens: "+aantalLevens+ "",30,30);
}
  