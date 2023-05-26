var canvas;
var context;
var timer;
var interval = 1000/60;
timer = setInterval(animate, interval);

var score = 0;
var gravity = 1;
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

var catcher = new GameObject(canvas.width/2, canvas.height -30, 50, 50, "ffff00", 0);
var catcherColor = "white";


var frictionX = .95;	
var frictionY = 0.97;

var circleList = [];
var boxesList = [];


function circlesInitialize()
{
    for(var i = 0; i < 10; i++)
    {
        console.log("circleList spawning")
        circleList[i] = new GameObject(100, -500, 15, 15, `rgb(${randomRange(0, 0)}, ${randomRange(255, 200)}, ${randomRange(0, 0)})`,1);
        circleList[i].x = randomRange(900, 20);
        circleList[i].y = circleList[i].y + randomRange(400, 0);
        circleList[i].vy = randomRange(6,5);
    } 
}
circlesInitialize();

function boxesInitialize()
{
    for(var i = 0; i < 3; i++)
    {
        console.log("boxesList spawning")
        boxesList[i] = new GameObject(100, -500, 15, 15, `rgb(${randomRange(255, 200)}, ${randomRange(0, 0)}, ${randomRange(0, 0)})`,1);
        boxesList[i].x = randomRange(900, 20);
        boxesList[i].y = boxesList[i].y + randomRange(400, 100);
        boxesList[i].vy = randomRange(6,5)
    } 
}
boxesInitialize();

function catcherRed()
{
    catcher.color = "red"
}
function catcherGreen()
{
    catcher.color = "green"
}
function catcherReset()
{
    catcher.color ="white"
}

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	
    

    context.fillStyle = "white"
    context.font = "30px calibri"
    context.fillText("Score: " + score,10,30)



    //GRAVITY
    
    //catcher.vy += gravity; 

    //Friction

    catcher.vx *= frictionX;

    //r
    if (d) 
    {
        catcher.vx = catcher.vx + 0.2;
    }
    //l
    if (a) 
    {
        catcher.vx = catcher.vx - 0.2;
    }
    //s brakes
    if (s) 
    {
        catcher.vx = 0;
    }
    catcher.move();

    
    for (var x = 0; x < circleList.length; x++) //MOVEMENT circleList // spawning back up // hit detection
    {
        //circleList[x].vy = 5;
        circleList[x].move();
        circleList[x].drawCircle();

        if(circleList[x].hitTestObject(catcher))
        {
            

            circlesInitialize();
            boxesInitialize();

            catcherRed()
            setTimeout(catcherReset,500);
           

            score = 0;
            console.log("Game Over");
            //catcher.color = "white"
        }

        if(circleList[x].y > canvas.height) //off screen respawn
        {
            circleList[x].y = -500 + randomRange(200, 50);
            circleList[x].x = randomRange(900, 20);
            circleList[x].vy = randomRange(5, 7);



            //circleList[x].vy = circleList[x].vy + randomRange(2, 1); choas
        }
    }
    for (var x = 0; x < boxesList.length; x++) //MOVEMENT boxesList spawning back up // hit detection
    {
        //boxesList[x].vy = 5;
        boxesList[x].move();
        boxesList[x].drawRect();

        if(boxesList[x].hitTestObject(catcher))
        {
            catcherGreen();
            setTimeout(catcherReset, 500);
            boxesList[x].y = -500 + randomRange(200, 50); //send back up an randomize
            boxesList[x].x = randomRange(900, 20);
            score = score + 1;
        }

        if(boxesList[x].y > canvas.height)// off screen respawn
        {
            boxesList[x].y = -500 + randomRange(200, 50); //send back up and randomize
            boxesList[x].x = randomRange(900, 20);
            boxesList[x].vy = randomRange(5, 7);



            //boxesList[x].vy = boxesList[x].vy + randomRange(2, 1); choas
        }
    }




    
    playerWallCollision();
    catcher.drawRect();
}


function playerWallCollision()
{   
	//catcher COLLISION      screen boundary
    
    //left of canvas
    if(catcher.x < 0 + catcher.width/2)
    {
        catcher.x = 0 + catcher.width/2;
        catcher.vx = 0;

    }
    //right of canvas
    if(catcher.x > canvas.width - catcher.width/2)
    {
        catcher.x = canvas.width - catcher.width/2;
        catcher.vx = 0;

    }
}