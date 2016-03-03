
var paper = require('paper');

var Planet = function  ( label, radius, distance, days, updatePosition ) {

	var orbit;
	var planet;

	var canvasXCenter = paper.view.size.width / 2;
	var canvasYCenter = paper.view.size.height / 2;

	var orbitDistance = canvasXCenter * distance;

	var angle = 0;
	var years = 0;

	var x;
	var y;

	createOrbit();
	_position();

	function createOrbit () {

		orbit = new paper.Path.Circle(new paper.Point(paper.view.center), orbitDistance);
		orbit.style = {
			
			strokeColor: '#d3d3d3',
    		strokeWidth: 0.2
		}
	}

	function _position () {
		
		x = canvasXCenter - orbitDistance * Math.sin(angle);
     	y = canvasYCenter - orbitDistance * Math.cos(angle);

      	angle += 2 * Math.PI / (days / 1.5);
       	years = Math.floor(angle / (2 * Math.PI));

       	if (years === 8) {

       		angle = 0;
       		x = 0;
       		y = 0;

       	};

       	updatePosition(label, x, y);

 	}

	return {

		days: days,
		position : _position


	}


}

module.exports = Planet;