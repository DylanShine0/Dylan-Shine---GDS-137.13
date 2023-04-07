var canvas;
var context;
var timer;
var interval = 1000/60;



canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var player1 = new GameObject(10, 400, 10, 100, "red");

lBlock1 = new GameObject(canvas.width - 750, canvas.height/2+75, 100, 100,"#00ff00");
lBlock2 = new GameObject(canvas.width - 550, canvas.height/2+75, 100, 100,"#00ff00");
rBlock1 = new GameObject((canvas.width-350), canvas.height/2, 100, 100, "orange");
rBlock2 = new GameObject((canvas.width-50), canvas.height/2, 100, 100, "blue");

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    if(w)
    {
        console.log("Moving Up");
        player1.y += -2;
    }
    if(s)
    {
        console.log("Moving Down");
        player1.y += 2;
    }


    

    //top of the canvas
    if (player1.y <= player1.height/2) {
        player1.y = player1.height/2;
    }
    //bottom of canvas
    if (player1.y > canvas.height - player1.height/2) {
        player1.y = canvas.height - player1.height/2
    }

    player1.drawRect();

    //Test Elements
    lBlock1.drawCircle();
	lBlock2.drawCircle();
	rBlock1.drawRect();
	rBlock2.drawRect();
}