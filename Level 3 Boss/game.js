var canvas;
var context;
var timer;
var interval = 1000/60;

var score1 = 0;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

//var img = document.getElementById("ric"); //going to be used later for ship

var Player1 = new GameObject(canvas.width/2, canvas.height/2, 50, 50, "red");


timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    

/*
    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }
*/
    //Player1 movement 
    if(w)//up
    {
        Player1.y += -4;
    }  
    if(s)//down
    {
        Player1.y += 4;
    } 

    




    //Player1 COLLISION      screen boundary
    //top of the canvas
    if (Player1.y < 0 + Player1.height/2) 
    {
        Player1.y = Player1.height/2;
    }
    //bottom of canvas
    if (Player1.y > canvas.height - Player1.height/2) 
    {
        Player1.y = canvas.height - Player1.height/2
    }
    //left of canvas
    if(Player1.x < 0 + Player1.width/2)
    {
        Player1.x = 0 + Player1.width/2;
    }
    //right of canvas
    if(Player1.x < canvas.width - Player1.width/2)
    {
        Player1.x = canvas.width - Player1.width/2;
    }



    Player1.move();
    Player1.drawCircle();

}