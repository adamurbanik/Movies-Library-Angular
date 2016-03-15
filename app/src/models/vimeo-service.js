'use strict';
/* globals console, document, Promise, window, angular*/


(function () {

  var $ = window.$;

  var VimeoService = (function VimeoService() {

    VimeoService.$inject = ['config', '$q'];


    function VimeoService(config, $q) {
      this.validationPattern = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      this.urlPattern = "https://vimeo.com/api/v2/video/:id.json";
      this.config = config;
      this.$q = $q;
    }

    VimeoService.prototype.vimPlayer = null;

    VimeoService.prototype.validate = function validate(url) {
      return this.validationPattern.test(url);
    };

    VimeoService.prototype.parseHash = function (url) {
      if (!this.validate(url)) {
        return null;
      }
      return url.match(this.validationPattern)[3];
    };

    VimeoService.prototype.fetchVideo = function fetchVideo(url) {
      var videoID = this.parseHash(url);
      if (!videoID) {
        return this.$q.reject('invalid url');
      }
      return this.getData(videoID);
    };

    VimeoService.prototype.getData = function getData(videoID) {
      return $.ajax(this.urlPattern.replace(':id', videoID))
        .then(function (data) {
          return {
            type: 'vimeo',
            videoID: data[0].id,
            title: data[0].title,
            thumb: data[0].thumbnail_medium,
            author: data[0].user_name,
            url: "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo"
          };
        }, function () {
          return 'AJAX getting vimeo data failed';
        });
    };

    return VimeoService;

  })();

  angular
    .module('libraryApp')
    .service('vimeoService', VimeoService);

} ());




      
      


