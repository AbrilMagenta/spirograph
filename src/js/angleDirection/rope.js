var PIXI = require('pixi');

function Rope() {
		
  	var width = window.innerWidth;
  	var height = window.innerHeight;
  	var ropeSections = 500;


  	var radius = 5;


	var _element = new PIXI.Graphics();

	_element.beginFill(0xFF700B);
	_element.lineStyle(4, 0xffd900, 0);
	_element.drawRect(-5, 0, 10, 30);
	_element.endFill();

	_element.position.x = 300;
    _element.position.y = 300;

	_element.pivot.x = 0;
	_element.pivot.y = 15;


	var location = [50, 50];
	var velocity = [0, 0];
	var acceleration = [0, 0];
	var mass = radius;

  	this.location = location;
  	this.velocity = [];

  	// Angular values

  	var angle = 0;
	var aVelocity = 0;
	var aAcceleration = 0.01;


	function _applyForce ( force ) {
    
    	var f = [(force[0] / mass), (force[1] / mass)];
   		acceleration = [(acceleration[0] + f[0]), (acceleration[1] + f[1])];

  	}

  	function _update () {

		aAcceleration = acceleration[0] / 10.0;

    	velocity = [(velocity[0] + acceleration[0]), (velocity[1] + acceleration[1])];
    	location = [(location[0] + velocity[0]), (location[1] + velocity[1])];

    	aVelocity = aVelocity + aAcceleration;


    	angle = Math.atan2(velocity[0], velocity[1]);

    	console.log(angle);

    	acceleration = [0, 0];

    	aAcceleration = 0;
    	this.location = location;
    	this.velocity = velocity;

  	}

  	function _display () {

    	_element.position.x = location[0];
   		_element.position.y = location[1];

   		_element.rotation = (angle * -1);

  	}

  	function _checkEdges () {
     
	    if (location[0] > width) {

	      location[0] = width;
	      velocity[0] *= -1;

	    } else if (location[0] < 0) {

	      velocity[0] *= -1;
	      location[0] = 0;

	    }
	 
	    if (location[1] > height) {
	      
	      velocity[1] *= -1;
	      location[1] = height;

	    } else if (location[1] < 0) {
	      
	      velocity[1] *= -1;
	      location[1] = 0;

	    }
  	}

	return {


		element : _element,
		applyForce: _applyForce,
    	update: _update,
    	display: _display,
    	checkEdges: _checkEdges


	}
}

module.exports = Rope;