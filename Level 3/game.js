var canvas;
var context;
var timer;
var interval = 1000/60;

var score1 = 0;
var score2 = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");	

var img = document.getElementById("ric");


var paddle1 = new GameObject(10, 400, 10, 100, "red");
var paddle2 = new GameObject(1014, 400, 10, 100, "blue");

var ball = new GameObject(canvas.height/2, canvas.width/2, 100, 25, "#ff0000");

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

    //*********LINE DIVIDER

    context.save();
    context.strokeStyle = "Yellow";
    context.beginPath();
    context.moveTo(canvas.width/2, 0);
    context.lineTo(canvas.width/2, canvas.height);
    context.closePath();
    context.lineWidth = 5;
    context.stroke();
    context.restore();

    //***********END OF LINE DIVIDER**********


    //BALL IMAGE
    


    function randomRange(high, low)
    {
        return Math.random() * (high - low) + low;
    }

    //paddle1 movement 
    if(w)
    {
        console.log("Paddle1: Moving Up");
        paddle1.y += -4;
    }
    if(s)
    {
        console.log("Paddle1: Moving Down");
        paddle1.y += 4;
    }

    //paddle2 movement
    if(arrowT)
    {
        console.log("Paddle1: Moving Up");
        paddle2.y += -4;
    }
    if(arrowS)
    {
        console.log("Paddle1: Moving Down");
        paddle2.y += 4;
    }




    //PADDLE1 COLLISION      screen boundary
    //top of the canvas
    if (paddle1.y <= paddle1.height/2) {
        paddle1.y = paddle1.height/2;
    }
    //bottom of canvas
    if (paddle1.y > canvas.height - paddle1.height/2) {
        paddle1.y = canvas.height - paddle1.height/2
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




    //PADDLE 1 + BALL COLLISION
    if(paddle1.hitTestObject(ball))
    {
        ball.x = paddle1.x + paddle1.width/2 + ball.width/2;
        ball.vx = ball.vx * -1;

        if(ball.y < paddle1.y - paddle1.height/6)
        {
            
            ball.vy = -5
            console.log("Top Paddle Hit");
        }
        
        if(ball.y > paddle1.y + paddle1.height/6)
        {
            
            ball.vy = 5
            console.log("Bottom Paddle Hit")
        }
    }

    //PADDLE 2 + BALL COLLISION
    if(paddle2.hitTestObject(ball))
    {
        ball.x = paddle2.x - paddle2.width/2 - ball.width/2;
        ball.vx = ball.vx * -1;

        if(ball.y < paddle2.y - paddle2.height/6)
        {
            
            ball.vy = 5
            console.log("Top Paddle Hit");
        }
        
        if(ball.y > paddle2.y + paddle2.height/6)
        {
            
            ball.vy = -5
            console.log("Bottom Paddle Hit")
        }
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

    //*********SCOREBOARD************
    
    context.font = "18px Arial"
    context.fillStyle = "#000000";
    

    //Player Names*
    context.fillText("Player 1 | Player 2", canvas.width/2-73, 20)
    //Paddle 1 score
    context.fillText(score1, canvas.width/2-20, 40)
    //dash
    context.fillText('-', canvas.width/2-2, 40)
    //paddle 2 score
    context.fillText(score2, canvas.width/2+10, 40)

    //********END OF SCOREBOARD********


    //PADDLE
    paddle1.drawRect();
    paddle2.drawRect();

    //BALL
    
    ball.move();
    ball.drawCircle();

    context.save();
    context.drawImage(ric, ball.x-20, ball.y-20, ball.width*1.5, ball.height*1.5);
    context.restore();

    
    


    //Test Elements
    /*
    lBlock1.drawCircle();
	lBlock2.drawCircle();
	rBlock1.drawRect();
	rBlock2.drawRect();
    */
}