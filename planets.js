// Planets.js generates your solar system

// This gives you a solar system
function SolarSystem() {
	var pfact = new PlanetFactory();
	this.planets = new Array();
	
	// Add planets to solar system
		while (this.planets.length < 4)
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
		
		this.planets.push(pfact.getEarth());
}

// A constructor for defining new planets
function Planet(options) {
	this.name = options.name;				// Arbitrary
	
	this.sdist = options.sdist;			// Distance to sun, in AU
	this.speriod = options.speriod;	// Period of loop
	this.sphi = options.sphi;				// Phase angle
	
	this.radius = options.radius;		// Measured in kilometers
	
	this.moons = options.moons;			// Number of moons
}

Planet.prototype.getKeyStats = function() {
	return ("Name: " + this.name +
		", Dist: " + this.sdist + "AU" +
		", Period: " + this.speriod + " centicycle" +
		", Rad: " + this.radius + "km" +
		", Moons: " + this.moons);
}

// Define function for obtaining planets
function PlanetFactory() {}

PlanetFactory.prototype.getEarth = function() {
	return new Planet( {
		name: "Earth",
		sdist: 1, // 1 AU
		speriod: 100, // 1 centicycle
		sphi: 0,			// No phase angle
		radius: 6370, // 6370 km
		moons: 1 // Earth has one moon
	} );
}

PlanetFactory.prototype.getRockyPlanet = function() {
		return new Planet( {
			name: getRandomName(),
			// 0.2 to 4
			sdist: Math.round(( Math.random() * (1.8) ) * 10 + 4)/10,
			// 10 - 200 centicycle periods
			speriod: Math.floor( (Math.random() * 190) + 10),
			sphi: Math.random() * (2 * Math.PI),
			// 2000 - 10000 km
			radius: Math.round(( Math.random() * 8000 )) + 2000,
			moons: Math.floor(Math.random() * 4)
		} );
}

// Helper functions relevant only to planet.js

getRandomName = function() {
	var numsyll = Math.floor(Math.random() * 6)+1;
	var ransyll = [ "ka", "chi", "tzu", "pla", "ke", "n", "m", "t", "ha", "na", "nu", "ne", "tr'y", "tu", "re", "ch", "la", "nur" ];
	var name = "";
	
	for (i = 0; i < numsyll; i++) {
		index = Math.floor(Math.random() * ransyll.length);
		name = name + ransyll[index];
	}
	
	return name.charAt(0).toUpperCase() + name.slice(1);
}