var canvas;
var context;
var timer;
var interval = 1000/60;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	


var score = 0;

var paddle = new GameObject(canvas.width/2, canvas.height/2, 250, 40, "00ffff");

paddle.vx = 0;
paddle.vy = 0;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	


    if(d == true)
    {
        paddle.vx = 5;
    }

    if(a == true)
    {
        paddle.vx = -5;
    }
    paddle.vx = 0;





    paddle.move();
    paddle.drawRect();


}