var showEarth = true;
var timeout;
var dsObjects;

drawSystem = function() {
	time = time + time_rate;
	
	var ctx = game.canvas.getContext('2d');
	ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	
	ctx.lineWidth = 1;
	ctx.font = "10px sans-serif";
		
	ctx.beginPath();
	ctx.arc(game.width/2,game.height/2,10,0,2*Math.PI);
	ctx.closePath();
	ctx.fillStyle="rgba(255, 255, 0, 1.0)";
	ctx.fill();
	
	for (i = 0; i < game.system.planets.length; i++) {
		// draw path
		ctx.strokeStyle="white";
		ctx.textAlign = "left";
		
		ctx.beginPath();
		ctx.arc(game.width/2,game.height/2,game.scale*game.system.planets[i].sdist,0,2*Math.PI)
		ctx.closePath();
		ctx.stroke();
		
		var x = Math.sin((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		var y = Math.cos((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		x = (x * game.system.planets[i].sdist * game.scale) + game.width/2;
		y = (y * game.system.planets[i].sdist * game.scale) + game.height/2;
		
		// draw planet
		ctx.beginPath();
		ctx.arc(x,y,game.scale2 * game.system.planets[i].radius,0,2*Math.PI);
		ctx.closePath();
		if (game.system.planets[i].type == "Rocky") {
			if (game.system.planets[i].habitable)
				ctx.fillStyle="green";
		  else
				ctx.fillStyle="brown";
		} else
			ctx.fillStyle="orange";
		ctx.fill();
		
		ctx.fillStyle="white";
		ctx.fillText(game.system.planets[i].name, x + game.scale2 * game.system.planets[i].radius, y + game.scale2 * game.system.planets[i].radius);
	}
	
	// Draw our colony
		ctx.strokeStyle="grey";
		ctx.beginPath();
		ctx.arc(game.width/2,game.height/2,game.scale*50,0,2*Math.PI)
		ctx.closePath();
		ctx.stroke();
		
		x = (1 * 50 * game.scale) + game.width/2;
		y = game.height/2;
		
		// draw planet
		ctx.beginPath();
		ctx.arc(x,y,20,0,2*Math.PI);
		ctx.closePath();
		ctx.fillStyle = "grey";
		ctx.fill();
		
		ctx.fillStyle="white";
		ctx.fillText("Waystation 2", x+25, y);
	
	if (showEarth) {
		// Draw Earth for comparison
		var pfact = new PlanetFactory();
		var earth = pfact.getEarth();
		ctx.strokeStyle="blue";
		ctx.beginPath();
		ctx.arc(game.width/2,game.height/2,game.scale*earth.sdist,0,2*Math.PI)
		ctx.closePath();
		ctx.stroke();
		
		var x = Math.sin((time/earth.speriod) * (2 * Math.PI));
		var y = Math.cos((time/earth.speriod) * (2 * Math.PI));
		x = (x * earth.sdist * game.scale) + game.width/2;
		y = (y * earth.sdist * game.scale) + game.height/2;
		
		// draw planet
		ctx.beginPath();
		ctx.arc(x,y,game.scale2 * earth.radius,0,2*Math.PI);
		ctx.closePath();
		ctx.fillStyle = "blue";
		ctx.fill();
		
		ctx.fillStyle="white";
		ctx.fillText(earth.name, x + game.scale2 * earth.radius, y + game.scale2 * earth.radius);
	}
	
	timeout = setTimeout(drawSystem, 500);
	
	dsObjects.forEach(function(a,b,c) {a.draw(ctx);});
}

function drawSystemClick(event)
{
	dsObjects.forEach( function(element, index, array) {element.onClick(event);} );
	
	var x = event.pageX - gamecanvas.offsetLeft;
	var y = event.pageY - gamecanvas.offsetTop;

	for (i = 0; i < game.system.planets.length; i++) {
		var xpla = Math.sin((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		var ypla = Math.cos((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		xpla = (xpla * game.system.planets[i].sdist * game.scale) + game.width/2;
		ypla = (ypla * game.system.planets[i].sdist * game.scale) + game.height/2;
		rpla = game.scale2 * game.system.planets[i].radius * 2;
		
		if ((Math.pow(x - xpla,2) + Math.pow(y - ypla,2)) <= rpla) {
			alert(game.system.planets[i].getKeyStats());
			break;
		}
	}
} 

function drawSystemKeyDown(event) {
	if (event.keyCode == 32) { // SPACE
		if (time_rate == 1)
			time_rate = 0;
		else
			time_rate = 1;
	}
	else if (event.keyCode == 90) { // Z
		game.scale = game.scale / 1.5;
		game.scale2 = game.scale2 / 1.1;
	}
	else if (event.keyCode == 88) { // X
		game.scale = game.scale * 1.5;
		game.scale2 = game.scale2 * 1.1;
	}
	else if (event.keyCode == 67) { // C
		showEarth = !showEarth;
	}
	else if (event.keyCode == 8) { // Backspace
		exitDrawSystem();
		event.preventDefault();
	}
}

function enterDrawSystem() {
	gamecanvas.addEventListener("mousedown", drawSystemClick, false);
	window.addEventListener("keydown", drawSystemKeyDown, false);
	var span = document.getElementById('infospan');
	span.style.color = '#FFFFFF';
	
	dsObjects = new Array();
	dsObjects.push( new Button( {
		x: 10,
		y: 10,
		width: 20,
		height: 20,
		label: "Z+",
		clickFunction: function() {
			game.scale = game.scale * 1.5;
			game.scale2 = game.scale2 * 1.1;}
	} ));	
	
	dsObjects.push( new Button( {
		x: 30,
		y: 10,
		width: 20,
		height: 20,
		label: "Z-",
		clickFunction: function() {
			game.scale = game.scale / 1.5;
			game.scale2 = game.scale2 / 1.1;}
	} ));
	
	dsObjects.push( new Button( {
		x: 690,
		y: 10,
		width: 90,
		height: 20,
		label: "Toggle Earth",
		clickFunction: function() {
			showEarth = !showEarth;}
	} ));
	
	dsObjects.push( new Button( {
		x: 10,
		y: 570,
		width: 130,
		height: 20,
		label: "Return to menu",
		clickFunction: function() {
					exitDrawSystem();}
	} ));
	drawSystem();
}

function exitDrawSystem() {
	gamecanvas.removeEventListener("mousedown", drawSystemClick);
	window.removeEventListener("keydown", drawSystemKeyDown);
	clearTimeout(timeout);
	
	enterBaseMenu();
	
	var span = document.getElementById('infospan');
	span.style.color = '#000000';
}
