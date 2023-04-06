var canvas;
var context;
var timer;
var interval = 1000/60;



canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var player1 = new GameObject(10, 400, 10, 100, "red");



timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	


    player1.drawRect();
}