var PIXI = require('pixi');


var Spirograph = function  ( element ) {

	var renderer;
	var rendererElement;

	var stage;
	var graphics;

  // Values of the spirograph

  var angle;

  var x = 0;
  var y = 0;
  var R = 100;
  var r = 10;
  var k = r / R;
  var l = R / r;
  var t = 0;

	createStage();
	animate();

	function createStage () {
		
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");

		stage = new PIXI.Stage();
		graphics = new PIXI.Graphics();

    stage.addChild(graphics);

    }

	function animate() {

    
    x = R * ((1-k) * Math.cos(t) + l * k * Math.cos((1-k)/k*t)) + 200;
    y = R * ((1-k) * Math.sin(t) - l * k * Math.sin((1-k)/k*t)) + 200;
    t += 1;

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);

    if (t < 720 ){

    graphics.drawCircle(x, y, 1);
    graphics.endFill();

    renderer.render(stage);

    }

    requestAnimationFrame(animate);
	}
}

module.exports = Spirograph;

