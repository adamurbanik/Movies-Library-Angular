var managePlayerYT = (function () {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var _playerOptions, _player, _iFrame, _ready;

  function createPlayerOptions(config, videoID) {
    _playerOptions = {};
    _playerOptions.width = config.videoWidth;
    _playerOptions.height = config.videoHeight;
    _playerOptions.videoId = videoID;
    _playerOptions.events = {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    };
  }

  function getPlayerOptions() {
    return _playerOptions;
  }

  function getPlayer() {
    return _player;
  }

  function createYTPlayer() {
    _player = new YT.Player('player', _playerOptions);

  }

  function initializePlayer(config, videoID) {
    createPlayerOptions(config, videoID);
    createYTPlayer();
  }

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() { }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
    _ready = true;
    _iFrame = document.querySelector("iFrame");
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      setTimeout(stopVideo, 6000);
      // var videoData = event.target.getVideoData();
      // videoData.source = "youtube";
      // videoData.thumb = "http://img.youtube.com/vi/" + videoData.video_id + "/0.jpg";
      // libraryManagement.addToCollection(videoData);
    }
  }
  var videoData;
  function prepareVideo(config, linkID) {
    return new Promise(function (succeed, fail) {
      if (typeof _iFrame === "undefined") {
        _playerOptions = {};
        _playerOptions.width = config.videoWidth;
        _playerOptions.height = config.videoHeight;
        _playerOptions.videoId = linkID;
        _playerOptions.events = {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        };
      }
      _player = new YT.Player('player', _playerOptions);
      _player.addEventListener("onStateChange", playerStateHandler);

    });
  }




  // function playVideo(config, linkID) {
  //   prepareVideo(config, linkID).then(function (text) {
  //     return text;
  //   });
  // }


  function playVideo(config, linkID) {
    if (typeof _iFrame === "undefined") {
      return new Promise(function (succeed, fail) {

        _playerOptions = {};
        _playerOptions.width = config.videoWidth;
        _playerOptions.height = config.videoHeight;
        _playerOptions.videoId = linkID;
        _playerOptions.events = {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        };
        _player = new YT.Player('player', _playerOptions);
        _player.addEventListener("onStateChange", function (event) {
          if (event.data == YT.PlayerState.PLAYING) {
            console.log("player");
            videoData = event.target.getVideoData();
            videoData.source = "youtube";
            videoData.thumb = "http://img.youtube.com/vi/" + videoData.video_id + "/0.jpg";
            succeed(videoData);
          }
        });
      });
    }
    else {
      return new Promise(function (succeed, fail) {

       console.log(YT);

        // player.loadVideoById(linkID);
        // _iFrame.onload = function(event) {
        //  console.log(event);
        //   // var player = document.getElementById("player");
        //   succeed(videoData);
        // }
        // _iFrame.src = "http://www.youtube.com/embed/" + linkID + "?autoplay=1";
        // frameborder = "0";
        //
        // var adam = "adam";
        // _player.addEventListener("onLoad", function(event) {
        //  succeed(adam);
        // });
        //
        // _player.loadVideoById(linkID);
        //
        // console.log(_player);



      });

    }


    // if (typeof _iFrame === "undefined") {
    //   initializePlayer(config, linkID);
    // }
    // else {
    //   _player.loadVideoById(linkID);
    // }
    // var vimPlayer = document.getElementById("playerVimeo");
    // commonComponents.updateVideoPlayer("youtube");
  }

  function loadVideoById(linkID, callback) {
   _player.loadVideoById(linkID);
   callback();
  }

  function stopVideo() {
    if (typeof _player !== "undefined") {
      _player.stopVideo();
    }
  }

  function playCustomVideo(linkID) {
    _iFrame.src = "http://www.youtube.com/embed/" + linkID + "?autoplay=1"
    frameborder = "0";
  }

  function isPlayerReady() {
    return _ready === true;
  }

  function log(s) {
    console.log(s);
  }

  return {
    createPlayerOptions: createPlayerOptions,
    getPlayerOptions: getPlayerOptions,
    createYTPlayer: createYTPlayer,
    getPlayer: getPlayer,
    initializePlayer: initializePlayer,
    playVideo: playVideo,
    playCustomVideo: playCustomVideo,
    stopVideo: stopVideo,
    isPlayerReady: isPlayerReady,
    onPlayerStateChange: onPlayerStateChange,
    prepareVideo: prepareVideo


  };

});
