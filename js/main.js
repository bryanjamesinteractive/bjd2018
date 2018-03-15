var preload;
var preloaderTimeout = 500;
var handCursorX = 0, handCursorY = 0;
var globalPlayBackRate = 1;
var introClickHold = 0;
var currentSwooshInstance;
var soundSlowInstance;
var introClickHoldActivated = 0;

var soundWhoosh = "Whoosh"; // Need to declare a string variable for any sound name
var soundSlow = "Aah";
var introVideo;
var wingFlapSpeed = 200;
loadSound();

var queue = new createjs.LoadQueue(true);

$(document).ready(function() {

	loadSite();
	sizeHandler();
	requestAnimationFrame(siteListener);
	setInitialSVGPaths();
	wingFlaps();
	loadIntroVideo();

	// setTimeout(function(){
	//    	TweenMax.to(".circle-line-flipped path", 1.3, {drawSVG:"0%", ease:Quint.easeIn, onComplete:straightIn});
	// }, 1000);

	$('.js-projects-btn')
	.on('click', function(e){
		// if ($('.js-monitor-video-state').attr('data-video-state') == 'video-blurred') {
		// 	$('.js-monitor-video-state').attr('data-video-state', 'video-greyed');
		// } else if ($('.js-monitor-video-state').attr('data-video-state') == 'video-greyed') {
		// 	$('.js-monitor-video-state').attr('data-video-state', '');
		// } else {
		// 	$('.js-monitor-video-state').attr('data-video-state', 'video-blurred');
		// }

		// globalPlayBackRate = globalPlayBackRate - 0.03;
		// if (globalPlayBackRate < 0.28) {
		// 	globalPlayBackRate = 0.28;
		// }
		// console.log(globalPlayBackRate);
		// player.setPlaybackRate(globalPlayBackRate);
	});

	$('.js-projects-btn')
	.on('mousedown', function(e){
		player.setPlaybackRate(0.3);
		player.setVolume(0.3);
		$('.js-monitor-video-state').attr('data-video-state', 'video-blurred');
		
		// currentSoundSlowInstance = createjs.Sound.play(soundSlow);  // play using id.  Could also use full sourcepath or event.src.
	 	currentSoundSlowInstance.volume = 0.6;
	});
	$('.js-projects-btn')
	.on('mouseup', function(e){
		player.setPlaybackRate(1);
		player.setVolume(100);
		// turnSoundDown(currentSoundSlowInstance);
		$('.js-monitor-video-state').attr('data-video-state', '');
	});

	$('.octagon-click-hold-container').on('mousedown', function(e){
		
		currentSwooshInstance = createjs.Sound.play(soundWhoosh);  // play using id.  Could also use full sourcepath or event.src.
	 	currentSwooshInstance.volume = 0.9;

		introClickHold += 1;
		var thisIntroClickHold = introClickHold;
		TweenMax.to(".octagon-click-hold-drawer path", 1.8, {drawSVG:"100%", ease:Power2.easeInOut});
		

		// SPEED UP WINGS
		setTimeout(function(){
		   	if (thisIntroClickHold == introClickHold) {
		   		wingFlapSpeed = 150;
		   		$('.bee-flap').attr('data-speed', 'level-2');
		   	}
		}, 300);
		setTimeout(function(){
		   	if (thisIntroClickHold == introClickHold) {
		   		wingFlapSpeed = 100;
		   		$('.bee-flap').attr('data-speed', 'level-3');
		   	}
		},600);

		setTimeout(function(){
		   	if (thisIntroClickHold == introClickHold) {
		   		introClickHoldActivate();
		   	}
		}, 1200);

		

	});
	$('.octagon-click-hold-container').on('mouseup', function(e){
		if (introClickHoldActivated == 0) {
			introClickHold += 1;
			wingFlapSpeed = 200;
			$('.bee-flap').attr('data-speed', 'level-0');
			turnSoundDown(currentSwooshInstance);
			TweenMax.to(".octagon-click-hold-drawer path", 0.71, {drawSVG:"0%", ease:Quint.easeInOut});
		}
	});

});

