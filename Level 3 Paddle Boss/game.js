var canvas;
var context;
var timer;
var interval = 1000/60;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	


var score = 0;

var paddle = new GameObject(canvas.width/2, canvas.height-50, 250, 40, "cyan");
var ball = new GameObject(canvas.width/2, canvas.height/2, 80, 80, "#ff00ff");

paddle.vx = 0;
paddle.vy = 0;

ball.vx = 0;
ball.vy = 0;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    //SCORE UI
    context.font = "20px Arial"
    context.fillStyle = "#555555";
    context.fillText("Score: " + score, 20, 38);
    //END OF SCORE UI

    //ball gravity
    ball.vy = 10;

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
    if (ball.y > canvas.height - ball.width/2) {ball.y = canvas.height - ball.width/2}
    //left of canvas
    if(ball.x < 0 + ball.width/2) {ball.x = 0 + ball.width/2;}
    //right of canvas
    if(ball.x > canvas.width - ball.width/2) {ball.x = canvas.width - ball.width/2;}




    // ***** WALL COLLISION *****

    

    paddle.move();
    paddle.drawRect();

    ball.move();
    ball.drawCircle();

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