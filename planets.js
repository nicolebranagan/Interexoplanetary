// Planets.js generates your solar system

// This gives you a solar system
function SolarSystem() {
	var pfact = new PlanetFactory();
	this.planets = new Array();
	
	this.numRocky = Math.floor(Math.random() * 3 + 3);
	this.numGas = Math.floor(Math.random() * 5 + 1);
	this.numPlanets = this.numRocky + this.numGas;
	console.log(this.numRocky);
	// Add planets to solar system
		while (this.planets.length < this.numRocky)
		{
			testPlanet = pfact.getRockyPlanet();
			approved = true;
			for (i = 0; i < this.planets.length; i++)
			{
				if (Math.abs(this.planets[i].sdist - testPlanet.sdist) < 0.1)
					approved = false;
			}
			if (approved)
				this.planets.push(testPlanet);
		}
		
		while (this.planets.length < this.numPlanets)
		{
			testPlanet = pfact.getGasPlanet();
			approved = true;
			for (i = 0; i < this.planets.length; i++)
			{
				if (Math.abs(this.planets[i].sdist - testPlanet.sdist) < 0.5)
					approved = false;
			}
			if (approved)
				this.planets.push(testPlanet);
		}
		
		this.planets.push(pfact.getEarth());
}

// A constructor for defining new planets
function Planet(options) {
	this.type = options.type;				// "Rocky" or "Gas"
	this.name = options.name;				// Arbitrary
	
	this.sdist = options.sdist;			// Distance to sun, in AU
	this.speriod = options.speriod;	// Period of loop
	this.sphi = options.sphi;				// Phase angle
	
	this.radius = options.radius;		// Measured in kilometers
	
	this.moons = options.moons;			// Number of moons
	
	this.habitable = options.habitable;
}

Planet.prototype.getKeyStats = function() {
	return (this.type + " Planet " + this.name +
		": Dist: " + this.sdist + "AU" +
		", Period: " + this.speriod + " centicycle" +
		", Rad: " + this.radius + "km" +
		", Moons: " + this.moons);
}

// Define function for obtaining planets
function PlanetFactory() {}

PlanetFactory.prototype.getEarth = function() {
	return new Planet( {
		type: "Rocky",
		name: "Earth",
		sdist: 1, // 1 AU
		speriod: 100, // 1 centicycle
		sphi: 0,			// No phase angle
		radius: 6370, // 6370 km
		moons: 1, // Earth has one moon
		habitable: true // for now
	} );
}

PlanetFactory.prototype.getRockyPlanet = function() {
		// Period is a function of distance from sun, Kepler
		var dist =  Math.round(( Math.random() * (1.8) ) * 10 + 4)/10;
		var period = Math.round(Math.sqrt(Math.pow(dist,3)) * 100);
		var habit = ((dist < 1.67) && (dist > 0.95)) // Habitable zone
		return new Planet( {
			type: "Rocky",
			name: getRandomName(),
			// 0.2 to 4
			sdist: dist,
			speriod: period,
			sphi: Math.random() * (2 * Math.PI),
			// 2000 - 10000 km
			radius: Math.round(( Math.random() * 8000 )) + 2000,
			moons: Math.floor(Math.random() * 4),
			habitable: habit
		} );
}

PlanetFactory.prototype.getGasPlanet = function() {
		return new Planet( {
			type: "Gas",
			name: getRandomName(),
			// 3 to 30 AU
			sdist: Math.round(( Math.random() * (27) ) * 10 + 3)/10,
			// 100 - 2000 centicycle periods
			speriod: Math.floor( (Math.random() * 1900) + 100),
			sphi: Math.random() * (2 * Math.PI),
			// 9000 - 80000 km
			radius: Math.round(( Math.random() * 71000 )) + 9000,
			moons: Math.floor(Math.random() * 15),
			habit: false // Don't live on a gas giant, kids
		} );
}

// Helper functions relevant only to planet.js

getRandomName = function() {
	var numsyll = Math.floor(Math.random() * 6)+1;
	var ransyll = [ "in", "hun", "loe" ,"de", "d", "ven", "ti", "gro", "j", "", "'", "ka", "chi", "tzu", "pla", "ke", "n", "m", "vy", "ha", "na", "nu", "ne", "tr'y", "tu", "re", "ch", "la", "nur" ];
	var name = "";
	
	for (i = 0; i < numsyll; i++) {
		index = Math.floor(Math.random() * ransyll.length);
		name = name + ransyll[index];
	}
	
	return name.charAt(0).toUpperCase() + name.slice(1);
}