var canvas;
var context;
var timer;
var interval = 1000/60;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	


var score = 0;

var paddle = new GameObject(canvas.width/2, canvas.height - 50, 250, 40, "00ffff");

paddle.vx = 0;
paddle.vy = 0;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	


    if(d){paddle.vx = 5; paddle.vy = 0;}//right
    if(a){paddle.vx = -5; paddle.vy = 0;}//left





    paddle.move();
    paddle.drawRect();


}