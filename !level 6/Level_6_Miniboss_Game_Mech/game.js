var canvas;
var context;
var timer;
var interval = 1000/60;
timer = setInterval(animate, interval);

var hit = false
var destination;
var angle = 0;
var score = 0;
var health = 3;
var playerSpeed = 4;

var frictionX = .85;	
var frictionY = .85;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

var bitShotSound = document.getElementById("bit-Shot");
var enemyDeath = document.getElementById("enemy-death");

bitShotSound.currentTime = 0;
enemyDeath.currentTime = 0;

var img = document.getElementById("spider");

var Player1 = new GameObject(canvas.width/2, canvas.height/2, 50, 50, "red", 0);
var bullet = new GameObject(0, 0, 15, 15, "#39FF14", 0);

var bits=[];

var playerBits = [];

Player1.force = 1;


//CANVAS NUMBER 2 FOR SCORE
var canvas1;
var context1;
canvas1 = document.getElementById("canvas_score");
context1 = canvas1.getContext("2d");

/*
var currentState ="menu";
var states = [];
states.length = 1;

function changeStates(stateName)
{
	currentState = stateName;
}
//changeStates("menu");
states["menu"] = function()
{
	
	context.save();
		context.fillStyle = "black";
		context.font = "bold 78px Arial"
		context.textAlign = "center";
		context.fillRect(0, canvas.height/2-100,canvas.width, 200);
		context.fillStyle = "white";
		context.fillText("menu", canvas.width/2, canvas.height/2+78/4)
	context.restore();
}
*/

