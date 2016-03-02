(function () {

  function config($stateProvider, $urlRouterProvider) {
    console.log('route');
    $urlRouterProvider.otherwise("/");

    $stateProvider

      .state('root', {
        url: "/",
        templateUrl: 'tmpl/home.html',
        controller: 'InputController'
      })

      .state('addmovie', {
        url: '/input',
        templateUrl: 'tmpl/input.html',
        controller: 'InputController'
      })
      ;

  }

  angular
    .module('libraryApp')
    .config(config);

} ());

