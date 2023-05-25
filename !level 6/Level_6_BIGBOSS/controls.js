var a = false; //65
var d = false; //68
var s = false; //83

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);


function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Pressed" + e.keyCode);

	if(e.keyCode == 65){
        a = true;
    }
	if(e.keyCode == 68){
        d = true;
    }
    if(e.keyCode == 83){
        s = true;
    }
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 65)
    {
        a = false;
    }
	if(e.keyCode == 68)
    {
        d = false;
    }
    if(e.keyCode == 83){
        s = false;
    }
}