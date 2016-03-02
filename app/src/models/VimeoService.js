'use strict';
/* globals console, document, Promise, window*/
// (function () {

//   angular
//     .module('libraryApp')
//     .service('VimeoService', VimeoService);

// } ());


function VimeoService() {
  var vimPlayer;

  function validate(url) {
    return getVimeoID(url);
  }

  function getVimeoID(url) {
    var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    var match = url.match(regExp);
    if (match && match[3].length > 0) {
      return match[3];
    }
    else {
      return -1;
    }
  }

  function serviceName() {
    return 'vimeo';
  }

  function fetchVideo(config, url) {
    return new Promise(function (succeed, fail) {
      var videoID = getVimeoID(url);
      initScript();

      if (typeof vimPlayer === "undefined") {
        initPlayer(config, videoID);
      }

      initializeJSONCallback();
      loadVideoById(videoID);

      function initScript() {
        var urlCallback = "http://vimeo.com/api/v2/video/" + videoID + ".json?callback=" + "getData";
        var vimeoScript = document.getElementById('vimeoScript');
        if (vimeoScript !== null && typeof vimeoScript !== 'undefined') {
          vimeoScript.parentElement.removeChild(vimeoScript);
        }

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', urlCallback);
        script.setAttribute('id', 'vimeoScript');

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      }

      function initPlayer(config) {
        vimPlayer = document.getElementById("playerVimeo");
        vimPlayer.width = config.videoWidth;
        vimPlayer.height = config.videoHeight;
        vimPlayer.frameborder = "0";
        vimPlayer.setAttribute("webkitAllowFullScreen", "");
        vimPlayer.setAttribute("mozallowfullscreen", "");
        vimPlayer.setAttribute("allowFullScreen", "");
      }

      function getData(videos) {
        if (videos.length > 0) {
          var video = videos[0];
          var videoData = {
            videoID: video.id,
            title: video.title,
            thumb: video.thumbnail_medium,
            author: video.user_name,
            source: "vimeo",
            url: url
          };
          delete window.getData;
          return succeed(videoData);
        }

      }

      function initializeJSONCallback() {
        window.getData = getData;
      }

      function loadVideoById(videoID) {
        vimPlayer.src = "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo";
      }

    });

  }

  return {
    serviceName: serviceName,
    validate: validate,
    fetchVideo: fetchVideo
  };

}



