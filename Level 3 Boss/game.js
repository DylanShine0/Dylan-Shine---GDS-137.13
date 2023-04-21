var canvas;
var context;
var timer;
var interval = 1000/60;

var score1 = 0;
var score2 = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var img = document.getElementById("ric");


var Player1 = new GameObject(10, 400, 10, 100, "red");


ball.width = 25;
ball.vx = -5
ball.vy = -5 //-5



lBlock1 = new GameObject(canvas.width - 750, canvas.height/2+75, 100, 100,"#00ff00");
lBlock2 = new GameObject(canvas.width - 550, canvas.height/2+75, 100, 100,"#00ff00");
rBlock1 = new GameObject((canvas.width-350), canvas.height/2, 100, 100, "orange");
rBlock2 = new GameObject((canvas.width-50), canvas.height/2, 100, 100, "blue");

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);	

    


    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }

    //Player1 movement 
    if(w)
    {
        console.log("Player1: Moving Up");
        Player1.y += -4;
    }
    if(s)
    {
        console.log("Player1: Moving Down");
        Player1.y += 4;
    }

    //paddle2 movement
    if(arrowT)
    {
        console.log("Player1: Moving Up");
        paddle2.y += -4;
    }
    if(arrowS)
    {
        console.log("Player1: Moving Down");
        paddle2.y += 4;
    }




    //Player1 COLLISION      screen boundary
    //top of the canvas
    if (Player1.y <= Player1.height/2) {
        Player1.y = Player1.height/2;
    }
    //bottom of canvas
    if (Player1.y > canvas.height - Player1.height/2) {
        Player1.y = canvas.height - Player1.height/2
    }


    //PADDLE2 COLLISION      screen boundary
    //top of the canvas
    if (paddle2.y <= paddle2.height/2) {
        paddle2.y = paddle2.height/2;
    }
    //bottom of canvas
    if (paddle2.y > canvas.height - paddle2.height/2) {
        paddle2.y = canvas.height - paddle2.height/2
    }




    



    //BALL COLLISION       screen boundary
    //BOTTOM of canvas
    if (ball.y > canvas.height - ball.width/2) {
        ball.y = canvas.height - ball.width/2
        ball.vy = ball.vy * -1;
        ball.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
    }
    //TOP of the canvas
    if (ball.y <= ball.width/2) {
        ball.y = ball.width/2;
        ball.vy = ball.vy * -1;
        ball.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
    }


    //RIGHT side of the canvas
    if (ball.x > canvas.width + ball.width/2) {
        
        score1++;
        //sets the lose condition //resets position
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;

        //sets new VELOCITY
        ball.vx = ball.vx += randomRange(-2,2)
        ball.vy = ball.vy += randomRange(-2,2)

        //sets new DIRECTION
        var dirX1 = (ball.vx/Math.abs(ball.vx));
        var dirY1 = (ball.vy/Math.abs(ball.vy));

        ball.vx = ball.vy * -dirX1;
        ball.vy = ball.vx * -dirY1;
        
        if(ball.vx >= 10 || ball.vx <= 4)
        {
            ball.vx = 5
        
        }
        if(ball.vy >= 10 || ball.vy <= 4)
        {
            ball.vy = 5
        }
    }

    //LEFT side of the canvas
    if (ball.x < 0 - ball.width/2) {
        
        score2++;
        //sets the lose condition  //resets position
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;

        //sets new VELOCITY
        ball.vx = ball.vx += randomRange(2,-2)
        ball.vy = ball.vy += randomRange(2,-2)

        //sets new DIRECTION
        var dirX2 = (ball.vx/Math.abs(ball.vx));
        var dirY2 = (ball.vy/Math.abs(ball.vy));

        ball.vx = ball.vy * dirX2;
        ball.vy = ball.vx * dirY2;
        
        if(ball.vx >= 10 || ball.vx <= 4)
        {
            ball.vx = -5
        
        }
        if(ball.vy >= 10 || ball.vy <= 4)
        {
            ball.vy = -5
        }
    }

    



    
  
}