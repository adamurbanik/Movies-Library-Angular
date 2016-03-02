function VideoServices(vm) {

  function VideoServices() {
    this.services = [
      YTService(),
      VimeoService()
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
      vm.youtube = false;
      vm.vimeo = false;
      for (var i = 0; i < this.services.length; i++) {
        var service = this.services[i];
        if (service.validate(url) !== -1) {
          vm.youtube = service.serviceName() === 'youtube'; // ? true : false;
          vm.vimeo = service.serviceName() === 'vimeo'; //  ? true : false;
          return service.fetchVideo(config, url);
        }
      }
      return Promise.reject('invalid URL');
    };
  }
  return new VideoServices();
}

