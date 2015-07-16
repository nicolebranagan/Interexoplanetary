plotCourse = function() {
	var ctx = game.canvas.getContext('2d');
	var count = game.system.planets.length;
	
	for (i = 0; i < count; i++) {
		// draw path
		ctx.strokeStyle="white";
		
		ctx.beginPath();
		ctx.arc(game.width/2,game.height/2,(game.height/2)*(i+1)/(count+1),0,2*Math.PI)
		ctx.closePath();
		ctx.stroke();
		
		var x = Math.sin((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		var y = Math.cos((time/game.system.planets[i].speriod) * (2 * Math.PI) + game.system.planets[i].sphi);
		x = (x * (game.height/2)*(i+1)/(count+1)) + game.width/2;
		y = (y * (game.height/2)*(i+1)/(count+1)) + game.height/2;
		
		// draw planet
		ctx.beginPath();
		ctx.arc(x,y,10,0,2*Math.PI);
		ctx.closePath();
		if (game.system.planets[i].type == "Rocky") {
			if (game.system.planets[i].habitable)
				ctx.fillStyle="green";
		  else
				ctx.fillStyle="brown";
		} else
			ctx.fillStyle="orange";
		ctx.fill();
	}
	
	for (i = 0; i < (count - 1); i++) {
		ctx.fillStyle = "white";
		ctx.fillText(""+Math.round(( game.system.planets[i+1].sdist - game.system.planets[i].sdist )*10)/10, ((game.height/2)*(i+1)/(count+1)) + game.width/2 + 10,game.height/2);
	}
}

