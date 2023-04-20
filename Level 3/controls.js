//Define Booleans for each key
var w = false; //87
var s = false; //83
var a = false; //65
var d = false; //68


var arrowL = false; //37
var arrowT = false; //38
var arrowR = false; //39
var arrowS = false; //40

//Add Event Listeners
document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

//Event Functions
function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);

	if(e.keyCode == 87){w = true;}
	if(e.keyCode == 83){s = true;}
	if(e.keyCode == 65){a = true;}
	if(e.keyCode == 68){d = true;}

	if(e.keyCode == 37){arrowL = true;}
	if(e.keyCode == 38){arrowT = true;}
	if(e.keyCode == 39){arrowR = true;}
	if(e.keyCode == 40){arrowS = true;}

}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 87){w = false;}
	if(e.keyCode == 83){s = false;}
	if(e.keyCode == 65){a = false;}
	if(e.keyCode == 68){d = false;}

	if(e.keyCode == 37){arrowL = false;}
	if(e.keyCode == 38){arrowT = false;}
	if(e.keyCode == 39){arrowR = false;}
	if(e.keyCode == 40){arrowS = false;}
}
