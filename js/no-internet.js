
setTimeout(function(){ // FIRST ENTER SITE
   	playingState = 'paused';
	$('.octagon-click-hold-container').attr('data-state', 'on');
	
	videoAtStart = 1;

	setTimeout(function(){ // VIDEO LOADED AND READY
		$('.octagon-click-hold-container').addClass('on');
		TweenMax.to(".octagon-click-hold path", 1.8, {drawSVG:"100%", ease:Power2.easeInOut});
	}, 1000);

}, 1000);

