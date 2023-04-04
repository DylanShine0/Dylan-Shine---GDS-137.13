//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var xDir = 7;
var yDir = 0;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new Player();
	
	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Move the Player
	player.x += xDir;
	player.y += yDir;

	//collision
	//left
	if(player.x < player.width/2)
	{
		player.vx = player.vx * 1;
		xDir = 7;
		yDir = -20;
	}
	//right
	if(player.x > canvas.width - player.width/2)
	{
		player.vx = player.vx * -1;
		xDir = -7;
		yDir = -20;
	}
    //top
    if(player.y > canvas.height - player.height/2)
    {
        
    }

	player.draw();
}
