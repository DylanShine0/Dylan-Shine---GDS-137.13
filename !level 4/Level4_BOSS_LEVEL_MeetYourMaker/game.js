var canvas;
var context;
var timer;
var interval = 1000/60;

//var score1 = 0;
var hit = false
var angle = 0;
var frictionX = .85;	
var frictionY = .85;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var img = document.getElementById("spider");

var Player1 = new GameObject(canvas.width/2, canvas.height/2, 50, 50, "red");
var bullet = new GameObject(0, 0, 10, 10, "#39FF14");
var enemy1 = new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black")

var bits = [

    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`),
    new GameObject(enemy1.x, enemy1.y, 5, 5, `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`)

]

var ammunition = [

    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14")

]

var enemies = [

    new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black"),
    new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black"),
    new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black"),
    new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black"),
    new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black")

]

Player1.vx = 0;
Player1.vy = 0;

enemy1.vx = 0;
enemy1.vy = 0;

timer = setInterval(animate, interval);

//misc
function wait(ms) {
    console.log("waiting...");
    setTimeout(function() { console.log('End'); }, ms); 
}
  

function randomRange(high, low)
{
    return Math.random() * (high - low) + low;
}
//misc


function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    Player1.move();
    bullet.move();
    enemy1.move();
    
    //Player1 MOVEMENT
    if(w){Player1.vx = 0; Player1.vy = -5;}//up
    if(s){Player1.vx = 0; Player1.vy = 5;}//down
    if(d){Player1.vx = 5; Player1.vy = 0; console.log("RIGHT PRESSED")}//right
    if(a){Player1.vx = -5; Player1.vy = 0; console.log("LEFT PRESSED")}//left

    if(w && d){Player1.vx = 5; Player1.vy = -5;}//up  && right
    if(w && a){Player1.vx = -5; Player1.vy = -5; }//up && left
    if(s && a){Player1.vx = -5; Player1.vy = 5;}//down && left
    if(s && d){Player1.vx = 5; Player1.vy = 5;} //down && right

   

    //SHOOTING
    if(space == true)
    {   
        console.log("space pressed")
        bullet.x = Player1.x; bullet.y = Player1.y;

        //Horizontal + Vertical Movement
        if(Player1.vx == 0 && Player1.vy == -5)
        {
            bullet.vx = 0; bullet.vy = -15;
            space = false;
        }
        if(Player1.vx == 0 && Player1.vy == 5)
        {     
            bullet.vx = 0; bullet.vy = 15;
            space = false;
        }
        if(Player1.vx == 5 && Player1.vy == 0)
        {    
            bullet.vx = 15; bullet.vy = 0;
            space = false;
        }
        if(Player1.vx == -5 && Player1.vy == 0)
        {  
            bullet.vx = -15; bullet.vy = 0;
            space = false;
        }

        //DIAGONALS
        if(Player1.vx == 5 && Player1.vy == -5) //up right
        { 
            bullet.vx = 15; bullet.vy = -15;
            space = false;
        }
        if(Player1.vx == -5 && Player1.vy == -5) //up left
        {  
            bullet.vx = -15; bullet.vy = -15;
            space = false;
        }
        if(Player1.vx == -5 && Player1.vy == 5) //down left
        {
            bullet.vx = -15; bullet.vy = 15;
            space = false;
        }
        if(Player1.vx == 5 && Player1.vy == 5) //down right
        {
            bullet.vx = 15; bullet.vy = 15;
            space = false;
        }
    }

    //BULLET HIT DETECTION
    //vvvvvvvvvvvvvvvvvvvv
    if(bullet.hitTestObject(enemy1))
    {
        hit = true;
        console.log("enemy hit", hit)         //Alert the console

        bullet.vx = 0; bullet.vy = 0;    // stop bullet
        bullet.x = -20; bullet.y = -20;  //send it back
        enemy1.color = "red";
       
        for(var x = 0; x < bits.length; x++) //BITS dispersion
        {
            bits[x].vx = randomRange(-10, 10);
            bits[x].vy = randomRange(-10, 10);
        }
        
    }else{enemy1.color = "black"}

    for(var j = 0; i < bits.length; i++)//start INITIALIZATION
    {
        console.log("drawing bits")
        bits[j].vx = 0;
        bits[j].vy = 0;
        bits[j].x = Player1.x + randomRange(5,20);
        bits[j].y = Player1.y + randomRange(5,20);
        bits[j].color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`;
    }

    for(var i = 0; i < bits.length; i++)//MOVE + DRAW
    {  
        //Friction
        bits[i].vx *= frictionX;
        bits[i].vy *= frictionY;

        bits[i].move()
        bits[i].drawCircle();
    }    

    //DRAWING MORE ENEMIES
    //vvvvvvvvvvvvvvvvvvvv
    for(var x1= 0; x1 < enemies.length; x1++) //intialization
    {
        //console.log("Drawing Enemy: ", enemies[e])
        enemies[x1].color = "black";
        enemies[x1].x = 0;
        enemies[x1].y = 280;

        enemies[x1].vx = 0;
        enemies[x1].vy = 0;
        
        

        enemies[0].x = 100; enemies[0].y = 100
        enemies[1].x = 700; enemies[1].y = 100
        enemies[2].x = 100; enemies[2].y = 500
        enemies[3].x = 800; enemies[3].y = 500
        enemies[4].x = 780; enemies[4].y = 800
                            
                            
    
        
        
        
    }   

    for(var x2 = 0; x2 < enemies.length; x2++)//MOVE + DRAW
    {

        //sin wave

        angle-=0.2;
	    
        var radians = angle * Math.PI/90;
	    enemies[x2].x = enemies[x2].x + Math.sin(radians) * 40;
        var radians = angle * Math.PI/180;
	    enemies[x2].y = enemies[x2].y + Math.sin(radians) * 70;
        enemies.y +=1


        enemies[x2].move()
        enemies[x2].drawCircle();
        context.drawImage(spider, enemies[x2].x-23, enemies[x2].y-10, enemies[x2].width*1.4, enemies[x2].height*1.4);
    
    }    

    
   
        
  
    
    
    
    playerWallCollision();
    bulletWallCollision();

    //drawing
    Player1.drawCircle();
    PlayerDirection();
    
    enemy1.drawCircle();

    context.drawImage(spider, enemy1.x-23, enemy1.y-10, enemy1.width*1.4, enemy1.height*1.4);
    
    bullet.drawCircle();
    


}

