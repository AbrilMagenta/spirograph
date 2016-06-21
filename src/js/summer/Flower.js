var PIXI = require('pixi');

function Flower (initLocation, newRange, image) {

  // Window Values
  var width = window.innerWidth;
  var height = window.innerHeight;


  var texture = PIXI.Texture.fromImage("assets/img/flowers/" + image +".png");
  var newTexture = texture
  var radius = newRange;
  var newRadius = radius;

  this.element = new PIXI.Sprite(texture);
  this.element.anchor.x = 0.5;
  this.element.anchor.y = 0.5;
  this.element.position.x = initLocation[0];
  this.element.position.y = initLocation[1];

  this.element.width = radius * 50;
  this.element.height = radius * 50;

  var mass = 1;
  var acceleration = [0, 0];

  this.location = initLocation;
  this.velocity = [0,0];


  function _addTexture( newImage, newSize ) {

    newRadius = newImage === 10 ? 0.5 : newSize;

    this.element.anchor.x = 0.5;
    this.element.anchor.y = 0.5;
    this.element.width = newRadius * 50;
    this.element.height = newRadius * 50;

    newTexture = PIXI.Texture.fromImage("assets/img/flowers/" + newImage +".png");

    this.element.setTexture(newTexture);
  }

  // Funciones del objeto particula
  function _applyForce ( force ) {
    
    var f = [(force[0] / mass), (force[1] / mass)];
    acceleration = [(acceleration[0] + f[0]), (acceleration[1] + f[1])];

  }

  function _update () {

    this.velocity = [(this.velocity[0] + acceleration[0]), (this.velocity[1] + acceleration[1])];
    this.location = [(this.location[0] + this.velocity[0]), (this.location[1] + this.velocity[1])];

    acceleration = [0, 0];

  }

  function _display () {

    this.element.position.x = this.location[0];
    this.element.position.y = this.location[1];

  }

  return {

    element: this.element,
    velocity: this.velocity,
    location : this.location,
    mass : mass,
    applyForce: _applyForce,
    update: _update,
    display: _display,
    addTexture : _addTexture
  }
}

module.exports = Flower;