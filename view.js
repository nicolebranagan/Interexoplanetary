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

Game.prototype.drawPlanetInfo = function() {
	var ctx = this.canvas.getContext('2d');
	ctx.font = "16px serif";
	for (i = 0; i < this.system.planets.length; i++) {
		label = this.system.planets[i].getKeyStats();
		ctx.fillText(label, 10, 20*(i+1));
	}
}

var gamecanvas = document.getElementById('gamecanvas');
var game = new Game( gamecanvas );
var time = 0;
var time_rate = 1;

//plotCourse();
enterDrawSystem();