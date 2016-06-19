var PIXI = require('pixi');

function Ballon ( initLocation ) {

  // Window Values
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Declaraciones para el objeto de Pixi

  var radius = 30;
  var _element = new PIXI.Graphics();

  var color = Math.floor((Math.random() * 2) + 1) > 1 ? "0xB2FECB" : "0xffffff"
  _element.beginFill(color, 0.8);
  _element.drawCircle(0, 0, radius);

  // Physic Properties

  // Essential Rule, acceleration is equal to acceleration plus force
  // Velocity is equal to velocity plus acceleration
  // New position is equal to velocity
  var mass = (Math.random() * 7) + 1;
  var location = initLocation;
  var velocity = [0, 0];
  var acceleration = [0, 0];
  this.location = location;
  this.velocity = [];

  // Funciones del objeto particula

  function _applyForce ( force ) {
    
    var f = [(force[0] / mass), (force[1] / mass)];
    acceleration = [(acceleration[0] + f[0]), (acceleration[1] + f[1])];

  }

  function _update () {

    velocity = [(velocity[0] + acceleration[0]), (velocity[1] + acceleration[1])];
    location = [(location[0] + velocity[0]), (location[1] + velocity[1])];

    acceleration = [0, 0];
    this.location = location;
    this.velocity = velocity;

  }

  function _display () {

    _element.position.x = location[0];
    _element.position.y = location[1];

  }

  function _checkEdges () {
     
    if (location[0] > width) {

      location[0] = width;
      velocity[0] *= -1;

    } else if (location[0] < 0) {

      velocity[0] *= -1;
      location[0] = 0;

    }
 
    if (location[1] > height) {
      
      velocity[1] *= -1;
      location[1] = 0;

    } else if (location[1] < - 50) {
      
      location[1] = height;
      velocity[1] *= 0;

    }
  }
 
  return {

    element: _element,
    velocity: velocity,
    location : location,
    mass : mass,
    applyForce: _applyForce,
    update: _update,
    display: _display,
    checkEdges: _checkEdges
  }
}

module.exports = Ballon;