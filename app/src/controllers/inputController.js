(function () {

  angular
    .module('libraryApp')
    .controller('InputController', InputController);

} ());

function InputController(LibraryService, $location) {

  var vm = this;

  vm.movieLink = "";

  vm.showModal = false;
  vm.toggleModal = function (params) {
    vm.showModal = !vm.showModal;
    console.log("modal toggled", vm.showModal);

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

    var url = "";
    url = vm.movieLink;

    videoServices.fetchVideo(config, url).then(function (videoData) {
      if (LibraryService.collectionService.checkIfExists(videoData.videoID)) {
        alert("ten tytul juz jest zapisany w bibliotece");
      }
      else {
        LibraryService.collectionService.addItem(videoData);
        vm.movies = LibraryService.collectionService.videos;
      }

    }, function (error) {
      console.log(error);
    });

    vm.movieLink = "";
  };

  vm.playVideo = function (movie) {
    videoServices.fetchVideo(config, movie.url);
  };

  vm.deleteMovie = function (videoID) {
    LibraryService.collectionService.removeItem(videoID);
    vm.movies = LibraryService.collectionService.videos;
  };

  vm.addFavourite = function (videoID) {
    LibraryService.collectionService.addFavourite(videoID);
    vm.movies = LibraryService.collectionService.videos;
  };

  vm.search = function (search) {
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

  vm.viewBy = 10;
  vm.totalItems = vm.movies.length;
  console.log(vm.totalItems);
  vm.currentPage = 1;
  vm.itemsPerPage = vm.viewBy;
  vm.maxSize = 5; //Number of pager buttons to show
  
  vm.setItemsPerPage = function (num) {
    vm.itemsPerPage = num;
    vm.currentPage = 1; // reset to first page
    console.log("setitemperpage");
  };



}





