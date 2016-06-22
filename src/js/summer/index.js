var PIXI = require("pixi");
var TweenMax = require("gsap");

var Flower = require("./Flower");
var Row = require("./Row");
var Repeller = require("./Repeller");

// Midsummer invitation with physics
// by Abril Alvarez

var Summer = function  () {

  var renderer;
  var rendererElement;

  var stage;
  var body = document.querySelector("body");
  
  // Window Values
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Values of flowers and rows
  var flowersPerRow = Math.floor((Math.random() * 30) + 10);
  var totalRows = Math.floor((Math.random() * 4) + 3);

  var totalFlower = totalRows * flowersPerRow; 
  var lastTotalFlowers = totalFlower;

  var rowsRadiusStart = width < 650 ? 70 : 160;
  var allRowsStart = width < 650 ? 100 : rowsRadiusStart - 30;

  var allRows = [];
  var rows = [];
  var row;

  var flower;
  var flowers = [];
  var flowerTextures = [];
  var flowerSizes = [];

  var minimalSize = 0.5;
  var lastMinSize = 0.5;

  // Flower Images
  var flowerImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var flowerImagesUsed = [];

  shuffleFlowers(flowerImages);

  // Values of forces and iterval
  var friction = [];
  var tick = 1;
  var newAngle = 0;
  var rotationVelocity = -0.001;
  var timer = setInterval(function(){ myTimer() }, 9000);


  // Values of the spirograph
  var mouseElement;

  window.onresize = function (event){

    width = window.innerWidth;
    height = window.innerHeight;

    rowsRadiusStart = width < 650 ? 70 : 160;
    allRowsStart = width > 650 ? rowsRadiusStart - 10 : 100;
    allRowsStart = 100;
    renderer.resize(width, height);

    mouseClick();

  }

  function init () {

    createStage();
    createRows();

    for (var i = 0; i < totalFlower; i++) {
      createFlowers(i);
    }

    animate();

    TweenLite.to(body.querySelector(".invitation-logo") , 0.4, {opacity: 1, y: 0, ease:Sine.easeOut, delay: 0.5});
    TweenLite.to(body.querySelector(".invitation-text h4") , 0.4, {opacity: 1, y: 0, ease:Sine.easeOut, delay: 0.6});
    TweenLite.to(body.querySelector(".invitation-text h2") , 0.4, {opacity: 1, y: 0, ease:Sine.easeOut, delay: 0.7});
    TweenLite.to(body.querySelector(".invitation-text p") , 0.4, {opacity: 1, y: 0, ease:Sine.easeOut, delay: 0.87, onComplete: function () {
      
      body.addEventListener("click", mouseClick, false);    

    }});
  
    body.addEventListener("mousemove", mouseMove, false);
    mouseElement = new Repeller();

  }

  function myTimer() {
    
    var d = new Date();
    var t = d.toLocaleTimeString();
      
    transform();
  }

  // Creating Elements
  function createStage () {
    
    renderer = PIXI.autoDetectRenderer(width, height, null, true);
    renderElement = document.body.appendChild(renderer.view);
    renderElement.setAttribute("id", "summer");
    stage = new PIXI.Stage();
  }

  function createRows() {
      
    for (var m = 1; m < totalRows + 1; m++) {
      
      minimalSize = lastMinSize;
      allRows.push(createRow(m));
      createFlowerTexture(sortFlowers());
      lastMinSize = 0.7 * m;

    }
  }

  function createRow(rowIndex) {
      
    var angle = 0;

    for (var i = 0; i < flowersPerRow; i++) {
        
      row = new Row(i);
      row.createLocations(rowsRadiusStart + (rowIndex * (allRowsStart)), angle)
      rows.push(row);

      angle += 2 * Math.PI / flowersPerRow;
    }
  }

  function createFlowerTexture(setflowerArray) {
    
    var flowerP = null;

    for (var i = 0; i < flowersPerRow; i++) {

      if (flowerP > setflowerArray.length - 2) {

        flowerP = 0;

      } else {

        flowerP = flowerP + 1;
      }
      
      flowerSizes.push(minimalSize + flowerP);
      flowerTextures.push(setflowerArray[flowerP]);
    }
  }

  function createFlowers(index) {
    
    flower = new Flower([ width / 2, height / 2 ], flowerSizes[index], flowerTextures[index]);
    stage.addChild(flower.element);
    flowers.push(flower);

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
  
  function shuffleFlowers(a) {
  
    var j, x, i;
      for (i = a.length; i; i -= 1) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
  }

  function transform(e) {

    minimalSize = 0.5;
    lastMinSize = 0.5;

    flowersPerRow = Math.floor((Math.random() * 30) + 10);
    totalRows = Math.floor((Math.random() * 4) + 3);
    totalFlower = totalRows * flowersPerRow; 

    allRows = [];
    rows = [];
    flowerTextures = [];
    flowerSizes = [];

    createRows();

    if (totalFlower >= lastTotalFlowers) {

      for (var i = 0; i < totalFlower - lastTotalFlowers; i++) {
 
        createFlowers(i);

      }

    } else {

      var totalToRemove = lastTotalFlowers - totalFlower;

      for (var w = 0; w < totalToRemove; w++) {

        stage.removeChild(flowers[(lastTotalFlowers - 1) - w].element);
      
      }

      flowers.splice(flowers.length - totalToRemove, totalToRemove );
  
    }


    for (var n = 0; n < flowerTextures.length; n++) {
      flowers[n].addTexture(flowerTextures[n], flowerSizes[n]);
    }


    lastTotalFlowers = totalFlower;
  
  }

  // Events

  function mouseClick(e) {

      clearTimeout(timer);
      transform();
      timer = setInterval(function(){ myTimer() }, 9000);
  }

  function mouseMove( e ) {
    
    if (e.x > width / 2 ) {

      rotationVelocity = -0.001;

    } else {

      rotationVelocity = 0.001;
    }

    mouseElement.setNewLocation(e.x, e.y);

    for (var i = 0; i < totalFlower; i++) {

      flowers[i].applyForce( mouseElement.repell(rows[i]));

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

    for (var i = 0; i < totalFlower; i++) {

      flowers[i].applyForce( createFriction(flowers[i].velocity) );
      flowers[i].applyForce( rows[i].attract( flowers[i]) );
      
      rows[i].rotate(newAngle);

      flowers[i].update();
      flowers[i].display();
    }

    newAngle += rotationVelocity;
    renderer.render(stage);
    requestAnimationFrame(animate);

  }

  return {

    init: init

  }
}

module.exports = Summer;