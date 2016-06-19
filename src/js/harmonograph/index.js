var PIXI = require('pixi');
var Oscillator = require('./oscillator');

var Harmonograph = function () {
		
	var renderer;
	var rendererElement;

	var body = document.querySelector("body");

	var stage;

	var width = window.innerWidth;
	var height = window.innerHeight;

	var _element;
	var sections = 500;
	var shapeMap = [];
	var oscillators = [];
	var directions = [];

	var angle = 0;
	var angleVelocity = 0.5;
	var amplitude = 50;
	
	function init() {
		calculateShape();		
		createStage();
		getDirections();


		// createElement();
		animate();

	}

	function createStage() {
		
  	renderer = PIXI.autoDetectRenderer(width, height, null, true);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "harmonograph");
    stage = new PIXI.Stage();

    _element = new PIXI.Graphics();
    stage.addChild(_element);

    var newX;
    var newY;

    _element.beginFill(0x000000, 0.2);
 		_element.lineStyle(1, 0x000000);
		_element.moveTo(0, 0);

    for (var i = 0; i < sections; i++) {

    	 newX = -10 * (0.04 * i) * Math.sin(( 1 * i ) + ( Math.PI / 4 ));
    	 newY = 10 * (0.01 * i) * Math.sin(1 * i);

      _element.lineTo(newX, newY);
  		// _element.drawCircle(newX, newY, 1);
  		// angle =  angle + angleVelocity;	

    };

   
 		


    // for (var i = 1; i < sections; i++) {


    //     _element.beginFill(0x000000, 0.3);
    //     _element.drawCircle(shapeMap[i][0], shapeMap[i][1], 5);
    //     _element.endFill();
    // };

		_element.position.x = 500;
		_element.position.y = 500;

 	}

 	function calculateShape () {
 			
 		// for (var i = 0; i < sections; i++) {
 		
 		// 	var x = 200 * Math.sin((i * 1) + 0);
 		// 	var y = 200 * Math.sin(i * 2);

 		// 	shapeMap.push([ x, y ]);
 		// }


 		for (var i = 0; i < sections; i++) {
 		
 			x = Math.cos(i * 1.01) * 2 * i - 5 * Math.sin(Math.cos (i* 50) * 0.001 * i ) * 15;
			y = Math.cos(i) * 2 * i + 5 * Math.cos( Math.cos( i * 50 ) * 0.001 * i ) * 15;

 			shapeMap.push([ x, y ]);
 		}
 	}

 	function createElement() {
 			
    	var p = null;

			for (var i = 0; i < sections; i++) {

				p = new Oscillator();
				p.create(shapeMap[i]);
				stage.addChild(p.element);		
				oscillators.push(p);
			}	
 	}

 	function getDirections() {
 		
 		for (var i = 0; i < sections - 1; i++) {
 			
 			var angle = Math.atan2( ( shapeMap[i + 1][0] -  shapeMap[i][0] ), (shapeMap[i + 1][1] -  shapeMap[i][1])) 

 			directions.push(angle);
 		}
 	}

	function animate() {


    // _element.clear();







   
    // for (var i = 0; i < sections; i++) {

    // 	 newX = 10 * (-0.01 * i) * Math.sin(( 1 * i ) + ( Math.PI / 4 ));
    // 	 newY = 10 * (-0.04 * i) * Math.sin(1 * i);


    // 	 console.log(newX, newY);


    //   // _element.lineTo(i * 100, amplitude * Math.sin(angle));
  		// _element.drawCircle(newX, newY, 3);
  		// // angle =  angle + angleVelocity;	

    // };

    // _element.lineTo(0, 0);

   




  renderer.render(stage);


	requestAnimationFrame(animate);

	}

	return {

		init: init

	}


}

module.exports = Harmonograph;

