// JavaScript Document
function GameObject(x,y,w,h,color) //PLAYER BALL
{

	//Default Values
	if(x == undefined){this.x = canvas.width/2;}else{this.x = x;}
	if(y == undefined){this.y = canvas.height/2;}else{this.y = y;}
	if(w == undefined){this.width = 100;}else{this.width = w;}
	if(h == undefined){this.height = 100;}else{this.height = h;}
	
	if(color == undefined){this.color = "#ff0000";}else{this.color = color;}
	


	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//player's dimensions
	this.width = 100;
	this.height = 100;
    

	//player's velocity or speed on each axis
	this.vx = 5;
	this.vy = 5;

    //player's color
	this.color = "#ff0000";

	//This draws the player to the screen
	this.draw = function()
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x,this.y,this.width/2,0,360*Math.PI/180,true)
            context.closePath();
            context.fill();
		context.restore();
	}	

	
	
	//This changes the player's position
    this.move = function () 
	{
        this.x += this.vx;
        this.y += this.vy;
    }
}

