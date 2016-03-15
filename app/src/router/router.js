(function () {
  var libraryApp =  angular.module('libraryApp');
  
  configureRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configureRoute($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'tmpl/home.html',
        controller: 'LibraryController',
        controllerAs: 'vm'
      })

      .state('addmovie', {
        url: '/input',
        templateUrl: 'tmpl/input.html',
        controller: 'LibraryController',
        controllerAs: 'vm'
      });
  }
  
  libraryApp.config(configureRoute);
})();

