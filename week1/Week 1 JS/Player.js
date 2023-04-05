// JavaScript Document
function Player()
{
	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//player's dimensions
	this.width = 100;
	this.height = 100;
    this.radius = 25;

	//player's velocity or speed on each axis
	//this.vx = 0;
	//this.vy = 0;

    //player's color
	this.color = "#ff0000";

	//This draws the player to the screen
	this.draw = function()
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x,this.y,this.radius,0,360*Math.PI/180,true)
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