
function Attractor ( index, sections ) {

  	// Window Values
  	// Todo, make this public
  	var width = window.innerWidth;
  	var height = window.innerHeight;

	var R = 150;
	var r = R / sections;
	var k = r / R;
	var l = R / r;

	// Universal gravitational constant
	var G = 0.4;
	var _mass = [10];
	var _location = [ R * ((1-k) * Math.cos(index) + l * k * Math.cos( (1-k) / k * index)) + (width / 2),  R * ((1-k) * Math.sin(index) - l * k * Math.sin( (1-k) / k * index)) + (height / 2)];


	function _attract ( element ) {

		var force = [_location[0] - element.location[0], _location[1] - element.location[1]];

		var distance = Math.sqrt((force[0] * force[0]) + (force[1] * force[1]));
		distance = Math.min(Math.max(parseInt(distance), 5.0), 25.0);
		force = [force[0] / distance, force[1] / distance];
		var strenght = (G * _mass[0] * element.mass[0]) / (distance * distance);
		force = [force[0] * strenght, force[1] * strenght];

		return force;
	}

	return {
		mass: _mass,
		location: _location,
		attract : _attract
	}
}


module.exports = Attractor;
