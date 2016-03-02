var videoServices = (function () {

  function VideoServices() {
    this.services = [
      YTService,
      VimeoService
    ];

    VideoServices.prototype.validate = function (url) {
      for (var i = 0; i < this.services; i++) {
        var service = this.services[i];
        if (service.validate(url)) {
          return true;
        }
      }
      return false;
    };

    VideoServices.prototype.fetchVideo = function (config, url) {
      for (var i = 0; i < this.services.length; i++) {
        var service = this.services[i];
        if (service.validate(url) !== -1) {
          return service.fetchVideo(config, url);
        }
      }
      return Promise.reject('invalid URL');
    };
  }
  return new VideoServices();
} ());











// var VideoServices = (function () {
//   var videoService = "";
  
//   return {
//     setStrategy: function setStrategy(newVideoService) {
//       videoService = newVideoService;
//       return this; 
//     },
//     playVideo: function playVideo(config, videoID) {
//       return this.videoService.playVideo(config, videoID); 
//     }
//   };
  
// }());


