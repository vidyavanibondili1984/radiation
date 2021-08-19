var ray;
var panel;
var absorbed = 0;
var power_gen = 0;

var raysGroup,panelGroup;
var polyImage;
var temp= -20;
var pan1,pan2;
var no_span = 1;
var panel1_voltage =0;
var panel2_voltage = 0;
var bg;

var fan1;
var fan_anim;

function preload()
{
  sun = loadImage("sun.png");
  bg = loadImage("Asset-05.png")
  s_pan = loadImage("s_panel.png");
  fan_anim = loadAnimation("fan-01.png","fan-02.png","fan-03.png","fan-04.png");
  fan_anim.play = false;
  fan_img = loadImage("fan-01.png");
  display = loadImage("disp.png");

  g_house_img = loadImage("Asset-04.png")
}

function setup() 
{
  createCanvas(800, 500);
  
  raysGroup = createGroup();
  panelGroup = createGroup();

  g_house = createSprite(400,250,100,100);
  g_house.addImage(g_house_img);
  g_house.scale = 0.035;
  
  pan1 = createSprite(100,height-50,80,80);
  pan1.addImage(s_pan);
  pan1.scale = 0.08;

  pan2 = createSprite(width-100,height-50,80,80);
  pan2.addImage(s_pan);
  pan2.scale = 0.08;

  fan = createSprite(270,240,20,20);
  fan.addImage(fan_img);
  fan.scale = 0.015;
  fan.addAnimation('run',fan_anim);

  fan2 = createSprite(500,240,20,20);
  fan2.addImage(fan_img);
  fan2.scale = 0.015;
  fan2.addAnimation('run',fan_anim);
  textSize(15);
  
}

function draw() 
{
  background(220);
  image(bg,0,0,width,height);
  image(display,600,10,200,60)
  power_gen = panel1_voltage + panel2_voltage;
  // text("Absorbed: ",300,10)
  // text(absorbed,360,10);
  push();
  noStroke();
  fill(255,255,0)
  text("Voltage : ",620,37)
  text(power_gen,680,37)

  text("Temprature : ",620,56)
  text(temp,710,56);
  pop();
  
  makeRay();

  //calculate wattege
  if(panel1_voltage<5)
  {
    panel1_voltage = round(absorbed* 0.75);
  }
  if(panel2_voltage<5)
  {
    panel2_voltage = round(absorbed* 0.75);
  }

  if(power_gen>=8 && temp>=30)
  {
    fan.changeAnimation('run');
    temp-=0.5;
  }

  if(power_gen>=4 && temp>=30)
  {
    fan2.changeAnimation('run');
    temp-= 0.5;
  }

  drawSprites();
  // console.log(panel1_voltage);
  // console.log(panel1_voltage);
  
}

function makeRay()
{
  
   if (frameCount % 30 === 0) 
   {
    var x = Math.round(random(10,550));
    ray = createSprite(x,50,10,10);
    ray.addImage(sun);
    ray.scale = 0.011;
    vx = random(-1,1);
    ray.velocityY = 3;
    ray.velocityX = vx;
    ray.lifetime = 134;
    raysGroup.add(ray);
   }

  raysGroup.overlap(pan1,explosion);
  raysGroup.overlap(pan2,explosion);
  raysGroup.overlap(g_house,temp_rise)
}

function explosion(sprA)
{
   sprA.remove()
   absorbed+=1;
}

function temp_rise(sprb)
{
  sprb.remove();
  temp+=1;
}

