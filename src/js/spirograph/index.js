var PIXI = require("pixi");
var Particle = require("./Particle");
var Attractor = require("./Attractor");

// As learned in The nature of code by Daniel Shiffman
// by Abril Alvarez

var Spirograph = function  () {

	var renderer;
	var rendererElement;

	var stage;

  // Window Values

  var width = window.innerWidth;
  var height = window.innerHeight;

  // Values of the spirograph

  var sections = 8;
  var attractors = [];


  // Values of particles 

  var totalParticles = 1000;
  var totalAttractors = 1000;
  var particleslocation;
  var particles = [];

  // Values of forces

  var wind;
  var gravity;
  var friction = [];
  function init () {

    createStage();
    createAtractors();
    animate();

  }

	function createStage () {
		
  	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");
    
    stage = new PIXI.Stage();

    var p = null;

    for (var i = 0; i < totalParticles; i++) {

      p = new Particle([((Math.random() * width) + 0), ((Math.random() * height) + 0)] );
      stage.addChild(p.element);
      particles.push(p);

    }
  }

  function createAtractors() {

    for (var i = 0; i < totalAttractors; i++) {

      attractors.push( new Attractor(i, sections));

    }
  }  

  function createFriction ( velocity ) {
  	
  	var c = 0.01;
  	var normal = 4;
  	var frictionMag = c * normal;

  	friction = [velocity[0] * (-1), velocity[1] * (-1)];
		friction = [friction[0] * frictionMag, friction[1] * frictionMag];

 		return friction;
  }

	function animate() {



		wind = [0.01, 0];
    gravity = [0, 0.1];

    var attractForce;
    var friction;

    for (var i = 0; i < totalParticles; i++) {

    	friction = createFriction(particles[i].velocity);


    	attractForce = attractors[i].attract(particles[i]);
    	particles[i].applyForce(attractForce);
    	particles[i].applyForce(friction);

			// particles[i].applyForce(wind);
			// particles[i].applyForce(gravity);
			
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