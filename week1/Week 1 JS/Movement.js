var canvas;
var context;
var timer;
var numCollision = 0;
var interval = 1000/60;
var player;
var wall1;
var wall2;
var speed = 0.10;

var colliding = false;

//Set Up the Canvas
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	
	
//Instantiate the Player
player = new GameObject(canvas.height/2, canvas.width/2, 100, 25, "#ff0000");

player.width = 25;
//Instantiate wall
wall1 = new Wall();
wall2 = new Wall();
	
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
    //function changeSize()
    //{
    //    player.width = randomRange(35,25)//25 default
    //}

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
        // circle center // rect center
        var distX = Math.abs(circleX - rectX - rectWidth / 2);
        var distY = Math.abs(circleY - rectY - rectHeight / 2);
      
        // checking if not overlaping
        if (distX > (rectWidth / 2 + circleRadius)) { return false; }
        if (distY > (rectHeight / 2 + circleRadius)) { return false; }
      
        // checking if its overlaping
        if (distX <= (rectWidth / 2) +player.width) 
        {
            console.log("width overlaped")
            player.vx = player.vx * -1
        }
        if (distY <= (rectHeight / 2) + player.width) //this IF statement gets detected 100% of the time in the current circumstance on where both walls are
        {
            console.log("height overlaped")
            player.vy = player.vy * 1
            
            player.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
            stats()
        }

        /*
        var dx = distX - rectWidth / 2;
        var dy = distY - rectHeight / 2;
        return (dx * dx + dy * dy <= (circleRadius * circleRadius));
        */
    }


    //bottom of canvas
    if (player.y > canvas.height - player.width/2) {
        player.y = canvas.height - player.width/2
        player.vy = player.vy * -1;
        
        speedPlus()
        stats()

        //changeSize();
    }

    //top of the canvas
    if (player.y <= player.width/2) {
        player.y = player.width/2;
        player.vy = player.vy * -1;
        
        speedPlus()
        stats()
        
        //changeSize();
    }

    //right side of the canvas
    if (player.x > canvas.width - player.width/2) {
        player.x = canvas.width - player.width/2
        player.vx = player.vx * -1;
        
        speedPlus()
        stats()
        
        //changeSize();
    }

    //left side of the canvas
    if (player.x < 0 + player.width/2) {
        player.x = 0 + player.width/2
        player.vx = player.vx * -1;
        
        speedPlus()
        stats()
        
        //changeSize();
    }

    wall1.draw1();
    wall2.draw2();

	player.draw();
    player.move();

    //x =5                                   //radius*
    circleRectOverlap(player.x, player.y, player.width/2, wall1.x=0, wall1.y=200, wall1.width, wall1.height);

    //x =1014
    circleRectOverlap(player.x, player.y, player.width/2, wall2.x=1019, wall2.y=200, wall2.width, wall2.height);
    
}
