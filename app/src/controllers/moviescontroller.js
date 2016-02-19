console.log('main controller js ');



window.libraryApp.controller('moviesController', ['$scope', 'moviesFactory', '$location', function($scope, moviesFactory, $location) {

    console.log(moviesFactory);
    $scope.movies = moviesFactory;
   
    
    $scope.currMovie = null;
   
   
   $scope.isActive = function(route) {
     return route === $location.path();
   };
    
    
}]);