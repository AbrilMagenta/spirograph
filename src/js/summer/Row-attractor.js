var PIXI = require('pixi');

function Row ( index ) {

  	var width = window.innerWidth;
  	var height = window.innerHeight;

  	// var theta = 360 / sections;
  	var index = index;
  	var radius;
  	var x;
  	var y;

	// Universal gravitational constant
	var G = 0.4;
	var mass = mass;
	this.locations = [];

	var _element = new PIXI.Graphics();
	_element.beginFill(0xFFFFFF, 0.4);
	_element.drawCircle(0, 0, 2);


	function _createLocations (theta) {
		
	

		x = Math.sin(angle);
     	y = Math.cos(angle);


		_element.position.x = x - 200;
   		_element.position.y = y;
	}

	// function _attract ( element ) {

	// 	var force = [this.location[0] - element.location[0], this.location[1] - element.location[1]];

	// 	var distance = Math.sqrt((force[0] * force[0]) + (force[1] * force[1]));
	// 	distance = Math.min(Math.max(parseInt(distance), 5.0), 25.0);
	// 	force = [force[0] / distance, force[1] / distance];
	// 	var strenght = (G * mass * element.mass) / (distance * distance);
	// 	force = [force[0] * strenght, force[1] * strenght];

	// 	return force;
	// }

	return {

		element : _element,
		createLocations: _createLocations
	}
}


module.exports = Row;

