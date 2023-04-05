function Wall(x1, y1, w1, h1)
{
	this.x = x1
	this.y = y1
	
	//wall demensions
	this.width = w1;
	this.height = h1;


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