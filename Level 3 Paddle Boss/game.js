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
var frictionX = 0.67;	
var frictionY = 0.67;
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
        
        paddle.vx = paddle.vx +0.3;
    }

    if(a)
    {
        
        paddle.vx = paddle.vx -0.3;
    }
    
    

    //GRAVITY
    
    ball.vy += gravity; 

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
        
        //inners

        if(ball.x < paddle.x - paddle.width/3)
        {
            
            ball.vy = -35
            ball.vx = -ball.force;   
            console.log("inner Left Paddle Hit");
        }
        
        if(ball.x > paddle.x + paddle.width/3)
        {
            ball.vy = -35
            ball.vx = ball.force;   
            console.log("inner Right Paddle Hit")
        }

        //outers
        if(ball.x < paddle.x - paddle.width/6)
        {
            
            ball.vy = -35
            ball.vx = -ball.force * 5;   
            console.log("outer Left Paddle Hit");
        }
        
        if(ball.x > paddle.x + paddle.width/6)
        {
            ball.vy = -35
            ball.vx = ball.force * 5;   
            console.log("outer Right Paddle Hit")
        }
        
        

        score +=1;

    }
    
    
    if(score < 0)
    {
        score = 0;
    }
        
    


    //BALL COLLISION WALL  -----   SCREEN BOUNDARY
    //top of the canvas
    if (ball.y < 0 + ball.width/2) {ball.y = 0 + ball.width/2;}
    //bottom of canvas
    if (ball.y >= canvas.height - ball.width/2) 
    {
        ball.y = canvas.height - ball.width/2
        gravity = 0.05;
        score -= 1;
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
        
    

    paddle.drawRect();
    ball.drawCircle();


    showPaddleLine();

    
    
    
}

function showBounceFriction()
{
    gravity = 0
    ball.vy = -ball.vy * frictionY; //bounce and friction
    gravity = 1
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




