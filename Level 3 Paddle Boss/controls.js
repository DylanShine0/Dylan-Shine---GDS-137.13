var a = false; //65
var d = false; //68

document.addEventListener("onkeydown", press);
document.addEventListener("onkeyup", release);

function press(e)
{
	
	//console.log("Pressed" + e.keyCode);

	if(e.keyCode == 65){
        a = true;
    }
	if(e.keyCode == 68){
        d = true;
    }
}

function release(e)
{
	
	//console.log("Released" + e.keyCode);
	
	if(e.keyCode == 65)
    {
        a = false;
    }
	if(e.keyCode == 68)
    {
        d = false;
    }
}