var canvas;
var context;
var timer;

var interval = 1000/60;
var player;

var speed = 0.1;

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

    function randomRange(high, low){
        return Math.random() * (high - low) + low;
    }

    function speedPlus()
    {
        
        player.vx += speed
        player.vy += speed
        speed += 0.2
        
        if(speed >= 2)
        {
            speed = 0.2;
            player.vx = 20
            player.vy = 20
            //player.x = 0
            //player.y =0
        }
        
    }

    //bottom of canvas
    if (player.y > canvas.height - player.radius) {
        player.y = canvas.height - player.radius
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vy = -player.vy;
        speedPlus()
    }
    //top of the canvas
    if (player.y < 0 + player.radius) {
        player.y = player.radius;
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vy = player.vy * randomRange(-1.3,-1);
        speedPlus()
    }
    //right side of the canvas
    if (player.x > canvas.width - player.radius) {
        player.x = canvas.width - player.radius
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vx = -player.vx;
        speedPlus()
    }
    //left side of the canvas
    if (player.x < player.radius) {
        player.x = player.radius
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vx = player.vx * randomRange(-1.3,-1);
        speedPlus()
    }
    
    
	player.draw();
    player.move();
    
}
