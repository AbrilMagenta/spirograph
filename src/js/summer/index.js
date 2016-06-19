var PIXI = require("pixi");
var Particle = require("./Particle");
var Flower = require("./Flower");
var Row = require("./Row");
var Repeller = require("./Repeller");

// As learned in The nature of code by Daniel Shiffman
// by Abril Alvarez
var Summer = function  () {
	var renderer;
	var rendererElement;

	var stage;
	var body = document.querySelector("body");
	
	// Window Values

	var width = window.innerWidth;
	var height = window.innerHeight;

	// Values of the spirograph

  	var mouseElement;

	// Values of flowers
		var allRows = [];
  	var row;
  	var rows = [];
  	var flowersPerRow = Math.floor((Math.random() * 30) + 10);
  	var totalRows = Math.floor((Math.random() * 4) + 2);
  	var rowsRadiusStart = 170;

  	var flower;
  	var flowers = [];


    var totalFlower = totalRows * flowersPerRow; 

  	var minimalSize = 0.5;
  	var lastMinSize = 0.5;

  	// Values of forces

  	var friction = [];
  	var tick = 1;

  	var flowerImages = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  	var flowerImagesUsed = [];


		shuffleFlowers(flowerImages);

		function init () {

	   createStage();
		 createRows();
		 animate();

		 mouseElement = new Repeller();
	   // body.addEventListener("click", mouseClick, false);
	   body.addEventListener("mousemove", mouseMove, false);
		}

  // Creating Elements

	function createStage () {
		
  	renderer = PIXI.autoDetectRenderer(width, height, null, true);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "summer");
		stage = new PIXI.Stage();

	}

  function createRow(rowIndex) {
  		
  	var angle = 0;

			 for (var i = 0; i < flowersPerRow; i++) {
		  	
 		  	row = new Row(i);
	  		row.createLocations(rowsRadiusStart + (rowIndex * rowsRadiusStart), angle)
	  		rows.push(row);

				angle += 2 * Math.PI / flowersPerRow;

		}
  }

  function createRows() {
			
		for (var m = 1; m < totalRows + 1; m++) {

	 		minimalSize = lastMinSize;

	 		allRows.push(createRow(m));
			createFlower(sortFlowers());

			lastMinSize = 0.7 * m;
		}
	}

  function createFlower(setflowerArray) {

   	var flowerP = null;

  	for (var i = 0; i < flowersPerRow; i++) {

  		if (flowerP > setflowerArray.length - 2) {

  			flowerP = 0;

  		} else {

  			flowerP = flowerP + 1;

  		}
				
			flower = new Flower([ ((Math.random() * -width) + width), ((Math.random() * height) + 0) ], minimalSize + flowerP, setflowerArray[flowerP]);

			stage.addChild(flower.element);
  		flowers.push(flower);
		}
	 }

  function sortFlowers() {

  	var newflowerArray;

		if (flowerImages.length < 1) {

			flowerImages = flowerImagesUsed;
			flowerImagesUsed = [];
		}
			
		newflowerArray = flowerImages.splice(0, (Math.random() * 2) + 2);

		for (var i = 0; i < newflowerArray.length; i++) {
			flowerImagesUsed.push(newflowerArray[i]);
		}

		return newflowerArray;
  }

function mouseClick(e) {

	  for (var i = 0; i < totalFlower; i++) {

	  	rows[i].createLocation(i, newSectionCount);

	  }

	}

	function shuffleFlowers(a) {
	    var j, x, i;
	    for (i = a.length; i; i -= 1) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}



  function mouseMove( e ) {
		
		mouseElement.setNewLocation(e.x, e.y);

	  for (var i = 0; i < totalFlower; i++) {

	    flowers[i].applyForce( mouseElement.repell(flowers[i]));

	  }
  }

  // Create Other Forces

	 function createFriction ( velocity ) {
		  	
		 var c = 0.01;
		 var normal = 5;

		friction = [velocity[0] * (-1), velocity[1] * (-1)];
		friction = [friction[0] * (c * normal), friction[1] * (c * normal)];

		return friction;
		}

	function animate() {

	  for (var i = 0; i < totalFlower; i++) {

			flowers[i].applyForce( createFriction(flowers[i].velocity) );
	    flowers[i].applyForce( rows[i].attract( flowers[i]) );

			flowers[i].update();
	    flowers[i].display();
	    flowers[i].checkEdges();

	  }

    renderer.render(stage);
    requestAnimationFrame(animate);
	
	}

	return {

		init: init

	}
}

module.exports = Summer;