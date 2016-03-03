var PIXI = require('pixi');


var Spirograph = function  ( element ) {

	var renderer;
	var rendererElement;

	var stage;
	var graphics;

	createStage();
	createOuterCircle();
	animate();

	function createStage () {
		
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");

		stage = new PIXI.Stage();

		graphics = new PIXI.Graphics();
	}

	function createOuterCircle() {
		
		graphics.lineStyle(2, 0xFF00FF, 1);
		graphics.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 200);
		graphics.endFill();

		stage.addChild(graphics);
	}

	function createInnerCircle() {
		


		
	}

	function animate() {

    	requestAnimationFrame(animate);

    	// render the root container
    	renderer.render(stage);
	}
}

module.exports = Spirograph;