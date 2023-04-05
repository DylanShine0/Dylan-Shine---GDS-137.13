var canvas;
var context;
var timer;
var numCollision = 0;
var interval = 1000/60;
var player;
var wall1;
var speed = 0.10;

//Set Up the Canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	
	
//Instantiate the Player
player = new Player();
wall1 = new Wall();
	
//Set the Animation Timer
timer = setInterval(animate, interval);


function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	

    //collision stat
    context.save();
            context.fillStyle = "black";
            context.font = "bold 16px Arial";
			context.fillText("Collisions: " + numCollision, 600, 20, 100)
            context.fillText("Acceleration: " + speed, 720, 20, 250)
	context.restore();


    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }
    function stats()
    {
        numCollision++;
    }
    function changeSize()
    {
        player.radius = randomRange(50,20)//25 default
    }

    function speedPlus()
    {
        player.vx += speed
        player.vy += speed
        speed = speed + 0.10
        
        if(speed >= 3.00)
        {
            speed = 0;
            player.vx = 10
            player.vy = 10
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
        stats()
        changeSize()
    }
    //top of the canvas
    if (player.y < 0 + player.radius) {
        player.y = player.radius;
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vy = player.vy * randomRange(-1.2,-1);
        
        speedPlus()
        stats()
        changeSize()
    }
    //right side of the canvas
    if (player.x > canvas.width - player.radius) {
        player.x = canvas.width - player.radius
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vx = -player.vx;
        
        speedPlus()
        stats()
        changeSize()
    }
    //left side of the canvas
    if (player.x < player.radius) {
        player.x = player.radius
        player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
        player.vx = player.vx * randomRange(-1.2,-1);
        
        speedPlus()
        stats()
        changeSize()
    }
    
    
    wall1.Wall(200,200,10,50);

	player.draw();
    player.move();
    
}
