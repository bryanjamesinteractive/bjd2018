// ELEMENTS
var bodyEl = $('body');
var htmlEl = $('html');

var windowWidth;
var windowHeight;
var halfWindowWidth;
var halfWindowHeight;
var touchActive;
if (htmlEl.hasClass('touchevents')) {
	touchActive = 'active';
}