function loadSound () {
  createjs.Sound.registerSound("audio/intro-whoosh_faded.mp3", soundWhoosh);
  createjs.Sound.registerSound("audio/aah.mp3", soundSlow);
}

function turnSoundDown(thisSound) {
	thisSound.volume -= 0.02;
	if (thisSound.volume <= 0.07) {
		thisSound.volume = 0;
	} else {
		setTimeout(function(){
		   	turnSoundDown(thisSound);
		}, 20);
	}
}

function introClickHoldActivate() {
	introClickHoldActivated = 1;
	$('.bee-flap').attr('data-flapping-state', 'none');
	$('.octagon-click-hold-container').attr('data-state', 'complete');
	$('.js-monitor-video-state').attr('data-video-state', 'video-on');

	setTimeout(function(){
		player.setVolume(100);
		playVideo();
		introVideo.play();
		// player.setPlaybackRate(0.3);
		setTimeout(function(){
			$('.octagon-click-hold-container').attr('data-state', 'complete-out');
			setTimeout(function(){
				$('.js-circle-timeline-container').attr('data-state', 'on');
				straightIn();
			}, 2000);
		}, 630);
	}, 0);
	
}

function straightIn() {
	TweenMax.to(".circle-line path", 1.7, {drawSVG:"100%", ease:Quint.easeOut});
	$('.audio-balls').attr('data-active', 'on');
	setTimeout(function(){
	   	// TweenMax.to(".timeline-time path", 10, {drawSVG:"30%", ease:Linear.easeNone});
	   	$('.timeline-title').attr('data-type-active', 'on');
	}, 500);
}

$(window).resize(function() {

}); // END OF RESIZE

$(window).scroll(function() {

});  // END OF SCROLL


function showElementWithTransition(e) {
	e.show();
	setTimeout(function(){
	   	e.addClass('active');
	}, 20);
}

function hideElementWithTransition(e) {
	e.removeClass('active');
	setTimeout(function(){
	   	e.hide();
	}, 1000);
}

function destroyElementWithTransition(e) {
	e.removeClass('active');
	setTimeout(function(){
	   	e.remove();
	}, 1000);
}

function setInitialSVGPaths() {

	TweenMax.to(".octagon-click-hold-drawer path", 0.01, {drawSVG:"0%"});
	TweenMax.to(".octagon-click-hold path", 0.01, {drawSVG:"0%"});

	TweenMax.to(".circle-line path", 0.01, {drawSVG:"0%", ease:Quint.easeInOut});
	TweenMax.to(".timeline-time path", 0.01, {drawSVG:"0%"});
}

function siteListener() {
	
	activeCursor = $('.js-active-cursor');
	thisParent = activeCursor.closest('.cursor-mask');
	maskOffsetX = thisParent.offset().left;
	maskOffsetY = thisParent.offset().top;

	htmlEl.mousemove(function(e) {
	  	handCursorX = e.pageX;
    	handCursorY = e.pageY;
    });

    cursorFollowX = handCursorX - maskOffsetX;
    cursorFollowY = handCursorY - maskOffsetY;

    TweenMax.to($('.js-active-cursor'), 
		0.15, {
			x: cursorFollowX,
			y: cursorFollowY
		}
	);

	TweenMax.to($('.js-normal-cursor-follower'), 
		0.15, {
			x: handCursorX,
			y: handCursorY
		}
	);

	requestAnimationFrame(siteListener);
}

