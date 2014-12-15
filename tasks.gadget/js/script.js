/**************************************************************/
//Developer Bogdan Dever (email: bogvsdev@gmail.com)
/**************************************************************/
var gadgetWidth = 155, gadgetHeight = 77, scaleDocked = 1, scaleUndocked = 3, timeTransition = 2;
System.Gadget.docked = true;

function init() {
	System.Gadget.onSettingsClosed = settingsClosed;
	System.Gadget.settingsUI = "settings.html";
	System.Gadget.background = "../img/bg.png";
	System.Gadget.onDock = CheckDockState;
	System.Gadget.onUndock = CheckDockState;
	document.getElementById('frm').elements[0].value = System.Gadget.Settings.readString("text");
	save();
}
function save() {
	System.Gadget.Settings.writeString('text', document.getElementById('frm').elements[0].value);


	if (System.Gadget.Settings.readString("color")!=="") {
        document.getElementById('list').style.color = System.Gadget.Settings.readString("color");
		document.getElementById('header').style.color = System.Gadget.Settings.readString("color");
	}
    if(System.Gadget.Settings.readString("imagen") !== "") {
        wrapper.style.backgroundColor = "#fff";
        img.src = System.Gadget.Settings.readString("imagen");
    }else {
        img.src = '';
    }
    if (System.Gadget.Settings.readString("theme") !== "") {
        switch(System.Gadget.Settings.readString("theme")) {
            case '1':
                wrapper.style.backgroundColor = "#fff";
                document.getElementById('list').style.color = '#2B2B28';
                document.getElementById('header').style.color = '#2B2B28';
                $('body').addClass('white').removeClass('green').removeClass('dark-gray').removeClass('orange').removeClass('blue').removeClass('red');
                break;
            case '2':
                wrapper.style.backgroundColor = "#a4d815";
                $('body').addClass('green').removeClass('white').removeClass('dark-gray').removeClass('orange').removeClass('blue').removeClass('red');
                break;
            case '3':
                wrapper.style.backgroundColor = "#2B2B28";
                $('body').addClass('dark-gray').removeClass('white').removeClass('green').removeClass('orange').removeClass('blue').removeClass('red');
                break;
            case '4':
                wrapper.style.backgroundColor = "#ffab26";
                $('body').addClass('orange').removeClass('dark-gray').removeClass('white').removeClass('green').removeClass('blue').removeClass('red');
                break;
            case '5':
                wrapper.style.backgroundColor = "#4dc0ea";
                $('body').addClass('blue').removeClass('dark-gray').removeClass('white').removeClass('green').removeClass('orange').removeClass('red');
                break;
            case '6':
                wrapper.style.backgroundColor = "#e24646";
                $('body').addClass('red').removeClass('dark-gray').removeClass('white').removeClass('green').removeClass('orange').removeClass('blue');
                break;
        }
    }
       
}		

function CheckDockState(){
    System.Gadget.beginTransition();
    
    var oBody = document.body.style;
    if (System.Gadget.docked)
    {
        oBody.width = gadgetWidth*scaleDocked;
        oBody.height = gadgetHeight*scaleDocked;
        
        txtDocked.className = 'gadgetDocked';
        txtDocked.innerText = 'Docked';
    }
    else
    {
        oBody.width = gadgetWidth*scaleUndocked;
        oBody.height = gadgetHeight*scaleUndocked;  
        
        txtDocked.className = 'gadgetUndocked';
        txtDocked.innerText = 'Undocked';
    }
    System.Gadget.endTransition(System.Gadget.TransitionType.morph, timeTransition);
}
function settingsClosed(event){
    if (event.closeAction == event.Action.commit)
		save();
	event.cancel = false;
}
