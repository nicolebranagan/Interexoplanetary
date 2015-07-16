// Main game object

function Game(canv) {
	// Game must be given a canvas to draw on
	this.canvas = canv;
	
	this.scale = 50; // 1 AU = 50 pixels
	this.scale2 = 0.001; // 1 km = 0.001 px
	this.width = 800;
	this.height = 600;
	
	// Generate new solar system
	this.system = new SolarSystem();
}

enterBaseMenu = function() {
	gamecanvas.addEventListener("mousedown", baseMenuClick, false);
	
	menuObjects = new Array();
	menuObjects.push( new Button( {
		x: 10,
		y: 10,
		width: 200,
		height: 100,
		label: "Display diagrammatic",
		clickFunction: function() {
			game.canvas.removeEventListener("mousedown", baseMenuClick);
			enterSystemDiagram();}
	} ));
	
	
	menuObjects.push( new Button( {
		x: 10,
		y: 120,
		width: 200,
		height: 100,
		label: "Display solar system",
		clickFunction: function() {
			game.canvas.removeEventListener("mousedown", baseMenuClick);
			enterDrawSystem();}
	} ));
	drawBaseMenu();
}

drawBaseMenu = function() {
	var ctx = game.canvas.getContext('2d');
	ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	
	for (i = 0; i < menuObjects.length; i++)
		menuObjects[i].draw(ctx);
	
}

function baseMenuClick(event)
{
	for (i = 0; i < menuObjects.length; i++)
	menuObjects[i].onClick(event);
	
	var x = event.pageX - gamecanvas.offsetLeft;
	var y = event.pageY - gamecanvas.offsetTop;
	
	if ((x > 10) && (x < 160) && (y > 10) && (y < 60))
	{
		// Display star system
		game.canvas.removeEventListener("mousedown", baseMenuClick);
		enterDrawSystem();
	}
	else if ((x > 10) && (x < 160) && (y > 60) && (y < 110))
	{
		// Display star system
		game.canvas.removeEventListener("mousedown", baseMenuClick);
		enterSystemDiagram();
	}
}

var gamecanvas = document.getElementById('gamecanvas');
var game = new Game( gamecanvas );
var time = 0;
var time_rate = 1;
var menuObjects;

enterBaseMenu();
