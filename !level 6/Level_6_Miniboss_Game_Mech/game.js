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
var playerSpeed = 2.5;

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

//BULLET INSTAINTIATION----------------------------------------------

var bullets = []        //new GameObject(0,0,10,10,"#39FF14",0)
                        //Used to select a bullet to fire
var currentBullet = 0;
                        //The timer for each bullet
var fireCounter = 30;
var fireRate =15;
var bulletAmount = 25;

var dir = {x:1,y:0};

for(var b = 0; b < bulletAmount; b++)
{
	bullets[b] = new GameObject(0,0,10,10,"#39FF14",0,10,{x:0,y:0});
	bullets[b].x = Player1.x;
	bullets[b].y = -1000;
    bullets[b].force = 15;
    bullets[b].vx = 0;
    bullets[b].vy = 0;
}	

//-------------------------------------------------------------------




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


    enemies[x1].destX = enemies[x1].spawnX;
    enemies[x1].destY = enemies[x1].spawnY;


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
    
    var accuracy1 = 0;
    var accuracy2 = 0;
    accuracy1 = randomRange(14,-14)
    accuracy2 = randomRange(14,-14)


    //----------------Firing Logic---------------------
	fireCounter--;
	
	if(space == true)
	{
		if(fireCounter <= 0)
		{
            //sound effect
            bitShotSound.currentTime = 0;
            bitShotSound.play();
			//place the bullet at the player's position minus the bullet's world
			bullets[currentBullet].x = Player1.x - bullets[currentBullet].world.x + accuracy1;
			bullets[currentBullet].y = Player1.y - bullets[currentBullet].world.y + accuracy2;
			//set the velocity using the dir modifier
			bullets[currentBullet].vx = dir.x * bullets[currentBullet].force;
			bullets[currentBullet].vy = dir.y * bullets[currentBullet].force;
			//reset the fireCounter
			fireCounter = fireRate;
			//increment the currentBullet index so that you can use the next bullet
			currentBullet++;
			//reset the currentBullet index when you exceed the bulletAmount
			if(currentBullet >= bulletAmount)
			{
				currentBullet = 0;
			}
		}
	}
	else
	{
		//Allow the player to fire when space is pressed.
		fireCounter = 0;
        space = false;
	}

    //PLAYER AND BULLETS MOVEMENT
    for (var b = 0; b < bullets.length; b++) 
    {
        bullets[b].move();
        bullets[b].drawCircle();

        //up
        if (w) 
        {
            Player1.vx = 0; Player1.vy = -playerSpeed;
            Player1.angle = 0

            dir.x = 0; dir.y = -1;
            bullets.vx = 0; bullets.vy = -15
        }
        //down
        if (s) 
        {
            Player1.vx = 0; Player1.vy = playerSpeed;
            Player1.angle = 180

            dir.x = 0; dir.y = 1;
            bullets.vx = 0; bullets.vy = 15
        }
        //right
        if (d) 
        {
            Player1.vx = playerSpeed; Player1.vy = 0;
            Player1.angle = 90

            dir.x = 1; dir.y = 0;
            bullets.vx = 15; bullets.vy = 0;
        }
        //left
        if (a) 
        {
            Player1.vx = -playerSpeed; Player1.vy = 0;
            Player1.angle = 270

            dir.x = -1; dir.y = 0;
            bullets.vx = -15; bullets.vy = 0;
        }

        if(w && d)//up  && right
        {
            Player1.vx = playerSpeed; Player1.vy = -playerSpeed; Player1.angle = 45; dir.x = 1; dir.y = -1; bullets.vx = 15; bullets.vy = -15;
        }
        if(a && w)//up && left
        {
            Player1.vx = -playerSpeed; Player1.vy = -playerSpeed; Player1.angle = 315; dir.x = -1; dir.y = -1; bullets.vx = -15; bullets.vy = -15;
        }
        if(s && a)//down && left
        {
            Player1.vx = -playerSpeed; Player1.vy = playerSpeed; Player1.angle = 225; dir.x = -1; dir.y = 1; bullets.vx = -15; bullets.vy = 15;
        }
        if(d && s)//down && right
        {
            Player1.vx = playerSpeed; Player1.vy = playerSpeed; Player1.angle = 135; dir.x = 1; dir.y = 1; bullets.vx = 15; bullets.vy = 15;
        } 
    }

    //BULLET HIT DETECTION
    //vvvvvvvvvvvvvvvvvvvv
    //bullet COLLISION      screen boundary
    

    for (var b = 0; b < bullets.length; b++) 
    {
        //top of the canvas
        if (bullets[b].y < 0 + bullets[b].height / 2) {
            bullets[b].y = 0 + bullets[b].height / 2;              //Hit the wall
            bullets[b].vx = 0; bullets[b].vy = 0;               //stop bullet
            bullets[b].x = -20; bullets[b].y = -20;             //send it back
        }
        //bottom of canvas
        if (bullets[b].y > canvas.height - bullets[b].height / 2) {
            bullets[b].y = canvas.height - bullets[b].height / 2   //Hit the wall
            bullets[b].vx = 0; bullets[b].vy = 0;               //stop bullet
            bullets[b].x = -20; bullets[b].y = -20;             //send it back
        }
        //left of canvas
        if (bullets[b].x < 0 + bullets[b].width / 2) {
            bullets[b].x = 0 + bullets[b].width / 2;              //Hit the wall
            bullets[b].vx = 0; bullets[b].vy = 0;               //stop bullet
            bullets[b].x = -20; bullets[b].y = -20;             //send it back
        }
        //right of canvas
        if (bullets[b].x > canvas.width - bullets[b].width / 2) {
            bullets[b].x = canvas.width - bullets[b].width / 2;   //Hit the wall
            bullets[b].vx = 0; bullets[b].vy = 0;               //stop bullet
            bullets[b].x = -20; bullets[b].y = -20;             //send it back
        }
        for(var i = 0; i < enemies.length; i++)
        {
            if (enemies[i].hitTestObject(bullets[b])) 
            {
                enemyDeath.currentTime = 0;
                enemyDeath.play();
    
                score++
                hit = true;
                console.log(enemies[i].y, "enemy hit", hit)    //Alert the console
                bullets[b].vx = 0; bullets[b].vy = 0;    //stop bullet
                bullets[b].x = -20; bullets[b].y = -20;  //send it back

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
                    bits[x].vx = randomRange(-9, 9);//BITS dispersion
                    bits[x].vy = randomRange(-9, 9);
                }
                
            } else { enemies[i].color = "black" }
        }    
    }

    for (var x = 0; x < bits.length; x++) //FRICTION AND MOVEMENT BITS
    {
        bits[x].vx *= frictionX;//Friction
        bits[x].vy *= frictionY;
        bits[x].move();
        bits[x].drawCircle();
    }
    var distance = 300;
    for (var x2 = 0; x2 < enemies.length; x2++)//MOVE + DRAW  enemy
    {
        var dx = Player1.x - enemies[x2].spawnX; //CHASING
        var dy = Player1.y - enemies[x2].spawnY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var rad2 =  Math.atan2(dy, dx);
        
        if (dist > distance) {
            dx = enemies[x2].destX - enemies[x2].spawnX;
            dy = enemies[x2].destY - enemies[x2].spawnY;
            
            enemies[x2].spawnX += dx * enemies[x2].follow;
            enemies[x2].spawnY += dy * enemies[x2].follow;
        }else
        {
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

    playerWallCollision();

    Player1.drawCirclePlayer();
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
