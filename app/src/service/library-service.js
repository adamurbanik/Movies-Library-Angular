(function () {

  "use strict";

  var LibraryService = (function LibraryService() {


    function LibraryService() {
      
    }

    LibraryService.prototype.collectionService = {
      videos: (function () {
        try {
          return JSON.parse(localStorage.getItem('videos')) || [];
        }
        catch (e) {
          return [];
        }
      } ()),
      createModel: function (videoData) {
        var model = {
          title: videoData.title,
          date: new Date().toISOString(),
          dateNumber: Date.now(),
          thumb: videoData.thumb,
          author: videoData.author,
          favourite: false,
          videoID: videoData.videoID,
          favourCount: 0,
          viewingCount: 0,
          source: videoData.source,
          url: videoData.url
        };
        return model;
      },
      addItem: function (videoData) {
        this.videos.push(this.createModel(videoData));
        this.sync();
      },
      removeItem: function (videoID) {
        var index = this.getIndexByVideoID(videoID);
        this.videos.splice(index, 1);
        this.sync();
      },
      removeAll: function () {
        this.videos = [];
        this.sync();
      },
      sync: function () {
        localStorage.setItem('videos', angular.toJson(this.videos));
      },
      checkIfExists: function (videoID) {
        return this
          .videos
          .map(function (video) {
            return video.videoID;
          })
          .indexOf(videoID) !== -1;
      },
      getIndexByVideoID: function (videoID) {
        return this
          .videos
          .map(function (video) {
            return video.videoID;
          })
          .indexOf(videoID);
      },
      addFavourite: function (videoID) {
        var index = this.getIndexByVideoID(videoID);
        this.videos[index].favourite = true;
        this.videos[index].favourCount++;
        this.sync();
      },
      increaseViewingCount: function (videoID) {
        var index = this.getIndexByVideoID(videoID);
        this.videos[index].viewingCount++;
        this.sync();
      }

    };

    return LibraryService;

  })();

  angular
    .module('libraryApp')
    .service('libraryService', LibraryService);

})();
