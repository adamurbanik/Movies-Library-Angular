/* global angular, localStorage, console, Promise, setTimeout, document */
"use strict";
// (function () {

//   angular
//     .module('libraryApp')
//     .service('YTService', YTService);

// } ());

function YTService() {
  var playerOptions, player, iFrame;

  console.log("YTService has been initialized");

  function createScript() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var url = "https://www.youtube.com/iframe_api";
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    script.setAttribute('id', 'ytScript');

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    console.log("YT API initialized");
  }

  createScript();

  function validate(url) {
    return getYouTubeID(url);
  }

  function getYouTubeID(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return -1;
    }
  }
  
  function serviceName() {
    return 'youtube';
  }

  function fetchVideo(config, url) {
    return new Promise(function (succeed, fail) {
      console.log("player");
      console.log(player);
      console.log("iFrame");
      console.log(iFrame);

      // createScript();
      
      var linkID = getYouTubeID(url);

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
          setTimeout(stopVideo, 6000);
          var videoDataYT = event.target.getVideoData();
          player = event.target;

          var videoData = {
            videoID: videoDataYT.video_id,
            title: videoDataYT.title,
            thumb: "http://img.youtube.com/vi/" + videoDataYT.video_id + "/0.jpg",
            author: videoDataYT.author,
            source: "youtube",
            url: url
          };
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
        player = event.target;
        iFrame = document.querySelector("iFrame");
        // player = document.querySelector("player");
      }
      function stopVideo() {
        if (typeof player !== "undefined" && player !== null) {
          player.stopVideo();
        }
      }
      function playCustomVideo(linkID) {
        iFrame.src = "http://www.youtube.com/embed/" + linkID + "?autoplay=1";
        //frameborder = "0";
      }
    });
  }

  return {
    serviceName: serviceName,
    validate: validate,
    fetchVideo: fetchVideo
  };

}