function bitsInitialize()
{
    for(var i = 0; i < 18; i++)
    {
        console.log("bits spawning")
        bits[i] = new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`);

    }
}

var playerBits = [//9

    
        
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0),
    new GameObject(-100, -100, 5, 5, `rgb(${randomRange(255, 200)}, ${randomRange(40, 0)}, ${randomRange(255, 200)})`,0)

]

var ammunition = [

    new GameObject(0,0,10,10,"#39FF14",0),
    new GameObject(0,0,10,10,"#39FF14",0),
    new GameObject(0,0,10,10,"#39FF14",0),
    new GameObject(0,0,10,10,"#39FF14",0),
    new GameObject(0,0,10,10,"#39FF14",0)

]

var enemies = [

    new GameObject(-100, -100, 33, 15, "black",0),
    new GameObject(-100, -100, 33, 15, "black",0),
    new GameObject(-100, -100, 33, 15, "black",0),
    new GameObject(-100, -100, 33, 15, "black",0),
    new GameObject(-100, -100, 33, 15, "black",0)

]

//DRAWING MORE ENEMIES
//vvvvvvvvvvvvvvvvvvvv 

    enemies[0].spawnX = 100; enemies[0].spawnY = 100
    enemies[1].spawnX = 700; enemies[1].spawnY = 100
    enemies[2].spawnX = 100; enemies[2].spawnY = 500
    enemies[3].spawnX = 800; enemies[3].spawnY = 500
    enemies[4].spawnX = 780; enemies[4].spawnY = 800
for (var x1 = 0; x1 < enemies.length; x1++) //intialization
{
   

    enemies[x1].destX =  enemies[x1].spawnX;
    enemies[x1].destY =  enemies[x1].spawnY;
   

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
    if(w)
    {
        Player1.angle = 0
        Player1.vx = 0; 
        Player1.vy = -playerSpeed; 
        
    }//up
    if(s)
    {
        Player1.angle = 180
        Player1.vx = 0;
        Player1.vy = playerSpeed; 
        
    }//down
    if(d)
    {
        Player1.angle = 90
        Player1.vx = playerSpeed; 
        Player1.vy = 0; 
        
    }//right
    if(a)
    {
        Player1.angle = 270
        Player1.vx = -playerSpeed; 
        Player1.vy = 0; 
    }//left

    if(w && d){Player1.vx = playerSpeed; Player1.vy = -playerSpeed; Player1.angle = 45}//up  && right
    if(w && a){Player1.vx = -playerSpeed; Player1.vy = -playerSpeed; Player1.angle = 315}//up && left
    if(s && a){Player1.vx = -playerSpeed; Player1.vy = playerSpeed; Player1.angle = 225}//down && left
    if(s && d){Player1.vx = playerSpeed; Player1.vy = playerSpeed; Player1.angle = 135} //down && right

   

    //SHOOTING
    if(space == true)
    {   
        console.log("SPACE PRESSED: ", "Enemy Hit: ", hit)
        
        

        //Horizontal + Vertical Movement
        if(Player1.vx == 0 && Player1.vy == -playerSpeed)
        {
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = 0; bullet.vy = -15;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == 0 && Player1.vy == playerSpeed)
        {     
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = 0; bullet.vy = 15;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == playerSpeed && Player1.vy == 0)
        {    
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = 15; bullet.vy = 0;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == -playerSpeed && Player1.vy == 0)
        {  
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = -15; bullet.vy = 0;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }

        //DIAGONALS
        if(Player1.vx == playerSpeed && Player1.vy == -playerSpeed) //up right
        { 
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = 15; bullet.vy = -15;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == -playerSpeed && Player1.vy == -playerSpeed) //up left
        {  
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = -15; bullet.vy = -15;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == -playerSpeed && Player1.vy == playerSpeed) //down left
        {
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = -15; bullet.vy = 15;
            bitShotSound.currentTime = 0;
            bitShotSound.play();
            space = false;
        }
        if(Player1.vx == playerSpeed && Player1.vy == playerSpeed) //down right
        {
            bullet.x = Player1.x; bullet.y = Player1.y;
            bullet.vx = 15; bullet.vy = 15;
            bitShotSound.currentTime = 0;   
            bitShotSound.play();
            space = false;
        }
    }

    //BULLET HIT DETECTION
    //vvvvvvvvvvvvvvvvvvvv
    
    for (var i = 0; i < enemies.length; i++) {
        if (bullet.hitTestObject(enemies[i])) {

            enemyDeath.currentTime = 0;
            enemyDeath.play();

            score++
            hit = true;
            console.log(enemies[i].y, "enemy hit", hit)    //Alert the console
            bullet.vx = 0; bullet.vy = 0;    //stop bullet
            bullet.x = -20; bullet.y = -20;  //send it back

            enemies[i].color = "red";   

            

            enemies[i].spawnX = -100
            enemies[i].spawnY = -100
            enemies[i].follow = 0;

            bitsInitialize();
            
            for (var x = 0; x < bits.length; x++) 
            {
                console.log("drawing bits")
                bits[x].x = enemies[i].x + randomRange(5, 20);//setting hit location
                bits[x].y = enemies[i].y + randomRange(5, 20);  
            }
            for(var x = 0; x < bits.length; x++)
            {
                
                console.log("Bits dispersing")
                bits[x].vx = randomRange(-10, 10);//BITS dispersion
                bits[x].vy = randomRange(-10, 10);
            }
            
        } else { enemies[i].color = "black" }

        
    }
    for (var x = 0; x < bits.length; x++) {//FRICTION AND MOVEMENT BITS
        console.log("Moving and Drawing")

        bits[x].vx *= frictionX;//Friction
        bits[x].vy *= frictionY;
        bits[x].move();
        bits[x].drawCircle();
        
        
    }
    var distance = 300;
    for (var x2 = 0; x2 < enemies.length; x2++)//MOVE + DRAW  enemy
    {
       


        
        
        ///*
        //chase
        
        var dx = Player1.x - enemies[x2].spawnX;
        var dy = Player1.y - enemies[x2].spawnY;
        var dist = Math.sqrt(dx * dx + dy * dy);

        var rad2 =  Math.atan2(dy, dx);
        

        if (dist > distance) {
            dx = enemies[x2].destX - enemies[x2].spawnX;
            dy = enemies[x2].destY - enemies[x2].spawnY;
            
            enemies[x2].spawnX += dx * enemies[x2].follow;
            enemies[x2].spawnY += dy * enemies[x2].follow;
            
        }
        else{
        
            enemies[x2].spawnX += Math.cos(rad2) * 2
            enemies[x2].spawnY += Math.sin(rad2) * 2
        }
        var radians1 = Math.atan2(dy, dx);

        enemies[x2].vx = Math.cos(radians1) * enemies[x2].force;
        enemies[x2].vy = Math.sin(radians1) * enemies[x2].force;

        //sin wave
        angle -= 0.1;

        var radians = angle * Math.PI / 90;
        enemies[x2].x = enemies[x2].spawnX + Math.sin(radians) * 30 /*+ enemies[x2].vx*/;
        var radians = angle * Math.PI / 180;
        enemies[x2].y = enemies[x2].spawnY + Math.sin(radians) * 50 /*+ enemies[x2].vy*/;
        enemies[x2].y += 1

       
        
        

        enemies[x2].move()
        enemies[x2].drawCircle();
        context.drawImage(spider, enemies[x2].x - 23, enemies[x2].y - 10, enemies[x2].width * 1.4, enemies[x2].height * 1.4);
    }

    //*
    for (var i = 0; i < enemies.length; i++)//Enemy hit detection to PLAYER
    {
        
        if (Player1.hitTestObject(enemies[i])) {
            console.log("PLAYER HIT ENEMY")
            health--;
            Player1.x = canvas.width / 2;
            Player1.y = canvas.height / 2;
        }
    }
    for (var i = 0; i < bits.length; i++)//bits hit detection to PLAYER
    {
        
        if (Player1.hitTestObject(bits[i])) {
            console.log("PLAYER HIT BITS")
            health--;
            Player1.x = canvas.width / 2;
            Player1.y = canvas.height / 2;
        }
    }

   
    
    
    //*/
    
    playerWallCollision();
    bulletWallCollision();

    //drawing
    //Player1.drawCircle();
    Player1.drawCirclePlayer();
   


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
function follow()
{
    
}


