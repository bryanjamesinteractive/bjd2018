// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videoAtStart = 0;
var playingState = '';
var totalCurrentVideoTime;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    controls: 0,
    videoId: 'mwAJaz-bQKk',
    suggestedQuality: 'hd1080',
    playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel' : 0, 'start': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  playVideo();
  player.setVolume(0);
  setTimeout(function(){
      // player.pauseVideo();
  }, 1000);
  requestAnimationFrame(videoListener);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {

  }
  if (event.data == YT.PlayerState.PLAYING) {
    totalCurrentVideoTime = player.getDuration();
    // $('.js-monitor-video-state').attr('data-video-state', 'video-on');
  }
}
function playVideo() {
  player.playVideo();
  playingState = 'playing';

  // if (videoAtStart == 0) {
  //   setTimeout(function(){
  //       player.pauseVideo();
  //       playingState = 'paused';
  //       $('.octagon-click-hold-container').attr('data-state', 'on');
  //   }, 500);
  //   videoAtStart = 1;
  // }
  
  console.log(playingState);
}
function stopVideo() {
  player.stopVideo();
  playingState = 'stopped';
  console.log(playingState);
}
function pauseVideo() {
  player.pauseVideo();
  playingState = 'paused';
  console.log(playingState);
}