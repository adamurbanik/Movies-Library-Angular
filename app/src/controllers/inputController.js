console.log("input controller js");


libraryApp.controller('inputController', ['$scope', 'libraryManagement', 'managePlayerYT', 'inputModel', function ($scope, libraryManagement, managePlayerYT, inputModel) {

  $scope.showModal = false;
  $scope.toggleModal = function (params) {
    $scope.showModal = !$scope.showModal;
  };

  $scope.movies = libraryManagement.getCollection();
  console.log($scope.movies);

  $scope.inputPattern = /./;

  $scope.processInputForm = function () {

    var config = {
      thumbs: "thumbs",
      pagination: 5,
      thumbWidth: 150,
      thumbHeight: 150,
      videoWidth: 480,
      videoHeight: 385
    };

    var input = inputModel.inputHandler($scope.formData.movieLink);


    if (input.provider === "youtube" && input.videoID !== -1) {
      managePlayerYT.playVideo(config, input.videoID).then(function (videoData) {
        libraryManagement.addToCollection(videoData);

      });
    }
    else if (input.provider === "vimeo" && input.videoID !== -1) {
      managePlayerVimeo.playVideo(config, input.videoID);

    }
    $scope.formData.movieLink = "";

  };




  $scope.getCount = function () {
    return $scope.movies.length;
  };

  $scope.eraseLibrary = function () {
    $scope.movies = libraryManagement.clearLibrary();
    console.log($scope.movies);
  };






}]);






// https://www.youtube.com/watch?v=4JOAqRS_lms
// https://youtu.be/vJ3a_AuEW18
// https://vimeo.com/138882294

// ngStorage