(function () {

  function Config($stateProvider, $urlRouterProvider) {
    console.log('route');
    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'tmpl/home.html',
        controller: 'LibraryController'
      })

      .state('addmovie', {
        url: '/input',
        templateUrl: 'tmpl/input.html',
        controller: 'LibraryController'
      })
      ;

  }

  angular
    .module('libraryApp')
    .config(Config);

} ());

