var canvas;
var context;
var timer;
var interval = 1000/60;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	


var score = 0;

var paddle = new GameObject(canvas.width/2, canvas.height-50, 250, 40, "cyan");
var ball = new GameObject(canvas.width/2, canvas.height/5, 80, 80, "#ff00ff");

ball.force = 1
var frictionX = 0.97;	
var frictionY = 0.97;
var gravity = 1;

paddle.vx = 0;
paddle.vy = 0;

ball.vx = 1;
ball.vy = 1;



timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    //SCORE UI
    context.font = "20px Arial"
    context.fillStyle = "#555555";
    context.fillText("Score: " + score, 20, 38);
    //END OF SCORE UI

    

    //CONTROLS
    if(d)
    {
        
        paddle.vx = paddle.vx + 0.3;
    }

    if(a)
    {
        
        paddle.vx = paddle.vx - 0.3;
    }
    
    

    //GRAVITY
    
    ball.vy += gravity; 

    //Friction

    paddle.vx *= frictionX;

    //pixel lock

    //ball.y += Math.round(ball.vy);
	//ball.x += Math.round(ball.vx);




    paddle.move();
    ball.move();


    // ***** WALL COLLISION *****
    //PADDLE left of canvas 
    if(paddle.x < 0 + paddle.width/2)
    {
        paddle.x = 0 + paddle.width/2;
        paddle.vx = 0;
    }
    //PADDLE right of canvas
    if(paddle.x > canvas.width - paddle.width/2)
    {
        paddle.x = canvas.width - paddle.width/2;
        paddle.vx = 0;
    }


    

    


    // ***** WALL COLLISION *****

    // ***** PADDLE BALL COLLISION *****

    if(ball.hitTestObject(paddle))
    {
        console.log("Ball Hit Paddle!");
   
        ball.y = paddle.y - paddle.height/2 - ball.width/2;

        showBounceFriction();

        //center

        ball.vy = -35
        

        //outers
        if(ball.x < paddle.x - paddle.width/3)
        {
             
            ball.vy = -35
            ball.vx = -ball.force;   
            console.log("outer Left Paddle Hit");
        }
         
        if(ball.x > paddle.x + paddle.width/3)
        {
            ball.vy = -35
            ball.vx = ball.force;   
            console.log("outer Right Paddle Hit")
        }


        //inners

        if(ball.x < paddle.x - paddle.width/6)
        {
            
            ball.vy = -35
            ball.vx = -ball.force * 5;   
            console.log("inner Left Paddle Hit");
        }
        
        if(ball.x > paddle.x + paddle.width/6)
        {
            ball.vy = -35
            ball.vx = ball.force * 5;   
            console.log("inner Right Paddle Hit")
        }

       
        
        

        score +=1;

    }
        
    


    //BALL COLLISION WALL  -----   SCREEN BOUNDARY
    //top of the canvas
    if (ball.y < 0 + ball.width/2) 
    {
        console.log("Hit top of the ceiling")
        ball.y = 0 + ball.width/2;
        ball.vy = 0
    }
    //bottom of canvas
    if (ball.y > canvas.height - ball.width/2) 
    {
        ball.y = canvas.height - ball.width/2
        ball.vy = -ball.vy * .67;

        score = 0;
    }
    //left of canvas
    if(ball.x < 0 + ball.width/2) 
    {
        ball.x = 0 + ball.width/2;
        ball.vx = 5
    }
    //right of canvas
    if(ball.x > canvas.width - ball.width/2) 
    {
        ball.x = canvas.width - ball.width/2;
        ball.vx = -5;
    }
        
    console.log("VX: ", ball.vx, "VY: ", ball.vy)

    paddle.drawRect();
    ball.drawCircle();


    showPaddleLine();

    
    
    
}

function showBounceFriction()
{
    
    ball.vy = -ball.vy * gravity; //bounce
    
}



function showPaddleLine()
{
    //PADDLE LINE 
    context.save();
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(paddle.x, paddle.y);
    context.closePath();
    context.lineWidth = 2;
    context.stroke();
    context.restore();
    //PADDLE LINE
}




