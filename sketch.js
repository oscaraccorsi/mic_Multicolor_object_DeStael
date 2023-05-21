let baseUrlPictures = ' https://oscaraccorsi.github.io/DeStael/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;

let img; 
let palette = [];
let pictureList = ['DeStael01.jpg', 
                   'DeStael02.jpg', 
                   'DeStael03.jpg', 
                   'DeStael04.jpg',
                   'DeStael05.jpg', 
                   'DeStael06.jpg', 
                   'DeStael07.jpg',  
                   'DeStael08.jpg', 
                   'DeStael09.png', 
                   'DeStael10.jpeg', 
                   'DeStael11.jpeg',
                   'DeStael12.jpg'];
let boxes = [];
let mic;

let numObjct;
//let dimObjct = 200;
let numNum = 5000;
let velArray = [-0.1, -0.05, 0.05, 0.1];

let howManyTime;

let margin = 200;

//--------------------------------------preload
function preload() {
  h = minute()%12;
  img = loadImage(baseUrlPictures +
                  pictureList[h]);
  logo = loadImage(baseURLImage + 
                   'good one white.png');
  console.log(pictureList[h]);
}

//--------------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  numObjct = round(random(2, width/100));
  mic = new p5.AudioIn();
  mic.start();
  
//--------------------------------------setInterval  
  howManyTime = round(random(30, 60));
  setInterval(reloadPage, 1000*howManyTime);
  
//------------------------------------------------palette 
  img.resize(100, 0);
  img.loadPixels();
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let alpha = round(random(100, 200));
    let c = color(r, g, b, 100);
    palette.push(c);    
  }

  for (let i = 0; i < numObjct; i++) {
    boxes[i] = {
      x: random(margin, width-margin),
      y: random(margin, height-margin),
      wdt: random(numNum/numObjct, numNum/numObjct+200),
      hgh: numNum/numObjct,
      speedX: random(velArray),
      speedY: random(velArray),
      col: random(palette)
    };
  }
}

//--------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--------------------------------------------------------
function draw() {
  let vol = mic.getLevel();
  background(30);
  noStroke();
  rectMode(CENTER);
  
  //for (i=0; i < boxes.length; i++) {
  //  let b = boxes[i];
  
  for (b of boxes) {   
    rect(b.x, b.y, b.wdt+vol*5000, b.hgh+vol*5000, 10);
    fill(b.col);
    b.x += b.speedX;
    b.y += b.speedY;

    if (b.x < b.wdt/2+10 || b.x > (width-b.wdt/2)-10) {
      b.speedX = -b.speedX;
    }
    if (b.y < b.hgh/2+10 || b.y > (height-b.hgh/2)-10) {
      b.speedY = -b.speedY;
    }
  }
  
} 

//----------------------------------reLoad
function reloadPage() {
   window.location.reload();
}
function mousePressed() {
  imageMode(CENTER);
  let xLogo = windowWidth-40;
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200);
  imageMode(CORNER);
  save();  
}
function keyPressed() {
  reloadPage();
}