function Wall()
{
	
	this.x = 0;
	this.y = 0;
	//wall demensions
	this.width = 50;
	this.height = 400;
	

	this.color = "#000000";

	this.draw1 = function() //wall 1 
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.rect(this.x,this.y,50,400);
            context.fill();
		context.restore();
	}	

	this.draw2 = function() //wall 2
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.rect(this.x,this.y,50,400);
            context.fill();
		context.restore();
	}	

}