var canvas;
var context;
var timer;
var interval = 1000/60;

var score1 = 0;

var frictionX = 0.4;	
var frictionY = .97;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

//FIX THE ORDER OF CODE CALLS LIKE FOR THE PADDLE BALL BOSS LEVEL***************************** hint move and draw functions

var Player1 = new GameObject(200, 200, 50, 50, "red");

Player1.vx = 0;
Player1.vy = 0;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    

/*
    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }
*/



    //Player1 movement 
    if(w){Player1.vx = 0; Player1.vy = -5;}//up  
    if(s){Player1.vx = 0; Player1.vy = 5;}//down
    if(d){Player1.vx = 5; Player1.vy = 0;}//right
    if(a){Player1.vx = -5; Player1.vy = 0;}//left

    //up  && right
    if(w && d)
    {
        Player1.vy = -5;
        Player1.vx = 5;
    }
    //up && left
    if(w && a)
    {
        Player1.vy = -5;
        Player1.vx = -5;
    }
    //down && left
    if(s && a)
    {
        Player1.vy = 5;
        Player1.vx = -5;
    }
    //down && right
    if(s && d)
    {
        Player1.vy = 5;
        Player1.vx = 5;
    }
    

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



    Player1.move();
    Player1.drawCircle();
    //showFriction();

}
/*
function showFriction()
{
	if(d)
	{	
		Player1.vx += Player1.ax * Player1.force;
	}
	if(a)
	{
		Player1.vx += Player1.ax * -Player1.force;
	}
	if(w)
	{	
		Player1.vy += Player1.ay * -Player1.force;
	}
	if(s)
	{
		Player1.vy += Player1.ay * Player1.force;
	}
	
	//--------------Apply friction to the Velocity X-----------------------------------------
	//Player1.vx *= frictionX;
	//---------------------------------------------------------------------------------------
	//Player1.x += Player1.vx;
}
*/