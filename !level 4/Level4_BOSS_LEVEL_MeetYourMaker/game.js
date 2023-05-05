var canvas;
var context;
var timer;
var interval = 1000/60;

var score1 = 0;

var frictionX = 0.4;	
var frictionY = .97;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var Player1 = new GameObject(200, 200, 50, 50, "red");
var bullet = new GameObject(200, 50, 10, 10, "#39FF14");

Player1.vx = 0;
Player1.vy = 0;

timer = setInterval(animate, interval);

/*
function wait(ms) {
    console.log("waiting...");
    setTimeout(function() { console.log('End'); }, ms); 
}
  
wait(10000);
*/



function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    

/*
    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }
*/
    Player1.move();
    bullet.move();


    //Player1 movement 
    if(w)//up
    {
        Player1.vx = 0; Player1.vy = -5;
    }
    if(s)//down
    {
        Player1.vx = 0; Player1.vy = 5;
    }
    if(d)//right
    {
        Player1.vx = 5; Player1.vy = 0;
    }
    if(a)//left
    {
        Player1.vx = -5; Player1.vy = 0;
    }

    //up  && right
    if(w && d)
    {
        Player1.vx = 5;
        Player1.vy = -5;
        
    }
    //up && left
    if(w && a)
    {
        Player1.vx = -5;
        Player1.vy = -5;
        
    }
    //down && left
    if(s && a)
    {
        Player1.vx = -5;
        Player1.vy = 5;
        
    }
    //down && right
    if(s && d)
    {
        Player1.vx = 5;
        Player1.vy = 5;
        
    }


   

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
    

    //SHOOTING 
    

    
    playerWallCollision();
    bulletWallCollision();

    
    Player1.drawCircle();
    PlayerDirection();
    
    bullet.drawCircle();
    //showFriction();

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
        bullet.y = 0 + bullet.width/2;
        bullet.vx = 0; bullet.vy = 0; //stop bullet
    }
    //bottom of canvas
    if (bullet.y > canvas.height - bullet.width/2) 
    {
        bullet.y = canvas.height - bullet.width/2
        bullet.vx = 0; bullet.vy = 0; //stop bullet
    }
    //left of canvas
    if(bullet.x < 0 + bullet.width/2)
    {
        bullet.x = 0 + bullet.width/2;
        bullet.vx = 0; bullet.vy = 0; //stop bullet
    }
    //right of canvas
    if(bullet.x > canvas.width - bullet.width/2)
    {
        bullet.x = canvas.width - bullet.width/2;
        bullet.vx = 0; bullet.vy = 0; //stop bullet
    }
}
function PlayerDirection()
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