function playerWallCollision()
{   
	//Player1 COLLISION      screen boundary
    //top of the canvas
    if (Player1.y < 0 + Player1.width/2) 
    {
        Player1.y = 0 + Player1.width/2;
    }
    //bottom of canvas
    if (Player1.y > canvas.height - Player1.width/2) 
    {
        Player1.y = canvas.height - Player1.width/2
    }
    //left of canvas
    if(Player1.x < 0 + Player1.width/2)
    {
        Player1.x = 0 + Player1.width/2;
    }
    //right of canvas
    if(Player1.x > canvas.width - Player1.width/2)
    {
        Player1.x = canvas.width - Player1.width/2;
    }
}
function bulletWallCollision()
{
    //bullet COLLISION      screen boundary
    //top of the canvas
    if (bullet.y < 0 + bullet.width/2) 
    {
        bullet.y = 0 + bullet.width/2;              //Hit the wall
        bullet.vx = 0; bullet.vy = 0;               //stop bullet
        bullet.x = -20; bullet.y = -20;             //send it back
    }
    //bottom of canvas
    if (bullet.y > canvas.height - bullet.width/2) 
    {
        bullet.y = canvas.height - bullet.width/2   //Hit the wall
        bullet.vx = 0; bullet.vy = 0;               //stop bullet
        bullet.x = -20; bullet.y = -20;             //send it back
    }
    //left of canvas
    if(bullet.x < 0 + bullet.width/2)
    {
        bullet.x = 0 + bullet.width/2;              //Hit the wall
        bullet.vx = 0; bullet.vy = 0;               //stop bullet
        bullet.x = -20; bullet.y = -20;             //send it back
    }
    //right of canvas
    if(bullet.x > canvas.width - bullet.width/2)
    {
        bullet.x = canvas.width - bullet.width/2;   //Hit the wall
        bullet.vx = 0; bullet.vy = 0;               //stop bullet
        bullet.x = -20; bullet.y = -20;             //send it back
    }
}
function PlayerDirection()//PROBLEM LINE WONT ROTATE WITH MOVEMENT DIRECTION
{
    context.save();
        context.strokeStyle = "white";
        context.beginPath()
	    context.moveTo(Player1.x, Player1.y + 24);
        context.lineTo(Player1.x, Player1.y -24);
	    context.lineWidth = 3;
	    context.stroke();
        context.closePath();
    context.restore();
}

