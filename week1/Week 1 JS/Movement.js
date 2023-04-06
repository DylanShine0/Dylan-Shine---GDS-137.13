var canvas;
var context;
var timer;
var numCollision = 0;
var interval = 1000/60;
var player;
var wall;
var speed = 0.10;

//Set Up the Canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	
	
//Instantiate the Player
player = new Player();

//Instantiate wall
wall = new Wall();
	
//Set the Animation Timer
timer = setInterval(animate, interval);



function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	

    //collision stats
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
    
    

    function circleRectOverlap(circleX, circleY, circleRadius, rectX, rectY, rectWidth, rectHeight) {
        // Calculate the distance between the center of the circle and the center of the rectangle.
        var distX = Math.abs(circleX - rectX - rectWidth / 2);
        var distY = Math.abs(circleY - rectY - rectHeight / 2);
      
        // If the distance is greater than the sum of the radius of the circle and the half of the diagonal of the rectangle, then the circle and the rectangle do not overlap.
        if (distX > (rectWidth / 2 + circleRadius)) { return false; }
        if (distY > (rectHeight / 2 + circleRadius)) { return false; }
      
        // If the distance is less than or equal to the sum of the radius of the circle and the half of the diagonal of the rectangle, then the circle and the rectangle overlap.
        if (distX <= (rectWidth / 2)) { console.log("width overlaped") }
        if (distY <= (rectHeight / 2)) { console.log("height overlaped") }
      
        var dx = distX - rectWidth / 2;
        var dy = distY - rectHeight / 2;
        return (dx * dx + dy * dy <= (circleRadius * circleRadius));
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
    
    
    
    wall.draw1();
    wall.draw2();

	player.draw();
    player.move();

    circleRectOverlap(player.x, player.y, player.radius, wall.x, wall.y, wall.width, wall.height);

    
}
