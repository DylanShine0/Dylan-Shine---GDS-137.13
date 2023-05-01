//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var won1 = false;
console.log("Won Variable: ", won1)

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100});

	platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";


	platform1 = new GameObject();
		platform1.width = 200;
		platform1.x = canvas.width/2.2;
		platform1.y = canvas.height - 200;
		platform1.color = "#66ff33";

	platform2 = new GameObject();
		platform2.width = 200;
		platform2.x = canvas.width/1.3;
		platform2.y = canvas.height - 400;
		platform2.color = "#66ff33";
		
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	//PLATFORM 0
	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}


	//PLATFORM ONE
	while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}

	//PLATFORM TWO
	while(platform2.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform2.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}


	//****************************************** BOTTOM RIGHT AND LEFT player **********************************************************


	//Bottom Right         PLATFORM 0
	while(platform0.hitTestPoint({x:player.x+player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	//Bottom Left         PLATFORM 0
	while(platform0.hitTestPoint({x:player.x-player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}

	//Bottom Right         PLATFORM 1
	while(platform1.hitTestPoint({x:player.x+player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	//Bottom Left         PLATFORM 1
	while(platform1.hitTestPoint({x:player.x-player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}

	//Bottom Right         PLATFORM 2
	while(platform2.hitTestPoint({x:player.x+player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	//Bottom Left         PLATFORM 2
	while(platform2.hitTestPoint({x:player.x-player.width/2, y:player.y+player.height/2}) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	
	
	//---------Objective: Treasure!!!!!!!---------------------------------------------------------------------------------------------------- 
	//---------Run this program first.
	//---------Get Creative. Find a new way to get your player from the platform to the pearl. 
	//---------You can do anything you would like except break the following rules:
	//---------RULE1: You cannot spawn your player on the pearl!
	//---------RULE2: You cannot change the innitial locations of platform0 or the goal! 
		
	if(player.hitTestObject(goal))
	{
		
		goal.y = 10000;
		won1 = true;
		console.log("player", "Won: ", won1)
		
	}
	if(won1 == true){
		
		context.textAlign = "center";
		context.fillStyle = "#555555"
		context.font = "20px Arial"
		context.fillText("You Win!!!", canvas.width/2, canvas.height/3);
	}
	
	
	
	
	platform0.drawRect();
	platform1.drawRect();
	platform2.drawRect();

	//Show hit points
	player.drawRect();
	player.drawDebug();
	goal.drawCircle();
}

