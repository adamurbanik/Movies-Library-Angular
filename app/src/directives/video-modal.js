(function () {
  'use strict';

  function AppVideoModal($sce) {
    return {
      templateUrl: 'tmpl/modal.html',
      restrict: 'EA',
      controller: 'VideoModalController',
      controllerAs: 'vm',
      replace: true,
      scope: {
        visible: '=',
        url: '=vmurl',
        type: '='
      },
      bindToController:{
        visible: '=',
        url: '=vmurl',
        type: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.$watch('visible', function (value) {
          if (value !== null) {
            $(element).modal('show');
          }
        });
      }
    };
  }

  angular
    .module('libraryApp')
    .directive('appVideoModal', AppVideoModal)
    .filter('unsafe', function ($sce) { return $sce.trustAsResourceUrl; });
})();








