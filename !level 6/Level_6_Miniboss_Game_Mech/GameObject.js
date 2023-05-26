function GameObject(x,y,w,h,color,angle,force,world)
{
	
	//Default Values
	if(x == undefined){this.x = canvas.width/2;}else{this.x = x;}
	if(y == undefined){this.y = canvas.height/2;}else{this.y = y;}
	if(w == undefined){this.width = 100;}else{this.width = w;}
	if(h == undefined){this.height = 100;}else{this.height = h;}
	if(color == undefined){this.color = "#ff0000";}else{this.color = color;}
	if(angle == undefined){this.angle = 0;}else{this.angle = angle;}
	if(force == undefined){this.force = 1;}else{this.force = force;}
	if(world == undefined){this.world = {x:0, y:0};}else{this.world = world;}
	


	//player's velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;

	this.spawnX = 0;
	this.spawnY = 0;

	this.destX = this.spawnX;
	this.destY = this.spawnY;

	this.angle = 0;

	this.force = 1;

	this.follow = 0.1;
	

	this.drawRect = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		context.restore();
		
	}	
	
	this.drawCircle = function () {
		
		context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.translate(this.x, this.y);
			context.rotate(this.angle * Math.PI / 180);
			context.arc(0, 0, this.width/1.7, 0, 360 *Math.PI/180, true);
			

			context.closePath();
			context.fill();
		context.restore();

		
	}	
	this.drawCirclePlayer = function () {
		
		context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.translate(this.x, this.y);
			context.rotate(this.angle * Math.PI / 180);
			context.arc(0, 0, this.width/2, 0, 360 *Math.PI/180, true);
			

			context.closePath();
			context.fill();
		

	
			context.strokeStyle = "white";
			context.beginPath()
			

			//context.translate(this.x,this.y)
			context.moveTo(0, 0-24);
			context.lineTo(0, 0+24);

			context.moveTo(0, 0-24);
			context.lineTo(-10, 0+10);

			context.moveTo(0, 0-24);
			context.lineTo(10, 0+10);


			context.lineWidth = 3;
			context.stroke();
			context.closePath();
			
			context.fill();
		context.restore();
	}	



	this.drawTriangle = function()
	{
			context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			//To convert deg to rad multiply deg * Math.PI/180
			context.rotate(this.angle * Math.PI/180);
			context.beginPath();
				context.moveTo(0+ this.width/2, 0);
				context.lineTo(0 - this.width/2, 0 - this.height/4);
				context.lineTo(0 - this.width/2, 0 + this.height/4);
				context.closePath();
			context.fill();
		context.restore();
		
	}	
	
	
	//This changes the player's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
	
	this.left = function() {return this.x - this.width/2;}
	this.right = function() {return this.x + this.width/2;}
	this.top = function() {return this.y - this.height/2;}
	this.bottom = function() {return this.y + this.height/2;}
	
	this.hitTestObject = function(obj)
	{
		if(this.left() < obj.right() && 
		   this.right() > obj.left() &&
		   this.top() < obj.bottom() &&
		   this.bottom() > obj.top())
		{
			return true
		}
		return false;
	}
}
