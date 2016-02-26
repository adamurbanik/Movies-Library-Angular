(function () {

  angular
    .module('libraryApp')
    .service('VimeoService', VimeoService);

} ());


function VimeoService() {
  var vimPlayer;

  this.playVideo = function (config, videoID) {
    return new Promise(function (succeed, fail) {
      console.log("vimeo" +vimPlayer);
      var url = "http://vimeo.com/api/v2/video/" + videoID + ".json?callback=" + "getData";
      console.log(url);
      initScript(url);

      if (typeof vimPlayer === "undefined") {
        initPlayer(config, videoID);

      }

      initializeJSONCallback();
      loadVideoById(videoID);


      function initScript(url) {
        var vimeoScript = document.getElementById('vimeoScript');
        if (vimeoScript !== null && typeof vimeoScript !== 'undefined') {
          vimeoScript.parentElement.removeChild(vimeoScript);
        }

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
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
        var playerYT = document.getElementById("player");
        playerYT.parentElement.insertBefore(playerYT, vimPlayer);

      }

      function getData(videos) {
        if (videos.length > 0) {
          var video = videos[0];
          var videoData = {
            videoID: video.id,
            title: video.title,
            thumb: video.thumbnail_medium,
            author: video.user_name,
            source: "vimeo"
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


  };




}



