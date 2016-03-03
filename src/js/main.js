var $ = require('jquery');

var Spirograph = require('./spirograph');

var spirograph = $('#spirograph'); 

if(spirograph[0]){

	var spirograph = new Spirograph(spirograph);
} 
