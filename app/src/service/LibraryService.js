/* global angular, localStorage, console */
"use strict";
function LibraryService() {

  function createModel(videoData) {
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
  }

  this.collectionService = {
    videos: (function () {
      try {
        return JSON.parse(localStorage.getItem('videos')) || [];
      }
      catch (e) {
        return [];
      }
    } ()),
    addItem: function (videoData) {
      this.videos.push(createModel(videoData));
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
      // localStorage.setItem('videos', JSON.stringify(this.videos));
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
  
}

(function () {

  angular
    .module('libraryApp')
    .service('LibraryService', LibraryService);

} ());
