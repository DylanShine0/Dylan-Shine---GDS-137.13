function Wall()
{
	/*
	this.x = canvas.width/2;
	this.y = 200;
	//wall demensions
	this.width = 50;
	this.height = 400;
	*/

	this.color = "#000000";

	this.draw1 = function()
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.rect(200,400,50,400);
            context.fill();
		context.restore();
	}	

	this.draw2 = function()
	{
		context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.rect(600,400,50,400);
            context.fill();
		context.restore();
	}	

}