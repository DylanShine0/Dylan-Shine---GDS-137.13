//Define Booleans for each key
var w = false; //87
var s = false; //83
var a = false; //65
var d = false; //68
var space = false; //32


//Add Event Listeners
document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

//Event Functions
function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);

	if(e.keyCode == 87)
    {
        w = true;
    }
	if(e.keyCode == 83)
    {
        s = true;
    }
	if(e.keyCode == 65){
        a = true;
    }
	if(e.keyCode == 68){
        d = true;
    }
    if(e.keyCode == 32){
        space = true;
    }

}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 87)
    {
        w = false;
    }
	if(e.keyCode == 83)
    {
        s = false;
    }
	if(e.keyCode == 65)
    {
        a = false;
    }
	if(e.keyCode == 68)
    {
        d = false;
    }
    if(e.keyCode == 32)
    {
        space = false;
    }

}