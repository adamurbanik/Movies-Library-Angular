(function () {
  'use strict';

  var VideoModalController = (function () {
    function VideoModalController() {
      this.isSmall = false;
    }

    VideoModalController.prototype.changeSize = function changeSize(route) {
       this.isSmall =  !this.isSmall;
    };

    return VideoModalController;
  })();

  angular
    .module('libraryApp')
    .controller('VideoModalController', VideoModalController);
})();


