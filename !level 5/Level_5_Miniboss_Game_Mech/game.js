var canvas;
var context;
var timer;
var interval = 1000/60;

var hit = false
var angle = 0;
var score = 0;
var health = 3;

var frictionX = .85;	
var frictionY = .85;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var img = document.getElementById("spider");

var Player1 = new GameObject(canvas.width/2, canvas.height/2, 50, 50, "red");
var bullet = new GameObject(0, 0, 10, 10, "#39FF14");
//var enemy1 = new GameObject(canvas.width/2, canvas.height/4, 33, 15, "black")



//CANVAS NUMBER 2 FOR SCORE

var canvas1;
var context1;
canvas1 = document.getElementById("canvas_score");
context1 = canvas1.getContext("2d");



//CANVAS 2



var bits = [

    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`)

]

var ammunition = [

    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14"),
    new GameObject(0,0,10,10,"#39FF14")

]

var enemies = [

    new GameObject(-20, -20, 33, 15, "black"),
    new GameObject(-20, -20, 33, 15, "black"),
    new GameObject(-20, -20, 33, 15, "black"),
    new GameObject(-20, -20, 33, 15, "black"),
    new GameObject(-20, -20, 33, 15, "black")

]

Player1.vx = 0;
Player1.vy = 0;


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

//DRAWING MORE ENEMIES
//vvvvvvvvvvvvvvvvvvvv
for (var x1 = 0; x1 < enemies.length; x1++) //intialization
{
    //console.log("Drawing Enemy: ", enemies[e])
    enemies[x1].color = "black";
    enemies[x1].spawnX = 0;
    enemies[x1].spawnY = 0;

    enemies[x1].vx = 0;
    enemies[x1].vy = 0;

    enemies[0].spawnX = 100; enemies[0].spawnY = 100
    enemies[1].spawnX = 700; enemies[1].spawnY = 100
    enemies[2].spawnX = 100; enemies[2].spawnY = 500
    enemies[3].spawnX = 800; enemies[3].spawnY = 500
    enemies[4].spawnX = 780; enemies[4].spawnY = 800

    context.drawImage(spider, enemies[x1].x-23, enemies[x1].y-10, enemies[x1].width*1.4, enemies[x1].height*1.4);

}


function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	
    context1.clearRect(0,0,canvas1.width,canvas1.height);
    //SCOREBOARD DESIGN------------------------------------------------------------------

    
    context1.fillStyle = "white"
    context1.font = "30px calibri"
    context1.fillText("Score: " + score,10,30)

    context1.fillStyle = "white"
    context1.font = "30px calibri"
    context1.fillText("Health: " + health,10,60)
    
    //-----------------------------------------------------------------------------------

    Player1.move();
    bullet.move();
    
    
    //Player1 MOVEMENT
    if(w){Player1.vx = 0; Player1.vy = -5;}//up
    if(s){Player1.vx = 0; Player1.vy = 5;}//down
    if(d){Player1.vx = 5; Player1.vy = 0;}//right
    if(a){Player1.vx = -5; Player1.vy = 0;}//left

    if(w && d){Player1.vx = 5; Player1.vy = -5;}//up  && right
    if(w && a){Player1.vx = -5; Player1.vy = -5; }//up && left
    if(s && a){Player1.vx = -5; Player1.vy = 5;}//down && left
    if(s && d){Player1.vx = 5; Player1.vy = 5;} //down && right

   

    //SHOOTING
    if(space == true)
    {   
        console.log("SPACE PRESSED: ", "Enemy Hit: ", hit)
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
    
    for (var i = 0; i < enemies.length; i++) {
        if (bullet.hitTestObject(enemies[i])) {
            score++
            hit = true;
            console.log(enemies[i].y, "enemy hit", hit)    //Alert the console
            bullet.vx = 0; bullet.vy = 0;    //stop bullet
            bullet.x = -20; bullet.y = -20;  //send it back
            enemies[i].color = "red";

            for (var x = 0; x < bits.length; x++) 
            {
                console.log("drawing bits")
                bits[x].vx = 0;
                bits[x].vy = 0;
                bits[x].x = enemies[i].x + randomRange(5, 20);//setting hit location
                bits[x].y = enemies[i].y + randomRange(5, 20);
                bits[x].vx = randomRange(-10, 10);//BITS dispersion
                bits[x].vy = randomRange(-10, 10);

                //Friction
                bits[x].vx *= frictionX;
                bits[x].vy *= frictionY;

                bits[x].move()
                bits[x].drawCircle();
                
                    
            }
            enemies[i].spawnX = -100
            enemies[i].spawnY = -100
            

            
        } else { enemies[i].color = "black" }
    }
    
    for(var x2 = 0; x2 < enemies.length; x2++)//MOVE + DRAW
    {

        //sin wave

        angle-=0.2;
	    
        var radians = angle * Math.PI/90;
	    enemies[x2].x = enemies[x2].spawnX + Math.sin(radians) * 40;
        var radians = angle * Math.PI/180;
	    enemies[x2].y = enemies[x2].spawnY + Math.sin(radians) * 70;
        enemies.y +=1


        enemies[x2].move()
        enemies[x2].drawCircle();
        context.drawImage(spider, enemies[x2].x-23, enemies[x2].y-10, enemies[x2].width*1.4, enemies[x2].height*1.4);
    
    }    

    for(var i = 0; i < enemies.length; i++)//Enemy hit detection to PLAYER
    {
        if(enemies[i].hitTestObject(Player1))
        {
            health--;

            Player1.x = canvas.width/2; Player1.y = canvas.height/2;
        }
    }
    for(var i = 0; i < bits.length; i++)//bits hit detection to PLAYER
    {
        if(bits[i].hitTestObject(Player1))
        {
            health--;

            Player1.x = canvas.width/2; Player1.y = canvas.height/2;
        }
    }
    
    playerWallCollision();
    bulletWallCollision();

    //drawing
    Player1.drawCircle();
    PlayerDirection();
    
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

