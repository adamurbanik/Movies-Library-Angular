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
      source: videoData.source
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
          return parseInt(video.videoID);
        })
        .indexOf(parseInt(videoID)) !== -1;
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
  

 

  // 	function deleteMovie(videoID) {
		// 	var vid = getIndexByVideoID(videoID);
		// 	_moviesArr.splice(vid, 1);
		// 	updateStorage();
		// }




  //   this.movies = [];

  //   function createModel(videoData) {
  //     var model = {
  //       title: videoData.title,
  //       date: new Date().toISOString(),
  //       dateNumber: Date.now(),
  //       thumb: videoData.thumb,
  //       author: videoData.author,
  //       favourite: videoData.favourite || false,
  //       videoID: videoData.video_id,
  //       favourCount: 0,
  //       viewingCount: videoData.viewingCount || 0,
  //       source: videoData.source
  //     };

  //     return {
  //       model: model
  //     };

  //   }

  //   this.addToCollection = function (videoData) {
  //     return new Promise(function (succeed, fail) {
  //       console.log('addtocollection');
  //       var videoID = videoData.video_id || videoData.videoID;
  //       if (getMovieByVideoId(videoID) !== -1) {
  //         // increaseViewingTimes(videoId);
  //       }
  //       else {
  //         movies.push(createModel(videoData));
  //         updateStorage();
  //         succeed(movies);
  //       }
  //     });

  //   };

  //   function updateStorage() {
  //     localStorage.setItem('movies', JSON.stringify(movies));

  //   }

  //   function getMovieByVideoId(videoID) {
  //     movies.forEach(function (element) {
  //       if (element.model.videoID === videoID) {
  //         return element;
  //       }
  //     });
  //     return -1;
  //   }

  //   this.getCollection = function () {
  //     return new Promise(function (succeed, fail) {
  //       var movies = JSON.parse(localStorage.getItem('movies')) || [];
  //       succeed(movies);
  //     });
  //   };

  //   this.getCollection2 = function () {
  //     var movies = JSON.parse(localStorage.getItem('movies')) || [];
  //     return movies;
  //   };


  //   this.clearLibrary = function () {
  //     return new Promise(function (succeed, fail) {
  //       movies = [];
  //       updateStorage();
  //       succeed(movies);
  //     });
  //   };


}




(function () {

  angular
    .module('libraryApp')
    .service('LibraryService', LibraryService);

} ());




// function Jamnik(name, color) {
//   Jamnik.call(this, name); /// wylanie parent konstruktora
//   this.color = color; //
// }

// Jamnik.prototype = Object.create(Dog.prototype);

// Jamnik.prototype.sayWow = function() {
//   console.log('jamnik mowi wow', this);
// }


// var vs = {
//   videos: (function () {
//     try {
//       return JSON.parse(localStorage.getItem('videos')) || [];
//     } catch (e) {
//       return [];
//     }
//   })(),
//   add: function (video) {
//     this.videos.push(video);
//     this.sync();
//   },
//   remove: function () {
//     // this.videos.
//     this.sync();
//   },
//   sync: function () {
//     localStorage.setItem('videos', JSON.stringify(this.videos))
//   }
// };