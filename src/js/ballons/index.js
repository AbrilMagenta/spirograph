
var PIXI = require("pixi");
var Ballon = require("./ballon");

var Ballons = function  ( element ) {

	var renderer;
	var rendererElement;

	var element = element;

	var stage;
	var body = document.querySelector("body");
	
  	// Window Values

  	var width = window.innerWidth;
  	var height = window.innerHeight;

  	var totalBallons = 100;
  	var ballons = [];


	function init () {

		createStage();
		createBallons();
		animate();

	}

	function createStage () {
		
	  	renderer = PIXI.autoDetectRenderer(width, height, null, true);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "ballons");

	    stage = new PIXI.Stage();

  	}

  	function createBallons () {
  		
  		var ballon = null;

  		for (var i = 0; i < totalBallons; i++) {

  			ballon = new Ballon([ ((Math.random() * width) + 0), height]);
 			stage.addChild(ballon.element);
  			ballons.push(ballon);
  		}
  	}

  	function animate () {

  		var wind = [0.01, 0.01];


	  	for (var i = 0; i < totalBallons; i++) {

	  		ballons[i].applyForce([0, -0.01] );
			ballons[i].update();
		    ballons[i].display();
		    ballons[i].checkEdges();

	  	}  		
		requestAnimationFrame(animate);
		renderer.render(stage);
  	}

	return {

		init : init

	}

}

module.exports = Ballons;