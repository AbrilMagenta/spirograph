var PIXI = require("pixi");
var Particle = require("./Particle");
var Attractor = require("./Attractor");
var Repeller = require("./Repeller");

// As learned in The nature of code by Daniel Shiffman
// by Abril Alvarez
var Spirograph = function  () {

	var renderer;
	var rendererElement;

	var stage;
	var body = document.querySelector("body");
	
	// Window Values

	var width = window.innerWidth;
	var height = window.innerHeight;

	// Values of the spirograph

  	var sectionCount = 10;

  	var mouseElement;

	// Values of particles 

  	var totalParticles = 1100;
  	var totalAttractors = 1100;
  	var particleslocation;

  	var attractors = [];
  	var particles = [];

  	var newSectionCount;

  	// Values of forces

  	var friction = [];
  	var tick = 1;

	function init () {

	   createStage();
	   createParticles();
	   createAtractors();
	   animate();

	   mouseElement = new Repeller();
	  
	   body.addEventListener("click", mouseClick, false);
	   body.addEventListener("mousemove", mouseMove, false);
	}

  // Creating Elements

	function createStage () {
		
  		renderer = PIXI.autoDetectRenderer(width, height);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");

    	stage = new PIXI.Stage();

  	}

  	function createParticles() {
  	
    	var p = null;

		for (var i = 0; i < totalParticles; i++) {

		   p = new Particle([ ((Math.random() * width) + 0), ((Math.random() * height) + 0) ] );
		   stage.addChild(p.element);
		   particles.push(p);

		}
  	}

  	function createAtractors() {

	  for (var i = 0; i < totalAttractors; i++) {

	    attractors.push( new Attractor( 100 ) );
	    attractors[i].createLocation( i, sectionCount );

	  }
 	}

 	// Events

  function mouseClick(e) {


  	newSectionCount = Math.floor((Math.random() * 10) + 3);

	  for (var i = 0; i < totalParticles; i++) {

	  	attractors[i].createLocation(i, newSectionCount);

	  }

	}

  function mouseMove( e ) {
		
		mouseElement.setNewLocation(e.x, e.y);

	  for (var i = 0; i < totalParticles; i++) {

	    particles[i].applyForce( mouseElement.repell(particles[i]) );

	  }
  }

  // Create Other Forces

  function createFriction ( velocity ) {
	  	
	  var c = 0.01;
	  var normal = 10;

	  friction = [velocity[0] * (-1), velocity[1] * (-1)];
		friction = [friction[0] * (c * normal), friction[1] * (c * normal)];

	 	return friction;
	}

	function animate() {

	  for (var i = 0; i < totalParticles; i++) {

		particles[i].applyForce( createFriction(particles[i].velocity) );
	    particles[i].applyForce( attractors[i].attract( particles[i]) );

		particles[i].update();
	    particles[i].display();
	    particles[i].checkEdges();

	  }

    renderer.render(stage);
    requestAnimationFrame(animate);
	
	}

	return {

		init: init

	}
}

module.exports = Spirograph;