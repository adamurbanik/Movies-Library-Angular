(function () {

  angular
    .module('libraryApp')
    .service('LibraryService', LibraryService);

} ());

function LibraryService() {

  var movies = [];

  function createModel(videoData) {
    var model = {
      title: videoData.title,
      date: new Date().toISOString(),
      dateNumber: Date.now(),
      thumb: videoData.thumb,
      author: videoData.author,
      favourite: videoData.favourite || false,
      videoID: videoData.video_id,
      favourCount: 0,
      viewingCount: videoData.viewingCount || 0,
      source: videoData.source
    };

    return {
      model: model
    };

  }

  this.addToCollection = function (videoData) {
    return new Promise(function (succeed, fail) {
      console.log('addtocollection');
      var videoID = videoData.video_id || videoData.videoID;
      if (getMovieByVideoId(videoID) !== -1) {
        // increaseViewingTimes(videoId);
      }
      else {
        movies.push(createModel(videoData));
        updateStorage();
        succeed(movies);
      }
    });

  };

  function updateStorage() {
    localStorage.setItem('movies', JSON.stringify(movies));

  }

  function getMovieByVideoId(videoID) {
    movies.forEach(function (element) {
      if (element.model.videoID === videoID) {
        return element;
      }
    });
    return -1;
  }

  this.getCollection = function () {
    return new Promise(function (succeed, fail) {
      var movies = JSON.parse(localStorage.getItem('movies')) || [];
      succeed(movies);
    });
  };

  this.clearLibrary = function () {
    return new Promise(function (succeed, fail) {
      movies = [];
      updateStorage();
      succeed(movies);
    });

  };


}