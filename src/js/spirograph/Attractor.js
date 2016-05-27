
function Attractor ( mass ) {

  	var width = window.innerWidth;
  	var height = window.innerHeight;

	var R = 150;
	var r;
	var k;
	var l;

	// Universal gravitational constant
	var G = 0.4;
	var mass = mass;
	this.location = [];

	function _createLocation ( index, sections ) {
		
 		r = R / sections;
 		k = r / R;
 		l = R / r;

		this.location = [ R * ((1-k) * Math.cos(index) + l * k * Math.cos( (1-k) / k * index)) + (width / 2),  R * ((1-k) * Math.sin(index) - l * k * Math.sin( (1-k) / k * index)) + (height / 2)];
	}

	function _attract ( element ) {

		var force = [this.location[0] - element.location[0], this.location[1] - element.location[1]];

		var distance = Math.sqrt((force[0] * force[0]) + (force[1] * force[1]));
		distance = Math.min(Math.max(parseInt(distance), 5.0), 25.0);
		force = [force[0] / distance, force[1] / distance];
		var strenght = (G * mass * element.mass) / (distance * distance);
		force = [force[0] * strenght, force[1] * strenght];

		return force;
	}

	return {

		attract : _attract,
		createLocation: _createLocation
	}
}


module.exports = Attractor;

