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

drawBaseMenu = function() {
	var ctx = game.canvas.getContext('2d');
	ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

	ctx.beginPath();
  ctx.rect(10, 10, 150, 50);
	ctx.rect(10, 60, 150, 50);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'black';
  ctx.stroke();
	
	ctx.fillStyle="black";
	ctx.font = "15px serif";
	ctx.fillText("Display star system",15,40);
	ctx.fillText("Display diagramatic",15,90);
	ctx.font = "";
	
	gamecanvas.addEventListener("mousedown", baseMenuClick, false);
}

function baseMenuClick(event)
{
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

drawBaseMenu();
//enterSystemDiagram();
//enterDrawSystem();