function videoListener() {
	localExactTime = player.getCurrentTime();
	localCurrentTime = parseInt(localExactTime);
	// $('.js-monitor-video-second').attr('data-video-second', localCurrentTime);

	timePercent = (localExactTime / totalCurrentVideoTime) * 100;
	timePercentDraw = timePercent + '%';
	// console.log(timePercent);
	TweenMax.to(".timeline-time path", 0.2, {drawSVG:timePercentDraw, ease:Linear.easeNone});

	// SET STAGE STATE
	// console.log(localExactTime);

	// COLOUR BACKGROUNDS
	if (localExactTime > 2.47) {
		$('.js-intro-video').remove();
		$('.js-monitor-video-color').attr('data-video-color', '35261b'); // NESPRESSO
	} else if (localExactTime > 2.23) {
		$('.js-monitor-video-color').attr('data-video-color', '785bbc'); // FROG
	} else if (localExactTime > 2.1) {
		$('.js-monitor-video-color').attr('data-video-color', '9ecbdd');
	} else if (localExactTime > 1.95) {
		$('.js-monitor-video-color').attr('data-video-color', 'bc92e1');
	} else if (localExactTime > 1.6) {
		$('.js-monitor-video-color').attr('data-video-color', '5cd7e4');
	} else if (localExactTime > 1.44) {
		$('.js-monitor-video-color').attr('data-video-color', 'f9d955');
	} else if (localExactTime > 0.8) {
		$('.js-monitor-video-color').attr('data-video-color', 'ffacd4');
	} else { // IF TIME IS AT THE START
		$('.js-monitor-video-color').attr('data-video-color', 'black');
	}

	if (videoAtStart == 0) {
		if (localExactTime > 0.7) {
			// alert();
			player.pauseVideo();
	        playingState = 'paused';
	        $('.octagon-click-hold-container').attr('data-state', 'on');
			videoAtStart = 1;
			$('.octagon-click-hold-container').addClass('on');
			TweenMax.to(".octagon-click-hold path", 1.8, {drawSVG:"100%", ease:Power2.easeInOut});
		}
	}

	requestAnimationFrame(videoListener);
}

function sizeHandler() {
	windowWidth = $(window).innerWidth();
	windowHeight = $(window).height();
	innerWindowHeight = $(window).innerHeight();

	halfWindowWidth = windowWidth / 2;
	halfWindowHeight = windowHeight / 2;
	
	$('.js-full-height').each(function() {
      	$(this).css({ 
		    'height' : innerWindowHeight
	    });
    });
}

function wingFlaps() {
	if ($('.bee-wrap').attr('data-flaps') == 'flaps-up') {
		$('.bee-wrap').attr('data-flaps', 'flaps-down');
	} else {
		$('.bee-wrap').attr('data-flaps', 'flaps-up');
	}
	
   	setTimeout(function(){
	   	wingFlaps();
	}, wingFlapSpeed);
}

function loadIntroVideo() {
	introVideo = document.getElementById('introvideo');

	introVideo.addEventListener('loadeddata', function() {

	  if(introVideo.readyState >= 4) {
	    // obj.play();
	  }

	});
}

function loadSite() {

	preload = new createjs.LoadQueue();
	preload.on("complete", siteLoaded); // ON ALL LOADED, RUN FUNCTION siteLoaded
	preload.on("progress", loadProgress); // ON ALL LOADED, RUN FUNCTION siteLoaded

	// preload.loadFile("img/img-url.png");
	// preload.loadFile("img/img-url.png");
}

function loadProgress() {
	// ON PROGRESS CHANGE
}

function siteLoaded(event) {
	// ON SITE LOADED
}

// if ($('.classname').length) {

// }

// setTimeout(function(){
   
//  }, 100);

// $('.classname')
// .on('click', function(e){

// });


// $('.classname')
// .on('mouseover', function(allAnimalsDetectHover){

// });

// function detectBrowser() {

//     $('html').addClass('nowebkitbrowser'); 
//     /* Get browser */
//     $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

//     /* Detect Chrome */
//     if($.browser.chrome){
//         if ($('.small-nav').length) {
//             $('html').removeClass('nowebkitbrowser');
//             $('html').addClass('webkitbrowser');
//             $.browser.safari = false;
//         } else {

//         $('html').removeClass('nowebkitbrowser');
//         $('html').addClass('webkitbrowser');
//         $('html').addClass('chromebrowser');
        

//         $.browser.safari = false;

//         }
//     } else {
//       $('.loading p').text('Best experienced in Chrome');
//       $('.touch .skip-intro a').hide();
//     }

//     /* Detect Safari */
//     if($.browser.safari){
//         $('html').addClass('webkitbrowser');
//         $('html').removeClass('nowebkitbrowser');
//         $('html').addClass('safaribrowser');
//     }

// }

// UTILITY FUNCTIONS

function dataActiveOff(e) {
	e.attr('data-active', 'off');
}
function dataActiveOn(e) {
	e.attr('data-active', 'on');
}
