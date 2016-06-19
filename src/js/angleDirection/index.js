var PIXI = require('pixi');
var Rope = require('./rope');

var Harmonograph = function () {
		
	var renderer;
	var rendererElement;

	var body = document.querySelector("body");

	var stage;

	var width = window.innerWidth;
	var height = window.innerHeight;

	var _element;

	var rope;

	// Angular values
	function init() {
		
		createStage();
		createElement();
		animate();

	}

	function createStage() {
		
  	renderer = PIXI.autoDetectRenderer(width, height, null, true);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "harmonograph");

    stage = new PIXI.Stage();

 	}

 	function createElement() {
 		
 		rope = new Rope();
 		stage.addChild(rope.element);

 	}

	function animate() {

		rope.applyForce([0.05, 0.05]);

		rope.update();
	  rope.display();
	  rope.checkEdges();

    renderer.render(stage);
		requestAnimationFrame(animate);
	}

	return {

		init: init

	}


}

module.exports = Harmonograph;

