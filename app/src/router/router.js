window.libraryApp.config(function($stateProvider, $urlRouterProvider) {
   
   console.log('route');
   $urlRouterProvider.otherwise("/");
   
   $stateProvider
   
           .state('root', {
            url: "/",
            templateUrl: 'tmpl/home.html',
            controller: 'moviesController'
        })
        
        .state('addmovie', {
            url: '/input',
            templateUrl: 'tmpl/input.html',
            controller: 'inputController'
        });
   
    
});