var PIXI = require('pixi');

var Spirograph = function  () {

	var renderer;
	var rendererElement;

	var stage;
	var graphics;

  var width = window.innerWidth;
  var height = window.innerHeight;

  // Values of the spirograph
  var sections = 7;

  var R = 100;
  var r = R / sections;
  var k = r / R;
  var l = R / r;
  var t = 0;



  var totalElements = 1000;
  var particles = [];

  var wind;
  var gravity;

	createStage();
  // createAtractors();
	animate();

	function createStage () {
		
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");
    
    stage = new PIXI.Stage();

      for (var i = 0; i < totalElements; i++) {

        var p = createParticle([((Math.random() * width) + 0), ((Math.random() * height) + 0)]);
        stage.addChild(p);
        particles.push(p);
      }
  }

  function createAtractors() {
        
    var atractorsPosition = [];
    var density = 400;
    var newX = null;
    var newY = null;

    for (var i = 0; i < density; i++) {

      newX = R * ((1-k) * Math.cos(i) + l * k * Math.cos( (1-k) / k * i)) + (width / 2);
      newY = R * ((1-k) * Math.sin(i) - l * k * Math.sin( (1-k) / k * i)) + (height / 2);

      // Posiciones ancla
      atractorsPosition.push([newX, newY]);
    }
  }  

  function createParticle ( location ) {

    var _this = new PIXI.Graphics();

    // Declaraciones para el objeto de Pixi
    _this.radius = (Math.random() * 3) + 0.5;
    _this.beginFill(0xFFFFFF, 1);
    _this.drawCircle(0, 0, _this.radius);

    // Magnitudes
    _this.mass = [_this.radius, _this.radius];
    _this.location = location;
    _this.velocity = [0, 0];
    _this.acceleration = [0, 0];

    // Funciones del objeto particula

    _this.applyForce = function ( force ) {
      
      var f = [(force[0] / _this.mass[0]), (force[1] / _this.mass[1])];
      _this.acceleration = [(_this.acceleration[0] + f[0]), (_this.acceleration[1] + f[1])];
    }

    _this.update = function () {
      
      _this.velocity = [(_this.velocity[0] + _this.acceleration[0]), (_this.velocity[1] + _this.acceleration[1])];
      _this.location = [(_this.location[0] + _this.velocity[0]), (_this.location[1] + _this.velocity[1])];
      _this.acceleration = [0, 0];

    }

    _this.display = function () {
        
      _this.position.x = _this.location[0];
      _this.position.y = _this.location[1];

    }

    _this.checkEdges = function () {
      
      if (_this.location[0] > width) {

        _this.location[0] = width;
        _this.velocity[0] *= -1;

      } else if (_this.location[0] < 0) {

        _this._velocity[0] *= -1;
        _this.location[0] = 0;

      }
 
      if (_this.location[1] > height) {
      
        _this.velocity[1] *= -1;
        _this.location[1] = height;
      }
    }

    return _this;
  }

	function animate() {

    wind = [0.01, 0];
    gravity = [0, 0.1];

    for (var i = 0; i < totalElements; i++) {

      // particles[i].applyForce(wind);
      particles[i].applyForce(gravity);
      particles[i].update();
      particles[i].display();
      particles[i].checkEdges();

    }
    renderer.render(stage);
    requestAnimationFrame(animate);
	}
}

module.exports = Spirograph;