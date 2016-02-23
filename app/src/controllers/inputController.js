(function () {

  function InputController(LibraryService, InputService, PlayerYTService) {

    var vm = this;
    vm.movies = [];
    vm.movieLink = "";

    vm.showModal = false;
    vm.toggleModal = function (params) {
      vm.showModal = !vm.showModal;

    };

    LibraryService
      .getCollection()
      .then(function (response) {
        vm.movies = response;
        console.log(vm.movies);
      });

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

      InputService
        .inputHandler(vm.movieLink)
        .then(function (response) {
          if (response.provider === "youtube" && response.videoID !== -1) {
            PlayerYTService.playVideo(config, response.videoID).then(function (videoData) {
              LibraryService
                .addToCollection(videoData)
                .then(function(response) {
                  vm.movies = response;
                });

            });
          }
        });

      vm.movieLink = "";
    };

    vm.getCount = function () {
      return vm.movies.length;
    };

    vm.eraseLibrary = function () {
      LibraryService
        .clearLibrary()
        .then(function (response) {
          vm.movies = response;
        });
    };
    
  }
  

  angular
    .module('libraryApp')
    .controller('InputController', InputController);
} ());


