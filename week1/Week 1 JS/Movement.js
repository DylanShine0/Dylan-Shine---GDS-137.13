var canvas;
var context;
var timer;

var interval = 1000/60;
var player;

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

    player.randomRange(255, 0);

    //bottom of canvas
    if (player.y > canvas.height - player.radius) {
        player.y = canvas.height - player.radius
        player.color = `rgb(${player.randomRange(255, 0)}, ${player.randomRange(255, 0)}, ${player.randomRange(255, 0)})`
        player.vy = -player.vy;
    }
    //top of the canvas
    if (player.y < 0 + player.radius) {
        player.y = player.radius;
        player.color = `rgb(${player.randomRange(255, 0)}, ${player.randomRange(255, 0)}, ${player.randomRange(255, 0)})`
        player.vy = player.vy * -1;
    }
    //right side of the canvas
    if (player.x > canvas.width - player.radius) {
        player.x = canvas.width - player.radius
        player.color = `rgb(${player.randomRange(255, 0)}, ${player.randomRange(255, 0)}, ${player.randomRange(255, 0)})`
        player.vx = -player.vx
    }
    //left side of the canvas
    if (player.x < player.radius) {
        player.x = player.radius
        player.color = `rgb(${player.randomRange(255, 0)}, ${player.randomRange(255, 0)}, ${player.randomRange(255, 0)})`
        player.vx = player.vx * -1
    }
    
    
	player.draw();
    player.move();
    
}
