(function () {

  angular
    .module('libraryApp')
    .controller('InputController', InputController);
} ());

function InputController(LibraryService, InputService, YTService, VimeoService, $location) {

  var vm = this;

  vm.movieLink = "";

  vm.showModal = false;
  vm.toggleModal = function (params) {
    vm.showModal = !vm.showModal;

  };

  vm.sortDescending = false;
  vm.sortAscending = true;

  vm.toggleSort = function () {
    vm.sortDescending = !vm.sortDescending;
    vm.sortAscending = !vm.sortAscending;
  };

  vm.movies = LibraryService.collectionService.videos;
  console.log(vm.movies);

  vm.inputPattern = /./;

  var config = {
    thumbs: "thumbs",
    pagination: 5,
    thumbWidth: 150,
    thumbHeight: 150,
    videoWidth: 480,
    videoHeight: 385
  };

  vm.processInputForm = function () {
    console.log(vm.movieLink);
    var input = InputService.inputHandler(vm.movieLink);

    if (LibraryService.collectionService.checkIfExists(input.videoID)) {
      alert("ten film jest juz zapisany w bibliotece");
    }
    else {
      if (input.provider === "youtube" && input.videoID !== -1) {
        YTService.playVideo(config, input.videoID).then(function (videoData) {
          LibraryService.collectionService.addItem(videoData);
          vm.movies = LibraryService.collectionService.videos;
        });
      }
      else if (input.provider === "vimeo" && input.videoID !== -1) {
        VimeoService.playVideo(config, input.videoID).then(function (videoData) {
          console.log('success', videoData);
          LibraryService.collectionService.addItem(videoData);
          vm.movies = LibraryService.collectionService.videos;
        }, function () {
          console.log('fail');
        });
      }
    }

    vm.movieLink = "";
  };

  vm.playVideo = function (movie) {
    if (movie.source === 'youtube') {
      YTService.playVideo(config, movie.videoID).then(function () {
        LibraryService.collectionService.increaseViewingCount(movie.videoID);
        vm.movies = LibraryService.collectionService.videos;
      });
    }
    else if (movie.source === 'vimeo') {
      VimeoService.playVideo(config, movie.videoID).then(function () {
        LibraryService.collectionService.increaseViewingCount(movie.videoID);
      });
    }
  };

  vm.deleteMovie = function (videoID) {
    LibraryService.collectionService.removeItem(videoID);
    vm.movies = LibraryService.collectionService.videos;
  };

  vm.addFavourite = function (videoID) {
    LibraryService.collectionService.addFavourite(videoID);
    vm.movies = LibraryService.collectionService.videos;
  };

  vm.search = function(search) {
    console.log(search);
    
  };


  vm.getCount = function () {
    if (typeof vm.movies !== 'undefined') {
      return vm.movies.length;
    }
    return 0;

  };

  vm.eraseLibrary = function () {
    LibraryService.collectionService.removeAll();
    vm.movies = LibraryService.collectionService.videos;
  };

  vm.isActive = function (route) {
    return route === $location.path();
  };

}





