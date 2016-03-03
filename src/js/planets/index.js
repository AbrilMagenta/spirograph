
var paper = require('paper');
var Planet = require('./Planet');

var SolarSystem = function  ( element ) {

	var canvas = document.getElementById('planets');
	var width;
	var baseDistance;

	var earth;
	var venus;
	var mercury;

	var allPlanets = [];

	var posX01;
	var posX02;
	var posY01;
	var posY02;

	var line;

	var play = false;

	var i = 0;
	var densityBase = 1;
	var density = densityBase;

	var current01 = 0;
	var current02 = 1;

	var planetsData = [

    	{"name": "Mercury", "days": "87", "radius": "2", "distance": 0.4},
    	{"name": "Venus", "days": "225", "radius": "3", "distance": 0.5},
    	{"name": "Earth", "days": "365", "radius": "4", "distance": 0.6},
    	{"name": "Mars", "days": "687", "radius": "5", "distance": 0.7}
	]

	init();

	function init () {
			
		paper.setup(canvas);

		width = paper.view.size.width;

		for (var i = 0; i < planetsData.length; i++) {
		
			allPlanets.push(

				new Planet(planetsData[i].name, planetsData[i].radius, planetsData[i].distance, planetsData[i].days, updatePosition)
			)

		};

		playPlanets (current01, current02);

	}

	function updatePosition (label, x, y) {

		i++

		if (i  === densityBase) {

		densityBase = densityBase + density;

			line = new paper.Path();
			line.strokeColor = '#d3d3d3';
			line.strokeWidth = '0.1';

			if (label === planetsData[current01].name) {

				posX01 = x;
				posY01 = y;

			} else {
			
				posX02 = x;
				posY02 = y;

			}

			line.moveTo(posX01, posY01);
	      	line.lineTo(posX02, posY02);
		};
	}

	function playPlanets (planet01, planet02) {
		
		current01 = planet01;
		current02 = planet02;
		play = true;

	}

	function stopPlanets () {
		
		play = false;
	}

	paper.view.onFrame = function(event) {

		if (play) {

			allPlanets[current01].position();
			allPlanets[current02].position();
		};
	}
}

module.exports = SolarSystem;