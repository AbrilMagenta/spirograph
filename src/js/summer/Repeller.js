
function Repeller () {

	var width = window.innerWidth;
  	var height = window.innerHeight;

  	var strenght = 500;
	this.location = [];

	function _setNewLocation ( x, y ) {
		
		this.location = [ x, y ];
	}

	function _repell ( element ) {

		// Sacar el vector entre los elementos
		var dir =  [this.location[0] - element.location[0], this.location[1] - element.location[1]];

		// Sacar la maginitud con el teorema de pitagoras
		var d = Math.sqrt((dir[0] * dir[0]) + (dir[1] * dir[1]));

		//Normalizar Vector entre la maginitd
		dir = [dir[0] / d, dir[1] / d];

		// Constrain	
		d = Math.min(Math.max(parseInt(d), 5), 100);

		var force = -1 * strenght / ( d * d );
		dir = [ dir[0] * force, dir[1] * force ] 

		return dir;
	}

	return {

		repell : _repell,
		setNewLocation : _setNewLocation

	}
}


module.exports = Repeller;



