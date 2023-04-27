var canvas;
var context;
var timer;
var interval = 1000/60;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	


var score = 0;

var paddle = new GameObject(canvas.width/2, canvas.height-50, 250, 40, "cyan");
var ball = new GameObject(canvas.width/2, canvas.height/5, 80, 80, "#ff00ff");

ball.force = 2;
ball.gravity = 1;
var frictionX = 0.8;	
var frictionY = 0.8;
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
        paddle.vx = 5;
    }

    if(a)
    {
        paddle.vx = -5;
    }
    if(!a && !d)
    {
        paddle.vx = 0;
    }
    //CONTROLS




    // ***** WALL COLLISION *****
    //PADDLE left of canvas 
    if(paddle.x < 0 + paddle.width/2)
    {
        paddle.x = 0 + paddle.width/2;
    }
    //PADDLE right of canvas
    if(paddle.x > canvas.width - paddle.width/2)
    {
        paddle.x = canvas.width - paddle.width/2;
    }


    //BALL COLLISION WALL  -----   SCREEN BOUNDARY
    //top of the canvas
    if (ball.y < 0 + ball.width/2) {ball.y = 0 + ball.width/2;}
    //bottom of canvas
    if (ball.y >= canvas.height - ball.width/2) {ball.y = canvas.height - ball.width/2}
    //left of canvas
    if(ball.x < 0 + ball.width/2) {ball.x = 0 + ball.width/2;}
    //right of canvas
    if(ball.x > canvas.width - ball.width/2) {ball.x = canvas.width - ball.width/2;}




    // ***** WALL COLLISION *****

    // ***** PADDLE BALL COLLISION *****

    if(ball.hitTestObject(paddle))
    {
        console.log("Ball Hit Paddle!");
        ball.vy = -5;

        ball.vy = ball.vy + ball.gravity/2;

        ball.x = ball.x + ball.vx;
        ball.y = ball.y + ball.vy;
    }

    

    paddle.move();
    paddle.drawRect();

    ball.move();
    ball.drawCircle();


    //showBounce();
    //showGravity();

    //PADDLE LINE 
    context.save();
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(paddle.x, paddle.y);
    context.closePath();
    context.lineWidth = 5;
    context.stroke();
    context.restore();
    //PADDLE LINE

}




