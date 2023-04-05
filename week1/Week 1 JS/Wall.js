function Wall()
{
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//wall demensions
	this.width = 10;
	this.height = 50;


	this.color = "#000000";

	this.createWall = function()
	{
		context.save();
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fill();
		context.restore();
	}	

}