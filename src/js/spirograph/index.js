var PIXI = require('pixi');


var Spirograph = function  ( element ) {

	var renderer;
	var rendererElement;

	var stage;
	var graphics;

	createStage();
	createOuterCircle();
	animate();

	function createStage () {
		
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		renderElement = document.body.appendChild(renderer.view);
		renderElement.setAttribute("id", "spirograph");

		stage = new PIXI.Stage();

		graphics = new PIXI.Graphics();
	}

	function createOuterCircle() {
		
		graphics.lineStyle(2, 0xFF00FF, 1);
		graphics.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 200);
		graphics.endFill();

		stage.addChild(graphics);
	}

	function createInnerCircle() {
		


		
	}

	function animate() {

    	requestAnimationFrame(animate);

    	// render the root container
    	renderer.render(stage);
	}
}

module.exports = Spirograph;




/*
 * http://en.wikipedia.org/wiki/Spirograph
 */
/*(function(){
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  
  // The angle
  var t = 0;
  
  // This is the point we want to draw
  var x, y;
  
  // radius of outer circle
  var R;

  // radius of inner circle
  var r;
  
  // a point inside the inner circle, distance from it's center 
  var p;
  
  var l;
  var k;
  
  var red;
  var green;
  var blue;

  var i;
 
  R = getValueOrDefaultAndSet("R", 350);
  r = getValueOrDefaultAndSet("r", 220);
  p = getValueOrDefaultAndSet("p", 180);
  
  l = p/r;
  k = r/R;
  
  var numberOfShareNotifications = 0;
  var maxNumberOfShareNotifications = 2;

  function getValueOrDefaultAndSet(variableName, defaultValue) {
    var value = parseInt(getQueryVariable(variableName), 10);
    if(isNaN(value)) {
      value = defaultValue; 
    }
    document.getElementById(variableName).value = value;
    return value;
  }
  
  function draw() {  
    for(i = 0; i < 800; ++i) {
      
      // This is the core spirograph algorithm. Adjusted to be in the middle of the screen. 
      x = R * ((1-k) * Math.cos(t) + l * k * Math.cos((1-k)/k*t)) + canvas.width/2;
      y = R * ((1-k) * Math.sin(t) - l * k * Math.sin((1-k)/k*t)) + canvas.height/2;
      
      red = Math.round((Math.sin(t) + 1) * 128);
      green = Math.round((Math.sin(t+Math.PI*2/3) + 1) * 128);
      blue = Math.round((Math.sin(t+Math.PI*4/3) + 1) * 128);

      ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", 0.5)";
      ctx.fillRect(x, y, 1, 1);
      ctx.fill();
      t += 0.001;
    }
  	window.requestAnimationFrame(draw);
  }
  
  window.requestAnimationFrame(draw);
  
  function getRandomNumberWithMax (max) {
    return Math.floor(Math.random() * max);
  } 
  
  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
  }
  
  function startRandom() {
    clear();
    
    // A real spirograph must have R > r > p
    // we are cheating.
    R = getRandomNumberWithMax(600);
    r = getRandomNumberWithMax(600); //(R);
    p = getRandomNumberWithMax(600); //(r);
    l = p/r;
    k = r/R;
    document.getElementById("R").value = R;
    document.getElementById("r").value = r;
    document.getElementById("p").value = p;
    updateUrl();
    console.log("R: " + R + ", r: " + r + ", p:" + p);
    if(++numberOfShareNotifications <= maxNumberOfShareNotifications) {
      setTimeout(function() {
        $('#shareButton').popover('show');
      }, 4000);

      setTimeout(function() {
        $('#shareButton').popover('destroy');
      }, 10000);
    }
  }
  
  function setValues() {
    clear();
    R = document.getElementById("R").value;
    r = document.getElementById("r").value;
    p = document.getElementById("p").value;
    l = p/r;
    k = r/R;
    updateUrl();
  }
  





})();*/