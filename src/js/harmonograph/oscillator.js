var PIXI = require('pixi');

function Oscillator() {
		
  	var width = window.innerWidth;
  	var height = window.innerHeight;

  	var radius = 2;

	var _element = new PIXI.Graphics();

	var amplitude = 5;

	var positionX;
	var positionY;




  	function _create( position ) {
  		
		_element.beginFill(0x000000, 0.3);
	  


		positionX = position[0];
		positionY = position[1];

		_element.lineStyle(2,0xffc2c2, 2);
   		_element.moveTo(0, 0);
  	}


  		function createLine() {
  		




  		}


	function _oscillate ( index, angle, direction ) {
		
		if (direction <= 0 ) {
		

		_element.position.x = positionX;
	   	_element.position.y = positionY + (amplitude * Math.sin(angle));

	   	// _element.lineTo(positionX, positionY + (amplitude * Math.sin(angle)));


		} else {

		_element.position.x = positionX  + (amplitude * Math.sin(angle));
	   	_element.position.y = positionY;


		}



  	}

  	function _display() {

  	}

	return {

		element : _element,
		oscillate : _oscillate,
		create : _create,
		display : _display
	}
}

module.exports = Oscillator;