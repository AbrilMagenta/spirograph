var PIXI = require('pixi');

function Flower ( initLocation, newRange, image ) {

  // Window Values
  var width = window.innerWidth;
  var height = window.innerHeight;
  var texture = PIXI.Texture.fromImage("assets/img/flowers/flower0" + image +".png");

  // Declaraciones para el objeto de Pixi
  var radius = newRange;
  var _element = new PIXI.Sprite(texture);

  _element.anchor.x = 0.5;
  _element.anchor.y = 0.5;
  _element.position.x = initLocation[0];
  _element.position.y = initLocation[1];

  _element.width = radius * 50;
  _element.height = radius * 50;

  // Physic Properties
  // Essential Rule, acceleration is equal to acceleration plus force
  // Velocity is equal to velocity plus acceleration
  // New position is equal to velocity
  var mass = 1;
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
     
    // if (location[0] > width) {

    //   location[0] = width;
    //   velocity[0] *= -1;

    // } else if (location[0] < 0) {

    //   velocity[0] *= -1;
    //   location[0] = 0;

    // }
 
    // if (location[1] > height) {
      
    //   velocity[1] *= -1;
    //   location[1] = height;

    // } else if (location[1] < 0) {
      
    //   velocity[1] *= -1;
    //   location[1] = 0;

    // }
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

module.exports = Flower;