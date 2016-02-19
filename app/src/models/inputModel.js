var inputModel = (function () {

  function inputHandler(link) {
    var input = validateInput(link);
    
    console.log('input handler');
    
    // var config = {
    //   thumbs: "thumbs",
    //   pagination: 5,
    //   thumbWidth: 150,
    //   thumbHeight: 150,
    //   videoWidth : 480,
    //   videoHeight: 385

    // };

    // if (input.provider === "youtube" && input.videoID !== -1) {
    //   managePlayerYT.playVideo(config, input.videoID);
    // }
    // else if (input.provider === "vimeo" && input.videoID !== -1) {
    //   managePlayerVimeo.playVideo(config, input.videoID);
    // }
    
    return input;

  }

  function validateInput(link) {
    var videoID, provider;
    try {
      if (getYouTubeID(link) !== -1) {
        videoID = getYouTubeID(link);
        provider = "youtube";
      }
      else if (getVimeoID(link) !== -1) {
        videoID = getVimeoID(link);
        provider = "vimeo";
      }

      return {
        provider: provider,
        videoID: videoID
      };
    }
    catch (e) {
      log("Wrong link entered. Error: " + e);
    }
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
    
  /* group 1 - group name, 2 - albumID, group 3 - videoID */
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


  return {
    inputHandler: inputHandler
  };


});