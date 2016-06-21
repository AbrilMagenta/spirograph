var PIXI = require('pixi');

function Row ( index ) {

  	var width = window.innerWidth;
  	var height = window.innerHeight;
  	// var theta = 360 / sections;
  	var index = index;
  	var radius;
  	var x;
  	var y;
  	var theta;

	// Universal gravitational constant
	var G = 0.4;
	var mass = 200;
	this.location = [];

	function _createLocations (newRadius, newTheta) {
		
		theta = newTheta;
		radius = newRadius;
		x = radius * Math.sin(theta) + (width / 2);
     	y =  radius * Math.cos(theta) + (height / 2);
   		this.location = [x, y];
	}

	function _rotate (newTheta) {

		x = radius * Math.sin(theta + newTheta) + (width / 2);
     	y =  radius * Math.cos(theta + newTheta) + (height / 2);
   		this.location = [x, y];


	}



	function _attract ( element ) {

		var force = [this.location[0] - element.location[0], this.location[1] - element.location[1]];

		var distance = Math.sqrt((force[0] * force[0]) + (force[1] * force[1]));
		distance = Math.min(Math.max(parseInt(distance), 24.0), 25.0);
		force = [force[0] / distance, force[1] / distance];
		var strenght = (G * mass * element.mass) / (distance * distance);
		force = [force[0] * strenght, force[1] * strenght];

		return force;
	}

	return {

		// element : _element,
		attract : _attract,
		createLocations: _createLocations,
		rotate : _rotate
	}
}


module.exports = Row;

