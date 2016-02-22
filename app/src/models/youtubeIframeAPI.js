var managePlayerYT = (function () {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var playerOptions, player, iFrame;

  function playVideo(config, linkID) {
    return new Promise(function (succeed, fail) {
      if (typeof iFrame === "undefined") {
        initializePlayer(config, linkID);
        addListener();
      }
      else {
        addListener();
        loadVideoByID(linkID);
        // playCustomVideo(linkID);
      }

      function playerStateHandler(event) {
        if (event.data == YT.PlayerState.PLAYING) {
          // setTimeout(stopVideo, 6000);
          console.log("player");
          var videoData = event.target.getVideoData();
          videoData.source = "youtube";
          videoData.thumb = "http://img.youtube.com/vi/" + videoData.video_id + "/0.jpg";
          succeed(videoData);
        }
      }
      function addListener() {
        player.addEventListener("onStateChange", playerStateHandler);
      }
      function removeListener() {
      }
      function loadVideoByID(linkID) {
        player.loadVideoById(linkID);
      }
      function createPlayerOptions(config, videoID) {
        playerOptions = {};
        playerOptions.width = config.videoWidth;
        playerOptions.height = config.videoHeight;
        playerOptions.videoId = videoID;
        playerOptions.events = {
          'onReady': onPlayerReady,
          'onStateChange': playerStateHandler
        };
      }
      function initializePlayer(config, videoID) {
        createPlayerOptions(config, videoID);
        createYTPlayer();
      }
      function createYTPlayer() {
        player = new YT.Player('player', playerOptions);
      }
      function onYouTubeIframeAPIReady() { }

      function onPlayerReady(event) {
        event.target.playVideo();
        iFrame = document.querySelector("iFrame");
      }
      function stopVideo() {
        if (typeof player !== "undefined" && player  !== null) {
          player.stopVideo();
        }
      }
      function playCustomVideo(linkID) {
        iFrame.src = "http://www.youtube.com/embed/" + linkID + "?autoplay=1";
        frameborder = "0";
      }
    });
  }


  return {
    playVideo: playVideo


  };

});
